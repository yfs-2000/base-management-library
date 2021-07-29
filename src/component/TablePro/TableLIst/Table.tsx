import React, { useEffect, useRef, useState } from "react";
import { Button, Pagination, Table } from "antd";
import "./Table.less";
import ResizeObserver from "resize-observer-polyfill";
import { ITablesListProps } from "../typing";

function Tables({
  setInfo,
  dataList,
  loadingList,
  total,
  handleTableSorter,
  headerTitle,
  buttons,
  info,
  ...props
}: ITablesListProps) {
  const tableWarpDom = useRef<HTMLDivElement>(null);
  const [tableHeight, setTableHeight] = useState<string | number>("100%");
  const onChange = (current: number, pageSize: number | undefined) => {
    setInfo((state) => ({
      ...state,
      size: pageSize ? pageSize : state.size,
      page: current,
    }));
  };
  const onShowSizeChange = (current: number, pageSize: number) => {
    setInfo((state) => ({
      ...state,
      size: pageSize,
      page: current,
    }));
  };
  //table 表格高度问题
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let height = 0;
    const ro = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          const crHeight = entry.contentRect.height;
          if (height === crHeight) return;
          setTableHeight(crHeight - 140);
          height = crHeight;
        }, 500);
      }
    });
    const dom = tableWarpDom.current;
    // 观察一个或多个元素
    dom && ro.observe(dom);
    return () => {
      dom && ro.unobserve(dom);
      timer && clearTimeout(timer);
    };
  }, []);

  return (
    <div className={"tablesWarp"} ref={tableWarpDom}>
      <div className={"tableListView"}>
        <div className={"tableListHeader"}>
          <div className={"tableListHeaderText"}>{headerTitle}</div>
          <div>
            {buttons.map((item) => {
              if (item) {
                return (
                  <Button
                    icon={<i className={`iconfont ${item.iconName}`} />}
                    type={item.type}
                    onClick={item.click}
                    key={item.text}
                    className={"tableListHeaderButton"}
                    disabled={item.disabled}
                  >
                    {item.text}
                  </Button>
                );
              }
              return null;
            })}
          </div>
        </div>
        <Table
          scroll={{ x: "true", y: tableHeight }}
          pagination={false}
          bordered={false}
          dataSource={dataList}
          loading={loadingList}
          onChange={handleTableSorter}
          {...props}
        />
      </div>
      <div className={"PaginationConView"}>
        <Pagination
          defaultCurrent={1}
          onChange={onChange}
          size={"small"}
          defaultPageSize={20}
          total={total}
          showSizeChanger={true}
          showQuickJumper={true}
          current={info.page}
          pageSize={info.size}
          onShowSizeChange={onShowSizeChange}
          pageSizeOptions={["20", "40", "60"]}
        />
      </div>
    </div>
  );
}

export default Tables;
