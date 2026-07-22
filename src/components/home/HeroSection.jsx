"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, ChevronRight, Sparkles } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    badge: "Wild-Harvested · Khyber Valleys",
    headline: "Royal Sidr",
    headlineAccent: "Honey Collection",
    subtext: "Unpasteurized liquid gold harvested from pristine Ziziphus trees. Lab-certified organic, raw & unfiltered.",
    ctaLabel: "Shop Honey",
    ctaHref: "/shop?category=organics&subcategory=sidr-honey",
    secondaryLabel: "View Product",
    secondaryHref: "/product/royal-organic-sidr-honey-1kg",
    image: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1400&q=80",
    accent: "from-amber-600/25 via-amber-400/10 to-transparent",
    tag: "Bestseller",
    tagColor: "bg-amber-500 text-neutral-950",
    price: "From Rs. 999",
  },
  {
    id: 2,
    badge: "Bilona Method · A2 Desi Cow",
    headline: "Golden Bilona",
    headlineAccent: "A2 Ghee",
    subtext: "Hand-churned from grass-fed desi cow curd. Nutty aroma, packed with fat-soluble vitamins and CLA.",
    ctaLabel: "Shop Ghee",
    ctaHref: "/shop?category=organics&subcategory=ghee",
    secondaryLabel: "Explore",
    secondaryHref: "/shop?category=organics",
    image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=1400&q=80",
    accent: "from-yellow-600/20 via-amber-500/10 to-transparent",
    tag: "New Harvest",
    tagColor: "bg-emerald-600 text-white",
    price: "From Rs. 2,399",
  },
  {
    id: 3,
    badge: "Niche Attar · Maison de Parfum",
    headline: "Black Oud",
    headlineAccent: "Royale Collection",
    subtext: "A sophisticated symphony of Black Oud, Saffron, and aged Amber resin. Inspired by Arabian royal courts.",
    ctaLabel: "Shop Perfumes",
    ctaHref: "/shop?category=perfumes",
    secondaryLabel: "See Details",
    secondaryHref: "/shop?category=perfumes",
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1400&q=80",
    accent: "from-neutral-900/40 via-amber-900/10 to-transparent",
    tag: "Limited Edition",
    tagColor: "bg-neutral-900 text-amber-400",
    price: "From Rs. 8,499",
  },
  {
    id: 4,
    badge: "24K Gold Infused · Swiss Formula",
    headline: "24K Gold Glow",
    headlineAccent: "Skincare Ritual",
    subtext: "Activate your skin's natural luminosity with 24K colloidal gold, Bulgarian rose water & vitamin C.",
    ctaLabel: "Shop Skincare",
    ctaHref: "/shop?category=skincare",
    secondaryLabel: "View Range",
    secondaryHref: "/shop?category=skincare",
    image: "https://images.unsplash.com/photo-1567721913486-6585f069b332?auto=format&fit=crop&w=1400&q=80",
    accent: "from-rose-500/20 via-amber-400/10 to-transparent",
    tag: "Premium Formula",
    tagColor: "bg-rose-600 text-white",
    price: "From Rs. 3,999",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback((index, dir = 1) => {
    if (isAnimating) return;
    setDirection(dir);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setIsAnimating(false);
    }, 50);
  }, [isAnimating]);

  const next = useCallback(() => {
    const nextIdx = (current + 1) % SLIDES.length;
    goTo(nextIdx, 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    const prevIdx = (current - 1 + SLIDES.length) % SLIDES.length;
    goTo(prevIdx, -1);
  }, [current, goTo]);

  // Auto-play every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = SLIDES[current];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-neutral-950">
      
      {/* Background Image with transition */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === current ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={s.image}
              alt={s.headline}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/85 via-neutral-950/50 to-neutral-950/20" />
            <div className={`absolute inset-0 bg-gradient-to-br ${s.accent} opacity-50`} />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-20">
        <div className="max-w-3xl space-y-6">

          {/* Badge */}
          <div
            key={`badge-${current}`}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-bold uppercase tracking-widest animate-fadeIn"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            {slide.badge}
          </div>

          {/* Headline */}
          <div key={`headline-${current}`} className="space-y-1 animate-fadeIn">
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-tight tracking-wide">
              {slide.headline}
            </h1>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gold-gradient leading-tight">
              {slide.headlineAccent}
            </h2>
          </div>

          {/* Subtext */}
          <p
            key={`subtext-${current}`}
            className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-lg font-normal animate-fadeIn"
          >
            {slide.subtext}
          </p>

          {/* Price Tag */}
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full tracking-widest ${slide.tagColor}`}>
              {slide.tag}
            </span>
            <span className="text-amber-300 font-semibold text-sm">{slide.price}</span>
          </div>

          {/* CTA Buttons */}
          <div
            key={`cta-${current}`}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2 animate-fadeIn"
          >
            <Link
              href={slide.ctaHref}
              className="px-8 py-4 bg-gold-gradient text-neutral-950 font-bold text-sm rounded-2xl shadow-xl hover:scale-105 hover:brightness-110 transition-all duration-300 flex items-center gap-2 group"
            >
              <span>{slide.ctaLabel}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href={slide.secondaryHref}
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm rounded-2xl hover:bg-white/20 transition flex items-center gap-2 group"
            >
              <span>{slide.secondaryLabel}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

        </div>
      </div>

      {/* Arrow Controls */}
      <button
        onClick={prev}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-200 shadow-lg"
        aria-label="Previous slide"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <button
        onClick={next}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-200 shadow-lg"
        aria-label="Next slide"
      >
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-8 h-2.5 bg-amber-500"
                : "w-2.5 h-2.5 bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-8 right-6 lg:right-16 z-20 text-white/50 text-xs font-mono font-bold">
        {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
      </div>

    </section>
  );
}
