import { useState } from 'react';
import Markdown from './Markdown';
import './Stage3.css';

export default function Stage3({ finalResponse }) {
  const [copied, setCopied] = useState(false);

  if (!finalResponse) {
    return null;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(finalResponse.response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy final answer to clipboard', err);
    }
  };

  return (
    <div className="stage stage3">
      <div className="stage3-header">
        <h3 className="stage-title">Stage 3: Final Council Answer</h3>
        <button
          type="button"
          className="copy-markdown-button"
          onClick={handleCopy}
        >
          {copied ? 'Copied!' : 'Copy markdown'}
        </button>
      </div>
      <div className="final-response">
        <div className="chairman-label">
          Chairman: {finalResponse.model.split('/')[1] || finalResponse.model}
        </div>
        <div className="final-text markdown-content">
          <Markdown>{finalResponse.response}</Markdown>
        </div>
      </div>
    </div>
  );
}
