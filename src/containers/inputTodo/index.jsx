import React from "react";
import { Button, Form, Input } from "antd";
import "./index.css";
import todoService from "../../service/todo.service";
import { nanoid } from "nanoid";
import utils from "../../utils";
//引入action
import { addTodoState } from "../../redux/actions/todo";
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
  // console.log("InputTodo(props) : ", props);
  const nowTime = new Date();
  const timestamp = utils.timestampToTime(nowTime);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    // console.log("InputTodo(props) : ", props);
    if (!props.user) {
      const newTodo = {
        _id: nanoid(),
        title: values.todo.title,
        content: values.todo.content,
        setTime: timestamp,
        doneTime: null,
        check: false,
        checkDone: false,
        confirmDone: false,
      };
      props.addTodoState(newTodo);
      form.resetFields();
    } else {
      let userId = props.user._id;
      const newTodo = {
        jwt: JSON.parse(localStorage.getItem("jwt")),
        title: values.todo.title,
        content: values.todo.content,
        userId,
        setTime: timestamp,
        doneTime: null,
        check: false,
        checkDone: false,
        confirmDone: false,
      };
      // console.log("newTodo : ", newTodo);
      const result = await todoService.updateTodo(newTodo);
      // console.log("result : ", result.data.savedObject);
      const savedTodo = {
        _id: result.data.savedObject._id,
        title: values.todo.title,
        content: values.todo.content,
        userId,
        setTime: timestamp,
        doneTime: null,
        check: false,
        checkDone: false,
        confirmDone: false,
      };
      props.addTodoState(savedTodo);
      form.resetFields();
    }
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

/*
React Redux UI
Use connect()() creact & export a container component
connect(mapStateToProps,mapDispatchToProps)(UIcomponent);
*/ export default connect((state) => state, {
  addTodoState,
})(InputTodo);
