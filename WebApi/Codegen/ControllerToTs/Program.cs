using System.Text;
using System.Text.RegularExpressions;

class Program
{
    static readonly Regex ControllerRegex = new(@"class\s+(?<name>\w+)Controller", RegexOptions.Compiled);
    static readonly Regex AttrRegex = new(@"\[\s*Http(?<verb>Get|Post|Put|Delete)\s*(\(\s*""(?<route>[^""]*)""\s*\))?\s*\]", RegexOptions.Compiled);
    static readonly Regex MethodTaskActionApi = new(@"public\s+(?:async\s+)?Task<\s*ActionResult<\s*ApiResponse<\s*(?<ret>[A-Za-z0-9_<>\s,\?]+?)\s*>\s*>\s*>\s*(?<method>\w+)\s*\((?<params>[^)]*)\)", RegexOptions.Compiled);
    static readonly Regex MethodActionApi = new(@"public\s+(?:async\s+)?ActionResult<\s*ApiResponse<\s*(?<ret>[A-Za-z0-9_<>\s,\?]+?)\s*>\s*>\s*(?<method>\w+)\s*\((?<params>[^)]*)\)", RegexOptions.Compiled);
    static readonly Regex MethodTaskApi = new(@"public\s+(?:async\s+)?Task<\s*ApiResponse<\s*(?<ret>[A-Za-z0-9_<>\s,\?]+?)\s*>\s*>\s*(?<method>\w+)\s*\((?<params>[^)]*)\)", RegexOptions.Compiled);
    static readonly Regex MethodApi = new(@"public\s+(?:async\s+)?ApiResponse<\s*(?<ret>[A-Za-z0-9_<>\s,\?]+?)\s*>\s*(?<method>\w+)\s*\((?<params>[^)]*)\)", RegexOptions.Compiled);
    static readonly Regex MethodTaskIActionResult = new(@"public\s+(?:async\s+)?Task<\s*IActionResult\s*>\s*(?<method>\w+)\s*\((?<params>[^)]*)\)", RegexOptions.Compiled);
    static readonly Regex MethodIActionResult = new(@"public\s+(?:async\s+)?IActionResult\s*(?<method>\w+)\s*\((?<params>[^)]*)\)", RegexOptions.Compiled);

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
        { "DateTime", "Date" },
        { "TimeSpan", "string" }
    };

    static int Main(string[] args)
    {
        var repoRoot = FindRepoRoot();
        var controllersRoot = Path.Combine(repoRoot, "Controllers");
        var outRoot = Path.Combine(repoRoot, "WebApi", "Services");
        Directory.CreateDirectory(outRoot);

        var controllerFiles = Directory.GetFiles(controllersRoot, "*.cs", SearchOption.AllDirectories);
        foreach (var file in controllerFiles)
        {
            var text = File.ReadAllText(file);
            var cm = ControllerRegex.Match(text);
            if (!cm.Success) continue;
            var name = cm.Groups["name"].Value.Trim();
            var relPath = Path.GetRelativePath(controllersRoot, file);
            var relDir = Path.GetDirectoryName(relPath) ?? string.Empty;
            var outDir = Path.Combine(outRoot, relDir);
            Directory.CreateDirectory(outDir);

            var sb = new StringBuilder();
            sb.AppendLine("import axios from 'axios';");
            var helperPath = ToRelativeImport(outDir, Path.Combine(repoRoot, "WebApi", "ApiResponseErrorHelper.ts"));
            var baseUrlPath = ToRelativeImport(outDir, Path.Combine(repoRoot, "WebApi", "baseUrl.ts"));
            var apiRespPath = ToRelativeImport(outDir, Path.Combine(repoRoot, "WebApi", "ApiResponse.ts"));
            var ifaceIndexPath = ToRelativeImport(outDir, Path.Combine(repoRoot, "WebApi", "Interfaces", "index.ts"));
            sb.AppendLine($"import {{ ApiResponseErrorHelper }} from '{helperPath}';");
            sb.AppendLine($"import {{ API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken }} from '{baseUrlPath}';");
            sb.AppendLine($"import type {{ ApiResponse, PagedResponse }} from '{apiRespPath}';");
            sb.AppendLine($"import type {{ I{name}Service }} from '{ifaceIndexPath}';");
            var typeImports = new HashSet<string>();
            sb.AppendLine();
            sb.AppendLine("const api = axios.create({");
            sb.AppendLine($"  baseURL: API_BASE_URL + \"/{name}\",");
            sb.AppendLine("  timeout: DEFAULT_TIMEOUT,");
            sb.AppendLine("  headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },");
            sb.AppendLine("});");
            sb.AppendLine();
            sb.AppendLine("api.interceptors.request.use((config : any) => { const token = getAuthToken(); if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; });");
            sb.AppendLine();
            sb.AppendLine($"export class {name}Service implements I{name}Service {{");

            var methods = GetMethodMatches(text).ToList();
            Console.WriteLine($"[ControllerToTs] {name}: methods matched = {methods.Count}");
            foreach (var dm in methods) Console.WriteLine($" - {dm.Groups["method"].Value} ret={dm.Groups["ret"].Value.Trim()}");
            for (int i = 0; i < methods.Count; i++)
            {
                var mm = methods[i];
                var methodName = mm.Groups["method"].Value;
                var retRaw = mm.Groups["ret"].Success ? mm.Groups["ret"].Value.Trim() : string.Empty;
                var parms = ParseParams(mm.Groups["params"].Value);
                foreach (var p in parms)
                {
                    var baseType = p.tsType.EndsWith("[]") ? p.tsType[..^2] : p.tsType;
                    if (IsCustomTsType(baseType)) typeImports.Add(baseType);
                }

                var preceding = text.Substring(0, mm.Index);
                var attr = AttrRegex.Matches(preceding).Cast<Match>().LastOrDefault();
                if (attr == null) continue;
                var verb = attr.Groups["verb"].Value;
                var route = attr.Groups["route"].Success ? attr.Groups["route"].Value : string.Empty;

                var bodyStart = mm.Index;
                var bodyEnd = (i + 1 < methods.Count) ? methods[i + 1].Index : text.Length;
                var serviceCall = ExtractServiceCallName(text, bodyStart, bodyEnd);
                if (string.IsNullOrEmpty(retRaw))
                {
                    var resolvedRet = ResolveReturnTypeFromInterface(name, serviceCall, relDir);
                    retRaw = string.IsNullOrWhiteSpace(resolvedRet) ? "any" : resolvedRet.Trim();
                }
                var retTs = MapReturnType(retRaw, typeImports);
                var tsMethodName = !string.IsNullOrEmpty(serviceCall)
                    ? char.ToLowerInvariant(serviceCall[0]) + serviceCall.Substring(1)
                    : char.ToLowerInvariant(methodName[0]) + methodName.Substring(1);
                var tsParamsSig = string.Join(", ", parms.Select(p => $"{p.name}: {p.tsType}"));
                var pathTs = string.IsNullOrEmpty(route) ? string.Empty : Regex.Replace(route, @"\{([^\}:]+)(:[^\}]*)?\}", m => "${" + m.Groups[1].Value + "}");
                var pathLiteral = string.IsNullOrEmpty(pathTs) ? "''" : $"`/{pathTs}`";
                var queryParams = parms.Where(p => p.isQuery).ToList();
                var queryConfig = queryParams.Count > 0 ? ", { params: { " + string.Join(", ", queryParams.Select(p => $"{p.name}: {p.name}")) + " } }" : string.Empty;
                var bodyArg = parms.FirstOrDefault(p => p.isBody);
                var bodyName = bodyArg.name ?? "payload";

                sb.Append("  async ");
                sb.Append(tsMethodName);
                sb.Append("(");
                sb.Append(tsParamsSig);
                sb.Append($"): Promise<ApiResponse<{retTs}>> {{\n    try {{\n      ");

                if (verb == "Get")
                {
                    sb.Append($"const response = await api.get<ApiResponse<{retTs}>>({pathLiteral}{queryConfig});");
                }
                else if (verb == "Post")
                {
                    if (bodyArg.name == null)
                        sb.Append($"const response = await api.post<ApiResponse<{retTs}>>({pathLiteral}{queryConfig});");
                    else
                        sb.Append($"const response = await api.post<ApiResponse<{retTs}>>({pathLiteral}, {bodyName}{queryConfig});");
                }
                else if (verb == "Put")
                {
                    if (bodyArg.name == null)
                        sb.Append($"const response = await api.put<ApiResponse<{retTs}>>({pathLiteral}{queryConfig});");
                    else
                        sb.Append($"const response = await api.put<ApiResponse<{retTs}>>({pathLiteral}, {bodyName}{queryConfig});");
                }
                else if (verb == "Delete")
                {
                    sb.Append($"const response = await api.delete<ApiResponse<{retTs}>>({pathLiteral}{queryConfig});");
                }

                sb.Append($"\n      return response.data;\n    }} catch (error) {{\n      return ApiResponseErrorHelper.create<{retTs}>(error);\n    }}\n  }}\n\n");
            }

            var typeList = typeImports.Where(t => !string.IsNullOrWhiteSpace(t)).OrderBy(t => t).ToList();
            if (typeList.Count > 0)
            {
                var indexTs = Path.Combine(repoRoot, "WebApi", "Models", "index.ts");
                var rel = ToRelativeImport(outDir, indexTs);
                var typesJoined = string.Join(", ", typeList);
                sb.Insert(0, $"import type {{ {typesJoined} }} from '{rel}';\n");
            }

            sb.AppendLine("}");

            var outPath = Path.Combine(outDir, name + "Service.ts");
            File.WriteAllText(outPath, sb.ToString());
        }

        return 0;
    }

    static string FindRepoRoot()
    {
        var cwd = Directory.GetCurrentDirectory();
        var repoRoot = Path.GetFullPath(Path.Combine(cwd, "..", "..", ".."));
        if (Directory.Exists(Path.Combine(repoRoot, "Controllers")) && Directory.Exists(Path.Combine(repoRoot, "WebApi")))
        {
            return repoRoot;
        }
        return cwd;
    }

    static IEnumerable<Match> GetMethodMatches(string text)
    {
        foreach (Match m in MethodTaskActionApi.Matches(text)) yield return m;
        foreach (Match m in MethodActionApi.Matches(text)) yield return m;
        foreach (Match m in MethodTaskApi.Matches(text)) yield return m;
        foreach (Match m in MethodApi.Matches(text)) yield return m;
        foreach (Match m in MethodTaskIActionResult.Matches(text)) yield return m;
        foreach (Match m in MethodIActionResult.Matches(text)) yield return m;
    }

    static string ExtractServiceCallName(string text, int startIndex, int endIndex)
    {
        if (startIndex < 0) startIndex = 0;
        if (endIndex > text.Length) endIndex = text.Length;
        if (endIndex <= startIndex) return string.Empty;
        var segment = text.Substring(startIndex, endIndex - startIndex);
        var m = Regex.Match(segment, @"(?:_service|[A-Za-z_]\w*Service)\s*\.\s*(?<call>\w+)Async\b");
        if (m.Success)
        {
            var call = m.Groups["call"].Value;
            if (call.EndsWith("Async")) call = call[..^5];
            return call;
        }
        return string.Empty;
    }

    static string ResolveReturnTypeFromInterface(string controllerName, string serviceCall, string relDir)
    {
        try
        {
            var repoRoot = Directory.GetCurrentDirectory();
            var interfacesRelDir = relDir.Replace("Controllers", "Interfaces");
            var ifacePath = Path.Combine(repoRoot, "Interfaces", interfacesRelDir ?? string.Empty, $"I{controllerName}Service.cs");
            if (!File.Exists(ifacePath))
            {
                var candidates = Directory.GetFiles(Path.Combine(repoRoot, "Interfaces"), $"I{controllerName}Service.cs", SearchOption.AllDirectories);
                if (candidates.Length == 0) return string.Empty;
                ifacePath = candidates[0];
            }
            var text = File.ReadAllText(ifacePath);
            if (string.IsNullOrWhiteSpace(serviceCall)) return string.Empty;
            var pattern = $@"Task<\s*ApiResponse<\s*(?<ret>[A-Za-z0-9_<>\s,\?]+)\s*>\s*>\s*{Regex.Escape(serviceCall)}Async\s*\(";
            var m = Regex.Match(text, pattern);
            if (m.Success) return m.Groups["ret"].Value.Trim();
        }
        catch { }
        return string.Empty;
    }

    static List<(string name, string tsType, bool isBody, bool isQuery)> ParseParams(string paramSig)
    {
        var list = new List<(string, string, bool, bool)>();
        foreach (var raw in paramSig.Split(',', StringSplitOptions.RemoveEmptyEntries))
        {
            var p = raw.Trim();
            p = Regex.Replace(p, @"\[[^\]]*\]", "").Trim();
            p = Regex.Replace(p, @"=\s*[^,]+", "").Trim();
            if (string.IsNullOrWhiteSpace(p)) continue;
            var parts = p.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            if (parts.Length < 2) continue;
            var type = parts[parts.Length - 2].Trim();
            var name = parts[parts.Length - 1].Trim();
            var tsType = MapType(type);
            var isBody = raw.Contains("FromBody");
            var isQuery = raw.Contains("FromQuery");
            list.Add((name, tsType, isBody, isQuery));
        }
        return list;
    }

    static string MapType(string csType)
    {
        csType = csType.TrimEnd('?');
        if (TypeMap.TryGetValue(csType, out var mapped)) return mapped;
        var listMatch = Regex.Match(csType, @"^(List|IEnumerable|ICollection)<(.+)>$");
        if (listMatch.Success) return MapType(listMatch.Groups[2].Value) + "[]";
        return csType;
    }

    static string MapReturnType(string retRaw, HashSet<string> imports)
    {
        retRaw = retRaw.Trim();
        var match = Regex.Match(retRaw, @"^(IEnumerable|List|ICollection)<\s*(.+)\s*>$");
        if (match.Success)
        {
            var inner = match.Groups[2].Value.Trim().TrimEnd('?');
            var innerTs = MapType(inner);
            if (!TypeMap.ContainsKey(inner)) imports.Add(innerTs);
            return innerTs + "[]";
        }

        var paged = Regex.Match(retRaw, @"^PagedResponse<\s*(.+)\s*>$");
        if (paged.Success)
        {
            var inner = paged.Groups[1].Value.Trim().TrimEnd('?');
            var innerTs = MapType(inner);
            if (!TypeMap.ContainsKey(inner)) imports.Add(innerTs);
            return $"PagedResponse<{innerTs}>";
        }

        if (retRaw.EndsWith("?")) retRaw = retRaw.TrimEnd('?');
        var baseTs = MapType(retRaw);
        if (IsCustomTsType(baseTs)) imports.Add(baseTs);
        return baseTs;
    }

    static string ResolveModelImportPath(string typeName)
    {
        var repoRoot = Directory.GetCurrentDirectory();
        var modelsRoot = Path.Combine(repoRoot, "WebApi", "Models");
        var files = Directory.GetFiles(modelsRoot, typeName + ".ts", SearchOption.AllDirectories);
        if (files.Length == 0) return string.Empty;
        var targetDir = Path.Combine(repoRoot, "WebApi", "Services");
        var rel = Path.GetRelativePath(targetDir, files[0]).Replace("\\", "/");
        rel = rel.EndsWith(".ts") ? rel[..^3] : rel;
        return "../" + rel;
    }

    static string ToRelativeImport(string fromDir, string absoluteTsFile)
    {
        var rel = Path.GetRelativePath(fromDir, absoluteTsFile).Replace("\\", "/");
        if (rel.EndsWith(".ts")) rel = rel[..^3];
        return rel.StartsWith(".") ? rel : "./" + rel;
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
}