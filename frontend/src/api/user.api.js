import axiosInstance from "./axiosInstance";

export const userAPI = {
  // GET /user/profile
  getProfile: async () => {
    const res = await axiosInstance.get("/user/profile");
    return res.data;
  },

  // PUT /user/profile
  updateProfile: async (data) => {
    const res = await axiosInstance.put("/user/profile", data);
    return res.data;
  },

  // POST /user/profile/picture (multipart form)
  uploadProfilePicture: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axiosInstance.post("/user/profile/picture", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
};