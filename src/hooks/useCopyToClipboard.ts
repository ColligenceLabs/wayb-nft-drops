import { useState } from 'react';

const useCopyToClipBoard = () => {
  const [copyDone, setCopyDone] = useState(false);
  const [copyResult, setCopyResult] = useState(false);
  const [copyMessage, setCopyMessage] = useState('');

  const copyToClipBoard = async (copyMe: string | null | undefined) => {
    try {
      if (copyMe) {
        await navigator.clipboard.writeText(copyMe);
        setCopyResult(true);
        setCopyMessage(`'${copyMe}' Copied!`);
      }
    } catch (err) {
      setCopyResult(false);
      setCopyMessage('Failed to copy!');
    } finally {
      setCopyDone(true);
    }
  };

  return {
    copyToClipBoard,
    copyResult,
    copyMessage,
    copyDone,
    setCopyDone,
    setCopyResult,
  };
};

export default useCopyToClipBoard;
