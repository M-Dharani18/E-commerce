// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import Navbar from "../components/Navbar";
// import { cartAPI } from "../api/cart.api";

// export default function CartPage() {
//   const [cart, setCart] = useState({ items: [], subtotal: 0, shipping: 0, total: 0, itemCount: 0 });
//   const [loading, setLoading] = useState(true);
//   const [updatingId, setUpdatingId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => { fetchCart(); }, []);

//   const fetchCart = async () => {
//     try { setCart(await cartAPI.getCart()); }
//     catch (e) { console.error(e); }
//     finally { setLoading(false); }
//   };

//   const updateQty = async (itemId, qty) => {
//     setUpdatingId(itemId);
//     try {
//       await cartAPI.updateQuantity(itemId, qty);
//       await fetchCart();
//     } catch (e) { alert(e.response?.data?.message || "Failed to update"); }
//     finally { setUpdatingId(null); }
//   };

//   const removeItem = async (itemId) => {
//     setUpdatingId(itemId);
//     try { await cartAPI.removeItem(itemId); await fetchCart(); }
//     catch (e) { console.error(e); }
//     finally { setUpdatingId(null); }
//   };

//   const fmt = (n) => Number(n || 0).toLocaleString("en-IN");

//   return (
//     <div style={{ fontFamily: "'Cormorant Garamond', serif", background: "#FFFFF0", minHeight: "100vh" }}>
//       <Navbar />
//       <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px 60px" }}>

//         {/* Header */}
//         <div style={{ marginBottom: 36 }}>
//           <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 6 }}>Sri Aboorva Silks</p>
//           <h1 style={{ fontSize: 36, fontWeight: 700, color: "#1A1A2E" }}>Shopping Cart</h1>
//           {cart.itemCount > 0 && <p style={{ fontSize: 15, color: "#666", marginTop: 4 }}>{cart.itemCount} item{cart.itemCount !== 1 ? "s" : ""} in your cart</p>}
//         </div>

//         {loading ? (
//           <div style={{ textAlign: "center", padding: 80 }}>
//             <div style={{ width: 36, height: 36, margin: "0 auto", border: "2px solid #D4AF37", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
//           </div>
//         ) : cart.items?.length === 0 ? (
//           <div style={{ textAlign: "center", padding: "80px 20px", border: "1px dashed rgba(26,26,46,0.15)" }}>
//             <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="rgba(26,26,46,0.2)" strokeWidth="1" style={{ display: "block", margin: "0 auto 16px" }}>
//               <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
//             </svg>
//             <p style={{ fontSize: 22, color: "#666", marginBottom: 8 }}>Your cart is empty</p>
//             <p style={{ fontSize: 15, color: "#999", marginBottom: 28 }}>Discover our exquisite silk collection</p>
//             <Link to="/products" style={{ padding: "13px 32px", background: "#800000", color: "#FFFFF0", textDecoration: "none", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase" }}>
//               Explore Collection
//             </Link>
//           </div>
//         ) : (
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 40, alignItems: "start" }}>

//             {/* Items */}
//             <div>
//               {/* Column headers */}
//               <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 120px 40px", gap: 16, padding: "0 0 12px", borderBottom: "1px solid rgba(26,26,46,0.1)", marginBottom: 0 }}>
//                 {["Product", "Price", "Quantity", ""].map(h => (
//                   <span key={h} style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#999" }}>{h}</span>
//                 ))}
//               </div>

//               <AnimatePresence>
//                 {cart.items.map(item => (
//                   <motion.div key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, height: 0 }}
//                     style={{ display: "grid", gridTemplateColumns: "1fr 120px 120px 40px", gap: 16, padding: "20px 0", borderBottom: "1px solid rgba(26,26,46,0.06)", alignItems: "center", opacity: updatingId === item.id ? 0.5 : 1, transition: "opacity 0.2s" }}>

//                     {/* Product info */}
//                     <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
//                       <div style={{ width: 80, height: 100, flexShrink: 0, overflow: "hidden", background: "#f5f0e8", cursor: "pointer" }} onClick={() => navigate(`/product/${item.productId}`)}>
//                         {item.productImage
//                           ? <img src={item.productImage} alt={item.productName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//                           : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
//                             </div>
//                         }
//                       </div>
//                       <div>
//                         <p style={{ fontSize: 10, color: "#D4AF37", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{item.categoryName}</p>
//                         <p style={{ fontSize: 16, fontWeight: 600, color: "#1A1A2E", marginBottom: 4, cursor: "pointer" }} onClick={() => navigate(`/product/${item.productId}`)}>{item.productName}</p>
//                         {item.stockQuantity < 5 && item.stockQuantity > 0 && (
//                           <p style={{ fontSize: 12, color: "#E67E22" }}>Only {item.stockQuantity} left!</p>
//                         )}
//                         {item.stockQuantity === 0 && <p style={{ fontSize: 12, color: "#E74C3C" }}>Out of stock</p>}
//                       </div>
//                     </div>

//                     {/* Price */}
//                     <div>
//                       <p style={{ fontSize: 16, fontWeight: 600, color: "#1A1A2E" }}>₹{fmt(item.price)}</p>
//                       {item.originalPrice && item.originalPrice > item.price && (
//                         <p style={{ fontSize: 12, color: "#999", textDecoration: "line-through" }}>₹{fmt(item.originalPrice)}</p>
//                       )}
//                     </div>

//                     {/* Quantity */}
//                     <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(26,26,46,0.2)", width: "fit-content" }}>
//                       <button onClick={() => updateQty(item.id, item.quantity - 1)} disabled={updatingId === item.id}
//                         style={{ width: 32, height: 32, background: "transparent", border: "none", cursor: "pointer", fontSize: 16, color: "#1A1A2E" }}>−</button>
//                       <span style={{ width: 36, textAlign: "center", fontSize: 14, color: "#1A1A2E", borderLeft: "1px solid rgba(26,26,46,0.15)", borderRight: "1px solid rgba(26,26,46,0.15)" }}>{item.quantity}</span>
//                       <button onClick={() => updateQty(item.id, item.quantity + 1)} disabled={updatingId === item.id || item.quantity >= item.stockQuantity}
//                         style={{ width: 32, height: 32, background: "transparent", border: "none", cursor: item.quantity >= item.stockQuantity ? "not-allowed" : "pointer", fontSize: 16, color: "#1A1A2E", opacity: item.quantity >= item.stockQuantity ? 0.3 : 1 }}>+</button>
//                     </div>

//                     {/* Remove */}
//                     <button onClick={() => removeItem(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ccc", padding: 4 }}
//                       onMouseEnter={e => e.currentTarget.style.color = "#800000"}
//                       onMouseLeave={e => e.currentTarget.style.color = "#ccc"}>
//                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
//                       </svg>
//                     </button>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>

//               <div style={{ marginTop: 20, display: "flex", gap: 16 }}>
//                 <Link to="/products" style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "#800000", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
//                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
//                   Continue Shopping
//                 </Link>
//               </div>
//             </div>

//             {/* Order summary */}
//             <div style={{ background: "#1A1A2E", padding: "28px 24px", position: "sticky", top: 100 }}>
//               <h2 style={{ fontSize: 18, fontWeight: 700, color: "#FFFFF0", marginBottom: 24, letterSpacing: "0.05em" }}>Order Summary</h2>

//               <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,240,0.1)" }}>
//                 <Row label="Subtotal" value={`₹${fmt(cart.subtotal)}`} />
//                 <Row label="Shipping" value={Number(cart.shipping) === 0 ? "FREE" : `₹${fmt(cart.shipping)}`} valueColor={Number(cart.shipping) === 0 ? "#2ECC71" : "#FFFFF0"} />
//                 {Number(cart.shipping) > 0 && <p style={{ fontSize: 11, color: "rgba(255,255,240,0.4)", marginTop: -8 }}>Free shipping on orders above ₹999</p>}
//               </div>

//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
//                 <span style={{ fontSize: 16, color: "#FFFFF0", fontWeight: 600 }}>Total</span>
//                 <span style={{ fontSize: 22, fontWeight: 700, color: "#D4AF37" }}>₹{fmt(cart.total)}</span>
//               </div>

//               <button onClick={() => navigate("/checkout")}
//                 style={{ width: "100%", padding: "16px", background: "#800000", color: "#FFFFF0", border: "none", cursor: "pointer", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "inherit", marginBottom: 12 }}>
//                 Proceed to Checkout
//               </button>
//               <p style={{ fontSize: 11, textAlign: "center", color: "rgba(255,255,240,0.35)", letterSpacing: "0.08em" }}>Secure checkout · GST included</p>

//               {/* Badges */}
//               <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(255,255,240,0.08)", display: "flex", justifyContent: "center", gap: 20 }}>
//                 {["Authentic Silk","Easy Returns","Safe Payment"].map(t => (
//                   <div key={t} style={{ textAlign: "center" }}>
//                     <p style={{ fontSize: 10, color: "rgba(255,255,240,0.3)", letterSpacing: "0.08em" }}>{t}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
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

// function Row({ label, value, valueColor = "#FFFFF0" }) {
//   return (
//     <div style={{ display: "flex", justifyContent: "space-between" }}>
//       <span style={{ fontSize: 14, color: "rgba(255,255,240,0.55)" }}>{label}</span>
//       <span style={{ fontSize: 14, color: valueColor, fontWeight: 500 }}>{value}</span>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import { cartAPI } from "../api";

const SERIF = "'Cormorant Garamond', Georgia, serif";
const SANS  = "'DM Sans', 'Segoe UI', sans-serif";

// quick list of Indian states – we only use it for the cart page dropdown so it
// mirrors the same set used in checkout.
const STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bhar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
  "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
  "Uttarakhand","West Bengal","Delhi","Jammu & Kashmir","Ladakh","Puducherry"
];

// ── Checkout progress stepper ─────────────────────────────────────────────
function CheckoutStepper({ current }) {
  const steps = ["BAG", "ADDRESS", "PAYMENT"];
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center",
      gap:0, marginBottom:44, paddingTop:8 }}>
      {steps.map((step, i) => {
        const done    = i < current;
        const active  = i === current;
        return (
          <div key={step} style={{ display:"flex", alignItems:"center" }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
              <div style={{ width:28, height:28, borderRadius:"50%", display:"flex", alignItems:"center",
                justifyContent:"center", border:`2px solid ${active?"#800000":done?"#800000":"#C9C4BB"}`,
                background:done?"#800000":active?"transparent":"transparent",
                transition:"all 0.3s" }}>
                {done
                  ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  : <div style={{ width:8, height:8, borderRadius:"50%",
                      background:active?"#800000":"#C9C4BB" }}/>
                }
              </div>
              <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em",
                color:active?"#800000":done?"#800000":"#B0A99E", fontFamily:SANS }}>
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ width:100, height:1, margin:"0 8px",
                background:done?"#800000":"#D9D4CC",
                marginBottom:16, transition:"background 0.3s" }}/>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function CartPage() {
  const [cart, setCart]         = useState({ items:[], subtotal:0, shipping:0, total:0, discount:0, itemCount:0 });
  const [loading, setLoading]   = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // keep track of selected delivery state on the cart page; default to Tamil
  // Nadu so the user sees the free-shipping case but can change it.
  const [state, setState] = useState("Tamil Nadu");

  const navigate = useNavigate();

  useEffect(() => { fetchCart(state); }, [state]);

  const fetchCart = async (stateParam) => {
    try { setCart(await cartAPI.getCart(stateParam)); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const updateQty = async (itemId, qty) => {
    setUpdatingId(itemId);
    try { await cartAPI.updateQuantity(itemId, qty); await fetchCart(); }
    catch (e) { alert(e.response?.data?.message || "Failed to update"); }
    finally { setUpdatingId(null); }
  };

  const removeItem = async (itemId) => {
    setUpdatingId(itemId);
    try { await cartAPI.removeItem(itemId); await fetchCart(); }
    catch (e) { console.error(e); }
    finally { setUpdatingId(null); }
  };

  const fmt = (n) => Number(n || 0).toLocaleString("en-IN");

  // Price calculations
  const subtotal  = Number(cart.subtotal || 0);
  const discount  = Number(cart.discount || 0);
  const shipping  = Number(cart.shipping || 0);
  const gst       = Math.round(subtotal * 0.05);       // 5% GST on original amount
  const grandTotal = subtotal - discount + shipping + gst;

  return (
    <div style={{ fontFamily:SANS, background:"#FFFFF0", minHeight:"100vh" }}>
      <Navbar />
      <div style={{ maxWidth:1160, margin:"0 auto", padding:"96px 24px 72px" }}>

        {/* Page header */}
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}}
          style={{ marginBottom:36, textAlign:"center" }}>
          <p style={{ fontFamily:SANS, fontSize:11, letterSpacing:"0.32em", textTransform:"uppercase",
            color:"#D4AF37", marginBottom:8 }}>Sri Aboorva Silks</p>
          <h1 style={{ fontFamily:SERIF, fontSize:42, fontWeight:700, color:"#1A1A2E", lineHeight:1 }}>
            Shopping Bag
          </h1>
        </motion.div>

        {/* Stepper */}
        <CheckoutStepper current={0} />

        {loading ? (
          <div style={{ textAlign:"center", padding:80 }}>
            <div style={{ width:32, height:32, margin:"0 auto", border:"2px solid #D4AF37",
              borderTopColor:"transparent", borderRadius:"50%", animation:"spin 1s linear infinite" }}/>
          </div>

        ) : cart.items?.length === 0 ? (
          <motion.div initial={{opacity:0}} animate={{opacity:1}}
            style={{ textAlign:"center", padding:"80px 20px",
              border:"1px dashed rgba(26,26,46,0.15)", borderRadius:4 }}>
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none"
              stroke="rgba(26,26,46,0.2)" strokeWidth="1"
              style={{ display:"block", margin:"0 auto 18px" }}>
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <p style={{ fontFamily:SERIF, fontSize:26, color:"#1A1A2E", marginBottom:8 }}>Your bag is empty</p>
            <p style={{ fontFamily:SANS, fontSize:14, color:"#888", marginBottom:28 }}>
              Discover our exquisite silk collection
            </p>
            <Link to="/products" style={{ padding:"13px 36px", background:"#800000", color:"#FFFFF0",
              textDecoration:"none", fontFamily:SANS, fontSize:12, letterSpacing:"0.18em",
              textTransform:"uppercase", fontWeight:600 }}>
              Explore Collection
            </Link>
          </motion.div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 360px", gap:44, alignItems:"start" }}>

            {/* ── CART ITEMS ── */}
            <div>
              {/* Column headers */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 100px 120px 36px",
                gap:16, padding:"0 0 14px",
                borderBottom:"1px solid rgba(26,26,46,0.1)", marginBottom:0 }}>
                {["Product","Price","Quantity",""].map(h => (
                  <span key={h} style={{ fontFamily:SANS, fontSize:10, letterSpacing:"0.22em",
                    textTransform:"uppercase", color:"#B0A99E", fontWeight:600 }}>{h}</span>
                ))}
              </div>

              <AnimatePresence>
                {cart.items.map(item => (
                  <motion.div key={item.id} layout
                    initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0, height:0}}
                    style={{ display:"grid", gridTemplateColumns:"1fr 100px 120px 36px",
                      gap:16, padding:"22px 0", alignItems:"center",
                      borderBottom:"1px solid rgba(26,26,46,0.08)",
                      opacity:updatingId===item.id?0.5:1, transition:"opacity 0.2s" }}>

                    {/* Product */}
                    <div style={{ display:"flex", gap:16, alignItems:"center" }}>
                      <div style={{ width:70, height:88, flexShrink:0, overflow:"hidden",
                        background:"#F5F0E8", cursor:"pointer" }}
                        onClick={()=>navigate(`/product/${item.productId}`)}>
                        {item.imageUrl
                          ? <img src={item.imageUrl} alt={item.productName}
                              style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.4s" }}
                              onMouseEnter={e=>e.target.style.transform="scale(1.07)"}
                              onMouseLeave={e=>e.target.style.transform="scale(1)"}/>
                          : <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center",
                              justifyContent:"center", background:"linear-gradient(135deg,#1A1A2E,#2d2d4e)" }}>
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                                stroke="rgba(212,175,55,0.3)" strokeWidth="1">
                                <rect x="3" y="3" width="18" height="18" rx="1"/>
                                <circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                              </svg>
                            </div>
                        }
                      </div>
                      <div>
                        <p style={{ fontFamily:SANS, fontSize:10, color:"#D4AF37",
                          letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:5, fontWeight:600 }}>
                          {item.categoryName}
                        </p>
                        <p style={{ fontFamily:SERIF, fontSize:17, fontWeight:600, color:"#1A1A2E",
                          marginBottom:4, cursor:"pointer", lineHeight:1.25 }}
                          onClick={()=>navigate(`/product/${item.productId}`)}>
                          {item.productName}
                        </p>
                        {item.stockQuantity < 5 && item.stockQuantity > 0 && (
                          <p style={{ fontFamily:SANS, fontSize:11, color:"#C0750A", fontWeight:500 }}>
                            Only {item.stockQuantity} left!
                          </p>
                        )}
                        {item.stockQuantity === 0 && (
                          <p style={{ fontFamily:SANS, fontSize:11, color:"#B91C1C", fontWeight:500 }}>
                            Out of stock
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div>
                      <p style={{ fontFamily:SERIF, fontSize:16, fontWeight:700, color:"#1A1A2E" }}>
                        ₹{fmt(item.price)}
                      </p>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <p style={{ fontFamily:SANS, fontSize:12, color:"#B0A99E",
                          textDecoration:"line-through", marginTop:2 }}>
                          ₹{fmt(item.originalPrice)}
                        </p>
                      )}
                    </div>

                    {/* Qty stepper */}
                    <div style={{ display:"flex", alignItems:"center",
                      border:"1px solid rgba(26,26,46,0.2)", width:"fit-content" }}>
                      <button onClick={()=>updateQty(item.id, item.quantity-1)}
                        disabled={updatingId===item.id}
                        style={{ width:32, height:32, background:"transparent", border:"none",
                          cursor:"pointer", fontSize:18, color:"#1A1A2E", fontFamily:SANS,
                          display:"flex", alignItems:"center", justifyContent:"center" }}>−</button>
                      <span style={{ width:36, textAlign:"center", fontFamily:SANS, fontSize:14,
                        fontWeight:600, color:"#1A1A2E",
                        borderLeft:"1px solid rgba(26,26,46,0.15)",
                        borderRight:"1px solid rgba(26,26,46,0.15)" }}>
                        {item.quantity}
                      </span>
                      <button onClick={()=>updateQty(item.id, item.quantity+1)}
                        disabled={updatingId===item.id || item.quantity >= item.stockQuantity}
                        style={{ width:32, height:32, background:"transparent", border:"none",
                          cursor:item.quantity>=item.stockQuantity?"not-allowed":"pointer",
                          fontSize:18, color:"#1A1A2E", fontFamily:SANS,
                          display:"flex", alignItems:"center", justifyContent:"center",
                          opacity:item.quantity>=item.stockQuantity?0.28:1 }}>+</button>
                    </div>

                    {/* Remove */}
                    <button onClick={()=>removeItem(item.id)}
                      style={{ background:"none", border:"none", cursor:"pointer",
                        color:"#C9C4BB", padding:4, display:"flex", transition:"color 0.15s" }}
                      onMouseEnter={e=>e.currentTarget.style.color="#800000"}
                      onMouseLeave={e=>e.currentTarget.style.color="#C9C4BB"}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                      </svg>
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div style={{ marginTop:22 }}>
                <Link to="/products" style={{ fontFamily:SANS, fontSize:12, letterSpacing:"0.14em",
                  textTransform:"uppercase", color:"#800000", textDecoration:"none",
                  display:"inline-flex", alignItems:"center", gap:6, fontWeight:600 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* ── ORDER SUMMARY ── */}
            <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:0.1}}
              style={{ background:"#1A1A2E", padding:"32px 28px", position:"sticky", top:100 }}>

              <h2 style={{ fontFamily:SERIF, fontSize:22, fontWeight:700, color:"#FFFFF0",
                marginBottom:12, letterSpacing:"0.04em" }}>Order Summary</h2>
              {/* delivery state selector affects shipping cost */}
              <div style={{ marginBottom:24 }}>
                <label style={{ fontFamily:SANS, fontSize:12, color:"#FFFFF0", display:"block", marginBottom:6 }}>Delivery State</label>
                <select value={state} onChange={e=>setState(e.target.value)}
                  style={{ width:"100%", padding:"8px 10px", fontFamily:SANS, fontSize:14, borderRadius:3 }}>
                  {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Line items */}
              <div style={{ display:"flex", flexDirection:"column", gap:14, marginBottom:20,
                paddingBottom:20, borderBottom:"1px solid rgba(255,255,240,0.1)" }}>
                <SummaryRow label="Subtotal" value={`₹${fmt(subtotal)}`} />
                {discount > 0 && (
                  <SummaryRow label="Discount (10%)" value={`- ₹${fmt(discount)}`} valueColor="#16a34a" />
                )}
                <SummaryRow
                  label="Delivery"
                  value={shipping === 0 ? "FREE" : `₹${fmt(shipping)}`}
                  valueColor={shipping === 0 ? "#2ECC71" : "#FFFFF0"}
                />
                {shipping > 0 && (
                  <p style={{ fontFamily:SANS, fontSize:11, color:"rgba(255,255,240,0.38)",
                    marginTop:-8 }}>
                    Free delivery on orders above ₹999
                  </p>
                )}
                {/* GST row — highlighted */}
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                  padding:"10px 12px", background:"rgba(212,175,55,0.07)",
                  border:"1px solid rgba(212,175,55,0.15)" }}>
                  <span style={{ fontFamily:SANS, fontSize:13, color:"rgba(255,255,240,0.7)" }}>
                    GST (5%)
                  </span>
                  <span style={{ fontFamily:SANS, fontSize:13, color:"#D4AF37", fontWeight:600 }}>
                    + ₹{fmt(gst)}
                  </span>
                </div>
              </div>

              {/* Grand total */}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                marginBottom:28 }}>
                <span style={{ fontFamily:SERIF, fontSize:18, color:"#FFFFF0", fontWeight:600 }}>
                  Grand Total
                </span>
                <span style={{ fontFamily:SERIF, fontSize:26, fontWeight:700, color:"#D4AF37" }}>
                  ₹{fmt(grandTotal)}
                </span>
              </div>

              {/* Incl. GST note */}
              <p style={{ fontFamily:SANS, fontSize:11, color:"rgba(255,255,240,0.32)",
                marginBottom:20, textAlign:"center" }}>
                Inclusive of GST · Tax invoice provided
              </p>

              {/* CTA */}
              <motion.button
                whileHover={{ background:"#6B0000" }}
                onClick={()=>navigate("/checkout")}
                style={{ width:"100%", padding:"16px", background:"#800000", color:"#FFFFF0",
                  border:"none", cursor:"pointer", fontFamily:SANS, fontSize:12,
                  letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:700,
                  marginBottom:12, display:"flex", alignItems:"center", justifyContent:"center",
                  gap:10, transition:"background 0.2s" }}>
                Proceed to Checkout
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </motion.button>

              {/* Trust badges */}
              <div style={{ marginTop:22, paddingTop:20,
                borderTop:"1px solid rgba(255,255,240,0.07)",
                display:"flex", justifyContent:"space-around" }}>
                {["Authentic Silk","Easy Returns","Safe Payment"].map(t => (
                  <p key={t} style={{ fontFamily:SANS, fontSize:10,
                    color:"rgba(255,255,240,0.28)", letterSpacing:"0.06em",
                    textAlign:"center" }}>{t}</p>
                ))}
              </div>
            </motion.div>
          </div>
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

function SummaryRow({ label, value, valueColor="#FFFFF0" }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between" }}>
      <span style={{ fontFamily:SANS, fontSize:14, color:"rgba(255,255,240,0.52)" }}>{label}</span>
      <span style={{ fontFamily:SANS, fontSize:14, color:valueColor, fontWeight:500 }}>{value}</span>
    </div>
  );
}