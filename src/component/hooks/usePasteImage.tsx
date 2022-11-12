import { useEffect } from "react";
import usePersistFn from "./usePersistFn";
const usePasteImage = (pasteHandle: (file: File[]) => void) => {
  const pasteHandleRef = usePersistFn(pasteHandle);
  useEffect(() => {
    const fn = function (event: ClipboardEvent) {
      const items = event.clipboardData?.items;
      let file: File[] = [];
      if (items?.length) {
        // 检索剪切板items
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.includes("image")) {
            const fileItem = items[i].getAsFile();
            fileItem && file.push(fileItem);
          }
        }
      }
      if (file.length > 0) {
        pasteHandleRef.current(file);
      }
      // 此时file就是剪切板中的图片文件
    };
    document.addEventListener("paste", fn);
    return () => {
      document.removeEventListener("paste", fn);
    };
  }, [pasteHandleRef]);
  return null;
};

export default usePasteImage;
