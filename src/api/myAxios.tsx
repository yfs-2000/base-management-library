import axios, { AxiosRequestConfig } from "axios";
import store from "src/redux/store";
import { updateToken } from "src/redux/action";
import { message } from "antd";
const instance = axios.create({
  baseURL: "需要传入的ip地址",
  timeout: 30000,
});
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    const token = store.getState().userInfo.token;
    if (token) {
      config.headers.Authorization = token;
    }
    if (config.method === "post" && config.data) {
      postDataMethod(config);
    }
    if (config.method === "get") {
      getDataMethod(config);
    }
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
/*post请求参数的删改*/
function postDataMethod(config: AxiosRequestConfig) {
    const formData = new FormData();
    const data = config.data;
    if (Object.prototype.toString.call(data) === "[object Object]") {
        for (const dataKey in data) {
            if (data.hasOwnProperty(dataKey)) {
                const DataItem = data[dataKey];
                if (Array.isArray(DataItem)) {
                    DataItem.forEach((item: any) => {
                        formData.append(dataKey, item);
                    });
                } else if (DataItem || DataItem === 0 || DataItem === false) {
                    formData.append(dataKey, DataItem);
                }
            }
        }
    } else if (Array.isArray(data)) {
        data.forEach((item) => {
            for (const itemKey in item) {
                const DataItem = item[itemKey];
                if (DataItem || DataItem === 0 || DataItem === false) {
                    formData.append(itemKey, DataItem);
                }
            }
        });
    }

    config.data = formData;
}
/*params请求参数的删改*/
function getDataMethod(config: AxiosRequestConfig) {
    const params = config.params;
    let paramsNew: {
        [propsName: string]: string;
    } = {};
    for (const paramsKey in params) {
        if (params.hasOwnProperty(paramsKey)) {
            const paramsItem = params[paramsKey];
            if (paramsItem || paramsItem === 0 || paramsItem === false) {
                paramsNew[paramsKey] = paramsItem;
            }
        }
    }
    config.params = paramsNew;
}
const codesMethod:{[key:number]:()=>void} = {
    5002:()=>{
        message.error("身份无效或者过期请重新登录");
        store.dispatch(updateToken(""));
    }
    ,
    5003:()=>{
        message.error("有账号在在异地登录");
        store.dispatch(updateToken(""));
    },
    500:()=>{
        message.error("用户名或密码错误");
    }
}
// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
   const code : number | undefined =  response.data?.code
    code && codesMethod[code] && codesMethod[code]()
    return response.data;
  },
  function (error) {
    if (error.message !== "meCancel") {
      message.error("网络错误");
    }

    return Promise.reject(error);
  }
);
export default instance
