import type {FC} from "react";

export const PromptLine1: FC<{ dir: string }> = ({ dir }) => (
  <>
    <span style={{ color: "#75b2a4" }}>┌──(</span>
    <span style={{ color: "#277FFF", fontWeight: 700 }}>hesham㉿kali</span>
    <span style={{ color: "#75b2a4" }}>)-[</span>
    <span style={{ color: "#E0E0E0", fontWeight: 600 }}>{dir}</span>
    <span style={{ color: "#75b2a4" }}>]</span>
  </>
);

export const PromptLine2: FC = () => (
  <>
    <span style={{ color: "#75b2a4" }}>└─</span>
    <span style={{ color: "#277FFF", fontWeight: 700 }}>$ </span>
  </>
);