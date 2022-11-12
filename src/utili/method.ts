//将url 转为 blob
import { message } from "antd";
import { Dayjs } from "dayjs";
import { stateProps } from "../component/TablePro/typing";
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
export function asyncGetBase64(img: File): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result as string));
      reader.readAsDataURL(img);
    } catch (e) {
      reject(e);
    }
  });
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
/**
 * 时间参数的问题
 * @param state
 */
export function queryTime(state: stateProps, st = "st", ed = "ed") {
  const states = { ...state };
  const { time } = states;
  if (time) {
    states[st] = (time as [Dayjs, Dayjs])[0].format("YYYY-MM-DD");
    states[ed] = (time as [Dayjs, Dayjs])[1].format("YYYY-MM-DD");
    delete states.time;
  }
  return states;
}

let imgUid = 0;
export async function FileAddImages(
    files: File[],
    oldImg_url: any[],
    status = "done"
) {
  const imgArr = [];
  for (let i = 0; i < files.length; i++) {
    const base64 = await decreaseImageQuality(files[i], 0.02);
    imgArr.push({
      originFileObj: files[i],
      url: base64,
      uid: `-${++imgUid}`,
      status,
      name: files[i].name,
    });
  }
  return oldImg_url.concat(imgArr);
}
export const debounce = (fn: any, time: number, isImmediately?: boolean) => {
  let prevTime = 0;
  let timer: NodeJS.Timeout | null;
  return (...ags: any[]) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (prevTime <= new Date().valueOf() && isImmediately) {
      prevTime = new Date().valueOf() + time;
      fn(...ags);
    } else {
      timer = setTimeout(() => {
        fn(...ags);
        timer = null;
        prevTime = new Date().valueOf() + time;
      }, time);
    }
  };
};
const system_version = "1.0";
class LocalStorageTime {
  getItem(name: string) {
    if (typeof window !== "undefined") {
      const json = localStorage.getItem(name);
      if (json) {
        try {
          const { pastTime, data, system_version: version } = JSON.parse(json);
          if (
              (pastTime && new Date().valueOf() > pastTime) ||
              version !== system_version
          ) {
            return undefined;
          }
          return data;
        } catch (e) {
          localStorage.removeItem(name);
          return undefined;
        }
      }
      return json;
    }
  }
  setItem(name: string, data: any, time?: number) {
    if (typeof window !== "undefined") {
      return localStorage.setItem(
          name,
          JSON.stringify({
            data,
            pastTime: time ? new Date().valueOf() + time : undefined,
            system_version,
          })
      );
    }
  }
  removeItem(name: string) {
    if (typeof window !== "undefined") {
      return localStorage.removeItem(name);
    }
  }
}

export const myLocalStorage = new LocalStorageTime();
//+"?x-oss-process=image/auto-orient,1/resize,p_50/quality,q_20" 压缩参数
const ossHttpUrlAfter = "https://nft.luxfi.io/api/" + "marketplace/";
export const ossHttpUrlNum = (url: string, num = 1, par = "") =>
    ossHttpUrlAfter + `${url}/${num}` + par;
export const ossHttpUrl = (url: string) => ossHttpUrlNum(url, 1);
