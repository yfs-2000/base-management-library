import React from "react";
import styles from "./MyTabBar.module.less";
import classnames from "classnames";
//自定义tabBar的头部
const MyTabBar = (props: any) => {
  return (
    <ul className={styles.myTabBar}>
      {props.panes.map((item: any) => (
        <li
          className={classnames(styles.myTabBarItem, {
            [styles.myTabBarItemActive]: props.activeKey === item.key,
          })}
          key={item.key}
          onClick={(event) => {
            props.onTabClick(item.key, event);
          }}
        >
          {item.props.tab}
        </li>
      ))}
    </ul>
  );
};

export default MyTabBar;
