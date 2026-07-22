"use client";

import React from "react";
import { Award, ShieldCheck, Heart } from "lucide-react";

export default function ReturnPolicyPage() {
  return (
    <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 space-y-12 bg-white text-neutral-900">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-amber-800 text-xs font-bold uppercase tracking-widest bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
          Assurance & Satisfaction
        </span>
        <h1 className="font-heading text-4xl font-extrabold">Return & Refund Policy</h1>
        <p className="text-xs text-neutral-500">
          We offer an easy return and replacement policy for all premium organic and luxury goods.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
            <Heart className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900">Satisfaction Guarantee</h4>
          <p className="text-xs text-neutral-600 leading-relaxed font-medium">
            If you are not satisfied with your purchase, you can request an exchange or replacement within <strong>30 days</strong> of delivery.
          </p>
        </div>

        <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900">Damaged items policy</h4>
          <p className="text-xs text-neutral-600 leading-relaxed font-medium">
            Any transit damage to glass jars, honey bottles, or watch casings is covered 100%. We ship immediate replacements without query.
          </p>
        </div>

        <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900">Exchanges Conditions</h4>
          <p className="text-xs text-neutral-600 leading-relaxed font-medium">
            Seals must be intact for perfumes and cosmetic items due to hygiene regulations. Organic items can be returned if they do not meet our purity standards.
          </p>
        </div>
      </div>

      <div className="bg-neutral-50 p-6 sm:p-10 rounded-3xl border border-neutral-200 space-y-4 text-xs leading-relaxed text-neutral-600 font-medium">
        <h3 className="font-heading text-lg font-bold text-neutral-900 border-b border-neutral-200 pb-2">
          How to Initiate a Return or Replacement
        </h3>
        <p>
          Contact our 24/7 WhatsApp customer line or send an email to support team. Provide your Order ID and photo verification if the product arrived damaged.
        </p>
        <p>
          Refunds are processed within 3 business days back to your bank account or credit card once the item is returned to our Lahore hub.
        </p>
      </div>
    </div>
  );
}
