import type {CommandOutput} from "../data/types";

export function skills(cwd: string): CommandOutput {
  return {
    out: `
\x1bW  LANGUAGES\x1bE     
  \x1bK─────────\x1bE         
  C                       
  Rust       
  Python     
  Bash
  SQL      
  Assembly  

  \x1bWDevOps\x1bE\x1bK:\x1bE Docker, Git/GitHub, VirtualBox

 \x1bW CYBERSECURITY TOOLS\x1bE
  \x1bK───────────────────\x1bE 
  Ghidra, GDB, Metasploit,
  Hydra, Nmap, Volatility,
  Wireshark, OpenStego, Exiftool
  Fcrackzip, Hashcat, John the Ripper
  Burp Suite, SQLMap, Gobuster
  SecLists, CyberChef 

  \x1bY→ cat ~/skills/cybersecurity.txt\x1bE  for full tool breakdown`,
    cwd,
  };
}