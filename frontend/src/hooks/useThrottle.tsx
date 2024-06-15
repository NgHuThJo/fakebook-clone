import { useEffect, useMemo, useRef } from "react";

export function throttle(callback: (...args: any[]) => void, delay: number) {
  let isWaiting = false;
  let lastArgs: any[] | null = null;
  let timeoutId: number;

  const timeoutFunc = () => {
    if (lastArgs === null) {
      isWaiting = false;
    } else {
      callback(...lastArgs);
      lastArgs = null;
      timeoutId = window.setTimeout(timeoutFunc, delay);
    }
  };

  const throttledCallback = (...args: any[]) => {
    if (isWaiting) {
      lastArgs = args;
      return;
    }

    callback(...args);
    isWaiting = true;
    timeoutId = window.setTimeout(timeoutFunc, delay);
  };

  throttledCallback.clear = () => {
    window.clearTimeout(timeoutId);
  };

  return throttledCallback;
}

export function useThrottle(callback: (...args: any[]) => void, delay = 1000) {
  const ref = useRef(callback);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const throttledCallback = useMemo(() => {
    const func = (...args: any[]) => {
      ref.current(...args);
    };

    return throttle(func, delay);
  }, [delay]);

  useEffect(() => {
    return () => {
      throttledCallback.clear();
    };
  }, [throttledCallback]);

  return throttledCallback;
}
