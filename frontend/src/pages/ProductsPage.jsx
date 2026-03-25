// import { useState, useEffect } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import Navbar from "../components/Navbar";
// import ProductCard from "../components/ProductCard";
// import SidebarFilter from "../components/SidebarFilter";
// import { productAPI } from "../api";

// const F = "'Inter', system-ui, -apple-system, sans-serif";
// const RED = "#800000";

// const PAGE_CONFIG = {
//   "/women":        { title: "Women",       subtitle: "Sarees, Blouses & Ethnic Wear",      genderFilter: "Women" },
//   "/men":          { title: "Men",         subtitle: "Dhotis, Shirts & Traditional Wear",  genderFilter: "Men"   },
//   "/kids":         { title: "Kids",        subtitle: "Festive & Casual Collections",        genderFilter: "Kids"  },
//   "/new-arrivals": { title: "New Arrivals",subtitle: "Fresh off the loom — just in",       genderFilter: null    },
//   "/search":       { title: "Search",      subtitle: "",                                    genderFilter: null    },
//   "/products":     { title: "All Products",subtitle: "Our complete silk collection",        genderFilter: null    },
// };

// const DEFAULT_FILTERS = {
//   minPrice: 0, maxPrice: 10000,
//   selectedCategories: [],
//   selectedColors: [],
//   selectedSizes: [],
//   selectedGenders: [],
//   inStockOnly: false,
//   discountMin: 0,
//   minRating: 0,
//   sortBy: "newest",
// };

// function applyFilters(products, filters, pageGender) {
//   return products.filter(p => {
//     if (pageGender) {
//       const catName = (p.category?.name || "").toLowerCase();
//       if (!catName.includes(pageGender.toLowerCase())) return false;
//     }
//     if (filters.inStockOnly && (p.stockQuantity || 0) === 0) return false;
//     if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
//     if (filters.selectedCategories.length > 0 && !filters.selectedCategories.includes(p.category?.name)) return false;
//     if (filters.selectedGenders.length > 0) {
//       const catName = (p.category?.name || "").toLowerCase();
//       if (!filters.selectedGenders.some(g => catName.includes(g.toLowerCase()))) return false;
//     }
//     if (filters.discountMin > 0) {
//       const disc = p.originalPrice && p.originalPrice > p.price
//         ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
//         : (p.discountPercent || 0);
//       if (disc < filters.discountMin) return false;
//     }
//     if (filters.selectedColors.length > 0) {
//       const text = `${p.name} ${p.description || ""}`.toLowerCase();
//       if (!filters.selectedColors.some(c => text.includes(c.toLowerCase()))) return false;
//     }
//     return true;
//   });
// }

// function sortProducts(products, sortBy) {
//   const arr = [...products];
//   switch (sortBy) {
//     case "price_asc":  return arr.sort((a, b) => a.price - b.price);
//     case "price_desc": return arr.sort((a, b) => b.price - a.price);
//     case "featured":   return arr.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
//     default:           return arr.sort((a, b) => (b.id || 0) - (a.id || 0));
//   }
// }

// export default function ProductsPage({ pageType }) {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const config = PAGE_CONFIG[pageType] || PAGE_CONFIG["/products"];

//   const [allProducts, setAllProducts] = useState([]);
//   const [categories,  setCategories]  = useState([]);
//   const [loading,     setLoading]     = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [searchInput, setSearchInput] = useState(searchParams.get("q") || "");
//   const [filters,     setFilters]     = useState(DEFAULT_FILTERS);

//   useEffect(() => { fetchData(); }, [pageType, searchParams.get("q")]);
//   useEffect(() => { setSearchInput(searchParams.get("q") || ""); }, [searchParams]);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [cats, prods] = await Promise.allSettled([
//         productAPI.getAllCategories(),
//         productAPI.getAllProducts({ size: 200 }),
//       ]);
//       if (cats.status === "fulfilled") setCategories(cats.value || []);
//       if (prods.status === "fulfilled") {
//         let list = prods.value?.content || prods.value || [];
//         const q = searchParams.get("q");
//         if (q) {
//           const ql = q.toLowerCase();
//           list = list.filter(p =>
//             p.name?.toLowerCase().includes(ql) ||
//             p.description?.toLowerCase().includes(ql) ||
//             p.category?.name?.toLowerCase().includes(ql)
//           );
//         }
//         setAllProducts(list);
//       }
//     } catch (e) { console.error(e); }
//     finally { setLoading(false); }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchInput.trim()) navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
//   };

//   const displayed = sortProducts(applyFilters(allProducts, filters, config.genderFilter), filters.sortBy);

//   const SORT_OPTS = [
//     { key: "newest",     label: "Newest"    },
//     { key: "price_asc",  label: "Price: Low–High" },
//     { key: "price_desc", label: "Price: High–Low" },
//     { key: "featured",   label: "Featured"  },
//   ];

//   return (
//     <div style={{ fontFamily: F, background: "#F8F7F5", minHeight: "100vh", color: "#111827" }}>
//       <Navbar />

//       {/* ── Page Header ── */}
//       <div style={{ paddingTop: 72, background: "white", borderBottom: "1px solid #e5e7eb" }}>
//         <div style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 32px 22px" }}>
//           {pageType === "/search" ? (
//             <>
//               <form onSubmit={handleSearch} style={{ display: "flex", maxWidth: 540, marginBottom: 10 }}>
//                 <input value={searchInput} onChange={e => setSearchInput(e.target.value)}
//                   placeholder="Search sarees, fabric, occasion..."
//                   style={{ flex: 1, padding: "13px 18px", fontSize: 16, border: "2px solid #e5e7eb", borderRight: "none", outline: "none", fontFamily: F, borderRadius: "8px 0 0 8px", color: "#111827" }} />
//                 <button type="submit"
//                   style={{ padding: "13px 22px", background: RED, color: "white", border: "none", cursor: "pointer", fontSize: 15, fontWeight: 700, fontFamily: F, borderRadius: "0 8px 8px 0" }}>
//                   Search
//                 </button>
//               </form>
//               {searchParams.get("q") && (
//                 <p style={{ fontSize: 16, color: "#6b7280" }}>
//                   <strong style={{ color: "#111827" }}>{displayed.length}</strong> results for{" "}
//                   <strong style={{ color: RED }}>"{searchParams.get("q")}"</strong>
//                 </p>
//               )}
//             </>
//           ) : (
//             <>
//               <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: RED, marginBottom: 6 }}>
//                 Sri Aboorva Silks
//               </p>
//               <h1 style={{ fontSize: 34, fontWeight: 800, color: "#111827", marginBottom: 6, lineHeight: 1.15 }}>
//                 {config.title}
//               </h1>
//               {config.subtitle && (
//                 <p style={{ fontSize: 16, color: "#6b7280", fontWeight: 400 }}>{config.subtitle}</p>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       {/* ── Layout ── */}
//       <div style={{ display: "flex", maxWidth: 1400, margin: "0 auto" }}>

//         {/* ── Sidebar ── */}
//         <AnimatePresence initial={false}>
//           {sidebarOpen && (
//             <motion.aside
//               key="sidebar"
//               initial={{ width: 0, opacity: 0 }}
//               animate={{ width: 280, opacity: 1 }}
//               exit={{ width: 0, opacity: 0 }}
//               transition={{ duration: 0.22 }}
//               style={{ flexShrink: 0, background: "white", borderRight: "1px solid #e5e7eb", position: "sticky", top: 72, maxHeight: "calc(100vh - 72px)", overflowY: "auto", overflowX: "hidden" }}>
//               <div style={{ padding: "22px 18px", minWidth: 280 }}>
//                 <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
//                   <span style={{ fontSize: 15, fontWeight: 800, color: "#111827", letterSpacing: "0.03em", fontFamily: F }}>FILTERS</span>
//                   <button onClick={() => setFilters(DEFAULT_FILTERS)}
//                     style={{ fontSize: 13, color: RED, background: "none", border: "none", cursor: "pointer", fontWeight: 700, fontFamily: F }}>
//                     Reset All
//                   </button>
//                 </div>
//                 <SidebarFilter filters={filters} onChange={setFilters} categories={categories} />
//               </div>
//             </motion.aside>
//           )}
//         </AnimatePresence>

//         {/* ── Products area ── */}
//         <div style={{ flex: 1, padding: "20px 24px", minWidth: 0 }}>

//           {/* Toolbar */}
//           <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, padding: "12px 18px", background: "white", border: "1px solid #e5e7eb", borderRadius: 10, flexWrap: "wrap", gap: 12 }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//               <button onClick={() => setSidebarOpen(o => !o)}
//                 style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 16px", background: sidebarOpen ? "#f3f4f6" : "white", border: "1.5px solid #d1d5db", color: "#374151", cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: F, borderRadius: 7, transition: "all 0.15s" }}>
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
//                   <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="18" x2="10" y2="18"/>
//                 </svg>
//                 {sidebarOpen ? "Hide Filters" : "Show Filters"}
//               </button>
//               <span style={{ fontSize: 15, color: "#6b7280", fontWeight: 500, fontFamily: F }}>
//                 <strong style={{ color: "#111827", fontWeight: 700 }}>{displayed.length}</strong> products
//               </span>
//             </div>

//             {/* Sort */}
//             <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
//               <span style={{ fontSize: 14, color: "#6b7280", fontWeight: 600, fontFamily: F }}>Sort by:</span>
//               {SORT_OPTS.map(s => (
//                 <button key={s.key} onClick={() => setFilters(f => ({ ...f, sortBy: s.key }))}
//                   style={{ padding: "8px 14px", fontSize: 13, fontWeight: 600, fontFamily: F, background: filters.sortBy === s.key ? "#111827" : "white", color: filters.sortBy === s.key ? "white" : "#374151", border: `1.5px solid ${filters.sortBy === s.key ? "#111827" : "#d1d5db"}`, borderRadius: 7, cursor: "pointer", transition: "all 0.15s" }}>
//                   {s.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Grid */}
//           {loading ? (
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 18 }}>
//               {[...Array(8)].map((_, i) => (
//                 <div key={i} style={{ aspectRatio: "3/4", background: "#f3f4f6", borderRadius: 10, animation: "pulse 1.4s ease-in-out infinite" }} />
//               ))}
//             </div>
//           ) : displayed.length === 0 ? (
//             <div style={{ textAlign: "center", padding: "80px 20px", background: "white", border: "1px solid #e5e7eb", borderRadius: 10 }}>
//               <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1" style={{ display: "block", margin: "0 auto 18px" }}>
//                 <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
//               </svg>
//               <p style={{ fontSize: 22, fontWeight: 800, color: "#374151", marginBottom: 8, fontFamily: F }}>No products found</p>
//               <p style={{ fontSize: 16, color: "#9ca3af", marginBottom: 24, fontFamily: F }}>Try adjusting your filters</p>
//               <button onClick={() => setFilters(DEFAULT_FILTERS)}
//                 style={{ padding: "12px 28px", background: RED, color: "white", border: "none", cursor: "pointer", fontSize: 15, fontWeight: 700, fontFamily: F, borderRadius: 8 }}>
//                 Clear All Filters
//               </button>
//             </div>
//           ) : (
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(215px,1fr))", gap: 18 }}>
//               {displayed.map(p => <ProductCard key={p.id} product={p} />)}
//             </div>
//           )}
//         </div>
//       </div>

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//         @keyframes pulse { 0%,100% { opacity: 0.6; } 50% { opacity: 0.3; } }
//         aside::-webkit-scrollbar { width: 4px; }
//         aside::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 2px; }
//       `}</style>
//     </div>
//   );
// }




// import { useState, useEffect } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import Navbar from "../components/Navbar";
// import ProductCard from "../components/ProductCard";
// import SidebarFilter from "../components/SidebarFilter";
// import { productAPI } from "../api";

// const F   = "'Inter', system-ui, sans-serif";
// const RED = "#800000";

// const PAGE_CONFIG = {
//   "/women":        { title: "Women",        subtitle: "Sarees, Blouses & Ethnic Wear",      genderFilter: "Women",  showGenderFilter: false },
//   "/men":          { title: "Men",          subtitle: "Dhotis, Shirts & Traditional Wear",  genderFilter: "Men",    showGenderFilter: false },
//   "/kids":         { title: "Kids",         subtitle: "Festive & Casual Collections",        genderFilter: "Kids",   showGenderFilter: false },
//   "/new-arrivals": { title: "New Arrivals", subtitle: "Fresh off the loom — just in",       genderFilter: null,     showGenderFilter: true  },
//   "/search":       { title: "Search",       subtitle: "",                                    genderFilter: null,     showGenderFilter: true  },
//   "/products":     { title: "All Products", subtitle: "Our complete silk collection",        genderFilter: null,     showGenderFilter: true  },
// };

// const DEFAULT_FILTERS = {
//   minPrice: 0, maxPrice: 50000,
//   selectedCategories: [],
//   selectedColors: [],
//   selectedSizes: [],
//   selectedGenders: [],
//   inStockOnly: false,
//   discountMin: 0,
//   minRating: 0,
//   sortBy: "newest",
// };

// // ── Filter products client-side ─────────────────────────────────────────────
// function applyFilters(products, filters, pageGender) {
//   return products.filter(p => {
//     // Page-level gender lock (Women/Men/Kids pages)
//     if (pageGender) {
//       const catName = (p.category?.name || "").toLowerCase();
//       if (!catName.includes(pageGender.toLowerCase())) return false;
//     }
//     if (filters.inStockOnly && (p.stockQuantity || 0) === 0) return false;
//     if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
//     if (filters.selectedCategories.length > 0 && !filters.selectedCategories.includes(p.category?.name)) return false;
//     if (filters.selectedGenders.length > 0) {
//       const catName = (p.category?.name || "").toLowerCase();
//       if (!filters.selectedGenders.some(g => catName.includes(g.toLowerCase()))) return false;
//     }
//     if (filters.discountMin > 0) {
//       const disc = p.originalPrice && p.originalPrice > p.price
//         ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
//         : (p.discountPercent || 0);
//       if (disc < filters.discountMin) return false;
//     }
//     // Colour — match against structured colour field first, then name/description
//     if (filters.selectedColors.length > 0) {
//       const text = [p.colour, p.color, p.name, p.description].filter(Boolean).join(" ").toLowerCase();
//       if (!filters.selectedColors.some(c => text.includes(c.toLowerCase()))) return false;
//     }
//     // Size — match against structured size field first, then description
//     if (filters.selectedSizes.length > 0) {
//       const text = [p.size, p.sizes, p.description].filter(Boolean).join(" ").toLowerCase();
//       if (!filters.selectedSizes.some(s => text.includes(s.toLowerCase()))) return false;
//     }
//     return true;
//   });
// }

// function sortProducts(products, sortBy) {
//   const arr = [...products];
//   switch (sortBy) {
//     case "price_asc":  return arr.sort((a,b) => a.price - b.price);
//     case "price_desc": return arr.sort((a,b) => b.price - a.price);
//     case "featured":   return arr.sort((a,b) => (b.isFeatured?1:0) - (a.isFeatured?1:0));
//     default:           return arr.sort((a,b) => (b.id||0) - (a.id||0));
//   }
// }

// // ── Filter categories relevant to current page ──────────────────────────────
// function filterCategoriesForPage(categories, pageGender) {
//   if (!pageGender) return categories;
//   return categories.filter(cat =>
//     cat.name?.toLowerCase().includes(pageGender.toLowerCase()) ||
//     cat.gender?.toLowerCase() === pageGender.toLowerCase()
//   );
// }

// export default function ProductsPage({ pageType }) {
//   const [searchParams] = useSearchParams();
//   const navigate  = useNavigate();
//   const config    = PAGE_CONFIG[pageType] || PAGE_CONFIG["/products"];

//   const [allProducts, setAllProducts] = useState([]);
//   const [categories,  setCategories]  = useState([]);
//   const [loading,     setLoading]     = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [searchInput, setSearchInput] = useState(searchParams.get("q") || "");
//   const [filters,     setFilters]     = useState(DEFAULT_FILTERS);

//   useEffect(() => { fetchData(); window.scrollTo(0,0); }, [pageType, searchParams.get("q")]);
//   useEffect(() => { setSearchInput(searchParams.get("q") || ""); }, [searchParams]);
//   // Reset filters when page type changes
//   useEffect(() => { setFilters(DEFAULT_FILTERS); }, [pageType]);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [cats, prods] = await Promise.allSettled([
//         productAPI.getAllCategories(),
//         productAPI.getAllProducts({ size: 300 }),
//       ]);
//       if (cats.status === "fulfilled")  setCategories(cats.value || []);
//       if (prods.status === "fulfilled") {
//         let list = prods.value?.content || prods.value || [];
//         const q = searchParams.get("q");
//         if (q) {
//           const ql = q.toLowerCase();
//           list = list.filter(p =>
//             p.name?.toLowerCase().includes(ql) ||
//             p.description?.toLowerCase().includes(ql) ||
//             p.category?.name?.toLowerCase().includes(ql)
//           );
//         }
//         setAllProducts(list);
//       }
//     } catch(e) { console.error(e); }
//     finally { setLoading(false); }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchInput.trim()) navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
//   };

//   const relevantCategories = filterCategoriesForPage(categories, config.genderFilter);
//   const displayed = sortProducts(applyFilters(allProducts, filters, config.genderFilter), filters.sortBy);

//   const SORT_OPTS = [
//     { key:"newest",     label:"Newest"         },
//     { key:"price_asc",  label:"Price: Low–High" },
//     { key:"price_desc", label:"Price: High–Low" },
//     { key:"featured",   label:"Featured"        },
//   ];

//   return (
//     <div style={{ fontFamily:F, background:"#F8F7F5", minHeight:"100vh", color:"#111827" }}>
//       <Navbar />

//       {/* ── Header ── */}
//       <div style={{ paddingTop:72, background:"white", borderBottom:"1px solid #e5e7eb" }}>
//         <div style={{ maxWidth:1400, margin:"0 auto", padding:"28px 32px 22px" }}>
//           {pageType === "/search" ? (
//             <>
//               <form onSubmit={handleSearch} style={{ display:"flex", maxWidth:540, marginBottom:10 }}>
//                 <input value={searchInput} onChange={e=>setSearchInput(e.target.value)}
//                   placeholder="Search sarees, fabric, occasion..."
//                   style={{ flex:1, padding:"13px 18px", fontSize:16, border:"2px solid #e5e7eb", borderRight:"none", outline:"none", fontFamily:F, borderRadius:"8px 0 0 8px", color:"#111827" }}/>
//                 <button type="submit" style={{ padding:"13px 22px", background:RED, color:"white", border:"none", cursor:"pointer", fontSize:15, fontWeight:700, fontFamily:F, borderRadius:"0 8px 8px 0" }}>Search</button>
//               </form>
//               {searchParams.get("q") && (
//                 <p style={{ fontSize:16, color:"#6b7280", fontFamily:F }}>
//                   <strong style={{ color:"#111827" }}>{displayed.length}</strong> results for{" "}
//                   <strong style={{ color:RED }}>"{searchParams.get("q")}"</strong>
//                 </p>
//               )}
//             </>
//           ) : (
//             <>
//               <p style={{ fontSize:12, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:RED, marginBottom:6, fontFamily:F }}>Sri Aboorva Silks</p>
//               <h1 style={{ fontSize:34, fontWeight:800, color:"#111827", marginBottom:6, lineHeight:1.15, fontFamily:F }}>{config.title}</h1>
//               {config.subtitle && <p style={{ fontSize:16, color:"#6b7280", fontFamily:F }}>{config.subtitle}</p>}
//             </>
//           )}
//         </div>
//       </div>

//       {/* ── Layout ── */}
//       <div style={{ display:"flex", maxWidth:1400, margin:"0 auto" }}>

//         {/* Sidebar */}
//         <AnimatePresence initial={false}>
//           {sidebarOpen && (
//             <motion.aside key="sidebar"
//               initial={{ width:0, opacity:0 }} animate={{ width:284, opacity:1 }} exit={{ width:0, opacity:0 }}
//               transition={{ duration:0.22 }}
//               style={{ flexShrink:0, background:"white", borderRight:"1px solid #e5e7eb", position:"sticky", top:72, maxHeight:"calc(100vh - 72px)", overflowY:"auto", overflowX:"hidden" }}>
//               <div style={{ padding:"22px 18px", minWidth:284 }}>
//                 <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18 }}>
//                   <span style={{ fontSize:15, fontWeight:800, color:"#111827", fontFamily:F }}>FILTERS</span>
//                   <button onClick={()=>setFilters(DEFAULT_FILTERS)}
//                     style={{ fontSize:13, color:RED, background:"none", border:"none", cursor:"pointer", fontWeight:700, fontFamily:F }}>Reset All</button>
//                 </div>
//                 <SidebarFilter
//                   filters={filters}
//                   onChange={setFilters}
//                   categories={relevantCategories}
//                   showGenderFilter={config.showGenderFilter}
//                 />
//               </div>
//             </motion.aside>
//           )}
//         </AnimatePresence>

//         {/* Products */}
//         <div style={{ flex:1, padding:"20px 24px", minWidth:0 }}>
//           {/* Toolbar */}
//           <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, padding:"12px 18px", background:"white", border:"1px solid #e5e7eb", borderRadius:10, flexWrap:"wrap", gap:12 }}>
//             <div style={{ display:"flex", alignItems:"center", gap:12 }}>
//               <button onClick={()=>setSidebarOpen(o=>!o)}
//                 style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 16px", background:sidebarOpen?"#f3f4f6":"white", border:"1.5px solid #d1d5db", color:"#374151", cursor:"pointer", fontSize:14, fontWeight:600, fontFamily:F, borderRadius:7, transition:"all 0.15s" }}>
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="18" x2="10" y2="18"/></svg>
//                 {sidebarOpen ? "Hide Filters" : "Show Filters"}
//               </button>
//               <span style={{ fontSize:15, color:"#6b7280", fontWeight:500, fontFamily:F }}>
//                 <strong style={{ color:"#111827", fontWeight:700 }}>{displayed.length}</strong> products
//               </span>
//             </div>
//             <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
//               <span style={{ fontSize:14, color:"#6b7280", fontWeight:600, fontFamily:F }}>Sort by:</span>
//               {SORT_OPTS.map(s => (
//                 <button key={s.key} onClick={()=>setFilters(f=>({...f,sortBy:s.key}))}
//                   style={{ padding:"8px 14px", fontSize:13, fontWeight:600, fontFamily:F, background:filters.sortBy===s.key?"#111827":"white", color:filters.sortBy===s.key?"white":"#374151", border:`1.5px solid ${filters.sortBy===s.key?"#111827":"#d1d5db"}`, borderRadius:7, cursor:"pointer", transition:"all 0.15s" }}>
//                   {s.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Grid */}
//           {loading ? (
//             <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:18 }}>
//               {[...Array(8)].map((_,i) => <div key={i} style={{ aspectRatio:"3/4", background:"#f3f4f6", borderRadius:10, animation:"pulse 1.4s ease-in-out infinite" }} />)}
//             </div>
//           ) : displayed.length === 0 ? (
//             <div style={{ textAlign:"center", padding:"80px 20px", background:"white", border:"1px solid #e5e7eb", borderRadius:10 }}>
//               <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1" style={{ display:"block", margin:"0 auto 18px" }}>
//                 <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
//               </svg>
//               <p style={{ fontSize:22, fontWeight:800, color:"#374151", marginBottom:8, fontFamily:F }}>No products found</p>
//               <p style={{ fontSize:16, color:"#9ca3af", marginBottom:24, fontFamily:F }}>Try adjusting your filters</p>
//               <button onClick={()=>setFilters(DEFAULT_FILTERS)}
//                 style={{ padding:"12px 28px", background:RED, color:"white", border:"none", cursor:"pointer", fontSize:15, fontWeight:700, fontFamily:F, borderRadius:8 }}>
//                 Clear All Filters
//               </button>
//             </div>
//           ) : (
//             <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(215px,1fr))", gap:18 }}>
//               {displayed.map(p => <ProductCard key={p.id} product={p} />)}
//             </div>
//           )}
//         </div>
//       </div>

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
//         *,*::before,*::after { box-sizing:border-box; }
//         @keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:0.3} }
//         aside::-webkit-scrollbar { width:4px; }
//         aside::-webkit-scrollbar-thumb { background:#d1d5db; border-radius:2px; }
//       `}</style>
//     </div>
//   );
// }




import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import SidebarFilter from "../components/SidebarFilter";
import { productAPI } from "../api";

const F   = "'Inter', system-ui, sans-serif";
const RED = "#800000";

const PAGE_CONFIG = {
  "/women":        { title: "Women",        subtitle: "Sarees, Blouses & Ethnic Wear",      genderFilter: "Women",  showGenderFilter: false },
  "/men":          { title: "Men",          subtitle: "Dhotis, Shirts & Traditional Wear",  genderFilter: "Men",    showGenderFilter: false },
  "/kids":         { title: "Kids",         subtitle: "Festive & Casual Collections",        genderFilter: "Kids",   showGenderFilter: false },
  "/new-arrivals": { title: "New Arrivals", subtitle: "Fresh off the loom — just in",       genderFilter: null,     showGenderFilter: true  },
  "/search":       { title: "Search",       subtitle: "",                                    genderFilter: null,     showGenderFilter: true  },
  "/products":     { title: "All Products", subtitle: "Our complete silk collection",        genderFilter: null,     showGenderFilter: true  },
};

const DEFAULT_FILTERS = {
  minPrice: 0, maxPrice: 50000,
  selectedCategories: [],
  selectedColors: [],
  selectedSizes: [],
  selectedGenders: [],
  inStockOnly: false,
  discountMin: 0,
  minRating: 0,
  sortBy: "newest",
};

// ── Filter products client-side ─────────────────────────────────────────────
function applyFilters(products, filters, pageGender) {
  return products.filter(p => {
    // ✅ FIX: Use the gender FIELD directly instead of category name
    if (pageGender && p.gender !== pageGender) return false;
    
    if (filters.inStockOnly && (p.stockQuantity || 0) === 0) return false;
    if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
    if (filters.selectedCategories.length > 0 && !filters.selectedCategories.includes(p.category?.name)) return false;
    
    // Gender filter (for pages where gender filter is shown)
    if (filters.selectedGenders.length > 0 && !filters.selectedGenders.includes(p.gender)) return false;
    
    if (filters.discountMin > 0) {
      const disc = p.originalPrice && p.originalPrice > p.price
        ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
        : (p.discountPercent || 0);
      if (disc < filters.discountMin) return false;
    }
    
    // Colour — match against structured colour field first, then name/description
    if (filters.selectedColors.length > 0) {
      const colours = (p.colours || "").split(",").map(c => c.trim().toLowerCase());
      const text = [p.name, p.description].filter(Boolean).join(" ").toLowerCase();
      if (!filters.selectedColors.some(c => colours.includes(c.toLowerCase()) || text.includes(c.toLowerCase()))) {
        return false;
      }
    }
    
    // Size — match against structured size field first, then description
    if (filters.selectedSizes.length > 0) {
      const sizes = (p.sizes || "").split(",").map(s => s.trim().toLowerCase());
      const text = [p.description].filter(Boolean).join(" ").toLowerCase();
      if (!filters.selectedSizes.some(s => sizes.includes(s.toLowerCase()) || text.includes(s.toLowerCase()))) {
        return false;
      }
    }
    
    return true;
  });
}

function sortProducts(products, sortBy) {
  const arr = [...products];
  switch (sortBy) {
    case "price_asc":  return arr.sort((a,b) => a.price - b.price);
    case "price_desc": return arr.sort((a,b) => b.price - a.price);
    case "featured":   return arr.sort((a,b) => (b.isFeatured?1:0) - (a.isFeatured?1:0));
    default:           return arr.sort((a,b) => (b.id||0) - (a.id||0));
  }
}

// ── Filter categories relevant to current page ──────────────────────────────
function filterCategoriesForPage(categories, pageGender) {
  if (!pageGender) return categories;
  return categories.filter(cat =>
    cat.name?.toLowerCase().includes(pageGender.toLowerCase()) ||
    cat.gender?.toLowerCase() === pageGender.toLowerCase()
  );
}

export default function ProductsPage({ pageType }) {
  const [searchParams] = useSearchParams();
  const navigate  = useNavigate();
  const config    = PAGE_CONFIG[pageType] || PAGE_CONFIG["/products"];

  const [allProducts, setAllProducts] = useState([]);
  const [categories,  setCategories]  = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchInput, setSearchInput] = useState(searchParams.get("q") || "");
  const [filters,     setFilters]     = useState(DEFAULT_FILTERS);

  useEffect(() => { fetchData(); window.scrollTo(0,0); }, [pageType, searchParams.get("q")]);
  useEffect(() => { setSearchInput(searchParams.get("q") || ""); }, [searchParams]);
  // Reset filters when page type changes
  useEffect(() => { setFilters(DEFAULT_FILTERS); }, [pageType]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [cats, prods] = await Promise.allSettled([
        productAPI.getAllCategories(),
        productAPI.getAllProducts({ size: 300 }),
      ]);
      if (cats.status === "fulfilled")  setCategories(cats.value || []);
      if (prods.status === "fulfilled") {
        let list = prods.value?.content || prods.value || [];
        const q = searchParams.get("q");
        if (q) {
          const ql = q.toLowerCase();
          list = list.filter(p =>
            p.name?.toLowerCase().includes(ql) ||
            p.description?.toLowerCase().includes(ql) ||
            p.category?.name?.toLowerCase().includes(ql)
          );
        }
        setAllProducts(list);
      }
    } catch(e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
  };

  const relevantCategories = filterCategoriesForPage(categories, config.genderFilter);
  const displayed = sortProducts(applyFilters(allProducts, filters, config.genderFilter), filters.sortBy);

  const SORT_OPTS = [
    { key:"newest",     label:"Newest"         },
    { key:"price_asc",  label:"Price: Low–High" },
    { key:"price_desc", label:"Price: High–Low" },
    { key:"featured",   label:"Featured"        },
  ];

  return (
    <div style={{ fontFamily:F, background:"#F8F7F5", minHeight:"100vh", color:"#111827" }}>
      <Navbar />

      {/* ── Header ── */}
      <div style={{ paddingTop:72, background:"white", borderBottom:"1px solid #e5e7eb" }}>
        <div style={{ maxWidth:1400, margin:"0 auto", padding:"28px 32px 22px" }}>
          {pageType === "/search" ? (
            <>
              <form onSubmit={handleSearch} style={{ display:"flex", maxWidth:540, marginBottom:10 }}>
                <input value={searchInput} onChange={e=>setSearchInput(e.target.value)}
                  placeholder="Search sarees, fabric, occasion..."
                  style={{ flex:1, padding:"13px 18px", fontSize:16, border:"2px solid #e5e7eb", borderRight:"none", outline:"none", fontFamily:F, borderRadius:"8px 0 0 8px", color:"#111827" }}/>
                <button type="submit" style={{ padding:"13px 22px", background:RED, color:"white", border:"none", cursor:"pointer", fontSize:15, fontWeight:700, fontFamily:F, borderRadius:"0 8px 8px 0" }}>Search</button>
              </form>
              {searchParams.get("q") && (
                <p style={{ fontSize:16, color:"#6b7280", fontFamily:F }}>
                  <strong style={{ color:"#111827" }}>{displayed.length}</strong> results for{" "}
                  <strong style={{ color:RED }}>"{searchParams.get("q")}"</strong>
                </p>
              )}
            </>
          ) : (
            <>
              <p style={{ fontSize:12, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:RED, marginBottom:6, fontFamily:F }}>Sri Aboorva Silks</p>
              <h1 style={{ fontSize:34, fontWeight:800, color:"#111827", marginBottom:6, lineHeight:1.15, fontFamily:F }}>{config.title}</h1>
              {config.subtitle && <p style={{ fontSize:16, color:"#6b7280", fontFamily:F }}>{config.subtitle}</p>}
            </>
          )}
        </div>
      </div>

      {/* ── Layout ── */}
      <div style={{ display:"flex", maxWidth:1400, margin:"0 auto" }}>

        {/* Sidebar */}
        <AnimatePresence initial={false}>
          {sidebarOpen && (
            <motion.aside key="sidebar"
              initial={{ width:0, opacity:0 }} animate={{ width:284, opacity:1 }} exit={{ width:0, opacity:0 }}
              transition={{ duration:0.22 }}
              style={{ flexShrink:0, background:"white", borderRight:"1px solid #e5e7eb", position:"sticky", top:72, maxHeight:"calc(100vh - 72px)", overflowY:"auto", overflowX:"hidden" }}>
              <div style={{ padding:"22px 18px", minWidth:284 }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18 }}>
                  <span style={{ fontSize:15, fontWeight:800, color:"#111827", fontFamily:F }}>FILTERS</span>
                  <button onClick={()=>setFilters(DEFAULT_FILTERS)}
                    style={{ fontSize:13, color:RED, background:"none", border:"none", cursor:"pointer", fontWeight:700, fontFamily:F }}>Reset All</button>
                </div>
                <SidebarFilter
                  filters={filters}
                  onChange={setFilters}
                  categories={relevantCategories}
                  showGenderFilter={config.showGenderFilter}
                />
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Products */}
        <div style={{ flex:1, padding:"20px 24px", minWidth:0 }}>
          {/* Toolbar */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, padding:"12px 18px", background:"white", border:"1px solid #e5e7eb", borderRadius:10, flexWrap:"wrap", gap:12 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <button onClick={()=>setSidebarOpen(o=>!o)}
                style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 16px", background:sidebarOpen?"#f3f4f6":"white", border:"1.5px solid #d1d5db", color:"#374151", cursor:"pointer", fontSize:14, fontWeight:600, fontFamily:F, borderRadius:7, transition:"all 0.15s" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="18" x2="10" y2="18"/></svg>
                {sidebarOpen ? "Hide Filters" : "Show Filters"}
              </button>
              <span style={{ fontSize:15, color:"#6b7280", fontWeight:500, fontFamily:F }}>
                <strong style={{ color:"#111827", fontWeight:700 }}>{displayed.length}</strong> products
              </span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
              <span style={{ fontSize:14, color:"#6b7280", fontWeight:600, fontFamily:F }}>Sort by:</span>
              {SORT_OPTS.map(s => (
                <button key={s.key} onClick={()=>setFilters(f=>({...f,sortBy:s.key}))}
                  style={{ padding:"8px 14px", fontSize:13, fontWeight:600, fontFamily:F, background:filters.sortBy===s.key?"#111827":"white", color:filters.sortBy===s.key?"white":"#374151", border:`1.5px solid ${filters.sortBy===s.key?"#111827":"#d1d5db"}`, borderRadius:7, cursor:"pointer", transition:"all 0.15s" }}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:18 }}>
              {[...Array(8)].map((_,i) => <div key={i} style={{ aspectRatio:"3/4", background:"#f3f4f6", borderRadius:10, animation:"pulse 1.4s ease-in-out infinite" }} />)}
            </div>
          ) : displayed.length === 0 ? (
            <div style={{ textAlign:"center", padding:"80px 20px", background:"white", border:"1px solid #e5e7eb", borderRadius:10 }}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1" style={{ display:"block", margin:"0 auto 18px" }}>
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <p style={{ fontSize:22, fontWeight:800, color:"#374151", marginBottom:8, fontFamily:F }}>No products found</p>
              <p style={{ fontSize:16, color:"#9ca3af", marginBottom:24, fontFamily:F }}>Try adjusting your filters or add products with the correct gender</p>
              <button onClick={()=>setFilters(DEFAULT_FILTERS)}
                style={{ padding:"12px 28px", background:RED, color:"white", border:"none", cursor:"pointer", fontSize:15, fontWeight:700, fontFamily:F, borderRadius:8 }}>
                Clear All Filters
              </button>
            </div>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(215px,1fr))", gap:18 }}>
              {displayed.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *,*::before,*::after { box-sizing:border-box; }
        @keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:0.3} }
        aside::-webkit-scrollbar { width:4px; }
        aside::-webkit-scrollbar-thumb { background:#d1d5db; border-radius:2px; }
      `}</style>
    </div>
  );
}