import type {CommandOutput} from "../data/types";

export function help(cwd: string): CommandOutput {
  return {
    out: `
\x1bW  ╔══════════════════════════════════════════════════════════════╗
  ║                  WELCOME TO MY PORTFOLIO !                   ║
  ║    This is an interactive terminal. You type commands        ║
  ║    and I show you information — like a website, but cooler.  ║
  ╚══════════════════════════════════════════════════════════════╝\x1bE

  \x1bW   START HERE — just type one of these and press Enter:\x1bE
  \x1bK  ──────────────────────────────────────────────────────\x1bE
  \x1bG  whoami\x1bE           →  A quick intro about me
  \x1bG  projects\x1bE         →  All my projects in a neat table
  \x1bG  skills\x1bE           →  My technical skills
  \x1bG  contact\x1bE          →  Open a form to send me a message
  \x1bG  download cv.pdf\x1bE  →  Download my CV as a PDF file

  \x1bW   BROWSE MY FILES — think of it like opening folders:\x1bE
  \x1bK  ──────────────────────────────────────────────────────\x1bE
  \x1bG  ls\x1bE               →  Show what's in the current folder
  \x1bG  cd\x1bE               →  Go inside the "projects" folder
  \x1bG  cd\x1bE               →  Go back up one folder
  \x1bG  cat\x1bE              →  Read a file (like opening a document)
  \x1bG  tree\x1bE             →  See all folders as a visual tree

  \x1bW   OTHER COMMANDS:\x1bE
  \x1bK  ──────────────────────────────────────────────────────\x1bE
  \x1bG  clear\x1bE            →  Clean the screen
  \x1bG  history\x1bE          →  See your previous commands

  \x1bW    KEYBOARD SHORTCUTS:\x1bE
  \x1bK  ──────────────────────────────────────────────────────\x1bE
  \x1bY  Tab\x1bE              →  Auto-complete file and folder names
  \x1bY  ↑ ↓\x1bE              →  Browse your previous commands
  \x1bY  Ctrl+L\x1bE           →  Clear the screen
  \x1bY  Ctrl+C\x1bE           →  Cancel current input
`,
    cwd,
  };
}