import axios from "axios";

const ACCESS_KEY = 'GZVd6CMjMNmCmzJgWTdXknVnBEeZYpsGoMNnSVls2k0';

export const unsplashApi = axios.create({
    baseURL: "https://api.unsplash.com/",
    headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
    },
});



