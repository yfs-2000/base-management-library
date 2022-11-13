import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
//权限
const Auth = (WrappedComponent: React.FC<any>): React.FC => {
  return function () {
    /*估计token 去判断是否存在 如果不存在 那么返回对应的*/
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const token = useAppSelector((state) => state.userInfo.token);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const location = useLocation();
    if (location.pathname === "/login" && token) {
      return <Navigate to={"/"} replace />;
    }
    if (location.pathname !== "/login" && !token) {
      return <Navigate to={"/login"} replace />;
    }
    return <WrappedComponent />;
  };
};

export default Auth;
