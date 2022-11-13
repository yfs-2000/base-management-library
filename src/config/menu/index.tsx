import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
const Home = lazy(() => import("../../pages/Home"));
const User = lazy(() => import("../../pages/User"));
const Login = lazy(() => import("../../pages/Login/Login"));
const NoPermission = lazy(
  () => import("../../pages/NoPermission/NoPermission")
);
const HomePage = lazy(() => import("../../container/HomePage/HomePage"));
export interface IMenu {
  path: string;
  iconName: string;
  title: string;
  id: string;
  sub: Array<IMenu>; //如果有子路由的话
  aut: string[]; //权限
}
const menu: IMenu[] = [
  {
    path: "Home",
    iconName: "icon1xinzengxilie",
    title: "新增系列/型号",
    id: "brandauthority",
    aut: [],
    sub: [], //如果有子路由的话
  },
  {
    path: "system",
    iconName: "icon4xitongshezhi",
    title: "系列设置",
    id: "system",
    aut: [],
    sub: [
      {
        path: "user",
        iconName: "",
        title: "用户管理",
        id: "systemauthority",
        sub: [], //如果有子路由的话
        aut: [],
      },
    ], //如果有子路由的话
  },
];
export const routers = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "*",
        element: <NoPermission />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
export default menu;
