import React from "react";
import { Checkbox, Button } from "antd";
import "./index.css";
//import redux action
import { updateTodoState } from "../../redux/actions/todo";
//import react redux UI, use "connect" UI to connect Redux store & react component.
import { connect } from "react-redux";
import todoService from "../../service/todo.service";

function CountDoneTodo(props) {
  const checkDeleteTodos = props.todos.filter((todo) => todo.checkDone);
  const checkedDeleteDoneTodos = props.todos.filter((todo) => todo.confirmDone);

  const handleCheckedAllDoneTodo = (event) => {
    const checkDone = event.target.checked;
    const newTodos = props.todos.map((todo) => {
      if (todo.confirmDone) {
        return { ...todo, checkDone };
      } else return todo;
    });
    props.updateTodoState(newTodos);
  };

  const handleDeleteDoneTodo = async () => {
    if (!window.confirm("確定刪除？")) return;
    let deleteTodos = [];
    const newTodos = props.todos.filter((todo) => {
      if (todo.checkDone !== true) {
        return todo;
      } else deleteTodos.push(todo._id);
    });
    await Promise.all(
      deleteTodos.map(async (_id) => {
        const result = await todoService.deleteTodo({
          jwt: JSON.parse(localStorage.getItem("jwt")),
          _id,
        });
        // console.log("result : ", result);
      })
    );
    props.updateTodoState(newTodos);
  };

  const handleIndeterminate = () => {
    if (
      checkDeleteTodos.length < checkedDeleteDoneTodos.length &&
      checkDeleteTodos.length !== 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleCheckAll = () => {
    if (
      checkDeleteTodos.length === checkedDeleteDoneTodos.length &&
      checkDeleteTodos.length !== 0
    ) {
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

/*
React Redux UI
Use connect()() creact & export a container component
connect(mapStateToProps,mapDispatchToProps)(UIcomponent);
*/
export default connect((state) => state, {
  updateTodoState,
})(CountDoneTodo);
