import axios from "axios";

const API_BASE_URL = "http://192.168.100.19:3000/api/dsm44/likes-comments";

export const likesCommentsApi = axios.create({
    baseURL: API_BASE_URL,
});
