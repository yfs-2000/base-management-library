import { useState } from "react";

const useImgPreview = (type: "url" | "file" = "file") => {
  //点击图片预览
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  function onPreviewCancel() {
    setPreviewVisible(false);
    type === "file" && URL.revokeObjectURL(previewImage);
  }
  function onPreview(file: File | string) {
    setPreviewVisible(true);
    const objectURL = type === "file" ? URL.createObjectURL(file) : file;
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
