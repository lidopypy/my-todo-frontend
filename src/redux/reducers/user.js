import { USER_LOGIN, USER_LOGOUT } from "../constant";
import Cookies from "js-cookie";

const initState = () => {
  const cookies = Cookies.get("cookies");
  if (cookies) {
    const data = JSON.parse(Cookies.get("cookies"));
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("jwt", JSON.stringify(data.jwt));
    Cookies.remove("cookies");
    return data.user;
  } else {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
      console.log("user: ", user);
      return null;
    } else return user;
  }
};

export default function user(prevState = initState(), action) {
  const { type, data } = action;
  switch (type) {
    case USER_LOGIN:
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("jwt", JSON.stringify(data.token));
      //Here can not use push or unshift method for array, cause react component wouldn't update.
      return data.user;
    case USER_LOGOUT:
      localStorage.removeItem("user");
      localStorage.removeItem("jwt");
      return null;
    default:
      return prevState;
  }
}
