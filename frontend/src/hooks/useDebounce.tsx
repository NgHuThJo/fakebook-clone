import { useEffect, useMemo, useRef } from "react";

function debounce(callback: (...args: any[]) => void, delay: number) {
  let timeoutId: number;

  const debouncedCallback = (...args: any[]) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, delay);
  };

  debouncedCallback.clear = () => {
    window.clearTimeout(timeoutId);
  };

  return debouncedCallback;
}

export function useDebounce(callback: (...args: any[]) => void, delay = 1000) {
  const ref = useRef(callback);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = (...args: any[]) => {
      ref.current(...args);
    };

    return debounce(func, delay);
  }, [delay]);

  useEffect(() => {
    return () => {
      debouncedCallback.clear();
    };
  }, [debouncedCallback]);

  return debouncedCallback;
}
