import { USER_LOGIN, USER_LOGOUT } from "../constant";

const initState = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user === null) {
    console.log(user);
    return null;
  } else return user;
};
export default function user(prevState = initState(), action) {
  const { type, data } = action;
  switch (type) {
    case USER_LOGIN:
      localStorage.setItem("user", JSON.stringify(data));
      //这里不能用数组的push或者unshift等等方法，会让组件不更新
      return data;
    case USER_LOGOUT:
      localStorage.removeItem("user");
      return null;
    default:
      return prevState;
  }
}
