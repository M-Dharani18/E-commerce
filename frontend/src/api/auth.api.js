import axiosInstance from "./axiosInstance";

export const authAPI = {
  // POST /auth/signup
  signup: async (data) => {
    const res = await axiosInstance.post("auth/signup", data);
    return res.data;
  },

  // POST /auth/login
  login: async (data) => {
    const res = await axiosInstance.post("auth/login", data);
    return res.data;
  },

  // GET /auth/verify-email?token=...
  verifyEmail: async (token) => {
    const res = await axiosInstance.get(`/auth/verify-email?token=${token}`);
    return res.data;
  },

  // POST /auth/forgot-password
  forgotPassword: async (email) => {
    const res = await axiosInstance.post("/auth/forgot-password", { email });
    return res.data;
  },

  // POST /auth/reset-password?token=...&newPassword=...
  resetPassword: async (token, newPassword) => {
    const res = await axiosInstance.post(
      `/auth/reset-password?token=${token}&newPassword=${newPassword}`
    );
    return res.data;
  },
};