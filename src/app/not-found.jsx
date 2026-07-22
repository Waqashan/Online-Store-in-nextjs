"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white px-4 py-20">
      <div className="max-w-md w-full text-center space-y-6">
        
        {/* Luxury Gold Icon */}
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-full border border-amber-500/30 bg-amber-500/5 flex items-center justify-center mx-auto text-amber-600 animate-pulse">
            <span className="font-heading text-4xl font-extrabold tracking-widest">404</span>
          </div>
          <div className="absolute top-0 right-0 w-3 h-3 bg-amber-500 rounded-full animate-ping" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-[10px] uppercase font-bold tracking-widest rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Lost in the Senses
          </div>
          <h1 className="font-heading text-3xl font-extrabold text-neutral-900 tracking-wider">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-sm mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Link 
            href="/"
            className="w-full sm:flex-1 py-3 bg-gold-gradient text-neutral-950 font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 hover:brightness-110 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link 
            href="/shop"
            className="w-full sm:flex-1 py-3 bg-white border border-neutral-300 text-neutral-700 font-bold text-xs rounded-xl hover:bg-neutral-50 transition flex items-center justify-center gap-2"
          >
            <span>Browse Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="text-[10px] text-neutral-400 font-medium">
          Need assistance? Contact our Customer Desk at support@sheraz.pk
        </div>

      </div>
    </div>
  );
}
