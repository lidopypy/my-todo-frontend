import axios from "axios";
const API_URL = require("../app.config").APIURL;

class AuthService {
  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }

  register(username, email, password) {
    console.log("API_URL", API_URL);
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  web3Login(address, data, sig) {
    return axios.post(API_URL + "/web3UserLogin", {
      address,
      data,
      sig,
    });
  }

  createTodo({
    jwt,
    title,
    content,
    userId,
    googleUserId,
    web3UserId,
    check,
    checkDone,
    confirmDone,
    setTime,
    doneTime,
  }) {
    let request = {};
    if (userId) {
      request = {
        jwt,
        title,
        content,
        userId,
        check,
        checkDone,
        confirmDone,
        setTime,
        doneTime,
      };
    } else if (googleUserId) {
      request = {
        jwt,
        title,
        content,
        googleUserId,
        check,
        checkDone,
        confirmDone,
        setTime,
        doneTime,
      };
    } else if (web3UserId) {
      request = {
        jwt,
        title,
        content,
        web3UserId,
        check,
        checkDone,
        confirmDone,
        setTime,
        doneTime,
      };
    }
    console.log("request : ", request);
    return axios.post(API_URL + "/updateTodo", request);
  }

  fetchTodo({ jwt, userType, _id }) {
    const request = { jwt, userType, _id };
    console.log("fetch request : ", request);
    return axios.post(API_URL + "/fetchTodo", request);
  }

  updateLocalTodos({ jwt, todos, userId, googleUserId, web3UserId }) {
    let request = {};
    if (userId) {
      request = {
        jwt,
        data: todos,
        userId,
      };
    } else if (googleUserId) {
      request = {
        jwt,
        data: todos,
        googleUserId,
      };
    } else if (web3UserId) {
      request = {
        jwt,
        data: todos,
        web3UserId,
      };
    }
    console.log("update request : ", request);
    return axios.post(API_URL + "/updateLocalTodos", request);
  }
}

export default new AuthService();
