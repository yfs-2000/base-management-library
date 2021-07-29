import React, { useState } from "react";
import { Breadcrumb, Layout, Dropdown, Menu, Modal, Form, Input } from "antd";
import myMenu, { IMenu } from "src/config/menu";
import { useLocation, Link } from "react-router-dom";
import { updateToken } from "src/redux/action";
import { RootState } from "src/redux/store";
import { DownOutlined } from "@ant-design/icons";
/*import { editPassword } from "src/API/login";*/
import styles from "./Header.module.less";
/*import md5 from "md5";*/
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
const { Header } = Layout;
const MyHeader = () => {
  const [modalShow, setModalShow] = useState(false); //修改密码的弹窗
  const [submitLoading, setSubmitLoading] = useState(false); //提交按钮的等待
  const location = useLocation();
  const dispatch = useAppDispatch();
  const userName = useAppSelector(
    (state: RootState) => state.userInfo.userName
  );
  const [form] = Form.useForm();
  const pathSnippets = location.pathname.split("/").filter((i) => i); //当前路由数组
  //查当前url 对应的 路由名
  function BreadcrumbName(url: string): string {
    let name = "";
    function fn(arr: IMenu[]) {
      const length = arr.length;
      for (let i = 0; i < length; i++) {
        if (arr[i].path === url) {
          name = arr[i].title;
          return;
        }
        if (arr[i].path !== url && arr[i].sub.length > 0) {
          fn(arr[i].sub);
        }
      }
    }
    fn(myMenu);
    return name;
  }
  //当前的路由结构
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    const name = BreadcrumbName(url);
    return (
      <Breadcrumb.Item key={url}>
        {index === 0 || index === pathSnippets.length - 1 ? (
          name
        ) : (
          <Link to={url}>{name}</Link>
        )}
      </Breadcrumb.Item>
    );
  });
  //下拉的小菜单
  const menu = (
    <Menu
      onClick={({ key }) => {
        if (key === "1") {
          setModalShow(true);
        }
        if (key === "2") {
          dispatch(updateToken(""));
        }
      }}
    >
      {/* <Menu.Item key="1">修改密码</Menu.Item>*/}
      <Menu.Item key="2">退出</Menu.Item>
    </Menu>
  );
  const formItemLayout = {
    labelCol: {
      xs: { span: 4 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 20 },
      sm: { span: 20 },
    },
  };
  function editPasswordConfig() {
    /*form.validateFields().then((value) => {
      setSubmitLoading(true);
      editPassword({
        oldPwd:,
        pwd: ,
      })
        .then((res: any) => {
          if (res === 1) {
            dispatch(updateToken(""));
          } else {
            message.warn(res.message);
            setSubmitLoading(false);
          }
        })
        .catch(() => {
          setSubmitLoading(false);
        });
    });*/
  }
  return (
    <div className={styles.headerWarp}>
      <Header className={styles.siteHeader}>
        <Breadcrumb className={styles.siteHeaderBreadcrumb}>
          {extraBreadcrumbItems}
        </Breadcrumb>
        <div>
          <Dropdown overlay={menu}>
            <span>
              <span style={{ marginRight: 10 }}>{userName}</span>
              <DownOutlined />
            </span>
          </Dropdown>
        </div>
        <Modal
          confirmLoading={submitLoading}
          centered={true}
          destroyOnClose={true}
          visible={modalShow}
          title={"修改密码"}
          onCancel={() => setModalShow(false)}
          onOk={editPasswordConfig}
          width={610}
        >
          <Form {...formItemLayout} form={form}>
            <Form.Item
              name={"oldPassword"}
              label={"原密码"}
              rules={[
                {
                  required: true,
                  message: "请输入旧密码",
                },
              ]}
            >
              <Input.Password autoComplete={"off"} />
            </Form.Item>
            <Form.Item
              name={"newPassword"}
              label={"新密码"}
              rules={[
                {
                  required: true,
                  message: "请输入新密码",
                },
              ]}
            >
              <Input.Password autoComplete={"off"} />
            </Form.Item>
            <Form.Item
              name={"confirmPassword"}
              dependencies={["confirmPassword"]}
              label={"确认密码"}
              rules={[
                {
                  required: true,
                  message: "请输入确认密码",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("2次密码不一致,请重新输入")
                    );
                  },
                }),
              ]}
            >
              <Input.Password autoComplete={"off"} />
            </Form.Item>
          </Form>
        </Modal>
      </Header>
    </div>
  );
};

export default MyHeader;
