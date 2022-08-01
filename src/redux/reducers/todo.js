import { ADD_TODO, UPDATE_TODO } from "../constant";

// import { UPDATE_TODO } from "../constant";

function initState() {
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (todos === null) {
    console.log(todos);
    return [];
  } else return todos;
}

export default function todos(prevState = initState(), action) {
  const { type, data } = action;
  switch (type) {
    case ADD_TODO:
      localStorage.setItem("todos", JSON.stringify([data, ...prevState]));
      //这里不能用数组的push或者unshift等等方法，会让组件不更新
      return [data, ...prevState];
    case UPDATE_TODO:
      localStorage.setItem("todos", JSON.stringify([...data]));
      return [...data];
    default:
      return prevState;
  }
}
