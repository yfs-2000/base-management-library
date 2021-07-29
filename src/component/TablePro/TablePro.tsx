import React, {
  useCallback,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import TableFilterForm from "./TableFilterForm/TableFilterForm";
import TableLIst from "./TableLIst/Table";
import useRequest from "./useRequest";
import { ITableProProps, IInfo, IRef } from "./typing";
import { Dayjs } from "dayjs";
import "./TablePro.less";
export default forwardRef<IRef, ITableProProps>(
  ({ filterOption, tableOption, request, headerTitle, buttons }, ref) => {
    const [state, setState] = useState<{
      [propName: string]: string | [Dayjs, Dayjs];
    }>({}); //当前查询确认的参数
    const FromRef = useRef(null); //查询的ref  里面有state值
    /*const api = useCallback(
      (IInfo: IInfo) => {
        return request(IInfo, state);
      },
      [state, request]
    ); //api*/
    const props = useRequest(request, state); //当前请求后所有的状态
    //分发
    useImperativeHandle(ref, () => ({
      refresh: props.getDataList,
      setDataList: props.setDataList,
      setInfo: props.setInfo,
      formRef: FromRef,
    }));
    return (
      <div className={"TablePro"}>
        <TableFilterForm
          ref={FromRef}
          data={filterOption}
          onSearch={(value) => {
            setState(value);
            props.setInfo((value) => ({ ...value, page: 1 }));
          }}
        />
        <TableLIst
          {...tableOption}
          headerTitle={headerTitle}
          buttons={buttons}
          {...props}
        />
      </div>
    );
  }
);
