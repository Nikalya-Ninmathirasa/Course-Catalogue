import { REMOVE_USER, SET_USER } from "../utils/actionTypes";

const userReducer = (state = false, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case REMOVE_USER:
      return null;
    default:
      return state;
  }
};

export default userReducer;
