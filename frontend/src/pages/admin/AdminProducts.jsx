// // // // import { useState, useEffect } from "react";
// // // // import { motion, AnimatePresence } from "framer-motion";
// // // // import { adminAPI } from "../../api";

// // // // export default function AdminProducts() {
// // // //   const [products, setProducts] = useState([]);
// // // //   const [categories, setCategories] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [modalOpen, setModalOpen] = useState(false);
// // // //   const [editingProduct, setEditingProduct] = useState(null);
// // // //   const [form, setForm] = useState({
// // // //     name: "",
// // // //     description: "",
// // // //     price: "",
// // // //     originalPrice: "",
// // // //     discountPercent: 0,
// // // //     stockQuantity: 0,
// // // //     categoryId: "",
// // // //     isFeatured: false,
// // // //     isActive: true,
// // // //   });
// // // //   const [uploadingImage, setUploadingImage] = useState(null);
// // // //   const [currentPage, setCurrentPage] = useState(0);
// // // //   const [totalPages, setTotalPages] = useState(0);
// // // //   const [searchQuery, setSearchQuery] = useState("");

// // // //   useEffect(() => {
// // // //     fetchProducts();
// // // //     fetchCategories();
// // // //   }, [currentPage, searchQuery]);

// // // //   const fetchProducts = async () => {
// // // //     try {
// // // //       const data = await adminAPI.getAllProducts(currentPage, 20, searchQuery);
// // // //       setProducts(data.content || []);
// // // //       setTotalPages(data.totalPages || 0);
// // // //     } catch (err) {
// // // //       console.error("Failed to fetch products", err);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const fetchCategories = async () => {
// // // //     try {
// // // //       const data = await adminAPI.getAllCategories();
// // // //       setCategories(data);
// // // //     } catch (err) {
// // // //       console.error("Failed to fetch categories", err);
// // // //     }
// // // //   };

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     setLoading(true);
// // // //     try {
// // // //       const payload = {
// // // //         ...form,
// // // //         price: parseFloat(form.price),
// // // //         originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
// // // //         discountPercent: parseInt(form.discountPercent) || 0,
// // // //         stockQuantity: parseInt(form.stockQuantity) || 0,
// // // //         categoryId: parseInt(form.categoryId),
// // // //       };

// // // //       if (editingProduct) {
// // // //         await adminAPI.updateProduct(editingProduct.id, payload);
// // // //       } else {
// // // //         await adminAPI.createProduct(payload);
// // // //       }
// // // //       fetchProducts();
// // // //       closeModal();
// // // //     } catch (err) {
// // // //       alert(err.response?.data?.message || "Failed to save product");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleImageUpload = async (productId, file) => {
// // // //     setUploadingImage(productId);
// // // //     try {
// // // //       await adminAPI.uploadProductImage(productId, file);
// // // //       fetchProducts();
// // // //     } catch (err) {
// // // //       alert("Image upload failed");
// // // //     } finally {
// // // //       setUploadingImage(null);
// // // //     }
// // // //   };

// // // //   const handleDelete = async (id) => {
// // // //     if (!confirm("Delete this product?")) return;
// // // //     try {
// // // //       await adminAPI.deleteProduct(id);
// // // //       fetchProducts();
// // // //     } catch (err) {
// // // //       alert("Failed to delete product");
// // // //     }
// // // //   };

// // // //   const toggleFeatured = async (id) => {
// // // //     try {
// // // //       await adminAPI.toggleFeatured(id);
// // // //       fetchProducts();
// // // //     } catch (err) {
// // // //       alert("Failed to toggle featured status");
// // // //     }
// // // //   };

// // // //   const toggleActive = async (id) => {
// // // //     try {
// // // //       await adminAPI.toggleActive(id);
// // // //       fetchProducts();
// // // //     } catch (err) {
// // // //       alert("Failed to toggle active status");
// // // //     }
// // // //   };

// // // //   const openModal = (product = null) => {
// // // //     if (product) {
// // // //       setEditingProduct(product);
// // // //       setForm({
// // // //         name: product.name,
// // // //         description: product.description || "",
// // // //         price: product.price.toString(),
// // // //         originalPrice: product.originalPrice?.toString() || "",
// // // //         discountPercent: product.discountPercent || 0,
// // // //         stockQuantity: product.stockQuantity || 0,
// // // //         categoryId: product.category?.id?.toString() || "",
// // // //         isFeatured: product.isFeatured || false,
// // // //         isActive: product.isActive !== false,
// // // //       });
// // // //     } else {
// // // //       setEditingProduct(null);
// // // //       setForm({
// // // //         name: "",
// // // //         description: "",
// // // //         price: "",
// // // //         originalPrice: "",
// // // //         discountPercent: 0,
// // // //         stockQuantity: 0,
// // // //         categoryId: "",
// // // //         isFeatured: false,
// // // //         isActive: true,
// // // //       });
// // // //     }
// // // //     setModalOpen(true);
// // // //   };

// // // //   const closeModal = () => {
// // // //     setModalOpen(false);
// // // //     setEditingProduct(null);
// // // //   };

// // // //   return (
// // // //     <div style={{ fontFamily: "'Cormorant Garamond', serif" }}>
// // // //       {/* Header */}
// // // //       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
// // // //         <div>
// // // //           <h1 className="text-3xl font-bold mb-1" style={{ color: "#1A1A2E" }}>Products</h1>
// // // //           <p className="text-sm" style={{ color: "#36454F" }}>Manage your product catalog</p>
// // // //         </div>
// // // //         <div className="flex gap-3">
// // // //           <input
// // // //             type="text"
// // // //             placeholder="Search products..."
// // // //             value={searchQuery}
// // // //             onChange={(e) => setSearchQuery(e.target.value)}
// // // //             className="px-4 py-2 text-sm outline-none"
// // // //             style={{ border: "1px solid rgba(26,26,46,0.2)", minWidth: "200px" }}
// // // //           />
// // // //           <button
// // // //             onClick={() => openModal()}
// // // //             className="flex items-center gap-2 px-6 py-3 text-sm tracking-widest uppercase font-semibold transition-all whitespace-nowrap"
// // // //             style={{ background: "#800000", color: "#FFFFF0" }}
// // // //             onMouseEnter={e => e.currentTarget.style.background = "#900000"}
// // // //             onMouseLeave={e => e.currentTarget.style.background = "#800000"}
// // // //           >
// // // //             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // // //               <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
// // // //             </svg>
// // // //             Add Product
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       {/* Products Grid */}
// // // //       {loading ? (
// // // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // // //           {[...Array(8)].map((_, i) => (
// // // //             <div key={i} className="h-96 animate-pulse" style={{ background: "rgba(26,26,46,0.04)" }} />
// // // //           ))}
// // // //         </div>
// // // //       ) : products.length === 0 ? (
// // // //         <div className="text-center py-20" style={{ border: "1px dashed rgba(26,26,46,0.15)" }}>
// // // //           <div className="w-16 h-16 mx-auto mb-4 opacity-20"
// // // //             style={{ background: "#D4AF37", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
// // // //           <p className="text-lg mb-2" style={{ color: "#36454F" }}>No products yet</p>
// // // //           <p className="text-sm mb-6" style={{ color: "rgba(54,69,79,0.6)" }}>Create your first product to get started</p>
// // // //           <button
// // // //             onClick={() => openModal()}
// // // //             className="px-6 py-3 text-sm tracking-widest uppercase"
// // // //             style={{ background: "#800000", color: "#FFFFF0" }}
// // // //           >
// // // //             Add Product
// // // //           </button>
// // // //         </div>
// // // //       ) : (
// // // //         <>
// // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // // //             {products.map((product, i) => (
// // // //               <motion.div
// // // //                 key={product.id}
// // // //                 initial={{ opacity: 0, y: 20 }}
// // // //                 animate={{ opacity: 1, y: 0 }}
// // // //                 transition={{ delay: i * 0.05 }}
// // // //                 className="group relative overflow-hidden"
// // // //                 style={{ border: "1px solid rgba(26,26,46,0.08)", background: "white" }}
// // // //               >
// // // //                 {/* Image */}
// // // //                 <div className="relative h-64 overflow-hidden" style={{ background: "rgba(26,26,46,0.04)" }}>
// // // //                   {product.imageUrl ? (
// // // //                     <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
// // // //                   ) : (
// // // //                     <div className="w-full h-full flex items-center justify-center">
// // // //                       <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(26,26,46,0.2)" strokeWidth="1.5">
// // // //                         <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
// // // //                       </svg>
// // // //                     </div>
// // // //                   )}
// // // //                   {/* Upload overlay */}
// // // //                   <label className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
// // // //                     style={{ background: "rgba(26,26,46,0.8)" }}>
// // // //                     <input
// // // //                       type="file"
// // // //                       accept="image/*"
// // // //                       className="hidden"
// // // //                       onChange={(e) => handleImageUpload(product.id, e.target.files[0])}
// // // //                       disabled={uploadingImage === product.id}
// // // //                     />
// // // //                     {uploadingImage === product.id ? (
// // // //                       <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
// // // //                         className="w-8 h-8 border-2 rounded-full" style={{ borderColor: "#D4AF37", borderTopColor: "transparent" }} />
// // // //                     ) : (
// // // //                       <div className="text-center">
// // // //                         <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" className="mx-auto mb-2">
// // // //                           <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
// // // //                         </svg>
// // // //                         <span className="text-xs tracking-widest uppercase" style={{ color: "#D4AF37" }}>Upload Image</span>
// // // //                       </div>
// // // //                     )}
// // // //                   </label>
// // // //                   {/* Badges */}
// // // //                   <div className="absolute top-3 left-3 flex flex-col gap-1">
// // // //                     {product.isFeatured && (
// // // //                       <div className="px-2 py-1 text-xs tracking-widest uppercase"
// // // //                         style={{ background: "rgba(212,175,55,0.9)", color: "#1A1A2E" }}>Featured</div>
// // // //                     )}
// // // //                     {!product.isActive && (
// // // //                       <div className="px-2 py-1 text-xs tracking-widest uppercase"
// // // //                         style={{ background: "rgba(128,0,0,0.9)", color: "#FFFFF0" }}>Inactive</div>
// // // //                     )}
// // // //                     {product.stockQuantity === 0 && (
// // // //                       <div className="px-2 py-1 text-xs tracking-widest uppercase"
// // // //                         style={{ background: "rgba(0,0,0,0.9)", color: "#FFFFF0" }}>Out of Stock</div>
// // // //                     )}
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Info */}
// // // //                 <div className="p-4">
// // // //                   <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#D4AF37" }}>
// // // //                     {product.category?.name || "Uncategorized"}
// // // //                   </p>
// // // //                   <h3 className="text-base font-bold mb-1 line-clamp-1" style={{ color: "#1A1A2E" }}>{product.name}</h3>
// // // //                   <div className="flex items-center gap-2 mb-3">
// // // //                     <span className="text-lg font-bold" style={{ color: "#1A1A2E" }}>₹{product.price?.toLocaleString("en-IN")}</span>
// // // //                     {product.originalPrice && product.originalPrice > product.price && (
// // // //                       <span className="text-sm line-through" style={{ color: "rgba(54,69,79,0.4)" }}>
// // // //                         ₹{product.originalPrice?.toLocaleString("en-IN")}
// // // //                       </span>
// // // //                     )}
// // // //                   </div>
// // // //                   <p className="text-xs mb-3" style={{ color: "#36454F" }}>Stock: {product.stockQuantity}</p>
                  
// // // //                   {/* Actions */}
// // // //                   <div className="flex gap-2 mb-2">
// // // //                     <button
// // // //                       onClick={() => openModal(product)}
// // // //                       className="flex-1 px-3 py-2 text-xs tracking-widest uppercase transition-all"
// // // //                       style={{ border: "1px solid rgba(26,26,46,0.2)", color: "#1A1A2E" }}
// // // //                     >
// // // //                       Edit
// // // //                     </button>
// // // //                     <button
// // // //                       onClick={() => handleDelete(product.id)}
// // // //                       className="px-3 py-2 text-xs tracking-widest uppercase transition-all"
// // // //                       style={{ border: "1px solid rgba(128,0,0,0.2)", color: "#800000" }}
// // // //                     >
// // // //                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // // //                         <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
// // // //                       </svg>
// // // //                     </button>
// // // //                   </div>
// // // //                   <div className="flex gap-2">
// // // //                     <button
// // // //                       onClick={() => toggleFeatured(product.id)}
// // // //                       className="flex-1 px-3 py-1.5 text-xs tracking-widest uppercase transition-all"
// // // //                       style={{ 
// // // //                         background: product.isFeatured ? "rgba(212,175,55,0.1)" : "transparent",
// // // //                         border: "1px solid rgba(212,175,55,0.3)", 
// // // //                         color: "#D4AF37" 
// // // //                       }}
// // // //                     >
// // // //                       ★ Featured
// // // //                     </button>
// // // //                     <button
// // // //                       onClick={() => toggleActive(product.id)}
// // // //                       className="flex-1 px-3 py-1.5 text-xs tracking-widest uppercase transition-all"
// // // //                       style={{ 
// // // //                         background: product.isActive ? "rgba(26,26,46,0.05)" : "rgba(128,0,0,0.05)",
// // // //                         border: `1px solid ${product.isActive ? "rgba(26,26,46,0.2)" : "rgba(128,0,0,0.2)"}`, 
// // // //                         color: product.isActive ? "#1A1A2E" : "#800000"
// // // //                       }}
// // // //                     >
// // // //                       {product.isActive ? "Active" : "Inactive"}
// // // //                     </button>
// // // //                   </div>
// // // //                 </div>
// // // //               </motion.div>
// // // //             ))}
// // // //           </div>

// // // //           {/* Pagination */}
// // // //           {totalPages > 1 && (
// // // //             <div className="flex justify-center gap-2 mt-8">
// // // //               <button
// // // //                 onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
// // // //                 disabled={currentPage === 0}
// // // //                 className="px-4 py-2 text-sm tracking-widest uppercase transition-all disabled:opacity-30"
// // // //                 style={{ border: "1px solid rgba(26,26,46,0.2)", color: "#1A1A2E" }}
// // // //               >
// // // //                 Previous
// // // //               </button>
// // // //               <span className="px-4 py-2 text-sm" style={{ color: "#36454F" }}>
// // // //                 Page {currentPage + 1} of {totalPages}
// // // //               </span>
// // // //               <button
// // // //                 onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
// // // //                 disabled={currentPage >= totalPages - 1}
// // // //                 className="px-4 py-2 text-sm tracking-widest uppercase transition-all disabled:opacity-30"
// // // //                 style={{ border: "1px solid rgba(26,26,46,0.2)", color: "#1A1A2E" }}
// // // //               >
// // // //                 Next
// // // //               </button>
// // // //             </div>
// // // //           )}
// // // //         </>
// // // //       )}

// // // //       {/* Modal */}
// // // //       <AnimatePresence>
// // // //         {modalOpen && (
// // // //           <motion.div
// // // //             initial={{ opacity: 0 }}
// // // //             animate={{ opacity: 1 }}
// // // //             exit={{ opacity: 0 }}
// // // //             className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
// // // //             style={{ background: "rgba(26,26,46,0.8)" }}
// // // //             onClick={closeModal}
// // // //           >
// // // //             <motion.div
// // // //               initial={{ scale: 0.9, opacity: 0 }}
// // // //               animate={{ scale: 1, opacity: 1 }}
// // // //               exit={{ scale: 0.9, opacity: 0 }}
// // // //               className="w-full max-w-2xl p-6 my-8"
// // // //               style={{ background: "#FFFFF0", border: "1px solid rgba(26,26,46,0.1)" }}
// // // //               onClick={(e) => e.stopPropagation()}
// // // //             >
// // // //               <h2 className="text-2xl font-bold mb-6" style={{ color: "#1A1A2E" }}>
// // // //                 {editingProduct ? "Edit Product" : "New Product"}
// // // //               </h2>
// // // //               <form onSubmit={handleSubmit} className="space-y-4">
// // // //                 <div className="grid md:grid-cols-2 gap-4">
// // // //                   <div>
// // // //                     <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Product Name</label>
// // // //                     <input
// // // //                       type="text"
// // // //                       value={form.name}
// // // //                       onChange={(e) => setForm({ ...form, name: e.target.value })}
// // // //                       required
// // // //                       className="w-full px-4 py-3 text-base outline-none"
// // // //                       style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// // // //                     />
// // // //                   </div>
// // // //                   <div>
// // // //                     <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Category</label>
// // // //                     <select
// // // //                       value={form.categoryId}
// // // //                       onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
// // // //                       required
// // // //                       className="w-full px-4 py-3 text-base outline-none"
// // // //                       style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// // // //                     >
// // // //                       <option value="">Select category</option>
// // // //                       {categories.map(cat => (
// // // //                         <option key={cat.id} value={cat.id}>{cat.name}</option>
// // // //                       ))}
// // // //                     </select>
// // // //                   </div>
// // // //                 </div>

// // // //                 <div>
// // // //                   <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Description</label>
// // // //                   <textarea
// // // //                     value={form.description}
// // // //                     onChange={(e) => setForm({ ...form, description: e.target.value })}
// // // //                     rows="3"
// // // //                     className="w-full px-4 py-3 text-base outline-none"
// // // //                     style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// // // //                   />
// // // //                 </div>

// // // //                 <div className="grid md:grid-cols-3 gap-4">
// // // //                   <div>
// // // //                     <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Price (₹)</label>
// // // //                     <input
// // // //                       type="number"
// // // //                       step="0.01"
// // // //                       value={form.price}
// // // //                       onChange={(e) => setForm({ ...form, price: e.target.value })}
// // // //                       required
// // // //                       className="w-full px-4 py-3 text-base outline-none"
// // // //                       style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// // // //                     />
// // // //                   </div>
// // // //                   <div>
// // // //                     <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Original Price (₹)</label>
// // // //                     <input
// // // //                       type="number"
// // // //                       step="0.01"
// // // //                       value={form.originalPrice}
// // // //                       onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
// // // //                       className="w-full px-4 py-3 text-base outline-none"
// // // //                       style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// // // //                     />
// // // //                   </div>
// // // //                   <div>
// // // //                     <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Stock Quantity</label>
// // // //                     <input
// // // //                       type="number"
// // // //                       value={form.stockQuantity}
// // // //                       onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })}
// // // //                       required
// // // //                       className="w-full px-4 py-3 text-base outline-none"
// // // //                       style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// // // //                     />
// // // //                   </div>
// // // //                 </div>

// // // //                 <div className="flex gap-6">
// // // //                   <div className="flex items-center gap-3">
// // // //                     <input
// // // //                       type="checkbox"
// // // //                       id="isFeatured"
// // // //                       checked={form.isFeatured}
// // // //                       onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
// // // //                       className="w-4 h-4"
// // // //                     />
// // // //                     <label htmlFor="isFeatured" className="text-sm" style={{ color: "#36454F" }}>Featured Product</label>
// // // //                   </div>
// // // //                   <div className="flex items-center gap-3">
// // // //                     <input
// // // //                       type="checkbox"
// // // //                       id="isActive"
// // // //                       checked={form.isActive}
// // // //                       onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
// // // //                       className="w-4 h-4"
// // // //                     />
// // // //                     <label htmlFor="isActive" className="text-sm" style={{ color: "#36454F" }}>Active (visible on site)</label>
// // // //                   </div>
// // // //                 </div>

// // // //                 <div className="flex gap-3 pt-4">
// // // //                   <button
// // // //                     type="button"
// // // //                     onClick={closeModal}
// // // //                     className="flex-1 px-4 py-3 text-sm tracking-widest uppercase"
// // // //                     style={{ border: "1px solid rgba(26,26,46,0.2)", color: "#1A1A2E" }}
// // // //                   >
// // // //                     Cancel
// // // //                   </button>
// // // //                   <button
// // // //                     type="submit"
// // // //                     disabled={loading}
// // // //                     className="flex-1 px-4 py-3 text-sm tracking-widest uppercase"
// // // //                     style={{ background: "#800000", color: "#FFFFF0" }}
// // // //                   >
// // // //                     {loading ? "Saving..." : editingProduct ? "Update" : "Create"}
// // // //                   </button>
// // // //                 </div>
// // // //               </form>
// // // //             </motion.div>
// // // //           </motion.div>
// // // //         )}
// // // //       </AnimatePresence>
// // // //     </div>
// // // //   );
// // // // }




// // // // import { useState, useEffect } from "react";
// // // // import { motion, AnimatePresence } from "framer-motion";
// // // // import { adminAPI } from "../../api";

// // // // const D = {
// // // //   bg: "#0C0C16", card: "#14142A", border: "rgba(212,175,55,0.12)",
// // // //   text: "#FFFFF0", muted: "rgba(255,255,240,0.45)", dim: "rgba(255,255,240,0.25)",
// // // //   gold: "#D4AF37", red: "#800000", danger: "#E74C3C", green: "#2ECC71",
// // // // };

// // // // const inputStyle = {
// // // //   width: "100%", padding: "11px 13px", background: "#0C0C16",
// // // //   border: "1px solid rgba(212,175,55,0.18)", borderRadius: 8,
// // // //   color: D.text, fontSize: 15, outline: "none", fontFamily: "inherit",
// // // // };

// // // // export default function AdminProducts() {
// // // //   const [products, setProducts] = useState([]);
// // // //   const [categories, setCategories] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [modalOpen, setModalOpen] = useState(false);
// // // //   const [editingProduct, setEditingProduct] = useState(null);
// // // //   const [saving, setSaving] = useState(false);
// // // //   const [form, setForm] = useState({ name: "", description: "", price: "", originalPrice: "", discountPercent: 0, stockQuantity: 0, categoryId: "", isFeatured: false, isActive: true });
// // // //   const [uploadingImage, setUploadingImage] = useState(null);
// // // //   const [currentPage, setCurrentPage] = useState(0);
// // // //   const [totalPages, setTotalPages] = useState(0);
// // // //   const [searchQuery, setSearchQuery] = useState("");

// // // //   useEffect(() => { fetchProducts(); fetchCategories(); }, [currentPage, searchQuery]);

// // // //   const fetchProducts = async () => {
// // // //     try {
// // // //       const data = await adminAPI.getAllProducts(currentPage, 20, searchQuery);
// // // //       setProducts(data.content || []); setTotalPages(data.totalPages || 0);
// // // //     } catch (err) { console.error("Failed to fetch products", err); }
// // // //     finally { setLoading(false); }
// // // //   };

// // // //   const fetchCategories = async () => {
// // // //     try { setCategories(await adminAPI.getAllCategories()); }
// // // //     catch (err) { console.error("Failed to fetch categories", err); }
// // // //   };

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault(); setSaving(true);
// // // //     try {
// // // //       const payload = { ...form, price: parseFloat(form.price), originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null, discountPercent: parseInt(form.discountPercent) || 0, stockQuantity: parseInt(form.stockQuantity) || 0, categoryId: parseInt(form.categoryId) };
// // // //       if (editingProduct) await adminAPI.updateProduct(editingProduct.id, payload);
// // // //       else await adminAPI.createProduct(payload);
// // // //       fetchProducts(); closeModal();
// // // //     } catch (err) { alert(err.response?.data?.message || "Failed to save product"); }
// // // //     finally { setSaving(false); }
// // // //   };

// // // //   const handleImageUpload = async (productId, file) => {
// // // //     setUploadingImage(productId);
// // // //     try { await adminAPI.uploadProductImage(productId, file); fetchProducts(); }
// // // //     catch { alert("Image upload failed"); }
// // // //     finally { setUploadingImage(null); }
// // // //   };

// // // //   const handleDelete = async (id) => {
// // // //     if (!confirm("Delete this product?")) return;
// // // //     try { await adminAPI.deleteProduct(id); fetchProducts(); }
// // // //     catch { alert("Failed to delete product"); }
// // // //   };

// // // //   const toggleFeatured = async (id) => { try { await adminAPI.toggleFeatured(id); fetchProducts(); } catch { alert("Failed"); } };
// // // //   const toggleActive = async (id) => { try { await adminAPI.toggleActive(id); fetchProducts(); } catch { alert("Failed"); } };

// // // //   const openModal = (product = null) => {
// // // //     if (product) {
// // // //       setEditingProduct(product);
// // // //       setForm({ name: product.name, description: product.description || "", price: product.price.toString(), originalPrice: product.originalPrice?.toString() || "", discountPercent: product.discountPercent || 0, stockQuantity: product.stockQuantity || 0, categoryId: product.category?.id?.toString() || "", isFeatured: product.isFeatured || false, isActive: product.isActive !== false });
// // // //     } else {
// // // //       setEditingProduct(null);
// // // //       setForm({ name: "", description: "", price: "", originalPrice: "", discountPercent: 0, stockQuantity: 0, categoryId: "", isFeatured: false, isActive: true });
// // // //     }
// // // //     setModalOpen(true);
// // // //   };
// // // //   const closeModal = () => { setModalOpen(false); setEditingProduct(null); };

// // // //   return (
// // // //     <div style={{ fontFamily: "'Cormorant Garamond', serif", color: D.text }}>

// // // //       {/* Header */}
// // // //       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, gap: 16, flexWrap: "wrap" }}>
// // // //         <div>
// // // //           <h1 style={{ fontSize: 30, fontWeight: 700, color: D.text, marginBottom: 6 }}>Products</h1>
// // // //           <p style={{ fontSize: 15, color: D.muted }}>Manage your product catalog</p>
// // // //         </div>
// // // //         <div style={{ display: "flex", gap: 12 }}>
// // // //           <input type="text" placeholder="Search products..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
// // // //             style={{ padding: "11px 16px", background: D.card, border: `1px solid ${D.border}`, borderRadius: 8, color: D.text, fontSize: 15, outline: "none", minWidth: 220 }} />
// // // //           <button onClick={() => openModal()} style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 22px", background: D.red, color: D.text, border: "none", cursor: "pointer", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 6, whiteSpace: "nowrap" }}>
// // // //             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
// // // //             Add Product
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       {/* Grid */}
// // // //       {loading ? (
// // // //         <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
// // // //           {[...Array(8)].map((_, i) => <div key={i} style={{ height: 380, background: D.card, borderRadius: 14, opacity: 0.5 }} />)}
// // // //         </div>
// // // //       ) : products.length === 0 ? (
// // // //         <div style={{ textAlign: "center", padding: "80px 20px", border: "1px dashed rgba(212,175,55,0.2)", borderRadius: 14 }}>
// // // //           <div style={{ width: 64, height: 64, margin: "0 auto 20px", background: D.gold, opacity: 0.15, clipPath: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)" }} />
// // // //           <p style={{ fontSize: 20, color: D.muted, marginBottom: 8 }}>No products yet</p>
// // // //           <p style={{ fontSize: 15, color: D.dim, marginBottom: 24 }}>Create your first product to get started</p>
// // // //           <button onClick={() => openModal()} style={{ padding: "12px 24px", background: D.red, color: D.text, border: "none", cursor: "pointer", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 6 }}>Add Product</button>
// // // //         </div>
// // // //       ) : (
// // // //         <>
// // // //           <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
// // // //             {products.map((product, i) => (
// // // //               <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
// // // //                 className="prod-card"
// // // //                 style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 14, overflow: "hidden", position: "relative" }}>

// // // //                 {/* Image */}
// // // //                 <div className="prod-img-wrap" style={{ position: "relative", height: 220, background: "#0C0C16", overflow: "hidden" }}>
// // // //                   {product.imageUrl
// // // //                     ? <img src={product.imageUrl} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
// // // //                     : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
// // // //                         <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,55,0.15)" strokeWidth="1.2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
// // // //                       </div>
// // // //                   }
// // // //                   <label className="prod-overlay" style={{ position: "absolute", inset: 0, background: "rgba(12,12,22,0.85)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: 0, transition: "opacity 0.2s" }}>
// // // //                     <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => handleImageUpload(product.id, e.target.files[0])} disabled={uploadingImage === product.id} />
// // // //                     {uploadingImage === product.id
// // // //                       ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ width: 30, height: 30, border: `2px solid ${D.gold}`, borderTopColor: "transparent", borderRadius: "50%" }} />
// // // //                       : <div style={{ textAlign: "center" }}>
// // // //                           <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={D.gold} strokeWidth="1.5" style={{ display: "block", margin: "0 auto 6px" }}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
// // // //                           <span style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: D.gold }}>Upload</span>
// // // //                         </div>
// // // //                     }
// // // //                   </label>
// // // //                   {/* Badges */}
// // // //                   <div style={{ position: "absolute", top: 10, left: 10, display: "flex", flexDirection: "column", gap: 4 }}>
// // // //                     {product.isFeatured && <span style={{ padding: "3px 9px", background: "rgba(212,175,55,0.92)", color: "#1A1A2E", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 4, fontWeight: 700 }}>Featured</span>}
// // // //                     {!product.isActive && <span style={{ padding: "3px 9px", background: "rgba(231,76,60,0.92)", color: "#fff", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 4 }}>Inactive</span>}
// // // //                     {product.stockQuantity === 0 && <span style={{ padding: "3px 9px", background: "rgba(0,0,0,0.85)", color: "#fff", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 4 }}>Out of Stock</span>}
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Info */}
// // // //                 <div style={{ padding: "14px 16px" }}>
// // // //                   <p style={{ fontSize: 11, color: D.gold, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 5 }}>{product.category?.name || "Uncategorized"}</p>
// // // //                   <h3 style={{ fontSize: 16, fontWeight: 700, color: D.text, marginBottom: 8, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{product.name}</h3>
// // // //                   <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
// // // //                     <span style={{ fontSize: 18, fontWeight: 700, color: D.text }}>₹{product.price?.toLocaleString("en-IN")}</span>
// // // //                     {product.originalPrice && product.originalPrice > product.price && (
// // // //                       <span style={{ fontSize: 13, color: D.dim, textDecoration: "line-through" }}>₹{product.originalPrice?.toLocaleString("en-IN")}</span>
// // // //                     )}
// // // //                   </div>
// // // //                   <p style={{ fontSize: 13, color: D.muted, marginBottom: 12 }}>Stock: {product.stockQuantity}</p>

// // // //                   <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
// // // //                     <button onClick={() => openModal(product)} style={{ flex: 1, padding: "9px", background: "rgba(212,175,55,0.08)", border: `1px solid rgba(212,175,55,0.2)`, color: D.gold, cursor: "pointer", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 6 }}>Edit</button>
// // // //                     <button onClick={() => handleDelete(product.id)} style={{ padding: "9px 13px", background: "rgba(231,76,60,0.08)", border: `1px solid rgba(231,76,60,0.2)`, color: D.danger, cursor: "pointer", borderRadius: 6 }}>
// // // //                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
// // // //                     </button>
// // // //                   </div>
// // // //                   <div style={{ display: "flex", gap: 8 }}>
// // // //                     <button onClick={() => toggleFeatured(product.id)} style={{ flex: 1, padding: "8px 6px", background: product.isFeatured ? "rgba(212,175,55,0.14)" : "transparent", border: `1px solid rgba(212,175,55,0.25)`, color: D.gold, cursor: "pointer", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 6 }}>★ {product.isFeatured ? "Featured" : "Feature"}</button>
// // // //                     <button onClick={() => toggleActive(product.id)} style={{ flex: 1, padding: "8px 6px", background: product.isActive ? "rgba(46,204,113,0.08)" : "rgba(231,76,60,0.08)", border: `1px solid ${product.isActive ? "rgba(46,204,113,0.25)" : "rgba(231,76,60,0.25)"}`, color: product.isActive ? D.green : D.danger, cursor: "pointer", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 6 }}>
// // // //                       {product.isActive ? "Active" : "Inactive"}
// // // //                     </button>
// // // //                   </div>
// // // //                 </div>
// // // //               </motion.div>
// // // //             ))}
// // // //           </div>

// // // //           {/* Pagination */}
// // // //           {totalPages > 1 && (
// // // //             <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginTop: 32 }}>
// // // //               <button onClick={() => setCurrentPage(p => Math.max(0, p - 1))} disabled={currentPage === 0}
// // // //                 style={{ padding: "10px 20px", background: D.card, border: `1px solid ${D.border}`, color: currentPage === 0 ? D.dim : D.text, cursor: currentPage === 0 ? "not-allowed" : "pointer", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 6, opacity: currentPage === 0 ? 0.4 : 1 }}>Previous</button>
// // // //               <span style={{ fontSize: 15, color: D.muted }}>Page {currentPage + 1} of {totalPages}</span>
// // // //               <button onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))} disabled={currentPage >= totalPages - 1}
// // // //                 style={{ padding: "10px 20px", background: D.card, border: `1px solid ${D.border}`, color: currentPage >= totalPages - 1 ? D.dim : D.text, cursor: currentPage >= totalPages - 1 ? "not-allowed" : "pointer", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 6, opacity: currentPage >= totalPages - 1 ? 0.4 : 1 }}>Next</button>
// // // //             </div>
// // // //           )}
// // // //         </>
// // // //       )}

// // // //       {/* Modal */}
// // // //       <AnimatePresence>
// // // //         {modalOpen && (
// // // //           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
// // // //             style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, background: "rgba(12,12,22,0.9)", overflowY: "auto" }}
// // // //             onClick={closeModal}>
// // // //             <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
// // // //               style={{ width: "100%", maxWidth: 620, background: "#10101C", border: `1px solid ${D.border}`, borderRadius: 16, padding: "28px 28px", margin: "auto" }}
// // // //               onClick={e => e.stopPropagation()}>

// // // //               <h2 style={{ fontSize: 26, fontWeight: 700, color: D.text, marginBottom: 24 }}>
// // // //                 {editingProduct ? "Edit Product" : "New Product"}
// // // //               </h2>

// // // //               <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
// // // //                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
// // // //                   <div>
// // // //                     <label style={{ display: "block", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: D.muted, marginBottom: 8 }}>Product Name</label>
// // // //                     <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required style={inputStyle} placeholder="e.g. Kanjivaram Silk Saree" />
// // // //                   </div>
// // // //                   <div>
// // // //                     <label style={{ display: "block", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: D.muted, marginBottom: 8 }}>Category</label>
// // // //                     <select value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })} required style={{ ...inputStyle, cursor: "pointer" }}>
// // // //                       <option value="">Select category</option>
// // // //                       {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
// // // //                     </select>
// // // //                   </div>
// // // //                 </div>

// // // //                 <div>
// // // //                   <label style={{ display: "block", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: D.muted, marginBottom: 8 }}>Description</label>
// // // //                   <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} style={{ ...inputStyle, resize: "vertical" }} placeholder="Product details, fabric type, occasion..." />
// // // //                 </div>

// // // //                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
// // // //                   <div>
// // // //                     <label style={{ display: "block", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: D.muted, marginBottom: 8 }}>Price (₹)</label>
// // // //                     <input type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required style={inputStyle} placeholder="0.00" />
// // // //                   </div>
// // // //                   <div>
// // // //                     <label style={{ display: "block", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: D.muted, marginBottom: 8 }}>Original Price (₹)</label>
// // // //                     <input type="number" step="0.01" value={form.originalPrice} onChange={e => setForm({ ...form, originalPrice: e.target.value })} style={inputStyle} placeholder="Before discount" />
// // // //                   </div>
// // // //                   <div>
// // // //                     <label style={{ display: "block", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: D.muted, marginBottom: 8 }}>Stock Qty</label>
// // // //                     <input type="number" value={form.stockQuantity} onChange={e => setForm({ ...form, stockQuantity: e.target.value })} required style={inputStyle} placeholder="0" />
// // // //                   </div>
// // // //                 </div>

// // // //                 <div style={{ display: "flex", gap: 14 }}>
// // // //                   {[
// // // //                     { id: "isFeatured", label: "Featured Product", key: "isFeatured" },
// // // //                     { id: "isActive2", label: "Active (visible on site)", key: "isActive" },
// // // //                   ].map(({ id, label, key }) => (
// // // //                     <div key={id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.12)", borderRadius: 8, cursor: "pointer" }} onClick={() => setForm({ ...form, [key]: !form[key] })}>
// // // //                       <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${form[key] ? D.gold : "rgba(255,255,240,0.2)"}`, background: form[key] ? D.gold : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
// // // //                         {form[key] && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
// // // //                       </div>
// // // //                       <label style={{ fontSize: 14, color: D.muted, cursor: "pointer" }}>{label}</label>
// // // //                     </div>
// // // //                   ))}
// // // //                 </div>

// // // //                 <div style={{ display: "flex", gap: 12, paddingTop: 6 }}>
// // // //                   <button type="button" onClick={closeModal} style={{ flex: 1, padding: "13px", background: "transparent", border: "1px solid rgba(255,255,240,0.15)", color: D.muted, cursor: "pointer", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 8 }}>Cancel</button>
// // // //                   <button type="submit" disabled={saving} style={{ flex: 1, padding: "13px", background: D.red, color: D.text, border: "none", cursor: "pointer", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 8, opacity: saving ? 0.7 : 1 }}>
// // // //                     {saving ? "Saving..." : editingProduct ? "Update" : "Create"}
// // // //                   </button>
// // // //                 </div>
// // // //               </form>
// // // //             </motion.div>
// // // //           </motion.div>
// // // //         )}
// // // //       </AnimatePresence>

// // // //       <style>{`
// // // //         .prod-card:hover .prod-overlay { opacity: 1 !important; }
// // // //         input::placeholder, textarea::placeholder { color: rgba(255,255,240,0.2); }
// // // //         select option { background: #14142A; color: #FFFFF0; }
// // // //         input[type=number]::-webkit-inner-spin-button { opacity: 0.3; }
// // // //       `}</style>
// // // //     </div>
// // // //   );
// // // // }



// // // // import { useState, useEffect } from "react";
// // // // import { motion, AnimatePresence } from "framer-motion";
// // // // import { adminAPI } from "../../api";

// // // // export default function AdminProducts() {
// // // //   const [products, setProducts] = useState([]);
// // // //   const [categories, setCategories] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [modalOpen, setModalOpen] = useState(false);
// // // //   const [editingProduct, setEditingProduct] = useState(null);
// // // //   const [form, setForm] = useState({
// // // //     name: "",
// // // //     description: "",
// // // //     price: "",
// // // //     originalPrice: "",
// // // //     discountPercent: 0,
// // // //     stockQuantity: 0,
// // // //     categoryId: "",
// // // //     isFeatured: false,
// // // //     isActive: true,
// // // //     colour: "",
// // // //     size: "",
// // // //     gender: "",
// // // //     fabric: "",
// // // //     occasion: "",
// // // //   });
// // // //   const [uploadingImage, setUploadingImage] = useState(null);
// // // //   const [currentPage, setCurrentPage] = useState(0);
// // // //   const [totalPages, setTotalPages] = useState(0);
// // // //   const [searchQuery, setSearchQuery] = useState("");

// // // //   useEffect(() => {
// // // //     fetchProducts();
// // // //     fetchCategories();
// // // //   }, [currentPage, searchQuery]);

// // // //   const fetchProducts = async () => {
// // // //     try {
// // // //       const data = await adminAPI.getAllProducts(currentPage, 20, searchQuery);
// // // //       setProducts(data.content || []);
// // // //       setTotalPages(data.totalPages || 0);
// // // //     } catch (err) {
// // // //       console.error("Failed to fetch products", err);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const fetchCategories = async () => {
// // // //     try {
// // // //       const data = await adminAPI.getAllCategories();
// // // //       setCategories(data);
// // // //     } catch (err) {
// // // //       console.error("Failed to fetch categories", err);
// // // //     }
// // // //   };

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     setLoading(true);
// // // //     try {
// // // //       const payload = {
// // // //         ...form,
// // // //         price: parseFloat(form.price),
// // // //         originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
// // // //         discountPercent: parseInt(form.discountPercent) || 0,
// // // //         stockQuantity: parseInt(form.stockQuantity) || 0,
// // // //         categoryId: parseInt(form.categoryId),
// // // //       };

// // // //       if (editingProduct) {
// // // //         await adminAPI.updateProduct(editingProduct.id, payload);
// // // //       } else {
// // // //         await adminAPI.createProduct(payload);
// // // //       }
// // // //       fetchProducts();
// // // //       closeModal();
// // // //     } catch (err) {
// // // //       alert(err.response?.data?.message || "Failed to save product");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleImageUpload = async (productId, file) => {
// // // //     setUploadingImage(productId);
// // // //     try {
// // // //       await adminAPI.uploadProductImage(productId, file);
// // // //       fetchProducts();
// // // //     } catch (err) {
// // // //       alert("Image upload failed");
// // // //     } finally {
// // // //       setUploadingImage(null);
// // // //     }
// // // //   };

// // // //   const handleDelete = async (id) => {
// // // //     if (!confirm("Delete this product?")) return;
// // // //     try {
// // // //       await adminAPI.deleteProduct(id);
// // // //       fetchProducts();
// // // //     } catch (err) {
// // // //       alert("Failed to delete product");
// // // //     }
// // // //   };

// // // //   const toggleFeatured = async (id) => {
// // // //     try {
// // // //       await adminAPI.toggleFeatured(id);
// // // //       fetchProducts();
// // // //     } catch (err) {
// // // //       alert("Failed to toggle featured status");
// // // //     }
// // // //   };

// // // //   const toggleActive = async (id) => {
// // // //     try {
// // // //       await adminAPI.toggleActive(id);
// // // //       fetchProducts();
// // // //     } catch (err) {
// // // //       alert("Failed to toggle active status");
// // // //     }
// // // //   };

// // // //   const openModal = (product = null) => {
// // // //     if (product) {
// // // //       setEditingProduct(product);
// // // //       setForm({
// // // //         name: product.name,
// // // //         description: product.description || "",
// // // //         price: product.price.toString(),
// // // //         originalPrice: product.originalPrice?.toString() || "",
// // // //         discountPercent: product.discountPercent || 0,
// // // //         stockQuantity: product.stockQuantity || 0,
// // // //         categoryId: product.category?.id?.toString() || "",
// // // //         isFeatured: product.isFeatured || false,
// // // //         isActive: product.isActive !== false,
// // // //       });
// // // //     } else {
// // // //       setEditingProduct(null);
// // // //       setForm({
// // // //         name: "",
// // // //         description: "",
// // // //         price: "",
// // // //         originalPrice: "",
// // // //         discountPercent: 0,
// // // //         stockQuantity: 0,
// // // //         categoryId: "",
// // // //         isFeatured: false,
// // // //         isActive: true,
// // // //       });
// // // //     }
// // // //     setModalOpen(true);
// // // //   };

// // // //   const closeModal = () => {
// // // //     setModalOpen(false);
// // // //     setEditingProduct(null);
// // // //   };

// // // //   return (
// // // //     <div style={{ fontFamily: "'Cormorant Garamond', serif" }}>
// // // //       {/* Header */}
// // // //       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
// // // //         <div>
// // // //           <h1 className="text-3xl font-bold mb-1" style={{ color: "#1A1A2E" }}>Products</h1>
// // // //           <p className="text-sm" style={{ color: "#36454F" }}>Manage your product catalog</p>
// // // //         </div>
// // // //         <div className="flex gap-3">
// // // //           <input
// // // //             type="text"
// // // //             placeholder="Search products..."
// // // //             value={searchQuery}
// // // //             onChange={(e) => setSearchQuery(e.target.value)}
// // // //             className="px-4 py-2 text-sm outline-none"
// // // //             style={{ border: "1px solid rgba(26,26,46,0.2)", minWidth: "200px" }}
// // // //           />
// // // //           <button
// // // //             onClick={() => openModal()}
// // // //             className="flex items-center gap-2 px-6 py-3 text-sm tracking-widest uppercase font-semibold transition-all whitespace-nowrap"
// // // //             style={{ background: "#800000", color: "#FFFFF0" }}
// // // //             onMouseEnter={e => e.currentTarget.style.background = "#900000"}
// // // //             onMouseLeave={e => e.currentTarget.style.background = "#800000"}
// // // //           >
// // // //             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // // //               <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
// // // //             </svg>
// // // //             Add Product
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       {/* Products Grid */}
// // // //       {loading ? (
// // // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // // //           {[...Array(8)].map((_, i) => (
// // // //             <div key={i} className="h-96 animate-pulse" style={{ background: "rgba(26,26,46,0.04)" }} />
// // // //           ))}
// // // //         </div>
// // // //       ) : products.length === 0 ? (
// // // //         <div className="text-center py-20" style={{ border: "1px dashed rgba(26,26,46,0.15)" }}>
// // // //           <div className="w-16 h-16 mx-auto mb-4 opacity-20"
// // // //             style={{ background: "#D4AF37", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
// // // //           <p className="text-lg mb-2" style={{ color: "#36454F" }}>No products yet</p>
// // // //           <p className="text-sm mb-6" style={{ color: "rgba(54,69,79,0.6)" }}>Create your first product to get started</p>
// // // //           <button
// // // //             onClick={() => openModal()}
// // // //             className="px-6 py-3 text-sm tracking-widest uppercase"
// // // //             style={{ background: "#800000", color: "#FFFFF0" }}
// // // //           >
// // // //             Add Product
// // // //           </button>
// // // //         </div>
// // // //       ) : (
// // // //         <>
// // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // // //             {products.map((product, i) => (
// // // //               <motion.div
// // // //                 key={product.id}
// // // //                 initial={{ opacity: 0, y: 20 }}
// // // //                 animate={{ opacity: 1, y: 0 }}
// // // //                 transition={{ delay: i * 0.05 }}
// // // //                 className="group relative overflow-hidden"
// // // //                 style={{ border: "1px solid rgba(26,26,46,0.08)", background: "white" }}
// // // //               >
// // // //                 {/* Image */}
// // // //                 <div className="relative h-64 overflow-hidden" style={{ background: "rgba(26,26,46,0.04)" }}>
// // // //                   {product.imageUrl ? (
// // // //                     <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
// // // //                   ) : (
// // // //                     <div className="w-full h-full flex items-center justify-center">
// // // //                       <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(26,26,46,0.2)" strokeWidth="1.5">
// // // //                         <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
// // // //                       </svg>
// // // //                     </div>
// // // //                   )}
// // // //                   {/* Upload overlay */}
// // // //                   <label className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
// // // //                     style={{ background: "rgba(26,26,46,0.8)" }}>
// // // //                     <input
// // // //                       type="file"
// // // //                       accept="image/*"
// // // //                       className="hidden"
// // // //                       onChange={(e) => handleImageUpload(product.id, e.target.files[0])}
// // // //                       disabled={uploadingImage === product.id}
// // // //                     />
// // // //                     {uploadingImage === product.id ? (
// // // //                       <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
// // // //                         className="w-8 h-8 border-2 rounded-full" style={{ borderColor: "#D4AF37", borderTopColor: "transparent" }} />
// // // //                     ) : (
// // // //                       <div className="text-center">
// // // //                         <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" className="mx-auto mb-2">
// // // //                           <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
// // // //                         </svg>
// // // //                         <span className="text-xs tracking-widest uppercase" style={{ color: "#D4AF37" }}>Upload Image</span>
// // // //                       </div>
// // // //                     )}
// // // //                   </label>
// // // //                   {/* Badges */}
// // // //                   <div className="absolute top-3 left-3 flex flex-col gap-1">
// // // //                     {product.isFeatured && (
// // // //                       <div className="px-2 py-1 text-xs tracking-widest uppercase"
// // // //                         style={{ background: "rgba(212,175,55,0.9)", color: "#1A1A2E" }}>Featured</div>
// // // //                     )}
// // // //                     {!product.isActive && (
// // // //                       <div className="px-2 py-1 text-xs tracking-widest uppercase"
// // // //                         style={{ background: "rgba(128,0,0,0.9)", color: "#FFFFF0" }}>Inactive</div>
// // // //                     )}
// // // //                     {product.stockQuantity === 0 && (
// // // //                       <div className="px-2 py-1 text-xs tracking-widest uppercase"
// // // //                         style={{ background: "rgba(0,0,0,0.9)", color: "#FFFFF0" }}>Out of Stock</div>
// // // //                     )}
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Info */}
// // // //                 <div className="p-4">
// // // //                   <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#D4AF37" }}>
// // // //                     {product.category?.name || "Uncategorized"}
// // // //                   </p>
// // // //                   <h3 className="text-base font-bold mb-1 line-clamp-1" style={{ color: "#1A1A2E" }}>{product.name}</h3>
// // // //                   <div className="flex items-center gap-2 mb-3">
// // // //                     <span className="text-lg font-bold" style={{ color: "#1A1A2E" }}>₹{product.price?.toLocaleString("en-IN")}</span>
// // // //                     {product.originalPrice && product.originalPrice > product.price && (
// // // //                       <span className="text-sm line-through" style={{ color: "rgba(54,69,79,0.4)" }}>
// // // //                         ₹{product.originalPrice?.toLocaleString("en-IN")}
// // // //                       </span>
// // // //                     )}
// // // //                   </div>
// // // //                   <p className="text-xs mb-3" style={{ color: "#36454F" }}>Stock: {product.stockQuantity}</p>
                  
// // // //                   {/* Actions */}
// // // //                   <div className="flex gap-2 mb-2">
// // // //                     <button
// // // //                       onClick={() => openModal(product)}
// // // //                       className="flex-1 px-3 py-2 text-xs tracking-widest uppercase transition-all"
// // // //                       style={{ border: "1px solid rgba(26,26,46,0.2)", color: "#1A1A2E" }}
// // // //                     >
// // // //                       Edit
// // // //                     </button>
// // // //                     <button
// // // //                       onClick={() => handleDelete(product.id)}
// // // //                       className="px-3 py-2 text-xs tracking-widest uppercase transition-all"
// // // //                       style={{ border: "1px solid rgba(128,0,0,0.2)", color: "#800000" }}
// // // //                     >
// // // //                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // // //                         <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
// // // //                       </svg>
// // // //                     </button>
// // // //                   </div>
// // // //                   <div className="flex gap-2">
// // // //                     <button
// // // //                       onClick={() => toggleFeatured(product.id)}
// // // //                       className="flex-1 px-3 py-1.5 text-xs tracking-widest uppercase transition-all"
// // // //                       style={{ 
// // // //                         background: product.isFeatured ? "rgba(212,175,55,0.1)" : "transparent",
// // // //                         border: "1px solid rgba(212,175,55,0.3)", 
// // // //                         color: "#D4AF37" 
// // // //                       }}
// // // //                     >
// // // //                       ★ Featured
// // // //                     </button>
// // // //                     <button
// // // //                       onClick={() => toggleActive(product.id)}
// // // //                       className="flex-1 px-3 py-1.5 text-xs tracking-widest uppercase transition-all"
// // // //                       style={{ 
// // // //                         background: product.isActive ? "rgba(26,26,46,0.05)" : "rgba(128,0,0,0.05)",
// // // //                         border: `1px solid ${product.isActive ? "rgba(26,26,46,0.2)" : "rgba(128,0,0,0.2)"}`, 
// // // //                         color: product.isActive ? "#1A1A2E" : "#800000"
// // // //                       }}
// // // //                     >
// // // //                       {product.isActive ? "Active" : "Inactive"}
// // // //                     </button>
// // // //                   </div>
// // // //                 </div>
// // // //               </motion.div>
// // // //             ))}
// // // //           </div>

// // // //           {/* Pagination */}
// // // //           {totalPages > 1 && (
// // // //             <div className="flex justify-center gap-2 mt-8">
// // // //               <button
// // // //                 onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
// // // //                 disabled={currentPage === 0}
// // // //                 className="px-4 py-2 text-sm tracking-widest uppercase transition-all disabled:opacity-30"
// // // //                 style={{ border: "1px solid rgba(26,26,46,0.2)", color: "#1A1A2E" }}
// // // //               >
// // // //                 Previous
// // // //               </button>
// // // //               <span className="px-4 py-2 text-sm" style={{ color: "#36454F" }}>
// // // //                 Page {currentPage + 1} of {totalPages}
// // // //               </span>
// // // //               <button
// // // //                 onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
// // // //                 disabled={currentPage >= totalPages - 1}
// // // //                 className="px-4 py-2 text-sm tracking-widest uppercase transition-all disabled:opacity-30"
// // // //                 style={{ border: "1px solid rgba(26,26,46,0.2)", color: "#1A1A2E" }}
// // // //               >
// // // //                 Next
// // // //               </button>
// // // //             </div>
// // // //           )}
// // // //         </>
// // // //       )}

// // // //       {/* Modal */}
// // // //       <AnimatePresence>
// // // //         {modalOpen && (
// // // //           <motion.div
// // // //             initial={{ opacity: 0 }}
// // // //             animate={{ opacity: 1 }}
// // // //             exit={{ opacity: 0 }}
// // // //             className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
// // // //             style={{ background: "rgba(26,26,46,0.8)" }}
// // // //             onClick={closeModal}
// // // //           >
// // // //             <motion.div
// // // //               initial={{ scale: 0.9, opacity: 0 }}
// // // //               animate={{ scale: 1, opacity: 1 }}
// // // //               exit={{ scale: 0.9, opacity: 0 }}
// // // //               className="w-full max-w-2xl p-6 my-8"
// // // //               style={{ background: "#FFFFF0", border: "1px solid rgba(26,26,46,0.1)" }}
// // // //               onClick={(e) => e.stopPropagation()}
// // // //             >
// // // //               <h2 className="text-2xl font-bold mb-6" style={{ color: "#1A1A2E" }}>
// // // //                 {editingProduct ? "Edit Product" : "New Product"}
// // // //               </h2>
// // // //               <form onSubmit={handleSubmit} className="space-y-4">
// // // //                 <div className="grid md:grid-cols-2 gap-4">
// // // //                   <div>
// // // //                     <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Product Name</label>
// // // //                     <input
// // // //                       type="text"
// // // //                       value={form.name}
// // // //                       onChange={(e) => setForm({ ...form, name: e.target.value })}
// // // //                       required
// // // //                       className="w-full px-4 py-3 text-base outline-none"
// // // //                       style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// // // //                     />
// // // //                   </div>
// // // //                   <div>
// // // //                     <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Category</label>
// // // //                     <select
// // // //                       value={form.categoryId}
// // // //                       onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
// // // //                       required
// // // //                       className="w-full px-4 py-3 text-base outline-none"
// // // //                       style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// // // //                     >
// // // //                       <option value="">Select category</option>
// // // //                       {categories.map(cat => (
// // // //                         <option key={cat.id} value={cat.id}>{cat.name}</option>
// // // //                       ))}
// // // //                     </select>
// // // //                   </div>
// // // //                 </div>

// // // //                 <div>
// // // //                   <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Description</label>
// // // //                   <textarea
// // // //                     value={form.description}
// // // //                     onChange={(e) => setForm({ ...form, description: e.target.value })}
// // // //                     rows="3"
// // // //                     className="w-full px-4 py-3 text-base outline-none"
// // // //                     style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// // // //                   />
// // // //                 </div>

// // // //                 <div className="grid md:grid-cols-3 gap-4">
// // // //                   <div>
// // // //                     <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Price (₹)</label>
// // // //                     <input
// // // //                       type="number"
// // // //                       step="0.01"
// // // //                       value={form.price}
// // // //                       onChange={(e) => setForm({ ...form, price: e.target.value })}
// // // //                       required
// // // //                       className="w-full px-4 py-3 text-base outline-none"
// // // //                       style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// // // //                     />
// // // //                   </div>
// // // //                   <div>
// // // //                     <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Original Price (₹)</label>
// // // //                     <input
// // // //                       type="number"
// // // //                       step="0.01"
// // // //                       value={form.originalPrice}
// // // //                       onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
// // // //                       className="w-full px-4 py-3 text-base outline-none"
// // // //                       style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// // // //                     />
// // // //                   </div>
// // // //                   <div>
// // // //                     <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Stock Quantity</label>
// // // //                     <input
// // // //                       type="number"
// // // //                       value={form.stockQuantity}
// // // //                       onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })}
// // // //                       required
// // // //                       className="w-full px-4 py-3 text-base outline-none"
// // // //                       style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// // // //                     />
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* ── Product Attributes ── */}
// // // //                 <div style={{ borderTop: "1px solid rgba(26,26,46,0.08)", paddingTop: 16 }}>
// // // //                   <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#800000", marginBottom: 14 }}>
// // // //                     Product Attributes <span style={{ fontSize: 10, color: "#888", fontWeight: 400 }}>(used for filters)</span>
// // // //                   </p>
// // // //                   <div className="grid md:grid-cols-3 gap-4">
// // // //                     <div>
// // // //                       <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Colour</label>
// // // //                       <select value={form.colour} onChange={(e) => setForm({ ...form, colour: e.target.value })}
// // // //                         className="w-full px-4 py-3 text-base outline-none" style={{ border: "1px solid rgba(26,26,46,0.2)" }}>
// // // //                         <option value="">Select colour</option>
// // // //                         {["Black","White","Red","Navy Blue","Blue","Green","Pink","Yellow","Orange","Purple","Brown","Grey","Maroon","Gold","Cream","Multi-colour"].map(c => (
// // // //                           <option key={c} value={c}>{c}</option>
// // // //                         ))}
// // // //                       </select>
// // // //                     </div>
// // // //                     <div>
// // // //                       <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Gender</label>
// // // //                       <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}
// // // //                         className="w-full px-4 py-3 text-base outline-none" style={{ border: "1px solid rgba(26,26,46,0.2)" }}>
// // // //                         <option value="">Select gender</option>
// // // //                         <option value="Women">Women</option>
// // // //                         <option value="Men">Men</option>
// // // //                         <option value="Kids">Kids</option>
// // // //                         <option value="Unisex">Unisex</option>
// // // //                       </select>
// // // //                     </div>
// // // //                     <div>
// // // //                       <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Size</label>
// // // //                       <select value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })}
// // // //                         className="w-full px-4 py-3 text-base outline-none" style={{ border: "1px solid rgba(26,26,46,0.2)" }}>
// // // //                         <option value="">Select size</option>
// // // //                         {["Free Size","XS","S","M","L","XL","XXL","XS-XL","S-XL"].map(s => (
// // // //                           <option key={s} value={s}>{s}</option>
// // // //                         ))}
// // // //                       </select>
// // // //                     </div>
// // // //                     <div>
// // // //                       <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Fabric / Material</label>
// // // //                       <select value={form.fabric} onChange={(e) => setForm({ ...form, fabric: e.target.value })}
// // // //                         className="w-full px-4 py-3 text-base outline-none" style={{ border: "1px solid rgba(26,26,46,0.2)" }}>
// // // //                         <option value="">Select fabric</option>
// // // //                         {["Pure Silk","Kanjivaram Silk","Banarasi Silk","Tussar Silk","Chanderi","Cotton","Cotton Silk","Georgette","Chiffon","Linen","Polyester","Crepe"].map(f => (
// // // //                           <option key={f} value={f}>{f}</option>
// // // //                         ))}
// // // //                       </select>
// // // //                     </div>
// // // //                     <div>
// // // //                       <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Occasion</label>
// // // //                       <select value={form.occasion} onChange={(e) => setForm({ ...form, occasion: e.target.value })}
// // // //                         className="w-full px-4 py-3 text-base outline-none" style={{ border: "1px solid rgba(26,26,46,0.2)" }}>
// // // //                         <option value="">Select occasion</option>
// // // //                         {["Wedding","Festival","Casual","Party","Office","Daily Wear","Traditional","Formal"].map(o => (
// // // //                           <option key={o} value={o}>{o}</option>
// // // //                         ))}
// // // //                       </select>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>

// // // //                 <div className="flex gap-6">
// // // //                   <div className="flex items-center gap-3">
// // // //                     <input
// // // //                       type="checkbox"
// // // //                       id="isFeatured"
// // // //                       checked={form.isFeatured}
// // // //                       onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
// // // //                       className="w-4 h-4"
// // // //                     />
// // // //                     <label htmlFor="isFeatured" className="text-sm" style={{ color: "#36454F" }}>Featured Product</label>
// // // //                   </div>
// // // //                   <div className="flex items-center gap-3">
// // // //                     <input
// // // //                       type="checkbox"
// // // //                       id="isActive"
// // // //                       checked={form.isActive}
// // // //                       onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
// // // //                       className="w-4 h-4"
// // // //                     />
// // // //                     <label htmlFor="isActive" className="text-sm" style={{ color: "#36454F" }}>Active (visible on site)</label>
// // // //                   </div>
// // // //                 </div>

// // // //                 <div className="flex gap-3 pt-4">
// // // //                   <button
// // // //                     type="button"
// // // //                     onClick={closeModal}
// // // //                     className="flex-1 px-4 py-3 text-sm tracking-widest uppercase"
// // // //                     style={{ border: "1px solid rgba(26,26,46,0.2)", color: "#1A1A2E" }}
// // // //                   >
// // // //                     Cancel
// // // //                   </button>
// // // //                   <button
// // // //                     type="submit"
// // // //                     disabled={loading}
// // // //                     className="flex-1 px-4 py-3 text-sm tracking-widest uppercase"
// // // //                     style={{ background: "#800000", color: "#FFFFF0" }}
// // // //                   >
// // // //                     {loading ? "Saving..." : editingProduct ? "Update" : "Create"}
// // // //                   </button>
// // // //                 </div>
// // // //               </form>
// // // //             </motion.div>
// // // //           </motion.div>
// // // //         )}
// // // //       </AnimatePresence>
// // // //     </div>
// // // //   );
// // // // }



// // // // import { useState, useEffect } from "react";
// // // // import { motion, AnimatePresence } from "framer-motion";
// // // // import { adminAPI } from "../../api";

// // // // const T = {
// // // //   bg: "#080810", surface: "#0f0f1a", card: "#13131f",
// // // //   border: "rgba(255,255,255,0.06)", borderHi: "rgba(212,175,55,0.22)",
// // // //   gold: "#D4AF37", maroon: "#800000",
// // // //   text: "#F0EEE8", muted: "rgba(240,238,232,0.45)", dim: "rgba(240,238,232,0.22)",
// // // //   danger: "#f87171", dangerBg: "rgba(248,113,113,0.08)", dangerBorder: "rgba(248,113,113,0.2)",
// // // //   green: "#34D399", greenBg: "rgba(52,211,153,0.08)", greenBorder: "rgba(52,211,153,0.2)",
// // // // };
// // // // const SERIF = "'Cormorant Garamond', Georgia, serif";
// // // // const SANS  = "'DM Sans', 'Segoe UI', system-ui, sans-serif";

// // // // const iStyle = {
// // // //   width: "100%", padding: "11px 14px", background: "#0a0a14",
// // // //   border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8,
// // // //   color: T.text, fontSize: 14, outline: "none", fontFamily: SANS, transition: "border-color 0.15s",
// // // // };
// // // // const labelStyle = {
// // // //   display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em",
// // // //   textTransform: "uppercase", color: T.muted, marginBottom: 7,
// // // // };
// // // // const onFocus  = e => e.target.style.borderColor = "rgba(212,175,55,0.35)";
// // // // const onBlur   = e => e.target.style.borderColor = "rgba(255,255,255,0.08)";

// // // // const EMPTY_FORM = {
// // // //   name: "", description: "", price: "", originalPrice: "", discountPercent: 0,
// // // //   stockQuantity: 0, categoryId: "", isFeatured: false, isActive: true,
// // // //   colour: "", size: "", gender: "", fabric: "", occasion: "",
// // // // };

// // // // export default function AdminProducts() {
// // // //   const [products,       setProducts]       = useState([]);
// // // //   const [categories,     setCategories]     = useState([]);
// // // //   const [loading,        setLoading]        = useState(true);
// // // //   const [saving,         setSaving]         = useState(false);
// // // //   const [modalOpen,      setModalOpen]      = useState(false);
// // // //   const [editingProduct, setEditingProduct] = useState(null);
// // // //   const [form,           setForm]           = useState(EMPTY_FORM);
// // // //   const [uploadingImage, setUploadingImage] = useState(null);
// // // //   const [currentPage,    setCurrentPage]    = useState(0);
// // // //   const [totalPages,     setTotalPages]     = useState(0);
// // // //   const [searchQuery,    setSearchQuery]    = useState("");
// // // //   const [activeTab,      setActiveTab]      = useState("basic"); // "basic" | "attributes"

// // // //   useEffect(() => { fetchProducts(); fetchCategories(); }, [currentPage, searchQuery]);

// // // //   const fetchProducts = async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const data = await adminAPI.getAllProducts(currentPage, 20, searchQuery);
// // // //       setProducts(data.content || []); setTotalPages(data.totalPages || 0);
// // // //     } catch(e) { console.error(e); }
// // // //     finally { setLoading(false); }
// // // //   };
// // // //   const fetchCategories = async () => {
// // // //     try { setCategories(await adminAPI.getAllCategories()); } catch(e) { console.error(e); }
// // // //   };

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault(); setSaving(true);
// // // //     try {
// // // //       const payload = {
// // // //         ...form,
// // // //         price:           parseFloat(form.price),
// // // //         originalPrice:   form.originalPrice ? parseFloat(form.originalPrice) : null,
// // // //         discountPercent: parseInt(form.discountPercent) || 0,
// // // //         stockQuantity:   parseInt(form.stockQuantity) || 0,
// // // //         categoryId:      parseInt(form.categoryId),
// // // //       };
// // // //       if (editingProduct) await adminAPI.updateProduct(editingProduct.id, payload);
// // // //       else await adminAPI.createProduct(payload);
// // // //       fetchProducts(); closeModal();
// // // //     } catch(e) { alert(e.response?.data?.message || "Failed to save product"); }
// // // //     finally { setSaving(false); }
// // // //   };

// // // //   const handleImageUpload = async (id, file) => {
// // // //     setUploadingImage(id);
// // // //     try { await adminAPI.uploadProductImage(id, file); fetchProducts(); }
// // // //     catch { alert("Image upload failed"); }
// // // //     finally { setUploadingImage(null); }
// // // //   };

// // // //   const handleDelete = async (id) => {
// // // //     if (!confirm("Delete this product?")) return;
// // // //     try { await adminAPI.deleteProduct(id); fetchProducts(); } catch { alert("Failed to delete"); }
// // // //   };
// // // //   const toggleFeatured = async (id) => { try { await adminAPI.toggleFeatured(id); fetchProducts(); } catch { alert("Failed"); } };
// // // //   const toggleActive   = async (id) => { try { await adminAPI.toggleActive(id);   fetchProducts(); } catch { alert("Failed"); } };

// // // //   const openModal = (product = null) => {
// // // //     setEditingProduct(product);
// // // //     setForm(product ? {
// // // //       name: product.name, description: product.description || "",
// // // //       price: product.price.toString(), originalPrice: product.originalPrice?.toString() || "",
// // // //       discountPercent: product.discountPercent || 0, stockQuantity: product.stockQuantity || 0,
// // // //       categoryId: product.category?.id?.toString() || "",
// // // //       isFeatured: product.isFeatured || false, isActive: product.isActive !== false,
// // // //       colour: product.colour || "", size: product.size || "", gender: product.gender || "",
// // // //       fabric: product.fabric || "", occasion: product.occasion || "",
// // // //     } : { ...EMPTY_FORM });
// // // //     setActiveTab("basic");
// // // //     setModalOpen(true);
// // // //   };
// // // //   const closeModal = () => { setModalOpen(false); setEditingProduct(null); setForm({ ...EMPTY_FORM }); };

// // // //   const f = (key) => ({ value: form[key], onChange: e => setForm({...form, [key]: e.target.value}), onFocus, onBlur });

// // // //   return (
// // // //     <div style={{ fontFamily: SANS, color: T.text }}>

// // // //       {/* Header */}
// // // //       <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 22 }}>
// // // //         <div>
// // // //           <h1 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 700, color: T.text, marginBottom: 5 }}>Products</h1>
// // // //           <p style={{ fontSize: 14, color: T.muted }}>Manage your product catalog</p>
// // // //         </div>
// // // //         <button onClick={() => openModal()}
// // // //           style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", background: T.maroon,
// // // //             color: T.text, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
// // // //             fontFamily: SANS, borderRadius: 8, whiteSpace: "nowrap" }}>
// // // //           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// // // //             <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
// // // //           </svg>
// // // //           New Product
// // // //         </button>
// // // //       </div>

// // // //       {/* Toolbar */}
// // // //       <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20,
// // // //         padding: "14px 16px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 10 }}>
// // // //         <div style={{ position: "relative", flex: 1, maxWidth: 320 }}>
// // // //           <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.muted} strokeWidth="2"
// // // //             style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
// // // //             <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
// // // //           </svg>
// // // //           <input placeholder="Search products..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
// // // //             style={{ ...iStyle, paddingLeft: 36, background: "#0a0a14" }}
// // // //             onFocus={e => e.target.style.borderColor = "rgba(212,175,55,0.35)"}
// // // //             onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}/>
// // // //         </div>
// // // //         <span style={{ fontSize: 13, color: T.dim, marginLeft: "auto" }}>
// // // //           <strong style={{ color: T.text }}>{products.length}</strong> products
// // // //         </span>
// // // //       </div>

// // // //       {/* Products Grid */}
// // // //       {loading ? (
// // // //         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 14 }}>
// // // //           {[...Array(8)].map((_,i) => (
// // // //             <div key={i} style={{ height: 320, background: T.card, borderRadius: 12,
// // // //               animation: "fadeInOut 1.4s ease-in-out infinite", opacity: 0.4 }}/>
// // // //           ))}
// // // //         </div>
// // // //       ) : products.length === 0 ? (
// // // //         <div style={{ textAlign: "center", padding: "80px 20px", background: T.card,
// // // //           border: `1px dashed rgba(212,175,55,0.12)`, borderRadius: 14 }}>
// // // //           <div style={{ width: 56, height: 56, margin: "0 auto 18px", borderRadius: 14,
// // // //             background: "rgba(212,175,55,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
// // // //             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.5">
// // // //               <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
// // // //             </svg>
// // // //           </div>
// // // //           <p style={{ fontSize: 18, fontWeight: 600, color: T.text, marginBottom: 8 }}>No products yet</p>
// // // //           <p style={{ fontSize: 14, color: T.muted, marginBottom: 22 }}>Add your first product to the catalog</p>
// // // //           <button onClick={() => openModal()} style={{ padding: "10px 22px", background: T.maroon, color: T.text,
// // // //             border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: SANS, borderRadius: 8 }}>
// // // //             Add Product
// // // //           </button>
// // // //         </div>
// // // //       ) : (
// // // //         <>
// // // //           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 14 }}>
// // // //             {products.map((p, i) => (
// // // //               <motion.div key={p.id} initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay: i*0.04 }}
// // // //                 style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden" }}
// // // //                 className="prod-card">

// // // //                 {/* Image */}
// // // //                 <div style={{ position: "relative", height: 180, background: "#0a0a14", overflow: "hidden" }}>
// // // //                   {p.imageUrl
// // // //                     ? <img src={p.imageUrl} alt={p.name} className="prod-img"
// // // //                         style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}/>
// // // //                     : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
// // // //                         <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1">
// // // //                           <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
// // // //                         </svg>
// // // //                       </div>
// // // //                   }
// // // //                   {/* Upload overlay */}
// // // //                   <label className="prod-overlay" style={{ position: "absolute", inset: 0, background: "rgba(8,8,16,0.88)",
// // // //                     display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
// // // //                     opacity: 0, transition: "opacity 0.2s" }}>
// // // //                     <input type="file" accept="image/*" style={{ display: "none" }}
// // // //                       onChange={e => handleImageUpload(p.id, e.target.files[0])} disabled={uploadingImage === p.id}/>
// // // //                     {uploadingImage === p.id
// // // //                       ? <div style={{ width: 26, height: 26, border: `2px solid ${T.gold}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }}/>
// // // //                       : <div style={{ textAlign: "center" }}>
// // // //                           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.5" style={{ display: "block", margin: "0 auto 5px" }}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
// // // //                           <span style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: T.gold, fontWeight: 700 }}>Upload</span>
// // // //                         </div>
// // // //                     }
// // // //                   </label>

// // // //                   {/* Badges */}
// // // //                   <div style={{ position: "absolute", top: 8, left: 8, display: "flex", flexDirection: "column", gap: 4 }}>
// // // //                     {p.isFeatured && <span style={{ padding: "2px 7px", background: "rgba(212,175,55,0.85)", color: "#1a1a2e", fontSize: 9, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", borderRadius: 4 }}>★ Featured</span>}
// // // //                     {!p.isActive  && <span style={{ padding: "2px 7px", background: "rgba(248,113,113,0.85)", color: "#fff", fontSize: 9, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", borderRadius: 4 }}>Inactive</span>}
// // // //                     {p.stockQuantity === 0 && <span style={{ padding: "2px 7px", background: "rgba(0,0,0,0.85)", color: "#aaa", fontSize: 9, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", borderRadius: 4 }}>No Stock</span>}
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Info */}
// // // //                 <div style={{ padding: "12px 14px" }}>
// // // //                   <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
// // // //                     color: T.gold, marginBottom: 3 }}>{p.category?.name || "Uncategorised"}</p>
// // // //                   <h3 style={{ fontSize: 14, fontWeight: 600, color: T.text, marginBottom: 6,
// // // //                     overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{p.name}</h3>

// // // //                   <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 6 }}>
// // // //                     <span style={{ fontFamily: SERIF, fontSize: 16, fontWeight: 700, color: T.text }}>
// // // //                       ₹{p.price?.toLocaleString("en-IN")}
// // // //                     </span>
// // // //                     {p.originalPrice && p.originalPrice > p.price && (
// // // //                       <span style={{ fontSize: 12, color: T.dim, textDecoration: "line-through" }}>
// // // //                         ₹{p.originalPrice?.toLocaleString("en-IN")}
// // // //                       </span>
// // // //                     )}
// // // //                   </div>

// // // //                   {/* Stock pill */}
// // // //                   <div style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 8px",
// // // //                     borderRadius: 20, background: p.stockQuantity > 0 ? T.greenBg : T.dangerBg,
// // // //                     border: `1px solid ${p.stockQuantity > 0 ? T.greenBorder : T.dangerBorder}`,
// // // //                     marginBottom: 10 }}>
// // // //                     <div style={{ width: 5, height: 5, borderRadius: "50%",
// // // //                       background: p.stockQuantity > 0 ? T.green : T.danger }}/>
// // // //                     <span style={{ fontSize: 11, fontWeight: 600, color: p.stockQuantity > 0 ? T.green : T.danger }}>
// // // //                       {p.stockQuantity > 0 ? `${p.stockQuantity} in stock` : "Out of stock"}
// // // //                     </span>
// // // //                   </div>

// // // //                   {/* Action buttons */}
// // // //                   <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 6 }}>
// // // //                     <button onClick={() => openModal(p)}
// // // //                       style={{ padding: "8px", background: "rgba(212,175,55,0.07)", border: `1px solid ${T.borderHi}`,
// // // //                         color: T.gold, cursor: "pointer", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em",
// // // //                         textTransform: "uppercase", fontFamily: SANS, borderRadius: 7, transition: "all 0.12s" }}
// // // //                       onMouseEnter={e => e.currentTarget.style.background = "rgba(212,175,55,0.14)"}
// // // //                       onMouseLeave={e => e.currentTarget.style.background = "rgba(212,175,55,0.07)"}>
// // // //                       Edit
// // // //                     </button>
// // // //                     <button onClick={() => toggleFeatured(p.id)} title={p.isFeatured ? "Unfeature" : "Feature"}
// // // //                       style={{ padding: "8px 10px", background: p.isFeatured ? "rgba(212,175,55,0.15)" : "transparent",
// // // //                         border: `1px solid ${T.borderHi}`, color: T.gold, cursor: "pointer", borderRadius: 7,
// // // //                         fontSize: 13, transition: "all 0.12s" }}>★</button>
// // // //                     <button onClick={() => handleDelete(p.id)}
// // // //                       style={{ padding: "8px 10px", background: T.dangerBg, border: `1px solid ${T.dangerBorder}`,
// // // //                         color: T.danger, cursor: "pointer", borderRadius: 7, display: "flex", alignItems: "center",
// // // //                         transition: "all 0.12s" }}
// // // //                       onMouseEnter={e => e.currentTarget.style.background = "rgba(248,113,113,0.15)"}
// // // //                       onMouseLeave={e => e.currentTarget.style.background = T.dangerBg}>
// // // //                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
// // // //                         <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
// // // //                       </svg>
// // // //                     </button>
// // // //                   </div>

// // // //                   {/* Active toggle */}
// // // //                   <button onClick={() => toggleActive(p.id)} style={{ width: "100%", marginTop: 6, padding: "7px",
// // // //                     background: "transparent", border: `1px solid ${p.isActive ? T.greenBorder : T.dangerBorder}`,
// // // //                     color: p.isActive ? T.green : T.danger, cursor: "pointer", fontSize: 11, fontWeight: 700,
// // // //                     letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: SANS, borderRadius: 7 }}>
// // // //                     {p.isActive ? "● Active" : "○ Inactive"}
// // // //                   </button>
// // // //                 </div>
// // // //               </motion.div>
// // // //             ))}
// // // //           </div>

// // // //           {/* Pagination */}
// // // //           {totalPages > 1 && (
// // // //             <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 28 }}>
// // // //               <button onClick={() => setCurrentPage(p => Math.max(0, p-1))} disabled={currentPage === 0}
// // // //                 style={{ padding: "8px 16px", background: "transparent", border: `1px solid ${T.border}`,
// // // //                   color: currentPage === 0 ? T.dim : T.muted, cursor: currentPage === 0 ? "default" : "pointer",
// // // //                   fontSize: 13, fontFamily: SANS, borderRadius: 7, transition: "all 0.15s" }}>
// // // //                 ← Prev
// // // //               </button>
// // // //               <span style={{ padding: "8px 16px", background: T.card, border: `1px solid ${T.border}`,
// // // //                 color: T.text, fontSize: 13, borderRadius: 7 }}>
// // // //                 {currentPage + 1} / {totalPages}
// // // //               </span>
// // // //               <button onClick={() => setCurrentPage(p => Math.min(totalPages-1, p+1))} disabled={currentPage >= totalPages-1}
// // // //                 style={{ padding: "8px 16px", background: "transparent", border: `1px solid ${T.border}`,
// // // //                   color: currentPage >= totalPages-1 ? T.dim : T.muted, cursor: currentPage >= totalPages-1 ? "default" : "pointer",
// // // //                   fontSize: 13, fontFamily: SANS, borderRadius: 7, transition: "all 0.15s" }}>
// // // //                 Next →
// // // //               </button>
// // // //             </div>
// // // //           )}
// // // //         </>
// // // //       )}

// // // //       {/* ── MODAL ─────────────────────────────────────────────────────────── */}
// // // //       <AnimatePresence>
// // // //         {modalOpen && (
// // // //           <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
// // // //             style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "flex-start",
// // // //               justifyContent: "center", padding: "24px 16px", background: "rgba(4,4,12,0.92)", overflowY: "auto" }}
// // // //             onClick={closeModal}>
// // // //             <motion.div initial={{ scale:0.93, opacity:0, y:20 }} animate={{ scale:1, opacity:1, y:0 }}
// // // //               exit={{ scale:0.93, opacity:0 }} transition={{ type: "spring", stiffness: 320, damping: 28 }}
// // // //               style={{ width: "100%", maxWidth: 640, background: T.surface,
// // // //                 border: `1px solid ${T.borderHi}`, borderRadius: 18, overflow: "hidden", marginBottom: 24 }}
// // // //               onClick={e => e.stopPropagation()}>

// // // //               {/* Modal header */}
// // // //               <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
// // // //                 padding: "20px 24px", borderBottom: `1px solid ${T.border}` }}>
// // // //                 <h2 style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 700, color: T.text }}>
// // // //                   {editingProduct ? "Edit Product" : "New Product"}
// // // //                 </h2>
// // // //                 <button onClick={closeModal}
// // // //                   style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.05)",
// // // //                     border: `1px solid ${T.border}`, color: T.muted, cursor: "pointer",
// // // //                     display: "flex", alignItems: "center", justifyContent: "center" }}>
// // // //                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// // // //                     <path d="M18 6 6 18M6 6l12 12"/>
// // // //                   </svg>
// // // //                 </button>
// // // //               </div>

// // // //               {/* Tab bar */}
// // // //               <div style={{ display: "flex", borderBottom: `1px solid ${T.border}`, background: T.surface }}>
// // // //                 {[
// // // //                   { key: "basic",      label: "Basic Info" },
// // // //                   { key: "attributes", label: "Attributes & Filters" },
// // // //                 ].map(tab => (
// // // //                   <button key={tab.key} onClick={() => setActiveTab(tab.key)}
// // // //                     style={{ flex: 1, padding: "13px", background: "transparent", border: "none",
// // // //                       cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: SANS,
// // // //                       color: activeTab === tab.key ? T.gold : T.muted,
// // // //                       borderBottom: `2px solid ${activeTab === tab.key ? T.gold : "transparent"}`,
// // // //                       transition: "all 0.15s" }}>
// // // //                     {tab.label}
// // // //                   </button>
// // // //                 ))}
// // // //               </div>

// // // //               <form onSubmit={handleSubmit}>
// // // //                 <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column", gap: 16 }}>

// // // //                   {/* ── TAB: Basic Info ── */}
// // // //                   {activeTab === "basic" && (
// // // //                     <>
// // // //                       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
// // // //                         <div>
// // // //                           <label style={labelStyle}>Product Name *</label>
// // // //                           <input type="text" required {...f("name")} placeholder="e.g. Kanjivaram Saree" style={iStyle}/>
// // // //                         </div>
// // // //                         <div>
// // // //                           <label style={labelStyle}>Category *</label>
// // // //                           <select required {...f("categoryId")} style={{ ...iStyle, cursor: "pointer" }}>
// // // //                             <option value="">Select category</option>
// // // //                             {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
// // // //                           </select>
// // // //                         </div>
// // // //                       </div>

// // // //                       <div>
// // // //                         <label style={labelStyle}>Description</label>
// // // //                         <textarea {...f("description")} rows={3} placeholder="Product description..."
// // // //                           style={{ ...iStyle, resize: "vertical" }}/>
// // // //                       </div>

// // // //                       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
// // // //                         <div>
// // // //                           <label style={labelStyle}>Price (₹) *</label>
// // // //                           <input type="number" step="0.01" required {...f("price")} placeholder="0.00" style={iStyle}/>
// // // //                         </div>
// // // //                         <div>
// // // //                           <label style={labelStyle}>Original Price (₹)</label>
// // // //                           <input type="number" step="0.01" {...f("originalPrice")} placeholder="MRP" style={iStyle}/>
// // // //                         </div>
// // // //                         <div>
// // // //                           <label style={labelStyle}>Stock Qty *</label>
// // // //                           <input type="number" required {...f("stockQuantity")} placeholder="0" style={iStyle}/>
// // // //                         </div>
// // // //                       </div>

// // // //                       <div style={{ display: "flex", gap: 14 }}>
// // // //                         <label style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "11px 14px",
// // // //                           background: "rgba(212,175,55,0.04)", border: `1px solid rgba(212,175,55,0.12)`,
// // // //                           borderRadius: 8, cursor: "pointer" }}>
// // // //                           <input type="checkbox" checked={form.isFeatured}
// // // //                             onChange={e => setForm({...form, isFeatured: e.target.checked})}
// // // //                             style={{ width: 15, height: 15, accentColor: T.gold, cursor: "pointer" }}/>
// // // //                           <span style={{ fontSize: 14, color: T.muted }}>★ Featured</span>
// // // //                         </label>
// // // //                         <label style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "11px 14px",
// // // //                           background: T.greenBg, border: `1px solid ${T.greenBorder}`,
// // // //                           borderRadius: 8, cursor: "pointer" }}>
// // // //                           <input type="checkbox" checked={form.isActive}
// // // //                             onChange={e => setForm({...form, isActive: e.target.checked})}
// // // //                             style={{ width: 15, height: 15, accentColor: T.green, cursor: "pointer" }}/>
// // // //                           <span style={{ fontSize: 14, color: T.muted }}>Active on store</span>
// // // //                         </label>
// // // //                       </div>
// // // //                     </>
// // // //                   )}

// // // //                   {/* ── TAB: Attributes ── */}
// // // //                   {activeTab === "attributes" && (
// // // //                     <>
// // // //                       <p style={{ fontSize: 13, color: T.muted, marginTop: -4, marginBottom: 6,
// // // //                         padding: "10px 14px", background: "rgba(212,175,55,0.05)",
// // // //                         border: `1px solid rgba(212,175,55,0.1)`, borderRadius: 8 }}>
// // // //                         These fields directly power the sidebar filters on the store. Fill them carefully.
// // // //                       </p>
// // // //                       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
// // // //                         <div>
// // // //                           <label style={labelStyle}>Colour</label>
// // // //                           <select {...f("colour")} style={{ ...iStyle, cursor: "pointer" }}>
// // // //                             <option value="">Select</option>
// // // //                             {["Black","White","Red","Navy Blue","Blue","Green","Pink","Yellow","Orange","Purple","Brown","Grey","Maroon","Gold","Cream","Multi-colour"].map(c => <option key={c}>{c}</option>)}
// // // //                           </select>
// // // //                         </div>
// // // //                         <div>
// // // //                           <label style={labelStyle}>Gender</label>
// // // //                           <select {...f("gender")} style={{ ...iStyle, cursor: "pointer" }}>
// // // //                             <option value="">Select</option>
// // // //                             {["Women","Men","Kids","Unisex"].map(g => <option key={g}>{g}</option>)}
// // // //                           </select>
// // // //                         </div>
// // // //                         <div>
// // // //                           <label style={labelStyle}>Size</label>
// // // //                           <select {...f("size")} style={{ ...iStyle, cursor: "pointer" }}>
// // // //                             <option value="">Select</option>
// // // //                             {["Free Size","XS","S","M","L","XL","XXL","XS-XL","S-XL"].map(s => <option key={s}>{s}</option>)}
// // // //                           </select>
// // // //                         </div>
// // // //                         <div>
// // // //                           <label style={labelStyle}>Fabric / Material</label>
// // // //                           <select {...f("fabric")} style={{ ...iStyle, cursor: "pointer" }}>
// // // //                             <option value="">Select</option>
// // // //                             {["Pure Silk","Kanjivaram Silk","Banarasi Silk","Tussar Silk","Chanderi","Cotton","Cotton Silk","Georgette","Chiffon","Linen","Polyester","Crepe"].map(f => <option key={f}>{f}</option>)}
// // // //                           </select>
// // // //                         </div>
// // // //                         <div>
// // // //                           <label style={labelStyle}>Occasion</label>
// // // //                           <select {...f("occasion")} style={{ ...iStyle, cursor: "pointer" }}>
// // // //                             <option value="">Select</option>
// // // //                             {["Wedding","Festival","Casual","Party","Office","Daily Wear","Traditional","Formal"].map(o => <option key={o}>{o}</option>)}
// // // //                           </select>
// // // //                         </div>
// // // //                       </div>

// // // //                       {/* Preview of set attributes */}
// // // //                       <div style={{ padding: "14px", background: "rgba(255,255,255,0.02)",
// // // //                         border: `1px solid ${T.border}`, borderRadius: 8 }}>
// // // //                         <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
// // // //                           color: T.dim, marginBottom: 10 }}>Attribute Preview</p>
// // // //                         <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
// // // //                           {[
// // // //                             { label: form.colour,  icon: "🎨" },
// // // //                             { label: form.gender,  icon: "👤" },
// // // //                             { label: form.size,    icon: "📐" },
// // // //                             { label: form.fabric,  icon: "🧵" },
// // // //                             { label: form.occasion,icon: "✨" },
// // // //                           ].filter(a => a.label).map((a, i) => (
// // // //                             <span key={i} style={{ padding: "4px 10px", background: "rgba(212,175,55,0.1)",
// // // //                               border: `1px solid rgba(212,175,55,0.2)`, borderRadius: 20,
// // // //                               fontSize: 12, color: T.gold }}>
// // // //                               {a.icon} {a.label}
// // // //                             </span>
// // // //                           ))}
// // // //                           {!form.colour && !form.gender && !form.size && !form.fabric && !form.occasion && (
// // // //                             <span style={{ fontSize: 13, color: T.dim }}>No attributes selected yet</span>
// // // //                           )}
// // // //                         </div>
// // // //                       </div>
// // // //                     </>
// // // //                   )}
// // // //                 </div>

// // // //                 {/* Modal footer */}
// // // //                 <div style={{ display: "flex", gap: 10, padding: "16px 24px",
// // // //                   borderTop: `1px solid ${T.border}`, background: "rgba(255,255,255,0.01)" }}>
// // // //                   <button type="button" onClick={closeModal}
// // // //                     style={{ flex: 1, padding: "12px", background: "transparent", border: `1px solid ${T.border}`,
// // // //                       color: T.muted, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: SANS, borderRadius: 8 }}>
// // // //                     Cancel
// // // //                   </button>
// // // //                   {activeTab === "basic" && (
// // // //                     <button type="button" onClick={() => setActiveTab("attributes")}
// // // //                       style={{ flex: 1, padding: "12px", background: "rgba(212,175,55,0.08)", border: `1px solid ${T.borderHi}`,
// // // //                         color: T.gold, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: SANS, borderRadius: 8 }}>
// // // //                       Next: Attributes →
// // // //                     </button>
// // // //                   )}
// // // //                   <button type="submit" disabled={saving}
// // // //                     style={{ flex: 1, padding: "12px", background: T.maroon, color: T.text, border: "none",
// // // //                       cursor: saving ? "wait" : "pointer", fontSize: 13, fontWeight: 600, fontFamily: SANS,
// // // //                       borderRadius: 8, opacity: saving ? 0.7 : 1, transition: "opacity 0.15s" }}>
// // // //                     {saving ? "Saving..." : editingProduct ? "Update Product" : "Create Product"}
// // // //                   </button>
// // // //                 </div>
// // // //               </form>
// // // //             </motion.div>
// // // //           </motion.div>
// // // //         )}
// // // //       </AnimatePresence>

// // // //       <style>{`
// // // //         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');
// // // //         .prod-card:hover .prod-overlay { opacity: 1 !important; }
// // // //         .prod-card:hover .prod-img     { transform: scale(1.04) !important; }
// // // //         @keyframes fadeInOut { 0%,100%{opacity:0.4} 50%{opacity:0.2} }
// // // //         @keyframes spin { to{transform:rotate(360deg)} }
// // // //       `}</style>
// // // //     </div>
// // // //   );
// // // // }



// // // import { useState, useEffect } from "react";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import { adminAPI } from "../../api";
// // // import { useAdminTheme } from "./AdminDashboard";

// // // const SERIF = "'Cormorant Garamond', Georgia, serif";
// // // const SANS  = "'DM Sans', 'Segoe UI', system-ui, sans-serif";
// // // const EMPTY = {
// // //   name:"", description:"", price:"", originalPrice:"", discountPercent:0,
// // //   stockQuantity:0, categoryId:"", isFeatured:false, isActive:true,
// // //   colour:"", size:"", gender:"", fabric:"", occasion:"",
// // // };

// // // export default function AdminProducts() {
// // //   const { T } = useAdminTheme();
// // //   const [products,       setProducts]       = useState([]);
// // //   const [categories,     setCategories]     = useState([]);
// // //   const [loading,        setLoading]        = useState(true);
// // //   const [saving,         setSaving]         = useState(false);
// // //   const [modalOpen,      setModalOpen]      = useState(false);
// // //   const [editingProduct, setEditingProduct] = useState(null);
// // //   const [form,           setForm]           = useState({...EMPTY});
// // //   const [uploadingImage, setUploadingImage] = useState(null);
// // //   const [currentPage,    setCurrentPage]    = useState(0);
// // //   const [totalPages,     setTotalPages]     = useState(0);
// // //   const [searchQuery,    setSearchQuery]    = useState("");
// // //   const [activeTab,      setActiveTab]      = useState("basic");

// // //   useEffect(() => { fetchProducts(); fetchCategories(); }, [currentPage, searchQuery]);

// // //   const fetchProducts = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const data = await adminAPI.getAllProducts(currentPage, 20, searchQuery);
// // //       setProducts(data.content || []); setTotalPages(data.totalPages || 0);
// // //     } catch(e) { console.error(e); }
// // //     finally { setLoading(false); }
// // //   };
// // //   const fetchCategories = async () => {
// // //     try { setCategories(await adminAPI.getAllCategories()); } catch(e) { console.error(e); }
// // //   };
// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault(); setSaving(true);
// // //     try {
// // //       const payload = { ...form,
// // //         price: parseFloat(form.price),
// // //         originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
// // //         discountPercent: parseInt(form.discountPercent) || 0,
// // //         stockQuantity: parseInt(form.stockQuantity) || 0,
// // //         categoryId: parseInt(form.categoryId),
// // //       };
// // //       if (editingProduct) await adminAPI.updateProduct(editingProduct.id, payload);
// // //       else await adminAPI.createProduct(payload);
// // //       fetchProducts(); closeModal();
// // //     } catch(e) { alert(e.response?.data?.message || "Failed to save product"); }
// // //     finally { setSaving(false); }
// // //   };
// // //   const handleImageUpload = async (id, file) => {
// // //     setUploadingImage(id);
// // //     try { await adminAPI.uploadProductImage(id, file); fetchProducts(); }
// // //     catch { alert("Image upload failed"); }
// // //     finally { setUploadingImage(null); }
// // //   };
// // //   const handleDelete    = async (id) => { if (!confirm("Delete this product?")) return; try { await adminAPI.deleteProduct(id); fetchProducts(); } catch { alert("Failed to delete"); } };
// // //   const toggleFeatured  = async (id) => { try { await adminAPI.toggleFeatured(id); fetchProducts(); } catch { alert("Failed"); } };
// // //   const toggleActive    = async (id) => { try { await adminAPI.toggleActive(id);   fetchProducts(); } catch { alert("Failed"); } };

// // //   const openModal = (product = null) => {
// // //     setEditingProduct(product);
// // //     setForm(product ? {
// // //       name: product.name, description: product.description || "",
// // //       price: product.price.toString(), originalPrice: product.originalPrice?.toString() || "",
// // //       discountPercent: product.discountPercent || 0, stockQuantity: product.stockQuantity || 0,
// // //       categoryId: product.category?.id?.toString() || "",
// // //       isFeatured: product.isFeatured || false, isActive: product.isActive !== false,
// // //       colour: product.colour||"", size: product.size||"", gender: product.gender||"",
// // //       fabric: product.fabric||"", occasion: product.occasion||"",
// // //     } : {...EMPTY});
// // //     setActiveTab("basic"); setModalOpen(true);
// // //   };
// // //   const closeModal = () => { setModalOpen(false); setEditingProduct(null); setForm({...EMPTY}); };

// // //   // Dynamic input style using T
// // //   const iStyle = {
// // //     width:"100%", padding:"11px 14px", background:T.inputBg,
// // //     border:`1px solid ${T.inputBorder}`, borderRadius:8,
// // //     color:T.text, fontSize:14, outline:"none", fontFamily:SANS, transition:"border-color 0.15s",
// // //   };
// // //   const lStyle = { display:"block", fontSize:11, fontWeight:700, letterSpacing:"0.15em",
// // //     textTransform:"uppercase", color:T.muted, marginBottom:7 };
// // //   const fi = e => e.target.style.borderColor = T.inputFocus;
// // //   const fo = e => e.target.style.borderColor = T.inputBorder;
// // //   const fld = (key) => ({ value:form[key], onChange:e=>setForm({...form,[key]:e.target.value}), onFocus:fi, onBlur:fo });

// // //   return (
// // //     <div style={{ fontFamily: SANS, color: T.text }}>

// // //       {/* Header */}
// // //       <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:22 }}>
// // //         <div>
// // //           <h1 style={{ fontFamily:SERIF, fontSize:28, fontWeight:700, color:T.text, marginBottom:5 }}>Products</h1>
// // //           <p style={{ fontSize:14, color:T.muted }}>Manage your product catalog</p>
// // //         </div>
// // //         <button onClick={() => openModal()}
// // //           style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 20px",
// // //             background:T.maroon, color:"#FFFFF0", border:"none", cursor:"pointer",
// // //             fontSize:13, fontWeight:600, fontFamily:SANS, borderRadius:8, whiteSpace:"nowrap" }}>
// // //           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// // //             <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
// // //           </svg>
// // //           New Product
// // //         </button>
// // //       </div>

// // //       {/* Toolbar */}
// // //       <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20,
// // //         padding:"12px 16px", background:T.card, border:`1px solid ${T.border}`, borderRadius:10,
// // //         boxShadow:T.shadow, transition:"background 0.3s" }}>
// // //         <div style={{ position:"relative", flex:1, maxWidth:320 }}>
// // //           <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.muted} strokeWidth="2"
// // //             style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}>
// // //             <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
// // //           </svg>
// // //           <input placeholder="Search products…" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}
// // //             style={{ ...iStyle, paddingLeft:38 }} onFocus={fi} onBlur={fo}/>
// // //         </div>
// // //         <span style={{ fontSize:13, color:T.dim, marginLeft:"auto" }}>
// // //           <strong style={{ color:T.text }}>{products.length}</strong> products
// // //         </span>
// // //       </div>

// // //       {/* Grid */}
// // //       {loading ? (
// // //         <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:14 }}>
// // //           {[...Array(8)].map((_,i) => (
// // //             <div key={i} style={{ height:320, background:T.card, borderRadius:12,
// // //               animation:"fadeInOut 1.4s ease-in-out infinite", opacity:0.45 }}/>
// // //           ))}
// // //         </div>
// // //       ) : products.length === 0 ? (
// // //         <div style={{ textAlign:"center", padding:"80px 20px", background:T.card,
// // //           border:`1px dashed ${T.borderHi}`, borderRadius:14 }}>
// // //           <div style={{ width:56, height:56, margin:"0 auto 18px", borderRadius:14,
// // //             background:"rgba(212,175,55,0.07)", display:"flex", alignItems:"center", justifyContent:"center" }}>
// // //             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.5">
// // //               <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
// // //             </svg>
// // //           </div>
// // //           <p style={{ fontSize:18, fontWeight:600, color:T.text, marginBottom:8 }}>No products yet</p>
// // //           <p style={{ fontSize:14, color:T.muted, marginBottom:22 }}>Add your first product to the catalog</p>
// // //           <button onClick={() => openModal()} style={{ padding:"10px 22px", background:T.maroon, color:"#FFFFF0",
// // //             border:"none", cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:SANS, borderRadius:8 }}>
// // //             Add Product
// // //           </button>
// // //         </div>
// // //       ) : (
// // //         <>
// // //           <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:14 }}>
// // //             {products.map((p,i) => (
// // //               <motion.div key={p.id} initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:i*0.04}}
// // //                 className="p-card"
// // //                 style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12,
// // //                   overflow:"hidden", boxShadow:T.shadow, transition:"background 0.3s, border-color 0.3s" }}>

// // //                 {/* Image */}
// // //                 <div style={{ position:"relative", height:180, background:T.inputBg, overflow:"hidden" }}>
// // //                   {p.imageUrl
// // //                     ? <img src={p.imageUrl} alt={p.name} className="p-img"
// // //                         style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s" }}/>
// // //                     : <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center" }}>
// // //                         <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={T.border} strokeWidth="1">
// // //                           <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
// // //                         </svg>
// // //                       </div>
// // //                   }
// // //                   <label className="p-overlay" style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.82)",
// // //                     display:"flex", alignItems:"center", justifyContent:"center",
// // //                     cursor:"pointer", opacity:0, transition:"opacity 0.2s" }}>
// // //                     <input type="file" accept="image/*" style={{ display:"none" }}
// // //                       onChange={e=>handleImageUpload(p.id,e.target.files[0])} disabled={uploadingImage===p.id}/>
// // //                     {uploadingImage===p.id
// // //                       ? <div style={{ width:26, height:26, border:"2px solid #D4AF37", borderTopColor:"transparent", borderRadius:"50%", animation:"spin 0.8s linear infinite" }}/>
// // //                       : <div style={{ textAlign:"center" }}>
// // //                           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" style={{ display:"block", margin:"0 auto 5px" }}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
// // //                           <span style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"#D4AF37", fontWeight:700 }}>Upload</span>
// // //                         </div>
// // //                     }
// // //                   </label>
// // //                   {/* Badges */}
// // //                   <div style={{ position:"absolute", top:8, left:8, display:"flex", flexDirection:"column", gap:4 }}>
// // //                     {p.isFeatured     && <span style={{ padding:"2px 7px", background:"rgba(212,175,55,0.88)", color:"#1a1a2e", fontSize:9, fontWeight:800, letterSpacing:"0.06em", textTransform:"uppercase", borderRadius:4 }}>★ Featured</span>}
// // //                     {!p.isActive      && <span style={{ padding:"2px 7px", background:"rgba(220,38,38,0.88)",  color:"#fff",    fontSize:9, fontWeight:800, letterSpacing:"0.06em", textTransform:"uppercase", borderRadius:4 }}>Inactive</span>}
// // //                     {p.stockQuantity===0 && <span style={{ padding:"2px 7px", background:"rgba(0,0,0,0.82)",  color:"#aaa",    fontSize:9, fontWeight:800, letterSpacing:"0.06em", textTransform:"uppercase", borderRadius:4 }}>No Stock</span>}
// // //                   </div>
// // //                 </div>

// // //                 {/* Info */}
// // //                 <div style={{ padding:"12px 14px" }}>
// // //                   <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:T.gold, marginBottom:3 }}>
// // //                     {p.category?.name || "Uncategorised"}
// // //                   </p>
// // //                   <h3 style={{ fontSize:14, fontWeight:600, color:T.text, marginBottom:6,
// // //                     overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis" }}>{p.name}</h3>
// // //                   <div style={{ display:"flex", alignItems:"baseline", gap:6, marginBottom:6 }}>
// // //                     <span style={{ fontFamily:SERIF, fontSize:16, fontWeight:700, color:T.text }}>₹{p.price?.toLocaleString("en-IN")}</span>
// // //                     {p.originalPrice && p.originalPrice > p.price && (
// // //                       <span style={{ fontSize:12, color:T.dim, textDecoration:"line-through" }}>₹{p.originalPrice?.toLocaleString("en-IN")}</span>
// // //                     )}
// // //                   </div>
// // //                   {/* Stock pill */}
// // //                   <div style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"3px 8px", borderRadius:20, marginBottom:10,
// // //                     background: p.stockQuantity>0?T.greenBg:T.dangerBg, border:`1px solid ${p.stockQuantity>0?T.greenBorder:T.dangerBorder}` }}>
// // //                     <div style={{ width:5, height:5, borderRadius:"50%", background:p.stockQuantity>0?T.green:T.danger }}/>
// // //                     <span style={{ fontSize:11, fontWeight:600, color:p.stockQuantity>0?T.green:T.danger }}>
// // //                       {p.stockQuantity>0?`${p.stockQuantity} in stock`:"Out of stock"}
// // //                     </span>
// // //                   </div>
// // //                   {/* Buttons */}
// // //                   <div style={{ display:"grid", gridTemplateColumns:"1fr auto auto", gap:6 }}>
// // //                     <button onClick={()=>openModal(p)}
// // //                       style={{ padding:"8px", background:"rgba(212,175,55,0.07)", border:`1px solid ${T.borderHi}`,
// // //                         color:T.gold, cursor:"pointer", fontSize:11, fontWeight:700, letterSpacing:"0.06em",
// // //                         textTransform:"uppercase", fontFamily:SANS, borderRadius:7, transition:"all 0.12s" }}
// // //                       onMouseEnter={e=>e.currentTarget.style.background="rgba(212,175,55,0.14)"}
// // //                       onMouseLeave={e=>e.currentTarget.style.background="rgba(212,175,55,0.07)"}>Edit</button>
// // //                     <button onClick={()=>toggleFeatured(p.id)} title={p.isFeatured?"Unfeature":"Feature"}
// // //                       style={{ padding:"8px 10px", background:p.isFeatured?"rgba(212,175,55,0.15)":"transparent",
// // //                         border:`1px solid ${T.borderHi}`, color:T.gold, cursor:"pointer", borderRadius:7, fontSize:13 }}>★</button>
// // //                     <button onClick={()=>handleDelete(p.id)}
// // //                       style={{ padding:"8px 10px", background:T.dangerBg, border:`1px solid ${T.dangerBorder}`,
// // //                         color:T.danger, cursor:"pointer", borderRadius:7, display:"flex", alignItems:"center", transition:"all 0.12s" }}
// // //                       onMouseEnter={e=>e.currentTarget.style.background="rgba(220,38,38,0.14)"}
// // //                       onMouseLeave={e=>e.currentTarget.style.background=T.dangerBg}>
// // //                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
// // //                         <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
// // //                       </svg>
// // //                     </button>
// // //                   </div>
// // //                   <button onClick={()=>toggleActive(p.id)}
// // //                     style={{ width:"100%", marginTop:6, padding:"7px", background:"transparent",
// // //                       border:`1px solid ${p.isActive?T.greenBorder:T.dangerBorder}`,
// // //                       color:p.isActive?T.green:T.danger, cursor:"pointer", fontSize:11, fontWeight:700,
// // //                       letterSpacing:"0.06em", textTransform:"uppercase", fontFamily:SANS, borderRadius:7 }}>
// // //                     {p.isActive ? "● Active" : "○ Inactive"}
// // //                   </button>
// // //                 </div>
// // //               </motion.div>
// // //             ))}
// // //           </div>

// // //           {/* Pagination */}
// // //           {totalPages > 1 && (
// // //             <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:8, marginTop:28 }}>
// // //               <button onClick={()=>setCurrentPage(p=>Math.max(0,p-1))} disabled={currentPage===0}
// // //                 style={{ padding:"8px 16px", background:"transparent", border:`1px solid ${T.border}`,
// // //                   color:currentPage===0?T.dim:T.muted, cursor:currentPage===0?"default":"pointer",
// // //                   fontSize:13, fontFamily:SANS, borderRadius:7 }}>← Prev</button>
// // //               <span style={{ padding:"8px 16px", background:T.card, border:`1px solid ${T.border}`,
// // //                 color:T.text, fontSize:13, borderRadius:7 }}>{currentPage+1} / {totalPages}</span>
// // //               <button onClick={()=>setCurrentPage(p=>Math.min(totalPages-1,p+1))} disabled={currentPage>=totalPages-1}
// // //                 style={{ padding:"8px 16px", background:"transparent", border:`1px solid ${T.border}`,
// // //                   color:currentPage>=totalPages-1?T.dim:T.muted, cursor:currentPage>=totalPages-1?"default":"pointer",
// // //                   fontSize:13, fontFamily:SANS, borderRadius:7 }}>Next →</button>
// // //             </div>
// // //           )}
// // //         </>
// // //       )}

// // //       {/* ── MODAL ── */}
// // //       <AnimatePresence>
// // //         {modalOpen && (
// // //           <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
// // //             style={{ position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"flex-start",
// // //               justifyContent:"center", padding:"24px 16px", background:"rgba(0,0,0,0.55)", overflowY:"auto" }}
// // //             onClick={closeModal}>
// // //             <motion.div initial={{scale:0.93,opacity:0,y:20}} animate={{scale:1,opacity:1,y:0}}
// // //               exit={{scale:0.93,opacity:0}} transition={{type:"spring",stiffness:320,damping:28}}
// // //               style={{ width:"100%", maxWidth:640, background:T.surface,
// // //                 border:`1px solid ${T.borderHi}`, borderRadius:18,
// // //                 overflow:"hidden", marginBottom:24, boxShadow:"0 24px 64px rgba(0,0,0,0.3)" }}
// // //               onClick={e=>e.stopPropagation()}>

// // //               {/* Modal header */}
// // //               <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
// // //                 padding:"20px 24px", borderBottom:`1px solid ${T.border}` }}>
// // //                 <h2 style={{ fontFamily:SERIF, fontSize:24, fontWeight:700, color:T.text }}>
// // //                   {editingProduct ? "Edit Product" : "New Product"}
// // //                 </h2>
// // //                 <button onClick={closeModal}
// // //                   style={{ width:32, height:32, borderRadius:8, background:T.hoverBg,
// // //                     border:`1px solid ${T.border}`, color:T.muted, cursor:"pointer",
// // //                     display:"flex", alignItems:"center", justifyContent:"center" }}>
// // //                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// // //                     <path d="M18 6 6 18M6 6l12 12"/>
// // //                   </svg>
// // //                 </button>
// // //               </div>

// // //               {/* Tab bar */}
// // //               <div style={{ display:"flex", borderBottom:`1px solid ${T.border}` }}>
// // //                 {[{key:"basic",label:"Basic Info"},{key:"attributes",label:"Attributes & Filters"}].map(tab => (
// // //                   <button key={tab.key} onClick={()=>setActiveTab(tab.key)}
// // //                     style={{ flex:1, padding:"13px", background:"transparent", border:"none", cursor:"pointer",
// // //                       fontSize:13, fontWeight:600, fontFamily:SANS,
// // //                       color:activeTab===tab.key?T.gold:T.muted,
// // //                       borderBottom:`2px solid ${activeTab===tab.key?T.gold:"transparent"}`,
// // //                       transition:"all 0.15s" }}>
// // //                     {tab.label}
// // //                   </button>
// // //                 ))}
// // //               </div>

// // //               <form onSubmit={handleSubmit}>
// // //                 <div style={{ padding:"22px 24px", display:"flex", flexDirection:"column", gap:16 }}>

// // //                   {activeTab === "basic" && <>
// // //                     <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
// // //                       <div>
// // //                         <label style={lStyle}>Product Name *</label>
// // //                         <input type="text" required {...fld("name")} placeholder="e.g. Kanjivaram Saree" style={iStyle}/>
// // //                       </div>
// // //                       <div>
// // //                         <label style={lStyle}>Category *</label>
// // //                         <select required {...fld("categoryId")} style={{...iStyle,cursor:"pointer"}}>
// // //                           <option value="">Select category</option>
// // //                           {categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
// // //                         </select>
// // //                       </div>
// // //                     </div>
// // //                     <div>
// // //                       <label style={lStyle}>Description</label>
// // //                       <textarea {...fld("description")} rows={3} placeholder="Product description…" style={{...iStyle,resize:"vertical"}}/>
// // //                     </div>
// // //                     <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
// // //                       <div><label style={lStyle}>Price (₹) *</label><input type="number" step="0.01" required {...fld("price")} placeholder="0.00" style={iStyle}/></div>
// // //                       <div><label style={lStyle}>Original Price (₹)</label><input type="number" step="0.01" {...fld("originalPrice")} placeholder="MRP" style={iStyle}/></div>
// // //                       <div><label style={lStyle}>Stock Qty *</label><input type="number" required {...fld("stockQuantity")} placeholder="0" style={iStyle}/></div>
// // //                     </div>
// // //                     <div style={{ display:"flex", gap:14 }}>
// // //                       <label style={{ flex:1, display:"flex", alignItems:"center", gap:10, padding:"11px 14px",
// // //                         background:"rgba(212,175,55,0.05)", border:`1px solid ${T.borderHi}`, borderRadius:8, cursor:"pointer" }}>
// // //                         <input type="checkbox" checked={form.isFeatured} onChange={e=>setForm({...form,isFeatured:e.target.checked})}
// // //                           style={{ width:15, height:15, accentColor:T.gold, cursor:"pointer" }}/>
// // //                         <span style={{ fontSize:14, color:T.muted }}>★ Featured</span>
// // //                       </label>
// // //                       <label style={{ flex:1, display:"flex", alignItems:"center", gap:10, padding:"11px 14px",
// // //                         background:T.greenBg, border:`1px solid ${T.greenBorder}`, borderRadius:8, cursor:"pointer" }}>
// // //                         <input type="checkbox" checked={form.isActive} onChange={e=>setForm({...form,isActive:e.target.checked})}
// // //                           style={{ width:15, height:15, accentColor:T.green, cursor:"pointer" }}/>
// // //                         <span style={{ fontSize:14, color:T.muted }}>Active on store</span>
// // //                       </label>
// // //                     </div>
// // //                   </>}

// // //                   {activeTab === "attributes" && <>
// // //                     <div style={{ padding:"10px 14px", background:"rgba(212,175,55,0.05)",
// // //                       border:`1px solid rgba(212,175,55,0.12)`, borderRadius:8 }}>
// // //                       <p style={{ fontSize:13, color:T.muted }}>These fields power the sidebar filters on the store. Fill them carefully.</p>
// // //                     </div>
// // //                     <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
// // //                       <div><label style={lStyle}>Colour</label>
// // //                         <select {...fld("colour")} style={{...iStyle,cursor:"pointer"}}>
// // //                           <option value="">Select</option>
// // //                           {["Black","White","Red","Navy Blue","Blue","Green","Pink","Yellow","Orange","Purple","Brown","Grey","Maroon","Gold","Cream","Multi-colour"].map(c=><option key={c}>{c}</option>)}
// // //                         </select>
// // //                       </div>
// // //                       <div><label style={lStyle}>Gender</label>
// // //                         <select {...fld("gender")} style={{...iStyle,cursor:"pointer"}}>
// // //                           <option value="">Select</option>
// // //                           {["Women","Men","Kids","Unisex"].map(g=><option key={g}>{g}</option>)}
// // //                         </select>
// // //                       </div>
// // //                       <div><label style={lStyle}>Size</label>
// // //                         <select {...fld("size")} style={{...iStyle,cursor:"pointer"}}>
// // //                           <option value="">Select</option>
// // //                           {["Free Size","XS","S","M","L","XL","XXL","XS-XL","S-XL"].map(s=><option key={s}>{s}</option>)}
// // //                         </select>
// // //                       </div>
// // //                       <div><label style={lStyle}>Fabric / Material</label>
// // //                         <select {...fld("fabric")} style={{...iStyle,cursor:"pointer"}}>
// // //                           <option value="">Select</option>
// // //                           {["Pure Silk","Kanjivaram Silk","Banarasi Silk","Tussar Silk","Chanderi","Cotton","Cotton Silk","Georgette","Chiffon","Linen","Polyester","Crepe"].map(f=><option key={f}>{f}</option>)}
// // //                         </select>
// // //                       </div>
// // //                       <div><label style={lStyle}>Occasion</label>
// // //                         <select {...fld("occasion")} style={{...iStyle,cursor:"pointer"}}>
// // //                           <option value="">Select</option>
// // //                           {["Wedding","Festival","Casual","Party","Office","Daily Wear","Traditional","Formal"].map(o=><option key={o}>{o}</option>)}
// // //                         </select>
// // //                       </div>
// // //                     </div>
// // //                     {/* Attribute preview chips */}
// // //                     <div style={{ padding:"14px", background:T.hoverBg, border:`1px solid ${T.border}`, borderRadius:8 }}>
// // //                       <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:T.dim, marginBottom:10 }}>Preview</p>
// // //                       <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
// // //                         {[{v:form.colour,e:"🎨"},{v:form.gender,e:"👤"},{v:form.size,e:"📐"},{v:form.fabric,e:"🧵"},{v:form.occasion,e:"✨"}]
// // //                           .filter(a=>a.v).map((a,i)=>(
// // //                           <span key={i} style={{ padding:"4px 10px", background:"rgba(212,175,55,0.1)",
// // //                             border:`1px solid rgba(212,175,55,0.2)`, borderRadius:20, fontSize:12, color:T.gold }}>
// // //                             {a.e} {a.v}
// // //                           </span>
// // //                         ))}
// // //                         {!form.colour&&!form.gender&&!form.size&&!form.fabric&&!form.occasion&&(
// // //                           <span style={{ fontSize:13, color:T.dim }}>No attributes selected yet</span>
// // //                         )}
// // //                       </div>
// // //                     </div>
// // //                   </>}
// // //                 </div>

// // //                 {/* Modal footer */}
// // //                 <div style={{ display:"flex", gap:10, padding:"16px 24px", borderTop:`1px solid ${T.border}` }}>
// // //                   <button type="button" onClick={closeModal}
// // //                     style={{ flex:1, padding:"12px", background:"transparent", border:`1px solid ${T.border}`,
// // //                       color:T.muted, cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:SANS, borderRadius:8 }}>Cancel</button>
// // //                   {activeTab==="basic" && (
// // //                     <button type="button" onClick={()=>setActiveTab("attributes")}
// // //                       style={{ flex:1, padding:"12px", background:"rgba(212,175,55,0.08)", border:`1px solid ${T.borderHi}`,
// // //                         color:T.gold, cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:SANS, borderRadius:8 }}>
// // //                       Next: Attributes →
// // //                     </button>
// // //                   )}
// // //                   <button type="submit" disabled={saving}
// // //                     style={{ flex:1, padding:"12px", background:T.maroon, color:"#FFFFF0", border:"none",
// // //                       cursor:saving?"wait":"pointer", fontSize:13, fontWeight:600, fontFamily:SANS,
// // //                       borderRadius:8, opacity:saving?0.7:1 }}>
// // //                     {saving?"Saving…":editingProduct?"Update Product":"Create Product"}
// // //                   </button>
// // //                 </div>
// // //               </form>
// // //             </motion.div>
// // //           </motion.div>
// // //         )}
// // //       </AnimatePresence>

// // //       <style>{`
// // //         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');
// // //         .p-card:hover .p-overlay { opacity: 1 !important; }
// // //         .p-card:hover .p-img     { transform: scale(1.04) !important; }
// // //         @keyframes fadeInOut { 0%,100%{opacity:0.45} 50%{opacity:0.2} }
// // //         @keyframes spin { to { transform: rotate(360deg); } }
// // //       `}</style>
// // //     </div>
// // //   );
// // // }




// // import { useState, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { adminAPI } from "../../api";
// // import { useAdminTheme } from "./AdminDashboard";

// // const SERIF = "'Cormorant Garamond', Georgia, serif";
// // const SANS  = "'DM Sans', 'Segoe UI', system-ui, sans-serif";
// // const EMPTY = {
// //   name:"", description:"", price:"", originalPrice:"", discountPercent:0,
// //   stockQuantity:0, categoryId:"", isFeatured:false, isActive:true,
// //   colour:"", size:"", gender:"", fabric:"", occasion:"",
// // };

// // export default function AdminProducts() {
// //   const { T, theme } = useAdminTheme();
// //   const [products,       setProducts]       = useState([]);
// //   const [categories,     setCategories]     = useState([]);
// //   const [loading,        setLoading]        = useState(true);
// //   const [saving,         setSaving]         = useState(false);
// //   const [modalOpen,      setModalOpen]      = useState(false);
// //   const [editingProduct, setEditingProduct] = useState(null);
// //   const [form,           setForm]           = useState({...EMPTY});
// //   const [uploadingImage, setUploadingImage] = useState(null);
// //   const [currentPage,    setCurrentPage]    = useState(0);
// //   const [totalPages,     setTotalPages]     = useState(0);
// //   const [searchQuery,    setSearchQuery]    = useState("");
// //   const [activeTab,      setActiveTab]      = useState("basic");
// //   const [filterActive,   setFilterActive]   = useState("all");

// //   useEffect(() => { fetchProducts(); fetchCategories(); }, [currentPage, searchQuery]);

// //   const fetchProducts = async () => {
// //     setLoading(true);
// //     try {
// //       const data = await adminAPI.getAllProducts(currentPage, 20, searchQuery);
// //       setProducts(data.content || []); setTotalPages(data.totalPages || 0);
// //     } catch(e) { console.error(e); }
// //     finally { setLoading(false); }
// //   };
// //   const fetchCategories = async () => {
// //     try { setCategories(await adminAPI.getAllCategories()); } catch(e) { console.error(e); }
// //   };
// //   const handleSubmit = async (e) => {
// //     e.preventDefault(); setSaving(true);
// //     try {
// //       const payload = { ...form,
// //         price: parseFloat(form.price),
// //         originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
// //         discountPercent: parseInt(form.discountPercent) || 0,
// //         stockQuantity: parseInt(form.stockQuantity) || 0,
// //         categoryId: parseInt(form.categoryId),
// //       };
// //       if (editingProduct) await adminAPI.updateProduct(editingProduct.id, payload);
// //       else await adminAPI.createProduct(payload);
// //       fetchProducts(); closeModal();
// //     } catch(e) { alert(e.response?.data?.message || "Failed to save product"); }
// //     finally { setSaving(false); }
// //   };
// //   const handleImageUpload = async (id, file) => {
// //     setUploadingImage(id);
// //     try { await adminAPI.uploadProductImage(id, file); fetchProducts(); }
// //     catch { alert("Image upload failed"); }
// //     finally { setUploadingImage(null); }
// //   };
// //   const handleDelete   = async (id) => { if (!confirm("Delete this product?")) return; try { await adminAPI.deleteProduct(id); fetchProducts(); } catch { alert("Failed to delete"); } };
// //   const toggleFeatured = async (id) => { try { await adminAPI.toggleFeatured(id); fetchProducts(); } catch { alert("Failed"); } };
// //   const toggleActive   = async (id) => { try { await adminAPI.toggleActive(id);   fetchProducts(); } catch { alert("Failed"); } };

// //   const openModal = (product = null) => {
// //     setEditingProduct(product);
// //     setForm(product ? {
// //       name:product.name, description:product.description||"",
// //       price:product.price.toString(), originalPrice:product.originalPrice?.toString()||"",
// //       discountPercent:product.discountPercent||0, stockQuantity:product.stockQuantity||0,
// //       categoryId:product.category?.id?.toString()||"",
// //       isFeatured:product.isFeatured||false, isActive:product.isActive!==false,
// //       colour:product.colour||"", size:product.size||"", gender:product.gender||"",
// //       fabric:product.fabric||"", occasion:product.occasion||"",
// //     } : {...EMPTY});
// //     setActiveTab("basic"); setModalOpen(true);
// //   };
// //   const closeModal = () => { setModalOpen(false); setEditingProduct(null); setForm({...EMPTY}); };

// //   const iStyle = {
// //     width:"100%", padding:"11px 14px", background:T.inputBg,
// //     border:`1.5px solid ${T.inputBorder}`, borderRadius:8,
// //     color:T.text, fontSize:14, outline:"none", fontFamily:SANS, transition:"border-color 0.15s",
// //     boxShadow:theme==="light"?"inset 0 1px 3px rgba(0,0,0,0.04)":"none",
// //   };
// //   const lStyle = {
// //     display:"block", fontSize:11, fontWeight:700, letterSpacing:"0.15em",
// //     textTransform:"uppercase", color:T.muted, marginBottom:7,
// //   };
// //   const fi = e => e.target.style.borderColor = T.inputFocus;
// //   const fo = e => e.target.style.borderColor = T.inputBorder;
// //   const fld = (key) => ({ value:form[key], onChange:e=>setForm({...form,[key]:e.target.value}), onFocus:fi, onBlur:fo });

// //   // Client-side filter
// //   const visibleProducts = filterActive === "all" ? products
// //     : filterActive === "featured" ? products.filter(p=>p.isFeatured)
// //     : filterActive === "active"   ? products.filter(p=>p.isActive)
// //     : filterActive === "inactive" ? products.filter(p=>!p.isActive)
// //     : filterActive === "nostock"  ? products.filter(p=>(p.stockQuantity||0)===0)
// //     : products;

// //   const counts = {
// //     all:products.length,
// //     featured:products.filter(p=>p.isFeatured).length,
// //     active:products.filter(p=>p.isActive).length,
// //     inactive:products.filter(p=>!p.isActive).length,
// //     nostock:products.filter(p=>(p.stockQuantity||0)===0).length,
// //   };

// //   const FILTER_TABS = [
// //     {key:"all",      label:`All (${counts.all})`},
// //     {key:"active",   label:`Active (${counts.active})`},
// //     {key:"featured", label:`Featured (${counts.featured})`},
// //     {key:"inactive", label:`Inactive (${counts.inactive})`},
// //     {key:"nostock",  label:`No Stock (${counts.nostock})`},
// //   ];

// //   return (
// //     <div style={{ fontFamily:SANS, color:T.text }}>

// //       {/* ── HEADER ── */}
// //       <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:22 }}>
// //         <div>
// //           <h1 style={{ fontFamily:SERIF, fontSize:28, fontWeight:700, color:T.text, marginBottom:5 }}>Products</h1>
// //           <p style={{ fontSize:14, color:T.muted }}>Manage your product catalog — {products.length} items</p>
// //         </div>
// //         <button onClick={() => openModal()}
// //           style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 20px",
// //             background:T.maroon, color:"#FFFFF0", border:"none", cursor:"pointer",
// //             fontSize:13, fontWeight:600, fontFamily:SANS, borderRadius:8, whiteSpace:"nowrap",
// //             boxShadow:theme==="light"?"0 2px 8px rgba(128,0,0,0.25)":"none" }}>
// //           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// //             <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
// //           </svg>
// //           New Product
// //         </button>
// //       </div>

// //       {/* ── TOOLBAR ── */}
// //       <div style={{ background:T.card, border:`1.5px solid ${T.statBorder||T.border}`,
// //         borderRadius:10, marginBottom:18, boxShadow:T.shadow }}>
// //         {/* Search row */}
// //         <div style={{ padding:"12px 14px", borderBottom:`1px solid ${T.tableBorder}`, display:"flex", gap:10 }}>
// //           <div style={{ position:"relative", flex:1, maxWidth:340 }}>
// //             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.muted} strokeWidth="2"
// //               style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}>
// //               <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
// //             </svg>
// //             <input placeholder="Search by name, category…" value={searchQuery}
// //               onChange={e=>{setSearchQuery(e.target.value); setCurrentPage(0);}}
// //               style={{ ...iStyle, paddingLeft:36 }} onFocus={fi} onBlur={fo}/>
// //           </div>
// //         </div>
// //         {/* Filter tabs */}
// //         <div style={{ padding:"8px 14px", display:"flex", gap:6, overflowX:"auto" }}>
// //           {FILTER_TABS.map(f => (
// //             <button key={f.key} onClick={()=>setFilterActive(f.key)}
// //               style={{ padding:"7px 14px", borderRadius:7, border:`1.5px solid ${filterActive===f.key?T.borderHi:T.border}`,
// //                 background:filterActive===f.key?(theme==="dark"?"rgba(212,175,55,0.1)":"rgba(128,0,0,0.06)"):"transparent",
// //                 color:filterActive===f.key?(theme==="dark"?T.gold:T.maroon):T.muted,
// //                 fontSize:12, fontWeight:filterActive===f.key?700:500, cursor:"pointer",
// //                 fontFamily:SANS, transition:"all 0.15s", whiteSpace:"nowrap" }}>
// //               {f.label}
// //             </button>
// //           ))}
// //         </div>
// //       </div>

// //       {/* ── PRODUCT GRID ── */}
// //       {loading ? (
// //         <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:14 }}>
// //           {[...Array(8)].map((_,i) => (
// //             <div key={i} style={{ height:330, background:T.card, borderRadius:12,
// //               border:`1px solid ${T.statBorder||T.border}`, animation:"fadeInOut 1.4s ease-in-out infinite" }}/>
// //           ))}
// //         </div>
// //       ) : visibleProducts.length === 0 ? (
// //         <div style={{ textAlign:"center", padding:"80px 20px", background:T.card,
// //           border:`2px dashed ${T.statBorder||T.border}`, borderRadius:14 }}>
// //           <div style={{ width:56, height:56, margin:"0 auto 18px", borderRadius:14,
// //             background:theme==="dark"?"rgba(212,175,55,0.07)":"#FEF9ED",
// //             border:`1.5px solid ${theme==="dark"?"rgba(212,175,55,0.15)":"#E8D5A0"}`,
// //             display:"flex", alignItems:"center", justifyContent:"center" }}>
// //             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={theme==="dark"?T.gold:"#7A5C0A"} strokeWidth="1.5">
// //               <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
// //             </svg>
// //           </div>
// //           <p style={{ fontSize:18, fontWeight:700, color:T.text, marginBottom:8 }}>No products found</p>
// //           <p style={{ fontSize:14, color:T.muted, marginBottom:22 }}>Try adjusting your search or filters</p>
// //           <button onClick={() => openModal()}
// //             style={{ padding:"10px 22px", background:T.maroon, color:"#FFFFF0",
// //               border:"none", cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:SANS, borderRadius:8 }}>
// //             Add Product
// //           </button>
// //         </div>
// //       ) : (
// //         <>
// //           <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:14 }}>
// //             {visibleProducts.map((p,i) => (
// //               <motion.div key={p.id} initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.04 }}
// //                 className="p-card"
// //                 style={{ background:T.card, border:`1.5px solid ${T.statBorder||T.border}`,
// //                   borderRadius:13, overflow:"hidden",
// //                   boxShadow:T.shadow, transition:"background 0.3s, border-color 0.3s, box-shadow 0.18s" }}>

// //                 {/* Image */}
// //                 <div style={{ position:"relative", height:185, background:T.inputBg, overflow:"hidden" }}>
// //                   {p.imageUrl
// //                     ? <img src={p.imageUrl} alt={p.name} className="p-img"
// //                         style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s" }}/>
// //                     : <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center" }}>
// //                         <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
// //                           stroke={theme==="dark"?"rgba(255,255,255,0.08)":"#D1CBC0"} strokeWidth="1">
// //                           <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
// //                         </svg>
// //                       </div>
// //                   }
// //                   {/* Upload overlay */}
// //                   <label className="p-overlay"
// //                     style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.78)",
// //                       display:"flex", alignItems:"center", justifyContent:"center",
// //                       cursor:"pointer", opacity:0, transition:"opacity 0.2s" }}>
// //                     <input type="file" accept="image/*" style={{ display:"none" }}
// //                       onChange={e=>handleImageUpload(p.id,e.target.files[0])} disabled={uploadingImage===p.id}/>
// //                     {uploadingImage===p.id
// //                       ? <div style={{ width:26, height:26, border:"2px solid #D4AF37",
// //                           borderTopColor:"transparent", borderRadius:"50%", animation:"spin 0.8s linear infinite" }}/>
// //                       : <div style={{ textAlign:"center" }}>
// //                           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5"
// //                             style={{ display:"block", margin:"0 auto 5px" }}>
// //                             <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
// //                           </svg>
// //                           <span style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"#D4AF37", fontWeight:700 }}>Upload</span>
// //                         </div>
// //                     }
// //                   </label>

// //                   {/* Badges */}
// //                   <div style={{ position:"absolute", top:8, left:8, display:"flex", flexDirection:"column", gap:4 }}>
// //                     {p.isFeatured && (
// //                       <span style={{ padding:"2px 8px", background:"rgba(212,175,55,0.92)", color:"#1a1200",
// //                         fontSize:10, fontWeight:800, letterSpacing:"0.06em", textTransform:"uppercase", borderRadius:4 }}>★ Featured</span>
// //                     )}
// //                     {!p.isActive && (
// //                       <span style={{ padding:"2px 8px", background:"rgba(185,28,28,0.9)", color:"white",
// //                         fontSize:10, fontWeight:800, letterSpacing:"0.06em", textTransform:"uppercase", borderRadius:4 }}>Inactive</span>
// //                     )}
// //                     {(p.stockQuantity||0)===0 && (
// //                       <span style={{ padding:"2px 8px", background:"rgba(0,0,0,0.78)", color:"#ccc",
// //                         fontSize:10, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", borderRadius:4 }}>No Stock</span>
// //                     )}
// //                     {p.discountPercent>0 && (
// //                       <span style={{ padding:"2px 8px", background:"rgba(21,128,61,0.9)", color:"white",
// //                         fontSize:10, fontWeight:800, letterSpacing:"0.04em", borderRadius:4 }}>{p.discountPercent}% OFF</span>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* Product info */}
// //                 <div style={{ padding:"13px 14px" }}>
// //                   {/* Category tag */}
// //                   <span style={{ display:"inline-block", padding:"2px 8px", borderRadius:4, marginBottom:6,
// //                     fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase",
// //                     background:theme==="dark"?"rgba(212,175,55,0.1)":"#FEF9ED",
// //                     color:theme==="dark"?T.gold:"#7A5C0A",
// //                     border:`1px solid ${theme==="dark"?"rgba(212,175,55,0.2)":"#E8D5A0"}` }}>
// //                     {p.category?.name || "Uncategorised"}
// //                   </span>

// //                   <h3 style={{ fontSize:14, fontWeight:700, color:T.text, marginBottom:8,
// //                     overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis", lineHeight:1.3 }}>{p.name}</h3>

// //                   {/* Price row */}
// //                   <div style={{ display:"flex", alignItems:"baseline", gap:6, marginBottom:8 }}>
// //                     <span style={{ fontFamily:SERIF, fontSize:17, fontWeight:700, color:T.text }}>
// //                       ₹{p.price?.toLocaleString("en-IN")}
// //                     </span>
// //                     {p.originalPrice && p.originalPrice > p.price && (
// //                       <span style={{ fontSize:12, color:T.dim, textDecoration:"line-through" }}>
// //                         ₹{p.originalPrice?.toLocaleString("en-IN")}
// //                       </span>
// //                     )}
// //                   </div>

// //                   {/* Stock pill */}
// //                   <div style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"3px 9px",
// //                     borderRadius:20, marginBottom:10,
// //                     background:p.stockQuantity>0?T.greenBg:T.dangerBg,
// //                     border:`1.5px solid ${p.stockQuantity>0?T.greenBorder:T.dangerBorder}` }}>
// //                     <div style={{ width:5, height:5, borderRadius:"50%",
// //                       background:p.stockQuantity>0?T.green:T.danger }}/>
// //                     <span style={{ fontSize:11, fontWeight:600, color:p.stockQuantity>0?T.green:T.danger }}>
// //                       {p.stockQuantity>0 ? `${p.stockQuantity} in stock` : "Out of stock"}
// //                     </span>
// //                   </div>

// //                   {/* Attribute chips */}
// //                   {(p.colour||p.size||p.gender) && (
// //                     <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginBottom:10 }}>
// //                       {[p.colour,p.size,p.gender].filter(Boolean).map((v,i)=>(
// //                         <span key={i} style={{ padding:"2px 7px", borderRadius:4, fontSize:10, fontWeight:600,
// //                           background:T.badgePill||T.hoverBg, border:`1px solid ${T.statBorder||T.border}`,
// //                           color:T.muted }}>
// //                           {v}
// //                         </span>
// //                       ))}
// //                     </div>
// //                   )}

// //                   {/* Action buttons */}
// //                   <div style={{ display:"grid", gridTemplateColumns:"1fr auto auto", gap:6 }}>
// //                     <button onClick={()=>openModal(p)}
// //                       style={{ padding:"8px", cursor:"pointer", fontSize:11, fontWeight:700,
// //                         letterSpacing:"0.06em", textTransform:"uppercase", fontFamily:SANS,
// //                         borderRadius:7, transition:"all 0.12s",
// //                         background:theme==="dark"?"rgba(212,175,55,0.08)":"#FEF9ED",
// //                         border:`1.5px solid ${theme==="dark"?"rgba(212,175,55,0.25)":"#C8A840"}`,
// //                         color:theme==="dark"?T.gold:"#7A5C0A" }}
// //                       onMouseEnter={e=>e.currentTarget.style.background=theme==="dark"?"rgba(212,175,55,0.16)":"#FDF0C4"}
// //                       onMouseLeave={e=>e.currentTarget.style.background=theme==="dark"?"rgba(212,175,55,0.08)":"#FEF9ED"}>
// //                       Edit
// //                     </button>
// //                     <button onClick={()=>toggleFeatured(p.id)} title={p.isFeatured?"Unfeature":"Feature"}
// //                       style={{ padding:"8px 10px", borderRadius:7, cursor:"pointer",
// //                         transition:"all 0.12s", fontSize:13,
// //                         background:p.isFeatured?(theme==="dark"?"rgba(212,175,55,0.18)":"#FEF0C4"):"transparent",
// //                         border:`1.5px solid ${theme==="dark"?"rgba(212,175,55,0.3)":"#C8A840"}`,
// //                         color:theme==="dark"?T.gold:"#7A5C0A" }}>★</button>
// //                     <button onClick={()=>handleDelete(p.id)}
// //                       style={{ padding:"8px 10px", borderRadius:7, cursor:"pointer",
// //                         display:"flex", alignItems:"center", transition:"all 0.12s",
// //                         background:T.dangerBg, border:`1.5px solid ${T.dangerBorder}`, color:T.danger }}
// //                       onMouseEnter={e=>e.currentTarget.style.background=theme==="dark"?"rgba(248,113,113,0.2)":"#FED7D7"}
// //                       onMouseLeave={e=>e.currentTarget.style.background=T.dangerBg}>
// //                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
// //                         <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
// //                       </svg>
// //                     </button>
// //                   </div>

// //                   {/* Active toggle button */}
// //                   <button onClick={()=>toggleActive(p.id)}
// //                     style={{ width:"100%", marginTop:6, padding:"7px", cursor:"pointer",
// //                       fontSize:11, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase",
// //                       fontFamily:SANS, borderRadius:7, transition:"all 0.15s", background:"transparent",
// //                       border:`1.5px solid ${p.isActive?T.greenBorder:T.dangerBorder}`,
// //                       color:p.isActive?T.green:T.danger }}>
// //                     {p.isActive ? "● Active" : "○ Inactive"}
// //                   </button>
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </div>

// //           {/* Pagination */}
// //           {totalPages > 1 && (
// //             <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:8, marginTop:28 }}>
// //               <button onClick={()=>setCurrentPage(p=>Math.max(0,p-1))} disabled={currentPage===0}
// //                 style={{ padding:"8px 16px", background:"transparent", border:`1.5px solid ${T.border}`,
// //                   color:currentPage===0?T.dim:T.text, cursor:currentPage===0?"default":"pointer",
// //                   fontSize:13, fontFamily:SANS, borderRadius:7 }}>← Prev</button>
// //               <span style={{ padding:"8px 18px", background:T.card, border:`1.5px solid ${T.statBorder||T.border}`,
// //                 color:T.text, fontSize:13, borderRadius:7, fontWeight:600 }}>
// //                 Page {currentPage+1} of {totalPages}
// //               </span>
// //               <button onClick={()=>setCurrentPage(p=>Math.min(totalPages-1,p+1))} disabled={currentPage>=totalPages-1}
// //                 style={{ padding:"8px 16px", background:"transparent", border:`1.5px solid ${T.border}`,
// //                   color:currentPage>=totalPages-1?T.dim:T.text, cursor:currentPage>=totalPages-1?"default":"pointer",
// //                   fontSize:13, fontFamily:SANS, borderRadius:7 }}>Next →</button>
// //             </div>
// //           )}
// //         </>
// //       )}

// //       {/* ── PRODUCT MODAL ── */}
// //       <AnimatePresence>
// //         {modalOpen && (
// //           <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
// //             style={{ position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"flex-start",
// //               justifyContent:"center", padding:"24px 16px",
// //               background:"rgba(0,0,0,0.55)", overflowY:"auto", backdropFilter:"blur(4px)" }}
// //             onClick={closeModal}>
// //             <motion.div initial={{scale:0.93,opacity:0,y:20}} animate={{scale:1,opacity:1,y:0}}
// //               exit={{scale:0.93,opacity:0}} transition={{type:"spring",stiffness:320,damping:28}}
// //               style={{ width:"100%", maxWidth:660, background:T.surface,
// //                 border:`1.5px solid ${T.borderHi}`, borderRadius:18, overflow:"hidden",
// //                 marginBottom:24, boxShadow:"0 24px 64px rgba(0,0,0,0.3)" }}
// //               onClick={e=>e.stopPropagation()}>

// //               {/* Modal header */}
// //               <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
// //                 padding:"20px 24px", borderBottom:`1.5px solid ${T.tableBorder}`,
// //                 background:theme==="light"?"#FAFAF8":T.surface }}>
// //                 <div>
// //                   <h2 style={{ fontFamily:SERIF, fontSize:24, fontWeight:700, color:T.text }}>
// //                     {editingProduct ? "Edit Product" : "New Product"}
// //                   </h2>
// //                   <p style={{ fontSize:13, color:T.muted, marginTop:3 }}>
// //                     {editingProduct ? "Update product information" : "Add a new item to your catalog"}
// //                   </p>
// //                 </div>
// //                 <button onClick={closeModal}
// //                   style={{ width:32, height:32, borderRadius:8, background:T.hoverBg,
// //                     border:`1.5px solid ${T.border}`, color:T.muted, cursor:"pointer",
// //                     display:"flex", alignItems:"center", justifyContent:"center" }}>
// //                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// //                     <path d="M18 6 6 18M6 6l12 12"/>
// //                   </svg>
// //                 </button>
// //               </div>

// //               {/* Tab bar */}
// //               <div style={{ display:"flex", borderBottom:`1.5px solid ${T.tableBorder}` }}>
// //                 {[{key:"basic",label:"📋 Basic Info"},{key:"attributes",label:"🏷️ Attributes & Filters"}].map(tab => (
// //                   <button key={tab.key} onClick={()=>setActiveTab(tab.key)}
// //                     style={{ flex:1, padding:"14px", background:"transparent", border:"none",
// //                       cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:SANS,
// //                       color:activeTab===tab.key?(theme==="dark"?T.gold:T.maroon):T.muted,
// //                       borderBottom:`2.5px solid ${activeTab===tab.key?(theme==="dark"?T.gold:T.maroon):"transparent"}`,
// //                       transition:"all 0.15s" }}>
// //                     {tab.label}
// //                   </button>
// //                 ))}
// //               </div>

// //               <form onSubmit={handleSubmit}>
// //                 <div style={{ padding:"22px 24px", display:"flex", flexDirection:"column", gap:16 }}>

// //                   {activeTab === "basic" && <>
// //                     {/* Name + Category */}
// //                     <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
// //                       <div>
// //                         <label style={lStyle}>Product Name *</label>
// //                         <input type="text" required {...fld("name")} placeholder="e.g. Kanjivaram Silk Saree" style={iStyle}/>
// //                       </div>
// //                       <div>
// //                         <label style={lStyle}>Category *</label>
// //                         <select required {...fld("categoryId")} style={{...iStyle, cursor:"pointer"}}>
// //                           <option value="">Select category</option>
// //                           {categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
// //                         </select>
// //                       </div>
// //                     </div>

// //                     {/* Description */}
// //                     <div>
// //                       <label style={lStyle}>Description</label>
// //                       <textarea {...fld("description")} rows={3}
// //                         placeholder="Describe the product — fabric, weave, occasion…"
// //                         style={{...iStyle, resize:"vertical"}}/>
// //                     </div>

// //                     {/* Price / MRP / Stock */}
// //                     <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
// //                       <div>
// //                         <label style={lStyle}>Sale Price (₹) *</label>
// //                         <input type="number" step="0.01" required {...fld("price")} placeholder="0.00" style={iStyle}/>
// //                       </div>
// //                       <div>
// //                         <label style={lStyle}>MRP / Original (₹)</label>
// //                         <input type="number" step="0.01" {...fld("originalPrice")} placeholder="0.00" style={iStyle}/>
// //                       </div>
// //                       <div>
// //                         <label style={lStyle}>Stock Qty *</label>
// //                         <input type="number" required {...fld("stockQuantity")} placeholder="0" style={iStyle}/>
// //                       </div>
// //                     </div>

// //                     {/* Toggles */}
// //                     <div style={{ display:"flex", gap:12 }}>
// //                       {[
// //                         { label:"★ Featured", sublabel:"Shown in featured section", key:"isFeatured", color:theme==="dark"?T.gold:"#7A5C0A", bg:theme==="dark"?"rgba(212,175,55,0.06)":"#FEF9ED", bd:theme==="dark"?"rgba(212,175,55,0.2)":"#C8A840" },
// //                         { label:"Active", sublabel:"Visible to customers", key:"isActive", color:T.green, bg:T.greenBg, bd:T.greenBorder },
// //                       ].map(t => (
// //                         <label key={t.key} style={{ flex:1, display:"flex", alignItems:"center", gap:12,
// //                           padding:"12px 14px", background:t.bg, border:`1.5px solid ${t.bd}`, borderRadius:8, cursor:"pointer" }}>
// //                           <div style={{ position:"relative", width:36, height:20, flexShrink:0 }}
// //                             onClick={()=>setForm({...form,[t.key]:!form[t.key]})}>
// //                             <div style={{ width:36, height:20, borderRadius:10,
// //                               background:form[t.key]?t.color:"rgba(128,128,128,0.25)", transition:"background 0.2s" }}/>
// //                             <div style={{ position:"absolute", top:2, left:form[t.key]?18:2, width:16, height:16,
// //                               borderRadius:"50%", background:"white", transition:"left 0.2s",
// //                               boxShadow:"0 1px 3px rgba(0,0,0,0.25)" }}/>
// //                           </div>
// //                           <div>
// //                             <p style={{ fontSize:13, fontWeight:700, color:t.color }}>{t.label}</p>
// //                             <p style={{ fontSize:11, color:T.muted }}>{t.sublabel}</p>
// //                           </div>
// //                         </label>
// //                       ))}
// //                     </div>
// //                   </>}

// //                   {activeTab === "attributes" && <>
// //                     <div style={{ padding:"12px 14px", borderRadius:8,
// //                       background:theme==="dark"?"rgba(212,175,55,0.05)":"#FEF9ED",
// //                       border:`1.5px solid ${theme==="dark"?"rgba(212,175,55,0.15)":"#E8D5A0"}` }}>
// //                       <p style={{ fontSize:13, color:T.muted, lineHeight:1.5 }}>
// //                         These attributes power the sidebar filters on your store. Fill them to improve discoverability.
// //                       </p>
// //                     </div>

// //                     <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
// //                       <div>
// //                         <label style={lStyle}>Colour</label>
// //                         <select {...fld("colour")} style={{...iStyle, cursor:"pointer"}}>
// //                           <option value="">Select</option>
// //                           {["Black","White","Red","Navy Blue","Blue","Green","Pink","Yellow","Orange","Purple","Brown","Grey","Maroon","Gold","Cream","Multi-colour"].map(c=><option key={c}>{c}</option>)}
// //                         </select>
// //                       </div>
// //                       <div>
// //                         <label style={lStyle}>Gender</label>
// //                         <select {...fld("gender")} style={{...iStyle, cursor:"pointer"}}>
// //                           <option value="">Select</option>
// //                           {["Women","Men","Kids","Unisex"].map(g=><option key={g}>{g}</option>)}
// //                         </select>
// //                       </div>
// //                       <div>
// //                         <label style={lStyle}>Size</label>
// //                         <select {...fld("size")} style={{...iStyle, cursor:"pointer"}}>
// //                           <option value="">Select</option>
// //                           {["Free Size","XS","S","M","L","XL","XXL","XS-XL","S-XL"].map(s=><option key={s}>{s}</option>)}
// //                         </select>
// //                       </div>
// //                       <div>
// //                         <label style={lStyle}>Fabric / Material</label>
// //                         <select {...fld("fabric")} style={{...iStyle, cursor:"pointer"}}>
// //                           <option value="">Select</option>
// //                           {["Pure Silk","Kanjivaram Silk","Banarasi Silk","Tussar Silk","Chanderi","Cotton","Cotton Silk","Georgette","Chiffon","Linen","Polyester","Crepe"].map(f=><option key={f}>{f}</option>)}
// //                         </select>
// //                       </div>
// //                       <div>
// //                         <label style={lStyle}>Occasion</label>
// //                         <select {...fld("occasion")} style={{...iStyle, cursor:"pointer"}}>
// //                           <option value="">Select</option>
// //                           {["Wedding","Festival","Casual","Party","Office","Daily Wear","Traditional","Formal"].map(o=><option key={o}>{o}</option>)}
// //                         </select>
// //                       </div>
// //                     </div>

// //                     {/* Live preview chips */}
// //                     <div style={{ padding:"14px", borderRadius:9,
// //                       background:T.cardAlt||T.hoverBg, border:`1.5px solid ${T.statBorder||T.border}` }}>
// //                       <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase",
// //                         color:T.muted, marginBottom:10 }}>Attribute Preview</p>
// //                       <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
// //                         {[{v:form.colour,e:"🎨"},{v:form.gender,e:"👤"},{v:form.size,e:"📐"},{v:form.fabric,e:"🧵"},{v:form.occasion,e:"✨"}]
// //                           .filter(a=>a.v).map((a,i)=>(
// //                           <span key={i} style={{ padding:"5px 12px", borderRadius:20, fontSize:12, fontWeight:600,
// //                             background:theme==="dark"?"rgba(212,175,55,0.1)":"#FEF9ED",
// //                             border:`1.5px solid ${theme==="dark"?"rgba(212,175,55,0.25)":"#C8A840"}`,
// //                             color:theme==="dark"?T.gold:"#7A5C0A" }}>
// //                             {a.e} {a.v}
// //                           </span>
// //                         ))}
// //                         {!form.colour&&!form.gender&&!form.size&&!form.fabric&&!form.occasion && (
// //                           <span style={{ fontSize:13, color:T.dim, fontStyle:"italic" }}>No attributes selected yet</span>
// //                         )}
// //                       </div>
// //                     </div>
// //                   </>}
// //                 </div>

// //                 {/* Modal footer */}
// //                 <div style={{ display:"flex", gap:10, padding:"16px 24px",
// //                   borderTop:`1.5px solid ${T.tableBorder}`,
// //                   background:theme==="light"?"#FAFAF8":T.surface }}>
// //                   <button type="button" onClick={closeModal}
// //                     style={{ flex:1, padding:"12px", background:"transparent",
// //                       border:`1.5px solid ${T.border}`, color:T.muted, cursor:"pointer",
// //                       fontSize:13, fontWeight:600, fontFamily:SANS, borderRadius:8 }}>
// //                     Cancel
// //                   </button>
// //                   {activeTab==="basic" && (
// //                     <button type="button" onClick={()=>setActiveTab("attributes")}
// //                       style={{ flex:1, padding:"12px", cursor:"pointer", fontSize:13, fontWeight:600,
// //                         fontFamily:SANS, borderRadius:8, transition:"all 0.15s",
// //                         background:theme==="dark"?"rgba(212,175,55,0.08)":"#FEF9ED",
// //                         border:`1.5px solid ${theme==="dark"?"rgba(212,175,55,0.3)":"#C8A840"}`,
// //                         color:theme==="dark"?T.gold:"#7A5C0A" }}>
// //                       Attributes & Filters →
// //                     </button>
// //                   )}
// //                   <button type="submit" disabled={saving}
// //                     style={{ flex:2, padding:"12px", background:T.maroon, color:"#FFFFF0", border:"none",
// //                       cursor:saving?"wait":"pointer", fontSize:13, fontWeight:700, fontFamily:SANS,
// //                       borderRadius:8, opacity:saving?0.7:1, transition:"opacity 0.15s",
// //                       boxShadow:theme==="light"?"0 2px 8px rgba(128,0,0,0.3)":"none" }}>
// //                     {saving ? "Saving…" : editingProduct ? "Update Product" : "Create Product"}
// //                   </button>
// //                 </div>
// //               </form>
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
// //         .p-card { transition: transform 0.18s, box-shadow 0.18s !important; }
// //         .p-card:hover { transform: translateY(-3px); box-shadow: ${T.shadowMd} !important; }
// //         .p-card:hover .p-overlay { opacity: 1 !important; }
// //         .p-card:hover .p-img     { transform: scale(1.05) !important; }
// //         @keyframes fadeInOut { 0%,100%{opacity:0.5} 50%{opacity:0.25} }
// //         @keyframes spin { to { transform: rotate(360deg); } }
// //       `}</style>
// //     </div>
// //   );
// // }



// // // import { useState, useEffect } from "react";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import { adminAPI } from "../../api";

// // // export default function AdminProducts() {
// // //   const [products, setProducts] = useState([]);
// // //   const [categories, setCategories] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [modalOpen, setModalOpen] = useState(false);
// // //   const [editingProduct, setEditingProduct] = useState(null);
// // //   const [form, setForm] = useState({
// // //     name: "",
// // //     description: "",
// // //     price: "",
// // //     originalPrice: "",
// // //     discountPercent: 0,
// // //     stockQuantity: 0,
// // //     categoryId: "",
// // //     isFeatured: false,
// // //     isActive: true,
// // //   });
// // //   const [uploadingImage, setUploadingImage] = useState(null);
// // //   const [currentPage, setCurrentPage] = useState(0);
// // //   const [totalPages, setTotalPages] = useState(0);
// // //   const [searchQuery, setSearchQuery] = useState("");

// // //   useEffect(() => {
// // //     fetchProducts();
// // //     fetchCategories();
// // //   }, [currentPage, searchQuery]);

// // //   const fetchProducts = async () => {
// // //     try {
// // //       const data = await adminAPI.getAllProducts(currentPage, 20, searchQuery);
// // //       setProducts(data.content || []);
// // //       setTotalPages(data.totalPages || 0);
// // //     } catch (err) {
// // //       console.error("Failed to fetch products", err);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const fetchCategories = async () => {
// // //     try {
// // //       const data = await adminAPI.getAllCategories();
// // //       setCategories(data);
// // //     } catch (err) {
// // //       console.error("Failed to fetch categories", err);
// // //     }
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);
// // //     try {
// // //       const payload = {
// // //         ...form,
// // //         price: parseFloat(form.price),
// // //         originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
// // //         discountPercent: parseInt(form.discountPercent) || 0,
// // //         stockQuantity: parseInt(form.stockQuantity) || 0,
// // //         categoryId: parseInt(form.categoryId),
// // //       };

// // //       if (editingProduct) {
// // //         await adminAPI.updateProduct(editingProduct.id, payload);
// // //       } else {
// // //         await adminAPI.createProduct(payload);
// // //       }
// // //       fetchProducts();
// // //       closeModal();
// // //     } catch (err) {
// // //       alert(err.response?.data?.message || "Failed to save product");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleImageUpload = async (productId, file) => {
// // //     setUploadingImage(productId);
// // //     try {
// // //       await adminAPI.uploadProductImage(productId, file);
// // //       fetchProducts();
// // //     } catch (err) {
// // //       alert("Image upload failed");
// // //     } finally {
// // //       setUploadingImage(null);
// // //     }
// // //   };

// // //   const handleDelete = async (id) => {
// // //     if (!confirm("Delete this product?")) return;
// // //     try {
// // //       await adminAPI.deleteProduct(id);
// // //       fetchProducts();
// // //     } catch (err) {
// // //       alert("Failed to delete product");
// // //     }
// // //   };

// // //   const toggleFeatured = async (id) => {
// // //     try {
// // //       await adminAPI.toggleFeatured(id);
// // //       fetchProducts();
// // //     } catch (err) {
// // //       alert("Failed to toggle featured status");
// // //     }
// // //   };

// // //   const toggleActive = async (id) => {
// // //     try {
// // //       await adminAPI.toggleActive(id);
// // //       fetchProducts();
// // //     } catch (err) {
// // //       alert("Failed to toggle active status");
// // //     }
// // //   };

// // //   const openModal = (product = null) => {
// // //     if (product) {
// // //       setEditingProduct(product);
// // //       setForm({
// // //         name: product.name,
// // //         description: product.description || "",
// // //         price: product.price.toString(),
// // //         originalPrice: product.originalPrice?.toString() || "",
// // //         discountPercent: product.discountPercent || 0,
// // //         stockQuantity: product.stockQuantity || 0,
// // //         categoryId: product.category?.id?.toString() || "",
// // //         isFeatured: product.isFeatured || false,
// // //         isActive: product.isActive !== false,
// // //       });
// // //     } else {
// // //       setEditingProduct(null);
// // //       setForm({
// // //         name: "",
// // //         description: "",
// // //         price: "",
// // //         originalPrice: "",
// // //         discountPercent: 0,
// // //         stockQuantity: 0,
// // //         categoryId: "",
// // //         isFeatured: false,
// // //         isActive: true,
// // //       });
// // //     }
// // //     setModalOpen(true);
// // //   };

// // //   const closeModal = () => {
// // //     setModalOpen(false);
// // //     setEditingProduct(null);
// // //   };

// // //   return (
// // //     <div style={{ fontFamily: "'Cormorant Garamond', serif" }}>
// // //       {/* Header */}
// // //       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
// // //         <div>
// // //           <h1 className="text-3xl font-bold mb-1" style={{ color: "#1A1A2E" }}>Products</h1>
// // //           <p className="text-sm" style={{ color: "#36454F" }}>Manage your product catalog</p>
// // //         </div>
// // //         <div className="flex gap-3">
// // //           <input
// // //             type="text"
// // //             placeholder="Search products..."
// // //             value={searchQuery}
// // //             onChange={(e) => setSearchQuery(e.target.value)}
// // //             className="px-4 py-2 text-sm outline-none"
// // //             style={{ border: "1px solid rgba(26,26,46,0.2)", minWidth: "200px" }}
// // //           />
// // //           <button
// // //             onClick={() => openModal()}
// // //             className="flex items-center gap-2 px-6 py-3 text-sm tracking-widest uppercase font-semibold transition-all whitespace-nowrap"
// // //             style={{ background: "#800000", color: "#FFFFF0" }}
// // //             onMouseEnter={e => e.currentTarget.style.background = "#900000"}
// // //             onMouseLeave={e => e.currentTarget.style.background = "#800000"}
// // //           >
// // //             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //               <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
// // //             </svg>
// // //             Add Product
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* Products Grid */}
// // //       {loading ? (
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // //           {[...Array(8)].map((_, i) => (
// // //             <div key={i} className="h-96 animate-pulse" style={{ background: "rgba(26,26,46,0.04)" }} />
// // //           ))}
// // //         </div>
// // //       ) : products.length === 0 ? (
// // //         <div className="text-center py-20" style={{ border: "1px dashed rgba(26,26,46,0.15)" }}>
// // //           <div className="w-16 h-16 mx-auto mb-4 opacity-20"
// // //             style={{ background: "#D4AF37", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
// // //           <p className="text-lg mb-2" style={{ color: "#36454F" }}>No products yet</p>
// // //           <p className="text-sm mb-6" style={{ color: "rgba(54,69,79,0.6)" }}>Create your first product to get started</p>
// // //           <button
// // //             onClick={() => openModal()}
// // //             className="px-6 py-3 text-sm tracking-widest uppercase"
// // //             style={{ background: "#800000", color: "#FFFFF0" }}
// // //           >
// // //             Add Product
// // //           </button>
// // //         </div>
// // //       ) : (
// // //         <>
// // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // //             {products.map((product, i) => (
// // //               <motion.div
// // //                 key={product.id}
// // //                 initial={{ opacity: 0, y: 20 }}
// // //                 animate={{ opacity: 1, y: 0 }}
// // //                 transition={{ delay: i * 0.05 }}
// // //                 className="group relative overflow-hidden"
// // //                 style={{ border: "1px solid rgba(26,26,46,0.08)", background: "white" }}
// // //               >
// // //                 {/* Image */}
// // //                 <div className="relative h-64 overflow-hidden" style={{ background: "rgba(26,26,46,0.04)" }}>
// // //                   {product.imageUrl ? (
// // //                     <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
// // //                   ) : (
// // //                     <div className="w-full h-full flex items-center justify-center">
// // //                       <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(26,26,46,0.2)" strokeWidth="1.5">
// // //                         <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
// // //                       </svg>
// // //                     </div>
// // //                   )}
// // //                   {/* Upload overlay */}
// // //                   <label className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
// // //                     style={{ background: "rgba(26,26,46,0.8)" }}>
// // //                     <input
// // //                       type="file"
// // //                       accept="image/*"
// // //                       className="hidden"
// // //                       onChange={(e) => handleImageUpload(product.id, e.target.files[0])}
// // //                       disabled={uploadingImage === product.id}
// // //                     />
// // //                     {uploadingImage === product.id ? (
// // //                       <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
// // //                         className="w-8 h-8 border-2 rounded-full" style={{ borderColor: "#D4AF37", borderTopColor: "transparent" }} />
// // //                     ) : (
// // //                       <div className="text-center">
// // //                         <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" className="mx-auto mb-2">
// // //                           <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
// // //                         </svg>
// // //                         <span className="text-xs tracking-widest uppercase" style={{ color: "#D4AF37" }}>Upload Image</span>
// // //                       </div>
// // //                     )}
// // //                   </label>
// // //                   {/* Badges */}
// // //                   <div className="absolute top-3 left-3 flex flex-col gap-1">
// // //                     {product.isFeatured && (
// // //                       <div className="px-2 py-1 text-xs tracking-widest uppercase"
// // //                         style={{ background: "rgba(212,175,55,0.9)", color: "#1A1A2E" }}>Featured</div>
// // //                     )}
// // //                     {!product.isActive && (
// // //                       <div className="px-2 py-1 text-xs tracking-widest uppercase"
// // //                         style={{ background: "rgba(128,0,0,0.9)", color: "#FFFFF0" }}>Inactive</div>
// // //                     )}
// // //                     {product.stockQuantity === 0 && (
// // //                       <div className="px-2 py-1 text-xs tracking-widest uppercase"
// // //                         style={{ background: "rgba(0,0,0,0.9)", color: "#FFFFF0" }}>Out of Stock</div>
// // //                     )}
// // //                   </div>
// // //                 </div>

// // //                 {/* Info */}
// // //                 <div className="p-4">
// // //                   <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#D4AF37" }}>
// // //                     {product.category?.name || "Uncategorized"}
// // //                   </p>
// // //                   <h3 className="text-base font-bold mb-1 line-clamp-1" style={{ color: "#1A1A2E" }}>{product.name}</h3>
// // //                   <div className="flex items-center gap-2 mb-3">
// // //                     <span className="text-lg font-bold" style={{ color: "#1A1A2E" }}>₹{product.price?.toLocaleString("en-IN")}</span>
// // //                     {product.originalPrice && product.originalPrice > product.price && (
// // //                       <span className="text-sm line-through" style={{ color: "rgba(54,69,79,0.4)" }}>
// // //                         ₹{product.originalPrice?.toLocaleString("en-IN")}
// // //                       </span>
// // //                     )}
// // //                   </div>
// // //                   <p className="text-xs mb-3" style={{ color: "#36454F" }}>Stock: {product.stockQuantity}</p>
                  
// // //                   {/* Actions */}
// // //                   <div className="flex gap-2 mb-2">
// // //                     <button
// // //                       onClick={() => openModal(product)}
// // //                       className="flex-1 px-3 py-2 text-xs tracking-widest uppercase transition-all"
// // //                       style={{ border: "1px solid rgba(26,26,46,0.2)", color: "#1A1A2E" }}
// // //                     >
// // //                       Edit
// // //                     </button>
// // //                     <button
// // //                       onClick={() => handleDelete(product.id)}
// // //                       className="px-3 py-2 text-xs tracking-widest uppercase transition-all"
// // //                       style={{ border: "1px solid rgba(128,0,0,0.2)", color: "#800000" }}
// // //                     >
// // //                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //                         <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
// // //                       </svg>
// // //                     </button>
// // //                   </div>
// // //                   <div className="flex gap-2">
// // //                     <button
// // //                       onClick={() => toggleFeatured(product.id)}
// // //                       className="flex-1 px-3 py-1.5 text-xs tracking-widest uppercase transition-all"
// // //                       style={{ 
// // //                         background: product.isFeatured ? "rgba(212,175,55,0.1)" : "transparent",
// // //                         border: "1px solid rgba(212,175,55,0.3)", 
// // //                         color: "#D4AF37" 
// // //                       }}
// // //                     >
// // //                       ★ Featured
// // //                     </button>
// // //                     <button
// // //                       onClick={() => toggleActive(product.id)}
// // //                       className="flex-1 px-3 py-1.5 text-xs tracking-widest uppercase transition-all"
// // //                       style={{ 
// // //                         background: product.isActive ? "rgba(26,26,46,0.05)" : "rgba(128,0,0,0.05)",
// // //                         border: `1px solid ${product.isActive ? "rgba(26,26,46,0.2)" : "rgba(128,0,0,0.2)"}`, 
// // //                         color: product.isActive ? "#1A1A2E" : "#800000"
// // //                       }}
// // //                     >
// // //                       {product.isActive ? "Active" : "Inactive"}
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               </motion.div>
// // //             ))}
// // //           </div>

// // //           {/* Pagination */}
// // //           {totalPages > 1 && (
// // //             <div className="flex justify-center gap-2 mt-8">
// // //               <button
// // //                 onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
// // //                 disabled={currentPage === 0}
// // //                 className="px-4 py-2 text-sm tracking-widest uppercase transition-all disabled:opacity-30"
// // //                 style={{ border: "1px solid rgba(26,26,46,0.2)", color: "#1A1A2E" }}
// // //               >
// // //                 Previous
// // //               </button>
// // //               <span className="px-4 py-2 text-sm" style={{ color: "#36454F" }}>
// // //                 Page {currentPage + 1} of {totalPages}
// // //               </span>
// // //               <button
// // //                 onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
// // //                 disabled={currentPage >= totalPages - 1}
// // //                 className="px-4 py-2 text-sm tracking-widest uppercase transition-all disabled:opacity-30"
// // //                 style={{ border: "1px solid rgba(26,26,46,0.2)", color: "#1A1A2E" }}
// // //               >
// // //                 Next
// // //               </button>
// // //             </div>
// // //           )}
// // //         </>
// // //       )}

// // //       {/* Modal */}
// // //       <AnimatePresence>
// // //         {modalOpen && (
// // //           <motion.div
// // //             initial={{ opacity: 0 }}
// // //             animate={{ opacity: 1 }}
// // //             exit={{ opacity: 0 }}
// // //             className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
// // //             style={{ background: "rgba(26,26,46,0.8)" }}
// // //             onClick={closeModal}
// // //           >
// // //             <motion.div
// // //               initial={{ scale: 0.9, opacity: 0 }}
// // //               animate={{ scale: 1, opacity: 1 }}
// // //               exit={{ scale: 0.9, opacity: 0 }}
// // //               className="w-full max-w-2xl p-6 my-8"
// // //               style={{ background: "#FFFFF0", border: "1px solid rgba(26,26,46,0.1)" }}
// // //               onClick={(e) => e.stopPropagation()}
// // //             >
// // //               <h2 className="text-2xl font-bold mb-6" style={{ color: "#1A1A2E" }}>
// // //                 {editingProduct ? "Edit Product" : "New Product"}
// // //               </h2>
// // //               <form onSubmit={handleSubmit} className="space-y-4">
// // //                 <div className="grid md:grid-cols-2 gap-4">
// // //                   <div>
// // //                     <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Product Name</label>
// // //                     <input
// // //                       type="text"
// // //                       value={form.name}
// // //                       onChange={(e) => setForm({ ...form, name: e.target.value })}
// // //                       required
// // //                       className="w-full px-4 py-3 text-base outline-none"
// // //                       style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// // //                     />
// // //                   </div>
// // //                   <div>
// // //                     <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Category</label>
// // //                     <select
// // //                       value={form.categoryId}
// // //                       onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
// // //                       required
// // //                       className="w-full px-4 py-3 text-base outline-none"
// // //                       style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// // //                     >
// // //                       <option value="">Select category</option>
// // //                       {categories.map(cat => (
// // //                         <option key={cat.id} value={cat.id}>{cat.name}</option>
// // //                       ))}
// // //                     </select>
// // //                   </div>
// // //                 </div>

// // //                 <div>
// // //                   <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Description</label>
// // //                   <textarea
// // //                     value={form.description}
// // //                     onChange={(e) => setForm({ ...form, description: e.target.value })}
// // //                     rows="3"
// // //                     className="w-full px-4 py-3 text-base outline-none"
// // //                     style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// // //                   />
// // //                 </div>

// // //                 <div className="grid md:grid-cols-3 gap-4">
// // //                   <div>
// // //                     <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Price (₹)</label>
// // //                     <input
// // //                       type="number"
// // //                       step="0.01"
// // //                       value={form.price}
// // //                       onChange={(e) => setForm({ ...form, price: e.target.value })}
// // //                       required
// // //                       className="w-full px-4 py-3 text-base outline-none"
// // //                       style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// // //                     />
// // //                   </div>
// // //                   <div>
// // //                     <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Original Price (₹)</label>
// // //                     <input
// // //                       type="number"
// // //                       step="0.01"
// // //                       value={form.originalPrice}
// // //                       onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
// // //                       className="w-full px-4 py-3 text-base outline-none"
// // //                       style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// // //                     />
// // //                   </div>
// // //                   <div>
// // //                     <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Stock Quantity</label>
// // //                     <input
// // //                       type="number"
// // //                       value={form.stockQuantity}
// // //                       onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })}
// // //                       required
// // //                       className="w-full px-4 py-3 text-base outline-none"
// // //                       style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// // //                     />
// // //                   </div>
// // //                 </div>

// // //                 <div className="flex gap-6">
// // //                   <div className="flex items-center gap-3">
// // //                     <input
// // //                       type="checkbox"
// // //                       id="isFeatured"
// // //                       checked={form.isFeatured}
// // //                       onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
// // //                       className="w-4 h-4"
// // //                     />
// // //                     <label htmlFor="isFeatured" className="text-sm" style={{ color: "#36454F" }}>Featured Product</label>
// // //                   </div>
// // //                   <div className="flex items-center gap-3">
// // //                     <input
// // //                       type="checkbox"
// // //                       id="isActive"
// // //                       checked={form.isActive}
// // //                       onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
// // //                       className="w-4 h-4"
// // //                     />
// // //                     <label htmlFor="isActive" className="text-sm" style={{ color: "#36454F" }}>Active (visible on site)</label>
// // //                   </div>
// // //                 </div>

// // //                 <div className="flex gap-3 pt-4">
// // //                   <button
// // //                     type="button"
// // //                     onClick={closeModal}
// // //                     className="flex-1 px-4 py-3 text-sm tracking-widest uppercase"
// // //                     style={{ border: "1px solid rgba(26,26,46,0.2)", color: "#1A1A2E" }}
// // //                   >
// // //                     Cancel
// // //                   </button>
// // //                   <button
// // //                     type="submit"
// // //                     disabled={loading}
// // //                     className="flex-1 px-4 py-3 text-sm tracking-widest uppercase"
// // //                     style={{ background: "#800000", color: "#FFFFF0" }}
// // //                   >
// // //                     {loading ? "Saving..." : editingProduct ? "Update" : "Create"}
// // //                   </button>
// // //                 </div>
// // //               </form>
// // //             </motion.div>
// // //           </motion.div>
// // //         )}
// // //       </AnimatePresence>
// // //     </div>
// // //   );
// // // }




// // // import { useState, useEffect } from "react";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import { adminAPI } from "../../api";

// // // const D = {
// // //   bg: "#0C0C16", card: "#14142A", border: "rgba(212,175,55,0.12)",
// // //   text: "#FFFFF0", muted: "rgba(255,255,240,0.45)", dim: "rgba(255,255,240,0.25)",
// // //   gold: "#D4AF37", red: "#800000", danger: "#E74C3C", green: "#2ECC71",
// // // };

// // // const inputStyle = {
// // //   width: "100%", padding: "11px 13px", background: "#0C0C16",
// // //   border: "1px solid rgba(212,175,55,0.18)", borderRadius: 8,
// // //   color: D.text, fontSize: 15, outline: "none", fontFamily: "inherit",
// // // };

// // // export default function AdminProducts() {
// // //   const [products, setProducts] = useState([]);
// // //   const [categories, setCategories] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [modalOpen, setModalOpen] = useState(false);
// // //   const [editingProduct, setEditingProduct] = useState(null);
// // //   const [saving, setSaving] = useState(false);
// // //   const [form, setForm] = useState({ name: "", description: "", price: "", originalPrice: "", discountPercent: 0, stockQuantity: 0, categoryId: "", isFeatured: false, isActive: true });
// // //   const [uploadingImage, setUploadingImage] = useState(null);
// // //   const [currentPage, setCurrentPage] = useState(0);
// // //   const [totalPages, setTotalPages] = useState(0);
// // //   const [searchQuery, setSearchQuery] = useState("");

// // //   useEffect(() => { fetchProducts(); fetchCategories(); }, [currentPage, searchQuery]);

// // //   const fetchProducts = async () => {
// // //     try {
// // //       const data = await adminAPI.getAllProducts(currentPage, 20, searchQuery);
// // //       setProducts(data.content || []); setTotalPages(data.totalPages || 0);
// // //     } catch (err) { console.error("Failed to fetch products", err); }
// // //     finally { setLoading(false); }
// // //   };

// // //   const fetchCategories = async () => {
// // //     try { setCategories(await adminAPI.getAllCategories()); }
// // //     catch (err) { console.error("Failed to fetch categories", err); }
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault(); setSaving(true);
// // //     try {
// // //       const payload = { ...form, price: parseFloat(form.price), originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null, discountPercent: parseInt(form.discountPercent) || 0, stockQuantity: parseInt(form.stockQuantity) || 0, categoryId: parseInt(form.categoryId) };
// // //       if (editingProduct) await adminAPI.updateProduct(editingProduct.id, payload);
// // //       else await adminAPI.createProduct(payload);
// // //       fetchProducts(); closeModal();
// // //     } catch (err) { alert(err.response?.data?.message || "Failed to save product"); }
// // //     finally { setSaving(false); }
// // //   };

// // //   const handleImageUpload = async (productId, file) => {
// // //     setUploadingImage(productId);
// // //     try { await adminAPI.uploadProductImage(productId, file); fetchProducts(); }
// // //     catch { alert("Image upload failed"); }
// // //     finally { setUploadingImage(null); }
// // //   };

// // //   const handleDelete = async (id) => {
// // //     if (!confirm("Delete this product?")) return;
// // //     try { await adminAPI.deleteProduct(id); fetchProducts(); }
// // //     catch { alert("Failed to delete product"); }
// // //   };

// // //   const toggleFeatured = async (id) => { try { await adminAPI.toggleFeatured(id); fetchProducts(); } catch { alert("Failed"); } };
// // //   const toggleActive = async (id) => { try { await adminAPI.toggleActive(id); fetchProducts(); } catch { alert("Failed"); } };

// // //   const openModal = (product = null) => {
// // //     if (product) {
// // //       setEditingProduct(product);
// // //       setForm({ name: product.name, description: product.description || "", price: product.price.toString(), originalPrice: product.originalPrice?.toString() || "", discountPercent: product.discountPercent || 0, stockQuantity: product.stockQuantity || 0, categoryId: product.category?.id?.toString() || "", isFeatured: product.isFeatured || false, isActive: product.isActive !== false });
// // //     } else {
// // //       setEditingProduct(null);
// // //       setForm({ name: "", description: "", price: "", originalPrice: "", discountPercent: 0, stockQuantity: 0, categoryId: "", isFeatured: false, isActive: true });
// // //     }
// // //     setModalOpen(true);
// // //   };
// // //   const closeModal = () => { setModalOpen(false); setEditingProduct(null); };

// // //   return (
// // //     <div style={{ fontFamily: "'Cormorant Garamond', serif", color: D.text }}>

// // //       {/* Header */}
// // //       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, gap: 16, flexWrap: "wrap" }}>
// // //         <div>
// // //           <h1 style={{ fontSize: 30, fontWeight: 700, color: D.text, marginBottom: 6 }}>Products</h1>
// // //           <p style={{ fontSize: 15, color: D.muted }}>Manage your product catalog</p>
// // //         </div>
// // //         <div style={{ display: "flex", gap: 12 }}>
// // //           <input type="text" placeholder="Search products..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
// // //             style={{ padding: "11px 16px", background: D.card, border: `1px solid ${D.border}`, borderRadius: 8, color: D.text, fontSize: 15, outline: "none", minWidth: 220 }} />
// // //           <button onClick={() => openModal()} style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 22px", background: D.red, color: D.text, border: "none", cursor: "pointer", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 6, whiteSpace: "nowrap" }}>
// // //             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
// // //             Add Product
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* Grid */}
// // //       {loading ? (
// // //         <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
// // //           {[...Array(8)].map((_, i) => <div key={i} style={{ height: 380, background: D.card, borderRadius: 14, opacity: 0.5 }} />)}
// // //         </div>
// // //       ) : products.length === 0 ? (
// // //         <div style={{ textAlign: "center", padding: "80px 20px", border: "1px dashed rgba(212,175,55,0.2)", borderRadius: 14 }}>
// // //           <div style={{ width: 64, height: 64, margin: "0 auto 20px", background: D.gold, opacity: 0.15, clipPath: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)" }} />
// // //           <p style={{ fontSize: 20, color: D.muted, marginBottom: 8 }}>No products yet</p>
// // //           <p style={{ fontSize: 15, color: D.dim, marginBottom: 24 }}>Create your first product to get started</p>
// // //           <button onClick={() => openModal()} style={{ padding: "12px 24px", background: D.red, color: D.text, border: "none", cursor: "pointer", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 6 }}>Add Product</button>
// // //         </div>
// // //       ) : (
// // //         <>
// // //           <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
// // //             {products.map((product, i) => (
// // //               <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
// // //                 className="prod-card"
// // //                 style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 14, overflow: "hidden", position: "relative" }}>

// // //                 {/* Image */}
// // //                 <div className="prod-img-wrap" style={{ position: "relative", height: 220, background: "#0C0C16", overflow: "hidden" }}>
// // //                   {product.imageUrl
// // //                     ? <img src={product.imageUrl} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
// // //                     : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
// // //                         <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,55,0.15)" strokeWidth="1.2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
// // //                       </div>
// // //                   }
// // //                   <label className="prod-overlay" style={{ position: "absolute", inset: 0, background: "rgba(12,12,22,0.85)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: 0, transition: "opacity 0.2s" }}>
// // //                     <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => handleImageUpload(product.id, e.target.files[0])} disabled={uploadingImage === product.id} />
// // //                     {uploadingImage === product.id
// // //                       ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ width: 30, height: 30, border: `2px solid ${D.gold}`, borderTopColor: "transparent", borderRadius: "50%" }} />
// // //                       : <div style={{ textAlign: "center" }}>
// // //                           <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={D.gold} strokeWidth="1.5" style={{ display: "block", margin: "0 auto 6px" }}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
// // //                           <span style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: D.gold }}>Upload</span>
// // //                         </div>
// // //                     }
// // //                   </label>
// // //                   {/* Badges */}
// // //                   <div style={{ position: "absolute", top: 10, left: 10, display: "flex", flexDirection: "column", gap: 4 }}>
// // //                     {product.isFeatured && <span style={{ padding: "3px 9px", background: "rgba(212,175,55,0.92)", color: "#1A1A2E", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 4, fontWeight: 700 }}>Featured</span>}
// // //                     {!product.isActive && <span style={{ padding: "3px 9px", background: "rgba(231,76,60,0.92)", color: "#fff", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 4 }}>Inactive</span>}
// // //                     {product.stockQuantity === 0 && <span style={{ padding: "3px 9px", background: "rgba(0,0,0,0.85)", color: "#fff", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 4 }}>Out of Stock</span>}
// // //                   </div>
// // //                 </div>

// // //                 {/* Info */}
// // //                 <div style={{ padding: "14px 16px" }}>
// // //                   <p style={{ fontSize: 11, color: D.gold, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 5 }}>{product.category?.name || "Uncategorized"}</p>
// // //                   <h3 style={{ fontSize: 16, fontWeight: 700, color: D.text, marginBottom: 8, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{product.name}</h3>
// // //                   <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
// // //                     <span style={{ fontSize: 18, fontWeight: 700, color: D.text }}>₹{product.price?.toLocaleString("en-IN")}</span>
// // //                     {product.originalPrice && product.originalPrice > product.price && (
// // //                       <span style={{ fontSize: 13, color: D.dim, textDecoration: "line-through" }}>₹{product.originalPrice?.toLocaleString("en-IN")}</span>
// // //                     )}
// // //                   </div>
// // //                   <p style={{ fontSize: 13, color: D.muted, marginBottom: 12 }}>Stock: {product.stockQuantity}</p>

// // //                   <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
// // //                     <button onClick={() => openModal(product)} style={{ flex: 1, padding: "9px", background: "rgba(212,175,55,0.08)", border: `1px solid rgba(212,175,55,0.2)`, color: D.gold, cursor: "pointer", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 6 }}>Edit</button>
// // //                     <button onClick={() => handleDelete(product.id)} style={{ padding: "9px 13px", background: "rgba(231,76,60,0.08)", border: `1px solid rgba(231,76,60,0.2)`, color: D.danger, cursor: "pointer", borderRadius: 6 }}>
// // //                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
// // //                     </button>
// // //                   </div>
// // //                   <div style={{ display: "flex", gap: 8 }}>
// // //                     <button onClick={() => toggleFeatured(product.id)} style={{ flex: 1, padding: "8px 6px", background: product.isFeatured ? "rgba(212,175,55,0.14)" : "transparent", border: `1px solid rgba(212,175,55,0.25)`, color: D.gold, cursor: "pointer", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 6 }}>★ {product.isFeatured ? "Featured" : "Feature"}</button>
// // //                     <button onClick={() => toggleActive(product.id)} style={{ flex: 1, padding: "8px 6px", background: product.isActive ? "rgba(46,204,113,0.08)" : "rgba(231,76,60,0.08)", border: `1px solid ${product.isActive ? "rgba(46,204,113,0.25)" : "rgba(231,76,60,0.25)"}`, color: product.isActive ? D.green : D.danger, cursor: "pointer", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 6 }}>
// // //                       {product.isActive ? "Active" : "Inactive"}
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               </motion.div>
// // //             ))}
// // //           </div>

// // //           {/* Pagination */}
// // //           {totalPages > 1 && (
// // //             <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginTop: 32 }}>
// // //               <button onClick={() => setCurrentPage(p => Math.max(0, p - 1))} disabled={currentPage === 0}
// // //                 style={{ padding: "10px 20px", background: D.card, border: `1px solid ${D.border}`, color: currentPage === 0 ? D.dim : D.text, cursor: currentPage === 0 ? "not-allowed" : "pointer", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 6, opacity: currentPage === 0 ? 0.4 : 1 }}>Previous</button>
// // //               <span style={{ fontSize: 15, color: D.muted }}>Page {currentPage + 1} of {totalPages}</span>
// // //               <button onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))} disabled={currentPage >= totalPages - 1}
// // //                 style={{ padding: "10px 20px", background: D.card, border: `1px solid ${D.border}`, color: currentPage >= totalPages - 1 ? D.dim : D.text, cursor: currentPage >= totalPages - 1 ? "not-allowed" : "pointer", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 6, opacity: currentPage >= totalPages - 1 ? 0.4 : 1 }}>Next</button>
// // //             </div>
// // //           )}
// // //         </>
// // //       )}

// // //       {/* Modal */}
// // //       <AnimatePresence>
// // //         {modalOpen && (
// // //           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
// // //             style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, background: "rgba(12,12,22,0.9)", overflowY: "auto" }}
// // //             onClick={closeModal}>
// // //             <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
// // //               style={{ width: "100%", maxWidth: 620, background: "#10101C", border: `1px solid ${D.border}`, borderRadius: 16, padding: "28px 28px", margin: "auto" }}
// // //               onClick={e => e.stopPropagation()}>

// // //               <h2 style={{ fontSize: 26, fontWeight: 700, color: D.text, marginBottom: 24 }}>
// // //                 {editingProduct ? "Edit Product" : "New Product"}
// // //               </h2>

// // //               <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
// // //                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
// // //                   <div>
// // //                     <label style={{ display: "block", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: D.muted, marginBottom: 8 }}>Product Name</label>
// // //                     <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required style={inputStyle} placeholder="e.g. Kanjivaram Silk Saree" />
// // //                   </div>
// // //                   <div>
// // //                     <label style={{ display: "block", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: D.muted, marginBottom: 8 }}>Category</label>
// // //                     <select value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })} required style={{ ...inputStyle, cursor: "pointer" }}>
// // //                       <option value="">Select category</option>
// // //                       {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
// // //                     </select>
// // //                   </div>
// // //                 </div>

// // //                 <div>
// // //                   <label style={{ display: "block", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: D.muted, marginBottom: 8 }}>Description</label>
// // //                   <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} style={{ ...inputStyle, resize: "vertical" }} placeholder="Product details, fabric type, occasion..." />
// // //                 </div>

// // //                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
// // //                   <div>
// // //                     <label style={{ display: "block", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: D.muted, marginBottom: 8 }}>Price (₹)</label>
// // //                     <input type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required style={inputStyle} placeholder="0.00" />
// // //                   </div>
// // //                   <div>
// // //                     <label style={{ display: "block", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: D.muted, marginBottom: 8 }}>Original Price (₹)</label>
// // //                     <input type="number" step="0.01" value={form.originalPrice} onChange={e => setForm({ ...form, originalPrice: e.target.value })} style={inputStyle} placeholder="Before discount" />
// // //                   </div>
// // //                   <div>
// // //                     <label style={{ display: "block", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: D.muted, marginBottom: 8 }}>Stock Qty</label>
// // //                     <input type="number" value={form.stockQuantity} onChange={e => setForm({ ...form, stockQuantity: e.target.value })} required style={inputStyle} placeholder="0" />
// // //                   </div>
// // //                 </div>

// // //                 <div style={{ display: "flex", gap: 14 }}>
// // //                   {[
// // //                     { id: "isFeatured", label: "Featured Product", key: "isFeatured" },
// // //                     { id: "isActive2", label: "Active (visible on site)", key: "isActive" },
// // //                   ].map(({ id, label, key }) => (
// // //                     <div key={id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.12)", borderRadius: 8, cursor: "pointer" }} onClick={() => setForm({ ...form, [key]: !form[key] })}>
// // //                       <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${form[key] ? D.gold : "rgba(255,255,240,0.2)"}`, background: form[key] ? D.gold : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
// // //                         {form[key] && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
// // //                       </div>
// // //                       <label style={{ fontSize: 14, color: D.muted, cursor: "pointer" }}>{label}</label>
// // //                     </div>
// // //                   ))}
// // //                 </div>

// // //                 <div style={{ display: "flex", gap: 12, paddingTop: 6 }}>
// // //                   <button type="button" onClick={closeModal} style={{ flex: 1, padding: "13px", background: "transparent", border: "1px solid rgba(255,255,240,0.15)", color: D.muted, cursor: "pointer", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 8 }}>Cancel</button>
// // //                   <button type="submit" disabled={saving} style={{ flex: 1, padding: "13px", background: D.red, color: D.text, border: "none", cursor: "pointer", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 8, opacity: saving ? 0.7 : 1 }}>
// // //                     {saving ? "Saving..." : editingProduct ? "Update" : "Create"}
// // //                   </button>
// // //                 </div>
// // //               </form>
// // //             </motion.div>
// // //           </motion.div>
// // //         )}
// // //       </AnimatePresence>

// // //       <style>{`
// // //         .prod-card:hover .prod-overlay { opacity: 1 !important; }
// // //         input::placeholder, textarea::placeholder { color: rgba(255,255,240,0.2); }
// // //         select option { background: #14142A; color: #FFFFF0; }
// // //         input[type=number]::-webkit-inner-spin-button { opacity: 0.3; }
// // //       `}</style>
// // //     </div>
// // //   );
// // // }



// // // import { useState, useEffect } from "react";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import { adminAPI } from "../../api";

// // // export default function AdminProducts() {
// // //   const [products, setProducts] = useState([]);
// // //   const [categories, setCategories] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [modalOpen, setModalOpen] = useState(false);
// // //   const [editingProduct, setEditingProduct] = useState(null);
// // //   const [form, setForm] = useState({
// // //     name: "",
// // //     description: "",
// // //     price: "",
// // //     originalPrice: "",
// // //     discountPercent: 0,
// // //     stockQuantity: 0,
// // //     categoryId: "",
// // //     isFeatured: false,
// // //     isActive: true,
// // //     colour: "",
// // //     size: "",
// // //     gender: "",
// // //     fabric: "",
// // //     occasion: "",
// // //   });
// // //   const [uploadingImage, setUploadingImage] = useState(null);
// // //   const [currentPage, setCurrentPage] = useState(0);
// // //   const [totalPages, setTotalPages] = useState(0);
// // //   const [searchQuery, setSearchQuery] = useState("");

// // //   useEffect(() => {
// // //     fetchProducts();
// // //     fetchCategories();
// // //   }, [currentPage, searchQuery]);

// // //   const fetchProducts = async () => {
// // //     try {
// // //       const data = await adminAPI.getAllProducts(currentPage, 20, searchQuery);
// // //       setProducts(data.content || []);
// // //       setTotalPages(data.totalPages || 0);
// // //     } catch (err) {
// // //       console.error("Failed to fetch products", err);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const fetchCategories = async () => {
// // //     try {
// // //       const data = await adminAPI.getAllCategories();
// // //       setCategories(data);
// // //     } catch (err) {
// // //       console.error("Failed to fetch categories", err);
// // //     }
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);
// // //     try {
// // //       const payload = {
// // //         ...form,
// // //         price: parseFloat(form.price),
// // //         originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
// // //         discountPercent: parseInt(form.discountPercent) || 0,
// // //         stockQuantity: parseInt(form.stockQuantity) || 0,
// // //         categoryId: parseInt(form.categoryId),
// // //       };

// // //       if (editingProduct) {
// // //         await adminAPI.updateProduct(editingProduct.id, payload);
// // //       } else {
// // //         await adminAPI.createProduct(payload);
// // //       }
// // //       fetchProducts();
// // //       closeModal();
// // //     } catch (err) {
// // //       alert(err.response?.data?.message || "Failed to save product");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleImageUpload = async (productId, file) => {
// // //     setUploadingImage(productId);
// // //     try {
// // //       await adminAPI.uploadProductImage(productId, file);
// // //       fetchProducts();
// // //     } catch (err) {
// // //       alert("Image upload failed");
// // //     } finally {
// // //       setUploadingImage(null);
// // //     }
// // //   };

// // //   const handleDelete = async (id) => {
// // //     if (!confirm("Delete this product?")) return;
// // //     try {
// // //       await adminAPI.deleteProduct(id);
// // //       fetchProducts();
// // //     } catch (err) {
// // //       alert("Failed to delete product");
// // //     }
// // //   };

// // //   const toggleFeatured = async (id) => {
// // //     try {
// // //       await adminAPI.toggleFeatured(id);
// // //       fetchProducts();
// // //     } catch (err) {
// // //       alert("Failed to toggle featured status");
// // //     }
// // //   };

// // //   const toggleActive = async (id) => {
// // //     try {
// // //       await adminAPI.toggleActive(id);
// // //       fetchProducts();
// // //     } catch (err) {
// // //       alert("Failed to toggle active status");
// // //     }
// // //   };

// // //   const openModal = (product = null) => {
// // //     if (product) {
// // //       setEditingProduct(product);
// // //       setForm({
// // //         name: product.name,
// // //         description: product.description || "",
// // //         price: product.price.toString(),
// // //         originalPrice: product.originalPrice?.toString() || "",
// // //         discountPercent: product.discountPercent || 0,
// // //         stockQuantity: product.stockQuantity || 0,
// // //         categoryId: product.category?.id?.toString() || "",
// // //         isFeatured: product.isFeatured || false,
// // //         isActive: product.isActive !== false,
// // //       });
// // //     } else {
// // //       setEditingProduct(null);
// // //       setForm({
// // //         name: "",
// // //         description: "",
// // //         price: "",
// // //         originalPrice: "",
// // //         discountPercent: 0,
// // //         stockQuantity: 0,
// // //         categoryId: "",
// // //         isFeatured: false,
// // //         isActive: true,
// // //       });
// // //     }
// // //     setModalOpen(true);
// // //   };

// // //   const closeModal = () => {
// // //     setModalOpen(false);
// // //     setEditingProduct(null);
// // //   };

// // //   return (
// // //     <div style={{ fontFamily: "'Cormorant Garamond', serif" }}>
// // //       {/* Header */}
// // //       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
// // //         <div>
// // //           <h1 className="text-3xl font-bold mb-1" style={{ color: "#1A1A2E" }}>Products</h1>
// // //           <p className="text-sm" style={{ color: "#36454F" }}>Manage your product catalog</p>
// // //         </div>
// // //         <div className="flex gap-3">
// // //           <input
// // //             type="text"
// // //             placeholder="Search products..."
// // //             value={searchQuery}
// // //             onChange={(e) => setSearchQuery(e.target.value)}
// // //             className="px-4 py-2 text-sm outline-none"
// // //             style={{ border: "1px solid rgba(26,26,46,0.2)", minWidth: "200px" }}
// // //           />
// // //           <button
// // //             onClick={() => openModal()}
// // //             className="flex items-center gap-2 px-6 py-3 text-sm tracking-widest uppercase font-semibold transition-all whitespace-nowrap"
// // //             style={{ background: "#800000", color: "#FFFFF0" }}
// // //             onMouseEnter={e => e.currentTarget.style.background = "#900000"}
// // //             onMouseLeave={e => e.currentTarget.style.background = "#800000"}
// // //           >
// // //             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //               <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
// // //             </svg>
// // //             Add Product
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* Products Grid */}
// // //       {loading ? (
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // //           {[...Array(8)].map((_, i) => (
// // //             <div key={i} className="h-96 animate-pulse" style={{ background: "rgba(26,26,46,0.04)" }} />
// // //           ))}
// // //         </div>
// // //       ) : products.length === 0 ? (
// // //         <div className="text-center py-20" style={{ border: "1px dashed rgba(26,26,46,0.15)" }}>
// // //           <div className="w-16 h-16 mx-auto mb-4 opacity-20"
// // //             style={{ background: "#D4AF37", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
// // //           <p className="text-lg mb-2" style={{ color: "#36454F" }}>No products yet</p>
// // //           <p className="text-sm mb-6" style={{ color: "rgba(54,69,79,0.6)" }}>Create your first product to get started</p>
// // //           <button
// // //             onClick={() => openModal()}
// // //             className="px-6 py-3 text-sm tracking-widest uppercase"
// // //             style={{ background: "#800000", color: "#FFFFF0" }}
// // //           >
// // //             Add Product
// // //           </button>
// // //         </div>
// // //       ) : (
// // //         <>
// // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // //             {products.map((product, i) => (
// // //               <motion.div
// // //                 key={product.id}
// // //                 initial={{ opacity: 0, y: 20 }}
// // //                 animate={{ opacity: 1, y: 0 }}
// // //                 transition={{ delay: i * 0.05 }}
// // //                 className="group relative overflow-hidden"
// // //                 style={{ border: "1px solid rgba(26,26,46,0.08)", background: "white" }}
// // //               >
// // //                 {/* Image */}
// // //                 <div className="relative h-64 overflow-hidden" style={{ background: "rgba(26,26,46,0.04)" }}>
// // //                   {product.imageUrl ? (
// // //                     <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
// // //                   ) : (
// // //                     <div className="w-full h-full flex items-center justify-center">
// // //                       <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(26,26,46,0.2)" strokeWidth="1.5">
// // //                         <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
// // //                       </svg>
// // //                     </div>
// // //                   )}
// // //                   {/* Upload overlay */}
// // //                   <label className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
// // //                     style={{ background: "rgba(26,26,46,0.8)" }}>
// // //                     <input
// // //                       type="file"
// // //                       accept="image/*"
// // //                       className="hidden"
// // //                       onChange={(e) => handleImageUpload(product.id, e.target.files[0])}
// // //                       disabled={uploadingImage === product.id}
// // //                     />
// // //                     {uploadingImage === product.id ? (
// // //                       <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
// // //                         className="w-8 h-8 border-2 rounded-full" style={{ borderColor: "#D4AF37", borderTopColor: "transparent" }} />
// // //                     ) : (
// // //                       <div className="text-center">
// // //                         <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" className="mx-auto mb-2">
// // //                           <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
// // //                         </svg>
// // //                         <span className="text-xs tracking-widest uppercase" style={{ color: "#D4AF37" }}>Upload Image</span>
// // //                       </div>
// // //                     )}
// // //                   </label>
// // //                   {/* Badges */}
// // //                   <div className="absolute top-3 left-3 flex flex-col gap-1">
// // //                     {product.isFeatured && (
// // //                       <div className="px-2 py-1 text-xs tracking-widest uppercase"
// // //                         style={{ background: "rgba(212,175,55,0.9)", color: "#1A1A2E" }}>Featured</div>
// // //                     )}
// // //                     {!product.isActive && (
// // //                       <div className="px-2 py-1 text-xs tracking-widest uppercase"
// // //                         style={{ background: "rgba(128,0,0,0.9)", color: "#FFFFF0" }}>Inactive</div>
// // //                     )}
// // //                     {product.stockQuantity === 0 && (
// // //                       <div className="px-2 py-1 text-xs tracking-widest uppercase"
// // //                         style={{ background: "rgba(0,0,0,0.9)", color: "#FFFFF0" }}>Out of Stock</div>
// // //                     )}
// // //                   </div>
// // //                 </div>

// // //                 {/* Info */}
// // //                 <div className="p-4">
// // //                   <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#D4AF37" }}>
// // //                     {product.category?.name || "Uncategorized"}
// // //                   </p>
// // //                   <h3 className="text-base font-bold mb-1 line-clamp-1" style={{ color: "#1A1A2E" }}>{product.name}</h3>
// // //                   <div className="flex items-center gap-2 mb-3">
// // //                     <span className="text-lg font-bold" style={{ color: "#1A1A2E" }}>₹{product.price?.toLocaleString("en-IN")}</span>
// // //                     {product.originalPrice && product.originalPrice > product.price && (
// // //                       <span className="text-sm line-through" style={{ color: "rgba(54,69,79,0.4)" }}>
// // //                         ₹{product.originalPrice?.toLocaleString("en-IN")}
// // //                       </span>
// // //                     )}
// // //                   </div>
// // //                   <p className="text-xs mb-3" style={{ color: "#36454F" }}>Stock: {product.stockQuantity}</p>
                  
// // //                   {/* Actions */}
// // //                   <div className="flex gap-2 mb-2">
// // //                     <button
// // //                       onClick={() => openModal(product)}
// // //                       className="flex-1 px-3 py-2 text-xs tracking-widest uppercase transition-all"
// // //                       style={{ border: "1px solid rgba(26,26,46,0.2)", color: "#1A1A2E" }}
// // //                     >
// // //                       Edit
// // //                     </button>
// // //                     <button
// // //                       onClick={() => handleDelete(product.id)}
// // //                       className="px-3 py-2 text-xs tracking-widest uppercase transition-all"
// // //                       style={{ border: "1px solid rgba(128,0,0,0.2)", color: "#800000" }}
// // //                     >
// // //                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //                         <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
// // //                       </svg>
// // //                     </button>
// // //                   </div>
// // //                   <div className="flex gap-2">
// // //                     <button
// // //                       onClick={() => toggleFeatured(product.id)}
// // //                       className="flex-1 px-3 py-1.5 text-xs tracking-widest uppercase transition-all"
// // //                       style={{ 
// // //                         background: product.isFeatured ? "rgba(212,175,55,0.1)" : "transparent",
// // //                         border: "1px solid rgba(212,175,55,0.3)", 
// // //                         color: "#D4AF37" 
// // //                       }}
// // //                     >
// // //                       ★ Featured
// // //                     </button>
// // //                     <button
// // //                       onClick={() => toggleActive(product.id)}
// // //                       className="flex-1 px-3 py-1.5 text-xs tracking-widest uppercase transition-all"
// // //                       style={{ 
// // //                         background: product.isActive ? "rgba(26,26,46,0.05)" : "rgba(128,0,0,0.05)",
// // //                         border: `1px solid ${product.isActive ? "rgba(26,26,46,0.2)" : "rgba(128,0,0,0.2)"}`, 
// // //                         color: product.isActive ? "#1A1A2E" : "#800000"
// // //                       }}
// // //                     >
// // //                       {product.isActive ? "Active" : "Inactive"}
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               </motion.div>
// // //             ))}
// // //           </div>

// // //           {/* Pagination */}
// // //           {totalPages > 1 && (
// // //             <div className="flex justify-center gap-2 mt-8">
// // //               <button
// // //                 onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
// // //                 disabled={currentPage === 0}
// // //                 className="px-4 py-2 text-sm tracking-widest uppercase transition-all disabled:opacity-30"
// // //                 style={{ border: "1px solid rgba(26,26,46,0.2)", color: "#1A1A2E" }}
// // //               >
// // //                 Previous
// // //               </button>
// // //               <span className="px-4 py-2 text-sm" style={{ color: "#36454F" }}>
// // //                 Page {currentPage + 1} of {totalPages}
// // //               </span>
// // //               <button
// // //                 onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
// // //                 disabled={currentPage >= totalPages - 1}
// // //                 className="px-4 py-2 text-sm tracking-widest uppercase transition-all disabled:opacity-30"
// // //                 style={{ border: "1px solid rgba(26,26,46,0.2)", color: "#1A1A2E" }}
// // //               >
// // //                 Next
// // //               </button>
// // //             </div>
// // //           )}
// // //         </>
// // //       )}

// // //       {/* Modal */}
// // //       <AnimatePresence>
// // //         {modalOpen && (
// // //           <motion.div
// // //             initial={{ opacity: 0 }}
// // //             animate={{ opacity: 1 }}
// // //             exit={{ opacity: 0 }}
// // //             className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
// // //             style={{ background: "rgba(26,26,46,0.8)" }}
// // //             onClick={closeModal}
// // //           >
// // //             <motion.div
// // //               initial={{ scale: 0.9, opacity: 0 }}
// // //               animate={{ scale: 1, opacity: 1 }}
// // //               exit={{ scale: 0.9, opacity: 0 }}
// // //               className="w-full max-w-2xl p-6 my-8"
// // //               style={{ background: "#FFFFF0", border: "1px solid rgba(26,26,46,0.1)" }}
// // //               onClick={(e) => e.stopPropagation()}
// // //             >
// // //               <h2 className="text-2xl font-bold mb-6" style={{ color: "#1A1A2E" }}>
// // //                 {editingProduct ? "Edit Product" : "New Product"}
// // //               </h2>
// // //               <form onSubmit={handleSubmit} className="space-y-4">
// // //                 <div className="grid md:grid-cols-2 gap-4">
// // //                   <div>
// // //                     <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Product Name</label>
// // //                     <input
// // //                       type="text"
// // //                       value={form.name}
// // //                       onChange={(e) => setForm({ ...form, name: e.target.value })}
// // //                       required
// // //                       className="w-full px-4 py-3 text-base outline-none"
// // //                       style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// // //                     />
// // //                   </div>
// // //                   <div>
// // //                     <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Category</label>
// // //                     <select
// // //                       value={form.categoryId}
// // //                       onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
// // //                       required
// // //                       className="w-full px-4 py-3 text-base outline-none"
// // //                       style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// // //                     >
// // //                       <option value="">Select category</option>
// // //                       {categories.map(cat => (
// // //                         <option key={cat.id} value={cat.id}>{cat.name}</option>
// // //                       ))}
// // //                     </select>
// // //                   </div>
// // //                 </div>

// // //                 <div>
// // //                   <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Description</label>
// // //                   <textarea
// // //                     value={form.description}
// // //                     onChange={(e) => setForm({ ...form, description: e.target.value })}
// // //                     rows="3"
// // //                     className="w-full px-4 py-3 text-base outline-none"
// // //                     style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// // //                   />
// // //                 </div>

// // //                 <div className="grid md:grid-cols-3 gap-4">
// // //                   <div>
// // //                     <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Price (₹)</label>
// // //                     <input
// // //                       type="number"
// // //                       step="0.01"
// // //                       value={form.price}
// // //                       onChange={(e) => setForm({ ...form, price: e.target.value })}
// // //                       required
// // //                       className="w-full px-4 py-3 text-base outline-none"
// // //                       style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// // //                     />
// // //                   </div>
// // //                   <div>
// // //                     <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Original Price (₹)</label>
// // //                     <input
// // //                       type="number"
// // //                       step="0.01"
// // //                       value={form.originalPrice}
// // //                       onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
// // //                       className="w-full px-4 py-3 text-base outline-none"
// // //                       style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// // //                     />
// // //                   </div>
// // //                   <div>
// // //                     <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Stock Quantity</label>
// // //                     <input
// // //                       type="number"
// // //                       value={form.stockQuantity}
// // //                       onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })}
// // //                       required
// // //                       className="w-full px-4 py-3 text-base outline-none"
// // //                       style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// // //                     />
// // //                   </div>
// // //                 </div>

// // //                 {/* ── Product Attributes ── */}
// // //                 <div style={{ borderTop: "1px solid rgba(26,26,46,0.08)", paddingTop: 16 }}>
// // //                   <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#800000", marginBottom: 14 }}>
// // //                     Product Attributes <span style={{ fontSize: 10, color: "#888", fontWeight: 400 }}>(used for filters)</span>
// // //                   </p>
// // //                   <div className="grid md:grid-cols-3 gap-4">
// // //                     <div>
// // //                       <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Colour</label>
// // //                       <select value={form.colour} onChange={(e) => setForm({ ...form, colour: e.target.value })}
// // //                         className="w-full px-4 py-3 text-base outline-none" style={{ border: "1px solid rgba(26,26,46,0.2)" }}>
// // //                         <option value="">Select colour</option>
// // //                         {["Black","White","Red","Navy Blue","Blue","Green","Pink","Yellow","Orange","Purple","Brown","Grey","Maroon","Gold","Cream","Multi-colour"].map(c => (
// // //                           <option key={c} value={c}>{c}</option>
// // //                         ))}
// // //                       </select>
// // //                     </div>
// // //                     <div>
// // //                       <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Gender</label>
// // //                       <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}
// // //                         className="w-full px-4 py-3 text-base outline-none" style={{ border: "1px solid rgba(26,26,46,0.2)" }}>
// // //                         <option value="">Select gender</option>
// // //                         <option value="Women">Women</option>
// // //                         <option value="Men">Men</option>
// // //                         <option value="Kids">Kids</option>
// // //                         <option value="Unisex">Unisex</option>
// // //                       </select>
// // //                     </div>
// // //                     <div>
// // //                       <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Size</label>
// // //                       <select value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })}
// // //                         className="w-full px-4 py-3 text-base outline-none" style={{ border: "1px solid rgba(26,26,46,0.2)" }}>
// // //                         <option value="">Select size</option>
// // //                         {["Free Size","XS","S","M","L","XL","XXL","XS-XL","S-XL"].map(s => (
// // //                           <option key={s} value={s}>{s}</option>
// // //                         ))}
// // //                       </select>
// // //                     </div>
// // //                     <div>
// // //                       <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Fabric / Material</label>
// // //                       <select value={form.fabric} onChange={(e) => setForm({ ...form, fabric: e.target.value })}
// // //                         className="w-full px-4 py-3 text-base outline-none" style={{ border: "1px solid rgba(26,26,46,0.2)" }}>
// // //                         <option value="">Select fabric</option>
// // //                         {["Pure Silk","Kanjivaram Silk","Banarasi Silk","Tussar Silk","Chanderi","Cotton","Cotton Silk","Georgette","Chiffon","Linen","Polyester","Crepe"].map(f => (
// // //                           <option key={f} value={f}>{f}</option>
// // //                         ))}
// // //                       </select>
// // //                     </div>
// // //                     <div>
// // //                       <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Occasion</label>
// // //                       <select value={form.occasion} onChange={(e) => setForm({ ...form, occasion: e.target.value })}
// // //                         className="w-full px-4 py-3 text-base outline-none" style={{ border: "1px solid rgba(26,26,46,0.2)" }}>
// // //                         <option value="">Select occasion</option>
// // //                         {["Wedding","Festival","Casual","Party","Office","Daily Wear","Traditional","Formal"].map(o => (
// // //                           <option key={o} value={o}>{o}</option>
// // //                         ))}
// // //                       </select>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 <div className="flex gap-6">
// // //                   <div className="flex items-center gap-3">
// // //                     <input
// // //                       type="checkbox"
// // //                       id="isFeatured"
// // //                       checked={form.isFeatured}
// // //                       onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
// // //                       className="w-4 h-4"
// // //                     />
// // //                     <label htmlFor="isFeatured" className="text-sm" style={{ color: "#36454F" }}>Featured Product</label>
// // //                   </div>
// // //                   <div className="flex items-center gap-3">
// // //                     <input
// // //                       type="checkbox"
// // //                       id="isActive"
// // //                       checked={form.isActive}
// // //                       onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
// // //                       className="w-4 h-4"
// // //                     />
// // //                     <label htmlFor="isActive" className="text-sm" style={{ color: "#36454F" }}>Active (visible on site)</label>
// // //                   </div>
// // //                 </div>

// // //                 <div className="flex gap-3 pt-4">
// // //                   <button
// // //                     type="button"
// // //                     onClick={closeModal}
// // //                     className="flex-1 px-4 py-3 text-sm tracking-widest uppercase"
// // //                     style={{ border: "1px solid rgba(26,26,46,0.2)", color: "#1A1A2E" }}
// // //                   >
// // //                     Cancel
// // //                   </button>
// // //                   <button
// // //                     type="submit"
// // //                     disabled={loading}
// // //                     className="flex-1 px-4 py-3 text-sm tracking-widest uppercase"
// // //                     style={{ background: "#800000", color: "#FFFFF0" }}
// // //                   >
// // //                     {loading ? "Saving..." : editingProduct ? "Update" : "Create"}
// // //                   </button>
// // //                 </div>
// // //               </form>
// // //             </motion.div>
// // //           </motion.div>
// // //         )}
// // //       </AnimatePresence>
// // //     </div>
// // //   );
// // // }



// // // import { useState, useEffect } from "react";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import { adminAPI } from "../../api";

// // // const T = {
// // //   bg: "#080810", surface: "#0f0f1a", card: "#13131f",
// // //   border: "rgba(255,255,255,0.06)", borderHi: "rgba(212,175,55,0.22)",
// // //   gold: "#D4AF37", maroon: "#800000",
// // //   text: "#F0EEE8", muted: "rgba(240,238,232,0.45)", dim: "rgba(240,238,232,0.22)",
// // //   danger: "#f87171", dangerBg: "rgba(248,113,113,0.08)", dangerBorder: "rgba(248,113,113,0.2)",
// // //   green: "#34D399", greenBg: "rgba(52,211,153,0.08)", greenBorder: "rgba(52,211,153,0.2)",
// // // };
// // // const SERIF = "'Cormorant Garamond', Georgia, serif";
// // // const SANS  = "'DM Sans', 'Segoe UI', system-ui, sans-serif";

// // // const iStyle = {
// // //   width: "100%", padding: "11px 14px", background: "#0a0a14",
// // //   border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8,
// // //   color: T.text, fontSize: 14, outline: "none", fontFamily: SANS, transition: "border-color 0.15s",
// // // };
// // // const labelStyle = {
// // //   display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em",
// // //   textTransform: "uppercase", color: T.muted, marginBottom: 7,
// // // };
// // // const onFocus  = e => e.target.style.borderColor = "rgba(212,175,55,0.35)";
// // // const onBlur   = e => e.target.style.borderColor = "rgba(255,255,255,0.08)";

// // // const EMPTY_FORM = {
// // //   name: "", description: "", price: "", originalPrice: "", discountPercent: 0,
// // //   stockQuantity: 0, categoryId: "", isFeatured: false, isActive: true,
// // //   colour: "", size: "", gender: "", fabric: "", occasion: "",
// // // };

// // // export default function AdminProducts() {
// // //   const [products,       setProducts]       = useState([]);
// // //   const [categories,     setCategories]     = useState([]);
// // //   const [loading,        setLoading]        = useState(true);
// // //   const [saving,         setSaving]         = useState(false);
// // //   const [modalOpen,      setModalOpen]      = useState(false);
// // //   const [editingProduct, setEditingProduct] = useState(null);
// // //   const [form,           setForm]           = useState(EMPTY_FORM);
// // //   const [uploadingImage, setUploadingImage] = useState(null);
// // //   const [currentPage,    setCurrentPage]    = useState(0);
// // //   const [totalPages,     setTotalPages]     = useState(0);
// // //   const [searchQuery,    setSearchQuery]    = useState("");
// // //   const [activeTab,      setActiveTab]      = useState("basic"); // "basic" | "attributes"

// // //   useEffect(() => { fetchProducts(); fetchCategories(); }, [currentPage, searchQuery]);

// // //   const fetchProducts = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const data = await adminAPI.getAllProducts(currentPage, 20, searchQuery);
// // //       setProducts(data.content || []); setTotalPages(data.totalPages || 0);
// // //     } catch(e) { console.error(e); }
// // //     finally { setLoading(false); }
// // //   };
// // //   const fetchCategories = async () => {
// // //     try { setCategories(await adminAPI.getAllCategories()); } catch(e) { console.error(e); }
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault(); setSaving(true);
// // //     try {
// // //       const payload = {
// // //         ...form,
// // //         price:           parseFloat(form.price),
// // //         originalPrice:   form.originalPrice ? parseFloat(form.originalPrice) : null,
// // //         discountPercent: parseInt(form.discountPercent) || 0,
// // //         stockQuantity:   parseInt(form.stockQuantity) || 0,
// // //         categoryId:      parseInt(form.categoryId),
// // //       };
// // //       if (editingProduct) await adminAPI.updateProduct(editingProduct.id, payload);
// // //       else await adminAPI.createProduct(payload);
// // //       fetchProducts(); closeModal();
// // //     } catch(e) { alert(e.response?.data?.message || "Failed to save product"); }
// // //     finally { setSaving(false); }
// // //   };

// // //   const handleImageUpload = async (id, file) => {
// // //     setUploadingImage(id);
// // //     try { await adminAPI.uploadProductImage(id, file); fetchProducts(); }
// // //     catch { alert("Image upload failed"); }
// // //     finally { setUploadingImage(null); }
// // //   };

// // //   const handleDelete = async (id) => {
// // //     if (!confirm("Delete this product?")) return;
// // //     try { await adminAPI.deleteProduct(id); fetchProducts(); } catch { alert("Failed to delete"); }
// // //   };
// // //   const toggleFeatured = async (id) => { try { await adminAPI.toggleFeatured(id); fetchProducts(); } catch { alert("Failed"); } };
// // //   const toggleActive   = async (id) => { try { await adminAPI.toggleActive(id);   fetchProducts(); } catch { alert("Failed"); } };

// // //   const openModal = (product = null) => {
// // //     setEditingProduct(product);
// // //     setForm(product ? {
// // //       name: product.name, description: product.description || "",
// // //       price: product.price.toString(), originalPrice: product.originalPrice?.toString() || "",
// // //       discountPercent: product.discountPercent || 0, stockQuantity: product.stockQuantity || 0,
// // //       categoryId: product.category?.id?.toString() || "",
// // //       isFeatured: product.isFeatured || false, isActive: product.isActive !== false,
// // //       colour: product.colour || "", size: product.size || "", gender: product.gender || "",
// // //       fabric: product.fabric || "", occasion: product.occasion || "",
// // //     } : { ...EMPTY_FORM });
// // //     setActiveTab("basic");
// // //     setModalOpen(true);
// // //   };
// // //   const closeModal = () => { setModalOpen(false); setEditingProduct(null); setForm({ ...EMPTY_FORM }); };

// // //   const f = (key) => ({ value: form[key], onChange: e => setForm({...form, [key]: e.target.value}), onFocus, onBlur });

// // //   return (
// // //     <div style={{ fontFamily: SANS, color: T.text }}>

// // //       {/* Header */}
// // //       <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 22 }}>
// // //         <div>
// // //           <h1 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 700, color: T.text, marginBottom: 5 }}>Products</h1>
// // //           <p style={{ fontSize: 14, color: T.muted }}>Manage your product catalog</p>
// // //         </div>
// // //         <button onClick={() => openModal()}
// // //           style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", background: T.maroon,
// // //             color: T.text, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
// // //             fontFamily: SANS, borderRadius: 8, whiteSpace: "nowrap" }}>
// // //           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// // //             <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
// // //           </svg>
// // //           New Product
// // //         </button>
// // //       </div>

// // //       {/* Toolbar */}
// // //       <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20,
// // //         padding: "14px 16px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 10 }}>
// // //         <div style={{ position: "relative", flex: 1, maxWidth: 320 }}>
// // //           <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.muted} strokeWidth="2"
// // //             style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
// // //             <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
// // //           </svg>
// // //           <input placeholder="Search products..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
// // //             style={{ ...iStyle, paddingLeft: 36, background: "#0a0a14" }}
// // //             onFocus={e => e.target.style.borderColor = "rgba(212,175,55,0.35)"}
// // //             onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}/>
// // //         </div>
// // //         <span style={{ fontSize: 13, color: T.dim, marginLeft: "auto" }}>
// // //           <strong style={{ color: T.text }}>{products.length}</strong> products
// // //         </span>
// // //       </div>

// // //       {/* Products Grid */}
// // //       {loading ? (
// // //         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 14 }}>
// // //           {[...Array(8)].map((_,i) => (
// // //             <div key={i} style={{ height: 320, background: T.card, borderRadius: 12,
// // //               animation: "fadeInOut 1.4s ease-in-out infinite", opacity: 0.4 }}/>
// // //           ))}
// // //         </div>
// // //       ) : products.length === 0 ? (
// // //         <div style={{ textAlign: "center", padding: "80px 20px", background: T.card,
// // //           border: `1px dashed rgba(212,175,55,0.12)`, borderRadius: 14 }}>
// // //           <div style={{ width: 56, height: 56, margin: "0 auto 18px", borderRadius: 14,
// // //             background: "rgba(212,175,55,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
// // //             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.5">
// // //               <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
// // //             </svg>
// // //           </div>
// // //           <p style={{ fontSize: 18, fontWeight: 600, color: T.text, marginBottom: 8 }}>No products yet</p>
// // //           <p style={{ fontSize: 14, color: T.muted, marginBottom: 22 }}>Add your first product to the catalog</p>
// // //           <button onClick={() => openModal()} style={{ padding: "10px 22px", background: T.maroon, color: T.text,
// // //             border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: SANS, borderRadius: 8 }}>
// // //             Add Product
// // //           </button>
// // //         </div>
// // //       ) : (
// // //         <>
// // //           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 14 }}>
// // //             {products.map((p, i) => (
// // //               <motion.div key={p.id} initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay: i*0.04 }}
// // //                 style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden" }}
// // //                 className="prod-card">

// // //                 {/* Image */}
// // //                 <div style={{ position: "relative", height: 180, background: "#0a0a14", overflow: "hidden" }}>
// // //                   {p.imageUrl
// // //                     ? <img src={p.imageUrl} alt={p.name} className="prod-img"
// // //                         style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}/>
// // //                     : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
// // //                         <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1">
// // //                           <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
// // //                         </svg>
// // //                       </div>
// // //                   }
// // //                   {/* Upload overlay */}
// // //                   <label className="prod-overlay" style={{ position: "absolute", inset: 0, background: "rgba(8,8,16,0.88)",
// // //                     display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
// // //                     opacity: 0, transition: "opacity 0.2s" }}>
// // //                     <input type="file" accept="image/*" style={{ display: "none" }}
// // //                       onChange={e => handleImageUpload(p.id, e.target.files[0])} disabled={uploadingImage === p.id}/>
// // //                     {uploadingImage === p.id
// // //                       ? <div style={{ width: 26, height: 26, border: `2px solid ${T.gold}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }}/>
// // //                       : <div style={{ textAlign: "center" }}>
// // //                           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.5" style={{ display: "block", margin: "0 auto 5px" }}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
// // //                           <span style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: T.gold, fontWeight: 700 }}>Upload</span>
// // //                         </div>
// // //                     }
// // //                   </label>

// // //                   {/* Badges */}
// // //                   <div style={{ position: "absolute", top: 8, left: 8, display: "flex", flexDirection: "column", gap: 4 }}>
// // //                     {p.isFeatured && <span style={{ padding: "2px 7px", background: "rgba(212,175,55,0.85)", color: "#1a1a2e", fontSize: 9, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", borderRadius: 4 }}>★ Featured</span>}
// // //                     {!p.isActive  && <span style={{ padding: "2px 7px", background: "rgba(248,113,113,0.85)", color: "#fff", fontSize: 9, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", borderRadius: 4 }}>Inactive</span>}
// // //                     {p.stockQuantity === 0 && <span style={{ padding: "2px 7px", background: "rgba(0,0,0,0.85)", color: "#aaa", fontSize: 9, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", borderRadius: 4 }}>No Stock</span>}
// // //                   </div>
// // //                 </div>

// // //                 {/* Info */}
// // //                 <div style={{ padding: "12px 14px" }}>
// // //                   <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
// // //                     color: T.gold, marginBottom: 3 }}>{p.category?.name || "Uncategorised"}</p>
// // //                   <h3 style={{ fontSize: 14, fontWeight: 600, color: T.text, marginBottom: 6,
// // //                     overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{p.name}</h3>

// // //                   <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 6 }}>
// // //                     <span style={{ fontFamily: SERIF, fontSize: 16, fontWeight: 700, color: T.text }}>
// // //                       ₹{p.price?.toLocaleString("en-IN")}
// // //                     </span>
// // //                     {p.originalPrice && p.originalPrice > p.price && (
// // //                       <span style={{ fontSize: 12, color: T.dim, textDecoration: "line-through" }}>
// // //                         ₹{p.originalPrice?.toLocaleString("en-IN")}
// // //                       </span>
// // //                     )}
// // //                   </div>

// // //                   {/* Stock pill */}
// // //                   <div style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 8px",
// // //                     borderRadius: 20, background: p.stockQuantity > 0 ? T.greenBg : T.dangerBg,
// // //                     border: `1px solid ${p.stockQuantity > 0 ? T.greenBorder : T.dangerBorder}`,
// // //                     marginBottom: 10 }}>
// // //                     <div style={{ width: 5, height: 5, borderRadius: "50%",
// // //                       background: p.stockQuantity > 0 ? T.green : T.danger }}/>
// // //                     <span style={{ fontSize: 11, fontWeight: 600, color: p.stockQuantity > 0 ? T.green : T.danger }}>
// // //                       {p.stockQuantity > 0 ? `${p.stockQuantity} in stock` : "Out of stock"}
// // //                     </span>
// // //                   </div>

// // //                   {/* Action buttons */}
// // //                   <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 6 }}>
// // //                     <button onClick={() => openModal(p)}
// // //                       style={{ padding: "8px", background: "rgba(212,175,55,0.07)", border: `1px solid ${T.borderHi}`,
// // //                         color: T.gold, cursor: "pointer", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em",
// // //                         textTransform: "uppercase", fontFamily: SANS, borderRadius: 7, transition: "all 0.12s" }}
// // //                       onMouseEnter={e => e.currentTarget.style.background = "rgba(212,175,55,0.14)"}
// // //                       onMouseLeave={e => e.currentTarget.style.background = "rgba(212,175,55,0.07)"}>
// // //                       Edit
// // //                     </button>
// // //                     <button onClick={() => toggleFeatured(p.id)} title={p.isFeatured ? "Unfeature" : "Feature"}
// // //                       style={{ padding: "8px 10px", background: p.isFeatured ? "rgba(212,175,55,0.15)" : "transparent",
// // //                         border: `1px solid ${T.borderHi}`, color: T.gold, cursor: "pointer", borderRadius: 7,
// // //                         fontSize: 13, transition: "all 0.12s" }}>★</button>
// // //                     <button onClick={() => handleDelete(p.id)}
// // //                       style={{ padding: "8px 10px", background: T.dangerBg, border: `1px solid ${T.dangerBorder}`,
// // //                         color: T.danger, cursor: "pointer", borderRadius: 7, display: "flex", alignItems: "center",
// // //                         transition: "all 0.12s" }}
// // //                       onMouseEnter={e => e.currentTarget.style.background = "rgba(248,113,113,0.15)"}
// // //                       onMouseLeave={e => e.currentTarget.style.background = T.dangerBg}>
// // //                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
// // //                         <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
// // //                       </svg>
// // //                     </button>
// // //                   </div>

// // //                   {/* Active toggle */}
// // //                   <button onClick={() => toggleActive(p.id)} style={{ width: "100%", marginTop: 6, padding: "7px",
// // //                     background: "transparent", border: `1px solid ${p.isActive ? T.greenBorder : T.dangerBorder}`,
// // //                     color: p.isActive ? T.green : T.danger, cursor: "pointer", fontSize: 11, fontWeight: 700,
// // //                     letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: SANS, borderRadius: 7 }}>
// // //                     {p.isActive ? "● Active" : "○ Inactive"}
// // //                   </button>
// // //                 </div>
// // //               </motion.div>
// // //             ))}
// // //           </div>

// // //           {/* Pagination */}
// // //           {totalPages > 1 && (
// // //             <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 28 }}>
// // //               <button onClick={() => setCurrentPage(p => Math.max(0, p-1))} disabled={currentPage === 0}
// // //                 style={{ padding: "8px 16px", background: "transparent", border: `1px solid ${T.border}`,
// // //                   color: currentPage === 0 ? T.dim : T.muted, cursor: currentPage === 0 ? "default" : "pointer",
// // //                   fontSize: 13, fontFamily: SANS, borderRadius: 7, transition: "all 0.15s" }}>
// // //                 ← Prev
// // //               </button>
// // //               <span style={{ padding: "8px 16px", background: T.card, border: `1px solid ${T.border}`,
// // //                 color: T.text, fontSize: 13, borderRadius: 7 }}>
// // //                 {currentPage + 1} / {totalPages}
// // //               </span>
// // //               <button onClick={() => setCurrentPage(p => Math.min(totalPages-1, p+1))} disabled={currentPage >= totalPages-1}
// // //                 style={{ padding: "8px 16px", background: "transparent", border: `1px solid ${T.border}`,
// // //                   color: currentPage >= totalPages-1 ? T.dim : T.muted, cursor: currentPage >= totalPages-1 ? "default" : "pointer",
// // //                   fontSize: 13, fontFamily: SANS, borderRadius: 7, transition: "all 0.15s" }}>
// // //                 Next →
// // //               </button>
// // //             </div>
// // //           )}
// // //         </>
// // //       )}

// // //       {/* ── MODAL ─────────────────────────────────────────────────────────── */}
// // //       <AnimatePresence>
// // //         {modalOpen && (
// // //           <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
// // //             style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "flex-start",
// // //               justifyContent: "center", padding: "24px 16px", background: "rgba(4,4,12,0.92)", overflowY: "auto" }}
// // //             onClick={closeModal}>
// // //             <motion.div initial={{ scale:0.93, opacity:0, y:20 }} animate={{ scale:1, opacity:1, y:0 }}
// // //               exit={{ scale:0.93, opacity:0 }} transition={{ type: "spring", stiffness: 320, damping: 28 }}
// // //               style={{ width: "100%", maxWidth: 640, background: T.surface,
// // //                 border: `1px solid ${T.borderHi}`, borderRadius: 18, overflow: "hidden", marginBottom: 24 }}
// // //               onClick={e => e.stopPropagation()}>

// // //               {/* Modal header */}
// // //               <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
// // //                 padding: "20px 24px", borderBottom: `1px solid ${T.border}` }}>
// // //                 <h2 style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 700, color: T.text }}>
// // //                   {editingProduct ? "Edit Product" : "New Product"}
// // //                 </h2>
// // //                 <button onClick={closeModal}
// // //                   style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.05)",
// // //                     border: `1px solid ${T.border}`, color: T.muted, cursor: "pointer",
// // //                     display: "flex", alignItems: "center", justifyContent: "center" }}>
// // //                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// // //                     <path d="M18 6 6 18M6 6l12 12"/>
// // //                   </svg>
// // //                 </button>
// // //               </div>

// // //               {/* Tab bar */}
// // //               <div style={{ display: "flex", borderBottom: `1px solid ${T.border}`, background: T.surface }}>
// // //                 {[
// // //                   { key: "basic",      label: "Basic Info" },
// // //                   { key: "attributes", label: "Attributes & Filters" },
// // //                 ].map(tab => (
// // //                   <button key={tab.key} onClick={() => setActiveTab(tab.key)}
// // //                     style={{ flex: 1, padding: "13px", background: "transparent", border: "none",
// // //                       cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: SANS,
// // //                       color: activeTab === tab.key ? T.gold : T.muted,
// // //                       borderBottom: `2px solid ${activeTab === tab.key ? T.gold : "transparent"}`,
// // //                       transition: "all 0.15s" }}>
// // //                     {tab.label}
// // //                   </button>
// // //                 ))}
// // //               </div>

// // //               <form onSubmit={handleSubmit}>
// // //                 <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column", gap: 16 }}>

// // //                   {/* ── TAB: Basic Info ── */}
// // //                   {activeTab === "basic" && (
// // //                     <>
// // //                       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
// // //                         <div>
// // //                           <label style={labelStyle}>Product Name *</label>
// // //                           <input type="text" required {...f("name")} placeholder="e.g. Kanjivaram Saree" style={iStyle}/>
// // //                         </div>
// // //                         <div>
// // //                           <label style={labelStyle}>Category *</label>
// // //                           <select required {...f("categoryId")} style={{ ...iStyle, cursor: "pointer" }}>
// // //                             <option value="">Select category</option>
// // //                             {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
// // //                           </select>
// // //                         </div>
// // //                       </div>

// // //                       <div>
// // //                         <label style={labelStyle}>Description</label>
// // //                         <textarea {...f("description")} rows={3} placeholder="Product description..."
// // //                           style={{ ...iStyle, resize: "vertical" }}/>
// // //                       </div>

// // //                       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
// // //                         <div>
// // //                           <label style={labelStyle}>Price (₹) *</label>
// // //                           <input type="number" step="0.01" required {...f("price")} placeholder="0.00" style={iStyle}/>
// // //                         </div>
// // //                         <div>
// // //                           <label style={labelStyle}>Original Price (₹)</label>
// // //                           <input type="number" step="0.01" {...f("originalPrice")} placeholder="MRP" style={iStyle}/>
// // //                         </div>
// // //                         <div>
// // //                           <label style={labelStyle}>Stock Qty *</label>
// // //                           <input type="number" required {...f("stockQuantity")} placeholder="0" style={iStyle}/>
// // //                         </div>
// // //                       </div>

// // //                       <div style={{ display: "flex", gap: 14 }}>
// // //                         <label style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "11px 14px",
// // //                           background: "rgba(212,175,55,0.04)", border: `1px solid rgba(212,175,55,0.12)`,
// // //                           borderRadius: 8, cursor: "pointer" }}>
// // //                           <input type="checkbox" checked={form.isFeatured}
// // //                             onChange={e => setForm({...form, isFeatured: e.target.checked})}
// // //                             style={{ width: 15, height: 15, accentColor: T.gold, cursor: "pointer" }}/>
// // //                           <span style={{ fontSize: 14, color: T.muted }}>★ Featured</span>
// // //                         </label>
// // //                         <label style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "11px 14px",
// // //                           background: T.greenBg, border: `1px solid ${T.greenBorder}`,
// // //                           borderRadius: 8, cursor: "pointer" }}>
// // //                           <input type="checkbox" checked={form.isActive}
// // //                             onChange={e => setForm({...form, isActive: e.target.checked})}
// // //                             style={{ width: 15, height: 15, accentColor: T.green, cursor: "pointer" }}/>
// // //                           <span style={{ fontSize: 14, color: T.muted }}>Active on store</span>
// // //                         </label>
// // //                       </div>
// // //                     </>
// // //                   )}

// // //                   {/* ── TAB: Attributes ── */}
// // //                   {activeTab === "attributes" && (
// // //                     <>
// // //                       <p style={{ fontSize: 13, color: T.muted, marginTop: -4, marginBottom: 6,
// // //                         padding: "10px 14px", background: "rgba(212,175,55,0.05)",
// // //                         border: `1px solid rgba(212,175,55,0.1)`, borderRadius: 8 }}>
// // //                         These fields directly power the sidebar filters on the store. Fill them carefully.
// // //                       </p>
// // //                       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
// // //                         <div>
// // //                           <label style={labelStyle}>Colour</label>
// // //                           <select {...f("colour")} style={{ ...iStyle, cursor: "pointer" }}>
// // //                             <option value="">Select</option>
// // //                             {["Black","White","Red","Navy Blue","Blue","Green","Pink","Yellow","Orange","Purple","Brown","Grey","Maroon","Gold","Cream","Multi-colour"].map(c => <option key={c}>{c}</option>)}
// // //                           </select>
// // //                         </div>
// // //                         <div>
// // //                           <label style={labelStyle}>Gender</label>
// // //                           <select {...f("gender")} style={{ ...iStyle, cursor: "pointer" }}>
// // //                             <option value="">Select</option>
// // //                             {["Women","Men","Kids","Unisex"].map(g => <option key={g}>{g}</option>)}
// // //                           </select>
// // //                         </div>
// // //                         <div>
// // //                           <label style={labelStyle}>Size</label>
// // //                           <select {...f("size")} style={{ ...iStyle, cursor: "pointer" }}>
// // //                             <option value="">Select</option>
// // //                             {["Free Size","XS","S","M","L","XL","XXL","XS-XL","S-XL"].map(s => <option key={s}>{s}</option>)}
// // //                           </select>
// // //                         </div>
// // //                         <div>
// // //                           <label style={labelStyle}>Fabric / Material</label>
// // //                           <select {...f("fabric")} style={{ ...iStyle, cursor: "pointer" }}>
// // //                             <option value="">Select</option>
// // //                             {["Pure Silk","Kanjivaram Silk","Banarasi Silk","Tussar Silk","Chanderi","Cotton","Cotton Silk","Georgette","Chiffon","Linen","Polyester","Crepe"].map(f => <option key={f}>{f}</option>)}
// // //                           </select>
// // //                         </div>
// // //                         <div>
// // //                           <label style={labelStyle}>Occasion</label>
// // //                           <select {...f("occasion")} style={{ ...iStyle, cursor: "pointer" }}>
// // //                             <option value="">Select</option>
// // //                             {["Wedding","Festival","Casual","Party","Office","Daily Wear","Traditional","Formal"].map(o => <option key={o}>{o}</option>)}
// // //                           </select>
// // //                         </div>
// // //                       </div>

// // //                       {/* Preview of set attributes */}
// // //                       <div style={{ padding: "14px", background: "rgba(255,255,255,0.02)",
// // //                         border: `1px solid ${T.border}`, borderRadius: 8 }}>
// // //                         <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
// // //                           color: T.dim, marginBottom: 10 }}>Attribute Preview</p>
// // //                         <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
// // //                           {[
// // //                             { label: form.colour,  icon: "🎨" },
// // //                             { label: form.gender,  icon: "👤" },
// // //                             { label: form.size,    icon: "📐" },
// // //                             { label: form.fabric,  icon: "🧵" },
// // //                             { label: form.occasion,icon: "✨" },
// // //                           ].filter(a => a.label).map((a, i) => (
// // //                             <span key={i} style={{ padding: "4px 10px", background: "rgba(212,175,55,0.1)",
// // //                               border: `1px solid rgba(212,175,55,0.2)`, borderRadius: 20,
// // //                               fontSize: 12, color: T.gold }}>
// // //                               {a.icon} {a.label}
// // //                             </span>
// // //                           ))}
// // //                           {!form.colour && !form.gender && !form.size && !form.fabric && !form.occasion && (
// // //                             <span style={{ fontSize: 13, color: T.dim }}>No attributes selected yet</span>
// // //                           )}
// // //                         </div>
// // //                       </div>
// // //                     </>
// // //                   )}
// // //                 </div>

// // //                 {/* Modal footer */}
// // //                 <div style={{ display: "flex", gap: 10, padding: "16px 24px",
// // //                   borderTop: `1px solid ${T.border}`, background: "rgba(255,255,255,0.01)" }}>
// // //                   <button type="button" onClick={closeModal}
// // //                     style={{ flex: 1, padding: "12px", background: "transparent", border: `1px solid ${T.border}`,
// // //                       color: T.muted, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: SANS, borderRadius: 8 }}>
// // //                     Cancel
// // //                   </button>
// // //                   {activeTab === "basic" && (
// // //                     <button type="button" onClick={() => setActiveTab("attributes")}
// // //                       style={{ flex: 1, padding: "12px", background: "rgba(212,175,55,0.08)", border: `1px solid ${T.borderHi}`,
// // //                         color: T.gold, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: SANS, borderRadius: 8 }}>
// // //                       Next: Attributes →
// // //                     </button>
// // //                   )}
// // //                   <button type="submit" disabled={saving}
// // //                     style={{ flex: 1, padding: "12px", background: T.maroon, color: T.text, border: "none",
// // //                       cursor: saving ? "wait" : "pointer", fontSize: 13, fontWeight: 600, fontFamily: SANS,
// // //                       borderRadius: 8, opacity: saving ? 0.7 : 1, transition: "opacity 0.15s" }}>
// // //                     {saving ? "Saving..." : editingProduct ? "Update Product" : "Create Product"}
// // //                   </button>
// // //                 </div>
// // //               </form>
// // //             </motion.div>
// // //           </motion.div>
// // //         )}
// // //       </AnimatePresence>

// // //       <style>{`
// // //         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');
// // //         .prod-card:hover .prod-overlay { opacity: 1 !important; }
// // //         .prod-card:hover .prod-img     { transform: scale(1.04) !important; }
// // //         @keyframes fadeInOut { 0%,100%{opacity:0.4} 50%{opacity:0.2} }
// // //         @keyframes spin { to{transform:rotate(360deg)} }
// // //       `}</style>
// // //     </div>
// // //   );
// // // }



// // import { useState, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { adminAPI } from "../../api";
// // import { useAdminTheme } from "./AdminDashboard";

// // const SERIF = "'Cormorant Garamond', Georgia, serif";
// // const SANS  = "'DM Sans', 'Segoe UI', system-ui, sans-serif";
// // const EMPTY = {
// //   name:"", description:"", price:"", originalPrice:"", discountPercent:0,
// //   stockQuantity:0, categoryId:"", isFeatured:false, isActive:true,
// //   colour:"", size:"", gender:"", fabric:"", occasion:"",
// // };

// // export default function AdminProducts() {
// //   const { T } = useAdminTheme();
// //   const [products,       setProducts]       = useState([]);
// //   const [categories,     setCategories]     = useState([]);
// //   const [loading,        setLoading]        = useState(true);
// //   const [saving,         setSaving]         = useState(false);
// //   const [modalOpen,      setModalOpen]      = useState(false);
// //   const [editingProduct, setEditingProduct] = useState(null);
// //   const [form,           setForm]           = useState({...EMPTY});
// //   const [uploadingImage, setUploadingImage] = useState(null);
// //   const [currentPage,    setCurrentPage]    = useState(0);
// //   const [totalPages,     setTotalPages]     = useState(0);
// //   const [searchQuery,    setSearchQuery]    = useState("");
// //   const [activeTab,      setActiveTab]      = useState("basic");

// //   useEffect(() => { fetchProducts(); fetchCategories(); }, [currentPage, searchQuery]);

// //   const fetchProducts = async () => {
// //     setLoading(true);
// //     try {
// //       const data = await adminAPI.getAllProducts(currentPage, 20, searchQuery);
// //       setProducts(data.content || []); setTotalPages(data.totalPages || 0);
// //     } catch(e) { console.error(e); }
// //     finally { setLoading(false); }
// //   };
// //   const fetchCategories = async () => {
// //     try { setCategories(await adminAPI.getAllCategories()); } catch(e) { console.error(e); }
// //   };
// //   const handleSubmit = async (e) => {
// //     e.preventDefault(); setSaving(true);
// //     try {
// //       const payload = { ...form,
// //         price: parseFloat(form.price),
// //         originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
// //         discountPercent: parseInt(form.discountPercent) || 0,
// //         stockQuantity: parseInt(form.stockQuantity) || 0,
// //         categoryId: parseInt(form.categoryId),
// //       };
// //       if (editingProduct) await adminAPI.updateProduct(editingProduct.id, payload);
// //       else await adminAPI.createProduct(payload);
// //       fetchProducts(); closeModal();
// //     } catch(e) { alert(e.response?.data?.message || "Failed to save product"); }
// //     finally { setSaving(false); }
// //   };
// //   const handleImageUpload = async (id, file) => {
// //     setUploadingImage(id);
// //     try { await adminAPI.uploadProductImage(id, file); fetchProducts(); }
// //     catch { alert("Image upload failed"); }
// //     finally { setUploadingImage(null); }
// //   };
// //   const handleDelete    = async (id) => { if (!confirm("Delete this product?")) return; try { await adminAPI.deleteProduct(id); fetchProducts(); } catch { alert("Failed to delete"); } };
// //   const toggleFeatured  = async (id) => { try { await adminAPI.toggleFeatured(id); fetchProducts(); } catch { alert("Failed"); } };
// //   const toggleActive    = async (id) => { try { await adminAPI.toggleActive(id);   fetchProducts(); } catch { alert("Failed"); } };

// //   const openModal = (product = null) => {
// //     setEditingProduct(product);
// //     setForm(product ? {
// //       name: product.name, description: product.description || "",
// //       price: product.price.toString(), originalPrice: product.originalPrice?.toString() || "",
// //       discountPercent: product.discountPercent || 0, stockQuantity: product.stockQuantity || 0,
// //       categoryId: product.category?.id?.toString() || "",
// //       isFeatured: product.isFeatured || false, isActive: product.isActive !== false,
// //       colour: product.colour||"", size: product.size||"", gender: product.gender||"",
// //       fabric: product.fabric||"", occasion: product.occasion||"",
// //     } : {...EMPTY});
// //     setActiveTab("basic"); setModalOpen(true);
// //   };
// //   const closeModal = () => { setModalOpen(false); setEditingProduct(null); setForm({...EMPTY}); };

// //   // Dynamic input style using T
// //   const iStyle = {
// //     width:"100%", padding:"11px 14px", background:T.inputBg,
// //     border:`1px solid ${T.inputBorder}`, borderRadius:8,
// //     color:T.text, fontSize:14, outline:"none", fontFamily:SANS, transition:"border-color 0.15s",
// //   };
// //   const lStyle = { display:"block", fontSize:11, fontWeight:700, letterSpacing:"0.15em",
// //     textTransform:"uppercase", color:T.muted, marginBottom:7 };
// //   const fi = e => e.target.style.borderColor = T.inputFocus;
// //   const fo = e => e.target.style.borderColor = T.inputBorder;
// //   const fld = (key) => ({ value:form[key], onChange:e=>setForm({...form,[key]:e.target.value}), onFocus:fi, onBlur:fo });

// //   return (
// //     <div style={{ fontFamily: SANS, color: T.text }}>

// //       {/* Header */}
// //       <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:22 }}>
// //         <div>
// //           <h1 style={{ fontFamily:SERIF, fontSize:28, fontWeight:700, color:T.text, marginBottom:5 }}>Products</h1>
// //           <p style={{ fontSize:14, color:T.muted }}>Manage your product catalog</p>
// //         </div>
// //         <button onClick={() => openModal()}
// //           style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 20px",
// //             background:T.maroon, color:"#FFFFF0", border:"none", cursor:"pointer",
// //             fontSize:13, fontWeight:600, fontFamily:SANS, borderRadius:8, whiteSpace:"nowrap" }}>
// //           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// //             <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
// //           </svg>
// //           New Product
// //         </button>
// //       </div>

// //       {/* Toolbar */}
// //       <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20,
// //         padding:"12px 16px", background:T.card, border:`1px solid ${T.border}`, borderRadius:10,
// //         boxShadow:T.shadow, transition:"background 0.3s" }}>
// //         <div style={{ position:"relative", flex:1, maxWidth:320 }}>
// //           <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.muted} strokeWidth="2"
// //             style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}>
// //             <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
// //           </svg>
// //           <input placeholder="Search products…" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}
// //             style={{ ...iStyle, paddingLeft:38 }} onFocus={fi} onBlur={fo}/>
// //         </div>
// //         <span style={{ fontSize:13, color:T.dim, marginLeft:"auto" }}>
// //           <strong style={{ color:T.text }}>{products.length}</strong> products
// //         </span>
// //       </div>

// //       {/* Grid */}
// //       {loading ? (
// //         <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:14 }}>
// //           {[...Array(8)].map((_,i) => (
// //             <div key={i} style={{ height:320, background:T.card, borderRadius:12,
// //               animation:"fadeInOut 1.4s ease-in-out infinite", opacity:0.45 }}/>
// //           ))}
// //         </div>
// //       ) : products.length === 0 ? (
// //         <div style={{ textAlign:"center", padding:"80px 20px", background:T.card,
// //           border:`1px dashed ${T.borderHi}`, borderRadius:14 }}>
// //           <div style={{ width:56, height:56, margin:"0 auto 18px", borderRadius:14,
// //             background:"rgba(212,175,55,0.07)", display:"flex", alignItems:"center", justifyContent:"center" }}>
// //             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.5">
// //               <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
// //             </svg>
// //           </div>
// //           <p style={{ fontSize:18, fontWeight:600, color:T.text, marginBottom:8 }}>No products yet</p>
// //           <p style={{ fontSize:14, color:T.muted, marginBottom:22 }}>Add your first product to the catalog</p>
// //           <button onClick={() => openModal()} style={{ padding:"10px 22px", background:T.maroon, color:"#FFFFF0",
// //             border:"none", cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:SANS, borderRadius:8 }}>
// //             Add Product
// //           </button>
// //         </div>
// //       ) : (
// //         <>
// //           <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:14 }}>
// //             {products.map((p,i) => (
// //               <motion.div key={p.id} initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:i*0.04}}
// //                 className="p-card"
// //                 style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12,
// //                   overflow:"hidden", boxShadow:T.shadow, transition:"background 0.3s, border-color 0.3s" }}>

// //                 {/* Image */}
// //                 <div style={{ position:"relative", height:180, background:T.inputBg, overflow:"hidden" }}>
// //                   {p.imageUrl
// //                     ? <img src={p.imageUrl} alt={p.name} className="p-img"
// //                         style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s" }}/>
// //                     : <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center" }}>
// //                         <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={T.border} strokeWidth="1">
// //                           <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
// //                         </svg>
// //                       </div>
// //                   }
// //                   <label className="p-overlay" style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.82)",
// //                     display:"flex", alignItems:"center", justifyContent:"center",
// //                     cursor:"pointer", opacity:0, transition:"opacity 0.2s" }}>
// //                     <input type="file" accept="image/*" style={{ display:"none" }}
// //                       onChange={e=>handleImageUpload(p.id,e.target.files[0])} disabled={uploadingImage===p.id}/>
// //                     {uploadingImage===p.id
// //                       ? <div style={{ width:26, height:26, border:"2px solid #D4AF37", borderTopColor:"transparent", borderRadius:"50%", animation:"spin 0.8s linear infinite" }}/>
// //                       : <div style={{ textAlign:"center" }}>
// //                           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" style={{ display:"block", margin:"0 auto 5px" }}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
// //                           <span style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"#D4AF37", fontWeight:700 }}>Upload</span>
// //                         </div>
// //                     }
// //                   </label>
// //                   {/* Badges */}
// //                   <div style={{ position:"absolute", top:8, left:8, display:"flex", flexDirection:"column", gap:4 }}>
// //                     {p.isFeatured     && <span style={{ padding:"2px 7px", background:"rgba(212,175,55,0.88)", color:"#1a1a2e", fontSize:9, fontWeight:800, letterSpacing:"0.06em", textTransform:"uppercase", borderRadius:4 }}>★ Featured</span>}
// //                     {!p.isActive      && <span style={{ padding:"2px 7px", background:"rgba(220,38,38,0.88)",  color:"#fff",    fontSize:9, fontWeight:800, letterSpacing:"0.06em", textTransform:"uppercase", borderRadius:4 }}>Inactive</span>}
// //                     {p.stockQuantity===0 && <span style={{ padding:"2px 7px", background:"rgba(0,0,0,0.82)",  color:"#aaa",    fontSize:9, fontWeight:800, letterSpacing:"0.06em", textTransform:"uppercase", borderRadius:4 }}>No Stock</span>}
// //                   </div>
// //                 </div>

// //                 {/* Info */}
// //                 <div style={{ padding:"12px 14px" }}>
// //                   <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:T.gold, marginBottom:3 }}>
// //                     {p.category?.name || "Uncategorised"}
// //                   </p>
// //                   <h3 style={{ fontSize:14, fontWeight:600, color:T.text, marginBottom:6,
// //                     overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis" }}>{p.name}</h3>
// //                   <div style={{ display:"flex", alignItems:"baseline", gap:6, marginBottom:6 }}>
// //                     <span style={{ fontFamily:SERIF, fontSize:16, fontWeight:700, color:T.text }}>₹{p.price?.toLocaleString("en-IN")}</span>
// //                     {p.originalPrice && p.originalPrice > p.price && (
// //                       <span style={{ fontSize:12, color:T.dim, textDecoration:"line-through" }}>₹{p.originalPrice?.toLocaleString("en-IN")}</span>
// //                     )}
// //                   </div>
// //                   {/* Stock pill */}
// //                   <div style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"3px 8px", borderRadius:20, marginBottom:10,
// //                     background: p.stockQuantity>0?T.greenBg:T.dangerBg, border:`1px solid ${p.stockQuantity>0?T.greenBorder:T.dangerBorder}` }}>
// //                     <div style={{ width:5, height:5, borderRadius:"50%", background:p.stockQuantity>0?T.green:T.danger }}/>
// //                     <span style={{ fontSize:11, fontWeight:600, color:p.stockQuantity>0?T.green:T.danger }}>
// //                       {p.stockQuantity>0?`${p.stockQuantity} in stock`:"Out of stock"}
// //                     </span>
// //                   </div>
// //                   {/* Buttons */}
// //                   <div style={{ display:"grid", gridTemplateColumns:"1fr auto auto", gap:6 }}>
// //                     <button onClick={()=>openModal(p)}
// //                       style={{ padding:"8px", background:"rgba(212,175,55,0.07)", border:`1px solid ${T.borderHi}`,
// //                         color:T.gold, cursor:"pointer", fontSize:11, fontWeight:700, letterSpacing:"0.06em",
// //                         textTransform:"uppercase", fontFamily:SANS, borderRadius:7, transition:"all 0.12s" }}
// //                       onMouseEnter={e=>e.currentTarget.style.background="rgba(212,175,55,0.14)"}
// //                       onMouseLeave={e=>e.currentTarget.style.background="rgba(212,175,55,0.07)"}>Edit</button>
// //                     <button onClick={()=>toggleFeatured(p.id)} title={p.isFeatured?"Unfeature":"Feature"}
// //                       style={{ padding:"8px 10px", background:p.isFeatured?"rgba(212,175,55,0.15)":"transparent",
// //                         border:`1px solid ${T.borderHi}`, color:T.gold, cursor:"pointer", borderRadius:7, fontSize:13 }}>★</button>
// //                     <button onClick={()=>handleDelete(p.id)}
// //                       style={{ padding:"8px 10px", background:T.dangerBg, border:`1px solid ${T.dangerBorder}`,
// //                         color:T.danger, cursor:"pointer", borderRadius:7, display:"flex", alignItems:"center", transition:"all 0.12s" }}
// //                       onMouseEnter={e=>e.currentTarget.style.background="rgba(220,38,38,0.14)"}
// //                       onMouseLeave={e=>e.currentTarget.style.background=T.dangerBg}>
// //                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
// //                         <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
// //                       </svg>
// //                     </button>
// //                   </div>
// //                   <button onClick={()=>toggleActive(p.id)}
// //                     style={{ width:"100%", marginTop:6, padding:"7px", background:"transparent",
// //                       border:`1px solid ${p.isActive?T.greenBorder:T.dangerBorder}`,
// //                       color:p.isActive?T.green:T.danger, cursor:"pointer", fontSize:11, fontWeight:700,
// //                       letterSpacing:"0.06em", textTransform:"uppercase", fontFamily:SANS, borderRadius:7 }}>
// //                     {p.isActive ? "● Active" : "○ Inactive"}
// //                   </button>
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </div>

// //           {/* Pagination */}
// //           {totalPages > 1 && (
// //             <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:8, marginTop:28 }}>
// //               <button onClick={()=>setCurrentPage(p=>Math.max(0,p-1))} disabled={currentPage===0}
// //                 style={{ padding:"8px 16px", background:"transparent", border:`1px solid ${T.border}`,
// //                   color:currentPage===0?T.dim:T.muted, cursor:currentPage===0?"default":"pointer",
// //                   fontSize:13, fontFamily:SANS, borderRadius:7 }}>← Prev</button>
// //               <span style={{ padding:"8px 16px", background:T.card, border:`1px solid ${T.border}`,
// //                 color:T.text, fontSize:13, borderRadius:7 }}>{currentPage+1} / {totalPages}</span>
// //               <button onClick={()=>setCurrentPage(p=>Math.min(totalPages-1,p+1))} disabled={currentPage>=totalPages-1}
// //                 style={{ padding:"8px 16px", background:"transparent", border:`1px solid ${T.border}`,
// //                   color:currentPage>=totalPages-1?T.dim:T.muted, cursor:currentPage>=totalPages-1?"default":"pointer",
// //                   fontSize:13, fontFamily:SANS, borderRadius:7 }}>Next →</button>
// //             </div>
// //           )}
// //         </>
// //       )}

// //       {/* ── MODAL ── */}
// //       <AnimatePresence>
// //         {modalOpen && (
// //           <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
// //             style={{ position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"flex-start",
// //               justifyContent:"center", padding:"24px 16px", background:"rgba(0,0,0,0.55)", overflowY:"auto" }}
// //             onClick={closeModal}>
// //             <motion.div initial={{scale:0.93,opacity:0,y:20}} animate={{scale:1,opacity:1,y:0}}
// //               exit={{scale:0.93,opacity:0}} transition={{type:"spring",stiffness:320,damping:28}}
// //               style={{ width:"100%", maxWidth:640, background:T.surface,
// //                 border:`1px solid ${T.borderHi}`, borderRadius:18,
// //                 overflow:"hidden", marginBottom:24, boxShadow:"0 24px 64px rgba(0,0,0,0.3)" }}
// //               onClick={e=>e.stopPropagation()}>

// //               {/* Modal header */}
// //               <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
// //                 padding:"20px 24px", borderBottom:`1px solid ${T.border}` }}>
// //                 <h2 style={{ fontFamily:SERIF, fontSize:24, fontWeight:700, color:T.text }}>
// //                   {editingProduct ? "Edit Product" : "New Product"}
// //                 </h2>
// //                 <button onClick={closeModal}
// //                   style={{ width:32, height:32, borderRadius:8, background:T.hoverBg,
// //                     border:`1px solid ${T.border}`, color:T.muted, cursor:"pointer",
// //                     display:"flex", alignItems:"center", justifyContent:"center" }}>
// //                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// //                     <path d="M18 6 6 18M6 6l12 12"/>
// //                   </svg>
// //                 </button>
// //               </div>

// //               {/* Tab bar */}
// //               <div style={{ display:"flex", borderBottom:`1px solid ${T.border}` }}>
// //                 {[{key:"basic",label:"Basic Info"},{key:"attributes",label:"Attributes & Filters"}].map(tab => (
// //                   <button key={tab.key} onClick={()=>setActiveTab(tab.key)}
// //                     style={{ flex:1, padding:"13px", background:"transparent", border:"none", cursor:"pointer",
// //                       fontSize:13, fontWeight:600, fontFamily:SANS,
// //                       color:activeTab===tab.key?T.gold:T.muted,
// //                       borderBottom:`2px solid ${activeTab===tab.key?T.gold:"transparent"}`,
// //                       transition:"all 0.15s" }}>
// //                     {tab.label}
// //                   </button>
// //                 ))}
// //               </div>

// //               <form onSubmit={handleSubmit}>
// //                 <div style={{ padding:"22px 24px", display:"flex", flexDirection:"column", gap:16 }}>

// //                   {activeTab === "basic" && <>
// //                     <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
// //                       <div>
// //                         <label style={lStyle}>Product Name *</label>
// //                         <input type="text" required {...fld("name")} placeholder="e.g. Kanjivaram Saree" style={iStyle}/>
// //                       </div>
// //                       <div>
// //                         <label style={lStyle}>Category *</label>
// //                         <select required {...fld("categoryId")} style={{...iStyle,cursor:"pointer"}}>
// //                           <option value="">Select category</option>
// //                           {categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
// //                         </select>
// //                       </div>
// //                     </div>
// //                     <div>
// //                       <label style={lStyle}>Description</label>
// //                       <textarea {...fld("description")} rows={3} placeholder="Product description…" style={{...iStyle,resize:"vertical"}}/>
// //                     </div>
// //                     <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
// //                       <div><label style={lStyle}>Price (₹) *</label><input type="number" step="0.01" required {...fld("price")} placeholder="0.00" style={iStyle}/></div>
// //                       <div><label style={lStyle}>Original Price (₹)</label><input type="number" step="0.01" {...fld("originalPrice")} placeholder="MRP" style={iStyle}/></div>
// //                       <div><label style={lStyle}>Stock Qty *</label><input type="number" required {...fld("stockQuantity")} placeholder="0" style={iStyle}/></div>
// //                     </div>
// //                     <div style={{ display:"flex", gap:14 }}>
// //                       <label style={{ flex:1, display:"flex", alignItems:"center", gap:10, padding:"11px 14px",
// //                         background:"rgba(212,175,55,0.05)", border:`1px solid ${T.borderHi}`, borderRadius:8, cursor:"pointer" }}>
// //                         <input type="checkbox" checked={form.isFeatured} onChange={e=>setForm({...form,isFeatured:e.target.checked})}
// //                           style={{ width:15, height:15, accentColor:T.gold, cursor:"pointer" }}/>
// //                         <span style={{ fontSize:14, color:T.muted }}>★ Featured</span>
// //                       </label>
// //                       <label style={{ flex:1, display:"flex", alignItems:"center", gap:10, padding:"11px 14px",
// //                         background:T.greenBg, border:`1px solid ${T.greenBorder}`, borderRadius:8, cursor:"pointer" }}>
// //                         <input type="checkbox" checked={form.isActive} onChange={e=>setForm({...form,isActive:e.target.checked})}
// //                           style={{ width:15, height:15, accentColor:T.green, cursor:"pointer" }}/>
// //                         <span style={{ fontSize:14, color:T.muted }}>Active on store</span>
// //                       </label>
// //                     </div>
// //                   </>}

// //                   {activeTab === "attributes" && <>
// //                     <div style={{ padding:"10px 14px", background:"rgba(212,175,55,0.05)",
// //                       border:`1px solid rgba(212,175,55,0.12)`, borderRadius:8 }}>
// //                       <p style={{ fontSize:13, color:T.muted }}>These fields power the sidebar filters on the store. Fill them carefully.</p>
// //                     </div>
// //                     <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
// //                       <div><label style={lStyle}>Colour</label>
// //                         <select {...fld("colour")} style={{...iStyle,cursor:"pointer"}}>
// //                           <option value="">Select</option>
// //                           {["Black","White","Red","Navy Blue","Blue","Green","Pink","Yellow","Orange","Purple","Brown","Grey","Maroon","Gold","Cream","Multi-colour"].map(c=><option key={c}>{c}</option>)}
// //                         </select>
// //                       </div>
// //                       <div><label style={lStyle}>Gender</label>
// //                         <select {...fld("gender")} style={{...iStyle,cursor:"pointer"}}>
// //                           <option value="">Select</option>
// //                           {["Women","Men","Kids","Unisex"].map(g=><option key={g}>{g}</option>)}
// //                         </select>
// //                       </div>
// //                       <div><label style={lStyle}>Size</label>
// //                         <select {...fld("size")} style={{...iStyle,cursor:"pointer"}}>
// //                           <option value="">Select</option>
// //                           {["Free Size","XS","S","M","L","XL","XXL","XS-XL","S-XL"].map(s=><option key={s}>{s}</option>)}
// //                         </select>
// //                       </div>
// //                       <div><label style={lStyle}>Fabric / Material</label>
// //                         <select {...fld("fabric")} style={{...iStyle,cursor:"pointer"}}>
// //                           <option value="">Select</option>
// //                           {["Pure Silk","Kanjivaram Silk","Banarasi Silk","Tussar Silk","Chanderi","Cotton","Cotton Silk","Georgette","Chiffon","Linen","Polyester","Crepe"].map(f=><option key={f}>{f}</option>)}
// //                         </select>
// //                       </div>
// //                       <div><label style={lStyle}>Occasion</label>
// //                         <select {...fld("occasion")} style={{...iStyle,cursor:"pointer"}}>
// //                           <option value="">Select</option>
// //                           {["Wedding","Festival","Casual","Party","Office","Daily Wear","Traditional","Formal"].map(o=><option key={o}>{o}</option>)}
// //                         </select>
// //                       </div>
// //                     </div>
// //                     {/* Attribute preview chips */}
// //                     <div style={{ padding:"14px", background:T.hoverBg, border:`1px solid ${T.border}`, borderRadius:8 }}>
// //                       <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:T.dim, marginBottom:10 }}>Preview</p>
// //                       <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
// //                         {[{v:form.colour,e:"🎨"},{v:form.gender,e:"👤"},{v:form.size,e:"📐"},{v:form.fabric,e:"🧵"},{v:form.occasion,e:"✨"}]
// //                           .filter(a=>a.v).map((a,i)=>(
// //                           <span key={i} style={{ padding:"4px 10px", background:"rgba(212,175,55,0.1)",
// //                             border:`1px solid rgba(212,175,55,0.2)`, borderRadius:20, fontSize:12, color:T.gold }}>
// //                             {a.e} {a.v}
// //                           </span>
// //                         ))}
// //                         {!form.colour&&!form.gender&&!form.size&&!form.fabric&&!form.occasion&&(
// //                           <span style={{ fontSize:13, color:T.dim }}>No attributes selected yet</span>
// //                         )}
// //                       </div>
// //                     </div>
// //                   </>}
// //                 </div>

// //                 {/* Modal footer */}
// //                 <div style={{ display:"flex", gap:10, padding:"16px 24px", borderTop:`1px solid ${T.border}` }}>
// //                   <button type="button" onClick={closeModal}
// //                     style={{ flex:1, padding:"12px", background:"transparent", border:`1px solid ${T.border}`,
// //                       color:T.muted, cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:SANS, borderRadius:8 }}>Cancel</button>
// //                   {activeTab==="basic" && (
// //                     <button type="button" onClick={()=>setActiveTab("attributes")}
// //                       style={{ flex:1, padding:"12px", background:"rgba(212,175,55,0.08)", border:`1px solid ${T.borderHi}`,
// //                         color:T.gold, cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:SANS, borderRadius:8 }}>
// //                       Next: Attributes →
// //                     </button>
// //                   )}
// //                   <button type="submit" disabled={saving}
// //                     style={{ flex:1, padding:"12px", background:T.maroon, color:"#FFFFF0", border:"none",
// //                       cursor:saving?"wait":"pointer", fontSize:13, fontWeight:600, fontFamily:SANS,
// //                       borderRadius:8, opacity:saving?0.7:1 }}>
// //                     {saving?"Saving…":editingProduct?"Update Product":"Create Product"}
// //                   </button>
// //                 </div>
// //               </form>
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');
// //         .p-card:hover .p-overlay { opacity: 1 !important; }
// //         .p-card:hover .p-img     { transform: scale(1.04) !important; }
// //         @keyframes fadeInOut { 0%,100%{opacity:0.45} 50%{opacity:0.2} }
// //         @keyframes spin { to { transform: rotate(360deg); } }
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
//   const { T, theme } = useAdminTheme();
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
//                   boxShadow: isLow
//                     ? (theme==="dark"?"0 0 0 1px rgba(220,38,38,0.15)":"0 0 0 1px rgba(220,38,38,0.1)")
//                     : T.shadow,
//                   transition:"background 0.3s, border-color 0.3s, box-shadow 0.18s" }}>

//                 {/* Low stock banner strip */}
//                 {isLow && (
//                   <div style={{ background:"rgba(220,38,38,0.1)", borderBottom:"1px solid rgba(220,38,38,0.25)",
//                     padding:"4px 10px", display:"flex", alignItems:"center", gap:5 }}>
//                     <div style={{ width:5, height:5, borderRadius:"50%", background:"#DC2626",
//                       animation:"pulseRed 1.2s ease-in-out infinite" }}/>
//                     <span style={{ fontSize:10, fontWeight:800, color:"#DC2626", letterSpacing:"0.08em", textTransform:"uppercase" }}>
//                       Low Stock — Only {stockQty} left
//                     </span>
//                   </div>
//                 )}

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
//                 </div>

//                 {/* Product info */}
//                 <div style={{ padding:"11px 12px" }}>
//                   {/* Category + gender */}
//                   <div style={{ display:"flex", gap:5, marginBottom:6, flexWrap:"wrap" }}>
//                     <span style={{ padding:"2px 7px", borderRadius:4,
//                       fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase",
//                       background:theme==="dark"?"rgba(212,175,55,0.1)":"#FEF9ED",
//                       color:theme==="dark"?T.gold:"#7A5C0A",
//                       border:`1px solid ${theme==="dark"?"rgba(212,175,55,0.2)":"#E8D5A0"}` }}>
//                       {p.category?.name || "Uncategorised"}
//                     </span>
//                     {p.gender && (
//                       <span style={{ padding:"2px 7px", borderRadius:4,
//                         fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase",
//                         background:theme==="dark"?"rgba(255,255,255,0.05)":"#F3F0EC",
//                         color:T.muted, border:`1px solid ${T.border}` }}>
//                         {p.gender}
//                       </span>
//                     )}
//                   </div>

//                   <h3 style={{ fontSize:13, fontWeight:700, color:T.text, marginBottom:7,
//                     overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis", lineHeight:1.3 }}>{p.name}</h3>

//                   {/* Price */}
//                   <div style={{ display:"flex", alignItems:"baseline", gap:6, marginBottom:7 }}>
//                     <span style={{ fontFamily:SERIF, fontSize:16, fontWeight:700, color:T.text }}>
//                       ₹{p.price?.toLocaleString("en-IN")}
//                     </span>
//                     {p.originalPrice && p.originalPrice > p.price && (
//                       <span style={{ fontSize:11, color:T.dim, textDecoration:"line-through" }}>
//                         ₹{p.originalPrice?.toLocaleString("en-IN")}
//                       </span>
//                     )}
//                   </div>

//                   {/* Stock pill */}
//                   <StockPill qty={stockQty} T={T} theme={theme} />

//                   {/* Colour swatches preview */}
//                   {displayColours.length > 0 && (
//                     <div style={{ display:"flex", gap:4, marginBottom:6, flexWrap:"wrap", alignItems:"center" }}>
//                       {displayColours.slice(0,6).map(c => {
//                         const opt = COLOUR_OPTIONS.find(o=>o.label===c);
//                         return opt ? (
//                           <span key={c} title={c} style={{
//                             width:13, height:13, borderRadius:"50%",
//                             background: opt.hex,
//                             border:"1.5px solid rgba(0,0,0,0.15)",
//                             display:"inline-block", flexShrink:0,
//                           }}/>
//                         ) : (
//                           <span key={c} style={{ fontSize:10, color:T.muted, padding:"1px 5px",
//                             background:T.hoverBg, borderRadius:4, border:`1px solid ${T.border}` }}>{c}</span>
//                         );
//                       })}
//                       {displayColours.length > 6 && (
//                         <span style={{ fontSize:10, color:T.muted }}>+{displayColours.length-6}</span>
//                       )}
//                     </div>
//                   )}

//                   {/* Size chips preview */}
//                   {displaySizes.length > 0 && (
//                     <div style={{ display:"flex", gap:3, marginBottom:8, flexWrap:"wrap" }}>
//                       {displaySizes.slice(0,5).map(s => (
//                         <span key={s} style={{ padding:"1px 6px", borderRadius:4, fontSize:10, fontWeight:600,
//                           background:T.badgePill||T.hoverBg, border:`1px solid ${T.statBorder||T.border}`,
//                           color:T.muted }}>
//                           {s}
//                         </span>
//                       ))}
//                       {displaySizes.length > 5 && (
//                         <span style={{ fontSize:10, color:T.muted }}>+{displaySizes.length-5}</span>
//                       )}
//                     </div>
//                   )}

//                   {/* Action buttons */}
//                   <div style={{ display:"grid", gridTemplateColumns:"1fr auto auto", gap:5 }}>
//                     <button onClick={()=>openModal(p)}
//                       style={{ padding:"8px", background:"rgba(212,175,55,0.07)", border:`1px solid ${T.borderHi}`,
//                         color:T.gold, cursor:"pointer", fontSize:11, fontWeight:700, letterSpacing:"0.06em",
//                         textTransform:"uppercase", fontFamily:SANS, borderRadius:7, transition:"all 0.12s" }}
//                       onMouseEnter={e=>e.currentTarget.style.background="rgba(212,175,55,0.14)"}
//                       onMouseLeave={e=>e.currentTarget.style.background="rgba(212,175,55,0.07)"}>Edit</button>
//                     <button onClick={()=>toggleFeatured(p.id)} title={p.isFeatured?"Unfeature":"Feature"}
//                       style={{ padding:"8px 10px", background:p.isFeatured?"rgba(212,175,55,0.15)":"transparent",
//                         border:`1px solid ${T.borderHi}`, color:T.gold, cursor:"pointer", borderRadius:7, fontSize:13 }}>★</button>
//                     <button onClick={()=>handleDelete(p.id)}
//                       style={{ padding:"8px 10px", background:T.dangerBg, border:`1px solid ${T.dangerBorder}`,
//                         color:T.danger, cursor:"pointer", borderRadius:7, display:"flex", alignItems:"center", transition:"all 0.12s" }}
//                       onMouseEnter={e=>e.currentTarget.style.background="rgba(220,38,38,0.14)"}
//                       onMouseLeave={e=>e.currentTarget.style.background=T.dangerBg}>
//                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
//                         <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
//                       </svg>
//                     </button>
//                   </div>
//                   <button onClick={()=>toggleActive(p.id)}
//                     style={{ width:"100%", marginTop:5, padding:"7px", background:"transparent",
//                       border:`1px solid ${p.isActive?T.greenBorder:T.dangerBorder}`,
//                       color:p.isActive?T.green:T.danger, cursor:"pointer", fontSize:11, fontWeight:700,
//                       letterSpacing:"0.06em", textTransform:"uppercase", fontFamily:SANS, borderRadius:7 }}>
//                     {p.isActive ? "● Active" : "○ Inactive"}
//                   </button>
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
//                     <div style={{ padding:"11px 14px", borderRadius:8,
//                       background:theme==="dark"?"rgba(212,175,55,0.05)":"#FEF9ED",
//                       border:`1.5px solid ${theme==="dark"?"rgba(212,175,55,0.15)":"#E8D5A0"}` }}>
//                       <p style={{ fontSize:13, color:T.muted, lineHeight:1.5 }}>
//                         These attributes power the sidebar filters. They are <strong style={{color:T.text}}>saved to the backend</strong> and control which products appear in Women / Men / Kids sections.
//                       </p>
//                     </div>

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





// // import { useState, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { adminAPI } from "../../api";

// // export default function AdminProducts() {
// //   const [products, setProducts] = useState([]);
// //   const [categories, setCategories] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [editingProduct, setEditingProduct] = useState(null);
// //   const [form, setForm] = useState({
// //     name: "",
// //     description: "",
// //     price: "",
// //     originalPrice: "",
// //     discountPercent: 0,
// //     stockQuantity: 0,
// //     categoryId: "",
// //     isFeatured: false,
// //     isActive: true,
// //   });
// //   const [uploadingImage, setUploadingImage] = useState(null);
// //   const [currentPage, setCurrentPage] = useState(0);
// //   const [totalPages, setTotalPages] = useState(0);
// //   const [searchQuery, setSearchQuery] = useState("");

// //   useEffect(() => {
// //     fetchProducts();
// //     fetchCategories();
// //   }, [currentPage, searchQuery]);

// //   const fetchProducts = async () => {
// //     try {
// //       const data = await adminAPI.getAllProducts(currentPage, 20, searchQuery);
// //       setProducts(data.content || []);
// //       setTotalPages(data.totalPages || 0);
// //     } catch (err) {
// //       console.error("Failed to fetch products", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchCategories = async () => {
// //     try {
// //       const data = await adminAPI.getAllCategories();
// //       setCategories(data);
// //     } catch (err) {
// //       console.error("Failed to fetch categories", err);
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     try {
// //       const payload = {
// //         ...form,
// //         price: parseFloat(form.price),
// //         originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
// //         discountPercent: parseInt(form.discountPercent) || 0,
// //         stockQuantity: parseInt(form.stockQuantity) || 0,
// //         categoryId: parseInt(form.categoryId),
// //       };

// //       if (editingProduct) {
// //         await adminAPI.updateProduct(editingProduct.id, payload);
// //       } else {
// //         await adminAPI.createProduct(payload);
// //       }
// //       fetchProducts();
// //       closeModal();
// //     } catch (err) {
// //       alert(err.response?.data?.message || "Failed to save product");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleImageUpload = async (productId, file) => {
// //     setUploadingImage(productId);
// //     try {
// //       await adminAPI.uploadProductImage(productId, file);
// //       fetchProducts();
// //     } catch (err) {
// //       alert("Image upload failed");
// //     } finally {
// //       setUploadingImage(null);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     if (!confirm("Delete this product?")) return;
// //     try {
// //       await adminAPI.deleteProduct(id);
// //       fetchProducts();
// //     } catch (err) {
// //       alert("Failed to delete product");
// //     }
// //   };

// //   const toggleFeatured = async (id) => {
// //     try {
// //       await adminAPI.toggleFeatured(id);
// //       fetchProducts();
// //     } catch (err) {
// //       alert("Failed to toggle featured status");
// //     }
// //   };

// //   const toggleActive = async (id) => {
// //     try {
// //       await adminAPI.toggleActive(id);
// //       fetchProducts();
// //     } catch (err) {
// //       alert("Failed to toggle active status");
// //     }
// //   };

// //   const openModal = (product = null) => {
// //     if (product) {
// //       setEditingProduct(product);
// //       setForm({
// //         name: product.name,
// //         description: product.description || "",
// //         price: product.price.toString(),
// //         originalPrice: product.originalPrice?.toString() || "",
// //         discountPercent: product.discountPercent || 0,
// //         stockQuantity: product.stockQuantity || 0,
// //         categoryId: product.category?.id?.toString() || "",
// //         isFeatured: product.isFeatured || false,
// //         isActive: product.isActive !== false,
// //       });
// //     } else {
// //       setEditingProduct(null);
// //       setForm({
// //         name: "",
// //         description: "",
// //         price: "",
// //         originalPrice: "",
// //         discountPercent: 0,
// //         stockQuantity: 0,
// //         categoryId: "",
// //         isFeatured: false,
// //         isActive: true,
// //       });
// //     }
// //     setModalOpen(true);
// //   };

// //   const closeModal = () => {
// //     setModalOpen(false);
// //     setEditingProduct(null);
// //   };

// //   return (
// //     <div style={{ fontFamily: "'Cormorant Garamond', serif" }}>
// //       {/* Header */}
// //       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
// //         <div>
// //           <h1 className="text-3xl font-bold mb-1" style={{ color: "#1A1A2E" }}>Products</h1>
// //           <p className="text-sm" style={{ color: "#36454F" }}>Manage your product catalog</p>
// //         </div>
// //         <div className="flex gap-3">
// //           <input
// //             type="text"
// //             placeholder="Search products..."
// //             value={searchQuery}
// //             onChange={(e) => setSearchQuery(e.target.value)}
// //             className="px-4 py-2 text-sm outline-none"
// //             style={{ border: "1px solid rgba(26,26,46,0.2)", minWidth: "200px" }}
// //           />
// //           <button
// //             onClick={() => openModal()}
// //             className="flex items-center gap-2 px-6 py-3 text-sm tracking-widest uppercase font-semibold transition-all whitespace-nowrap"
// //             style={{ background: "#800000", color: "#FFFFF0" }}
// //             onMouseEnter={e => e.currentTarget.style.background = "#900000"}
// //             onMouseLeave={e => e.currentTarget.style.background = "#800000"}
// //           >
// //             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //               <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
// //             </svg>
// //             Add Product
// //           </button>
// //         </div>
// //       </div>

// //       {/* Products Grid */}
// //       {loading ? (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //           {[...Array(8)].map((_, i) => (
// //             <div key={i} className="h-96 animate-pulse" style={{ background: "rgba(26,26,46,0.04)" }} />
// //           ))}
// //         </div>
// //       ) : products.length === 0 ? (
// //         <div className="text-center py-20" style={{ border: "1px dashed rgba(26,26,46,0.15)" }}>
// //           <div className="w-16 h-16 mx-auto mb-4 opacity-20"
// //             style={{ background: "#D4AF37", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
// //           <p className="text-lg mb-2" style={{ color: "#36454F" }}>No products yet</p>
// //           <p className="text-sm mb-6" style={{ color: "rgba(54,69,79,0.6)" }}>Create your first product to get started</p>
// //           <button
// //             onClick={() => openModal()}
// //             className="px-6 py-3 text-sm tracking-widest uppercase"
// //             style={{ background: "#800000", color: "#FFFFF0" }}
// //           >
// //             Add Product
// //           </button>
// //         </div>
// //       ) : (
// //         <>
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //             {products.map((product, i) => (
// //               <motion.div
// //                 key={product.id}
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ delay: i * 0.05 }}
// //                 className="group relative overflow-hidden"
// //                 style={{ border: "1px solid rgba(26,26,46,0.08)", background: "white" }}
// //               >
// //                 {/* Image */}
// //                 <div className="relative h-64 overflow-hidden" style={{ background: "rgba(26,26,46,0.04)" }}>
// //                   {product.imageUrl ? (
// //                     <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
// //                   ) : (
// //                     <div className="w-full h-full flex items-center justify-center">
// //                       <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(26,26,46,0.2)" strokeWidth="1.5">
// //                         <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
// //                       </svg>
// //                     </div>
// //                   )}
// //                   {/* Upload overlay */}
// //                   <label className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
// //                     style={{ background: "rgba(26,26,46,0.8)" }}>
// //                     <input
// //                       type="file"
// //                       accept="image/*"
// //                       className="hidden"
// //                       onChange={(e) => handleImageUpload(product.id, e.target.files[0])}
// //                       disabled={uploadingImage === product.id}
// //                     />
// //                     {uploadingImage === product.id ? (
// //                       <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
// //                         className="w-8 h-8 border-2 rounded-full" style={{ borderColor: "#D4AF37", borderTopColor: "transparent" }} />
// //                     ) : (
// //                       <div className="text-center">
// //                         <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" className="mx-auto mb-2">
// //                           <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
// //                         </svg>
// //                         <span className="text-xs tracking-widest uppercase" style={{ color: "#D4AF37" }}>Upload Image</span>
// //                       </div>
// //                     )}
// //                   </label>
// //                   {/* Badges */}
// //                   <div className="absolute top-3 left-3 flex flex-col gap-1">
// //                     {product.isFeatured && (
// //                       <div className="px-2 py-1 text-xs tracking-widest uppercase"
// //                         style={{ background: "rgba(212,175,55,0.9)", color: "#1A1A2E" }}>Featured</div>
// //                     )}
// //                     {!product.isActive && (
// //                       <div className="px-2 py-1 text-xs tracking-widest uppercase"
// //                         style={{ background: "rgba(128,0,0,0.9)", color: "#FFFFF0" }}>Inactive</div>
// //                     )}
// //                     {product.stockQuantity === 0 && (
// //                       <div className="px-2 py-1 text-xs tracking-widest uppercase"
// //                         style={{ background: "rgba(0,0,0,0.9)", color: "#FFFFF0" }}>Out of Stock</div>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* Info */}
// //                 <div className="p-4">
// //                   <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#D4AF37" }}>
// //                     {product.category?.name || "Uncategorized"}
// //                   </p>
// //                   <h3 className="text-base font-bold mb-1 line-clamp-1" style={{ color: "#1A1A2E" }}>{product.name}</h3>
// //                   <div className="flex items-center gap-2 mb-3">
// //                     <span className="text-lg font-bold" style={{ color: "#1A1A2E" }}>₹{product.price?.toLocaleString("en-IN")}</span>
// //                     {product.originalPrice && product.originalPrice > product.price && (
// //                       <span className="text-sm line-through" style={{ color: "rgba(54,69,79,0.4)" }}>
// //                         ₹{product.originalPrice?.toLocaleString("en-IN")}
// //                       </span>
// //                     )}
// //                   </div>
// //                   <p className="text-xs mb-3" style={{ color: "#36454F" }}>Stock: {product.stockQuantity}</p>
                  
// //                   {/* Actions */}
// //                   <div className="flex gap-2 mb-2">
// //                     <button
// //                       onClick={() => openModal(product)}
// //                       className="flex-1 px-3 py-2 text-xs tracking-widest uppercase transition-all"
// //                       style={{ border: "1px solid rgba(26,26,46,0.2)", color: "#1A1A2E" }}
// //                     >
// //                       Edit
// //                     </button>
// //                     <button
// //                       onClick={() => handleDelete(product.id)}
// //                       className="px-3 py-2 text-xs tracking-widest uppercase transition-all"
// //                       style={{ border: "1px solid rgba(128,0,0,0.2)", color: "#800000" }}
// //                     >
// //                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                         <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
// //                       </svg>
// //                     </button>
// //                   </div>
// //                   <div className="flex gap-2">
// //                     <button
// //                       onClick={() => toggleFeatured(product.id)}
// //                       className="flex-1 px-3 py-1.5 text-xs tracking-widest uppercase transition-all"
// //                       style={{ 
// //                         background: product.isFeatured ? "rgba(212,175,55,0.1)" : "transparent",
// //                         border: "1px solid rgba(212,175,55,0.3)", 
// //                         color: "#D4AF37" 
// //                       }}
// //                     >
// //                       ★ Featured
// //                     </button>
// //                     <button
// //                       onClick={() => toggleActive(product.id)}
// //                       className="flex-1 px-3 py-1.5 text-xs tracking-widest uppercase transition-all"
// //                       style={{ 
// //                         background: product.isActive ? "rgba(26,26,46,0.05)" : "rgba(128,0,0,0.05)",
// //                         border: `1px solid ${product.isActive ? "rgba(26,26,46,0.2)" : "rgba(128,0,0,0.2)"}`, 
// //                         color: product.isActive ? "#1A1A2E" : "#800000"
// //                       }}
// //                     >
// //                       {product.isActive ? "Active" : "Inactive"}
// //                     </button>
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </div>

// //           {/* Pagination */}
// //           {totalPages > 1 && (
// //             <div className="flex justify-center gap-2 mt-8">
// //               <button
// //                 onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
// //                 disabled={currentPage === 0}
// //                 className="px-4 py-2 text-sm tracking-widest uppercase transition-all disabled:opacity-30"
// //                 style={{ border: "1px solid rgba(26,26,46,0.2)", color: "#1A1A2E" }}
// //               >
// //                 Previous
// //               </button>
// //               <span className="px-4 py-2 text-sm" style={{ color: "#36454F" }}>
// //                 Page {currentPage + 1} of {totalPages}
// //               </span>
// //               <button
// //                 onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
// //                 disabled={currentPage >= totalPages - 1}
// //                 className="px-4 py-2 text-sm tracking-widest uppercase transition-all disabled:opacity-30"
// //                 style={{ border: "1px solid rgba(26,26,46,0.2)", color: "#1A1A2E" }}
// //               >
// //                 Next
// //               </button>
// //             </div>
// //           )}
// //         </>
// //       )}

// //       {/* Modal */}
// //       <AnimatePresence>
// //         {modalOpen && (
// //           <motion.div
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //             className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
// //             style={{ background: "rgba(26,26,46,0.8)" }}
// //             onClick={closeModal}
// //           >
// //             <motion.div
// //               initial={{ scale: 0.9, opacity: 0 }}
// //               animate={{ scale: 1, opacity: 1 }}
// //               exit={{ scale: 0.9, opacity: 0 }}
// //               className="w-full max-w-2xl p-6 my-8"
// //               style={{ background: "#FFFFF0", border: "1px solid rgba(26,26,46,0.1)" }}
// //               onClick={(e) => e.stopPropagation()}
// //             >
// //               <h2 className="text-2xl font-bold mb-6" style={{ color: "#1A1A2E" }}>
// //                 {editingProduct ? "Edit Product" : "New Product"}
// //               </h2>
// //               <form onSubmit={handleSubmit} className="space-y-4">
// //                 <div className="grid md:grid-cols-2 gap-4">
// //                   <div>
// //                     <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Product Name</label>
// //                     <input
// //                       type="text"
// //                       value={form.name}
// //                       onChange={(e) => setForm({ ...form, name: e.target.value })}
// //                       required
// //                       className="w-full px-4 py-3 text-base outline-none"
// //                       style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Category</label>
// //                     <select
// //                       value={form.categoryId}
// //                       onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
// //                       required
// //                       className="w-full px-4 py-3 text-base outline-none"
// //                       style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// //                     >
// //                       <option value="">Select category</option>
// //                       {categories.map(cat => (
// //                         <option key={cat.id} value={cat.id}>{cat.name}</option>
// //                       ))}
// //                     </select>
// //                   </div>
// //                 </div>

// //                 <div>
// //                   <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Description</label>
// //                   <textarea
// //                     value={form.description}
// //                     onChange={(e) => setForm({ ...form, description: e.target.value })}
// //                     rows="3"
// //                     className="w-full px-4 py-3 text-base outline-none"
// //                     style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// //                   />
// //                 </div>

// //                 <div className="grid md:grid-cols-3 gap-4">
// //                   <div>
// //                     <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Price (₹)</label>
// //                     <input
// //                       type="number"
// //                       step="0.01"
// //                       value={form.price}
// //                       onChange={(e) => setForm({ ...form, price: e.target.value })}
// //                       required
// //                       className="w-full px-4 py-3 text-base outline-none"
// //                       style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Original Price (₹)</label>
// //                     <input
// //                       type="number"
// //                       step="0.01"
// //                       value={form.originalPrice}
// //                       onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
// //                       className="w-full px-4 py-3 text-base outline-none"
// //                       style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Stock Quantity</label>
// //                     <input
// //                       type="number"
// //                       value={form.stockQuantity}
// //                       onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })}
// //                       required
// //                       className="w-full px-4 py-3 text-base outline-none"
// //                       style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// //                     />
// //                   </div>
// //                 </div>

// //                 <div className="flex gap-6">
// //                   <div className="flex items-center gap-3">
// //                     <input
// //                       type="checkbox"
// //                       id="isFeatured"
// //                       checked={form.isFeatured}
// //                       onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
// //                       className="w-4 h-4"
// //                     />
// //                     <label htmlFor="isFeatured" className="text-sm" style={{ color: "#36454F" }}>Featured Product</label>
// //                   </div>
// //                   <div className="flex items-center gap-3">
// //                     <input
// //                       type="checkbox"
// //                       id="isActive"
// //                       checked={form.isActive}
// //                       onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
// //                       className="w-4 h-4"
// //                     />
// //                     <label htmlFor="isActive" className="text-sm" style={{ color: "#36454F" }}>Active (visible on site)</label>
// //                   </div>
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
// //                     {loading ? "Saving..." : editingProduct ? "Update" : "Create"}
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
// //   gold: "#D4AF37", red: "#800000", danger: "#E74C3C", green: "#2ECC71",
// // };

// // const inputStyle = {
// //   width: "100%", padding: "11px 13px", background: "#0C0C16",
// //   border: "1px solid rgba(212,175,55,0.18)", borderRadius: 8,
// //   color: D.text, fontSize: 15, outline: "none", fontFamily: "inherit",
// // };

// // export default function AdminProducts() {
// //   const [products, setProducts] = useState([]);
// //   const [categories, setCategories] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [editingProduct, setEditingProduct] = useState(null);
// //   const [saving, setSaving] = useState(false);
// //   const [form, setForm] = useState({ name: "", description: "", price: "", originalPrice: "", discountPercent: 0, stockQuantity: 0, categoryId: "", isFeatured: false, isActive: true });
// //   const [uploadingImage, setUploadingImage] = useState(null);
// //   const [currentPage, setCurrentPage] = useState(0);
// //   const [totalPages, setTotalPages] = useState(0);
// //   const [searchQuery, setSearchQuery] = useState("");

// //   useEffect(() => { fetchProducts(); fetchCategories(); }, [currentPage, searchQuery]);

// //   const fetchProducts = async () => {
// //     try {
// //       const data = await adminAPI.getAllProducts(currentPage, 20, searchQuery);
// //       setProducts(data.content || []); setTotalPages(data.totalPages || 0);
// //     } catch (err) { console.error("Failed to fetch products", err); }
// //     finally { setLoading(false); }
// //   };

// //   const fetchCategories = async () => {
// //     try { setCategories(await adminAPI.getAllCategories()); }
// //     catch (err) { console.error("Failed to fetch categories", err); }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault(); setSaving(true);
// //     try {
// //       const payload = { ...form, price: parseFloat(form.price), originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null, discountPercent: parseInt(form.discountPercent) || 0, stockQuantity: parseInt(form.stockQuantity) || 0, categoryId: parseInt(form.categoryId) };
// //       if (editingProduct) await adminAPI.updateProduct(editingProduct.id, payload);
// //       else await adminAPI.createProduct(payload);
// //       fetchProducts(); closeModal();
// //     } catch (err) { alert(err.response?.data?.message || "Failed to save product"); }
// //     finally { setSaving(false); }
// //   };

// //   const handleImageUpload = async (productId, file) => {
// //     setUploadingImage(productId);
// //     try { await adminAPI.uploadProductImage(productId, file); fetchProducts(); }
// //     catch { alert("Image upload failed"); }
// //     finally { setUploadingImage(null); }
// //   };

// //   const handleDelete = async (id) => {
// //     if (!confirm("Delete this product?")) return;
// //     try { await adminAPI.deleteProduct(id); fetchProducts(); }
// //     catch { alert("Failed to delete product"); }
// //   };

// //   const toggleFeatured = async (id) => { try { await adminAPI.toggleFeatured(id); fetchProducts(); } catch { alert("Failed"); } };
// //   const toggleActive = async (id) => { try { await adminAPI.toggleActive(id); fetchProducts(); } catch { alert("Failed"); } };

// //   const openModal = (product = null) => {
// //     if (product) {
// //       setEditingProduct(product);
// //       setForm({ name: product.name, description: product.description || "", price: product.price.toString(), originalPrice: product.originalPrice?.toString() || "", discountPercent: product.discountPercent || 0, stockQuantity: product.stockQuantity || 0, categoryId: product.category?.id?.toString() || "", isFeatured: product.isFeatured || false, isActive: product.isActive !== false });
// //     } else {
// //       setEditingProduct(null);
// //       setForm({ name: "", description: "", price: "", originalPrice: "", discountPercent: 0, stockQuantity: 0, categoryId: "", isFeatured: false, isActive: true });
// //     }
// //     setModalOpen(true);
// //   };
// //   const closeModal = () => { setModalOpen(false); setEditingProduct(null); };

// //   return (
// //     <div style={{ fontFamily: "'Cormorant Garamond', serif", color: D.text }}>

// //       {/* Header */}
// //       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, gap: 16, flexWrap: "wrap" }}>
// //         <div>
// //           <h1 style={{ fontSize: 30, fontWeight: 700, color: D.text, marginBottom: 6 }}>Products</h1>
// //           <p style={{ fontSize: 15, color: D.muted }}>Manage your product catalog</p>
// //         </div>
// //         <div style={{ display: "flex", gap: 12 }}>
// //           <input type="text" placeholder="Search products..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
// //             style={{ padding: "11px 16px", background: D.card, border: `1px solid ${D.border}`, borderRadius: 8, color: D.text, fontSize: 15, outline: "none", minWidth: 220 }} />
// //           <button onClick={() => openModal()} style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 22px", background: D.red, color: D.text, border: "none", cursor: "pointer", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 6, whiteSpace: "nowrap" }}>
// //             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
// //             Add Product
// //           </button>
// //         </div>
// //       </div>

// //       {/* Grid */}
// //       {loading ? (
// //         <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
// //           {[...Array(8)].map((_, i) => <div key={i} style={{ height: 380, background: D.card, borderRadius: 14, opacity: 0.5 }} />)}
// //         </div>
// //       ) : products.length === 0 ? (
// //         <div style={{ textAlign: "center", padding: "80px 20px", border: "1px dashed rgba(212,175,55,0.2)", borderRadius: 14 }}>
// //           <div style={{ width: 64, height: 64, margin: "0 auto 20px", background: D.gold, opacity: 0.15, clipPath: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)" }} />
// //           <p style={{ fontSize: 20, color: D.muted, marginBottom: 8 }}>No products yet</p>
// //           <p style={{ fontSize: 15, color: D.dim, marginBottom: 24 }}>Create your first product to get started</p>
// //           <button onClick={() => openModal()} style={{ padding: "12px 24px", background: D.red, color: D.text, border: "none", cursor: "pointer", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 6 }}>Add Product</button>
// //         </div>
// //       ) : (
// //         <>
// //           <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
// //             {products.map((product, i) => (
// //               <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
// //                 className="prod-card"
// //                 style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 14, overflow: "hidden", position: "relative" }}>

// //                 {/* Image */}
// //                 <div className="prod-img-wrap" style={{ position: "relative", height: 220, background: "#0C0C16", overflow: "hidden" }}>
// //                   {product.imageUrl
// //                     ? <img src={product.imageUrl} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
// //                     : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
// //                         <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,55,0.15)" strokeWidth="1.2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
// //                       </div>
// //                   }
// //                   <label className="prod-overlay" style={{ position: "absolute", inset: 0, background: "rgba(12,12,22,0.85)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: 0, transition: "opacity 0.2s" }}>
// //                     <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => handleImageUpload(product.id, e.target.files[0])} disabled={uploadingImage === product.id} />
// //                     {uploadingImage === product.id
// //                       ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ width: 30, height: 30, border: `2px solid ${D.gold}`, borderTopColor: "transparent", borderRadius: "50%" }} />
// //                       : <div style={{ textAlign: "center" }}>
// //                           <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={D.gold} strokeWidth="1.5" style={{ display: "block", margin: "0 auto 6px" }}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
// //                           <span style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: D.gold }}>Upload</span>
// //                         </div>
// //                     }
// //                   </label>
// //                   {/* Badges */}
// //                   <div style={{ position: "absolute", top: 10, left: 10, display: "flex", flexDirection: "column", gap: 4 }}>
// //                     {product.isFeatured && <span style={{ padding: "3px 9px", background: "rgba(212,175,55,0.92)", color: "#1A1A2E", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 4, fontWeight: 700 }}>Featured</span>}
// //                     {!product.isActive && <span style={{ padding: "3px 9px", background: "rgba(231,76,60,0.92)", color: "#fff", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 4 }}>Inactive</span>}
// //                     {product.stockQuantity === 0 && <span style={{ padding: "3px 9px", background: "rgba(0,0,0,0.85)", color: "#fff", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 4 }}>Out of Stock</span>}
// //                   </div>
// //                 </div>

// //                 {/* Info */}
// //                 <div style={{ padding: "14px 16px" }}>
// //                   <p style={{ fontSize: 11, color: D.gold, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 5 }}>{product.category?.name || "Uncategorized"}</p>
// //                   <h3 style={{ fontSize: 16, fontWeight: 700, color: D.text, marginBottom: 8, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{product.name}</h3>
// //                   <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
// //                     <span style={{ fontSize: 18, fontWeight: 700, color: D.text }}>₹{product.price?.toLocaleString("en-IN")}</span>
// //                     {product.originalPrice && product.originalPrice > product.price && (
// //                       <span style={{ fontSize: 13, color: D.dim, textDecoration: "line-through" }}>₹{product.originalPrice?.toLocaleString("en-IN")}</span>
// //                     )}
// //                   </div>
// //                   <p style={{ fontSize: 13, color: D.muted, marginBottom: 12 }}>Stock: {product.stockQuantity}</p>

// //                   <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
// //                     <button onClick={() => openModal(product)} style={{ flex: 1, padding: "9px", background: "rgba(212,175,55,0.08)", border: `1px solid rgba(212,175,55,0.2)`, color: D.gold, cursor: "pointer", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 6 }}>Edit</button>
// //                     <button onClick={() => handleDelete(product.id)} style={{ padding: "9px 13px", background: "rgba(231,76,60,0.08)", border: `1px solid rgba(231,76,60,0.2)`, color: D.danger, cursor: "pointer", borderRadius: 6 }}>
// //                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
// //                     </button>
// //                   </div>
// //                   <div style={{ display: "flex", gap: 8 }}>
// //                     <button onClick={() => toggleFeatured(product.id)} style={{ flex: 1, padding: "8px 6px", background: product.isFeatured ? "rgba(212,175,55,0.14)" : "transparent", border: `1px solid rgba(212,175,55,0.25)`, color: D.gold, cursor: "pointer", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 6 }}>★ {product.isFeatured ? "Featured" : "Feature"}</button>
// //                     <button onClick={() => toggleActive(product.id)} style={{ flex: 1, padding: "8px 6px", background: product.isActive ? "rgba(46,204,113,0.08)" : "rgba(231,76,60,0.08)", border: `1px solid ${product.isActive ? "rgba(46,204,113,0.25)" : "rgba(231,76,60,0.25)"}`, color: product.isActive ? D.green : D.danger, cursor: "pointer", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 6 }}>
// //                       {product.isActive ? "Active" : "Inactive"}
// //                     </button>
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </div>

// //           {/* Pagination */}
// //           {totalPages > 1 && (
// //             <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginTop: 32 }}>
// //               <button onClick={() => setCurrentPage(p => Math.max(0, p - 1))} disabled={currentPage === 0}
// //                 style={{ padding: "10px 20px", background: D.card, border: `1px solid ${D.border}`, color: currentPage === 0 ? D.dim : D.text, cursor: currentPage === 0 ? "not-allowed" : "pointer", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 6, opacity: currentPage === 0 ? 0.4 : 1 }}>Previous</button>
// //               <span style={{ fontSize: 15, color: D.muted }}>Page {currentPage + 1} of {totalPages}</span>
// //               <button onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))} disabled={currentPage >= totalPages - 1}
// //                 style={{ padding: "10px 20px", background: D.card, border: `1px solid ${D.border}`, color: currentPage >= totalPages - 1 ? D.dim : D.text, cursor: currentPage >= totalPages - 1 ? "not-allowed" : "pointer", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 6, opacity: currentPage >= totalPages - 1 ? 0.4 : 1 }}>Next</button>
// //             </div>
// //           )}
// //         </>
// //       )}

// //       {/* Modal */}
// //       <AnimatePresence>
// //         {modalOpen && (
// //           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
// //             style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, background: "rgba(12,12,22,0.9)", overflowY: "auto" }}
// //             onClick={closeModal}>
// //             <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
// //               style={{ width: "100%", maxWidth: 620, background: "#10101C", border: `1px solid ${D.border}`, borderRadius: 16, padding: "28px 28px", margin: "auto" }}
// //               onClick={e => e.stopPropagation()}>

// //               <h2 style={{ fontSize: 26, fontWeight: 700, color: D.text, marginBottom: 24 }}>
// //                 {editingProduct ? "Edit Product" : "New Product"}
// //               </h2>

// //               <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
// //                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
// //                   <div>
// //                     <label style={{ display: "block", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: D.muted, marginBottom: 8 }}>Product Name</label>
// //                     <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required style={inputStyle} placeholder="e.g. Kanjivaram Silk Saree" />
// //                   </div>
// //                   <div>
// //                     <label style={{ display: "block", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: D.muted, marginBottom: 8 }}>Category</label>
// //                     <select value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })} required style={{ ...inputStyle, cursor: "pointer" }}>
// //                       <option value="">Select category</option>
// //                       {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
// //                     </select>
// //                   </div>
// //                 </div>

// //                 <div>
// //                   <label style={{ display: "block", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: D.muted, marginBottom: 8 }}>Description</label>
// //                   <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} style={{ ...inputStyle, resize: "vertical" }} placeholder="Product details, fabric type, occasion..." />
// //                 </div>

// //                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
// //                   <div>
// //                     <label style={{ display: "block", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: D.muted, marginBottom: 8 }}>Price (₹)</label>
// //                     <input type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required style={inputStyle} placeholder="0.00" />
// //                   </div>
// //                   <div>
// //                     <label style={{ display: "block", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: D.muted, marginBottom: 8 }}>Original Price (₹)</label>
// //                     <input type="number" step="0.01" value={form.originalPrice} onChange={e => setForm({ ...form, originalPrice: e.target.value })} style={inputStyle} placeholder="Before discount" />
// //                   </div>
// //                   <div>
// //                     <label style={{ display: "block", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: D.muted, marginBottom: 8 }}>Stock Qty</label>
// //                     <input type="number" value={form.stockQuantity} onChange={e => setForm({ ...form, stockQuantity: e.target.value })} required style={inputStyle} placeholder="0" />
// //                   </div>
// //                 </div>

// //                 <div style={{ display: "flex", gap: 14 }}>
// //                   {[
// //                     { id: "isFeatured", label: "Featured Product", key: "isFeatured" },
// //                     { id: "isActive2", label: "Active (visible on site)", key: "isActive" },
// //                   ].map(({ id, label, key }) => (
// //                     <div key={id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.12)", borderRadius: 8, cursor: "pointer" }} onClick={() => setForm({ ...form, [key]: !form[key] })}>
// //                       <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${form[key] ? D.gold : "rgba(255,255,240,0.2)"}`, background: form[key] ? D.gold : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
// //                         {form[key] && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
// //                       </div>
// //                       <label style={{ fontSize: 14, color: D.muted, cursor: "pointer" }}>{label}</label>
// //                     </div>
// //                   ))}
// //                 </div>

// //                 <div style={{ display: "flex", gap: 12, paddingTop: 6 }}>
// //                   <button type="button" onClick={closeModal} style={{ flex: 1, padding: "13px", background: "transparent", border: "1px solid rgba(255,255,240,0.15)", color: D.muted, cursor: "pointer", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 8 }}>Cancel</button>
// //                   <button type="submit" disabled={saving} style={{ flex: 1, padding: "13px", background: D.red, color: D.text, border: "none", cursor: "pointer", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 8, opacity: saving ? 0.7 : 1 }}>
// //                     {saving ? "Saving..." : editingProduct ? "Update" : "Create"}
// //                   </button>
// //                 </div>
// //               </form>
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       <style>{`
// //         .prod-card:hover .prod-overlay { opacity: 1 !important; }
// //         input::placeholder, textarea::placeholder { color: rgba(255,255,240,0.2); }
// //         select option { background: #14142A; color: #FFFFF0; }
// //         input[type=number]::-webkit-inner-spin-button { opacity: 0.3; }
// //       `}</style>
// //     </div>
// //   );
// // }



// // import { useState, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { adminAPI } from "../../api";

// // export default function AdminProducts() {
// //   const [products, setProducts] = useState([]);
// //   const [categories, setCategories] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [editingProduct, setEditingProduct] = useState(null);
// //   const [form, setForm] = useState({
// //     name: "",
// //     description: "",
// //     price: "",
// //     originalPrice: "",
// //     discountPercent: 0,
// //     stockQuantity: 0,
// //     categoryId: "",
// //     isFeatured: false,
// //     isActive: true,
// //     colour: "",
// //     size: "",
// //     gender: "",
// //     fabric: "",
// //     occasion: "",
// //   });
// //   const [uploadingImage, setUploadingImage] = useState(null);
// //   const [currentPage, setCurrentPage] = useState(0);
// //   const [totalPages, setTotalPages] = useState(0);
// //   const [searchQuery, setSearchQuery] = useState("");

// //   useEffect(() => {
// //     fetchProducts();
// //     fetchCategories();
// //   }, [currentPage, searchQuery]);

// //   const fetchProducts = async () => {
// //     try {
// //       const data = await adminAPI.getAllProducts(currentPage, 20, searchQuery);
// //       setProducts(data.content || []);
// //       setTotalPages(data.totalPages || 0);
// //     } catch (err) {
// //       console.error("Failed to fetch products", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchCategories = async () => {
// //     try {
// //       const data = await adminAPI.getAllCategories();
// //       setCategories(data);
// //     } catch (err) {
// //       console.error("Failed to fetch categories", err);
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     try {
// //       const payload = {
// //         ...form,
// //         price: parseFloat(form.price),
// //         originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
// //         discountPercent: parseInt(form.discountPercent) || 0,
// //         stockQuantity: parseInt(form.stockQuantity) || 0,
// //         categoryId: parseInt(form.categoryId),
// //       };

// //       if (editingProduct) {
// //         await adminAPI.updateProduct(editingProduct.id, payload);
// //       } else {
// //         await adminAPI.createProduct(payload);
// //       }
// //       fetchProducts();
// //       closeModal();
// //     } catch (err) {
// //       alert(err.response?.data?.message || "Failed to save product");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleImageUpload = async (productId, file) => {
// //     setUploadingImage(productId);
// //     try {
// //       await adminAPI.uploadProductImage(productId, file);
// //       fetchProducts();
// //     } catch (err) {
// //       alert("Image upload failed");
// //     } finally {
// //       setUploadingImage(null);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     if (!confirm("Delete this product?")) return;
// //     try {
// //       await adminAPI.deleteProduct(id);
// //       fetchProducts();
// //     } catch (err) {
// //       alert("Failed to delete product");
// //     }
// //   };

// //   const toggleFeatured = async (id) => {
// //     try {
// //       await adminAPI.toggleFeatured(id);
// //       fetchProducts();
// //     } catch (err) {
// //       alert("Failed to toggle featured status");
// //     }
// //   };

// //   const toggleActive = async (id) => {
// //     try {
// //       await adminAPI.toggleActive(id);
// //       fetchProducts();
// //     } catch (err) {
// //       alert("Failed to toggle active status");
// //     }
// //   };

// //   const openModal = (product = null) => {
// //     if (product) {
// //       setEditingProduct(product);
// //       setForm({
// //         name: product.name,
// //         description: product.description || "",
// //         price: product.price.toString(),
// //         originalPrice: product.originalPrice?.toString() || "",
// //         discountPercent: product.discountPercent || 0,
// //         stockQuantity: product.stockQuantity || 0,
// //         categoryId: product.category?.id?.toString() || "",
// //         isFeatured: product.isFeatured || false,
// //         isActive: product.isActive !== false,
// //       });
// //     } else {
// //       setEditingProduct(null);
// //       setForm({
// //         name: "",
// //         description: "",
// //         price: "",
// //         originalPrice: "",
// //         discountPercent: 0,
// //         stockQuantity: 0,
// //         categoryId: "",
// //         isFeatured: false,
// //         isActive: true,
// //       });
// //     }
// //     setModalOpen(true);
// //   };

// //   const closeModal = () => {
// //     setModalOpen(false);
// //     setEditingProduct(null);
// //   };

// //   return (
// //     <div style={{ fontFamily: "'Cormorant Garamond', serif" }}>
// //       {/* Header */}
// //       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
// //         <div>
// //           <h1 className="text-3xl font-bold mb-1" style={{ color: "#1A1A2E" }}>Products</h1>
// //           <p className="text-sm" style={{ color: "#36454F" }}>Manage your product catalog</p>
// //         </div>
// //         <div className="flex gap-3">
// //           <input
// //             type="text"
// //             placeholder="Search products..."
// //             value={searchQuery}
// //             onChange={(e) => setSearchQuery(e.target.value)}
// //             className="px-4 py-2 text-sm outline-none"
// //             style={{ border: "1px solid rgba(26,26,46,0.2)", minWidth: "200px" }}
// //           />
// //           <button
// //             onClick={() => openModal()}
// //             className="flex items-center gap-2 px-6 py-3 text-sm tracking-widest uppercase font-semibold transition-all whitespace-nowrap"
// //             style={{ background: "#800000", color: "#FFFFF0" }}
// //             onMouseEnter={e => e.currentTarget.style.background = "#900000"}
// //             onMouseLeave={e => e.currentTarget.style.background = "#800000"}
// //           >
// //             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //               <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
// //             </svg>
// //             Add Product
// //           </button>
// //         </div>
// //       </div>

// //       {/* Products Grid */}
// //       {loading ? (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //           {[...Array(8)].map((_, i) => (
// //             <div key={i} className="h-96 animate-pulse" style={{ background: "rgba(26,26,46,0.04)" }} />
// //           ))}
// //         </div>
// //       ) : products.length === 0 ? (
// //         <div className="text-center py-20" style={{ border: "1px dashed rgba(26,26,46,0.15)" }}>
// //           <div className="w-16 h-16 mx-auto mb-4 opacity-20"
// //             style={{ background: "#D4AF37", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
// //           <p className="text-lg mb-2" style={{ color: "#36454F" }}>No products yet</p>
// //           <p className="text-sm mb-6" style={{ color: "rgba(54,69,79,0.6)" }}>Create your first product to get started</p>
// //           <button
// //             onClick={() => openModal()}
// //             className="px-6 py-3 text-sm tracking-widest uppercase"
// //             style={{ background: "#800000", color: "#FFFFF0" }}
// //           >
// //             Add Product
// //           </button>
// //         </div>
// //       ) : (
// //         <>
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //             {products.map((product, i) => (
// //               <motion.div
// //                 key={product.id}
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ delay: i * 0.05 }}
// //                 className="group relative overflow-hidden"
// //                 style={{ border: "1px solid rgba(26,26,46,0.08)", background: "white" }}
// //               >
// //                 {/* Image */}
// //                 <div className="relative h-64 overflow-hidden" style={{ background: "rgba(26,26,46,0.04)" }}>
// //                   {product.imageUrl ? (
// //                     <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
// //                   ) : (
// //                     <div className="w-full h-full flex items-center justify-center">
// //                       <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(26,26,46,0.2)" strokeWidth="1.5">
// //                         <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
// //                       </svg>
// //                     </div>
// //                   )}
// //                   {/* Upload overlay */}
// //                   <label className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
// //                     style={{ background: "rgba(26,26,46,0.8)" }}>
// //                     <input
// //                       type="file"
// //                       accept="image/*"
// //                       className="hidden"
// //                       onChange={(e) => handleImageUpload(product.id, e.target.files[0])}
// //                       disabled={uploadingImage === product.id}
// //                     />
// //                     {uploadingImage === product.id ? (
// //                       <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
// //                         className="w-8 h-8 border-2 rounded-full" style={{ borderColor: "#D4AF37", borderTopColor: "transparent" }} />
// //                     ) : (
// //                       <div className="text-center">
// //                         <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" className="mx-auto mb-2">
// //                           <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
// //                         </svg>
// //                         <span className="text-xs tracking-widest uppercase" style={{ color: "#D4AF37" }}>Upload Image</span>
// //                       </div>
// //                     )}
// //                   </label>
// //                   {/* Badges */}
// //                   <div className="absolute top-3 left-3 flex flex-col gap-1">
// //                     {product.isFeatured && (
// //                       <div className="px-2 py-1 text-xs tracking-widest uppercase"
// //                         style={{ background: "rgba(212,175,55,0.9)", color: "#1A1A2E" }}>Featured</div>
// //                     )}
// //                     {!product.isActive && (
// //                       <div className="px-2 py-1 text-xs tracking-widest uppercase"
// //                         style={{ background: "rgba(128,0,0,0.9)", color: "#FFFFF0" }}>Inactive</div>
// //                     )}
// //                     {product.stockQuantity === 0 && (
// //                       <div className="px-2 py-1 text-xs tracking-widest uppercase"
// //                         style={{ background: "rgba(0,0,0,0.9)", color: "#FFFFF0" }}>Out of Stock</div>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* Info */}
// //                 <div className="p-4">
// //                   <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#D4AF37" }}>
// //                     {product.category?.name || "Uncategorized"}
// //                   </p>
// //                   <h3 className="text-base font-bold mb-1 line-clamp-1" style={{ color: "#1A1A2E" }}>{product.name}</h3>
// //                   <div className="flex items-center gap-2 mb-3">
// //                     <span className="text-lg font-bold" style={{ color: "#1A1A2E" }}>₹{product.price?.toLocaleString("en-IN")}</span>
// //                     {product.originalPrice && product.originalPrice > product.price && (
// //                       <span className="text-sm line-through" style={{ color: "rgba(54,69,79,0.4)" }}>
// //                         ₹{product.originalPrice?.toLocaleString("en-IN")}
// //                       </span>
// //                     )}
// //                   </div>
// //                   <p className="text-xs mb-3" style={{ color: "#36454F" }}>Stock: {product.stockQuantity}</p>
                  
// //                   {/* Actions */}
// //                   <div className="flex gap-2 mb-2">
// //                     <button
// //                       onClick={() => openModal(product)}
// //                       className="flex-1 px-3 py-2 text-xs tracking-widest uppercase transition-all"
// //                       style={{ border: "1px solid rgba(26,26,46,0.2)", color: "#1A1A2E" }}
// //                     >
// //                       Edit
// //                     </button>
// //                     <button
// //                       onClick={() => handleDelete(product.id)}
// //                       className="px-3 py-2 text-xs tracking-widest uppercase transition-all"
// //                       style={{ border: "1px solid rgba(128,0,0,0.2)", color: "#800000" }}
// //                     >
// //                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                         <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
// //                       </svg>
// //                     </button>
// //                   </div>
// //                   <div className="flex gap-2">
// //                     <button
// //                       onClick={() => toggleFeatured(product.id)}
// //                       className="flex-1 px-3 py-1.5 text-xs tracking-widest uppercase transition-all"
// //                       style={{ 
// //                         background: product.isFeatured ? "rgba(212,175,55,0.1)" : "transparent",
// //                         border: "1px solid rgba(212,175,55,0.3)", 
// //                         color: "#D4AF37" 
// //                       }}
// //                     >
// //                       ★ Featured
// //                     </button>
// //                     <button
// //                       onClick={() => toggleActive(product.id)}
// //                       className="flex-1 px-3 py-1.5 text-xs tracking-widest uppercase transition-all"
// //                       style={{ 
// //                         background: product.isActive ? "rgba(26,26,46,0.05)" : "rgba(128,0,0,0.05)",
// //                         border: `1px solid ${product.isActive ? "rgba(26,26,46,0.2)" : "rgba(128,0,0,0.2)"}`, 
// //                         color: product.isActive ? "#1A1A2E" : "#800000"
// //                       }}
// //                     >
// //                       {product.isActive ? "Active" : "Inactive"}
// //                     </button>
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </div>

// //           {/* Pagination */}
// //           {totalPages > 1 && (
// //             <div className="flex justify-center gap-2 mt-8">
// //               <button
// //                 onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
// //                 disabled={currentPage === 0}
// //                 className="px-4 py-2 text-sm tracking-widest uppercase transition-all disabled:opacity-30"
// //                 style={{ border: "1px solid rgba(26,26,46,0.2)", color: "#1A1A2E" }}
// //               >
// //                 Previous
// //               </button>
// //               <span className="px-4 py-2 text-sm" style={{ color: "#36454F" }}>
// //                 Page {currentPage + 1} of {totalPages}
// //               </span>
// //               <button
// //                 onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
// //                 disabled={currentPage >= totalPages - 1}
// //                 className="px-4 py-2 text-sm tracking-widest uppercase transition-all disabled:opacity-30"
// //                 style={{ border: "1px solid rgba(26,26,46,0.2)", color: "#1A1A2E" }}
// //               >
// //                 Next
// //               </button>
// //             </div>
// //           )}
// //         </>
// //       )}

// //       {/* Modal */}
// //       <AnimatePresence>
// //         {modalOpen && (
// //           <motion.div
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //             className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
// //             style={{ background: "rgba(26,26,46,0.8)" }}
// //             onClick={closeModal}
// //           >
// //             <motion.div
// //               initial={{ scale: 0.9, opacity: 0 }}
// //               animate={{ scale: 1, opacity: 1 }}
// //               exit={{ scale: 0.9, opacity: 0 }}
// //               className="w-full max-w-2xl p-6 my-8"
// //               style={{ background: "#FFFFF0", border: "1px solid rgba(26,26,46,0.1)" }}
// //               onClick={(e) => e.stopPropagation()}
// //             >
// //               <h2 className="text-2xl font-bold mb-6" style={{ color: "#1A1A2E" }}>
// //                 {editingProduct ? "Edit Product" : "New Product"}
// //               </h2>
// //               <form onSubmit={handleSubmit} className="space-y-4">
// //                 <div className="grid md:grid-cols-2 gap-4">
// //                   <div>
// //                     <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Product Name</label>
// //                     <input
// //                       type="text"
// //                       value={form.name}
// //                       onChange={(e) => setForm({ ...form, name: e.target.value })}
// //                       required
// //                       className="w-full px-4 py-3 text-base outline-none"
// //                       style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Category</label>
// //                     <select
// //                       value={form.categoryId}
// //                       onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
// //                       required
// //                       className="w-full px-4 py-3 text-base outline-none"
// //                       style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// //                     >
// //                       <option value="">Select category</option>
// //                       {categories.map(cat => (
// //                         <option key={cat.id} value={cat.id}>{cat.name}</option>
// //                       ))}
// //                     </select>
// //                   </div>
// //                 </div>

// //                 <div>
// //                   <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Description</label>
// //                   <textarea
// //                     value={form.description}
// //                     onChange={(e) => setForm({ ...form, description: e.target.value })}
// //                     rows="3"
// //                     className="w-full px-4 py-3 text-base outline-none"
// //                     style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// //                   />
// //                 </div>

// //                 <div className="grid md:grid-cols-3 gap-4">
// //                   <div>
// //                     <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Price (₹)</label>
// //                     <input
// //                       type="number"
// //                       step="0.01"
// //                       value={form.price}
// //                       onChange={(e) => setForm({ ...form, price: e.target.value })}
// //                       required
// //                       className="w-full px-4 py-3 text-base outline-none"
// //                       style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Original Price (₹)</label>
// //                     <input
// //                       type="number"
// //                       step="0.01"
// //                       value={form.originalPrice}
// //                       onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
// //                       className="w-full px-4 py-3 text-base outline-none"
// //                       style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Stock Quantity</label>
// //                     <input
// //                       type="number"
// //                       value={form.stockQuantity}
// //                       onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })}
// //                       required
// //                       className="w-full px-4 py-3 text-base outline-none"
// //                       style={{ border: "1px solid rgba(26,26,46,0.2)" }}
// //                     />
// //                   </div>
// //                 </div>

// //                 {/* ── Product Attributes ── */}
// //                 <div style={{ borderTop: "1px solid rgba(26,26,46,0.08)", paddingTop: 16 }}>
// //                   <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#800000", marginBottom: 14 }}>
// //                     Product Attributes <span style={{ fontSize: 10, color: "#888", fontWeight: 400 }}>(used for filters)</span>
// //                   </p>
// //                   <div className="grid md:grid-cols-3 gap-4">
// //                     <div>
// //                       <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Colour</label>
// //                       <select value={form.colour} onChange={(e) => setForm({ ...form, colour: e.target.value })}
// //                         className="w-full px-4 py-3 text-base outline-none" style={{ border: "1px solid rgba(26,26,46,0.2)" }}>
// //                         <option value="">Select colour</option>
// //                         {["Black","White","Red","Navy Blue","Blue","Green","Pink","Yellow","Orange","Purple","Brown","Grey","Maroon","Gold","Cream","Multi-colour"].map(c => (
// //                           <option key={c} value={c}>{c}</option>
// //                         ))}
// //                       </select>
// //                     </div>
// //                     <div>
// //                       <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Gender</label>
// //                       <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}
// //                         className="w-full px-4 py-3 text-base outline-none" style={{ border: "1px solid rgba(26,26,46,0.2)" }}>
// //                         <option value="">Select gender</option>
// //                         <option value="Women">Women</option>
// //                         <option value="Men">Men</option>
// //                         <option value="Kids">Kids</option>
// //                         <option value="Unisex">Unisex</option>
// //                       </select>
// //                     </div>
// //                     <div>
// //                       <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Size</label>
// //                       <select value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })}
// //                         className="w-full px-4 py-3 text-base outline-none" style={{ border: "1px solid rgba(26,26,46,0.2)" }}>
// //                         <option value="">Select size</option>
// //                         {["Free Size","XS","S","M","L","XL","XXL","XS-XL","S-XL"].map(s => (
// //                           <option key={s} value={s}>{s}</option>
// //                         ))}
// //                       </select>
// //                     </div>
// //                     <div>
// //                       <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Fabric / Material</label>
// //                       <select value={form.fabric} onChange={(e) => setForm({ ...form, fabric: e.target.value })}
// //                         className="w-full px-4 py-3 text-base outline-none" style={{ border: "1px solid rgba(26,26,46,0.2)" }}>
// //                         <option value="">Select fabric</option>
// //                         {["Pure Silk","Kanjivaram Silk","Banarasi Silk","Tussar Silk","Chanderi","Cotton","Cotton Silk","Georgette","Chiffon","Linen","Polyester","Crepe"].map(f => (
// //                           <option key={f} value={f}>{f}</option>
// //                         ))}
// //                       </select>
// //                     </div>
// //                     <div>
// //                       <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Occasion</label>
// //                       <select value={form.occasion} onChange={(e) => setForm({ ...form, occasion: e.target.value })}
// //                         className="w-full px-4 py-3 text-base outline-none" style={{ border: "1px solid rgba(26,26,46,0.2)" }}>
// //                         <option value="">Select occasion</option>
// //                         {["Wedding","Festival","Casual","Party","Office","Daily Wear","Traditional","Formal"].map(o => (
// //                           <option key={o} value={o}>{o}</option>
// //                         ))}
// //                       </select>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="flex gap-6">
// //                   <div className="flex items-center gap-3">
// //                     <input
// //                       type="checkbox"
// //                       id="isFeatured"
// //                       checked={form.isFeatured}
// //                       onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
// //                       className="w-4 h-4"
// //                     />
// //                     <label htmlFor="isFeatured" className="text-sm" style={{ color: "#36454F" }}>Featured Product</label>
// //                   </div>
// //                   <div className="flex items-center gap-3">
// //                     <input
// //                       type="checkbox"
// //                       id="isActive"
// //                       checked={form.isActive}
// //                       onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
// //                       className="w-4 h-4"
// //                     />
// //                     <label htmlFor="isActive" className="text-sm" style={{ color: "#36454F" }}>Active (visible on site)</label>
// //                   </div>
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
// //                     {loading ? "Saving..." : editingProduct ? "Update" : "Create"}
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

// // const T = {
// //   bg: "#080810", surface: "#0f0f1a", card: "#13131f",
// //   border: "rgba(255,255,255,0.06)", borderHi: "rgba(212,175,55,0.22)",
// //   gold: "#D4AF37", maroon: "#800000",
// //   text: "#F0EEE8", muted: "rgba(240,238,232,0.45)", dim: "rgba(240,238,232,0.22)",
// //   danger: "#f87171", dangerBg: "rgba(248,113,113,0.08)", dangerBorder: "rgba(248,113,113,0.2)",
// //   green: "#34D399", greenBg: "rgba(52,211,153,0.08)", greenBorder: "rgba(52,211,153,0.2)",
// // };
// // const SERIF = "'Cormorant Garamond', Georgia, serif";
// // const SANS  = "'DM Sans', 'Segoe UI', system-ui, sans-serif";

// // const iStyle = {
// //   width: "100%", padding: "11px 14px", background: "#0a0a14",
// //   border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8,
// //   color: T.text, fontSize: 14, outline: "none", fontFamily: SANS, transition: "border-color 0.15s",
// // };
// // const labelStyle = {
// //   display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em",
// //   textTransform: "uppercase", color: T.muted, marginBottom: 7,
// // };
// // const onFocus  = e => e.target.style.borderColor = "rgba(212,175,55,0.35)";
// // const onBlur   = e => e.target.style.borderColor = "rgba(255,255,255,0.08)";

// // const EMPTY_FORM = {
// //   name: "", description: "", price: "", originalPrice: "", discountPercent: 0,
// //   stockQuantity: 0, categoryId: "", isFeatured: false, isActive: true,
// //   colour: "", size: "", gender: "", fabric: "", occasion: "",
// // };

// // export default function AdminProducts() {
// //   const [products,       setProducts]       = useState([]);
// //   const [categories,     setCategories]     = useState([]);
// //   const [loading,        setLoading]        = useState(true);
// //   const [saving,         setSaving]         = useState(false);
// //   const [modalOpen,      setModalOpen]      = useState(false);
// //   const [editingProduct, setEditingProduct] = useState(null);
// //   const [form,           setForm]           = useState(EMPTY_FORM);
// //   const [uploadingImage, setUploadingImage] = useState(null);
// //   const [currentPage,    setCurrentPage]    = useState(0);
// //   const [totalPages,     setTotalPages]     = useState(0);
// //   const [searchQuery,    setSearchQuery]    = useState("");
// //   const [activeTab,      setActiveTab]      = useState("basic"); // "basic" | "attributes"

// //   useEffect(() => { fetchProducts(); fetchCategories(); }, [currentPage, searchQuery]);

// //   const fetchProducts = async () => {
// //     setLoading(true);
// //     try {
// //       const data = await adminAPI.getAllProducts(currentPage, 20, searchQuery);
// //       setProducts(data.content || []); setTotalPages(data.totalPages || 0);
// //     } catch(e) { console.error(e); }
// //     finally { setLoading(false); }
// //   };
// //   const fetchCategories = async () => {
// //     try { setCategories(await adminAPI.getAllCategories()); } catch(e) { console.error(e); }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault(); setSaving(true);
// //     try {
// //       const payload = {
// //         ...form,
// //         price:           parseFloat(form.price),
// //         originalPrice:   form.originalPrice ? parseFloat(form.originalPrice) : null,
// //         discountPercent: parseInt(form.discountPercent) || 0,
// //         stockQuantity:   parseInt(form.stockQuantity) || 0,
// //         categoryId:      parseInt(form.categoryId),
// //       };
// //       if (editingProduct) await adminAPI.updateProduct(editingProduct.id, payload);
// //       else await adminAPI.createProduct(payload);
// //       fetchProducts(); closeModal();
// //     } catch(e) { alert(e.response?.data?.message || "Failed to save product"); }
// //     finally { setSaving(false); }
// //   };

// //   const handleImageUpload = async (id, file) => {
// //     setUploadingImage(id);
// //     try { await adminAPI.uploadProductImage(id, file); fetchProducts(); }
// //     catch { alert("Image upload failed"); }
// //     finally { setUploadingImage(null); }
// //   };

// //   const handleDelete = async (id) => {
// //     if (!confirm("Delete this product?")) return;
// //     try { await adminAPI.deleteProduct(id); fetchProducts(); } catch { alert("Failed to delete"); }
// //   };
// //   const toggleFeatured = async (id) => { try { await adminAPI.toggleFeatured(id); fetchProducts(); } catch { alert("Failed"); } };
// //   const toggleActive   = async (id) => { try { await adminAPI.toggleActive(id);   fetchProducts(); } catch { alert("Failed"); } };

// //   const openModal = (product = null) => {
// //     setEditingProduct(product);
// //     setForm(product ? {
// //       name: product.name, description: product.description || "",
// //       price: product.price.toString(), originalPrice: product.originalPrice?.toString() || "",
// //       discountPercent: product.discountPercent || 0, stockQuantity: product.stockQuantity || 0,
// //       categoryId: product.category?.id?.toString() || "",
// //       isFeatured: product.isFeatured || false, isActive: product.isActive !== false,
// //       colour: product.colour || "", size: product.size || "", gender: product.gender || "",
// //       fabric: product.fabric || "", occasion: product.occasion || "",
// //     } : { ...EMPTY_FORM });
// //     setActiveTab("basic");
// //     setModalOpen(true);
// //   };
// //   const closeModal = () => { setModalOpen(false); setEditingProduct(null); setForm({ ...EMPTY_FORM }); };

// //   const f = (key) => ({ value: form[key], onChange: e => setForm({...form, [key]: e.target.value}), onFocus, onBlur });

// //   return (
// //     <div style={{ fontFamily: SANS, color: T.text }}>

// //       {/* Header */}
// //       <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 22 }}>
// //         <div>
// //           <h1 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 700, color: T.text, marginBottom: 5 }}>Products</h1>
// //           <p style={{ fontSize: 14, color: T.muted }}>Manage your product catalog</p>
// //         </div>
// //         <button onClick={() => openModal()}
// //           style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", background: T.maroon,
// //             color: T.text, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
// //             fontFamily: SANS, borderRadius: 8, whiteSpace: "nowrap" }}>
// //           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// //             <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
// //           </svg>
// //           New Product
// //         </button>
// //       </div>

// //       {/* Toolbar */}
// //       <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20,
// //         padding: "14px 16px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 10 }}>
// //         <div style={{ position: "relative", flex: 1, maxWidth: 320 }}>
// //           <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.muted} strokeWidth="2"
// //             style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
// //             <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
// //           </svg>
// //           <input placeholder="Search products..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
// //             style={{ ...iStyle, paddingLeft: 36, background: "#0a0a14" }}
// //             onFocus={e => e.target.style.borderColor = "rgba(212,175,55,0.35)"}
// //             onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}/>
// //         </div>
// //         <span style={{ fontSize: 13, color: T.dim, marginLeft: "auto" }}>
// //           <strong style={{ color: T.text }}>{products.length}</strong> products
// //         </span>
// //       </div>

// //       {/* Products Grid */}
// //       {loading ? (
// //         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 14 }}>
// //           {[...Array(8)].map((_,i) => (
// //             <div key={i} style={{ height: 320, background: T.card, borderRadius: 12,
// //               animation: "fadeInOut 1.4s ease-in-out infinite", opacity: 0.4 }}/>
// //           ))}
// //         </div>
// //       ) : products.length === 0 ? (
// //         <div style={{ textAlign: "center", padding: "80px 20px", background: T.card,
// //           border: `1px dashed rgba(212,175,55,0.12)`, borderRadius: 14 }}>
// //           <div style={{ width: 56, height: 56, margin: "0 auto 18px", borderRadius: 14,
// //             background: "rgba(212,175,55,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
// //             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.5">
// //               <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
// //             </svg>
// //           </div>
// //           <p style={{ fontSize: 18, fontWeight: 600, color: T.text, marginBottom: 8 }}>No products yet</p>
// //           <p style={{ fontSize: 14, color: T.muted, marginBottom: 22 }}>Add your first product to the catalog</p>
// //           <button onClick={() => openModal()} style={{ padding: "10px 22px", background: T.maroon, color: T.text,
// //             border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: SANS, borderRadius: 8 }}>
// //             Add Product
// //           </button>
// //         </div>
// //       ) : (
// //         <>
// //           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 14 }}>
// //             {products.map((p, i) => (
// //               <motion.div key={p.id} initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay: i*0.04 }}
// //                 style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden" }}
// //                 className="prod-card">

// //                 {/* Image */}
// //                 <div style={{ position: "relative", height: 180, background: "#0a0a14", overflow: "hidden" }}>
// //                   {p.imageUrl
// //                     ? <img src={p.imageUrl} alt={p.name} className="prod-img"
// //                         style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}/>
// //                     : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
// //                         <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1">
// //                           <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
// //                         </svg>
// //                       </div>
// //                   }
// //                   {/* Upload overlay */}
// //                   <label className="prod-overlay" style={{ position: "absolute", inset: 0, background: "rgba(8,8,16,0.88)",
// //                     display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
// //                     opacity: 0, transition: "opacity 0.2s" }}>
// //                     <input type="file" accept="image/*" style={{ display: "none" }}
// //                       onChange={e => handleImageUpload(p.id, e.target.files[0])} disabled={uploadingImage === p.id}/>
// //                     {uploadingImage === p.id
// //                       ? <div style={{ width: 26, height: 26, border: `2px solid ${T.gold}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }}/>
// //                       : <div style={{ textAlign: "center" }}>
// //                           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.5" style={{ display: "block", margin: "0 auto 5px" }}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
// //                           <span style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: T.gold, fontWeight: 700 }}>Upload</span>
// //                         </div>
// //                     }
// //                   </label>

// //                   {/* Badges */}
// //                   <div style={{ position: "absolute", top: 8, left: 8, display: "flex", flexDirection: "column", gap: 4 }}>
// //                     {p.isFeatured && <span style={{ padding: "2px 7px", background: "rgba(212,175,55,0.85)", color: "#1a1a2e", fontSize: 9, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", borderRadius: 4 }}>★ Featured</span>}
// //                     {!p.isActive  && <span style={{ padding: "2px 7px", background: "rgba(248,113,113,0.85)", color: "#fff", fontSize: 9, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", borderRadius: 4 }}>Inactive</span>}
// //                     {p.stockQuantity === 0 && <span style={{ padding: "2px 7px", background: "rgba(0,0,0,0.85)", color: "#aaa", fontSize: 9, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", borderRadius: 4 }}>No Stock</span>}
// //                   </div>
// //                 </div>

// //                 {/* Info */}
// //                 <div style={{ padding: "12px 14px" }}>
// //                   <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
// //                     color: T.gold, marginBottom: 3 }}>{p.category?.name || "Uncategorised"}</p>
// //                   <h3 style={{ fontSize: 14, fontWeight: 600, color: T.text, marginBottom: 6,
// //                     overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{p.name}</h3>

// //                   <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 6 }}>
// //                     <span style={{ fontFamily: SERIF, fontSize: 16, fontWeight: 700, color: T.text }}>
// //                       ₹{p.price?.toLocaleString("en-IN")}
// //                     </span>
// //                     {p.originalPrice && p.originalPrice > p.price && (
// //                       <span style={{ fontSize: 12, color: T.dim, textDecoration: "line-through" }}>
// //                         ₹{p.originalPrice?.toLocaleString("en-IN")}
// //                       </span>
// //                     )}
// //                   </div>

// //                   {/* Stock pill */}
// //                   <div style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 8px",
// //                     borderRadius: 20, background: p.stockQuantity > 0 ? T.greenBg : T.dangerBg,
// //                     border: `1px solid ${p.stockQuantity > 0 ? T.greenBorder : T.dangerBorder}`,
// //                     marginBottom: 10 }}>
// //                     <div style={{ width: 5, height: 5, borderRadius: "50%",
// //                       background: p.stockQuantity > 0 ? T.green : T.danger }}/>
// //                     <span style={{ fontSize: 11, fontWeight: 600, color: p.stockQuantity > 0 ? T.green : T.danger }}>
// //                       {p.stockQuantity > 0 ? `${p.stockQuantity} in stock` : "Out of stock"}
// //                     </span>
// //                   </div>

// //                   {/* Action buttons */}
// //                   <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 6 }}>
// //                     <button onClick={() => openModal(p)}
// //                       style={{ padding: "8px", background: "rgba(212,175,55,0.07)", border: `1px solid ${T.borderHi}`,
// //                         color: T.gold, cursor: "pointer", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em",
// //                         textTransform: "uppercase", fontFamily: SANS, borderRadius: 7, transition: "all 0.12s" }}
// //                       onMouseEnter={e => e.currentTarget.style.background = "rgba(212,175,55,0.14)"}
// //                       onMouseLeave={e => e.currentTarget.style.background = "rgba(212,175,55,0.07)"}>
// //                       Edit
// //                     </button>
// //                     <button onClick={() => toggleFeatured(p.id)} title={p.isFeatured ? "Unfeature" : "Feature"}
// //                       style={{ padding: "8px 10px", background: p.isFeatured ? "rgba(212,175,55,0.15)" : "transparent",
// //                         border: `1px solid ${T.borderHi}`, color: T.gold, cursor: "pointer", borderRadius: 7,
// //                         fontSize: 13, transition: "all 0.12s" }}>★</button>
// //                     <button onClick={() => handleDelete(p.id)}
// //                       style={{ padding: "8px 10px", background: T.dangerBg, border: `1px solid ${T.dangerBorder}`,
// //                         color: T.danger, cursor: "pointer", borderRadius: 7, display: "flex", alignItems: "center",
// //                         transition: "all 0.12s" }}
// //                       onMouseEnter={e => e.currentTarget.style.background = "rgba(248,113,113,0.15)"}
// //                       onMouseLeave={e => e.currentTarget.style.background = T.dangerBg}>
// //                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
// //                         <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
// //                       </svg>
// //                     </button>
// //                   </div>

// //                   {/* Active toggle */}
// //                   <button onClick={() => toggleActive(p.id)} style={{ width: "100%", marginTop: 6, padding: "7px",
// //                     background: "transparent", border: `1px solid ${p.isActive ? T.greenBorder : T.dangerBorder}`,
// //                     color: p.isActive ? T.green : T.danger, cursor: "pointer", fontSize: 11, fontWeight: 700,
// //                     letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: SANS, borderRadius: 7 }}>
// //                     {p.isActive ? "● Active" : "○ Inactive"}
// //                   </button>
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </div>

// //           {/* Pagination */}
// //           {totalPages > 1 && (
// //             <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 28 }}>
// //               <button onClick={() => setCurrentPage(p => Math.max(0, p-1))} disabled={currentPage === 0}
// //                 style={{ padding: "8px 16px", background: "transparent", border: `1px solid ${T.border}`,
// //                   color: currentPage === 0 ? T.dim : T.muted, cursor: currentPage === 0 ? "default" : "pointer",
// //                   fontSize: 13, fontFamily: SANS, borderRadius: 7, transition: "all 0.15s" }}>
// //                 ← Prev
// //               </button>
// //               <span style={{ padding: "8px 16px", background: T.card, border: `1px solid ${T.border}`,
// //                 color: T.text, fontSize: 13, borderRadius: 7 }}>
// //                 {currentPage + 1} / {totalPages}
// //               </span>
// //               <button onClick={() => setCurrentPage(p => Math.min(totalPages-1, p+1))} disabled={currentPage >= totalPages-1}
// //                 style={{ padding: "8px 16px", background: "transparent", border: `1px solid ${T.border}`,
// //                   color: currentPage >= totalPages-1 ? T.dim : T.muted, cursor: currentPage >= totalPages-1 ? "default" : "pointer",
// //                   fontSize: 13, fontFamily: SANS, borderRadius: 7, transition: "all 0.15s" }}>
// //                 Next →
// //               </button>
// //             </div>
// //           )}
// //         </>
// //       )}

// //       {/* ── MODAL ─────────────────────────────────────────────────────────── */}
// //       <AnimatePresence>
// //         {modalOpen && (
// //           <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
// //             style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "flex-start",
// //               justifyContent: "center", padding: "24px 16px", background: "rgba(4,4,12,0.92)", overflowY: "auto" }}
// //             onClick={closeModal}>
// //             <motion.div initial={{ scale:0.93, opacity:0, y:20 }} animate={{ scale:1, opacity:1, y:0 }}
// //               exit={{ scale:0.93, opacity:0 }} transition={{ type: "spring", stiffness: 320, damping: 28 }}
// //               style={{ width: "100%", maxWidth: 640, background: T.surface,
// //                 border: `1px solid ${T.borderHi}`, borderRadius: 18, overflow: "hidden", marginBottom: 24 }}
// //               onClick={e => e.stopPropagation()}>

// //               {/* Modal header */}
// //               <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
// //                 padding: "20px 24px", borderBottom: `1px solid ${T.border}` }}>
// //                 <h2 style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 700, color: T.text }}>
// //                   {editingProduct ? "Edit Product" : "New Product"}
// //                 </h2>
// //                 <button onClick={closeModal}
// //                   style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.05)",
// //                     border: `1px solid ${T.border}`, color: T.muted, cursor: "pointer",
// //                     display: "flex", alignItems: "center", justifyContent: "center" }}>
// //                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// //                     <path d="M18 6 6 18M6 6l12 12"/>
// //                   </svg>
// //                 </button>
// //               </div>

// //               {/* Tab bar */}
// //               <div style={{ display: "flex", borderBottom: `1px solid ${T.border}`, background: T.surface }}>
// //                 {[
// //                   { key: "basic",      label: "Basic Info" },
// //                   { key: "attributes", label: "Attributes & Filters" },
// //                 ].map(tab => (
// //                   <button key={tab.key} onClick={() => setActiveTab(tab.key)}
// //                     style={{ flex: 1, padding: "13px", background: "transparent", border: "none",
// //                       cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: SANS,
// //                       color: activeTab === tab.key ? T.gold : T.muted,
// //                       borderBottom: `2px solid ${activeTab === tab.key ? T.gold : "transparent"}`,
// //                       transition: "all 0.15s" }}>
// //                     {tab.label}
// //                   </button>
// //                 ))}
// //               </div>

// //               <form onSubmit={handleSubmit}>
// //                 <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column", gap: 16 }}>

// //                   {/* ── TAB: Basic Info ── */}
// //                   {activeTab === "basic" && (
// //                     <>
// //                       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
// //                         <div>
// //                           <label style={labelStyle}>Product Name *</label>
// //                           <input type="text" required {...f("name")} placeholder="e.g. Kanjivaram Saree" style={iStyle}/>
// //                         </div>
// //                         <div>
// //                           <label style={labelStyle}>Category *</label>
// //                           <select required {...f("categoryId")} style={{ ...iStyle, cursor: "pointer" }}>
// //                             <option value="">Select category</option>
// //                             {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
// //                           </select>
// //                         </div>
// //                       </div>

// //                       <div>
// //                         <label style={labelStyle}>Description</label>
// //                         <textarea {...f("description")} rows={3} placeholder="Product description..."
// //                           style={{ ...iStyle, resize: "vertical" }}/>
// //                       </div>

// //                       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
// //                         <div>
// //                           <label style={labelStyle}>Price (₹) *</label>
// //                           <input type="number" step="0.01" required {...f("price")} placeholder="0.00" style={iStyle}/>
// //                         </div>
// //                         <div>
// //                           <label style={labelStyle}>Original Price (₹)</label>
// //                           <input type="number" step="0.01" {...f("originalPrice")} placeholder="MRP" style={iStyle}/>
// //                         </div>
// //                         <div>
// //                           <label style={labelStyle}>Stock Qty *</label>
// //                           <input type="number" required {...f("stockQuantity")} placeholder="0" style={iStyle}/>
// //                         </div>
// //                       </div>

// //                       <div style={{ display: "flex", gap: 14 }}>
// //                         <label style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "11px 14px",
// //                           background: "rgba(212,175,55,0.04)", border: `1px solid rgba(212,175,55,0.12)`,
// //                           borderRadius: 8, cursor: "pointer" }}>
// //                           <input type="checkbox" checked={form.isFeatured}
// //                             onChange={e => setForm({...form, isFeatured: e.target.checked})}
// //                             style={{ width: 15, height: 15, accentColor: T.gold, cursor: "pointer" }}/>
// //                           <span style={{ fontSize: 14, color: T.muted }}>★ Featured</span>
// //                         </label>
// //                         <label style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "11px 14px",
// //                           background: T.greenBg, border: `1px solid ${T.greenBorder}`,
// //                           borderRadius: 8, cursor: "pointer" }}>
// //                           <input type="checkbox" checked={form.isActive}
// //                             onChange={e => setForm({...form, isActive: e.target.checked})}
// //                             style={{ width: 15, height: 15, accentColor: T.green, cursor: "pointer" }}/>
// //                           <span style={{ fontSize: 14, color: T.muted }}>Active on store</span>
// //                         </label>
// //                       </div>
// //                     </>
// //                   )}

// //                   {/* ── TAB: Attributes ── */}
// //                   {activeTab === "attributes" && (
// //                     <>
// //                       <p style={{ fontSize: 13, color: T.muted, marginTop: -4, marginBottom: 6,
// //                         padding: "10px 14px", background: "rgba(212,175,55,0.05)",
// //                         border: `1px solid rgba(212,175,55,0.1)`, borderRadius: 8 }}>
// //                         These fields directly power the sidebar filters on the store. Fill them carefully.
// //                       </p>
// //                       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
// //                         <div>
// //                           <label style={labelStyle}>Colour</label>
// //                           <select {...f("colour")} style={{ ...iStyle, cursor: "pointer" }}>
// //                             <option value="">Select</option>
// //                             {["Black","White","Red","Navy Blue","Blue","Green","Pink","Yellow","Orange","Purple","Brown","Grey","Maroon","Gold","Cream","Multi-colour"].map(c => <option key={c}>{c}</option>)}
// //                           </select>
// //                         </div>
// //                         <div>
// //                           <label style={labelStyle}>Gender</label>
// //                           <select {...f("gender")} style={{ ...iStyle, cursor: "pointer" }}>
// //                             <option value="">Select</option>
// //                             {["Women","Men","Kids","Unisex"].map(g => <option key={g}>{g}</option>)}
// //                           </select>
// //                         </div>
// //                         <div>
// //                           <label style={labelStyle}>Size</label>
// //                           <select {...f("size")} style={{ ...iStyle, cursor: "pointer" }}>
// //                             <option value="">Select</option>
// //                             {["Free Size","XS","S","M","L","XL","XXL","XS-XL","S-XL"].map(s => <option key={s}>{s}</option>)}
// //                           </select>
// //                         </div>
// //                         <div>
// //                           <label style={labelStyle}>Fabric / Material</label>
// //                           <select {...f("fabric")} style={{ ...iStyle, cursor: "pointer" }}>
// //                             <option value="">Select</option>
// //                             {["Pure Silk","Kanjivaram Silk","Banarasi Silk","Tussar Silk","Chanderi","Cotton","Cotton Silk","Georgette","Chiffon","Linen","Polyester","Crepe"].map(f => <option key={f}>{f}</option>)}
// //                           </select>
// //                         </div>
// //                         <div>
// //                           <label style={labelStyle}>Occasion</label>
// //                           <select {...f("occasion")} style={{ ...iStyle, cursor: "pointer" }}>
// //                             <option value="">Select</option>
// //                             {["Wedding","Festival","Casual","Party","Office","Daily Wear","Traditional","Formal"].map(o => <option key={o}>{o}</option>)}
// //                           </select>
// //                         </div>
// //                       </div>

// //                       {/* Preview of set attributes */}
// //                       <div style={{ padding: "14px", background: "rgba(255,255,255,0.02)",
// //                         border: `1px solid ${T.border}`, borderRadius: 8 }}>
// //                         <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
// //                           color: T.dim, marginBottom: 10 }}>Attribute Preview</p>
// //                         <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
// //                           {[
// //                             { label: form.colour,  icon: "🎨" },
// //                             { label: form.gender,  icon: "👤" },
// //                             { label: form.size,    icon: "📐" },
// //                             { label: form.fabric,  icon: "🧵" },
// //                             { label: form.occasion,icon: "✨" },
// //                           ].filter(a => a.label).map((a, i) => (
// //                             <span key={i} style={{ padding: "4px 10px", background: "rgba(212,175,55,0.1)",
// //                               border: `1px solid rgba(212,175,55,0.2)`, borderRadius: 20,
// //                               fontSize: 12, color: T.gold }}>
// //                               {a.icon} {a.label}
// //                             </span>
// //                           ))}
// //                           {!form.colour && !form.gender && !form.size && !form.fabric && !form.occasion && (
// //                             <span style={{ fontSize: 13, color: T.dim }}>No attributes selected yet</span>
// //                           )}
// //                         </div>
// //                       </div>
// //                     </>
// //                   )}
// //                 </div>

// //                 {/* Modal footer */}
// //                 <div style={{ display: "flex", gap: 10, padding: "16px 24px",
// //                   borderTop: `1px solid ${T.border}`, background: "rgba(255,255,255,0.01)" }}>
// //                   <button type="button" onClick={closeModal}
// //                     style={{ flex: 1, padding: "12px", background: "transparent", border: `1px solid ${T.border}`,
// //                       color: T.muted, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: SANS, borderRadius: 8 }}>
// //                     Cancel
// //                   </button>
// //                   {activeTab === "basic" && (
// //                     <button type="button" onClick={() => setActiveTab("attributes")}
// //                       style={{ flex: 1, padding: "12px", background: "rgba(212,175,55,0.08)", border: `1px solid ${T.borderHi}`,
// //                         color: T.gold, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: SANS, borderRadius: 8 }}>
// //                       Next: Attributes →
// //                     </button>
// //                   )}
// //                   <button type="submit" disabled={saving}
// //                     style={{ flex: 1, padding: "12px", background: T.maroon, color: T.text, border: "none",
// //                       cursor: saving ? "wait" : "pointer", fontSize: 13, fontWeight: 600, fontFamily: SANS,
// //                       borderRadius: 8, opacity: saving ? 0.7 : 1, transition: "opacity 0.15s" }}>
// //                     {saving ? "Saving..." : editingProduct ? "Update Product" : "Create Product"}
// //                   </button>
// //                 </div>
// //               </form>
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');
// //         .prod-card:hover .prod-overlay { opacity: 1 !important; }
// //         .prod-card:hover .prod-img     { transform: scale(1.04) !important; }
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
// const EMPTY = {
//   name:"", description:"", price:"", originalPrice:"", discountPercent:0,
//   stockQuantity:0, categoryId:"", isFeatured:false, isActive:true,
//   colour:"", size:"", gender:"", fabric:"", occasion:"",
// };

// export default function AdminProducts() {
//   const { T } = useAdminTheme();
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
//   const handleSubmit = async (e) => {
//     e.preventDefault(); setSaving(true);
//     try {
//       const payload = { ...form,
//         price: parseFloat(form.price),
//         originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
//         discountPercent: parseInt(form.discountPercent) || 0,
//         stockQuantity: parseInt(form.stockQuantity) || 0,
//         categoryId: parseInt(form.categoryId),
//       };
//       if (editingProduct) await adminAPI.updateProduct(editingProduct.id, payload);
//       else await adminAPI.createProduct(payload);
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
//   const handleDelete    = async (id) => { if (!confirm("Delete this product?")) return; try { await adminAPI.deleteProduct(id); fetchProducts(); } catch { alert("Failed to delete"); } };
//   const toggleFeatured  = async (id) => { try { await adminAPI.toggleFeatured(id); fetchProducts(); } catch { alert("Failed"); } };
//   const toggleActive    = async (id) => { try { await adminAPI.toggleActive(id);   fetchProducts(); } catch { alert("Failed"); } };

//   const openModal = (product = null) => {
//     setEditingProduct(product);
//     setForm(product ? {
//       name: product.name, description: product.description || "",
//       price: product.price.toString(), originalPrice: product.originalPrice?.toString() || "",
//       discountPercent: product.discountPercent || 0, stockQuantity: product.stockQuantity || 0,
//       categoryId: product.category?.id?.toString() || "",
//       isFeatured: product.isFeatured || false, isActive: product.isActive !== false,
//       colour: product.colour||"", size: product.size||"", gender: product.gender||"",
//       fabric: product.fabric||"", occasion: product.occasion||"",
//     } : {...EMPTY});
//     setActiveTab("basic"); setModalOpen(true);
//   };
//   const closeModal = () => { setModalOpen(false); setEditingProduct(null); setForm({...EMPTY}); };

//   // Dynamic input style using T
//   const iStyle = {
//     width:"100%", padding:"11px 14px", background:T.inputBg,
//     border:`1px solid ${T.inputBorder}`, borderRadius:8,
//     color:T.text, fontSize:14, outline:"none", fontFamily:SANS, transition:"border-color 0.15s",
//   };
//   const lStyle = { display:"block", fontSize:11, fontWeight:700, letterSpacing:"0.15em",
//     textTransform:"uppercase", color:T.muted, marginBottom:7 };
//   const fi = e => e.target.style.borderColor = T.inputFocus;
//   const fo = e => e.target.style.borderColor = T.inputBorder;
//   const fld = (key) => ({ value:form[key], onChange:e=>setForm({...form,[key]:e.target.value}), onFocus:fi, onBlur:fo });

//   return (
//     <div style={{ fontFamily: SANS, color: T.text }}>

//       {/* Header */}
//       <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:22 }}>
//         <div>
//           <h1 style={{ fontFamily:SERIF, fontSize:28, fontWeight:700, color:T.text, marginBottom:5 }}>Products</h1>
//           <p style={{ fontSize:14, color:T.muted }}>Manage your product catalog</p>
//         </div>
//         <button onClick={() => openModal()}
//           style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 20px",
//             background:T.maroon, color:"#FFFFF0", border:"none", cursor:"pointer",
//             fontSize:13, fontWeight:600, fontFamily:SANS, borderRadius:8, whiteSpace:"nowrap" }}>
//           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//             <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
//           </svg>
//           New Product
//         </button>
//       </div>

//       {/* Toolbar */}
//       <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20,
//         padding:"12px 16px", background:T.card, border:`1px solid ${T.border}`, borderRadius:10,
//         boxShadow:T.shadow, transition:"background 0.3s" }}>
//         <div style={{ position:"relative", flex:1, maxWidth:320 }}>
//           <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.muted} strokeWidth="2"
//             style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}>
//             <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
//           </svg>
//           <input placeholder="Search products…" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}
//             style={{ ...iStyle, paddingLeft:38 }} onFocus={fi} onBlur={fo}/>
//         </div>
//         <span style={{ fontSize:13, color:T.dim, marginLeft:"auto" }}>
//           <strong style={{ color:T.text }}>{products.length}</strong> products
//         </span>
//       </div>

//       {/* Grid */}
//       {loading ? (
//         <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:14 }}>
//           {[...Array(8)].map((_,i) => (
//             <div key={i} style={{ height:320, background:T.card, borderRadius:12,
//               animation:"fadeInOut 1.4s ease-in-out infinite", opacity:0.45 }}/>
//           ))}
//         </div>
//       ) : products.length === 0 ? (
//         <div style={{ textAlign:"center", padding:"80px 20px", background:T.card,
//           border:`1px dashed ${T.borderHi}`, borderRadius:14 }}>
//           <div style={{ width:56, height:56, margin:"0 auto 18px", borderRadius:14,
//             background:"rgba(212,175,55,0.07)", display:"flex", alignItems:"center", justifyContent:"center" }}>
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.5">
//               <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
//             </svg>
//           </div>
//           <p style={{ fontSize:18, fontWeight:600, color:T.text, marginBottom:8 }}>No products yet</p>
//           <p style={{ fontSize:14, color:T.muted, marginBottom:22 }}>Add your first product to the catalog</p>
//           <button onClick={() => openModal()} style={{ padding:"10px 22px", background:T.maroon, color:"#FFFFF0",
//             border:"none", cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:SANS, borderRadius:8 }}>
//             Add Product
//           </button>
//         </div>
//       ) : (
//         <>
//           <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:14 }}>
//             {products.map((p,i) => (
//               <motion.div key={p.id} initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:i*0.04}}
//                 className="p-card"
//                 style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12,
//                   overflow:"hidden", boxShadow:T.shadow, transition:"background 0.3s, border-color 0.3s" }}>

//                 {/* Image */}
//                 <div style={{ position:"relative", height:180, background:T.inputBg, overflow:"hidden" }}>
//                   {p.imageUrl
//                     ? <img src={p.imageUrl} alt={p.name} className="p-img"
//                         style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s" }}/>
//                     : <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center" }}>
//                         <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={T.border} strokeWidth="1">
//                           <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
//                         </svg>
//                       </div>
//                   }
//                   <label className="p-overlay" style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.82)",
//                     display:"flex", alignItems:"center", justifyContent:"center",
//                     cursor:"pointer", opacity:0, transition:"opacity 0.2s" }}>
//                     <input type="file" accept="image/*" style={{ display:"none" }}
//                       onChange={e=>handleImageUpload(p.id,e.target.files[0])} disabled={uploadingImage===p.id}/>
//                     {uploadingImage===p.id
//                       ? <div style={{ width:26, height:26, border:"2px solid #D4AF37", borderTopColor:"transparent", borderRadius:"50%", animation:"spin 0.8s linear infinite" }}/>
//                       : <div style={{ textAlign:"center" }}>
//                           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" style={{ display:"block", margin:"0 auto 5px" }}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
//                           <span style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"#D4AF37", fontWeight:700 }}>Upload</span>
//                         </div>
//                     }
//                   </label>
//                   {/* Badges */}
//                   <div style={{ position:"absolute", top:8, left:8, display:"flex", flexDirection:"column", gap:4 }}>
//                     {p.isFeatured     && <span style={{ padding:"2px 7px", background:"rgba(212,175,55,0.88)", color:"#1a1a2e", fontSize:9, fontWeight:800, letterSpacing:"0.06em", textTransform:"uppercase", borderRadius:4 }}>★ Featured</span>}
//                     {!p.isActive      && <span style={{ padding:"2px 7px", background:"rgba(220,38,38,0.88)",  color:"#fff",    fontSize:9, fontWeight:800, letterSpacing:"0.06em", textTransform:"uppercase", borderRadius:4 }}>Inactive</span>}
//                     {p.stockQuantity===0 && <span style={{ padding:"2px 7px", background:"rgba(0,0,0,0.82)",  color:"#aaa",    fontSize:9, fontWeight:800, letterSpacing:"0.06em", textTransform:"uppercase", borderRadius:4 }}>No Stock</span>}
//                   </div>
//                 </div>

//                 {/* Info */}
//                 <div style={{ padding:"12px 14px" }}>
//                   <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:T.gold, marginBottom:3 }}>
//                     {p.category?.name || "Uncategorised"}
//                   </p>
//                   <h3 style={{ fontSize:14, fontWeight:600, color:T.text, marginBottom:6,
//                     overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis" }}>{p.name}</h3>
//                   <div style={{ display:"flex", alignItems:"baseline", gap:6, marginBottom:6 }}>
//                     <span style={{ fontFamily:SERIF, fontSize:16, fontWeight:700, color:T.text }}>₹{p.price?.toLocaleString("en-IN")}</span>
//                     {p.originalPrice && p.originalPrice > p.price && (
//                       <span style={{ fontSize:12, color:T.dim, textDecoration:"line-through" }}>₹{p.originalPrice?.toLocaleString("en-IN")}</span>
//                     )}
//                   </div>
//                   {/* Stock pill */}
//                   <div style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"3px 8px", borderRadius:20, marginBottom:10,
//                     background: p.stockQuantity>0?T.greenBg:T.dangerBg, border:`1px solid ${p.stockQuantity>0?T.greenBorder:T.dangerBorder}` }}>
//                     <div style={{ width:5, height:5, borderRadius:"50%", background:p.stockQuantity>0?T.green:T.danger }}/>
//                     <span style={{ fontSize:11, fontWeight:600, color:p.stockQuantity>0?T.green:T.danger }}>
//                       {p.stockQuantity>0?`${p.stockQuantity} in stock`:"Out of stock"}
//                     </span>
//                   </div>
//                   {/* Buttons */}
//                   <div style={{ display:"grid", gridTemplateColumns:"1fr auto auto", gap:6 }}>
//                     <button onClick={()=>openModal(p)}
//                       style={{ padding:"8px", background:"rgba(212,175,55,0.07)", border:`1px solid ${T.borderHi}`,
//                         color:T.gold, cursor:"pointer", fontSize:11, fontWeight:700, letterSpacing:"0.06em",
//                         textTransform:"uppercase", fontFamily:SANS, borderRadius:7, transition:"all 0.12s" }}
//                       onMouseEnter={e=>e.currentTarget.style.background="rgba(212,175,55,0.14)"}
//                       onMouseLeave={e=>e.currentTarget.style.background="rgba(212,175,55,0.07)"}>Edit</button>
//                     <button onClick={()=>toggleFeatured(p.id)} title={p.isFeatured?"Unfeature":"Feature"}
//                       style={{ padding:"8px 10px", background:p.isFeatured?"rgba(212,175,55,0.15)":"transparent",
//                         border:`1px solid ${T.borderHi}`, color:T.gold, cursor:"pointer", borderRadius:7, fontSize:13 }}>★</button>
//                     <button onClick={()=>handleDelete(p.id)}
//                       style={{ padding:"8px 10px", background:T.dangerBg, border:`1px solid ${T.dangerBorder}`,
//                         color:T.danger, cursor:"pointer", borderRadius:7, display:"flex", alignItems:"center", transition:"all 0.12s" }}
//                       onMouseEnter={e=>e.currentTarget.style.background="rgba(220,38,38,0.14)"}
//                       onMouseLeave={e=>e.currentTarget.style.background=T.dangerBg}>
//                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
//                         <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
//                       </svg>
//                     </button>
//                   </div>
//                   <button onClick={()=>toggleActive(p.id)}
//                     style={{ width:"100%", marginTop:6, padding:"7px", background:"transparent",
//                       border:`1px solid ${p.isActive?T.greenBorder:T.dangerBorder}`,
//                       color:p.isActive?T.green:T.danger, cursor:"pointer", fontSize:11, fontWeight:700,
//                       letterSpacing:"0.06em", textTransform:"uppercase", fontFamily:SANS, borderRadius:7 }}>
//                     {p.isActive ? "● Active" : "○ Inactive"}
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:8, marginTop:28 }}>
//               <button onClick={()=>setCurrentPage(p=>Math.max(0,p-1))} disabled={currentPage===0}
//                 style={{ padding:"8px 16px", background:"transparent", border:`1px solid ${T.border}`,
//                   color:currentPage===0?T.dim:T.muted, cursor:currentPage===0?"default":"pointer",
//                   fontSize:13, fontFamily:SANS, borderRadius:7 }}>← Prev</button>
//               <span style={{ padding:"8px 16px", background:T.card, border:`1px solid ${T.border}`,
//                 color:T.text, fontSize:13, borderRadius:7 }}>{currentPage+1} / {totalPages}</span>
//               <button onClick={()=>setCurrentPage(p=>Math.min(totalPages-1,p+1))} disabled={currentPage>=totalPages-1}
//                 style={{ padding:"8px 16px", background:"transparent", border:`1px solid ${T.border}`,
//                   color:currentPage>=totalPages-1?T.dim:T.muted, cursor:currentPage>=totalPages-1?"default":"pointer",
//                   fontSize:13, fontFamily:SANS, borderRadius:7 }}>Next →</button>
//             </div>
//           )}
//         </>
//       )}

//       {/* ── MODAL ── */}
//       <AnimatePresence>
//         {modalOpen && (
//           <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
//             style={{ position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"flex-start",
//               justifyContent:"center", padding:"24px 16px", background:"rgba(0,0,0,0.55)", overflowY:"auto" }}
//             onClick={closeModal}>
//             <motion.div initial={{scale:0.93,opacity:0,y:20}} animate={{scale:1,opacity:1,y:0}}
//               exit={{scale:0.93,opacity:0}} transition={{type:"spring",stiffness:320,damping:28}}
//               style={{ width:"100%", maxWidth:640, background:T.surface,
//                 border:`1px solid ${T.borderHi}`, borderRadius:18,
//                 overflow:"hidden", marginBottom:24, boxShadow:"0 24px 64px rgba(0,0,0,0.3)" }}
//               onClick={e=>e.stopPropagation()}>

//               {/* Modal header */}
//               <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
//                 padding:"20px 24px", borderBottom:`1px solid ${T.border}` }}>
//                 <h2 style={{ fontFamily:SERIF, fontSize:24, fontWeight:700, color:T.text }}>
//                   {editingProduct ? "Edit Product" : "New Product"}
//                 </h2>
//                 <button onClick={closeModal}
//                   style={{ width:32, height:32, borderRadius:8, background:T.hoverBg,
//                     border:`1px solid ${T.border}`, color:T.muted, cursor:"pointer",
//                     display:"flex", alignItems:"center", justifyContent:"center" }}>
//                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//                     <path d="M18 6 6 18M6 6l12 12"/>
//                   </svg>
//                 </button>
//               </div>

//               {/* Tab bar */}
//               <div style={{ display:"flex", borderBottom:`1px solid ${T.border}` }}>
//                 {[{key:"basic",label:"Basic Info"},{key:"attributes",label:"Attributes & Filters"}].map(tab => (
//                   <button key={tab.key} onClick={()=>setActiveTab(tab.key)}
//                     style={{ flex:1, padding:"13px", background:"transparent", border:"none", cursor:"pointer",
//                       fontSize:13, fontWeight:600, fontFamily:SANS,
//                       color:activeTab===tab.key?T.gold:T.muted,
//                       borderBottom:`2px solid ${activeTab===tab.key?T.gold:"transparent"}`,
//                       transition:"all 0.15s" }}>
//                     {tab.label}
//                   </button>
//                 ))}
//               </div>

//               <form onSubmit={handleSubmit}>
//                 <div style={{ padding:"22px 24px", display:"flex", flexDirection:"column", gap:16 }}>

//                   {activeTab === "basic" && <>
//                     <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
//                       <div>
//                         <label style={lStyle}>Product Name *</label>
//                         <input type="text" required {...fld("name")} placeholder="e.g. Kanjivaram Saree" style={iStyle}/>
//                       </div>
//                       <div>
//                         <label style={lStyle}>Category *</label>
//                         <select required {...fld("categoryId")} style={{...iStyle,cursor:"pointer"}}>
//                           <option value="">Select category</option>
//                           {categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
//                         </select>
//                       </div>
//                     </div>
//                     <div>
//                       <label style={lStyle}>Description</label>
//                       <textarea {...fld("description")} rows={3} placeholder="Product description…" style={{...iStyle,resize:"vertical"}}/>
//                     </div>
//                     <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
//                       <div><label style={lStyle}>Price (₹) *</label><input type="number" step="0.01" required {...fld("price")} placeholder="0.00" style={iStyle}/></div>
//                       <div><label style={lStyle}>Original Price (₹)</label><input type="number" step="0.01" {...fld("originalPrice")} placeholder="MRP" style={iStyle}/></div>
//                       <div><label style={lStyle}>Stock Qty *</label><input type="number" required {...fld("stockQuantity")} placeholder="0" style={iStyle}/></div>
//                     </div>
//                     <div style={{ display:"flex", gap:14 }}>
//                       <label style={{ flex:1, display:"flex", alignItems:"center", gap:10, padding:"11px 14px",
//                         background:"rgba(212,175,55,0.05)", border:`1px solid ${T.borderHi}`, borderRadius:8, cursor:"pointer" }}>
//                         <input type="checkbox" checked={form.isFeatured} onChange={e=>setForm({...form,isFeatured:e.target.checked})}
//                           style={{ width:15, height:15, accentColor:T.gold, cursor:"pointer" }}/>
//                         <span style={{ fontSize:14, color:T.muted }}>★ Featured</span>
//                       </label>
//                       <label style={{ flex:1, display:"flex", alignItems:"center", gap:10, padding:"11px 14px",
//                         background:T.greenBg, border:`1px solid ${T.greenBorder}`, borderRadius:8, cursor:"pointer" }}>
//                         <input type="checkbox" checked={form.isActive} onChange={e=>setForm({...form,isActive:e.target.checked})}
//                           style={{ width:15, height:15, accentColor:T.green, cursor:"pointer" }}/>
//                         <span style={{ fontSize:14, color:T.muted }}>Active on store</span>
//                       </label>
//                     </div>
//                   </>}

//                   {activeTab === "attributes" && <>
//                     <div style={{ padding:"10px 14px", background:"rgba(212,175,55,0.05)",
//                       border:`1px solid rgba(212,175,55,0.12)`, borderRadius:8 }}>
//                       <p style={{ fontSize:13, color:T.muted }}>These fields power the sidebar filters on the store. Fill them carefully.</p>
//                     </div>
//                     <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
//                       <div><label style={lStyle}>Colour</label>
//                         <select {...fld("colour")} style={{...iStyle,cursor:"pointer"}}>
//                           <option value="">Select</option>
//                           {["Black","White","Red","Navy Blue","Blue","Green","Pink","Yellow","Orange","Purple","Brown","Grey","Maroon","Gold","Cream","Multi-colour"].map(c=><option key={c}>{c}</option>)}
//                         </select>
//                       </div>
//                       <div><label style={lStyle}>Gender</label>
//                         <select {...fld("gender")} style={{...iStyle,cursor:"pointer"}}>
//                           <option value="">Select</option>
//                           {["Women","Men","Kids","Unisex"].map(g=><option key={g}>{g}</option>)}
//                         </select>
//                       </div>
//                       <div><label style={lStyle}>Size</label>
//                         <select {...fld("size")} style={{...iStyle,cursor:"pointer"}}>
//                           <option value="">Select</option>
//                           {["Free Size","XS","S","M","L","XL","XXL","XS-XL","S-XL"].map(s=><option key={s}>{s}</option>)}
//                         </select>
//                       </div>
//                       <div><label style={lStyle}>Fabric / Material</label>
//                         <select {...fld("fabric")} style={{...iStyle,cursor:"pointer"}}>
//                           <option value="">Select</option>
//                           {["Pure Silk","Kanjivaram Silk","Banarasi Silk","Tussar Silk","Chanderi","Cotton","Cotton Silk","Georgette","Chiffon","Linen","Polyester","Crepe"].map(f=><option key={f}>{f}</option>)}
//                         </select>
//                       </div>
//                       <div><label style={lStyle}>Occasion</label>
//                         <select {...fld("occasion")} style={{...iStyle,cursor:"pointer"}}>
//                           <option value="">Select</option>
//                           {["Wedding","Festival","Casual","Party","Office","Daily Wear","Traditional","Formal"].map(o=><option key={o}>{o}</option>)}
//                         </select>
//                       </div>
//                     </div>
//                     {/* Attribute preview chips */}
//                     <div style={{ padding:"14px", background:T.hoverBg, border:`1px solid ${T.border}`, borderRadius:8 }}>
//                       <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:T.dim, marginBottom:10 }}>Preview</p>
//                       <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
//                         {[{v:form.colour,e:"🎨"},{v:form.gender,e:"👤"},{v:form.size,e:"📐"},{v:form.fabric,e:"🧵"},{v:form.occasion,e:"✨"}]
//                           .filter(a=>a.v).map((a,i)=>(
//                           <span key={i} style={{ padding:"4px 10px", background:"rgba(212,175,55,0.1)",
//                             border:`1px solid rgba(212,175,55,0.2)`, borderRadius:20, fontSize:12, color:T.gold }}>
//                             {a.e} {a.v}
//                           </span>
//                         ))}
//                         {!form.colour&&!form.gender&&!form.size&&!form.fabric&&!form.occasion&&(
//                           <span style={{ fontSize:13, color:T.dim }}>No attributes selected yet</span>
//                         )}
//                       </div>
//                     </div>
//                   </>}
//                 </div>

//                 {/* Modal footer */}
//                 <div style={{ display:"flex", gap:10, padding:"16px 24px", borderTop:`1px solid ${T.border}` }}>
//                   <button type="button" onClick={closeModal}
//                     style={{ flex:1, padding:"12px", background:"transparent", border:`1px solid ${T.border}`,
//                       color:T.muted, cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:SANS, borderRadius:8 }}>Cancel</button>
//                   {activeTab==="basic" && (
//                     <button type="button" onClick={()=>setActiveTab("attributes")}
//                       style={{ flex:1, padding:"12px", background:"rgba(212,175,55,0.08)", border:`1px solid ${T.borderHi}`,
//                         color:T.gold, cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:SANS, borderRadius:8 }}>
//                       Next: Attributes →
//                     </button>
//                   )}
//                   <button type="submit" disabled={saving}
//                     style={{ flex:1, padding:"12px", background:T.maroon, color:"#FFFFF0", border:"none",
//                       cursor:saving?"wait":"pointer", fontSize:13, fontWeight:600, fontFamily:SANS,
//                       borderRadius:8, opacity:saving?0.7:1 }}>
//                     {saving?"Saving…":editingProduct?"Update Product":"Create Product"}
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');
//         .p-card:hover .p-overlay { opacity: 1 !important; }
//         .p-card:hover .p-img     { transform: scale(1.04) !important; }
//         @keyframes fadeInOut { 0%,100%{opacity:0.45} 50%{opacity:0.2} }
//         @keyframes spin { to { transform: rotate(360deg); } }
//       `}</style>
//     </div>
//   );
// }






import { useState, useEffect, useContext, createContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { adminAPI } from "../../api";
import { ThemeCtx } from "./AdminDashboard";

/* ── Self-contained theme tokens (mirrors AdminDashboard exactly) ─────────── */
const _DARK = {
  mode:"dark",
  bg:"#080810", surface:"#0f0f1a", card:"#13131f", cardAlt:"#16162a",
  border:"rgba(255,255,255,0.07)", borderHi:"rgba(212,175,55,0.3)",
  inputBg:"#0a0a14", inputBorder:"rgba(255,255,255,0.1)", inputFocus:"rgba(212,175,55,0.45)",
  text:"#F0EEE8", muted:"rgba(240,238,232,0.5)", dim:"rgba(240,238,232,0.26)",
  gold:"#D4AF37", maroon:"#800000",
  danger:"#f87171", dangerBg:"rgba(248,113,113,0.1)", dangerBorder:"rgba(248,113,113,0.25)",
  green:"#34D399", greenBg:"rgba(52,211,153,0.1)", greenBorder:"rgba(52,211,153,0.25)",
  hoverBg:"rgba(255,255,255,0.05)", shadow:"none", shadowMd:"0 8px 24px rgba(0,0,0,0.4)",
  statBorder:"rgba(255,255,255,0.07)", tableBorder:"rgba(255,255,255,0.07)",
  badgePill:"rgba(255,255,255,0.06)",
};
const _LIGHT = {
  mode:"light",
  bg:"#ECEAE4", surface:"#FFFFFF", card:"#FFFFFF", cardAlt:"#F9F7F4",
  border:"#D1CBC0", borderHi:"#800000",
  inputBg:"#FFFFFF", inputBorder:"#B5AFA8", inputFocus:"#800000",
  text:"#111827", muted:"#6B7280", dim:"#9CA3AF",
  gold:"#7A5C0A", maroon:"#800000",
  danger:"#B91C1C", dangerBg:"#FEF2F2", dangerBorder:"#FECACA",
  green:"#15803D", greenBg:"#F0FDF4", greenBorder:"#BBF7D0",
  hoverBg:"#F5F3F0",
  shadow:"0 1px 3px rgba(0,0,0,0.08)", shadowMd:"0 4px 16px rgba(0,0,0,0.10)",
  statBorder:"#E5E0D8", tableBorder:"#E5E0D8",
  badgePill:"#F5F3F0",
};

/* ── Safe hook: reads from ThemeCtx if available, falls back to dark tokens ─ */
const _FallbackCtx = createContext({ T: _DARK, theme: "dark" });
function useAdminTheme() {
  // ThemeCtx is exported from AdminDashboard (outputs version).
  // If AdminDashboard is the older dark-only version, ThemeCtx is undefined → use fallback.
  const ctx = useContext(ThemeCtx ?? _FallbackCtx);
  if (ctx && ctx.T) return ctx;
  return { T: _DARK, theme: "dark" };
}

const SERIF = "'Cormorant Garamond', Georgia, serif";
const SANS  = "'DM Sans', 'Segoe UI', system-ui, sans-serif";

/* ── Colour options with hex swatches ─────────────────────────────────────── */
const COLOUR_OPTIONS = [
  { label:"Black",       hex:"#111111" },
  { label:"White",       hex:"#F5F5F5" },
  { label:"Red",         hex:"#DC2626" },
  { label:"Navy Blue",   hex:"#1E3A5F" },
  { label:"Blue",        hex:"#2563EB" },
  { label:"Green",       hex:"#16A34A" },
  { label:"Pink",        hex:"#EC4899" },
  { label:"Yellow",      hex:"#EAB308" },
  { label:"Orange",      hex:"#EA580C" },
  { label:"Purple",      hex:"#9333EA" },
  { label:"Brown",       hex:"#92400E" },
  { label:"Grey",        hex:"#6B7280" },
  { label:"Maroon",      hex:"#800000" },
  { label:"Gold",        hex:"#D4AF37" },
  { label:"Cream",       hex:"#FFF8DC" },
  { label:"Multi",       hex:"linear-gradient(135deg,#DC2626,#2563EB,#16A34A,#EAB308)" },
];

/* ── Size options ─────────────────────────────────────────────────────────── */
const SIZE_OPTIONS = ["Free Size","XS","S","M","L","XL","XXL","3XL"];

const EMPTY = {
  name:"", description:"", price:"", originalPrice:"", discountPercent:0,
  stockQuantity:0, categoryId:"", isFeatured:false, isActive:true,
  colours:[], sizes:[], gender:"", fabric:"", occasion:"",
};

/* ── Multi-select colour chip picker ──────────────────────────────────────── */
function ColourPicker({ selected, onChange, T, theme }) {
  const toggle = (label) => {
    const next = selected.includes(label)
      ? selected.filter(c => c !== label)
      : [...selected, label];
    onChange(next);
  };
  return (
    <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:6 }}>
      {COLOUR_OPTIONS.map(({ label, hex }) => {
        const active = selected.includes(label);
        return (
          <button key={label} type="button" onClick={() => toggle(label)}
            title={label}
            style={{
              display:"flex", alignItems:"center", gap:6,
              padding:"5px 10px 5px 6px",
              borderRadius:20,
              border:`2px solid ${active ? (theme==="dark"?"#D4AF37":"#800000") : (theme==="dark"?"rgba(255,255,255,0.12)":"#D1CBC0")}`,
              background: active
                ? (theme==="dark"?"rgba(212,175,55,0.12)":"rgba(128,0,0,0.07)")
                : (theme==="dark"?"rgba(255,255,255,0.03)":"#FAFAF8"),
              cursor:"pointer",
              transition:"all 0.15s",
              fontFamily:SANS, fontSize:12, fontWeight: active?700:500,
              color: active ? (theme==="dark"?"#D4AF37":"#800000") : T.muted,
            }}>
            {/* Swatch */}
            <span style={{
              width:14, height:14, borderRadius:"50%", flexShrink:0,
              background: hex,
              border: label==="White" ? "1px solid #ccc" : "1px solid rgba(0,0,0,0.1)",
              boxShadow: active ? "0 0 0 2px rgba(212,175,55,0.4)" : "none",
            }}/>
            {label}
            {active && (
              <span style={{ marginLeft:2, fontSize:10, lineHeight:1 }}>✕</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ── Multi-select size chip picker ───────────────────────────────────────── */
function SizePicker({ selected, onChange, T, theme }) {
  const toggle = (s) => {
    const next = selected.includes(s)
      ? selected.filter(x => x !== s)
      : [...selected, s];
    onChange(next);
  };
  return (
    <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:6 }}>
      {SIZE_OPTIONS.map(s => {
        const active = selected.includes(s);
        return (
          <button key={s} type="button" onClick={() => toggle(s)}
            style={{
              minWidth:48, padding:"7px 14px",
              borderRadius:8,
              border:`2px solid ${active ? (theme==="dark"?"#D4AF37":"#800000") : (theme==="dark"?"rgba(255,255,255,0.12)":"#D1CBC0")}`,
              background: active
                ? (theme==="dark"?"rgba(212,175,55,0.12)":"rgba(128,0,0,0.07)")
                : (theme==="dark"?"rgba(255,255,255,0.03)":"#FAFAF8"),
              cursor:"pointer",
              transition:"all 0.15s",
              fontFamily:SANS, fontSize:13, fontWeight: active?800:500,
              color: active ? (theme==="dark"?"#D4AF37":"#800000") : T.muted,
              letterSpacing:"0.03em",
            }}>
            {s}
          </button>
        );
      })}
    </div>
  );
}

/* ── Stock pill: red below 5, amber 5-9, green 10+ ──────────────────────── */
function StockPill({ qty, T, theme }) {
  const n = qty || 0;
  let color, bg, border, dot, label;
  if (n === 0) {
    color = T.danger; bg = T.dangerBg; border = T.dangerBorder;
    dot = T.danger; label = "Out of stock";
  } else if (n < 5) {
    color = "#DC2626"; bg = "rgba(220,38,38,0.08)"; border = "rgba(220,38,38,0.3)";
    dot = "#DC2626"; label = `${n} left — Low!`;
  } else if (n < 10) {
    color = "#D97706"; bg = "rgba(217,119,6,0.08)"; border = "rgba(217,119,6,0.3)";
    dot = "#D97706"; label = `${n} in stock`;
  } else {
    color = T.green; bg = T.greenBg; border = T.greenBorder;
    dot = T.green; label = `${n} in stock`;
  }
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"3px 9px",
      borderRadius:20, marginBottom:10, background:bg, border:`1.5px solid ${border}` }}>
      <div style={{ width:5, height:5, borderRadius:"50%", background:dot,
        boxShadow: n > 0 && n < 5 ? `0 0 0 2px rgba(220,38,38,0.2)` : "none",
        animation: n > 0 && n < 5 ? "pulseRed 1.4s ease-in-out infinite" : "none" }}/>
      <span style={{ fontSize:11, fontWeight:700, color }}>{label}</span>
    </div>
  );
}

export default function AdminProducts() {
  const raw = useAdminTheme();
  // Guarantee T is always a valid object even if context isn't set up
  const theme = raw?.theme || "dark";
  const T = raw?.T || (theme === "dark" ? _DARK : _LIGHT);
  const [products,       setProducts]       = useState([]);
  const [categories,     setCategories]     = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [saving,         setSaving]         = useState(false);
  const [modalOpen,      setModalOpen]      = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form,           setForm]           = useState({...EMPTY});
  const [uploadingImage, setUploadingImage] = useState(null);
  const [currentPage,    setCurrentPage]    = useState(0);
  const [totalPages,     setTotalPages]     = useState(0);
  const [searchQuery,    setSearchQuery]    = useState("");
  const [activeTab,      setActiveTab]      = useState("basic");
  const [filterActive,   setFilterActive]   = useState("all");

  useEffect(() => { fetchProducts(); fetchCategories(); }, [currentPage, searchQuery]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await adminAPI.getAllProducts(currentPage, 20, searchQuery);
      setProducts(data.content || []); setTotalPages(data.totalPages || 0);
    } catch(e) { console.error(e); }
    finally { setLoading(false); }
  };

  const fetchCategories = async () => {
    try { setCategories(await adminAPI.getAllCategories()); } catch(e) { console.error(e); }
  };

  /* ── Parse colours/sizes from product (backend stores as comma string or array) */
  const parseList = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    return val.split(",").map(v => v.trim()).filter(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      const payload = {
        ...form,
        price:          parseFloat(form.price),
        originalPrice:  form.originalPrice ? parseFloat(form.originalPrice) : null,
        discountPercent:parseInt(form.discountPercent) || 0,
        stockQuantity:  parseInt(form.stockQuantity) || 0,
        categoryId:     parseInt(form.categoryId),
        /* Send colours & sizes as comma-separated strings so the backend
           stores them in a single VARCHAR column without schema changes.
           If your backend already accepts arrays, just pass form.colours / form.sizes directly. */
        colour:  form.colours.join(","),
        size:    form.sizes.join(","),
        colours: form.colours,   // also send array for backends that support it
        sizes:   form.sizes,
        gender:  form.gender,
        fabric:  form.fabric,
        occasion:form.occasion,
      };
      if (editingProduct) await adminAPI.updateProduct(editingProduct.id, payload);
      else                await adminAPI.createProduct(payload);
      fetchProducts(); closeModal();
    } catch(e) { alert(e.response?.data?.message || "Failed to save product"); }
    finally { setSaving(false); }
  };

  const handleImageUpload = async (id, file) => {
    setUploadingImage(id);
    try { await adminAPI.uploadProductImage(id, file); fetchProducts(); }
    catch { alert("Image upload failed"); }
    finally { setUploadingImage(null); }
  };

  const handleDelete   = async (id) => { if (!confirm("Delete this product?")) return; try { await adminAPI.deleteProduct(id); fetchProducts(); } catch { alert("Failed to delete"); } };
  const toggleFeatured = async (id) => { try { await adminAPI.toggleFeatured(id); fetchProducts(); } catch { alert("Failed"); } };
  const toggleActive   = async (id) => { try { await adminAPI.toggleActive(id);   fetchProducts(); } catch { alert("Failed"); } };

  const openModal = (product = null) => {
    setEditingProduct(product);
    setForm(product ? {
      name:           product.name,
      description:    product.description || "",
      price:          product.price.toString(),
      originalPrice:  product.originalPrice?.toString() || "",
      discountPercent:product.discountPercent || 0,
      stockQuantity:  product.stockQuantity || 0,
      categoryId:     product.category?.id?.toString() || "",
      isFeatured:     product.isFeatured || false,
      isActive:       product.isActive !== false,
      /* Parse both array and comma-string formats from backend */
      colours:        parseList(product.colours || product.colour),
      sizes:          parseList(product.sizes   || product.size),
      gender:         product.gender  || "",
      fabric:         product.fabric  || "",
      occasion:       product.occasion|| "",
    } : { ...EMPTY });
    setActiveTab("basic"); setModalOpen(true);
  };

  const closeModal = () => { setModalOpen(false); setEditingProduct(null); setForm({...EMPTY}); };

  const iStyle = {
    width:"100%", padding:"11px 14px", background:T.inputBg,
    border:`1.5px solid ${T.inputBorder}`, borderRadius:8,
    color:T.text, fontSize:14, outline:"none", fontFamily:SANS, transition:"border-color 0.15s",
    boxShadow:theme==="light"?"inset 0 1px 3px rgba(0,0,0,0.04)":"none",
  };
  const lStyle = {
    display:"block", fontSize:11, fontWeight:700, letterSpacing:"0.15em",
    textTransform:"uppercase", color:T.muted, marginBottom:7,
  };
  const fi = e => e.target.style.borderColor = T.inputFocus;
  const fo = e => e.target.style.borderColor = T.inputBorder;
  const fld = (key) => ({ value:form[key], onChange:e=>setForm({...form,[key]:e.target.value}), onFocus:fi, onBlur:fo });

  const visibleProducts = filterActive === "all"      ? products
    : filterActive === "featured"  ? products.filter(p=>p.isFeatured)
    : filterActive === "active"    ? products.filter(p=>p.isActive)
    : filterActive === "inactive"  ? products.filter(p=>!p.isActive)
    : filterActive === "lowstock"  ? products.filter(p=>(p.stockQuantity||0)>0&&(p.stockQuantity||0)<5)
    : filterActive === "nostock"   ? products.filter(p=>(p.stockQuantity||0)===0)
    : products;

  const counts = {
    all:      products.length,
    featured: products.filter(p=>p.isFeatured).length,
    active:   products.filter(p=>p.isActive).length,
    inactive: products.filter(p=>!p.isActive).length,
    lowstock: products.filter(p=>(p.stockQuantity||0)>0&&(p.stockQuantity||0)<5).length,
    nostock:  products.filter(p=>(p.stockQuantity||0)===0).length,
  };

  const FILTER_TABS = [
    { key:"all",      label:`All (${counts.all})` },
    { key:"active",   label:`Active (${counts.active})` },
    { key:"featured", label:`Featured (${counts.featured})` },
    { key:"inactive", label:`Inactive (${counts.inactive})` },
    { key:"lowstock", label:`⚠ Low Stock (${counts.lowstock})`, warn:true },
    { key:"nostock",  label:`No Stock (${counts.nostock})` },
  ];

  return (
    <div style={{ fontFamily:SANS, color:T.text }}>

      {/* ── HEADER ── */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:22 }}>
        <div>
          <h1 style={{ fontFamily:SERIF, fontSize:28, fontWeight:700, color:T.text, marginBottom:5 }}>Products</h1>
          <p style={{ fontSize:14, color:T.muted }}>Manage your product catalog — {products.length} items</p>
        </div>
        <button onClick={() => openModal()}
          style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 20px",
            background:T.maroon, color:"#FFFFF0", border:"none", cursor:"pointer",
            fontSize:13, fontWeight:600, fontFamily:SANS, borderRadius:8, whiteSpace:"nowrap",
            boxShadow:theme==="light"?"0 2px 8px rgba(128,0,0,0.25)":"none" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          New Product
        </button>
      </div>

      {/* ── TOOLBAR ── */}
      <div style={{ background:T.card, border:`1.5px solid ${T.statBorder||T.border}`,
        borderRadius:10, marginBottom:18, boxShadow:T.shadow }}>
        <div style={{ padding:"12px 14px", borderBottom:`1px solid ${T.tableBorder}`, display:"flex", gap:10 }}>
          <div style={{ position:"relative", flex:1, maxWidth:340 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.muted} strokeWidth="2"
              style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input placeholder="Search by name, category…" value={searchQuery}
              onChange={e=>{setSearchQuery(e.target.value); setCurrentPage(0);}}
              style={{ ...iStyle, paddingLeft:36 }} onFocus={fi} onBlur={fo}/>
          </div>
        </div>
        <div style={{ padding:"8px 14px", display:"flex", gap:6, overflowX:"auto" }}>
          {FILTER_TABS.map(f => (
            <button key={f.key} onClick={()=>setFilterActive(f.key)}
              style={{ padding:"7px 14px", borderRadius:7,
                border:`1.5px solid ${filterActive===f.key ? (f.warn?"rgba(220,38,38,0.6)":T.borderHi) : T.border}`,
                background: filterActive===f.key
                  ? (f.warn?"rgba(220,38,38,0.08)":(theme==="dark"?"rgba(212,175,55,0.1)":"rgba(128,0,0,0.06)"))
                  : "transparent",
                color: filterActive===f.key
                  ? (f.warn?"#DC2626":(theme==="dark"?T.gold:T.maroon))
                  : (f.warn&&counts.lowstock>0?"#DC2626":T.muted),
                fontSize:12, fontWeight:filterActive===f.key?700:500, cursor:"pointer",
                fontFamily:SANS, transition:"all 0.15s", whiteSpace:"nowrap" }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── PRODUCT GRID ── */}
      {loading ? (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:14 }}>
          {[...Array(8)].map((_,i) => (
            <div key={i} style={{ height:330, background:T.card, borderRadius:12,
              border:`1px solid ${T.statBorder||T.border}`, animation:"fadeInOut 1.4s ease-in-out infinite" }}/>
          ))}
        </div>
      ) : visibleProducts.length === 0 ? (
        <div style={{ textAlign:"center", padding:"80px 20px", background:T.card,
          border:`2px dashed ${T.statBorder||T.border}`, borderRadius:14 }}>
          <div style={{ width:56, height:56, margin:"0 auto 18px", borderRadius:14,
            background:theme==="dark"?"rgba(212,175,55,0.07)":"#FEF9ED",
            border:`1.5px solid ${theme==="dark"?"rgba(212,175,55,0.15)":"#E8D5A0"}`,
            display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={theme==="dark"?T.gold:"#7A5C0A"} strokeWidth="1.5">
              <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
          </div>
          <p style={{ fontSize:18, fontWeight:700, color:T.text, marginBottom:8 }}>No products found</p>
          <p style={{ fontSize:14, color:T.muted, marginBottom:22 }}>Try adjusting your search or filters</p>
          <button onClick={() => openModal()}
            style={{ padding:"10px 22px", background:T.maroon, color:"#FFFFF0",
              border:"none", cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:SANS, borderRadius:8 }}>
            Add Product
          </button>
        </div>
      ) : (
        <>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:14 }}>
            {visibleProducts.map((p,i) => {
              const stockQty = p.stockQuantity || 0;
              const isLow    = stockQty > 0 && stockQty < 5;
              /* Parse multi-value attributes for display */
              const displayColours = parseList(p.colours || p.colour);
              const displaySizes   = parseList(p.sizes   || p.size);

              return (
              <motion.div key={p.id} initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.04 }}
                className="p-card"
                style={{ background:T.card,
                  border:`1.5px solid ${isLow?"rgba(220,38,38,0.35)":(T.statBorder||T.border)}`,
                  borderRadius:13, overflow:"hidden",
                  display:"flex", flexDirection:"column",
                  boxShadow: isLow
                    ? (theme==="dark"?"0 0 0 1px rgba(220,38,38,0.15)":"0 0 0 1px rgba(220,38,38,0.1)")
                    : T.shadow,
                  transition:"background 0.3s, border-color 0.3s, box-shadow 0.18s" }}>

                {/* Image */}
                <div style={{ position:"relative", height:175, background:T.inputBg, overflow:"hidden" }}>
                  {p.imageUrl
                    ? <img src={p.imageUrl} alt={p.name} className="p-img"
                        style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s" }}/>
                    : <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
                          stroke={theme==="dark"?"rgba(255,255,255,0.08)":"#D1CBC0"} strokeWidth="1">
                          <rect x="3" y="3" width="18" height="18" rx="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                        </svg>
                      </div>
                  }
                  {/* Upload overlay */}
                  <label className="p-overlay"
                    style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.78)",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      cursor:"pointer", opacity:0, transition:"opacity 0.2s" }}>
                    <input type="file" accept="image/*" style={{ display:"none" }}
                      onChange={e=>handleImageUpload(p.id,e.target.files[0])} disabled={uploadingImage===p.id}/>
                    {uploadingImage===p.id
                      ? <div style={{ width:26, height:26, border:"2px solid #D4AF37",
                          borderTopColor:"transparent", borderRadius:"50%", animation:"spin 0.8s linear infinite" }}/>
                      : <div style={{ textAlign:"center" }}>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5"
                            style={{ display:"block", margin:"0 auto 5px" }}>
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                          </svg>
                          <span style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"#D4AF37", fontWeight:700 }}>Upload</span>
                        </div>
                    }
                  </label>

                  {/* Badges */}
                  <div style={{ position:"absolute", top:8, left:8, display:"flex", flexDirection:"column", gap:4 }}>
                    {p.isFeatured && (
                      <span style={{ padding:"2px 8px", background:"rgba(212,175,55,0.92)", color:"#1a1200",
                        fontSize:10, fontWeight:800, letterSpacing:"0.06em", textTransform:"uppercase", borderRadius:4 }}>★ Featured</span>
                    )}
                    {!p.isActive && (
                      <span style={{ padding:"2px 8px", background:"rgba(185,28,28,0.9)", color:"white",
                        fontSize:10, fontWeight:800, letterSpacing:"0.06em", textTransform:"uppercase", borderRadius:4 }}>Inactive</span>
                    )}
                    {stockQty === 0 && (
                      <span style={{ padding:"2px 8px", background:"rgba(0,0,0,0.78)", color:"#ccc",
                        fontSize:10, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", borderRadius:4 }}>No Stock</span>
                    )}
                    {p.discountPercent > 0 && (
                      <span style={{ padding:"2px 8px", background:"rgba(21,128,61,0.9)", color:"white",
                        fontSize:10, fontWeight:800, letterSpacing:"0.04em", borderRadius:4 }}>{p.discountPercent}% OFF</span>
                    )}
                  </div>

                  {/* Low stock — absolute banner at bottom of image, no layout shift */}
                  {isLow && (
                    <div style={{
                      position:"absolute", bottom:0, left:0, right:0,
                      background:"linear-gradient(transparent,rgba(180,0,0,0.82))",
                      padding:"18px 10px 6px",
                      display:"flex", alignItems:"center", gap:5,
                    }}>
                      <div style={{ width:5, height:5, borderRadius:"50%", background:"#fff",
                        animation:"pulseRed 1.2s ease-in-out infinite", flexShrink:0 }}/>
                      <span style={{ fontSize:10, fontWeight:800, color:"#fff",
                        letterSpacing:"0.08em", textTransform:"uppercase" }}>
                        LOW STOCK — ONLY {stockQty} LEFT
                      </span>
                    </div>
                  )}
                </div>

                {/* Product info — flex column so actions always pin to bottom */}
                <div style={{
                  padding:"11px 12px 12px",
                  display:"flex", flexDirection:"column", flex:1,
                }}>

                  {/* ── Top section: category, name, price, stock (fixed) ── */}
                  <div>
                    {/* Category + gender row */}
                    <div style={{ display:"flex", gap:5, marginBottom:6, flexWrap:"wrap" }}>
                      <span style={{ padding:"2px 7px", borderRadius:4,
                        fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase",
                        background:theme==="dark"?"rgba(212,175,55,0.1)":"#FEF9ED",
                        color:theme==="dark"?T.gold:"#7A5C0A",
                        border:`1px solid ${theme==="dark"?"rgba(212,175,55,0.2)":"#E8D5A0"}` }}>
                        {p.category?.name || "Uncategorised"}
                      </span>
                      {p.gender && (
                        <span style={{ padding:"2px 7px", borderRadius:4,
                          fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase",
                          background:theme==="dark"?"rgba(255,255,255,0.05)":"#F3F0EC",
                          color:T.muted, border:`1px solid ${T.border}` }}>
                          {p.gender}
                        </span>
                      )}
                    </div>

                    {/* Name */}
                    <h3 style={{ fontSize:13, fontWeight:700, color:T.text, marginBottom:6,
                      overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis", lineHeight:1.3 }}>
                      {p.name}
                    </h3>

                    {/* Price */}
                    <div style={{ display:"flex", alignItems:"baseline", gap:6, marginBottom:6 }}>
                      <span style={{ fontFamily:SERIF, fontSize:16, fontWeight:700, color:T.text }}>
                        ₹{p.price?.toLocaleString("en-IN")}
                      </span>
                      {p.originalPrice && p.originalPrice > p.price && (
                        <span style={{ fontSize:11, color:T.dim, textDecoration:"line-through" }}>
                          ₹{p.originalPrice?.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>

                    {/* Stock pill */}
                    <StockPill qty={stockQty} T={T} theme={theme} />
                  </div>

                  {/* ── Middle: fixed 44px attribute strip — same height on every card ── */}
                  <div style={{ height:44, overflow:"hidden", marginBottom:8, display:"flex", flexDirection:"column", justifyContent:"center", gap:4 }}>
                    {/* Colour swatches row */}
                    <div style={{ display:"flex", gap:4, alignItems:"center", flexWrap:"nowrap", overflow:"hidden" }}>
                      {displayColours.length > 0
                        ? displayColours.slice(0,8).map(c => {
                            const opt = COLOUR_OPTIONS.find(o=>o.label===c);
                            return opt ? (
                              <span key={c} title={c} style={{
                                width:11, height:11, borderRadius:"50%", flexShrink:0,
                                background:opt.hex, border:"1.5px solid rgba(0,0,0,0.15)",
                                display:"inline-block",
                              }}/>
                            ) : null;
                          })
                        : <span style={{ fontSize:10, color:T.dim, fontStyle:"italic" }}>No colours</span>
                      }
                      {displayColours.length > 8 && <span style={{ fontSize:10, color:T.muted, flexShrink:0 }}>+{displayColours.length-8}</span>}
                    </div>

                    {/* Size chips row */}
                    <div style={{ display:"flex", gap:3, alignItems:"center", flexWrap:"nowrap", overflow:"hidden" }}>
                      {displaySizes.length > 0
                        ? displaySizes.slice(0,6).map(s => (
                            <span key={s} style={{ padding:"1px 5px", borderRadius:4, fontSize:10, fontWeight:600, flexShrink:0,
                              background:T.badgePill||T.hoverBg, border:`1px solid ${T.statBorder||T.border}`, color:T.muted }}>
                              {s}
                            </span>
                          ))
                        : <span style={{ fontSize:10, color:T.dim, fontStyle:"italic" }}>No sizes</span>
                      }
                      {displaySizes.length > 6 && <span style={{ fontSize:10, color:T.muted, flexShrink:0 }}>+{displaySizes.length-6}</span>}
                    </div>
                  </div>

                  {/* ── Bottom section: actions pinned to bottom via marginTop:auto ── */}
                  <div style={{ marginTop:"auto" }}>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr auto auto", gap:5 }}>
                      <button onClick={()=>openModal(p)}
                        style={{ padding:"8px", background:"rgba(212,175,55,0.07)", border:`1px solid ${T.borderHi}`,
                          color:T.gold, cursor:"pointer", fontSize:11, fontWeight:700, letterSpacing:"0.06em",
                          textTransform:"uppercase", fontFamily:SANS, borderRadius:7, transition:"all 0.12s" }}
                        onMouseEnter={e=>e.currentTarget.style.background="rgba(212,175,55,0.14)"}
                        onMouseLeave={e=>e.currentTarget.style.background="rgba(212,175,55,0.07)"}>Edit</button>
                      <button onClick={()=>toggleFeatured(p.id)} title={p.isFeatured?"Unfeature":"Feature"}
                        style={{ padding:"8px 10px", background:p.isFeatured?"rgba(212,175,55,0.15)":"transparent",
                          border:`1px solid ${T.borderHi}`, color:T.gold, cursor:"pointer", borderRadius:7, fontSize:13 }}>★</button>
                      <button onClick={()=>handleDelete(p.id)}
                        style={{ padding:"8px 10px", background:T.dangerBg, border:`1px solid ${T.dangerBorder}`,
                          color:T.danger, cursor:"pointer", borderRadius:7, display:"flex", alignItems:"center", transition:"all 0.12s" }}
                        onMouseEnter={e=>e.currentTarget.style.background="rgba(220,38,38,0.14)"}
                        onMouseLeave={e=>e.currentTarget.style.background=T.dangerBg}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                        </svg>
                      </button>
                    </div>
                    <button onClick={()=>toggleActive(p.id)}
                      style={{ width:"100%", marginTop:5, padding:"7px", background:"transparent",
                        border:`1px solid ${p.isActive?T.greenBorder:T.dangerBorder}`,
                        color:p.isActive?T.green:T.danger, cursor:"pointer", fontSize:11, fontWeight:700,
                        letterSpacing:"0.06em", textTransform:"uppercase", fontFamily:SANS, borderRadius:7 }}>
                      {p.isActive ? "● Active" : "○ Inactive"}
                    </button>
                  </div>

                </div>
              </motion.div>
            );})}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:8, marginTop:28 }}>
              <button onClick={()=>setCurrentPage(p=>Math.max(0,p-1))} disabled={currentPage===0}
                style={{ padding:"8px 16px", background:"transparent", border:`1.5px solid ${T.border}`,
                  color:currentPage===0?T.dim:T.text, cursor:currentPage===0?"default":"pointer",
                  fontSize:13, fontFamily:SANS, borderRadius:7 }}>← Prev</button>
              <span style={{ padding:"8px 18px", background:T.card, border:`1.5px solid ${T.statBorder||T.border}`,
                color:T.text, fontSize:13, borderRadius:7, fontWeight:600 }}>
                Page {currentPage+1} of {totalPages}
              </span>
              <button onClick={()=>setCurrentPage(p=>Math.min(totalPages-1,p+1))} disabled={currentPage>=totalPages-1}
                style={{ padding:"8px 16px", background:"transparent", border:`1.5px solid ${T.border}`,
                  color:currentPage>=totalPages-1?T.dim:T.text, cursor:currentPage>=totalPages-1?"default":"pointer",
                  fontSize:13, fontFamily:SANS, borderRadius:7 }}>Next →</button>
            </div>
          )}
        </>
      )}

      {/* ── PRODUCT MODAL ── */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            style={{ position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"flex-start",
              justifyContent:"center", padding:"24px 16px",
              background:"rgba(0,0,0,0.6)", overflowY:"auto", backdropFilter:"blur(4px)" }}
            onClick={closeModal}>
            <motion.div initial={{scale:0.93,opacity:0,y:20}} animate={{scale:1,opacity:1,y:0}}
              exit={{scale:0.93,opacity:0}} transition={{type:"spring",stiffness:320,damping:28}}
              style={{ width:"100%", maxWidth:680, background:T.surface,
                border:`1.5px solid ${T.borderHi}`, borderRadius:18, overflow:"hidden",
                marginBottom:24, boxShadow:"0 24px 64px rgba(0,0,0,0.3)" }}
              onClick={e=>e.stopPropagation()}>

              {/* Modal header */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                padding:"20px 24px", borderBottom:`1.5px solid ${T.tableBorder}`,
                background:theme==="light"?"#FAFAF8":T.surface }}>
                <div>
                  <h2 style={{ fontFamily:SERIF, fontSize:24, fontWeight:700, color:T.text }}>
                    {editingProduct ? "Edit Product" : "New Product"}
                  </h2>
                  <p style={{ fontSize:13, color:T.muted, marginTop:3 }}>
                    {editingProduct ? "Update product information" : "Add a new item to your catalog"}
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

              {/* Tab bar */}
              <div style={{ display:"flex", borderBottom:`1.5px solid ${T.tableBorder}` }}>
                {[
                  { key:"basic",      label:"📋 Basic Info" },
                  { key:"attributes", label:"🏷️ Attributes & Filters" },
                ].map(tab => (
                  <button key={tab.key} onClick={()=>setActiveTab(tab.key)}
                    style={{ flex:1, padding:"14px", background:"transparent", border:"none",
                      cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:SANS,
                      color:activeTab===tab.key?(theme==="dark"?T.gold:T.maroon):T.muted,
                      borderBottom:`2.5px solid ${activeTab===tab.key?(theme==="dark"?T.gold:T.maroon):"transparent"}`,
                      transition:"all 0.15s" }}>
                    {tab.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ padding:"22px 24px", display:"flex", flexDirection:"column", gap:16 }}>

                  {/* ── TAB: BASIC ── */}
                  {activeTab === "basic" && <>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                      <div>
                        <label style={lStyle}>Product Name *</label>
                        <input type="text" required {...fld("name")} placeholder="e.g. Kanjivaram Silk Saree" style={iStyle}/>
                      </div>
                      <div>
                        <label style={lStyle}>Category *</label>
                        <select required {...fld("categoryId")} style={{...iStyle, cursor:"pointer"}}>
                          <option value="">Select category</option>
                          {categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={lStyle}>Description</label>
                      <textarea {...fld("description")} rows={3}
                        placeholder="Describe the product — fabric, weave, occasion…"
                        style={{...iStyle, resize:"vertical"}}/>
                    </div>

                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
                      <div>
                        <label style={lStyle}>Sale Price (₹) *</label>
                        <input type="number" step="0.01" required {...fld("price")} placeholder="0.00" style={iStyle}/>
                      </div>
                      <div>
                        <label style={lStyle}>MRP / Original (₹)</label>
                        <input type="number" step="0.01" {...fld("originalPrice")} placeholder="0.00" style={iStyle}/>
                      </div>
                      <div>
                        <label style={lStyle}>Stock Qty *</label>
                        <input type="number" required {...fld("stockQuantity")} placeholder="0" style={iStyle}/>
                        {/* Inline stock warning in form */}
                        {parseInt(form.stockQuantity) > 0 && parseInt(form.stockQuantity) < 5 && (
                          <p style={{ fontSize:11, color:"#DC2626", marginTop:5, fontWeight:600,
                            display:"flex", alignItems:"center", gap:4 }}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                            </svg>
                            Low stock — consider restocking soon
                          </p>
                        )}
                      </div>
                    </div>

                    <div style={{ display:"flex", gap:12 }}>
                      {[
                        { label:"★ Featured", sublabel:"Shown in featured section", key:"isFeatured",
                          color:theme==="dark"?T.gold:"#7A5C0A",
                          bg:theme==="dark"?"rgba(212,175,55,0.06)":"#FEF9ED",
                          bd:theme==="dark"?"rgba(212,175,55,0.2)":"#C8A840" },
                        { label:"Active", sublabel:"Visible to customers", key:"isActive",
                          color:T.green, bg:T.greenBg, bd:T.greenBorder },
                      ].map(t => (
                        <label key={t.key} style={{ flex:1, display:"flex", alignItems:"center", gap:12,
                          padding:"12px 14px", background:t.bg, border:`1.5px solid ${t.bd}`, borderRadius:8, cursor:"pointer" }}>
                          <div style={{ position:"relative", width:36, height:20, flexShrink:0 }}
                            onClick={()=>setForm({...form,[t.key]:!form[t.key]})}>
                            <div style={{ width:36, height:20, borderRadius:10,
                              background:form[t.key]?t.color:"rgba(128,128,128,0.25)", transition:"background 0.2s" }}/>
                            <div style={{ position:"absolute", top:2, left:form[t.key]?18:2, width:16, height:16,
                              borderRadius:"50%", background:"white", transition:"left 0.2s",
                              boxShadow:"0 1px 3px rgba(0,0,0,0.25)" }}/>
                          </div>
                          <div>
                            <p style={{ fontSize:13, fontWeight:700, color:t.color }}>{t.label}</p>
                            <p style={{ fontSize:11, color:T.muted }}>{t.sublabel}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </>}

                  {/* ── TAB: ATTRIBUTES ── */}
                  {activeTab === "attributes" && <>
                    

                    {/* GENDER (single — determines section) */}
                    <div>
                      <label style={lStyle}>Gender * <span style={{fontSize:10,fontWeight:500,letterSpacing:0,textTransform:"none",color:T.danger}}>(required — determines Women / Men / Kids section)</span></label>
                      <div style={{ display:"flex", gap:8, marginTop:6 }}>
                        {["Women","Men","Kids","Unisex"].map(g => (
                          <button key={g} type="button" onClick={()=>setForm({...form, gender:g})}
                            style={{
                              flex:1, padding:"10px 8px",
                              borderRadius:8,
                              border:`2px solid ${form.gender===g?(theme==="dark"?"#D4AF37":"#800000"):(theme==="dark"?"rgba(255,255,255,0.12)":"#D1CBC0")}`,
                              background: form.gender===g
                                ? (theme==="dark"?"rgba(212,175,55,0.12)":"rgba(128,0,0,0.07)")
                                : "transparent",
                              cursor:"pointer", fontFamily:SANS, fontSize:13,
                              fontWeight: form.gender===g?800:500,
                              color: form.gender===g?(theme==="dark"?"#D4AF37":"#800000"):T.muted,
                              transition:"all 0.15s",
                            }}>
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* COLOURS — multi-select */}
                    <div>
                      <label style={lStyle}>
                        Colours
                        {form.colours.length > 0 && (
                          <span style={{ marginLeft:8, fontSize:10, fontWeight:500,
                            textTransform:"none", letterSpacing:0, color:T.muted }}>
                            ({form.colours.length} selected)
                          </span>
                        )}
                      </label>
                      <ColourPicker
                        selected={form.colours}
                        onChange={colours => setForm({...form, colours})}
                        T={T} theme={theme}
                      />
                      {form.colours.length === 0 && (
                        <p style={{ fontSize:11, color:T.dim, marginTop:6, fontStyle:"italic" }}>
                          Click colours to select — you can pick multiple
                        </p>
                      )}
                    </div>

                    {/* SIZES — multi-select */}
                    <div>
                      <label style={lStyle}>
                        Available Sizes
                        {form.sizes.length > 0 && (
                          <span style={{ marginLeft:8, fontSize:10, fontWeight:500,
                            textTransform:"none", letterSpacing:0, color:T.muted }}>
                            ({form.sizes.length} selected: {form.sizes.join(", ")})
                          </span>
                        )}
                      </label>
                      <SizePicker
                        selected={form.sizes}
                        onChange={sizes => setForm({...form, sizes})}
                        T={T} theme={theme}
                      />
                      {form.sizes.length === 0 && (
                        <p style={{ fontSize:11, color:T.dim, marginTop:6, fontStyle:"italic" }}>
                          Click sizes to select — e.g. M, L, XL all at once
                        </p>
                      )}
                    </div>

                    {/* FABRIC + OCCASION */}
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                      <div>
                        <label style={lStyle}>Fabric / Material</label>
                        <select {...fld("fabric")} style={{...iStyle, cursor:"pointer"}}>
                          <option value="">Select</option>
                          {["Pure Silk","Kanjivaram Silk","Banarasi Silk","Tussar Silk","Chanderi","Cotton","Cotton Silk","Georgette","Chiffon","Linen","Polyester","Crepe"].map(f=><option key={f}>{f}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={lStyle}>Occasion</label>
                        <select {...fld("occasion")} style={{...iStyle, cursor:"pointer"}}>
                          <option value="">Select</option>
                          {["Wedding","Festival","Casual","Party","Office","Daily Wear","Traditional","Formal"].map(o=><option key={o}>{o}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* Live attribute preview */}
                    <div style={{ padding:"14px", borderRadius:9,
                      background:T.cardAlt||T.hoverBg, border:`1.5px solid ${T.statBorder||T.border}` }}>
                      <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase",
                        color:T.muted, marginBottom:10 }}>Attribute Preview — what gets saved</p>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>

                        {/* Gender chip */}
                        {form.gender && (
                          <span style={{ padding:"5px 12px", borderRadius:20, fontSize:12, fontWeight:600,
                            background:theme==="dark"?"rgba(212,175,55,0.1)":"#FEF9ED",
                            border:`1.5px solid ${theme==="dark"?"rgba(212,175,55,0.25)":"#C8A840"}`,
                            color:theme==="dark"?T.gold:"#7A5C0A" }}>
                            👤 {form.gender}
                          </span>
                        )}

                        {/* Colour chips */}
                        {form.colours.map(c => {
                          const opt = COLOUR_OPTIONS.find(o=>o.label===c);
                          return (
                            <span key={c} style={{ padding:"5px 12px 5px 8px", borderRadius:20, fontSize:12, fontWeight:600,
                              display:"inline-flex", alignItems:"center", gap:6,
                              background:theme==="dark"?"rgba(212,175,55,0.1)":"#FEF9ED",
                              border:`1.5px solid ${theme==="dark"?"rgba(212,175,55,0.25)":"#C8A840"}`,
                              color:theme==="dark"?T.gold:"#7A5C0A" }}>
                              {opt && <span style={{ width:10, height:10, borderRadius:"50%", background:opt.hex,
                                border:"1px solid rgba(0,0,0,0.15)", flexShrink:0 }}/>}
                              {c}
                            </span>
                          );
                        })}

                        {/* Size chips */}
                        {form.sizes.map(s => (
                          <span key={s} style={{ padding:"5px 12px", borderRadius:20, fontSize:12, fontWeight:600,
                            background:theme==="dark"?"rgba(255,255,255,0.06)":"#F3F0EC",
                            border:`1.5px solid ${theme==="dark"?"rgba(255,255,255,0.14)":"#C8C0B8"}`,
                            color:T.muted }}>
                            📐 {s}
                          </span>
                        ))}

                        {form.fabric && (
                          <span style={{ padding:"5px 12px", borderRadius:20, fontSize:12, fontWeight:600,
                            background:theme==="dark"?"rgba(212,175,55,0.1)":"#FEF9ED",
                            border:`1.5px solid ${theme==="dark"?"rgba(212,175,55,0.25)":"#C8A840"}`,
                            color:theme==="dark"?T.gold:"#7A5C0A" }}>
                            🧵 {form.fabric}
                          </span>
                        )}
                        {form.occasion && (
                          <span style={{ padding:"5px 12px", borderRadius:20, fontSize:12, fontWeight:600,
                            background:theme==="dark"?"rgba(212,175,55,0.1)":"#FEF9ED",
                            border:`1.5px solid ${theme==="dark"?"rgba(212,175,55,0.25)":"#C8A840"}`,
                            color:theme==="dark"?T.gold:"#7A5C0A" }}>
                            ✨ {form.occasion}
                          </span>
                        )}

                        {!form.gender && form.colours.length===0 && form.sizes.length===0 && !form.fabric && !form.occasion && (
                          <span style={{ fontSize:13, color:T.dim, fontStyle:"italic" }}>No attributes set yet</span>
                        )}
                      </div>

                      {/* Gender warning */}
                      {!form.gender && (
                        <p style={{ marginTop:10, fontSize:12, color:"#DC2626", fontWeight:600,
                          display:"flex", alignItems:"center", gap:5 }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                          </svg>
                          Gender is not set — this product won't appear in Women / Men / Kids pages
                        </p>
                      )}
                    </div>
                  </>}
                </div>

                {/* Modal footer */}
                <div style={{ display:"flex", gap:10, padding:"16px 24px",
                  borderTop:`1.5px solid ${T.tableBorder}`,
                  background:theme==="light"?"#FAFAF8":T.surface }}>
                  <button type="button" onClick={closeModal}
                    style={{ flex:1, padding:"12px", background:"transparent",
                      border:`1.5px solid ${T.border}`, color:T.muted, cursor:"pointer",
                      fontSize:13, fontWeight:600, fontFamily:SANS, borderRadius:8 }}>
                    Cancel
                  </button>
                  {activeTab==="basic" && (
                    <button type="button" onClick={()=>setActiveTab("attributes")}
                      style={{ flex:1, padding:"12px", cursor:"pointer", fontSize:13, fontWeight:600,
                        fontFamily:SANS, borderRadius:8, transition:"all 0.15s",
                        background:theme==="dark"?"rgba(212,175,55,0.08)":"#FEF9ED",
                        border:`1.5px solid ${theme==="dark"?"rgba(212,175,55,0.3)":"#C8A840"}`,
                        color:theme==="dark"?T.gold:"#7A5C0A" }}>
                      Attributes & Filters →
                    </button>
                  )}
                  <button type="submit" disabled={saving}
                    style={{ flex:2, padding:"12px", background:T.maroon, color:"#FFFFF0", border:"none",
                      cursor:saving?"wait":"pointer", fontSize:13, fontWeight:700, fontFamily:SANS,
                      borderRadius:8, opacity:saving?0.7:1, transition:"opacity 0.15s",
                      boxShadow:theme==="light"?"0 2px 8px rgba(128,0,0,0.3)":"none" }}>
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
        .p-card:hover { transform: translateY(-3px); box-shadow: ${T.shadowMd} !important; }
        .p-card:hover .p-overlay { opacity: 1 !important; }
        .p-card:hover .p-img     { transform: scale(1.05) !important; }
        @keyframes fadeInOut { 0%,100%{opacity:0.5} 50%{opacity:0.25} }
        @keyframes spin      { to { transform: rotate(360deg); } }
        @keyframes pulseRed  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
      `}</style>
    </div>
  );
}