import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import { orderAPI } from "../api/order.api";

const SERIF = "'Cormorant Garamond', Georgia, serif";
const SANS  = "'DM Sans', 'Segoe UI', sans-serif";

const STATUS_CONFIG = {
  PLACED:    { label:"Order Placed",  color:"#1A1A2E", bg:"rgba(26,26,46,0.08)",   border:"rgba(26,26,46,0.2)"   },
  CONFIRMED: { label:"Confirmed",     color:"#1D4ED8", bg:"rgba(29,78,216,0.08)",  border:"rgba(29,78,216,0.2)"  },
  PACKED:    { label:"Packed",        color:"#7C3AED", bg:"rgba(124,58,237,0.08)", border:"rgba(124,58,237,0.2)" },
  SHIPPED:   { label:"Shipped",       color:"#D97706", bg:"rgba(217,119,6,0.08)",  border:"rgba(217,119,6,0.2)"  },
  DELIVERED: { label:"Delivered",     color:"#15803D", bg:"rgba(21,128,61,0.08)",  border:"rgba(21,128,61,0.2)"  },
  CANCELLED: { label:"Cancelled",     color:"#B91C1C", bg:"rgba(185,28,28,0.08)",  border:"rgba(185,28,28,0.2)"  },
  RETURNED:  { label:"Returned",      color:"#64748B", bg:"rgba(100,116,139,0.08)",border:"rgba(100,116,139,0.2)"},
};

const PAY_CONFIG = {
  PENDING:              { label:"Pay on Delivery",   color:"#888" },
  PENDING_VERIFICATION: { label:"⏳ Verifying UPI",  color:"#D97706" },
  VERIFIED:             { label:"✓ UPI Verified",    color:"#15803D" },
  COMPLETED:            { label:"✓ Paid",            color:"#15803D" },
  FAILED:               { label:"✗ Payment Failed",  color:"#B91C1C" },
  REFUNDED:             { label:"Refunded",           color:"#7C3AED" },
};

export default function MyOrdersPage() {
  const navigate = useNavigate();
  const [orders,     setOrders]     = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [expandedId,   setExpandedId]   = useState(null);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      // GET /api/orders  → List<OrderResponse> sorted by createdAt desc
      const data = await orderAPI.getMyOrders();
      setOrders(data);
    } catch(e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (order) => {
    if (!confirm(`Cancel order ${order.orderNumber}?`)) return;
    // Backend only allows cancel if status is PLACED or CONFIRMED
    if (!["PLACED","CONFIRMED"].includes(order.status)) {
      alert("This order cannot be cancelled at its current stage.");
      return;
    }
    setCancellingId(order.orderNumber);
    try {
      const updated = await orderAPI.cancelOrder(order.orderNumber);
      setOrders(prev => prev.map(o => o.orderNumber === updated.orderNumber ? updated : o));
    } catch(e) {
      alert(e.response?.data?.message || "Failed to cancel order.");
    } finally {
      setCancellingId(null);
    }
  };

  const fmt = n => Number(n||0).toLocaleString("en-IN");

  return (
    <div style={{ fontFamily:SANS, background:"#FFFFF0", minHeight:"100vh" }}>
      <Navbar/>
      <div style={{ maxWidth:900, margin:"0 auto", padding:"96px 24px 72px" }}>

        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}}
          style={{ marginBottom:40 }}>
          <p style={{ fontFamily:SANS, fontSize:11, letterSpacing:"0.32em", textTransform:"uppercase",
            color:"#D4AF37", marginBottom:8, fontWeight:600 }}>My Account</p>
          <h1 style={{ fontFamily:SERIF, fontSize:42, fontWeight:700, color:"#1A1A2E", lineHeight:1 }}>
            My Orders
          </h1>
          {orders.length > 0 && (
            <p style={{ fontFamily:SANS, fontSize:14, color:"#888", marginTop:8 }}>
              {orders.length} order{orders.length!==1?"s":""}
            </p>
          )}
        </motion.div>

        {loading ? (
          <div style={{ textAlign:"center", padding:80 }}>
            <div style={{ width:32, height:32, margin:"0 auto", border:"2px solid #D4AF37",
              borderTopColor:"transparent", borderRadius:"50%", animation:"spin 1s linear infinite" }}/>
          </div>

        ) : orders.length === 0 ? (
          <motion.div initial={{opacity:0}} animate={{opacity:1}}
            style={{ textAlign:"center", padding:"80px 20px",
              border:"1px dashed rgba(26,26,46,0.15)" }}>
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none"
              stroke="rgba(26,26,46,0.18)" strokeWidth="1"
              style={{ display:"block", margin:"0 auto 18px" }}>
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <p style={{ fontFamily:SERIF, fontSize:26, color:"#1A1A2E", marginBottom:8 }}>
              No orders yet
            </p>
            <p style={{ fontFamily:SANS, fontSize:14, color:"#888", marginBottom:28 }}>
              Start shopping to see your orders here
            </p>
            <Link to="/products"
              style={{ padding:"13px 36px", background:"#800000", color:"#FFFFF0",
                textDecoration:"none", fontFamily:SANS, fontSize:12,
                letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:600 }}>
              Explore Collection
            </Link>
          </motion.div>

        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {orders.map((order, idx) => {
              const sc  = STATUS_CONFIG[order.status] || STATUS_CONFIG.PLACED;
              const pc  = PAY_CONFIG[order.paymentStatus] || {};
              const exp = expandedId === order.orderNumber;
              const canCancel = ["PLACED","CONFIRMED"].includes(order.status);

              return (
                <motion.div key={order.orderNumber}
                  initial={{opacity:0, y:16}} animate={{opacity:1, y:0}}
                  transition={{delay:idx*0.04}}
                  style={{ background:"white", border:"1px solid rgba(26,26,46,0.1)",
                    borderRadius:4, overflow:"hidden",
                    opacity:cancellingId===order.orderNumber?0.5:1, transition:"opacity 0.2s" }}>

                  {/* Order header row */}
                  <div style={{ padding:"20px 24px", display:"grid",
                    gridTemplateColumns:"1fr auto auto auto", gap:20,
                    alignItems:"center", cursor:"pointer",
                    borderBottom:exp?"1px solid rgba(26,26,46,0.08)":"none" }}
                    onClick={() => setExpandedId(exp ? null : order.orderNumber)}>

                    {/* Left: Order number + date */}
                    <div>
                      <p style={{ fontFamily:SERIF, fontSize:18, fontWeight:700,
                        color:"#1A1A2E", marginBottom:4 }}>{order.orderNumber}</p>
                      <p style={{ fontFamily:SANS, fontSize:12, color:"#888" }}>
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString("en-IN",
                              { day:"numeric", month:"long", year:"numeric" })
                          : ""}
                        {" · "}
                        {order.items?.length || 0} item{(order.items?.length||0)!==1?"s":""}
                      </p>
                    </div>

                    {/* Status badge */}
                    <span style={{ padding:"5px 12px", fontFamily:SANS, fontSize:12,
                      fontWeight:700, color:sc.color, background:sc.bg,
                      border:`1px solid ${sc.border}`, borderRadius:3, whiteSpace:"nowrap" }}>
                      {sc.label}
                    </span>

                    {/* Amount */}
                    <p style={{ fontFamily:SERIF, fontSize:18, fontWeight:700,
                      color:"#1A1A2E", whiteSpace:"nowrap" }}>
                      ₹{fmt(order.grandTotal)}
                    </p>

                    {/* Expand chevron */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="#888" strokeWidth="2"
                      style={{ transform:exp?"rotate(180deg)":"rotate(0deg)",
                        transition:"transform 0.2s", flexShrink:0 }}>
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>

                  {/* Expanded detail */}
                  <AnimatePresence>
                    {exp && (
                      <motion.div initial={{height:0,opacity:0}}
                        animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}
                        transition={{duration:0.22}}
                        style={{ overflow:"hidden" }}>
                        <div style={{ padding:"20px 24px" }}>

                          {/* Items */}
                          <div style={{ marginBottom:20 }}>
                            {order.items?.map(item => (
                              <div key={item.id}
                                style={{ display:"flex", gap:12, marginBottom:12,
                                  paddingBottom:12, borderBottom:"1px solid rgba(26,26,46,0.07)",
                                  cursor:"pointer" }}
                                onClick={() => navigate(`/product/${item.productId}`)}>
                                {item.productImage && (
                                  <img src={item.productImage} alt={item.productName}
                                    style={{ width:50, height:62, objectFit:"cover", flexShrink:0 }}/>
                                )}
                                <div style={{ flex:1 }}>
                                  <p style={{ fontFamily:SERIF, fontSize:16, fontWeight:700,
                                    color:"#1A1A2E", marginBottom:3 }}>{item.productName}</p>
                                  {item.categoryName && (
                                    <p style={{ fontFamily:SANS, fontSize:11, color:"#D4AF37",
                                      letterSpacing:"0.08em", textTransform:"uppercase",
                                      fontWeight:600, marginBottom:3 }}>{item.categoryName}</p>
                                  )}
                                  <p style={{ fontFamily:SANS, fontSize:13, color:"#888" }}>
                                    Qty: {item.quantity} · ₹{Number(item.price||0).toLocaleString("en-IN")}
                                  </p>
                                </div>
                                <p style={{ fontFamily:SERIF, fontSize:15, fontWeight:700,
                                  color:"#1A1A2E", flexShrink:0 }}>
                                  ₹{fmt(item.subtotal)}
                                </p>
                              </div>
                            ))}
                          </div>

                          {/* Price breakdown + delivery + payment */}
                          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>

                            {/* Delivery address */}
                            <div style={{ padding:"16px", background:"#F9F6EF",
                              border:"1px solid rgba(26,26,46,0.08)" }}>
                              <p style={{ fontFamily:SANS, fontSize:11, fontWeight:700,
                                letterSpacing:"0.14em", textTransform:"uppercase",
                                color:"#888", marginBottom:10 }}>Delivered to</p>
                              <p style={{ fontFamily:SERIF, fontSize:15, fontWeight:700,
                                color:"#1A1A2E", marginBottom:4 }}>
                                {order.address?.fullName}
                              </p>
                              <p style={{ fontFamily:SANS, fontSize:12, color:"#555",
                                lineHeight:1.5 }}>
                                {order.address?.addressLine1}
                                {order.address?.addressLine2 && `, ${order.address.addressLine2}`}
                                {`, ${order.address?.city}, ${order.address?.state}`}<br/>
                                Pincode: {order.address?.pincode}
                              </p>
                              {order.address?.phone && (
                                <p style={{ fontFamily:SANS, fontSize:12,
                                  color:"#888", marginTop:6 }}>
                                  📞 {order.address.phone}
                                </p>
                              )}
                            </div>

                            {/* Payment + price */}
                            <div style={{ padding:"16px", background:"#F9F6EF",
                              border:"1px solid rgba(26,26,46,0.08)" }}>
                              <p style={{ fontFamily:SANS, fontSize:11, fontWeight:700,
                                letterSpacing:"0.14em", textTransform:"uppercase",
                                color:"#888", marginBottom:10 }}>Payment</p>
                              <p style={{ fontFamily:SANS, fontSize:13, fontWeight:600,
                                color:pc.color||"#555", marginBottom:10 }}>{pc.label}</p>
                              {order.utrNumber && (
                                <p style={{ fontFamily:SANS, fontSize:12, color:"#888",
                                  marginBottom:10 }}>
                                  UTR: {order.utrNumber}
                                </p>
                              )}
                              <div style={{ borderTop:"1px solid rgba(26,26,46,0.1)",
                                paddingTop:10 }}>
                                {[
                                  ["Subtotal",  `₹${fmt(order.subtotal)}`],
                                  ["Delivery",  Number(order.deliveryCharge||0)===0?"FREE":`₹${fmt(order.deliveryCharge)}`],
                                ].map(([l,v]) => (
                                  <div key={l} style={{ display:"flex", justifyContent:"space-between",
                                    marginBottom:5 }}>
                                    <span style={{ fontFamily:SANS, fontSize:12, color:"#888" }}>{l}</span>
                                    <span style={{ fontFamily:SANS, fontSize:12,
                                      color:"#555", fontWeight:500 }}>{v}</span>
                                  </div>
                                ))}
                                <div style={{ display:"flex", justifyContent:"space-between",
                                  marginTop:6, paddingTop:6,
                                  borderTop:"1px solid rgba(26,26,46,0.08)" }}>
                                  <span style={{ fontFamily:SERIF, fontSize:15,
                                    fontWeight:700, color:"#1A1A2E" }}>Total</span>
                                  <span style={{ fontFamily:SERIF, fontSize:16,
                                    fontWeight:700, color:"#1A1A2E" }}>
                                    ₹{fmt(order.grandTotal)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Tracking */}
                          {order.trackingNumber && (
                            <div style={{ marginTop:14, padding:"12px 16px",
                              background:"#F0F9FF", border:"1px solid #BAE6FD" }}>
                              <p style={{ fontFamily:SANS, fontSize:13,
                                color:"#0369A1", fontWeight:600 }}>
                                📦 Tracking: {order.courierPartner && <>{order.courierPartner} · </>}
                                {order.trackingNumber}
                              </p>
                            </div>
                          )}

                          {/* Notes */}
                          {order.customerNotes && (
                            <div style={{ marginTop:14, padding:"12px 16px",
                              background:"#FFFBEB", border:"1px solid rgba(212,175,55,0.2)" }}>
                              <p style={{ fontFamily:SANS, fontSize:12, color:"#888",
                                marginBottom:4, fontWeight:600 }}>Your Note:</p>
                              <p style={{ fontFamily:SANS, fontSize:13,
                                color:"#555" }}>{order.customerNotes}</p>
                            </div>
                          )}

                          {/* Cancellation reason */}
                          {order.status === "CANCELLED" && order.cancellationReason && (
                            <div style={{ marginTop:14, padding:"12px 16px",
                              background:"#FFF1F2", border:"1px solid #FECDD3" }}>
                              <p style={{ fontFamily:SANS, fontSize:13,
                                color:"#B91C1C", fontWeight:500 }}>
                                Cancelled: {order.cancellationReason}
                              </p>
                            </div>
                          )}

                          {/* Actions */}
                          <div style={{ display:"flex", gap:12, marginTop:18 }}>
                            {canCancel && (
                              <button onClick={() => handleCancel(order)}
                                disabled={cancellingId === order.orderNumber}
                                style={{ padding:"10px 20px", background:"transparent",
                                  color:"#B91C1C", fontFamily:SANS, fontSize:12,
                                  fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase",
                                  border:"1.5px solid rgba(185,28,28,0.3)", cursor:"pointer",
                                  borderRadius:3 }}>
                                {cancellingId===order.orderNumber ? "Cancelling…" : "Cancel Order"}
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        @keyframes spin { to { transform:rotate(360deg); } }
      `}</style>
    </div>
  );
}