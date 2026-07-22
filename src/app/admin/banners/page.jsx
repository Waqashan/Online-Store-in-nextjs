"use client";

import React, { useState } from "react";
import { ImageIcon, Plus, Trash2, CheckCircle2, X } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { mockBanners } from "@/data/adminMockData";

export default function AdminBannersPage() {
  const [bannersList, setBannersList] = useState(mockBanners);
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [form, setForm] = useState({ title: "", subtitle: "", badge: "New", link: "/shop" });

  const handleAddBanner = (e) => {
    e.preventDefault();
    if (!form.title) return;
    const newBanner = {
      id: `ban-${Date.now()}`,
      title: form.title,
      subtitle: form.subtitle,
      badge: form.badge,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1600&q=80",
      link: form.link,
      status: "Active",
    };
    setBannersList([...bannersList, newBanner]);
    setForm({ title: "", subtitle: "", badge: "New", link: "/shop" });
    setShowModal(false);
    triggerToast("Hero Banner created!");
  };

  const handleDeleteBanner = (id) => {
    setBannersList(bannersList.filter((b) => b.id !== id));
    triggerToast("Banner deleted!");
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
                <ImageIcon className="w-3.5 h-3.5" /> Storefront Hero Management
              </div>
              <h1 className="font-heading text-2xl font-bold text-neutral-900">Hero Homepage Banners & Sliders</h1>
              <p className="text-xs text-neutral-500">Configure homepage promotional banners, target URLs, and call-to-action badges.</p>
            </div>

            <button 
              onClick={() => setShowModal(true)}
              className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold text-xs rounded-xl shadow-md flex items-center gap-2 hover:brightness-110 transition"
            >
              <Plus className="w-4 h-4" /> Add Hero Banner
            </button>
          </div>

          <div className="space-y-4">
            {bannersList.map((ban) => (
              <div key={ban.id} className="p-4 bg-neutral-50 border border-neutral-200 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <img src={ban.image} alt={ban.title} className="w-28 h-18 rounded-xl object-cover border border-neutral-200" />
                  <div>
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded uppercase">{ban.badge}</span>
                    <h4 className="font-bold text-neutral-900 text-sm mt-1">{ban.title}</h4>
                    <p className="text-xs text-neutral-500">{ban.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                    {ban.status}
                  </span>
                  <button onClick={() => handleDeleteBanner(ban.id)} className="p-2 text-neutral-400 hover:text-rose-600 transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
            <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <div className="relative bg-white rounded-3xl p-6 border border-amber-500/30 max-w-md w-full z-10 space-y-4 shadow-2xl">
              <h3 className="font-heading text-xl font-bold text-neutral-900">Add Hero Banner</h3>
              <form onSubmit={handleAddBanner} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Banner Title *</label>
                  <input 
                    type="text" required placeholder="e.g. Royal Harvest 2026"
                    value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-xs text-neutral-900 font-semibold"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2 bg-neutral-100 rounded-xl text-xs font-bold text-neutral-600">Cancel</button>
                  <button type="submit" className="flex-1 py-2 bg-amber-500 rounded-xl text-xs font-bold text-neutral-950">Save Banner</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
