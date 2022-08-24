import React, { useState } from "react";
import ThirdPartyLogin from "../thirdPartyLogin";
import { Button, Form, Input, Modal, Checkbox } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

import "./index.css";
import authService from "../../service/auth.service";
//import redux action
import { userLogin } from "../../redux/actions/user";
//import react redux UI, use "connect" UI to connect Redux store & react component.
import { connect } from "react-redux";

const CollectionCreateForm = ({
  props,
  visible,
  onCreate,
  onCancel,
  setVisible,
}) => {
  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      const result = await authService.login(email, password);
      await props.userLogin(result.data);
      // console.log("result: ", result);
      // console.log("props.user: ", props.user);
    } catch (err) {
      console.error(err);
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
            console.error("Validate Failed:", info);
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
        <ThirdPartyLogin setVisible={setVisible} props={props} />
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
    // console.log("Received values of form: ", values);
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
        setVisible={setVisible}
      />
    </div>
  );
}

/*
React Redux UI
Use connect()() creact & export a container component
connect(mapStateToProps,mapDispatchToProps)(UIcomponent);
*/
export default connect((state) => state, {
  userLogin,
})(UserLogin);
