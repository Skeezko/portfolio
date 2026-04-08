import type {ReactNode} from "react";

export const COLORS: Record<string, string> = {
  H: "#E0E0E0",
  G: "#47D147",
  R: "#FF5555",
  Y: "#F1FA8C",
  B: "#277FFF",
  P: "#BD93F9",
  C: "#56D4DD",
  D: "#277FFF",
  K: "#277FFF",
  W: "#FFFFFF",
  O: "#FFB86C",
};

const BOLD_CODES = "HDK";

export function renderStyled(text: string): ReactNode[] {
  const regex = /\x1b([HGRYSBPCDKWO LA])([\s\S]*?)\x1bE/g;
  const result: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      result.push(<span key={key++}>{text.slice(lastIndex, match.index)}</span>);
    }

    const colorCode = match[1];
    const content = match[2];

    if (colorCode === 'L') {
      result.push(
        <a 
          key={key++} 
          href={content} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: '#FFB86C', textDecoration: 'underline', cursor: 'pointer' }}
        >
          {content}
        </a>
      );
    } else if (colorCode === 'A') {
      result.push(
        <a 
          key={key++} 
          href={content} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: '#277FFF', textDecoration: 'underline', cursor: 'pointer' }}
        >
          {content}
        </a>
      );
    } else {
      result.push(
        <span
          key={key++}
          style={{
            color: COLORS[colorCode] || "#D4D4D4",
            fontWeight: BOLD_CODES.includes(colorCode) ? 700 : 400,
          }}
        >
          {content}
        </span>
      );
    }

    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    result.push(<span key={key++}>{text.slice(lastIndex)}</span>);
  }

  return result;
}