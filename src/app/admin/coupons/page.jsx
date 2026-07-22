"use client";

import React, { useState, useEffect } from "react";
import { Percent, Plus, Trash2, CheckCircle2, X } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getCoupons } from "@/services/dataService";

export default function AdminCouponsPage() {
  const [couponsList, setCouponsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [form, setForm] = useState({ code: "", discount: 20, description: "" });

  useEffect(() => {
    setCouponsList(getCoupons());
  }, []);

  const handleAddCoupon = (e) => {
    e.preventDefault();
    if (!form.code) return;
    const newCoupon = {
      code: form.code.toUpperCase(),
      discountPercentage: Number(form.discount),
      description: form.description || "Promo discount code",
      minPurchase: 100,
    };
    setCouponsList([...couponsList, newCoupon]);
    setForm({ code: "", discount: 20, description: "" });
    setShowModal(false);
    triggerToast(`Coupon '${newCoupon.code}' activated!`);
  };

  const handleDeleteCoupon = (code) => {
    setCouponsList(couponsList.filter((c) => c.code !== code));
    triggerToast("Coupon deactivated!");
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {toastMessage && (
          <div className="p-4 bg-emerald-600 text-white font-bold text-xs rounded-2xl flex items-center justify-between shadow-xl animate-fadeIn">
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
                <Percent className="w-3.5 h-3.5" /> Discount & Promo Engine
              </div>
              <h1 className="font-heading text-2xl font-bold text-neutral-900">Coupons & Promotions</h1>
              <p className="text-xs text-neutral-500">Create percentage discount coupons for customer checkout.</p>
            </div>

            <button 
              onClick={() => setShowModal(true)}
              className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold text-xs rounded-xl shadow-md flex items-center gap-2 hover:brightness-110 transition"
            >
              <Plus className="w-4 h-4" /> Add Coupon
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {couponsList.map((coup) => (
              <div key={coup.code} className="p-5 bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/30 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="font-mono text-amber-800 font-extrabold text-lg block">{coup.code}</span>
                  <div className="text-xs text-neutral-700 font-bold mt-0.5">{coup.discountPercentage}% OFF Discount</div>
                  <div className="text-[11px] text-neutral-500">{coup.description}</div>
                </div>
                <button onClick={() => handleDeleteCoupon(coup.code)} className="p-2 text-neutral-400 hover:text-rose-600 transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
            <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <div className="relative bg-white rounded-3xl p-6 border border-amber-500/30 max-w-md w-full z-10 space-y-4 shadow-2xl">
              <h3 className="font-heading text-xl font-bold text-neutral-900">Create Promo Coupon</h3>
              <form onSubmit={handleAddCoupon} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Coupon Code *</label>
                  <input 
                    type="text" required placeholder="e.g. SHERAZ25"
                    value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-xs text-neutral-900 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Discount Percentage (%) *</label>
                  <input 
                    type="number" required placeholder="25"
                    value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-xs text-neutral-900 font-semibold"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2 bg-neutral-100 rounded-xl text-xs font-bold text-neutral-600">Cancel</button>
                  <button type="submit" className="flex-1 py-2 bg-amber-500 rounded-xl text-xs font-bold text-neutral-950">Activate Coupon</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
