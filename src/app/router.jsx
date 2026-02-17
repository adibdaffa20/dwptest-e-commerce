import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import LandingPage from "../pages/LandingPage.jsx";
import PriceListPage from "../pages/PriceListPage.jsx";
import PublicHistoryPage from "../pages/PublicHistoryPage.jsx";

import CustomerLayout from "../layouts/CustomerLayout.jsx";
import HomePage from "../pages/HomePage.jsx";
import ShopPage from "../pages/ShopPage.jsx";
import CheckoutPage from "../pages/CheckoutPage.jsx";
import MyTransactionsPage from "../pages/MyTransactionsPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import { getSession } from "../hooks/useSession.js";


function Protected({ children }) {
  const s = getSession();
  if (!s?.token) return <Navigate to="/masuk" replace />;
  return children;
}

export const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/daftar-harga", element: <PriceListPage /> },
  { path: "/riwayat", element: <PublicHistoryPage /> },
  { path: "/daftar", element: <RegisterPage /> },
  { path: "/masuk", element: <LoginPage /> },

  {
    path: "/app",
    element: (
      <Protected>
        <CustomerLayout />
      </Protected>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: "shop", element: <ShopPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "transactions", element: <MyTransactionsPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
]);
