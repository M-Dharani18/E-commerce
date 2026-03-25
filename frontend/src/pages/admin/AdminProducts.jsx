
// import { useState, useEffect, useContext, createContext } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { adminAPI } from "../../api";
// import { ThemeCtx } from "./AdminDashboard";

// /* ── Self-contained theme tokens (mirrors AdminDashboard exactly) ─────────── */
// const _DARK = {
//   mode:"dark",
//   bg:"#080810", surface:"#0f0f1a", card:"#13131f", cardAlt:"#16162a",
//   border:"rgba(255,255,255,0.07)", borderHi:"rgba(212,175,55,0.3)",
//   inputBg:"#0a0a14", inputBorder:"rgba(255,255,255,0.1)", inputFocus:"rgba(212,175,55,0.45)",
//   text:"#F0EEE8", muted:"rgba(240,238,232,0.5)", dim:"rgba(240,238,232,0.26)",
//   gold:"#D4AF37", maroon:"#800000",
//   danger:"#f87171", dangerBg:"rgba(248,113,113,0.1)", dangerBorder:"rgba(248,113,113,0.25)",
//   green:"#34D399", greenBg:"rgba(52,211,153,0.1)", greenBorder:"rgba(52,211,153,0.25)",
//   hoverBg:"rgba(255,255,255,0.05)", shadow:"none", shadowMd:"0 8px 24px rgba(0,0,0,0.4)",
//   statBorder:"rgba(255,255,255,0.07)", tableBorder:"rgba(255,255,255,0.07)",
//   badgePill:"rgba(255,255,255,0.06)",
// };
// const _LIGHT = {
//   mode:"light",
//   bg:"#ECEAE4", surface:"#FFFFFF", card:"#FFFFFF", cardAlt:"#F9F7F4",
//   border:"#D1CBC0", borderHi:"#800000",
//   inputBg:"#FFFFFF", inputBorder:"#B5AFA8", inputFocus:"#800000",
//   text:"#111827", muted:"#6B7280", dim:"#9CA3AF",
//   gold:"#7A5C0A", maroon:"#800000",
//   danger:"#B91C1C", dangerBg:"#FEF2F2", dangerBorder:"#FECACA",
//   green:"#15803D", greenBg:"#F0FDF4", greenBorder:"#BBF7D0",
//   hoverBg:"#F5F3F0",
//   shadow:"0 1px 3px rgba(0,0,0,0.08)", shadowMd:"0 4px 16px rgba(0,0,0,0.10)",
//   statBorder:"#E5E0D8", tableBorder:"#E5E0D8",
//   badgePill:"#F5F3F0",
// };

// /* ── Safe hook: reads from ThemeCtx if available, falls back to dark tokens ─ */
// const _FallbackCtx = createContext({ T: _DARK, theme: "dark" });
// function useAdminTheme() {
//   // ThemeCtx is exported from AdminDashboard (outputs version).
//   // If AdminDashboard is the older dark-only version, ThemeCtx is undefined → use fallback.
//   const ctx = useContext(ThemeCtx ?? _FallbackCtx);
//   if (ctx && ctx.T) return ctx;
//   return { T: _DARK, theme: "dark" };
// }

// const SERIF = "'Cormorant Garamond', Georgia, serif";
// const SANS  = "'DM Sans', 'Segoe UI', system-ui, sans-serif";

// /* ── Colour options with hex swatches ─────────────────────────────────────── */
// const COLOUR_OPTIONS = [
//   { label:"Black",       hex:"#111111" },
//   { label:"White",       hex:"#F5F5F5" },
//   { label:"Red",         hex:"#DC2626" },
//   { label:"Navy Blue",   hex:"#1E3A5F" },
//   { label:"Blue",        hex:"#2563EB" },
//   { label:"Green",       hex:"#16A34A" },
//   { label:"Pink",        hex:"#EC4899" },
//   { label:"Yellow",      hex:"#EAB308" },
//   { label:"Orange",      hex:"#EA580C" },
//   { label:"Purple",      hex:"#9333EA" },
//   { label:"Brown",       hex:"#92400E" },
//   { label:"Grey",        hex:"#6B7280" },
//   { label:"Maroon",      hex:"#800000" },
//   { label:"Gold",        hex:"#D4AF37" },
//   { label:"Cream",       hex:"#FFF8DC" },
//   { label:"Multi",       hex:"linear-gradient(135deg,#DC2626,#2563EB,#16A34A,#EAB308)" },
// ];

// /* ── Size options ─────────────────────────────────────────────────────────── */
// const SIZE_OPTIONS = ["Free Size","XS","S","M","L","XL","XXL","3XL"];

// const EMPTY = {
//   name:"", description:"", price:"", originalPrice:"", discountPercent:0,
//   stockQuantity:0, categoryId:"", isFeatured:false, isActive:true,
//   colours:[], sizes:[], gender:"", fabric:"", occasion:"",
// };

// /* ── Multi-select colour chip picker ──────────────────────────────────────── */
// function ColourPicker({ selected, onChange, T, theme }) {
//   const toggle = (label) => {
//     const next = selected.includes(label)
//       ? selected.filter(c => c !== label)
//       : [...selected, label];
//     onChange(next);
//   };
//   return (
//     <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:6 }}>
//       {COLOUR_OPTIONS.map(({ label, hex }) => {
//         const active = selected.includes(label);
//         return (
//           <button key={label} type="button" onClick={() => toggle(label)}
//             title={label}
//             style={{
//               display:"flex", alignItems:"center", gap:6,
//               padding:"5px 10px 5px 6px",
//               borderRadius:20,
//               border:`2px solid ${active ? (theme==="dark"?"#D4AF37":"#800000") : (theme==="dark"?"rgba(255,255,255,0.12)":"#D1CBC0")}`,
//               background: active
//                 ? (theme==="dark"?"rgba(212,175,55,0.12)":"rgba(128,0,0,0.07)")
//                 : (theme==="dark"?"rgba(255,255,255,0.03)":"#FAFAF8"),
//               cursor:"pointer",
//               transition:"all 0.15s",
//               fontFamily:SANS, fontSize:12, fontWeight: active?700:500,
//               color: active ? (theme==="dark"?"#D4AF37":"#800000") : T.muted,
//             }}>
//             {/* Swatch */}
//             <span style={{
//               width:14, height:14, borderRadius:"50%", flexShrink:0,
//               background: hex,
//               border: label==="White" ? "1px solid #ccc" : "1px solid rgba(0,0,0,0.1)",
//               boxShadow: active ? "0 0 0 2px rgba(212,175,55,0.4)" : "none",
//             }}/>
//             {label}
//             {active && (
//               <span style={{ marginLeft:2, fontSize:10, lineHeight:1 }}>✕</span>
//             )}
//           </button>
//         );
//       })}
//     </div>
//   );
// }

// /* ── Multi-select size chip picker ───────────────────────────────────────── */
// function SizePicker({ selected, onChange, T, theme }) {
//   const toggle = (s) => {
//     const next = selected.includes(s)
//       ? selected.filter(x => x !== s)
//       : [...selected, s];
//     onChange(next);
//   };
//   return (
//     <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:6 }}>
//       {SIZE_OPTIONS.map(s => {
//         const active = selected.includes(s);
//         return (
//           <button key={s} type="button" onClick={() => toggle(s)}
//             style={{
//               minWidth:48, padding:"7px 14px",
//               borderRadius:8,
//               border:`2px solid ${active ? (theme==="dark"?"#D4AF37":"#800000") : (theme==="dark"?"rgba(255,255,255,0.12)":"#D1CBC0")}`,
//               background: active
//                 ? (theme==="dark"?"rgba(212,175,55,0.12)":"rgba(128,0,0,0.07)")
//                 : (theme==="dark"?"rgba(255,255,255,0.03)":"#FAFAF8"),
//               cursor:"pointer",
//               transition:"all 0.15s",
//               fontFamily:SANS, fontSize:13, fontWeight: active?800:500,
//               color: active ? (theme==="dark"?"#D4AF37":"#800000") : T.muted,
//               letterSpacing:"0.03em",
//             }}>
//             {s}
//           </button>
//         );
//       })}
//     </div>
//   );
// }

// /* ── Stock pill: red below 5, amber 5-9, green 10+ ──────────────────────── */
// function StockPill({ qty, T, theme }) {
//   const n = qty || 0;
//   let color, bg, border, dot, label;
//   if (n === 0) {
//     color = T.danger; bg = T.dangerBg; border = T.dangerBorder;
//     dot = T.danger; label = "Out of stock";
//   } else if (n < 5) {
//     color = "#DC2626"; bg = "rgba(220,38,38,0.08)"; border = "rgba(220,38,38,0.3)";
//     dot = "#DC2626"; label = `${n} left — Low!`;
//   } else if (n < 10) {
//     color = "#D97706"; bg = "rgba(217,119,6,0.08)"; border = "rgba(217,119,6,0.3)";
//     dot = "#D97706"; label = `${n} in stock`;
//   } else {
//     color = T.green; bg = T.greenBg; border = T.greenBorder;
//     dot = T.green; label = `${n} in stock`;
//   }
//   return (
//     <div style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"3px 9px",
//       borderRadius:20, marginBottom:10, background:bg, border:`1.5px solid ${border}` }}>
//       <div style={{ width:5, height:5, borderRadius:"50%", background:dot,
//         boxShadow: n > 0 && n < 5 ? `0 0 0 2px rgba(220,38,38,0.2)` : "none",
//         animation: n > 0 && n < 5 ? "pulseRed 1.4s ease-in-out infinite" : "none" }}/>
//       <span style={{ fontSize:11, fontWeight:700, color }}>{label}</span>
//     </div>
//   );
// }

// export default function AdminProducts() {
//   const raw = useAdminTheme();
//   // Guarantee T is always a valid object even if context isn't set up
//   const theme = raw?.theme || "dark";
//   const T = raw?.T || (theme === "dark" ? _DARK : _LIGHT);
//   const [products,       setProducts]       = useState([]);
//   const [categories,     setCategories]     = useState([]);
//   const [loading,        setLoading]        = useState(true);
//   const [saving,         setSaving]         = useState(false);
//   const [modalOpen,      setModalOpen]      = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [form,           setForm]           = useState({...EMPTY});
//   const [uploadingImage, setUploadingImage] = useState(null);
//   const [currentPage,    setCurrentPage]    = useState(0);
//   const [totalPages,     setTotalPages]     = useState(0);
//   const [searchQuery,    setSearchQuery]    = useState("");
//   const [activeTab,      setActiveTab]      = useState("basic");
//   const [filterActive,   setFilterActive]   = useState("all");

//   useEffect(() => { fetchProducts(); fetchCategories(); }, [currentPage, searchQuery]);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const data = await adminAPI.getAllProducts(currentPage, 20, searchQuery);
//       setProducts(data.content || []); setTotalPages(data.totalPages || 0);
//     } catch(e) { console.error(e); }
//     finally { setLoading(false); }
//   };

//   const fetchCategories = async () => {
//     try { setCategories(await adminAPI.getAllCategories()); } catch(e) { console.error(e); }
//   };

//   /* ── Parse colours/sizes from product (backend stores as comma string or array) */
//   const parseList = (val) => {
//     if (!val) return [];
//     if (Array.isArray(val)) return val;
//     return val.split(",").map(v => v.trim()).filter(Boolean);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); setSaving(true);
//     try {
//       const payload = {
//         ...form,
//         price:          parseFloat(form.price),
//         originalPrice:  form.originalPrice ? parseFloat(form.originalPrice) : null,
//         discountPercent:parseInt(form.discountPercent) || 0,
//         stockQuantity:  parseInt(form.stockQuantity) || 0,
//         categoryId:     parseInt(form.categoryId),
//         /* Send colours & sizes as comma-separated strings so the backend
//            stores them in a single VARCHAR column without schema changes.
//            If your backend already accepts arrays, just pass form.colours / form.sizes directly. */
//         colour:  form.colours.join(","),
//         size:    form.sizes.join(","),
//         colours: form.colours,   // also send array for backends that support it
//         sizes:   form.sizes,
//         gender:  form.gender,
//         fabric:  form.fabric,
//         occasion:form.occasion,
//       };
//       if (editingProduct) await adminAPI.updateProduct(editingProduct.id, payload);
//       else                await adminAPI.createProduct(payload);
//       fetchProducts(); closeModal();
//     } catch(e) { alert(e.response?.data?.message || "Failed to save product"); }
//     finally { setSaving(false); }
//   };

//   const handleImageUpload = async (id, file) => {
//     setUploadingImage(id);
//     try { await adminAPI.uploadProductImage(id, file); fetchProducts(); }
//     catch { alert("Image upload failed"); }
//     finally { setUploadingImage(null); }
//   };

//   const handleDelete   = async (id) => { if (!confirm("Delete this product?")) return; try { await adminAPI.deleteProduct(id); fetchProducts(); } catch { alert("Failed to delete"); } };
//   const toggleFeatured = async (id) => { try { await adminAPI.toggleFeatured(id); fetchProducts(); } catch { alert("Failed"); } };
//   const toggleActive   = async (id) => { try { await adminAPI.toggleActive(id);   fetchProducts(); } catch { alert("Failed"); } };

//   const openModal = (product = null) => {
//     setEditingProduct(product);
//     setForm(product ? {
//       name:           product.name,
//       description:    product.description || "",
//       price:          product.price.toString(),
//       originalPrice:  product.originalPrice?.toString() || "",
//       discountPercent:product.discountPercent || 0,
//       stockQuantity:  product.stockQuantity || 0,
//       categoryId:     product.category?.id?.toString() || "",
//       isFeatured:     product.isFeatured || false,
//       isActive:       product.isActive !== false,
//       /* Parse both array and comma-string formats from backend */
//       colours:        parseList(product.colours || product.colour),
//       sizes:          parseList(product.sizes   || product.size),
//       gender:         product.gender  || "",
//       fabric:         product.fabric  || "",
//       occasion:       product.occasion|| "",
//     } : { ...EMPTY });
//     setActiveTab("basic"); setModalOpen(true);
//   };

//   const closeModal = () => { setModalOpen(false); setEditingProduct(null); setForm({...EMPTY}); };

//   const iStyle = {
//     width:"100%", padding:"11px 14px", background:T.inputBg,
//     border:`1.5px solid ${T.inputBorder}`, borderRadius:8,
//     color:T.text, fontSize:14, outline:"none", fontFamily:SANS, transition:"border-color 0.15s",
//     boxShadow:theme==="light"?"inset 0 1px 3px rgba(0,0,0,0.04)":"none",
//   };
//   const lStyle = {
//     display:"block", fontSize:11, fontWeight:700, letterSpacing:"0.15em",
//     textTransform:"uppercase", color:T.muted, marginBottom:7,
//   };
//   const fi = e => e.target.style.borderColor = T.inputFocus;
//   const fo = e => e.target.style.borderColor = T.inputBorder;
//   const fld = (key) => ({ value:form[key], onChange:e=>setForm({...form,[key]:e.target.value}), onFocus:fi, onBlur:fo });

//   const visibleProducts = filterActive === "all"      ? products
//     : filterActive === "featured"  ? products.filter(p=>p.isFeatured)
//     : filterActive === "active"    ? products.filter(p=>p.isActive)
//     : filterActive === "inactive"  ? products.filter(p=>!p.isActive)
//     : filterActive === "lowstock"  ? products.filter(p=>(p.stockQuantity||0)>0&&(p.stockQuantity||0)<5)
//     : filterActive === "nostock"   ? products.filter(p=>(p.stockQuantity||0)===0)
//     : products;

//   const counts = {
//     all:      products.length,
//     featured: products.filter(p=>p.isFeatured).length,
//     active:   products.filter(p=>p.isActive).length,
//     inactive: products.filter(p=>!p.isActive).length,
//     lowstock: products.filter(p=>(p.stockQuantity||0)>0&&(p.stockQuantity||0)<5).length,
//     nostock:  products.filter(p=>(p.stockQuantity||0)===0).length,
//   };

//   const FILTER_TABS = [
//     { key:"all",      label:`All (${counts.all})` },
//     { key:"active",   label:`Active (${counts.active})` },
//     { key:"featured", label:`Featured (${counts.featured})` },
//     { key:"inactive", label:`Inactive (${counts.inactive})` },
//     { key:"lowstock", label:`⚠ Low Stock (${counts.lowstock})`, warn:true },
//     { key:"nostock",  label:`No Stock (${counts.nostock})` },
//   ];

//   return (
//     <div style={{ fontFamily:SANS, color:T.text }}>

//       {/* ── HEADER ── */}
//       <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:22 }}>
//         <div>
//           <h1 style={{ fontFamily:SERIF, fontSize:28, fontWeight:700, color:T.text, marginBottom:5 }}>Products</h1>
//           <p style={{ fontSize:14, color:T.muted }}>Manage your product catalog — {products.length} items</p>
//         </div>
//         <button onClick={() => openModal()}
//           style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 20px",
//             background:T.maroon, color:"#FFFFF0", border:"none", cursor:"pointer",
//             fontSize:13, fontWeight:600, fontFamily:SANS, borderRadius:8, whiteSpace:"nowrap",
//             boxShadow:theme==="light"?"0 2px 8px rgba(128,0,0,0.25)":"none" }}>
//           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//             <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
//           </svg>
//           New Product
//         </button>
//       </div>

//       {/* ── TOOLBAR ── */}
//       <div style={{ background:T.card, border:`1.5px solid ${T.statBorder||T.border}`,
//         borderRadius:10, marginBottom:18, boxShadow:T.shadow }}>
//         <div style={{ padding:"12px 14px", borderBottom:`1px solid ${T.tableBorder}`, display:"flex", gap:10 }}>
//           <div style={{ position:"relative", flex:1, maxWidth:340 }}>
//             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.muted} strokeWidth="2"
//               style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}>
//               <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
//             </svg>
//             <input placeholder="Search by name, category…" value={searchQuery}
//               onChange={e=>{setSearchQuery(e.target.value); setCurrentPage(0);}}
//               style={{ ...iStyle, paddingLeft:36 }} onFocus={fi} onBlur={fo}/>
//           </div>
//         </div>
//         <div style={{ padding:"8px 14px", display:"flex", gap:6, overflowX:"auto" }}>
//           {FILTER_TABS.map(f => (
//             <button key={f.key} onClick={()=>setFilterActive(f.key)}
//               style={{ padding:"7px 14px", borderRadius:7,
//                 border:`1.5px solid ${filterActive===f.key ? (f.warn?"rgba(220,38,38,0.6)":T.borderHi) : T.border}`,
//                 background: filterActive===f.key
//                   ? (f.warn?"rgba(220,38,38,0.08)":(theme==="dark"?"rgba(212,175,55,0.1)":"rgba(128,0,0,0.06)"))
//                   : "transparent",
//                 color: filterActive===f.key
//                   ? (f.warn?"#DC2626":(theme==="dark"?T.gold:T.maroon))
//                   : (f.warn&&counts.lowstock>0?"#DC2626":T.muted),
//                 fontSize:12, fontWeight:filterActive===f.key?700:500, cursor:"pointer",
//                 fontFamily:SANS, transition:"all 0.15s", whiteSpace:"nowrap" }}>
//               {f.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ── PRODUCT GRID ── */}
//       {loading ? (
//         <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:14 }}>
//           {[...Array(8)].map((_,i) => (
//             <div key={i} style={{ height:330, background:T.card, borderRadius:12,
//               border:`1px solid ${T.statBorder||T.border}`, animation:"fadeInOut 1.4s ease-in-out infinite" }}/>
//           ))}
//         </div>
//       ) : visibleProducts.length === 0 ? (
//         <div style={{ textAlign:"center", padding:"80px 20px", background:T.card,
//           border:`2px dashed ${T.statBorder||T.border}`, borderRadius:14 }}>
//           <div style={{ width:56, height:56, margin:"0 auto 18px", borderRadius:14,
//             background:theme==="dark"?"rgba(212,175,55,0.07)":"#FEF9ED",
//             border:`1.5px solid ${theme==="dark"?"rgba(212,175,55,0.15)":"#E8D5A0"}`,
//             display:"flex", alignItems:"center", justifyContent:"center" }}>
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={theme==="dark"?T.gold:"#7A5C0A"} strokeWidth="1.5">
//               <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
//             </svg>
//           </div>
//           <p style={{ fontSize:18, fontWeight:700, color:T.text, marginBottom:8 }}>No products found</p>
//           <p style={{ fontSize:14, color:T.muted, marginBottom:22 }}>Try adjusting your search or filters</p>
//           <button onClick={() => openModal()}
//             style={{ padding:"10px 22px", background:T.maroon, color:"#FFFFF0",
//               border:"none", cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:SANS, borderRadius:8 }}>
//             Add Product
//           </button>
//         </div>
//       ) : (
//         <>
//           <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:14 }}>
//             {visibleProducts.map((p,i) => {
//               const stockQty = p.stockQuantity || 0;
//               const isLow    = stockQty > 0 && stockQty < 5;
//               /* Parse multi-value attributes for display */
//               const displayColours = parseList(p.colours || p.colour);
//               const displaySizes   = parseList(p.sizes   || p.size);

//               return (
//               <motion.div key={p.id} initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.04 }}
//                 className="p-card"
//                 style={{ background:T.card,
//                   border:`1.5px solid ${isLow?"rgba(220,38,38,0.35)":(T.statBorder||T.border)}`,
//                   borderRadius:13, overflow:"hidden",
//                   display:"flex", flexDirection:"column",
//                   boxShadow: isLow
//                     ? (theme==="dark"?"0 0 0 1px rgba(220,38,38,0.15)":"0 0 0 1px rgba(220,38,38,0.1)")
//                     : T.shadow,
//                   transition:"background 0.3s, border-color 0.3s, box-shadow 0.18s" }}>

//                 {/* Image */}
//                 <div style={{ position:"relative", height:175, background:T.inputBg, overflow:"hidden" }}>
//                   {p.imageUrl
//                     ? <img src={p.imageUrl} alt={p.name} className="p-img"
//                         style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s" }}/>
//                     : <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center" }}>
//                         <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
//                           stroke={theme==="dark"?"rgba(255,255,255,0.08)":"#D1CBC0"} strokeWidth="1">
//                           <rect x="3" y="3" width="18" height="18" rx="2"/>
//                           <circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
//                         </svg>
//                       </div>
//                   }
//                   {/* Upload overlay */}
//                   <label className="p-overlay"
//                     style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.78)",
//                       display:"flex", alignItems:"center", justifyContent:"center",
//                       cursor:"pointer", opacity:0, transition:"opacity 0.2s" }}>
//                     <input type="file" accept="image/*" style={{ display:"none" }}
//                       onChange={e=>handleImageUpload(p.id,e.target.files[0])} disabled={uploadingImage===p.id}/>
//                     {uploadingImage===p.id
//                       ? <div style={{ width:26, height:26, border:"2px solid #D4AF37",
//                           borderTopColor:"transparent", borderRadius:"50%", animation:"spin 0.8s linear infinite" }}/>
//                       : <div style={{ textAlign:"center" }}>
//                           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5"
//                             style={{ display:"block", margin:"0 auto 5px" }}>
//                             <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
//                           </svg>
//                           <span style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"#D4AF37", fontWeight:700 }}>Upload</span>
//                         </div>
//                     }
//                   </label>

//                   {/* Badges */}
//                   <div style={{ position:"absolute", top:8, left:8, display:"flex", flexDirection:"column", gap:4 }}>
//                     {p.isFeatured && (
//                       <span style={{ padding:"2px 8px", background:"rgba(212,175,55,0.92)", color:"#1a1200",
//                         fontSize:10, fontWeight:800, letterSpacing:"0.06em", textTransform:"uppercase", borderRadius:4 }}>★ Featured</span>
//                     )}
//                     {!p.isActive && (
//                       <span style={{ padding:"2px 8px", background:"rgba(185,28,28,0.9)", color:"white",
//                         fontSize:10, fontWeight:800, letterSpacing:"0.06em", textTransform:"uppercase", borderRadius:4 }}>Inactive</span>
//                     )}
//                     {stockQty === 0 && (
//                       <span style={{ padding:"2px 8px", background:"rgba(0,0,0,0.78)", color:"#ccc",
//                         fontSize:10, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", borderRadius:4 }}>No Stock</span>
//                     )}
//                     {p.discountPercent > 0 && (
//                       <span style={{ padding:"2px 8px", background:"rgba(21,128,61,0.9)", color:"white",
//                         fontSize:10, fontWeight:800, letterSpacing:"0.04em", borderRadius:4 }}>{p.discountPercent}% OFF</span>
//                     )}
//                   </div>

//                   {/* Low stock — absolute banner at bottom of image, no layout shift */}
//                   {isLow && (
//                     <div style={{
//                       position:"absolute", bottom:0, left:0, right:0,
//                       background:"linear-gradient(transparent,rgba(180,0,0,0.82))",
//                       padding:"18px 10px 6px",
//                       display:"flex", alignItems:"center", gap:5,
//                     }}>
//                       <div style={{ width:5, height:5, borderRadius:"50%", background:"#fff",
//                         animation:"pulseRed 1.2s ease-in-out infinite", flexShrink:0 }}/>
//                       <span style={{ fontSize:10, fontWeight:800, color:"#fff",
//                         letterSpacing:"0.08em", textTransform:"uppercase" }}>
//                         LOW STOCK — ONLY {stockQty} LEFT
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Product info — flex column so actions always pin to bottom */}
//                 <div style={{
//                   padding:"11px 12px 12px",
//                   display:"flex", flexDirection:"column", flex:1,
//                 }}>

//                   {/* ── Top section: category, name, price, stock (fixed) ── */}
//                   <div>
//                     {/* Category + gender row */}
//                     <div style={{ display:"flex", gap:5, marginBottom:6, flexWrap:"wrap" }}>
//                       <span style={{ padding:"2px 7px", borderRadius:4,
//                         fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase",
//                         background:theme==="dark"?"rgba(212,175,55,0.1)":"#FEF9ED",
//                         color:theme==="dark"?T.gold:"#7A5C0A",
//                         border:`1px solid ${theme==="dark"?"rgba(212,175,55,0.2)":"#E8D5A0"}` }}>
//                         {p.category?.name || "Uncategorised"}
//                       </span>
//                       {p.gender && (
//                         <span style={{ padding:"2px 7px", borderRadius:4,
//                           fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase",
//                           background:theme==="dark"?"rgba(255,255,255,0.05)":"#F3F0EC",
//                           color:T.muted, border:`1px solid ${T.border}` }}>
//                           {p.gender}
//                         </span>
//                       )}
//                     </div>

//                     {/* Name */}
//                     <h3 style={{ fontSize:13, fontWeight:700, color:T.text, marginBottom:6,
//                       overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis", lineHeight:1.3 }}>
//                       {p.name}
//                     </h3>

//                     {/* Price */}
//                     <div style={{ display:"flex", alignItems:"baseline", gap:6, marginBottom:6 }}>
//                       <span style={{ fontFamily:SERIF, fontSize:16, fontWeight:700, color:T.text }}>
//                         ₹{p.price?.toLocaleString("en-IN")}
//                       </span>
//                       {p.originalPrice && p.originalPrice > p.price && (
//                         <span style={{ fontSize:11, color:T.dim, textDecoration:"line-through" }}>
//                           ₹{p.originalPrice?.toLocaleString("en-IN")}
//                         </span>
//                       )}
//                     </div>

//                     {/* Stock pill */}
//                     <StockPill qty={stockQty} T={T} theme={theme} />
//                   </div>

//                   {/* ── Middle: fixed 44px attribute strip — same height on every card ── */}
//                   <div style={{ height:44, overflow:"hidden", marginBottom:8, display:"flex", flexDirection:"column", justifyContent:"center", gap:4 }}>
//                     {/* Colour swatches row */}
//                     <div style={{ display:"flex", gap:4, alignItems:"center", flexWrap:"nowrap", overflow:"hidden" }}>
//                       {displayColours.length > 0
//                         ? displayColours.slice(0,8).map(c => {
//                             const opt = COLOUR_OPTIONS.find(o=>o.label===c);
//                             return opt ? (
//                               <span key={c} title={c} style={{
//                                 width:11, height:11, borderRadius:"50%", flexShrink:0,
//                                 background:opt.hex, border:"1.5px solid rgba(0,0,0,0.15)",
//                                 display:"inline-block",
//                               }}/>
//                             ) : null;
//                           })
//                         : <span style={{ fontSize:10, color:T.dim, fontStyle:"italic" }}>No colours</span>
//                       }
//                       {displayColours.length > 8 && <span style={{ fontSize:10, color:T.muted, flexShrink:0 }}>+{displayColours.length-8}</span>}
//                     </div>

//                     {/* Size chips row */}
//                     <div style={{ display:"flex", gap:3, alignItems:"center", flexWrap:"nowrap", overflow:"hidden" }}>
//                       {displaySizes.length > 0
//                         ? displaySizes.slice(0,6).map(s => (
//                             <span key={s} style={{ padding:"1px 5px", borderRadius:4, fontSize:10, fontWeight:600, flexShrink:0,
//                               background:T.badgePill||T.hoverBg, border:`1px solid ${T.statBorder||T.border}`, color:T.muted }}>
//                               {s}
//                             </span>
//                           ))
//                         : <span style={{ fontSize:10, color:T.dim, fontStyle:"italic" }}>No sizes</span>
//                       }
//                       {displaySizes.length > 6 && <span style={{ fontSize:10, color:T.muted, flexShrink:0 }}>+{displaySizes.length-6}</span>}
//                     </div>
//                   </div>

//                   {/* ── Bottom section: actions pinned to bottom via marginTop:auto ── */}
//                   <div style={{ marginTop:"auto" }}>
//                     <div style={{ display:"grid", gridTemplateColumns:"1fr auto auto", gap:5 }}>
//                       <button onClick={()=>openModal(p)}
//                         style={{ padding:"8px", background:"rgba(212,175,55,0.07)", border:`1px solid ${T.borderHi}`,
//                           color:T.gold, cursor:"pointer", fontSize:11, fontWeight:700, letterSpacing:"0.06em",
//                           textTransform:"uppercase", fontFamily:SANS, borderRadius:7, transition:"all 0.12s" }}
//                         onMouseEnter={e=>e.currentTarget.style.background="rgba(212,175,55,0.14)"}
//                         onMouseLeave={e=>e.currentTarget.style.background="rgba(212,175,55,0.07)"}>Edit</button>
//                       <button onClick={()=>toggleFeatured(p.id)} title={p.isFeatured?"Unfeature":"Feature"}
//                         style={{ padding:"8px 10px", background:p.isFeatured?"rgba(212,175,55,0.15)":"transparent",
//                           border:`1px solid ${T.borderHi}`, color:T.gold, cursor:"pointer", borderRadius:7, fontSize:13 }}>★</button>
//                       <button onClick={()=>handleDelete(p.id)}
//                         style={{ padding:"8px 10px", background:T.dangerBg, border:`1px solid ${T.dangerBorder}`,
//                           color:T.danger, cursor:"pointer", borderRadius:7, display:"flex", alignItems:"center", transition:"all 0.12s" }}
//                         onMouseEnter={e=>e.currentTarget.style.background="rgba(220,38,38,0.14)"}
//                         onMouseLeave={e=>e.currentTarget.style.background=T.dangerBg}>
//                         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
//                           <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
//                         </svg>
//                       </button>
//                     </div>
//                     <button onClick={()=>toggleActive(p.id)}
//                       style={{ width:"100%", marginTop:5, padding:"7px", background:"transparent",
//                         border:`1px solid ${p.isActive?T.greenBorder:T.dangerBorder}`,
//                         color:p.isActive?T.green:T.danger, cursor:"pointer", fontSize:11, fontWeight:700,
//                         letterSpacing:"0.06em", textTransform:"uppercase", fontFamily:SANS, borderRadius:7 }}>
//                       {p.isActive ? "● Active" : "○ Inactive"}
//                     </button>
//                   </div>

//                 </div>
//               </motion.div>
//             );})}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:8, marginTop:28 }}>
//               <button onClick={()=>setCurrentPage(p=>Math.max(0,p-1))} disabled={currentPage===0}
//                 style={{ padding:"8px 16px", background:"transparent", border:`1.5px solid ${T.border}`,
//                   color:currentPage===0?T.dim:T.text, cursor:currentPage===0?"default":"pointer",
//                   fontSize:13, fontFamily:SANS, borderRadius:7 }}>← Prev</button>
//               <span style={{ padding:"8px 18px", background:T.card, border:`1.5px solid ${T.statBorder||T.border}`,
//                 color:T.text, fontSize:13, borderRadius:7, fontWeight:600 }}>
//                 Page {currentPage+1} of {totalPages}
//               </span>
//               <button onClick={()=>setCurrentPage(p=>Math.min(totalPages-1,p+1))} disabled={currentPage>=totalPages-1}
//                 style={{ padding:"8px 16px", background:"transparent", border:`1.5px solid ${T.border}`,
//                   color:currentPage>=totalPages-1?T.dim:T.text, cursor:currentPage>=totalPages-1?"default":"pointer",
//                   fontSize:13, fontFamily:SANS, borderRadius:7 }}>Next →</button>
//             </div>
//           )}
//         </>
//       )}

//       {/* ── PRODUCT MODAL ── */}
//       <AnimatePresence>
//         {modalOpen && (
//           <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
//             style={{ position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"flex-start",
//               justifyContent:"center", padding:"24px 16px",
//               background:"rgba(0,0,0,0.6)", overflowY:"auto", backdropFilter:"blur(4px)" }}
//             onClick={closeModal}>
//             <motion.div initial={{scale:0.93,opacity:0,y:20}} animate={{scale:1,opacity:1,y:0}}
//               exit={{scale:0.93,opacity:0}} transition={{type:"spring",stiffness:320,damping:28}}
//               style={{ width:"100%", maxWidth:680, background:T.surface,
//                 border:`1.5px solid ${T.borderHi}`, borderRadius:18, overflow:"hidden",
//                 marginBottom:24, boxShadow:"0 24px 64px rgba(0,0,0,0.3)" }}
//               onClick={e=>e.stopPropagation()}>

//               {/* Modal header */}
//               <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
//                 padding:"20px 24px", borderBottom:`1.5px solid ${T.tableBorder}`,
//                 background:theme==="light"?"#FAFAF8":T.surface }}>
//                 <div>
//                   <h2 style={{ fontFamily:SERIF, fontSize:24, fontWeight:700, color:T.text }}>
//                     {editingProduct ? "Edit Product" : "New Product"}
//                   </h2>
//                   <p style={{ fontSize:13, color:T.muted, marginTop:3 }}>
//                     {editingProduct ? "Update product information" : "Add a new item to your catalog"}
//                   </p>
//                 </div>
//                 <button onClick={closeModal}
//                   style={{ width:32, height:32, borderRadius:8, background:T.hoverBg,
//                     border:`1.5px solid ${T.border}`, color:T.muted, cursor:"pointer",
//                     display:"flex", alignItems:"center", justifyContent:"center" }}>
//                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//                     <path d="M18 6 6 18M6 6l12 12"/>
//                   </svg>
//                 </button>
//               </div>

//               {/* Tab bar */}
//               <div style={{ display:"flex", borderBottom:`1.5px solid ${T.tableBorder}` }}>
//                 {[
//                   { key:"basic",      label:"📋 Basic Info" },
//                   { key:"attributes", label:"🏷️ Attributes & Filters" },
//                 ].map(tab => (
//                   <button key={tab.key} onClick={()=>setActiveTab(tab.key)}
//                     style={{ flex:1, padding:"14px", background:"transparent", border:"none",
//                       cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:SANS,
//                       color:activeTab===tab.key?(theme==="dark"?T.gold:T.maroon):T.muted,
//                       borderBottom:`2.5px solid ${activeTab===tab.key?(theme==="dark"?T.gold:T.maroon):"transparent"}`,
//                       transition:"all 0.15s" }}>
//                     {tab.label}
//                   </button>
//                 ))}
//               </div>

//               <form onSubmit={handleSubmit}>
//                 <div style={{ padding:"22px 24px", display:"flex", flexDirection:"column", gap:16 }}>

//                   {/* ── TAB: BASIC ── */}
//                   {activeTab === "basic" && <>
//                     <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
//                       <div>
//                         <label style={lStyle}>Product Name *</label>
//                         <input type="text" required {...fld("name")} placeholder="e.g. Kanjivaram Silk Saree" style={iStyle}/>
//                       </div>
//                       <div>
//                         <label style={lStyle}>Category *</label>
//                         <select required {...fld("categoryId")} style={{...iStyle, cursor:"pointer"}}>
//                           <option value="">Select category</option>
//                           {categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
//                         </select>
//                       </div>
//                     </div>

//                     <div>
//                       <label style={lStyle}>Description</label>
//                       <textarea {...fld("description")} rows={3}
//                         placeholder="Describe the product — fabric, weave, occasion…"
//                         style={{...iStyle, resize:"vertical"}}/>
//                     </div>

//                     <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
//                       <div>
//                         <label style={lStyle}>Sale Price (₹) *</label>
//                         <input type="number" step="0.01" required {...fld("price")} placeholder="0.00" style={iStyle}/>
//                       </div>
//                       <div>
//                         <label style={lStyle}>MRP / Original (₹)</label>
//                         <input type="number" step="0.01" {...fld("originalPrice")} placeholder="0.00" style={iStyle}/>
//                       </div>
//                       <div>
//                         <label style={lStyle}>Stock Qty *</label>
//                         <input type="number" required {...fld("stockQuantity")} placeholder="0" style={iStyle}/>
//                         {/* Inline stock warning in form */}
//                         {parseInt(form.stockQuantity) > 0 && parseInt(form.stockQuantity) < 5 && (
//                           <p style={{ fontSize:11, color:"#DC2626", marginTop:5, fontWeight:600,
//                             display:"flex", alignItems:"center", gap:4 }}>
//                             <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//                               <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
//                               <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
//                             </svg>
//                             Low stock — consider restocking soon
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     <div style={{ display:"flex", gap:12 }}>
//                       {[
//                         { label:"★ Featured", sublabel:"Shown in featured section", key:"isFeatured",
//                           color:theme==="dark"?T.gold:"#7A5C0A",
//                           bg:theme==="dark"?"rgba(212,175,55,0.06)":"#FEF9ED",
//                           bd:theme==="dark"?"rgba(212,175,55,0.2)":"#C8A840" },
//                         { label:"Active", sublabel:"Visible to customers", key:"isActive",
//                           color:T.green, bg:T.greenBg, bd:T.greenBorder },
//                       ].map(t => (
//                         <label key={t.key} style={{ flex:1, display:"flex", alignItems:"center", gap:12,
//                           padding:"12px 14px", background:t.bg, border:`1.5px solid ${t.bd}`, borderRadius:8, cursor:"pointer" }}>
//                           <div style={{ position:"relative", width:36, height:20, flexShrink:0 }}
//                             onClick={()=>setForm({...form,[t.key]:!form[t.key]})}>
//                             <div style={{ width:36, height:20, borderRadius:10,
//                               background:form[t.key]?t.color:"rgba(128,128,128,0.25)", transition:"background 0.2s" }}/>
//                             <div style={{ position:"absolute", top:2, left:form[t.key]?18:2, width:16, height:16,
//                               borderRadius:"50%", background:"white", transition:"left 0.2s",
//                               boxShadow:"0 1px 3px rgba(0,0,0,0.25)" }}/>
//                           </div>
//                           <div>
//                             <p style={{ fontSize:13, fontWeight:700, color:t.color }}>{t.label}</p>
//                             <p style={{ fontSize:11, color:T.muted }}>{t.sublabel}</p>
//                           </div>
//                         </label>
//                       ))}
//                     </div>
//                   </>}

//                   {/* ── TAB: ATTRIBUTES ── */}
//                   {activeTab === "attributes" && <>
                    

//                     {/* GENDER (single — determines section) */}
//                     <div>
//                       <label style={lStyle}>Gender * <span style={{fontSize:10,fontWeight:500,letterSpacing:0,textTransform:"none",color:T.danger}}>(required — determines Women / Men / Kids section)</span></label>
//                       <div style={{ display:"flex", gap:8, marginTop:6 }}>
//                         {["Women","Men","Kids","Unisex"].map(g => (
//                           <button key={g} type="button" onClick={()=>setForm({...form, gender:g})}
//                             style={{
//                               flex:1, padding:"10px 8px",
//                               borderRadius:8,
//                               border:`2px solid ${form.gender===g?(theme==="dark"?"#D4AF37":"#800000"):(theme==="dark"?"rgba(255,255,255,0.12)":"#D1CBC0")}`,
//                               background: form.gender===g
//                                 ? (theme==="dark"?"rgba(212,175,55,0.12)":"rgba(128,0,0,0.07)")
//                                 : "transparent",
//                               cursor:"pointer", fontFamily:SANS, fontSize:13,
//                               fontWeight: form.gender===g?800:500,
//                               color: form.gender===g?(theme==="dark"?"#D4AF37":"#800000"):T.muted,
//                               transition:"all 0.15s",
//                             }}>
//                             {g}
//                           </button>
//                         ))}
//                       </div>
//                     </div>

//                     {/* COLOURS — multi-select */}
//                     <div>
//                       <label style={lStyle}>
//                         Colours
//                         {form.colours.length > 0 && (
//                           <span style={{ marginLeft:8, fontSize:10, fontWeight:500,
//                             textTransform:"none", letterSpacing:0, color:T.muted }}>
//                             ({form.colours.length} selected)
//                           </span>
//                         )}
//                       </label>
//                       <ColourPicker
//                         selected={form.colours}
//                         onChange={colours => setForm({...form, colours})}
//                         T={T} theme={theme}
//                       />
//                       {form.colours.length === 0 && (
//                         <p style={{ fontSize:11, color:T.dim, marginTop:6, fontStyle:"italic" }}>
//                           Click colours to select — you can pick multiple
//                         </p>
//                       )}
//                     </div>

//                     {/* SIZES — multi-select */}
//                     <div>
//                       <label style={lStyle}>
//                         Available Sizes
//                         {form.sizes.length > 0 && (
//                           <span style={{ marginLeft:8, fontSize:10, fontWeight:500,
//                             textTransform:"none", letterSpacing:0, color:T.muted }}>
//                             ({form.sizes.length} selected: {form.sizes.join(", ")})
//                           </span>
//                         )}
//                       </label>
//                       <SizePicker
//                         selected={form.sizes}
//                         onChange={sizes => setForm({...form, sizes})}
//                         T={T} theme={theme}
//                       />
//                       {form.sizes.length === 0 && (
//                         <p style={{ fontSize:11, color:T.dim, marginTop:6, fontStyle:"italic" }}>
//                           Click sizes to select — e.g. M, L, XL all at once
//                         </p>
//                       )}
//                     </div>

//                     {/* FABRIC + OCCASION */}
//                     <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
//                       <div>
//                         <label style={lStyle}>Fabric / Material</label>
//                         <select {...fld("fabric")} style={{...iStyle, cursor:"pointer"}}>
//                           <option value="">Select</option>
//                           {["Pure Silk","Kanjivaram Silk","Banarasi Silk","Tussar Silk","Chanderi","Cotton","Cotton Silk","Georgette","Chiffon","Linen","Polyester","Crepe"].map(f=><option key={f}>{f}</option>)}
//                         </select>
//                       </div>
//                       <div>
//                         <label style={lStyle}>Occasion</label>
//                         <select {...fld("occasion")} style={{...iStyle, cursor:"pointer"}}>
//                           <option value="">Select</option>
//                           {["Wedding","Festival","Casual","Party","Office","Daily Wear","Traditional","Formal"].map(o=><option key={o}>{o}</option>)}
//                         </select>
//                       </div>
//                     </div>

//                     {/* Live attribute preview */}
//                     <div style={{ padding:"14px", borderRadius:9,
//                       background:T.cardAlt||T.hoverBg, border:`1.5px solid ${T.statBorder||T.border}` }}>
//                       <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase",
//                         color:T.muted, marginBottom:10 }}>Attribute Preview — what gets saved</p>
//                       <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>

//                         {/* Gender chip */}
//                         {form.gender && (
//                           <span style={{ padding:"5px 12px", borderRadius:20, fontSize:12, fontWeight:600,
//                             background:theme==="dark"?"rgba(212,175,55,0.1)":"#FEF9ED",
//                             border:`1.5px solid ${theme==="dark"?"rgba(212,175,55,0.25)":"#C8A840"}`,
//                             color:theme==="dark"?T.gold:"#7A5C0A" }}>
//                             👤 {form.gender}
//                           </span>
//                         )}

//                         {/* Colour chips */}
//                         {form.colours.map(c => {
//                           const opt = COLOUR_OPTIONS.find(o=>o.label===c);
//                           return (
//                             <span key={c} style={{ padding:"5px 12px 5px 8px", borderRadius:20, fontSize:12, fontWeight:600,
//                               display:"inline-flex", alignItems:"center", gap:6,
//                               background:theme==="dark"?"rgba(212,175,55,0.1)":"#FEF9ED",
//                               border:`1.5px solid ${theme==="dark"?"rgba(212,175,55,0.25)":"#C8A840"}`,
//                               color:theme==="dark"?T.gold:"#7A5C0A" }}>
//                               {opt && <span style={{ width:10, height:10, borderRadius:"50%", background:opt.hex,
//                                 border:"1px solid rgba(0,0,0,0.15)", flexShrink:0 }}/>}
//                               {c}
//                             </span>
//                           );
//                         })}

//                         {/* Size chips */}
//                         {form.sizes.map(s => (
//                           <span key={s} style={{ padding:"5px 12px", borderRadius:20, fontSize:12, fontWeight:600,
//                             background:theme==="dark"?"rgba(255,255,255,0.06)":"#F3F0EC",
//                             border:`1.5px solid ${theme==="dark"?"rgba(255,255,255,0.14)":"#C8C0B8"}`,
//                             color:T.muted }}>
//                             📐 {s}
//                           </span>
//                         ))}

//                         {form.fabric && (
//                           <span style={{ padding:"5px 12px", borderRadius:20, fontSize:12, fontWeight:600,
//                             background:theme==="dark"?"rgba(212,175,55,0.1)":"#FEF9ED",
//                             border:`1.5px solid ${theme==="dark"?"rgba(212,175,55,0.25)":"#C8A840"}`,
//                             color:theme==="dark"?T.gold:"#7A5C0A" }}>
//                             🧵 {form.fabric}
//                           </span>
//                         )}
//                         {form.occasion && (
//                           <span style={{ padding:"5px 12px", borderRadius:20, fontSize:12, fontWeight:600,
//                             background:theme==="dark"?"rgba(212,175,55,0.1)":"#FEF9ED",
//                             border:`1.5px solid ${theme==="dark"?"rgba(212,175,55,0.25)":"#C8A840"}`,
//                             color:theme==="dark"?T.gold:"#7A5C0A" }}>
//                             ✨ {form.occasion}
//                           </span>
//                         )}

//                         {!form.gender && form.colours.length===0 && form.sizes.length===0 && !form.fabric && !form.occasion && (
//                           <span style={{ fontSize:13, color:T.dim, fontStyle:"italic" }}>No attributes set yet</span>
//                         )}
//                       </div>

//                       {/* Gender warning */}
//                       {!form.gender && (
//                         <p style={{ marginTop:10, fontSize:12, color:"#DC2626", fontWeight:600,
//                           display:"flex", alignItems:"center", gap:5 }}>
//                           <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//                             <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
//                             <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
//                           </svg>
//                           Gender is not set — this product won't appear in Women / Men / Kids pages
//                         </p>
//                       )}
//                     </div>
//                   </>}
//                 </div>

//                 {/* Modal footer */}
//                 <div style={{ display:"flex", gap:10, padding:"16px 24px",
//                   borderTop:`1.5px solid ${T.tableBorder}`,
//                   background:theme==="light"?"#FAFAF8":T.surface }}>
//                   <button type="button" onClick={closeModal}
//                     style={{ flex:1, padding:"12px", background:"transparent",
//                       border:`1.5px solid ${T.border}`, color:T.muted, cursor:"pointer",
//                       fontSize:13, fontWeight:600, fontFamily:SANS, borderRadius:8 }}>
//                     Cancel
//                   </button>
//                   {activeTab==="basic" && (
//                     <button type="button" onClick={()=>setActiveTab("attributes")}
//                       style={{ flex:1, padding:"12px", cursor:"pointer", fontSize:13, fontWeight:600,
//                         fontFamily:SANS, borderRadius:8, transition:"all 0.15s",
//                         background:theme==="dark"?"rgba(212,175,55,0.08)":"#FEF9ED",
//                         border:`1.5px solid ${theme==="dark"?"rgba(212,175,55,0.3)":"#C8A840"}`,
//                         color:theme==="dark"?T.gold:"#7A5C0A" }}>
//                       Attributes & Filters →
//                     </button>
//                   )}
//                   <button type="submit" disabled={saving}
//                     style={{ flex:2, padding:"12px", background:T.maroon, color:"#FFFFF0", border:"none",
//                       cursor:saving?"wait":"pointer", fontSize:13, fontWeight:700, fontFamily:SANS,
//                       borderRadius:8, opacity:saving?0.7:1, transition:"opacity 0.15s",
//                       boxShadow:theme==="light"?"0 2px 8px rgba(128,0,0,0.3)":"none" }}>
//                     {saving ? "Saving…" : editingProduct ? "Update Product" : "Create Product"}
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
//         .p-card { transition: transform 0.18s, box-shadow 0.18s !important; }
//         .p-card:hover { transform: translateY(-3px); box-shadow: ${T.shadowMd} !important; }
//         .p-card:hover .p-overlay { opacity: 1 !important; }
//         .p-card:hover .p-img     { transform: scale(1.05) !important; }
//         @keyframes fadeInOut { 0%,100%{opacity:0.5} 50%{opacity:0.25} }
//         @keyframes spin      { to { transform: rotate(360deg); } }
//         @keyframes pulseRed  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
//       `}</style>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { adminAPI } from "../../api";

const SERIF = "'Cormorant Garamond', Georgia, serif";
const SANS = "'DM Sans', 'Segoe UI', sans-serif";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("basic");
  const [theme] = useState("light");

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    discountPercent: 0,
    stockQuantity: 0,
    categoryId: "",
    isFeatured: false,
    isActive: true,
    // Multi-value attributes
    colours: [],      // Array of selected colors
    sizes: [],        // Array of selected sizes
    gender: "",
    fabric: "",
    occasion: "",
  });

  // Color and size input states
  const [colorInput, setColorInput] = useState("");
  const [sizeInput, setSizeInput] = useState("");

  const AVAILABLE_COLORS = [
    "Black", "White", "Red", "Navy Blue", "Blue", "Green", 
    "Pink", "Yellow", "Orange", "Purple", "Brown", "Grey", 
    "Maroon", "Gold", "Cream", "Beige", "Turquoise", "Multi-colour"
  ];

  const AVAILABLE_SIZES = [
    "Free Size", "XS", "S", "M", "L", "XL", "XXL", "XXXL",
    "28", "30", "32", "34", "36", "38", "40", "42", "44"
  ];

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [currentPage, searchQuery]);

  const fetchProducts = async () => {
    try {
      const data = await adminAPI.getAllProducts(currentPage, 20, searchQuery);
      setProducts(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await adminAPI.getAllCategories();
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
        discountPercent: parseInt(form.discountPercent) || 0,
        stockQuantity: parseInt(form.stockQuantity) || 0,
        categoryId: parseInt(form.categoryId),
        // Send arrays as comma-separated strings for backend
        colours: form.colours.join(","),
        sizes: form.sizes.join(","),
        // ✅ CRITICAL FIX: Include gender, fabric, and occasion
        gender: form.gender || null,
        fabric: form.fabric || null,
        occasion: form.occasion || null,
      };

      if (editingProduct) {
        await adminAPI.updateProduct(editingProduct.id, payload);
      } else {
        await adminAPI.createProduct(payload);
      }
      fetchProducts();
      closeModal();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (productId, file) => {
    setUploadingImage(productId);
    try {
      await adminAPI.uploadProductImage(productId, file);
      fetchProducts();
    } catch (err) {
      alert("Image upload failed");
    } finally {
      setUploadingImage(null);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await adminAPI.deleteProduct(id);
      fetchProducts();
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  const toggleFeatured = async (id) => {
    try {
      await adminAPI.toggleFeatured(id);
      fetchProducts();
    } catch (err) {
      alert("Failed to toggle featured status");
    }
  };

  const toggleActive = async (id) => {
    try {
      await adminAPI.toggleActive(id);
      fetchProducts();
    } catch (err) {
      alert("Failed to toggle active status");
    }
  };

  // Multi-color handlers
  const addColor = (color) => {
    if (color && !form.colours.includes(color)) {
      setForm({ ...form, colours: [...form.colours, color] });
      setColorInput("");
    }
  };

  const removeColor = (color) => {
    setForm({ ...form, colours: form.colours.filter(c => c !== color) });
  };

  // Multi-size handlers
  const addSize = (size) => {
    if (size && !form.sizes.includes(size)) {
      setForm({ ...form, sizes: [...form.sizes, size] });
      setSizeInput("");
    }
  };

  const removeSize = (size) => {
    setForm({ ...form, sizes: form.sizes.filter(s => s !== size) });
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setForm({
        name: product.name,
        description: product.description || "",
        price: product.price.toString(),
        originalPrice: product.originalPrice?.toString() || "",
        discountPercent: product.discountPercent || 0,
        stockQuantity: product.stockQuantity || 0,
        categoryId: product.category?.id?.toString() || "",
        isFeatured: product.isFeatured || false,
        isActive: product.isActive !== false,
        // Parse comma-separated strings to arrays
        colours: product.colours ? product.colours.split(",").filter(Boolean) : [],
        sizes: product.sizes ? product.sizes.split(",").filter(Boolean) : [],
        gender: product.gender || "",
        fabric: product.fabric || "",
        occasion: product.occasion || "",
      });
    } else {
      setEditingProduct(null);
      setForm({
        name: "",
        description: "",
        price: "",
        originalPrice: "",
        discountPercent: 0,
        stockQuantity: 0,
        categoryId: "",
        isFeatured: false,
        isActive: true,
        colours: [],
        sizes: [],
        gender: "",
        fabric: "",
        occasion: "",
      });
    }
    setActiveTab("basic");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingProduct(null);
    setColorInput("");
    setSizeInput("");
  };

  // Get stock status
  const getStockStatus = (quantity) => {
    if (quantity === 0) return { label: "Out of Stock", color: "#DC2626", bg: "#FEE2E2" };
    if (quantity < 5) return { label: `Low Stock (${quantity})`, color: "#D97706", bg: "#FEF3C7" };
    if (quantity < 10) return { label: `${quantity} left`, color: "#CA8A04", bg: "#FEF9C3" };
    return { label: `${quantity} in stock`, color: "#059669", bg: "#D1FAE5" };
  };

  const fld = (name) => ({
    value: form[name],
    onChange: (e) => setForm({ ...form, [name]: e.target.value })
  });

  const T = {
    text: "#1A1A2E",
    muted: "#64748b",
    dim: "#94a3b8",
    border: "rgba(0,0,0,0.08)",
    tableBorder: "rgba(0,0,0,0.06)",
    hoverBg: "#F8F7F4",
    surface: "#fff",
    maroon: "#800000",
    gold: "#D4AF37",
    green: "#059669",
    greenBg: "#ECFDF5",
    greenBorder: "#A7F3D0",
  };

  const iStyle = {
    width: "100%",
    padding: "10px 14px",
    fontSize: 14,
    fontFamily: SANS,
    border: `1.5px solid ${T.border}`,
    borderRadius: 8,
    outline: "none",
    background: T.surface,
    color: T.text,
  };

  const lStyle = {
    display: "block",
    fontSize: 12,
    fontWeight: 600,
    fontFamily: SANS,
    color: T.muted,
    marginBottom: 6,
    letterSpacing: "0.02em",
  };

  return (
    <div style={{ fontFamily: SERIF }}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1" style={{ color: T.text }}>Products</h1>
          <p className="text-sm" style={{ color: T.muted }}>Manage your product catalog</p>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ ...iStyle, minWidth: 200 }}
          />
          <button
            onClick={() => openModal()}
            style={{
              padding: "12px 24px",
              background: T.maroon,
              color: "#FFFFF0",
              border: "none",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              fontFamily: SANS,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{ height: 400, background: T.hoverBg, borderRadius: 12, animation: "pulse 1.5s ease-in-out infinite" }} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 24px", border: `2px dashed ${T.border}`, borderRadius: 12 }}>
          <div style={{ width: 64, height: 64, margin: "0 auto 20px", background: T.hoverBg, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 32 }}>📦</span>
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginBottom: 8 }}>No products yet</h3>
          <p style={{ fontSize: 14, color: T.muted, marginBottom: 24 }}>Create your first product to get started</p>
          <button onClick={() => openModal()} style={{ padding: "12px 24px", background: T.maroon, color: "#FFFFF0", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            + Add Product
          </button>
        </div>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {products.map((product, i) => {
              const stock = getStockStatus(product.stockQuantity);
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-card"
                  style={{
                    background: T.surface,
                    border: `1.5px solid ${T.border}`,
                    borderRadius: 12,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {/* Image */}
                  <div style={{ position: "relative", height: 240, background: T.hoverBg, overflow: "hidden" }}>
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="p-img"
                        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }}
                      />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={T.border} strokeWidth="1.5">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                      </div>
                    )}

                    {/* Upload overlay */}
                    <label
                      className="p-overlay"
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(26,26,46,0.85)",
                        opacity: 0,
                        transition: "opacity 0.3s",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => handleImageUpload(product.id, e.target.files[0])}
                        disabled={uploadingImage === product.id}
                      />
                      {uploadingImage === product.id ? (
                        <div style={{ width: 32, height: 32, border: "3px solid #D4AF37", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                      ) : (
                        <div style={{ textAlign: "center" }}>
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" style={{ margin: "0 auto 8px" }}>
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                          </svg>
                          <span style={{ fontSize: 12, fontWeight: 600, color: "#D4AF37", fontFamily: SANS }}>Upload Image</span>
                        </div>
                      )}
                    </label>

                    {/* Badges */}
                    <div style={{ position: "absolute", top: 12, left: 12, display: "flex", flexDirection: "column", gap: 6 }}>
                      {product.isFeatured && (
                        <span style={{ padding: "4px 10px", fontSize: 11, fontWeight: 700, background: "rgba(212,175,55,0.95)", color: "#1A1A2E", borderRadius: 6, fontFamily: SANS }}>
                          ★ FEATURED
                        </span>
                      )}
                      {!product.isActive && (
                        <span style={{ padding: "4px 10px", fontSize: 11, fontWeight: 700, background: "rgba(128,0,0,0.95)", color: "#FFFFF0", borderRadius: 6, fontFamily: SANS }}>
                          INACTIVE
                        </span>
                      )}
                    </div>

                    {/* Stock indicator - TOP RIGHT */}
                    <div style={{ position: "absolute", top: 12, right: 12 }}>
                      <span
                        style={{
                          padding: "4px 10px",
                          fontSize: 11,
                          fontWeight: 700,
                          background: stock.bg,
                          color: stock.color,
                          borderRadius: 6,
                          fontFamily: SANS,
                          border: `1.5px solid ${stock.color}20`,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        {product.stockQuantity < 5 && product.stockQuantity > 0 && <span style={{ animation: "fadeInOut 1.5s infinite" }}>⚠️</span>}
                        {product.stockQuantity === 0 && "🚫"}
                        {stock.label}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ padding: 16 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: T.gold, marginBottom: 4, fontFamily: SANS }}>
                      {product.category?.name || "Uncategorized"}
                    </p>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: T.text, marginBottom: 8, fontFamily: SERIF, lineHeight: 1.3 }}>{product.name}</h3>

                    {/* Price */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                      <span style={{ fontSize: 20, fontWeight: 700, color: T.text, fontFamily: SERIF }}>
                        ₹{product.price?.toLocaleString("en-IN")}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <>
                          <span style={{ fontSize: 14, color: T.dim, textDecoration: "line-through", fontFamily: SANS }}>
                            ₹{product.originalPrice?.toLocaleString("en-IN")}
                          </span>
                          {product.discountPercent > 0 && (
                            <span style={{ fontSize: 11, fontWeight: 700, color: "#DC2626", fontFamily: SANS }}>
                              -{product.discountPercent}%
                            </span>
                          )}
                        </>
                      )}
                    </div>

                    {/* Attributes chips */}
                    {(product.colours || product.sizes) && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                        {product.colours?.split(",").filter(Boolean).slice(0, 3).map((color, idx) => (
                          <span
                            key={idx}
                            style={{
                              padding: "3px 8px",
                              fontSize: 10,
                              fontWeight: 600,
                              background: "#FEF9ED",
                              border: "1px solid #E8D5A0",
                              color: "#7A5C0A",
                              borderRadius: 4,
                              fontFamily: SANS,
                            }}
                          >
                            {color}
                          </span>
                        ))}
                        {product.sizes?.split(",").filter(Boolean).slice(0, 2).map((size, idx) => (
                          <span
                            key={idx}
                            style={{
                              padding: "3px 8px",
                              fontSize: 10,
                              fontWeight: 600,
                              background: "#F0F9FF",
                              border: "1px solid #BAE6FD",
                              color: "#0369A1",
                              borderRadius: 4,
                              fontFamily: SANS,
                            }}
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                      <button
                        onClick={() => openModal(product)}
                        style={{
                          flex: 1,
                          padding: "8px 12px",
                          fontSize: 12,
                          fontWeight: 600,
                          fontFamily: SANS,
                          border: `1.5px solid ${T.border}`,
                          background: "transparent",
                          color: T.text,
                          borderRadius: 6,
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        style={{
                          padding: "8px 12px",
                          fontSize: 12,
                          fontWeight: 600,
                          fontFamily: SANS,
                          border: "1.5px solid rgba(220,38,38,0.3)",
                          background: "transparent",
                          color: "#DC2626",
                          borderRadius: 6,
                          cursor: "pointer",
                        }}
                      >
                        🗑️
                      </button>
                    </div>

                    {/* Quick toggles */}
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        onClick={() => toggleFeatured(product.id)}
                        style={{
                          flex: 1,
                          padding: "6px 10px",
                          fontSize: 11,
                          fontWeight: 600,
                          fontFamily: SANS,
                          border: `1.5px solid ${product.isFeatured ? "rgba(212,175,55,0.4)" : "rgba(0,0,0,0.1)"}`,
                          background: product.isFeatured ? "rgba(212,175,55,0.08)" : "transparent",
                          color: product.isFeatured ? T.gold : T.muted,
                          borderRadius: 6,
                          cursor: "pointer",
                        }}
                      >
                        ★ Featured
                      </button>
                      <button
                        onClick={() => toggleActive(product.id)}
                        style={{
                          flex: 1,
                          padding: "6px 10px",
                          fontSize: 11,
                          fontWeight: 600,
                          fontFamily: SANS,
                          border: `1.5px solid ${product.isActive ? "rgba(5,150,105,0.3)" : "rgba(220,38,38,0.3)"}`,
                          background: product.isActive ? "rgba(5,150,105,0.08)" : "rgba(220,38,38,0.08)",
                          color: product.isActive ? T.green : "#DC2626",
                          borderRadius: 6,
                          cursor: "pointer",
                        }}
                      >
                        {product.isActive ? "Active" : "Inactive"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 32 }}>
              <button
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                style={{
                  padding: "10px 20px",
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: SANS,
                  border: `1.5px solid ${T.border}`,
                  background: "transparent",
                  color: T.text,
                  borderRadius: 8,
                  cursor: currentPage === 0 ? "not-allowed" : "pointer",
                  opacity: currentPage === 0 ? 0.5 : 1,
                }}
              >
                Previous
              </button>
              <span style={{ padding: "10px 20px", fontSize: 13, fontFamily: SANS, color: T.muted }}>
                Page {currentPage + 1} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={currentPage >= totalPages - 1}
                style={{
                  padding: "10px 20px",
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: SANS,
                  border: `1.5px solid ${T.border}`,
                  background: "transparent",
                  color: T.text,
                  borderRadius: 8,
                  cursor: currentPage >= totalPages - 1 ? "not-allowed" : "pointer",
                  opacity: currentPage >= totalPages - 1 ? 0.5 : 1,
                }}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(26,26,46,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
              padding: 20,
              overflow: "auto",
            }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: T.surface,
                borderRadius: 16,
                width: "100%",
                maxWidth: 800,
                maxHeight: "90vh",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Modal header */}
              <div style={{ padding: "20px 24px", borderBottom: `1.5px solid ${T.tableBorder}` }}>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: T.text, fontFamily: SERIF }}>
                  {editingProduct ? "Edit Product" : "New Product"}
                </h2>
                <p style={{ fontSize: 13, color: T.muted, fontFamily: SANS, marginTop: 4 }}>
                  {editingProduct ? "Update product details" : "Create a new product for your store"}
                </p>
              </div>

              {/* Tabs */}
              <div style={{ display: "flex", gap: 0, borderBottom: `1.5px solid ${T.tableBorder}`, background: T.hoverBg }}>
                {[
                  { id: "basic", label: "Basic Info", icon: "📝" },
                  { id: "attributes", label: "Attributes & Filters", icon: "🎨" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      flex: 1,
                      padding: "14px 20px",
                      fontSize: 13,
                      fontWeight: 600,
                      fontFamily: SANS,
                      background: activeTab === tab.id ? T.surface : "transparent",
                      color: activeTab === tab.id ? T.text : T.muted,
                      border: "none",
                      borderBottom: activeTab === tab.id ? `2px solid ${T.maroon}` : "2px solid transparent",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ padding: 24, overflowY: "auto", flex: 1 }}>
                  {activeTab === "basic" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                      {/* Product name */}
                      <div>
                        <label style={lStyle}>Product Name *</label>
                        <input type="text" required {...fld("name")} placeholder="E.g., Kanjivaram Silk Saree" style={iStyle} />
                      </div>

                      {/* Category */}
                      <div>
                        <label style={lStyle}>Category *</label>
                        <select required {...fld("categoryId")} style={{ ...iStyle, cursor: "pointer" }}>
                          <option value="">Select category</option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Description */}
                      <div>
                        <label style={lStyle}>Description</label>
                        <textarea {...fld("description")} rows={3} placeholder="Describe the product..." style={{ ...iStyle, resize: "vertical" }} />
                      </div>

                      {/* Price / MRP / Stock */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                        <div>
                          <label style={lStyle}>Sale Price (₹) *</label>
                          <input type="number" step="0.01" required {...fld("price")} placeholder="0.00" style={iStyle} />
                        </div>
                        <div>
                          <label style={lStyle}>MRP / Original (₹)</label>
                          <input type="number" step="0.01" {...fld("originalPrice")} placeholder="0.00" style={iStyle} />
                        </div>
                        <div>
                          <label style={lStyle}>
                            Stock Qty * 
                            {form.stockQuantity && form.stockQuantity < 5 && form.stockQuantity > 0 && (
                              <span style={{ color: "#D97706", marginLeft: 8 }}>⚠️ Low Stock</span>
                            )}
                          </label>
                          <input type="number" required {...fld("stockQuantity")} placeholder="0" style={iStyle} />
                        </div>
                      </div>

                      {/* Toggles */}
                      <div style={{ display: "flex", gap: 12 }}>
                        {[
                          { label: "★ Featured", sublabel: "Shown in featured section", key: "isFeatured", color: "#7A5C0A", bg: "#FEF9ED", bd: "#C8A840" },
                          { label: "Active", sublabel: "Visible to customers", key: "isActive", color: T.green, bg: T.greenBg, bd: T.greenBorder },
                        ].map((t) => (
                          <label
                            key={t.key}
                            style={{
                              flex: 1,
                              display: "flex",
                              alignItems: "center",
                              gap: 12,
                              padding: "12px 14px",
                              background: t.bg,
                              border: `1.5px solid ${t.bd}`,
                              borderRadius: 8,
                              cursor: "pointer",
                            }}
                          >
                            <div
                              style={{ position: "relative", width: 36, height: 20, flexShrink: 0 }}
                              onClick={() => setForm({ ...form, [t.key]: !form[t.key] })}
                            >
                              <div
                                style={{
                                  width: 36,
                                  height: 20,
                                  borderRadius: 10,
                                  background: form[t.key] ? t.color : "rgba(128,128,128,0.25)",
                                  transition: "background 0.2s",
                                }}
                              />
                              <div
                                style={{
                                  position: "absolute",
                                  top: 2,
                                  left: form[t.key] ? 18 : 2,
                                  width: 16,
                                  height: 16,
                                  borderRadius: "50%",
                                  background: "white",
                                  transition: "left 0.2s",
                                  boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
                                }}
                              />
                            </div>
                            <div>
                              <p style={{ fontSize: 13, fontWeight: 700, color: t.color }}>{t.label}</p>
                              <p style={{ fontSize: 11, color: T.muted }}>{t.sublabel}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "attributes" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                      <div style={{ padding: "12px 14px", borderRadius: 8, background: "#FEF9ED", border: "1.5px solid #E8D5A0" }}>
                        <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.5 }}>
                          These attributes power filters and search. Add multiple colors and sizes to help customers find this product easily.
                        </p>
                      </div>

                      {/* Multi-Color Selector */}
                      <div>
                        <label style={lStyle}>Available Colors</label>
                        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                          <select
                            value={colorInput}
                            onChange={(e) => setColorInput(e.target.value)}
                            style={{ ...iStyle, flex: 1, cursor: "pointer" }}
                          >
                            <option value="">Select a color</option>
                            {AVAILABLE_COLORS.filter((c) => !form.colours.includes(c)).map((color) => (
                              <option key={color} value={color}>
                                {color}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() => addColor(colorInput)}
                            disabled={!colorInput}
                            style={{
                              padding: "0 20px",
                              background: T.maroon,
                              color: "#FFFFF0",
                              border: "none",
                              borderRadius: 8,
                              fontSize: 13,
                              fontWeight: 600,
                              cursor: colorInput ? "pointer" : "not-allowed",
                              opacity: colorInput ? 1 : 0.5,
                            }}
                          >
                            Add
                          </button>
                        </div>
                        {/* Selected colors */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                          {form.colours.map((color) => (
                            <span
                              key={color}
                              style={{
                                padding: "6px 12px",
                                background: "#FEF9ED",
                                border: "1.5px solid #C8A840",
                                color: "#7A5C0A",
                                borderRadius: 20,
                                fontSize: 12,
                                fontWeight: 600,
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                              }}
                            >
                              🎨 {color}
                              <button
                                type="button"
                                onClick={() => removeColor(color)}
                                style={{
                                  background: "none",
                                  border: "none",
                                  color: "#DC2626",
                                  cursor: "pointer",
                                  fontSize: 14,
                                  padding: 0,
                                  lineHeight: 1,
                                }}
                              >
                                ×
                              </button>
                            </span>
                          ))}
                          {form.colours.length === 0 && (
                            <span style={{ fontSize: 13, color: T.dim, fontStyle: "italic" }}>No colors selected</span>
                          )}
                        </div>
                      </div>

                      {/* Multi-Size Selector */}
                      <div>
                        <label style={lStyle}>Available Sizes</label>
                        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                          <select
                            value={sizeInput}
                            onChange={(e) => setSizeInput(e.target.value)}
                            style={{ ...iStyle, flex: 1, cursor: "pointer" }}
                          >
                            <option value="">Select a size</option>
                            {AVAILABLE_SIZES.filter((s) => !form.sizes.includes(s)).map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() => addSize(sizeInput)}
                            disabled={!sizeInput}
                            style={{
                              padding: "0 20px",
                              background: T.maroon,
                              color: "#FFFFF0",
                              border: "none",
                              borderRadius: 8,
                              fontSize: 13,
                              fontWeight: 600,
                              cursor: sizeInput ? "pointer" : "not-allowed",
                              opacity: sizeInput ? 1 : 0.5,
                            }}
                          >
                            Add
                          </button>
                        </div>
                        {/* Selected sizes */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                          {form.sizes.map((size) => (
                            <span
                              key={size}
                              style={{
                                padding: "6px 12px",
                                background: "#F0F9FF",
                                border: "1.5px solid #BAE6FD",
                                color: "#0369A1",
                                borderRadius: 20,
                                fontSize: 12,
                                fontWeight: 600,
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                              }}
                            >
                              📐 {size}
                              <button
                                type="button"
                                onClick={() => removeSize(size)}
                                style={{
                                  background: "none",
                                  border: "none",
                                  color: "#DC2626",
                                  cursor: "pointer",
                                  fontSize: 14,
                                  padding: 0,
                                  lineHeight: 1,
                                }}
                              >
                                ×
                              </button>
                            </span>
                          ))}
                          {form.sizes.length === 0 && (
                            <span style={{ fontSize: 13, color: T.dim, fontStyle: "italic" }}>No sizes selected</span>
                          )}
                        </div>
                      </div>

                      {/* Other attributes */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                        <div>
                          <label style={lStyle}>Gender</label>
                          <select {...fld("gender")} style={{ ...iStyle, cursor: "pointer" }}>
                            <option value="">Select</option>
                            {["Women", "Men", "Kids", "Unisex"].map((g) => (
                              <option key={g}>{g}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label style={lStyle}>Fabric / Material</label>
                          <select {...fld("fabric")} style={{ ...iStyle, cursor: "pointer" }}>
                            <option value="">Select</option>
                            {["Pure Silk", "Kanjivaram Silk", "Banarasi Silk", "Tussar Silk", "Chanderi", "Cotton", "Cotton Silk", "Georgette", "Chiffon", "Linen", "Polyester", "Crepe"].map((f) => (
                              <option key={f}>{f}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label style={lStyle}>Occasion</label>
                          <select {...fld("occasion")} style={{ ...iStyle, cursor: "pointer" }}>
                            <option value="">Select</option>
                            {["Wedding", "Festival", "Casual", "Party", "Office", "Daily Wear", "Traditional", "Formal"].map((o) => (
                              <option key={o}>{o}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Preview */}
                      <div style={{ padding: 14, borderRadius: 9, background: T.hoverBg, border: `1.5px solid ${T.border}` }}>
                        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.muted, marginBottom: 10 }}>
                          Attribute Preview
                        </p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                          {form.colours.map((c) => (
                            <span
                              key={c}
                              style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: "#FEF9ED", border: "1.5px solid #C8A840", color: "#7A5C0A" }}
                            >
                              🎨 {c}
                            </span>
                          ))}
                          {form.sizes.map((s) => (
                            <span
                              key={s}
                              style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: "#F0F9FF", border: "1.5px solid #BAE6FD", color: "#0369A1" }}
                            >
                              📐 {s}
                            </span>
                          ))}
                          {[
                            { v: form.gender, e: "👤" },
                            { v: form.fabric, e: "🧵" },
                            { v: form.occasion, e: "✨" },
                          ]
                            .filter((a) => a.v)
                            .map((a, i) => (
                              <span
                                key={i}
                                style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: "#FEF9ED", border: "1.5px solid #C8A840", color: "#7A5C0A" }}
                              >
                                {a.e} {a.v}
                              </span>
                            ))}
                          {form.colours.length === 0 && form.sizes.length === 0 && !form.gender && !form.fabric && !form.occasion && (
                            <span style={{ fontSize: 13, color: T.dim, fontStyle: "italic" }}>No attributes selected yet</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal footer */}
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    padding: "16px 24px",
                    borderTop: `1.5px solid ${T.tableBorder}`,
                    background: "#FAFAF8",
                  }}
                >
                  <button
                    type="button"
                    onClick={closeModal}
                    style={{
                      flex: 1,
                      padding: 12,
                      background: "transparent",
                      border: `1.5px solid ${T.border}`,
                      color: T.muted,
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: 600,
                      fontFamily: SANS,
                      borderRadius: 8,
                    }}
                  >
                    Cancel
                  </button>
                  {activeTab === "basic" && (
                    <button
                      type="button"
                      onClick={() => setActiveTab("attributes")}
                      style={{
                        flex: 1,
                        padding: 12,
                        cursor: "pointer",
                        fontSize: 13,
                        fontWeight: 600,
                        fontFamily: SANS,
                        borderRadius: 8,
                        background: "#FEF9ED",
                        border: "1.5px solid #C8A840",
                        color: "#7A5C0A",
                      }}
                    >
                      Attributes & Filters →
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={saving}
                    style={{
                      flex: 2,
                      padding: 12,
                      background: T.maroon,
                      color: "#FFFFF0",
                      border: "none",
                      cursor: saving ? "wait" : "pointer",
                      fontSize: 13,
                      fontWeight: 700,
                      fontFamily: SANS,
                      borderRadius: 8,
                      opacity: saving ? 0.7 : 1,
                      boxShadow: "0 2px 8px rgba(128,0,0,0.3)",
                    }}
                  >
                    {saving ? "Saving…" : editingProduct ? "Update Product" : "Create Product"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        .p-card { transition: transform 0.18s, box-shadow 0.18s !important; }
        .p-card:hover { transform: translateY(-3px); box-shadow: 0 12px 24px rgba(0,0,0,0.12) !important; }
        .p-card:hover .p-overlay { opacity: 1 !important; }
        .p-card:hover .p-img { transform: scale(1.05) !important; }
        @keyframes fadeInOut { 0%,100%{opacity:0.5} 50%{opacity:0.25} }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
      `}</style>
    </div>
  );
}