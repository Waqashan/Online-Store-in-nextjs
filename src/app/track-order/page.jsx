"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Search, 
  Truck, 
  CheckCircle2, 
  MapPin, 
  AlertCircle
} from "lucide-react";
import { getOrderById } from "@/services/dataService";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") || "AUR-892401";

  const [searchId, setSearchId] = useState(initialId);
  const [order, setOrder] = useState(() => getOrderById(initialId));
  const [searched, setSearched] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchId.trim()) {
      const found = getOrderById(searchId.trim());
      setOrder(found || null);
      setSearched(true);
    }
  };

  const steps = [
    { step: 1, label: "Order Placed", desc: "Payment & details verified" },
    { step: 2, label: "Processing & Packaging", desc: "Velvet gift chest inspected" },
    { step: 3, label: "Shipped & Dispatched", desc: "Handed over to Express Courier" },
    { step: 4, label: "Out for Delivery", desc: "Courier on the way to destination" },
    { step: 5, label: "Delivered", desc: "Package signed by patron" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 bg-white text-neutral-900">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 text-xs font-bold uppercase tracking-wider">
          <Truck className="w-4 h-4 text-amber-600" /> Live Courier Package Radar
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-neutral-900">
          Track Your <span className="text-gold-gradient">Luxury Shipment</span>
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto font-normal">
          Enter your Order ID (e.g., AUR-892401 or AUR-892402) to view live delivery status.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="bg-white p-3 rounded-2xl border border-neutral-300 max-w-xl mx-auto flex items-center gap-2 shadow-md">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-amber-600" />
          <input 
            type="text"
            placeholder="Enter Order ID or Tracking # (e.g. AUR-892401)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2 pl-9 pr-3 text-xs text-neutral-900 uppercase font-bold focus:outline-none focus:border-amber-600"
          />
        </div>
        <button 
          type="submit"
          className="px-6 py-2 bg-gold-gradient text-neutral-950 font-bold text-xs rounded-xl shadow-md hover:brightness-110 transition"
        >
          Track
        </button>
      </form>

      {/* Status Display */}
      {searched && (
        order ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-xl space-y-8 animate-fadeIn">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-neutral-100 pb-6 gap-4">
              <div>
                <div className="text-xs text-amber-700 font-mono font-bold">
                  ORDER #{order.id}
                </div>
                <h3 className="font-heading text-xl font-bold text-neutral-900 mt-1">
                  Recipient: {order.customerName}
                </h3>
                <div className="text-xs text-neutral-500 mt-1 flex items-center gap-2 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" /> {order.shippingAddress}
                </div>
              </div>

              <div className="text-left sm:text-right bg-neutral-50 p-3 rounded-2xl border border-neutral-200 text-xs">
                <div className="text-neutral-500">Carrier: <span className="text-neutral-900 font-bold">{order.carrier}</span></div>
                <div className="text-neutral-500 mt-0.5">Tracking Code: <span className="font-mono text-amber-800 font-bold">{order.trackingNumber}</span></div>
                <div className="text-emerald-700 font-bold mt-1">Est. Delivery: {order.estimatedDelivery}</div>
              </div>
            </div>

            {/* Step Visualizer */}
            <div className="space-y-4">
              <h4 className="font-heading text-xs font-bold text-amber-800 uppercase tracking-widest">
                Delivery Timeline Progress
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {steps.map((st) => {
                  const isCompleted = order.statusStep >= st.step;
                  const isCurrent = order.statusStep === st.step;

                  return (
                    <div 
                      key={st.step}
                      className={`p-4 rounded-2xl border text-center transition-all ${
                        isCurrent
                          ? "bg-amber-500/15 border-amber-500 text-amber-900 shadow-md scale-105"
                          : isCompleted
                          ? "bg-neutral-50 border-emerald-500/50 text-neutral-900"
                          : "bg-neutral-50 border-neutral-200 text-neutral-400"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 text-xs font-bold ${
                        isCompleted ? "bg-emerald-600 text-white" : "bg-neutral-200 text-neutral-500"
                      }`}>
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : st.step}
                      </div>
                      <div className="font-bold text-xs mb-1">{st.label}</div>
                      <div className="text-[10px] text-neutral-500">{st.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Package Contents */}
            <div className="pt-4 border-t border-neutral-100 space-y-3">
              <h4 className="font-heading text-xs font-bold text-neutral-700 uppercase tracking-wider">
                Package Contents
              </h4>
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-neutral-50 p-3 rounded-xl border border-neutral-200 text-xs">
                    <img src={item.image} alt={item.productName} className="w-10 h-10 object-cover rounded-lg" />
                    <div className="flex-1">
                      <div className="font-bold text-neutral-900">{item.productName}</div>
                      <div className="text-[10px] text-neutral-500">Variant: {item.variant} | Qty: {item.quantity}</div>
                    </div>
                    <div className="font-bold text-amber-700">${(item.quantity * item.unitPrice).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          <div className="bg-white rounded-3xl p-10 text-center space-y-3 border border-neutral-200 max-w-md mx-auto shadow-sm">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
            <h3 className="font-heading text-lg font-bold text-neutral-900">No Order Found</h3>
            <p className="text-xs text-neutral-500">
              We couldn't find an active order matching "<span className="text-amber-700 font-bold">{searchId}</span>". Try searching demo ID <span className="font-mono font-bold text-neutral-900">AUR-892401</span>.
            </p>
          </div>
        )
      )}

    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center text-amber-600 font-bold">Loading order tracker...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
