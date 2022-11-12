import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn"; // 导入本地化语言
import zhCN from "antd/lib/locale/zh_CN";
import "./App.less";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Spin } from "antd";
const Login = lazy(() => import("./pages/Login/Login"));
const HomePage = lazy(() => import("./container/HomePage/HomePage"));
dayjs.locale("zh-cn"); // 使用本地化语言
function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <BrowserRouter>
          <Suspense
            fallback={
              <div className={"suspenseApp"}>
                <Spin spinning />
              </div>
            }
          >
            <Routes>
              <Route path={"/login"} element={<Login />} />
              <Route path={"/"} element={<HomePage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
