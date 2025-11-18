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
                var baseImports = new HashSet<string>(StringComparer.Ordinal);
                var typeImports = new HashSet<string>(StringComparer.Ordinal);
                foreach (Match cm in classMatches)
                {
                    var className = cm.Groups["name"].Value;
                    var baseRaw = cm.Groups["base"].Success ? cm.Groups["base"].Value.Trim() : null;
                    var extends = ExtractFirstBase(baseRaw);
                    if (!string.IsNullOrWhiteSpace(extends)) baseImports.Add(extends);

                    var openBraceIndex = cm.Index + cm.Length - 1;
                    var bodyStart = openBraceIndex + 1;
                    var bodyEnd = FindMatchingBrace(text, openBraceIndex);
                    var body = bodyEnd > bodyStart ? text.Substring(bodyStart, bodyEnd - bodyStart) : string.Empty;
                    body = Regex.Replace(body, @"\b(virtual|override|static|new|required)\b\s+", "");

                    var props = new List<(string name, string type, bool optional)>();
                    foreach (Match pm in PropRegex.Matches(body))
                    {
                        var rawType = pm.Groups["type"].Value.Trim();
                        var rawName = pm.Groups["name"].Value.Trim();
                        var (tsType, optional) = MapType(rawType);
                        props.Add((rawName, tsType, optional));
                        var baseType = tsType.EndsWith("[]") ? tsType[..^2] : tsType;
                        if (IsCustomTsType(baseType) && !string.Equals(baseType, className, StringComparison.Ordinal))
                        {
                            typeImports.Add(baseType);
                        }
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

                if (baseImports.Count > 0 || typeImports.Count > 0)
                {
                    var allImports = baseImports.Union(typeImports).OrderBy(x => x).ToArray();
                    var resolved = ResolveIndexImportPath(outRoot, targetDir);
                    if (!string.IsNullOrWhiteSpace(resolved) && allImports.Length > 0)
                    {
                        tsBuilder.Insert(0, $"import {{ {string.Join(", ", allImports)} }} from '{resolved}';\n");
                    }
                }

                File.WriteAllText(outPath, tsBuilder.ToString());
            }

            Console.WriteLine("TypeScript interfaces generated under WebApi/Models.");
            try
            {
                GenerateIndex(outRoot);
                Console.WriteLine("index.ts generated under WebApi/Models.");
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
            }
            return 0;
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(ex);
            return 1;
        }
    }

    static void GenerateIndex(string modelsRoot)
    {
        var files = Directory.GetFiles(modelsRoot, "*.ts", SearchOption.AllDirectories)
            .Where(f => !string.Equals(Path.GetFileName(f), "index.ts", StringComparison.OrdinalIgnoreCase))
            .OrderBy(f => f)
            .ToList();
        var sb = new StringBuilder();
        foreach (var file in files)
        {
            var rel = Path.GetRelativePath(modelsRoot, file).Replace("\\", "/");
            if (rel.EndsWith(".ts")) rel = rel[..^3];
            sb.Append("export * from './");
            sb.Append(rel);
            sb.AppendLine("';");
        }
        File.WriteAllText(Path.Combine(modelsRoot, "index.ts"), sb.ToString());
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
        // strip namespace qualifiers
        if (baseName.Contains('.')) baseName = baseName.Split('.').Last();
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

        // List<T>, ICollection<T>, IEnumerable<T>, IReadOnlyCollection<T>, IReadOnlyList<T>, ISet<T>, HashSet<T>
        var listMatch = Regex.Match(csType, @"^(List|ICollection|IEnumerable|IReadOnlyCollection|IReadOnlyList|ISet|HashSet)\s*<\s*(.+)\s*>$");
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

    static bool IsCustomTsType(string ts)
    {
        var t = ts.Trim();
        if (t.EndsWith("[]")) t = t[..^2];
        if (string.IsNullOrWhiteSpace(t)) return false;
        var primitives = new HashSet<string> { "string", "number", "boolean", "Date" };
        if (primitives.Contains(t)) return false;
        if (t.Contains("<") || t.Contains(">")) return false;
        return char.IsUpper(t[0]);
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

    static string ResolveIndexImportPath(string outRoot, string fromDir)
    {
        try
        {
            var indexTs = Path.Combine(outRoot, "index.ts");
            if (!File.Exists(indexTs)) return string.Empty;
            var rel = Path.GetRelativePath(fromDir, indexTs).Replace("\\", "/");
            if (rel.EndsWith(".ts")) rel = rel[..^3];
            if (!rel.StartsWith(".")) rel = "./" + rel;
            return rel;
        }
        catch { }
        return string.Empty;
    }
}