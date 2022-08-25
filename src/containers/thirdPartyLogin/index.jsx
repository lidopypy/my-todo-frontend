import React, { useState } from "react";
import { ReactComponent as Google } from "./Icons/google.svg";
import { ReactComponent as Metamask } from "./Icons/metamask.svg";
import { Button, Alert } from "antd";
import Icon from "@ant-design/icons";

import "./index.css";
import authService from "../../service/auth.service";
//import redux action
import { userLogin } from "../../redux/actions/user";
//import react redux UI, use "connect" UI to connect Redux store & react component.
import { connect } from "react-redux";
const API_URL = require("../app.config").APIURL;
const { ethereum } = window;
var ethUtil = require("ethereumjs-util");
var sigUtil = require("eth-sig-util");

//custom icon
const GoogleIcon = (props) => <Icon component={Google} {...props} />;
const MetamaskIcon = (props) => <Icon component={Metamask} {...props} />;

//React UI component.
function ThirdPartyLogin({ setVisible, props }) {
  // console.log("Thirdparty props : ", props);
  let [error, setError] = useState(null);
  // let [address, setAddress] = useState(null);

  const handleSignUpWithGoogle = async () => {
    await window.open(API_URL + "/google", "_self");
    // console.log("handleSignUpWithGoogle");
  };

  const handleSignUpWithMetamask = async () => {
    try {
      //connect to metamask.
      await ethereum.request({ method: "eth_requestAccounts" });
      const account = await ethereum.request({ method: "eth_accounts" });
      // console.log("accounts: ", account[0]);
      //sign a message.
      var terms = Buffer(
        "SGkgdGhlcmUgZnJvbSBNeSBUb0RvIExpc3QgV2ViIEFwcCEgU2lnbiB0aGlzIG1lc3NhZ2UgdG8gcHJvdmUgeW91IGhhdmUgYWNjZXNzIHRvIHRoaXMgd2FsbGV0IGFuZCB3ZeKAmWxsIGxvZyB5b3UgaW4uIFRoaXMgd29u4oCZdCBjb3N0IHlvdSBhbnkgRXRoZXIu",
        "base64"
      ).toString();
      var text = terms;
      var data = ethUtil.bufferToHex(new Buffer.from(text, "utf8"));
      const address = account[0];
      // console.log("address: ", address);
      // var from = web3.eth.accounts[0];
      // console.log("CLICKED, SENDING PERSONAL SIGN REQUEST");
      var params = [data, address];
      var method = "personal_sign";
      await ethereum
        .request({
          method,
          params,
        })
        .then(async (sig) => {
          const result = await authService.web3Login(address, data, sig);
          await props.userLogin(result.data);
        });
      setVisible(false);
      setError(null);
    } catch (error) {
      console.error("error : ", error);
      setError(error);
      // setAddress("");
    }
  };

  const handleAlertClosed = () => {
    setError(null);
  };
  return (
    <div className="third-party-login">
      {error && (
        <Alert
          className="error-alert"
          message="Need connect to metamask, welcome to web3.0 world."
          description={error.message}
          type="warning"
          showIcon
          closable
          onClose={handleAlertClosed}
        />
      )}
      <Button
        // type="primary"
        // htmlType="submit"
        onClick={handleSignUpWithMetamask}
        className="login-form-button login-with-metamask"
      >
        <MetamaskIcon className="site-form-item-icon" />
        Web3 user Sign up.
      </Button>
      <Button
        // type="primary"
        // htmlType="submit"
        // href="http://localhost:8080/google"
        onClick={handleSignUpWithGoogle}
        className="login-form-button login-with-google"
      >
        <GoogleIcon className="site-form-item-icon" />
        Sign up with Google.
      </Button>
    </div>
  );
}

/*
React Redux UI
Use connect()() creact & export a container component
connect(mapStateToProps,mapDispatchToProps)(UIcomponent);
*/
export default connect((state) => state, {
  userLogin,
})(ThirdPartyLogin);
