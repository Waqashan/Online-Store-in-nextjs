"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import QuickViewModal from "@/components/product/QuickViewModal";

export default function AppLayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <main className="flex-1 w-full min-h-screen bg-neutral-100 text-neutral-900">
        {children}
      </main>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-white text-neutral-900">
      <Navbar />
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {children}
      </main>
      <Footer />
      <CartDrawer />
      <QuickViewModal />
    </div>
  );
}
