import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import BottomNavigation from "./Components/Navbar/BottomNavigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShopCategory from "./Components/Pages/ShopCategory";
import Shop from "./Components/Pages/Shop";
import Product from "./Components/Pages/Product";
import Cart from "./Components/Pages/Cart";
import LoginSignup from "./Components/Pages/LoginSignup";
import Footer from "./Components/Footer/Footer";
import Checkout from "./Components/Pages/Checkout";
import OrderSuccess from "./Components/Pages/OrderSuccess";
import MyOrders from "./Components/Pages/MyOrders";
import Profile from "./Components/Pages/Profile";
import Wishlist from "./Components/Pages/Wishlist";
import About from "./Components/Pages/About";
import Contact from "./Components/Pages/Contact";
import FAQ from "./Components/Pages/FAQ";
import PolicyPage from "./Components/Pages/PolicyPage";
import AdminDashboard from "./Components/Pages/AdminDashboard";
import AdminProducts from "./Components/Pages/AdminProducts";
import AdminOrders from "./Components/Pages/AdminOrders";
import AdminContacts from "./Components/Pages/AdminContacts";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import AdminRoute from "./Components/AdminRoute/AdminRoute";
import men_banner from "./Components/Assets/banner_mens.png";
import women_banner from "./Components/Assets/banner_women.png";
import kids_banner from "./Components/Assets/banner_kids.png";
import NotFound from "./Components/Pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
      <Navbar />
      <BottomNavigation />
      <Routes>
        {/* Existing routes */}
        <Route path="/" element={<Shop />} />
        <Route
          path="/mens"
          element={<ShopCategory banner={men_banner} category="men" />}
        />
        <Route
          path="/womens"
          element={<ShopCategory banner={women_banner} category="women" />}
        />
        <Route
          path="/kids"
          element={<ShopCategory banner={kids_banner} category="kid" />}
        />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginSignup />} />

        {/* New & Enhanced routes */}
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route
          path="/track-order"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        {/* Policy routes */}
        <Route
          path="/privacy-policy"
          element={<PolicyPage title="Privacy Policy" />}
        />
        <Route
          path="/returns-policy"
          element={<PolicyPage title="Returns & Refund Policy" />}
        />
        <Route
          path="/terms"
          element={<PolicyPage title="Terms & Conditions" />}
        />

        {/* Protected routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/contacts"
          element={
            <AdminRoute>
              <AdminContacts />
            </AdminRoute>
          }
        />

        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
