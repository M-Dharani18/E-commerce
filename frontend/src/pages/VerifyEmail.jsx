// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useSearchParams, Link } from "react-router-dom";
// import { authAPI } from "../api";

// export default function VerifyEmail() {
//   const [searchParams] = useSearchParams();
//   const [status, setStatus] = useState("loading"); // loading | success | error
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const token = searchParams.get("token");
//     if (!token) {
//       setStatus("error");
//       setMessage("No verification token found. Please check your email link.");
//       return;
//     }
//     authAPI.verifyEmail(token)
//       .then((res) => {
//         setStatus("success");
//         setMessage(res.message || "Email verified successfully!");
//       })
//       .catch((err) => {
//         setStatus("error");
//         setMessage(err.response?.data?.message || err.message || "Verification failed. The link may be expired.");
//       });
//   }, [searchParams]);

//   const isSuccess = status === "success";

//   return (
//     <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
//       style={{ background: "#1A1A2E", fontFamily: "'Cormorant Garamond', serif" }}>

//       {/* Background pattern */}
//       <div className="absolute inset-0 opacity-5"
//         style={{
//           backgroundImage: `repeating-linear-gradient(45deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 50%)`,
//           backgroundSize: "40px 40px"
//         }}
//       />

//       {/* Glow */}
//       <div className="absolute inset-0"
//         style={{
//           background: isSuccess
//             ? "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.12) 0%, transparent 65%)"
//             : "radial-gradient(ellipse at 50% 50%, rgba(128,0,0,0.15) 0%, transparent 65%)"
//         }}
//       />

//       <motion.div
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.7, ease: "easeOut" }}
//         className="relative z-10 text-center max-w-lg w-full mx-6"
//       >
//         {/* Icon */}
//         <motion.div
//           initial={{ scale: 0, rotate: -30 }}
//           animate={{ scale: 1, rotate: 0 }}
//           transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
//           className="mx-auto mb-8 w-28 h-28 flex items-center justify-center rounded-full"
//           style={{
//             background: isSuccess ? "rgba(212,175,55,0.1)" : "rgba(128,0,0,0.1)",
//             border: `1px solid ${isSuccess ? "rgba(212,175,55,0.5)" : "rgba(128,0,0,0.5)"}`
//           }}
//         >
//           {status === "loading" ? (
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
//               className="w-10 h-10 rounded-full border-2"
//               style={{ borderColor: "rgba(212,175,55,0.3)", borderTopColor: "#D4AF37" }}
//             />
//           ) : isSuccess ? (
//             <motion.svg
//               initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
//               width="48" height="48" viewBox="0 0 24 24" fill="none"
//               stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"
//             >
//               <motion.path
//                 d="M20 6L9 17l-5-5"
//                 initial={{ pathLength: 0 }}
//                 animate={{ pathLength: 1 }}
//                 transition={{ delay: 0.4, duration: 0.6 }}
//               />
//             </motion.svg>
//           ) : (
//             <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#800000" strokeWidth="1.5">
//               <circle cx="12" cy="12" r="10"/>
//               <line x1="12" y1="8" x2="12" y2="12"/>
//               <line x1="12" y1="16" x2="12.01" y2="16"/>
//             </svg>
//           )}
//         </motion.div>

//         {/* Brand */}
//         <motion.p
//           initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
//           className="text-xs tracking-[0.4em] uppercase mb-3"
//           style={{ color: "#D4AF37" }}
//         >
//           Aboorva Silk House
//         </motion.p>

//         {/* Title */}
//         <motion.h1
//           initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
//           className="text-4xl font-bold mb-4"
//           style={{ color: "#FFFFF0" }}
//         >
//           {status === "loading" ? "Verifying..." : isSuccess ? "Email Verified!" : "Verification Failed"}
//         </motion.h1>

//         <motion.div
//           initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6 }}
//           className="w-16 h-px mx-auto mb-6"
//           style={{ background: isSuccess ? "#D4AF37" : "#800000" }}
//         />

//         {/* Message */}
//         <motion.p
//           initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
//           className="text-lg leading-relaxed mb-10"
//           style={{ color: "rgba(255,255,240,0.7)" }}
//         >
//           {status === "loading" ? "Please wait while we verify your email address..." : message}
//         </motion.p>

//         {/* CTA */}
//         {status !== "loading" && (
//           <motion.div
//             initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
//             className="space-y-3"
//           >
//             {isSuccess ? (
//               <Link
//                 to="/login"
//                 className="inline-block w-full py-4 text-sm tracking-[0.3em] uppercase font-semibold transition-all"
//                 style={{ background: "#800000", color: "#FFFFF0" }}
//               >
//                 Sign In to Your Account
//               </Link>
//             ) : (
//               <>
//                 <Link
//                   to="/signup"
//                   className="inline-block w-full py-4 text-sm tracking-[0.3em] uppercase font-semibold"
//                   style={{ background: "#800000", color: "#FFFFF0" }}
//                 >
//                   Back to Signup
//                 </Link>
//                 <p className="text-sm" style={{ color: "rgba(255,255,240,0.4)" }}>
//                   Already verified?{" "}
//                   <Link to="/login" style={{ color: "#D4AF37" }}>Sign in here</Link>
//                 </p>
//               </>
//             )}
//           </motion.div>
//         )}

//         {/* Decorative bottom line */}
//         <motion.div
//           initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
//           className="mt-16 flex items-center justify-center gap-3"
//         >
//           {[...Array(3)].map((_, i) => (
//             <div key={i} className="h-px" style={{
//               width: i === 1 ? "40px" : "16px",
//               background: i === 1 ? "#D4AF37" : "rgba(212,175,55,0.3)"
//             }} />
//           ))}
//         </motion.div>
//       </motion.div>

//       <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap');`}</style>
//     </div>
//   );
// }

import { useEffect, useState, useRef  } from "react";
import { motion } from "framer-motion";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { authAPI } from "../api";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();
  const hasVerified = useRef(false);

  useEffect(() => {
    if (hasVerified.current) return;
    hasVerified.current = true;

    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setMessage("No verification token found. Please check your email link.");
      return;
    }
    authAPI.verifyEmail(token)
      .then((res) => {
        setStatus("success");
        setMessage(res.message || "Email verified successfully!");
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.response?.data?.message || err.message || "Verification failed. The link may be expired.");
      });
  }, [searchParams]);

  // Countdown + auto redirect on success
  useEffect(() => {
    if (status !== "success") return;
    if (countdown <= 0) {
      navigate("/login");
      return;
    }
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [status, countdown, navigate]);

  const isSuccess = status === "success";

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "#1A1A2E", fontFamily: "'Cormorant Garamond', serif" }}>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 50%)`,
          backgroundSize: "40px 40px"
        }}
      />

      {/* Glow */}
      <div className="absolute inset-0"
        style={{
          background: isSuccess
            ? "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.12) 0%, transparent 65%)"
            : "radial-gradient(ellipse at 50% 50%, rgba(128,0,0,0.15) 0%, transparent 65%)"
        }}
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 text-center max-w-lg w-full mx-6"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="mx-auto mb-8 w-28 h-28 flex items-center justify-center rounded-full"
          style={{
            background: isSuccess ? "rgba(212,175,55,0.1)" : "rgba(128,0,0,0.1)",
            border: `1px solid ${isSuccess ? "rgba(212,175,55,0.5)" : "rgba(128,0,0,0.5)"}`
          }}
        >
          {status === "loading" ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              className="w-10 h-10 rounded-full border-2"
              style={{ borderColor: "rgba(212,175,55,0.3)", borderTopColor: "#D4AF37" }}
            />
          ) : isSuccess ? (
            <motion.svg
              width="48" height="48" viewBox="0 0 24 24" fill="none"
              stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"
            >
              <motion.path
                d="M20 6L9 17l-5-5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              />
            </motion.svg>
          ) : (
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#800000" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          )}
        </motion.div>

        {/* Brand */}
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="text-xs tracking-[0.4em] uppercase mb-3"
          style={{ color: "#D4AF37" }}
        >
          Aboorva Silk House
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="text-4xl font-bold mb-4"
          style={{ color: "#FFFFF0" }}
        >
          {status === "loading" ? "Verifying..." : isSuccess ? "Email Verified!" : "Verification Failed"}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6 }}
          className="w-16 h-px mx-auto mb-6"
          style={{ background: isSuccess ? "#D4AF37" : "#800000" }}
        />

        {/* Message */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
          className="text-lg leading-relaxed mb-4"
          style={{ color: "rgba(255,255,240,0.7)" }}
        >
          {status === "loading" ? "Please wait while we verify your email address..." : message}
        </motion.p>

        {/* Countdown text */}
        {isSuccess && (
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="text-sm mb-6 tracking-wide"
            style={{ color: "rgba(212,175,55,0.7)" }}
          >
            Redirecting to login in{" "}
            <span style={{ color: "#D4AF37", fontWeight: "600" }}>{countdown}</span>
            {" "}second{countdown !== 1 ? "s" : ""}...
          </motion.p>
        )}

        {/* Countdown ring */}
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="mx-auto mb-8 relative w-16 h-16 flex items-center justify-center"
          >
            <svg className="absolute inset-0 -rotate-90" width="64" height="64">
              <circle cx="32" cy="32" r="28" fill="none"
                stroke="rgba(212,175,55,0.15)" strokeWidth="3" />
              <motion.circle
                cx="32" cy="32" r="28" fill="none"
                stroke="#D4AF37" strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 28}
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 28 }}
                transition={{ duration: 5, ease: "linear" }}
              />
            </svg>
            <span className="text-lg font-bold" style={{ color: "#D4AF37" }}>{countdown}</span>
          </motion.div>
        )}

        {/* CTA */}
        {status !== "loading" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
            className="space-y-3"
          >
            {isSuccess ? (
              <Link
                to="/login"
                className="inline-block w-full py-4 text-sm tracking-[0.3em] uppercase font-semibold transition-all"
                style={{ background: "#800000", color: "#FFFFF0" }}
              >
                Sign In Now
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="inline-block w-full py-4 text-sm tracking-[0.3em] uppercase font-semibold"
                  style={{ background: "#800000", color: "#FFFFF0" }}
                >
                  Back to Signup
                </Link>
                <p className="text-sm" style={{ color: "rgba(255,255,240,0.4)" }}>
                  Already verified?{" "}
                  <Link to="/login" style={{ color: "#D4AF37" }}>Sign in here</Link>
                </p>
              </>
            )}
          </motion.div>
        )}

        {/* Decorative bottom line */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="mt-16 flex items-center justify-center gap-3"
        >
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-px" style={{
              width: i === 1 ? "40px" : "16px",
              background: i === 1 ? "#D4AF37" : "rgba(212,175,55,0.3)"
            }} />
          ))}
        </motion.div>
      </motion.div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap');`}</style>
    </div>
  );
}