import { USER_LOGIN } from "../constant";
import { USER_LOGOUT } from "../constant";

export const userLogin = (data) => ({ type: USER_LOGIN, data });
export const userLogout = (data) => ({ type: USER_LOGOUT, data });
