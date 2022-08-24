import { ADD_TODO_STATE } from "../constant";
import { UPDATE_TODO_STATE } from "../constant";

export const addTodoState = (data) => ({ type: ADD_TODO_STATE, data });
export const updateTodoState = (data) => ({ type: UPDATE_TODO_STATE, data });
