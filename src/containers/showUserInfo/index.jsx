import React from "react";
import "./index.css";
import utils from "../../utils";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge } from "antd";

//引入action
import { updateTodo } from "../../redux/actions/todo";
//引入connect用于连接UI组件与redux
import { connect } from "react-redux";

function ShowUserInfo(props) {
  const checkedDoneTodos = props.todos.filter((todo) => !todo.confirmDone);
  return (
    <div className="show-user-info">
      <span className="avatar-item">
        <Badge count={checkedDoneTodos.length}>
          <Avatar shape="square" icon={<UserOutlined />} />
        </Badge>
      </span>
    </div>
  );
}
/*
React Redux UI
Use connect()() creact & export a container component
connect(mapStateToProps,mapDispatchToProps)(UIcomponent);
*/
export default connect((state) => state, {})(ShowUserInfo);
