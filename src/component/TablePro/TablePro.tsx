import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import TableFilterForm from "./TableFilterForm/TableFilterForm";
import TableLIst from "./TableLIst/Table";
import useRequest from "./useRequest";
import { ITableProProps, IRef, stateProps } from "./typing";
import "./TablePro.less";
import MyTabs from "../MyTabs";
import { Tabs } from "antd";
const { TabPane } = Tabs;
function TablePro<T extends object = any>(
  {
    filterOption,
    tableOption,
    request,
    headerTitle,
    buttons,
    selectNumVisible = false,
    tabShow,
    tabPaneArr = [],
    filterTableDataChange,
  }: ITableProProps,
  ref: React.ForwardedRef<IRef>
) {
  const [state, setState] = useState<stateProps>({}); //当前查询确认的参数
  const [activeTab, setActiveTab] = useState(""); //当前列表数据类型
  const FromRef = useRef<stateProps>(null); //查询的ref  里面有state值
  /*const api = useCallback(
    (IInfo: IInfo) => {
      return request(IInfo, state);
    },
    [state, request]
  ); //api*/
  const props = useRequest(request, state, activeTab); //当前请求后所有的状态
  //分发
  useImperativeHandle(ref, () => ({
    refresh: props.getDataList,
    setDataList: props.setDataList,
    setInfo: props.setInfo,
    formRef: FromRef,
  }));
  return (
    <div className={"TablePro"}>
      {tabShow && (
        <MyTabs
          activeKey={activeTab}
          onChange={(value) => {
            props.setInfo((info) => ({ ...info, page: 1 }));
            setActiveTab(value);
            filterTableDataChange &&
              filterTableDataChange(value, FromRef.current?.state as any);
          }}
        >
          {tabPaneArr?.map((item) => (
            <TabPane key={item.key} tab={item.tab} />
          ))}
        </MyTabs>
      )}
      <TableFilterForm
        ref={FromRef}
        data={filterOption}
        onSearch={(value) => {
          setState(value);
          props.setInfo((value) => ({ ...value, page: 1 }));
        }}
        filterTableDataChange={(state) => {
          filterTableDataChange && filterTableDataChange(activeTab, state);
        }}
      />
      <TableLIst<T>
        {...tableOption}
        headerTitle={headerTitle}
        buttons={buttons}
        selectNumVisible={selectNumVisible}
        {...props}
      />
    </div>
  );
}
export default forwardRef(TablePro);
