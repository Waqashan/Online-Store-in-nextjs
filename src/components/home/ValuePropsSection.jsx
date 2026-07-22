"use client";

import React from "react";
import { Truck, ShieldCheck, Award, Headphones } from "lucide-react";

export default function ValuePropsSection({ store = { features: {} } }) {
  return (
    <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-700 shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-heading text-sm font-bold text-neutral-900 mb-1">Express Courier</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Free express shipping on all orders over ${store.features ? store.features.freeShippingThreshold : 150}.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-700 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-heading text-sm font-bold text-neutral-900 mb-1">100% Authentic</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Directly sourced wild honey, certified lab reports & genuine guarantees.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-700 shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-heading text-sm font-bold text-neutral-900 mb-1">VIP Gold Packaging</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              White-glove velvet lined packaging perfect for royal luxury gifting.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-700 shrink-0">
            <Headphones className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-heading text-sm font-bold text-neutral-900 mb-1">24/7 VIP Concierge</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Dedicated WhatsApp & phone concierge for custom scent & harvest guidance.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
