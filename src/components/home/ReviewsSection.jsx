"use client";

import React from "react";
import { Star, CheckCircle2 } from "lucide-react";

export default function ReviewsSection({ reviews = [] }) {
  return (
    <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="bg-amber-500/10 rounded-3xl p-8 sm:p-12 border border-amber-500/30">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="flex justify-center gap-1 text-amber-500 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-500" />
            ))}
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-neutral-900">
            Trusted by Discerning Patrons Worldwide
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4 relative"
            >
              <div className="flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-11 h-11 rounded-full object-cover border border-amber-500/40"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";
                  }}
                />
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">{rev.author}</h4>
                  <span className="text-[10px] text-amber-700 font-semibold block">{rev.location}</span>
                </div>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed italic">
                "{rev.comment}"
              </p>

              <div className="pt-2 border-t border-neutral-100 flex justify-between items-center text-[10px] text-neutral-500 font-medium">
                <span className="text-amber-800 font-bold">{rev.productName}</span>
                <span className="flex items-center gap-1 text-emerald-700">
                  <CheckCircle2 className="w-3 h-3" /> Verified Buyer
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
