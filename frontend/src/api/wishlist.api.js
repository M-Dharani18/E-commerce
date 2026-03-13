// wishlist.api.js  — add this file to your src/api/ folder
import axiosInstance from "./axiosInstance";

export const wishlistAPI = {
  getWishlist: async () => {
    const res = await axiosInstance.get("/wishlist");
    return res.data;
  },
  getCount: async () => {
    const res = await axiosInstance.get("/wishlist/count");
    return res.data.count;
  },
  toggle: async (productId) => {
    const res = await axiosInstance.post(`/wishlist/toggle/${productId}`);
    return res.data; // { wishlisted: true/false }
  },
  check: async (productId) => {
    const res = await axiosInstance.get(`/wishlist/check/${productId}`);
    return res.data.wishlisted;
  },
  remove: async (productId) => {
    const res = await axiosInstance.delete(`/wishlist/${productId}`);
    return res.data;
  },
};