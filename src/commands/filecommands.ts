import type {CommandOutput} from "../data/types";
import {FileSystem, Home} from "../data/filesystem";
import {resolvePath} from "../utils/resolvepath";

export function ls(args: string[], cwd: string): CommandOutput {
  const showHidden = args.includes("-a")
  const path = args.find((a) => !a.startsWith("-"));
  const target = resolvePath(cwd, path? path.replace(/~/g, Home) : cwd);
  const found = FileSystem[target];

  if (!found) return { out: `ls: cannot access '${path || "."}': No such file or directory`, cwd };
  if (found.type === "file") return { out: `${target.split("/").pop()}`, cwd };

  let subdir = found.subdir || [];
  if (!showHidden) subdir = subdir.filter((s) => !s.startsWith("."));

  const entries = subdir.map((s) => {
    const full = target === "/" ? `/${s}` : `${target}/${s}`;
    return FileSystem[full]?.type === "dir" ? `\x1bD${s}/\x1bE` : s;
  });

  return { out: `${entries.join("   ")}`, cwd };
}

export function cd(args: string[], cwd: string): CommandOutput {
  if (!args[0] || args[0] === "~") return { out: "", cwd: Home };

  const target = resolvePath(cwd, args[0].replace(/~/g, Home));
  const found = FileSystem[target];

  if (!found) return { out: `cd: no such file or directory: ${args[0]}`, cwd };
  if (found.type !== "dir") return { out: `cd: not a directory: ${args[0]}`, cwd };

  return { out: "", cwd: target };
}

export function cat(args: string[], cwd: string): CommandOutput {
  if (!args[0]) return { out: `cat: no file given`, cwd };

  const target = resolvePath(cwd, args[0].replace(/~/g, Home));
  const found = FileSystem[target];

  if (!found) return { out: `cat: ${args[0]}: No such file or directory`, cwd };
  if (found.type === "dir") return { out: `cat: ${args[0]}: Is a directory`, cwd };

  return { out: found.content || "", cwd };
}

export function tree(args: string[], cwd: string): CommandOutput {
  const target = resolvePath(cwd, args[0] ? args[0].replace(/~/g, Home) : cwd);
  const found = FileSystem[target];

  if (!found || found.type !== "dir") return { out: `${args[0]}: [error opening dir]`, cwd };

  function buildTree(path: string, prefix: string): string[] {
    const f = FileSystem[path];
    if (!f?.subdir) return [];

    const lines: string[] = [];
    const subdir = f.subdir.filter((s) => !s.startsWith("."));

    subdir.forEach((s, i) => {
      const isLast = i === subdir.length - 1;
      const connector = isLast ? "└── " : "├── ";
      const full = path === "/" ? `/${s}` : `${path}/${s}`;

      if (FileSystem[full]?.type === "dir") {
        lines.push(`${prefix}${connector}\x1bD${s}/\x1bE`);
        lines.push(...buildTree(full, prefix + (isLast ? "    " : "│   ")));
      } else {
        lines.push(`${prefix}${connector}${s}`);
      }
    });

    return lines;
  }

  const name = target.split("/").pop() || "/";
  if (name === "/"){
    return {
      out: [`\x1bD /\x1bE`, ...buildTree(target, "  ")].join("\n"),
      cwd,
    };
  }
  return {
    out: [`\x1bD${name}/\x1bE`, ...buildTree(target, "  ")].join("\n"),
    cwd,
  };
}