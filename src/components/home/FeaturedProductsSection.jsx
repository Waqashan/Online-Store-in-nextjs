"use client";

import React, { useState } from "react";
import ProductCard from "@/components/product/ProductCard";

export default function FeaturedProductsSection({ featuredProducts = [] }) {
  const [activeCategoryTab, setActiveCategoryTab] = useState("all");

  const filteredFeatured = activeCategoryTab === "all"
    ? featuredProducts
    : featuredProducts.filter(p => p.categorySlug === activeCategoryTab);

  return (
    <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="text-amber-700 text-xs font-bold uppercase tracking-widest">
          Handpicked Selections
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-neutral-900">
          Bestsellers & <span className="text-gold-gradient">Featured Arrivals</span>
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600">
          Curated top-tier products crafted with precision and absolute purity.
        </p>
      </div>

      {/* Category Tabs Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {["all", "organics", "perfumes", "skin-care", "watches"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveCategoryTab(tab)}
            className={`px-5 py-2 text-xs font-bold rounded-xl border transition-all ${
              activeCategoryTab === tab
                ? "bg-gold-gradient text-neutral-950 border-amber-500 font-extrabold shadow-md"
                : "bg-white border-neutral-200 text-neutral-700 hover:text-amber-700"
            }`}
          >
            {tab === "all" ? "All Collections" : tab === "organics" ? "Organics & Honey" : tab === "perfumes" ? "Perfumes & Attars" : tab === "skin-care" ? "24K Skin Serums" : "Automatic Watches"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredFeatured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
