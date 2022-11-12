import React from "react";
import { Modal } from "antd";
import MyImages from "src/component/MyImages";
interface ImgPreviewProps {
  visible: boolean;
  onCancel: () => void;
  previewImage: string;
}
const ImgPreview: React.FC<ImgPreviewProps> = ({
  visible,
  onCancel,
  previewImage,
}) => {
  return (
    <Modal
      visible={visible}
      footer={null}
      bodyStyle={{
        padding: 0,
      }}
      centered
      onCancel={onCancel}
      width={"auto"}
    >
      <MyImages
        alt="图片"
        style={{ width: "60vw", height: "70vh", objectFit: "contain" }}
        src={previewImage}
        key={previewImage}
      />
    </Modal>
  );
};

export default ImgPreview;
