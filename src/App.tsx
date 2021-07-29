import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
        <Router>
          <Suspense
            fallback={
              <div className={"suspenseApp"}>
                <Spin spinning />
              </div>
            }
          >
            <Switch>
              <Route exact={true} path={"/login"} component={Login} />
              <Route path={"/"} component={HomePage} />
            </Switch>
          </Suspense>
        </Router>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
