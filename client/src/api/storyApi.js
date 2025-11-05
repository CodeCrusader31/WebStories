import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/stories'
});

export const getStories = () => API.get("/");
export const getStoryById = (id) => API.get(`/${id}`);
export const createStory = (data) => API.post("/", data);

export const updateStory = (id, data) => API.put(`/${id}`, data);
export const deleteStory = (id) => API.delete(`/${id}`);
export const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return API.post('/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};