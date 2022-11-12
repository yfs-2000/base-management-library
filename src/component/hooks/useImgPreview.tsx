import { useRef, useState } from "react";

const useImgPreview = () => {
  //点击图片预览
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const isFile = useRef(true);
  function onPreviewCancel() {
    setPreviewVisible(false);
    typeof isFile.current && URL.revokeObjectURL(previewImage);
  }
  function onPreview(file: File | string) {
    setPreviewVisible(true);
    const isType = typeof file === "string";
    isFile.current = !isType;
    const objectURL = isType ? file : URL.createObjectURL(file);
    setPreviewImage(objectURL as string);
  }
  return {
    previewVisible,
    setPreviewVisible,
    previewImage,
    onPreview,
    onPreviewCancel,
  };
};

export default useImgPreview;
