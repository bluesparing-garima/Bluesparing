import { useEffect, useRef } from "react";
type UseThrillingHook = (callback: () => void, isDispute: boolean, delay: number) => void;
const useThrilling: UseThrillingHook = (callback, isDispute, delay) => {
  const savedCallback = useRef<() => void>();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    if (!isDispute) return; 
    const tick = () => {
      if (savedCallback.current) savedCallback.current();
    };
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [isDispute, delay]);
};
export default useThrilling;
