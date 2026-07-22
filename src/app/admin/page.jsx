"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  TrendingUp, 
  ShoppingBag, 
  Package, 
  Users, 
  Plus, 
  ChevronRight, 
  ArrowUpRight, 
  Sparkles,
  BarChart3,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  TrendingDown
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getCategories, getProducts, getAllOrders } from "@/services/dataService";
import { mockCustomers } from "@/data/adminMockData";

export default function AdminOverviewPage() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [ordersList, setOrdersList] = useState([]);
  const [isStoreLive, setIsStoreLive] = useState(true);
  const [dateFilter, setDateFilter] = useState("last-30");

  useEffect(() => {
    setCategoriesList(getCategories());
    setProductsList(getProducts());
    setOrdersList(getAllOrders());
  }, []);

  // Quick Restock Handler
  const handleQuickRestock = (productId) => {
    const updated = productsList.map(p => p.id === productId ? { ...p, stock: p.stock + 50 } : p);
    setProductsList(updated);
  };

  // Mock Date-filtered Data Map
  const getFilteredMetrics = () => {
    switch (dateFilter) {
      case "today":
        return {
          revenue: 145000,
          orders: 3,
          growth: "+4.2% vs yesterday",
          chart: [
            { label: "09:00", val: "Rs. 25k", height: "30%" },
            { label: "12:00", val: "Rs. 45k", height: "65%" },
            { label: "15:00", val: "Rs. 15k", height: "20%" },
            { label: "18:00", val: "Rs. 60k", height: "85%" },
            { label: "21:00", val: "Rs. 0k", height: "5%" },
          ]
        };
      case "last-7":
        return {
          revenue: 1280000,
          orders: 24,
          growth: "+12.5% vs prev week",
          chart: [
            { label: "Mon", val: "Rs. 180k", height: "50%" },
            { label: "Tue", val: "Rs. 220k", height: "60%" },
            { label: "Wed", val: "Rs. 150k", height: "45%" },
            { label: "Thu", val: "Rs. 290k", height: "80%" },
            { label: "Fri", val: "Rs. 310k", height: "90%" },
            { label: "Sat", val: "Rs. 130k", height: "35%" },
            { label: "Sun", val: "Rs. 0k", height: "5%" },
          ]
        };
      case "last-30":
        return {
          revenue: 8425000,
          orders: 142,
          growth: "+24.8% vs last month",
          chart: [
            { label: "Week 1", val: "Rs. 1.8M", height: "45%" },
            { label: "Week 2", val: "Rs. 2.4M", height: "65%" },
            { label: "Week 3", val: "Rs. 1.2M", height: "30%" },
            { label: "Week 4", val: "Rs. 3.0M", height: "85%" },
          ]
        };
      case "this-month":
        return {
          revenue: 9680000,
          orders: 168,
          growth: "+18.2% target pace",
          chart: [
            { label: "Wk 1", val: "Rs. 2.1M", height: "55%" },
            { label: "Wk 2", val: "Rs. 2.8M", height: "70%" },
            { label: "Wk 3", val: "Rs. 1.6M", height: "40%" },
            { label: "Wk 4", val: "Rs. 3.1M", height: "90%" },
          ]
        };
      case "all-time":
        return {
          revenue: 24890000,
          orders: 412,
          growth: "+114% annual trend",
          chart: [
            { label: "2023", val: "Rs. 3.2M", height: "30%" },
            { label: "2024", val: "Rs. 6.8M", height: "60%" },
            { label: "2025", val: "Rs. 9.1M", height: "80%" },
            { label: "2026", val: "Rs. 5.7M", height: "50%" },
          ]
        };
      default:
        return { revenue: 0, orders: 0, growth: "", chart: [] };
    }
  };

  const currentMetrics = getFilteredMetrics();
  const lowStockProducts = productsList.filter(p => p.stock < 15);

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 text-white rounded-3xl p-8 border border-amber-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-2 relative z-10">
            <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-300 text-[10px] uppercase font-bold tracking-widest inline-block">
              Executive Analytics Portal
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-wider">
              Store Command <span className="text-gold-gradient">Dashboard</span>
            </h1>
            <p className="text-xs text-neutral-300 max-w-xl">
              Real-time insights across product inventory, VIP orders, sales growth, and taxonomy management.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 relative z-10 items-center">
            {/* Live Status Switch */}
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2.5 rounded-xl border border-white/20 text-xs">
              <span className={`w-2.5 h-2.5 rounded-full ${isStoreLive ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
              <span className="font-bold">Store: {isStoreLive ? "LIVE" : "MAINTENANCE"}</span>
              <button onClick={() => setIsStoreLive(!isStoreLive)} className="ml-1 text-neutral-300 hover:text-white">
                {isStoreLive ? <ToggleRight className="w-6 h-6 text-emerald-400" /> : <ToggleLeft className="w-6 h-6 text-amber-400" />}
              </button>
            </div>

            {/* Date Filter selector */}
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2.5 rounded-xl border border-white/20 text-xs">
              <Calendar className="w-4 h-4 text-amber-500" />
              <select 
                value={dateFilter} 
                onChange={(e) => setDateFilter(e.target.value)}
                className="bg-transparent text-white font-bold outline-none cursor-pointer"
              >
                <option value="today" className="text-neutral-900">Today</option>
                <option value="last-7" className="text-neutral-900">Last 7 Days</option>
                <option value="last-30" className="text-neutral-900">Last 30 Days</option>
                <option value="this-month" className="text-neutral-900">This Month</option>
                <option value="all-time" className="text-neutral-900">All Time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Executive KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex justify-between items-center text-xs font-bold text-neutral-500 uppercase">
              <span>Revenue Forecast</span>
              <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-700 border border-emerald-200">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="use-font-body text-2xl font-bold text-neutral-900">
                Rs. {currentMetrics.revenue.toLocaleString()}
              </div>
              <div className="text-[11px] text-emerald-700 font-bold mt-1 flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> {currentMetrics.growth}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex justify-between items-center text-xs font-bold text-neutral-500 uppercase">
              <span>Orders Captured</span>
              <div className="p-2.5 bg-amber-50 rounded-xl text-amber-700 border border-amber-200">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="use-font-body text-2xl font-bold text-neutral-900">
                {currentMetrics.orders} Orders
              </div>
              <div className="text-[11px] text-amber-800 font-bold mt-1">Insured & Inspected Dispatch</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex justify-between items-center text-xs font-bold text-neutral-500 uppercase">
              <span>Catalog SKUs</span>
              <div className="p-2.5 bg-amber-50 rounded-xl text-amber-700 border border-amber-200">
                <Package className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="use-font-body text-2xl font-bold text-neutral-900">{productsList.length} Items</div>
              <div className="text-[11px] text-neutral-500 font-medium mt-1">Across {categoriesList.length} Active Categories</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex justify-between items-center text-xs font-bold text-neutral-500 uppercase">
              <span>Patrons Registry</span>
              <div className="p-2.5 bg-neutral-100 rounded-xl text-neutral-800 border border-neutral-200">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="use-font-body text-2xl font-bold text-neutral-900">{mockCustomers.length} Customers</div>
              <div className="text-[11px] text-emerald-700 font-bold mt-1">+12 Accounts Registered</div>
            </div>
          </div>

        </div>

        {/* Low Stock Alerts Banner */}
        {lowStockProducts.length > 0 && (
          <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-sm border-b border-rose-200 pb-2">
              <AlertCircle className="w-5 h-5 text-rose-600 animate-pulse" />
              <span>Low Stock Alerts ({lowStockProducts.length} items require attention)</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold">
              {lowStockProducts.map(p => (
                <div key={p.id} className="bg-white p-3 border border-rose-200 rounded-2xl flex items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3">
                    <img src={p.mainImage} alt={p.name} className="w-10 h-10 rounded-lg object-cover border" />
                    <div>
                      <div className="text-neutral-900 text-xs font-bold">{p.name}</div>
                      <div className="text-[10px] text-neutral-400 font-mono">SKU: {p.sku}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-rose-700 text-xs font-bold">{p.stock} left</span>
                    <button 
                      onClick={() => handleQuickRestock(p.id)}
                      className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-[10px] font-bold shadow"
                    >
                      +50 Restock
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Revenue Performance Chart & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sales Performance Visualizer */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
              <div>
                <h3 className="font-heading text-xl font-bold text-neutral-900">Revenue Performance Graph</h3>
                <p className="text-xs text-neutral-500">Filtered timeframe sales visualizer chart.</p>
              </div>
              <span className="text-xs text-amber-800 font-bold bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                PKR (Rs.)
              </span>
            </div>

            {/* Bar Chart Simulation */}
            <div className="h-64 flex items-end justify-between gap-4 pt-8 px-2 border-b border-neutral-200 pb-2">
              {currentMetrics.chart.map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[10px] text-amber-800 font-bold opacity-0 group-hover:opacity-100 transition font-mono">
                    {bar.val}
                  </span>
                  <div 
                    style={{ height: bar.height }} 
                    className="w-full bg-gradient-to-t from-amber-600 via-amber-500 to-amber-400 rounded-t-xl transition-all duration-500 group-hover:brightness-110 shadow-sm" 
                  />
                  <span className="text-[11px] font-bold text-neutral-600 truncate max-w-[60px]">{bar.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between text-xs text-neutral-500 gap-2">
              <span>Top Category: <strong className="text-neutral-900">Organics & Wild Sidr Honey</strong></span>
              <span>Average Order Value: <strong className="text-amber-800">Rs. 165,000</strong></span>
            </div>
          </div>

          {/* Module Direct Jump Shortcuts */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-4">
            <h3 className="font-heading text-xl font-bold text-neutral-900 border-b border-neutral-100 pb-4">
              Management Modules
            </h3>

            <div className="space-y-3">
              <Link 
                href="/admin/categories"
                className="p-3.5 bg-neutral-50 hover:bg-amber-50/60 border border-neutral-200 hover:border-amber-300 rounded-2xl text-xs font-bold text-neutral-900 flex items-center justify-between transition group"
              >
                <span className="flex items-center gap-2.5">
                  <span className="p-2 bg-amber-500/10 text-amber-700 rounded-xl group-hover:bg-amber-500 group-hover:text-neutral-950 transition">
                    <BarChart3 className="w-4 h-4" />
                  </span>
                  Categories Builder
                </span>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link 
                href="/admin/products"
                className="p-3.5 bg-neutral-50 hover:bg-amber-50/60 border border-neutral-200 hover:border-amber-300 rounded-2xl text-xs font-bold text-neutral-900 flex items-center justify-between transition group"
              >
                <span className="flex items-center gap-2.5">
                  <span className="p-2 bg-amber-500/10 text-amber-700 rounded-xl group-hover:bg-amber-500 group-hover:text-neutral-950 transition">
                    <Package className="w-4 h-4" />
                  </span>
                  Products Inventory
                </span>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link 
                href="/admin/orders"
                className="p-3.5 bg-neutral-50 hover:bg-amber-50/60 border border-neutral-200 hover:border-amber-300 rounded-2xl text-xs font-bold text-neutral-900 flex items-center justify-between transition group"
              >
                <span className="flex items-center gap-2.5">
                  <span className="p-2 bg-amber-500/10 text-amber-700 rounded-xl group-hover:bg-amber-500 group-hover:text-neutral-950 transition">
                    <ShoppingBag className="w-4 h-4" />
                  </span>
                  Orders Pipeline
                </span>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link 
                href="/admin/banners"
                className="p-3.5 bg-neutral-50 hover:bg-amber-50/60 border border-neutral-200 hover:border-amber-300 rounded-2xl text-xs font-bold text-neutral-900 flex items-center justify-between transition group"
              >
                <span className="flex items-center gap-2.5">
                  <span className="p-2 bg-amber-500/10 text-amber-700 rounded-xl group-hover:bg-amber-500 group-hover:text-neutral-950 transition">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  Campaign Banners
                </span>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

        {/* Recent Activity Orders Stream */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
            <div>
              <h3 className="font-heading text-xl font-bold text-neutral-900">Recent Customer Orders</h3>
              <p className="text-xs text-neutral-500">Live feed of orders placed by patrons.</p>
            </div>
            <Link href="/admin/orders" className="text-xs text-amber-700 font-bold hover:underline flex items-center gap-1">
              <span>View All Orders</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {ordersList.slice(0, 3).map((ord) => (
              <div key={ord.id} className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-amber-800 font-bold text-xs">ORDER #{ord.id}</span>
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-bold text-[10px] rounded">
                      {ord.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-neutral-900 text-xs mt-1">{ord.customerName} &bull; {ord.email}</h4>
                </div>

                <div className="text-right">
                  <div className="use-font-body font-bold text-amber-800 text-sm">Rs. {ord.total.toLocaleString()}</div>
                  <div className="text-[10px] text-neutral-500">Paid via {ord.paymentMethod}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
