// // import { useState, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { adminAPI } from "../../api";

// // export default function AdminCategories() {
// //   const [categories, setCategories] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [editingCategory, setEditingCategory] = useState(null);
// //   const [form, setForm] = useState({ name: "", description: "", isActive: true });
// //   const [uploadingImage, setUploadingImage] = useState(null);

// //   useEffect(() => {
// //     fetchCategories();
// //   }, []);

// //   const fetchCategories = async () => {
// //     try {
// //       const data = await adminAPI.getAllCategories();
// //       setCategories(data);
// //     } catch (err) {
// //       console.error("Failed to fetch categories", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     try {
// //       if (editingCategory) {
// //         await adminAPI.updateCategory(editingCategory.id, form);
// //       } else {
// //         await adminAPI.createCategory(form);
// //       }
// //       fetchCategories();
// //       closeModal();
// //     } catch (err) {
// //       alert(err.response?.data?.message || "Failed to save category");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleImageUpload = async (categoryId, file) => {
// //     setUploadingImage(categoryId);
// //     try {
// //       await adminAPI.uploadCategoryImage(categoryId, file);
// //       fetchCategories();
// //     } catch (err) {
// //       alert("Image upload failed");
// //     } finally {
// //       setUploadingImage(null);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     if (!confirm("Delete this category?")) return;
// //     try {
// //       await adminAPI.deleteCategory(id);
// //       fetchCategories();
// //     } catch (err) {
// //       alert("Failed to delete category");
// //     }
// //   };

// //   const openModal = (category = null) => {
// //     if (category) {
// //       setEditingCategory(category);
// //       setForm({ name: category.name, description: category.description || "", isActive: category.isActive });
// //     } else {
// //       setEditingCategory(null);
// //       setForm({ name: "", description: "", isActive: true });
// //     }
// //     setModalOpen(true);
// //   };

// //   const closeModal = () => {
// //     setModalOpen(false);
// //     setEditingCategory(null);
// //     setForm({ name: "", description: "", isActive: true });
// //   };

// //   return (
// //     <div style={{ fontFamily: "'Cormorant Garamond', serif" }}>
// //       {/* Header */}
// //       <div className="flex items-center justify-between mb-8">
// //         <div>
// //           <h1 className="text-3xl font-bold mb-1" style={{ color: "#1A1A2E" }}>Categories</h1>
// //           <p className="text-sm" style={{ color: "#36454F" }}>Manage product categories and collections</p>
// //         </div>
// //         <button
// //           onClick={() => openModal()}
// //           className="flex items-center gap-2 px-6 py-3 text-sm tracking-widest uppercase font-semibold transition-all"
// //           style={{ background: "#800000", color: "#FFFFF0" }}
// //           onMouseEnter={e => e.currentTarget.style.background = "#900000"}
// //           onMouseLeave={e => e.currentTarget.style.background = "#800000"}
// //         >
// //           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //             <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
// //           </svg>
// //           Add Category
// //         </button>
// //       </div>

// //       {/* Categories Grid */}
// //       {loading ? (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {[...Array(6)].map((_, i) => (
// //             <div key={i} className="h-64 animate-pulse" style={{ background: "rgba(26,26,46,0.04)" }} />
// //           ))}
// //         </div>
// //       ) : categories.length === 0 ? (
// //         <div className="text-center py-20" style={{ border: "1px dashed rgba(26,26,46,0.15)" }}>
// //           <div className="w-16 h-16 mx-auto mb-4 opacity-20"
// //             style={{ background: "#D4AF37", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
// //           <p className="text-lg mb-2" style={{ color: "#36454F" }}>No categories yet</p>
// //           <p className="text-sm mb-6" style={{ color: "rgba(54,69,79,0.6)" }}>Create your first category to get started</p>
// //           <button
// //             onClick={() => openModal()}
// //             className="px-6 py-3 text-sm tracking-widest uppercase"
// //             style={{ background: "#800000", color: "#FFFFF0" }}
// //           >
// //             Add Category
// //           </button>
// //         </div>
// //       ) : (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {categories.map((cat, i) => (
// //             <motion.div
// //               key={cat.id}
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ delay: i * 0.05 }}
// //               className="group relative overflow-hidden"
// //               style={{ border: "1px solid rgba(26,26,46,0.08)", background: "white" }}
// //             >
// //               {/* Image */}
// //               <div className="relative h-48 overflow-hidden" style={{ background: "rgba(26,26,46,0.04)" }}>
// //                 {cat.imageUrl ? (
// //                   <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover" />
// //                 ) : (
// //                   <div className="w-full h-full flex items-center justify-center">
// //                     <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(26,26,46,0.2)" strokeWidth="1.5">
// //                       <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
// //                     </svg>
// //                   </div>
// //                 )}
// //                 {/* Upload overlay */}
// //                 <label className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
// //                   style={{ background: "rgba(26,26,46,0.8)" }}>
// //                   <input
// //                     type="file"
// //                     accept="image/*"
// //                     className="hidden"
// //                     onChange={(e) => handleImageUpload(cat.id, e.target.files[0])}
// //                     disabled={uploadingImage === cat.id}
// //                   />
// //                   {uploadingImage === cat.id ? (
// //                     <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
// //                       className="w-8 h-8 border-2 rounded-full" style={{ borderColor: "#D4AF37", borderTopColor: "transparent" }} />
// //                   ) : (
// //                     <div className="text-center">
// //                       <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" className="mx-auto mb-2">
// //                         <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
// //                       </svg>
// //                       <span className="text-xs tracking-widest uppercase" style={{ color: "#D4AF37" }}>Upload Image</span>
// //                     </div>
// //                   )}
// //                 </label>
// //                 {/* Status badge */}
// //                 {!cat.isActive && (
// //                   <div className="absolute top-3 right-3 px-2 py-1 text-xs tracking-widest uppercase"
// //                     style={{ background: "rgba(128,0,0,0.9)", color: "#FFFFF0" }}>Inactive</div>
// //                 )}
// //               </div>

// //               {/* Info */}
// //               <div className="p-4">
// //                 <h3 className="text-lg font-bold mb-1" style={{ color: "#1A1A2E" }}>{cat.name}</h3>
// //                 {cat.description && (
// //                   <p className="text-sm mb-3 line-clamp-2" style={{ color: "#36454F" }}>{cat.description}</p>
// //                 )}
// //                 <div className="flex gap-2">
// //                   <button
// //                     onClick={() => openModal(cat)}
// //                     className="flex-1 px-3 py-2 text-xs tracking-widest uppercase transition-all"
// //                     style={{ border: "1px solid rgba(26,26,46,0.2)", color: "#1A1A2E" }}
// //                     onMouseEnter={e => e.currentTarget.style.background = "rgba(26,26,46,0.03)"}
// //                     onMouseLeave={e => e.currentTarget.style.background = "transparent"}
// //                   >
// //                     Edit
// //                   </button>
// //                   <button
// //                     onClick={() => handleDelete(cat.id)}
// //                     className="px-3 py-2 text-xs tracking-widest uppercase transition-all"
// //                     style={{ border: "1px solid rgba(128,0,0,0.2)", color: "#800000" }}
// //                     onMouseEnter={e => e.currentTarget.style.background = "rgba(128,0,0,0.05)"}
// //                     onMouseLeave={e => e.currentTarget.style.background = "transparent"}
// //                   >
// //                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                       <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
// //                     </svg>
// //                   </button>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           ))}
// //         </div>
// //       )}

// //       {/* Modal */}
// //       <AnimatePresence>
// //         {modalOpen && (
// //           <motion.div
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //             className="fixed inset-0 z-50 flex items-center justify-center p-4"
// //             style={{ background: "rgba(26,26,46,0.8)" }}
// //             onClick={closeModal}
// //           >
// //             <motion.div
// //               initial={{ scale: 0.9, opacity: 0 }}
// //               animate={{ scale: 1, opacity: 1 }}
// //               exit={{ scale: 0.9, opacity: 0 }}
// //               className="w-full max-w-md p-6"
// //               style={{ background: "#FFFFF0", border: "1px solid rgba(26,26,46,0.1)" }}
// //               onClick={(e) => e.stopPropagation()}
// //             >
// //               <h2 className="text-2xl font-bold mb-6" style={{ color: "#1A1A2E" }}>
// //                 {editingCategory ? "Edit Category" : "New Category"}
// //               </h2>
// //               <form onSubmit={handleSubmit} className="space-y-4">
// //                 <div>
// //                   <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Name</label>
// //                   <input
// //                     type="text"
// //                     value={form.name}
// //                     onChange={(e) => setForm({ ...form, name: e.target.value })}
// //                     required
// //                     className="w-full px-4 py-3 text-base outline-none"
// //                     style={{ border: "1px solid rgba(26,26,46,0.2)", color: "#1A1A2E" }}
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Description</label>
// //                   <textarea
// //                     value={form.description}
// //                     onChange={(e) => setForm({ ...form, description: e.target.value })}
// //                     rows="3"
// //                     className="w-full px-4 py-3 text-base outline-none"
// //                     style={{ border: "1px solid rgba(26,26,46,0.2)", color: "#1A1A2E" }}
// //                   />
// //                 </div>
// //                 <div className="flex items-center gap-3">
// //                   <input
// //                     type="checkbox"
// //                     id="isActive"
// //                     checked={form.isActive}
// //                     onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
// //                     className="w-4 h-4"
// //                   />
// //                   <label htmlFor="isActive" className="text-sm" style={{ color: "#36454F" }}>Active (visible on site)</label>
// //                 </div>
// //                 <div className="flex gap-3 pt-4">
// //                   <button
// //                     type="button"
// //                     onClick={closeModal}
// //                     className="flex-1 px-4 py-3 text-sm tracking-widest uppercase"
// //                     style={{ border: "1px solid rgba(26,26,46,0.2)", color: "#1A1A2E" }}
// //                   >
// //                     Cancel
// //                   </button>
// //                   <button
// //                     type="submit"
// //                     disabled={loading}
// //                     className="flex-1 px-4 py-3 text-sm tracking-widest uppercase"
// //                     style={{ background: "#800000", color: "#FFFFF0" }}
// //                   >
// //                     {loading ? "Saving..." : editingCategory ? "Update" : "Create"}
// //                   </button>
// //                 </div>
// //               </form>
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // }



// // import { useState, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { adminAPI } from "../../api";

// // const D = {
// //   bg: "#0C0C16", card: "#14142A", border: "rgba(212,175,55,0.12)",
// //   text: "#FFFFF0", muted: "rgba(255,255,240,0.45)", dim: "rgba(255,255,240,0.25)",
// //   gold: "#D4AF37", red: "#800000", danger: "#E74C3C",
// // };

// // const inputStyle = {
// //   width: "100%", padding: "12px 14px", background: "#0C0C16",
// //   border: "1px solid rgba(212,175,55,0.18)", borderRadius: 8,
// //   color: D.text, fontSize: 15, outline: "none",
// // };

// // export default function AdminCategories() {
// //   const [categories, setCategories] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [editingCategory, setEditingCategory] = useState(null);
// //   const [form, setForm] = useState({ name: "", description: "", isActive: true });
// //   const [uploadingImage, setUploadingImage] = useState(null);
// //   const [saving, setSaving] = useState(false);

// //   useEffect(() => { fetchCategories(); }, []);

// //   const fetchCategories = async () => {
// //     try { setCategories(await adminAPI.getAllCategories()); }
// //     catch (err) { console.error("Failed to fetch categories", err); }
// //     finally { setLoading(false); }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault(); setSaving(true);
// //     try {
// //       if (editingCategory) await adminAPI.updateCategory(editingCategory.id, form);
// //       else await adminAPI.createCategory(form);
// //       fetchCategories(); closeModal();
// //     } catch (err) { alert(err.response?.data?.message || "Failed to save category"); }
// //     finally { setSaving(false); }
// //   };

// //   const handleImageUpload = async (categoryId, file) => {
// //     setUploadingImage(categoryId);
// //     try { await adminAPI.uploadCategoryImage(categoryId, file); fetchCategories(); }
// //     catch { alert("Image upload failed"); }
// //     finally { setUploadingImage(null); }
// //   };

// //   const handleDelete = async (id) => {
// //     if (!confirm("Delete this category?")) return;
// //     try { await adminAPI.deleteCategory(id); fetchCategories(); }
// //     catch { alert("Failed to delete category"); }
// //   };

// //   const openModal = (cat = null) => {
// //     if (cat) { setEditingCategory(cat); setForm({ name: cat.name, description: cat.description || "", isActive: cat.isActive }); }
// //     else { setEditingCategory(null); setForm({ name: "", description: "", isActive: true }); }
// //     setModalOpen(true);
// //   };
// //   const closeModal = () => { setModalOpen(false); setEditingCategory(null); setForm({ name: "", description: "", isActive: true }); };

// //   return (
// //     <div style={{ fontFamily: "'Cormorant Garamond', serif", color: D.text }}>

// //       {/* Header */}
// //       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
// //         <div>
// //           <h1 style={{ fontSize: 30, fontWeight: 700, color: D.text, marginBottom: 6 }}>Categories</h1>
// //           <p style={{ fontSize: 15, color: D.muted }}>Manage product categories and collections</p>
// //         </div>
// //         <button onClick={() => openModal()} style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 22px", background: D.red, color: D.text, border: "none", cursor: "pointer", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 6 }}>
// //           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
// //           Add Category
// //         </button>
// //       </div>

// //       {/* Grid */}
// //       {loading ? (
// //         <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
// //           {[...Array(6)].map((_, i) => <div key={i} style={{ height: 260, background: D.card, borderRadius: 14, opacity: 0.5, animation: "pulse 1.5s infinite" }} />)}
// //         </div>
// //       ) : categories.length === 0 ? (
// //         <div style={{ textAlign: "center", padding: "80px 20px", border: `1px dashed rgba(212,175,55,0.2)`, borderRadius: 14 }}>
// //           <div style={{ width: 64, height: 64, margin: "0 auto 20px", background: D.gold, opacity: 0.15, clipPath: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)" }} />
// //           <p style={{ fontSize: 20, color: D.muted, marginBottom: 8 }}>No categories yet</p>
// //           <p style={{ fontSize: 15, color: D.dim, marginBottom: 24 }}>Create your first category to get started</p>
// //           <button onClick={() => openModal()} style={{ padding: "12px 24px", background: D.red, color: D.text, border: "none", cursor: "pointer", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 6 }}>
// //             Add Category
// //           </button>
// //         </div>
// //       ) : (
// //         <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
// //           {categories.map((cat, i) => (
// //             <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
// //               className="cat-card"
// //               style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 14, overflow: "hidden", position: "relative" }}>

// //               {/* Image */}
// //               <div className="cat-img-wrap" style={{ position: "relative", height: 180, background: "#0C0C16", overflow: "hidden" }}>
// //                 {cat.imageUrl
// //                   ? <img src={cat.imageUrl} alt={cat.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
// //                   : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
// //                       <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="1.2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
// //                     </div>
// //                 }

// //                 {/* Upload overlay */}
// //                 <label className="cat-overlay" style={{ position: "absolute", inset: 0, background: "rgba(12,12,22,0.85)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: 0, transition: "opacity 0.2s" }}>
// //                   <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => handleImageUpload(cat.id, e.target.files[0])} disabled={uploadingImage === cat.id} />
// //                   {uploadingImage === cat.id
// //                     ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ width: 32, height: 32, border: `2px solid ${D.gold}`, borderTopColor: "transparent", borderRadius: "50%" }} />
// //                     : <div style={{ textAlign: "center" }}>
// //                         <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={D.gold} strokeWidth="1.5" style={{ display: "block", margin: "0 auto 8px" }}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
// //                         <span style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: D.gold }}>Upload Image</span>
// //                       </div>
// //                   }
// //                 </label>

// //                 {!cat.isActive && (
// //                   <div style={{ position: "absolute", top: 12, right: 12, padding: "4px 10px", background: "rgba(231,76,60,0.9)", color: "#fff", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 4 }}>Inactive</div>
// //                 )}
// //               </div>

// //               {/* Info */}
// //               <div style={{ padding: "16px 18px" }}>
// //                 <h3 style={{ fontSize: 19, fontWeight: 700, color: D.text, marginBottom: 6 }}>{cat.name}</h3>
// //                 {cat.description && <p style={{ fontSize: 14, color: D.muted, marginBottom: 14, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{cat.description}</p>}
// //                 <div style={{ display: "flex", gap: 10 }}>
// //                   <button onClick={() => openModal(cat)} style={{ flex: 1, padding: "10px", background: "rgba(212,175,55,0.08)", border: `1px solid rgba(212,175,55,0.2)`, color: D.gold, cursor: "pointer", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 6 }}>Edit</button>
// //                   <button onClick={() => handleDelete(cat.id)} style={{ padding: "10px 14px", background: "rgba(231,76,60,0.08)", border: `1px solid rgba(231,76,60,0.2)`, color: D.danger, cursor: "pointer", borderRadius: 6 }}>
// //                     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
// //                   </button>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           ))}
// //         </div>
// //       )}

// //       {/* Modal */}
// //       <AnimatePresence>
// //         {modalOpen && (
// //           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
// //             style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, background: "rgba(12,12,22,0.88)" }}
// //             onClick={closeModal}>
// //             <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
// //               style={{ width: "100%", maxWidth: 460, background: "#10101C", border: `1px solid ${D.border}`, borderRadius: 16, padding: "28px 28px" }}
// //               onClick={e => e.stopPropagation()}>

// //               <h2 style={{ fontSize: 24, fontWeight: 700, color: D.text, marginBottom: 24 }}>
// //                 {editingCategory ? "Edit Category" : "New Category"}
// //               </h2>

// //               <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
// //                 <div>
// //                   <label style={{ display: "block", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: D.muted, marginBottom: 8 }}>Name</label>
// //                   <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required style={inputStyle} placeholder="e.g. Silk Sarees" />
// //                 </div>
// //                 <div>
// //                   <label style={{ display: "block", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: D.muted, marginBottom: 8 }}>Description</label>
// //                   <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} style={{ ...inputStyle, resize: "vertical" }} placeholder="Brief description of this category..." />
// //                 </div>
// //                 <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.12)", borderRadius: 8 }}>
// //                   <input type="checkbox" id="isActive" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} style={{ width: 16, height: 16, cursor: "pointer", accentColor: D.gold }} />
// //                   <label htmlFor="isActive" style={{ fontSize: 15, color: D.muted, cursor: "pointer" }}>Active — visible on site</label>
// //                 </div>
// //                 <div style={{ display: "flex", gap: 12, paddingTop: 6 }}>
// //                   <button type="button" onClick={closeModal} style={{ flex: 1, padding: "13px", background: "transparent", border: "1px solid rgba(255,255,240,0.15)", color: D.muted, cursor: "pointer", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 8 }}>Cancel</button>
// //                   <button type="submit" disabled={saving} style={{ flex: 1, padding: "13px", background: D.red, color: D.text, border: "none", cursor: "pointer", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 8, opacity: saving ? 0.7 : 1 }}>
// //                     {saving ? "Saving..." : editingCategory ? "Update" : "Create"}
// //                   </button>
// //                 </div>
// //               </form>
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       <style>{`
// //         .cat-card:hover .cat-overlay { opacity: 1 !important; }
// //         @keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:0.3} }
// //         input::placeholder, textarea::placeholder { color: rgba(255,255,240,0.2); }
// //         select option { background: #14142A; }
// //       `}</style>
// //     </div>
// //   );
// // }


// // import { useState, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { adminAPI } from "../../api";

// // const T = {
// //   bg: "#080810", surface: "#0f0f1a", card: "#13131f",
// //   border: "rgba(255,255,255,0.06)", borderHi: "rgba(212,175,55,0.22)",
// //   gold: "#D4AF37", maroon: "#800000",
// //   text: "#F0EEE8", muted: "rgba(240,238,232,0.45)", dim: "rgba(240,238,232,0.22)",
// //   danger: "#f87171", dangerBg: "rgba(248,113,113,0.08)", dangerBorder: "rgba(248,113,113,0.2)",
// // };
// // const SERIF = "'Cormorant Garamond', Georgia, serif";
// // const SANS  = "'DM Sans', 'Segoe UI', system-ui, sans-serif";

// // const iStyle = {
// //   width: "100%", padding: "11px 14px", background: "#0a0a14",
// //   border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8,
// //   color: T.text, fontSize: 14, outline: "none", fontFamily: SANS,
// //   transition: "border-color 0.15s",
// // };

// // export default function AdminCategories() {
// //   const [categories,      setCategories]      = useState([]);
// //   const [loading,         setLoading]         = useState(true);
// //   const [modalOpen,       setModalOpen]       = useState(false);
// //   const [editingCategory, setEditingCategory] = useState(null);
// //   const [form,            setForm]            = useState({ name: "", description: "", isActive: true });
// //   const [uploadingImage,  setUploadingImage]  = useState(null);
// //   const [saving,          setSaving]          = useState(false);

// //   useEffect(() => { fetchCategories(); }, []);

// //   const fetchCategories = async () => {
// //     try { setCategories(await adminAPI.getAllCategories()); }
// //     catch (e) { console.error(e); }
// //     finally { setLoading(false); }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault(); setSaving(true);
// //     try {
// //       if (editingCategory) await adminAPI.updateCategory(editingCategory.id, form);
// //       else await adminAPI.createCategory(form);
// //       fetchCategories(); closeModal();
// //     } catch (e) { alert(e.response?.data?.message || "Failed to save"); }
// //     finally { setSaving(false); }
// //   };

// //   const handleImageUpload = async (id, file) => {
// //     setUploadingImage(id);
// //     try { await adminAPI.uploadCategoryImage(id, file); fetchCategories(); }
// //     catch { alert("Upload failed"); }
// //     finally { setUploadingImage(null); }
// //   };

// //   const handleDelete = async (id) => {
// //     if (!confirm("Delete this category?")) return;
// //     try { await adminAPI.deleteCategory(id); fetchCategories(); }
// //     catch { alert("Failed to delete"); }
// //   };

// //   const openModal = (cat = null) => {
// //     setEditingCategory(cat);
// //     setForm(cat ? { name: cat.name, description: cat.description || "", isActive: cat.isActive } : { name: "", description: "", isActive: true });
// //     setModalOpen(true);
// //   };
// //   const closeModal = () => { setModalOpen(false); setEditingCategory(null); setForm({ name: "", description: "", isActive: true }); };

// //   return (
// //     <div style={{ fontFamily: SANS, color: T.text }}>

// //       {/* Header */}
// //       <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
// //         <div>
// //           <h1 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 700, color: T.text, marginBottom: 5 }}>Categories</h1>
// //           <p style={{ fontSize: 14, color: T.muted }}>Manage product categories and collections</p>
// //         </div>
// //         <button onClick={() => openModal()}
// //           style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px",
// //             background: T.maroon, color: T.text, border: "none", cursor: "pointer",
// //             fontSize: 13, fontWeight: 600, fontFamily: SANS, borderRadius: 8, whiteSpace: "nowrap" }}>
// //           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// //             <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
// //           </svg>
// //           New Category
// //         </button>
// //       </div>

// //       {/* Stats bar */}
// //       <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
// //         {[
// //           { label: "Total",    value: categories.length,                              color: T.gold },
// //           { label: "Active",   value: categories.filter(c => c.isActive).length,      color: "#34D399" },
// //           { label: "Inactive", value: categories.filter(c => !c.isActive).length,     color: T.danger },
// //           { label: "With Image", value: categories.filter(c => c.imageUrl).length,    color: "#60A5FA" },
// //         ].map((s, i) => (
// //           <div key={i} style={{ padding: "10px 18px", background: T.card, border: `1px solid ${T.border}`,
// //             borderRadius: 8, display: "flex", alignItems: "center", gap: 8 }}>
// //             <span style={{ fontSize: 18, fontWeight: 700, color: s.color, fontFamily: SERIF }}>{s.value}</span>
// //             <span style={{ fontSize: 13, color: T.muted }}>{s.label}</span>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Grid */}
// //       {loading ? (
// //         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 16 }}>
// //           {[...Array(6)].map((_, i) => (
// //             <div key={i} style={{ height: 260, background: T.card, borderRadius: 12, opacity: 0.4,
// //               animation: "fadeInOut 1.4s ease-in-out infinite" }}/>
// //           ))}
// //         </div>
// //       ) : categories.length === 0 ? (
// //         <div style={{ textAlign: "center", padding: "80px 20px",
// //           border: `1px dashed rgba(212,175,55,0.15)`, borderRadius: 14, background: T.card }}>
// //           <div style={{ width: 56, height: 56, margin: "0 auto 18px", borderRadius: 14,
// //             background: "rgba(212,175,55,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
// //             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.5">
// //               <path d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
// //             </svg>
// //           </div>
// //           <p style={{ fontSize: 18, fontWeight: 600, color: T.text, marginBottom: 8 }}>No categories yet</p>
// //           <p style={{ fontSize: 14, color: T.muted, marginBottom: 22 }}>Create your first category to get started</p>
// //           <button onClick={() => openModal()} style={{ padding: "10px 22px", background: T.maroon, color: T.text, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: SANS, borderRadius: 8 }}>
// //             Create Category
// //           </button>
// //         </div>
// //       ) : (
// //         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 16 }}>
// //           {categories.map((cat, i) => (
// //             <motion.div key={cat.id} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay: i*0.05 }}
// //               style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden" }}
// //               className="cat-admin-card">

// //               {/* Image */}
// //               <div style={{ position: "relative", height: 170, background: "#0a0a14", overflow: "hidden" }}>
// //                 {cat.imageUrl
// //                   ? <img src={cat.imageUrl} alt={cat.name} className="cat-admin-img"
// //                       style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}/>
// //                   : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
// //                       <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1">
// //                         <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
// //                       </svg>
// //                     </div>
// //                 }
// //                 {/* Upload overlay */}
// //                 <label className="cat-admin-overlay"
// //                   style={{ position: "absolute", inset: 0, background: "rgba(8,8,16,0.88)", display: "flex",
// //                     alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: 0, transition: "opacity 0.2s" }}>
// //                   <input type="file" accept="image/*" style={{ display: "none" }}
// //                     onChange={e => handleImageUpload(cat.id, e.target.files[0])} disabled={uploadingImage === cat.id}/>
// //                   {uploadingImage === cat.id
// //                     ? <div style={{ width: 28, height: 28, border: `2px solid ${T.gold}`, borderTopColor: "transparent",
// //                         borderRadius: "50%", animation: "spin 0.8s linear infinite" }}/>
// //                     : <div style={{ textAlign: "center" }}>
// //                         <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.5"
// //                           style={{ display: "block", margin: "0 auto 6px" }}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
// //                         <span style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: T.gold, fontWeight: 600 }}>Upload</span>
// //                       </div>
// //                   }
// //                 </label>

// //                 {/* Status pill */}
// //                 <div style={{ position: "absolute", top: 10, left: 10 }}>
// //                   <span style={{ padding: "3px 9px", borderRadius: 20, fontSize: 10, fontWeight: 700,
// //                     letterSpacing: "0.08em", textTransform: "uppercase",
// //                     background: cat.isActive ? "rgba(52,211,153,0.15)" : "rgba(248,113,113,0.15)",
// //                     color: cat.isActive ? "#34D399" : T.danger,
// //                     border: `1px solid ${cat.isActive ? "rgba(52,211,153,0.3)" : "rgba(248,113,113,0.3)"}` }}>
// //                     {cat.isActive ? "Active" : "Inactive"}
// //                   </span>
// //                 </div>
// //               </div>

// //               {/* Info */}
// //               <div style={{ padding: "14px 16px" }}>
// //                 <h3 style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 700, color: T.text, marginBottom: 4 }}>{cat.name}</h3>
// //                 {cat.description && (
// //                   <p style={{ fontSize: 13, color: T.muted, marginBottom: 12, overflow: "hidden",
// //                     display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{cat.description}</p>
// //                 )}
// //                 <div style={{ display: "flex", gap: 8, marginTop: cat.description ? 0 : 8 }}>
// //                   <button onClick={() => openModal(cat)}
// //                     style={{ flex: 1, padding: "9px", background: "rgba(212,175,55,0.07)", border: `1px solid ${T.borderHi}`,
// //                       color: T.gold, cursor: "pointer", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em",
// //                       textTransform: "uppercase", fontFamily: SANS, borderRadius: 7, transition: "all 0.15s" }}
// //                     onMouseEnter={e => e.currentTarget.style.background = "rgba(212,175,55,0.14)"}
// //                     onMouseLeave={e => e.currentTarget.style.background = "rgba(212,175,55,0.07)"}>
// //                     Edit
// //                   </button>
// //                   <button onClick={() => handleDelete(cat.id)}
// //                     style={{ padding: "9px 12px", background: T.dangerBg, border: `1px solid ${T.dangerBorder}`,
// //                       color: T.danger, cursor: "pointer", borderRadius: 7, transition: "all 0.15s", display: "flex", alignItems: "center" }}
// //                     onMouseEnter={e => e.currentTarget.style.background = "rgba(248,113,113,0.15)"}
// //                     onMouseLeave={e => e.currentTarget.style.background = T.dangerBg}>
// //                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                       <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
// //                     </svg>
// //                   </button>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           ))}
// //         </div>
// //       )}

// //       {/* Modal */}
// //       <AnimatePresence>
// //         {modalOpen && (
// //           <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
// //             style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center",
// //               justifyContent: "center", padding: 16, background: "rgba(4,4,12,0.9)" }}
// //             onClick={closeModal}>
// //             <motion.div initial={{ scale:0.93, opacity:0, y:16 }} animate={{ scale:1, opacity:1, y:0 }}
// //               exit={{ scale:0.93, opacity:0 }} transition={{ type: "spring", stiffness: 320, damping: 28 }}
// //               style={{ width: "100%", maxWidth: 460, background: T.surface,
// //                 border: `1px solid ${T.borderHi}`, borderRadius: 16, padding: "28px" }}
// //               onClick={e => e.stopPropagation()}>

// //               <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
// //                 <h2 style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 700, color: T.text }}>
// //                   {editingCategory ? "Edit Category" : "New Category"}
// //                 </h2>
// //                 <button onClick={closeModal}
// //                   style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.05)",
// //                     border: `1px solid ${T.border}`, color: T.muted, cursor: "pointer", display: "flex",
// //                     alignItems: "center", justifyContent: "center" }}>
// //                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// //                     <path d="M18 6 6 18M6 6l12 12"/>
// //                   </svg>
// //                 </button>
// //               </div>

// //               <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
// //                 <div>
// //                   <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em",
// //                     textTransform: "uppercase", color: T.muted, marginBottom: 8 }}>Category Name *</label>
// //                   <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
// //                     required placeholder="e.g. Silk Sarees" style={iStyle}
// //                     onFocus={e => e.target.style.borderColor = "rgba(212,175,55,0.4)"}
// //                     onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}/>
// //                 </div>
// //                 <div>
// //                   <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em",
// //                     textTransform: "uppercase", color: T.muted, marginBottom: 8 }}>Description</label>
// //                   <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})}
// //                     rows={3} placeholder="Short description..." style={{ ...iStyle, resize: "vertical" }}
// //                     onFocus={e => e.target.style.borderColor = "rgba(212,175,55,0.4)"}
// //                     onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}/>
// //                 </div>
// //                 <label style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
// //                   background: "rgba(52,211,153,0.04)", border: "1px solid rgba(52,211,153,0.12)",
// //                   borderRadius: 8, cursor: "pointer" }}>
// //                   <input type="checkbox" checked={form.isActive} onChange={e => setForm({...form, isActive: e.target.checked})}
// //                     style={{ width: 16, height: 16, accentColor: "#34D399", cursor: "pointer" }}/>
// //                   <span style={{ fontSize: 14, color: T.muted }}>Active — visible on store</span>
// //                 </label>
// //                 <div style={{ display: "flex", gap: 10, paddingTop: 4 }}>
// //                   <button type="button" onClick={closeModal}
// //                     style={{ flex: 1, padding: "12px", background: "transparent", border: `1px solid ${T.border}`,
// //                       color: T.muted, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: SANS, borderRadius: 8 }}>
// //                     Cancel
// //                   </button>
// //                   <button type="submit" disabled={saving}
// //                     style={{ flex: 1, padding: "12px", background: T.maroon, color: T.text, border: "none",
// //                       cursor: saving ? "wait" : "pointer", fontSize: 13, fontWeight: 600, fontFamily: SANS,
// //                       borderRadius: 8, opacity: saving ? 0.7 : 1, transition: "opacity 0.15s" }}>
// //                     {saving ? "Saving..." : editingCategory ? "Update" : "Create"}
// //                   </button>
// //                 </div>
// //               </form>
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');
// //         .cat-admin-card:hover .cat-admin-overlay { opacity: 1 !important; }
// //         .cat-admin-card:hover .cat-admin-img { transform: scale(1.04) !important; }
// //         @keyframes fadeInOut { 0%,100%{opacity:0.4} 50%{opacity:0.2} }
// //         @keyframes spin { to{transform:rotate(360deg)} }
// //       `}</style>
// //     </div>
// //   );
// // }




// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { adminAPI } from "../../api";
// import { useAdminTheme } from "./AdminDashboard";

// const SERIF = "'Cormorant Garamond', Georgia, serif";
// const SANS  = "'DM Sans', 'Segoe UI', system-ui, sans-serif";

// export default function AdminCategories() {
//   const { T } = useAdminTheme();
//   const [categories,      setCategories]      = useState([]);
//   const [loading,         setLoading]         = useState(true);
//   const [modalOpen,       setModalOpen]       = useState(false);
//   const [editingCategory, setEditingCategory] = useState(null);
//   const [form,            setForm]            = useState({ name: "", description: "", isActive: true });
//   const [uploadingImage,  setUploadingImage]  = useState(null);
//   const [saving,          setSaving]          = useState(false);

//   useEffect(() => { fetchCategories(); }, []);

//   const fetchCategories = async () => {
//     try { setCategories(await adminAPI.getAllCategories()); }
//     catch (e) { console.error(e); }
//     finally { setLoading(false); }
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault(); setSaving(true);
//     try {
//       if (editingCategory) await adminAPI.updateCategory(editingCategory.id, form);
//       else await adminAPI.createCategory(form);
//       fetchCategories(); closeModal();
//     } catch (e) { alert(e.response?.data?.message || "Failed to save"); }
//     finally { setSaving(false); }
//   };
//   const handleImageUpload = async (id, file) => {
//     setUploadingImage(id);
//     try { await adminAPI.uploadCategoryImage(id, file); fetchCategories(); }
//     catch { alert("Upload failed"); }
//     finally { setUploadingImage(null); }
//   };
//   const handleDelete = async (id) => {
//     if (!confirm("Delete this category?")) return;
//     try { await adminAPI.deleteCategory(id); fetchCategories(); }
//     catch { alert("Failed to delete"); }
//   };
//   const openModal = (cat = null) => {
//     setEditingCategory(cat);
//     setForm(cat ? { name: cat.name, description: cat.description || "", isActive: cat.isActive } : { name: "", description: "", isActive: true });
//     setModalOpen(true);
//   };
//   const closeModal = () => { setModalOpen(false); setEditingCategory(null); setForm({ name: "", description: "", isActive: true }); };

//   const iStyle = {
//     width: "100%", padding: "11px 14px", background: T.inputBg,
//     border: `1px solid ${T.inputBorder}`, borderRadius: 8,
//     color: T.text, fontSize: 14, outline: "none", fontFamily: SANS, transition: "border-color 0.15s",
//   };
//   const onFocusIn  = e => e.target.style.borderColor = T.inputFocus;
//   const onFocusOut = e => e.target.style.borderColor = T.inputBorder;

//   return (
//     <div style={{ fontFamily: SANS, color: T.text }}>

//       {/* Header */}
//       <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
//         <div>
//           <h1 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 700, color: T.text, marginBottom: 5 }}>Categories</h1>
//           <p style={{ fontSize: 14, color: T.muted }}>Manage product categories and collections</p>
//         </div>
//         <button onClick={() => openModal()}
//           style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px",
//             background: T.maroon, color: "#FFFFF0", border: "none", cursor: "pointer",
//             fontSize: 13, fontWeight: 600, fontFamily: SANS, borderRadius: 8, whiteSpace: "nowrap" }}>
//           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//             <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
//           </svg>
//           New Category
//         </button>
//       </div>

//       {/* Stats bar */}
//       <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
//         {[
//           { label: "Total",      value: categories.length,                           color: T.gold },
//           { label: "Active",     value: categories.filter(c => c.isActive).length,   color: T.green },
//           { label: "Inactive",   value: categories.filter(c => !c.isActive).length,  color: T.danger },
//           { label: "With Image", value: categories.filter(c => c.imageUrl).length,   color: T.blue },
//         ].map((s, i) => (
//           <div key={i} style={{ padding: "9px 16px", background: T.card, border: `1px solid ${T.border}`,
//             borderRadius: 8, display: "flex", alignItems: "center", gap: 8, boxShadow: T.shadow,
//             transition: "background 0.3s, border-color 0.3s" }}>
//             <span style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 700, color: s.color }}>{s.value}</span>
//             <span style={{ fontSize: 13, color: T.muted }}>{s.label}</span>
//           </div>
//         ))}
//       </div>

//       {/* Grid */}
//       {loading ? (
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 16 }}>
//           {[...Array(6)].map((_, i) => (
//             <div key={i} style={{ height: 260, background: T.card, borderRadius: 12,
//               animation: "fadeInOut 1.4s ease-in-out infinite", opacity: 0.45 }}/>
//           ))}
//         </div>
//       ) : categories.length === 0 ? (
//         <div style={{ textAlign: "center", padding: "80px 20px",
//           border: `1px dashed ${T.borderHi}`, borderRadius: 14, background: T.card }}>
//           <div style={{ width: 56, height: 56, margin: "0 auto 18px", borderRadius: 14,
//             background: "rgba(212,175,55,0.07)", display: "flex", alignItems: "center", justifyContent: "center" }}>
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.5">
//               <path d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
//             </svg>
//           </div>
//           <p style={{ fontSize: 18, fontWeight: 600, color: T.text, marginBottom: 8 }}>No categories yet</p>
//           <p style={{ fontSize: 14, color: T.muted, marginBottom: 22 }}>Create your first category to get started</p>
//           <button onClick={() => openModal()} style={{ padding: "10px 22px", background: T.maroon, color: "#FFFFF0",
//             border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: SANS, borderRadius: 8 }}>
//             Create Category
//           </button>
//         </div>
//       ) : (
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 16 }}>
//           {categories.map((cat, i) => (
//             <motion.div key={cat.id} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay: i*0.05 }}
//               className="c-card"
//               style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14,
//                 overflow: "hidden", boxShadow: T.shadow, transition: "background 0.3s, border-color 0.3s" }}>

//               {/* Image area */}
//               <div style={{ position: "relative", height: 170, background: T.inputBg, overflow: "hidden" }}>
//                 {cat.imageUrl
//                   ? <img src={cat.imageUrl} alt={cat.name} className="c-img"
//                       style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}/>
//                   : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                       <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={T.border} strokeWidth="1">
//                         <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
//                       </svg>
//                     </div>
//                 }
//                 {/* Upload overlay */}
//                 <label className="c-overlay" style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.82)",
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   cursor: "pointer", opacity: 0, transition: "opacity 0.2s" }}>
//                   <input type="file" accept="image/*" style={{ display: "none" }}
//                     onChange={e => handleImageUpload(cat.id, e.target.files[0])} disabled={uploadingImage === cat.id}/>
//                   {uploadingImage === cat.id
//                     ? <div style={{ width: 28, height: 28, border: "2px solid #D4AF37", borderTopColor: "transparent",
//                         borderRadius: "50%", animation: "spin 0.8s linear infinite" }}/>
//                     : <div style={{ textAlign: "center" }}>
//                         <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5"
//                           style={{ display: "block", margin: "0 auto 6px" }}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
//                         <span style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#D4AF37", fontWeight: 600 }}>Upload</span>
//                       </div>
//                   }
//                 </label>

//                 {/* Status pill */}
//                 <div style={{ position: "absolute", top: 10, left: 10 }}>
//                   <span style={{ padding: "3px 9px", borderRadius: 20, fontSize: 10, fontWeight: 700,
//                     letterSpacing: "0.08em", textTransform: "uppercase",
//                     background: cat.isActive ? T.greenBg : T.dangerBg,
//                     color: cat.isActive ? T.green : T.danger,
//                     border: `1px solid ${cat.isActive ? T.greenBorder : T.dangerBorder}` }}>
//                     {cat.isActive ? "Active" : "Inactive"}
//                   </span>
//                 </div>
//               </div>

//               {/* Info */}
//               <div style={{ padding: "14px 16px" }}>
//                 <h3 style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 700, color: T.text, marginBottom: 4 }}>{cat.name}</h3>
//                 {cat.description && (
//                   <p style={{ fontSize: 13, color: T.muted, marginBottom: 12, overflow: "hidden",
//                     display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{cat.description}</p>
//                 )}
//                 <div style={{ display: "flex", gap: 8, marginTop: cat.description ? 0 : 8 }}>
//                   <button onClick={() => openModal(cat)}
//                     style={{ flex: 1, padding: "9px", background: "rgba(212,175,55,0.07)", border: `1px solid ${T.borderHi}`,
//                       color: T.gold, cursor: "pointer", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em",
//                       textTransform: "uppercase", fontFamily: SANS, borderRadius: 7, transition: "all 0.15s" }}
//                     onMouseEnter={e => e.currentTarget.style.background = "rgba(212,175,55,0.14)"}
//                     onMouseLeave={e => e.currentTarget.style.background = "rgba(212,175,55,0.07)"}>
//                     Edit
//                   </button>
//                   <button onClick={() => handleDelete(cat.id)}
//                     style={{ padding: "9px 12px", background: T.dangerBg, border: `1px solid ${T.dangerBorder}`,
//                       color: T.danger, cursor: "pointer", borderRadius: 7, display: "flex", alignItems: "center", transition: "all 0.15s" }}
//                     onMouseEnter={e => e.currentTarget.style.background = "rgba(220,38,38,0.12)"}
//                     onMouseLeave={e => e.currentTarget.style.background = T.dangerBg}>
//                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}

//       {/* Modal */}
//       <AnimatePresence>
//         {modalOpen && (
//           <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
//             style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center",
//               justifyContent: "center", padding: 16, background: "rgba(0,0,0,0.55)" }}
//             onClick={closeModal}>
//             <motion.div initial={{ scale:0.93, opacity:0, y:16 }} animate={{ scale:1, opacity:1, y:0 }}
//               exit={{ scale:0.93, opacity:0 }} transition={{ type: "spring", stiffness: 320, damping: 28 }}
//               style={{ width: "100%", maxWidth: 460, background: T.surface,
//                 border: `1px solid ${T.borderHi}`, borderRadius: 16, padding: "28px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
//               onClick={e => e.stopPropagation()}>

//               <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
//                 <h2 style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 700, color: T.text }}>
//                   {editingCategory ? "Edit Category" : "New Category"}
//                 </h2>
//                 <button onClick={closeModal}
//                   style={{ width: 32, height: 32, borderRadius: 8, background: T.hoverBg,
//                     border: `1px solid ${T.border}`, color: T.muted, cursor: "pointer",
//                     display: "flex", alignItems: "center", justifyContent: "center" }}>
//                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//                     <path d="M18 6 6 18M6 6l12 12"/>
//                   </svg>
//                 </button>
//               </div>

//               <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//                 <div>
//                   <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em",
//                     textTransform: "uppercase", color: T.muted, marginBottom: 8 }}>Category Name *</label>
//                   <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
//                     required placeholder="e.g. Silk Sarees" style={iStyle}
//                     onFocus={onFocusIn} onBlur={onFocusOut}/>
//                 </div>
//                 <div>
//                   <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em",
//                     textTransform: "uppercase", color: T.muted, marginBottom: 8 }}>Description</label>
//                   <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})}
//                     rows={3} placeholder="Short description..." style={{ ...iStyle, resize: "vertical" }}
//                     onFocus={onFocusIn} onBlur={onFocusOut}/>
//                 </div>
//                 <label style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
//                   background: T.greenBg, border: `1px solid ${T.greenBorder}`, borderRadius: 8, cursor: "pointer" }}>
//                   <input type="checkbox" checked={form.isActive} onChange={e => setForm({...form, isActive: e.target.checked})}
//                     style={{ width: 16, height: 16, accentColor: T.green, cursor: "pointer" }}/>
//                   <span style={{ fontSize: 14, color: T.muted }}>Active — visible on store</span>
//                 </label>
//                 <div style={{ display: "flex", gap: 10, paddingTop: 4 }}>
//                   <button type="button" onClick={closeModal}
//                     style={{ flex: 1, padding: "12px", background: "transparent", border: `1px solid ${T.border}`,
//                       color: T.muted, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: SANS, borderRadius: 8 }}>
//                     Cancel
//                   </button>
//                   <button type="submit" disabled={saving}
//                     style={{ flex: 1, padding: "12px", background: T.maroon, color: "#FFFFF0", border: "none",
//                       cursor: saving ? "wait" : "pointer", fontSize: 13, fontWeight: 600, fontFamily: SANS,
//                       borderRadius: 8, opacity: saving ? 0.7 : 1, transition: "opacity 0.15s" }}>
//                     {saving ? "Saving..." : editingCategory ? "Update" : "Create"}
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');
//         .c-card:hover .c-overlay { opacity: 1 !important; }
//         .c-card:hover .c-img     { transform: scale(1.04) !important; }
//         @keyframes fadeInOut { 0%,100%{opacity:0.45} 50%{opacity:0.2} }
//         @keyframes spin { to { transform: rotate(360deg); } }
//       `}</style>
//     </div>
//   );
// }




import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { adminAPI } from "../../api";
import { useAdminTheme } from "./AdminDashboard";

const SERIF = "'Cormorant Garamond', Georgia, serif";
const SANS  = "'DM Sans', 'Segoe UI', system-ui, sans-serif";

export default function AdminCategories() {
  const { T, theme } = useAdminTheme();
  const [categories,      setCategories]      = useState([]);
  const [loading,         setLoading]         = useState(true);
  const [modalOpen,       setModalOpen]       = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form,            setForm]            = useState({ name:"", description:"", isActive:true });
  const [uploadingImage,  setUploadingImage]  = useState(null);
  const [saving,          setSaving]          = useState(false);

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    try { setCategories(await adminAPI.getAllCategories()); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      if (editingCategory) await adminAPI.updateCategory(editingCategory.id, form);
      else await adminAPI.createCategory(form);
      fetchCategories(); closeModal();
    } catch (e) { alert(e.response?.data?.message || "Failed to save"); }
    finally { setSaving(false); }
  };
  const handleImageUpload = async (id, file) => {
    setUploadingImage(id);
    try { await adminAPI.uploadCategoryImage(id, file); fetchCategories(); }
    catch { alert("Upload failed"); }
    finally { setUploadingImage(null); }
  };
  const handleDelete = async (id) => {
    if (!confirm("Delete this category? This cannot be undone.")) return;
    try { await adminAPI.deleteCategory(id); fetchCategories(); }
    catch { alert("Failed to delete"); }
  };
  const openModal = (cat = null) => {
    setEditingCategory(cat);
    setForm(cat ? { name:cat.name, description:cat.description||"", isActive:cat.isActive } : { name:"", description:"", isActive:true });
    setModalOpen(true);
  };
  const closeModal = () => { setModalOpen(false); setEditingCategory(null); setForm({ name:"", description:"", isActive:true }); };

  // Dynamic styles from theme
  const iStyle = {
    width:"100%", padding:"11px 14px",
    background:T.inputBg,
    border:`1.5px solid ${T.inputBorder}`,
    borderRadius:8, color:T.text, fontSize:14, outline:"none",
    fontFamily:SANS, transition:"border-color 0.15s",
    boxShadow:theme==="light"?"inset 0 1px 3px rgba(0,0,0,0.04)":"none",
  };
  const labelStyle = {
    display:"block", fontSize:11, fontWeight:700, letterSpacing:"0.15em",
    textTransform:"uppercase", color:T.muted, marginBottom:7,
  };
  const onFI = e => e.target.style.borderColor = T.inputFocus;
  const onFO = e => e.target.style.borderColor = T.inputBorder;

  const stats = [
    { label:"Total",      value:categories.length,                        color:theme==="dark"?T.gold:"#7A5C0A",     bg:theme==="dark"?"rgba(212,175,55,0.1)":"#FEF9ED",   bd:theme==="dark"?"rgba(212,175,55,0.2)":"#E8D5A0" },
    { label:"Active",     value:categories.filter(c=>c.isActive).length,  color:T.green,                             bg:T.greenBg,                                         bd:T.greenBorder },
    { label:"Inactive",   value:categories.filter(c=>!c.isActive).length, color:T.danger,                            bg:T.dangerBg,                                        bd:T.dangerBorder },
    { label:"With Image", value:categories.filter(c=>c.imageUrl).length,  color:T.blue,                              bg:T.blueBg,                                          bd:T.blueBorder },
  ];

  return (
    <div style={{ fontFamily:SANS, color:T.text }}>

      {/* ── PAGE HEADER ── */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:22 }}>
        <div>
          <h1 style={{ fontFamily:SERIF, fontSize:28, fontWeight:700, color:T.text, marginBottom:5 }}>Categories</h1>
          <p style={{ fontSize:14, color:T.muted }}>Manage product categories and collections</p>
        </div>
        <button onClick={() => openModal()}
          style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 20px",
            background:T.maroon, color:"#FFFFF0", border:"none", cursor:"pointer",
            fontSize:13, fontWeight:600, fontFamily:SANS, borderRadius:8, whiteSpace:"nowrap",
            boxShadow:theme==="light"?"0 2px 8px rgba(128,0,0,0.25)":"none" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          New Category
        </button>
      </div>

      {/* ── STATS BAR ── */}
      <div style={{ display:"flex", gap:10, marginBottom:22 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ padding:"10px 16px", borderRadius:9,
            background:s.bg, border:`1.5px solid ${s.bd}`,
            display:"flex", alignItems:"center", gap:10, minWidth:100 }}>
            <span style={{ fontFamily:SERIF, fontSize:22, fontWeight:700, color:s.color, lineHeight:1 }}>{s.value}</span>
            <span style={{ fontSize:13, fontWeight:500, color:T.muted }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── GRID ── */}
      {loading ? (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:16 }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ height:280, borderRadius:12, background:T.card,
              border:`1px solid ${T.statBorder||T.border}`, animation:"fadeInOut 1.4s ease-in-out infinite" }}/>
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div style={{ textAlign:"center", padding:"80px 20px", borderRadius:14, background:T.card,
          border:`2px dashed ${T.statBorder||T.border}` }}>
          <div style={{ width:56, height:56, margin:"0 auto 18px", borderRadius:14,
            background:theme==="dark"?"rgba(212,175,55,0.07)":"#FEF9ED",
            border:`1.5px solid ${theme==="dark"?"rgba(212,175,55,0.15)":"#E8D5A0"}`,
            display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={theme==="dark"?T.gold:"#7A5C0A"} strokeWidth="1.5">
              <path d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
            </svg>
          </div>
          <p style={{ fontSize:18, fontWeight:700, color:T.text, marginBottom:8 }}>No categories yet</p>
          <p style={{ fontSize:14, color:T.muted, marginBottom:22 }}>Create your first category to get started</p>
          <button onClick={() => openModal()}
            style={{ padding:"10px 22px", background:T.maroon, color:"#FFFFF0", border:"none",
              cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:SANS, borderRadius:8 }}>
            Create Category
          </button>
        </div>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:16 }}>
          {categories.map((cat, i) => (
            <motion.div key={cat.id} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.05 }}
              className="c-card"
              style={{ background:T.card, border:`1.5px solid ${T.statBorder||T.border}`,
                borderRadius:14, overflow:"hidden",
                boxShadow:T.shadow, transition:"background 0.3s, border-color 0.3s, box-shadow 0.2s" }}>

              {/* Image zone */}
              <div style={{ position:"relative", height:175, background:T.inputBg, overflow:"hidden" }}>
                {cat.imageUrl
                  ? <img src={cat.imageUrl} alt={cat.name} className="c-img"
                      style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s" }}/>
                  : <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={theme==="dark"?"rgba(255,255,255,0.1)":"#D1CBC0"} strokeWidth="1">
                        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                      </svg>
                    </div>
                }
                {/* Upload overlay */}
                <label className="c-overlay"
                  style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.75)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    cursor:"pointer", opacity:0, transition:"opacity 0.2s" }}>
                  <input type="file" accept="image/*" style={{ display:"none" }}
                    onChange={e => handleImageUpload(cat.id, e.target.files[0])} disabled={uploadingImage===cat.id}/>
                  {uploadingImage===cat.id
                    ? <div style={{ width:28, height:28, border:"2px solid #D4AF37", borderTopColor:"transparent",
                        borderRadius:"50%", animation:"spin 0.8s linear infinite" }}/>
                    : <div style={{ textAlign:"center" }}>
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5"
                          style={{ display:"block", margin:"0 auto 6px" }}>
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                        </svg>
                        <span style={{ fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:"#D4AF37", fontWeight:700 }}>Upload Image</span>
                      </div>
                  }
                </label>

                {/* Status pill */}
                <div style={{ position:"absolute", top:10, left:10 }}>
                  <span style={{ padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:700,
                    letterSpacing:"0.06em", textTransform:"uppercase",
                    background:cat.isActive ? T.greenBg : T.dangerBg,
                    color:cat.isActive ? T.green : T.danger,
                    border:`1.5px solid ${cat.isActive ? T.greenBorder : T.dangerBorder}` }}>
                    {cat.isActive ? "● Active" : "○ Inactive"}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div style={{ padding:"14px 16px" }}>
                <h3 style={{ fontFamily:SERIF, fontSize:19, fontWeight:700, color:T.text, marginBottom:5 }}>{cat.name}</h3>
                {cat.description && (
                  <p style={{ fontSize:13, color:T.muted, marginBottom:12, lineHeight:1.5,
                    overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>
                    {cat.description}
                  </p>
                )}
                <div style={{ display:"flex", gap:8, marginTop:cat.description?0:10 }}>
                  <button onClick={() => openModal(cat)}
                    style={{ flex:1, padding:"9px", cursor:"pointer", fontSize:12, fontWeight:700,
                      letterSpacing:"0.06em", textTransform:"uppercase", fontFamily:SANS, borderRadius:7,
                      transition:"all 0.15s",
                      background:theme==="dark"?"rgba(212,175,55,0.08)":"#FEF9ED",
                      border:`1.5px solid ${theme==="dark"?"rgba(212,175,55,0.25)":"#C8A840"}`,
                      color:theme==="dark"?T.gold:"#7A5C0A" }}
                    onMouseEnter={e=>e.currentTarget.style.background=theme==="dark"?"rgba(212,175,55,0.16)":"#FDF0C4"}
                    onMouseLeave={e=>e.currentTarget.style.background=theme==="dark"?"rgba(212,175,55,0.08)":"#FEF9ED"}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(cat.id)}
                    style={{ padding:"9px 12px", cursor:"pointer", borderRadius:7, transition:"all 0.15s",
                      display:"flex", alignItems:"center",
                      background:T.dangerBg, border:`1.5px solid ${T.dangerBorder}`, color:T.danger }}
                    onMouseEnter={e=>e.currentTarget.style.background=theme==="dark"?"rgba(248,113,113,0.2)":"#FED7D7"}
                    onMouseLeave={e=>e.currentTarget.style.background=T.dangerBg}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ── MODAL ── */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            style={{ position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"center",
              justifyContent:"center", padding:16, background:"rgba(0,0,0,0.55)", backdropFilter:"blur(4px)" }}
            onClick={closeModal}>
            <motion.div initial={{ scale:0.93, opacity:0, y:16 }} animate={{ scale:1, opacity:1, y:0 }}
              exit={{ scale:0.93, opacity:0 }} transition={{ type:"spring", stiffness:320, damping:28 }}
              style={{ width:"100%", maxWidth:460, background:T.surface,
                border:`1.5px solid ${T.borderHi}`, borderRadius:16, padding:"28px",
                boxShadow:"0 20px 60px rgba(0,0,0,0.3)" }}
              onClick={e => e.stopPropagation()}>

              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
                <div>
                  <h2 style={{ fontFamily:SERIF, fontSize:24, fontWeight:700, color:T.text }}>
                    {editingCategory ? "Edit Category" : "New Category"}
                  </h2>
                  <p style={{ fontSize:13, color:T.muted, marginTop:3 }}>
                    {editingCategory ? "Update category details" : "Add a new product collection"}
                  </p>
                </div>
                <button onClick={closeModal}
                  style={{ width:32, height:32, borderRadius:8, background:T.hoverBg,
                    border:`1.5px solid ${T.border}`, color:T.muted, cursor:"pointer",
                    display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6 6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:16 }}>
                <div>
                  <label style={labelStyle}>Category Name *</label>
                  <input type="text" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}
                    required placeholder="e.g. Kanjivaram Silk Sarees" style={iStyle}
                    onFocus={onFI} onBlur={onFO}/>
                </div>
                <div>
                  <label style={labelStyle}>Description</label>
                  <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})}
                    rows={3} placeholder="Brief description of this category…"
                    style={{ ...iStyle, resize:"vertical" }} onFocus={onFI} onBlur={onFO}/>
                </div>

                {/* Active toggle */}
                <label style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px",
                  background:T.greenBg, border:`1.5px solid ${T.greenBorder}`, borderRadius:8, cursor:"pointer" }}>
                  <div style={{ position:"relative", width:36, height:20, flexShrink:0 }}
                    onClick={()=>setForm({...form,isActive:!form.isActive})}>
                    <div style={{ width:36, height:20, borderRadius:10,
                      background:form.isActive?T.green:"rgba(128,128,128,0.25)", transition:"background 0.2s" }}/>
                    <div style={{ position:"absolute", top:2, left:form.isActive?18:2, width:16, height:16,
                      borderRadius:"50%", background:"white", transition:"left 0.2s",
                      boxShadow:"0 1px 3px rgba(0,0,0,0.25)" }}/>
                  </div>
                  <div>
                    <p style={{ fontSize:14, fontWeight:600, color:T.text }}>
                      {form.isActive ? "Active" : "Inactive"}
                    </p>
                    <p style={{ fontSize:12, color:T.muted }}>
                      {form.isActive ? "Visible on store" : "Hidden from customers"}
                    </p>
                  </div>
                </label>

                <div style={{ display:"flex", gap:10, paddingTop:4 }}>
                  <button type="button" onClick={closeModal}
                    style={{ flex:1, padding:"12px", background:"transparent",
                      border:`1.5px solid ${T.border}`, color:T.muted, cursor:"pointer",
                      fontSize:13, fontWeight:600, fontFamily:SANS, borderRadius:8,
                      transition:"all 0.15s" }}
                    onMouseEnter={e=>e.currentTarget.style.background=T.hoverBg}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    Cancel
                  </button>
                  <button type="submit" disabled={saving}
                    style={{ flex:2, padding:"12px", background:T.maroon, color:"#FFFFF0", border:"none",
                      cursor:saving?"wait":"pointer", fontSize:13, fontWeight:700, fontFamily:SANS,
                      borderRadius:8, opacity:saving?0.7:1, transition:"opacity 0.15s",
                      boxShadow:theme==="light"?"0 2px 8px rgba(128,0,0,0.3)":"none" }}>
                    {saving ? "Saving…" : editingCategory ? "Update Category" : "Create Category"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        .c-card { transition: transform 0.18s, box-shadow 0.18s !important; }
        .c-card:hover { transform: translateY(-3px); box-shadow: ${T.shadowMd} !important; }
        .c-card:hover .c-overlay { opacity: 1 !important; }
        .c-card:hover .c-img { transform: scale(1.05) !important; }
        @keyframes fadeInOut { 0%,100%{opacity:0.5} 50%{opacity:0.2} }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}