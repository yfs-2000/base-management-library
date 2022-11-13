import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn"; // 导入本地化语言
import zhCN from "antd/lib/locale/zh_CN";
import "./App.less";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Spin } from "antd";
import { routers } from "./config/menu";
dayjs.locale("zh-cn"); // 使用本地化语言
function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <Suspense
          fallback={
            <div className={"suspenseApp"}>
              <Spin spinning />
            </div>
          }
        >
          <RouterProvider router={routers} />
        </Suspense>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
