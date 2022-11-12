import { useRef } from "react";
export type noop = (...args: any[]) => any;
const usePersistFn = <T extends noop>(fn: T) => {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;
  return fnRef;
};

export default usePersistFn;
