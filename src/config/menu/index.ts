import { lazy } from "react";
const Home = lazy(() => import("../../pages/Home"));
const User = lazy(() => import("../../pages/User"));

export interface IMenu {
  path: string;
  iconName: string;
  title: string;
  id: string;
  component?: any;
  exact?: boolean;
  sub: Array<IMenu>; //如果有子路由的话
  aut: string[];//权限
}
const menu: IMenu[] = [
  {
    path: "/Home",
    iconName: "icon1xinzengxilie",
    title: "新增系列/型号",
    component: Home,
    id: "brandauthority",
    exact: true,
    aut: [],
    sub: [], //如果有子路由的话
  },
  {
    path: "/system",
    iconName: "icon4xitongshezhi",
    title: "系列设置",
    id: "system",
    aut: [],
    sub: [
      {
        path: "/system/user",
        iconName: "",
        title: "用户管理",
        id: "systemauthority",
        sub: [], //如果有子路由的话
        aut: [],
        component: User,
        exact: true,
      },
    ], //如果有子路由的话
  },
];

export default menu;
