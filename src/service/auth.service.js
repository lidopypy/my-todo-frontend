import axios from "axios";
const API_URL = require("../app.config").APIURL;

class authService {
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

  updateTodo({
    jwt,
    _id,
    title,
    content,
    userId,
    check,
    checkDone,
    confirmDone,
    setTime,
    doneTime,
  }) {
    let request = {
      jwt,
      _id,
      title,
      content,
      userId,
      check,
      checkDone,
      confirmDone,
      setTime,
      doneTime,
    };
    console.log("request : ", request);
    return axios.post(API_URL + "/updateTodo", request);
  }

  deleteTodo({ jwt, _id }) {
    let request = { jwt, _id };
    console.log("delete request : ", request);
    return axios.post(API_URL + "/deleteTodo", request);
  }

  fetchTodo({ jwt, _id }) {
    let request = { jwt, _id };
    // console.log("fetch request : ", request);
    return axios.post(API_URL + "/fetchTodo", request);
  }

  updateLocalTodos({ jwt, todos, userId }) {
    let request = {
      jwt,
      data: todos,
      userId,
    };
    console.log("update request : ", request);
    return axios.post(API_URL + "/updateLocalTodos", request);
  }
}

export default new authService();
