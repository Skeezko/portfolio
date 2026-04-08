import type {CommandOutput} from "../data/types";
import {help} from "./help";
import {whoami} from "./whoami";
import {projects} from "./projects";
import {skills} from "./skills";
import {ls, cd, cat, tree} from "./filecommands";
import {trySimpleCommand} from "./simplecommands";
import {sudoCheck} from "./sudo";

export function exec(input: string, cwd: string): CommandOutput {
  const trimmed = input.trim();
  if (!trimmed) return { out: "", cwd };

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (cmd) {
    case "help":     return help(cwd);
    case "whoami":   return whoami(cwd);
    case "projects": return projects(cwd);
    case "skills":   return skills(cwd);
    case "contact":  return { out: "__CONTACT__", cwd };
    case "clear":    return { out: "__CLEAR__", cwd };
    case "history":  return { out: "__HISTORY__", cwd };
    case "banner":   return { out: "__BANNER__", cwd };
    case "sudo": return sudoCheck(args, cwd);
    case "download":
      return args[0]?.toLowerCase() === "cv.pdf"
        ? { out: "__DL_CV__", cwd }
        : { out: `download what? Try: \x1bGdownload cv.pdf\x1bE\n`, cwd };
  }

  switch (cmd) {
    case "ls":   return ls(args, cwd);
    case "cd":   return cd(args, cwd);
    case "cat":  return cat(args, cwd);
    case "tree": return tree(args, cwd);
  }

  const simple = trySimpleCommand(cmd, args, cwd);
  if (simple) return simple;

  return {
    out: `\x1bRcommand not found:\x1bE ${cmd}\n  Type \x1bGhelp\x1bE for available commands\n`,
    cwd,
  };
}