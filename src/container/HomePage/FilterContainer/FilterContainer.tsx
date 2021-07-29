import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import MyHeader from "../Header/Header";
import { IMenu } from "src/config/menu";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./FilterContainer.module.less";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const FilterContainer: React.FC<{ routerArr: IMenu[] }> = ({
  children,
  routerArr,
}) => {
  const history = useHistory();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false); //侧边栏的关闭
  const [openKeys, setOpenKeys] = useState<string[]>(() => {
    const keys = location.pathname.split("/").filter((i) => i);
    return ["/" + keys[0]];
  }); //展开的项目
  useEffect(() => {
    const keys = location.pathname.split("/").filter((i) => i);
    if (keys.length >= 2) {
      setOpenKeys(["/" + keys[0]]);
    }
  }, [location.pathname]);
  //当前选中的
  function SelectedKeys(): string[] {
    return [location.pathname];
  }
  return (
    <Layout style={{ height: "100vh" }} className={styles.siderWarp}>
      <Sider
        collapsible
        breakpoint="xl"
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        <div className={styles.siderTitle}>
          {collapsed ? "LUXSENS" : "LUXSENS-后台管理系统"}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          onClick={({ item, key, keyPath, domEvent }) => {
            history.push(key + "");
          }}
          selectedKeys={SelectedKeys()}
          // @ts-ignore
          onOpenChange={setOpenKeys}
          openKeys={openKeys}
        >
          {routerArr.map((item) => {
            if (item.sub.length === 0) {
              return (
                <Menu.Item
                  key={item.path}
                  icon={<i className={`iconfont ${item.iconName}`} />}
                >
                  {item.title}
                </Menu.Item>
              );
            }

            return (
              <SubMenu
                key={item.path}
                icon={
                  <i
                    className={`iconfont ${item.iconName} ant-menu-item-icon`}
                  />
                }
                title={item.title}
              >
                {item.sub.map((child) => {
                  return <Menu.Item key={child.path}>{child.title}</Menu.Item>;
                })}
              </SubMenu>
            );
          })}
        </Menu>
      </Sider>
      <Layout className={styles.siteLayout}>
        <MyHeader />
        <Content className={styles.siteLayoutContent}>{children}</Content>
      </Layout>
    </Layout>
  );
};
export default FilterContainer;
