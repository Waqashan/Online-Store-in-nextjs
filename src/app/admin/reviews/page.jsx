"use client";

import React, { useState, useEffect } from "react";
import { Star, Trash2, CheckCircle2, X } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getReviews } from "@/services/dataService";

export default function AdminReviewsPage() {
  const [reviewsList, setReviewsList] = useState([]);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    setReviewsList(getReviews());
  }, []);

  const handleDeleteReview = (id) => {
    setReviewsList(reviewsList.filter((r) => r.id !== id));
    triggerToast("Review deleted!");
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
          <div className="border-b border-neutral-100 pb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 font-bold text-xs rounded-full border border-amber-200 mb-2">
              <Star className="w-3.5 h-3.5" /> Patron Rating Moderation
            </div>
            <h1 className="font-heading text-2xl font-bold text-neutral-900">Customer Testimonials & Reviews</h1>
            <p className="text-xs text-neutral-500">Approve, moderate, or remove product reviews.</p>
          </div>

          <div className="space-y-4">
            {reviewsList.map((rev) => (
              <div key={rev.id} className="p-4 bg-neutral-50 border border-neutral-200 rounded-2xl flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-neutral-900 text-sm">{rev.author}</span>
                    <span className="text-amber-500 text-xs font-bold">{"★".repeat(rev.rating)}</span>
                    {rev.verifiedPurchase && <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">Verified Buyer</span>}
                  </div>
                  <h5 className="font-bold text-xs text-neutral-800 mt-1">{rev.title}</h5>
                  <p className="text-xs text-neutral-600 mt-0.5">{rev.comment}</p>
                  <span className="text-[10px] text-neutral-400 block mt-1">{rev.date}</span>
                </div>
                <button onClick={() => handleDeleteReview(rev.id)} className="p-1.5 text-neutral-400 hover:text-rose-600 transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
