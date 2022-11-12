import React from "react";
import { Button } from "antd";
import styles from "./ModalFooter.module.less";
interface Props {
  okText?: string;
  cancelText?: string;
  confirmLoading?: boolean;
  onOk: (...agr: any[]) => void;
  onCancel: (...agr: any[]) => void;
}
const Index = ({
  okText = "确认",
  cancelText = "取消",
  confirmLoading = false,
  onOk = () => {},
  onCancel = () => {},
}: Props) => {
  return (
    <div className={styles.modalFooter}>
      <Button onClick={onCancel}>{cancelText}</Button>
      <Button type={"primary"} loading={confirmLoading} onClick={onOk}>
        {okText}
      </Button>
    </div>
  );
};

export default Index;
