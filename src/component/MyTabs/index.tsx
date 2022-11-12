import React from "react";
import { Tabs } from "antd";
import MyTabBar from "../MyTabBar/MyTabBar";
interface Props {
  activeKey: string;
  onChange: (value: string) => void;
}

const MyTabs: React.FC<Props> = ({ activeKey, onChange, children }) => {
  return (
    <div style={{ marginBottom: 10 }}>
      <Tabs
        activeKey={activeKey}
        onChange={onChange}
        type="card"
        style={{ overflow: "visible" }}
        renderTabBar={(props) => <MyTabBar {...props} />}
      >
        {children}
      </Tabs>
    </div>
  );
};

export default MyTabs;
