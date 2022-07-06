import { ADD_TODO } from "../constant";
import { UPDATE_TODO } from "../constant";

export const addTodo = (data) => ({ type: ADD_TODO, data });
export const updateTodo = (data) => ({ type: UPDATE_TODO, data });
