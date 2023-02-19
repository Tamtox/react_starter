import React, { useEffect } from 'react';

// Fires the callback when click outside provided ref
const useOnClickOutside = (ref: any, closeHandler: () => void) => {
  const handleClickOutside = (event: any) => {
    if (!ref.current || ref.current.contains(event.target)) {
      return;
    }
    closeHandler();
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, closeHandler]);
};

export default useOnClickOutside;
