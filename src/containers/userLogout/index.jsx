import { Button, Modal } from "antd";
import React, { useState } from "react";

import "./index.css";
import AuthService from "../../service/auth.service";
//引入action
import { userLogout } from "../../redux/actions/user";
//引入connect用于连接UI组件与redux
import { connect } from "react-redux";

function UserLogout(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      await props.userLogout();
      console.log("props.user : ", props.user);
    } catch (err) {
      console.log(err);
    }

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="user-logout">
      <Button type="primary" onClick={showModal}>
        Logout
      </Button>
      <Modal
        title="Log out"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Check logout now!!</p>
      </Modal>
    </div>
  );
}

//使用connect()()创建并暴露一个Count的容器组件
//connect(mapStateToProps,mapDispatchToProps)(UIcomponent);
export default connect((state) => state, {
  userLogout,
})(UserLogout);
