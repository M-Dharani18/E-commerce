import axiosInstance from "./axiosInstance";

// ── Orders ────────────────────────────────────────────────────────────────
export const orderAPI = {

  // POST /api/orders
  // body: { addressId, paymentMethod, utrNumber?, screenshotUrl?, notes? }
  // → OrderResponse
  placeOrder: async (data) => {
    const res = await axiosInstance.post("/orders", data);
    return res.data;
  },

  // GET /api/orders  → List<OrderResponse>
  getMyOrders: async () => {
    const res = await axiosInstance.get("/orders");
    return res.data;
  },

  // GET /api/orders/{orderNumber}  → OrderResponse
  getOrderDetails: async (orderNumber) => {
    const res = await axiosInstance.get(`/orders/${orderNumber}`);
    return res.data;
  },

  // POST /api/orders/{orderNumber}/cancel  → OrderResponse
  // Only works when status is PLACED or CONFIRMED
  cancelOrder: async (orderNumber, reason = "Customer requested cancellation") => {
    const res = await axiosInstance.post(`/orders/${orderNumber}/cancel`, { reason });
    return res.data;
  },
};

// ── Addresses ─────────────────────────────────────────────────────────────
export const addressAPI = {

  // GET /api/addresses  → List<Address>
  // Sorted: default first, then by createdAt desc
  getAll: async () => {
    const res = await axiosInstance.get("/addresses");
    return res.data;
  },

  // GET /api/addresses/default  → Address | { message: "No default address set" }
  getDefault: async () => {
    const res = await axiosInstance.get("/addresses/default");
    return res.data;
  },

  // POST /api/addresses  → Address (with id)
  // body: { fullName, phone, email?, addressLine1, addressLine2?,
  //         city, state, pincode, isDefault }
  // Note: first address is auto-made default by backend
  create: async (data) => {
    const res = await axiosInstance.post("/addresses", data);
    return res.data;
  },

  // PUT /api/addresses/{id}  → Address
  update: async (id, data) => {
    const res = await axiosInstance.put(`/addresses/${id}`, data);
    return res.data;
  },

  // DELETE /api/addresses/{id}  → { message }
  // If deleted addr was default, backend auto-promotes another
  delete: async (id) => {
    const res = await axiosInstance.delete(`/addresses/${id}`);
    return res.data;
  },

  // PATCH /api/addresses/{id}/set-default  → Address
  setDefault: async (id) => {
    const res = await axiosInstance.patch(`/addresses/${id}/set-default`);
    return res.data;
  },
};

// ── Payment screenshot upload (Cloudinary via backend) ────────────────────
// POST /api/images/upload  multipart/form-data  field: "file"
// → { url: "https://res.cloudinary.com/..." }  OR  { imageUrl: "..." }
export const uploadPaymentScreenshot = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axiosInstance.post("/images/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  // Handle both response shapes
  return res.data?.url || res.data?.imageUrl || res.data;
};

// ── Admin Orders ──────────────────────────────────────────────────────────
export const adminOrderAPI = {

  // GET /api/admin/orders?page=0&size=20  → Page<OrderResponse>
  getAll: async (page = 0, size = 20) => {
    const res = await axiosInstance.get("/admin/orders", { params: { page, size } });
    return res.data;
  },

  // GET /api/admin/orders/status/{status}
  // status: PLACED | CONFIRMED | PACKED | SHIPPED | DELIVERED | CANCELLED | RETURNED
  getByStatus: async (status, page = 0, size = 20) => {
    const res = await axiosInstance.get(`/admin/orders/status/${status}`, { params: { page, size } });
    return res.data;
  },

  // GET /api/admin/orders/search?query=...
  // Searches: orderNumber, customerName, customerEmail
  search: async (query, page = 0, size = 20) => {
    const res = await axiosInstance.get("/admin/orders/search", { params: { query, page, size } });
    return res.data;
  },

  // PATCH /api/admin/orders/{id}/status  body: { status: "CONFIRMED" }
  // Sets status + timestamp (confirmedAt / packedAt / shippedAt / deliveredAt / cancelledAt)
  updateStatus: async (orderId, status) => {
    const res = await axiosInstance.patch(`/admin/orders/${orderId}/status`, { status });
    return res.data;
  },

  // PATCH /api/admin/orders/{id}/verify-payment  body: { approved: true/false }
  // approved=true  → paymentStatus=VERIFIED, status=CONFIRMED
  // approved=false → paymentStatus=FAILED, status=CANCELLED, stock restored
  verifyPayment: async (orderId, approved) => {
    const res = await axiosInstance.patch(`/admin/orders/${orderId}/verify-payment`, { approved });
    return res.data;
  },

  // PATCH /api/admin/orders/{id}/tracking  body: { trackingNumber, courierPartner }
  updateTracking: async (orderId, trackingNumber, courierPartner) => {
    const res = await axiosInstance.patch(`/admin/orders/${orderId}/tracking`, {
      trackingNumber, courierPartner,
    });
    return res.data;
  },

  // GET /api/admin/orders/statistics
  // Returns: { todayOrders, monthOrders, todayRevenue, monthRevenue,
  //            pendingOrders, confirmedOrders }
  getStatistics: async () => {
    const res = await axiosInstance.get("/admin/orders/statistics");
    return res.data;
  },
};