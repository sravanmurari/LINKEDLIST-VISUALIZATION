import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="text-gray-500 hover:text-black absolute top-2 right-2"
      title="Copy"
    >
      {copied ? <Check size={18} /> : <Copy size={18} />}
    </button>
  );
};

export default CopyButton;
