import React from "react";
import "./index.css";
import { Checkbox, Collapse, Button } from "antd";
//import redux action
import { updateTodoState } from "../../redux/actions/todo";
//import react redux UI, use "connect" UI to connect Redux store & react component.
import { connect } from "react-redux";
import todoService from "../../service/todo.service";

const { Panel } = Collapse;

function ShowDoneTodo(props) {
  const handleChecked = (id) => {
    return async (event) => {
      const checkDone = event.target.checked;
      const newTodos = await Promise.all(
        props.todos.map(async (todo) => {
          if (id === todo._id) {
            await todoService.updateTodo({
              jwt: JSON.parse(localStorage.getItem("jwt")),
              ...todo,
              checkDone,
            });
            return { ...todo, checkDone };
          } else return todo;
        })
      );
      props.updateTodoState(newTodos);
    };
  };
  const handleDelete = (id) => {
    return async () => {
      if (!window.confirm("確定刪除？")) return;
      const newTodos = props.todos.filter((todo) => {
        if (id !== todo._id) return todo;
        // if (id !== todo._id && !todo.checkDone) {
        //   return todo;
        // } else if (id === todo._id && !todo.checkDone) {
        //   alert("請先勾選");
        //   return todo;
        // } else if (id !== todo._id && todo.checkDone) {
        //   return todo;
        // }
      });
      const result = await todoService.deleteTodo({
        jwt: JSON.parse(localStorage.getItem("jwt")),
        _id: id,
      });
      // console.log("result : ", result);
      props.updateTodoState(newTodos);
    };
  };
  const handleRecovery = (id) => {
    return async () => {
      const newTodos = await Promise.all(
        props.todos.map(async (todo) => {
          if (id === todo._id) {
            if (!window.confirm("確定復原？")) return todo;
            await todoService.updateTodo({
              jwt: JSON.parse(localStorage.getItem("jwt")),
              ...todo,
              check: false,
              confirmDone: false,
              doneTime: null,
            });
            return {
              ...todo,
              check: false,
              confirmDone: false,
              doneTime: null,
            };
          } else return todo;
        })
      );
      props.updateTodoState(newTodos);
    };
  };

  const handleDeleteButtonStyle = (checkDone) => {
    if (checkDone === true) {
      return { display: "inline-block" };
    } else return { display: "none" };
  };

  return (
    <div>
      {props.todos.map((data) => {
        const {
          _id,
          title,
          content,
          setTime,
          doneTime,
          checkDone,
          confirmDone,
        } = data;
        if (confirmDone) {
          return (
            <div key={_id}>
              <Checkbox
                checked={checkDone}
                className="checkBox"
                onChange={handleChecked(data._id)}
                key={_id}
              ></Checkbox>
              <Collapse collapsible="header" className="show-collapse">
                <Panel
                  header={
                    <div className="panel-title">
                      <h4>{title}</h4>
                      <div>{setTime}</div>
                    </div>
                  }
                  key={_id}
                  extra={
                    <div className="show-todo-panel">
                      <Button
                        danger
                        style={{
                          borderColor: "#31B404",
                          color: "#31B404",
                          marginRight: "5px",
                        }}
                        onClick={handleRecovery(data._id)}
                      >
                        復原
                      </Button>
                      <Button
                        danger
                        style={handleDeleteButtonStyle(data.checkDone)}
                        onClick={handleDelete(data._id)}
                      >
                        刪除
                      </Button>
                    </div>
                  }
                >
                  <p>{content}</p>
                  <p>完成日期 : {doneTime}</p>
                </Panel>
              </Collapse>
            </div>
          );
        }
      })}
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
})(ShowDoneTodo);
