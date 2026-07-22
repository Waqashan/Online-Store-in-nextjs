"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  CreditCard, 
  Banknote, 
  Building2, 
  Smartphone, 
  Truck, 
  CheckCircle2, 
  ArrowRight,
  ShoppingBag,
  Sparkles
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getStoreConfig } from "@/services/dataService";

export default function CheckoutPage() {
  const { 
    cart, 
    cartSubtotal, 
    discountAmount, 
    shippingFee, 
    cartTotal, 
    currency, 
    clearCart 
  } = useCart();
  const store = getStoreConfig();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Pakistan",
    paymentMethod: "cod",
    notes: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const randomId = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
    setCreatedOrderId(randomId);
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 bg-white">
        <div className="bg-amber-500/10 rounded-3xl p-8 sm:p-12 border border-amber-500/30 text-center space-y-6 shadow-xl">
          <div className="w-20 h-20 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-amber-500/30 rounded-full text-amber-800 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Order Successfully Placed
          </div>

          <h1 className="font-heading text-3xl font-bold text-neutral-900">
            Thank You for Your Order!
          </h1>

          <p className="text-xs sm:text-sm text-neutral-600 max-w-lg mx-auto leading-relaxed">
            Your luxury package has been registered with Order ID <span className="font-mono text-amber-800 font-bold">{createdOrderId}</span>. We have sent a confirmation email to <span className="text-neutral-900 font-bold">{formData.email || "your email"}</span>.
          </p>

          <div className="bg-white p-4 rounded-2xl border border-neutral-200 max-w-md mx-auto text-left text-xs space-y-2 shadow-sm">
            <div className="flex justify-between text-neutral-500">
              <span>Customer Name:</span>
              <span className="text-neutral-900 font-bold">{formData.fullName || "Valued Patron"}</span>
            </div>
            <div className="flex justify-between text-neutral-500">
              <span>Payment Selected:</span>
              <span className="text-amber-800 font-bold uppercase">{formData.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-neutral-500">
              <span>Shipping Address:</span>
              <span className="text-neutral-900 font-medium truncate max-w-[200px]">{formData.address || "Main Street"}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href={`/track-order?id=${createdOrderId}`}
              className="w-full sm:w-auto px-8 py-3.5 bg-gold-gradient text-neutral-950 font-bold text-xs rounded-xl shadow-md hover:brightness-110 transition flex items-center justify-center gap-2"
            >
              <Truck className="w-4 h-4" />
              <span>Track Live Package Status</span>
            </Link>

            <Link 
              href="/"
              className="w-full sm:w-auto px-8 py-3.5 bg-white border border-neutral-300 text-neutral-800 font-bold text-xs rounded-xl hover:bg-neutral-50 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-10 bg-white text-neutral-900">
      
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-extrabold text-neutral-900">
          Secure <span className="text-gold-gradient">Luxury Checkout</span>
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Complete your delivery information and choose your preferred payment method.
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-neutral-200 max-w-xl mx-auto shadow-sm">
          <ShoppingBag className="w-12 h-12 text-amber-600 mx-auto" />
          <h2 className="font-heading text-xl font-bold text-neutral-900">Your Shopping Cart is Empty</h2>
          <p className="text-xs text-neutral-500">Please add items to your cart before proceeding to checkout.</p>
          <Link href="/shop" className="inline-block px-6 py-3 bg-gold-gradient text-neutral-950 font-bold text-xs rounded-xl shadow-md">
            Return to Store
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Shipping Column */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm space-y-4">
              <h3 className="font-heading text-sm font-bold text-neutral-900 uppercase tracking-widest flex items-center gap-2 border-b border-neutral-100 pb-3">
                <Truck className="w-4 h-4 text-amber-600" /> Shipping & Customer Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Full Name *</label>
                  <input 
                    type="text" 
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Lord Alexander Vance"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 px-3 text-xs text-neutral-900 focus:outline-none focus:border-amber-600 font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Email Address *</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alexander@example.com"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 px-3 text-xs text-neutral-900 focus:outline-none focus:border-amber-600 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Phone / WhatsApp *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+92 300 1234567"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 px-3 text-xs text-neutral-900 focus:outline-none focus:border-amber-600 font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">City / Region *</label>
                  <input 
                    type="text" 
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Lahore / Karachi / Islamabad / Dubai"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 px-3 text-xs text-neutral-900 focus:outline-none focus:border-amber-600 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">Street Address *</label>
                <textarea 
                  name="address"
                  required
                  rows="2"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House #, Street name, Sector / Area"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-xs text-neutral-900 focus:outline-none focus:border-amber-600 font-medium"
                />
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm space-y-4">
              <h3 className="font-heading text-sm font-bold text-neutral-900 uppercase tracking-widest flex items-center gap-2 border-b border-neutral-100 pb-3">
                <CreditCard className="w-4 h-4 text-amber-600" /> Choose Payment Option
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                <label className={`p-4 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
                  formData.paymentMethod === "cod" ? "bg-amber-500/15 border-amber-500 text-amber-900" : "bg-neutral-50 border-neutral-200 text-neutral-700"
                }`}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleChange}
                    className="mt-1 accent-amber-600"
                  />
                  <div>
                    <div className="font-bold text-xs text-neutral-900 flex items-center gap-1.5">
                      <Banknote className="w-4 h-4 text-emerald-600" /> Cash on Delivery (COD)
                    </div>
                    <div className="text-[10px] text-neutral-500 mt-1">Pay with cash upon package delivery.</div>
                  </div>
                </label>

                <label className={`p-4 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
                  formData.paymentMethod === "card" ? "bg-amber-500/15 border-amber-500 text-amber-900" : "bg-neutral-50 border-neutral-200 text-neutral-700"
                }`}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleChange}
                    className="mt-1 accent-amber-600"
                  />
                  <div>
                    <div className="font-bold text-xs text-neutral-900 flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-amber-600" /> Credit / Debit Card (Stripe)
                    </div>
                    <div className="text-[10px] text-neutral-500 mt-1">Visa, Mastercard & American Express.</div>
                  </div>
                </label>

                <label className={`p-4 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
                  formData.paymentMethod === "bank" ? "bg-amber-500/15 border-amber-500 text-amber-900" : "bg-neutral-50 border-neutral-200 text-neutral-700"
                }`}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="bank"
                    checked={formData.paymentMethod === "bank"}
                    onChange={handleChange}
                    className="mt-1 accent-amber-600"
                  />
                  <div>
                    <div className="font-bold text-xs text-neutral-900 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-blue-600" /> Direct Bank Transfer
                    </div>
                    <div className="text-[10px] text-neutral-500 mt-1">Transfer directly to official IBAN.</div>
                  </div>
                </label>

                <label className={`p-4 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
                  formData.paymentMethod === "mobile_wallet" ? "bg-amber-500/15 border-amber-500 text-amber-900" : "bg-neutral-50 border-neutral-200 text-neutral-700"
                }`}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="mobile_wallet"
                    checked={formData.paymentMethod === "mobile_wallet"}
                    onChange={handleChange}
                    className="mt-1 accent-amber-600"
                  />
                  <div>
                    <div className="font-bold text-xs text-neutral-900 flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-purple-600" /> Easypaisa / JazzCash
                    </div>
                    <div className="text-[10px] text-neutral-500 mt-1">Instant digital wallet payment.</div>
                  </div>
                </label>

              </div>
            </div>

          </div>

          {/* Summary Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-amber-500/30 shadow-md lg:sticky lg:top-24 space-y-4">
              <h3 className="font-heading text-sm font-bold text-neutral-900 uppercase tracking-widest border-b border-neutral-100 pb-3">
                Order Summary ({cart.length} items)
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.itemKey} className="flex items-center gap-3 text-xs">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg border border-neutral-200 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-neutral-900 truncate">{item.name}</div>
                      <div className="text-[10px] text-neutral-500 font-mono">Qty: {item.quantity} × Rs. {item.unitPrice.toLocaleString()}</div>
                    </div>
                    <div className="font-medium text-amber-700">Rs. {(item.quantity * item.unitPrice).toLocaleString()}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs pt-4 border-t border-neutral-100 text-neutral-700 font-medium">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Subtotal</span>
                  <span className="font-medium text-neutral-900">Rs. {cartSubtotal.toLocaleString()}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount</span>
                    <span>-Rs. {discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-neutral-500">Express Courier Shipping</span>
                  <span>{shippingFee === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `Rs. ${shippingFee}`}</span>
                </div>

                <div className="flex justify-between text-lg font-bold text-neutral-900 pt-2 border-t border-neutral-200">
                  <span className="font-heading">Total Payable</span>
                  <span className="font-heading font-semibold text-amber-700">Rs. {cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-gold-gradient text-neutral-950 font-bold text-sm rounded-xl shadow-lg hover:brightness-110 transition flex items-center justify-center gap-2"
              >
                <span>Place Order Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-500 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>SSL Encrypted Transaction Guarantee</span>
              </div>
            </div>
          </div>

        </form>
      )}

    </div>
  );
}
