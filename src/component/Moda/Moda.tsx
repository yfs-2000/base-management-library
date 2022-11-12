import React from "react";
import { Modal } from "antd";
const MyModal: React.FC = ({ children }) => {
  return (
    <Modal centered destroyOnClose>
      {children}
    </Modal>
  );
};

export default MyModal;
