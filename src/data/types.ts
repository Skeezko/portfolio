export interface DirAndFile {
  type: "dir" | "file";
  subdir?: string[];
  content?: string;
}

export interface Line {
  type: "sys" | "out" | "cmd";
  text: string;
  cwd?: string;
}

export interface CommandOutput {
  out: string;
  cwd: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  msg: string;
}