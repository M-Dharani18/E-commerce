
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// /* ─── Font note ────────────────────────────────────────────────────────────────
//    Uses "Inter" (Google Fonts) — clear, high-legibility sans-serif.
//    Cormorant Garamond is beautiful but low contrast at small sizes.
//    Headlines still use a tasteful serif for brand feel.
// ──────────────────────────────────────────────────────────────────────────────── */

// const F = "'Inter', system-ui, -apple-system, sans-serif";
// const RED = "#800000";

// const COLORS = [
//   { name: "Black",     hex: "#1a1a1a" },
//   { name: "White",     hex: "#f5f5f5" },
//   { name: "Red",       hex: "#cc2200" },
//   { name: "Navy Blue", hex: "#1a2744" },
//   { name: "Blue",      hex: "#2563eb" },
//   { name: "Green",     hex: "#16a34a" },
//   { name: "Pink",      hex: "#ec4899" },
//   { name: "Yellow",    hex: "#eab308" },
//   { name: "Orange",    hex: "#ea580c" },
//   { name: "Purple",    hex: "#7c3aed" },
//   { name: "Brown",     hex: "#78350f" },
//   { name: "Grey",      hex: "#6b7280" },
//   { name: "Maroon",    hex: "#7f1d1d" },
//   { name: "Gold",      hex: "#b45309" },
//   { name: "Cream",     hex: "#fef3c7" },
// ];

// const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "Free Size"];

// const SECTION = ({ title, children, defaultOpen = true }) => {
//   const [open, setOpen] = useState(defaultOpen);
//   return (
//     <div style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: 14, marginBottom: 14 }}>
//       <button onClick={() => setOpen(!open)}
//         style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", cursor: "pointer", padding: "6px 0 10px", fontFamily: F }}>
//         <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#111827" }}>{title}</span>
//         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5"
//           style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", flexShrink: 0 }}>
//           <polyline points="6 9 12 15 18 9"/>
//         </svg>
//       </button>
//       <AnimatePresence initial={false}>
//         {open && (
//           <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} style={{ overflow: "hidden" }}>
//             {children}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// const Checkbox = ({ label, count, checked, onChange }) => (
//   <label onClick={onChange} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "5px 0", userSelect: "none" }}>
//     <div style={{ width: 17, height: 17, border: `2px solid ${checked ? RED : "#d1d5db"}`, background: checked ? RED : "white", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
//       {checked && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5"><polyline points="20 6 9 17 4 12"/></svg>}
//     </div>
//     <span style={{ fontSize: 14, color: "#374151", flex: 1, fontFamily: F }}>{label}</span>
//     {count !== undefined && <span style={{ fontSize: 12, color: "#9ca3af", fontFamily: F }}>({count})</span>}
//   </label>
// );

// const Radio = ({ label, value, selected, onChange }) => (
//   <label onClick={onChange} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "5px 0", userSelect: "none" }}>
//     <div style={{ width: 17, height: 17, borderRadius: "50%", border: `2px solid ${selected ? RED : "#d1d5db"}`, background: "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
//       {selected && <div style={{ width: 7, height: 7, borderRadius: "50%", background: RED }} />}
//     </div>
//     <span style={{ fontSize: 14, color: "#374151", fontFamily: F }}>{label}</span>
//   </label>
// );

// export default function SidebarFilter({ filters, onChange, categories = [] }) {
//   const {
//     minPrice = 0, maxPrice = 10000,
//     selectedCategories = [],
//     selectedColors = [],
//     selectedSizes = [],
//     selectedGenders = [],
//     inStockOnly = false,
//     discountMin = 0,
//     minRating = 0,
//     sortBy = "newest",
//   } = filters;

//   const toggle = (key, val) => {
//     const arr = filters[key] || [];
//     onChange({ ...filters, [key]: arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val] });
//   };

//   const hasActiveFilters = selectedCategories.length > 0 || selectedColors.length > 0 || selectedSizes.length > 0 ||
//     selectedGenders.length > 0 || inStockOnly || discountMin > 0 || minRating > 0 || minPrice > 0 || maxPrice < 10000;

//   const clearAll = () => onChange({
//     minPrice: 0, maxPrice: 10000, selectedCategories: [], selectedColors: [],
//     selectedSizes: [], selectedGenders: [], inStockOnly: false, discountMin: 0, minRating: 0, sortBy: "newest"
//   });

//   return (
//     <div style={{ fontFamily: F, width: "100%" }}>

//       {/* ── Active filter chips ── */}
//       {hasActiveFilters && (
//         <div style={{ marginBottom: 18, padding: "12px 14px", background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8 }}>
//           <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
//             <span style={{ fontSize: 12, fontWeight: 700, color: RED, letterSpacing: "0.05em" }}>ACTIVE FILTERS</span>
//             <button onClick={clearAll} style={{ fontSize: 12, color: RED, background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontFamily: F }}>Clear All</button>
//           </div>
//           <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
//             {selectedCategories.map(c => <Chip key={c} label={c} onRemove={() => toggle("selectedCategories", c)} />)}
//             {selectedColors.map(c => <Chip key={c} label={c} onRemove={() => toggle("selectedColors", c)} />)}
//             {selectedSizes.map(s => <Chip key={s} label={`Size: ${s}`} onRemove={() => toggle("selectedSizes", s)} />)}
//             {selectedGenders.map(g => <Chip key={g} label={g} onRemove={() => toggle("selectedGenders", g)} />)}
//             {inStockOnly && <Chip label="In Stock" onRemove={() => onChange({ ...filters, inStockOnly: false })} />}
//             {discountMin > 0 && <Chip label={`${discountMin}%+ Off`} onRemove={() => onChange({ ...filters, discountMin: 0 })} />}
//             {minRating > 0 && <Chip label={`${minRating}★+`} onRemove={() => onChange({ ...filters, minRating: 0 })} />}
//           </div>
//         </div>
//       )}

//       {/* ── 1. CATEGORY ── */}
//       {categories.length > 0 && (
//         <SECTION title="Category">
//           {categories.map(cat => (
//             <Checkbox key={cat.id} label={cat.name}
//               checked={selectedCategories.includes(cat.name)}
//               onChange={() => toggle("selectedCategories", cat.name)} />
//           ))}
//         </SECTION>
//       )}

//       {/* ── 2. PRICE RANGE ── */}
//       <SECTION title="Price Range">
//         <div style={{ padding: "4px 2px 8px" }}>
//           {/* Price inputs */}
//           <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
//             <div style={{ flex: 1 }}>
//               <label style={{ fontSize: 11, color: "#6b7280", display: "block", marginBottom: 4, fontWeight: 600, letterSpacing: "0.04em" }}>MIN (₹)</label>
//               <input type="number" value={minPrice} min={0} max={maxPrice - 100} step={100}
//                 onChange={e => onChange({ ...filters, minPrice: Math.max(0, Math.min(+e.target.value, maxPrice - 100)) })}
//                 style={{ width: "100%", padding: "7px 10px", border: "1.5px solid #d1d5db", borderRadius: 6, fontSize: 14, color: "#111827", outline: "none", fontFamily: F }} />
//             </div>
//             <div style={{ flex: 1 }}>
//               <label style={{ fontSize: 11, color: "#6b7280", display: "block", marginBottom: 4, fontWeight: 600, letterSpacing: "0.04em" }}>MAX (₹)</label>
//               <input type="number" value={maxPrice} min={minPrice + 100} max={50000} step={100}
//                 onChange={e => onChange({ ...filters, maxPrice: Math.max(minPrice + 100, +e.target.value) })}
//                 style={{ width: "100%", padding: "7px 10px", border: "1.5px solid #d1d5db", borderRadius: 6, fontSize: 14, color: "#111827", outline: "none", fontFamily: F }} />
//             </div>
//           </div>

//           {/* Dual range slider track */}
//           <div style={{ position: "relative", height: 6, background: "#e5e7eb", borderRadius: 3, margin: "6px 0 12px" }}>
//             <div style={{
//               position: "absolute", top: 0, bottom: 0,
//               left: `${(minPrice / 10000) * 100}%`,
//               right: `${100 - (maxPrice / 10000) * 100}%`,
//               background: RED, borderRadius: 3
//             }} />
//           </div>
//           <div style={{ position: "relative", height: 20, marginBottom: 14 }}>
//             <input type="range" min={0} max={10000} step={100} value={minPrice}
//               onChange={e => onChange({ ...filters, minPrice: Math.min(+e.target.value, maxPrice - 100) })}
//               style={{ position: "absolute", width: "100%", height: "100%", opacity: 0, cursor: "pointer", zIndex: 2 }} />
//             <input type="range" min={0} max={10000} step={100} value={maxPrice}
//               onChange={e => onChange({ ...filters, maxPrice: Math.max(+e.target.value, minPrice + 100) })}
//               style={{ position: "absolute", width: "100%", height: "100%", opacity: 0, cursor: "pointer", zIndex: 2 }} />
//           </div>

//           {/* Quick preset buttons */}
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6 }}>
//             {[{ label: "< ₹500", min: 0, max: 500 }, { label: "₹500–1K", min: 500, max: 1000 }, { label: "₹1K–3K", min: 1000, max: 3000 }, { label: "₹3K+", min: 3000, max: 10000 }].map(p => (
//               <button key={p.label} onClick={() => onChange({ ...filters, minPrice: p.min, maxPrice: p.max })}
//                 style={{ padding: "6px 4px", fontSize: 11, fontWeight: 500, background: minPrice === p.min && maxPrice === p.max ? RED : "white", color: minPrice === p.min && maxPrice === p.max ? "white" : "#374151", border: "1.5px solid #d1d5db", borderRadius: 6, cursor: "pointer", fontFamily: F, transition: "all 0.15s" }}>
//                 {p.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </SECTION>

//       {/* ── 3. COLOUR ── */}
//       <SECTION title="Colour">
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8, padding: "4px 0" }}>
//           {COLORS.map(c => {
//             const active = selectedColors.includes(c.name);
//             return (
//               <div key={c.name} onClick={() => toggle("selectedColors", c.name)}
//                 style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }}
//                 title={c.name}>
//                 <div style={{ width: 30, height: 30, borderRadius: "50%", background: c.hex, border: active ? `3px solid ${RED}` : "2px solid #e5e7eb", outline: active ? "2px solid #fca5a5" : "none", transition: "all 0.15s", boxShadow: active ? "0 0 0 2px white inset" : "none" }} />
//                 <span style={{ fontSize: 9, color: active ? RED : "#6b7280", fontWeight: active ? 700 : 400, textAlign: "center", lineHeight: 1.2 }}>{c.name}</span>
//               </div>
//             );
//           })}
//         </div>
//       </SECTION>

//       {/* ── 4. DISCOUNT RANGE ── */}
//       <SECTION title="Discount" defaultOpen={false}>
//         {[10, 20, 30, 40, 50, 60, 70].map(d => (
//           <Radio key={d} label={`${d}% and above`} value={d} selected={discountMin === d}
//             onChange={() => onChange({ ...filters, discountMin: discountMin === d ? 0 : d })} />
//         ))}
//       </SECTION>

//       {/* ── 5. GENDER ── */}
//       <SECTION title="Gender" defaultOpen={false}>
//         {["Women", "Men", "Kids", "Unisex"].map(g => (
//           <Checkbox key={g} label={g} checked={selectedGenders.includes(g)} onChange={() => toggle("selectedGenders", g)} />
//         ))}
//       </SECTION>

//       {/* ── 6. SIZE ── */}
//       <SECTION title="Size" defaultOpen={false}>
//         <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: "4px 0" }}>
//           {SIZES.map(s => {
//             const active = selectedSizes.includes(s);
//             return (
//               <button key={s} onClick={() => toggle("selectedSizes", s)}
//                 style={{ padding: "6px 12px", fontSize: 13, fontWeight: active ? 700 : 500, background: active ? RED : "white", color: active ? "white" : "#374151", border: `1.5px solid ${active ? RED : "#d1d5db"}`, borderRadius: 6, cursor: "pointer", fontFamily: F, transition: "all 0.15s" }}>
//                 {s}
//               </button>
//             );
//           })}
//         </div>
//       </SECTION>

//       {/* ── 7. CUSTOMER REVIEWS ── */}
//       <SECTION title="Customer Reviews" defaultOpen={false}>
//         {[4, 3, 2, 1].map(r => (
//           <label key={r} onClick={() => onChange({ ...filters, minRating: minRating === r ? 0 : r })}
//             style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "6px 0", userSelect: "none" }}>
//             <div style={{ width: 17, height: 17, borderRadius: "50%", border: `2px solid ${minRating === r ? RED : "#d1d5db"}`, background: "white", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s", flexShrink: 0 }}>
//               {minRating === r && <div style={{ width: 7, height: 7, borderRadius: "50%", background: RED }} />}
//             </div>
//             <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
//               {[...Array(5)].map((_, i) => (
//                 <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < r ? "#f59e0b" : "#e5e7eb"} stroke={i < r ? "#f59e0b" : "#e5e7eb"} strokeWidth="1">
//                   <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
//                 </svg>
//               ))}
//               <span style={{ fontSize: 13, color: "#374151", marginLeft: 4, fontFamily: F }}>{r}★ & above</span>
//             </div>
//           </label>
//         ))}
//       </SECTION>

//       {/* ── Availability ── */}
//       <div style={{ paddingTop: 4 }}>
//         <Checkbox label="In Stock Only" checked={inStockOnly} onChange={() => onChange({ ...filters, inStockOnly: !inStockOnly })} />
//       </div>

//       <style>{`
//         input[type=number]::-webkit-inner-spin-button,
//         input[type=number]::-webkit-outer-spin-button { opacity: 0.5; }
//         input[type=range] { -webkit-appearance: none; appearance: none; }
//       `}</style>
//     </div>
//   );
// }

// function Chip({ label, onRemove }) {
//   return (
//     <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 8px", background: RED, color: "white", fontSize: 11, borderRadius: 4, fontFamily: F, fontWeight: 500 }}>
//       {label}
//       <span onClick={onRemove} style={{ cursor: "pointer", fontSize: 14, lineHeight: 1, fontWeight: 700 }}>×</span>
//     </span>
//   );
// }


import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Font note ────────────────────────────────────────────────────────────────
   Uses "Inter" (Google Fonts) — clear, high-legibility sans-serif.
   Cormorant Garamond is beautiful but low contrast at small sizes.
   Headlines still use a tasteful serif for brand feel.
──────────────────────────────────────────────────────────────────────────────── */

const F = "'Inter', system-ui, -apple-system, sans-serif";
const RED = "#800000";

const COLORS = [
  { name: "Black",     hex: "#1a1a1a" },
  { name: "White",     hex: "#f5f5f5" },
  { name: "Red",       hex: "#cc2200" },
  { name: "Navy Blue", hex: "#1a2744" },
  { name: "Blue",      hex: "#2563eb" },
  { name: "Green",     hex: "#16a34a" },
  { name: "Pink",      hex: "#ec4899" },
  { name: "Yellow",    hex: "#eab308" },
  { name: "Orange",    hex: "#ea580c" },
  { name: "Purple",    hex: "#7c3aed" },
  { name: "Brown",     hex: "#78350f" },
  { name: "Grey",      hex: "#6b7280" },
  { name: "Maroon",    hex: "#7f1d1d" },
  { name: "Gold",      hex: "#b45309" },
  { name: "Cream",     hex: "#fef3c7" },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "Free Size"];

const SECTION = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: 14, marginBottom: 14 }}>
      <button onClick={() => setOpen(!open)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", cursor: "pointer", padding: "6px 0 10px", fontFamily: F }}>
        <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#111827" }}>{title}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", flexShrink: 0 }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} style={{ overflow: "hidden" }}>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Checkbox = ({ label, count, checked, onChange }) => (
  <label onClick={onChange} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "5px 0", userSelect: "none" }}>
    <div style={{ width: 17, height: 17, border: `2px solid ${checked ? RED : "#d1d5db"}`, background: checked ? RED : "white", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
      {checked && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5"><polyline points="20 6 9 17 4 12"/></svg>}
    </div>
    <span style={{ fontSize: 14, color: "#374151", flex: 1, fontFamily: F }}>{label}</span>
    {count !== undefined && <span style={{ fontSize: 12, color: "#9ca3af", fontFamily: F }}>({count})</span>}
  </label>
);

const Radio = ({ label, value, selected, onChange }) => (
  <label onClick={onChange} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "5px 0", userSelect: "none" }}>
    <div style={{ width: 17, height: 17, borderRadius: "50%", border: `2px solid ${selected ? RED : "#d1d5db"}`, background: "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
      {selected && <div style={{ width: 7, height: 7, borderRadius: "50%", background: RED }} />}
    </div>
    <span style={{ fontSize: 14, color: "#374151", fontFamily: F }}>{label}</span>
  </label>
);

export default function SidebarFilter({ filters, onChange, categories = [], showGenderFilter = true }) {
  const {
    minPrice = 0, maxPrice = 50000,
    selectedCategories = [],
    selectedColors = [],
    selectedSizes = [],
    selectedGenders = [],
    inStockOnly = false,
    discountMin = 0,
    minRating = 0,
    sortBy = "newest",
  } = filters;

  const toggle = (key, val) => {
    const arr = filters[key] || [];
    onChange({ ...filters, [key]: arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val] });
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedColors.length > 0 || selectedSizes.length > 0 ||
    selectedGenders.length > 0 || inStockOnly || discountMin > 0 || minRating > 0 || minPrice > 0 || maxPrice < 50000;

  const clearAll = () => onChange({
    minPrice: 0, maxPrice: 50000, selectedCategories: [], selectedColors: [],
    selectedSizes: [], selectedGenders: [], inStockOnly: false, discountMin: 0, minRating: 0, sortBy: "newest"
  });

  return (
    <div style={{ fontFamily: F, width: "100%" }}>

      {/* ── Active filter chips ── */}
      {hasActiveFilters && (
        <div style={{ marginBottom: 18, padding: "12px 14px", background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: RED, letterSpacing: "0.05em" }}>ACTIVE FILTERS</span>
            <button onClick={clearAll} style={{ fontSize: 12, color: RED, background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontFamily: F }}>Clear All</button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {selectedCategories.map(c => <Chip key={c} label={c} onRemove={() => toggle("selectedCategories", c)} />)}
            {selectedColors.map(c => <Chip key={c} label={c} onRemove={() => toggle("selectedColors", c)} />)}
            {selectedSizes.map(s => <Chip key={s} label={`Size: ${s}`} onRemove={() => toggle("selectedSizes", s)} />)}
            {selectedGenders.map(g => <Chip key={g} label={g} onRemove={() => toggle("selectedGenders", g)} />)}
            {inStockOnly && <Chip label="In Stock" onRemove={() => onChange({ ...filters, inStockOnly: false })} />}
            {discountMin > 0 && <Chip label={`${discountMin}%+ Off`} onRemove={() => onChange({ ...filters, discountMin: 0 })} />}
            {minRating > 0 && <Chip label={`${minRating}★+`} onRemove={() => onChange({ ...filters, minRating: 0 })} />}
          </div>
        </div>
      )}

      {/* ── 1. CATEGORY ── */}
      {categories.length > 0 && (
        <SECTION title="Category">
          {categories.map(cat => (
            <Checkbox key={cat.id} label={cat.name}
              checked={selectedCategories.includes(cat.name)}
              onChange={() => toggle("selectedCategories", cat.name)} />
          ))}
        </SECTION>
      )}

      {/* ── 2. PRICE RANGE ── */}
      <SECTION title="Price Range">
        <div style={{ padding: "4px 2px 8px" }}>
          {/* Price inputs */}
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 11, color: "#6b7280", display: "block", marginBottom: 4, fontWeight: 600, letterSpacing: "0.04em" }}>MIN (₹)</label>
              <input type="number" value={minPrice} min={0} max={maxPrice - 100} step={100}
                onChange={e => onChange({ ...filters, minPrice: Math.max(0, Math.min(+e.target.value, maxPrice - 100)) })}
                style={{ width: "100%", padding: "7px 10px", border: "1.5px solid #d1d5db", borderRadius: 6, fontSize: 14, color: "#111827", outline: "none", fontFamily: F }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 11, color: "#6b7280", display: "block", marginBottom: 4, fontWeight: 600, letterSpacing: "0.04em" }}>MAX (₹)</label>
              <input type="number" value={maxPrice} min={minPrice + 100} max={50000} step={100}
                onChange={e => onChange({ ...filters, maxPrice: Math.max(minPrice + 100, +e.target.value) })}
                style={{ width: "100%", padding: "7px 10px", border: "1.5px solid #d1d5db", borderRadius: 6, fontSize: 14, color: "#111827", outline: "none", fontFamily: F }} />
            </div>
          </div>

          {/* Dual range slider track */}
          <div style={{ position: "relative", height: 6, background: "#e5e7eb", borderRadius: 3, margin: "6px 0 12px" }}>
            <div style={{
              position: "absolute", top: 0, bottom: 0,
              left: `${(minPrice / 50000) * 100}%`,
              right: `${100 - (maxPrice / 50000) * 100}%`,
              background: RED, borderRadius: 3
            }} />
          </div>
          <div style={{ position: "relative", height: 20, marginBottom: 14 }}>
            <input type="range" min={0} max={50000} step={100} value={minPrice}
              onChange={e => onChange({ ...filters, minPrice: Math.min(+e.target.value, maxPrice - 100) })}
              style={{ position: "absolute", width: "100%", height: "100%", opacity: 0, cursor: "pointer", zIndex: 2 }} />
            <input type="range" min={0} max={50000} step={100} value={maxPrice}
              onChange={e => onChange({ ...filters, maxPrice: Math.max(+e.target.value, minPrice + 100) })}
              style={{ position: "absolute", width: "100%", height: "100%", opacity: 0, cursor: "pointer", zIndex: 2 }} />
          </div>

          {/* Quick preset buttons */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6 }}>
            {[{ label: "< ₹500", min: 0, max: 500 }, { label: "₹500–1K", min: 500, max: 1000 }, { label: "₹1K–3K", min: 1000, max: 3000 }, { label: "₹3K+", min: 3000, max: 50000 }].map(p => (
              <button key={p.label} onClick={() => onChange({ ...filters, minPrice: p.min, maxPrice: p.max })}
                style={{ padding: "6px 4px", fontSize: 11, fontWeight: 500, background: minPrice === p.min && maxPrice === p.max ? RED : "white", color: minPrice === p.min && maxPrice === p.max ? "white" : "#374151", border: "1.5px solid #d1d5db", borderRadius: 6, cursor: "pointer", fontFamily: F, transition: "all 0.15s" }}>
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </SECTION>

      {/* ── 3. COLOUR ── */}
      <SECTION title="Colour">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8, padding: "4px 0" }}>
          {COLORS.map(c => {
            const active = selectedColors.includes(c.name);
            return (
              <div key={c.name} onClick={() => toggle("selectedColors", c.name)}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }}
                title={c.name}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: c.hex, border: active ? `3px solid ${RED}` : "2px solid #e5e7eb", outline: active ? "2px solid #fca5a5" : "none", transition: "all 0.15s", boxShadow: active ? "0 0 0 2px white inset" : "none" }} />
                <span style={{ fontSize: 9, color: active ? RED : "#6b7280", fontWeight: active ? 700 : 400, textAlign: "center", lineHeight: 1.2 }}>{c.name}</span>
              </div>
            );
          })}
        </div>
      </SECTION>

      {/* ── 4. DISCOUNT RANGE ── */}
      <SECTION title="Discount" defaultOpen={false}>
        {[10, 20, 30, 40, 50, 60, 70].map(d => (
          <Radio key={d} label={`${d}% and above`} value={d} selected={discountMin === d}
            onChange={() => onChange({ ...filters, discountMin: discountMin === d ? 0 : d })} />
        ))}
      </SECTION>

      {/* ── 5. GENDER ── */}
      {showGenderFilter && (
      <SECTION title="Gender" defaultOpen={false}>
        {["Women", "Men", "Kids", "Unisex"].map(g => (
          <Checkbox key={g} label={g} checked={selectedGenders.includes(g)} onChange={() => toggle("selectedGenders", g)} />
        ))}
      </SECTION>
      )}

      {/* ── 6. SIZE ── */}
      <SECTION title="Size" defaultOpen={false}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: "4px 0" }}>
          {SIZES.map(s => {
            const active = selectedSizes.includes(s);
            return (
              <button key={s} onClick={() => toggle("selectedSizes", s)}
                style={{ padding: "6px 12px", fontSize: 13, fontWeight: active ? 700 : 500, background: active ? RED : "white", color: active ? "white" : "#374151", border: `1.5px solid ${active ? RED : "#d1d5db"}`, borderRadius: 6, cursor: "pointer", fontFamily: F, transition: "all 0.15s" }}>
                {s}
              </button>
            );
          })}
        </div>
      </SECTION>

      {/* ── 7. CUSTOMER REVIEWS ── */}
      <SECTION title="Customer Reviews" defaultOpen={false}>
        {[4, 3, 2, 1].map(r => (
          <label key={r} onClick={() => onChange({ ...filters, minRating: minRating === r ? 0 : r })}
            style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "6px 0", userSelect: "none" }}>
            <div style={{ width: 17, height: 17, borderRadius: "50%", border: `2px solid ${minRating === r ? RED : "#d1d5db"}`, background: "white", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s", flexShrink: 0 }}>
              {minRating === r && <div style={{ width: 7, height: 7, borderRadius: "50%", background: RED }} />}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < r ? "#f59e0b" : "#e5e7eb"} stroke={i < r ? "#f59e0b" : "#e5e7eb"} strokeWidth="1">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
              <span style={{ fontSize: 13, color: "#374151", marginLeft: 4, fontFamily: F }}>{r}★ & above</span>
            </div>
          </label>
        ))}
      </SECTION>

      {/* ── Availability ── */}
      <div style={{ paddingTop: 4 }}>
        <Checkbox label="In Stock Only" checked={inStockOnly} onChange={() => onChange({ ...filters, inStockOnly: !inStockOnly })} />
      </div>

      <style>{`
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { opacity: 0.5; }
        input[type=range] { -webkit-appearance: none; appearance: none; }
      `}</style>
    </div>
  );
}

function Chip({ label, onRemove }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 8px", background: RED, color: "white", fontSize: 11, borderRadius: 4, fontFamily: F, fontWeight: 500 }}>
      {label}
      <span onClick={onRemove} style={{ cursor: "pointer", fontSize: 14, lineHeight: 1, fontWeight: 700 }}>×</span>
    </span>
  );
}