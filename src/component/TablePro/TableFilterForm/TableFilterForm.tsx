import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Input, Select, Button, Row, Col } from "antd";
import DatePicker from "../../DatePicker/DatePicker";
import FormLayout from "../../Formlayout/Formlayout";
import dayjs, { Dayjs } from "dayjs";
import "./TableFilterForm.less";
import { ITableFilterFormProps, stateProps } from "../typing";
import locale from "antd/es/date-picker/locale/zh_CN";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;
const { Option } = Select;
export default forwardRef<any, ITableFilterFormProps>(
  ({ onSearch, data }, ref) => {
    const [state, setState] = useState<stateProps>({});
    const [unfold, setUnfold] = useState(false); //展开收起
    //设置state
    function setStateInput(value: string | [Dayjs, Dayjs], name: string): void {
      setState((state) => ({
        ...state,
        [name]: value,
      }));
    }
    //设置值  并且进行转换
    function transitionValueInput<T extends string | [Dayjs, Dayjs]>(
      value: T,
      name: string,
      onChange?: (value: T) => T
    ) {
      //如果传入onchange 则代表需要自定义值  如不能输入汉字等需求
      const values = onChange ? onChange(value) : value;
      setStateInput(values, name);
    }
    //时间选择器 不能选择的时间
    function disabledDate(current: Dayjs): boolean {
      // Can not select days before today and today
      return current && current.valueOf() >= dayjs().endOf("day").valueOf();
    }
    //ref
    useImperativeHandle(ref, () => ({
      state,
    }));
    return (
      <div className={"TableFilterForm"}>
        <div className={"TableFilterFormTitle"}>
          <p className={"TableFilterFormTitleText"}>按条件搜索</p>
          <div
            onClick={() => setUnfold(!unfold)}
            className={"TableFilterFormTitleIcon"}
          >
            {unfold ? (
              <>
                <span>收起</span>
                <UpOutlined />
              </>
            ) : (
              <>
                <span>展开</span>
                <DownOutlined />
              </>
            )}
          </div>
        </div>
        <div
          style={{ display: unfold ? "block" : "none" }}
          className={"TableFilterFormContent"}
        >
          <Row gutter={[48, 20]}>
            {data.map((item, index) => {
              const name = item.id ? item.id : item.label;
              let form;
              if (item.valueType === "Input") {
                form = (
                  <Input
                    value={state[name] as string}
                    onChange={(e) => {
                      transitionValueInput(
                        e.target.value,
                        name,
                        item.transfromOnchang
                      );
                    }}
                    onPressEnter={() => {
                      onSearch({ ...state });
                    }}
                  />
                );
              }
              if (item.valueType === "Select") {
                form = (
                  <Select
                    style={{ width: "100%" }}
                    value={state[name] as string}
                    onChange={(value) => {
                      transitionValueInput(value, name, item.transfromOnchang);
                    }}
                  >
                    {item.data &&
                      item.data.map((son, index) => (
                        <Option key={index} value={son.id}>
                          {son.name}
                        </Option>
                      ))}
                  </Select>
                );
              }
              if (item.valueType === "TimePicker") {
                form = (
                  <RangePicker
                    locale={locale}
                    style={{ width: "100%" }}
                    disabledDate={disabledDate}
                    value={state[name] as [Dayjs, Dayjs]}
                    onChange={(date, dateString) => {
                      transitionValueInput(
                        date as [Dayjs, Dayjs],
                        name,
                        item.transfromOnchang
                      );
                    }}
                  />
                );
              }
              return (
                  <Col xs={20} sm={20} md={10} lg={7} xl={7} xxl={5} key={index}>
                  <FormLayout title={item.label} form={form} width={0} />
                </Col>
              );
            })}
            {/*底部按钮   如果后期有别的  可以自定义传入按钮进来通过 ref,  控制内部函数的方法
                如没有 则先这样
            */}
              <Col xs={20} sm={20} md={10} lg={7} xl={7} xxl={4}>
              <Button
                onClick={() => {
                  setState({});
                  onSearch({});
                }}
              >
                重置
              </Button>
              <Button
                onClick={() => {
                  onSearch({ ...state });
                }}
                type={"primary"}
              >
                搜索
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
);
