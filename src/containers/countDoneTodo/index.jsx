import React from "react";
import { Checkbox, Button } from "antd";
import "./index.css";
//引入action
import { updateTodo } from "../../redux/actions/todo";
//引入connect用于连接UI组件与redux
import { connect } from "react-redux";

function CountDoneTodo(props) {
  const handleCheckedAllDoneTodo = (event) => {
    const checkDone = event.target.checked;
    const newTodos = props.todos.map((todo) => {
      return { ...todo, checkDone };
    });
    props.updateTodo(newTodos);
  };

  const handleDeleteDoneTodo = () => {
    if (!window.confirm("確定刪除？")) return;
    const newTodos = props.todos.filter((todo) => {
      if (todo.checkDone !== true) {
        return todo;
      }
    });
    props.updateTodo(newTodos);
  };

  const handleIndeterminate = () => {
    const doneTodos = props.todos.filter((todo) => todo.checkDone);
    if (doneTodos.length < props.todos.length && doneTodos.length !== 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleCheckAll = () => {
    const doneTodos = props.todos.filter((todo) => todo.checkDone);
    if (doneTodos.length === props.todos.length && doneTodos.length !== 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleDeleteButtonStyle = () => {
    if (checkDeleteTodos.length === 0) {
      return { display: "none" };
    } else return { display: "block" };
  };

  const checkDeleteTodos = props.todos.filter((todo) => todo.checkDone);
  const checkedDeleteDoneTodos = props.todos.filter((todo) => todo.confirmDone);

  return (
    <div className="count-todo">
      <div className="count-todo-container">
        <Checkbox
          indeterminate={handleIndeterminate()}
          checked={handleCheckAll()}
          className="count-checkBox"
          onChange={handleCheckedAllDoneTodo}
        ></Checkbox>
        <div>
          刪除 {checkDeleteTodos.length} / 待刪除{" "}
          {checkedDeleteDoneTodos.length}
        </div>
      </div>
      <Button
        danger
        style={handleDeleteButtonStyle()}
        className="count-btn-delete"
        onClick={handleDeleteDoneTodo}
      >
        清除已完成
      </Button>
    </div>
  );
}

//使用connect()()创建并暴露一个Count的容器组件
//connect(mapStateToProps,mapDispatchToProps)(UIcomponent);
export default connect((state) => state, {
  updateTodo,
})(CountDoneTodo);
