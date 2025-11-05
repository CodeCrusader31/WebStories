
import axios from "axios";

const API = axios.create({
  baseURL:  "https://webstories-server.onrender.com" // change to your backend URL in production
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


export const getStories = () => API.get("/stories");
export const getStoryById = (id) => API.get(`/stories/${id}`);
export const createStory = (data) => API.post("/stories", data);
export const updateStory = (id, data) => API.put(`/stories/${id}`, data);
export const deleteStory = (id) => API.delete(`/stories/${id}`);

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return API.post("/stories/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};


export default API;
