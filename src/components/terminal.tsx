import { useState, useEffect, useRef, useCallback } from "react";
import type { FC, KeyboardEvent, ChangeEvent } from "react";
import type {Line} from "../data/types";
import {renderStyled} from "../data/colors";
import {Home} from "../data/filesystem";
import {exec} from "../commands";
import {tabComplete} from "../utils/tabcompletion";
import {PromptLine1, PromptLine2} from "./prompt";
import ContactForm from "./contactform";
import "../styles/terminal.css";
import {verifySudoPassword} from "../commands/sudo";

const BANNER = `\x1bK  ██╗  ██╗███████╗███████╗██╗  ██╗ █████╗ ███╗   ███╗
  ██║  ██║██╔════╝██╔════╝██║  ██║██╔══██╗████╗ ████║
  ███████║█████╗  ███████╗███████║███████║██╔████╔██║
  ██╔══██║██╔══╝  ╚════██║██╔══██║██╔══██║██║╚██╔╝██║
  ██║  ██║███████╗███████║██║  ██║██║  ██║██║ ╚═╝ ██║
  ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝\x1bE`;

const Terminal: FC = () => {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [cursorPos, setCursorPos] = useState(0);
  const [cwd, setCwd] = useState(Home);
  const [hist, setHist] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const [showContact, setShowContact] = useState(false);
  const [sudoMode, setSudoMode] = useState(false);
  const [sudoCmd, setSudoCmd] = useState("");
  const [destroying, setDestroying] = useState(false);
  const [destroyed, setDestroyed] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLines([
      { type: "sys", text: "  [kernel] portfolio loaded — pid 1" },
      { type: "sys", text: "  [kernel] filesystem mounted" },
      { type: "sys", text: "  [kernel] kali-shell v1.0 ready" },
      { type: "out", text: "\n" },
      { type: "out", text: BANNER },
      { type: "out", text: "\n" },  
      { type: "out", text: "         EPITECH Paris — Bachelor (2025-2028)" },
      { type: "out", text: "                   \x1bRCybersecurity\x1bE "},
      { type: "out", text: "        \x1bYNew here? Type help to see all commands\x1bE" },
      { type: "out", text: "\n" },
    ]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [lines]);

  useEffect(() => {
    if (!showContact) inputRef.current?.focus();
  }, [lines, showContact]);

  const displayDir = useCallback(
    () => (cwd === Home ? "~" : cwd.replace(Home, "~")),
    [cwd]
  );

  const downloadCV = useCallback(() => {
    const link = document.createElement("a");
    link.href = "/portfolio/Hesham_CHAUDHRY_cv.pdf";
    link.download = "Hesham_CHAUDHRY_cv.pdf";
    link.click();
  }, []); 
  
  const submit = useCallback(() => {
    const cmd = input.trim();
    const promptLine: Line = { type: "cmd", cwd: displayDir(), text: cmd };

    if (cmd) setHist((h) => [cmd, ...h]);
    setHIdx(-1);

    const result = exec(cmd, cwd);

    if (result.out === "__CLEAR__") {
      setLines([]);
      setInput("");
      setCursorPos(0);
      setCwd(result.cwd);
      return;
    }

    if (result.out === "__CONTACT__") {
      setLines((l) => [...l, promptLine]);
      setShowContact(true);
      setInput("");
      setCursorPos(0);
      return;
    }

    if (result.out === "__BANNER__") {
      setLines((l) => [...l, promptLine, { type: "out", text: BANNER }]);
      setInput("");
      setCursorPos(0);
      return;
    }

    if (result.out === "__DL_CV__") {
      setLines((l) => [...l, promptLine, { type: "out", text: "  \x1bG[✓]\x1bE Hesham_CHAUDHRY_cv.pdf" }]);
      setInput("");
      setCursorPos(0);
      setTimeout(downloadCV, 600);
      fetch("/api/download", {method: "POST"}).catch(() => {});
      setCwd(result.cwd);
      return;
    }

    if (result.out === "__SUDO_PASSWORD__") {
      setLines((l) => [...l, promptLine]);
      setSudoMode(true);
      setSudoCmd(input);
      setInput("");
      setCursorPos(0);
      return;
    }

    if (result.out === "__HISTORY__") {
      const histText = hist
        .slice()
        .reverse()
        .map((h, i) => `  ${String(i + 1).padStart(4)}  ${h}`)
        .join("\n") || "  No history yet";
      setLines((l) => [...l, promptLine, { type: "out", text: histText }]);
      setInput("");
      setCursorPos(0);
      return;
    }
    

    const newLines: Line[] = [promptLine];
    if (result.out) newLines.push({ type: "out", text: result.out });
    setLines((l) => [...l, ...newLines]);
    setCwd(result.cwd);
    setInput("");
    setCursorPos(0);
  }, [input, cwd, hist, displayDir, downloadCV]);

  const submitSudoPassword = useCallback( async () => {
    sudoCmd;
    const password = input;
    setInput("");
    setCursorPos(0);
    setSudoMode(false);

    const isCorrect = await verifySudoPassword(password);

    if (!isCorrect) {
      setLines((l) => [...l,
        { type: "out", text: "  [sudo] password for hesham:\n  \x1bR[sudo]\x1bE Nice try but my password is too strong and well hidden" },
      ]);
      return;
    }

    fetch("/api/nuke", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({command: sudoCmd})
    }).catch(() => {});

    setDestroying(true);

    const destroySequence = [
      "",
      " \x1bG[sudo]\x1bE authenticated",
      "",
      "  rm: removing '/bin/bash'",
      "  rm: removing '/bin/sh'",
      "  rm: removing '/bin/ls'",
      "  rm: removing '/bin/cat'",
      "  rm: removing '/bin/cp'",
      "  rm: removing '/bin/mv'",
      "  rm: removing '/bin/rm'",
      "  rm: removing '/bin/chmod'",
      "  rm: removing '/bin/chown'",
      "  rm: removing '/bin/grep'",
      "  rm: removing '/bin/find'",
      "  rm: removing '/bin/mount'",
      "  rm: removing '/bin/umount'",
      "  rm: removing '/bin/ping'",
      "  rm: removing '/bin/ps'",
      "  rm: removing '/bin/kill'",
      "  rm: removing '/boot/vmlinuz-6.8.0-hesham'",
      "  rm: removing '/boot/vmlinuz-6.8.0-hesham.old'",
      "  rm: removing '/boot/initrd.img-6.8.0-hesham'",
      "  rm: removing '/boot/grub/grub.cfg'",
      "  rm: removing '/boot/grub/fonts/unicode.pf2'",
      "  rm: removing '/boot/efi/EFI/kali/grubx64.efi'",
      "  rm: removing '/boot/System.map-6.8.0-hesham'",
      "  rm: removing '/boot/config-6.8.0-hesham'",
      "  rm: removing '/dev/sda'",
      "  rm: removing '/dev/sda1'",
      "  rm: removing '/dev/sda2'",
      "  rm: removing '/dev/null'",
      "  rm: removing '/dev/zero'",
      "  rm: removing '/dev/random'",
      "  rm: removing '/dev/urandom'",
      "  rm: removing '/dev/tty'",
      "  rm: removing '/dev/console'",
      "  rm: removing '/etc/passwd'",
      "  rm: removing '/etc/shadow'",
      "  rm: removing '/etc/group'",
      "  rm: removing '/etc/hostname'",
      "  rm: removing '/etc/hosts'",
      "  rm: removing '/etc/fstab'",
      "  rm: removing '/etc/resolv.conf'",
      "  rm: removing '/etc/apt/sources.list'",
      "  rm: removing '/etc/ssh/sshd_config'",
      "  rm: removing '/etc/ssh/ssh_host_rsa_key'",
      "  rm: removing '/etc/ssh/ssh_host_ed25519_key'",
      "  rm: removing '/etc/nginx/nginx.conf'",
      "  rm: removing '/etc/crontab'",
      "  rm: removing '/etc/sudoers'",
      "  rm: removing '/etc/network/interfaces'",
      "  rm: removing '/etc/iptables/rules.v4'",
      "  rm: removing '/etc/systemd/system.conf'",
      "  rm: removing '/etc/X11/xorg.conf'",
      "  rm: removing '/etc/default/grub'",
      "  rm: removing '/home/hesham/.bashrc'",
      "  rm: removing '/home/hesham/.profile'",
      "  rm: removing '/home/hesham/.ssh/id_rsa'",
      "  rm: removing '/home/hesham/.ssh/id_rsa.pub'",
      "  rm: removing '/home/hesham/.ssh/authorized_keys'",
      "  rm: removing '/home/hesham/.shadow'",
      "  rm: removing '/home/hesham/about.txt'",
      "  rm: removing '/home/hesham/contact.txt'",
      "  rm: removing '/home/hesham/cv.pdf'",
      "  rm: removing '/home/hesham/philosophy.txt'",
      "  rm: removing '/home/hesham/projects/secure-vault/README.md'",
      "  rm: removing '/home/hesham/projects/secure-vault/'",
      "  rm: removing '/home/hesham/projects/cybersecurity-training/README.md'",
      "  rm: removing '/home/hesham/projects/cybersecurity-training/'",
      "  rm: removing '/home/hesham/projects/railwash/README.md'",
      "  rm: removing '/home/hesham/projects/railwash/'",
      "  rm: removing '/home/hesham/projects/'",
      "  rm: removing '/home/hesham/skills/languages.txt'",
      "  rm: removing '/home/hesham/skills/cybersecurity.txt'",
      "  rm: removing '/home/hesham/skills/devops.txt'",
      "  rm: removing '/home/hesham/skills/'",
      "  rm: removing '/home/hesham/learning/ctf.txt'",
      "  rm: removing '/home/hesham/learning/certifications.txt'",
      "  rm: removing '/home/hesham/learning/'",
      "  rm: removing '/home/hesham/experience/work.txt'",
      "  rm: removing '/home/hesham/experience/'",
      "  rm: removing '/home/hesham/'",
      "  rm: removing '/lib/x86_64-linux-gnu/libc.so.6'",
      "  rm: removing '/lib/x86_64-linux-gnu/libpthread.so.0'",
      "  rm: removing '/lib/x86_64-linux-gnu/libdl.so.2'",
      "  rm: removing '/lib/x86_64-linux-gnu/libm.so.6'",
      "  rm: removing '/lib/x86_64-linux-gnu/libcrypt.so.1'",
      "  rm: removing '/lib/x86_64-linux-gnu/libssl.so.3'",
      "  rm: removing '/lib/x86_64-linux-gnu/libcrypto.so.3'",
      "  rm: removing '/lib/x86_64-linux-gnu/ld-linux-x86-64.so.2'",
      "  rm: removing '/lib/modules/6.8.0-hesham/kernel/drivers/net/'",
      "  rm: removing '/lib/modules/6.8.0-hesham/kernel/drivers/gpu/'",
      "  rm: removing '/lib/modules/6.8.0-hesham/kernel/fs/ext4/'",
      "  rm: removing '/lib/firmware/iwlwifi-ty-a0-gf-a0.pnvm'",
      "  rm: removing '/opt/ghidra/ghidraRun'",
      "  rm: removing '/opt/ghidra/Ghidra/Features/Decompiler/'",
      "  rm: removing '/opt/metasploit-framework/msfconsole'",
      "  rm: removing '/opt/metasploit-framework/modules/exploits/'",
      "  rm: removing '/opt/burpsuite/burpsuite_community.jar'",
      "  rm: removing '/proc/1/maps'",
      "  rm: removing '/proc/self/exe'",
      "  rm: removing '/proc/sys/kernel/randomize_va_space'",
      "  rm: removing '/proc/sys/net/ipv4/ip_forward'",
      "  rm: cannot remove '/proc/kcore': Operation not permitted",
      "  rm: removing '/run/systemd/system/'",
      "  rm: removing '/run/lock/'",
      "  rm: removing '/run/sshd.pid'",
      "  rm: removing '/sbin/init'",
      "  rm: removing '/sbin/iptables'",
      "  rm: removing '/sbin/fdisk'",
      "  rm: removing '/sbin/mkfs.ext4'",
      "  rm: removing '/srv/'",
      "  rm: removing '/sys/class/net/eth0/'",
      "  rm: cannot remove '/sys/kernel': Operation not permitted",
      "  rm: removing '/tmp/.X11-unix/'",
      "  rm: removing '/tmp/ssh-XXXXXX/'",
      "  rm: removing '/usr/bin/python3'",
      "  rm: removing '/usr/bin/python3.12'",
      "  rm: removing '/usr/bin/pip3'",
      "  rm: removing '/usr/bin/gcc'",
      "  rm: removing '/usr/bin/g++'",
      "  rm: removing '/usr/bin/make'",
      "  rm: removing '/usr/bin/gdb'",
      "  rm: removing '/usr/bin/nmap'",
      "  rm: removing '/usr/bin/sqlmap'",
      "  rm: removing '/usr/bin/hydra'",
      "  rm: removing '/usr/bin/john'",
      "  rm: removing '/usr/bin/hashcat'",
      "  rm: removing '/usr/bin/gobuster'",
      "  rm: removing '/usr/bin/exiftool'",
      "  rm: removing '/usr/bin/wireshark'",
      "  rm: removing '/usr/bin/curl'",
      "  rm: removing '/usr/bin/wget'",
      "  rm: removing '/usr/bin/git'",
      "  rm: removing '/usr/bin/vim'",
      "  rm: removing '/usr/bin/nano'",
      "  rm: removing '/usr/bin/ssh'",
      "  rm: removing '/usr/bin/scp'",
      "  rm: removing '/usr/bin/docker'",
      "  rm: removing '/usr/bin/rustc'",
      "  rm: removing '/usr/bin/cargo'",
      "  rm: removing '/usr/bin/node'",
      "  rm: removing '/usr/bin/npm'",
      "  rm: removing '/usr/lib/systemd/systemd'",
      "  rm: removing '/usr/lib/x86_64-linux-gnu/libstdc++.so.6'",
      "  rm: removing '/usr/lib/x86_64-linux-gnu/libgcc_s.so.1'",
      "  rm: removing '/usr/lib/x86_64-linux-gnu/libX11.so.6'",
      "  rm: removing '/usr/lib/x86_64-linux-gnu/libGL.so.1'",
      "  rm: removing '/usr/share/wordlists/rockyou.txt'",
      "  rm: removing '/usr/share/wordlists/dirb/common.txt'",
      "  rm: removing '/usr/share/seclists/'",
      "  rm: removing '/usr/share/nmap/scripts/'",
      "  rm: removing '/usr/share/metasploit-framework/data/'",
      "  rm: removing '/var/log/syslog'",
      "  rm: removing '/var/log/auth.log'",
      "  rm: removing '/var/log/kern.log'",
      "  rm: removing '/var/log/dpkg.log'",
      "  rm: removing '/var/log/apt/history.log'",
      "  rm: removing '/var/log/apache2/access.log'",
      "  rm: removing '/var/lib/dpkg/status'",
      "  rm: removing '/var/lib/apt/lists/'",
      "  rm: removing '/var/cache/apt/archives/'",
      "  rm: removing '/var/www/html/index.html'",
      "  rm: removing '/var/mail/'",
      "  rm: removing '/var/spool/cron/'",
      "  rm: cannot remove '/proc/1/': Permission denied",
      "  rm: cannot remove '/sys/firmware/': Permission denied",
      "",
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < destroySequence.length) {
        setLines((l) => [...l, { type: "out", text: destroySequence[i] }]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setDestroying(false);
          setDestroyed(true);
        }, 200);
      }
    }, 2);
  }, [input]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (sudoMode) {
          submitSudoPassword();
        } else {
          submit();
        }
        setTimeout(() => {
          inputRef.current?.scrollIntoView({block: "end"});
        }, 50);
      } else if (e.key === "Tab") {
        e.preventDefault();
        const completed = tabComplete(input, cwd);
        if (completed) {
          setInput(completed);
          setCursorPos(completed.length);
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (hist.length) {
          const idx = Math.min(hIdx + 1, hist.length - 1);
          setHIdx(idx);
          setInput(hist[idx]);
          setCursorPos(hist[idx].length);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (hIdx > 0) {
          setHIdx(hIdx - 1);
          setInput(hist[hIdx - 1]);
          setCursorPos(hist[hIdx - 1].length);
        } else {
          setHIdx(-1);
          setInput("");
          setCursorPos(0);
        }
      } else if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        setLines([]);
      } else if (e.key === "c" && e.ctrlKey) {
        e.preventDefault();
        if (sudoMode) {
          setSudoMode(false);
          setInput("");
          setCursorPos(0);
          setLines((l) => [...l, { type: "out", text: "  [sudo] password for hesham:\n  sudo: a password is required" }]);
        } else {
          setLines((l) => [...l, { type: "cmd", cwd: displayDir(), text: input + "^C" }]);
          setInput("");
          setCursorPos(0);
        }
      }
    },
    [input, cwd, hist, hIdx, submit, displayDir, sudoMode, submitSudoPassword]
  );

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#0d0d1a",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'JetBrains Mono', monospace",
      }}
      onClick={() => inputRef.current?.focus()}
    >

    {destroyed && (
      <div/>
    )}

    {showContact && <ContactForm onClose={() => setShowContact(false)} />}

    <div
      style={{
        flexShrink: 0,
        userSelect: "none",
        background: "#151524",
        position:"fixed", 
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "3px 6px",
        }}
      >
        <div style={{
          width: 44, marginTop: 4,
          display: "flex", alignItems: "center",
        }}>
        <img src="/portfolio/kali.svg"/>
        </div>


        <div style={{
          flex: 1,
          textAlign: "center",
          fontSize: 14,
          color: "#ccc",
          fontFamily: "sans-serif",
        }}>
          hesham@kali: {displayDir()}
        </div>

        <div style={{ display: "flex", gap: 4 }}>
          {["─", "□", "✕"].map((icon, i) => (
            <div
              key={i}
              style={{
                width: 16,
                height: 16,
                borderRadius: 80,
                background: "#277FFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: i === 1 ? 9 : 11,
                color: "#000000",
                lineHeight: 1,
                fontWeight: "bold",
              }}
            >
              {icon}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 0,
          padding: "1px 4px",
        }}
      >
        {["Session", "Actions", "Edit", "View", "Help"].map((item) => (
          <div
            key={item}
            style={{
              padding: "2px 10px",
              fontSize: 11,
              color: "#E0E0E0",
              cursor: "default",
              fontFamily: "sans-serif",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>

      <div
        ref={scrollRef}
        className="terminal-scroll"
        style={{
          flex: 1,
          overflow: "auto",
          padding: "10px 14px",
          fontSize: 13,
          lineHeight: 1.55,
          color: "#D4D4D4",
          paddingTop: 60,
        }}
      >
        <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", justifyContent: destroying ? "flex-start" : "flex-end"  }}>
        {lines.map((line, i) => {
          if (line.type === "sys") {
            return (
              <div key={i} style={{ color: "#333", fontSize: 11 }}>
                {line.text}
              </div>
            );
          }

          if (line.type === "cmd") {
            return (
              <div key={i} style={{ whiteSpace: "pre-wrap" }}>
                <PromptLine1 dir={line.cwd || "~"} />
                {"\n"}
                <PromptLine2 />
                <span style={{ color: "#E0E0E0" }}>{line.text}</span>
              </div>
            );
          }

          return (
            <div key={i} style={{ whiteSpace: "pre-wrap" }}>
              {renderStyled(line.text)}
            </div>
          );
        })}
        
        {!destroying && !sudoMode && (
          <div style={{ whiteSpace: "pre-wrap" }}>
            <PromptLine1 dir={displayDir()} />
            {"\n"}
            <PromptLine2 />
            <span style={{ position: "relative", display: "inline" }}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setInput(e.target.value);
                  setCursorPos(e.target.selectionStart ?? e.target.value.length);
                }}
                onSelect={() => {
                  if (inputRef.current) {
                    setCursorPos(inputRef.current.selectionStart ?? input.length);
                  }
                }}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoComplete="off"
                autoFocus
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#E0E0E0",
                  fontSize: 13,
                  fontFamily: "'JetBrains Mono', monospace",
                  width: Math.max(200, input.length * 8 + 20),
                  caretColor: "transparent",
                  lineHeight: 1.55,
                  padding: 0,
                  display: "inline",
                  verticalAlign: "baseline",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  pointerEvents: "none",
                  whiteSpace: "pre",
                  fontSize: 13,
                  fontFamily: "'JetBrains Mono', monospace",
                  lineHeight: 1.55,
                  color: "transparent",
                }}
              >
                {input.slice(0, cursorPos)}
                <span className="terminal-cursor" />
                {input.slice(cursorPos)}
              </span>
            </span>
          </div>
        )}

        {sudoMode && !destroying && (
          <div style={{ display: "flex", alignItems: "center", whiteSpace: "pre" }}>
            <span style={{ color: "#E0E0E0" }}>  [sudo] password for hesham: </span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoFocus
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "transparent",
                fontSize: 13,
                fontFamily: "'JetBrains Mono', monospace",
                width: 1,
                caretColor: "transparent",
                lineHeight: 1.55,
                padding: 0,
              }}
            />
            <span className="terminal-cursor" />
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
    </div>
  );
};

export default Terminal;