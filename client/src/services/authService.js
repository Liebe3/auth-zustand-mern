import useAuthStore from "../store/useAuthStore";

const authService = {
  login: async (credentails) => {
    await useAuthStore.getState().login(credentails);
  },

  register: async (data) => {
    await useAuthStore.getState().register(data);
  },

  logout: async () => {
    await useAuthStore.getState().logout();
  },
};

export default authService;
