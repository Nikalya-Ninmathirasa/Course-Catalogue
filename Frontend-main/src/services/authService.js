import store from "../store";
import API from "./api";
import { removeUser, setUser } from "../store/actions/userAction";
import { removeToken, setToken } from "../store/actions/authAction";

export const loginUser = async (data) => {
  try {
    const response = await API.post("/api/login", data);
    const { status } = response.data.user;
    if (status === "active") {
      await store.dispatch(setUser(response.data.user));
      await store.dispatch(setToken(response.data.token));
      return response;
    }
    throw new Error("Pending approval! Your account is not activated");
  } catch (e) {
    throw e;
  }
};

export const updateUser = async (data, id) => {
  try {
    const response = await API.put("/api//user/update/" + id, data);
    await store.dispatch(setUser(response.data.user));
  } catch (e) {
    throw e;
  }
};

export const updatePassword = async (data, id) => {
  try {
    await API.post("/api/change-password/" + id, data);
  } catch (e) {
    throw e;
  }
};

export const logoutUser = async () => {
  await store.dispatch(removeToken());
  await store.dispatch(removeUser());
};
