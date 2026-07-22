"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Leaf } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-white overflow-hidden">
      
      {/* Ambient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-400/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Text */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-amber-500/30 text-amber-800 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
            <span>Multi-Category Luxury & Organics Emporium</span>
          </div>

          <h1 className="use-font-body text-4xl sm:text-6xl lg:text-7xl font-extrabold text-neutral-900 leading-tight tracking-tight">
            Indulge in Pure <span className="text-gold-gradient block mt-1">Elegance & Wellness</span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 max-w-2xl leading-relaxed font-normal mx-auto lg:mx-0">
            Discover wild-harvested raw Sidr honey, 24K gold skin elixirs, royal French oud perfumes, handcrafted 18K gold watches, and bespoke couture. All under one roof.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <Link
              href="/shop"
              className="w-full sm:w-auto px-8 py-4 bg-gold-gradient text-neutral-950 font-bold text-sm rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 group"
            >
              <span>Explore Collections</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>

            <Link
              href="/shop?category=organics"
              className="w-full sm:w-auto px-8 py-4 bg-white border border-amber-500/40 text-amber-900 font-bold text-sm rounded-2xl hover:bg-neutral-50 transition shadow-sm flex items-center justify-center gap-2"
            >
              <Leaf className="w-4 h-4 text-amber-600" />
              <span>Shop Sidr Organics</span>
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-neutral-200 max-w-lg mx-auto lg:mx-0">
            <div>
              <div className="font-heading text-2xl font-bold text-amber-700">100%</div>
              <div className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">Certified Organic</div>
            </div>
            <div>
              <div className="font-heading text-2xl font-bold text-amber-700">8+</div>
              <div className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">Main Categories</div>
            </div>
            <div>
              <div className="font-heading text-2xl font-bold text-amber-700">24/7</div>
              <div className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">VIP Concierge</div>
            </div>
          </div>

        </div>

        {/* Right Hero Card with stable premium honey drizzling image */}
        <div className="lg:col-span-5 relative w-full flex justify-center">
          <div className="relative bg-white rounded-3xl p-4 border border-amber-500/30 gold-glow shadow-2xl overflow-hidden group w-full max-w-[420px]">
            <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden relative bg-neutral-100 min-h-[350px]">
              <img
                src="https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=800&q=80"
                alt="Royal Sidr Honey Harvest"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 absolute inset-0"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80";
                }}
              />
              
              {/* Floating Glass Badge */}
              <div className="absolute bottom-6 inset-x-6 bg-white/95 rounded-2xl p-5 border border-amber-500/40 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between text-xs text-amber-800 uppercase tracking-wider font-bold mb-1">
                  <span>Featured Organic Harvest</span>
                  <span className="bg-amber-500 text-neutral-950 font-bold px-2 py-0.5 rounded text-[10px]">Pure 100%</span>
                </div>
                <h3 className="font-heading text-lg font-bold text-neutral-900 mb-1">
                  Royal Wild-Harvested Sidr Honey
                </h3>
                <p className="text-xs text-neutral-600 line-clamp-1 mb-3">
                  Unpasteurized liquid gold from Khyber valleys. Limited seasonal batch.
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xl font-bold text-amber-700">Rs. 24,999</span>
                  <Link
                    href="/product/royal-organic-sidr-honey-1kg"
                    className="px-4 py-1.5 bg-gold-gradient text-neutral-950 text-xs font-bold rounded-xl hover:brightness-110 transition shadow-md"
                  >
                    View Product &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
