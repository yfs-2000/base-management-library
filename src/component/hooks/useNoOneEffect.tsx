import { DependencyList, useEffect, useRef } from "react";

const useNoOneEffect = (fn: () => void, deps?: DependencyList) => {
  const ref = useRef(false);
  const fnRef = useRef(fn);
  fnRef.current = fn;
  useEffect(() => {
    if (ref.current) {
      fnRef.current();
    } else {
      ref.current = true;
    }
  }, deps);
};

export default useNoOneEffect;
