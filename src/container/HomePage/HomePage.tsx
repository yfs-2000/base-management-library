import React, { useEffect, Suspense, useState, lazy } from "react";
import AuthWarpHoc from "../../HOC/AuthWarpHoc";
import routers, { IMenu } from "src/config/menu";
import FilterContainer from "./FilterContainer/FilterContainer";
import { Route, Routes, Outlet } from "react-router-dom";
import NoPermission from "../../pages/NoPermission/NoPermission";
import { Spin } from "antd";
import styles from "./HomePage.module.less";
import {
  asyncSetBrandData,
  addTressData,
  updateUserInfo,
} from "../../redux/action";
import { useAppDispatch } from "../../redux/hook";
const Home = lazy(() => import("../../pages/Home"));
const HomePage = () => {
  const reduxDispatch = useAppDispatch();
  const [routerArr, setRouterArr] = useState<IMenu[]>([]); //加入权限的路由表
  useEffect(() => {
    let unLoad = false;
    /*通过token 请求权限*/
    /*然后权限树再对比遍历路由 业务不同对比不同*/
    /*getUserInfo().then((value: any) => {
      if (unLoad) return;
      const { nickname, username, ...autArr } = value;
      const tress: { pathName: string; aut: string[] }[] = [];
      const keys = Object.keys(autArr);
      /!*层级很多的写法*!/
      function fn(routers: IMenu[]) {
        return routers.reduce<IMenu[]>((pre, now) => {
        if (
            now.sub.length > 0 &&
            keys.some((item) => item.startsWith(now.id))
          ) {
            pre.push({
              ...now,
              aut: autArr[now.id],
              sub: fn(now.sub),
            });
          }else if (keys.includes(now.id) && autArr[now.id].length > 0) {
            pre.push({
              ...now,
              aut: autArr[now.id],
            });
            tress.push({
              pathName: now.path,
              aut: autArr[now.id],
            });
          }

          return pre;
        }, []);
      }
      setRouterArr(fn(routers));
      reduxDispatch(addTressData(tress)); //可以更好的通过路由名称去拿路由权限
      reduxDispatch(updateUserInfo(nickname));
    });*/
    setRouterArr(routers);
    return () => {
      unLoad = true;
    };
  }, [reduxDispatch]);
  useEffect(() => {
    reduxDispatch(asyncSetBrandData());
  }, [reduxDispatch]);
  return (
    <FilterContainer routerArr={routerArr}>
      <Suspense
        fallback={
          <div className={styles.suspense}>
            <Spin spinning />
          </div>
        }
      >
        <Routes>
          {routerArr.map((item) => {
            if (item.element) {
              return <Route key={item.path} {...item} />;
            } else if (item.sub.length) {
              return (
                <Route key={item.path} path={item.path} element={<Outlet />}>
                  {item.sub.map((child) => (
                    <Route key={child.path} {...child} />
                  ))}
                </Route>
              );
            }
            return null;
          })}
          <Route index element={<Home />} />
          <Route path="*" element={<NoPermission />} />
        </Routes>
      </Suspense>
    </FilterContainer>
  );
};

export default AuthWarpHoc(HomePage);
