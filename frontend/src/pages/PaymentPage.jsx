// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import Navbar from "../components/Navbar";

// const SERIF = "'Cormorant Garamond', Georgia, serif";
// const SANS  = "'DM Sans', 'Segoe UI', sans-serif";

// // ─── Replace this URL with your actual UPI QR image hosted on Cloudinary ───
// // For now uses a placeholder QR. Upload your UPI QR to Cloudinary and paste the URL below.
// const UPI_QR_URL   = "/upi-qr-placeholder.png";  // ← replace with your Cloudinary URL
// const UPI_ID       = "aboorvasilks@upi";           // ← replace with your UPI ID
// const SHOP_NAME    = "Sri Aboorva Silks";

// function CheckoutStepper({ current }) {
//   const steps = ["BAG","ADDRESS","PAYMENT"];
//   return (
//     <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:0, marginBottom:44 }}>
//       {steps.map((step, i) => {
//         const done   = i < current;
//         const active = i === current;
//         return (
//           <div key={step} style={{ display:"flex", alignItems:"center" }}>
//             <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
//               <div style={{ width:28, height:28, borderRadius:"50%", display:"flex",
//                 alignItems:"center", justifyContent:"center",
//                 border:`2px solid ${active?"#800000":done?"#800000":"#C9C4BB"}`,
//                 background:done?"#800000":"transparent", transition:"all 0.3s" }}>
//                 {done
//                   ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
//                   : <div style={{ width:8, height:8, borderRadius:"50%", background:active?"#800000":"#C9C4BB" }}/>
//                 }
//               </div>
//               <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em",
//                 color:active?"#800000":done?"#800000":"#B0A99E", fontFamily:SANS }}>
//                 {step}
//               </span>
//             </div>
//             {i < steps.length - 1 && (
//               <div style={{ width:100, height:1, margin:"0 8px", marginBottom:16,
//                 background:done?"#800000":"#D9D4CC", transition:"background 0.3s" }}/>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default function PaymentPage() {
//   const navigate        = useNavigate();
//   const fileRef         = useRef(null);
//   const [order, setOrder]       = useState(null);
//   const [payMethod, setPayMethod] = useState("upi");  // "upi" | "cod"
//   const [proofFile, setProofFile] = useState(null);
//   const [proofPreview, setProofPreview] = useState(null);
//   const [utrNumber,  setUtrNumber]  = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [errors,     setErrors]     = useState({});
//   const [copied,     setCopied]     = useState(false);

//   useEffect(() => {
//     const stored = localStorage.getItem("pendingOrder");
//     if (!stored) { navigate("/cart"); return; }
//     setOrder(JSON.parse(stored));
//   }, []);

//   const fmt = (n) => Number(n||0).toLocaleString("en-IN");

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (file.size > 5 * 1024 * 1024) { alert("File too large. Max 5MB."); return; }
//     setProofFile(file);
//     const reader = new FileReader();
//     reader.onload = (ev) => setProofPreview(ev.target.result);
//     reader.readAsDataURL(file);
//     setErrors(er => ({...er, proof:""}));
//   };

//   const copyUpiId = () => {
//     navigator.clipboard.writeText(UPI_ID);
//     setCopied(true);
//     setTimeout(()=>setCopied(false), 2000);
//   };

//   const validate = () => {
//     const e = {};
//     if (payMethod === "upi") {
//       if (!utrNumber.trim()) e.utr = "Please enter the UTR / transaction reference number";
//       if (!proofFile)        e.proof = "Please upload screenshot / proof of payment";
//     }
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validate()) return;
//     setSubmitting(true);
//     try {
//       // TODO: Replace with real API call when orders backend is ready:
//       // const formData = new FormData();
//       // formData.append("addressJson", JSON.stringify(order.address));
//       // formData.append("paymentMethod", payMethod);
//       // if (payMethod === "upi") {
//       //   formData.append("utrNumber", utrNumber);
//       //   formData.append("paymentProof", proofFile);
//       // }
//       // const response = await orderAPI.placeOrder(formData);
//       // localStorage.setItem("lastOrder", JSON.stringify(response));

//       // For now — store mock order confirmation
//       const mockOrder = {
//         orderId: "ORD-" + Date.now().toString().slice(-6),
//         date: new Date().toISOString(),
//         grandTotal: order.grandTotal,
//         paymentMethod: payMethod,
//         utrNumber: payMethod === "upi" ? utrNumber : null,
//         address: order.address,
//         items: order.items,
//         status: payMethod === "cod" ? "confirmed" : "pending_verification",
//       };
//       localStorage.setItem("lastOrder",    JSON.stringify(mockOrder));
//       localStorage.removeItem("pendingOrder");
//       navigate("/order-confirmation");
//     } catch (e) {
//       alert(e.response?.data?.message || "Failed to place order. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (!order) return null;

//   return (
//     <div style={{ fontFamily:SANS, background:"#FFFFF0", minHeight:"100vh" }}>
//       <Navbar />
//       <div style={{ maxWidth:1100, margin:"0 auto", padding:"96px 24px 72px" }}>

//         {/* Header */}
//         <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}}
//           style={{ marginBottom:36, textAlign:"center" }}>
//           <p style={{ fontFamily:SANS, fontSize:11, letterSpacing:"0.32em", textTransform:"uppercase",
//             color:"#D4AF37", marginBottom:8, fontWeight:600 }}>Sri Aboorva Silks</p>
//           <h1 style={{ fontFamily:SERIF, fontSize:42, fontWeight:700, color:"#1A1A2E", lineHeight:1 }}>
//             Payment
//           </h1>
//         </motion.div>

//         <CheckoutStepper current={2} />

//         <div style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:44, alignItems:"start" }}>

//           {/* ── PAYMENT METHODS ── */}
//           <motion.div initial={{opacity:0,x:-16}} animate={{opacity:1,x:0}} transition={{delay:0.05}}>

//             {/* Method selector */}
//             <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:28 }}>
//               {[
//                 { key:"upi", label:"UPI Payment", sub:"Google Pay · PhonePe · Paytm · Any UPI",
//                   icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg> },
//                 { key:"cod", label:"Cash on Delivery", sub:"Pay when your order arrives",
//                   icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5v1.25a.75.75 0 11-1.5 0V16.5c-1.24-.26-2.5-1.04-2.5-2.5 0-.27.22-.5.5-.5s.5.22.5.5c0 .83.9 1.5 2 1.5s2-.67 2-1.5c0-.9-.9-1.25-2.08-1.6C10.6 12.11 9 11.57 9 9.5 9 8.04 10.26 7.26 11.5 7v-1.25a.75.75 0 011.5 0V7c1.24.26 2.5 1.04 2.5 2.5 0 .27-.22.5-.5.5s-.5-.22-.5-.5c0-.83-.9-1.5-2-1.5s-2 .67-2 1.5c0 .9.9 1.25 2.08 1.6C13.4 11.89 15 12.43 15 14.5c0 1.46-1.26 2.24-2.5 2.5z"/></svg> },
//               ].map(m => (
//                 <button key={m.key} onClick={()=>setPayMethod(m.key)}
//                   style={{ padding:"18px", textAlign:"left", cursor:"pointer",
//                     background:payMethod===m.key?"#1A1A2E":"white",
//                     border:`2px solid ${payMethod===m.key?"#1A1A2E":"rgba(26,26,46,0.15)"}`,
//                     transition:"all 0.2s", borderRadius:4 }}>
//                   <div style={{ color:payMethod===m.key?"#D4AF37":"#1A1A2E",
//                     marginBottom:10 }}>{m.icon}</div>
//                   <p style={{ fontFamily:SERIF, fontSize:18, fontWeight:700,
//                     color:payMethod===m.key?"#FFFFF0":"#1A1A2E", marginBottom:4 }}>{m.label}</p>
//                   <p style={{ fontFamily:SANS, fontSize:12,
//                     color:payMethod===m.key?"rgba(255,255,240,0.5)":"#888" }}>{m.sub}</p>
//                 </button>
//               ))}
//             </div>

//             {/* ── UPI SECTION ── */}
//             <AnimatePresence mode="wait">
//               {payMethod === "upi" && (
//                 <motion.div key="upi"
//                   initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
//                   transition={{duration:0.22}}>

//                   {/* UPI QR Card */}
//                   <div style={{ background:"white", border:"1px solid rgba(26,26,46,0.12)",
//                     padding:"28px", marginBottom:24, textAlign:"center" }}>

//                     <p style={{ fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:"0.2em",
//                       textTransform:"uppercase", color:"#D4AF37", marginBottom:20 }}>
//                       Scan & Pay
//                     </p>

//                     {/* QR Code */}
//                     <div style={{ display:"inline-flex", padding:16, background:"white",
//                       border:"2px solid #1A1A2E", marginBottom:18 }}>
//                       {UPI_QR_URL !== "/upi-qr-placeholder.png"
//                         ? <img src={UPI_QR_URL} alt="UPI QR Code"
//                             style={{ width:200, height:200, display:"block" }}/>
//                         : (
//                           /* Placeholder QR grid when actual image not set */
//                           <div style={{ width:200, height:200, background:"#1A1A2E",
//                             display:"flex", flexDirection:"column",
//                             alignItems:"center", justifyContent:"center", gap:10 }}>
//                             <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
//                               stroke="#D4AF37" strokeWidth="1.4">
//                               <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
//                               <rect x="3" y="14" width="7" height="7"/>
//                               <rect x="14" y="14" width="3" height="3"/><rect x="19" y="14" width="2" height="2"/>
//                               <rect x="14" y="19" width="2" height="2"/><rect x="18" y="18" width="3" height="3"/>
//                             </svg>
//                             <p style={{ fontFamily:SANS, fontSize:11, color:"rgba(255,255,240,0.5)",
//                               textAlign:"center", lineHeight:1.4, maxWidth:160 }}>
//                               Upload your UPI QR image to<br/>
//                               <code style={{ color:"#D4AF37", fontSize:10 }}>UPI_QR_URL</code><br/>
//                               in PaymentPage.jsx
//                             </p>
//                           </div>
//                         )
//                       }
//                     </div>

//                     {/* UPI ID copy */}
//                     <div style={{ display:"flex", alignItems:"center", justifyContent:"center",
//                       gap:10, marginBottom:8 }}>
//                       <p style={{ fontFamily:SERIF, fontSize:18, color:"#1A1A2E", fontWeight:600 }}>
//                         {UPI_ID}
//                       </p>
//                       <button onClick={copyUpiId}
//                         style={{ padding:"5px 12px", background:copied?"#1A1A2E":"transparent",
//                           border:"1px solid rgba(26,26,46,0.25)", cursor:"pointer",
//                           fontFamily:SANS, fontSize:11, fontWeight:600,
//                           color:copied?"#FFFFF0":"#888", transition:"all 0.2s", borderRadius:3 }}>
//                         {copied ? "✓ Copied!" : "Copy"}
//                       </button>
//                     </div>
//                     <p style={{ fontFamily:SANS, fontSize:12, color:"#888" }}>
//                       Pay exactly <strong style={{ color:"#800000", fontFamily:SERIF, fontSize:16 }}>
//                         ₹{fmt(order.grandTotal)}
//                       </strong> to this UPI ID
//                     </p>

//                     {/* Steps */}
//                     <div style={{ marginTop:22, display:"grid", gridTemplateColumns:"repeat(3,1fr)",
//                       gap:12, borderTop:"1px solid rgba(26,26,46,0.08)", paddingTop:20 }}>
//                       {[
//                         { n:"1", text:"Scan the QR code or copy UPI ID" },
//                         { n:"2", text:"Pay ₹" + fmt(order.grandTotal) + " using any UPI app" },
//                         { n:"3", text:"Upload screenshot below" },
//                       ].map(s => (
//                         <div key={s.n} style={{ textAlign:"center" }}>
//                           <div style={{ width:28, height:28, borderRadius:"50%",
//                             background:"#1A1A2E", color:"#D4AF37",
//                             fontFamily:SERIF, fontSize:15, fontWeight:700,
//                             display:"flex", alignItems:"center", justifyContent:"center",
//                             margin:"0 auto 8px" }}>{s.n}</div>
//                           <p style={{ fontFamily:SANS, fontSize:12, color:"#666",
//                             lineHeight:1.4 }}>{s.text}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* UTR Number */}
//                   <div style={{ marginBottom:20 }}>
//                     <label style={{ fontFamily:SANS, fontSize:11, fontWeight:700,
//                       letterSpacing:"0.16em", textTransform:"uppercase", color:"#888",
//                       marginBottom:8, display:"block" }}>
//                       UTR / Transaction Reference Number *
//                     </label>
//                     <input type="text" value={utrNumber}
//                       onChange={e=>{setUtrNumber(e.target.value); setErrors(er=>({...er,utr:""}));}}
//                       placeholder="12-digit UTR or transaction ID from your UPI app"
//                       style={{ width:"100%", padding:"13px 16px",
//                         background:"white", fontFamily:SANS, fontSize:14, color:"#1A1A2E",
//                         border:`1.5px solid ${errors.utr?"#B91C1C":"#D9D4CC"}`,
//                         outline:"none", borderRadius:3, transition:"border-color 0.15s" }}
//                       onFocus={e=>e.target.style.borderColor="#800000"}
//                       onBlur={e=>e.target.style.borderColor=errors.utr?"#B91C1C":"#D9D4CC"}/>
//                     {errors.utr && (
//                       <p style={{ fontFamily:SANS, fontSize:12, color:"#B91C1C", marginTop:5 }}>
//                         {errors.utr}
//                       </p>
//                     )}
//                   </div>

//                   {/* Payment proof upload */}
//                   <div>
//                     <label style={{ fontFamily:SANS, fontSize:11, fontWeight:700,
//                       letterSpacing:"0.16em", textTransform:"uppercase", color:"#888",
//                       marginBottom:8, display:"block" }}>
//                       Payment Screenshot / Proof *
//                     </label>
//                     <input ref={fileRef} type="file" accept="image/*,.pdf"
//                       onChange={handleFileChange} style={{ display:"none" }}/>

//                     {proofPreview ? (
//                       <div style={{ position:"relative", border:"1.5px solid rgba(26,26,46,0.2)",
//                         borderRadius:3, overflow:"hidden" }}>
//                         <img src={proofPreview} alt="Payment proof"
//                           style={{ width:"100%", maxHeight:240, objectFit:"contain",
//                             background:"#f9f6ef", display:"block" }}/>
//                         <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
//                           padding:"10px 14px", background:"white",
//                           borderTop:"1px solid rgba(26,26,46,0.08)" }}>
//                           <p style={{ fontFamily:SANS, fontSize:13, color:"#1A1A2E", fontWeight:500 }}>
//                             {proofFile?.name}
//                           </p>
//                           <button onClick={()=>{setProofFile(null); setProofPreview(null);}}
//                             style={{ background:"none", border:"none", cursor:"pointer",
//                               fontFamily:SANS, fontSize:12, color:"#B91C1C", fontWeight:600 }}>
//                             Remove
//                           </button>
//                         </div>
//                       </div>
//                     ) : (
//                       <div onClick={()=>fileRef.current?.click()}
//                         style={{ border:`2px dashed ${errors.proof?"#B91C1C":"rgba(26,26,46,0.2)"}`,
//                           borderRadius:3, padding:"32px 20px", textAlign:"center",
//                           cursor:"pointer", transition:"all 0.2s", background:"white" }}
//                         onMouseEnter={e=>{e.currentTarget.style.borderColor="#800000"; e.currentTarget.style.background="#FFF8F8";}}
//                         onMouseLeave={e=>{e.currentTarget.style.borderColor=errors.proof?"#B91C1C":"rgba(26,26,46,0.2)"; e.currentTarget.style.background="white";}}>
//                         <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
//                           stroke="rgba(26,26,46,0.25)" strokeWidth="1.5"
//                           style={{ display:"block", margin:"0 auto 14px" }}>
//                           <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
//                         </svg>
//                         <p style={{ fontFamily:SERIF, fontSize:18, color:"#1A1A2E", marginBottom:6 }}>
//                           Upload payment screenshot
//                         </p>
//                         <p style={{ fontFamily:SANS, fontSize:13, color:"#888" }}>
//                           Click to browse · PNG, JPG, PDF · Max 5MB
//                         </p>
//                       </div>
//                     )}
//                     {errors.proof && (
//                       <p style={{ fontFamily:SANS, fontSize:12, color:"#B91C1C", marginTop:5 }}>
//                         {errors.proof}
//                       </p>
//                     )}
//                   </div>
//                 </motion.div>
//               )}

//               {/* ── COD SECTION ── */}
//               {payMethod === "cod" && (
//                 <motion.div key="cod"
//                   initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
//                   transition={{duration:0.22}}>
//                   <div style={{ background:"white", border:"1px solid rgba(26,26,46,0.12)",
//                     padding:"32px", textAlign:"center", borderRadius:4 }}>
//                     <div style={{ width:64, height:64, borderRadius:"50%",
//                       background:"#F0FFF4", border:"1px solid #BBF7D0",
//                       display:"flex", alignItems:"center", justifyContent:"center",
//                       margin:"0 auto 20px" }}>
//                       <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
//                         stroke="#15803D" strokeWidth="1.5">
//                         <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
//                       </svg>
//                     </div>
//                     <h3 style={{ fontFamily:SERIF, fontSize:24, fontWeight:700,
//                       color:"#1A1A2E", marginBottom:10 }}>Cash on Delivery</h3>
//                     <p style={{ fontFamily:SANS, fontSize:14, color:"#555",
//                       lineHeight:1.6, maxWidth:400, margin:"0 auto 20px" }}>
//                       You'll pay <strong style={{ color:"#800000" }}>₹{fmt(order.grandTotal)}</strong> in
//                       cash when your order is delivered to your doorstep. No advance payment required.
//                     </p>
//                     <div style={{ display:"flex", gap:10, justifyContent:"center",
//                       padding:"16px", background:"#F9F6EF",
//                       border:"1px solid rgba(212,175,55,0.2)" }}>
//                       {["Easy & Safe","No Advance","Pay at Door"].map(t => (
//                         <span key={t} style={{ fontFamily:SANS, fontSize:12,
//                           color:"#888", padding:"0 14px",
//                           borderRight:"1px solid rgba(26,26,46,0.1)",
//                           lastChild:{borderRight:"none"} }}>{t}</span>
//                       ))}
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>

//           {/* ── ORDER SUMMARY SIDEBAR ── */}
//           <motion.div initial={{opacity:0,x:16}} animate={{opacity:1,x:0}} transition={{delay:0.1}}
//             style={{ position:"sticky", top:100 }}>

//             {/* Delivery address recap */}
//             <div style={{ background:"white", border:"1px solid rgba(26,26,46,0.12)",
//               padding:"20px", marginBottom:14, borderRadius:3 }}>
//               <p style={{ fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:"0.16em",
//                 textTransform:"uppercase", color:"#888", marginBottom:12 }}>Delivering to</p>
//               <p style={{ fontFamily:SERIF, fontSize:16, fontWeight:700,
//                 color:"#1A1A2E", marginBottom:4 }}>{order.address?.fullName}</p>
//               <p style={{ fontFamily:SANS, fontSize:13, color:"#555", lineHeight:1.5 }}>
//                 {order.address?.addressLine1}
//                 {order.address?.addressLine2 && `, ${order.address.addressLine2}`}
//                 {`, ${order.address?.city}, ${order.address?.state} – ${order.address?.pincode}`}
//               </p>
//               <p style={{ fontFamily:SANS, fontSize:13, color:"#888", marginTop:4 }}>
//                 📞 {order.address?.phone}
//               </p>
//             </div>

//             {/* Summary */}
//             <div style={{ background:"#1A1A2E", padding:"26px 22px", borderRadius:3, marginBottom:14 }}>
//               <h3 style={{ fontFamily:SERIF, fontSize:20, fontWeight:700,
//                 color:"#FFFFF0", marginBottom:20 }}>Order Summary</h3>
//               <div style={{ display:"flex", flexDirection:"column", gap:12,
//                 paddingBottom:16, borderBottom:"1px solid rgba(255,255,240,0.1)", marginBottom:14 }}>
//                 {[
//                   { l:"Subtotal", v:`₹${fmt(order.subtotal)}` },
//                   { l:"Delivery", v:order.shipping===0?"FREE":`₹${fmt(order.shipping)}`, vc:order.shipping===0?"#2ECC71":"#FFFFF0" },
//                   { l:"GST (5%)", v:`+₹${fmt(order.gst)}`, vc:"#D4AF37" },
//                 ].map((r,i) => (
//                   <div key={i} style={{ display:"flex", justifyContent:"space-between" }}>
//                     <span style={{ fontFamily:SANS, fontSize:13, color:"rgba(255,255,240,0.5)" }}>{r.l}</span>
//                     <span style={{ fontFamily:SANS, fontSize:13, color:r.vc||"#FFFFF0", fontWeight:500 }}>{r.v}</span>
//                   </div>
//                 ))}
//               </div>
//               <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
//                 <span style={{ fontFamily:SERIF, fontSize:17, color:"#FFFFF0", fontWeight:600 }}>Grand Total</span>
//                 <span style={{ fontFamily:SERIF, fontSize:26, fontWeight:700, color:"#D4AF37" }}>
//                   ₹{fmt(order.grandTotal)}
//                 </span>
//               </div>
//             </div>

//             {/* Place order button */}
//             <motion.button onClick={handleSubmit} disabled={submitting}
//               whileHover={{ background:"#6B0000" }}
//               style={{ width:"100%", padding:"17px", background:"#800000", color:"#FFFFF0",
//                 border:"none", cursor:submitting?"wait":"pointer",
//                 fontFamily:SANS, fontSize:12, letterSpacing:"0.18em", textTransform:"uppercase",
//                 fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center",
//                 gap:10, opacity:submitting?0.7:1, transition:"all 0.2s", borderRadius:3 }}>
//               {submitting ? (
//                 <><div style={{ width:16, height:16, border:"2px solid rgba(255,255,240,0.4)",
//                   borderTopColor:"#FFFFF0", borderRadius:"50%", animation:"spin 0.8s linear infinite" }}/> Processing…</>
//               ) : (
//                 <>{payMethod==="cod"?"Place Order · Pay at Door":"Confirm & Place Order"}
//                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
//                     stroke="currentColor" strokeWidth="2.5">
//                     <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
//                   </svg>
//                 </>
//               )}
//             </motion.button>

//             <p style={{ fontFamily:SANS, fontSize:11, color:"#AAA", textAlign:"center",
//               marginTop:12, lineHeight:1.5 }}>
//               {payMethod==="upi"
//                 ? "Your order will be confirmed after payment verification (usually within 2 hours)"
//                 : "Your order will be confirmed immediately. Pay when delivered."}
//             </p>
//           </motion.div>
//         </div>
//       </div>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
//         *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
//         @keyframes spin { to { transform:rotate(360deg); } }
//       `}</style>
//     </div>
//   );
// }




// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import Navbar from "../components/Navbar";
// import { orderAPI, uploadPaymentScreenshot } from "../api/order.api";

// const SERIF = "'Cormorant Garamond', Georgia, serif";
// const SANS  = "'DM Sans', 'Segoe UI', sans-serif";

// // ── CONFIGURE THESE ───────────────────────────────────────────────────────
// // Upload your UPI QR image to Cloudinary and paste the URL here.
// const UPI_QR_URL = "https://res.cloudinary.com/dvorkktbg/image/upload/v1772989378/1000252153_snu3mp.png";                    // ← paste your Cloudinary URL
// const UPI_ID     = "aboorvasilks@upi";     // ← your actual UPI ID
// // ─────────────────────────────────────────────────────────────────────────

// function Stepper({ current }) {
//   const steps = ["BAG","ADDRESS","PAYMENT"];
//   return (
//     <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:0, marginBottom:44 }}>
//       {steps.map((step, i) => {
//         const done = i < current, active = i === current;
//         return (
//           <div key={step} style={{ display:"flex", alignItems:"center" }}>
//             <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
//               <div style={{ width:28, height:28, borderRadius:"50%", display:"flex",
//                 alignItems:"center", justifyContent:"center",
//                 border:`2px solid ${active||done?"#800000":"#C9C4BB"}`,
//                 background:done?"#800000":"transparent" }}>
//                 {done
//                   ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
//                   : <div style={{ width:8, height:8, borderRadius:"50%", background:active?"#800000":"#C9C4BB" }}/>}
//               </div>
//               <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em",
//                 color:active||done?"#800000":"#B0A99E", fontFamily:SANS }}>{step}</span>
//             </div>
//             {i < 2 && <div style={{ width:100, height:1, margin:"0 8px", marginBottom:16,
//               background:done?"#800000":"#D9D4CC" }}/>}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default function PaymentPage() {
//   const navigate     = useNavigate();
//   const fileRef      = useRef(null);

//   // checkoutData set by CheckoutPage:
//   // { addressId, address, subtotal, shipping, grandTotal, items }
//   const [checkout,     setCheckout]     = useState(null);
//   const [payMethod,    setPayMethod]    = useState("UPI");
//   const [utrNumber,    setUtrNumber]    = useState("");
//   const [proofFile,    setProofFile]    = useState(null);
//   const [proofPreview, setProofPreview] = useState(null);
//   const [uploading,    setUploading]    = useState(false);
//   const [submitting,   setSubmitting]   = useState(false);
//   const [errors,       setErrors]       = useState({});
//   const [copied,       setCopied]       = useState(false);
//   const [notes,        setNotes]        = useState("");

//   useEffect(() => {
//     const stored = localStorage.getItem("checkoutData");
//     if (!stored) { navigate("/cart"); return; }
//     setCheckout(JSON.parse(stored));
//   }, []);

//   const fmt = n => Number(n||0).toLocaleString("en-IN");

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (file.size > 5 * 1024 * 1024) { alert("File too large. Max 5MB."); return; }
//     setProofFile(file);
//     const reader = new FileReader();
//     reader.onload = ev => setProofPreview(ev.target.result);
//     reader.readAsDataURL(file);
//     setErrors(er => ({...er, proof:""}));
//   };

//   const copyUpiId = () => {
//     navigator.clipboard.writeText(UPI_ID);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2200);
//   };

//   const validate = () => {
//     const e = {};
//     if (payMethod === "UPI") {
//       if (!utrNumber.trim()) e.utr   = "Please enter the UTR / transaction reference number";
//       if (!proofFile)        e.proof = "Please upload your payment screenshot";
//     }
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handlePlaceOrder = async () => {
//     if (!validate()) return;
//     setSubmitting(true);
//     try {
//       let screenshotUrl = null;

//       // Step 1: Upload screenshot to Cloudinary if UPI payment
//       if (payMethod === "UPI" && proofFile) {
//         setUploading(true);
//         try {
//           screenshotUrl = await uploadPaymentScreenshot(proofFile);
//         } catch (err) {
//           // If upload fails, still allow order with no screenshotUrl
//           // (admin can follow up manually)
//           console.warn("Screenshot upload failed:", err);
//         } finally {
//           setUploading(false);
//         }
//       }

//       // Step 2: Place order
//       // grandTotal from backend = subtotal + deliveryCharge (no GST)
//       // Backend calculates it independently from cart — we just send addressId
//       const orderReq = {
//         addressId:     checkout.addressId,
//         paymentMethod: payMethod,                  // "UPI" or "COD"
//         utrNumber:     payMethod === "UPI" ? utrNumber.trim() : null,
//         screenshotUrl: screenshotUrl,
//         notes:         notes.trim() || null,
//       };

//       const orderResponse = await orderAPI.placeOrder(orderReq);

//       // Step 3: Store confirmed order response and clear checkout data
//       localStorage.setItem("lastOrder", JSON.stringify(orderResponse));
//       localStorage.removeItem("checkoutData");

//       navigate("/order-confirmation");
//     } catch (err) {
//       const msg = err.response?.data?.message || err.message || "Failed to place order. Please try again.";
//       alert(msg);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (!checkout) return null;

//   const { subtotal, shipping, grandTotal, address, items } = checkout;

//   return (
//     <div style={{ fontFamily:SANS, background:"#FFFFF0", minHeight:"100vh" }}>
//       <Navbar/>
//       <div style={{ maxWidth:1100, margin:"0 auto", padding:"96px 24px 72px" }}>

//         <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}}
//           style={{ textAlign:"center", marginBottom:36 }}>
//           <p style={{ fontFamily:SANS, fontSize:11, letterSpacing:"0.32em", textTransform:"uppercase",
//             color:"#D4AF37", marginBottom:8, fontWeight:600 }}>Sri Aboorva Silks</p>
//           <h1 style={{ fontFamily:SERIF, fontSize:42, fontWeight:700, color:"#1A1A2E", lineHeight:1 }}>
//             Payment
//           </h1>
//         </motion.div>

//         <Stepper current={2}/>

//         <div style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:44, alignItems:"start" }}>

//           {/* ── LEFT: Payment method + UPI / COD section ── */}
//           <motion.div initial={{opacity:0,x:-16}} animate={{opacity:1,x:0}} transition={{delay:0.05}}>

//             {/* Method selector */}
//             <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:28 }}>
//               {[
//                 { key:"UPI", label:"UPI Payment",
//                   sub:"Google Pay · PhonePe · Paytm",
//                   icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg> },
//                 { key:"COD", label:"Cash on Delivery",
//                   sub:"Pay when order arrives",
//                   icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
//               ].map(m => (
//                 <button key={m.key} onClick={() => setPayMethod(m.key)}
//                   style={{ padding:"20px", textAlign:"left", cursor:"pointer",
//                     background:payMethod===m.key?"#1A1A2E":"white",
//                     border:`2px solid ${payMethod===m.key?"#1A1A2E":"rgba(26,26,46,0.15)"}`,
//                     transition:"all 0.2s", borderRadius:4 }}>
//                   <div style={{ color:payMethod===m.key?"#D4AF37":"#1A1A2E", marginBottom:10 }}>
//                     {m.icon}
//                   </div>
//                   <p style={{ fontFamily:SERIF, fontSize:19, fontWeight:700,
//                     color:payMethod===m.key?"#FFFFF0":"#1A1A2E", marginBottom:4 }}>{m.label}</p>
//                   <p style={{ fontFamily:SANS, fontSize:12,
//                     color:payMethod===m.key?"rgba(255,255,240,0.5)":"#888" }}>{m.sub}</p>
//                 </button>
//               ))}
//             </div>

//             <AnimatePresence mode="wait">

//               {/* ── UPI Section ── */}
//               {payMethod === "UPI" && (
//                 <motion.div key="upi"
//                   initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
//                   transition={{duration:0.2}}>

//                   {/* QR card */}
//                   <div style={{ background:"white", border:"1px solid rgba(26,26,46,0.12)",
//                     padding:"32px", marginBottom:22, textAlign:"center" }}>
//                     <p style={{ fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:"0.2em",
//                       textTransform:"uppercase", color:"#D4AF37", marginBottom:22 }}>Scan & Pay</p>

//                     {/* QR Image */}
//                     <div style={{ display:"inline-flex", padding:14, background:"white",
//                       border:"2px solid #1A1A2E", marginBottom:20 }}>
//                       {UPI_QR_URL
//                         ? <img src={UPI_QR_URL} alt="UPI QR Code"
//                             style={{ width:200, height:200, display:"block" }}/>
//                         : <div style={{ width:200, height:200, background:"#1A1A2E",
//                             display:"flex", flexDirection:"column",
//                             alignItems:"center", justifyContent:"center", gap:14 }}>
//                             {/* Placeholder QR pattern */}
//                             <svg width="64" height="64" viewBox="0 0 24 24" fill="none"
//                               stroke="#D4AF37" strokeWidth="1.2">
//                               <rect x="3" y="3" width="7" height="7" rx="1"/>
//                               <rect x="4" y="4" width="5" height="5" fill="#D4AF37" stroke="none"/>
//                               <rect x="14" y="3" width="7" height="7" rx="1"/>
//                               <rect x="15" y="4" width="5" height="5" fill="#D4AF37" stroke="none"/>
//                               <rect x="3" y="14" width="7" height="7" rx="1"/>
//                               <rect x="4" y="15" width="5" height="5" fill="#D4AF37" stroke="none"/>
//                               <rect x="14" y="14" width="3" height="3"/>
//                               <rect x="19" y="14" width="2" height="2"/>
//                               <rect x="14" y="19" width="2" height="2"/>
//                               <rect x="18" y="18" width="3" height="3"/>
//                             </svg>
//                             <p style={{ fontFamily:SANS, fontSize:11,
//                               color:"rgba(255,255,240,0.45)", textAlign:"center",
//                               lineHeight:1.5, maxWidth:150 }}>
//                               Set <code style={{ color:"#D4AF37", fontSize:10 }}>UPI_QR_URL</code>
//                               {" "}in PaymentPage.jsx
//                             </p>
//                           </div>
//                       }
//                     </div>

//                     {/* UPI ID + copy */}
//                     <div style={{ display:"flex", alignItems:"center",
//                       justifyContent:"center", gap:10, marginBottom:6 }}>
//                       <p style={{ fontFamily:SERIF, fontSize:20, fontWeight:700, color:"#1A1A2E" }}>
//                         {UPI_ID}
//                       </p>
//                       <button onClick={copyUpiId}
//                         style={{ padding:"5px 13px", background:copied?"#1A1A2E":"transparent",
//                           border:"1px solid rgba(26,26,46,0.25)", cursor:"pointer",
//                           fontFamily:SANS, fontSize:11, fontWeight:600,
//                           color:copied?"#FFFFF0":"#888",
//                           borderRadius:3, transition:"all 0.2s" }}>
//                         {copied ? "✓ Copied" : "Copy"}
//                       </button>
//                     </div>
//                     <p style={{ fontFamily:SANS, fontSize:13, color:"#888" }}>
//                       Pay exactly{" "}
//                       <strong style={{ fontFamily:SERIF, fontSize:17, color:"#800000" }}>
//                         ₹{fmt(grandTotal)}
//                       </strong>
//                       {" "}to this UPI ID
//                     </p>

//                     {/* Steps */}
//                     <div style={{ marginTop:24, display:"grid",
//                       gridTemplateColumns:"repeat(3,1fr)", gap:12,
//                       borderTop:"1px solid rgba(26,26,46,0.08)", paddingTop:22 }}>
//                       {[
//                         "Scan QR or copy UPI ID",
//                         `Pay ₹${fmt(grandTotal)} using any UPI app`,
//                         "Enter UTR & upload screenshot below",
//                       ].map((txt, i) => (
//                         <div key={i} style={{ textAlign:"center" }}>
//                           <div style={{ width:28, height:28, borderRadius:"50%",
//                             background:"#1A1A2E", color:"#D4AF37", fontFamily:SERIF,
//                             fontSize:14, fontWeight:700, display:"flex",
//                             alignItems:"center", justifyContent:"center",
//                             margin:"0 auto 8px" }}>{i+1}</div>
//                           <p style={{ fontFamily:SANS, fontSize:12, color:"#666",
//                             lineHeight:1.45 }}>{txt}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* UTR Number */}
//                   <div style={{ marginBottom:20 }}>
//                     <label style={{ fontFamily:SANS, fontSize:11, fontWeight:700,
//                       letterSpacing:"0.16em", textTransform:"uppercase", color:"#888",
//                       marginBottom:8, display:"block" }}>
//                       UTR / Transaction Reference Number *
//                     </label>
//                     <input type="text" value={utrNumber}
//                       onChange={e => { setUtrNumber(e.target.value); setErrors(er=>({...er,utr:""})); }}
//                       placeholder="Enter 12-digit UTR or transaction ID from your UPI app"
//                       style={{ width:"100%", padding:"12px 16px", background:"white",
//                         fontFamily:SANS, fontSize:14, color:"#1A1A2E",
//                         border:`1.5px solid ${errors.utr?"#B91C1C":"#D9D4CC"}`,
//                         outline:"none", borderRadius:3, transition:"border-color 0.15s" }}
//                       onFocus={e => e.target.style.borderColor = "#800000"}
//                       onBlur={e  => e.target.style.borderColor = errors.utr ? "#B91C1C" : "#D9D4CC"}/>
//                     {errors.utr && (
//                       <p style={{ fontFamily:SANS, fontSize:12, color:"#B91C1C", marginTop:5 }}>
//                         {errors.utr}
//                       </p>
//                     )}
//                   </div>

//                   {/* Screenshot upload */}
//                   <div>
//                     <label style={{ fontFamily:SANS, fontSize:11, fontWeight:700,
//                       letterSpacing:"0.16em", textTransform:"uppercase", color:"#888",
//                       marginBottom:8, display:"block" }}>
//                       Payment Screenshot *
//                     </label>
//                     <input ref={fileRef} type="file" accept="image/*,.pdf"
//                       onChange={handleFileChange} style={{ display:"none" }}/>

//                     {proofPreview ? (
//                       <div style={{ border:"1.5px solid rgba(26,26,46,0.15)", borderRadius:3,
//                         overflow:"hidden" }}>
//                         <img src={proofPreview} alt="Payment proof"
//                           style={{ width:"100%", maxHeight:260, objectFit:"contain",
//                             background:"#f9f6ef", display:"block" }}/>
//                         <div style={{ display:"flex", alignItems:"center",
//                           justifyContent:"space-between", padding:"10px 14px",
//                           background:"white", borderTop:"1px solid rgba(26,26,46,0.08)" }}>
//                           <p style={{ fontFamily:SANS, fontSize:13, color:"#555",
//                             fontWeight:500, overflow:"hidden", whiteSpace:"nowrap",
//                             textOverflow:"ellipsis", maxWidth:260 }}>
//                             {proofFile?.name}
//                           </p>
//                           <button onClick={() => { setProofFile(null); setProofPreview(null); }}
//                             style={{ fontFamily:SANS, fontSize:12, fontWeight:700, color:"#B91C1C",
//                               background:"none", border:"none", cursor:"pointer", flexShrink:0 }}>
//                             Remove
//                           </button>
//                         </div>
//                       </div>
//                     ) : (
//                       <div onClick={() => fileRef.current?.click()}
//                         style={{ border:`2px dashed ${errors.proof?"#B91C1C":"rgba(26,26,46,0.18)"}`,
//                           borderRadius:3, padding:"36px 20px", textAlign:"center",
//                           cursor:"pointer", background:"white", transition:"all 0.2s" }}
//                         onMouseEnter={e => { e.currentTarget.style.borderColor="#800000"; e.currentTarget.style.background="#FFF8F8"; }}
//                         onMouseLeave={e => { e.currentTarget.style.borderColor=errors.proof?"#B91C1C":"rgba(26,26,46,0.18)"; e.currentTarget.style.background="white"; }}>
//                         <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
//                           stroke="rgba(26,26,46,0.2)" strokeWidth="1.5"
//                           style={{ display:"block", margin:"0 auto 14px" }}>
//                           <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
//                         </svg>
//                         <p style={{ fontFamily:SERIF, fontSize:20, color:"#1A1A2E", marginBottom:6 }}>
//                           Upload payment screenshot
//                         </p>
//                         <p style={{ fontFamily:SANS, fontSize:13, color:"#999" }}>
//                           Click to browse · PNG / JPG / PDF · Max 5MB
//                         </p>
//                       </div>
//                     )}
//                     {errors.proof && (
//                       <p style={{ fontFamily:SANS, fontSize:12, color:"#B91C1C", marginTop:6 }}>
//                         {errors.proof}
//                       </p>
//                     )}
//                   </div>
//                 </motion.div>
//               )}

//               {/* ── COD Section ── */}
//               {payMethod === "COD" && (
//                 <motion.div key="cod"
//                   initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
//                   transition={{duration:0.2}}>
//                   <div style={{ background:"white", border:"1px solid rgba(26,26,46,0.12)",
//                     padding:"40px 32px", textAlign:"center", borderRadius:4 }}>
//                     <div style={{ width:68, height:68, borderRadius:"50%",
//                       background:"#F0FFF4", border:"1.5px solid #BBF7D0",
//                       display:"flex", alignItems:"center", justifyContent:"center",
//                       margin:"0 auto 22px" }}>
//                       <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
//                         stroke="#15803D" strokeWidth="1.5">
//                         <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
//                       </svg>
//                     </div>
//                     <h3 style={{ fontFamily:SERIF, fontSize:26, fontWeight:700,
//                       color:"#1A1A2E", marginBottom:12 }}>Cash on Delivery</h3>
//                     <p style={{ fontFamily:SANS, fontSize:14, color:"#555",
//                       lineHeight:1.65, maxWidth:400, margin:"0 auto 24px" }}>
//                       Pay{" "}
//                       <strong style={{ color:"#800000", fontFamily:SERIF, fontSize:18 }}>
//                         ₹{fmt(grandTotal)}
//                       </strong>
//                       {" "}in cash when your order is delivered to your doorstep.
//                       No advance payment required.
//                     </p>
//                     <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)",
//                       gap:1, background:"rgba(26,26,46,0.08)",
//                       border:"1px solid rgba(26,26,46,0.08)" }}>
//                       {["Easy & Safe","No Advance","Pay at Door"].map(t => (
//                         <div key={t} style={{ padding:"14px 8px", background:"#F9F6EF",
//                           textAlign:"center" }}>
//                           <p style={{ fontFamily:SANS, fontSize:12, color:"#888", fontWeight:500 }}>{t}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Optional notes */}
//             <div style={{ marginTop:22 }}>
//               <label style={{ fontFamily:SANS, fontSize:11, fontWeight:700,
//                 letterSpacing:"0.16em", textTransform:"uppercase", color:"#888",
//                 marginBottom:8, display:"block" }}>
//                 Order Notes <span style={{ fontWeight:400, textTransform:"none",
//                   letterSpacing:0, fontSize:11 }}>(optional)</span>
//               </label>
//               <textarea value={notes} onChange={e => setNotes(e.target.value)}
//                 placeholder="Special instructions, colour preference, delivery notes…"
//                 rows={3}
//                 style={{ width:"100%", padding:"12px 14px", background:"white",
//                   fontFamily:SANS, fontSize:14, color:"#1A1A2E",
//                   border:"1.5px solid #D9D4CC", outline:"none", borderRadius:3,
//                   resize:"vertical", transition:"border-color 0.15s" }}
//                 onFocus={e => e.target.style.borderColor="#800000"}
//                 onBlur={e  => e.target.style.borderColor="#D9D4CC"}/>
//             </div>
//           </motion.div>

//           {/* ── RIGHT: Summary sidebar ── */}
//           <motion.div initial={{opacity:0,x:16}} animate={{opacity:1,x:0}} transition={{delay:0.1}}
//             style={{ position:"sticky", top:100 }}>

//             {/* Delivery address recap */}
//             <div style={{ background:"white", border:"1px solid rgba(26,26,46,0.12)",
//               padding:"20px", marginBottom:14, borderRadius:3 }}>
//               <div style={{ display:"flex", justifyContent:"space-between",
//                 alignItems:"center", marginBottom:12 }}>
//                 <p style={{ fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:"0.16em",
//                   textTransform:"uppercase", color:"#888" }}>Delivering to</p>
//                 <button onClick={() => navigate("/checkout")}
//                   style={{ fontFamily:SANS, fontSize:12, fontWeight:600, color:"#800000",
//                     background:"transparent", border:"none", cursor:"pointer", padding:0 }}>
//                   Change
//                 </button>
//               </div>
//               <p style={{ fontFamily:SERIF, fontSize:16, fontWeight:700,
//                 color:"#1A1A2E", marginBottom:4 }}>{address?.fullName}</p>
//               <p style={{ fontFamily:SANS, fontSize:13, color:"#555", lineHeight:1.5 }}>
//                 {address?.addressLine1}
//                 {address?.addressLine2 && `, ${address.addressLine2}`}
//                 {`, ${address?.city}, ${address?.state} – ${address?.pincode}`}
//               </p>
//               <p style={{ fontFamily:SANS, fontSize:13, color:"#888", marginTop:4 }}>
//                 📞 {address?.phone}
//               </p>
//             </div>

//             {/* Price summary */}
//             <div style={{ background:"#1A1A2E", padding:"26px 22px",
//               marginBottom:14, borderRadius:3 }}>
//               <h3 style={{ fontFamily:SERIF, fontSize:20, fontWeight:700,
//                 color:"#FFFFF0", marginBottom:20 }}>Order Summary</h3>

//               <div style={{ display:"flex", flexDirection:"column", gap:12,
//                 paddingBottom:16, borderBottom:"1px solid rgba(255,255,240,0.1)", marginBottom:16 }}>
//                 <SR l="Subtotal"  v={`₹${fmt(subtotal)}`}/>
//                 {checkout.discount > 0 && (
//                   <SR l="Discount (10%)" v={`- ₹${fmt(checkout.discount)}`} vc="#16a34a" />
//                 )}
//                 <SR l="Delivery"  v={shipping===0?"FREE":`₹${fmt(shipping)}`}
//                   vc={shipping===0?"#2ECC71":"#FFFFF0"}/>
//                 {/* GST is inclusive in product prices — display note only */}
//                 <p style={{ fontFamily:SANS, fontSize:11,
//                   color:"rgba(255,255,240,0.3)", fontStyle:"italic" }}>
//                   Prices inclusive of GST
//                 </p>
//               </div>

//               <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
//                 <span style={{ fontFamily:SERIF, fontSize:17, color:"#FFFFF0", fontWeight:600 }}>
//                   Grand Total
//                 </span>
//                 <span style={{ fontFamily:SERIF, fontSize:26, fontWeight:700, color:"#D4AF37" }}>
//                   ₹{fmt(grandTotal)}
//                 </span>
//               </div>
//             </div>

//             {/* Items preview */}
//             {items?.length > 0 && (
//               <div style={{ background:"white", border:"1px solid rgba(26,26,46,0.1)",
//                 padding:"16px 20px", marginBottom:14 }}>
//                 <p style={{ fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:"0.14em",
//                   textTransform:"uppercase", color:"#888", marginBottom:12 }}>
//                   {items.length} item{items.length!==1?"s":""}
//                 </p>
//                 {items.slice(0,3).map((item, i) => (
//                   <div key={i} style={{ display:"flex", gap:10, marginBottom:10,
//                     paddingBottom:10, borderBottom:"1px solid rgba(26,26,46,0.07)" }}>
//                     {item.productImage && (
//                       <img src={item.productImage} alt={item.productName}
//                         style={{ width:40, height:50, objectFit:"cover", flexShrink:0 }}/>
//                     )}
//                     <div style={{ minWidth:0 }}>
//                       <p style={{ fontFamily:SERIF, fontSize:14, fontWeight:600, color:"#1A1A2E",
//                         overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis" }}>
//                         {item.productName}
//                       </p>
//                       <p style={{ fontFamily:SANS, fontSize:12, color:"#888", marginTop:3 }}>
//                         Qty: {item.quantity} · ₹{Number(item.price||0).toLocaleString("en-IN")}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//                 {items.length > 3 && (
//                   <p style={{ fontFamily:SANS, fontSize:12, color:"#888", textAlign:"center" }}>
//                     +{items.length-3} more
//                   </p>
//                 )}
//               </div>
//             )}

//             {/* Place order button */}
//             <motion.button onClick={handlePlaceOrder}
//               disabled={submitting}
//               whileHover={!submitting ? { background:"#6B0000" } : {}}
//               style={{ width:"100%", padding:"17px", background:"#800000", color:"#FFFFF0",
//                 border:"none", cursor:submitting?"wait":"pointer", fontFamily:SANS,
//                 fontSize:12, letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:700,
//                 display:"flex", alignItems:"center", justifyContent:"center", gap:10,
//                 opacity:submitting?0.72:1, transition:"all 0.2s", borderRadius:3 }}>
//               {submitting ? (
//                 <>
//                   <div style={{ width:16, height:16, border:"2px solid rgba(255,255,240,0.35)",
//                     borderTopColor:"#FFFFF0", borderRadius:"50%",
//                     animation:"spin 0.8s linear infinite" }}/>
//                   {uploading ? "Uploading screenshot…" : "Placing order…"}
//                 </>
//               ) : (
//                 <>
//                   {payMethod==="COD" ? "Place Order · Pay at Door" : "Confirm & Place Order"}
//                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
//                     stroke="currentColor" strokeWidth="2.5">
//                     <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
//                   </svg>
//                 </>
//               )}
//             </motion.button>

//             <p style={{ fontFamily:SANS, fontSize:11, color:"#AAA", textAlign:"center",
//               marginTop:12, lineHeight:1.55 }}>
//               {payMethod==="UPI"
//                 ? "Order confirmed after payment verification (within 2 hours)"
//                 : "Order confirmed immediately. Pay when delivered."}
//             </p>
//           </motion.div>
//         </div>
//       </div>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
//         *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
//         @keyframes spin { to { transform:rotate(360deg); } }
//       `}</style>
//     </div>
//   );
// }

// function SR({ l, v, vc="#FFFFF0" }) {
//   return (
//     <div style={{ display:"flex", justifyContent:"space-between" }}>
//       <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13,
//         color:"rgba(255,255,240,0.5)" }}>{l}</span>
//       <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13,
//         color:vc, fontWeight:500 }}>{v}</span>
//     </div>
//   );
// }






import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { orderAPI } from "../api/order.api";
import axiosInstance from "../api/axiosInstance";

const SERIF = "'Cormorant Garamond', Georgia, serif";
const SANS  = "'DM Sans', 'Segoe UI', sans-serif";

function Stepper({ current }) {
  const steps = ["BAG", "ADDRESS", "PAYMENT"];
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:0, marginBottom:44 }}>
      {steps.map((step, i) => {
        const done = i < current, active = i === current;
        return (
          <div key={step} style={{ display:"flex", alignItems:"center" }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
              <div style={{ width:28, height:28, borderRadius:"50%", display:"flex",
                alignItems:"center", justifyContent:"center",
                border:`2px solid ${active||done?"#800000":"#C9C4BB"}`,
                background:done?"#800000":"transparent" }}>
                {done
                  ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  : <div style={{ width:8, height:8, borderRadius:"50%", background:active?"#800000":"#C9C4BB" }}/>}
              </div>
              <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em",
                textTransform:"uppercase", color:active||done?"#800000":"#B0A99E", fontFamily:SANS }}>
                {step}
              </span>
            </div>
            {i < 2 && <div style={{ width:100, height:1, margin:"0 8px", marginBottom:16,
              background:done?"#800000":"#D9D4CC" }}/>}
          </div>
        );
      })}
    </div>
  );
}

// Load Razorpay script dynamically
function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return; }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function PaymentPage() {
  const navigate = useNavigate();
  const [checkout, setCheckout]   = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [notes, setNotes]           = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("checkoutData");
    if (!stored) { navigate("/cart"); return; }
    setCheckout(JSON.parse(stored));
    // Preload Razorpay script
    loadRazorpayScript();
  }, []);

  const fmt = n => Number(n || 0).toLocaleString("en-IN");

  const handlePayWithRazorpay = async () => {
    setSubmitting(true);
    try {
      // Step 1: Load Razorpay script
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        alert("Failed to load Razorpay. Please check your internet connection.");
        setSubmitting(false);
        return;
      }

      // Step 2: Create Razorpay order on backend
      const { data: rzpOrder } = await axiosInstance.post("/payments/create-order", {
        amount: checkout.grandTotal,
      });

      // Step 3: Get user info for prefill
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      // Step 4: Open Razorpay popup
      const options = {
        key: rzpOrder.keyId,
        amount: rzpOrder.amount,
        currency: rzpOrder.currency,
        name: "Sri Aboorva Silks",
        description: "Order Payment",
        image: "https://res.cloudinary.com/dvorkktbg/image/upload/v1772725507/products/flkhu6wiew1br31wv9fo.jpg",
        order_id: rzpOrder.orderId,
        prefill: {
          name: checkout.address?.fullName || user.name || "",
          email: user.email || "",
          contact: checkout.address?.phone || user.phone || "",
        },
        theme: { color: "#800000" },
        modal: {
          ondismiss: () => {
            setSubmitting(false);
          }
        },
        handler: async (response) => {
          try {
            // Step 5: Verify payment signature
            const { data: verification } = await axiosInstance.post("/payments/verify", {
              razorpayOrderId:   response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            if (!verification.verified) {
              alert("Payment verification failed. Please contact support.");
              setSubmitting(false);
              return;
            }

            // Step 6: Place order in your system
            const orderReq = {
              addressId:         checkout.addressId,
              paymentMethod:     "RAZORPAY",
              razorpayOrderId:   response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              notes:             notes.trim() || null,
            };

            const orderResponse = await orderAPI.placeOrder(orderReq);

            localStorage.setItem("lastOrder", JSON.stringify(orderResponse));
            localStorage.removeItem("checkoutData");
            navigate("/order-confirmation");

          } catch (err) {
            const msg = err.response?.data?.message || err.message || "Order placement failed.";
            alert(msg);
            setSubmitting(false);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response) => {
        alert("Payment failed: " + response.error.description);
        setSubmitting(false);
      });
      rzp.open();

    } catch (err) {
      const msg = err.response?.data?.error || err.message || "Something went wrong.";
      alert(msg);
      setSubmitting(false);
    }
  };

  if (!checkout) return null;

  const { subtotal, shipping, grandTotal, address, items } = checkout;

  return (
    <div style={{ fontFamily:SANS, background:"#FFFFF0", minHeight:"100vh" }}>
      <Navbar />
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"96px 24px 72px" }}>

        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}}
          style={{ textAlign:"center", marginBottom:36 }}>
          <p style={{ fontFamily:SANS, fontSize:11, letterSpacing:"0.32em", textTransform:"uppercase",
            color:"#D4AF37", marginBottom:8, fontWeight:600 }}>Sri Aboorva Silks</p>
          <h1 style={{ fontFamily:SERIF, fontSize:42, fontWeight:700, color:"#1A1A2E", lineHeight:1 }}>
            Payment
          </h1>
        </motion.div>

        <Stepper current={2} />

        <div style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:44, alignItems:"start" }}>

          {/* LEFT: Payment info */}
          <motion.div initial={{opacity:0,x:-16}} animate={{opacity:1,x:0}} transition={{delay:0.05}}>

            {/* Razorpay info card */}
            <div style={{ background:"white", border:"1px solid rgba(26,26,46,0.12)",
              padding:"40px 32px", marginBottom:24, borderRadius:4 }}>

              <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:28 }}>
                <div style={{ width:56, height:56, borderRadius:"50%", background:"#F0F4FF",
                  display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                    stroke="#1A1A2E" strokeWidth="1.6">
                    <rect x="2" y="5" width="20" height="14" rx="2"/>
                    <line x1="2" y1="10" x2="22" y2="10"/>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontFamily:SERIF, fontSize:24, fontWeight:700, color:"#1A1A2E", marginBottom:4 }}>
                    Secure Payment
                  </h3>
                  <p style={{ fontFamily:SANS, fontSize:13, color:"#888" }}>
                    Powered by Razorpay — India's most trusted payment gateway
                  </p>
                </div>
              </div>

              {/* Accepted payment methods */}
              <div style={{ background:"#F9F6EF", border:"1px solid rgba(26,26,46,0.08)",
                padding:"20px 24px", borderRadius:4, marginBottom:24 }}>
                <p style={{ fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:"0.16em",
                  textTransform:"uppercase", color:"#888", marginBottom:14 }}>
                  Accepted Payment Methods
                </p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
                  {["UPI", "Credit Card", "Debit Card", "Net Banking", "Wallets", "EMI"].map(m => (
                    <span key={m} style={{ padding:"6px 14px", background:"white",
                      border:"1px solid rgba(26,26,46,0.12)", borderRadius:3,
                      fontFamily:SANS, fontSize:12, fontWeight:500, color:"#555" }}>
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Security badges */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1,
                background:"rgba(26,26,46,0.08)", border:"1px solid rgba(26,26,46,0.08)", borderRadius:4,
                overflow:"hidden" }}>
                {[
                  { icon:"🔒", label:"256-bit SSL", sub:"Encrypted" },
                  { icon:"✓", label:"PCI DSS", sub:"Compliant" },
                  { icon:"🛡️", label:"100% Safe", sub:"Guaranteed" },
                ].map(b => (
                  <div key={b.label} style={{ padding:"16px 10px", background:"#F9F6EF",
                    textAlign:"center" }}>
                    <p style={{ fontSize:20, marginBottom:4 }}>{b.icon}</p>
                    <p style={{ fontFamily:SANS, fontSize:12, fontWeight:700, color:"#1A1A2E" }}>
                      {b.label}
                    </p>
                    <p style={{ fontFamily:SANS, fontSize:11, color:"#888" }}>{b.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Order notes */}
            <div style={{ marginBottom:8 }}>
              <label style={{ fontFamily:SANS, fontSize:11, fontWeight:700,
                letterSpacing:"0.16em", textTransform:"uppercase", color:"#888",
                marginBottom:8, display:"block" }}>
                Order Notes <span style={{ fontWeight:400, textTransform:"none",
                  letterSpacing:0, fontSize:11 }}>(optional)</span>
              </label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)}
                placeholder="Special instructions, colour preference, delivery notes…"
                rows={3}
                style={{ width:"100%", padding:"12px 14px", background:"white",
                  fontFamily:SANS, fontSize:14, color:"#1A1A2E",
                  border:"1.5px solid #D9D4CC", outline:"none", borderRadius:3,
                  resize:"vertical", transition:"border-color 0.15s", boxSizing:"border-box" }}
                onFocus={e => e.target.style.borderColor="#800000"}
                onBlur={e  => e.target.style.borderColor="#D9D4CC"}/>
            </div>
          </motion.div>

          {/* RIGHT: Summary sidebar */}
          <motion.div initial={{opacity:0,x:16}} animate={{opacity:1,x:0}} transition={{delay:0.1}}
            style={{ position:"sticky", top:100 }}>

            {/* Delivery address recap */}
            <div style={{ background:"white", border:"1px solid rgba(26,26,46,0.12)",
              padding:"20px", marginBottom:14, borderRadius:3 }}>
              <div style={{ display:"flex", justifyContent:"space-between",
                alignItems:"center", marginBottom:12 }}>
                <p style={{ fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:"0.16em",
                  textTransform:"uppercase", color:"#888" }}>Delivering to</p>
                <button onClick={() => navigate("/checkout")}
                  style={{ fontFamily:SANS, fontSize:12, fontWeight:600, color:"#800000",
                    background:"transparent", border:"none", cursor:"pointer", padding:0 }}>
                  Change
                </button>
              </div>
              <p style={{ fontFamily:SERIF, fontSize:16, fontWeight:700,
                color:"#1A1A2E", marginBottom:4 }}>{address?.fullName}</p>
              <p style={{ fontFamily:SANS, fontSize:13, color:"#555", lineHeight:1.5 }}>
                {address?.addressLine1}
                {address?.addressLine2 && `, ${address.addressLine2}`}
                {`, ${address?.city}, ${address?.state} – ${address?.pincode}`}
              </p>
              <p style={{ fontFamily:SANS, fontSize:13, color:"#888", marginTop:4 }}>
                📞 {address?.phone}
              </p>
            </div>

            {/* Price summary */}
            <div style={{ background:"#1A1A2E", padding:"26px 22px", marginBottom:14, borderRadius:3 }}>
              <h3 style={{ fontFamily:SERIF, fontSize:20, fontWeight:700,
                color:"#FFFFF0", marginBottom:20 }}>Order Summary</h3>

              <div style={{ display:"flex", flexDirection:"column", gap:12,
                paddingBottom:16, borderBottom:"1px solid rgba(255,255,240,0.1)", marginBottom:16 }}>
                <SummaryRow l="Subtotal"  v={`₹${fmt(subtotal)}`} />
                {checkout.discount > 0 && (
                  <SummaryRow l="Discount" v={`- ₹${fmt(checkout.discount)}`} vc="#16a34a" />
                )}
                <SummaryRow l="Delivery" v={shipping === 0 ? "FREE" : `₹${fmt(shipping)}`}
                  vc={shipping === 0 ? "#2ECC71" : "#FFFFF0"} />
                <p style={{ fontFamily:SANS, fontSize:11,
                  color:"rgba(255,255,240,0.3)", fontStyle:"italic" }}>
                  Prices inclusive of GST
                </p>
              </div>

              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontFamily:SERIF, fontSize:17, color:"#FFFFF0", fontWeight:600 }}>
                  Grand Total
                </span>
                <span style={{ fontFamily:SERIF, fontSize:26, fontWeight:700, color:"#D4AF37" }}>
                  ₹{fmt(grandTotal)}
                </span>
              </div>
            </div>

            {/* Items preview */}
            {items?.length > 0 && (
              <div style={{ background:"white", border:"1px solid rgba(26,26,46,0.1)",
                padding:"16px 20px", marginBottom:14 }}>
                <p style={{ fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:"0.14em",
                  textTransform:"uppercase", color:"#888", marginBottom:12 }}>
                  {items.length} item{items.length !== 1 ? "s" : ""}
                </p>
                {items.slice(0, 3).map((item, i) => (
                  <div key={i} style={{ display:"flex", gap:10, marginBottom:10,
                    paddingBottom:10, borderBottom:"1px solid rgba(26,26,46,0.07)" }}>
                    {item.productImage && (
                      <img src={item.productImage} alt={item.productName}
                        style={{ width:40, height:50, objectFit:"cover", flexShrink:0 }}/>
                    )}
                    <div style={{ minWidth:0 }}>
                      <p style={{ fontFamily:SERIF, fontSize:14, fontWeight:600, color:"#1A1A2E",
                        overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis" }}>
                        {item.productName}
                      </p>
                      <p style={{ fontFamily:SANS, fontSize:12, color:"#888", marginTop:3 }}>
                        Qty: {item.quantity} · ₹{Number(item.price || 0).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}
                {items.length > 3 && (
                  <p style={{ fontFamily:SANS, fontSize:12, color:"#888", textAlign:"center" }}>
                    +{items.length - 3} more
                  </p>
                )}
              </div>
            )}

            {/* Pay button */}
            <motion.button
              onClick={handlePayWithRazorpay}
              disabled={submitting}
              whileHover={!submitting ? { background:"#6B0000" } : {}}
              style={{ width:"100%", padding:"17px", background:"#800000", color:"#FFFFF0",
                border:"none", cursor:submitting ? "wait" : "pointer", fontFamily:SANS,
                fontSize:12, letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:700,
                display:"flex", alignItems:"center", justifyContent:"center", gap:10,
                opacity:submitting ? 0.72 : 1, transition:"all 0.2s", borderRadius:3 }}>
              {submitting ? (
                <>
                  <div style={{ width:16, height:16, border:"2px solid rgba(255,255,240,0.35)",
                    borderTopColor:"#FFFFF0", borderRadius:"50%",
                    animation:"spin 0.8s linear infinite" }}/>
                  Processing…
                </>
              ) : (
                <>
                  Pay ₹{fmt(grandTotal)} Securely
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </>
              )}
            </motion.button>

            <p style={{ fontFamily:SANS, fontSize:11, color:"#AAA", textAlign:"center",
              marginTop:12, lineHeight:1.55 }}>
              Secured by Razorpay · 256-bit SSL encryption
            </p>
          </motion.div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        @keyframes spin { to { transform:rotate(360deg); } }
      `}</style>
    </div>
  );
}

function SummaryRow({ l, v, vc = "#FFFFF0" }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between" }}>
      <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13,
        color:"rgba(255,255,240,0.5)" }}>{l}</span>
      <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13,
        color:vc, fontWeight:500 }}>{v}</span>
    </div>
  );
}