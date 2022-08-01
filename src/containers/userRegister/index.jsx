import React, { useState } from "react";
import ThirdPartyLogin from "../thirdPartyLogin";
import { Button, Form, Input, Modal, Checkbox } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";

import "./index.css";
import AuthService from "../../service/auth.service";
//import redux action
import { userLogin } from "../../redux/actions/user";
//import react redux UI, use "connect" UI to connect Redux store & react component.
import { connect } from "react-redux";

const CollectionCreateForm = ({
  props,
  setVisible,
  visible,
  onCreate,
  onCancel,
}) => {
  const onFinish = async (values) => {
    const { username, email, password } = values;
    try {
      const result = await AuthService.register(username, email, password);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };
  const [form] = Form.useForm();

  return (
    <Modal
      className="registerModel"
      visible={visible}
      title="Sign up"
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
        <ThirdPartyLogin
          props={props}
          setVisible={setVisible}
          visible={visible}
          onCreate={onCreate}
          onCancel={onCancel}
        />
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username !",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
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
        {/* <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item> */}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Sign up with Email
          </Button>
          Already Signed Up? <a href="">Login now!</a>
        </Form.Item>
      </Form>
    </Modal>
  );
};

//React UI component.
function UserRegister(props) {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setVisible(false);
  };
  return (
    <div className="user-register">
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        SignUp
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
})(UserRegister);
