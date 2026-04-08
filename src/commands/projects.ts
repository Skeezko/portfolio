import type {CommandOutput} from "../data/types";

export function projects(cwd: string): CommandOutput {
  return {
    out: `
\x1bW  PROJECT                           TYPE            STATUS\x1bE
\x1bK ───────────────────────────────── ─────────────── ──────────\x1bE
  Secure Vault (Rust PWD Manager)   \x1bOPersonal\x1bE        \x1bG● Done\x1bE
  Railwash (C Data Cleaning Pipe)   \x1bOPersonal\x1bE        \x1bG● Done\x1bE
  Cybersecurity Training / CTFs     \x1bPTraining\x1bE        \x1bB◐ Active\x1bE

  \x1bY→ cat ~/projects/secure-vault/README.md\x1bE
  \x1bY→ cat ~/projects/railwash/README.md\x1bE
  \x1bY→ cat ~/projects/cybersecurity-training/README.md\x1bE`,
    cwd,
  };
}