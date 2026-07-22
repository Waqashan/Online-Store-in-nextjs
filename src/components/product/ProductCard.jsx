"use client";

import React from "react";
import Link from "next/link";
import { Star, Heart, Eye, ShoppingBag, Flame } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist, currency, setQuickViewProduct } = useCart();
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="group relative bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:border-amber-500/40 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      
      {/* Product Image & Badges Container */}
      <div className="relative aspect-square overflow-hidden bg-neutral-50">
        <img 
          src={product.mainImage} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.discountPercentage > 0 && (
            <span className="px-2.5 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold text-[10px] rounded-lg shadow-md uppercase tracking-wider">
              {product.discountPercentage}% OFF
            </span>
          )}
          {product.isFlashDeal && (
            <span className="px-2.5 py-1 bg-rose-600 text-white font-bold text-[10px] rounded-lg shadow-md uppercase tracking-wider flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-300" /> Flash Deal
            </span>
          )}
          {product.isNewArrival && !product.isFlashDeal && (
            <span className="px-2.5 py-1 bg-white/90 border border-amber-500/40 text-amber-800 font-bold text-[10px] rounded-lg uppercase tracking-wider backdrop-blur-md shadow-sm">
              New Arrival
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full border transition-all duration-300 z-10 ${
            inWishlist 
              ? "bg-amber-500 border-amber-400 text-neutral-950 shadow-md scale-110" 
              : "bg-white/80 border-neutral-200 text-neutral-600 hover:text-amber-600 hover:border-amber-500/50 backdrop-blur-md"
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${inWishlist ? "fill-neutral-950" : ""}`} />
        </button>

        {/* Quick View Button Hover Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-neutral-900/80 via-neutral-900/40 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 z-10">
          <button 
            onClick={() => setQuickViewProduct(product)}
            className="flex-1 py-2 bg-white/95 border border-amber-500/40 text-neutral-900 font-bold text-xs rounded-xl hover:bg-amber-500 hover:text-neutral-950 transition backdrop-blur-md flex items-center justify-center gap-1.5 shadow-lg"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-1">
            <span className="uppercase font-bold tracking-wider text-amber-700">{product.brand}</span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-bold text-neutral-800">{product.rating}</span>
              <span className="text-neutral-400">({product.reviewCount})</span>
            </div>
          </div>

          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-heading text-sm font-bold text-neutral-900 group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Add to Bag */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
          <div>
            <div className="use-font-body text-base font-semibold text-neutral-900">
              {currency.symbol} {product.price.toLocaleString()}
            </div>
            {product.originalPrice > product.price && (
              <div className="text-xs text-neutral-400 line-through">
                {currency.symbol} {product.originalPrice.toLocaleString()}
              </div>
            )}
          </div>

          <button 
            onClick={() => addToCart(product, product.variants ? product.variants[0] : null, 1)}
            className="p-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold rounded-xl hover:scale-105 transition-transform shadow-md flex items-center justify-center"
            aria-label="Add to cart"
            title="Add to Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
