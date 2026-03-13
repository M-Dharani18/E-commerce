import axiosInstance from "./axiosInstance";

export const adminAPI = {
  // Categories
  getAllCategories: async () => {
    const res = await axiosInstance.get("/admin/categories");
    return res.data;
  },

  createCategory: async (data) => {
    const res = await axiosInstance.post("/admin/categories", data);
    return res.data;
  },

  updateCategory: async (id, data) => {
    const res = await axiosInstance.put(`/admin/categories/${id}`, data);
    return res.data;
  },

  deleteCategory: async (id) => {
    const res = await axiosInstance.delete(`/admin/categories/${id}`);
    return res.data;
  },

  uploadCategoryImage: async (id, file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axiosInstance.post(`/admin/categories/${id}/image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  // Products
  getAllProducts: async (page = 0, size = 20, search = "") => {
    const res = await axiosInstance.get("/admin/products", { params: { page, size, search } });
    return res.data;
  },

  getProductById: async (id) => {
    const res = await axiosInstance.get(`/admin/products/${id}`);
    return res.data;
  },

  createProduct: async (data) => {
    const res = await axiosInstance.post("/admin/products", data);
    return res.data;
  },

  updateProduct: async (id, data) => {
    const res = await axiosInstance.put(`/admin/products/${id}`, data);
    return res.data;
  },

  deleteProduct: async (id) => {
    const res = await axiosInstance.delete(`/admin/products/${id}`);
    return res.data;
  },

  uploadProductImage: async (id, file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axiosInstance.post(`/admin/products/${id}/image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  toggleFeatured: async (id) => {
    const res = await axiosInstance.patch(`/admin/products/${id}/toggle-featured`);
    return res.data;
  },

  toggleActive: async (id) => {
    const res = await axiosInstance.patch(`/admin/products/${id}/toggle-active`);
    return res.data;
  },
};