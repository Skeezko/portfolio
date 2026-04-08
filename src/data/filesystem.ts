import type {DirAndFile} from "./types";

export const Home = "/home/hesham";

export const FileSystem: Record<string, DirAndFile> = {
  "/": { type: "dir", subdir: ["home", "etc"] },
  "/etc": {type: "dir", subdir: ["shadow"]},
  "/home": { type: "dir", subdir: ["hesham"] },
  "/home/hesham": {
    type: "dir",
    subdir: [
      "projects",
      "skills",
      "about.txt",
      "contact.txt",
      "cv.pdf",
      "learning",
      "experience",
      ".note"
    ],
  },

  "/home/hesham/about.txt": {
    type: "file",
    content: `\x1bK┌─────────────────────────────────────────────────────────────────────────────┐
│                          Hesham CHAUDHRY — Skeezko                          │
└─────────────────────────────────────────────────────────────────────────────┘\x1bE

  School:    EPITECH Paris — Bachelor degree (2025-2028)
  Location:  Valenton, 94460 France
  Focus:     \x1bRCybersecurity\x1bE

  First year Computer Science student at Epitech, specializing
  in Cybersecurity. Proficient in Rust, C, and Python, with 
  hands-on experience in Linux environments

  Actively practicing CTFs (TryHackMe, Root-Me) and seeking
  a 1 to 3 month internship to apply my technical skills within
  a professional security team

  Languages: \x1bGFrench\x1bE (Fluent), \x1bGEnglish\x1bE (C1), \x1bGUrdu\x1bE (Fluent), \x1bGPunjabi\x1bE (Fluent)`,
  },

  "/home/hesham/contact.txt": {
    type: "file",
    content: `\x1bK┌──────────────────────────────────────────┐
│           CONTACT INFORMATION            │
├──────────────────────────────────────────┤
│  Phone:    +33 7 69 36 52 55             │
│  Email:    chaudhryhesham@gmail.com      │
│  GitHub:\x1bE   \x1bAhttps://github.com/Skeezko\x1bE    \x1bK│
│  Location: Valenton, 94460 France        │
└──────────────────────────────────────────┘\x1bE

  → Type \x1bGcontact\x1bE to open the contact form`,
  },

  "/home/hesham/cv.pdf": {
    type: "file",
    content: `  Type \x1bGdownload cv.pdf\x1bE to download the PDF`,
  },

  "/home/hesham/projects": {
    type: "dir",
    subdir: ["secure-vault", "cybersecurity-training", "railwash"],
  },

  "/home/hesham/projects/secure-vault": {
    type: "dir",
    subdir: ["README.md"],
  },

  "/home/hesham/projects/secure-vault/README.md": {
    type: "file",
    content: `\x1bW# Secure Vault — Rust Password Manager\x1bE
\x1bK━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1bE
  Type:    \x1bOPersonal Project\x1bE
  Stack:   Rust, Iced library
  Status:  \x1bG● Completed\x1bE
  Repo:    \x1bLhttps://github.com/Skeezko/Secure-Vault\x1bE

\x1bWDescription\x1bE
  Secure desktop application for password management built
  in Rust using the Iced GUI library

\x1bWSecurity Features\x1bE
  \x1bG[✓]\x1bE AES-GCM-256 encryption
  \x1bG[✓]\x1bE Argon2 password hashing
  \x1bG[✓]\x1bE Random salting
  \x1bG[✓]\x1bE Secure data storage
  \x1bG[✓]\x1bE User authentication logic`,
  },

  "/home/hesham/projects/cybersecurity-training": {
    type: "dir",
    subdir: ["README.md"],
  },

  "/home/hesham/projects/cybersecurity-training/README.md": {
    type: "file",
    content: `\x1bW# Cybersecurity Training & CTFs\x1bE
\x1bK━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1bE
  Type:    \x1bPOngoing Training\x1bE
  Status:  \x1bB● Active\x1bE

\x1bWAchievements\x1bE
  \x1bG★\x1bE Won CTF PoC Innovation (15/02/2026)
    Solved challenges in: Reverse Engineering, Steganography,
    Cryptography, Web exploitation

\x1bWPractice\x1bE
  \x1bG[✓]\x1bE OWASP Juice Shop — SQLi, broken auth, broken access control
  \x1bG[✓]\x1bE Workshops: OSINT, Lock Picking, Forensic, Reverse Engineering
  \x1bG[✓]\x1bE CTF Platforms: Root-Me, TryHackMe contributor

\x1bWTools Mastered\x1bE
  Ghidra, GDB, Burp Suite, Hashcat, Exiftool, SecLists,
  OpenStego, Fcrackzip, Volatility, Wireshark, John the Ripper,
  Nmap, SQLMap, Metasploit, Hydra, Gobuster, CyberChef`,
  },

  "/home/hesham/projects/railwash": {
    type: "dir",
    subdir: ["README.md"],
  },

  "/home/hesham/projects/railwash/README.md": {
  type: "file",
  content: `\x1bW# Railwash — C Data Cleaning Pipeline\x1bE
\x1bK━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1bE
  Type:    \x1bOPersonal Project\x1bE
  Stack:   C (zero dependencies)
  Status:  \x1bG● Completed\x1bE
  Repo:    \x1bLhttps://github.com/Skeezko/Railwash\x1bE

\x1bWDescription\x1bE
  Zero-dependency pipeline in C to sanitize complex datasets,
  prioritizing raw memory control over high-level libraries
  like Pandas

\x1bWTechnical Highlights\x1bE
  \x1bG[✓]\x1bE Custom hashmaps with chaining and djb2 hashing
      for O(1) deduplication and journey-level aggregation
  \x1bG[✓]\x1bE Zero heap leaks (Valgrind verified) through rigorous
      manual allocation and pointer arithmetic
  \x1bG[✓]\x1bE Strict deallocation cycles — no memory left behind`,
},

  "/home/hesham/skills": {
    type: "dir",
    subdir: ["languages.txt", "cybersecurity.txt", "devops.txt"],
  },

  "/home/hesham/skills/languages.txt": {
    type: "file",
    content: `  ┌──────────────┬──────────────┐
  │   Language   │    Level     │
  ├──────────────┼──────────────┤
  │ C            │ \x1bGAdvanced\x1bE     │
  │ Rust         │ \x1bGAdvanced\x1bE     │
  │ Python       │ \x1bYProficient\x1bE   │
  │ Bash         │ \x1bOIntermediate\x1bE │
  │ SQL          │ \x1bOIntermediate\x1bE │
  │ Assembly     │ \x1bRBeginner\x1bE     │
  └──────────────┴──────────────┘`,
  },

  "/home/hesham/.note": {
    type: "file",
    content: "I'm so glad my password is well secured! It's tougher than a rock and more hidden than a shadow"},

  "/etc/shadow": {
    type: "file",
    content: "hesham:$6$SkZ3K0x1$NseBR0MHAgoMoYLJ7BbzHbNxqeTLgtEvFFM4Z1UIP4crb9V53D4iKb4zdjDOlq46QeHfOx6FOyfJiiOSNeeNq/:19873:0:99999:7:::"},

  "/home/hesham/skills/cybersecurity.txt": {
    type: "file",
    content: `  ┌────────────────────┬─────────────────────────────────────────────┐
  │  Category          │  Tools                                      │
  ├────────────────────┼─────────────────────────────────────────────┤
  │ \x1bCReverse Eng.\x1bE       │  Ghidra, GDB                                │
  │ \x1bCWeb Pentest\x1bE        │  Burp Suite, SQLMap, Gobuster               │
  │ \x1bCPassword Cracking\x1bE  │  Hashcat, John the Ripper, Fcrackzip, Hydra │
  │ \x1bCForensic\x1bE           │  Volatility, Exiftool                       │
  │ \x1bCSteganography\x1bE      │  OpenStego, Exiftool                        │
  │ \x1bCNetwork Analysis\x1bE   │  Wireshark, Nmap                            │
  │ \x1bCExploitation\x1bE       │  Metasploit                                 │
  │ \x1bCOthers\x1bE             │  SecLists, CyberChef                        │ 
  └────────────────────┴─────────────────────────────────────────────┘`,
  },

  "/home/hesham/skills/devops.txt": {
    type: "file",
    content: `  ┌──────────────┬───────────────────────────┐
  │  Tool        │  Usage                    │
  ├──────────────┼───────────────────────────┤
  │ \x1bPDocker\x1bE       │  Containerized deployment │
  │ \x1bPGit/GitHub\x1bE   │  Version control          │
  | \x1bPVirtualBox\x1bE   |  Virtual environments     |
  └──────────────┴───────────────────────────┘`,
  },

  "/home/hesham/learning": {
    type: "dir",
    subdir: ["ctf.txt", "education.txt"],
  },

  "/home/hesham/learning/ctf.txt": {
    type: "file",
    content: `  CTF Activity:

  \x1bG★\x1bE CTF PoC Innovation — \x1bGWinner\x1bE (15/02/2026)
    Reverse Engineering, Steganography, Cryptography, Web

  \x1bB→\x1bE TryHackMe — Active contributor
  \x1bB→\x1bE Root-Me — Active participant

  \x1bWWorkshops Attended:\x1bE
  \x1bG[✓]\x1bE OSINT
  \x1bG[✓]\x1bE Lock Picking
  \x1bG[✓]\x1bE Forensic Analysis
  \x1bG[✓]\x1bE Reverse Engineering`,
  },

  "/home/hesham/learning/education.txt": {
    type: "file",
    content: `  Education:

  \x1bK2025-2028\x1bE  EPITECH Paris — Bachelor degree
  \x1bK2025\x1bE       École 42 Paris — C Pool

  \x1bYOngoing:\x1bE
  → TryHackMe rooms
  → Root-Me challenges`,
  },

  "/home/hesham/experience": {
    type: "dir",
    subdir: ["work.txt"],
  },

  "/home/hesham/experience/work.txt": {
    type: "file",
    content: `  Work Experience:

  \x1bP2025\x1bE — Sales Assistant at \x1bBQuincaillerie Souchet\x1bE
    Developed strong communication and problem-solving
    skills in a fast-paced environment

  \x1bP2024\x1bE — Administrative Assistant at \x1bBZKY\x1bE
    Ensured high levels of accuracy and attention to
    detail in financial records`,
  },
};