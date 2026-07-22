"use client";

import React, { useState, useEffect } from "react";
import { Flame, Clock } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";

export default function FlashSaleSection({ flashDeals = { timer: {}, items: [] } }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 14, minutes: 0, seconds: 0 }; // Restart cycle
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-white rounded-3xl p-8 sm:p-10 border border-amber-500/30 gold-glow">

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 border-b border-amber-500/20 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-100 border border-rose-300 rounded-full text-rose-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4 text-amber-600 animate-bounce" />
              Limited Time Flash Offer
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-neutral-900">
              {flashDeals.timer ? flashDeals.timer.title : "Midnight Golden Hour Deals"}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              {flashDeals.timer ? flashDeals.timer.subtitle : "Exclusive values on royal harvests, perfumes, and automatic chronographs."}
            </p>
          </div>

          {/* Countdown Display */}
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-amber-500/30 shadow-md">
            <Clock className="w-5 h-5 text-amber-600 shrink-0" />
            <div className="flex items-center gap-2 font-mono text-center">
              <div className="bg-neutral-100 px-3 py-1.5 rounded-lg border border-neutral-200">
                <span className="font-bold text-lg text-amber-700">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[9px] block text-neutral-500 uppercase">Hrs</span>
              </div>
              <span className="text-amber-700 font-bold">:</span>
              <div className="bg-neutral-100 px-3 py-1.5 rounded-lg border border-neutral-200">
                <span className="font-bold text-lg text-amber-700">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-[9px] block text-neutral-500 uppercase">Min</span>
              </div>
              <span className="text-amber-700 font-bold">:</span>
              <div className="bg-neutral-100 px-3 py-1.5 rounded-lg border border-neutral-200">
                <span className="font-bold text-lg text-amber-700">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-[9px] block text-neutral-500 uppercase">Sec</span>
              </div>
            </div>
          </div>
        </div>

        {/* Flash Deal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashDeals.items && flashDeals.items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
