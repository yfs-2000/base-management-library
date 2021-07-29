import { lazy } from "react";
const Home = lazy(() => import("../../pages/Home"));
const User = lazy(() => import("../../pages/User"));
export interface IRouter {
  path: string;
  component: any;
  id: string;
  exact: boolean;
  sub?: IRouter[];
}

const router: IRouter[] = [
  {
    path: "/Home",
    id: "brandauthority",
    component: Home,
    exact: true,
  },
  {
    path: "/system/user",
    id: "systemauthority",
    component: User,
    exact: true,
  },
];
export default router;
