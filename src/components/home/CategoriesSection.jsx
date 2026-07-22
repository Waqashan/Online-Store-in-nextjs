"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";

export default function CategoriesSection({ categories = [] }) {
  return (
    <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-amber-700 text-xs font-bold uppercase tracking-widest block mb-1">
            Dynamic Unlimited Categories
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-neutral-900">
            Explore Our <span className="text-gold-gradient">Curated Collections</span>
          </h2>
        </div>
        <Link
          href="/shop"
          className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 uppercase tracking-wider"
        >
          <span>View All Categories</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/shop?category=${cat.slug}`}
            className="group relative bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:border-amber-500/50 hover:shadow-xl transition-all duration-300 flex flex-col h-72"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/40 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-5 space-y-2 text-white">
              <div className="flex items-center justify-between text-[11px] text-amber-300 font-bold uppercase tracking-widest">
                <span>{cat.subcategories ? cat.subcategories.length : 0} Subcategories</span>
                <span className="w-2 h-2 rounded-full bg-amber-400" />
              </div>
              <h3 className="font-heading text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-neutral-200 line-clamp-1">
                {cat.description}
              </p>
              <div className="text-xs text-amber-300 font-bold pt-2 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Browse Category</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
