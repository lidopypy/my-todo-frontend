import UserLogin from "../userLogin";
import UserRegister from "../userRegister";
import UserLogout from "../userLogout";
import "./index.css";
//引入action
import { addTodo } from "../../redux/actions/todo";
//引入connect用于连接UI组件与redux
import { connect } from "react-redux";
import React, { useState } from "react";
import { Menu, Layout } from "antd";
const { Header } = Layout;

function MyHeader(props) {
  console.log("myheader props: ", props);
  console.log(!props.user);
  return (
    <div className="my-header">
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["0"]}
          items={new Array(0).fill(null).map((_, index) => ({
            key: String(index + 1),
            label: `nav ${index + 1}`,
          }))}
        />
        <div className="user-login-logout">
          {props.user && <UserLogout />}
          {!props.user && <UserLogin />}
          {!props.user && <UserRegister />}
        </div>
      </Header>
    </div>
  );
}

//使用connect()()创建并暴露一个Count的容器组件
//connect(mapStateToProps,mapDispatchToProps)(UIcomponent);
export default connect((state) => state, {
  addTodo,
})(MyHeader);
