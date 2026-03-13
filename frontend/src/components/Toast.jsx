/**
 * Toast.jsx — Global toast notification system for Sri Aboorva Silks
 *
 * USAGE:
 *   1. Wrap your app in <ToastProvider> inside App.jsx (outside BrowserRouter or inside)
 *   2. In any component: const { toast } = useToast();
 *   3. Call:
 *      toast.success("Added to cart!")
 *      toast.error("Something went wrong")
 *      toast.info("Order placed successfully")
 *      toast.warning("Only 2 items left!")
 *      toast("Custom message", { type:"success", duration:3000 })
 */

import { createContext, useContext, useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ─── Context ────────────────────────────────────────────────────────────────*/
const ToastCtx = createContext(null);
export const useToast = () => useContext(ToastCtx);

/* ─── Icons ──────────────────────────────────────────────────────────────────*/
const Icons = {
  success: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  ),
  error: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  ),
  info: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  cart: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  ),
  wishlist: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  order: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  ),
};

/* ─── Config per type ────────────────────────────────────────────────────────*/
const CONFIG = {
  success: {
    accent:  "#34D399",
    bg:      "rgba(6,20,14,0.97)",
    border:  "rgba(52,211,153,0.35)",
    iconBg:  "rgba(52,211,153,0.15)",
    bar:     "#34D399",
  },
  error: {
    accent:  "#F87171",
    bg:      "rgba(20,6,6,0.97)",
    border:  "rgba(248,113,113,0.35)",
    iconBg:  "rgba(248,113,113,0.15)",
    bar:     "#F87171",
  },
  info: {
    accent:  "#D4AF37",
    bg:      "rgba(15,12,4,0.97)",
    border:  "rgba(212,175,55,0.35)",
    iconBg:  "rgba(212,175,55,0.15)",
    bar:     "#D4AF37",
  },
  warning: {
    accent:  "#FBBF24",
    bg:      "rgba(18,14,4,0.97)",
    border:  "rgba(251,191,36,0.35)",
    iconBg:  "rgba(251,191,36,0.15)",
    bar:     "#FBBF24",
  },
  cart: {
    accent:  "#D4AF37",
    bg:      "rgba(15,12,4,0.97)",
    border:  "rgba(212,175,55,0.35)",
    iconBg:  "rgba(212,175,55,0.15)",
    bar:     "#D4AF37",
  },
  wishlist: {
    accent:  "#F87171",
    bg:      "rgba(20,6,6,0.97)",
    border:  "rgba(248,113,113,0.3)",
    iconBg:  "rgba(248,113,113,0.15)",
    bar:     "#F87171",
  },
  order: {
    accent:  "#34D399",
    bg:      "rgba(6,20,14,0.97)",
    border:  "rgba(52,211,153,0.35)",
    iconBg:  "rgba(52,211,153,0.15)",
    bar:     "#34D399",
  },
};

/* ─── Single Toast item ──────────────────────────────────────────────────────*/
function ToastItem({ id, message, type = "info", duration = 3500, onRemove, image }) {
  const cfg = CONFIG[type] || CONFIG.info;
  const icon = Icons[type] || Icons.info;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -16, scale: 0.92 }}
      animate={{ opacity: 1, y: 0,   scale: 1    }}
      exit={{    opacity: 0, x: 80,  scale: 0.92 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      style={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "13px 14px",
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        borderRadius: 12,
        boxShadow: `0 8px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)`,
        width: 330,
        minWidth: 280,
        cursor: "pointer",
        backdropFilter: "blur(20px)",
      }}
      onClick={() => onRemove(id)}
    >
      {/* Progress bar */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: duration / 1000, ease: "linear" }}
        style={{
          position: "absolute",
          bottom: 0, left: 0,
          height: 2.5,
          width: "100%",
          background: cfg.bar,
          transformOrigin: "left center",
          borderRadius: "0 0 2px 2px",
        }}
      />

      {/* Left accent line */}
      <div style={{
        position: "absolute",
        left: 0, top: 0, bottom: 0,
        width: 3,
        background: cfg.accent,
        borderRadius: "12px 0 0 12px",
      }}/>

      {/* Product image (optional) */}
      {image && (
        <img
          src={image}
          alt=""
          style={{
            width: 40, height: 48,
            objectFit: "cover",
            borderRadius: 6,
            flexShrink: 0,
            border: `1px solid rgba(255,255,255,0.07)`,
          }}
        />
      )}

      {/* Icon */}
      {!image && (
        <div style={{
          width: 32, height: 32,
          borderRadius: 8,
          background: cfg.iconBg,
          color: cfg.accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginLeft: 8,
        }}>
          {icon}
        </div>
      )}

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0, marginLeft: image ? 0 : 0 }}>
        {typeof message === "string" ? (
          <p style={{
            margin: 0,
            fontSize: 13.5,
            fontWeight: 500,
            color: "#F0EEE8",
            lineHeight: 1.45,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            {message}
          </p>
        ) : (
          message
        )}
      </div>

      {/* Close × */}
      <button
        onClick={e => { e.stopPropagation(); onRemove(id); }}
        style={{
          width: 20, height: 20,
          background: "rgba(255,255,255,0.07)",
          border: "none",
          borderRadius: 5,
          color: "rgba(255,255,255,0.4)",
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          fontSize: 14,
          lineHeight: 1,
          padding: 0,
          transition: "background 0.15s",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.14)"}
        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}
      >
        ×
      </button>
    </motion.div>
  );
}

/* ─── Provider ───────────────────────────────────────────────────────────────*/
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const counterRef = useRef(0);

  const remove = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const add = useCallback((message, options = {}) => {
    const id = ++counterRef.current;
    const duration = options.duration ?? 3500;

    setToasts(prev => {
      // Max 5 toasts at once
      const next = prev.length >= 5 ? prev.slice(1) : prev;
      return [...next, { id, message, duration, ...options }];
    });

    // Auto-remove
    setTimeout(() => remove(id), duration + 400);
    return id;
  }, [remove]);

  // Convenience helpers
  const toast = useCallback((msg, opts) => add(msg, opts), [add]);
  toast.success  = (msg, opts) => add(msg, { type: "success",  ...opts });
  toast.error    = (msg, opts) => add(msg, { type: "error",    ...opts });
  toast.info     = (msg, opts) => add(msg, { type: "info",     ...opts });
  toast.warning  = (msg, opts) => add(msg, { type: "warning",  ...opts });
  toast.cart     = (msg, opts) => add(msg, { type: "cart",     ...opts });
  toast.wishlist = (msg, opts) => add(msg, { type: "wishlist", ...opts });
  toast.order    = (msg, opts) => add(msg, { type: "order",    ...opts });

  return (
    <ToastCtx.Provider value={{ toast, remove }}>
      {children}

      {/* Portal — top-right stack */}
      <div style={{
        position: "fixed",
        top: 88,
        right: 20,
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        pointerEvents: "none",
      }}>
        <AnimatePresence mode="popLayout">
          {toasts.map(t => (
            <div key={t.id} style={{ pointerEvents: "auto" }}>
              <ToastItem {...t} onRemove={remove} />
            </div>
          ))}
        </AnimatePresence>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');
      `}</style>
    </ToastCtx.Provider>
  );
}