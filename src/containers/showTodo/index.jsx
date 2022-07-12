import React from "react";
import "./index.css";
import utils from "../../utils";
import { Checkbox, Collapse, Button } from "antd";
//引入action
import { updateTodo } from "../../redux/actions/todo";
//引入connect用于连接UI组件与redux
import { connect } from "react-redux";

const { Panel } = Collapse;

function ShowTodo(props) {
  const handleChecked = (id) => {
    return (event) => {
      const check = event.target.checked;
      const newTodos = props.todos.map((todo) => {
        if (id === todo.id) {
          return { ...todo, check };
        } else return todo;
      });
      props.updateTodo(newTodos);
    };
  };
  const handleConfirmDone = (id) => {
    return () => {
      const nowTime = new Date();
      const timestamp = utils.timestampToTime(nowTime);
      const newTodos = props.todos.map((todo) => {
        if (id === todo.id && todo.check) {
          if (!window.confirm("確定完成？")) return;
          return {
            ...todo,
            confirmDone: true,
            doneTime: timestamp,
          };
        } else if (id === todo.id && !todo.check) {
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
        const { id, title, content, setTime, check, confirmDone } = data;
        if (!confirmDone) {
          return (
            <div key={id} className="show-todo">
              <Checkbox
                checked={check}
                className="checkBox"
                onChange={handleChecked(data.id)}
                key={id}
              ></Checkbox>
              <Collapse collapsible="header" className="show-collapse">
                <Panel
                  header={
                    <div className="panel-title">
                      <h4>{title}</h4>
                      <div>{setTime}</div>
                    </div>
                  }
                  key={id}
                  extra={
                    <div className="show-todo-panel">
                      <Button
                        check
                        className="done-button"
                        onClick={handleConfirmDone(data.id)}
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
