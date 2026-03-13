// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import Navbar from "../components/Navbar";
// import { cartAPI } from "../api";

// const SERIF = "'Cormorant Garamond', Georgia, serif";
// const SANS  = "'DM Sans', 'Segoe UI', sans-serif";

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

// const STATES = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu & Kashmir","Ladakh","Puducherry"];

// export default function CheckoutPage() {
//   const navigate = useNavigate();
//   const [cart, setCart]         = useState({ items:[], subtotal:0, shipping:0, total:0 });
//   const [loading, setLoading]   = useState(true);
//   const [saving,  setSaving]    = useState(false);
//   const [errors,  setErrors]    = useState({});
//   const [form, setForm] = useState({
//     fullName:"", phone:"", email:"",
//     addressLine1:"", addressLine2:"",
//     city:"", state:"Tamil Nadu", pincode:"",
//     isDefault:false,
//   });

//   useEffect(() => {
//     cartAPI.getCart().then(setCart).catch(console.error).finally(()=>setLoading(false));
//     // Pre-fill from stored user
//     const user = JSON.parse(localStorage.getItem("user") || "{}");
//     if (user.name)  setForm(f=>({...f, fullName:user.name}));
//     if (user.email) setForm(f=>({...f, email:user.email}));
//   }, []);

//   const subtotal   = Number(cart.subtotal || 0);
//   const shipping   = Number(cart.shipping || 0);
//   const gst        = Math.round(subtotal * 0.05);
//   const grandTotal = subtotal + shipping + gst;
//   const fmt        = (n) => Number(n||0).toLocaleString("en-IN");

//   const fld = (key) => ({
//     value: form[key],
//     onChange: e => { setForm({...form,[key]:e.target.value}); setErrors(er=>({...er,[key]:""})); },
//   });

//   const validate = () => {
//     const e = {};
//     if (!form.fullName.trim())    e.fullName    = "Required";
//     if (!/^\d{10}$/.test(form.phone)) e.phone   = "Enter valid 10-digit number";
//     if (!form.email.includes("@")) e.email      = "Enter valid email";
//     if (!form.addressLine1.trim()) e.addressLine1 = "Required";
//     if (!form.city.trim())        e.city        = "Required";
//     if (!form.state)              e.state       = "Required";
//     if (!/^\d{6}$/.test(form.pincode)) e.pincode = "Enter valid 6-digit pincode";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validate()) return;
//     setSaving(true);
//     // Store address + order summary for payment step
//     const orderData = { address:form, subtotal, shipping, gst, grandTotal, items:cart.items };
//     localStorage.setItem("pendingOrder", JSON.stringify(orderData));
//     setTimeout(() => { setSaving(false); navigate("/payment"); }, 400);
//   };

//   const iBase = {
//     width:"100%", padding:"12px 14px",
//     background:"#FFFFFF", border:"1.5px solid #D9D4CC",
//     fontFamily:SANS, fontSize:14, color:"#1A1A2E",
//     outline:"none", transition:"border-color 0.15s",
//     borderRadius:3,
//   };
//   const lStyle = { fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:"0.16em",
//     textTransform:"uppercase", color:"#888", marginBottom:7, display:"block" };
//   const fi = e => e.target.style.borderColor = "#800000";
//   const fo = e => { const k = e.target.name; e.target.style.borderColor = errors[k]?"#B91C1C":"#D9D4CC"; };

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
//             Delivery Address
//           </h1>
//         </motion.div>

//         <CheckoutStepper current={1} />

//         {loading ? (
//           <div style={{ textAlign:"center", padding:80 }}>
//             <div style={{ width:32, height:32, margin:"0 auto", border:"2px solid #D4AF37",
//               borderTopColor:"transparent", borderRadius:"50%", animation:"spin 1s linear infinite" }}/>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit}>
//             <div style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:44, alignItems:"start" }}>

//               {/* ── ADDRESS FORM ── */}
//               <motion.div initial={{opacity:0,x:-16}} animate={{opacity:1,x:0}} transition={{delay:0.05}}>
//                 <h2 style={{ fontFamily:SERIF, fontSize:24, fontWeight:700, color:"#1A1A2E", marginBottom:24 }}>
//                   Shipping Information
//                 </h2>

//                 {/* Contact */}
//                 <div style={{ marginBottom:28, padding:"22px", border:"1px solid rgba(26,26,46,0.12)",
//                   background:"white" }}>
//                   <p style={{ fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:"0.2em",
//                     textTransform:"uppercase", color:"#D4AF37", marginBottom:18 }}>Contact Details</p>
//                   <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
//                     <Field label="Full Name *" name="fullName" type="text"
//                       {...fld("fullName")} err={errors.fullName} iBase={iBase} lStyle={lStyle} fi={fi} fo={fo}/>
//                     <Field label="Phone Number *" name="phone" type="tel"
//                       placeholder="10-digit mobile"
//                       {...fld("phone")} err={errors.phone} iBase={iBase} lStyle={lStyle} fi={fi} fo={fo}/>
//                   </div>
//                   <Field label="Email Address *" name="email" type="email"
//                     {...fld("email")} err={errors.email} iBase={iBase} lStyle={lStyle} fi={fi} fo={fo}/>
//                 </div>

//                 {/* Address */}
//                 <div style={{ padding:"22px", border:"1px solid rgba(26,26,46,0.12)", background:"white" }}>
//                   <p style={{ fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:"0.2em",
//                     textTransform:"uppercase", color:"#D4AF37", marginBottom:18 }}>Delivery Address</p>

//                   <div style={{ marginBottom:16 }}>
//                     <Field label="Address Line 1 *" name="addressLine1" type="text"
//                       placeholder="House / Flat / Building no."
//                       {...fld("addressLine1")} err={errors.addressLine1} iBase={iBase} lStyle={lStyle} fi={fi} fo={fo}/>
//                   </div>
//                   <div style={{ marginBottom:16 }}>
//                     <Field label="Address Line 2" name="addressLine2" type="text"
//                       placeholder="Street, Area, Landmark (optional)"
//                       {...fld("addressLine2")} err={errors.addressLine2} iBase={iBase} lStyle={lStyle} fi={fi} fo={fo}/>
//                   </div>
//                   <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16, marginBottom:16 }}>
//                     <Field label="City *" name="city" type="text"
//                       {...fld("city")} err={errors.city} iBase={iBase} lStyle={lStyle} fi={fi} fo={fo}/>
//                     <div>
//                       <label style={lStyle}>State *</label>
//                       <select name="state" value={form.state}
//                         onChange={e=>setForm({...form,state:e.target.value})}
//                         onFocus={fi} onBlur={fo}
//                         style={{ ...iBase, cursor:"pointer" }}>
//                         {STATES.map(s=><option key={s}>{s}</option>)}
//                       </select>
//                       {errors.state && <p style={{ fontFamily:SANS, fontSize:11, color:"#B91C1C", marginTop:4 }}>{errors.state}</p>}
//                     </div>
//                     <Field label="Pincode *" name="pincode" type="text"
//                       placeholder="6-digit"
//                       {...fld("pincode")} err={errors.pincode} iBase={iBase} lStyle={lStyle} fi={fi} fo={fo}/>
//                   </div>

//                   {/* Default address toggle */}
//                   <label style={{ display:"flex", alignItems:"center", gap:12, cursor:"pointer",
//                     padding:"12px 14px", background:"#F9F6EF",
//                     border:"1px solid rgba(212,175,55,0.2)" }}>
//                     <input type="checkbox" checked={form.isDefault}
//                       onChange={e=>setForm({...form,isDefault:e.target.checked})}
//                       style={{ width:16, height:16, accentColor:"#800000" }}/>
//                     <div>
//                       <p style={{ fontFamily:SANS, fontSize:14, fontWeight:600, color:"#1A1A2E" }}>
//                         Save as default address
//                       </p>
//                       <p style={{ fontFamily:SANS, fontSize:12, color:"#888" }}>
//                         Use this for future orders
//                       </p>
//                     </div>
//                   </label>
//                 </div>
//               </motion.div>

//               {/* ── ORDER SUMMARY ── */}
//               <motion.div initial={{opacity:0,x:16}} animate={{opacity:1,x:0}} transition={{delay:0.1}}
//                 style={{ position:"sticky", top:100 }}>
//                 <div style={{ background:"#1A1A2E", padding:"28px 24px", marginBottom:14 }}>
//                   <h3 style={{ fontFamily:SERIF, fontSize:20, fontWeight:700, color:"#FFFFF0", marginBottom:22 }}>
//                     Order Summary
//                   </h3>
//                   <div style={{ display:"flex", flexDirection:"column", gap:12, paddingBottom:18,
//                     borderBottom:"1px solid rgba(255,255,240,0.1)", marginBottom:16 }}>
//                     <SRow label="Subtotal" value={`₹${fmt(subtotal)}`}/>
//                     <SRow label="Delivery" value={shipping===0?"FREE":`₹${fmt(shipping)}`}
//                       vc={shipping===0?"#2ECC71":"#FFFFF0"}/>
//                     <div style={{ display:"flex", justifyContent:"space-between",
//                       padding:"8px 10px", background:"rgba(212,175,55,0.07)",
//                       border:"1px solid rgba(212,175,55,0.15)" }}>
//                       <span style={{ fontFamily:SANS, fontSize:13, color:"rgba(255,255,240,0.65)" }}>GST (5%)</span>
//                       <span style={{ fontFamily:SANS, fontSize:13, color:"#D4AF37", fontWeight:600 }}>+₹{fmt(gst)}</span>
//                     </div>
//                   </div>
//                   <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
//                     <span style={{ fontFamily:SERIF, fontSize:17, color:"#FFFFF0", fontWeight:600 }}>Grand Total</span>
//                     <span style={{ fontFamily:SERIF, fontSize:24, fontWeight:700, color:"#D4AF37" }}>₹{fmt(grandTotal)}</span>
//                   </div>
//                 </div>

//                 {/* Items preview */}
//                 <div style={{ background:"white", border:"1px solid rgba(26,26,46,0.1)", padding:"18px 20px" }}>
//                   <p style={{ fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:"0.16em",
//                     textTransform:"uppercase", color:"#888", marginBottom:14 }}>
//                     {cart.items?.length || 0} items
//                   </p>
//                   {cart.items?.slice(0,3).map(item => (
//                     <div key={item.id} style={{ display:"flex", gap:10, marginBottom:12,
//                       paddingBottom:12, borderBottom:"1px solid rgba(26,26,46,0.07)" }}>
//                       {item.imageUrl && (
//                         <img src={item.imageUrl} alt={item.productName}
//                           style={{ width:44, height:54, objectFit:"cover", flexShrink:0 }}/>
//                       )}
//                       <div style={{ flex:1, minWidth:0 }}>
//                         <p style={{ fontFamily:SERIF, fontSize:14, fontWeight:600, color:"#1A1A2E",
//                           overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis" }}>
//                           {item.productName}
//                         </p>
//                         <p style={{ fontFamily:SANS, fontSize:12, color:"#888", marginTop:3 }}>
//                           Qty: {item.quantity} · ₹{Number(item.price).toLocaleString("en-IN")}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                   {cart.items?.length > 3 && (
//                     <p style={{ fontFamily:SANS, fontSize:12, color:"#888", textAlign:"center" }}>
//                       +{cart.items.length - 3} more items
//                     </p>
//                   )}
//                 </div>

//                 <motion.button type="submit" disabled={saving}
//                   whileHover={{ background:"#6B0000" }}
//                   style={{ width:"100%", marginTop:14, padding:"16px", background:"#800000",
//                     color:"#FFFFF0", border:"none", cursor:saving?"wait":"pointer",
//                     fontFamily:SANS, fontSize:12, letterSpacing:"0.18em", textTransform:"uppercase",
//                     fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center",
//                     gap:10, opacity:saving?0.75:1, transition:"all 0.2s" }}>
//                   {saving ? "Saving…" : <>Continue to Payment <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>}
//                 </motion.button>
//               </motion.div>
//             </div>
//           </form>
//         )}
//       </div>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
//         *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
//         @keyframes spin { to { transform:rotate(360deg); } }
//         select option { color:#1A1A2E; }
//       `}</style>
//     </div>
//   );
// }

// function Field({ label, name, type, placeholder, value, onChange, err, iBase, lStyle, fi, fo }) {
//   return (
//     <div>
//       <label style={lStyle}>{label}</label>
//       <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder||""}
//         onFocus={fi} onBlur={fo}
//         style={{ ...iBase, borderColor: err?"#B91C1C":"#D9D4CC" }}/>
//       {err && <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:"#B91C1C", marginTop:4 }}>{err}</p>}
//     </div>
//   );
// }

// function SRow({ label, value, vc="#FFFFF0" }) {
//   return (
//     <div style={{ display:"flex", justifyContent:"space-between" }}>
//       <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"rgba(255,255,240,0.5)" }}>{label}</span>
//       <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:vc, fontWeight:500 }}>{value}</span>
//     </div>
//   );
// }





import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import { cartAPI } from "../api";
import { addressAPI } from "../api/order.api";

const SERIF = "'Cormorant Garamond', Georgia, serif";
const SANS  = "'DM Sans', 'Segoe UI', sans-serif";
const STATES = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu & Kashmir","Ladakh","Puducherry"];

const EMPTY_FORM = { fullName:"", phone:"", email:"", addressLine1:"", addressLine2:"", city:"", state:"Tamil Nadu", pincode:"", isDefault:false };

function Stepper({ current }) {
  const steps = ["BAG","ADDRESS","PAYMENT"];
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:0, marginBottom:44 }}>
      {steps.map((step, i) => {
        const done = i < current, active = i === current;
        return (
          <div key={step} style={{ display:"flex", alignItems:"center" }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
              <div style={{ width:28, height:28, borderRadius:"50%", display:"flex", alignItems:"center",
                justifyContent:"center", border:`2px solid ${active||done?"#800000":"#C9C4BB"}`,
                background:done?"#800000":"transparent" }}>
                {done ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      : <div style={{ width:8, height:8, borderRadius:"50%", background:active?"#800000":"#C9C4BB" }}/>}
              </div>
              <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em",
                color:active||done?"#800000":"#B0A99E", fontFamily:SANS }}>{step}</span>
            </div>
            {i < 2 && <div style={{ width:100, height:1, margin:"0 8px", marginBottom:16,
              background:done?"#800000":"#D9D4CC" }}/>}
          </div>
        );
      })}
    </div>
  );
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [cart,          setCart]          = useState({ items:[], subtotal:0, shipping:0, discount:0, total:0 });
  const [addresses,     setAddresses]     = useState([]);
  const [selectedId,    setSelectedId]    = useState(null);
  const [showForm,      setShowForm]      = useState(false);
  const [editingAddr,   setEditingAddr]   = useState(null);
  const [form,          setForm]          = useState({...EMPTY_FORM});
  const [errors,        setErrors]        = useState({});
  const [loadingCart,   setLoadingCart]   = useState(true);

  // whenever the selected address (or its state) changes we need to re-run
  // the cart summary call so shipping and discount are kept in sync.
  const [loadingAddr,   setLoadingAddr]   = useState(true);
  const [savingAddr,    setSavingAddr]    = useState(false);
  const [deletingId,    setDeletingId]    = useState(null);

  useEffect(() => {
    fetchCart();
    fetchAddresses();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.email) setForm(f => ({...f, email:user.email}));
    if (user.name)  setForm(f => ({...f, fullName:user.name}));
  }, []);

  // re-fetch cart whenever selected address or the list of addresses changes
  useEffect(() => {
    if (selectedId && addresses.length > 0) {
      const addr = addresses.find(a => a.id === selectedId);
      fetchCart(addr?.state);
    }
  }, [selectedId, addresses]);

  const fetchCart = async (state) => {
    try { setCart(await cartAPI.getCart(state)); }
    catch(e) { console.error(e); }
    finally { setLoadingCart(false); }
  };

  const fetchAddresses = async () => {
    try {
      const list = await addressAPI.getAll();
      setAddresses(list);
      // Auto-select default
      const def = list.find(a => a.isDefault);
      if (def) setSelectedId(def.id);
      else if (list.length > 0) setSelectedId(list[0].id);
      else setShowForm(true); // No addresses — show form immediately
    } catch(e) { console.error(e); setShowForm(true); }
    finally { setLoadingAddr(false); }
  };

  const subtotal   = Number(cart.subtotal || 0);
  const discount   = Number(cart.discount || 0);
  const shipping   = Number(cart.shipping || 0);
  const gst        = Math.round(subtotal * 0.05);
  const grandTotal = subtotal - discount + shipping + gst;
  const fmt        = n => Number(n||0).toLocaleString("en-IN");

  const validate = () => {
    const e = {};
    if (!form.fullName.trim())          e.fullName     = "Required";
    if (!/^\d{10}$/.test(form.phone))   e.phone        = "Enter valid 10-digit number";
    if (!form.addressLine1.trim())      e.addressLine1 = "Required";
    if (!form.city.trim())              e.city         = "Required";
    if (!form.state)                    e.state        = "Required";
    if (!/^\d{6}$/.test(form.pincode))  e.pincode      = "Enter valid 6-digit pincode";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSavingAddr(true);
    try {
      let saved;
      if (editingAddr) {
        saved = await addressAPI.update(editingAddr.id, form);
        setAddresses(prev => prev.map(a => a.id === saved.id ? saved : a));
      } else {
        saved = await addressAPI.create(form);
        setAddresses(prev => [...prev, saved]);
      }
      setSelectedId(saved.id);
      setShowForm(false);
      setEditingAddr(null);
      setForm({...EMPTY_FORM});
      setErrors({});
    } catch(err) {
      alert(err.response?.data?.message || "Failed to save address");
    } finally { setSavingAddr(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this address?")) return;
    setDeletingId(id);
    try {
      await addressAPI.delete(id);
      const updated = addresses.filter(a => a.id !== id);
      setAddresses(updated);
      if (selectedId === id) setSelectedId(updated.find(a=>a.isDefault)?.id || updated[0]?.id || null);
      if (updated.length === 0) setShowForm(true);
    } catch(e) { alert("Failed to delete"); }
    finally { setDeletingId(null); }
  };

  const openEdit = (addr) => {
    setEditingAddr(addr);
    setForm({ fullName:addr.fullName, phone:addr.phone, email:addr.email||"",
      addressLine1:addr.addressLine1, addressLine2:addr.addressLine2||"",
      city:addr.city, state:addr.state, pincode:addr.pincode, isDefault:addr.isDefault });
    setErrors({});
    setShowForm(true);
  };

  const handleContinue = () => {
    if (!selectedId) { alert("Please select or add a delivery address"); return; }
    const addr = addresses.find(a => a.id === selectedId);
    // Store addressId + cart summary for PaymentPage (include discount so
    // payment screen can break it out)
    localStorage.setItem("checkoutData", JSON.stringify({
      addressId: selectedId,
      address: addr,
      subtotal, shipping, discount, grandTotal,
      items: cart.items,
    }));
    navigate("/payment");
  };

  const iBase = { width:"100%", padding:"11px 14px", background:"#FFFFFF",
    border:"1.5px solid #D9D4CC", fontFamily:SANS, fontSize:14, color:"#1A1A2E",
    outline:"none", borderRadius:3, transition:"border-color 0.15s" };
  const lStyle = { fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:"0.16em",
    textTransform:"uppercase", color:"#888", marginBottom:7, display:"block" };
  const fi = e => e.target.style.borderColor = "#800000";
  const fo = e => e.target.style.borderColor = "#D9D4CC";
  const fld = key => ({ value:form[key], onChange:e => { setForm({...form,[key]:e.target.value}); setErrors(er=>({...er,[key]:""})); } });

  return (
    <div style={{ fontFamily:SANS, background:"#FFFFF0", minHeight:"100vh" }}>
      <Navbar/>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"96px 24px 72px" }}>

        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}}
          style={{ textAlign:"center", marginBottom:36 }}>
          <p style={{ fontFamily:SANS, fontSize:11, letterSpacing:"0.32em", textTransform:"uppercase",
            color:"#D4AF37", marginBottom:8, fontWeight:600 }}>Sri Aboorva Silks</p>
          <h1 style={{ fontFamily:SERIF, fontSize:42, fontWeight:700, color:"#1A1A2E", lineHeight:1 }}>
            Delivery Address
          </h1>
        </motion.div>

        <Stepper current={1}/>

        {(loadingCart || loadingAddr) ? (
          <div style={{ textAlign:"center", padding:80 }}>
            <div style={{ width:32, height:32, margin:"0 auto", border:"2px solid #D4AF37",
              borderTopColor:"transparent", borderRadius:"50%", animation:"spin 1s linear infinite" }}/>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:44, alignItems:"start" }}>

            {/* ── LEFT: Address selection + form ── */}
            <div>
              {/* Saved addresses list */}
              {addresses.length > 0 && !showForm && (
                <div style={{ marginBottom:20 }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
                    <h2 style={{ fontFamily:SERIF, fontSize:24, fontWeight:700, color:"#1A1A2E" }}>
                      Saved Addresses
                    </h2>
                    <button onClick={()=>{ setEditingAddr(null); setForm({...EMPTY_FORM}); setShowForm(true); }}
                      style={{ fontFamily:SANS, fontSize:12, fontWeight:700, letterSpacing:"0.12em",
                        textTransform:"uppercase", color:"#800000", background:"transparent",
                        border:"1.5px solid #800000", padding:"8px 16px", cursor:"pointer",
                        borderRadius:3 }}>
                      + Add New
                    </button>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                    {addresses.map(addr => (
                      <motion.div key={addr.id} initial={{opacity:0}} animate={{opacity:1}}
                        onClick={()=>setSelectedId(addr.id)}
                        style={{ padding:"18px 20px", background:"white", cursor:"pointer",
                          border:`2px solid ${selectedId===addr.id?"#800000":"rgba(26,26,46,0.12)"}`,
                          borderRadius:4, position:"relative", transition:"border-color 0.15s",
                          opacity:deletingId===addr.id?0.4:1 }}>
                        {/* Selected indicator */}
                        <div style={{ position:"absolute", top:16, right:16,
                          width:20, height:20, borderRadius:"50%",
                          border:`2px solid ${selectedId===addr.id?"#800000":"#D9D4CC"}`,
                          background:selectedId===addr.id?"#800000":"transparent",
                          display:"flex", alignItems:"center", justifyContent:"center" }}>
                          {selectedId===addr.id && <svg width="10" height="10" viewBox="0 0 24 24"
                            fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                        </div>

                        <div style={{ paddingRight:32 }}>
                          {addr.isDefault && (
                            <span style={{ fontFamily:SANS, fontSize:10, fontWeight:700,
                              letterSpacing:"0.1em", textTransform:"uppercase",
                              background:"rgba(212,175,55,0.12)", color:"#7A5C0A",
                              border:"1px solid rgba(212,175,55,0.3)", padding:"2px 8px",
                              borderRadius:3, marginBottom:8, display:"inline-block" }}>
                              Default
                            </span>
                          )}
                          <p style={{ fontFamily:SERIF, fontSize:17, fontWeight:700,
                            color:"#1A1A2E", marginBottom:4 }}>{addr.fullName}</p>
                          <p style={{ fontFamily:SANS, fontSize:13, color:"#555", lineHeight:1.5, marginBottom:4 }}>
                            {addr.addressLine1}{addr.addressLine2 && `, ${addr.addressLine2}`}
                            {`, ${addr.city}, ${addr.state} – ${addr.pincode}`}
                          </p>
                          <p style={{ fontFamily:SANS, fontSize:13, color:"#888" }}>📞 {addr.phone}</p>
                        </div>

                        <div style={{ display:"flex", gap:10, marginTop:14, paddingTop:12,
                          borderTop:"1px solid rgba(26,26,46,0.07)" }}>
                          <button onClick={e=>{e.stopPropagation(); openEdit(addr);}}
                            style={{ fontFamily:SANS, fontSize:12, fontWeight:600, color:"#800000",
                              background:"transparent", border:"1px solid rgba(128,0,0,0.25)",
                              padding:"5px 12px", cursor:"pointer", borderRadius:3 }}>
                            Edit
                          </button>
                          <button onClick={e=>{e.stopPropagation(); handleDelete(addr.id);}}
                            style={{ fontFamily:SANS, fontSize:12, fontWeight:600, color:"#B91C1C",
                              background:"transparent", border:"1px solid rgba(185,28,28,0.25)",
                              padding:"5px 12px", cursor:"pointer", borderRadius:3 }}>
                            Delete
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add / Edit form */}
              <AnimatePresence>
                {showForm && (
                  <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                      marginBottom:20 }}>
                      <h2 style={{ fontFamily:SERIF, fontSize:24, fontWeight:700, color:"#1A1A2E" }}>
                        {editingAddr ? "Edit Address" : "Add New Address"}
                      </h2>
                      {addresses.length > 0 && (
                        <button onClick={()=>{ setShowForm(false); setEditingAddr(null); setErrors({}); }}
                          style={{ fontFamily:SANS, fontSize:12, color:"#888", background:"transparent",
                            border:"none", cursor:"pointer" }}>
                          ← Back to saved addresses
                        </button>
                      )}
                    </div>

                    <form onSubmit={handleSaveAddress}>
                      {/* Contact */}
                      <div style={{ padding:"22px", border:"1px solid rgba(26,26,46,0.12)",
                        background:"white", marginBottom:14 }}>
                        <p style={{ fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:"0.2em",
                          textTransform:"uppercase", color:"#D4AF37", marginBottom:18 }}>Contact Details</p>
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
                          <F label="Full Name *" name="fullName" {...fld("fullName")}
                            err={errors.fullName} iBase={iBase} lStyle={lStyle} fi={fi} fo={fo}/>
                          <F label="Phone *" name="phone" type="tel" placeholder="10-digit mobile"
                            {...fld("phone")} err={errors.phone} iBase={iBase} lStyle={lStyle} fi={fi} fo={fo}/>
                        </div>
                        <F label="Email" name="email" type="email" placeholder="For order updates"
                          {...fld("email")} err={errors.email} iBase={iBase} lStyle={lStyle} fi={fi} fo={fo}/>
                      </div>

                      {/* Address */}
                      <div style={{ padding:"22px", border:"1px solid rgba(26,26,46,0.12)",
                        background:"white", marginBottom:14 }}>
                        <p style={{ fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:"0.2em",
                          textTransform:"uppercase", color:"#D4AF37", marginBottom:18 }}>Delivery Address</p>
                        <div style={{ marginBottom:16 }}>
                          <F label="Address Line 1 *" name="addressLine1" placeholder="House / Flat / Building no."
                            {...fld("addressLine1")} err={errors.addressLine1} iBase={iBase} lStyle={lStyle} fi={fi} fo={fo}/>
                        </div>
                        <div style={{ marginBottom:16 }}>
                          <F label="Address Line 2" name="addressLine2" placeholder="Street, Area, Landmark (optional)"
                            {...fld("addressLine2")} err={errors.addressLine2} iBase={iBase} lStyle={lStyle} fi={fi} fo={fo}/>
                        </div>
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16, marginBottom:16 }}>
                          <F label="City *" name="city" {...fld("city")}
                            err={errors.city} iBase={iBase} lStyle={lStyle} fi={fi} fo={fo}/>
                          <div>
                            <label style={lStyle}>State *</label>
                            <select name="state" value={form.state}
                              onChange={e=>setForm({...form,state:e.target.value})}
                              onFocus={fi} onBlur={fo}
                              style={{ ...iBase, cursor:"pointer" }}>
                              {STATES.map(s=><option key={s}>{s}</option>)}
                            </select>
                          </div>
                          <F label="Pincode *" name="pincode" placeholder="6-digit"
                            {...fld("pincode")} err={errors.pincode} iBase={iBase} lStyle={lStyle} fi={fi} fo={fo}/>
                        </div>
                        <label style={{ display:"flex", alignItems:"center", gap:12, cursor:"pointer",
                          padding:"12px 14px", background:"#F9F6EF", border:"1px solid rgba(212,175,55,0.2)" }}>
                          <input type="checkbox" checked={form.isDefault}
                            onChange={e=>setForm({...form,isDefault:e.target.checked})}
                            style={{ width:16, height:16, accentColor:"#800000" }}/>
                          <div>
                            <p style={{ fontFamily:SANS, fontSize:14, fontWeight:600, color:"#1A1A2E" }}>
                              Save as default address
                            </p>
                            <p style={{ fontFamily:SANS, fontSize:12, color:"#888" }}>Use for future orders</p>
                          </div>
                        </label>
                      </div>

                      <button type="submit" disabled={savingAddr}
                        style={{ width:"100%", padding:"14px", background:"#1A1A2E", color:"#FFFFF0",
                          border:"none", cursor:savingAddr?"wait":"pointer", fontFamily:SANS,
                          fontSize:12, letterSpacing:"0.16em", textTransform:"uppercase", fontWeight:700,
                          opacity:savingAddr?0.7:1, borderRadius:3 }}>
                        {savingAddr ? "Saving…" : editingAddr ? "Update Address" : "Save Address"}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── RIGHT: Order summary ── */}
            <div style={{ position:"sticky", top:100 }}>
              <div style={{ background:"#1A1A2E", padding:"28px 24px", marginBottom:14 }}>
                <h3 style={{ fontFamily:SERIF, fontSize:20, fontWeight:700, color:"#FFFFF0", marginBottom:22 }}>
                  Order Summary
                </h3>
                <div style={{ display:"flex", flexDirection:"column", gap:12,
                  paddingBottom:16, borderBottom:"1px solid rgba(255,255,240,0.1)", marginBottom:16 }}>
                  <SR l="Subtotal" v={`₹${fmt(subtotal)}`}/>
                  {discount > 0 && <SR l="Discount (10%)" v={`- ₹${fmt(discount)}`} vc="#16a34a" />}
                  <SR l="Delivery" v={shipping===0?"FREE":`₹${fmt(shipping)}`}
                    vc={shipping===0?"#2ECC71":"#FFFFF0"}/>
                  {shipping > 0 && <p style={{ fontFamily:SANS, fontSize:11,
                    color:"rgba(255,255,240,0.35)", marginTop:-6 }}>
                    Free delivery above ₹999</p>}
                  {/* show gst row */}
                  <div style={{ display:"flex", justifyContent:"space-between",
                    padding:"6px 10px", background:"rgba(212,175,55,0.07)",
                    border:"1px solid rgba(212,175,55,0.15)" }}>
                    <span style={{ fontFamily:SANS, fontSize:13, color:"rgba(255,255,240,0.65)" }}>GST (5%)</span>
                    <span style={{ fontFamily:SANS, fontSize:13, color:"#D4AF37", fontWeight:600 }}>+₹{fmt(gst)}</span>
                  </div>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontFamily:SERIF, fontSize:17, color:"#FFFFF0", fontWeight:600 }}>Total</span>
                  <span style={{ fontFamily:SERIF, fontSize:24, fontWeight:700, color:"#D4AF37" }}>
                    ₹{fmt(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div style={{ background:"white", border:"1px solid rgba(26,26,46,0.1)",
                padding:"18px 20px", marginBottom:14 }}>
                <p style={{ fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:"0.16em",
                  textTransform:"uppercase", color:"#888", marginBottom:14 }}>
                  {cart.items?.length || 0} items
                </p>
                {cart.items?.slice(0,3).map(item => (
                  <div key={item.id} style={{ display:"flex", gap:10, marginBottom:10,
                    paddingBottom:10, borderBottom:"1px solid rgba(26,26,46,0.07)" }}>
                    {item.imageUrl && <img src={item.imageUrl} alt={item.productName}
                      style={{ width:42, height:52, objectFit:"cover", flexShrink:0 }}/>}
                    <div style={{ minWidth:0 }}>
                      <p style={{ fontFamily:SERIF, fontSize:14, fontWeight:600, color:"#1A1A2E",
                        overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis" }}>
                        {item.productName}
                      </p>
                      <p style={{ fontFamily:SANS, fontSize:12, color:"#888", marginTop:3 }}>
                        Qty: {item.quantity} · ₹{Number(item.price||0).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}
                {(cart.items?.length||0) > 3 && (
                  <p style={{ fontFamily:SANS, fontSize:12, color:"#888", textAlign:"center" }}>
                    +{cart.items.length-3} more items
                  </p>
                )}
              </div>

              <button onClick={handleContinue} disabled={!selectedId && !showForm}
                style={{ width:"100%", padding:"16px", background:"#800000", color:"#FFFFF0",
                  border:"none", cursor:"pointer", fontFamily:SANS, fontSize:12,
                  letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:700,
                  display:"flex", alignItems:"center", justifyContent:"center", gap:10,
                  opacity:(!selectedId && addresses.length>0)?0.5:1, borderRadius:3 }}>
                Continue to Payment
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        @keyframes spin { to { transform:rotate(360deg); } }
        select option { color:#1A1A2E; }
      `}</style>
    </div>
  );
}

function F({ label, name, type="text", placeholder="", value, onChange, err, iBase, lStyle, fi, fo }) {
  return (
    <div>
      <label style={lStyle}>{label}</label>
      <input type={type} name={name} value={value} onChange={onChange}
        placeholder={placeholder} onFocus={fi} onBlur={fo}
        style={{ ...iBase, borderColor:err?"#B91C1C":"#D9D4CC" }}/>
      {err && <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11,
        color:"#B91C1C", marginTop:4 }}>{err}</p>}
    </div>
  );
}

function SR({ l, v, vc="#FFFFF0" }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between" }}>
      <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13,
        color:"rgba(255,255,240,0.5)" }}>{l}</span>
      <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13,
        color:vc, fontWeight:500 }}>{v}</span>
    </div>
  );
}