// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import Navbar from "../components/Navbar";
// import { wishlistAPI } from "../api/wishlist.api";
// import { cartAPI } from "../api/cart.api";

// export default function WishlistPage() {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionId, setActionId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => { fetchWishlist(); }, []);

//   const fetchWishlist = async () => {
//     try { setItems(await wishlistAPI.getWishlist()); }
//     catch (e) { console.error(e); }
//     finally { setLoading(false); }
//   };

//   const handleRemove = async (productId) => {
//     setActionId(productId);
//     try { await wishlistAPI.remove(productId); setItems(prev => prev.filter(p => p.id !== productId)); }
//     catch (e) { console.error(e); }
//     finally { setActionId(null); }
//   };

//   const handleMoveToCart = async (product) => {
//     setActionId(product.id);
//     try {
//       await cartAPI.addToCart(product.id, 1);
//       await wishlistAPI.remove(product.id);
//       setItems(prev => prev.filter(p => p.id !== product.id));
//     } catch (e) { alert(e.response?.data?.message || "Could not add to cart"); }
//     finally { setActionId(null); }
//   };

//   const discount = (p) => p.originalPrice && p.originalPrice > p.price
//     ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : (p.discountPercent || 0);

//   return (
//     <div style={{ fontFamily: "'Cormorant Garamond', serif", background: "#FFFFF0", minHeight: "100vh" }}>
//       <Navbar />
//       <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px 60px" }}>

//         {/* Header */}
//         <div style={{ marginBottom: 36 }}>
//           <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 6 }}>My Account</p>
//           <h1 style={{ fontSize: 36, fontWeight: 700, color: "#1A1A2E" }}>Wishlist</h1>
//           {items.length > 0 && <p style={{ fontSize: 15, color: "#666", marginTop: 4 }}>{items.length} saved item{items.length !== 1 ? "s" : ""}</p>}
//         </div>

//         {loading ? (
//           <div style={{ textAlign: "center", padding: 80 }}>
//             <div style={{ width: 36, height: 36, margin: "0 auto", border: "2px solid #D4AF37", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
//           </div>
//         ) : items.length === 0 ? (
//           <div style={{ textAlign: "center", padding: "80px 20px", border: "1px dashed rgba(26,26,46,0.15)" }}>
//             <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="rgba(26,26,46,0.2)" strokeWidth="1" style={{ display: "block", margin: "0 auto 16px" }}>
//               <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
//             </svg>
//             <p style={{ fontSize: 22, color: "#666", marginBottom: 8 }}>Your wishlist is empty</p>
//             <p style={{ fontSize: 15, color: "#999", marginBottom: 28 }}>Save items you love to buy them later</p>
//             <Link to="/products" style={{ padding: "13px 32px", background: "#800000", color: "#FFFFF0", textDecoration: "none", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase" }}>
//               Explore Collection
//             </Link>
//           </div>
//         ) : (
//           <>
//             {/* Move all to cart button */}
//             <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
//               <button onClick={async () => { for (const p of items) { if (p.stockQuantity > 0) await handleMoveToCart(p); } }}
//                 style={{ padding: "10px 22px", background: "#1A1A2E", color: "#FFFFF0", border: "none", cursor: "pointer", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "inherit" }}>
//                 Move All to Cart
//               </button>
//             </div>

//             <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 }}>
//               <AnimatePresence>
//                 {items.map(product => (
//                   <motion.div key={product.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
//                     style={{ opacity: actionId === product.id ? 0.5 : 1, transition: "opacity 0.2s" }}>

//                     {/* Image */}
//                     <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", background: "#f5f0e8", cursor: "pointer" }} onClick={() => navigate(`/product/${product.id}`)}>
//                       {product.imageUrl
//                         ? <img src={product.imageUrl} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
//                             onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
//                             onMouseLeave={e => e.target.style.transform = "scale(1)"} />
//                         : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#1A1A2E,#2d2d4e)" }}>
//                             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
//                           </div>
//                       }
//                       {discount(product) > 0 && <div style={{ position: "absolute", top: 10, left: 10, background: "#800000", color: "#FFFFF0", fontSize: 10, padding: "3px 7px" }}>{discount(product)}% OFF</div>}
//                       {product.stockQuantity === 0 && <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,240,0.7)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#1A1A2E", fontWeight: 600, background: "white", padding: "6px 14px" }}>Out of Stock</span></div>}

//                       {/* Remove */}
//                       <button onClick={e => { e.stopPropagation(); handleRemove(product.id); }}
//                         style={{ position: "absolute", top: 10, right: 10, width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#800000" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
//                       </button>
//                     </div>

//                     {/* Info */}
//                     <div style={{ padding: "12px 2px" }}>
//                       <p style={{ fontSize: 10, color: "#D4AF37", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{product.category?.name}</p>
//                       <p style={{ fontSize: 16, fontWeight: 600, color: "#1A1A2E", marginBottom: 8, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", cursor: "pointer" }} onClick={() => navigate(`/product/${product.id}`)}>{product.name}</p>
//                       <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
//                         <span style={{ fontSize: 17, fontWeight: 700, color: "#1A1A2E" }}>₹{Number(product.price).toLocaleString("en-IN")}</span>
//                         {product.originalPrice && product.originalPrice > product.price && (
//                           <span style={{ fontSize: 13, color: "#999", textDecoration: "line-through" }}>₹{Number(product.originalPrice).toLocaleString("en-IN")}</span>
//                         )}
//                       </div>
//                       <button onClick={() => handleMoveToCart(product)} disabled={product.stockQuantity === 0 || actionId === product.id}
//                         style={{ width: "100%", padding: "11px", background: product.stockQuantity === 0 ? "rgba(26,26,46,0.08)" : "#1A1A2E", color: product.stockQuantity === 0 ? "#999" : "#FFFFF0", border: "none", cursor: product.stockQuantity === 0 ? "not-allowed" : "pointer", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "inherit" }}>
//                         {product.stockQuantity === 0 ? "Out of Stock" : "Move to Cart"}
//                       </button>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </div>
//           </>
//         )}
//       </div>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap');
//         @keyframes spin { to { transform: rotate(360deg); } }
//         * { box-sizing: border-box; margin: 0; }
//       `}</style>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import { wishlistAPI, cartAPI } from "../api";

const SERIF = "'Cormorant Garamond', Georgia, serif";
const SANS  = "'DM Sans', 'Segoe UI', sans-serif";

export default function WishlistPage() {
  const [items,    setItems]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [actionId, setActionId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { fetchWishlist(); }, []);

  const fetchWishlist = async () => {
    try { setItems(await wishlistAPI.getWishlist()); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleRemove = async (productId) => {
    setActionId(productId);
    try { await wishlistAPI.remove(productId); setItems(prev => prev.filter(p => p.id !== productId)); }
    catch (e) { console.error(e); }
    finally { setActionId(null); }
  };

  const handleMoveToCart = async (product) => {
    setActionId(product.id);
    try {
      await cartAPI.addToCart(product.id, 1);
      await wishlistAPI.remove(product.id);
      setItems(prev => prev.filter(p => p.id !== product.id));
    } catch (e) { alert(e.response?.data?.message || "Could not add to cart"); }
    finally { setActionId(null); }
  };

  const discount = (p) => p.originalPrice && p.originalPrice > p.price
    ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
    : (p.discountPercent || 0);

  return (
    <div style={{ fontFamily:SANS, background:"#FFFFF0", minHeight:"100vh" }}>
      <Navbar />
      <div style={{ maxWidth:1160, margin:"0 auto", padding:"96px 24px 72px" }}>

        {/* Header */}
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}}
          style={{ marginBottom:40 }}>
          <p style={{ fontFamily:SANS, fontSize:11, letterSpacing:"0.32em", textTransform:"uppercase",
            color:"#D4AF37", marginBottom:8, fontWeight:600 }}>My Account</p>
          <h1 style={{ fontFamily:SERIF, fontSize:42, fontWeight:700, color:"#1A1A2E", lineHeight:1 }}>
            Wishlist
          </h1>
          {items.length > 0 && (
            <p style={{ fontFamily:SANS, fontSize:14, color:"#888", marginTop:8 }}>
              {items.length} saved item{items.length !== 1 ? "s" : ""}
            </p>
          )}
        </motion.div>

        {loading ? (
          <div style={{ textAlign:"center", padding:80 }}>
            <div style={{ width:32, height:32, margin:"0 auto", border:"2px solid #D4AF37",
              borderTopColor:"transparent", borderRadius:"50%", animation:"spin 1s linear infinite" }}/>
          </div>

        ) : items.length === 0 ? (
          <motion.div initial={{opacity:0}} animate={{opacity:1}}
            style={{ textAlign:"center", padding:"80px 20px",
              border:"1px dashed rgba(26,26,46,0.15)", borderRadius:4 }}>
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none"
              stroke="rgba(26,26,46,0.18)" strokeWidth="1"
              style={{ display:"block", margin:"0 auto 18px" }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <p style={{ fontFamily:SERIF, fontSize:26, color:"#1A1A2E", marginBottom:8 }}>
              Your wishlist is empty
            </p>
            <p style={{ fontFamily:SANS, fontSize:14, color:"#888", marginBottom:28 }}>
              Save items you love to buy them later
            </p>
            <Link to="/products" style={{ padding:"13px 36px", background:"#800000", color:"#FFFFF0",
              textDecoration:"none", fontFamily:SANS, fontSize:12, letterSpacing:"0.18em",
              textTransform:"uppercase", fontWeight:600 }}>
              Explore Collection
            </Link>
          </motion.div>

        ) : (
          <>
            <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:24 }}>
              <button
                onClick={async () => { for (const p of items) { if (p.stockQuantity > 0) await handleMoveToCart(p); } }}
                style={{ padding:"10px 24px", background:"#1A1A2E", color:"#FFFFF0", border:"none",
                  cursor:"pointer", fontFamily:SANS, fontSize:12, letterSpacing:"0.14em",
                  textTransform:"uppercase", fontWeight:600 }}>
                Move All to Cart
              </button>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:28 }}>
              <AnimatePresence>
                {items.map(product => (
                  <motion.div key={product.id} layout
                    initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}}
                    exit={{opacity:0, scale:0.9, transition:{duration:0.18}}}
                    style={{ opacity:actionId===product.id?0.5:1, transition:"opacity 0.2s" }}>

                    {/* Image */}
                    <div style={{ position:"relative", aspectRatio:"3/4", overflow:"hidden",
                      background:"#F5F0E8", cursor:"pointer" }}
                      onClick={()=>navigate(`/product/${product.id}`)}>
                      {product.imageUrl
                        ? <img src={product.imageUrl} alt={product.name}
                            style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.45s" }}
                            onMouseEnter={e=>e.target.style.transform="scale(1.06)"}
                            onMouseLeave={e=>e.target.style.transform="scale(1)"}/>
                        : <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center",
                            justifyContent:"center",
                            background:"linear-gradient(135deg,#1A1A2E,#2d2d4e)" }}>
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
                              stroke="rgba(212,175,55,0.3)" strokeWidth="1">
                              <rect x="3" y="3" width="18" height="18" rx="2"/>
                              <circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                            </svg>
                          </div>
                      }
                      {discount(product) > 0 && (
                        <div style={{ position:"absolute", top:10, left:10, background:"#800000",
                          color:"#FFFFF0", fontFamily:SANS, fontSize:10, fontWeight:700,
                          padding:"3px 8px", letterSpacing:"0.04em" }}>
                          {discount(product)}% OFF
                        </div>
                      )}
                      {product.stockQuantity === 0 && (
                        <div style={{ position:"absolute", inset:0, background:"rgba(255,255,240,0.72)",
                          display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <span style={{ fontFamily:SANS, fontSize:11, letterSpacing:"0.16em",
                            textTransform:"uppercase", color:"#1A1A2E", fontWeight:700,
                            background:"white", padding:"6px 16px" }}>Out of Stock</span>
                        </div>
                      )}
                      <button onClick={e=>{e.stopPropagation(); handleRemove(product.id);}}
                        style={{ position:"absolute", top:10, right:10, width:32, height:32,
                          borderRadius:"50%", background:"rgba(255,255,255,0.92)", border:"none",
                          cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
                          transition:"background 0.15s" }}
                        onMouseEnter={e=>e.currentTarget.style.background="white"}
                        onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.92)"}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                          stroke="#800000" strokeWidth="2.5">
                          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    </div>

                    {/* Info */}
                    <div style={{ padding:"14px 2px" }}>
                      <p style={{ fontFamily:SANS, fontSize:10, color:"#D4AF37", letterSpacing:"0.12em",
                        textTransform:"uppercase", marginBottom:5, fontWeight:600 }}>
                        {product.category?.name}
                      </p>
                      <p style={{ fontFamily:SERIF, fontSize:18, fontWeight:600, color:"#1A1A2E",
                        marginBottom:8, overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis",
                        cursor:"pointer", lineHeight:1.25 }}
                        onClick={()=>navigate(`/product/${product.id}`)}>
                        {product.name}
                      </p>
                      <div style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:14 }}>
                        <span style={{ fontFamily:SERIF, fontSize:19, fontWeight:700, color:"#1A1A2E" }}>
                          ₹{Number(product.price).toLocaleString("en-IN")}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span style={{ fontFamily:SANS, fontSize:13, color:"#B0A99E",
                            textDecoration:"line-through" }}>
                            ₹{Number(product.originalPrice).toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                      <button onClick={()=>handleMoveToCart(product)}
                        disabled={product.stockQuantity === 0 || actionId === product.id}
                        style={{ width:"100%", padding:"12px", fontFamily:SANS,
                          background:product.stockQuantity===0?"rgba(26,26,46,0.07)":"#1A1A2E",
                          color:product.stockQuantity===0?"#999":"#FFFFF0", border:"none",
                          cursor:product.stockQuantity===0?"not-allowed":"pointer",
                          fontSize:11, letterSpacing:"0.14em", textTransform:"uppercase",
                          fontWeight:700, transition:"background 0.2s" }}
                        onMouseEnter={e=>{ if(product.stockQuantity>0) e.currentTarget.style.background="#2d2d4e"; }}
                        onMouseLeave={e=>{ if(product.stockQuantity>0) e.currentTarget.style.background="#1A1A2E"; }}>
                        {product.stockQuantity === 0 ? "Out of Stock" : "Move to Cart"}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        @keyframes spin { to { transform:rotate(360deg); } }
      `}</style>
    </div>
  );
}