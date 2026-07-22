"use client";

import React, { useState, useEffect } from "react";
import { Tag, Plus, Trash2, CheckCircle2, X } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getBrands } from "@/services/dataService";

export default function AdminBrandsPage() {
  const [brandsList, setBrandsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [form, setForm] = useState({ name: "", origin: "Pakistan", category: "Organics" });

  useEffect(() => {
    setBrandsList(getBrands());
  }, []);

  const handleAddBrand = (e) => {
    e.preventDefault();
    if (!form.name) return;
    const newBrand = {
      id: `brand-${Date.now()}`,
      name: form.name,
      origin: form.origin,
      category: form.category,
      logo: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80",
    };
    setBrandsList([...brandsList, newBrand]);
    setForm({ name: "", origin: "Pakistan", category: "Organics" });
    setShowModal(false);
    triggerToast(`Brand '${newBrand.name}' registered!`);
  };

  const handleDeleteBrand = (id) => {
    setBrandsList(brandsList.filter((b) => b.id !== id));
    triggerToast("Brand deleted!");
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
                <Tag className="w-3.5 h-3.5" /> Manufacturers & Partners Directory
              </div>
              <h1 className="font-heading text-2xl font-bold text-neutral-900">Luxury Brand Partners</h1>
              <p className="text-xs text-neutral-500">Manage official brand partners, categories, and country of origin.</p>
            </div>

            <button 
              onClick={() => setShowModal(true)}
              className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold text-xs rounded-xl shadow-md flex items-center gap-2 hover:brightness-110 transition"
            >
              <Plus className="w-4 h-4" /> Add Brand
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {brandsList.map((brand) => (
              <div key={brand.id} className="p-4 bg-neutral-50 border border-neutral-200 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={brand.logo} alt={brand.name} className="w-12 h-12 rounded-xl object-cover border border-neutral-200 bg-white" />
                  <div>
                    <h4 className="font-bold text-neutral-900 text-sm">{brand.name}</h4>
                    <span className="text-[10px] text-amber-800 font-bold">{brand.origin} &bull; {brand.category}</span>
                  </div>
                </div>
                <button onClick={() => handleDeleteBrand(brand.id)} className="text-neutral-400 hover:text-rose-600 transition">
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
              <h3 className="font-heading text-xl font-bold text-neutral-900">Add Luxury Brand</h3>
              <form onSubmit={handleAddBrand} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Brand Name *</label>
                  <input 
                    type="text" required placeholder="e.g. Royal Oud Atelier"
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-xs text-neutral-900 font-semibold"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2 bg-neutral-100 rounded-xl text-xs font-bold text-neutral-600">Cancel</button>
                  <button type="submit" className="flex-1 py-2 bg-amber-500 rounded-xl text-xs font-bold text-neutral-950">Save Brand</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
