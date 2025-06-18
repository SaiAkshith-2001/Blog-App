import { axiosInstance } from "./serviceConfig";

const userService = {
  login: (payload) => axiosInstance.post(`/api/user/login`, payload),
  register: (payload) => axiosInstance.post(`/api/user/register`, payload),
  getUserProfileById: (id) => axiosInstance.get(`/api/user/profile/${id}`),
};
export default userService;
