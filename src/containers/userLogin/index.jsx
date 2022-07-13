import React, { useState } from "react";
import { Button, Form, Input, Modal, Checkbox } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

import "./index.css";
import AuthService from "../../service/auth.service";
//引入action
import { userLogin } from "../../redux/actions/user";
//引入connect用于连接UI组件与redux
import { connect } from "react-redux";

const CollectionCreateForm = ({ props, visible, onCreate, onCancel }) => {
  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      const result = await AuthService.login(email, password);
      await props.userLogin(result.data.user);
      console.log("result: ", result);
      console.log("props.user: ", props.user);
    } catch (err) {
      console.log(err);
    }
  };
  const [form] = Form.useForm();
  return (
    <Modal
      className="loginModel"
      visible={visible}
      title="User Login"
      footer={null}
      onCancel={onCancel}
      width={365}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email !",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </Modal>
  );
};

function UserLogin(props) {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setVisible(false);
  };
  return (
    <div className="user-login">
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Login
      </Button>
      <CollectionCreateForm
        props={props}
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
}

//使用connect()()创建并暴露一个Count的容器组件
//connect(mapStateToProps,mapDispatchToProps)(UIcomponent);
export default connect((state) => state, {
  userLogin,
})(UserLogin);
