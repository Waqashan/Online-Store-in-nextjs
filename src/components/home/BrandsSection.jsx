"use client";

import React from "react";

export default function BrandsSection({ brands = [] }) {
  return (
    <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="text-center mb-8">
        <span className="text-amber-700 text-xs font-bold uppercase tracking-widest">
          Premier Multi-Category Partners
        </span>
        <h2 className="font-heading text-2xl font-bold text-neutral-900 mt-1">
          Our Royal Brands Portfolio
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {brands.map((b) => (
          <div
            key={b.id}
            className="bg-white p-4 rounded-xl border border-neutral-200 text-center flex flex-col items-center justify-center hover:border-amber-500/40 transition shadow-sm"
          >
            <span className="font-heading text-sm font-bold text-neutral-900 block mb-1">
              {b.name}
            </span>
            <span className="text-[10px] text-neutral-500 line-clamp-1">
              {b.description}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
