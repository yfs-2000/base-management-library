import { useRef, useEffect } from "react";
const useUnComponent = (type: "simple" | "net" = "simple") => {
  const UnComponent = useRef<null | boolean | ((error: string) => void)>(null);
  useEffect(() => {
    return () => {
      if (type === "net" && typeof UnComponent.current === "function") {
        UnComponent.current("meCancel");
      } else {
        UnComponent.current = true;
      }
    };
  }, [type]);
  return UnComponent;
};

export default useUnComponent;
