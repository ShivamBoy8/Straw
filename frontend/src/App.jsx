import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// Pages
import Home from "./pages/Home/Home";
import Men from "./pages/Men/Men";
import Women from "./pages/Women/Women";
import Kids from "./pages/Kids/Kids";

import Product from "./pages/Products/Product";
import ProductDetails from "./pages/ProductDetails/ProductDetails";

import CartPage from "./pages/Cart/CartPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

import OrdersPage from "./pages/Orders/OrdersPage";
import OrderSuccess from "./pages/Orders/OrderSuccess";

import Profile from "./pages/Profile/Profile";

// Admin
import Dashboard from "./pages/Admin/Dashboard";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminRoute from "./components/Admin/AdminRoute";

// Redux
import { checkAuth } from "./features/auth/authSlice";
import { getCart } from "./features/cart/cartSlice";

import Products from "./pages/Admin/Products";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import AddProduct from "./pages/Admin/AddProduct";
import EditProduct from "./pages/Admin/EditProduct";

import Orders from "./pages/Admin/Orders";
import OrderDetails from "./pages/Admin/OrderDetails";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCart());
    }
  }, [dispatch, isAuthenticated]);

  const hideNavbarRoutes = ["/login", "/signup"];
  const isAdminRoute = location.pathname.startsWith("/admin");

  const showNavbar =
    !hideNavbarRoutes.includes(location.pathname) && !isAdminRoute;

  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/kids" element={<Kids />} />

        <Route path="/products" element={<Product />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected User Routes */}

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="/order-success" element={<OrderSuccess />} />

        {/* Admin Routes */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Dashboard />} />

          <Route path="products" element={<Products />} />

          <Route path="products/new" element={<AddProduct />} />

          <Route path="products/edit/:id" element={<EditProduct />} />

          <Route path="orders" element={<Orders />} />

          <Route path="orders/:id" element={<OrderDetails />} />
        </Route>
      </Routes>

      {showNavbar && <Footer />}
    </>
  );
};

export default App;
