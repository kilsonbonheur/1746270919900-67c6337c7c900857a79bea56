import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import ToastProvider from "./Toast";
import ScrollToTop from "./ScrollToTop";

function Layout() {
  return (
    <div id="app_layout" className="flex flex-col min-h-screen">
      <ScrollToTop />
      <ToastProvider />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <WhatsAppButton />
      <Footer />
    </div>
  );
}

export default Layout;
