import { create } from "zustand";
import { loginApi, logoutApi, refreshApi, registerApi } from "../Api/authApi";

const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  isLoading: false,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await loginApi(credentials);
      set({
        user: response.data.user,
        accessToken: response.data.accessToken,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Login failed",
        isLoading: false,
      });
    }
  },

  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await registerApi(data);
      set({ user: response.data.user, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Registration failed",
        isLoading: false,
      });
    }
  },

  refresh: async () => {
    try {
      const response = await refreshApi();
      set({ user: response.data.user, accessToken: response.data.accessToken });
    } catch (error) {
      set({ error: null });
    }
  },

  logout: async () => {
    await logoutApi();
    set({ error: null });
  },
}));

export default useAuthStore;
