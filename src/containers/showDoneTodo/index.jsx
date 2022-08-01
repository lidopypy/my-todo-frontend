import React from "react";
import "./index.css";
import { Checkbox, Collapse, Button } from "antd";
//引入action
import { updateTodo } from "../../redux/actions/todo";
//引入connect用于连接UI组件与redux
import { connect, ReactReduxContext } from "react-redux";

const { Panel } = Collapse;

function ShowDoneTodo(props) {
  const handleChecked = (id) => {
    return (event) => {
      const checkDone = event.target.checked;
      const newTodos = props.todos.map((todo) => {
        if (id === todo._id) {
          return { ...todo, checkDone };
        } else return todo;
      });
      props.updateTodo(newTodos);
    };
  };
  const handleDelete = (id) => {
    return () => {
      if (!window.confirm("確定刪除？")) return;
      const newTodos = props.todos.filter((todo) => {
        if (id !== todo._id && !todo.checkDone) {
          return todo;
        } else if (id === todo._id && !todo.checkDone) {
          alert("請先勾選");
          return todo;
        } else if (id !== todo._id && todo.checkDone) {
          return todo;
        }
      });
      props.updateTodo(newTodos);
    };
  };
  const handleRecovery = (id) => {
    return () => {
      const newTodos = props.todos.map((todo) => {
        if (id === todo._id) {
          if (!window.confirm("確定復原？")) return;
          return { ...todo, check: false, confirmDone: false, doneTime: null };
        } else return todo;
      });
      props.updateTodo(newTodos);
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
        console.log();
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

//使用connect()()创建并暴露一个Count的容器组件
//connect(mapStateToProps,mapDispatchToProps)(UIcomponent);
export default connect((state) => state, {
  updateTodo,
})(ShowDoneTodo);
