using System.Text;
using System.Text.RegularExpressions;

class Program
{
    static readonly Regex InterfaceHeader = new(@"public\s+interface\s+(?<name>I\w+)", RegexOptions.Compiled);
    static readonly Regex MethodRegex = new(@"Task<\s*ApiResponse<\s*(?<ret>[A-Za-z0-9_<>\s,\?]+)\s*>\s*>\s*(?<name>\w+)Async\s*\((?<params>[^)]*)\)", RegexOptions.Compiled);

    static readonly Dictionary<string, string> TypeMap = new()
    {
        { "string", "string" },
        { "int", "number" },
        { "long", "number" },
        { "short", "number" },
        { "byte", "number" },
        { "double", "number" },
        { "float", "number" },
        { "decimal", "number" },
        { "bool", "boolean" },
        { "Guid", "string" },
        { "DateTime", "Date" }
    };

    static int Main(string[] args)
    {
        var repoRoot = Directory.GetCurrentDirectory();
        var srcRoot = Path.Combine(repoRoot, "Interfaces");
        var outRoot = Path.Combine(repoRoot, "WebApi", "Interfaces");
        Directory.CreateDirectory(outRoot);

        var files = Directory.GetFiles(srcRoot, "I*.cs", SearchOption.AllDirectories);
        foreach (var file in files)
        {
            var text = File.ReadAllText(file);
            var ih = InterfaceHeader.Match(text);
            if (!ih.Success) continue;
            var iname = ih.Groups["name"].Value.Trim();

            var sb = new StringBuilder();
            var typeImports = new HashSet<string>();

            var methods = MethodRegex.Matches(text);
            Console.WriteLine($"[CSharpInterfacesToTs] {iname}: methods matched = {methods.Count}");
            foreach (Match dm in methods) Console.WriteLine($" - {dm.Groups["name"].Value}Async ret={dm.Groups["ret"].Value.Trim()}");
            foreach (Match m in methods)
            {
                var retRawFull = m.Groups["ret"].Value.Trim();
                var retRaw = retRawFull.EndsWith(">>") ? retRawFull.Substring(0, retRawFull.Length - 1) : retRawFull;
                CollectTypesFromReturn(retRaw, typeImports);
                var paramsSig = m.Groups["params"].Value;
                foreach (var p in ParseParams(paramsSig))
                {
                    CollectTypesFromParam(p.type, typeImports);
                }
            }

            

            sb.AppendLine();
            sb.AppendLine($"export interface {iname} {{");
            foreach (Match m in methods)
            {
                var name = m.Groups["name"].Value;
                var retRawFull = m.Groups["ret"].Value.Trim();
                var retRaw = retRawFull.EndsWith(">>") ? retRawFull.Substring(0, retRawFull.Length - 1) : retRawFull;
                var retTs = MapReturnType(retRaw);
                var paramsSig = BuildTsParams(m.Groups["params"].Value);
                var tsName = char.ToLowerInvariant(name[0]) + name.Substring(1); // camelCase
                sb.AppendLine($"  {tsName}({paramsSig}): Promise<ApiResponse<{retTs}>>;");
            }
            sb.AppendLine("}");

            var relPath = Path.GetRelativePath(srcRoot, file);
            var relDir = Path.GetDirectoryName(relPath) ?? string.Empty;
            var outDir = Path.Combine(outRoot, relDir);
            Directory.CreateDirectory(outDir);
            var apiRespTs = Path.Combine(repoRoot, "WebApi", "Models", "ApiResponse.ts");
            var apiRel = Path.GetRelativePath(outDir, apiRespTs).Replace("\\", "/");
            if (apiRel.EndsWith(".ts")) apiRel = apiRel[..^3];
            if (!apiRel.StartsWith(".")) apiRel = "./" + apiRel;
            sb.Insert(0, $"import type {{ ApiResponse, PagedResponse }} from '{apiRel}';\n");
            if (typeImports.Count > 0)
            {
                var indexTs = Path.Combine(repoRoot, "WebApi", "Models", "index.ts");
                var rel = Path.GetRelativePath(outDir, indexTs).Replace("\\", "/");
                if (rel.EndsWith(".ts")) rel = rel[..^3];
                if (!rel.StartsWith(".")) rel = "./" + rel;
                var typesJoined = string.Join(", ", typeImports.OrderBy(t => t));
                sb.Insert(0, $"import type {{ {typesJoined} }} from '{rel}';\n");
            }

            var outPath = Path.Combine(outDir, iname + ".ts");
            File.WriteAllText(outPath, sb.ToString());
        }

        try
        {
            GenerateIndex(outRoot);
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(ex);
        }
        return 0;
    }

    static IEnumerable<(string name, string type)> ParseParams(string paramSig)
    {
        var list = new List<(string, string)>();
        foreach (var raw in paramSig.Split(',', StringSplitOptions.RemoveEmptyEntries))
        {
            var p = raw.Trim();
            p = Regex.Replace(p, @"\[[^\]]*\]", "");
            p = Regex.Replace(p, @"=\s*[^,]+", "");
            var parts = p.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            if (parts.Length < 2) continue;
            var type = parts[parts.Length - 2].Trim();
            var name = parts[parts.Length - 1].Trim();
            list.Add((name, type));
        }
        return list;
    }

    static string BuildTsParams(string paramSig)
    {
        var prs = ParseParams(paramSig).ToList();
        return string.Join(", ", prs.Select(p => $"{Camel(p.name)}: {MapType(p.type)}"));
    }

    static string Camel(string n) => char.ToLowerInvariant(n[0]) + n.Substring(1);

    static string MapType(string cs)
    {
        cs = cs.TrimEnd('?');
        if (TypeMap.TryGetValue(cs, out var mapped)) return mapped;
        var enumMatch = Regex.Match(cs, @"^(IEnumerable|List|ICollection)<\s*(.+)\s*>$");
        if (enumMatch.Success)
        {
            var inner = enumMatch.Groups[2].Value.Trim();
            return MapType(inner) + "[]";
        }
        return cs;
    }

    static string MapReturnType(string ret)
    {
        ret = ret.Trim();
        var enumMatch = Regex.Match(ret, @"^(IEnumerable|List|ICollection)<\s*(.+)\s*>$");
        if (enumMatch.Success)
        {
            var inner = enumMatch.Groups[2].Value.Trim();
            return MapType(inner) + "[]";
        }
        var paged = Regex.Match(ret, @"^PagedResponse<\s*(.+)\s*>$");
        if (paged.Success)
        {
            var inner = paged.Groups[1].Value.Trim();
            return $"PagedResponse<{MapType(inner)}>";
        }
        return MapType(ret);
    }

    static void CollectTypesFromReturn(string ret, HashSet<string> set)
    {
        var enumMatch = Regex.Match(ret, @"^(IEnumerable|List|ICollection)<\s*(.+)\s*>$");
        if (enumMatch.Success)
        {
            CollectTypesFromParam(enumMatch.Groups[2].Value.Trim(), set);
            return;
        }
        var paged = Regex.Match(ret, @"^PagedResponse<\s*(.+)\s*>$");
        if (paged.Success)
        {
            CollectTypesFromParam(paged.Groups[1].Value.Trim(), set);
            return;
        }
        CollectTypesFromParam(ret.Trim(), set);
    }

    static void CollectTypesFromParam(string csType, HashSet<string> set)
    {
        csType = csType.TrimEnd('?');
        var enumMatch = Regex.Match(csType, @"^(IEnumerable|List|ICollection)<\s*(.+)\s*>$");
        if (enumMatch.Success)
        {
            CollectTypesFromParam(enumMatch.Groups[2].Value.Trim(), set);
            return;
        }
        if (!TypeMap.ContainsKey(csType)) set.Add(csType);
    }

    static string ResolveModelImportPath(string typeName)
    {
        var repoRoot = Directory.GetCurrentDirectory();
        var modelsRoot = Path.Combine(repoRoot, "WebApi", "Models");
        var files = Directory.GetFiles(modelsRoot, typeName + ".ts", SearchOption.AllDirectories);
        if (files.Length == 0) return string.Empty;
        // Use the actual output directory as the base to compute relative paths
        // Fallback to WebApi/Interfaces when not available at runtime; this will be adjusted before write
        var targetDir = Path.Combine(repoRoot, "WebApi", "Interfaces");
        var rel = Path.GetRelativePath(targetDir, files[0]).Replace("\\", "/");
        rel = rel.EndsWith(".ts") ? rel[..^3] : rel;
        return "../" + rel;
    }

    static void GenerateIndex(string interfacesRoot)
    {
        var files = Directory.GetFiles(interfacesRoot, "*.ts", SearchOption.AllDirectories)
            .Where(f => !string.Equals(Path.GetFileName(f), "index.ts", StringComparison.OrdinalIgnoreCase))
            .OrderBy(f => f);
        var sb = new StringBuilder();
        foreach (var file in files)
        {
            var rel = Path.GetRelativePath(interfacesRoot, file).Replace("\\", "/");
            if (rel.EndsWith(".ts")) rel = rel[..^3];
            sb.Append("export * from './");
            sb.Append(rel);
            sb.AppendLine("';");
        }
        File.WriteAllText(Path.Combine(interfacesRoot, "index.ts"), sb.ToString());
    }
}