

// import { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import ProductCard from "../components/ProductCard";
// import { productAPI, cartAPI, wishlistAPI } from "../api";

// export default function ProductDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const isLoggedIn = !!localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user") || "null");
//   const isCustomer = isLoggedIn && user?.role === "CUSTOMER";

//   const [product, setProduct] = useState(null);
//   const [related, setRelated] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [wishlisted, setWishlisted] = useState(false);
//   const [addingToCart, setAddingToCart] = useState(false);
//   const [cartAdded, setCartAdded] = useState(false);
//   const [cartError, setCartError] = useState("");

//   useEffect(() => {
//     fetchProduct();
//     window.scrollTo(0, 0);
//   }, [id]);

//   const fetchProduct = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const p = await productAPI.getProductById(id);
//       setProduct(p);

//       // Fetch related products — failure is non-critical
//       if (p.category?.id) {
//         productAPI.getProductsByCategory(p.category.id)
//           .then(rel => {
//             const list = rel?.content || rel || [];
//             setRelated(list.filter(r => r.id !== p.id).slice(0, 4));
//           })
//           .catch(() => {});
//       }

//       // Check wishlist — completely isolated, never affects product render
//       if (isCustomer) {
//         wishlistAPI.check(p.id)
//           .then(w => setWishlisted(w))
//           .catch(() => {});
//       }

//     } catch (e) {
//       console.error("Failed to load product:", e);
//       setError("Product not found or unavailable.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddToCart = async () => {
//     if (!isLoggedIn) { navigate("/login", { state: { from: `/product/${id}` } }); return; }
//     setAddingToCart(true);
//     setCartError("");
//     try {
//       await cartAPI.addToCart(product.id, quantity);
//       setCartAdded(true);
//       setTimeout(() => setCartAdded(false), 2500);
//     } catch (e) {
//       setCartError(e.response?.data?.message || "Could not add to cart");
//     } finally {
//       setAddingToCart(false);
//     }
//   };

//   const handleWishlist = async () => {
//     if (!isLoggedIn) { navigate("/login", { state: { from: `/product/${id}` } }); return; }
//     try {
//       const res = await wishlistAPI.toggle(product.id);
//       setWishlisted(res.wishlisted);
//     } catch (e) { console.error(e); }
//   };

//   const discount = product
//     ? (product.originalPrice && product.originalPrice > product.price
//         ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
//         : product.discountPercent || 0)
//     : 0;

//   // ── Loading ──
//   if (loading) return (
//     <div style={{ minHeight: "100vh", background: "#FFFFF0", fontFamily: "'Cormorant Garamond', serif" }}>
//       <Navbar />
//       <div style={{ paddingTop: 140, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
//         <div style={{ width: 36, height: 36, border: "2px solid #D4AF37", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
//         <p style={{ fontSize: 16, color: "#999" }}>Loading product...</p>
//       </div>
//       <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
//     </div>
//   );

//   // ── Error ──
//   if (error || !product) return (
//     <div style={{ minHeight: "100vh", background: "#FFFFF0", fontFamily: "'Cormorant Garamond', serif" }}>
//       <Navbar />
//       <div style={{ paddingTop: 140, textAlign: "center", padding: "140px 24px 60px" }}>
//         <div style={{ width: 60, height: 60, margin: "0 auto 20px", background: "#D4AF37", opacity: 0.15, clipPath: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)" }} />
//         <h2 style={{ fontSize: 28, fontWeight: 700, color: "#1A1A2E", marginBottom: 8 }}>Product Not Found</h2>
//         <p style={{ fontSize: 16, color: "#666", marginBottom: 28 }}>{error || "This product may have been removed."}</p>
//         <button onClick={() => navigate(-1)} style={{ marginRight: 12, padding: "12px 24px", background: "transparent", border: "1px solid rgba(26,26,46,0.2)", color: "#1A1A2E", cursor: "pointer", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "inherit" }}>Go Back</button>
//         <Link to="/products" style={{ padding: "12px 24px", background: "#800000", color: "#FFFFF0", textDecoration: "none", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase" }}>Browse All</Link>
//       </div>
//     </div>
//   );

//   // ── Product ──
//   return (
//     <div style={{ fontFamily: "'Cormorant Garamond', serif", background: "#FFFFF0", minHeight: "100vh" }}>
//       <Navbar />
//       <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px 60px" }}>

//         {/* Breadcrumb */}
//         <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36, fontSize: 13, color: "#999", flexWrap: "wrap" }}>
//           <Link to="/" style={{ color: "#666", textDecoration: "none" }} onMouseEnter={e => e.target.style.color = "#800000"} onMouseLeave={e => e.target.style.color = "#666"}>Home</Link>
//           <span>/</span>
//           {product.category && (
//             <>
//               <Link to={`/products`} style={{ color: "#666", textDecoration: "none" }} onMouseEnter={e => e.target.style.color = "#800000"} onMouseLeave={e => e.target.style.color = "#666"}>{product.category.name}</Link>
//               <span>/</span>
//             </>
//           )}
//           <span style={{ color: "#1A1A2E" }}>{product.name}</span>
//         </div>

//         {/* Main grid */}
//         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, marginBottom: 80, alignItems: "start" }}>

//           {/* Image */}
//           <div>
//             <div style={{ aspectRatio: "3/4", overflow: "hidden", background: "#f5f0e8", position: "relative" }}>
//               {product.imageUrl
//                 ? <img src={product.imageUrl} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//                 : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#1A1A2E,#2d2d4e)" }}>
//                     <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
//                   </div>
//               }
//               {discount > 0 && (
//                 <div style={{ position: "absolute", top: 16, left: 16, background: "#800000", color: "#FFFFF0", fontSize: 13, padding: "4px 12px", fontWeight: 600 }}>
//                   {discount}% OFF
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Details */}
//           <div>
//             <p style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 10 }}>{product.category?.name}</p>
//             <h1 style={{ fontSize: 36, fontWeight: 700, color: "#1A1A2E", lineHeight: 1.2, marginBottom: 18 }}>{product.name}</h1>

//             {/* Price */}
//             <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 22 }}>
//               <span style={{ fontSize: 32, fontWeight: 700, color: "#1A1A2E" }}>₹{Number(product.price).toLocaleString("en-IN")}</span>
//               {product.originalPrice && product.originalPrice > product.price && (
//                 <>
//                   <span style={{ fontSize: 18, color: "#aaa", textDecoration: "line-through" }}>₹{Number(product.originalPrice).toLocaleString("en-IN")}</span>
//                   <span style={{ fontSize: 14, color: "#2ECC71", fontWeight: 600 }}>{discount}% off</span>
//                 </>
//               )}
//             </div>

//             <div style={{ width: 40, height: 1, background: "#D4AF37", marginBottom: 22 }} />

//             {/* Stock */}
//             <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22 }}>
//               <div style={{ width: 8, height: 8, borderRadius: "50%", background: product.stockQuantity > 0 ? "#2ECC71" : "#E74C3C", flexShrink: 0 }} />
//               <span style={{ fontSize: 15, color: product.stockQuantity > 0 ? "#2ECC71" : "#E74C3C" }}>
//                 {product.stockQuantity > 0 ? `In Stock (${product.stockQuantity} available)` : "Out of Stock"}
//               </span>
//             </div>

//             {/* Description */}
//             {product.description && (
//               <p style={{ fontSize: 16, color: "#36454F", lineHeight: 1.75, marginBottom: 28 }}>{product.description}</p>
//             )}

//             {/* Quantity selector */}
//             {product.stockQuantity > 0 && (
//               <div style={{ marginBottom: 26 }}>
//                 <p style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#888", marginBottom: 10 }}>Quantity</p>
//                 <div style={{ display: "inline-flex", alignItems: "center", border: "1px solid rgba(26,26,46,0.2)" }}>
//                   <button onClick={() => setQuantity(q => Math.max(1, q - 1))}
//                     style={{ width: 42, height: 42, background: "transparent", border: "none", cursor: "pointer", fontSize: 20, color: "#1A1A2E", lineHeight: 1 }}>−</button>
//                   <span style={{ width: 50, textAlign: "center", fontSize: 16, color: "#1A1A2E", borderLeft: "1px solid rgba(26,26,46,0.15)", borderRight: "1px solid rgba(26,26,46,0.15)", padding: "10px 0", display: "block" }}>{quantity}</span>
//                   <button onClick={() => setQuantity(q => Math.min(product.stockQuantity, q + 1))}
//                     style={{ width: 42, height: 42, background: "transparent", border: "none", cursor: product.quantity >= product.stockQuantity ? "not-allowed" : "pointer", fontSize: 20, color: "#1A1A2E", lineHeight: 1 }}>+</button>
//                 </div>
//               </div>
//             )}

//             {/* Cart error */}
//             {cartError && <p style={{ fontSize: 13, color: "#E74C3C", marginBottom: 12 }}>{cartError}</p>}

//             {/* CTAs */}
//             <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
//               <button onClick={handleAddToCart} disabled={addingToCart || product.stockQuantity === 0}
//                 style={{
//                   flex: 1, padding: "16px", border: "none", cursor: product.stockQuantity === 0 ? "not-allowed" : "pointer",
//                   background: cartAdded ? "#2ECC71" : "#800000", color: "#FFFFF0",
//                   fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "inherit",
//                   transition: "background 0.3s", opacity: product.stockQuantity === 0 ? 0.6 : 1
//                 }}>
//                 {product.stockQuantity === 0 ? "Out of Stock" : cartAdded ? "✓ Added to Cart!" : addingToCart ? "Adding..." : "Add to Cart"}
//               </button>

//               <button onClick={handleWishlist}
//                 style={{ width: 54, border: "1px solid rgba(26,26,46,0.2)", background: wishlisted ? "rgba(128,0,0,0.06)" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlisted ? "#800000" : "none"} stroke={wishlisted ? "#800000" : "#1A1A2E"} strokeWidth="1.5">
//                   <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
//                 </svg>
//               </button>
//             </div>

//             {/* Trust badges */}
//             <div style={{ display: "flex", gap: 24, paddingTop: 20, borderTop: "1px solid rgba(26,26,46,0.08)", flexWrap: "wrap" }}>
//               {[
//                 { icon: "M5 13l4 4L19 7", label: "Authentic Silk" },
//                 { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", label: "Premium Quality" },
//                 { icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", label: "Easy Returns" },
//               ].map((b, i) => (
//                 <div key={i} style={{ display: "flex", alignItems: "center", gap: 7 }}>
//                   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8"><path d={b.icon}/></svg>
//                   <span style={{ fontSize: 12, color: "#888" }}>{b.label}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Related products */}
//         {related.length > 0 && (
//           <div>
//             <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
//               <h2 style={{ fontSize: 28, fontWeight: 700, color: "#1A1A2E", flexShrink: 0 }}>You May Also Like</h2>
//               <div style={{ flex: 1, height: 1, background: "rgba(26,26,46,0.1)" }} />
//             </div>
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
//               {related.map(p => <ProductCard key={p.id} product={p} />)}
//             </div>
//           </div>
//         )}
//       </div>

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap');
//         * { box-sizing: border-box; margin: 0; }
//         @keyframes spin { to { transform: rotate(360deg); } }
//       `}</style>
//     </div>
//   );
// }




import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { productAPI, cartAPI, wishlistAPI } from "../api";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isCustomer = isLoggedIn && user?.role === "CUSTOMER";

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);
  const [cartError, setCartError] = useState("");

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const p = await productAPI.getProductById(id);
      setProduct(p);

      // Fetch related products — failure is non-critical
      if (p.category?.id) {
        productAPI.getProductsByCategory(p.category.id)
          .then(rel => {
            const list = rel?.content || rel || [];
            setRelated(list.filter(r => r.id !== p.id).slice(0, 4));
          })
          .catch(() => {});
      }

      // Check wishlist — completely isolated, never affects product render
      if (isCustomer) {
        wishlistAPI.check(p.id)
          .then(w => setWishlisted(w))
          .catch(() => {});
      }

    } catch (e) {
      console.error("Failed to load product:", e);
      setError("Product not found or unavailable.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn) { navigate("/login", { state: { from: `/product/${id}` } }); return; }
    setAddingToCart(true);
    setCartError("");
    try {
      await cartAPI.addToCart(product.id, quantity);
      setCartAdded(true);
      setTimeout(() => setCartAdded(false), 2500);
    } catch (e) {
      setCartError(e.response?.data?.message || "Could not add to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  const handleWishlist = async () => {
    if (!isLoggedIn) { navigate("/login", { state: { from: `/product/${id}` } }); return; }
    try {
      const res = await wishlistAPI.toggle(product.id);
      setWishlisted(res.wishlisted);
    } catch (e) { console.error(e); }
  };

  const discount = product
    ? (product.originalPrice && product.originalPrice > product.price
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : product.discountPercent || 0)
    : 0;

  // ── Loading ──
  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#FFFFF0", fontFamily: "'Cormorant Garamond', serif" }}>
      <Navbar />
      <div style={{ paddingTop: 140, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div style={{ width: 36, height: 36, border: "2px solid #D4AF37", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <p style={{ fontSize: 16, color: "#999" }}>Loading product...</p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  // ── Error ──
  if (error || !product) return (
    <div style={{ minHeight: "100vh", background: "#FFFFF0", fontFamily: "'Cormorant Garamond', serif" }}>
      <Navbar />
      <div style={{ paddingTop: 140, textAlign: "center", padding: "140px 24px 60px" }}>
        <div style={{ width: 60, height: 60, margin: "0 auto 20px", background: "#D4AF37", opacity: 0.15, clipPath: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)" }} />
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#1A1A2E", marginBottom: 8 }}>Product Not Found</h2>
        <p style={{ fontSize: 16, color: "#666", marginBottom: 28 }}>{error || "This product may have been removed."}</p>
        <button onClick={() => navigate(-1)} style={{ marginRight: 12, padding: "12px 24px", background: "transparent", border: "1px solid rgba(26,26,46,0.2)", color: "#1A1A2E", cursor: "pointer", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "inherit" }}>Go Back</button>
        <Link to="/products" style={{ padding: "12px 24px", background: "#800000", color: "#FFFFF0", textDecoration: "none", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase" }}>Browse All</Link>
      </div>
    </div>
  );

  // ── Product ──
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#FFFFF0", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px 60px" }}>

        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36, fontSize: 14, color: "#6b7280", flexWrap: "wrap" }}>
          <Link to="/" style={{ color: "#666", textDecoration: "none" }} onMouseEnter={e => e.target.style.color = "#800000"} onMouseLeave={e => e.target.style.color = "#666"}>Home</Link>
          <span>/</span>
          {product.category && (
            <>
              <Link to={`/products`} style={{ color: "#666", textDecoration: "none" }} onMouseEnter={e => e.target.style.color = "#800000"} onMouseLeave={e => e.target.style.color = "#666"}>{product.category.name}</Link>
              <span>/</span>
            </>
          )}
          <span style={{ color: "#1A1A2E" }}>{product.name}</span>
        </div>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, marginBottom: 80, alignItems: "start" }}>

          {/* Image */}
          <div>
            <div style={{ aspectRatio: "3/4", overflow: "hidden", background: "#f5f0e8", position: "relative" }}>
              {product.imageUrl
                ? <img src={product.imageUrl} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#1A1A2E,#2d2d4e)" }}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  </div>
              }
              {discount > 0 && (
                <div style={{ position: "absolute", top: 16, left: 16, background: "#800000", color: "#FFFFF0", fontSize: 13, padding: "4px 12px", fontWeight: 600 }}>
                  {discount}% OFF
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div>
            <p style={{ fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 10 }}>{product.category?.name}</p>
            <h1 style={{ fontSize: 36, fontWeight: 700, color: "#1A1A2E", lineHeight: 1.2, marginBottom: 18 }}>{product.name}</h1>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 22 }}>
              <span style={{ fontSize: 32, fontWeight: 700, color: "#1A1A2E" }}>₹{Number(product.price).toLocaleString("en-IN")}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span style={{ fontSize: 18, color: "#aaa", textDecoration: "line-through" }}>₹{Number(product.originalPrice).toLocaleString("en-IN")}</span>
                  <span style={{ fontSize: 14, color: "#2ECC71", fontWeight: 600 }}>{discount}% off</span>
                </>
              )}
            </div>

            <div style={{ width: 40, height: 1, background: "#D4AF37", marginBottom: 22 }} />

            {/* Stock */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: product.stockQuantity > 0 ? "#2ECC71" : "#E74C3C", flexShrink: 0 }} />
              <span style={{ fontSize: 15, color: product.stockQuantity > 0 ? "#2ECC71" : "#E74C3C" }}>
                {product.stockQuantity > 0 ? `In Stock (${product.stockQuantity} available)` : "Out of Stock"}
              </span>
            </div>

            {/* Description */}
            {product.description && (
              <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, marginBottom: 28 }}>{product.description}</p>
            )}

            {/* Quantity selector */}
            {product.stockQuantity > 0 && (
              <div style={{ marginBottom: 26 }}>
                <p style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#888", marginBottom: 10 }}>Quantity</p>
                <div style={{ display: "inline-flex", alignItems: "center", border: "1px solid rgba(26,26,46,0.2)" }}>
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    style={{ width: 42, height: 42, background: "transparent", border: "none", cursor: "pointer", fontSize: 20, color: "#1A1A2E", lineHeight: 1 }}>−</button>
                  <span style={{ width: 50, textAlign: "center", fontSize: 16, color: "#1A1A2E", borderLeft: "1px solid rgba(26,26,46,0.15)", borderRight: "1px solid rgba(26,26,46,0.15)", padding: "10px 0", display: "block" }}>{quantity}</span>
                  <button onClick={() => setQuantity(q => Math.min(product.stockQuantity, q + 1))}
                    style={{ width: 42, height: 42, background: "transparent", border: "none", cursor: product.quantity >= product.stockQuantity ? "not-allowed" : "pointer", fontSize: 20, color: "#1A1A2E", lineHeight: 1 }}>+</button>
                </div>
              </div>
            )}

            {/* Cart error */}
            {cartError && <p style={{ fontSize: 13, color: "#E74C3C", marginBottom: 12 }}>{cartError}</p>}

            {/* CTAs */}
            <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
              <button onClick={handleAddToCart} disabled={addingToCart || product.stockQuantity === 0}
                style={{
                  flex: 1, padding: "16px", border: "none", cursor: product.stockQuantity === 0 ? "not-allowed" : "pointer",
                  background: cartAdded ? "#2ECC71" : "#800000", color: "#FFFFF0",
                  fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "inherit",
                  transition: "background 0.3s", opacity: product.stockQuantity === 0 ? 0.6 : 1
                }}>
                {product.stockQuantity === 0 ? "Out of Stock" : cartAdded ? "✓ Added to Cart!" : addingToCart ? "Adding..." : "Add to Cart"}
              </button>

              <button onClick={handleWishlist}
                style={{ width: 54, border: "1px solid rgba(26,26,46,0.2)", background: wishlisted ? "rgba(128,0,0,0.06)" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlisted ? "#800000" : "none"} stroke={wishlisted ? "#800000" : "#1A1A2E"} strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>

            {/* Trust badges */}
            <div style={{ display: "flex", gap: 24, paddingTop: 20, borderTop: "1px solid rgba(26,26,46,0.08)", flexWrap: "wrap" }}>
              {[
                { icon: "M5 13l4 4L19 7", label: "Authentic Silk" },
                { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", label: "Premium Quality" },
                { icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", label: "Easy Returns" },
              ].map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8"><path d={b.icon}/></svg>
                  <span style={{ fontSize: 13, color: "#6b7280" }}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: "#1A1A2E", flexShrink: 0 }}>You May Also Like</h2>
              <div style={{ flex: 1, height: 1, background: "rgba(26,26,46,0.1)" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; }
        @keyframes spin { to { transform: rotate(360deg); } } body, * { font-family: 'Inter', system-ui, sans-serif !important; } h1, h2, .serif { font-family: 'Cormorant Garamond', serif !important; }
      `}</style>
    </div>
  );
}