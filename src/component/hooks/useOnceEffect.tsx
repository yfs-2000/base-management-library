import { useEffect } from "react";

const useOnceEffect = (fn: () => void) => {
  useEffect(() => {
    fn();
  }, []);
};

export default useOnceEffect;
