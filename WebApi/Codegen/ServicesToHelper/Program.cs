using System.Text;
using System.Text.RegularExpressions;

class Program
{
    static int Main(string[] args)
    {
        var repoRoot = Directory.GetCurrentDirectory();
        var servicesRoot = Path.Combine(repoRoot, "WebApi", "Services");
        var helperRoot = Path.Combine(repoRoot, "WebApi", "Helper");
        Directory.CreateDirectory(helperRoot);

        var serviceFiles = Directory.GetFiles(servicesRoot, "*Service.ts", SearchOption.AllDirectories);
        var exportedHelpers = new List<string>();

        foreach (var file in serviceFiles)
        {
            var text = File.ReadAllText(file);
            var classMatch = Regex.Match(text, @"export\s+class\s+(?<cls>\w+)");
            var className = classMatch.Success ? classMatch.Groups["cls"].Value.Trim() : Path.GetFileNameWithoutExtension(file);
            var helperName = className.EndsWith("Service") ? className[..^7] + "Helper" : className + "Helper";

            var rel = Path.GetRelativePath(helperRoot, file).Replace("\\", "/");
            if (rel.EndsWith(".ts")) rel = rel[..^3];
            if (!rel.StartsWith(".")) rel = "./" + rel;

            var sb = new StringBuilder();
            sb.Append("import { ");
            sb.Append(className);
            sb.Append(" } from '");
            sb.Append(rel);
            sb.AppendLine("';");
            sb.AppendLine();
            sb.Append("export const ");
            sb.Append(helperName);
            sb.Append(" = new ");
            sb.Append(className);
            sb.AppendLine("();");

            var outPath = Path.Combine(helperRoot, helperName + ".ts");
            File.WriteAllText(outPath, sb.ToString());
            exportedHelpers.Add(helperName);
        }

        var indexPath = Path.Combine(helperRoot, "index.ts");
        var indexSb = new StringBuilder();
        foreach (var hp in Directory.GetFiles(helperRoot, "*Helper.ts", SearchOption.TopDirectoryOnly))
        {
            var name = Path.GetFileNameWithoutExtension(hp);
            indexSb.Append("export { ");
            indexSb.Append(name);
            indexSb.Append(" } from './");
            indexSb.Append(name);
            indexSb.AppendLine("';");
        }
        File.WriteAllText(indexPath, indexSb.ToString());
        return 0;
    }
}