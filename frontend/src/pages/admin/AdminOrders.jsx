import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminTheme, StatusBadge } from "./AdminDashboard";
import { adminOrderAPI } from "../../api/order.api";

const SERIF = "'Cormorant Garamond', Georgia, serif";
const SANS  = "'DM Sans', 'Segoe UI', system-ui, sans-serif";

const STATUS_FLOW = ["PLACED","CONFIRMED","PACKED","SHIPPED","DELIVERED"];

const FILTERS = [
  { key:"all",       label:"All"       },
  { key:"PLACED",    label:"New"       },
  { key:"CONFIRMED", label:"Confirmed" },
  { key:"PACKED",    label:"Packed"    },
  { key:"SHIPPED",   label:"Shipped"   },
  { key:"DELIVERED", label:"Delivered" },
  { key:"CANCELLED", label:"Cancelled" },
];

// Payment method → display label + colors
function PayBadge({ method, T }) {
  const cfg = {
    UPI:      { label:"UPI",      bg:T.blueBg,   border:T.blueBorder,   tx:T.blue  },
    COD:      { label:"COD",      bg:T.amberBg,  border:T.amberBorder,  tx:T.amber },
    RAZORPAY: { label:"Razorpay", bg:T.greenBg,  border:T.greenBorder,  tx:T.green },
    CARD:     { label:"Card",     bg:T.blueBg,   border:T.blueBorder,   tx:T.blue  },
  };
  const c = cfg[method] || { label:method||"—", bg:T.badgePill, border:T.border, tx:T.muted };
  return (
    <span style={{ padding:"3px 8px", borderRadius:6, fontSize:11, fontWeight:600,
      background:c.bg, border:`1px solid ${c.border}`, color:c.tx }}>
      {c.label}
    </span>
  );
}

// Payment status indicator for UPI orders
function PayStatusBadge({ status, T }) {
  const cfg = {
    PENDING:              { label:"Pending",        bg:T.amberBg,  border:T.amberBorder,  tx:T.amber  },
    PENDING_VERIFICATION: { label:"⏳ Verify UPI",  bg:T.amberBg,  border:T.amberBorder,  tx:T.amber  },
    VERIFIED:             { label:"✓ Verified",     bg:T.greenBg,  border:T.greenBorder,  tx:T.green  },
    COMPLETED:            { label:"✓ Paid",         bg:T.greenBg,  border:T.greenBorder,  tx:T.green  },
    FAILED:               { label:"✗ Failed",       bg:T.dangerBg, border:T.dangerBorder, tx:T.danger },
    REFUNDED:             { label:"Refunded",        bg:T.blueBg,   border:T.blueBorder,   tx:T.blue   },
  };
  const c = cfg[status] || { label:status||"—", bg:T.badgePill, border:T.border, tx:T.muted };
  return (
    <span style={{ padding:"3px 8px", borderRadius:6, fontSize:11, fontWeight:600,
      background:c.bg, border:`1px solid ${c.border}`, color:c.tx }}>
      {c.label}
    </span>
  );
}

export default function AdminOrders() {
  const { T, theme } = useAdminTheme();

  // ── State ──────────────────────────────────────────────────────────────
  const [orders,        setOrders]        = useState([]);
  const [totalPages,    setTotalPages]    = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage,   setCurrentPage]   = useState(0);
  const [loading,       setLoading]       = useState(true);
  const [filter,        setFilter]        = useState("all");
  const [search,        setSearch]        = useState("");
  const [searchInput,   setSearchInput]   = useState("");
  const [selectedOrder, setSelected]      = useState(null);
  const [updatingId,    setUpdatingId]    = useState(null);
  const [verifyingId,   setVerifyingId]   = useState(null);
  const [stats,         setStats]         = useState(null);

  // Tracking panel state (shown inside detail panel)
  const [showTracking,   setShowTracking]  = useState(false);
  const [trackingNum,    setTrackingNum]   = useState("");
  const [courierPartner, setCourierPartner] = useState("");
  const [savingTracking, setSavingTracking] = useState(false);

  // ── Data fetching ───────────────────────────────────────────────────────
  const fetchOrders = useCallback(async (page = 0, currentFilter = filter, currentSearch = search) => {
    setLoading(true);
    try {
      let result;
      if (currentSearch.trim()) {
        // GET /api/admin/orders/search?query=...
        result = await adminOrderAPI.search(currentSearch.trim(), page, 20);
      } else if (currentFilter !== "all") {
        // GET /api/admin/orders/status/{status}
        result = await adminOrderAPI.getByStatus(currentFilter, page, 20);
      } else {
        // GET /api/admin/orders
        result = await adminOrderAPI.getAll(page, 20);
      }
      // result is Page<OrderResponse>: { content, totalPages, totalElements, number }
      setOrders(result.content || []);
      setTotalPages(result.totalPages || 1);
      setTotalElements(result.totalElements || 0);
      setCurrentPage(result.number || 0);
    } catch(e) {
      console.error("Failed to load orders:", e);
    } finally {
      setLoading(false);
    }
  }, [filter, search]);

  const fetchStats = async () => {
    try {
      // GET /api/admin/orders/statistics
      const s = await adminOrderAPI.getStatistics();
      setStats(s);
    } catch(e) { console.error(e); }
  };

  useEffect(() => {
    fetchOrders(0, filter, search);
    fetchStats();
  }, [filter]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      fetchOrders(0, filter, searchInput);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // ── Actions ─────────────────────────────────────────────────────────────

  // PATCH /api/admin/orders/{id}/status
  const handleStatusUpdate = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const updated = await adminOrderAPI.updateStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => o.id === orderId ? updated : o));
      if (selectedOrder?.id === orderId) setSelected(updated);
    } catch(e) {
      alert(e.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  // PATCH /api/admin/orders/{id}/verify-payment  (UPI screenshot verification)
  const handleVerifyPayment = async (orderId, approved) => {
    setVerifyingId(orderId);
    try {
      const updated = await adminOrderAPI.verifyPayment(orderId, approved);
      setOrders(prev => prev.map(o => o.id === orderId ? updated : o));
      if (selectedOrder?.id === orderId) setSelected(updated);
    } catch(e) {
      alert(e.response?.data?.message || "Failed to verify payment");
    } finally {
      setVerifyingId(null);
    }
  };

  // PATCH /api/admin/orders/{id}/tracking
  const handleSaveTracking = async () => {
    if (!trackingNum.trim()) return;
    setSavingTracking(true);
    try {
      const updated = await adminOrderAPI.updateTracking(
        selectedOrder.id, trackingNum.trim(), courierPartner.trim()
      );
      setOrders(prev => prev.map(o => o.id === updated.id ? updated : o));
      setSelected(updated);
      setShowTracking(false);
    } catch(e) {
      alert(e.response?.data?.message || "Failed to save tracking");
    } finally {
      setSavingTracking(false);
    }
  };

  const openDetail = (order) => {
    setSelected(order);
    setShowTracking(false);
    setTrackingNum(order.trackingNumber || "");
    setCourierPartner(order.courierPartner || "");
  };

  const fmt = n => Number(n||0).toLocaleString("en-IN");

  // Counts per status from current page (approximate — real counts from stats API)
  const counts = { all:totalElements };
  FILTERS.slice(1).forEach(f => { counts[f.key] = 0; });
  orders.forEach(o => { if (counts[o.status] !== undefined) counts[o.status]++; });

  const iStyle = {
    padding:"9px 14px", background:T.inputBg, border:`1px solid ${T.inputBorder}`,
    borderRadius:8, color:T.text, fontSize:13, outline:"none", fontFamily:SANS,
  };

  return (
    <div style={{ display:"flex", gap:20, height:"calc(100vh - 112px)",
      fontFamily:SANS }}>

      {/* ── LEFT: Table panel ── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", gap:14, minWidth:0 }}>

        {/* Header + stats */}
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between",
          flexWrap:"wrap", gap:12 }}>
          <div>
            <h1 style={{ fontFamily:SERIF, fontSize:28, fontWeight:700,
              color:T.text, marginBottom:4 }}>Order Management</h1>
            <p style={{ fontSize:14, color:T.muted }}>
              {totalElements} total orders
              {stats && ` · ${stats.pendingOrders ?? 0} new`}
            </p>
          </div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {[
              { label:"Pending",    count:stats?.pendingOrders ?? "—",   color:T.amber, bg:T.amberBg, bd:T.amberBorder },
              { label:"Confirmed",  count:stats?.confirmedOrders ?? "—", color:T.blue,  bg:T.blueBg,  bd:T.blueBorder  },
              { label:"Today",      count:stats?.todayOrders ?? "—",     color:T.green, bg:T.greenBg, bd:T.greenBorder },
            ].map((s, i) => (
              <div key={i} style={{ padding:"8px 14px", borderRadius:8,
                background:s.bg, border:`1px solid ${s.bd}` }}>
                <span style={{ fontFamily:SERIF, fontSize:20, fontWeight:700, color:s.color }}>
                  {s.count}
                </span>
                <span style={{ fontSize:12, color:T.muted, marginLeft:6 }}>{s.label}</span>
              </div>
            ))}
            {stats?.todayRevenue > 0 && (
              <div style={{ padding:"8px 14px", borderRadius:8, background:T.amberBg,
                border:`1px solid ${T.amberBorder}` }}>
                <span style={{ fontFamily:SERIF, fontSize:16, fontWeight:700, color:T.amber }}>
                  ₹{fmt(stats.todayRevenue)}
                </span>
                <span style={{ fontSize:12, color:T.muted, marginLeft:6 }}>Today's revenue</span>
              </div>
            )}
          </div>
        </div>

        {/* Toolbar: search + filter tabs */}
        <div style={{ padding:"12px 14px", background:T.card, border:`1px solid ${T.border}`,
          borderRadius:10, boxShadow:T.shadow, display:"flex", gap:10, flexWrap:"wrap",
          alignItems:"center" }}>
          <div style={{ position:"relative", flex:"0 0 260px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.muted}
              strokeWidth="2" style={{ position:"absolute", left:11, top:"50%",
              transform:"translateY(-50%)", pointerEvents:"none" }}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input placeholder="Order no., customer, email…"
              value={searchInput} onChange={e => setSearchInput(e.target.value)}
              style={{ ...iStyle, paddingLeft:34, width:"100%" }}
              onFocus={e => e.target.style.borderColor = T.inputFocus}
              onBlur={e  => e.target.style.borderColor = T.inputBorder}/>
          </div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {FILTERS.map(f => (
              <button key={f.key} onClick={() => { setFilter(f.key); setCurrentPage(0); }}
                style={{ padding:"7px 13px", borderRadius:7, cursor:"pointer",
                  border:`1px solid ${filter===f.key ? T.borderHi : T.border}`,
                  background:filter===f.key
                    ? (theme==="dark"?"rgba(212,175,55,0.1)":"rgba(128,0,0,0.07)")
                    : "transparent",
                  color:filter===f.key ? (theme==="dark"?T.gold:T.maroon) : T.muted,
                  fontSize:12, fontWeight:filter===f.key?700:400, fontFamily:SANS,
                  transition:"all 0.15s" }}>
                {f.label}
              </button>
            ))}
          </div>
          {/* Refresh */}
          <button onClick={() => { fetchOrders(currentPage); fetchStats(); }}
            style={{ marginLeft:"auto", padding:"8px 12px", borderRadius:7, cursor:"pointer",
              background:"transparent", border:`1px solid ${T.border}`, color:T.muted,
              display:"flex", alignItems:"center", gap:6, fontSize:12, fontFamily:SANS,
              transition:"all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.background = T.hoverBg; e.currentTarget.style.color = T.text; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.muted; }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
            Refresh
          </button>
        </div>

        {/* Orders table */}
        <div style={{ flex:1, overflowY:"auto", background:T.card, border:`1px solid ${T.border}`,
          borderRadius:12, boxShadow:T.shadow }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ borderBottom:`1px solid ${T.tableBorder}` }}>
                {["Order No.","Customer","Date","Items","Total","Payment","Pay Status","Status",""].map(h => (
                  <th key={h} style={{ padding:"11px 14px", textAlign:"left", fontSize:11,
                    fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:T.muted,
                    background:theme==="dark"?"rgba(255,255,255,0.02)":T.cardAlt,
                    whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(8)].map((_,i) => (
                  <tr key={i}>
                    <td colSpan={9} style={{ padding:"14px 16px" }}>
                      <div style={{ height:16, background:T.statBorder, borderRadius:4,
                        animation:"fadeInOut 1.4s infinite", opacity:1-(i*0.1) }}/>
                    </td>
                  </tr>
                ))
              ) : orders.length === 0 ? (
                <tr><td colSpan={9}
                  style={{ padding:"60px 16px", textAlign:"center", color:T.muted, fontSize:14 }}>
                  No orders found
                </td></tr>
              ) : orders.map(o => (
                <tr key={o.id} onClick={() => openDetail(o)}
                  className="ord-row"
                  style={{ borderBottom:`1px solid ${T.tableBorder}`, cursor:"pointer",
                    background:selectedOrder?.id===o.id
                      ? (theme==="dark"?"rgba(212,175,55,0.05)":"rgba(128,0,0,0.03)")
                      : "transparent",
                    transition:"background 0.12s",
                    opacity:updatingId===o.id?0.55:1 }}>

                  {/* Order number */}
                  <td style={{ padding:"12px 14px", fontSize:13, fontWeight:700,
                    color:theme==="dark"?T.gold:T.maroon, whiteSpace:"nowrap" }}>
                    {o.orderNumber}
                  </td>

                  {/* Customer */}
                  <td style={{ padding:"12px 14px" }}>
                    <div style={{ fontSize:13, fontWeight:600, color:T.text }}>
                      {o.customerName}
                    </div>
                    <div style={{ fontSize:11, color:T.muted }}>{o.address?.phone}</div>
                  </td>

                  {/* Date */}
                  <td style={{ padding:"12px 14px", fontSize:12, color:T.muted, whiteSpace:"nowrap" }}>
                    {o.createdAt
                      ? new Date(o.createdAt).toLocaleDateString("en-IN",
                          { day:"numeric", month:"short", year:"numeric" })
                      : "—"}
                  </td>

                  {/* Items count */}
                  <td style={{ padding:"12px 14px", fontSize:13, color:T.text }}>
                    {o.items?.length ?? 0} item{(o.items?.length??0)!==1?"s":""}
                  </td>

                  {/* Grand total */}
                  <td style={{ padding:"12px 14px", fontFamily:SERIF, fontSize:14,
                    fontWeight:700, color:T.text, whiteSpace:"nowrap" }}>
                    ₹{fmt(o.grandTotal)}
                  </td>

                  {/* Payment method */}
                  <td style={{ padding:"12px 14px" }}>
                    <PayBadge method={o.paymentMethod} T={T}/>
                  </td>

                  {/* Payment status */}
                  <td style={{ padding:"12px 14px" }}>
                    <PayStatusBadge status={o.paymentStatus} T={T}/>
                  </td>

                  {/* Order status */}
                  <td style={{ padding:"12px 14px" }}>
                    <StatusBadge status={o.status?.toLowerCase()}/>
                  </td>

                  {/* Manage button */}
                  <td style={{ padding:"12px 14px" }}>
                    <button onClick={e => { e.stopPropagation(); openDetail(o); }}
                      style={{ padding:"6px 12px",
                        background:theme==="dark"?"rgba(212,175,55,0.08)":"rgba(128,0,0,0.06)",
                        border:`1px solid ${T.borderHi}`,
                        color:theme==="dark"?T.gold:T.maroon,
                        cursor:"pointer", fontSize:12, fontWeight:600,
                        borderRadius:6, fontFamily:SANS, whiteSpace:"nowrap" }}>
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
            <button onClick={() => fetchOrders(currentPage-1)} disabled={currentPage===0}
              style={{ padding:"7px 14px", borderRadius:7, background:"transparent",
                border:`1px solid ${T.border}`, color:currentPage===0?T.dim:T.text,
                cursor:currentPage===0?"not-allowed":"pointer", fontSize:13, fontFamily:SANS }}>
              ← Prev
            </button>
            <span style={{ fontSize:13, color:T.muted }}>
              Page {currentPage+1} of {totalPages}
            </span>
            <button onClick={() => fetchOrders(currentPage+1)} disabled={currentPage>=totalPages-1}
              style={{ padding:"7px 14px", borderRadius:7, background:"transparent",
                border:`1px solid ${T.border}`, color:currentPage>=totalPages-1?T.dim:T.text,
                cursor:currentPage>=totalPages-1?"not-allowed":"pointer", fontSize:13, fontFamily:SANS }}>
              Next →
            </button>
          </div>
        )}
      </div>

      {/* ── RIGHT: Detail panel ── */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div key="detail"
            initial={{opacity:0,x:28}} animate={{opacity:1,x:0}} exit={{opacity:0,x:28}}
            transition={{type:"spring",stiffness:320,damping:28}}
            style={{ width:360, flexShrink:0, background:T.card,
              border:`1px solid ${T.border}`, borderRadius:14, padding:"22px",
              overflowY:"auto", boxShadow:T.shadowMd, display:"flex",
              flexDirection:"column", gap:18 }}>

            {/* Header */}
            <div style={{ display:"flex", alignItems:"flex-start",
              justifyContent:"space-between" }}>
              <div>
                <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em",
                  textTransform:"uppercase", color:T.muted, marginBottom:4 }}>Order Details</p>
                <h2 style={{ fontFamily:SERIF, fontSize:22, fontWeight:700,
                  color:theme==="dark"?T.gold:T.maroon }}>
                  {selectedOrder.orderNumber}
                </h2>
              </div>
              <button onClick={() => setSelected(null)}
                style={{ width:30, height:30, borderRadius:7, background:T.hoverBg,
                  border:`1px solid ${T.border}`, color:T.muted, cursor:"pointer",
                  display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Status + date row */}
            <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
              <StatusBadge status={selectedOrder.status?.toLowerCase()}/>
              <PayStatusBadge status={selectedOrder.paymentStatus} T={T}/>
              <span style={{ fontSize:12, color:T.muted, marginLeft:"auto" }}>
                {selectedOrder.createdAt
                  ? new Date(selectedOrder.createdAt).toLocaleDateString("en-IN",
                      { day:"numeric", month:"long", year:"numeric" })
                  : "—"}
              </span>
            </div>

            {/* ── UPI Verification (only for PENDING_VERIFICATION) ── */}
            {selectedOrder.paymentStatus === "PENDING_VERIFICATION" && (
              <div style={{ padding:"14px", background:T.amberBg,
                border:`1px solid ${T.amberBorder}`, borderRadius:10 }}>
                <p style={{ fontSize:12, fontWeight:700, letterSpacing:"0.08em",
                  textTransform:"uppercase", color:T.amber, marginBottom:10 }}>
                  ⏳ UPI Payment Pending Verification
                </p>
                {selectedOrder.utrNumber && (
                  <p style={{ fontSize:13, color:T.text, marginBottom:6 }}>
                    UTR: <strong>{selectedOrder.utrNumber}</strong>
                  </p>
                )}
                {selectedOrder.screenshotUrl && (
                  <a href={selectedOrder.screenshotUrl} target="_blank" rel="noreferrer"
                    style={{ fontSize:12, color:T.blue, display:"block", marginBottom:10 }}>
                    📎 View Payment Screenshot ↗
                  </a>
                )}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                  <button onClick={() => handleVerifyPayment(selectedOrder.id, true)}
                    disabled={verifyingId === selectedOrder.id}
                    style={{ padding:"10px", background:T.greenBg,
                      border:`1px solid ${T.greenBorder}`, color:T.green,
                      cursor:verifyingId?"wait":"pointer", fontSize:12, fontWeight:700,
                      borderRadius:7, fontFamily:SANS,
                      opacity:verifyingId===selectedOrder.id?0.6:1 }}>
                    {verifyingId===selectedOrder.id ? "…" : "✓ Approve"}
                  </button>
                  <button onClick={() => handleVerifyPayment(selectedOrder.id, false)}
                    disabled={verifyingId === selectedOrder.id}
                    style={{ padding:"10px", background:T.dangerBg,
                      border:`1px solid ${T.dangerBorder}`, color:T.danger,
                      cursor:verifyingId?"wait":"pointer", fontSize:12, fontWeight:700,
                      borderRadius:7, fontFamily:SANS,
                      opacity:verifyingId===selectedOrder.id?0.6:1 }}>
                    {verifyingId===selectedOrder.id ? "…" : "✗ Reject"}
                  </button>
                </div>
              </div>
            )}

            {/* ── Order Timeline ── */}
            <div style={{ padding:"14px", background:T.cardAlt||T.hoverBg,
              borderRadius:10, border:`1px solid ${T.border}` }}>
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em",
                textTransform:"uppercase", color:T.muted, marginBottom:14 }}>
                Timeline
              </p>
              {STATUS_FLOW.map((s, i) => {
                const currentIdx = STATUS_FLOW.indexOf(selectedOrder.status?.toUpperCase());
                const done    = i <= currentIdx && selectedOrder.status !== "CANCELLED";
                const isCurr  = i === currentIdx && selectedOrder.status !== "CANCELLED";

                // Timestamp from OrderResponse
                const tsMap = {
                  PLACED:    selectedOrder.createdAt,
                  CONFIRMED: selectedOrder.confirmedAt,
                  PACKED:    selectedOrder.packedAt,
                  SHIPPED:   selectedOrder.shippedAt,
                  DELIVERED: selectedOrder.deliveredAt,
                };
                const ts = tsMap[s];

                return (
                  <div key={s} style={{ display:"flex", gap:10, marginBottom:i<4?12:0,
                    position:"relative", alignItems:"flex-start" }}>
                    {i < 4 && (
                      <div style={{ position:"absolute", left:7, top:18, width:2, height:14,
                        background:done&&!isCurr?T.green:"rgba(128,128,128,0.18)" }}/>
                    )}
                    <div style={{ width:16, height:16, borderRadius:"50%", flexShrink:0,
                      zIndex:1, marginTop:1,
                      background:done?T.green:isCurr?"transparent":"rgba(128,128,128,0.12)",
                      border:`2px solid ${done||isCurr?T.green:"rgba(128,128,128,0.2)"}`,
                      display:"flex", alignItems:"center", justifyContent:"center" }}>
                      {done && !isCurr && (
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none"
                          stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
                      {isCurr && (
                        <div style={{ width:6, height:6, borderRadius:"50%", background:T.green }}/>
                      )}
                    </div>
                    <div>
                      <span style={{ fontSize:13, fontWeight:isCurr?700:400,
                        color:done||isCurr?T.text:T.dim,
                        textTransform:"capitalize" }}>{s.toLowerCase()}</span>
                      {ts && (
                        <p style={{ fontSize:11, color:T.muted, marginTop:1 }}>
                          {new Date(ts).toLocaleDateString("en-IN",
                            { day:"numeric", month:"short", hour:"2-digit", minute:"2-digit" })}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
              {selectedOrder.status === "CANCELLED" && (
                <div style={{ display:"flex", gap:10, marginTop:10, alignItems:"center" }}>
                  <div style={{ width:16, height:16, borderRadius:"50%", background:T.dangerBg,
                    border:`2px solid ${T.danger}`, display:"flex", alignItems:"center",
                    justifyContent:"center" }}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none"
                      stroke={T.danger} strokeWidth="3">
                      <path d="M18 6 6 18M6 6l12 12"/>
                    </svg>
                  </div>
                  <div>
                    <span style={{ fontSize:13, fontWeight:700, color:T.danger }}>Cancelled</span>
                    {selectedOrder.cancelledAt && (
                      <p style={{ fontSize:11, color:T.muted, marginTop:1 }}>
                        {new Date(selectedOrder.cancelledAt).toLocaleDateString("en-IN")}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ── Customer & Delivery ── */}
            <div style={{ padding:"14px", background:T.cardAlt||T.hoverBg,
              borderRadius:10, border:`1px solid ${T.border}` }}>
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em",
                textTransform:"uppercase", color:T.muted, marginBottom:12 }}>Customer</p>
              <p style={{ fontSize:14, fontWeight:700, color:T.text, marginBottom:4 }}>
                {selectedOrder.customerName}
              </p>
              {selectedOrder.customerEmail && (
                <p style={{ fontSize:13, color:T.muted, marginBottom:3 }}>
                  ✉ {selectedOrder.customerEmail}
                </p>
              )}
              {selectedOrder.address?.phone && (
                <p style={{ fontSize:13, color:T.muted, marginBottom:8 }}>
                  📞 {selectedOrder.address.phone}
                </p>
              )}
              <div style={{ borderTop:`1px solid ${T.border}`, paddingTop:10, marginTop:4 }}>
                <p style={{ fontSize:12, fontWeight:700, color:T.dim,
                  letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 }}>
                  Delivery Address
                </p>
                <p style={{ fontSize:13, color:T.text, lineHeight:1.55 }}>
                  {selectedOrder.address?.fullName}<br/>
                  {selectedOrder.address?.addressLine1}
                  {selectedOrder.address?.addressLine2 && `, ${selectedOrder.address.addressLine2}`}<br/>
                  {selectedOrder.address?.city}, {selectedOrder.address?.state} – {selectedOrder.address?.pincode}
                </p>
              </div>
            </div>

            {/* ── Items ── */}
            <div style={{ padding:"14px", background:T.cardAlt||T.hoverBg,
              borderRadius:10, border:`1px solid ${T.border}` }}>
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em",
                textTransform:"uppercase", color:T.muted, marginBottom:12 }}>
                Items ({selectedOrder.items?.length || 0})
              </p>
              {selectedOrder.items?.map(item => (
                <div key={item.id} style={{ display:"flex", gap:10, marginBottom:10,
                  paddingBottom:10, borderBottom:`1px solid ${T.border}` }}>
                  {item.productImage && (
                    <img src={item.productImage} alt={item.productName}
                      style={{ width:44, height:56, objectFit:"cover",
                        flexShrink:0, borderRadius:4 }}/>
                  )}
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ fontSize:13, fontWeight:600, color:T.text,
                      overflow:"hidden", whiteSpace:"nowrap",
                      textOverflow:"ellipsis" }}>{item.productName}</p>
                    {item.categoryName && (
                      <p style={{ fontSize:11, color:T.muted,
                        marginTop:2 }}>{item.categoryName}</p>
                    )}
                    <p style={{ fontSize:12, color:T.muted, marginTop:2 }}>
                      Qty: {item.quantity} · ₹{fmt(item.price)}
                    </p>
                  </div>
                  <p style={{ fontFamily:SERIF, fontSize:14, fontWeight:700,
                    color:T.text, flexShrink:0 }}>₹{fmt(item.subtotal)}</p>
                </div>
              ))}
              {/* Price breakdown */}
              <div style={{ marginTop:4 }}>
                {[
                  { l:"Subtotal",  v:`₹${fmt(selectedOrder.subtotal)}`  },
                  { l:"Delivery",  v:Number(selectedOrder.deliveryCharge||0)===0?"Free":`₹${fmt(selectedOrder.deliveryCharge)}` },
                  ...(Number(selectedOrder.tax||0)>0 ? [{ l:"Tax/GST", v:`₹${fmt(selectedOrder.tax)}` }] : []),
                ].map((r,i) => (
                  <div key={i} style={{ display:"flex", justifyContent:"space-between",
                    marginBottom:6 }}>
                    <span style={{ fontSize:12, color:T.muted }}>{r.l}</span>
                    <span style={{ fontSize:12, color:T.muted, fontWeight:500 }}>{r.v}</span>
                  </div>
                ))}
                <div style={{ display:"flex", justifyContent:"space-between",
                  paddingTop:8, borderTop:`1px solid ${T.border}` }}>
                  <span style={{ fontFamily:SERIF, fontSize:16,
                    fontWeight:700, color:T.text }}>Grand Total</span>
                  <span style={{ fontFamily:SERIF, fontSize:18,
                    fontWeight:700, color:theme==="dark"?T.gold:T.maroon }}>
                    ₹{fmt(selectedOrder.grandTotal)}
                  </span>
                </div>
              </div>
            </div>

            {/* ── Customer notes ── */}
            {selectedOrder.customerNotes && (
              <div style={{ padding:"12px 14px", background:T.amberBg,
                border:`1px solid ${T.amberBorder}`, borderRadius:8 }}>
                <p style={{ fontSize:11, fontWeight:700, color:T.amber,
                  letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 }}>
                  Customer Note
                </p>
                <p style={{ fontSize:13, color:T.text }}>{selectedOrder.customerNotes}</p>
              </div>
            )}

            {/* ── Tracking ── */}
            {selectedOrder.status === "SHIPPED" || selectedOrder.trackingNumber ? (
              <div style={{ padding:"14px", background:T.cardAlt||T.hoverBg,
                borderRadius:10, border:`1px solid ${T.border}` }}>
                <div style={{ display:"flex", alignItems:"center",
                  justifyContent:"space-between", marginBottom:10 }}>
                  <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em",
                    textTransform:"uppercase", color:T.muted }}>Tracking</p>
                  <button onClick={() => setShowTracking(t => !t)}
                    style={{ fontSize:12, color:theme==="dark"?T.gold:T.maroon,
                      background:"transparent", border:"none", cursor:"pointer",
                      fontWeight:600, fontFamily:SANS }}>
                    {showTracking?"Cancel":"Edit"}
                  </button>
                </div>
                {selectedOrder.trackingNumber && !showTracking && (
                  <div>
                    {selectedOrder.courierPartner && (
                      <p style={{ fontSize:13, fontWeight:600, color:T.text,
                        marginBottom:4 }}>{selectedOrder.courierPartner}</p>
                    )}
                    <p style={{ fontSize:13, color:T.muted }}>
                      {selectedOrder.trackingNumber}
                    </p>
                  </div>
                )}
                {showTracking && (
                  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    <input placeholder="Courier (e.g. Blue Dart)"
                      value={courierPartner}
                      onChange={e => setCourierPartner(e.target.value)}
                      style={{ ...iStyle, width:"100%" }}/>
                    <input placeholder="Tracking number"
                      value={trackingNum}
                      onChange={e => setTrackingNum(e.target.value)}
                      style={{ ...iStyle, width:"100%" }}/>
                    <button onClick={handleSaveTracking} disabled={savingTracking}
                      style={{ padding:"10px", background:T.blueBg,
                        border:`1px solid ${T.blueBorder}`, color:T.blue,
                        cursor:savingTracking?"wait":"pointer", fontSize:13, fontWeight:700,
                        borderRadius:7, fontFamily:SANS,
                        opacity:savingTracking?0.6:1 }}>
                      {savingTracking ? "Saving…" : "Save Tracking"}
                    </button>
                  </div>
                )}
              </div>
            ) : null}

            {/* ── Update Status buttons ── */}
            {!["DELIVERED","CANCELLED","RETURNED"].includes(selectedOrder.status) && (
              <div>
                <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em",
                  textTransform:"uppercase", color:T.muted, marginBottom:10 }}>
                  Update Status
                </p>
                <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                  {STATUS_FLOW
                    .filter((_, i) => i > STATUS_FLOW.indexOf(selectedOrder.status?.toUpperCase()))
                    .map(nextStatus => (
                      <button key={nextStatus}
                        onClick={() => handleStatusUpdate(selectedOrder.id, nextStatus)}
                        disabled={updatingId === selectedOrder.id}
                        style={{ padding:"11px", background:T.greenBg,
                          border:`1px solid ${T.greenBorder}`, color:T.green,
                          cursor:updatingId?"wait":"pointer", fontSize:13, fontWeight:700,
                          borderRadius:8, fontFamily:SANS, textTransform:"capitalize",
                          transition:"all 0.15s",
                          opacity:updatingId===selectedOrder.id?0.55:1 }}>
                        {updatingId===selectedOrder.id
                          ? "Updating…"
                          : `Mark as ${nextStatus.toLowerCase()} →`}
                      </button>
                    ))}
                  <button
                    onClick={() => handleStatusUpdate(selectedOrder.id, "CANCELLED")}
                    disabled={updatingId === selectedOrder.id}
                    style={{ padding:"11px", background:T.dangerBg,
                      border:`1px solid ${T.dangerBorder}`, color:T.danger,
                      cursor:"pointer", fontSize:13, fontWeight:600,
                      borderRadius:8, fontFamily:SANS, transition:"all 0.15s" }}>
                    Cancel Order
                  </button>
                </div>
              </div>
            )}

            {/* ── Cancellation reason ── */}
            {selectedOrder.status === "CANCELLED" && selectedOrder.cancellationReason && (
              <div style={{ padding:"12px 14px", background:T.dangerBg,
                border:`1px solid ${T.dangerBorder}`, borderRadius:8 }}>
                <p style={{ fontSize:11, fontWeight:700, color:T.danger,
                  letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:4 }}>
                  Cancellation Reason
                </p>
                <p style={{ fontSize:13, color:T.text }}>
                  {selectedOrder.cancellationReason}
                </p>
              </div>
            )}

            {/* ── Generate Invoice ── */}
            <button style={{ padding:"12px", background:T.maroon, color:"#FFFFF0",
              border:"none", cursor:"pointer", fontSize:13, fontWeight:700,
              borderRadius:8, fontFamily:SANS, display:"flex", alignItems:"center",
              gap:8, justifyContent:"center", transition:"opacity 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.opacity="0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity="1"}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Generate Invoice PDF
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .ord-row:hover { background: ${T.tableRowHover} !important; }
      `}</style>
    </div>
  );
}