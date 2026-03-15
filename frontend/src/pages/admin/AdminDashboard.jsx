
import { useState, useEffect, createContext, useContext } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AdminCategories from "./AdminCategories";
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrders";
import { adminAPI } from "../../api";
import AdminInvoices from "./AdminInvoices";

/* ─── THEME TOKENS ──────────────────────────────────────────────────────────*/
const DARK = {
  mode:"dark",
  bg:"#080810", surface:"#0f0f1a", card:"#13131f", cardAlt:"#16162a",
  border:"rgba(255,255,255,0.07)", borderHi:"rgba(212,175,55,0.3)",
  inputBg:"#0a0a14", inputBorder:"rgba(255,255,255,0.1)", inputFocus:"rgba(212,175,55,0.45)",
  text:"#F0EEE8", textSec:"#C8C4BC", muted:"rgba(240,238,232,0.5)", dim:"rgba(240,238,232,0.26)",
  gold:"#D4AF37", goldDim:"rgba(212,175,55,0.65)",
  maroon:"#800000",
  danger:"#f87171", dangerBg:"rgba(248,113,113,0.1)", dangerBorder:"rgba(248,113,113,0.25)",
  green:"#34D399", greenBg:"rgba(52,211,153,0.1)", greenBorder:"rgba(52,211,153,0.25)",
  blue:"#60A5FA", blueBg:"rgba(96,165,250,0.1)", blueBorder:"rgba(96,165,250,0.25)",
  amber:"#FBBF24", amberBg:"rgba(251,191,36,0.1)", amberBorder:"rgba(251,191,36,0.25)",
  purple:"#A78BFA",
  hoverBg:"rgba(255,255,255,0.05)",
  navActive:"rgba(212,175,55,0.12)", navActiveTx:"#D4AF37", navActiveBd:"#D4AF37",
  soonBg:"rgba(212,175,55,0.08)", soonTx:"rgba(212,175,55,0.65)",
  userBg:"rgba(255,255,255,0.04)",
  scrollTrack:"#080810", scrollThumb:"rgba(212,175,55,0.18)",
  placeholderTx:"rgba(240,238,232,0.22)", selectBg:"#0a0a14",
  actionCardBg:"rgba(255,255,255,0.03)", ringTrack:"rgba(255,255,255,0.06)",
  shadow:"none", shadowMd:"0 8px 24px rgba(0,0,0,0.4)",
  topbarBg:"rgba(15,15,26,0.95)", statBorder:"rgba(255,255,255,0.07)",
  tableBorder:"rgba(255,255,255,0.07)", tableRowHover:"rgba(255,255,255,0.03)",
  badgePill:"rgba(255,255,255,0.06)",
};
const LIGHT = {
  mode:"light",
  bg:"#ECEAE4", surface:"#FFFFFF", card:"#FFFFFF", cardAlt:"#F9F7F4",
  border:"#D1CBC0", borderHi:"#800000",
  inputBg:"#FFFFFF", inputBorder:"#B5AFA8", inputFocus:"#800000",
  text:"#111827", textSec:"#374151", muted:"#6B7280", dim:"#9CA3AF",
  gold:"#7A5C0A", goldDim:"#A07820",
  maroon:"#800000",
  danger:"#B91C1C", dangerBg:"#FEF2F2", dangerBorder:"#FECACA",
  green:"#15803D", greenBg:"#F0FDF4", greenBorder:"#BBF7D0",
  blue:"#1D4ED8", blueBg:"#EFF6FF", blueBorder:"#BFDBFE",
  amber:"#92400E", amberBg:"#FFFBEB", amberBorder:"#FDE68A",
  purple:"#6D28D9",
  hoverBg:"#F5F3F0",
  navActive:"#FFF1F1", navActiveTx:"#800000", navActiveBd:"#800000",
  soonBg:"#FFF7ED", soonTx:"#92400E",
  userBg:"#F9F7F4",
  scrollTrack:"#ECEAE4", scrollThumb:"#C4B9AD",
  placeholderTx:"#9CA3AF", selectBg:"#FFFFFF",
  actionCardBg:"#F9F7F4", ringTrack:"#E5E0D8",
  shadow:"0 1px 3px rgba(0,0,0,0.08),0 1px 2px rgba(0,0,0,0.05)",
  shadowMd:"0 4px 16px rgba(0,0,0,0.10)",
  topbarBg:"rgba(255,255,255,0.97)", statBorder:"#E5E0D8",
  tableBorder:"#E5E0D8", tableRowHover:"#F9F7F4",
  badgePill:"#F5F3F0",
};

export const ThemeCtx = createContext({ T: DARK, theme:"dark", setTheme:()=>{} });
export const useAdminTheme = () => useContext(ThemeCtx);

const SERIF = "'Cormorant Garamond', Georgia, serif";
const SANS  = "'DM Sans', 'Segoe UI', system-ui, sans-serif";

const NAV = [
  { section:"OVERVIEW", items:[
    { path:"/admin/dashboard", label:"Dashboard",
      icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
  ]},
  { section:"CATALOG", items:[
    { path:"/admin/categories", label:"Categories",
      icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg> },
    { path:"/admin/products", label:"Products",
      icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg> },
  ]},
  { section:"OPERATIONS", items:[
    { path:"/admin/orders", label:"Orders",
      icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg> },
    { path:"/admin/invoices", label:"Invoices",
      icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>},
    { path:"/admin/transactions", label:"Transactions",
      icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>, soon:true },
  ]},
  { section:"PEOPLE", items:[
    { path:"/admin/customers", label:"Customers",
      icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zm13 10v-2a4 4 0 00-3-3.87"/></svg>, soon:true },
    { path:"/admin/reviews", label:"Reviews",
      icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>, soon:true },
  ]},
];

function Counter({ to }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!to) return;
    let v = 0; const step = to / 45;
    const id = setInterval(() => { v += step; if (v >= to) { setVal(to); clearInterval(id); } else setVal(Math.floor(v)); }, 16);
    return () => clearInterval(id);
  }, [to]);
  return <>{val}</>;
}

function Ring({ pct, color, size=58, stroke=6 }) {
  const { T } = useAdminTheme();
  const r = (size - stroke) / 2, circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ transform:"rotate(-90deg)", flexShrink:0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={T.ringTrack} strokeWidth={stroke}/>
      <motion.circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeLinecap="round" strokeDasharray={circ}
        initial={{ strokeDashoffset:circ }} animate={{ strokeDashoffset: circ-(pct/100)*circ }}
        transition={{ duration:1.4, ease:"easeOut" }}/>
    </svg>
  );
}

function ThemeToggle() {
  const { T, theme, setTheme } = useAdminTheme();
  return (
    <div style={{ display:"flex", alignItems:"center", padding:3,
      background:theme==="dark"?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.06)",
      border:`1px solid ${T.border}`, borderRadius:10, gap:2 }}>
      <button onClick={()=>setTheme("light")} title="Light mode"
        style={{ width:32, height:28, display:"flex", alignItems:"center", justifyContent:"center",
          border:"none", borderRadius:7, cursor:"pointer", transition:"all 0.2s",
          background:theme==="light"?"#FFFFFF":"transparent",
          color:theme==="light"?"#7A5C0A":T.dim,
          boxShadow:theme==="light"?"0 1px 4px rgba(0,0,0,0.14)":"none" }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      </button>
      <button onClick={()=>setTheme("dark")} title="Dark mode"
        style={{ width:32, height:28, display:"flex", alignItems:"center", justifyContent:"center",
          border:"none", borderRadius:7, cursor:"pointer", transition:"all 0.2s",
          background:theme==="dark"?"#1e1e30":"transparent",
          color:theme==="dark"?"#D4AF37":T.dim,
          boxShadow:theme==="dark"?"0 1px 4px rgba(0,0,0,0.4)":"none" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/>
        </svg>
      </button>
    </div>
  );
}

/* ── STATUS BADGE — exported for use in AdminOrders ─────────────────────────*/
export function StatusBadge({ status }) {
  const { T } = useAdminTheme();
  const map = {
    placed:     { bg:T.blueBg,   border:T.blueBorder,   tx:T.blue,   label:"Placed"    },
    confirmed:  { bg:T.amberBg,  border:T.amberBorder,  tx:T.amber,  label:"Confirmed" },
    packed:     { bg:T.amberBg,  border:T.amberBorder,  tx:T.amber,  label:"Packed"    },
    shipped:    { bg:T.blueBg,   border:T.blueBorder,   tx:T.blue,   label:"Shipped"   },
    delivered:  { bg:T.greenBg,  border:T.greenBorder,  tx:T.green,  label:"Delivered" },
    cancelled:  { bg:T.dangerBg, border:T.dangerBorder, tx:T.danger, label:"Cancelled" },
    returned:   { bg:T.dangerBg, border:T.dangerBorder, tx:T.danger, label:"Returned"  },
    pending:    { bg:T.amberBg,  border:T.amberBorder,  tx:T.amber,  label:"Pending"   },
    success:    { bg:T.greenBg,  border:T.greenBorder,  tx:T.green,  label:"Success"   },
    failed:     { bg:T.dangerBg, border:T.dangerBorder, tx:T.danger, label:"Failed"    },
  };
  const s = map[status?.toLowerCase()] || { bg:T.badgePill, border:T.border, tx:T.muted, label:status||"—" };
  return (
    <span style={{ padding:"3px 9px", borderRadius:20, fontSize:11, fontWeight:700,
      letterSpacing:"0.06em", textTransform:"uppercase",
      background:s.bg, border:`1px solid ${s.border}`, color:s.tx }}>
      {s.label}
    </span>
  );
}

/* ─── MAIN LAYOUT ────────────────────────────────────────────────────────────*/
export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({ totalProducts:0, totalCategories:0, featuredProducts:0, activeProducts:0, inactiveProducts:0, outOfStock:0 });
  const [theme, setThemeRaw] = useState(() => localStorage.getItem("adminTheme") || "dark");
  const location = useLocation();
  const navigate = useNavigate();
  const user     = JSON.parse(localStorage.getItem("user") || "{}");
  const T        = theme === "dark" ? DARK : LIGHT;
  const setTheme = (t) => { setThemeRaw(t); localStorage.setItem("adminTheme", t); };

  useEffect(() => {
    if (["/admin","/admin/","/admin/dashboard"].includes(location.pathname)) fetchStats();
  }, [location]);

  const fetchStats = async () => {
    try {
      const [cats, prods] = await Promise.allSettled([
        adminAPI.getAllCategories(),
        adminAPI.getAllProducts(0, 1000),
      ]);
      let s = { totalProducts:0, totalCategories:0, featuredProducts:0, activeProducts:0, inactiveProducts:0, outOfStock:0 };
      if (cats.status==="fulfilled")  s.totalCategories = cats.value.length;
      if (prods.status==="fulfilled") {
        const list = prods.value.content || prods.value || [];
        s.totalProducts    = list.length;
        s.featuredProducts = list.filter(p => p.isFeatured).length;
        s.activeProducts   = list.filter(p => p.isActive).length;
        s.inactiveProducts = list.filter(p => !p.isActive).length;
        s.outOfStock       = list.filter(p => (p.stockQuantity||0) === 0).length;
      }
      setStats(s);
    } catch(e) { console.error(e); }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const currentLabel = ["/admin","/admin/","/admin/dashboard"].includes(location.pathname)
    ? "Dashboard"
    : (NAV.flatMap(s=>s.items).find(i=>i.path===location.pathname)?.label || "Dashboard");

  const initials = (user.name||"A").split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2);
  const sidebarBg = theme==="dark" ? T.surface : "#FFFFFF";

  return (
    <ThemeCtx.Provider value={{ T, theme, setTheme }}>
      <div style={{ fontFamily:SANS, background:T.bg, minHeight:"100vh", display:"flex",
        color:T.text, transition:"background 0.3s, color 0.3s" }}>

        {/* ── SIDEBAR ── */}
        <AnimatePresence initial={false}>
          {sidebarOpen && (
            <motion.aside key="sidebar"
              initial={{ x:-244 }} animate={{ x:0 }} exit={{ x:-244 }}
              transition={{ type:"spring", stiffness:320, damping:30 }}
              style={{ width:240, flexShrink:0, position:"fixed", top:0, bottom:0, left:0, zIndex:50,
                background:sidebarBg, borderRight:`1px solid ${T.border}`,
                boxShadow:theme==="light"?"2px 0 16px rgba(0,0,0,0.08)":"none",
                overflowY:"auto", display:"flex", flexDirection:"column",
                transition:"background 0.3s" }}>

              <div style={{ padding:"20px 18px 16px", borderBottom:`1px solid ${T.border}` }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:36, height:36, background:T.maroon, borderRadius:9,
                    display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <span style={{ fontFamily:SERIF, color:"#D4AF37", fontSize:18, fontWeight:700 }}>A</span>
                  </div>
                  <div>
                    <div style={{ fontFamily:SERIF, fontSize:16, fontWeight:700, color:T.text }}>Sri Aboorva</div>
                    <div style={{ fontSize:11, color:T.muted, letterSpacing:"0.1em", textTransform:"uppercase" }}>Admin Panel</div>
                  </div>
                </div>
              </div>

              <nav style={{ flex:1, padding:"12px 10px", display:"flex", flexDirection:"column", gap:4 }}>
                {NAV.map((sec, si) => (
                  <div key={si} style={{ marginBottom:4 }}>
                    <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase",
                      color:T.dim, padding:"6px 10px 4px" }}>{sec.section}</p>
                    {sec.items.map(item => {
                      const active = location.pathname === item.path
                        || (["/admin","/admin/"].includes(location.pathname) && item.path==="/admin/dashboard");
                      return (
                        <Link key={item.path} to={item.path}
                          style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                            padding:"9px 10px", borderRadius:8, textDecoration:"none", gap:10,
                            background:active ? T.navActive : "transparent",
                            color:active ? T.navActiveTx : T.muted,
                            fontWeight:active ? 600 : 400, fontSize:14,
                            borderLeft:`2px solid ${active ? T.navActiveBd : "transparent"}`,
                            transition:"all 0.15s" }}
                          onMouseEnter={e => { if(!active){ e.currentTarget.style.background=T.hoverBg; e.currentTarget.style.color=T.text; }}}
                          onMouseLeave={e => { if(!active){ e.currentTarget.style.background="transparent"; e.currentTarget.style.color=T.muted; }}}>
                          <span style={{ display:"flex", alignItems:"center", gap:10, opacity:active?1:0.8 }}>
                            {item.icon}{item.label}
                          </span>
                          {item.soon && (
                            <span style={{ fontSize:9, padding:"2px 6px", borderRadius:4, fontWeight:700,
                              background:T.soonBg, color:T.soonTx }}>SOON</span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </nav>

              <div style={{ padding:"12px 10px", borderTop:`1px solid ${T.border}` }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px",
                  borderRadius:8, background:T.userBg, marginBottom:8, border:`1px solid ${T.border}` }}>
                  <div style={{ width:32, height:32, borderRadius:"50%", background:`${T.maroon}cc`,
                    display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <span style={{ fontSize:12, fontWeight:700, color:"#D4AF37" }}>{initials}</span>
                  </div>
                  <div style={{ overflow:"hidden" }}>
                    <p style={{ fontSize:13, fontWeight:600, color:T.text, whiteSpace:"nowrap",
                      overflow:"hidden", textOverflow:"ellipsis" }}>{user.name||"Admin"}</p>
                    <p style={{ fontSize:11, color:T.muted, whiteSpace:"nowrap",
                      overflow:"hidden", textOverflow:"ellipsis" }}>{user.email||""}</p>
                  </div>
                </div>
                <button onClick={handleLogout}
                  style={{ width:"100%", padding:"9px 10px", borderRadius:8, background:"transparent",
                    border:`1px solid ${T.dangerBorder}`, color:T.danger, fontSize:13,
                    cursor:"pointer", display:"flex", alignItems:"center", gap:8,
                    fontFamily:SANS, transition:"all 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = T.dangerBg}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
                  </svg>
                  Sign Out
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* ── MAIN ── */}
        <div style={{ flex:1, marginLeft:sidebarOpen?240:0, transition:"margin 0.25s",
          display:"flex", flexDirection:"column", minWidth:0 }}>

          <header style={{ position:"sticky", top:0, zIndex:40, height:56,
            background:T.topbarBg, backdropFilter:"blur(16px)",
            borderBottom:`1px solid ${T.border}`,
            boxShadow:theme==="light"?"0 1px 6px rgba(0,0,0,0.08)":"none",
            display:"flex", alignItems:"center", justifyContent:"space-between",
            padding:"0 24px", gap:14, transition:"background 0.3s" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <button onClick={() => setSidebarOpen(o => !o)}
                style={{ width:34, height:34, display:"flex", alignItems:"center", justifyContent:"center",
                  background:"transparent", border:`1px solid ${T.border}`, borderRadius:8,
                  cursor:"pointer", color:T.muted, transition:"all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.background=T.hoverBg; e.currentTarget.style.color=T.text; }}
                onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color=T.muted; }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="6"  x2="21" y2="6"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              </button>
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                <span style={{ fontSize:13, color:T.muted }}>Admin</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  style={{ color:T.dim }}><path d="M9 18l6-6-6-6"/></svg>
                <span style={{ fontSize:14, fontWeight:600, color:T.text }}>{currentLabel}</span>
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 12px",
                background:T.greenBg, border:`1px solid ${T.greenBorder}`, borderRadius:20 }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:T.green,
                  animation:"pulse-green 2s infinite" }}/>
                <span style={{ fontSize:12, fontWeight:600, color:T.green }}>Live</span>
              </div>
              <ThemeToggle />
              <Link to="/"
                style={{ display:"flex", alignItems:"center", gap:7, fontSize:13, fontWeight:500,
                  padding:"7px 14px", borderRadius:8, border:`1px solid ${T.borderHi}`,
                  color:theme==="dark"?T.gold:T.maroon, textDecoration:"none",
                  background:theme==="dark"?"rgba(212,175,55,0.06)":"rgba(128,0,0,0.05)",
                  transition:"all 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = theme==="dark"?"rgba(212,175,55,0.13)":"rgba(128,0,0,0.1)"}
                onMouseLeave={e => e.currentTarget.style.background = theme==="dark"?"rgba(212,175,55,0.06)":"rgba(128,0,0,0.05)"}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                </svg>
                View Store
              </Link>
            </div>
          </header>

          <main style={{ flex:1, padding:"28px" }}>
            <Routes>
              <Route path="/"             element={<DashboardHome stats={stats} />} />
              <Route path="/dashboard"    element={<DashboardHome stats={stats} />} />
              <Route path="/categories"   element={<AdminCategories />} />
              <Route path="/products"     element={<AdminProducts />} />
              <Route path="/orders"       element={<AdminOrders />} />
              <Route path="/invoices"     element={<AdminInvoices />} />
              <Route path="/transactions" element={<ComingSoon title="Transactions"      desc="Monitor UPI, COD and refund activity" />} />
              <Route path="/customers"    element={<ComingSoon title="Customers"         desc="View profiles, order history and account details" />} />
              <Route path="/reviews"      element={<ComingSoon title="Reviews & Ratings" desc="Moderate feedback and respond to customers" />} />
            </Routes>
          </main>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
          *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
          ::-webkit-scrollbar { width:4px; }
          ::-webkit-scrollbar-track { background:${T.scrollTrack}; }
          ::-webkit-scrollbar-thumb { background:${T.scrollThumb}; border-radius:2px; }
          @keyframes pulse-green { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.82)} }
          @keyframes spin { to { transform:rotate(360deg); } }
          @keyframes fadeInOut { 0%,100%{opacity:0.5} 50%{opacity:0.25} }
          input, textarea, select { font-family:'DM Sans',sans-serif; }
          input::placeholder, textarea::placeholder { color:${T.placeholderTx} !important; }
          select option { background:${T.selectBg}; color:${T.text}; }
        `}</style>
      </div>
    </ThemeCtx.Provider>
  );
}

/* ─── DASHBOARD HOME ─────────────────────────────────────────────────────────*/
function DashboardHome({ stats }) {
  const { T, theme } = useAdminTheme();
  const t         = stats.totalProducts || 1;
  const activePct = Math.round((stats.activeProducts  / t) * 100);
  const featPct   = Math.round((stats.featuredProducts / t) * 100);
  const stockPct  = Math.round(((t - stats.outOfStock) / t) * 100);

  const CARDS = [
    { label:"Total Products", value:stats.totalProducts,    color:"#D4AF37", sub:"Catalog items",            icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg> },
    { label:"Categories",     value:stats.totalCategories,  color:"#8B5CF6", sub:"Collections",              icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg> },
    { label:"Active",         value:stats.activeProducts,   color:"#10B981", sub:`${activePct}% of catalog`, icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> },
    { label:"Featured",       value:stats.featuredProducts, color:"#F59E0B", sub:`${featPct}% spotlighted`,  icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg> },
    { label:"Inactive",       value:stats.inactiveProducts, color:"#EF4444", sub:"Hidden from store",        icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg> },
    { label:"Out of Stock",   value:stats.outOfStock, color:stats.outOfStock===0?"#10B981":"#EF4444", sub:stats.outOfStock===0?"All stocked ✓":"Needs restocking", icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg> },
  ];
  const GAUGES = [
    { label:"Active Rate",   pct:activePct, color:"#10B981" },
    { label:"Featured Rate", pct:featPct,   color:"#F59E0B" },
    { label:"In-Stock Rate", pct:stockPct,  color:"#3B82F6" },
  ];
  const ACTIONS = [
    { label:"New Product",  to:"/admin/products",   color:"#800000", desc:"Add to catalog" },
    { label:"New Category", to:"/admin/categories", color:"#D4AF37", desc:"New collection" },
    { label:"Orders",       to:"/admin/orders",     color:"#3B82F6", desc:"Manage orders"  },
    { label:"Customers",    to:"/admin/customers",  color:"#8B5CF6", desc:"User accounts"  },
    { label:"Invoices",     to:"/admin/invoices",   color:"#10B981", desc:"GST invoices"   },
    { label:"Reviews",      to:"/admin/reviews",    color:"#F59E0B", desc:"Feedback"       },
  ];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}}
        style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div>
          <h1 style={{ fontFamily:SERIF, fontSize:30, fontWeight:700, color:T.text, marginBottom:4 }}>Store Overview</h1>
          <p style={{ fontSize:14, color:T.muted }}>
            {new Date().toLocaleDateString("en-IN",{ weekday:"long", day:"numeric", month:"long", year:"numeric" })}
          </p>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <Link to="/admin/categories"
            style={{ padding:"9px 18px", textDecoration:"none", borderRadius:8, fontSize:13, fontWeight:600,
              background:theme==="dark"?"rgba(212,175,55,0.08)":"rgba(128,0,0,0.06)",
              border:`1px solid ${T.borderHi}`, color:theme==="dark"?T.gold:T.maroon }}>
            + Category
          </Link>
          <Link to="/admin/products"
            style={{ padding:"9px 18px", textDecoration:"none", borderRadius:8, fontSize:13,
              fontWeight:600, background:T.maroon, color:"#FFFFF0" }}>
            + Product
          </Link>
        </div>
      </motion.div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:12 }}>
        {CARDS.map((c, i) => (
          <motion.div key={i} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:i*0.06}}
            className="a-stat"
            style={{ background:T.card, border:`1px solid ${T.statBorder}`, borderRadius:12,
              padding:"18px 16px", position:"relative", overflow:"hidden",
              boxShadow:T.shadow, transition:"background 0.3s, border-color 0.3s" }}>
            <div style={{ position:"absolute", top:-20, right:-20, width:64, height:64, borderRadius:"50%",
              background:c.color, opacity:theme==="dark"?0.08:0.07, filter:"blur(18px)", pointerEvents:"none" }}/>
            <div style={{ width:36, height:36, borderRadius:9,
              background:`${c.color}${theme==="dark"?"18":"14"}`,
              display:"flex", alignItems:"center", justifyContent:"center",
              color:c.color, marginBottom:14 }}>{c.icon}</div>
            <p style={{ fontFamily:SERIF, fontSize:28, fontWeight:700, color:T.text,
              lineHeight:1, marginBottom:6 }}><Counter to={c.value}/></p>
            <p style={{ fontSize:12, fontWeight:700, color:T.textSec||T.text, marginBottom:3 }}>{c.label}</p>
            <p style={{ fontSize:11, color:T.muted }}>{c.sub}</p>
          </motion.div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"260px 1fr", gap:16 }}>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.45}}
          style={{ background:T.card, border:`1px solid ${T.statBorder}`, borderRadius:14,
            padding:"22px 20px", boxShadow:T.shadow }}>
          <p style={{ fontSize:14, fontWeight:700, color:T.text, marginBottom:20 }}>Catalog Health</p>
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            {GAUGES.map((g, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ position:"relative", flexShrink:0 }}>
                  <Ring pct={g.pct} color={g.color} size={56} stroke={6}/>
                  <span style={{ position:"absolute", inset:0, display:"flex", alignItems:"center",
                    justifyContent:"center", fontSize:11, fontWeight:700, color:g.color }}>{g.pct}%</span>
                </div>
                <div>
                  <p style={{ fontSize:13, fontWeight:600, color:T.text, marginBottom:3 }}>{g.label}</p>
                  <p style={{ fontSize:12, color:T.muted }}>{g.pct}% achieved</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}
          style={{ background:T.card, border:`1px solid ${T.statBorder}`, borderRadius:14,
            padding:"22px", boxShadow:T.shadow }}>
          <p style={{ fontSize:14, fontWeight:700, color:T.text, marginBottom:18 }}>Quick Actions</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
            {ACTIONS.map((a, i) => (
              <Link key={i} to={a.to} className="a-action"
                style={{ textDecoration:"none", padding:"16px 12px", borderRadius:10,
                  border:`1px solid ${T.statBorder}`, background:T.actionCardBg,
                  display:"flex", flexDirection:"column", alignItems:"center",
                  gap:8, transition:"all 0.15s" }}>
                <div style={{ width:40, height:40, borderRadius:"50%", background:`${a.color}18`,
                  display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <div style={{ width:16, height:16, borderRadius:4, background:a.color, opacity:0.9 }}/>
                </div>
                <p style={{ fontSize:13, fontWeight:600, color:T.text, textAlign:"center" }}>{a.label}</p>
                <p style={{ fontSize:11, color:T.muted, textAlign:"center" }}>{a.desc}</p>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .a-stat { transition: transform 0.15s, box-shadow 0.15s !important; cursor:default; }
        .a-stat:hover { transform:translateY(-2px); box-shadow:${T.shadowMd} !important; }
        .a-action:hover { background:${T.hoverBg} !important; transform:translateY(-1px); }
      `}</style>
    </div>
  );
}

/* ─── COMING SOON ────────────────────────────────────────────────────────────*/
function ComingSoon({ title, desc }) {
  const { T } = useAdminTheme();
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"60vh" }}>
      <motion.div initial={{opacity:0,scale:0.93}} animate={{opacity:1,scale:1}}
        style={{ textAlign:"center", maxWidth:380 }}>
        <div style={{ width:80, height:80, borderRadius:20,
          background:"rgba(212,175,55,0.07)", border:"1px solid rgba(212,175,55,0.2)",
          display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px" }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.4">
            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h2 style={{ fontFamily:SERIF, fontSize:28, fontWeight:700, color:T.text, marginBottom:10 }}>{title}</h2>
        <p style={{ fontSize:15, color:T.muted, marginBottom:6 }}>{desc}</p>
        <p style={{ fontSize:13, color:T.dim, marginBottom:28 }}>This module is in development</p>
        <Link to="/admin/dashboard"
          style={{ display:"inline-block", padding:"11px 26px", background:T.maroon,
            color:"#FFFFF0", textDecoration:"none", borderRadius:8, fontSize:13, fontWeight:600 }}>
          ← Back to Dashboard
        </Link>
      </motion.div>
    </div>
  );
}