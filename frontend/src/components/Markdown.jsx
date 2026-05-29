import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// Models emit LaTeX using \( \) (inline) and \[ \] (display) delimiters, but
// remark-math only recognizes $ and $$. Normalize before rendering so KaTeX
// can pick up the math. Order matters: handle display delimiters before inline.
function normalizeMath(text) {
  if (typeof text !== 'string') {
    return text;
  }
  return text
    .replace(/\\\[([\s\S]*?)\\\]/g, (_match, expr) => `$$${expr}$$`)
    .replace(/\\\(([\s\S]*?)\\\)/g, (_match, expr) => `$${expr}$`);
}

// Shared markdown renderer with LaTeX math support. Use this everywhere instead
// of ReactMarkdown directly so math rendering stays consistent across stages.
export default function Markdown({ children }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
    >
      {normalizeMath(children)}
    </ReactMarkdown>
  );
}
