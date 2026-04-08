import {FileSystem, Home} from "../data/filesystem";
import {resolvePath} from "./resolvepath";

const ALL_COMMANDS = [
  "help", "ls", "cd", "cat", "pwd", "tree",
  "whoami", "skills", "projects", "contact",
  "clear", "history", "banner",
  "download", "date", "echo", "uname", "hostname", "id",
];

export function tabComplete(input: string, cwd: string): string | null {
  const parts = input.split(/\s+/);

  if (parts.length <= 1) {
    const matches = ALL_COMMANDS.filter((c) => c.startsWith(parts[0]));
    return matches.length === 1 ? matches[0] + " " : null;
  }

  if (parts[0] === "download") {
    return "cv.pdf".startsWith(parts[1] || "") ? "download cv.pdf" : null;
  }

  const partial = parts[parts.length - 1].replace(/~/g, Home);
  const lastSlash = partial.lastIndexOf("/");

  const dirPath = lastSlash >= 0
    ? resolvePath(cwd, partial.substring(0, lastSlash) || "/")
    : cwd;
  const prefix = lastSlash >= 0
    ? partial.substring(lastSlash + 1)
    : partial;

  const node = FileSystem[dirPath];
  if (!node?.subdir) return null;

  const matches = node.subdir.filter((s) =>
    s.toLowerCase().startsWith(prefix.toLowerCase())
  );

  if (matches.length !== 1) return null;

  const match = matches[0];
  const fullPath = dirPath === "/" ? `/${match}` : `${dirPath}/${match}`;
  const isDir = FileSystem[fullPath]?.type === "dir";

  const base = lastSlash >= 0
    ? parts[parts.length - 1].substring(0, parts[parts.length - 1].lastIndexOf("/") + 1)
    : "";

  return [...parts.slice(0, -1), base + match + (isDir ? "/" : "")].join(" ");
}
