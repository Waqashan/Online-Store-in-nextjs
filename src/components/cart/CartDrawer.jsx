"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Truck, 
  ShieldCheck 
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getCoupons } from "@/services/dataService";

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    currency, 
    cartSubtotal, 
    discountAmount, 
    shippingFee, 
    cartTotal, 
    appliedCoupon, 
    setAppliedCoupon,
    freeShippingThreshold
  } = useCart();

  const [couponCodeInput, setCouponCodeInput] = useState("");
  const [couponMessage, setCouponMessage] = useState(null);
  const availableCoupons = getCoupons();

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const found = availableCoupons.find(
      (c) => c.code.toLowerCase() === couponCodeInput.trim().toLowerCase()
    );

    if (found) {
      if (cartSubtotal < found.minOrderAmount) {
        setCouponMessage({
          type: "error",
          text: `Coupon valid for orders over ${currency.symbol}${found.minOrderAmount}`,
        });
      } else {
        setAppliedCoupon(found);
        setCouponMessage({
          type: "success",
          text: `Code '${found.code}' applied! (${found.description})`,
        });
      }
    } else {
      setCouponMessage({ type: "error", text: "Invalid promo code" });
    }
  };

  const progressPercentage = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white text-neutral-900 border-l border-amber-500/20 shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-600">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-heading text-lg font-bold text-neutral-900">Your Shopping Bag</h2>
                <p className="text-xs text-neutral-500">
                  {cart.length} {cart.length === 1 ? "item" : "items"} selected
                </p>
              </div>
            </div>

            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-neutral-400 hover:text-amber-600 transition"
              aria-label="Close cart"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-amber-50/70 border-b border-amber-500/20 text-xs">
            {cartSubtotal >= freeShippingThreshold ? (
              <div className="text-amber-800 font-bold flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-600" />
                🎉 You unlocked FREE Express Shipping!
              </div>
            ) : (
              <div>
                <div className="flex justify-between text-neutral-700 mb-1">
                  <span>Add {currency.symbol}{(freeShippingThreshold - cartSubtotal).toFixed(2)} for FREE Express Delivery</span>
                  <span className="font-bold text-amber-700">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gold-gradient transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-20 h-20 rounded-full bg-neutral-100 border border-amber-500/20 flex items-center justify-center text-amber-600">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="font-heading text-xl font-bold text-neutral-800">Your bag is empty</h3>
                <p className="text-xs text-neutral-500 max-w-xs">
                  Discover our pure wild Sidr honey, french perfumes, 24K gold serums, and luxury watches.
                </p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-gold-gradient text-neutral-950 font-bold text-xs rounded-xl shadow-md hover:brightness-110 transition"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.itemKey} 
                  className="flex gap-4 p-3 bg-neutral-50 border border-neutral-200 rounded-2xl relative group hover:border-amber-500/40 transition"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover rounded-xl border border-neutral-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-amber-700 uppercase font-bold tracking-wider">
                      {item.brand}
                    </div>
                    <h4 className="text-xs font-bold text-neutral-900 truncate pr-6">
                      {item.name}
                    </h4>
                    <div className="text-[11px] text-neutral-500 mt-0.5">
                      Variant: <span className="text-neutral-800 font-medium">{item.variant}</span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity buttons */}
                      <div className="flex items-center gap-2 border border-neutral-300 bg-white px-2 py-0.5 rounded-lg text-xs">
                        <button 
                          onClick={() => updateQuantity(item.itemKey, -1)}
                          className="text-neutral-500 hover:text-neutral-900 font-bold"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-neutral-900 w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.itemKey, 1)}
                          className="text-neutral-500 hover:text-neutral-900 font-bold"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="font-heading font-bold text-sm text-amber-700">
                          {currency.symbol}{(item.unitPrice * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-[10px] text-neutral-400">
                          {currency.symbol}{item.unitPrice} each
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Remove button */}
                  <button 
                    onClick={() => removeFromCart(item.itemKey)}
                    className="absolute top-3 right-3 text-neutral-400 hover:text-rose-600 transition"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-6 bg-neutral-50 border-t border-neutral-200 space-y-4">
              
              {/* Promo Code Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 absolute left-3 top-2.5 text-amber-600" />
                  <input 
                    type="text" 
                    placeholder="Enter Code (e.g. AUREATE20)" 
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-xl py-2 pl-9 pr-3 text-xs text-neutral-900 uppercase focus:outline-none focus:border-amber-600"
                  />
                </div>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-neutral-900 text-amber-300 font-bold text-xs rounded-xl hover:bg-neutral-800 transition"
                >
                  Apply
                </button>
              </form>

              {couponMessage && (
                <div className={`text-[11px] font-semibold ${couponMessage.type === "success" ? "text-emerald-700" : "text-rose-600"}`}>
                  {couponMessage.text}
                </div>
              )}

              {/* Price Calculation breakdown */}
              <div className="space-y-1.5 text-xs text-neutral-700 pt-2 border-t border-neutral-200">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Subtotal</span>
                  <span className="font-semibold text-neutral-900">{currency.symbol}{cartSubtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Promo Discount</span>
                    <span>-{currency.symbol}{discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-neutral-500">Estimated Shipping</span>
                  <span className="font-semibold text-neutral-900">
                    {shippingFee === 0 ? <span className="text-emerald-600 uppercase font-bold text-[10px]">FREE</span> : `${currency.symbol}${shippingFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold pt-2 border-t border-neutral-200">
                  <span className="font-heading text-neutral-900">Total</span>
                  <span className="font-heading text-amber-700 text-lg">{currency.symbol}{cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link 
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3.5 bg-gold-gradient text-neutral-950 font-bold text-sm rounded-xl shadow-lg hover:brightness-110 transition flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="text-[10px] text-center text-neutral-500 flex items-center justify-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>100% Encrypted & Authentic Guarantee</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
