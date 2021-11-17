import API from "./api";

export const getCourseCount = async () => {
  let response = await API.get("/api/course");
  return response.data.length;
};

export const getUserCount = async () => {
  let response = await API.get("/api/user");
  return response.data.length;
};
export const getExamCount = async () => {
  let response = await API.get("/api/exam");
  return response.data.length;
};

export const getPendingApprovals = async () => {
  let response = await API.get("/api/user");
  return response.data.filter(r => r.status !== 'active');
};

export const approveUser = async (id) => {
  try {
    const response = await API.put("/api/user/update/" + id, {
      'status':'active'
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};
