"use client";

import React from "react";
import { ShieldCheck, Lock, Globe } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 space-y-12 bg-white text-neutral-900">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-amber-800 text-xs font-bold uppercase tracking-widest bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
          Security & Privacy Protection
        </span>
        <h1 className="font-heading text-4xl font-extrabold">Privacy Policy</h1>
        <p className="text-xs text-neutral-500">
          How we protect your personal and transactional information at sheraz.pk.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900">Secure Payments</h4>
          <p className="text-xs text-neutral-600 leading-relaxed font-medium">
            All credit/debit card transactions are processed through encrypted payment gateways. We never store card details.
          </p>
        </div>

        <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900">Data Confidentiality</h4>
          <p className="text-xs text-neutral-600 leading-relaxed font-medium">
            Your name, phone number, and address are used exclusively for package dispatch and order tracking updates. We do not sell data.
          </p>
        </div>

        <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
            <Globe className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900">Cookie Usage</h4>
          <p className="text-xs text-neutral-600 leading-relaxed font-medium">
            We use secure browser cookies to save shopping bag items and login session states for seamless performance.
          </p>
        </div>
      </div>
    </div>
  );
}
