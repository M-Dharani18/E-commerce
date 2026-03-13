
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import VerifyEmail from "./pages/VerifyEmail";
// import Home from "./pages/Home";
// import ProtectedRoute from "./components/ProtectedRoute";
// import AdminDashboard from "./pages/admin/AdminDashboard";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public routes - no login needed */}
//         <Route path="/" element={<Home />} />

//         {/* Auth routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/verify-email" element={<VerifyEmail />} />

//         {/* Protected routes - login required */}
//         <Route path="/cart" element={<ProtectedRoute><div>Cart Page Coming Soon</div></ProtectedRoute>} />
//         <Route path="/wishlist" element={<ProtectedRoute><div>Wishlist Page Coming Soon</div></ProtectedRoute>} />
//         <Route path="/profile" element={<ProtectedRoute><div>Profile Page Coming Soon</div></ProtectedRoute>} />
//         <Route path="/orders" element={<ProtectedRoute><div>Orders Page Coming Soon</div></ProtectedRoute>} />
//         <Route path="/checkout" element={<ProtectedRoute><div>Checkout Page Coming Soon</div></ProtectedRoute>} />

//         {/* Admin routes */}
//         <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
//         <Route path="/admin/*" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />

//         {/* Catch all */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;



import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastProvider } from "./components/Toast";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <ToastProvider>
    <BrowserRouter>
      <Routes>
        {/* ── Public ── */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* ── Product browsing (public) ── */}
        <Route path="/products"     element={<ProductsPage pageType="/products" />} />
        <Route path="/new-arrivals" element={<ProductsPage pageType="/new-arrivals" />} />
        <Route path="/women"        element={<ProductsPage pageType="/women" />} />
        <Route path="/men"          element={<ProductsPage pageType="/men" />} />
        <Route path="/kids"         element={<ProductsPage pageType="/kids" />} />
        <Route path="/search"       element={<ProductsPage pageType="/search" />} />
        <Route path="/product/:id"  element={<ProductDetail />} />

        {/* ── Protected customer routes ── */}
        <Route path="/cart"     element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        <Route path="/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
        <Route path="/profile"  element={<ProtectedRoute><div style={{padding:"120px 24px",fontFamily:"serif",fontSize:24}}>Profile — Coming Soon</div></ProtectedRoute>} />
        <Route path="/orders"   element={<ProtectedRoute><MyOrdersPage/></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><CheckoutPage/></ProtectedRoute>} />
        <Route path="/payment"  element={<ProtectedRoute><PaymentPage/></ProtectedRoute>} />
        <Route path="/order-confirmation" element={<ProtectedRoute><OrderConfirmation/></ProtectedRoute>} />

        {/* ── Admin routes ── */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/*" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />

        {/* ── Catch all ── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </ToastProvider>
  );
}

export default App;