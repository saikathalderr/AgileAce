// @ts-nocheck
import { useEffect, useState } from 'react';

let hidden: string;
let visibilityChange: string;

if (typeof document.hidden !== 'undefined') {
  hidden = 'hidden';
  visibilityChange = 'visibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
  hidden = 'msHidden';
  visibilityChange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
  hidden = 'webkitHidden';
  visibilityChange = 'webkitvisibilitychange';
}

export default function usePageVisibility() {
  const [visibilityStatus, setVisibilityStatus] = useState(document[hidden]);

  useEffect(() => {
    function handleVisibilityChange() {
      setVisibilityStatus(document[hidden]);
    }

    document.addEventListener(visibilityChange, handleVisibilityChange);

    return () => {
      document.removeEventListener(visibilityChange, handleVisibilityChange);
    };
  }, []);

  return visibilityStatus;
}
