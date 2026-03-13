// cart.api.js  — add this file to your src/api/ folder
import axiosInstance from "./axiosInstance";

export const cartAPI = {
  // `state` is optional; if provided it will be forwarded as a query
  // parameter so the backend can calculate shipping according to the
  // delivery state (Tamil Nadu => free, otherwise ₹80).
  getCart: async (state) => {
    const res = await axiosInstance.get("/cart", {
      params: state ? { state } : {},
    });
    return res.data;
  },
  getCount: async () => {
    const res = await axiosInstance.get("/cart/count");
    return res.data.count;
  },
  addToCart: async (productId, quantity = 1) => {
    const res = await axiosInstance.post("/cart/add", null, { params: { productId, quantity } });
    return res.data;
  },
  updateQuantity: async (itemId, quantity) => {
    const res = await axiosInstance.put(`/cart/items/${itemId}`, null, { params: { quantity } });
    return res.data;
  },
  removeItem: async (itemId) => {
    const res = await axiosInstance.delete(`/cart/items/${itemId}`);
    return res.data;
  },
  clearCart: async () => {
    const res = await axiosInstance.delete("/cart/clear");
    return res.data;
  },
};