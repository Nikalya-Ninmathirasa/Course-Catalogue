import { REMOVE_TOKEN, SET_TOKEN } from "../utils/actionTypes";

const authReducer = (state = false, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return action.payload;
    case REMOVE_TOKEN:
      return null;
    default:
      return state;
  }
};

export default authReducer;
