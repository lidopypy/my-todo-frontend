import { ADD_TODO_STATE, UPDATE_TODO_STATE } from "../constant";

// import { UPDATE_TODO } from "../constant";

function initState() {
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (todos === null) {
    return [];
  } else return todos;
}

export default function todos(prevState = initState(), action) {
  const { type, data } = action;
  switch (type) {
    case ADD_TODO_STATE:
      localStorage.setItem("todos", JSON.stringify([data, ...prevState]));
      //这里不能用数组的push或者unshift等等方法，会让组件不更新
      return [data, ...prevState];
    case UPDATE_TODO_STATE:
      localStorage.setItem("todos", JSON.stringify([...data]));
      return [...data];
    default:
      return prevState;
  }
}
