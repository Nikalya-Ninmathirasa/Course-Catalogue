import { REMOVE_USER, SET_USER } from "../utils/actionTypes";

export const setUser = (data) => ({ type: SET_USER, payload: data });

export const removeUser = () => ({ type: REMOVE_USER, payload: null });
