import React from "react";
import { Button, Form, Input } from "antd";
import "./index.css";
import { nanoid } from "nanoid";
import utils from "../../utils";
import PropTypes from "prop-types";
//引入action
import { addTodo } from "../../redux/actions/todo";
//引入connect用于连接UI组件与redux
import { connect } from "react-redux";

function NavBar(props) {
  return <div className="input-todo"></div>;
}

//使用connect()()创建并暴露一个Count的容器组件
//connect(mapStateToProps,mapDispatchToProps)(UIcomponent);
export default connect((state) => state, {
  addTodo,
})(NavBar);
