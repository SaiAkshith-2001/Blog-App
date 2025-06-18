import { axiosInstance } from "./serviceConfig";

const postService = {
  getAllPosts: (skip, limit) =>
    axiosInstance.get(`/api/posts/read?skip=${skip}&limit=${limit}`),
  getPostById: (id) => axiosInstance.get(`/api/posts/read/post/${id}`),
  createPost: (payload) => axiosInstance.post("/api/posts/write", payload),
  deletePostById: (id) => axiosInstance.delete(`/api/posts/read/post/${id}`),
  updatePostById: (id, payload) =>
    axiosInstance.put(`/api/posts/read/post/${id}`, payload),
};

export default postService;
