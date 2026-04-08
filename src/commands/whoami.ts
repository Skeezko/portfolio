import type {CommandOutput} from "../data/types";

export function whoami(cwd: string): CommandOutput {
  return {
    out: `\x1bK  ┌─────────────────────────────────────────────────────────┐
  │               Hesham CHAUDHRY — Skeezko                 │
  └─────────────────────────────────────────────────────────┘\x1bE
    \x1bRCybersecurity\x1bE
    EPITECH Paris — Bachelor CS (2025-2028)

    CTF PoC Innovation \x1bGWinner\x1bE · TryHackMe · Root-Me
    Seeking 1-3 month internship in security

    \x1bG→\x1bE \x1bGprojects\x1bE        see my work  \x1bG→\x1bE \x1bGskills\x1bE   tech breakdown
    \x1bG→\x1bE \x1bGcat about.txt\x1bE   full bio     \x1bG→\x1bE \x1bGcontact\x1bE  reach me
    \x1bG→\x1bE \x1bGdownload cv.pdf\x1bE download my resume`,
    cwd,
  };
}