import { ButtonType } from "antd/es/button";
import { TableProps } from "antd";
import { Dayjs } from "dayjs";
import React from "react";
//表格头部按钮
export interface IButtons {
  iconName: string;
  text: string;
  disabled?: boolean;
  type: ButtonType;
  click: () => void;
}
//tableList表格需要传入的
export interface ITablesListProps extends IUseRequestResult, TableProps<any> {
  headerTitle: string;
  buttons: (IButtons | null)[];
}
//排序的值
type sorter = {
  field: string;
  order: "ascend" | "descend";
}; /*"ascend" | "descend" | undefined;*/
//表格数据 hook 的
export interface IInfo {
  size: number;
  page: number;
  sorter: sorter | undefined;
}
/*请求hook的返回值*/
export interface IUseRequestResult {
  /*表格回传的信息*/
  info: IInfo;
  /*设置信息*/
  setInfo: React.Dispatch<React.SetStateAction<IInfo>>;
  /*当前页面的条数*/
  total: number;
  /*data数据*/
  dataList: any[];
  setDataList: React.Dispatch<React.SetStateAction<any[]>>;
  /*防止多次请求*/
  loadingList: boolean;
  /*请求函数*/
  getDataList: () => void;
  /*排序变化*/
  handleTableSorter: (pagination: any, filters: any, sorter: any) => void;
}
//form的选择类型
export type InputType = "Input" | "Select" | "TimePicker";
//form的每个表单的类型
export interface IFormDataItem {
  /* 标题 **/
  label: string;
  valueType: InputType;
  id?: string;
  transfromOnchang?: (
    value: string | [Dayjs, Dayjs]
  ) => string | [Dayjs, Dayjs];
  data?: {
    name: string;
    id: number | string;
  }[];
}
export interface stateProps {
  [propName: string]: string | [Dayjs, Dayjs];
}
//form直接的props类型
export interface ITableFilterFormProps {
  onSearch: (state: stateProps) => void;
  data: IFormDataItem[];
}
/*请求的函数 返回一个promise格式的data  data的格式为 {list:[],total:number}*/
export interface IRequestApi {
  (IInfo: IInfo, state: stateProps): Promise<{ list: any[]; total: number }>;
}
//protable 的类型
export interface ITableProProps {
  filterOption: IFormDataItem[];
  tableOption: TableProps<any>;
  headerTitle: string;
  buttons: (IButtons | null)[];
  request: IRequestApi;
}
export interface IRef {
  refresh: () => void;
  setDataList: React.Dispatch<React.SetStateAction<any[]>>;
  formRef: any;
  setInfo: React.Dispatch<React.SetStateAction<IInfo>>;
}
