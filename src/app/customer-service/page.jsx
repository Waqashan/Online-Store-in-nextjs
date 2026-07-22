"use client";

import React from "react";
import Link from "next/link";
import { MessageSquare, Phone, Mail, MapPin, ShieldCheck, HelpCircle } from "lucide-react";
import { getStoreConfig } from "@/services/dataService";

export default function CustomerServicePage() {
  const store = getStoreConfig();

  return (
    <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 space-y-12 bg-white text-neutral-900">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-amber-800 text-xs font-bold uppercase tracking-widest bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
          Assistance & Inquiries
        </span>
        <h1 className="font-heading text-4xl font-extrabold">Customer Support Hub</h1>
        <p className="text-xs text-neutral-500">
          Our VIP concierge team is available to assist you with order verification, scent advice, or dynamic tracking.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl text-center space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 mx-auto flex items-center justify-center font-bold">
            <Phone className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900">Call Concierge</h4>
          <p className="text-xs text-neutral-500 font-medium">For phone orders and urgent assistance.</p>
          <a href={`tel:${store.contact.phone}`} className="font-heading font-bold text-amber-800 text-sm block hover:underline">
            {store.contact.phone}
          </a>
        </div>

        <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl text-center space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 mx-auto flex items-center justify-center font-bold">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900">WhatsApp Chat</h4>
          <p className="text-xs text-neutral-500 font-medium">Chat directly with an organics advisor.</p>
          <a 
            href={`https://wa.me/${store.contact.whatsapp.replace(/[^0-9]/g, '')}`} 
            target="_blank" 
            className="font-heading font-bold text-emerald-800 text-sm block hover:underline"
          >
            {store.contact.whatsapp}
          </a>
        </div>

        <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl text-center space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 mx-auto flex items-center justify-center font-bold">
            <Mail className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900">Support Email</h4>
          <p className="text-xs text-neutral-500 font-medium">Send queries regarding returns or shipping updates.</p>
          <a href={`mailto:${store.contact.email}`} className="font-heading font-bold text-amber-800 text-sm block hover:underline">
            {store.contact.email}
          </a>
        </div>
      </div>

      <div className="bg-neutral-50 p-6 sm:p-10 rounded-3xl border border-neutral-200 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-neutral-900 border-b border-neutral-200 pb-3 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-amber-600" /> Support Accordions
        </h2>
        <div className="space-y-4 text-xs leading-relaxed text-neutral-600 font-medium">
          <div>
            <h5 className="font-bold text-neutral-900 text-sm">How can I track my shipment?</h5>
            <p className="mt-1">
              Visit our <Link href="/track-order" className="text-amber-800 font-bold hover:underline">Track Order page</Link> and enter your unique Order ID to check courier status.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-neutral-900 text-sm">Are all transactions secure?</h5>
            <p className="mt-1">
              Yes, all payments are encrypted using SSL technology. Cash on Delivery is also available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
