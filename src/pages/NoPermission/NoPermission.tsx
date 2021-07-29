import React from "react";
import auth from "src/common/images/404.png";
import styles from "./NoPermission.module.less";
const NoPermission = () => {
  return (
    <div className={styles.noPage}>
      <img src={auth} alt="没有权限" />
      <p>对不起,您不能访问该模块</p>
    </div>
  );
};

export default NoPermission;
