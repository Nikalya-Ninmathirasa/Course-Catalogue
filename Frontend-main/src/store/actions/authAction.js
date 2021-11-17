import { SET_TOKEN, REMOVE_TOKEN } from "../utils/actionTypes.js";

export const setToken = (data) => ({ type: SET_TOKEN, payload: data });

export const removeToken = () => ({ type: REMOVE_TOKEN, payload: null });
