"use client";

import React, { useState, useEffect } from "react";
import { 
  ShoppingBag, 
  CheckCircle2, 
  X, 
  Search, 
  Printer, 
  Truck, 
  Eye, 
  MapPin, 
  FileText, 
  Mail, 
  Phone,
  Filter,
  Calendar,
  AlertCircle
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getAllOrders } from "@/services/dataService";

export default function AdminOrdersPage() {
  const [ordersList, setOrdersList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  // Date Filtering States
  const [dateFilter, setDateFilter] = useState("today"); // default is "today"
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");

  useEffect(() => {
    // Fetch orders and inject sample item details for professional lookup
    const rawOrders = getAllOrders();
    const hydratedOrders = rawOrders.map(o => ({
      ...o,
      date: o.date || new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      createdAt: o.createdAt || new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      phone: o.phone || "0300-1234567",
      trackingCode: o.trackingCode || "",
      items: (o.items || [
        { productName: "Royal Wild-Harvested Sidr Honey (250G)", quantity: 2, unitPrice: 999 },
        { productName: "Golden Bilona A2 Desi Cow Ghee (800g)", quantity: 1, unitPrice: 2399 }
      ]).map(item => ({
        name: item.name || item.productName || "Product Item",
        quantity: item.quantity || 1,
        price: item.price || item.unitPrice || 0
      }))
    }));

    // Inject an order placed TODAY so the default "Today" date filter isn't empty!
    const todayOrder = {
      id: "SHZ-TODAY-001",
      customerName: "Mohammad Ali",
      email: "ali.customer@example.pk",
      phone: "0321-9876543",
      status: "Processing",
      paymentMethod: "Cash on Delivery (COD)",
      shippingAddress: "Street 4, Sector G-11/3, Islamabad, Pakistan",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      createdAt: new Date().toISOString(),
      trackingCode: "",
      total: 3398.00,
      items: [
        { name: "Royal Wild-Harvested Sidr Honey (600G)", quantity: 1, price: 2399 },
        { name: "Golden Bilona A2 Desi Cow Ghee (250G)", quantity: 1, price: 999 }
      ]
    };

    setOrdersList([todayOrder, ...hydratedOrders]);
  }, []);

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrdersList(ordersList.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    triggerToast(`Order #${orderId} status updated to '${newStatus}'!`);
  };

  const handleUpdateTrackingCode = (orderId, code) => {
    setOrdersList(ordersList.map(o => o.id === orderId ? { ...o, trackingCode: code } : o));
    triggerToast(`Tracking ID '${code}' assigned to Order #${orderId}!`);
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // Status Color Helper
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "Shipped":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "Processing":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Cancelled":
        return "bg-rose-50 text-rose-800 border-rose-200";
      default:
        return "bg-neutral-100 text-neutral-800 border-neutral-300";
    }
  };

  // Filtering Logic (incorporating both status tab, date filters & search)
  const filteredOrders = ordersList.filter((ord) => {
    const matchesSearch = 
      ord.id.toString().includes(searchQuery) ||
      ord.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.shippingAddress.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status Filter matches
    const matchesStatus = activeTab === "all" || ord.status.toLowerCase() === activeTab.toLowerCase();

    // Date Range Filter matches
    const ordDate = new Date(ord.createdAt || ord.date);
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    let matchesDate = true;
    if (dateFilter === "today") {
      matchesDate = ordDate >= startOfToday;
    } else if (dateFilter === "weekly") {
      const startOfWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      matchesDate = ordDate >= startOfWeek;
    } else if (dateFilter === "monthly") {
      const startOfMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      matchesDate = ordDate >= startOfMonth;
    } else if (dateFilter === "custom") {
      if (customStartDate && customEndDate) {
        const start = new Date(customStartDate);
        const end = new Date(customEndDate);
        end.setHours(23, 59, 59, 999);
        matchesDate = ordDate >= start && ordDate <= end;
      }
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {toastMessage && (
          <div className="p-4 bg-emerald-600 text-white font-bold text-xs rounded-2xl flex items-center justify-between shadow-xl animate-fadeIn z-50">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage("")}><X className="w-4 h-4" /></button>
          </div>
        )}

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-100 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 font-bold text-xs rounded-full border border-amber-200 mb-2">
                <ShoppingBag className="w-3.5 h-3.5" /> Order Fulfillment Pipeline
              </div>
              <h1 className="font-heading text-2xl font-bold text-neutral-900">Customer Orders Hub</h1>
              <p className="text-xs text-neutral-500">Monitor incoming payments, customize courier tracking details, and print customer invoices.</p>
            </div>

            {/* Date Filters Select Widget */}
            <div className="flex items-center gap-2 bg-neutral-100 border border-neutral-200 px-4 py-2 rounded-xl text-xs">
              <Calendar className="w-4 h-4 text-amber-600" />
              <select 
                value={dateFilter} 
                onChange={(e) => setDateFilter(e.target.value)}
                className="bg-transparent font-bold text-neutral-800 outline-none cursor-pointer"
              >
                <option value="today">Today</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="custom">Custom Date Range</option>
              </select>
            </div>
          </div>

          {/* Custom Date Picker Inputs */}
          {dateFilter === "custom" && (
            <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl flex flex-col sm:flex-row gap-4 items-center text-xs animate-fadeIn">
              <div className="flex items-center gap-2">
                <span className="font-bold text-neutral-700">Start Date:</span>
                <input 
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="bg-white border border-neutral-200 p-2 rounded-lg font-semibold outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-neutral-700">End Date:</span>
                <input 
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="bg-white border border-neutral-200 p-2 rounded-lg font-semibold outline-none"
                />
              </div>
              <p className="text-[10px] text-amber-800 font-bold italic sm:ml-auto">
                Showing orders matching this specific range.
              </p>
            </div>
          )}

          {/* Filtering Tabs & Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-neutral-50 p-4 rounded-2xl border border-neutral-200">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input 
                type="text"
                placeholder="Search by Order ID, Name, City..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-neutral-200 rounded-xl py-2 pl-9 pr-4 text-xs font-semibold focus:outline-none focus:border-amber-600 text-neutral-950"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 justify-end w-full md:w-auto">
              {["all", "processing", "shipped", "delivered", "cancelled"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition ${
                    activeTab === tab 
                      ? "bg-amber-500 text-neutral-950 shadow-sm" 
                      : "bg-white border border-neutral-200 text-neutral-600 hover:text-amber-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Orders Pipeline List */}
          <div className="space-y-4">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((ord) => (
                <div key={ord.id} className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 hover:shadow-md transition space-y-4">
                  
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-neutral-200/60 pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-neutral-900 font-bold text-xs">ORDER #{ord.id}</span>
                        <span className="text-[10px] text-neutral-400 font-mono">Date: {ord.date}</span>
                      </div>
                      <span className={`inline-block px-2.5 py-0.5 border text-[9px] rounded-full font-bold uppercase ${getStatusColor(ord.status)}`}>
                        {ord.status}
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="use-font-body font-semibold text-neutral-900 text-sm">
                        Rs. {ord.total.toLocaleString()}
                      </div>
                      <span className="text-[10px] text-neutral-500 font-medium">via {ord.paymentMethod}</span>
                    </div>
                  </div>

                  {/* Order Body Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-xs">
                    
                    {/* Customer info */}
                    <div className="md:col-span-4 space-y-2 font-medium">
                      <h4 className="font-bold text-[10px] uppercase tracking-wider text-amber-800">Patron Details</h4>
                      <div className="space-y-1 text-neutral-600">
                        <div className="font-bold text-neutral-900">{ord.customerName}</div>
                        <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-neutral-400" /> {ord.email}</div>
                        <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-neutral-400" /> {ord.phone}</div>
                        <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-neutral-400" /> {ord.shippingAddress}</div>
                      </div>
                    </div>

                    {/* Ordered items list */}
                    <div className="md:col-span-4 space-y-2">
                      <h4 className="font-bold text-[10px] uppercase tracking-wider text-amber-800">Items Ordered</h4>
                      <div className="bg-white p-3 rounded-xl border border-neutral-200 space-y-2 max-h-32 overflow-y-auto">
                        {ord.items.map((item, i) => (
                          <div key={i} className="flex justify-between items-center text-[10px] text-neutral-600 font-semibold border-b border-neutral-100 pb-1.5 last:border-0 last:pb-0">
                            <div>
                              <span className="font-bold text-neutral-900">{item.quantity}x</span> {item.name}
                            </div>
                            <div className="text-neutral-500 font-mono">Rs. {item.price.toLocaleString()}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Logistics Fulfillment */}
                    <div className="md:col-span-4 space-y-3 font-medium">
                      <h4 className="font-bold text-[10px] uppercase tracking-wider text-amber-800">Fulfillment Logistics</h4>
                      
                      {/* Status Selector + Update Button */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <label className="text-[11px] text-neutral-500 shrink-0">Status:</label>
                        <select 
                          id={`status-select-${ord.id}`}
                          defaultValue={ord.status}
                          className="bg-white border border-neutral-300 rounded-lg px-2.5 py-1 text-[11px] font-bold text-amber-900 focus:outline-none"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => {
                            const val = document.getElementById(`status-select-${ord.id}`).value;
                            handleUpdateOrderStatus(ord.id, val);
                          }}
                          className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold rounded-lg text-[10px] shadow-sm transition"
                        >
                          Update Status
                        </button>
                      </div>

                      {/* TCS/Leopards Tracking assignment */}
                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          const val = e.target.tracking.value.trim();
                          if (val) handleUpdateTrackingCode(ord.id, val);
                        }}
                        className="flex gap-2"
                      >
                        <input 
                          name="tracking"
                          type="text" 
                          placeholder="Courier Tracking ID (TCS)"
                          defaultValue={ord.trackingCode}
                          className="w-full bg-white border border-neutral-300 rounded-lg px-2 py-1 text-[10px] font-semibold focus:outline-none"
                        />
                        <button type="submit" className="px-2.5 py-1 bg-neutral-900 text-white text-[10px] rounded-lg hover:bg-neutral-800 font-bold shrink-0">
                          Assign
                        </button>
                      </form>
                    </div>

                  </div>

                  {/* Actions / Invoice Printer */}
                  <div className="border-t border-neutral-200/60 pt-3 flex justify-between items-center">
                    <span className="text-[10px] text-neutral-500 font-medium">
                      {ord.trackingCode ? (
                        <span className="text-emerald-700 flex items-center gap-1 font-bold">
                          <Truck className="w-3.5 h-3.5" /> Dispatched via Tracking: {ord.trackingCode}
                        </span>
                      ) : (
                        <span className="text-amber-700 font-bold">Awaiting Courier Dispatch Assignment</span>
                      )}
                    </span>

                    <button 
                      onClick={() => setSelectedOrderForInvoice(ord)}
                      className="px-3 py-1.5 bg-neutral-100 hover:bg-amber-500/20 text-neutral-700 hover:text-amber-900 rounded-lg border border-neutral-200 text-[10px] font-bold flex items-center gap-1 transition"
                    >
                      <Printer className="w-3.5 h-3.5" /> Print Invoice Receipt
                    </button>
                  </div>

                </div>
              ))
            ) : (
              <div className="p-8 text-center text-neutral-400 italic bg-neutral-50 rounded-2xl border border-neutral-200">
                No orders match search query, selected status filter, or active timeframe.
              </div>
            )}
          </div>
        </div>

        {/* Invoice Modal Overlay */}
        {selectedOrderForInvoice && (
          <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
            <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm" onClick={() => setSelectedOrderForInvoice(null)} />
            
            <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-amber-500/30 max-w-lg w-full z-10 space-y-6 shadow-2xl">
              
              <button 
                onClick={() => setSelectedOrderForInvoice(null)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900"
              >
                <X className="w-5 h-5" />
              </button>

              <div id="printable-invoice" className="space-y-6 text-xs text-neutral-700">
                {/* Header */}
                <div className="flex justify-between items-start border-b pb-4 border-neutral-200">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-neutral-900">sheraz.pk</h3>
                    <p className="text-[10px] text-neutral-400">Premium Organic & Luxury Emporium</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-xs uppercase text-amber-800">Invoice Receipt</span>
                    <p className="font-mono text-[10px] mt-0.5">Order ID: {selectedOrderForInvoice.id}</p>
                    <p className="text-[10px]">Date: {selectedOrderForInvoice.date}</p>
                  </div>
                </div>

                {/* Billing */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-bold text-neutral-900 block mb-1">Deliver To:</span>
                    <p className="font-bold text-neutral-800">{selectedOrderForInvoice.customerName}</p>
                    <p className="text-[10px] text-neutral-500">{selectedOrderForInvoice.shippingAddress}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-neutral-900 block mb-1">Payment Method:</span>
                    <p className="text-neutral-800">{selectedOrderForInvoice.paymentMethod}</p>
                    <p className="text-[10px] text-emerald-700 font-bold">Transaction Secured</p>
                  </div>
                </div>

                {/* Items list */}
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-200 text-neutral-900 font-bold bg-neutral-50">
                      <th className="py-2 px-1">Description</th>
                      <th className="py-2 px-1 text-center">Qty</th>
                      <th className="py-2 px-1 text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrderForInvoice.items.map((item, idx) => (
                      <tr key={idx} className="border-b border-neutral-100 font-medium">
                        <td className="py-2 px-1">{item.name}</td>
                        <td className="py-2 px-1 text-center font-bold text-neutral-900">{item.quantity}</td>
                        <td className="py-2 px-1 text-right font-mono">Rs. {item.price.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Total box */}
                <div className="flex justify-between items-center pt-2 text-sm border-t border-neutral-200">
                  <span className="font-bold text-neutral-950">Grand Total Due (Insured COD):</span>
                  <span className="use-font-body font-bold text-amber-800 text-base">
                    Rs. {selectedOrderForInvoice.total.toLocaleString()}
                  </span>
                </div>

              </div>

              {/* print action button */}
              <div className="flex gap-3 pt-2">
                <button onClick={() => setSelectedOrderForInvoice(null)} className="flex-1 py-2.5 bg-neutral-100 rounded-xl text-xs font-bold text-neutral-600">Close Receipt</button>
                <button 
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.print();
                    }
                  }} 
                  className="flex-1 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-4 h-4" /> Print PDF Invoice
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
