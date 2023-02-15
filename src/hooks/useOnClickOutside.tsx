import React, { useEffect } from 'react';

// Fires the callback when click outside provided ref
const useOnClickOutside = (ref: any, closeHandler: () => void) => {
  useEffect(() => {
    const eventListener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      closeHandler();
    };
    document.addEventListener('click', eventListener);
    return () => {
      document.removeEventListener('click', eventListener);
    };
  }, [ref, closeHandler]);
};

export default useOnClickOutside;
