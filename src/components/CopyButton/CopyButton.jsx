import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import Button from '../Button/Button';
import './CopyButton.css';

export const CopyButton = ({
  textToCopy = '',
  label = 'Copy',
  size = 'sm',
  className = '',
  variant = 'secondary'
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e?.stopPropagation();
    try {
      await navigator.clipboard.writeText(textToCopy || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className={`copy-button-container ${className}`}>
      <Button
        variant={copied ? 'secondary' : variant}
        size={size}
        icon={copied ? Check : Copy}
        onClick={handleCopy}
        className={`copy-btn ${copied ? 'copy-btn--copied' : ''}`}
        data-tour-id="copy-button"
      >
        {copied ? 'Copied!' : label}
      </Button>
      {copied && (
        <div className="copy-tooltip-popup animate-fade-in">
          Copied!
        </div>
      )}
    </div>
  );
};

export default CopyButton;
