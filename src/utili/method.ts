//将url 转为 blob
import { message } from "antd";

export function urlTransiztionFile(img: string) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = img;
    image.setAttribute("crossOrigin", "Anonymous");
    image.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext("2d");
      // @ts-ignore
      ctx.drawImage(image, 0, 0, image.width, image.height);
      canvas.toBlob((Blob) => {
        resolve(Blob);
      }, "image/jpeg");
    };
    image.onerror = function () {
      message.error("图片加载失败");
      reject("图片加载失败");
    };
  });
}
//减低图片质量
export function decreaseImageQuality(
  file: File,
  quality: number = 0.2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const Url = URL.createObjectURL(file);
    const images = new Image();
    images.src = Url;
    images.onload = () => {
      URL.revokeObjectURL(Url);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = images.naturalWidth;
      canvas.height = images.naturalHeight;
      ctx && ctx.drawImage(images, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
  });
}
export function getBase64(img: File, callback: (result: string) => void) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
}
//base64转file
export function dataURLtoFile(dataurl: string = "", filename: string) {
  // 获取到base64编码
  const arr = dataurl.split(",");
  // 将base64编码转为字符串
  const bstr = window.atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n); // 创建初始化为0的，包含length个元素的无符号整型数组
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {
    type: "image/jpeg",
  });
}
/**
 * 将流转为下载文件
 * @param content
 * @param filename
 */
export function downloadFileStream(content: File, filename: string) {
  const blob = new Blob([content]);

  /* if (navigator.msSaveOrOpenBlob) {
    //IE下使用msSaveOrOpenBlob
    navigator.msSaveBlob(blob, filename);
  } else {*/
  const aLink = document.createElement("a");
  const href = window.URL.createObjectURL(blob);
  // const evt = document.createEvent("HTMLEvents")

  // evt.initEvent("click", false, false)
  aLink.download = filename;
  aLink.href = href;
  document.body.appendChild(aLink); //Firefox必须插入dom中
  // aLink.dispatchEvent(evt)
  aLink.click();
  window.URL.revokeObjectURL(href);
  document.body.removeChild(aLink);
}
//将输入框输入的变为正数加2位小数
export function strToNumberTwoDecimal(formatStr: string) {
  let str = ``;
  if (`${formatStr}`.indexOf(",") > -1) {
    let splitArr = formatStr.split(",");
    splitArr.forEach((item) => {
      str += item;
    });
  } else {
    str = formatStr;
  }
  // console.log(str);
  let numStr = str.replace(/[^0-9.]+/g, "");
  const numArr = numStr.split(".");
  if (numArr.length >= 2) {
    numStr = (numArr[0] === "" ? "0" : numArr[0]) + "." + numArr[1];
  }
  return numStr.replace(/\..*$/, (item) => item.slice(0, 3));
}
interface sizeProps {
  d?: string;
  w?: string;
  h?: string;
}
type sizePropsKey = keyof sizeProps;
export function sizeCountTran(size: sizeProps) {
  return Object.keys(size).reduce((pre, now, index, arr) => {
    if (size[now as sizePropsKey]) {
      let x = "";
      if (arr.length > 1 && index !== 0) {
        x = " * ";
      }
      pre += x + size[now as sizePropsKey] + now;
    }
    return pre;
  }, "");
}
export function copyText(text: string) {
  const node = document.createElement("input");
  node.value = text;
  document.body.appendChild(node);
  node.select();
  document.execCommand("copy");
  document.body.removeChild(node);
}
