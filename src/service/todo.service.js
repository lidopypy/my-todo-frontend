import axios from "axios";
const API_URL = require("../app.config").APIURL;

class todoService {
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
    // console.log("update request : ",request);
    if (jwt) return axios.post(API_URL + "/updateTodo", request);
    else return;
  }

  deleteTodo({ jwt, _id }) {
    let request = { jwt, _id };
    // console.log("delete request : ", request);
    if (jwt) return axios.post(API_URL + "/deleteTodo", request);
    else return;
  }

  fetchTodo({ jwt, _id }) {
    let request = { jwt, _id };
    // console.log("fetch request : ", request);
    if (jwt) return axios.post(API_URL + "/fetchTodo", request);
    else return;
  }

  updateLocalTodos({ jwt, todos, userId }) {
    let request = {
      jwt,
      data: todos,
      userId,
    };
    // console.log("update total request : ", request);
    if (jwt) return axios.post(API_URL + "/updateLocalTodos", request);
    else return;
  }
}

export default new todoService();
