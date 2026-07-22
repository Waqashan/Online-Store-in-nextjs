"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  BarChart3, 
  Layers, 
  Package, 
  ShoppingBag, 
  Users, 
  Tag, 
  ImageIcon, 
  Percent, 
  Star, 
  FileText, 
  Truck, 
  ShieldCheck, 
  LogOut, 
  ChevronRight, 
  ExternalLink, 
  Menu, 
  X,
  Bell,
  Search,
  Crown
} from "lucide-react";
import { getStoreConfig } from "@/services/dataService";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const store = getStoreConfig();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Skip layout if on admin login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("aureate_admin_session");
    }
    router.push("/admin/login");
  };

  const navItems = [
    { label: "Overview & Analytics", href: "/admin", icon: BarChart3 },
    { label: "Categories Builder", href: "/admin/categories", icon: Layers },
    { label: "Products Catalog", href: "/admin/products", icon: Package },
    { label: "Customer Orders", href: "/admin/orders", icon: ShoppingBag },
    { label: "VIP Customers", href: "/admin/customers", icon: Users },
    { label: "Brand Partners", href: "/admin/brands", icon: Tag },
    { label: "Hero Banners", href: "/admin/banners", icon: ImageIcon },
    { label: "Coupons & Promos", href: "/admin/coupons", icon: Percent },
    { label: "Reviews Moderation", href: "/admin/reviews", icon: Star },
    { label: "CMS Pages & Blogs", href: "/admin/pages", icon: FileText },
    { label: "Shipping & Tax Settings", href: "/admin/shipping", icon: Truck },
  ];

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col lg:flex-row font-sans">
      
      {/* Mobile Header Bar */}
      <header className="lg:hidden bg-neutral-950 border-b border-amber-500/20 p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 text-neutral-950 flex items-center justify-center font-bold">
            <Crown className="w-4 h-4" />
          </div>
          <div>
            <span className="font-heading text-base font-bold text-white uppercase">{store.name}</span>
            <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded ml-2 uppercase font-mono">Admin</span>
          </div>
        </div>
        <button 
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="p-2 text-neutral-300 hover:text-amber-400"
        >
          {isMobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed lg:sticky top-0 inset-y-0 left-0 z-40 w-72 bg-neutral-950 border-r border-amber-500/20 flex flex-col justify-between transform transition-transform duration-300 ease-in-out
        ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        h-screen overflow-y-auto shrink-0
      `}>
        
        <div className="p-6 space-y-6">
          
          {/* Admin Identity */}
          <div className="flex items-center gap-3 pb-6 border-b border-neutral-800">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 p-0.5 shadow-md shrink-0">
              <div className="w-full h-full bg-neutral-950 rounded-2xl flex items-center justify-center text-amber-400">
                <Crown className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h2 className="font-heading text-lg font-bold text-white uppercase tracking-wider leading-none">
                {store.name}
              </h2>
              <span className="text-[10px] text-amber-400 font-mono tracking-widest uppercase block mt-1">
                Control Center
              </span>
            </div>
          </div>

          {/* Admin Profile Status */}
          <div className="bg-neutral-900/90 border border-amber-500/30 rounded-2xl p-3.5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold text-xs">
              SA
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-white truncate">Super Administrator</h4>
              <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active Session
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <div className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider px-3 mb-2">
              Management Modules
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive 
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold shadow-md" 
                      : "text-neutral-300 hover:bg-neutral-900 hover:text-amber-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-neutral-950" : "text-amber-500/80"}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-neutral-950" />}
                </Link>
              );
            })}
          </nav>

        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-6 border-t border-neutral-800 space-y-3 bg-neutral-950/80">
          <Link 
            href="/" 
            target="_blank"
            className="w-full py-2.5 px-3.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-xs font-bold text-neutral-300 hover:text-white transition flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" /> View Live Storefront
            </span>
            <span className="text-[10px] text-amber-400">Live &rarr;</span>
          </Link>

          <button 
            onClick={handleLogout}
            className="w-full py-2.5 px-3.5 bg-rose-500/10 hover:bg-rose-600 border border-rose-500/30 text-rose-300 hover:text-white rounded-xl text-xs font-bold transition flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Session</span>
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-neutral-100 text-neutral-900 min-h-screen">
        
        {/* Top Header Bar for Desktop */}
        <header className="hidden lg:flex bg-white border-b border-neutral-200 py-3.5 px-8 justify-between items-center sticky top-0 z-30 shadow-sm">
          
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>{store.name} Secured Admin Workspace</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search catalog, orders, SKUs..."
                className="bg-neutral-50 border border-neutral-200 rounded-xl py-1.5 pl-9 pr-4 text-xs font-medium focus:outline-none focus:border-amber-600 w-64"
              />
            </div>

            <div className="flex items-center gap-3 border-l border-neutral-200 pl-6">
              <button className="p-2 text-neutral-500 hover:text-amber-600 transition relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full" />
              </button>

              <Link 
                href="/" 
                className="px-3 py-1.5 bg-neutral-900 text-white rounded-xl text-xs font-bold hover:bg-neutral-800 transition flex items-center gap-1"
              >
                <span>Storefront</span>
                <ExternalLink className="w-3 h-3 text-amber-400" />
              </Link>
            </div>
          </div>

        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-[1920px] mx-auto">
          {children}
        </main>

      </div>

    </div>
  );
}
