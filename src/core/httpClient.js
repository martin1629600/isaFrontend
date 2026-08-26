import axios from "axios";

export const Axios = axios.create({
    baseURL: "http://localhost:8080"
});

Axios.interceptors.request.use(
    (config) => {

        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");

            if (token && token !== "undefined") {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        if (
            (error.response?.status === 401 ||
                error.response?.status === 403) &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true;

            const refreshToken =
                localStorage.getItem("refreshToken");

            if (!refreshToken) {
                return Promise.reject(error);
            }

            try {

                const refreshResponse = await axios.post(
                    "http://localhost:8080/auth/refresh",
                    {
                        refreshToken: refreshToken
                    }
                );

                const newAccessToken =
                    refreshResponse.data.accessToken;

                if (!newAccessToken) {
                    throw new Error("New access token is missing");
                }

                localStorage.setItem(
                    "token",
                    newAccessToken
                );

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return Axios(originalRequest);

            } catch (refreshError) {

                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");

                window.location.href = "/login";

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);