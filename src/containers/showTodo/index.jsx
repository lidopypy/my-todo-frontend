import React, { useState, useEffect } from "react";
import "./index.css";
import utils from "../../utils";
import { Checkbox, Collapse, Button } from "antd";
//引入action
import { updateTodo } from "../../redux/actions/todo";
//引入connect用于连接UI组件与redux
import { connect } from "react-redux";
import AuthService from "../../service/auth.service";
const { Panel } = Collapse;

function ShowTodo(props) {
  const [user, setUser] = useState(props.user);
  console.log("state user : ", user);
  const [todos, setTodos] = useState(props.todos);

  useEffect(() => {
    async function fetchData() {
      const fetchRequest = {
        userType: props.user.userType,
        _id: props.user._id,
        jwt: JSON.parse(localStorage.getItem("jwt")),
      };
      console.log("fetchRequest : ", fetchRequest);
      const fetchData = await AuthService.fetchTodo(fetchRequest);
      console.log("fetchData : ", fetchData);
    }
    if (props.user && props.user.userType === "googleUser") {
      fetchData();
    }
  }, [user]);
  //googleUser Login, fetch todo from server.
  // if (props.user.userType === "googleUser") {
  //   console.log("props.user.userType");
  //   // const fetchRequest = {
  //   //   jwt: JSON.parse(localStorage.getItem("jwt")),
  //   //   userType: props.user.userType,
  //   //   _id: props.user._id,
  //   // };
  //   // console.log("fetchRequest : ", fetchRequest);
  //   // const fetchTodo = await AuthService.fetchTodo(fetchRequest);
  //   // console.log("fetchTodo : ", fetchTodo);
  // }

  const handleChecked = (_id) => {
    return (event) => {
      const check = event.target.checked;
      const newTodos = props.todos.map((todo) => {
        if (_id === todo._id) {
          return { ...todo, check };
        } else return todo;
      });
      props.updateTodo(newTodos);
    };
  };
  const handleConfirmDone = (_id) => {
    return () => {
      const nowTime = new Date();
      const timestamp = utils.timestampToTime(nowTime);
      const newTodos = props.todos.map((todo) => {
        if (_id === todo._id && todo.check) {
          if (!window.confirm("確定完成？")) return;
          return {
            ...todo,
            confirmDone: true,
            doneTime: timestamp,
          };
        } else if (_id === todo._id && !todo.check) {
          alert("請先勾選");
          return todo;
        } else return todo;
      });
      props.updateTodo(newTodos);
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

//使用connect()()创建并暴露一个Count的容器组件
//connect(mapStateToProps,mapDispatchToProps)(UIcomponent);
export default connect((state) => state, {
  updateTodo,
})(ShowTodo);
