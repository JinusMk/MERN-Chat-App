import { useCallback, useRef } from 'react';

function useDebounce(callback, wait) {
  const timeoutIdRef = useRef(null);

  const debouncedCallback = useCallback(
    (val) => {
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = setTimeout(() => {
        callback(val);
      }, wait);
    },
    [callback, wait],
  );

  return debouncedCallback;
}

export default useDebounce;
