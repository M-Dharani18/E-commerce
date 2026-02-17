import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { productAPI } from "../api";

// Fallback placeholder when no image
const PlaceholderImage = ({ text }) => (
  <div className="w-full h-full flex items-center justify-center"
    style={{ background: "linear-gradient(135deg, #1A1A2E 0%, #2d2d4e 100%)" }}>
    <div className="text-center p-4">
      <div className="w-12 h-12 mx-auto mb-2 opacity-30"
        style={{ background: "#D4AF37", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
      <p className="text-xs tracking-widest uppercase opacity-40" style={{ color: "#D4AF37" }}>{text}</p>
    </div>
  </div>
);

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, featured, products] = await Promise.allSettled([
          productAPI.getAllCategories(),
          productAPI.getFeaturedProducts(),
          productAPI.getAllProducts({ sort: "newest", limit: 8 }),
        ]);
        if (cats.status === "fulfilled") setCategories(cats.value);
        if (featured.status === "fulfilled") setFeaturedProducts(featured.value);
        if (products.status === "fulfilled") setNewArrivals(products.value?.content || products.value || []);
      } catch (err) {
        console.error("Failed to load home data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleProtectedAction = (action) => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: window.location.pathname } });
    } else {
      action();
    }
  };

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', serif", background: "#FFFFF0", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "#1A1A2E", paddingTop: "80px" }}>

        {/* Background grid */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 50%)`,
            backgroundSize: "40px 40px"
          }}
        />
        {/* Gold radial glow */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(212,175,55,0.1) 0%, transparent 70%)" }}
        />
        {/* Decorative circle */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5 translate-x-1/2"
          style={{ border: "60px solid #D4AF37" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left text */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="text-xs tracking-[0.5em] uppercase mb-4"
                style={{ color: "#D4AF37" }}
              >
                Heritage · Craftsmanship · Elegance
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="text-5xl lg:text-7xl font-bold leading-tight mb-6"
                style={{ color: "#FFFFF0" }}
              >
                Draped in<br />
                <span style={{ color: "#D4AF37" }}>Pure Silk</span><br />
                Tradition
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 0.5 }}
                className="w-20 h-px mb-6"
                style={{ background: "#D4AF37", transformOrigin: "left" }}
              />

              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                className="text-lg leading-relaxed mb-10 max-w-md"
                style={{ color: "rgba(255,255,240,0.65)" }}
              >
                Discover our exquisite collection of handwoven silks, each piece a testament to generations of artisanal mastery.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/products"
                  className="px-8 py-4 text-sm tracking-[0.3em] uppercase font-semibold transition-all"
                  style={{ background: "#800000", color: "#FFFFF0" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#900000"}
                  onMouseLeave={e => e.currentTarget.style.background = "#800000"}
                >
                  Explore Collections
                </Link>
                <Link to="/products?featured=true"
                  className="px-8 py-4 text-sm tracking-[0.3em] uppercase font-semibold transition-all"
                  style={{ border: "1px solid rgba(212,175,55,0.5)", color: "#D4AF37" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(212,175,55,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                >
                  New Arrivals
                </Link>
              </motion.div>
            </div>

            {/* Right — decorative stat cards */}
            <motion.div
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
              className="hidden lg:grid grid-cols-2 gap-4"
            >
              {[
                { number: "500+", label: "Silk Varieties" },
                { number: "25+", label: "Years of Heritage" },
                { number: "10K+", label: "Happy Customers" },
                { number: "100%", label: "Handwoven" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="p-6 text-center"
                  style={{
                    border: "1px solid rgba(212,175,55,0.15)",
                    background: "rgba(212,175,55,0.04)"
                  }}
                >
                  <div className="text-3xl font-bold mb-1" style={{ color: "#D4AF37" }}>{stat.number}</div>
                  <div className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,240,0.5)" }}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "rgba(212,175,55,0.5)" }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8" style={{ background: "linear-gradient(to bottom, #D4AF37, transparent)" }}
          />
        </motion.div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="py-24 px-6" style={{ background: "#FFFFF0" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#D4AF37" }}>Browse By</p>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: "#1A1A2E" }}>Collections</h2>
            <div className="w-16 h-px mx-auto" style={{ background: "#D4AF37" }} />
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square animate-pulse"
                  style={{ background: "rgba(26,26,46,0.06)" }} />
              ))}
            </div>
          ) : categories.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={`/products?category=${cat.id}`}
                    className="block relative overflow-hidden group aspect-square"
                  >
                    <div className="w-full h-full">
                      {cat.imageUrl ? (
                        <img src={cat.imageUrl} alt={cat.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      ) : (
                        <PlaceholderImage text={cat.name} />
                      )}
                    </div>
                    {/* Overlay */}
                    <div className="absolute inset-0 transition-all duration-300"
                      style={{ background: "linear-gradient(to top, rgba(26,26,46,0.85) 0%, rgba(26,26,46,0.2) 60%, transparent 100%)" }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-lg font-bold mb-1" style={{ color: "#FFFFF0" }}>{cat.name}</h3>
                      <p className="text-xs tracking-widest uppercase flex items-center gap-1 transition-all duration-300 group-hover:gap-3"
                        style={{ color: "#D4AF37" }}>
                        Explore
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </p>
                    </div>
                    {/* Gold border on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ border: "2px solid rgba(212,175,55,0.5)" }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Empty state - admin needs to add categories */
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 opacity-20"
                style={{ background: "#D4AF37", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
              <p className="text-lg mb-2" style={{ color: "#36454F" }}>No categories yet</p>
              <p className="text-sm" style={{ color: "rgba(54,69,79,0.6)" }}>
                Categories added by admin will appear here
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── MARQUEE STRIP ── */}
      <div className="py-4 overflow-hidden" style={{ background: "#1A1A2E" }}>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex gap-12 whitespace-nowrap"
        >
          {[...Array(8)].map((_, i) => (
            <span key={i} className="flex items-center gap-6 text-xs tracking-[0.4em] uppercase"
              style={{ color: "rgba(212,175,55,0.6)" }}>
              Kanjivaram Silks
              <span style={{ color: "rgba(212,175,55,0.3)" }}>◆</span>
              Pure Zari Work
              <span style={{ color: "rgba(212,175,55,0.3)" }}>◆</span>
              Handwoven Heritage
              <span style={{ color: "rgba(212,175,55,0.3)" }}>◆</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-24 px-6" style={{ background: "#FFFFF0" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="flex items-end justify-between mb-16">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#D4AF37" }}>Curated For You</p>
              <h2 className="text-4xl lg:text-5xl font-bold" style={{ color: "#1A1A2E" }}>Featured Pieces</h2>
            </div>
            <Link to="/products" className="hidden lg:flex items-center gap-2 text-sm tracking-widest uppercase transition-colors"
              style={{ color: "#D4AF37" }}>
              View All
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] mb-3" style={{ background: "rgba(26,26,46,0.06)" }} />
                  <div className="h-4 mb-2 w-3/4" style={{ background: "rgba(26,26,46,0.06)" }} />
                  <div className="h-3 w-1/2" style={{ background: "rgba(26,26,46,0.06)" }} />
                </div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 8).map((product, i) => (
                <ProductCard key={product.id} product={product} index={i}
                  onProtectedAction={handleProtectedAction} />
              ))}
            </div>
          ) : (
            <EmptyProductState message="Featured products added by admin will appear here" />
          )}
        </div>
      </section>

      {/* ── HERITAGE BANNER ── */}
      <motion.section {...fadeUp}
        className="relative py-24 px-6 overflow-hidden"
        style={{ background: "#1A1A2E" }}
      >
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(-45deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 50%)`,
            backgroundSize: "40px 40px"
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: "#D4AF37" }}>Our Promise</p>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: "#FFFFF0" }}>
            Every Thread Tells a<br />
            <span style={{ color: "#D4AF37" }}>Story of Tradition</span>
          </h2>
          <div className="w-16 h-px mx-auto mb-8" style={{ background: "#D4AF37" }} />
          <p className="text-lg leading-relaxed mb-10" style={{ color: "rgba(255,255,240,0.65)" }}>
            Each saree in our collection is handpicked from master weavers across India, carrying the legacy of centuries-old techniques passed down through generations.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {["100% Authentic", "Direct from Weavers", "Quality Guaranteed"].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4 h-px" style={{ background: "#D4AF37" }} />
                <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,240,0.6)" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── NEW ARRIVALS ── */}
      {newArrivals.length > 0 && (
        <section className="py-24 px-6" style={{ background: "#FFFFF0" }}>
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeUp} className="flex items-end justify-between mb-16">
              <div>
                <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#D4AF37" }}>Just In</p>
                <h2 className="text-4xl lg:text-5xl font-bold" style={{ color: "#1A1A2E" }}>New Arrivals</h2>
              </div>
              <Link to="/products?sort=newest" className="hidden lg:flex items-center gap-2 text-sm tracking-widest uppercase"
                style={{ color: "#D4AF37" }}>
                View All <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </motion.div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.slice(0, 8).map((product, i) => (
                <ProductCard key={product.id} product={product} index={i}
                  onProtectedAction={handleProtectedAction} isNew />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER ── */}
      <footer className="py-16 px-6" style={{ background: "#1A1A2E", borderTop: "1px solid rgba(212,175,55,0.1)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-12 mb-12">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-2" style={{ color: "#FFFFF0" }}>
                Sri Aboorva <span style={{ color: "#D4AF37" }}>Silks</span>
              </h3>
              <div className="w-12 h-px mb-4" style={{ background: "#D4AF37" }} />
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,240,0.5)" }}>
                Purveyors of the finest handwoven silks, bringing the heritage of Indian textile craftsmanship to your doorstep.
              </p>
            </div>
            <div>
              <h4 className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#D4AF37" }}>Quick Links</h4>
              {["Collections", "New Arrivals", "About Us", "Contact"].map(item => (
                <Link key={item} to={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="block text-sm py-1.5 transition-colors"
                  style={{ color: "rgba(255,255,240,0.5)" }}
                  onMouseEnter={e => e.target.style.color = "#D4AF37"}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,240,0.5)"}
                >
                  {item}
                </Link>
              ))}
            </div>
            <div>
              <h4 className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#D4AF37" }}>Account</h4>
              {["My Profile", "My Orders", "Wishlist", "Cart"].map(item => (
                <button key={item}
                  onClick={() => handleProtectedAction(() => navigate(`/${item.toLowerCase().replace(" ", "-")}`))}
                  className="block text-sm py-1.5 transition-colors text-left"
                  style={{ color: "rgba(255,255,240,0.5)" }}
                  onMouseEnter={e => e.target.style.color = "#D4AF37"}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,240,0.5)"}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-4"
            style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}>
            <p className="text-xs tracking-wide" style={{ color: "rgba(255,255,240,0.3)" }}>
              © 2026 Sri Aboorva Silk House. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-px" style={{
                  width: i === 1 ? "32px" : "12px",
                  background: i === 1 ? "#D4AF37" : "rgba(212,175,55,0.3)"
                }} />
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap');`}</style>
    </div>
  );
}

// ── Product Card Component ──
function ProductCard({ product, index, onProtectedAction, isNew = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group"
    >
      <div className="relative overflow-hidden aspect-[3/4] mb-3">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <PlaceholderImage text={product.name} />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {isNew && (
            <span className="px-2 py-0.5 text-xs tracking-widest uppercase"
              style={{ background: "#D4AF37", color: "#1A1A2E" }}>New</span>
          )}
          {product.discountPercent > 0 && (
            <span className="px-2 py-0.5 text-xs tracking-widest uppercase"
              style={{ background: "#800000", color: "#FFFFF0" }}>-{product.discountPercent}%</span>
          )}
        </div>

        {/* Hover actions */}
        <div className="absolute inset-x-0 bottom-0 p-3 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
          style={{ background: "linear-gradient(to top, rgba(26,26,46,0.95), transparent)" }}>
          <button
            onClick={() => onProtectedAction(() => console.log("add to cart", product.id))}
            className="flex-1 py-2 text-xs tracking-widest uppercase transition-all"
            style={{ background: "#800000", color: "#FFFFF0" }}
          >
            Add to Cart
          </button>
          <button
            onClick={() => onProtectedAction(() => console.log("wishlist", product.id))}
            className="w-9 h-9 flex items-center justify-center transition-all flex-shrink-0"
            style={{ border: "1px solid rgba(212,175,55,0.5)", color: "#D4AF37" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Product info */}
      <Link to={`/products/${product.id}`}>
        <h3 className="text-base font-semibold mb-1 transition-colors group-hover:text-amber-600"
          style={{ color: "#1A1A2E" }}>
          {product.name}
        </h3>
      </Link>
      {product.categoryName && (
        <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "#D4AF37" }}>
          {product.categoryName}
        </p>
      )}
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold" style={{ color: "#1A1A2E" }}>
          ₹{product.price?.toLocaleString("en-IN")}
        </span>
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="text-sm line-through" style={{ color: "rgba(54,69,79,0.4)" }}>
            ₹{product.originalPrice?.toLocaleString("en-IN")}
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ── Empty State ──
function EmptyProductState({ message }) {
  return (
    <div className="text-center py-20 col-span-4">
      <div className="w-16 h-16 mx-auto mb-4 opacity-20"
        style={{ background: "#1A1A2E", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
      <p className="text-lg mb-2" style={{ color: "#36454F" }}>Nothing here yet</p>
      <p className="text-sm" style={{ color: "rgba(54,69,79,0.5)" }}>{message}</p>
    </div>
  );
}