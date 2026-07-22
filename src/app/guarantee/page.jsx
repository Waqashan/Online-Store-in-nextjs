"use client";

import React from "react";
import { Award, ShieldCheck, Star } from "lucide-react";

export default function LifetimeGuaranteePage() {
  return (
    <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 space-y-12 bg-white text-neutral-900">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-amber-800 text-xs font-bold uppercase tracking-widest bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
          Purity & Authenticity
        </span>
        <h1 className="font-heading text-4xl font-extrabold">Lifetime Purity Guarantee</h1>
        <p className="text-xs text-neutral-500">
          Our uncompromised commitment to quality, source transparency, and organic purity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900">100% Raw Sidr Honey</h4>
          <p className="text-xs text-neutral-600 leading-relaxed font-medium">
            We guarantee that our wild-harvested Sidr honey is completely unpasteurized, unheated, and contains <strong>0% added sugar, syrup, or fillers</strong>.
          </p>
        </div>

        <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900">Authentic Luxury Brands</h4>
          <p className="text-xs text-neutral-600 leading-relaxed font-medium">
            Every fragrance, luxury automatic timepiece, and skincare elixir sold on our store is <strong>100% authentic</strong>, directly sourced from official manufacturers.
          </p>
        </div>

        <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
            <Star className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900">Full Purity Refund</h4>
          <p className="text-xs text-neutral-600 leading-relaxed font-medium">
            If any independent laboratory report proves our honey contains sugar syrup or chemical additives, we will refund your purchase cost.
          </p>
        </div>
      </div>

      <div className="bg-neutral-50 p-6 sm:p-10 rounded-3xl border border-neutral-200 space-y-4 text-xs leading-relaxed text-neutral-600 font-medium">
        <h3 className="font-heading text-lg font-bold text-neutral-900 border-b border-neutral-200 pb-2">
          Laboratory Testing Standards
        </h3>
        <p>
          Each harvest of our Sidr organic honey is tested in certified laboratories to verify:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Fructose/Glucose ratios</li>
          <li>Diastase activity (ensuring it is raw and unheated)</li>
          <li>Absence of sucrose and agricultural pesticide chemical residues</li>
        </ul>
      </div>
    </div>
  );
}
