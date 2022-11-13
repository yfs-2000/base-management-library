import React, { useState } from "react";
import AuthWarpHoc from "src/HOC/AuthWarpHoc";
import { Row, Col, Form, Input, Button } from "antd";
import { updateToken } from "src/redux/action";
/*import { userLogin } from "src/api/login";*/
import md5 from "md5";
import loginIkon from "src/common/images/loginIkon.png";
import logo from "src/common/images/logo.png";
import styles from "./Login.module.less";
import { useAppDispatch } from "../../redux/hook";
const Login: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  function loginSubmit() {
    form.validateFields().then((values) => {
      const { username, password } = values;
      //要删除
      dispatch(updateToken("随便写的 真实要删除"));
      /*setLoading(true);
      userLogin({
        username: username.trim(),
      })
        .then((res: any) => {
          /!*(res:{
            code: number;
            data: {
              tokenType: string;
              token: string;
            };
          }*!/
          if (res.code === 200) {
            dispatch(updateToken(res.data.tokenType + " " + res.data.token));
          } else {
            setLoading(false);
          }
        })
        .catch(() => {
          setLoading(false);
        });*/
    });
  }
  return (
    <div className={styles.loginWrap}>
      <div className={styles.loginContent}>
        {/*使用栅格系统进行响应式*/}
        <Row align={"middle"} justify={"center"} gutter={80}>
          <Col xs={0} sm={0} md={0} lg={9} xl={9}>
            <img src={loginIkon} width={"100%"} alt={"欢迎"} />
          </Col>
          <Col xs={20} sm={16} md={14} lg={10} xl={9}>
            <div className={styles.loginBox}>
              <div
                style={{
                  width: "80%",
                }}
              >
                <div className={styles.luxImages}>
                  <img src={logo} alt="" width={120} height={120} />
                </div>
                <Form layout={"vertical"} form={form}>
                  <Form.Item
                    style={{
                      paddingBottom: 20,
                    }}
                    label="账户"
                    name={"username"}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "账户不能为空",
                      },
                    ]}
                  >
                    <Input
                      autoComplete={"off"}
                      placeholder="请输入账户"
                      bordered={false}
                    />
                  </Form.Item>
                  <Form.Item
                    style={{
                      paddingBottom: 60,
                    }}
                    label="密码"
                    name={"password"}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "密码不能为空",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="请输入密码"
                      bordered={false}
                      onPressEnter={loginSubmit}
                    />
                  </Form.Item>

                  {/*<Form.Item name="remember" valuePropName="checked">
                      <Checkbox>记住密码</Checkbox>
                    </Form.Item>*/}
                </Form>
                <Button
                  type={"primary"}
                  className={styles.loginButton}
                  onClick={loginSubmit}
                  loading={loading}
                >
                  登录
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AuthWarpHoc(Login);
