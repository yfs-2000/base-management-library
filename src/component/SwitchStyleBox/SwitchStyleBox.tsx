import React from "react";
import styles from "./SwitchStyleBox.module.less";

const SwitchStyleBox: React.FC<{ title: string }> = ({ children, title }) => {
  return (
    <div className={styles.switchStyleBox}>
      <div className={styles.switchStyleBoxTitle}>
        <span />
        {title}
      </div>
      {children}
    </div>
  );
};

export default SwitchStyleBox;
