import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Pagination, Table } from "antd";
import "./Table.less";
import ResizeObserver from "resize-observer-polyfill";
import { ITablesListProps } from "../typing";
import { TableRowSelection } from "antd/es/table/interface";
function Tables<T extends object = any>({
  setInfo,
  dataList = [],
  loadingList,
  total,
  handleTableSorter,
  headerTitle,
  buttons,
  info,
  rowSelection: externalRowSelection = {},
  rowKey,
  selectNumVisible,
  ...props
}: ITablesListProps) {
  const tableWarpDom = useRef<HTMLDivElement>(null);
  const [tableHeight, setTableHeight] = useState<string | number>("100%");
  const [selectedRowKey, setSelectedRowKey] = useState<React.Key[]>([]); //选中表格的id
  //如果有传入的key值转选中传入的
  const RowKeys = externalRowSelection?.selectedRowKeys || selectedRowKey;
  //根据外部传入的函数选中是否禁用
  const disabledFn = useRef(externalRowSelection?.getCheckboxProps);
  disabledFn.current = externalRowSelection?.getCheckboxProps;
  const disabled = useCallback((record) => {
    return disabledFn.current ? disabledFn.current(record).disabled : false;
  }, []);
  //data变化时就筛选一遍
  useEffect(() => {
    setSelectedRowKey((value) => {
      return dataList.filter(
        (item) => value.includes(item[rowKey as string]) && !disabled(item)
      );
    });
  }, [dataList, rowKey, disabled]);
  const rowSelection: TableRowSelection<T> = {
    onChange: setSelectedRowKey,
    selectedRowKeys: selectedRowKey,
    renderCell: (checked, record, index, originNode) => (
      <div
        onClick={() => {
          if (disabled(record)) return;
          let newSelectedRowKey;
          if (checked) {
            newSelectedRowKey = selectedRowKey.filter(
              // @ts-ignore
              (key) => key !== record[rowKey]
            );
          } else {
            // @ts-ignore
            selectedRowKey.push(record[[rowKey]]);
            newSelectedRowKey = [...selectedRowKey];
          }
          setSelectedRowKey(newSelectedRowKey);
        }}
        className={"renderCellBoxStyle"}
        style={{
          cursor: disabled(record) ? "not-allowed" : "pointer",
        }}
      >
        {originNode}
      </div>
    ),
    ...externalRowSelection,
  };
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
          <div className={"tableListHeaderText"}>
            {headerTitle}
            {selectNumVisible && ` 选中了${selectedRowKey.length}条数据`}
          </div>
          <div>
            {buttons.map((item) => {
              if (item) {
                return (
                  <Button
                    icon={<i className={`iconfont ${item.iconName}`} />}
                    type={item.type}
                    onClick={() => item.click(RowKeys)}
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
        <Table<T>
          scroll={{ x: "true", y: tableHeight }}
          pagination={false}
          bordered={false}
          dataSource={dataList}
          loading={loadingList}
          onChange={handleTableSorter}
          rowSelection={rowSelection}
          rowKey={rowKey}
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
