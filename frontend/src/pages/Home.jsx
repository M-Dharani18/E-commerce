
// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { productAPI } from "../api";

// const PlaceholderImage = ({ text }) => (
//   <div className="w-full h-full flex items-center justify-center"
//     style={{ background: "linear-gradient(135deg, #1A1A2E 0%, #2d2d4e 100%)" }}>
//     <div className="text-center p-4">
//       <div className="w-12 h-12 mx-auto mb-2 opacity-30"
//         style={{ background: "#D4AF37", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
//       <p className="text-xs tracking-widest uppercase opacity-40" style={{ color: "#D4AF37" }}>{text}</p>
//     </div>
//   </div>
// );

// export default function Home() {
//   const [categories, setCategories] = useState([]);
//   const [featuredProducts, setFeaturedProducts] = useState([]);
//   const [newArrivals, setNewArrivals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const isLoggedIn = !!localStorage.getItem("token");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [cats, featured, products] = await Promise.allSettled([
//           productAPI.getAllCategories(),
//           productAPI.getFeaturedProducts(),
//           productAPI.getAllProducts({ sort: "newest", limit: 8 }),
//         ]);
//         if (cats.status === "fulfilled") setCategories(cats.value);
//         if (featured.status === "fulfilled") setFeaturedProducts(featured.value);
//         if (products.status === "fulfilled") setNewArrivals(products.value?.content || products.value || []);
//       } catch (err) {
//         console.error("Failed to load home data", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleProtectedAction = (action) => {
//     if (!isLoggedIn) {
//       navigate("/login", { state: { from: window.location.pathname } });
//     } else {
//       action();
//     }
//   };

//   const fadeUp = {
//     initial: { opacity: 0, y: 30 },
//     whileInView: { opacity: 1, y: 0 },
//     viewport: { once: true },
//     transition: { duration: 0.6 }
//   };

//   // Shop by audience cards
//   const shopBySection = [
//     {
//       label: "Women",
//       sub: "Sarees · Kurtis · Shawls · Dress Materials",
//       link: "/products?gender=women",
//       icon: "♀",
//     },
//     {
//       label: "Men",
//       sub: "Shirts · Pants · Ethnic Wear · Fabrics",
//       link: "/products?gender=men",
//       icon: "♂",
//     },
//     {
//       label: "Kids",
//       sub: "Boys · Girls · Festive · Casual",
//       link: "/products?gender=kids",
//       icon: "✦",
//     },
//   ];

//   return (
//     <div style={{ fontFamily: "'Cormorant Garamond', serif", background: "#FFFFF0", minHeight: "100vh" }}>
//       <Navbar />

//       {/* ── HERO ── */}
//       <section className="relative min-h-screen flex items-center overflow-hidden"
//         style={{ background: "#1A1A2E", paddingTop: "80px" }}>

//         {/* Background grid */}
//         <div className="absolute inset-0 opacity-5"
//           style={{
//             backgroundImage: `repeating-linear-gradient(45deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 50%)`,
//             backgroundSize: "40px 40px"
//           }}
//         />
//         <div className="absolute inset-0"
//           style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(212,175,55,0.1) 0%, transparent 70%)" }}
//         />
//         <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5 translate-x-1/2"
//           style={{ border: "60px solid #D4AF37" }}
//         />

//         <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">

//             {/* Left text */}
//             <div>
//               <motion.p
//                 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
//                 className="text-xs tracking-[0.5em] uppercase mb-4"
//                 style={{ color: "#D4AF37" }}
//               >
//                 Heritage · Craftsmanship · Elegance
//               </motion.p>

//               <motion.h1
//                 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
//                 className="text-5xl lg:text-7xl font-bold leading-tight mb-6"
//                 style={{ color: "#FFFFF0" }}
//               >
//                 Fashion for<br />
//                 <span style={{ color: "#D4AF37" }}>Every Occasion,</span><br />
//                 Every Soul
//               </motion.h1>

//               <motion.div
//                 initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 0.5 }}
//                 className="w-20 h-px mb-6"
//                 style={{ background: "#D4AF37", transformOrigin: "left" }}
//               />

//               <motion.p
//                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
//                 className="text-lg leading-relaxed mb-10 max-w-md"
//                 style={{ color: "rgba(255,255,240,0.65)" }}
//               >
//                 From exquisite silk sarees to everyday kurtis, children's festive wear to men's ethnic collections — 
//                 everything your family needs, curated with care.
//               </motion.p>

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
//                 className="flex flex-wrap gap-4"
//               >
//                 <Link to="/products"
//                   className="px-8 py-4 text-sm tracking-[0.3em] uppercase font-semibold transition-all"
//                   style={{ background: "#800000", color: "#FFFFF0" }}
//                   onMouseEnter={e => e.currentTarget.style.background = "#900000"}
//                   onMouseLeave={e => e.currentTarget.style.background = "#800000"}
//                 >
//                   Shop All
//                 </Link>
//                 <Link to="/products?sort=newest"
//                   className="px-8 py-4 text-sm tracking-[0.3em] uppercase font-semibold transition-all"
//                   style={{ border: "1px solid rgba(212,175,55,0.5)", color: "#D4AF37" }}
//                   onMouseEnter={e => { e.currentTarget.style.background = "rgba(212,175,55,0.08)"; }}
//                   onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
//                 >
//                   New Arrivals
//                 </Link>
//               </motion.div>
//             </div>

//             {/* Right — stat cards */}
//             <motion.div
//               initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
//               className="hidden lg:grid grid-cols-2 gap-4"
//             >
//               {[
//                 { number: "1000+", label: "Products Available" },
//                 { number: "25+", label: "Years of Heritage" },
//                 { number: "10K+", label: "Happy Customers" },
//                 { number: "6+", label: "Categories" },
//               ].map((stat, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.7 + i * 0.1 }}
//                   className="p-6 text-center"
//                   style={{
//                     border: "1px solid rgba(212,175,55,0.15)",
//                     background: "rgba(212,175,55,0.04)"
//                   }}
//                 >
//                   <div className="text-3xl font-bold mb-1" style={{ color: "#D4AF37" }}>{stat.number}</div>
//                   <div className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,240,0.5)" }}>{stat.label}</div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>
//         </div>

//         {/* Scroll indicator */}
//         <motion.div
//           initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
//           className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
//         >
//           <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "rgba(212,175,55,0.5)" }}>Scroll</span>
//           <motion.div
//             animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
//             className="w-px h-8" style={{ background: "linear-gradient(to bottom, #D4AF37, transparent)" }}
//           />
//         </motion.div>
//       </section>

//       {/* ── SHOP BY AUDIENCE ── */}
//       <section className="py-20 px-6" style={{ background: "#1A1A2E" }}>
//         <div className="max-w-7xl mx-auto">
//           <motion.div {...fadeUp} className="text-center mb-12">
//             <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#D4AF37" }}>Shop For</p>
//             <h2 className="text-4xl font-bold" style={{ color: "#FFFFF0" }}>Everyone in the Family</h2>
//             <div className="w-16 h-px mx-auto mt-4" style={{ background: "#D4AF37" }} />
//           </motion.div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {shopBySection.map((item, i) => (
//               <motion.div
//                 key={item.label}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.15 }}
//               >
//                 <Link to={item.link}
//                   className="block p-10 text-center group transition-all duration-300 relative overflow-hidden"
//                   style={{ border: "1px solid rgba(212,175,55,0.15)", background: "rgba(212,175,55,0.03)" }}
//                   onMouseEnter={e => e.currentTarget.style.background = "rgba(212,175,55,0.08)"}
//                   onMouseLeave={e => e.currentTarget.style.background = "rgba(212,175,55,0.03)"}
//                 >
//                   <div className="text-4xl mb-4" style={{ color: "rgba(212,175,55,0.4)" }}>{item.icon}</div>
//                   <h3 className="text-3xl font-bold mb-3 tracking-wide" style={{ color: "#FFFFF0" }}>{item.label}</h3>
//                   <p className="text-sm mb-6" style={{ color: "rgba(212,175,55,0.6)" }}>{item.sub}</p>
//                   <span className="text-xs tracking-[0.3em] uppercase flex items-center justify-center gap-2 transition-all duration-300 group-hover:gap-4"
//                     style={{ color: "#D4AF37" }}>
//                     Shop Now
//                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <path d="M5 12h14M12 5l7 7-7 7" />
//                     </svg>
//                   </span>
//                   {/* bottom gold line on hover */}
//                   <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
//                     style={{ background: "#D4AF37" }} />
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── MARQUEE STRIP ── */}
//       <div className="py-4 overflow-hidden" style={{ background: "#800000" }}>
//         <motion.div
//           animate={{ x: ["0%", "-50%"] }}
//           transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
//           className="flex gap-12 whitespace-nowrap"
//         >
//           {[...Array(8)].map((_, i) => (
//             <span key={i} className="flex items-center gap-6 text-xs tracking-[0.4em] uppercase"
//               style={{ color: "rgba(255,255,240,0.8)" }}>
//               Silk Sarees
//               <span style={{ color: "rgba(255,255,240,0.4)" }}>◆</span>
//               Kurtis & Sets
//               <span style={{ color: "rgba(255,255,240,0.4)" }}>◆</span>
//               Shawls & Dupattas
//               <span style={{ color: "rgba(255,255,240,0.4)" }}>◆</span>
//               Men's Wear
//               <span style={{ color: "rgba(255,255,240,0.4)" }}>◆</span>
//               Children's Collection
//               <span style={{ color: "rgba(255,255,240,0.4)" }}>◆</span>
//               Dress Materials
//               <span style={{ color: "rgba(255,255,240,0.4)" }}>◆</span>
//             </span>
//           ))}
//         </motion.div>
//       </div>

//       {/* ── COLLECTIONS — Editorial Bento Layout ── */}
//       <section className="py-24 px-6" style={{ background: "#1A1A2E" }}>
//         <div className="max-w-7xl mx-auto">
//           <motion.div {...fadeUp} className="flex items-end justify-between mb-12">
//             <div>
//               <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#D4AF37" }}>Browse By</p>
//               <h2 className="text-4xl lg:text-5xl font-bold" style={{ color: "#FFFFF0" }}>Our Collections</h2>
//             </div>
//             <Link to="/products" className="hidden lg:flex items-center gap-2 text-sm tracking-widest uppercase"
//               style={{ color: "rgba(212,175,55,0.6)" }}>
//               All Categories
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M5 12h14M12 5l7 7-7 7" />
//               </svg>
//             </Link>
//           </motion.div>

//           {loading ? (
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
//               {[...Array(4)].map((_, i) => (
//                 <div key={i} className="animate-pulse"
//                   style={{ height: i === 0 ? "480px" : "220px", background: "rgba(212,175,55,0.06)" }} />
//               ))}
//             </div>
//           ) : categories.length > 0 ? (
//             /* Bento grid: first item tall, rest split */
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-3" style={{ gridAutoRows: "220px" }}>
//               {categories.map((cat, i) => (
//                 <motion.div
//                   key={cat.id}
//                   className={i === 0 ? "row-span-2" : ""}
//                   initial={{ opacity: 0, scale: 0.97 }}
//                   whileInView={{ opacity: 1, scale: 1 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: i * 0.08, duration: 0.5 }}
//                 >
//                   <Link to={`/products?category=${cat.id}`}
//                     className="block relative overflow-hidden group w-full h-full"
//                     style={{ height: "100%" }}
//                   >
//                     {/* Image or placeholder */}
//                     <div className="w-full h-full">
//                       {cat.imageUrl ? (
//                         <img src={cat.imageUrl} alt={cat.name}
//                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center"
//                           style={{ background: `hsl(${220 + i * 15}, 25%, ${14 + i * 3}%)` }}>
//                           <div className="text-center">
//                             <div className="w-10 h-10 mx-auto mb-2 opacity-20"
//                               style={{ background: "#D4AF37", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     {/* Gradient overlay — stronger at bottom */}
//                     <div className="absolute inset-0"
//                       style={{ background: "linear-gradient(to top, rgba(10,10,20,0.92) 0%, rgba(10,10,20,0.3) 50%, transparent 100%)" }} />

//                     {/* Category number */}
//                     <div className="absolute top-4 right-4 text-xs font-bold tracking-widest opacity-40"
//                       style={{ color: "#D4AF37" }}>
//                       {String(i + 1).padStart(2, "0")}
//                     </div>

//                     {/* Label */}
//                     <div className="absolute bottom-0 left-0 right-0 p-5">
//                       <h3 className={`font-bold mb-2 tracking-wide ${i === 0 ? "text-2xl" : "text-base"}`}
//                         style={{ color: "#FFFFF0" }}>
//                         {cat.name}
//                       </h3>
//                       {/* Animated underline */}
//                       <div className="h-px w-0 group-hover:w-full transition-all duration-500"
//                         style={{ background: "#D4AF37" }} />
//                     </div>

//                     {/* Hover crimson tint */}
//                     <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-400"
//                       style={{ background: "#800000" }} />
//                   </Link>
//                 </motion.div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-20">
//               <div className="w-16 h-16 mx-auto mb-4 opacity-20"
//                 style={{ background: "#D4AF37", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
//               <p className="text-lg mb-2" style={{ color: "rgba(255,255,240,0.5)" }}>No categories yet</p>
//               <p className="text-sm" style={{ color: "rgba(255,255,240,0.3)" }}>
//                 Categories added by admin will appear here
//               </p>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* ── FEATURED PRODUCTS — Light cream, large cards with price prominent ── */}
//       <section className="py-24 px-6" style={{ background: "#FFFFF0" }}>
//         <div className="max-w-7xl mx-auto">

//           {/* Section header — left-aligned with large decorative text */}
//           <motion.div {...fadeUp} className="relative mb-16 overflow-hidden">
//             <div className="absolute -top-4 left-0 text-8xl lg:text-9xl font-bold select-none pointer-events-none"
//               style={{ color: "rgba(26,26,46,0.04)", lineHeight: 1, fontFamily: "serif" }}>
//               PICKS
//             </div>
//             <div className="relative z-10 flex items-end justify-between">
//               <div>
//                 <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#800000" }}>★ Curated For You</p>
//                 <h2 className="text-4xl lg:text-5xl font-bold" style={{ color: "#1A1A2E" }}>Featured Pieces</h2>
//                 <div className="w-12 h-0.5 mt-4" style={{ background: "#800000" }} />
//               </div>
//               <Link to="/products"
//                 className="hidden lg:inline-flex items-center gap-2 px-6 py-3 text-xs tracking-[0.3em] uppercase font-semibold transition-all"
//                 style={{ background: "#1A1A2E", color: "#D4AF37" }}
//                 onMouseEnter={e => e.currentTarget.style.background = "#800000"}
//                 onMouseLeave={e => e.currentTarget.style.background = "#1A1A2E"}
//               >
//                 View All
//                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M5 12h14M12 5l7 7-7 7" />
//                 </svg>
//               </Link>
//             </div>
//           </motion.div>

//           {loading ? (
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//               {[...Array(4)].map((_, i) => (
//                 <div key={i} className="animate-pulse">
//                   <div className="aspect-[3/4] mb-3" style={{ background: "rgba(26,26,46,0.06)" }} />
//                   <div className="h-4 mb-2 w-3/4" style={{ background: "rgba(26,26,46,0.06)" }} />
//                   <div className="h-3 w-1/2" style={{ background: "rgba(26,26,46,0.06)" }} />
//                 </div>
//               ))}
//             </div>
//           ) : featuredProducts.length > 0 ? (
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
//               {featuredProducts.slice(0, 8).map((product, i) => (
//                 <ProductCard key={product.id} product={product} index={i}
//                   onProtectedAction={handleProtectedAction} />
//               ))}
//             </div>
//           ) : (
//             <EmptyProductState message="Featured products added by admin will appear here" />
//           )}
//         </div>
//       </section>

//       {/* ── WHY CHOOSE US BANNER ── */}
//       <motion.section {...fadeUp}
//         className="relative py-24 px-6 overflow-hidden"
//         style={{ background: "#1A1A2E" }}
//       >
//         <div className="absolute inset-0 opacity-5"
//           style={{
//             backgroundImage: `repeating-linear-gradient(-45deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 50%)`,
//             backgroundSize: "40px 40px"
//           }}
//         />
//         <div className="relative z-10 max-w-5xl mx-auto">
//           <div className="text-center mb-16">
//             <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: "#D4AF37" }}>Why Shop With Us</p>
//             <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: "#FFFFF0" }}>
//               Sri Aboorva Silks —<br />
//               <span style={{ color: "#D4AF37" }}>Your Family's Wardrobe</span>
//             </h2>
//             <div className="w-16 h-px mx-auto" style={{ background: "#D4AF37" }} />
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: "◈",
//                 title: "All Under One Roof",
//                 desc: "Sarees, kurtis, shawls, men's wear, children's clothes, dress materials — everything for the whole family."
//               },
//               {
//                 icon: "◇",
//                 title: "Authentic Quality",
//                 desc: "Every piece is handpicked for quality. From everyday cottons to festive silks, we never compromise."
//               },
//               {
//                 icon: "◉",
//                 title: "25+ Years of Trust",
//                 desc: "Serving thousands of families across the region with honest pricing and genuine craftsmanship."
//               }
//             ].map((item, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.15 }}
//                 className="text-center p-8"
//                 style={{ border: "1px solid rgba(212,175,55,0.12)", background: "rgba(212,175,55,0.03)" }}
//               >
//                 <div className="text-3xl mb-4" style={{ color: "#D4AF37" }}>{item.icon}</div>
//                 <h3 className="text-xl font-bold mb-3" style={{ color: "#FFFFF0" }}>{item.title}</h3>
//                 <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,240,0.55)" }}>{item.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       {/* ── NEW ARRIVALS ── */}
//       {newArrivals.length > 0 && (
//         <section className="py-24 px-6" style={{ background: "#FFFFF0" }}>
//           <div className="max-w-7xl mx-auto">
//             <motion.div {...fadeUp} className="flex items-end justify-between mb-16">
//               <div>
//                 <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#D4AF37" }}>Just In</p>
//                 <h2 className="text-4xl lg:text-5xl font-bold" style={{ color: "#1A1A2E" }}>New Arrivals</h2>
//               </div>
//               <Link to="/products?sort=newest" className="hidden lg:flex items-center gap-2 text-sm tracking-widest uppercase"
//                 style={{ color: "#D4AF37" }}>
//                 View All <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//                   <path d="M5 12h14M12 5l7 7-7 7" />
//                 </svg>
//               </Link>
//             </motion.div>
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//               {newArrivals.slice(0, 8).map((product, i) => (
//                 <ProductCard key={product.id} product={product} index={i}
//                   onProtectedAction={handleProtectedAction} isNew />
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ── FOOTER ── */}
//       <footer className="py-16 px-6" style={{ background: "#1A1A2E", borderTop: "1px solid rgba(212,175,55,0.1)" }}>
//         <div className="max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-4 gap-12 mb-12">
//             <div className="lg:col-span-2">
//               <h3 className="text-2xl font-bold mb-2" style={{ color: "#FFFFF0" }}>
//                 Sri Aboorva <span style={{ color: "#D4AF37" }}>Silks</span>
//               </h3>
//               <div className="w-12 h-px mb-4" style={{ background: "#D4AF37" }} />
//               <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,240,0.5)" }}>
//                 Your one-stop destination for the finest clothing — sarees, kurtis, shawls, men's wear, 
//                 children's collection and more. Quality and tradition, for every occasion.
//               </p>
//             </div>
//             <div>
//               <h4 className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#D4AF37" }}>Quick Links</h4>
//               {[
//                 { label: "New Arrivals", to: "/products?sort=newest" },
//                 { label: "Women", to: "/products?gender=women" },
//                 { label: "Men", to: "/products?gender=men" },
//                 { label: "Kids", to: "/products?gender=kids" },
//                 { label: "About Us", to: "/about" },
//               ].map(item => (
//                 <Link key={item.label} to={item.to}
//                   className="block text-sm py-1.5 transition-colors"
//                   style={{ color: "rgba(255,255,240,0.5)" }}
//                   onMouseEnter={e => e.target.style.color = "#D4AF37"}
//                   onMouseLeave={e => e.target.style.color = "rgba(255,255,240,0.5)"}
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//             </div>
//             <div>
//               <h4 className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#D4AF37" }}>Account</h4>
//               {["My Profile", "My Orders", "Wishlist", "Cart"].map(item => (
//                 <button key={item}
//                   onClick={() => handleProtectedAction(() => navigate(`/${item.toLowerCase().replace(" ", "-")}`))}
//                   className="block text-sm py-1.5 transition-colors text-left"
//                   style={{ color: "rgba(255,255,240,0.5)" }}
//                   onMouseEnter={e => e.target.style.color = "#D4AF37"}
//                   onMouseLeave={e => e.target.style.color = "rgba(255,255,240,0.5)"}
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-4"
//             style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}>
//             <p className="text-xs tracking-wide" style={{ color: "rgba(255,255,240,0.3)" }}>
//               © 2026 Sri Aboorva Silk House. All rights reserved.
//             </p>
//             <div className="flex items-center gap-3">
//               {[...Array(3)].map((_, i) => (
//                 <div key={i} className="h-px" style={{
//                   width: i === 1 ? "32px" : "12px",
//                   background: i === 1 ? "#D4AF37" : "rgba(212,175,55,0.3)"
//                 }} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </footer>

//       <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap');`}</style>
//     </div>
//   );
// }

// // ── Product Card Component ──
// function ProductCard({ product, index, onProtectedAction, isNew = false }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ delay: index * 0.08 }}
//       className="group"
//     >
//       <div className="relative overflow-hidden aspect-[3/4] mb-3">
//         {product.imageUrl ? (
//           <img src={product.imageUrl} alt={product.name}
//             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
//         ) : (
//           <PlaceholderImage text={product.name} />
//         )}

//         <div className="absolute top-3 left-3 flex flex-col gap-1">
//           {isNew && (
//             <span className="px-2 py-0.5 text-xs tracking-widest uppercase"
//               style={{ background: "#D4AF37", color: "#1A1A2E" }}>New</span>
//           )}
//           {product.discountPercent > 0 && (
//             <span className="px-2 py-0.5 text-xs tracking-widest uppercase"
//               style={{ background: "#800000", color: "#FFFFF0" }}>-{product.discountPercent}%</span>
//           )}
//         </div>

//         <div className="absolute inset-x-0 bottom-0 p-3 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
//           style={{ background: "linear-gradient(to top, rgba(26,26,46,0.95), transparent)" }}>
//           <button
//             onClick={() => onProtectedAction(() => console.log("add to cart", product.id))}
//             className="flex-1 py-2 text-xs tracking-widest uppercase transition-all"
//             style={{ background: "#800000", color: "#FFFFF0" }}
//           >
//             Add to Cart
//           </button>
//           <button
//             onClick={() => onProtectedAction(() => console.log("wishlist", product.id))}
//             className="w-9 h-9 flex items-center justify-center transition-all flex-shrink-0"
//             style={{ border: "1px solid rgba(212,175,55,0.5)", color: "#D4AF37" }}
//           >
//             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//               <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
//             </svg>
//           </button>
//         </div>
//       </div>

//       <Link to={`/products/${product.id}`}>
//         <h3 className="text-base font-semibold mb-1 transition-colors group-hover:text-amber-600"
//           style={{ color: "#1A1A2E" }}>
//           {product.name}
//         </h3>
//       </Link>
//       {product.categoryName && (
//         <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "#D4AF37" }}>
//           {product.categoryName}
//         </p>
//       )}
//       <div className="flex items-center gap-3">
//         <span className="text-lg font-bold" style={{ color: "#1A1A2E" }}>
//           ₹{product.price?.toLocaleString("en-IN")}
//         </span>
//         {product.originalPrice && product.originalPrice > product.price && (
//           <span className="text-sm line-through" style={{ color: "rgba(54,69,79,0.4)" }}>
//             ₹{product.originalPrice?.toLocaleString("en-IN")}
//           </span>
//         )}
//       </div>
//     </motion.div>
//   );
// }

// // ── Empty State ──
// function EmptyProductState({ message }) {
//   return (
//     <div className="text-center py-20 col-span-4">
//       <div className="w-16 h-16 mx-auto mb-4 opacity-20"
//         style={{ background: "#1A1A2E", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
//       <p className="text-lg mb-2" style={{ color: "#36454F" }}>Nothing here yet</p>
//       <p className="text-sm" style={{ color: "rgba(54,69,79,0.5)" }}>{message}</p>
//     </div>
//   );
// }



// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { productAPI, cartAPI, wishlistAPI } from "../api";

// /* ─── Typography system ──────────────────────────────────────────────────────
//    Cormorant Garamond  → display/headings (H1, H2, section titles, logo)
//    Inter               → all body text, prices, labels, buttons, descriptions
//    This gives the luxury serif for brand presence, Inter for clear readability.
// ──────────────────────────────────────────────────────────────────────────────*/
// const SERIF = "'Cormorant Garamond', Georgia, serif";
// const SANS  = "'Inter', system-ui, -apple-system, sans-serif";

// const fadeUp = {
//   initial: { opacity: 0, y: 30 },
//   whileInView: { opacity: 1, y: 0 },
//   viewport: { once: true },
//   transition: { duration: 0.6 }
// };

// export default function Home() {
//   const [categories,       setCategories]       = useState([]);
//   const [featuredProducts, setFeaturedProducts] = useState([]);
//   const [newArrivals,      setNewArrivals]      = useState([]);
//   const [loading,          setLoading]          = useState(true);
//   const navigate   = useNavigate();
//   const isLoggedIn = !!localStorage.getItem("token");
//   const user       = JSON.parse(localStorage.getItem("user") || "null");
//   const isCustomer = isLoggedIn && user?.role === "CUSTOMER";

//   useEffect(() => {
//     (async () => {
//       try {
//         const [cats, featured, products] = await Promise.allSettled([
//           productAPI.getAllCategories(),
//           productAPI.getFeaturedProducts(),
//           productAPI.getAllProducts({ size: 8 }),
//         ]);
//         if (cats.status     === "fulfilled") setCategories(cats.value || []);
//         if (featured.status === "fulfilled") setFeaturedProducts(featured.value?.content || featured.value || []);
//         if (products.status === "fulfilled") setNewArrivals(products.value?.content || products.value || []);
//       } catch (err) { console.error(err); }
//       finally { setLoading(false); }
//     })();
//   }, []);

//   const goProtected = (path) => {
//     if (!isLoggedIn) navigate("/login", { state: { from: path } });
//     else navigate(path);
//   };

//   return (
//     <div style={{ fontFamily: SANS, background: "#FFFFF0", minHeight: "100vh" }}>
//       <Navbar />

//       {/* ── HERO ── */}
//       <section style={{ background: "#1A1A2E", minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 80, position: "relative", overflow: "hidden" }}>
//         <div style={{ position: "absolute", inset: 0, opacity: 0.05,
//           backgroundImage: "repeating-linear-gradient(45deg,#D4AF37 0,#D4AF37 1px,transparent 0,transparent 50%)",
//           backgroundSize: "40px 40px" }} />
//         <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 60% 50%,rgba(212,175,55,0.1) 0%,transparent 70%)" }} />

//         <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "0 28px", width: "100%" }}>
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
//             <div>
//               <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
//                 style={{ fontSize: 11, letterSpacing: "0.5em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 16, fontFamily: SANS, fontWeight: 600 }}>
//                 Heritage · Craftsmanship · Elegance
//               </motion.p>
//               <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }}
//                 style={{ fontFamily: SERIF, fontSize: "clamp(40px,6vw,80px)", fontWeight: 700, lineHeight: 1.1, color: "#FFFFF0", marginBottom: 20 }}>
//                 Fashion for<br/>
//                 <span style={{ color: "#D4AF37" }}>Every Occasion,</span><br/>
//                 Every Soul
//               </motion.h1>
//               <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:0.6, duration:0.5 }}
//                 style={{ width: 80, height: 1, background: "#D4AF37", transformOrigin: "left", marginBottom: 22 }} />
//               <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }}
//                 style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,240,0.65)", marginBottom: 36, maxWidth: 480, fontFamily: SANS }}>
//                 From exquisite silk sarees to everyday kurtis, children's festive wear to men's ethnic collections —
//                 everything your family needs, curated with care.
//               </motion.p>
//               <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.85 }}
//                 style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
//                 <Link to="/products" style={{ padding: "14px 32px", background: "#800000", color: "#FFFFF0", fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", fontFamily: SANS }}>
//                   Shop All
//                 </Link>
//                 <Link to="/new-arrivals" style={{ padding: "14px 32px", border: "1px solid rgba(212,175,55,0.5)", color: "#D4AF37", fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", fontFamily: SANS }}>
//                   New Arrivals
//                 </Link>
//               </motion.div>
//             </div>

//             {/* Stats */}
//             <motion.div initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.6 }}
//               style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
//               {[
//                 { number: "1000+", label: "Products Available" },
//                 { number: "25+",   label: "Years of Heritage"  },
//                 { number: "10K+",  label: "Happy Customers"    },
//                 { number: "6+",    label: "Collections"        },
//               ].map((s, i) => (
//                 <motion.div key={i} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay: 0.7+i*0.1 }}
//                   style={{ padding: 28, textAlign: "center", border: "1px solid rgba(212,175,55,0.15)", background: "rgba(212,175,55,0.04)" }}>
//                   <div style={{ fontFamily: SERIF, fontSize: 40, fontWeight: 700, color: "#D4AF37", lineHeight: 1 }}>{s.number}</div>
//                   <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,240,0.5)", marginTop: 8 }}>{s.label}</div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* ── SHOP BY AUDIENCE ── */}
//       <section style={{ padding: "80px 28px", background: "#1A1A2E" }}>
//         <div style={{ maxWidth: 1280, margin: "0 auto" }}>
//           <motion.div {...fadeUp} style={{ textAlign: "center", marginBottom: 48 }}>
//             <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: "0.4em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 10 }}>Shop For</p>
//             <h2 style={{ fontFamily: SERIF, fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: "#FFFFF0" }}>Everyone in the Family</h2>
//             <div style={{ width: 56, height: 1, background: "#D4AF37", margin: "16px auto 0" }} />
//           </motion.div>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
//             {[
//               { label: "Women", sub: "Sarees · Kurtis · Shawls · Dress Materials", link: "/women", icon: "♀" },
//               { label: "Men",   sub: "Shirts · Dhotis · Ethnic Wear · Fabrics",    link: "/men",   icon: "♂" },
//               { label: "Kids",  sub: "Boys · Girls · Festive · Casual",            link: "/kids",  icon: "✦" },
//             ].map((item, i) => (
//               <motion.div key={item.label} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i*0.15 }}>
//                 <Link to={item.link} style={{ display: "block", padding: "40px 28px", textAlign: "center", textDecoration: "none", border: "1px solid rgba(212,175,55,0.15)", background: "rgba(212,175,55,0.03)", position: "relative", overflow: "hidden", transition: "background 0.3s" }}
//                   onMouseEnter={e => e.currentTarget.style.background = "rgba(212,175,55,0.08)"}
//                   onMouseLeave={e => e.currentTarget.style.background = "rgba(212,175,55,0.03)"}>
//                   <div style={{ fontSize: 32, color: "rgba(212,175,55,0.35)", marginBottom: 14 }}>{item.icon}</div>
//                   <h3 style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 700, color: "#FFFFF0", marginBottom: 10 }}>{item.label}</h3>
//                   <p style={{ fontFamily: SANS, fontSize: 13, color: "rgba(212,175,55,0.6)", marginBottom: 20 }}>{item.sub}</p>
//                   <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4AF37", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
//                     Shop Now
//                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
//                   </span>
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── MARQUEE ── */}
//       <div style={{ padding: "14px 0", overflow: "hidden", background: "#800000" }}>
//         <motion.div animate={{ x: ["0%","-50%"] }} transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
//           style={{ display: "flex", gap: 48, whiteSpace: "nowrap" }}>
//           {[...Array(8)].map((_, i) => (
//             <span key={i} style={{ display: "flex", alignItems: "center", gap: 20, fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,240,0.85)" }}>
//               Silk Sarees <span style={{ opacity: 0.4 }}>◆</span> Kurtis & Sets <span style={{ opacity: 0.4 }}>◆</span> Shawls <span style={{ opacity: 0.4 }}>◆</span> Men's Wear <span style={{ opacity: 0.4 }}>◆</span> Children's Collection <span style={{ opacity: 0.4 }}>◆</span> Dress Materials <span style={{ opacity: 0.4 }}>◆</span>
//             </span>
//           ))}
//         </motion.div>
//       </div>

//       {/* ── COLLECTIONS ── */}
//       <section style={{ padding: "80px 28px", background: "#1A1A2E" }}>
//         <div style={{ maxWidth: 1280, margin: "0 auto" }}>
//           <motion.div {...fadeUp} style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40 }}>
//             <div>
//               <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: "0.4em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 8 }}>Browse By</p>
//               <h2 style={{ fontFamily: SERIF, fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "#FFFFF0" }}>Our Collections</h2>
//             </div>
//             <Link to="/products" style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(212,175,55,0.6)", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
//               All Categories <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
//             </Link>
//           </motion.div>

//           {loading ? (
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
//               {[...Array(4)].map((_, i) => <div key={i} style={{ height: i===0?"440px":"210px", background: "rgba(212,175,55,0.06)" }} />)}
//             </div>
//           ) : categories.length > 0 ? (
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, gridAutoRows: "210px" }}>
//               {categories.map((cat, i) => (
//                 <motion.div key={cat.id} style={{ gridRow: i===0 ? "span 2" : "span 1" }}
//                   initial={{ opacity:0, scale:0.97 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ delay:i*0.07 }}>
//                   <Link to={`/products?category=${cat.id}`} style={{ display: "block", position: "relative", overflow: "hidden", width: "100%", height: "100%", textDecoration: "none" }}>
//                     <div style={{ width: "100%", height: "100%" }}>
//                       {cat.imageUrl
//                         ? <img src={cat.imageUrl} alt={cat.name} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.6s" }}
//                             onMouseEnter={e => e.target.style.transform="scale(1.05)"}
//                             onMouseLeave={e => e.target.style.transform="scale(1)"} />
//                         : <div style={{ width:"100%", height:"100%", background:`hsl(${220+i*15},25%,${14+i*3}%)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
//                             <div style={{ width:32, height:32, opacity:0.2, background:"#D4AF37", clipPath:"polygon(50% 0%,100% 50%,50% 100%,0% 50%)" }} />
//                           </div>
//                       }
//                     </div>
//                     <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(10,10,20,0.9) 0%,rgba(10,10,20,0.25) 50%,transparent 100%)" }} />
//                     <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:18 }}>
//                       <h3 style={{ fontFamily: SERIF, fontSize: i===0?22:16, fontWeight:700, color:"#FFFFF0", marginBottom:4 }}>{cat.name}</h3>
//                       <div style={{ height:1, width:0, background:"#D4AF37", transition:"width 0.4s" }}
//                         onMouseEnter={e => e.target.style.width="100%"} />
//                     </div>
//                   </Link>
//                 </motion.div>
//               ))}
//             </div>
//           ) : (
//             <div style={{ textAlign: "center", padding: "80px 0" }}>
//               <p style={{ fontFamily: SANS, fontSize: 16, color: "rgba(255,255,240,0.4)" }}>No categories yet — add them from the admin panel</p>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* ── FEATURED PRODUCTS ── */}
//       <section style={{ padding: "80px 28px", background: "#F5F0E8" }}>
//         <div style={{ maxWidth: 1280, margin: "0 auto" }}>
//           <motion.div {...fadeUp} style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48 }}>
//             <div>
//               <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: "0.4em", textTransform: "uppercase", color: "#800000", marginBottom: 8 }}>★ Curated For You</p>
//               <h2 style={{ fontFamily: SERIF, fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "#1A1A2E" }}>Featured Pieces</h2>
//               <div style={{ width: 40, height: 2, background: "#800000", marginTop: 12 }} />
//             </div>
//             <Link to="/products" style={{ padding: "12px 24px", background: "#1A1A2E", color: "#D4AF37", textDecoration: "none", fontFamily: SANS, fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
//               View All →
//             </Link>
//           </motion.div>

//           {loading ? (
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
//               {[...Array(4)].map((_,i) => <div key={i} style={{ aspectRatio:"3/4", background:"rgba(26,26,46,0.06)", borderRadius:4 }} />)}
//             </div>
//           ) : featuredProducts.length > 0 ? (
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
//               {featuredProducts.slice(0,8).map((p,i) => (
//                 <HomeProductCard key={p.id} product={p} index={i} isCustomer={isCustomer} isLoggedIn={isLoggedIn} />
//               ))}
//             </div>
//           ) : (
//             <EmptyState msg="Featured products will appear here once admin marks them" />
//           )}
//         </div>
//       </section>

//       {/* ── WHY CHOOSE US ── */}
//       <motion.section {...fadeUp} style={{ padding: "80px 28px", background: "#1A1A2E", position: "relative", overflow: "hidden" }}>
//         <div style={{ position:"absolute", inset:0, opacity:0.04,
//           backgroundImage:"repeating-linear-gradient(-45deg,#D4AF37 0,#D4AF37 1px,transparent 0,transparent 50%)",
//           backgroundSize:"40px 40px" }} />
//         <div style={{ position:"relative", zIndex:10, maxWidth: 1100, margin: "0 auto" }}>
//           <div style={{ textAlign: "center", marginBottom: 52 }}>
//             <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: "0.5em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 12 }}>Why Shop With Us</p>
//             <h2 style={{ fontFamily: SERIF, fontSize: "clamp(26px,4vw,44px)", fontWeight: 700, color: "#FFFFF0", marginBottom: 16 }}>
//               Sri Aboorva Silks —<br/><span style={{ color: "#D4AF37" }}>Your Family's Wardrobe</span>
//             </h2>
//             <div style={{ width: 56, height: 1, background: "#D4AF37", margin: "0 auto" }} />
//           </div>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
//             {[
//               { icon: "◈", title: "All Under One Roof", desc: "Sarees, kurtis, shawls, men's wear, children's clothes, dress materials — everything for the whole family." },
//               { icon: "◇", title: "Authentic Quality",  desc: "Every piece is handpicked for quality. From everyday cottons to festive silks, we never compromise." },
//               { icon: "◉", title: "25+ Years of Trust", desc: "Serving thousands of families across the region with honest pricing and genuine craftsmanship." },
//             ].map((item, i) => (
//               <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i*0.15 }}
//                 style={{ textAlign: "center", padding: 36, border: "1px solid rgba(212,175,55,0.12)", background: "rgba(212,175,55,0.03)" }}>
//                 <div style={{ fontSize: 28, color: "#D4AF37", marginBottom: 16 }}>{item.icon}</div>
//                 <h3 style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 700, color: "#FFFFF0", marginBottom: 12 }}>{item.title}</h3>
//                 <p style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,240,0.55)" }}>{item.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       {/* ── NEW ARRIVALS ── */}
//       {newArrivals.length > 0 && (
//         <section style={{ padding: "80px 28px", background: "#FFFFF0" }}>
//           <div style={{ maxWidth: 1280, margin: "0 auto" }}>
//             <motion.div {...fadeUp} style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48 }}>
//               <div>
//                 <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: "0.4em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 8 }}>Just In</p>
//                 <h2 style={{ fontFamily: SERIF, fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "#1A1A2E" }}>New Arrivals</h2>
//               </div>
//               <Link to="/new-arrivals" style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#D4AF37", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
//                 View All <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
//               </Link>
//             </motion.div>
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
//               {newArrivals.slice(0,8).map((p,i) => (
//                 <HomeProductCard key={p.id} product={p} index={i} isNew isCustomer={isCustomer} isLoggedIn={isLoggedIn} />
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ── FOOTER ── */}
//       <footer style={{ padding: "60px 28px", background: "#1A1A2E", borderTop: "1px solid rgba(212,175,55,0.1)" }}>
//         <div style={{ maxWidth: 1280, margin: "0 auto" }}>
//           <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 40 }}>
//             <div>
//               <h3 style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 700, color: "#FFFFF0", marginBottom: 4 }}>
//                 Sri Aboorva <span style={{ color: "#D4AF37" }}>Silks</span>
//               </h3>
//               <div style={{ width: 40, height: 1, background: "#D4AF37", margin: "10px 0 16px" }} />
//               <p style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,240,0.5)", maxWidth: 340 }}>
//                 Your one-stop destination for the finest clothing — sarees, kurtis, shawls, men's wear,
//                 children's collection and more. Quality and tradition, for every occasion.
//               </p>
//             </div>
//             <div>
//               <h4 style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 16 }}>Quick Links</h4>
//               {[
//                 { label: "New Arrivals", to: "/new-arrivals" },
//                 { label: "Women",        to: "/women"        },
//                 { label: "Men",          to: "/men"          },
//                 { label: "Kids",         to: "/kids"         },
//                 { label: "About Us",     to: "/about"        },
//               ].map(item => (
//                 <Link key={item.label} to={item.to}
//                   style={{ display: "block", fontFamily: SANS, fontSize: 14, padding: "5px 0", color: "rgba(255,255,240,0.5)", textDecoration: "none", transition: "color 0.2s" }}
//                   onMouseEnter={e => e.target.style.color = "#D4AF37"}
//                   onMouseLeave={e => e.target.style.color = "rgba(255,255,240,0.5)"}>
//                   {item.label}
//                 </Link>
//               ))}
//             </div>
//             <div>
//               <h4 style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 16 }}>Account</h4>
//               {["My Profile", "My Orders", "Wishlist", "Cart"].map(item => (
//                 <button key={item}
//                   onClick={() => goProtected(`/${item.toLowerCase().replace(" ","-")}`)}
//                   style={{ display: "block", fontFamily: SANS, fontSize: 14, padding: "5px 0", color: "rgba(255,255,240,0.5)", background: "none", border: "none", cursor: "pointer", textAlign: "left", transition: "color 0.2s", width: "100%" }}
//                   onMouseEnter={e => e.target.style.color = "#D4AF37"}
//                   onMouseLeave={e => e.target.style.color = "rgba(255,255,240,0.5)"}>
//                   {item}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <div style={{ borderTop: "1px solid rgba(212,175,55,0.1)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <p style={{ fontFamily: SANS, fontSize: 12, color: "rgba(255,255,240,0.3)" }}>© 2026 Sri Aboorva Silk House. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600;700;800&display=swap');
//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//         @media (max-width: 768px) {
//           .home-grid-2 { grid-template-columns: 1fr !important; }
//           .home-grid-3 { grid-template-columns: 1fr !important; }
//           .home-grid-4 { grid-template-columns: repeat(2,1fr) !important; }
//         }
//       `}</style>
//     </div>
//   );
// }

// // ── Product card used only on home page ──────────────────────────────────────
// function HomeProductCard({ product, index, isNew, isCustomer, isLoggedIn }) {
//   const navigate = useNavigate();
//   const [cartAdded,  setCartAdded]  = useState(false);
//   const [wishlisted, setWishlisted] = useState(false);

//   const handleCart = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (!isLoggedIn) { navigate("/login"); return; }
//     if (!isCustomer) return;
//     try {
//       await cartAPI.addToCart(product.id, 1);
//       setCartAdded(true);
//       setTimeout(() => setCartAdded(false), 2200);
//     } catch (err) { console.error(err); }
//   };

//   const handleWish = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (!isLoggedIn) { navigate("/login"); return; }
//     if (!isCustomer) return;
//     try {
//       const res = await wishlistAPI.toggle(product.id);
//       setWishlisted(res.wishlisted);
//     } catch (err) { console.error(err); }
//   };

//   const disc = product.originalPrice && product.originalPrice > product.price
//     ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
//     : product.discountPercent || 0;

//   return (
//     <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: index*0.07 }}
//       className="home-pcard"
//       style={{ cursor: "pointer" }}
//       onClick={() => navigate(`/product/${product.id}`)}>
//       <div style={{ position:"relative", overflow:"hidden", aspectRatio:"3/4", marginBottom:12, background:"#f0ebe3" }}>
//         {product.imageUrl
//           ? <img src={product.imageUrl} alt={product.name} className="home-pcard-img"
//               style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.5s" }} />
//           : <div style={{ width:"100%", height:"100%", background:"linear-gradient(135deg,#1A1A2E,#2d2d4e)", display:"flex", alignItems:"center", justifyContent:"center" }}>
//               <div style={{ width:36, height:36, opacity:0.2, background:"#D4AF37", clipPath:"polygon(50% 0%,100% 50%,50% 100%,0% 50%)" }} />
//             </div>
//         }
//         {/* Badges */}
//         <div style={{ position:"absolute", top:10, left:10, display:"flex", flexDirection:"column", gap:4 }}>
//           {isNew  && <span style={{ background:"#D4AF37", color:"#1A1A2E", fontFamily:SANS, fontSize:11, fontWeight:700, padding:"3px 8px" }}>NEW</span>}
//           {disc>0 && <span style={{ background:"#800000", color:"#FFFFF0", fontFamily:SANS, fontSize:11, fontWeight:700, padding:"3px 8px" }}>{disc}% OFF</span>}
//         </div>
//         {/* Hover action bar */}
//         <div className="home-pcard-bar"
//           style={{ position:"absolute", bottom:0, left:0, right:0, padding:"10px 12px", background:"rgba(17,17,17,0.88)", display:"flex", gap:8, transform:"translateY(100%)", transition:"transform 0.28s ease" }}>
//           <button onClick={handleCart}
//             style={{ flex:1, padding:"10px 0", fontFamily:SANS, fontSize:12, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", background: cartAdded?"#16a34a":"#800000", color:"white", border:"none", cursor:"pointer", borderRadius:3, transition:"background 0.2s" }}>
//             {cartAdded ? "✓ Added!" : "Add to Cart"}
//           </button>
//           <button onClick={handleWish}
//             style={{ width:40, background:"transparent", border:"1px solid rgba(212,175,55,0.5)", color:wishlisted?"#ef4444":"#D4AF37", cursor:"pointer", borderRadius:3, display:"flex", alignItems:"center", justifyContent:"center" }}>
//             <svg width="15" height="15" viewBox="0 0 24 24" fill={wishlisted?"currentColor":"none"} stroke="currentColor" strokeWidth="1.8">
//               <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
//             </svg>
//           </button>
//         </div>
//       </div>
//       {/* Info */}
//       <p style={{ fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#800000", marginBottom:4 }}>
//         {product.category?.name || product.categoryName || ""}
//       </p>
//       <h3 style={{ fontFamily:SANS, fontSize:15, fontWeight:600, color:"#111827", marginBottom:8, overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis" }}>{product.name}</h3>
//       <div style={{ display:"flex", alignItems:"baseline", gap:8 }}>
//         <span style={{ fontFamily:SANS, fontSize:17, fontWeight:800, color:"#111827" }}>₹{Number(product.price).toLocaleString("en-IN")}</span>
//         {product.originalPrice && product.originalPrice > product.price && (
//           <span style={{ fontFamily:SANS, fontSize:13, color:"#9ca3af", textDecoration:"line-through" }}>₹{Number(product.originalPrice).toLocaleString("en-IN")}</span>
//         )}
//         {disc>0 && <span style={{ fontFamily:SANS, fontSize:12, fontWeight:700, color:"#16a34a" }}>{disc}% off</span>}
//       </div>
//       <style>{`
//         .home-pcard:hover .home-pcard-img { transform: scale(1.05) !important; }
//         .home-pcard:hover .home-pcard-bar { transform: translateY(0) !important; }
//       `}</style>
//     </motion.div>
//   );
// }

// function EmptyState({ msg }) {
//   return (
//     <div style={{ textAlign:"center", padding:"60px 20px", gridColumn:"1/-1" }}>
//       <div style={{ width:48, height:48, margin:"0 auto 16px", opacity:0.15, background:"#1A1A2E", clipPath:"polygon(50% 0%,100% 50%,50% 100%,0% 50%)" }} />
//       <p style={{ fontFamily:SANS, fontSize:16, color:"#6b7280" }}>{msg}</p>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { productAPI, cartAPI, wishlistAPI } from "../api";

/* ─── Typography system ──────────────────────────────────────────────────────
   Cormorant Garamond  → display/headings (H1, H2, section titles, logo)
   Inter               → all body text, prices, labels, buttons, descriptions
   This gives the luxury serif for brand presence, Inter for clear readability.
──────────────────────────────────────────────────────────────────────────────*/
const SERIF = "'Cormorant Garamond', Georgia, serif";
const SANS  = "'Inter', system-ui, -apple-system, sans-serif";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function Home() {
  const [categories,       setCategories]       = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals,      setNewArrivals]      = useState([]);
  const [loading,          setLoading]          = useState(true);
  const navigate   = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const user       = JSON.parse(localStorage.getItem("user") || "null");
  const isCustomer = isLoggedIn && user?.role === "CUSTOMER";

  useEffect(() => {
    (async () => {
      try {
        const [cats, featured, products] = await Promise.allSettled([
          productAPI.getAllCategories(),
          productAPI.getFeaturedProducts(),
          productAPI.getAllProducts({ size: 8 }),
        ]);
        if (cats.status     === "fulfilled") setCategories(cats.value || []);
        if (featured.status === "fulfilled") setFeaturedProducts(featured.value?.content || featured.value || []);
        if (products.status === "fulfilled") setNewArrivals(products.value?.content || products.value || []);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    })();
  }, []);

  const goProtected = (path) => {
    if (!isLoggedIn) navigate("/login", { state: { from: path } });
    else navigate(path);
  };

  return (
    <div style={{ fontFamily: SANS, background: "#FFFFF0", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ background: "#1A1A2E", minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 80, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.05,
          backgroundImage: "repeating-linear-gradient(45deg,#D4AF37 0,#D4AF37 1px,transparent 0,transparent 50%)",
          backgroundSize: "40px 40px" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 60% 50%,rgba(212,175,55,0.1) 0%,transparent 70%)" }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "0 28px", width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
                style={{ fontSize: 11, letterSpacing: "0.5em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 16, fontFamily: SANS, fontWeight: 600 }}>
                Heritage · Craftsmanship · Elegance
              </motion.p>
              <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }}
                style={{ fontFamily: SERIF, fontSize: "clamp(40px,6vw,80px)", fontWeight: 700, lineHeight: 1.1, color: "#FFFFF0", marginBottom: 20 }}>
                Fashion for<br/>
                <span style={{ color: "#D4AF37" }}>Every Occasion,</span><br/>
                Every Soul
              </motion.h1>
              <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:0.6, duration:0.5 }}
                style={{ width: 80, height: 1, background: "#D4AF37", transformOrigin: "left", marginBottom: 22 }} />
              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }}
                style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,240,0.65)", marginBottom: 36, maxWidth: 480, fontFamily: SANS }}>
                From exquisite silk sarees to everyday kurtis, children's festive wear to men's ethnic collections —
                everything your family needs, curated with care.
              </motion.p>
              <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.85 }}
                style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                <Link to="/products" style={{ padding: "14px 32px", background: "#800000", color: "#FFFFF0", fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", fontFamily: SANS }}>
                  Shop All
                </Link>
                <Link to="/new-arrivals" style={{ padding: "14px 32px", border: "1px solid rgba(212,175,55,0.5)", color: "#D4AF37", fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", fontFamily: SANS }}>
                  New Arrivals
                </Link>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.6 }}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { number: "500+", label: "Products Available" },
                { number: "5+",   label: "Years of Heritage"  },
                { number: "2K+",  label: "Happy Customers"    },
                { number: "20+",    label: "Collections"        },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay: 0.7+i*0.1 }}
                  style={{ padding: 28, textAlign: "center", border: "1px solid rgba(212,175,55,0.15)", background: "rgba(212,175,55,0.04)" }}>
                  <div style={{ fontFamily: SERIF, fontSize: 40, fontWeight: 700, color: "#D4AF37", lineHeight: 1 }}>{s.number}</div>
                  <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,240,0.5)", marginTop: 8 }}>{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SHOP BY AUDIENCE ── */}
      <section style={{ padding: "80px 28px", background: "#1A1A2E" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <motion.div {...fadeUp} style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: "0.4em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 10 }}>Shop For</p>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: "#FFFFF0" }}>Everyone in the Family</h2>
            <div style={{ width: 56, height: 1, background: "#D4AF37", margin: "16px auto 0" }} />
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {[
              { label: "Women", sub: "Sarees · Kurtis · Shawls · Dress Materials", link: "/women", icon: "♀" },
              { label: "Men",   sub: "Shirts · Dhotis · Ethnic Wear · Fabrics",    link: "/men",   icon: "♂" },
              { label: "Kids",  sub: "Boys · Girls · Festive · Casual",            link: "/kids",  icon: "✦" },
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i*0.15 }}>
                <Link to={item.link} style={{ display: "block", padding: "40px 28px", textAlign: "center", textDecoration: "none", border: "1px solid rgba(212,175,55,0.15)", background: "rgba(212,175,55,0.03)", position: "relative", overflow: "hidden", transition: "background 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(212,175,55,0.08)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(212,175,55,0.03)"}>
                  <div style={{ fontSize: 32, color: "rgba(212,175,55,0.35)", marginBottom: 14 }}>{item.icon}</div>
                  <h3 style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 700, color: "#FFFFF0", marginBottom: 10 }}>{item.label}</h3>
                  <p style={{ fontFamily: SANS, fontSize: 13, color: "rgba(212,175,55,0.6)", marginBottom: 20 }}>{item.sub}</p>
                  <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4AF37", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                    Shop Now
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ padding: "14px 0", overflow: "hidden", background: "#800000" }}>
        <motion.div animate={{ x: ["0%","-50%"] }} transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
          style={{ display: "flex", gap: 48, whiteSpace: "nowrap" }}>
          {[...Array(8)].map((_, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 20, fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,240,0.85)" }}>
              Silk Sarees <span style={{ opacity: 0.4 }}>◆</span> Kurtis & Sets <span style={{ opacity: 0.4 }}>◆</span> Shawls <span style={{ opacity: 0.4 }}>◆</span> Men's Wear <span style={{ opacity: 0.4 }}>◆</span> Children's Collection <span style={{ opacity: 0.4 }}>◆</span> Dress Materials <span style={{ opacity: 0.4 }}>◆</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── COLLECTIONS ── */}
      <section style={{ padding: "80px 28px", background: "#1A1A2E" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <motion.div {...fadeUp} style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40 }}>
            <div>
              <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: "0.4em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 8 }}>Browse By</p>
              <h2 style={{ fontFamily: SERIF, fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "#FFFFF0" }}>Our Collections</h2>
            </div>
            <Link to="/products" style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(212,175,55,0.6)", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
              All Categories <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </motion.div>

          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
              {[...Array(4)].map((_, i) => <div key={i} style={{ height: i===0?"440px":"210px", background: "rgba(212,175,55,0.06)" }} />)}
            </div>
          ) : categories.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, gridAutoRows: "210px" }}>
              {categories.map((cat, i) => (
                <motion.div key={cat.id} style={{ gridRow: i===0 ? "span 2" : "span 1" }}
                  initial={{ opacity:0, scale:0.97 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ delay:i*0.07 }}>
                  <Link to={`/products?category=${cat.id}`} className="cat-card" style={{ display: "block", position: "relative", overflow: "hidden", width: "100%", height: "100%", textDecoration: "none" }}>
                    <div style={{ width: "100%", height: "100%" }}>
                      {cat.imageUrl
                        ? <img src={cat.imageUrl} alt={cat.name} className="cat-card-img" style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.7s ease" }} />
                        : <div style={{ width:"100%", height:"100%", background:`hsl(${220+i*15},25%,${14+i*3}%)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                            <div style={{ width:32, height:32, opacity:0.2, background:"#D4AF37", clipPath:"polygon(50% 0%,100% 50%,50% 100%,0% 50%)" }} />
                          </div>
                      }
                    </div>
                    {/* Gradient overlay */}
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(10,10,20,0.92) 0%,rgba(10,10,20,0.3) 50%,transparent 100%)" }} />
                    {/* Crimson hover tint */}
                    <div className="cat-card-tint" style={{ position:"absolute", inset:0, background:"#800000", opacity:0, transition:"opacity 0.4s" }} />
                    {/* Category number */}
                    <div style={{ position:"absolute", top:14, right:14, fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:"0.15em", opacity:0.4, color:"#D4AF37" }}>
                      {String(i+1).padStart(2,"0")}
                    </div>
                    {/* Label + animated underline */}
                    <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:18 }}>
                      <h3 style={{ fontFamily:SERIF, fontSize:i===0?22:16, fontWeight:700, color:"#FFFFF0", marginBottom:6 }}>{cat.name}</h3>
                      <div className="cat-card-line" style={{ height:1, width:0, background:"#D4AF37", transition:"width 0.5s ease" }} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p style={{ fontFamily: SANS, fontSize: 16, color: "rgba(255,255,240,0.4)" }}>No categories yet — add them from the admin panel</p>
            </div>
          )}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section style={{ padding: "80px 28px", background: "#F5F0E8" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <motion.div {...fadeUp} style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48 }}>
            <div>
              <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: "0.4em", textTransform: "uppercase", color: "#800000", marginBottom: 8 }}>★ Curated For You</p>
              <h2 style={{ fontFamily: SERIF, fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "#1A1A2E" }}>Featured Pieces</h2>
              <div style={{ width: 40, height: 2, background: "#800000", marginTop: 12 }} />
            </div>
            <Link to="/products" style={{ padding: "12px 24px", background: "#1A1A2E", color: "#D4AF37", textDecoration: "none", fontFamily: SANS, fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              View All →
            </Link>
          </motion.div>

          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
              {[...Array(4)].map((_,i) => <div key={i} style={{ aspectRatio:"3/4", background:"rgba(26,26,46,0.06)", borderRadius:4 }} />)}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
              {featuredProducts.slice(0,8).map((p,i) => (
                <HomeProductCard key={p.id} product={p} index={i} isCustomer={isCustomer} isLoggedIn={isLoggedIn} />
              ))}
            </div>
          ) : (
            <EmptyState msg="Featured products will appear here once admin marks them" />
          )}
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <motion.section {...fadeUp} style={{ padding: "80px 28px", background: "#1A1A2E", position: "relative", overflow: "hidden" }}>
        <div style={{ position:"absolute", inset:0, opacity:0.04,
          backgroundImage:"repeating-linear-gradient(-45deg,#D4AF37 0,#D4AF37 1px,transparent 0,transparent 50%)",
          backgroundSize:"40px 40px" }} />
        <div style={{ position:"relative", zIndex:10, maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: "0.5em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 12 }}>Why Shop With Us</p>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(26px,4vw,44px)", fontWeight: 700, color: "#FFFFF0", marginBottom: 16 }}>
              Sri Aboorva Silks —<br/><span style={{ color: "#D4AF37" }}>Your Family's Wardrobe</span>
            </h2>
            <div style={{ width: 56, height: 1, background: "#D4AF37", margin: "0 auto" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {[
              { icon: "◈", title: "All Under One Roof", desc: "Sarees, kurtis, shawls, men's wear, children's clothes, dress materials — everything for the whole family." },
              { icon: "◇", title: "Authentic Quality",  desc: "Every piece is handpicked for quality. From everyday cottons to festive silks, we never compromise." },
              { icon: "◉", title: "5+ Years of Trust", desc: "Serving thousands of families across the region with honest pricing and genuine craftsmanship." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i*0.15 }}
                style={{ textAlign: "center", padding: 36, border: "1px solid rgba(212,175,55,0.12)", background: "rgba(212,175,55,0.03)" }}>
                <div style={{ fontSize: 28, color: "#D4AF37", marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 700, color: "#FFFFF0", marginBottom: 12 }}>{item.title}</h3>
                <p style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,240,0.55)" }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── NEW ARRIVALS ── */}
      {newArrivals.length > 0 && (
        <section style={{ padding: "80px 28px", background: "#FFFFF0" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <motion.div {...fadeUp} style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48 }}>
              <div>
                <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: "0.4em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 8 }}>Just In</p>
                <h2 style={{ fontFamily: SERIF, fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "#1A1A2E" }}>New Arrivals</h2>
              </div>
              <Link to="/new-arrivals" style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#D4AF37", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                View All <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
              {newArrivals.slice(0,8).map((p,i) => (
                <HomeProductCard key={p.id} product={p} index={i} isNew isCustomer={isCustomer} isLoggedIn={isLoggedIn} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER ── */}
      <footer style={{ padding: "60px 28px", background: "#1A1A2E", borderTop: "1px solid rgba(212,175,55,0.1)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 40 }}>
            <div>
              <h3 style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 700, color: "#FFFFF0", marginBottom: 4 }}>
                Sri Aboorva <span style={{ color: "#D4AF37" }}>Silks</span>
              </h3>
              <div style={{ width: 40, height: 1, background: "#D4AF37", margin: "10px 0 16px" }} />
              <p style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,240,0.5)", maxWidth: 340 }}>
                Your one-stop destination for the finest clothing — sarees, kurtis, shawls, men's wear,
                children's collection and more. Quality and tradition, for every occasion.
              </p>
            </div>
            <div>
              <h4 style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 16 }}>Quick Links</h4>
              {[
                { label: "New Arrivals", to: "/new-arrivals" },
                { label: "Women",        to: "/women"        },
                { label: "Men",          to: "/men"          },
                { label: "Kids",         to: "/kids"         },
                { label: "About Us",     to: "/about"        },
              ].map(item => (
                <Link key={item.label} to={item.to}
                  style={{ display: "block", fontFamily: SANS, fontSize: 14, padding: "5px 0", color: "rgba(255,255,240,0.5)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#D4AF37"}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,240,0.5)"}>
                  {item.label}
                </Link>
              ))}
            </div>
            <div>
              <h4 style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 16 }}>Account</h4>
              {["My Profile", "My Orders", "Wishlist", "Cart"].map(item => (
                <button key={item}
                  onClick={() => goProtected(`/${item.toLowerCase().replace(" ","-")}`)}
                  style={{ display: "block", fontFamily: SANS, fontSize: 14, padding: "5px 0", color: "rgba(255,255,240,0.5)", background: "none", border: "none", cursor: "pointer", textAlign: "left", transition: "color 0.2s", width: "100%" }}
                  onMouseEnter={e => e.target.style.color = "#D4AF37"}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,240,0.5)"}>
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(212,175,55,0.1)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontFamily: SANS, fontSize: 12, color: "rgba(255,255,240,0.3)" }}>© 2026 Sri Aboorva Silk House. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .cat-card:hover .cat-card-img  { transform: scale(1.05) !important; }
        .cat-card:hover .cat-card-tint { opacity: 0.18 !important; }
        .cat-card:hover .cat-card-line { width: 100% !important; }
        .home-pcard:hover .home-pcard-img  { transform: scale(1.05) !important; }
        .home-pcard:hover .home-pcard-bar  { transform: translateY(0) !important; }
        @media (max-width: 768px) {
          .home-grid-2 { grid-template-columns: 1fr !important; }
          .home-grid-3 { grid-template-columns: 1fr !important; }
          .home-grid-4 { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </div>
  );
}

// ── Product card used only on home page ──────────────────────────────────────
function HomeProductCard({ product, index, isNew, isCustomer, isLoggedIn }) {
  const navigate = useNavigate();
  const [cartAdded,  setCartAdded]  = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const handleCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedIn) { navigate("/login"); return; }
    if (!isCustomer) return;
    try {
      await cartAPI.addToCart(product.id, 1);
      setCartAdded(true);
      setTimeout(() => setCartAdded(false), 2200);
    } catch (err) { console.error(err); }
  };

  const handleWish = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedIn) { navigate("/login"); return; }
    if (!isCustomer) return;
    try {
      const res = await wishlistAPI.toggle(product.id);
      setWishlisted(res.wishlisted);
    } catch (err) { console.error(err); }
  };

  const disc = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product.discountPercent || 0;

  return (
    <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: index*0.07 }}
      className="home-pcard"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/product/${product.id}`)}>
      <div style={{ position:"relative", overflow:"hidden", aspectRatio:"3/4", marginBottom:12, background:"#f0ebe3" }}>
        {product.imageUrl
          ? <img src={product.imageUrl} alt={product.name} className="home-pcard-img"
              style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.5s" }} />
          : <div style={{ width:"100%", height:"100%", background:"linear-gradient(135deg,#1A1A2E,#2d2d4e)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <div style={{ width:36, height:36, opacity:0.2, background:"#D4AF37", clipPath:"polygon(50% 0%,100% 50%,50% 100%,0% 50%)" }} />
            </div>
        }
        {/* Badges */}
        <div style={{ position:"absolute", top:10, left:10, display:"flex", flexDirection:"column", gap:4 }}>
          {isNew  && <span style={{ background:"#D4AF37", color:"#1A1A2E", fontFamily:SANS, fontSize:11, fontWeight:700, padding:"3px 8px" }}>NEW</span>}
          {disc>0 && <span style={{ background:"#800000", color:"#FFFFF0", fontFamily:SANS, fontSize:11, fontWeight:700, padding:"3px 8px" }}>{disc}% OFF</span>}
        </div>
        {/* Hover action bar */}
        <div className="home-pcard-bar"
          style={{ position:"absolute", bottom:0, left:0, right:0, padding:"10px 12px", background:"rgba(17,17,17,0.88)", display:"flex", gap:8, transform:"translateY(100%)", transition:"transform 0.28s ease" }}>
          <button onClick={handleCart}
            style={{ flex:1, padding:"10px 0", fontFamily:SANS, fontSize:12, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", background: cartAdded?"#16a34a":"#800000", color:"white", border:"none", cursor:"pointer", borderRadius:3, transition:"background 0.2s" }}>
            {cartAdded ? "✓ Added!" : "Add to Cart"}
          </button>
          <button onClick={handleWish}
            style={{ width:40, background:"transparent", border:"1px solid rgba(212,175,55,0.5)", color:wishlisted?"#ef4444":"#D4AF37", cursor:"pointer", borderRadius:3, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill={wishlisted?"currentColor":"none"} stroke="currentColor" strokeWidth="1.8">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>
      </div>
      {/* Info */}
      <p style={{ fontFamily:SANS, fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#800000", marginBottom:4 }}>
        {product.category?.name || product.categoryName || ""}
      </p>
      <h3 style={{ fontFamily:SANS, fontSize:15, fontWeight:600, color:"#111827", marginBottom:8, overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis" }}>{product.name}</h3>
      <div style={{ display:"flex", alignItems:"baseline", gap:8 }}>
        <span style={{ fontFamily:SANS, fontSize:17, fontWeight:800, color:"#111827" }}>₹{Number(product.price).toLocaleString("en-IN")}</span>
        {product.originalPrice && product.originalPrice > product.price && (
          <span style={{ fontFamily:SANS, fontSize:13, color:"#9ca3af", textDecoration:"line-through" }}>₹{Number(product.originalPrice).toLocaleString("en-IN")}</span>
        )}
        {disc>0 && <span style={{ fontFamily:SANS, fontSize:12, fontWeight:700, color:"#16a34a" }}>{disc}% off</span>}
      </div>
    </motion.div>
  );
}

function EmptyState({ msg }) {
  return (
    <div style={{ textAlign:"center", padding:"60px 20px", gridColumn:"1/-1" }}>
      <div style={{ width:48, height:48, margin:"0 auto 16px", opacity:0.15, background:"#1A1A2E", clipPath:"polygon(50% 0%,100% 50%,50% 100%,0% 50%)" }} />
      <p style={{ fontFamily:SANS, fontSize:16, color:"#6b7280" }}>{msg}</p>
    </div>
  );
}