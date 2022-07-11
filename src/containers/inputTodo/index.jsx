import React from "react";
import { Button, Form, Input } from "antd";
import "./index.css";
import { nanoid } from "nanoid";
import utils from "../../utils";
import PropTypes from "prop-types";
//引入action
import { addTodo } from "../../redux/actions/todo";
//引入connect用于连接UI组件与redux
import { connect } from "react-redux";

const layout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 20,
  },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

function InputTodo(props) {
  const nowTime = new Date();
  const timestamp = utils.timestampToTime(nowTime);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    const newTodo = {
      id: nanoid(),
      title: values.todo.title,
      content: values.todo.content,
      setTime: timestamp,
      doneTime: null,
      check: false,
      checkDone: false,
      confirmDone: false,
    };
    props.addTodo(newTodo);
    form.resetFields();
  };

  return (
    <div className="input-todo">
      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["todo", "title"]}
          label="標題"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name={["todo", "content"]} label="內容">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 18 }}>
          <Button className="" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

//使用connect()()创建并暴露一个Count的容器组件
//connect(mapStateToProps,mapDispatchToProps)(UIcomponent);
export default connect((state) => state, {
  addTodo,
})(InputTodo);
