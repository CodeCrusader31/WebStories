// import axios from 'axios';

// const API = axios.create({
//     baseURL: 'http://localhost:5000/stories'
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("adminToken");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export const getStories = () => API.get("/");
// export const getStoryById = (id) => API.get(`/${id}`);
// export const createStory = (data) => API.post("/", data);

// export const updateStory = (id, data) => API.put(`/${id}`, data);
// export const deleteStory = (id) => API.delete(`/${id}`);
// export const uploadFile = (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     return API.post('/upload', formData, {
//         headers: {
//             'Content-Type': 'multipart/form-data'
//         }
//     });
// };

// export default API;

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // change to your backend URL in production
});

// ✅ Add token to requests if logged in
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ✅ Named exports for functions
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

// ✅ Default export (important!)
export default API;
