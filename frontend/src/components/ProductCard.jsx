// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { cartAPI } from "../api/cart.api";
// import { wishlistAPI } from "../api/wishlist.api";

// export default function ProductCard({ product, wishlisted: initialWishlisted = false, onWishlistChange }) {
//   const [wishlisted, setWishlisted] = useState(initialWishlisted);
//   const [addingToCart, setAddingToCart] = useState(false);
//   const [cartAdded, setCartAdded] = useState(false);
//   const navigate = useNavigate();
//   const isLoggedIn = !!localStorage.getItem("token");

//   const handleWishlist = async (e) => {
//     e.stopPropagation();
//     if (!isLoggedIn) { navigate("/login", { state: { from: window.location.pathname } }); return; }
//     try {
//       const res = await wishlistAPI.toggle(product.id);
//       setWishlisted(res.wishlisted);
//       onWishlistChange?.(product.id, res.wishlisted);
//     } catch (err) { console.error(err); }
//   };

//   const handleAddToCart = async (e) => {
//     e.stopPropagation();
//     if (!isLoggedIn) { navigate("/login", { state: { from: window.location.pathname } }); return; }
//     if (product.stockQuantity === 0) return;
//     setAddingToCart(true);
//     try {
//       await cartAPI.addToCart(product.id, 1);
//       setCartAdded(true);
//       setTimeout(() => setCartAdded(false), 2000);
//     } catch (err) { console.error(err); }
//     finally { setAddingToCart(false); }
//   };

//   const discount = product.originalPrice && product.originalPrice > product.price
//     ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
//     : product.discountPercent || 0;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 16 }}
//       animate={{ opacity: 1, y: 0 }}
//       whileHover={{ y: -4 }}
//       transition={{ duration: 0.3 }}
//       onClick={() => navigate(`/product/${product.id}`)}
//       className="prod-card-outer"
//       style={{ cursor: "pointer", fontFamily: "'Cormorant Garamond', serif", position: "relative" }}
//     >
//       {/* Image */}
//       <div style={{ position: "relative", overflow: "hidden", background: "#f5f0e8", aspectRatio: "3/4" }}>
//         {product.imageUrl
//           ? <img src={product.imageUrl} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} className="prod-card-img" />
//           : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#1A1A2E,#2d2d4e)" }}>
//               <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
//             </div>
//         }

//         {/* Badges */}
//         <div style={{ position: "absolute", top: 10, left: 10, display: "flex", flexDirection: "column", gap: 4 }}>
//           {discount > 0 && <span style={{ background: "#800000", color: "#FFFFF0", fontSize: 10, padding: "3px 7px", letterSpacing: "0.08em" }}>{discount}% OFF</span>}
//           {product.stockQuantity === 0 && <span style={{ background: "rgba(0,0,0,0.8)", color: "#fff", fontSize: 10, padding: "3px 7px", letterSpacing: "0.08em" }}>OUT OF STOCK</span>}
//           {product.isFeatured && <span style={{ background: "rgba(212,175,55,0.9)", color: "#1A1A2E", fontSize: 10, padding: "3px 7px", letterSpacing: "0.08em", fontWeight: 700 }}>FEATURED</span>}
//         </div>

//         {/* Wishlist button */}
//         <button onClick={handleWishlist} style={{ position: "absolute", top: 10, right: 10, width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
//           <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? "#800000" : "none"} stroke={wishlisted ? "#800000" : "#666"} strokeWidth="2">
//             <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
//           </svg>
//         </button>

//         {/* Add to cart overlay */}
//         <div className="prod-cart-overlay" style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px", background: "rgba(26,26,46,0.9)", transform: "translateY(100%)", transition: "transform 0.3s ease" }}>
//           <button onClick={handleAddToCart} disabled={addingToCart || product.stockQuantity === 0}
//             style={{ width: "100%", padding: "10px", background: cartAdded ? "#2ECC71" : "#800000", color: "#FFFFF0", border: "none", cursor: product.stockQuantity === 0 ? "not-allowed" : "pointer", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "inherit", transition: "background 0.3s" }}>
//             {product.stockQuantity === 0 ? "Out of Stock" : cartAdded ? "✓ Added!" : addingToCart ? "Adding..." : "Add to Cart"}
//           </button>
//         </div>
//       </div>

//       {/* Info */}
//       <div style={{ padding: "12px 4px 4px" }}>
//         <p style={{ fontSize: 10, color: "#D4AF37", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>{product.category?.name || ""}</p>
//         <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1A1A2E", marginBottom: 8, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{product.name}</h3>
//         <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//           <span style={{ fontSize: 16, fontWeight: 700, color: "#1A1A2E" }}>₹{product.price?.toLocaleString("en-IN")}</span>
//           {product.originalPrice && product.originalPrice > product.price && (
//             <span style={{ fontSize: 13, color: "#999", textDecoration: "line-through" }}>₹{product.originalPrice?.toLocaleString("en-IN")}</span>
//           )}
//         </div>
//       </div>

//       <style>{`
//         .prod-card-outer:hover .prod-card-img { transform: scale(1.06); }
//         .prod-card-outer:hover .prod-cart-overlay { transform: translateY(0) !important; }
//       `}</style>
//     </motion.div>
//   );
// }



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cartAPI, wishlistAPI } from "../api";

const F = "'Inter', system-ui, -apple-system, sans-serif";

export default function ProductCard({ product, wishlisted: initialWishlisted = false, onWishlistChange }) {
  const [wishlisted, setWishlisted] = useState(initialWishlisted);
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isCustomer = isLoggedIn && user?.role === "CUSTOMER";

  const handleWishlist = async (e) => {
    e.stopPropagation();
    if (!isLoggedIn) { navigate("/login", { state: { from: window.location.pathname } }); return; }
    if (!isCustomer) return;
    try {
      const res = await wishlistAPI.toggle(product.id);
      setWishlisted(res.wishlisted);
      onWishlistChange?.(product.id, res.wishlisted);
    } catch (err) { console.error(err); }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!isLoggedIn) { navigate("/login", { state: { from: window.location.pathname } }); return; }
    if (!isCustomer) return;
    if (product.stockQuantity === 0) return;
    setAddingToCart(true);
    try {
      await cartAPI.addToCart(product.id, 1);
      setCartAdded(true);
      setTimeout(() => setCartAdded(false), 2200);
    } catch (err) { console.error(err); }
    finally { setAddingToCart(false); }
  };

  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product.discountPercent || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.12)" }}
      transition={{ duration: 0.25 }}
      onClick={() => navigate(`/product/${product.id}`)}
      className="pcard"
      style={{
        cursor: "pointer", fontFamily: F, position: "relative",
        background: "white", borderRadius: 10, overflow: "hidden",
        border: "1px solid #f3f4f6", boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.25s",
      }}
    >
      {/* ── Image ── */}
      <div style={{ position: "relative", overflow: "hidden", background: "#f9f5f0", aspectRatio: "3/4" }}>
        {product.imageUrl
          ? <img src={product.imageUrl} alt={product.name} className="pcard-img"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.45s ease" }} />
          : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#1A1A2E,#2d2d4e)" }}>
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
        }

        {/* Badges top-left */}
        <div style={{ position: "absolute", top: 10, left: 10, display: "flex", flexDirection: "column", gap: 5 }}>
          {discount > 0 &&
            <span style={{ background: "#800000", color: "white", fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 4, fontFamily: F, letterSpacing: "0.04em" }}>{discount}% OFF</span>}
          {product.stockQuantity === 0 &&
            <span style={{ background: "rgba(0,0,0,0.72)", color: "white", fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 4, fontFamily: F }}>SOLD OUT</span>}
          {product.isFeatured && discount === 0 &&
            <span style={{ background: "#b45309", color: "white", fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 4, fontFamily: F }}>★ FEATURED</span>}
        </div>

        {/* Wishlist btn top-right */}
        <button onClick={handleWishlist}
          style={{ position: "absolute", top: 10, right: 10, width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.95)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.12)", transition: "transform 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.15)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill={wishlisted ? "#800000" : "none"} stroke={wishlisted ? "#800000" : "#6b7280"} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {/* Add to cart hover bar */}
        <div className="pcard-atc"
          style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "10px 12px", background: "rgba(17,17,17,0.88)", transform: "translateY(100%)", transition: "transform 0.28s ease" }}>
          <button onClick={handleAddToCart} disabled={addingToCart || product.stockQuantity === 0}
            style={{
              width: "100%", padding: "11px", fontFamily: F, fontSize: 13, fontWeight: 700,
              letterSpacing: "0.06em", textTransform: "uppercase", border: "none", borderRadius: 5, cursor: "pointer",
              background: cartAdded ? "#16a34a" : "#800000", color: "white", transition: "background 0.25s",
              opacity: product.stockQuantity === 0 ? 0.6 : 1,
            }}>
            {product.stockQuantity === 0 ? "Out of Stock" : cartAdded ? "✓ Added!" : addingToCart ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* ── Info ── */}
      <div style={{ padding: "13px 14px 15px" }}>
        <p style={{ fontSize: 11, color: "#800000", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 5, fontFamily: F }}>
          {product.category?.name || ""}
        </p>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: "#111827", marginBottom: 9, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", lineHeight: 1.35, fontFamily: F }}>
          {product.name}
        </h3>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 17, fontWeight: 800, color: "#111827", fontFamily: F }}>
            ₹{Number(product.price).toLocaleString("en-IN")}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span style={{ fontSize: 13, color: "#9ca3af", textDecoration: "line-through", fontFamily: F }}>
              ₹{Number(product.originalPrice).toLocaleString("en-IN")}
            </span>
          )}
          {discount > 0 &&
            <span style={{ fontSize: 12, color: "#16a34a", fontWeight: 700, fontFamily: F }}>{discount}% off</span>}
        </div>
        {product.stockQuantity > 0 && product.stockQuantity <= 5 && (
          <p style={{ fontSize: 12, color: "#ef4444", fontWeight: 600, marginTop: 6, fontFamily: F }}>Only {product.stockQuantity} left!</p>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .pcard:hover .pcard-img  { transform: scale(1.06) !important; }
        .pcard:hover .pcard-atc  { transform: translateY(0) !important; }
      `}</style>
    </motion.div>
  );
}