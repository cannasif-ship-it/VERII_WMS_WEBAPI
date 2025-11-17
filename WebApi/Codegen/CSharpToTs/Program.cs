using System.Text;
using System.Text.RegularExpressions;

class Program
{
    static readonly Dictionary<string, string> TypeMap = new()
    {
        { "string", "string" },
        { "int", "number" },
        { "long", "number" },
        { "short", "number" },
        { "byte", "number" },
        { "char", "string" },
        { "double", "number" },
        { "float", "number" },
        { "decimal", "number" },
        { "bool", "boolean" },
        { "Guid", "string" },
        { "DateTime", "string" },
        { "TimeSpan", "string" }
    };

    static readonly Regex ClassRegex = new(
        @"class\s+(?<name>\w+)\s*(?::\s*(?<base>[^\{]+))?\s*\{",
        RegexOptions.Compiled);

    static readonly Regex PropRegex = new(
        @"public\s+(?<type>[\w\?<>\[\],\.]+)\s+(?<name>\w+)\s*\{\s*get;\s*set;",
        RegexOptions.Compiled);

    static readonly Regex UsingRegex = new(@"^using\s+.*;", RegexOptions.Compiled);

    static int Main(string[] args)
    {
        try
        {
            var repoRoot = FindRepoRoot();
            var dtoDir = Path.Combine(repoRoot, "DTOs");
            var modelsDir = Path.Combine(repoRoot, "Models");
            var outRoot = Path.Combine(repoRoot, "WebApi", "Models");

            var inputs = new List<string>();
            if (Directory.Exists(dtoDir)) inputs.AddRange(Directory.GetFiles(dtoDir, "*.cs", SearchOption.AllDirectories));
            if (Directory.Exists(modelsDir)) inputs.AddRange(Directory.GetFiles(modelsDir, "*.cs", SearchOption.AllDirectories));

            Console.WriteLine($"Found {inputs.Count} C# files to convert.");

            foreach (var file in inputs)
            {
                var text = File.ReadAllText(file);
                var relative = Path.GetRelativePath(Path.Combine(repoRoot), file);
                var relDir = Path.GetDirectoryName(relative) ?? string.Empty;
                var targetDir = Path.Combine(outRoot, relDir.Replace("DTOs", "DTOs").Replace("Models", "Models"));
                Directory.CreateDirectory(targetDir);

                // Parse all classes inside file
                var classMatches = ClassRegex.Matches(text);
                if (classMatches.Count == 0) continue;

                var tsBuilder = new StringBuilder();
                foreach (Match cm in classMatches)
                {
                    var className = cm.Groups["name"].Value;
                    var baseRaw = cm.Groups["base"].Success ? cm.Groups["base"].Value.Trim() : null;
                    var extends = ExtractFirstBase(baseRaw);

                    var bodyStart = cm.Index + cm.Length;
                    var bodyEnd = FindMatchingBrace(text, cm.Index + text.Substring(cm.Index).IndexOf('{'));
                    var body = bodyEnd > bodyStart ? text.Substring(bodyStart, bodyEnd - bodyStart) : string.Empty;

                    var props = new List<(string name, string type, bool optional)>();
                    foreach (Match pm in PropRegex.Matches(body))
                    {
                        var rawType = pm.Groups["type"].Value.Trim();
                        var rawName = pm.Groups["name"].Value.Trim();
                        var (tsType, optional) = MapType(rawType);
                        props.Add((rawName, tsType, optional));
                    }

                    tsBuilder.AppendLine($"export interface {className}{(extends is not null ? " extends " + extends : string.Empty)} {{");
                    foreach (var p in props)
                    {
                        tsBuilder.AppendLine($"  {ToCamelOrKeep(p.name)}{(p.optional ? "?" : string.Empty)}: {p.type};");
                    }
                    tsBuilder.AppendLine("}");
                    tsBuilder.AppendLine();
                }

                var outFileName = Path.GetFileNameWithoutExtension(file) + ".ts";
                var outPath = Path.Combine(targetDir, outFileName);
                File.WriteAllText(outPath, tsBuilder.ToString());
            }

            Console.WriteLine("TypeScript interfaces generated under WebApi/Models.");
            return 0;
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(ex);
            return 1;
        }
    }

    static string FindRepoRoot()
    {
        // Assuming this tool runs from WebApi/Codegen/CSharpToTs
        var cwd = Directory.GetCurrentDirectory();
        var repoRoot = Path.GetFullPath(Path.Combine(cwd, "..", "..", ".."));
        if (Directory.Exists(Path.Combine(repoRoot, "DTOs")) && Directory.Exists(Path.Combine(repoRoot, "Models")))
        {
            return repoRoot;
        }
        // Fallback to current directory
        return cwd;
    }

    static string? ExtractFirstBase(string? baseRaw)
    {
        if (string.IsNullOrWhiteSpace(baseRaw)) return null;
        // Handle ": BaseClass, Interface"
        var parts = baseRaw.Split(',');
        var baseName = parts[0].Trim();
        // remove generic params if any for TS extends (rare)
        baseName = Regex.Replace(baseName, @"<.*>", "");
        return baseName;
    }

    static (string tsType, bool optional) MapType(string csType)
    {
        var optional = csType.EndsWith("?");
        csType = csType.TrimEnd('?');

        // Arrays and generics
        if (csType.EndsWith("[]"))
        {
            var inner = csType.Substring(0, csType.Length - 2);
            var (innerTs, _) = MapType(inner);
            return ($"{innerTs}[]", optional);
        }

        // List<T>, ICollection<T>, IEnumerable<T>
        var listMatch = Regex.Match(csType, @"^(List|ICollection|IEnumerable)\s*<\s*(.+)\s*>$");
        if (listMatch.Success)
        {
            var inner = listMatch.Groups[2].Value.Trim();
            var (innerTs, _) = MapType(inner);
            return ($"{innerTs}[]", optional);
        }

        // Dictionary<K,V> -> Record<K,V>
        var dictMatch = Regex.Match(csType, @"^(Dictionary|IDictionary)\s*<\s*(.+)\s*,\s*(.+)\s*>$");
        if (dictMatch.Success)
        {
            var key = dictMatch.Groups[2].Value.Trim();
            var val = dictMatch.Groups[3].Value.Trim();
            var (keyTs, _) = MapType(key);
            var (valTs, _) = MapType(val);
            return ($"Record<{keyTs}, {valTs}>", optional);
        }

        if (TypeMap.TryGetValue(csType, out var mapped))
        {
            return (mapped, optional);
        }

        // Nullable<T>
        var nullableMatch = Regex.Match(csType, @"^Nullable<\s*(.+)\s*>$");
        if (nullableMatch.Success)
        {
            var inner = nullableMatch.Groups[1].Value.Trim();
            var (innerTs, _) = MapType(inner);
            return (innerTs, true);
        }

        // Generic types T -> any
        if (Regex.IsMatch(csType, @"^[A-Z]$"))
        {
            return ("any", optional);
        }

        // Complex type - keep name as-is (will rely on generated interface)
        return (csType, optional);
    }

    static int FindMatchingBrace(string text, int openIndex)
    {
        var depth = 0;
        for (int i = openIndex; i < text.Length; i++)
        {
            var c = text[i];
            if (c == '{') depth++;
            else if (c == '}')
            {
                depth--;
                if (depth == 0) return i;
            }
        }
        return text.Length;
    }

    static string ToCamelOrKeep(string name)
    {
        // Keep original casing to match API payloads
        return name;
    }
}