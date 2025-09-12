import axios from "axios";
import useAuthStore from "../store/useAuthStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

console.log(import.meta.env.VITE_API_URL);
//Refresh token interceptors

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const needsTokenRefresh =
      error.response?.status === 401 && !originalRequest._retry;
    if (needsTokenRefresh) {
      originalRequest._retry = true;
      const { refresh } = useAuthStore.getState();
      await refresh();
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default api;
