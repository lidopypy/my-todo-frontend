import React, { useState, useEffect } from "react";
import "./index.css";
import utils from "../../utils";
import { Checkbox, Collapse, Button } from "antd";
//import redux action
import { updateTodoState } from "../../redux/actions/todo";
//import react redux UI, use "connect" UI to connect Redux store & react component.
import { connect } from "react-redux";
import todoService from "../../service/todo.service";
const { Panel } = Collapse;

function ShowTodo(props) {
  const [user, setUser] = useState(props.user);
  // console.log("state user : ", user);
  const [todos, setTodos] = useState(props.todos);

  async function updateData() {
    let userId = props.user._id;
    let todos = props.todos;
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    let request = {
      jwt,
      todos,
      userId,
    };
    // console.log("send request : ", request);
    await todoService.updateLocalTodos(request);
  }

  async function fetchData() {
    const fetchRequest = {
      _id: props.user._id,
      jwt: JSON.parse(localStorage.getItem("jwt")),
    };
    // console.log("fetchRequest : ", fetchRequest);
    const fetchData = await todoService.fetchTodo(fetchRequest);
    // console.log("fetchData : ", fetchData);
    props.updateTodoState(fetchData.data.todos);
  }

  useEffect(() => {
    if (props.user) {
      updateData();
      fetchData();
    }
  }, [props.user]);

  const handleChecked = (_id) => {
    return async (event) => {
      const check = event.target.checked;
      const newTodos = await Promise.all(
        props.todos.map((todo) => {
          if (_id === todo._id) {
            todoService.updateTodo({
              jwt: JSON.parse(localStorage.getItem("jwt")),
              ...todo,
              check,
            });
            return { ...todo, check };
          } else return todo;
        })
      );
      props.updateTodoState(newTodos);
      setTodos(newTodos);
    };
  };
  const handleConfirmDone = (_id) => {
    return async () => {
      const nowTime = new Date();
      const timestamp = utils.timestampToTime(nowTime);
      const newTodos = await Promise.all(
        props.todos.map((todo) => {
          if (_id === todo._id && todo.check) {
            if (!window.confirm("確定完成？")) {
              return todo;
            } else {
              todoService.updateTodo({
                jwt: JSON.parse(localStorage.getItem("jwt")),
                ...todo,
                confirmDone: true,
                doneTime: timestamp,
              });
              return {
                ...todo,
                confirmDone: true,
                doneTime: timestamp,
              };
            }
          } else if (_id === todo._id && !todo.check) {
            alert("請先勾選");
            return todo;
          } else return todo;
        })
      );
      props.updateTodoState(newTodos);
    };
  };
  const handleDoneButtonStyle = (check) => {
    if (check === true) {
      return { display: "inline-block" };
    } else return { display: "none" };
  };

  return (
    <div>
      {props.todos.map((data) => {
        const { _id, title, content, setTime, check, confirmDone } = data;
        if (confirmDone === false) {
          return (
            <div key={_id} className="show-todo">
              <Checkbox
                checked={check}
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
                        check
                        className="done-button"
                        onClick={handleConfirmDone(data._id)}
                        style={handleDoneButtonStyle(data.check)}
                      >
                        完成
                      </Button>
                    </div>
                  }
                >
                  <p>{content}</p>
                  <p>{}</p>
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
})(ShowTodo);
