import axiosInstance from "./axiosInstance";

export const productAPI = {
  // GET /products
  getAllProducts: async (params = {}) => {
    const res = await axiosInstance.get("/products", { params });
    return res.data;
  },

  // GET /products/:id
  getProductById: async (id) => {
    const res = await axiosInstance.get(`/products/${id}`);
    return res.data;
  },

  // GET /products/category/:categoryId
  getProductsByCategory: async (categoryId) => {
    const res = await axiosInstance.get(`/products/category/${categoryId}`);
    return res.data;
  },

  // GET /products/featured
  getFeaturedProducts: async () => {
    const res = await axiosInstance.get("/products/featured");
    return res.data;
  },

  // GET /categories
  getAllCategories: async () => {
    const res = await axiosInstance.get("/categories");
    return res.data;
  },

  // GET /categories/:id
  getCategoryById: async (id) => {
    const res = await axiosInstance.get(`/categories/${id}`);
    return res.data;
  },

  // Admin: POST /products
  createProduct: async (data) => {
    const res = await axiosInstance.post("/products", data);
    return res.data;
  },

  // Admin: PUT /products/:id
  updateProduct: async (id, data) => {
    const res = await axiosInstance.put(`/products/${id}`, data);
    return res.data;
  },

  // Admin: DELETE /products/:id
  deleteProduct: async (id) => {
    const res = await axiosInstance.delete(`/products/${id}`);
    return res.data;
  },

  // Admin: POST /categories
  createCategory: async (data) => {
    const res = await axiosInstance.post("/categories", data);
    return res.data;
  },

  // Admin: PUT /categories/:id
  updateCategory: async (id, data) => {
    const res = await axiosInstance.put(`/categories/${id}`, data);
    return res.data;
  },

  // Admin: DELETE /categories/:id
  deleteCategory: async (id) => {
    const res = await axiosInstance.delete(`/categories/${id}`);
    return res.data;
  },
};