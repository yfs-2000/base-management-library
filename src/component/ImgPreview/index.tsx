import React from "react";
import { Modal } from "antd";
interface ImgPreviewProps {
  visible: boolean;
  onCancel: () => void;
  previewImage: string;
}
//图片放大预览的组件
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
    >
      <img alt="图片" style={{ width: "100%" }} src={previewImage} />
    </Modal>
  );
};

export default ImgPreview;
