import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminTheme } from "./AdminDashboard";
import { adminOrderAPI } from "../../api/order.api";
import { generateInvoicePDF } from "../../utils/generateInvoice";

const SERIF = "'Cormorant Garamond', Georgia, serif";
const SANS  = "'DM Sans', 'Segoe UI', system-ui, sans-serif";

const fmt = (n) => Number(n || 0).toLocaleString("en-IN");

const STATUS_COLORS = {
  PLACED:    { bg:"#EFF6FF", border:"#BFDBFE", tx:"#1D4ED8" },
  CONFIRMED: { bg:"#F0FDF4", border:"#BBF7D0", tx:"#15803D" },
  PACKED:    { bg:"#FFFBEB", border:"#FDE68A", tx:"#92400E" },
  SHIPPED:   { bg:"#F5F3FF", border:"#DDD6FE", tx:"#6D28D9" },
  DELIVERED: { bg:"#F0FDF4", border:"#86EFAC", tx:"#166534" },
  CANCELLED: { bg:"#FEF2F2", border:"#FECACA", tx:"#B91C1C" },
};

const PAY_COLORS = {
  COMPLETED:            { bg:"#F0FDF4", border:"#BBF7D0", tx:"#15803D" },
  VERIFIED:             { bg:"#F0FDF4", border:"#BBF7D0", tx:"#15803D" },
  PENDING:              { bg:"#FFFBEB", border:"#FDE68A", tx:"#92400E" },
  PENDING_VERIFICATION: { bg:"#FFFBEB", border:"#FDE68A", tx:"#92400E" },
  FAILED:               { bg:"#FEF2F2", border:"#FECACA", tx:"#B91C1C" },
};

function Badge({ label, colors }) {
  return (
    <span style={{
      padding: "3px 9px", borderRadius: 6, fontSize: 11, fontWeight: 600,
      background: colors?.bg || "#f5f5f5",
      border: `1px solid ${colors?.border || "#ddd"}`,
      color: colors?.tx || "#555",
      whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  );
}

export default function AdminInvoices() {
  const { T, theme } = useAdminTheme();

  const [orders, setOrders]             = useState([]);
  const [loading, setLoading]           = useState(true);
  const [searchInput, setSearchInput]   = useState("");
  const [search, setSearch]             = useState("");
  const [filter, setFilter]             = useState("all");
  const [currentPage, setCurrentPage]   = useState(0);
  const [totalPages, setTotalPages]     = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [generating, setGenerating]     = useState(null);
  const [bulkGenerating, setBulkGenerating] = useState(false);
  const [selected, setSelected]         = useState([]);
  const [toast, setToast]               = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchOrders = useCallback(async (page = 0, currentFilter = filter, currentSearch = search) => {
    setLoading(true);
    try {
      let result;
      if (currentSearch.trim()) {
        result = await adminOrderAPI.search(currentSearch.trim(), page, 15);
      } else if (currentFilter !== "all") {
        result = await adminOrderAPI.getByStatus(currentFilter, page, 15);
      } else {
        result = await adminOrderAPI.getAll(page, 15);
      }
      setOrders(result.content || []);
      setTotalPages(result.totalPages || 1);
      setTotalElements(result.totalElements || 0);
      setCurrentPage(result.number || 0);
    } catch (e) {
      console.error("Failed to load orders:", e);
    } finally {
      setLoading(false);
    }
  }, [filter, search]);

  useEffect(() => { fetchOrders(0, filter, search); }, [filter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      fetchOrders(0, filter, searchInput);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleGenerate = async (order) => {
    setGenerating(order.id);
    try {
      await new Promise(r => setTimeout(r, 300));
      generateInvoicePDF(order);
      showToast(`Invoice ${order.orderNumber} downloaded!`);
    } catch (e) {
      showToast("Failed to generate invoice", "error");
    } finally {
      setGenerating(null);
    }
  };

  const handleBulkGenerate = async () => {
    const targets = selected.length > 0
      ? orders.filter(o => selected.includes(o.id))
      : orders;
    if (targets.length === 0) return;
    setBulkGenerating(true);
    try {
      for (let i = 0; i < targets.length; i++) {
        await new Promise(r => setTimeout(r, 400));
        generateInvoicePDF(targets[i]);
      }
      showToast(`${targets.length} invoice(s) downloaded!`);
      setSelected([]);
    } catch (e) {
      showToast("Some invoices failed", "error");
    } finally {
      setBulkGenerating(false);
    }
  };

  const toggleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    setSelected(prev => prev.length === orders.length ? [] : orders.map(o => o.id));
  };

  const FILTERS = [
    { key: "all", label: "All Orders" },
    { key: "PLACED", label: "New" },
    { key: "CONFIRMED", label: "Confirmed" },
    { key: "DELIVERED", label: "Delivered" },
    { key: "CANCELLED", label: "Cancelled" },
  ];

  const iStyle = {
    padding: "9px 14px", background: T.inputBg, border: `1px solid ${T.inputBorder}`,
    borderRadius: 8, color: T.text, fontSize: 13, outline: "none", fontFamily: SANS,
  };

  return (
    <div style={{ fontFamily: SANS, color: T.text }}>

      {/* ── Toast ── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: "fixed", top: 20, right: 20, zIndex: 9999,
              padding: "12px 20px", borderRadius: 10, fontFamily: SANS,
              fontSize: 13, fontWeight: 600,
              background: toast.type === "error" ? T.dangerBg : T.greenBg,
              border: `1px solid ${toast.type === "error" ? T.dangerBorder : T.greenBorder}`,
              color: toast.type === "error" ? T.danger : T.green,
              boxShadow: T.shadowMd,
            }}>
            {toast.type === "error" ? "✕ " : "✓ "}{toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Page Header ── */}
      <div style={{ marginBottom: 24, display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 700, color: T.text, marginBottom: 4 }}>
            GST Invoices
          </h1>
          <p style={{ fontSize: 14, color: T.muted }}>
            {totalElements} orders · Generate and download PDF invoices
          </p>
        </div>

        {/* Bulk download button */}
        <motion.button
          whileHover={{ opacity: 0.88 }}
          onClick={handleBulkGenerate}
          disabled={bulkGenerating}
          style={{
            padding: "11px 20px", background: theme === "dark" ? T.gold : T.maroon,
            color: theme === "dark" ? "#1A1A2E" : "#FFFFF0",
            border: "none", borderRadius: 9, cursor: bulkGenerating ? "wait" : "pointer",
            fontFamily: SANS, fontSize: 13, fontWeight: 700,
            display: "flex", alignItems: "center", gap: 8,
            opacity: bulkGenerating ? 0.65 : 1,
          }}>
          {bulkGenerating ? (
            <>
              <div style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "currentColor", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
              Generating…
            </>
          ) : (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              {selected.length > 0 ? `Download ${selected.length} Selected` : "Download All"}
            </>
          )}
        </motion.button>
      </div>

      {/* ── Stats row ── */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        {[
          { label: "Total Orders", value: totalElements, color: T.blue, bg: T.blueBg, border: T.blueBorder },
          { label: "Delivered", value: orders.filter(o => o.status === "DELIVERED").length, color: T.green, bg: T.greenBg, border: T.greenBorder },
          { label: "Pending Payment", value: orders.filter(o => o.paymentStatus === "PENDING_VERIFICATION").length, color: T.amber, bg: T.amberBg, border: T.amberBorder },
          { label: "This Page", value: orders.length, color: theme === "dark" ? T.gold : T.maroon, bg: theme === "dark" ? "rgba(212,175,55,0.08)" : "rgba(128,0,0,0.06)", border: T.borderHi },
        ].map((s, i) => (
          <div key={i} style={{ padding: "10px 16px", borderRadius: 9, background: s.bg, border: `1px solid ${s.border}`, minWidth: 110 }}>
            <div style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: T.muted, marginTop: 1 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Toolbar ── */}
      <div style={{ padding: "12px 14px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, boxShadow: T.shadow, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 16 }}>

        {/* Search */}
        <div style={{ position: "relative", flex: "0 0 260px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.muted} strokeWidth="2"
            style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            placeholder="Search by order no., customer…"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            style={{ ...iStyle, paddingLeft: 34, width: "100%" }}
            onFocus={e => e.target.style.borderColor = T.inputFocus}
            onBlur={e => e.target.style.borderColor = T.inputBorder}
          />
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {FILTERS.map(f => (
            <button key={f.key} onClick={() => { setFilter(f.key); setCurrentPage(0); }}
              style={{
                padding: "7px 13px", borderRadius: 7, cursor: "pointer",
                border: `1px solid ${filter === f.key ? T.borderHi : T.border}`,
                background: filter === f.key
                  ? (theme === "dark" ? "rgba(212,175,55,0.1)" : "rgba(128,0,0,0.07)")
                  : "transparent",
                color: filter === f.key ? (theme === "dark" ? T.gold : T.maroon) : T.muted,
                fontSize: 12, fontWeight: filter === f.key ? 700 : 400, fontFamily: SANS,
                transition: "all 0.15s",
              }}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Refresh */}
        <button
          onClick={() => fetchOrders(currentPage)}
          style={{ marginLeft: "auto", padding: "8px 12px", borderRadius: 7, cursor: "pointer", background: "transparent", border: `1px solid ${T.border}`, color: T.muted, display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontFamily: SANS }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
          </svg>
          Refresh
        </button>
      </div>

      {/* ── Table ── */}
      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, boxShadow: T.shadow, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${T.tableBorder}` }}>
              <th style={{ padding: "11px 14px", textAlign: "left" }}>
                <input type="checkbox"
                  checked={selected.length === orders.length && orders.length > 0}
                  onChange={toggleAll}
                  style={{ cursor: "pointer", accentColor: theme === "dark" ? T.gold : T.maroon }}
                />
              </th>
              {["Order No.", "Customer", "Date", "Items", "Amount", "Payment", "Pay Status", "Status", "Action"].map(h => (
                <th key={h} style={{ padding: "11px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.muted, background: theme === "dark" ? "rgba(255,255,255,0.02)" : T.cardAlt, whiteSpace: "nowrap" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(8)].map((_, i) => (
                <tr key={i}>
                  <td colSpan={10} style={{ padding: "14px 16px" }}>
                    <div style={{ height: 16, background: T.statBorder, borderRadius: 4, opacity: 1 - i * 0.08 }} />
                  </td>
                </tr>
              ))
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={10} style={{ padding: "60px 16px", textAlign: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={T.dim} strokeWidth="1.2">
                      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    <p style={{ color: T.muted, fontSize: 14 }}>No orders found</p>
                  </div>
                </td>
              </tr>
            ) : orders.map(order => (
              <tr key={order.id}
                style={{ borderBottom: `1px solid ${T.tableBorder}`, background: selected.includes(order.id) ? (theme === "dark" ? "rgba(212,175,55,0.04)" : "rgba(128,0,0,0.02)") : "transparent", transition: "background 0.12s" }}
                onMouseEnter={e => { if (!selected.includes(order.id)) e.currentTarget.style.background = T.tableRowHover; }}
                onMouseLeave={e => { e.currentTarget.style.background = selected.includes(order.id) ? (theme === "dark" ? "rgba(212,175,55,0.04)" : "rgba(128,0,0,0.02)") : "transparent"; }}
              >
                {/* Checkbox */}
                <td style={{ padding: "12px 14px" }}>
                  <input type="checkbox"
                    checked={selected.includes(order.id)}
                    onChange={() => toggleSelect(order.id)}
                    style={{ cursor: "pointer", accentColor: theme === "dark" ? T.gold : T.maroon }}
                  />
                </td>

                {/* Order number */}
                <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 700, color: theme === "dark" ? T.gold : T.maroon, whiteSpace: "nowrap" }}>
                  {order.orderNumber}
                </td>

                {/* Customer */}
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{order.customerName || order.deliveryName || "—"}</div>
                  <div style={{ fontSize: 11, color: T.muted }}>{order.deliveryPhone || "—"}</div>
                </td>

                {/* Date */}
                <td style={{ padding: "12px 14px", fontSize: 12, color: T.muted, whiteSpace: "nowrap" }}>
                  {order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                </td>

                {/* Items */}
                <td style={{ padding: "12px 14px", fontSize: 13, color: T.text }}>
                  {order.items?.length ?? 0} item{(order.items?.length ?? 0) !== 1 ? "s" : ""}
                </td>

                {/* Amount */}
                <td style={{ padding: "12px 14px", fontFamily: SERIF, fontSize: 14, fontWeight: 700, color: T.text, whiteSpace: "nowrap" }}>
                  ₹{fmt(order.grandTotal)}
                </td>

                {/* Payment method */}
                <td style={{ padding: "12px 14px" }}>
                  <span style={{ padding: "3px 9px", borderRadius: 6, fontSize: 11, fontWeight: 600, background: T.badgePill, border: `1px solid ${T.border}`, color: T.textSec }}>
                    {order.paymentMethod || "—"}
                  </span>
                </td>

                {/* Payment status */}
                <td style={{ padding: "12px 14px" }}>
                  <Badge label={order.paymentStatus || "—"} colors={PAY_COLORS[order.paymentStatus]} />
                </td>

                {/* Order status */}
                <td style={{ padding: "12px 14px" }}>
                  <Badge label={order.status || "—"} colors={STATUS_COLORS[order.status]} />
                </td>

                {/* Action */}
                <td style={{ padding: "12px 14px" }}>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleGenerate(order)}
                    disabled={generating === order.id}
                    style={{
                      padding: "7px 14px",
                      background: theme === "dark" ? "rgba(212,175,55,0.1)" : "rgba(128,0,0,0.07)",
                      border: `1px solid ${T.borderHi}`,
                      color: theme === "dark" ? T.gold : T.maroon,
                      cursor: generating === order.id ? "wait" : "pointer",
                      fontSize: 12, fontWeight: 700, borderRadius: 7,
                      fontFamily: SANS, display: "flex", alignItems: "center", gap: 6,
                      opacity: generating === order.id ? 0.6 : 1,
                      whiteSpace: "nowrap",
                    }}>
                    {generating === order.id ? (
                      <>
                        <div style={{ width: 11, height: 11, border: "2px solid currentColor", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                        Generating…
                      </>
                    ) : (
                      <>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                        </svg>
                        Download PDF
                      </>
                    )}
                  </motion.button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 16 }}>
          <button onClick={() => fetchOrders(currentPage - 1)} disabled={currentPage === 0}
            style={{ padding: "7px 14px", borderRadius: 7, background: "transparent", border: `1px solid ${T.border}`, color: currentPage === 0 ? T.dim : T.text, cursor: currentPage === 0 ? "not-allowed" : "pointer", fontSize: 13, fontFamily: SANS }}>
            ← Prev
          </button>
          <span style={{ fontSize: 13, color: T.muted }}>Page {currentPage + 1} of {totalPages}</span>
          <button onClick={() => fetchOrders(currentPage + 1)} disabled={currentPage === totalPages - 1}
            style={{ padding: "7px 14px", borderRadius: 7, background: "transparent", border: `1px solid ${T.border}`, color: currentPage === totalPages - 1 ? T.dim : T.text, cursor: currentPage === totalPages - 1 ? "not-allowed" : "pointer", fontSize: 13, fontFamily: SANS }}>
            Next →
          </button>
        </div>
      )}

      {/* Selection info bar */}
      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{
              position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
              padding: "12px 24px", borderRadius: 12,
              background: theme === "dark" ? "#1A1A2E" : "#fff",
              border: `1px solid ${T.borderHi}`,
              boxShadow: T.shadowMd,
              display: "flex", alignItems: "center", gap: 16,
              fontFamily: SANS, fontSize: 13,
            }}>
            <span style={{ color: T.text, fontWeight: 600 }}>
              {selected.length} order{selected.length !== 1 ? "s" : ""} selected
            </span>
            <button onClick={handleBulkGenerate} disabled={bulkGenerating}
              style={{ padding: "8px 16px", background: theme === "dark" ? T.gold : T.maroon, color: theme === "dark" ? "#1A1A2E" : "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: SANS }}>
              Download Selected
            </button>
            <button onClick={() => setSelected([])}
              style={{ padding: "8px 12px", background: "transparent", border: `1px solid ${T.border}`, color: T.muted, borderRadius: 8, cursor: "pointer", fontSize: 12, fontFamily: SANS }}>
              Clear
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}