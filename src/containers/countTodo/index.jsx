import React from "react";
import { Checkbox, Button } from "antd";
import "./index.css";
import utils from "../../utils";
//import redux action
import { updateTodo } from "../../redux/actions/todo";
//import react redux UI, use "connect" UI to connect Redux store & react component.
import { connect } from "react-redux";

function CountTodo(props) {
  const handleCheckedAllTodo = (event) => {
    const check = event.target.checked;
    const newTodos = props.todos.map((todo) => {
      if (!todo.confirmDone) {
        return { ...todo, check };
      } else return todo;
    });
    props.updateTodo(newTodos);
  };

  const handleTurnDoneTodo = () => {
    const nowTime = new Date();
    const timestamp = utils.timestampToTime(nowTime);
    if (checkDoneTodos.length !== 0) {
      if (!window.confirm("確定完成？")) return;
      const newTodos = props.todos.map((todo) => {
        if (todo.check === true && todo.confirmDone === false) {
          return { ...todo, confirmDone: true, doneTime: timestamp };
        } else return todo;
      });
      props.updateTodo(newTodos);
    } else {
      alert("請先勾選");
      return;
    }
  };

  const handleIndeterminate = () => {
    if (
      checkDoneTodos.length < checkedDoneTodos.length &&
      checkDoneTodos.length !== 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleCheckAll = () => {
    if (
      checkDoneTodos.length === checkedDoneTodos.length &&
      checkDoneTodos.length !== 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleDoneButtonStyle = () => {
    if (checkDoneTodos.length === 0) {
      return { display: "none" };
    } else return { display: "block" };
  };

  const checkDoneTodos = props.todos.filter(
    (todo) => todo.check && !todo.confirmDone
  );
  const checkedDoneTodos = props.todos.filter((todo) => !todo.confirmDone);

  return (
    <div className="count-todo">
      <div className="count-todo-container">
        <Checkbox
          indeterminate={handleIndeterminate()}
          checked={handleCheckAll()}
          className="count-checkBox"
          onChange={handleCheckedAllTodo}
        ></Checkbox>
        <div>
          完成 {checkDoneTodos.length} / 待完成 {checkedDoneTodos.length}
        </div>
      </div>
      <Button
        type="primary"
        ghost
        style={handleDoneButtonStyle()}
        className="count-btn-delete"
        onClick={handleTurnDoneTodo}
      >
        已完成
      </Button>
    </div>
  );
}
/*
React Redux UI
Use connect()() creact & export a container component
connect(mapStateToProps,mapDispatchToProps)(UIcomponent);
*/
export default connect((state) => state, {
  updateTodo,
})(CountTodo);
