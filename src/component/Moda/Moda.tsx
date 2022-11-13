import React from "react";
import { Modal } from "antd";
import { FCC } from "../../global";
const MyModal: FCC = ({ children }) => {
  return (
    <Modal centered destroyOnClose>
      {children}
    </Modal>
  );
};

export default MyModal;
