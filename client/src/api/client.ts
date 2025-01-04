import axios from "axios";

const apiClient = axios.create({
    baseURL:
        process.env.NODE_ENV === "development" ? "https://edulive-2r06.onrender.com/v1/" : "/",
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    async (config) => {
        if (localStorage.getItem("token"))
            config.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("token")!).token
                }`;
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

export default apiClient;
