"use client";

import React from "react";
import { Truck, ShieldCheck, Clock } from "lucide-react";
import { getStoreConfig } from "@/services/dataService";

export default function ShippingPolicyPage() {
  const store = getStoreConfig();

  return (
    <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 space-y-12 bg-white text-neutral-900">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-amber-800 text-xs font-bold uppercase tracking-widest bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
          Logistics & Courier Delivery
        </span>
        <h1 className="font-heading text-4xl font-extrabold">Shipping & Delivery Policy</h1>
        <p className="text-xs text-neutral-500">
          Fast, secure, and insured courier dispatch across Pakistan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900">Delivery Timelines</h4>
          <p className="text-xs text-neutral-600 leading-relaxed font-medium">
            Standard delivery takes <strong>1 to 3 business days</strong> across all major cities (Lahore, Karachi, Islamabad, Rawalpindi, Peshawar, Multan, Faisalabad).
          </p>
        </div>

        <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
            <Truck className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900">Courier Partners</h4>
          <p className="text-xs text-neutral-600 leading-relaxed font-medium">
            We partner with Pakistan's leading logistics providers (including <strong>TCS</strong> and <strong>Leopards Courier</strong>) to ensure safe transit of glass honey jars and luxury timepieces.
          </p>
        </div>

        <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900">Free Shipping Limit</h4>
          <p className="text-xs text-neutral-600 leading-relaxed font-medium">
            Orders exceeding <strong>Rs. {store.features.freeShippingThreshold.toLocaleString()}</strong> qualify for free express delivery nationwide.
          </p>
        </div>
      </div>

      <div className="bg-neutral-50 p-6 sm:p-10 rounded-3xl border border-neutral-200 space-y-4 text-xs leading-relaxed text-neutral-600 font-medium">
        <h3 className="font-heading text-lg font-bold text-neutral-900 border-b border-neutral-200 pb-2">
          Tracking & Insurance
        </h3>
        <p>
          Once your package is hand-selected and dispatched, you will receive a SMS containing your TCS / Leopards tracking code.
        </p>
        <p>
          All glass products are wrapped in bubble cushioning and shipped in metallic double-wall boxes to prevent any damage. If you receive a damaged jar, we will replace it immediately free of cost.
        </p>
      </div>
    </div>
  );
}
