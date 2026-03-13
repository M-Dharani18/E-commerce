// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import Navbar from "../components/Navbar";

// const SERIF = "'Cormorant Garamond', Georgia, serif";
// const SANS  = "'DM Sans', 'Segoe UI', sans-serif";

// const STATUS_TIMELINE = [
//   { key:"placed",    label:"Order Placed",    icon:"📋", done:true  },
//   { key:"confirmed", label:"Confirmed",        icon:"✅", done:false },
//   { key:"packed",    label:"Packed",           icon:"📦", done:false },
//   { key:"shipped",   label:"Shipped",          icon:"🚚", done:false },
//   { key:"delivered", label:"Delivered",        icon:"🏠", done:false },
// ];

// export default function OrderConfirmation() {
//   const navigate = useNavigate();
//   const [order,   setOrder]   = useState(null);
//   const [confetti, setConfetti] = useState([]);

//   useEffect(() => {
//     const stored = localStorage.getItem("lastOrder");
//     if (!stored) { navigate("/"); return; }
//     const o = JSON.parse(stored);
//     setOrder(o);

//     // Generate confetti particles (only for confirmed/paid orders)
//     if (o.paymentMethod === "cod" || o.status === "confirmed") {
//       setConfetti(Array.from({ length: 24 }, (_, i) => ({
//         id:i, x:Math.random()*100, delay:Math.random()*0.8,
//         color:["#D4AF37","#800000","#1A1A2E","#C9C4BB","#F59E0B"][Math.floor(Math.random()*5)],
//         size:Math.random()*8+4,
//       })));
//     }
//   }, []);

//   const fmt = (n) => Number(n||0).toLocaleString("en-IN");

//   if (!order) return null;

//   const isUpiPending = order.paymentMethod === "upi" && order.status === "pending_verification";

//   return (
//     <div style={{ fontFamily:SANS, background:"#FFFFF0", minHeight:"100vh" }}>
//       <Navbar />
//       <div style={{ maxWidth:760, margin:"0 auto", padding:"96px 24px 72px" }}>

//         {/* Confetti */}
//         <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:99 }}>
//           {confetti.map(c => (
//             <motion.div key={c.id}
//               initial={{ y:-20, x:`${c.x}vw`, opacity:1, rotate:0 }}
//               animate={{ y:"110vh", opacity:0, rotate:720 }}
//               transition={{ duration:2.8+Math.random(), delay:c.delay, ease:"linear" }}
//               style={{ position:"absolute", top:0, width:c.size, height:c.size,
//                 background:c.color, borderRadius:c.size>8?"50%":"2px" }}/>
//           ))}
//         </div>

//         {/* Success icon */}
//         <motion.div initial={{scale:0}} animate={{scale:1}}
//           transition={{type:"spring",stiffness:200,damping:18}}
//           style={{ textAlign:"center", marginBottom:32 }}>
//           <div style={{ width:80, height:80, borderRadius:"50%", margin:"0 auto 22px",
//             background:isUpiPending?"#FFFBEB":"#F0FFF4",
//             border:`2px solid ${isUpiPending?"#FDE68A":"#BBF7D0"}`,
//             display:"flex", alignItems:"center", justifyContent:"center" }}>
//             <span style={{ fontSize:36 }}>{isUpiPending?"⏳":"🎉"}</span>
//           </div>
//           <p style={{ fontFamily:SANS, fontSize:11, letterSpacing:"0.32em", textTransform:"uppercase",
//             color:"#D4AF37", marginBottom:10, fontWeight:600 }}>Sri Aboorva Silks</p>
//           <h1 style={{ fontFamily:SERIF, fontSize:42, fontWeight:700, color:"#1A1A2E",
//             marginBottom:10, lineHeight:1.1 }}>
//             {isUpiPending ? "Payment Under Review" : "Order Confirmed!"}
//           </h1>
//           <p style={{ fontFamily:SANS, fontSize:15, color:"#555", maxWidth:520, margin:"0 auto" }}>
//             {isUpiPending
//               ? "We've received your payment screenshot and UTR. Your order will be confirmed within 2 hours after verification."
//               : order.paymentMethod==="cod"
//                 ? "Your order has been placed successfully! Pay when your order arrives."
//                 : "Your payment has been verified and your order is confirmed. Thank you for shopping with us!"}
//           </p>
//         </motion.div>

//         {/* Order ID card */}
//         <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
//           style={{ background:"#1A1A2E", padding:"22px 28px", marginBottom:20,
//             display:"flex", alignItems:"center", justifyContent:"space-between",
//             flexWrap:"wrap", gap:14 }}>
//           <div>
//             <p style={{ fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:"0.16em",
//               textTransform:"uppercase", color:"rgba(255,255,240,0.4)", marginBottom:6 }}>
//               Order ID
//             </p>
//             <p style={{ fontFamily:SERIF, fontSize:26, fontWeight:700, color:"#D4AF37" }}>
//               {order.orderId}
//             </p>
//           </div>
//           <div>
//             <p style={{ fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:"0.16em",
//               textTransform:"uppercase", color:"rgba(255,255,240,0.4)", marginBottom:6 }}>
//               Date
//             </p>
//             <p style={{ fontFamily:SANS, fontSize:14, color:"#FFFFF0", fontWeight:500 }}>
//               {new Date(order.date).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}
//             </p>
//           </div>
//           <div>
//             <p style={{ fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:"0.16em",
//               textTransform:"uppercase", color:"rgba(255,255,240,0.4)", marginBottom:6 }}>
//               Amount Paid
//             </p>
//             <p style={{ fontFamily:SERIF, fontSize:22, fontWeight:700, color:"#FFFFF0" }}>
//               {order.paymentMethod==="cod" ? "Pay on Delivery" : `₹${fmt(order.grandTotal)}`}
//             </p>
//           </div>
//           <div>
//             <p style={{ fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:"0.16em",
//               textTransform:"uppercase", color:"rgba(255,255,240,0.4)", marginBottom:6 }}>
//               Payment
//             </p>
//             <span style={{ padding:"4px 12px", fontSize:12, fontWeight:700, fontFamily:SANS,
//               background:isUpiPending?"rgba(251,191,36,0.15)":"rgba(52,211,153,0.15)",
//               color:isUpiPending?"#FBBF24":"#34D399",
//               border:`1px solid ${isUpiPending?"rgba(251,191,36,0.3)":"rgba(52,211,153,0.3)"}` }}>
//               {isUpiPending ? "⏳ Verifying" : order.paymentMethod==="cod"?"COD":"✓ Paid"}
//             </span>
//           </div>
//         </motion.div>

//         {/* Order timeline */}
//         <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
//           style={{ background:"white", border:"1px solid rgba(26,26,46,0.1)",
//             padding:"24px 28px", marginBottom:20 }}>
//           <p style={{ fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:"0.18em",
//             textTransform:"uppercase", color:"#888", marginBottom:22 }}>Order Status</p>
//           <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
//             {STATUS_TIMELINE.map((step, i) => {
//               const currentStep = order.paymentMethod==="cod" ? 1 : isUpiPending ? 0 : 1;
//               const isDone = i <= currentStep;
//               const isCurr = i === currentStep;
//               return (
//                 <div key={step.key} style={{ display:"flex", alignItems:"center", flex:1 }}>
//                   <div style={{ display:"flex", flexDirection:"column", alignItems:"center",
//                     gap:8, flexShrink:0 }}>
//                     <div style={{ width:40, height:40, borderRadius:"50%",
//                       background:isDone?"#1A1A2E":"#F5F0E8",
//                       border:`2px solid ${isDone?"#1A1A2E":"#D9D4CC"}`,
//                       display:"flex", alignItems:"center", justifyContent:"center",
//                       transition:"all 0.3s",
//                       boxShadow:isCurr?"0 0 0 4px rgba(26,26,46,0.12)":"none" }}>
//                       <span style={{ fontSize:16 }}>{step.icon}</span>
//                     </div>
//                     <p style={{ fontFamily:SANS, fontSize:11, fontWeight:isCurr?700:400,
//                       color:isDone?"#1A1A2E":"#B0A99E", textAlign:"center",
//                       whiteSpace:"nowrap" }}>
//                       {step.label}
//                     </p>
//                   </div>
//                   {i < STATUS_TIMELINE.length-1 && (
//                     <div style={{ flex:1, height:2, background:isDone&&i<currentStep?"#1A1A2E":"#E8E4DC",
//                       margin:"0 4px", marginBottom:26, transition:"background 0.3s" }}/>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </motion.div>

//         {/* Delivery address */}
//         <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.35}}
//           style={{ background:"white", border:"1px solid rgba(26,26,46,0.1)",
//             padding:"22px 28px", marginBottom:20 }}>
//           <p style={{ fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:"0.18em",
//             textTransform:"uppercase", color:"#888", marginBottom:14 }}>Delivering to</p>
//           <p style={{ fontFamily:SERIF, fontSize:18, fontWeight:700,
//             color:"#1A1A2E", marginBottom:6 }}>{order.address?.fullName}</p>
//           <p style={{ fontFamily:SANS, fontSize:14, color:"#555", lineHeight:1.6 }}>
//             {order.address?.addressLine1}
//             {order.address?.addressLine2 && `, ${order.address.addressLine2}`}
//             {`, ${order.address?.city}, ${order.address?.state} – ${order.address?.pincode}`}
//           </p>
//           <p style={{ fontFamily:SANS, fontSize:13, color:"#888", marginTop:6 }}>
//             📞 {order.address?.phone} &nbsp;·&nbsp; ✉ {order.address?.email}
//           </p>
//         </motion.div>

//         {/* UPI verification note */}
//         {isUpiPending && order.utrNumber && (
//           <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.4}}
//             style={{ padding:"16px 22px", background:"#FFFBEB",
//               border:"1px solid #FDE68A", marginBottom:20 }}>
//             <p style={{ fontFamily:SANS, fontSize:13, color:"#92400E", fontWeight:600,
//               marginBottom:4 }}>⏳ Payment Verification in Progress</p>
//             <p style={{ fontFamily:SANS, fontSize:13, color:"#78350F" }}>
//               UTR / Reference: <strong>{order.utrNumber}</strong><br/>
//               We'll confirm your order via email ({order.address?.email}) within 2 hours.
//             </p>
//           </motion.div>
//         )}

//         {/* Actions */}
//         <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.45}}
//           style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
//           <Link to="/products"
//             style={{ flex:1, minWidth:200, padding:"15px 24px", background:"#800000",
//               color:"#FFFFF0", textDecoration:"none", fontFamily:SANS, fontSize:12,
//               letterSpacing:"0.16em", textTransform:"uppercase", fontWeight:700,
//               textAlign:"center", display:"block", transition:"background 0.2s" }}
//             onMouseEnter={e=>e.currentTarget.style.background="#6B0000"}
//             onMouseLeave={e=>e.currentTarget.style.background="#800000"}>
//             Continue Shopping
//           </Link>
//           <Link to="/orders"
//             style={{ flex:1, minWidth:200, padding:"15px 24px", background:"transparent",
//               color:"#1A1A2E", textDecoration:"none", fontFamily:SANS, fontSize:12,
//               letterSpacing:"0.16em", textTransform:"uppercase", fontWeight:600,
//               textAlign:"center", display:"block",
//               border:"1.5px solid rgba(26,26,46,0.25)", transition:"all 0.2s" }}
//             onMouseEnter={e=>{e.currentTarget.style.background="#1A1A2E"; e.currentTarget.style.color="#FFFFF0";}}
//             onMouseLeave={e=>{e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#1A1A2E";}}>
//             Track My Orders
//           </Link>
//         </motion.div>
//       </div>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
//         *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
//         @keyframes spin { to { transform:rotate(360deg); } }
//       `}</style>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const SERIF = "'Cormorant Garamond', Georgia, serif";
const SANS  = "'DM Sans', 'Segoe UI', sans-serif";

// Maps backend OrderStatus enum to step index (0-4)
const STATUS_TO_STEP = {
  PLACED:    0, CONFIRMED: 1, PACKED: 2, SHIPPED: 3, DELIVERED: 4,
  CANCELLED: -1, RETURNED: -1,
};

const TIMELINE = [
  { key:"PLACED",    label:"Order Placed",  icon:"📋" },
  { key:"CONFIRMED", label:"Confirmed",      icon:"✅" },
  { key:"PACKED",    label:"Packed",         icon:"📦" },
  { key:"SHIPPED",   label:"Shipped",        icon:"🚚" },
  { key:"DELIVERED", label:"Delivered",      icon:"🏠" },
];

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const [order,    setOrder]    = useState(null);
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("lastOrder");
    if (!stored) { navigate("/"); return; }
    // lastOrder is the full OrderResponse from backend
    const o = JSON.parse(stored);
    setOrder(o);

    // Only animate confetti for COD (confirmed immediately) or verified UPI
    if (o.paymentMethod === "COD" || o.paymentStatus === "VERIFIED" || o.paymentStatus === "COMPLETED") {
      setConfetti(Array.from({ length: 28 }, (_, i) => ({
        id: i, x: Math.random() * 100, delay: Math.random() * 0.9,
        color: ["#D4AF37","#800000","#1A1A2E","#C9C4BB","#F59E0B","#FFFFF0"][Math.floor(Math.random()*6)],
        size: Math.random() * 8 + 4,
      })));
    }
  }, []);

  const fmt = n => Number(n||0).toLocaleString("en-IN");

  if (!order) return null;

  // Derived state
  // Backend OrderResponse: status, paymentStatus, paymentMethod, orderNumber, grandTotal, etc.
  const isUpiPending    = order.paymentMethod === "UPI" && order.paymentStatus === "PENDING_VERIFICATION";
  const isCancelled     = order.status === "CANCELLED";
  const currentStep     = STATUS_TO_STEP[order.status] ?? 0;
  const displayTotal    = order.grandTotal ?? order.total ?? 0;

  // For address — backend returns address as nested DeliveryAddressDTO
  const addr = order.address || {};

  return (
    <div style={{ fontFamily:SANS, background:"#FFFFF0", minHeight:"100vh" }}>
      <Navbar/>

      {/* Confetti */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:99 }}>
        {confetti.map(c => (
          <motion.div key={c.id}
            initial={{ y:-20, x:`${c.x}vw`, opacity:1, rotate:0 }}
            animate={{ y:"110vh", opacity:0, rotate:720 }}
            transition={{ duration:2.8 + Math.random(), delay:c.delay, ease:"linear" }}
            style={{ position:"absolute", top:0, width:c.size, height:c.size,
              background:c.color, borderRadius:c.size>8?"50%":"2px" }}/>
        ))}
      </div>

      <div style={{ maxWidth:760, margin:"0 auto", padding:"96px 24px 72px" }}>

        {/* Hero */}
        <motion.div initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}}
          style={{ textAlign:"center", marginBottom:36 }}>
          <motion.div initial={{scale:0}} animate={{scale:1}}
            transition={{type:"spring",stiffness:220,damping:18}}
            style={{ width:84, height:84, borderRadius:"50%", margin:"0 auto 22px",
              background:isCancelled?"#FFF1F2":isUpiPending?"#FFFBEB":"#F0FFF4",
              border:`2px solid ${isCancelled?"#FECDD3":isUpiPending?"#FDE68A":"#BBF7D0"}`,
              display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize:38 }}>
              {isCancelled?"❌":isUpiPending?"⏳":"🎉"}
            </span>
          </motion.div>

          <p style={{ fontFamily:SANS, fontSize:11, letterSpacing:"0.32em", textTransform:"uppercase",
            color:"#D4AF37", marginBottom:10, fontWeight:600 }}>Sri Aboorva Silks</p>
          <h1 style={{ fontFamily:SERIF, fontSize:42, fontWeight:700, color:"#1A1A2E",
            marginBottom:12, lineHeight:1.1 }}>
            {isCancelled?"Order Cancelled":isUpiPending?"Payment Under Review":"Order Confirmed!"}
          </h1>
          <p style={{ fontFamily:SANS, fontSize:15, color:"#555",
            maxWidth:520, margin:"0 auto", lineHeight:1.65 }}>
            {isCancelled
              ? `Your order has been cancelled. ${order.cancellationReason || ""}`
              : isUpiPending
                ? "We've received your payment screenshot and UTR. Your order will be confirmed within 2 hours after verification."
                : order.paymentMethod === "COD"
                  ? "Your order has been placed! Pay when your order arrives at your doorstep."
                  : "Your payment is verified and your order is confirmed. Thank you for choosing us!"}
          </p>
        </motion.div>

        {/* Order ID banner */}
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.15}}
          style={{ background:"#1A1A2E", padding:"22px 28px", marginBottom:20,
            display:"flex", flexWrap:"wrap", gap:20,
            alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <p style={{ fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:"0.16em",
              textTransform:"uppercase", color:"rgba(255,255,240,0.4)", marginBottom:6 }}>Order Number</p>
            <p style={{ fontFamily:SERIF, fontSize:28, fontWeight:700, color:"#D4AF37",
              letterSpacing:"0.06em" }}>{order.orderNumber}</p>
          </div>
          <div>
            <p style={{ fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:"0.16em",
              textTransform:"uppercase", color:"rgba(255,255,240,0.4)", marginBottom:6 }}>Date</p>
            <p style={{ fontFamily:SANS, fontSize:14, color:"#FFFFF0", fontWeight:500 }}>
              {order.createdAt
                ? new Date(order.createdAt).toLocaleDateString("en-IN",
                    { day:"numeric", month:"long", year:"numeric" })
                : new Date().toLocaleDateString("en-IN",
                    { day:"numeric", month:"long", year:"numeric" })}
            </p>
          </div>
          <div>
            <p style={{ fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:"0.16em",
              textTransform:"uppercase", color:"rgba(255,255,240,0.4)", marginBottom:6 }}>Amount</p>
            <p style={{ fontFamily:SERIF, fontSize:22, fontWeight:700, color:"#FFFFF0" }}>
              {order.paymentMethod==="COD" ? "Pay on Delivery" : `₹${fmt(displayTotal)}`}
            </p>
          </div>
          <div>
            <p style={{ fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:"0.16em",
              textTransform:"uppercase", color:"rgba(255,255,240,0.4)", marginBottom:6 }}>Payment</p>
            <PaymentBadge paymentMethod={order.paymentMethod} paymentStatus={order.paymentStatus}/>
          </div>
        </motion.div>

        {/* Order timeline — only for non-cancelled orders */}
        {!isCancelled && (
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.22}}
            style={{ background:"white", border:"1px solid rgba(26,26,46,0.1)",
              padding:"24px 28px", marginBottom:20 }}>
            <p style={{ fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:"0.18em",
              textTransform:"uppercase", color:"#888", marginBottom:22 }}>Order Progress</p>
            <div style={{ display:"flex", alignItems:"center" }}>
              {TIMELINE.map((step, i) => {
                const done = i <= currentStep;
                const curr = i === currentStep;
                return (
                  <div key={step.key} style={{ display:"flex", alignItems:"center", flex:1 }}>
                    <div style={{ display:"flex", flexDirection:"column",
                      alignItems:"center", gap:8, flexShrink:0 }}>
                      <div style={{ width:40, height:40, borderRadius:"50%",
                        background:done?"#1A1A2E":"#F5F0E8",
                        border:`2px solid ${done?"#1A1A2E":"#D9D4CC"}`,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        boxShadow:curr?"0 0 0 4px rgba(26,26,46,0.1)":"none",
                        transition:"all 0.3s" }}>
                        <span style={{ fontSize:16 }}>{step.icon}</span>
                      </div>
                      <p style={{ fontFamily:SANS, fontSize:11,
                        fontWeight:curr?700:400, color:done?"#1A1A2E":"#B0A99E",
                        textAlign:"center", whiteSpace:"nowrap" }}>{step.label}</p>
                      {/* Timestamp from backend */}
                      {done && getTimestamp(order, step.key) && (
                        <p style={{ fontFamily:SANS, fontSize:10, color:"#B0A99E",
                          textAlign:"center", marginTop:-4 }}>
                          {getTimestamp(order, step.key)}
                        </p>
                      )}
                    </div>
                    {i < TIMELINE.length - 1 && (
                      <div style={{ flex:1, height:2,
                        background:i < currentStep?"#1A1A2E":"#E8E4DC",
                        margin:"0 4px", marginBottom:32, transition:"background 0.4s" }}/>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Tracking info (if available) */}
        {order.trackingNumber && (
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.26}}
            style={{ padding:"16px 22px", background:"#F0F9FF",
              border:"1px solid #BAE6FD", marginBottom:20 }}>
            <p style={{ fontFamily:SANS, fontSize:13, fontWeight:700, color:"#0C4A6E",
              marginBottom:4 }}>📦 Tracking Information</p>
            <p style={{ fontFamily:SANS, fontSize:13, color:"#0369A1" }}>
              {order.courierPartner && <strong>{order.courierPartner}: </strong>}
              {order.trackingNumber}
            </p>
          </motion.div>
        )}

        {/* UPI verification note */}
        {isUpiPending && (
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.28}}
            style={{ padding:"18px 22px", background:"#FFFBEB",
              border:"1px solid #FDE68A", marginBottom:20 }}>
            <p style={{ fontFamily:SANS, fontSize:13, fontWeight:700,
              color:"#92400E", marginBottom:6 }}>⏳ Payment Verification in Progress</p>
            <p style={{ fontFamily:SANS, fontSize:13, color:"#78350F", lineHeight:1.55 }}>
              {order.utrNumber && <>UTR / Reference: <strong>{order.utrNumber}</strong><br/></>}
              We'll confirm your order via email
              {addr.email && <>{" "}({addr.email})</>}
              {" "}within 2 hours of verification.
            </p>
          </motion.div>
        )}

        {/* Delivery address */}
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
          style={{ background:"white", border:"1px solid rgba(26,26,46,0.1)",
            padding:"22px 28px", marginBottom:20 }}>
          <p style={{ fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:"0.18em",
            textTransform:"uppercase", color:"#888", marginBottom:14 }}>Delivering to</p>
          <p style={{ fontFamily:SERIF, fontSize:19, fontWeight:700,
            color:"#1A1A2E", marginBottom:6 }}>{addr.fullName}</p>
          <p style={{ fontFamily:SANS, fontSize:14, color:"#555", lineHeight:1.6 }}>
            {addr.addressLine1}
            {addr.addressLine2 && `, ${addr.addressLine2}`}
            {`, ${addr.city}, ${addr.state} – ${addr.pincode}`}
          </p>
          {addr.phone && (
            <p style={{ fontFamily:SANS, fontSize:13, color:"#888", marginTop:6 }}>
              📞 {addr.phone}
              {addr.email && <>{" · "}✉ {addr.email}</>}
            </p>
          )}
        </motion.div>

        {/* Order items */}
        {order.items?.length > 0 && (
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.34}}
            style={{ background:"white", border:"1px solid rgba(26,26,46,0.1)",
              padding:"22px 28px", marginBottom:20 }}>
            <p style={{ fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:"0.18em",
              textTransform:"uppercase", color:"#888", marginBottom:16 }}>
              {order.items.length} item{order.items.length!==1?"s":""}
            </p>
            {order.items.map(item => (
              <div key={item.id} style={{ display:"flex", gap:14, marginBottom:14,
                paddingBottom:14, borderBottom:"1px solid rgba(26,26,46,0.07)" }}>
                {item.productImage && (
                  <img src={item.productImage} alt={item.productName}
                    style={{ width:52, height:65, objectFit:"cover", flexShrink:0 }}/>
                )}
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontFamily:SERIF, fontSize:16, fontWeight:700,
                    color:"#1A1A2E", marginBottom:4 }}>{item.productName}</p>
                  {item.categoryName && (
                    <p style={{ fontFamily:SANS, fontSize:11, color:"#D4AF37",
                      letterSpacing:"0.08em", textTransform:"uppercase",
                      fontWeight:600, marginBottom:4 }}>{item.categoryName}</p>
                  )}
                  <p style={{ fontFamily:SANS, fontSize:13, color:"#888" }}>
                    Qty: {item.quantity} · ₹{Number(item.price||0).toLocaleString("en-IN")} each
                  </p>
                </div>
                <div style={{ textAlign:"right", flexShrink:0 }}>
                  <p style={{ fontFamily:SERIF, fontSize:16, fontWeight:700, color:"#1A1A2E" }}>
                    ₹{fmt(item.subtotal || (item.price * item.quantity))}
                  </p>
                </div>
              </div>
            ))}
            {/* Price breakdown */}
            <div style={{ paddingTop:14, borderTop:"1px solid rgba(26,26,46,0.08)" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                <span style={{ fontFamily:SANS, fontSize:13, color:"#888" }}>Subtotal</span>
                <span style={{ fontFamily:SANS, fontSize:13, color:"#555",
                  fontWeight:500 }}>₹{fmt(order.subtotal)}</span>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
                <span style={{ fontFamily:SANS, fontSize:13, color:"#888" }}>Delivery</span>
                <span style={{ fontFamily:SANS, fontSize:13,
                  color:Number(order.deliveryCharge||0)===0?"#15803D":"#555",
                  fontWeight:500 }}>
                  {Number(order.deliveryCharge||0)===0?"FREE":`₹${fmt(order.deliveryCharge)}`}
                </span>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between",
                paddingTop:12, borderTop:"1px solid rgba(26,26,46,0.1)" }}>
                <span style={{ fontFamily:SERIF, fontSize:17, fontWeight:700, color:"#1A1A2E" }}>
                  Grand Total
                </span>
                <span style={{ fontFamily:SERIF, fontSize:20, fontWeight:700, color:"#1A1A2E" }}>
                  ₹{fmt(displayTotal)}
                </span>
              </div>
              <p style={{ fontFamily:SANS, fontSize:11, color:"#B0A99E",
                textAlign:"right", marginTop:4 }}>Prices inclusive of GST</p>
            </div>
          </motion.div>
        )}

        {/* CTA buttons */}
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.38}}
          style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
          <Link to="/products"
            style={{ flex:1, minWidth:200, padding:"15px 24px", background:"#800000",
              color:"#FFFFF0", textDecoration:"none", fontFamily:SANS, fontSize:12,
              letterSpacing:"0.16em", textTransform:"uppercase", fontWeight:700,
              textAlign:"center", display:"block", borderRadius:3 }}
            onMouseEnter={e=>e.currentTarget.style.background="#6B0000"}
            onMouseLeave={e=>e.currentTarget.style.background="#800000"}>
            Continue Shopping
          </Link>
          <Link to="/orders"
            style={{ flex:1, minWidth:200, padding:"15px 24px", background:"transparent",
              color:"#1A1A2E", textDecoration:"none", fontFamily:SANS, fontSize:12,
              letterSpacing:"0.16em", textTransform:"uppercase", fontWeight:600,
              textAlign:"center", display:"block",
              border:"1.5px solid rgba(26,26,46,0.25)", borderRadius:3 }}
            onMouseEnter={e=>{e.currentTarget.style.background="#1A1A2E"; e.currentTarget.style.color="#FFFFF0";}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#1A1A2E";}}>
            Track My Orders
          </Link>
        </motion.div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
      `}</style>
    </div>
  );
}

// Reads backend timestamps from OrderResponse
function getTimestamp(order, statusKey) {
  const map = {
    PLACED:    order.createdAt,
    CONFIRMED: order.confirmedAt,
    PACKED:    order.packedAt,
    SHIPPED:   order.shippedAt,
    DELIVERED: order.deliveredAt,
  };
  const ts = map[statusKey];
  if (!ts) return null;
  return new Date(ts).toLocaleDateString("en-IN",
    { day:"numeric", month:"short" });
}

function PaymentBadge({ paymentMethod, paymentStatus }) {
  const config = {
    PENDING:              { label:"COD · Pending",     bg:"rgba(212,175,55,0.12)", color:"#A87C00",  border:"rgba(212,175,55,0.3)"  },
    PENDING_VERIFICATION: { label:"UPI · Verifying",   bg:"rgba(251,191,36,0.15)", color:"#FBBF24",  border:"rgba(251,191,36,0.3)"  },
    VERIFIED:             { label:"UPI · Verified",    bg:"rgba(52,211,153,0.12)", color:"#34D399",  border:"rgba(52,211,153,0.3)"  },
    COMPLETED:            { label:"Paid",               bg:"rgba(52,211,153,0.12)", color:"#34D399",  border:"rgba(52,211,153,0.3)"  },
    FAILED:               { label:"Payment Failed",    bg:"rgba(239,68,68,0.12)",  color:"#F87171",  border:"rgba(239,68,68,0.3)"   },
    REFUNDED:             { label:"Refunded",           bg:"rgba(99,102,241,0.12)", color:"#818CF8",  border:"rgba(99,102,241,0.3)"  },
  };
  const c = config[paymentStatus] || { label:paymentMethod, bg:"rgba(255,255,240,0.1)", color:"#FFFFF0", border:"rgba(255,255,240,0.2)" };
  return (
    <span style={{ padding:"5px 12px", fontFamily:"'DM Sans',sans-serif", fontSize:12,
      fontWeight:700, background:c.bg, color:c.color, border:`1px solid ${c.border}`,
      borderRadius:3 }}>{c.label}</span>
  );
}