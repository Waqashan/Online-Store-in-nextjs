"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  X, 
  Star, 
  ShoppingBag, 
  ShieldCheck, 
  Heart
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist, currency } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(null);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const activeVariant = selectedVariant || (product.variants ? product.variants[0] : null);
  const activePrice = activeVariant ? activeVariant.price : product.price;
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, activeVariant, 1);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl border border-amber-500/30 overflow-hidden shadow-2xl z-10 text-neutral-900 animate-scaleUp">
        
        {/* Close Button */}
        <button 
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 text-neutral-500 hover:text-amber-600 transition bg-neutral-100 rounded-full border border-neutral-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
          
          {/* Product Gallery Preview */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-neutral-50 border border-neutral-200 relative">
              <img 
                src={product.mainImage} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-3 py-1 bg-amber-500 text-neutral-950 font-bold text-xs rounded-lg uppercase tracking-wider">
                Quick Inspection
              </div>
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <img 
                    key={idx} 
                    src={img} 
                    alt={`Thumbnail ${idx}`} 
                    className="w-16 h-16 object-cover rounded-xl border border-neutral-200 hover:border-amber-500/50 cursor-pointer"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-amber-700 font-bold uppercase tracking-widest mb-1">
                <span>{product.brand}</span>
                <span className="text-neutral-400 font-mono">SKU: {activeVariant ? activeVariant.sku : product.sku}</span>
              </div>

              <h2 className="font-heading text-xl sm:text-2xl font-bold text-neutral-900 mb-2">
                {product.name}
              </h2>

              <div className="flex items-center gap-3 text-xs text-neutral-600 mb-4">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="font-bold text-neutral-900">{product.rating}</span>
                </div>
                <span>•</span>
                <span className="text-neutral-500">{product.reviewCount} Verified Customer Reviews</span>
                <span>•</span>
                <span className="text-emerald-700 font-semibold">{product.stock > 0 ? "In Stock" : "Out of Stock"}</span>
              </div>

              <div className="use-font-body text-xl font-semibold text-neutral-900 mb-4">
                {currency.symbol} {activePrice.toLocaleString()}
                {product.originalPrice > activePrice && (
                  <span className="text-xs font-normal text-neutral-400 line-through ml-3">
                    {currency.symbol} {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed border-t border-b border-neutral-100 py-3 mb-4 line-clamp-3">
                {product.description}
              </p>

              {/* Select Weight */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-2 mb-6">
                  <label className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
                    Select Weight:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {product.variants.map((v) => (
                      <button 
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                          activeVariant?.id === v.id
                            ? "bg-amber-500/10 border-amber-500 text-amber-900 shadow-sm"
                            : "bg-neutral-50 border-neutral-200 text-neutral-600 hover:border-amber-500/40"
                        }`}
                      >
                        <div className="font-bold text-neutral-900">{v.name}</div>
                        <div className="text-[10px] text-amber-700 font-medium">{currency.symbol} {v.price.toLocaleString()}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Bulk Offers */}
              {(() => {
                const customBulkOffers = product.bulkOffersList && product.bulkOffersList.length > 0
                  ? product.bulkOffersList
                  : (product.categorySlug === "organics" 
                      ? [
                          { id: "bo-def-2", label: "Buy 2", quantity: 2, discount: 80 },
                          { id: "bo-def-3", label: "Buy 3+", quantity: 3, discount: 160 }
                        ]
                      : []
                    );
                if (customBulkOffers.length === 0) return null;
                return (
                  <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 mb-4 space-y-3">
                    <div className="text-[10px] font-bold text-amber-800 uppercase tracking-widest">
                      Bulk Offers - Save More!
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {customBulkOffers.map((bo) => (
                        <button 
                          key={bo.id}
                          onClick={() => {
                            const basePrice = activeVariant ? activeVariant.price : product.price;
                            addToCart(product, activeVariant, bo.quantity, basePrice - (bo.discount / bo.quantity));
                            setQuickViewProduct(null);
                          }}
                          className="p-2.5 bg-white border border-neutral-200 hover:border-amber-500/40 rounded-xl text-left transition"
                        >
                          <div className="font-bold text-[11px]">{bo.label}</div>
                          <div className="text-[10px] text-emerald-700 font-semibold">Save Rs. {bo.discount}</div>
                          <div className="text-[9px] text-neutral-500 mt-1 hover:underline">Add to Cart &rarr;</div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-neutral-100">
              <div className="flex gap-3">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 bg-gold-gradient text-neutral-950 font-bold text-sm rounded-xl shadow-md hover:brightness-110 transition flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Shopping Bag</span>
                </button>

                <button 
                  onClick={() => toggleWishlist(product)}
                  className={`p-3.5 rounded-xl border transition ${
                    inWishlist 
                      ? "bg-amber-500 border-amber-400 text-neutral-950" 
                      : "bg-neutral-50 border-neutral-200 text-neutral-600 hover:text-amber-600"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? "fill-neutral-950" : ""}`} />
                </button>
              </div>

              <div className="flex justify-between items-center text-[11px] text-neutral-500 pt-2">
                <Link 
                  href={`/product/${product.slug}`}
                  onClick={() => setQuickViewProduct(null)}
                  className="text-amber-700 hover:underline font-bold"
                >
                  View Full Product Page &rarr;
                </Link>
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Authentic Guarantee
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
