import { useRef, useState } from "react";
import { FormInstance } from "antd";
function useModalProps<type, tableRow>(typeInit: type) {
  const [confirmLoading, setConfirmLoading] = useState(false); //弹窗按钮的loading
  const [popSet, setPopSet] = useState<{
    type: type;
    row?: tableRow;
  }>({
    type: typeInit,
  });
  const [modalShow, setModalShow] = useState(false);
  const formRef = useRef<{ form: FormInstance }>(null);
  function openModal(type: type, row?: tableRow) {
    setPopSet({ type, row });
    setModalShow(true);
  }

  function confirmLoadingOpen() {
    setConfirmLoading(true);
  }
  function confirmLoadingClose() {
    setConfirmLoading(false);
  }
  function modalOpen() {
    setModalShow(true);
  }
  function modalClose() {
    setModalShow(false);
    setConfirmLoading(false);
  }
  return {
    //弹窗的loading
    confirmLoading,
    //弹窗的loading打开
    confirmLoadingOpen,
    //弹窗的loading关闭
    confirmLoadingClose,
    popSet,
    setPopSet,
    //打开弹窗
    modalOpen,
    //关闭弹窗
    modalClose,
    //弹窗是否打开
    modalShow,
    formRef,
    //打开弹窗 并且传入值为什么状态
    openModal,
  };
}

export default useModalProps;
