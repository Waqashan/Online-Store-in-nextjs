"use client";

import React from "react";
import { FileText, ShieldAlert, BadgeCheck } from "lucide-react";

export default function TermsConditionsPage() {
  return (
    <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 space-y-12 bg-white text-neutral-900">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-amber-800 text-xs font-bold uppercase tracking-widest bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
          Agreement & Guidelines
        </span>
        <h1 className="font-heading text-4xl font-extrabold">Terms & Conditions</h1>
        <p className="text-xs text-neutral-500">
          The legal framework and usage terms of sheraz.pk website services.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900">Order Acceptance</h4>
          <p className="text-xs text-neutral-600 leading-relaxed font-medium">
            We reserve the right to refuse or cancel orders due to stock availability, incorrect pricing, or verification flags.
          </p>
        </div>

        <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900">Intellectual Property</h4>
          <p className="text-xs text-neutral-600 leading-relaxed font-medium">
            All graphics, store designs, logo elements, text, and product copy are copyrighted property of sheraz.pk.
          </p>
        </div>

        <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
            <BadgeCheck className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900">Governing Law</h4>
          <p className="text-xs text-neutral-600 leading-relaxed font-medium">
            These terms are governed by the local consumer protection laws of the Islamic Republic of Pakistan.
          </p>
        </div>
      </div>
    </div>
  );
}
