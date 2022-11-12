import React, { useRef } from "react";
import "./Upload.less";
import classNames from "classnames";
import { EyeOutlined, DeleteOutlined, UndoOutlined } from "@ant-design/icons";
interface luxFile {
  url: string;
  uid: number;
  name: string;
  status: "done" | "uploading" | "error";
  errorFile?: File;
  [props: string]: any;
}
interface Props {
  files: luxFile[];
  changeUpload: (file: File[]) => void;
  onPreview?: (file: luxFile) => void;
  onRemove?: (file: luxFile) => void;
  onRetry?: (file: luxFile) => void;
  disabled: boolean;
  accept: string;
}
const Upload: React.FC<Props> = (props) => {
  const {
    children,
    files,
    changeUpload,
    onPreview,
    onRemove,
    accept,
    disabled,
    onRetry,
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  function clickUpload() {
    if (disabled) {
      return;
    }
    inputRef.current && inputRef.current.click();
  }
  function retry(luxFile: luxFile) {
    onRetry && onRetry(luxFile);
  }
  function preview(file: luxFile) {
    onPreview && onPreview(file);
  }
  function remove(file: luxFile) {
    onRemove && onRemove(file);
  }
  return (
    <div
      className={classNames(disabled && "lux-upload-disabled", "lux-upload")}
    >
      {files.map((item) => (
        <div key={item.uid} className={"lux-upload-img-warp"}>
          {item.status === "done" ? (
            <div className={"lux-upload-img-done"}>
              <img src={item.url} alt="" />
              <div className={"lux-upload-img-hand"}>
                <span onClick={() => preview(item)}>
                  <EyeOutlined />
                </span>
                {!disabled && (
                  <span onClick={() => remove(item)}>
                    <DeleteOutlined />
                  </span>
                )}
              </div>
            </div>
          ) : item.status === "uploading" ? (
            <div>正在上传</div>
          ) : (
            <div className={"lux-upload-img-error"}>
              上传错误请重试
              <div
                className={"lux-upload-img-hand"}
                onClick={() => retry(item)}
              >
                <UndoOutlined />
              </div>
            </div>
          )}
        </div>
      ))}
      <div className={classNames("lux-upload-icon")} onClick={clickUpload}>
        {children}
      </div>
      <input
        onChange={(event) => {
          changeUpload([...(event.target.files as any)] as File[]);
          event.target.value = "";
        }}
        ref={inputRef}
        type="file"
        multiple
        style={{ display: "none" }}
        accept={accept}
      />
    </div>
  );
};

export default Upload;
