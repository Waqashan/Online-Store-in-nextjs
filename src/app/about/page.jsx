"use client";

import React from "react";
import Link from "next/link";
import { 
  Sparkles, 
  ShieldCheck, 
  Crown, 
  Award, 
  Heart, 
  Leaf, 
  CheckCircle2, 
  ArrowRight,
  MapPin,
  Clock,
  Phone
} from "lucide-react";
import { getStoreConfig } from "@/services/dataService";

export default function AboutPage() {
  const store = getStoreConfig();

  return (
    <div className="space-y-16 pb-20 bg-white text-neutral-900">
      
      {/* Hero Header */}
      <section className="relative py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-white text-center">
        <div className="w-full max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-amber-500/30 rounded-full text-amber-800 text-xs font-bold uppercase tracking-widest shadow-sm">
            <Crown className="w-4 h-4 text-amber-600" /> Our Heritage & Vision
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 leading-tight">
            The Story Behind <span className="text-gold-gradient">sheraz.pk</span>
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Curated excellence across pure wild Sidr honey, haute French perfumery, 24K gold skin elixirs, Swiss chronographs, and bespoke couture.
          </p>
        </div>
      </section>

      {/* Main Story & Vision Grid */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl relative">
              <img 
                src="https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=1200&q=80" 
                alt="Sheraz.pk Wild Sidr Honey & Organics" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-widest">Purity Guarantee</span>
                <h3 className="font-heading text-xl font-bold">Raw Wild-Harvested Organics</h3>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-amber-800 text-xs font-bold uppercase tracking-widest block">
              Craftsmanship & Uncompromised Quality
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-neutral-900 leading-tight">
              Where Ancient Organic Purity Meets <span className="text-gold-gradient">Modern Luxury</span>
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed font-normal">
              Founded with a passion for unheated, raw Sidr honey harvested from pristine mountain valleys and rare artisanal scents, <strong>sheraz.pk</strong> has grown into Pakistan's premier multi-category destination.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed font-normal">
              We bridge the gap between ancient wellness secrets and refined modern elegance. Every jar of honey, bottle of extrait de parfum, 24K gold serum, automatic watch, and bespoke suit undergoes rigorous lab certification and white-glove quality inspection before reaching your doorstep.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-200">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-neutral-900">100% Lab Certified</h4>
                  <p className="text-[11px] text-neutral-500">ISO 22000 organic purity reports</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-neutral-900">Royal Velvet Packaging</h4>
                  <p className="text-[11px] text-neutral-500">Curated white-glove gift boxes</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4 Pillars of Excellence */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-amber-800 text-xs font-bold uppercase tracking-widest">Four Pillars of Sheraz.pk</span>
          <h2 className="font-heading text-3xl font-extrabold text-neutral-900">
            Our Core <span className="text-gold-gradient">Standards</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-neutral-50 p-6 rounded-3xl border border-neutral-200 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 flex items-center justify-center font-bold">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-lg font-bold text-neutral-900">100% Organic Purity</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Zero pasteurization, zero sugar additives, and zero synthetic preservatives across all Sidr honeys and cold-pressed oils.
            </p>
          </div>

          <div className="bg-neutral-50 p-6 rounded-3xl border border-neutral-200 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-lg font-bold text-neutral-900">Haute Perfumerie</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Niche French extracts, aged Cambodian oud, and pure royal attars blended for unforgettable sillage.
            </p>
          </div>

          <div className="bg-neutral-50 p-6 rounded-3xl border border-neutral-200 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 flex items-center justify-center font-bold">
              <Crown className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-lg font-bold text-neutral-900">Precision Horology</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Swiss-inspired automatic movement chronographs with 18K solid gold bezels and sapphire crystal glass.
            </p>
          </div>

          <div className="bg-neutral-50 p-6 rounded-3xl border border-neutral-200 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-lg font-bold text-neutral-900">Authenticity Guarantee</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              100% money-back authenticity guarantee and dedicated 24/7 VIP concierge assistance for every customer.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="bg-gradient-to-r from-neutral-900 via-amber-950 to-neutral-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold">
              Experience the Purity of <span className="text-gold-gradient">sheraz.pk</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300">
              Browse our curated collections or connect with our VIP Concierge for bespoke orders and corporate gift sets.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Link 
              href="/shop"
              className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold text-xs rounded-xl shadow-md hover:brightness-110 transition flex items-center justify-center gap-2"
            >
              <span>Explore All Collections</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/contact"
              className="px-8 py-3.5 bg-white/10 border border-white/20 text-white font-bold text-xs rounded-xl hover:bg-white/20 transition"
            >
              Contact Concierge
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
