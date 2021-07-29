import React from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
//权限
const Auth = (
  WrappedComponent: React.FC<any>
): React.FC<RouteComponentProps> => {
  return function (props) {
    /*估计token 去判断是否存在 如果不存在 那么返回对应的*/
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const token = useAppSelector((state) => state.userInfo.token);
    const { location } = props;
    if (location.pathname === "/login" && token) {
      return <Redirect to={"/"} />;
    }
    if (location.pathname !== "/login" && !token) {
      return <Redirect to={"/login"} />;
    }
    return <WrappedComponent {...props} />;
  };
};

export default Auth;
