"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center bg-white space-y-6">
      
      {/* Golden Glowing Spinner */}
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <div className="w-16 h-16 rounded-full border-2 border-neutral-100 border-t-amber-500 animate-spin" />
        
        {/* Inner Glowing Core */}
        <div className="absolute w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 animate-pulse">
          <Sparkles className="w-5 h-5 text-amber-500" />
        </div>
      </div>

      {/* Loading Branding */}
      <div className="text-center space-y-1">
        <h2 className="font-heading text-xl font-bold tracking-widest text-neutral-900 animate-pulse">
          sheraz.pk
        </h2>
        <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold">
          Loading Luxury Collection...
        </p>
      </div>

    </div>
  );
}
