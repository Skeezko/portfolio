import {Home} from "../data/filesystem";

export function resolvePath(cwd: string, input: string): string {

  if (!input) return cwd;
  const expanded = input.replace(/~/g, Home);
  const parts = expanded.startsWith("/")
    ? expanded.split("/").filter(Boolean)
    : [...cwd.split("/").filter(Boolean), ...expanded.split("/").filter(Boolean)];

  const resolved: string[] = [];
  for (const part of parts) {
    if (part === ".") continue;
    if (part === "..") {
      resolved.pop();
      continue;
    }
    resolved.push(part);
  }

  return "/" + resolved.join("/") || "/";
}
