import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cartAPI, wishlistAPI } from "../api";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const userMenuRef = useRef(null);
  const searchRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isLoggedIn = !!localStorage.getItem("token");
  // Only CUSTOMER role can call cart/wishlist endpoints
  const isCustomer = isLoggedIn && user?.role === "CUSTOMER";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [location]);

  // Only fetch counts for CUSTOMER role
  useEffect(() => {
    if (!isCustomer) { setCartCount(0); setWishlistCount(0); return; }
    const fetchCounts = async () => {
      try {
        const [c, w] = await Promise.allSettled([cartAPI.getCount(), wishlistAPI.getCount()]);
        if (c.status === "fulfilled") setCartCount(c.value ?? 0);
        if (w.status === "fulfilled") setWishlistCount(w.value ?? 0);
      } catch (e) { /* silent */ }
    };
    fetchCounts();
  }, [location.pathname, isCustomer]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserMenuOpen(false);
    setCartCount(0);
    setWishlistCount(0);
    navigate("/");
  };

  const handleProtectedNav = (path) => {
    if (!isLoggedIn) navigate("/login", { state: { from: path } });
    else navigate(path);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { label: "Home",         path: "/" },
    { label: "New Arrivals", path: "/new-arrivals" },
    { label: "Women",        path: "/women" },
    { label: "Men",          path: "/men" },
    { label: "Kids",         path: "/kids" },
    { label: "About",        path: "/about" },
  ];

  const isActive = (path) => path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const Badge = ({ count }) => count > 0 ? (
    <span style={{ position: "absolute", top: 2, right: 2, width: 16, height: 16, borderRadius: "50%", background: "#800000", color: "#FFFFF0", fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
      {count > 9 ? "9+" : count}
    </span>
  ) : null;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: scrolled ? "rgba(26,26,46,0.97)" : "#1A1A2E",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: "1px solid rgba(212,175,55,0.12)",
          fontFamily: "'Inter', system-ui, sans-serif",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
          transition: "all 0.3s",
        }}
      >
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none", display: "flex", flexDirection: "column", lineHeight: 1.1, fontFamily: "'Cormorant Garamond', serif" }}>
            <span style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#D4AF37" }}>Sri</span>
            <span style={{ fontSize: 22, fontWeight: 700, color: "#FFFFF0" }}>Aboorva <span style={{ color: "#D4AF37" }}>Silks</span></span>
          </Link>

          {/* Desktop nav */}
          <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="desktop-nav">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path}
                style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none", color: isActive(link.path) ? "#D4AF37" : "rgba(255,255,240,0.7)", position: "relative", paddingBottom: 3, transition: "color 0.2s" }}
                onMouseEnter={e => { if (!isActive(link.path)) e.currentTarget.style.color = "#FFFFF0"; }}
                onMouseLeave={e => { if (!isActive(link.path)) e.currentTarget.style.color = "rgba(255,255,240,0.7)"; }}
              >
                {link.label}
                <span style={{ position: "absolute", bottom: 0, left: 0, height: 1, background: "#D4AF37", width: isActive(link.path) ? "100%" : "0", transition: "width 0.3s" }} />
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>

            {/* Search */}
            <div ref={searchRef} style={{ position: "relative" }}>
              <button onClick={() => setSearchOpen(!searchOpen)}
                style={{ width: 38, height: 38, background: "transparent", border: "none", cursor: "pointer", color: searchOpen ? "#D4AF37" : "rgba(255,255,240,0.6)", display: "flex", alignItems: "center", justifyContent: "center", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#D4AF37"}
                onMouseLeave={e => { if (!searchOpen) e.currentTarget.style.color = "rgba(255,255,240,0.6)"; }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              </button>
              <AnimatePresence>
                {searchOpen && (
                  <motion.div initial={{ opacity: 0, y: -8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.96 }} transition={{ duration: 0.15 }}
                    style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", width: 300, background: "#1A1A2E", border: "1px solid rgba(212,175,55,0.2)", padding: 12, zIndex: 100 }}>
                    <form onSubmit={handleSearch} style={{ display: "flex" }}>
                      <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search silk sarees, fabric..."
                        autoFocus
                        style={{ flex: 1, padding: "10px 14px", background: "rgba(255,255,240,0.06)", border: "1px solid rgba(212,175,55,0.2)", borderRight: "none", color: "#FFFFF0", fontSize: 14, outline: "none", fontFamily: "inherit" }} />
                      <button type="submit" style={{ padding: "10px 16px", background: "#800000", color: "#FFFFF0", border: "none", cursor: "pointer", fontFamily: "inherit" }}>Go</button>
                    </form>
                    <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {["Kanjivaram", "Banarasi", "Patola", "Pure Silk"].map(s => (
                        <button key={s} onClick={() => { navigate(`/search?q=${encodeURIComponent(s)}`); setSearchOpen(false); }}
                          style={{ padding: "4px 10px", background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.15)", color: "rgba(255,255,240,0.6)", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist — only show interactive badge for CUSTOMER */}
            <button onClick={() => handleProtectedNav("/wishlist")}
              style={{ width: 38, height: 38, background: "transparent", border: "none", cursor: "pointer", color: "rgba(255,255,240,0.6)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#D4AF37"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,240,0.6)"}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <Badge count={wishlistCount} />
            </button>

            {/* Cart */}
            <button onClick={() => handleProtectedNav("/cart")}
              style={{ width: 38, height: 38, background: "transparent", border: "none", cursor: "pointer", color: "rgba(255,255,240,0.6)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#D4AF37"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,240,0.6)"}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <Badge count={cartCount} />
            </button>

            {/* Auth */}
            {isLoggedIn ? (
              <div style={{ position: "relative", marginLeft: 6 }} ref={userMenuRef}>
                <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", background: "transparent", border: "1px solid rgba(212,175,55,0.3)", cursor: "pointer", color: "#D4AF37", fontFamily: "inherit" }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(212,175,55,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#D4AF37" }}>
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <span style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>{user?.name?.split(" ")[0]}</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}
                      style={{ position: "absolute", right: 0, top: "calc(100% + 6px)", width: 200, background: "#1A1A2E", border: "1px solid rgba(212,175,55,0.2)", padding: "6px 0", zIndex: 100 }}>
                      {user?.role === "ADMIN" && <MenuItem to="/admin/dashboard" icon="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" label="Admin Panel" gold />}
                      <MenuItem to="/profile" icon="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" label="My Profile" />
                      {isCustomer && <MenuItem to="/wishlist" icon="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" label="Wishlist" />}
                      <MenuItem to="/orders" icon="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6" label="My Orders" />
                      <div style={{ margin: "4px 16px", height: 1, background: "rgba(212,175,55,0.12)" }} />
                      <button onClick={handleLogout}
                        style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", background: "none", border: "none", cursor: "pointer", color: "#800000", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "inherit" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 6 }}>
                <Link to="/login" style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,240,0.7)", textDecoration: "none", padding: "6px 12px" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#D4AF37"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,240,0.7)"}>Sign In</Link>
                <Link to="/signup" style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "#FFFFF0", textDecoration: "none", padding: "8px 18px", background: "#800000" }}>Join Us</Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="mob-btn"
              style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 4, marginLeft: 8 }}>
              <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }} style={{ display: "block", width: 22, height: 1, background: "#D4AF37" }} />
              <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} style={{ display: "block", width: 22, height: 1, background: "#D4AF37" }} />
              <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} style={{ display: "block", width: 22, height: 1, background: "#D4AF37" }} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              style={{ overflow: "hidden", borderTop: "1px solid rgba(212,175,55,0.1)" }}>
              <div style={{ padding: "16px 24px" }}>
                {navLinks.map((link, i) => (
                  <motion.div key={link.path} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link to={link.path} style={{ display: "block", padding: "12px 0", fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: isActive(link.path) ? "#D4AF37" : "rgba(255,255,240,0.7)", textDecoration: "none", borderBottom: "1px solid rgba(212,175,55,0.06)" }}>
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <form onSubmit={handleSearch} style={{ display: "flex", marginTop: 16 }}>
                  <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search..."
                    style={{ flex: 1, padding: "10px 14px", background: "rgba(255,255,240,0.06)", border: "1px solid rgba(212,175,55,0.2)", borderRight: "none", color: "#FFFFF0", fontSize: 14, outline: "none", fontFamily: "inherit" }} />
                  <button type="submit" style={{ padding: "10px 14px", background: "#800000", color: "#FFFFF0", border: "none", cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  </button>
                </form>
                {isCustomer && (
                  <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                    <button onClick={() => handleProtectedNav("/wishlist")} style={{ flex: 1, padding: "10px", border: "1px solid rgba(212,175,55,0.3)", background: "transparent", color: "#D4AF37", cursor: "pointer", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "inherit" }}>
                      Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
                    </button>
                    <button onClick={() => handleProtectedNav("/cart")} style={{ flex: 1, padding: "10px", background: "#800000", border: "none", color: "#FFFFF0", cursor: "pointer", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "inherit" }}>
                      Cart {cartCount > 0 && `(${cartCount})`}
                    </button>
                  </div>
                )}
                {!isLoggedIn && (
                  <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                    <Link to="/login" style={{ flex: 1, padding: "10px", border: "1px solid rgba(255,255,240,0.2)", color: "rgba(255,255,240,0.7)", textDecoration: "none", textAlign: "center", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>Sign In</Link>
                    <Link to="/signup" style={{ flex: 1, padding: "10px", background: "#800000", color: "#FFFFF0", textDecoration: "none", textAlign: "center", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>Join Us</Link>
                  </div>
                )}
                {isLoggedIn && <button onClick={handleLogout} style={{ width: "100%", marginTop: 10, padding: "10px", border: "1px solid rgba(128,0,0,0.3)", background: "transparent", color: "#800000", cursor: "pointer", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "inherit" }}>Sign Out</button>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        * { box-sizing: border-box; }
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mob-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}

function MenuItem({ to, icon, label, gold }) {
  return (
    <Link to={to}
      style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", textDecoration: "none", color: gold ? "#D4AF37" : "rgba(255,255,240,0.65)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}
      onMouseEnter={e => e.currentTarget.style.background = "rgba(212,175,55,0.07)"}
      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={icon}/></svg>
      {label}
    </Link>
  );
}