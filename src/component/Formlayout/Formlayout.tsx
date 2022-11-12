import React from "react";
import "./Formlayout.less";
import classNames from "classnames";
//通用表单样式
//title 为标题   form为input 等组件   width为表单组件的宽度在 mode 为line 即为内敛form时有用   titleWidth为title的宽度
//目前 align 为 像右对齐  不传为向左边对齐
interface IFormLayout {
  width?: number | string;
  title: string;
  mode?: "Horizontal" | "Vertical" | "Inline";
  form: React.ReactChild | undefined;
}
const FormLayout = ({
  title,
  form,
  width = "auto",
  mode = "Horizontal",
}: IFormLayout) => {
  return (
    <div className={classNames("formLayout", `formLayout-${mode}`)}>
      <div className={"formLayoutTitle"}>{title}:</div>
      <div style={{ width: width }} className={"formLayoutFrom"}>
        {form}
      </div>
    </div>
  );
};

export default FormLayout;
