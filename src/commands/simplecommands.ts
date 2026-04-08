import type {CommandOutput} from "../data/types";

const SIMPLE: Record<string, (args: string[], cwd: string) => CommandOutput> = {
  pwd: (_args, cwd) => ({ out: `${cwd}`, cwd }),
  date: (_args, cwd) => ({ out: `${new Date().toString()}`, cwd }),
  id: (_args, cwd) => ({
    out: `uid=1000(\x1bGhesham\x1bE) gid=1000(\x1bGhesham\x1bE) groups=1000(hesham),27(sudo)`,
    cwd,
  }),
  hostname: (_args, cwd) => ({ out: `hesham-portfolio`, cwd }),
  uname: (_args, cwd) => ({
    out: `Linux`,
    cwd,
  }),
  echo: (args, cwd) => ({ out: `${args.join(" ")}`, cwd }),
  rm: (_args, cwd) => ({
    out: `\x1bR[denied]\x1bE You can't delete me mwahaha`,
    cwd,
  }),
  exit: (_args, cwd) => ({
    out: `Thanks for visiting! Type \x1bGcontact\x1bE before you go`,
    cwd,
  }),
  quit: (_args, cwd) => ({
    out: `Thanks for visiting! Type \x1bGcontact\x1bE before you go`,
    cwd,
  }),
};

export function trySimpleCommand(
  cmd: string,
  args: string[],
  cwd: string
): CommandOutput | null {
  const handler = SIMPLE[cmd];
  return handler ? handler(args, cwd) : null;
}