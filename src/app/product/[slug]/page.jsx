"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  ShieldCheck, 
  Truck, 
  Sparkles,
  Share2,
  CheckCircle2
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getProductBySlug, getProductsByCategory } from "@/services/dataService";
import ProductCard from "@/components/product/ProductCard";

export default function ProductDetailPage({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto py-24 text-center space-y-4">
        <h2 className="font-heading text-3xl font-bold text-amber-700">Product Not Found</h2>
        <p className="text-neutral-500 text-sm">The product you are looking for might have been removed or is temporarily out of stock.</p>
        <Link href="/shop" className="inline-block px-6 py-3 bg-gold-gradient text-neutral-950 font-bold rounded-xl text-xs shadow-md">
          Return to Shop Catalog
        </Link>
      </div>
    );
  }

  const { addToCart, toggleWishlist, isInWishlist, currency } = useCart();
  const inWishlist = isInWishlist(product.id);

  const [selectedImage, setSelectedImage] = useState(product.mainImage);
  const [selectedVariant, setSelectedVariant] = useState(product.variants ? product.variants[0] : null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [copiedLink, setCopiedLink] = useState(false);

  const activePrice = selectedVariant ? selectedVariant.price : product.price;
  const activeSku = selectedVariant ? selectedVariant.sku : product.sku;

  const relatedProducts = getProductsByCategory(product.categorySlug).filter((p) => p.id !== product.id).slice(0, 4);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-10 space-y-16 bg-white text-neutral-900">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
        <Link href="/" className="hover:text-amber-700">Home</Link>
        <span>/</span>
        <Link href={`/shop?category=${product.categorySlug}`} className="hover:text-amber-700 capitalize">{product.categorySlug}</Link>
        <span>/</span>
        <span className="text-neutral-900 font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-neutral-50 border border-amber-500/30 shadow-md relative">
            <img 
              src={selectedImage || product.mainImage} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discountPercentage > 0 && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-amber-500 text-neutral-950 font-bold text-xs rounded-xl shadow-md uppercase tracking-wider">
                SAVE {product.discountPercentage}%
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition ${
                    selectedImage === img ? "border-amber-500 scale-105 shadow-md" : "border-neutral-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Purchase Info */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-amber-700 font-bold uppercase tracking-widest mb-2">
              <span>{product.brand}</span>
              <span className="text-neutral-400 font-mono">SKU: {activeSku}</span>
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-neutral-900 leading-tight mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 text-xs text-neutral-600 mb-4">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-bold text-neutral-900">{product.rating}</span>
              </div>
              <span>•</span>
              <span className="text-neutral-500">{product.reviewCount} Verified Reviews</span>
              <span>•</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> In Stock ({product.stock} units)
              </span>
            </div>

            {/* Price Box */}
            <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-500/20 mb-6 flex items-baseline gap-3">
              <div className="use-font-body text-2xl font-semibold text-neutral-900">
                {currency.symbol} {activePrice.toLocaleString()}
              </div>
              {product.originalPrice > activePrice && (
                <div className="text-xs text-neutral-400 line-through">
                  {currency.symbol} {product.originalPrice.toLocaleString()}
                </div>
              )}
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
              {product.shortDescription}
            </p>

            {/* Select Weight */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-3 mb-6">
                <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider block">
                  Select Weight / Size:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {product.variants.map((v) => (
                    <button 
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3 rounded-xl text-left border text-xs font-semibold transition ${
                        (selectedVariant?.id === v.id || (!selectedVariant && v.id === product.variants[0].id))
                          ? "bg-amber-500/10 border-amber-500 text-amber-900 shadow-sm"
                          : "bg-neutral-50 border-neutral-200 text-neutral-600 hover:border-amber-500/40"
                      }`}
                    >
                      <div className="font-bold text-neutral-950">{v.name}</div>
                      <div className="text-[11px] text-amber-800 mt-0.5 font-medium">{currency.symbol} {v.price.toLocaleString()}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Special Bulk Offers - Save More! */}
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
                <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 mb-6 space-y-4">
                  <h4 className="text-xs font-bold text-amber-800 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    Special Bulk Offers - Save More!
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {customBulkOffers.map((bo) => (
                      <div key={bo.id} className="bg-white p-3.5 border border-neutral-200 rounded-xl space-y-2 flex flex-col justify-between">
                        <div>
                          <h5 className="font-bold text-xs text-neutral-900">{bo.label}</h5>
                          <p className="text-[11px] text-emerald-700 font-semibold">Save Rs. {bo.discount}</p>
                        </div>
                        <button 
                          onClick={() => {
                            const baseVal = selectedVariant ? selectedVariant.price : product.price;
                            const discountedUnitPrice = baseVal - (bo.discount / bo.quantity);
                            addToCart(product, selectedVariant || (product.variants ? product.variants[0] : null), bo.quantity, discountedUnitPrice);
                          }}
                          className="w-full py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-[10px] rounded-lg transition"
                        >
                          Add to Cart &rarr;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs text-neutral-700 font-bold uppercase tracking-wider">Quantity:</span>
              <div className="flex items-center border border-neutral-300 bg-white rounded-xl px-3 py-1.5 text-xs text-neutral-900 font-semibold">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-2 text-neutral-500 hover:text-black font-bold">-</button>
                <span className="font-bold px-3 w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-2 text-neutral-500 hover:text-black font-bold">+</button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button 
                onClick={() => addToCart(product, selectedVariant || (product.variants ? product.variants[0] : null), quantity)}
                className="w-full py-4 bg-gold-gradient text-neutral-950 font-bold text-sm rounded-2xl shadow-lg hover:brightness-110 transition flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Add {quantity} to Shopping Bag</span>
              </button>

              <div className="flex gap-3">
                <button 
                  onClick={() => toggleWishlist(product)}
                  className={`flex-1 py-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                    inWishlist ? "bg-amber-500 border-amber-400 text-neutral-950" : "bg-neutral-50 border-neutral-200 text-neutral-700 hover:text-amber-700"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? "fill-neutral-950" : ""}`} />
                  <span>{inWishlist ? "Saved in Wishlist" : "Add to Wishlist"}</span>
                </button>

                <button 
                  onClick={handleShare}
                  className="px-4 py-3 bg-neutral-50 border border-neutral-200 text-neutral-700 hover:text-amber-700 rounded-2xl text-xs flex items-center gap-1.5 font-bold"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copiedLink ? "Link Copied!" : "Share"}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Delivery */}
          <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 space-y-2 text-xs text-neutral-700 font-medium">
            <div className="flex items-center gap-2 text-amber-800">
              <Truck className="w-4 h-4 shrink-0" />
              <span>Complimentary Express Courier on orders above ${currency.symbol}150</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-700">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>100% Certified Authentic Product with Gold Seal Guarantee</span>
            </div>
          </div>

        </div>

      </div>

      {/* TABBED DETAILS */}
      <div className="bg-white rounded-3xl p-8 border border-neutral-200 shadow-sm space-y-6">
        <div className="flex flex-wrap border-b border-neutral-200 gap-6 text-sm font-heading">
          <button 
            onClick={() => setActiveTab("description")}
            className={`pb-3 font-bold transition border-b-2 ${activeTab === "description" ? "border-amber-600 text-amber-700" : "border-transparent text-neutral-500 hover:text-neutral-800"}`}
          >
            Detailed Story & Features
          </button>
          <button 
            onClick={() => setActiveTab("specs")}
            className={`pb-3 font-bold transition border-b-2 ${activeTab === "specs" ? "border-amber-600 text-amber-700" : "border-transparent text-neutral-500 hover:text-neutral-800"}`}
          >
            Technical Specifications
          </button>
          <button 
            onClick={() => setActiveTab("shipping")}
            className={`pb-3 font-bold transition border-b-2 ${activeTab === "shipping" ? "border-amber-600 text-amber-700" : "border-transparent text-neutral-500 hover:text-neutral-800"}`}
          >
            Shipping & Returns
          </button>
        </div>

        {activeTab === "description" && (
          <div className="space-y-4 text-xs sm:text-sm text-neutral-600 leading-relaxed animate-fadeIn">
            <p>{product.description}</p>
            {product.features && (
              <div className="pt-4 space-y-2">
                <h4 className="font-heading text-amber-800 font-bold uppercase text-xs">Highlights & Benefits:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 bg-neutral-50 p-2.5 rounded-xl border border-neutral-200">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === "specs" && (
          <div className="animate-fadeIn">
            {product.specs ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 flex justify-between">
                    <span className="text-neutral-500 font-semibold">{key}:</span>
                    <span className="text-neutral-900 font-bold">{val}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-neutral-500">Standard specifications apply.</p>
            )}
          </div>
        )}

        {activeTab === "shipping" && (
          <div className="space-y-3 text-xs text-neutral-600 animate-fadeIn">
            <p>We dispatch all orders via white-glove express air freight couriers.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Domestic Express: Delivered in 2-3 Business Days.</li>
              <li>Global Air Freight: Delivered in 5-7 Days with Live Tracking.</li>
              <li>Return Policy: 30-Day hassle-free return guarantee for unopened items.</li>
            </ul>
          </div>
        )}

      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <h3 className="font-heading text-2xl font-bold text-neutral-900">
            You May Also <span className="text-gold-gradient">Adore</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
