import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { authAPI } from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await authAPI.login(form);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res));
      navigate(res.role === "ADMIN" ? "/admin/dashboard" : "/");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Cormorant Garamond', serif", background: "#FFFFF0" }}>
      {/* Left decorative panel */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="hidden lg:flex flex-col justify-between w-1/2 relative overflow-hidden"
        style={{ background: "#1A1A2E" }}
      >
        {/* Gold geometric pattern overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 50%)`,
            backgroundSize: "30px 30px"
          }}
        />
        {/* Radial glow */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 30% 60%, rgba(212,175,55,0.15) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#D4AF37" }}>Est. Since Generations</p>
            <h1 className="text-5xl font-bold leading-tight" style={{ color: "#FFFFF0" }}>
              Aboorva<br />
              <span style={{ color: "#D4AF37" }}>Silk House</span>
            </h1>
            <div className="mt-4 w-16 h-px" style={{ background: "#D4AF37" }} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="relative z-10 p-12"
        >
          <blockquote className="text-lg italic leading-relaxed mb-6" style={{ color: "rgba(255,255,240,0.7)" }}>
            "Where every thread tells a story of<br />heritage and craftsmanship."
          </blockquote>
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: i < 3 ? "#D4AF37" : "rgba(212,175,55,0.3)" }} />
            ))}
          </div>
        </motion.div>

        {/* Decorative corner ornament */}
        <div className="absolute bottom-0 right-0 w-48 h-48 opacity-20"
          style={{
            background: "conic-gradient(from 0deg, #D4AF37, transparent, #D4AF37, transparent)",
            borderRadius: "100% 0 0 0"
          }}
        />
      </motion.div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-10">
            <h1 className="text-3xl font-bold" style={{ color: "#1A1A2E" }}>Aboorva <span style={{ color: "#D4AF37" }}>Silk House</span></h1>
          </div>

          <div className="mb-10">
            <p className="text-xs tracking-[0.35em] uppercase mb-2" style={{ color: "#D4AF37" }}>Welcome Back</p>
            <h2 className="text-4xl font-bold" style={{ color: "#1A1A2E" }}>Sign In</h2>
            <div className="mt-3 w-12 h-px" style={{ background: "#D4AF37" }} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3.5 text-base outline-none transition-all duration-300"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(26,26,46,0.2)",
                  borderBottom: "2px solid #1A1A2E",
                  color: "#1A1A2E",
                  fontFamily: "'Cormorant Garamond', serif",
                }}
                onFocus={e => { e.target.style.borderBottomColor = "#D4AF37"; e.target.style.borderColor = "rgba(212,175,55,0.4)"; }}
                onBlur={e => { e.target.style.borderBottomColor = "#1A1A2E"; e.target.style.borderColor = "rgba(26,26,46,0.2)"; }}
              />
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex justify-between mb-2">
                <label className="text-xs tracking-widest uppercase" style={{ color: "#36454F" }}>Password</label>
                <Link to="/forgot-password" className="text-xs tracking-wide transition-colors" style={{ color: "#D4AF37" }}
                  onMouseEnter={e => e.target.style.color = "#800000"}
                  onMouseLeave={e => e.target.style.color = "#D4AF37"}
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 text-base outline-none transition-all duration-300 pr-12"
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(26,26,46,0.2)",
                    borderBottom: "2px solid #1A1A2E",
                    color: "#1A1A2E",
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                  onFocus={e => { e.target.style.borderBottomColor = "#D4AF37"; e.target.style.borderColor = "rgba(212,175,55,0.4)"; }}
                  onBlur={e => { e.target.style.borderBottomColor = "#1A1A2E"; e.target.style.borderColor = "rgba(26,26,46,0.2)"; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs tracking-widest uppercase transition-colors"
                  style={{ color: "#D4AF37" }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </motion.div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="px-4 py-3 text-sm"
                  style={{ background: "rgba(128,0,0,0.08)", borderLeft: "3px solid #800000", color: "#800000" }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 text-sm tracking-[0.3em] uppercase font-semibold transition-all duration-300 relative overflow-hidden"
              style={{ background: "#800000", color: "#FFFFF0", border: "none" }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="inline-block w-4 h-4 border-2 border-t-transparent rounded-full"
                    style={{ borderColor: "#D4AF37", borderTopColor: "transparent" }}
                  />
                  Signing In...
                </span>
              ) : "Sign In"}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px" style={{ background: "rgba(26,26,46,0.15)" }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: "#36454F" }}>or</span>
            <div className="flex-1 h-px" style={{ background: "rgba(26,26,46,0.15)" }} />
          </div>

          <p className="text-center text-base" style={{ color: "#36454F" }}>
            New to Aboorva Silk House?{" "}
            <Link
              to="/signup"
              className="font-semibold transition-colors"
              style={{ color: "#D4AF37" }}
              onMouseEnter={e => e.target.style.color = "#800000"}
              onMouseLeave={e => e.target.style.color = "#D4AF37"}
            >
              Create Account
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Google font import */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap');`}</style>
    </div>
  );
}