"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  CreditCard, 
  Banknote, 
  Building2, 
  Smartphone,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { getStoreConfig, getCategories } from "@/services/dataService";

export default function Footer() {
  const store = getStoreConfig();
  const categories = getCategories();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <footer className="bg-neutral-50 text-neutral-800 border-t border-amber-500/20 pt-16 pb-8">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        
        {/* Top Newsletter Section */}
        <div className="glass-panel rounded-3xl p-8 mb-16 border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-white to-amber-500/10 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/15 border border-amber-500/30 rounded-full text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                VIP Club Membership
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
                Join the Aureate Inner Circle
              </h3>
              <p className="text-sm text-neutral-600">
                Subscribe for private invitations to flash sales, secret organic harvests, and new scent releases.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="relative flex-1">
                <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-amber-600" />
                <input 
                  type="email" 
                  placeholder="Enter your VIP email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="w-full bg-white border border-amber-500/30 rounded-2xl py-3 pl-12 pr-4 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-600 shadow-sm"
                />
              </div>
              <button 
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold text-xs rounded-2xl hover:brightness-110 transition flex items-center justify-center gap-1.5 shadow-md shrink-0"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
          {subscribed && (
            <div className="mt-3 text-xs text-emerald-700 font-semibold flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Thank you! You have been added to the Aureate VIP Private Catalog List.
            </div>
          )}
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center font-heading font-bold text-lg">
                A
              </div>
              <span className="font-heading text-2xl font-bold text-neutral-900">
                {store.name}
              </span>
            </Link>
            <p className="text-xs text-neutral-600 leading-relaxed max-w-sm">
              {store.slogan}. Handcrafted luxury, certified wild Sidr organics, french perfumery, 18K gold watches, and bespoke couture.
            </p>

            <div className="space-y-2 pt-2 text-xs text-neutral-700 font-medium">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{store.contact.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{store.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{store.contact.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="font-heading text-sm font-bold text-amber-800 uppercase tracking-wider mb-4 border-b border-amber-500/20 pb-2">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600 font-medium">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link 
                    href={`/shop?category=${cat.slug}`}
                    className="hover:text-amber-700 transition-colors flex items-center gap-1.5"
                  >
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="font-heading text-sm font-bold text-amber-800 uppercase tracking-wider mb-4 border-b border-amber-500/20 pb-2">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600 font-medium">
              <li>
                <Link href="/about" className="hover:text-amber-700 transition-colors">
                  About Us & Heritage
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-700 transition-colors">
                  Contact Concierge
                </Link>
              </li>
              <li>
                <Link href="/customer-service" className="hover:text-amber-700 transition-colors">
                  Customer Support Hub
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-amber-700 transition-colors">
                  Shipping & Delivery Policy
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="hover:text-amber-700 transition-colors">
                  Return & Exchange Policy
                </Link>
              </li>
              <li>
                <Link href="/guarantee" className="hover:text-amber-700 transition-colors text-amber-800 font-bold">
                  Lifetime Purity Guarantee
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-amber-700 transition-colors">
                  Privacy & Data Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-700 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Supported Payments */}
          <div>
            <h4 className="font-heading text-sm font-bold text-amber-800 uppercase tracking-wider mb-4 border-b border-amber-500/20 pb-2">
              Payment Methods
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-neutral-800 bg-white p-2.5 rounded-lg border border-neutral-200 shadow-sm">
                <Banknote className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Cash on Delivery (COD)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-800 bg-white p-2.5 rounded-lg border border-neutral-200 shadow-sm">
                <CreditCard className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Stripe / Visa / Mastercard</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-800 bg-white p-2.5 rounded-lg border border-neutral-200 shadow-sm">
                <Smartphone className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Easypaisa / JazzCash / Wallets</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-800 bg-white p-2.5 rounded-lg border border-neutral-200 shadow-sm">
                <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Bank Transfer (IBAN)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>256-Bit Bank Grade SSL Encrypted & Secure Checkout</span>
          </div>
          <div>
            © {new Date().getFullYear()} {store.legalName}. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
