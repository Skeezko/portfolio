import type {CommandOutput} from "../data/types";

const SUDO_PASSWORD_HASH = "f8e148a37bdb2287c7600b7b655e6d839b2016224400a8fe9a8c89d772497206";

export function sudoCheck(args: string[], cwd: string): CommandOutput {

  const fullCmd = args.join(" ");
  const isDangerous =
    fullCmd.includes("rm") &&
    fullCmd.includes("-rf") &&
    (fullCmd.includes("/*") || fullCmd.includes("--no-preserve-root") && fullCmd.includes("/"));

  if (!isDangerous) {
    return {
      out: `  \x1bR[sudo]\x1bE This command isn't available. At least, I hope so...`,
      cwd,
    };
  }
  return {
    out: "__SUDO_PASSWORD__",
    cwd,
  };
}

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function verifySudoPassword(password: string): Promise<boolean> {
    const hash = await sha256(password);
    return hash === SUDO_PASSWORD_HASH;
}