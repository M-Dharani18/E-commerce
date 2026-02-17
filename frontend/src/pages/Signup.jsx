
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { authAPI } from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // 1 = form, 2 = check email
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
      await authAPI.signup(form);
      setStep(2);
    } catch (err) {
      const data = err.response?.data;
      if (data?.errors) {
        // Show first validation error from Spring Boot
        const firstError = Object.values(data.errors)[0];
        setError(firstError);
      } else {
        setError(data?.message || err.message || "Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
    { name: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
    { name: "phone", label: "Phone Number", type: "tel", placeholder: "10-digit mobile number" },
  ];

  if (step === 2) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6"
        style={{ background: "#1A1A2E", fontFamily: "'Cormorant Garamond', serif" }}>
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 50%)`,
            backgroundSize: "40px 40px"
          }}
        />
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative text-center max-w-md w-full"
        >
          {/* Gold envelope icon */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mb-8 w-24 h-24 flex items-center justify-center rounded-full"
            style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.4)" }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#D4AF37" }}>Almost There</p>
            <h2 className="text-4xl font-bold mb-4" style={{ color: "#FFFFF0" }}>Check Your Email</h2>
            <div className="w-12 h-px mx-auto mb-6" style={{ background: "#D4AF37" }} />
            <p className="text-base leading-relaxed mb-2" style={{ color: "rgba(255,255,240,0.7)" }}>
              We've sent a verification link to
            </p>
            <p className="text-lg font-semibold mb-6" style={{ color: "#D4AF37" }}>{form.email}</p>
            <p className="text-sm leading-relaxed mb-10" style={{ color: "rgba(255,255,240,0.5)" }}>
              Please click the link in your email to activate your account and begin your journey with Aboorva Silk House.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="flex flex-col gap-3">
            <button
              onClick={() => navigate("/login")}
              className="w-full py-4 text-sm tracking-[0.3em] uppercase font-semibold transition-all"
              style={{ background: "#800000", color: "#FFFFF0" }}
            >
              Go to Login
            </button>
            <button
              onClick={() => setStep(1)}
              className="w-full py-3 text-sm tracking-widest uppercase transition-colors"
              style={{ color: "rgba(255,255,240,0.5)", background: "transparent", border: "none" }}
              onMouseEnter={e => e.target.style.color = "#D4AF37"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,240,0.5)"}
            >
              ← Back to signup
            </button>
          </motion.div>
        </motion.div>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap');`}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Cormorant Garamond', serif", background: "#FFFFF0" }}>
      {/* Right decorative panel (flipped from login) */}
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="hidden lg:flex flex-col justify-between w-2/5 relative overflow-hidden order-last"
        style={{ background: "#1A1A2E" }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(-45deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 50%)`,
            backgroundSize: "30px 30px"
          }}
        />
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 70% 40%, rgba(212,175,55,0.15) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 p-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#D4AF37" }}>Join Us</p>
            <h2 className="text-4xl font-bold leading-tight" style={{ color: "#FFFFF0" }}>
              Begin Your<br />
              <span style={{ color: "#D4AF37" }}>Silk Journey</span>
            </h2>
            <div className="mt-4 w-16 h-px" style={{ background: "#D4AF37" }} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
          className="relative z-10 p-12 space-y-6"
        >
          {["Exclusive member offers", "Early access to new collections", "Order tracking & history"].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.15 }}
              className="flex items-center gap-3"
            >
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(212,175,55,0.2)", border: "1px solid #D4AF37" }}>
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-sm" style={{ color: "rgba(255,255,240,0.7)" }}>{item}</span>
            </motion.div>
          ))}
        </motion.div>

        <div className="absolute top-0 left-0 w-40 h-40 opacity-20"
          style={{
            background: "conic-gradient(from 180deg, #D4AF37, transparent, #D4AF37, transparent)",
            borderRadius: "0 0 100% 0"
          }}
        />
      </motion.div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden text-center mb-10">
            <h1 className="text-3xl font-bold" style={{ color: "#1A1A2E" }}>Aboorva <span style={{ color: "#D4AF37" }}>Silk House</span></h1>
          </div>

          <div className="mb-10">
            <p className="text-xs tracking-[0.35em] uppercase mb-2" style={{ color: "#D4AF37" }}>New Member</p>
            <h2 className="text-4xl font-bold" style={{ color: "#1A1A2E" }}>Create Account</h2>
            <div className="mt-3 w-12 h-px" style={{ background: "#D4AF37" }} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {fields.map((field, i) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  required={field.name !== "phone"}
                  placeholder={field.placeholder}
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
            ))}

            {/* Password field */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
              <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#36454F" }}>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Min. 6 characters"
                  className="w-full px-4 py-3.5 text-base outline-none transition-all duration-300 pr-16"
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
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs tracking-widest uppercase"
                  style={{ color: "#D4AF37" }}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </motion.div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="px-4 py-3 text-sm"
                  style={{ background: "rgba(128,0,0,0.08)", borderLeft: "3px solid #800000", color: "#800000" }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 text-sm tracking-[0.3em] uppercase font-semibold transition-all duration-300"
              style={{ background: "#800000", color: "#FFFFF0", border: "none" }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="inline-block w-4 h-4 border-2 rounded-full"
                    style={{ borderColor: "#D4AF37", borderTopColor: "transparent" }}
                  />
                  Creating Account...
                </span>
              ) : "Create Account"}
            </motion.button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px" style={{ background: "rgba(26,26,46,0.15)" }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: "#36454F" }}>or</span>
            <div className="flex-1 h-px" style={{ background: "rgba(26,26,46,0.15)" }} />
          </div>

          <p className="text-center text-base" style={{ color: "#36454F" }}>
            Already a member?{" "}
            <Link to="/login" className="font-semibold transition-colors" style={{ color: "#D4AF37" }}
              onMouseEnter={e => e.target.style.color = "#800000"}
              onMouseLeave={e => e.target.style.color = "#D4AF37"}>
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap');`}</style>
    </div>
  );
}