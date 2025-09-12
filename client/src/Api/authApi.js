import api from "./baseApi";

export const loginApi = (data) => api.post("/auth/login", data);
export const registerApi = (data) => api.post("/auth/register", data);
export const logoutApi = () => api.post("/auth/logout");
export const refreshApi = () => api.post("/auth/refresh");
