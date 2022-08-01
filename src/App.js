import InputTodo from "./containers/inputTodo";
import ShowTodo from "./containers/showTodo";
import CountTodo from "./containers/countTodo";
import CountDoneTodo from "./containers/countDoneTodo";
import ShowDoneTodo from "./containers/showDoneTodo";

import MyHeader from "./containers/myHeader";
import "./App.css";
import { Layout } from "antd";
import React from "react";
const { Content, Footer } = Layout;

function App() {
  return (
    <div className="app">
      <Layout className="layout">
        <MyHeader />
        <Content
          className="site-layout"
          style={{
            padding: "0 50px",
            marginTop: 64,
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 5,
              minHeight: 380,
            }}
          >
            <div className="show-my-todo">
              <div className="toDoCheck">
                <InputTodo />
                <ShowTodo />
                <CountTodo />
              </div>
              <div className="doneToDoCheck">
                <ShowDoneTodo />
                <CountDoneTodo />
              </div>
            </div>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Lido Lee ©2022 Created use MERN, antd
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
