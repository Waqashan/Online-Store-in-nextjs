"use client";

import React, { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Sparkles,
  HelpCircle
} from "lucide-react";
import { getStoreConfig } from "@/services/dataService";

export default function ContactPage() {
  const store = getStoreConfig();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-20 bg-white text-neutral-900">
      
      {/* Hero Header */}
      <section className="relative py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-white text-center">
        <div className="w-full max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-amber-500/30 rounded-full text-amber-800 text-xs font-bold uppercase tracking-widest shadow-sm">
            <MessageSquare className="w-4 h-4 text-amber-600" /> VIP Concierge & Assistance
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-neutral-900">
            Contact <span className="text-gold-gradient">sheraz.pk</span>
          </h1>
          <p className="text-sm text-neutral-600 max-w-md mx-auto">
            Have questions about custom orders, harvest dates, or order tracking? Our dedicated concierge is available 24/7.
          </p>
        </div>
      </section>

      {/* Contact Cards & Form Grid */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Direct Contact Cards Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-amber-800 text-xs font-bold uppercase tracking-widest block mb-1">Direct Channels</span>
              <h2 className="font-heading text-2xl font-bold text-neutral-900">Get in Touch Directly</h2>
              <p className="text-xs text-neutral-500 mt-1">Connect via phone, email, or instant WhatsApp messaging.</p>
            </div>

            <div className="space-y-4">
              <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-2xl flex items-start gap-4 shadow-sm">
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-700 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-neutral-900 uppercase">Customer Support Phone</h4>
                  <a href={`tel:${store.contact.phone}`} className="font-heading font-bold text-amber-800 text-sm block mt-0.5 hover:underline">
                    {store.contact.phone}
                  </a>
                  <span className="text-[10px] text-neutral-400">Available Monday - Saturday</span>
                </div>
              </div>

              <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-2xl flex items-start gap-4 shadow-sm">
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-700 shrink-0">
                  <MessageSquare className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-neutral-900 uppercase">WhatsApp VIP Concierge</h4>
                  <a 
                    href={`https://wa.me/${store.contact.whatsapp.replace(/[^0-9]/g, '')}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="font-heading font-bold text-emerald-700 text-sm block mt-0.5 hover:underline"
                  >
                    {store.contact.whatsapp} (Instant Chat)
                  </a>
                  <span className="text-[10px] text-neutral-400">Direct scent & Sidr honey advice</span>
                </div>
              </div>

              <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-2xl flex items-start gap-4 shadow-sm">
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-700 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-neutral-900 uppercase">Official Email</h4>
                  <a href={`mailto:${store.contact.email}`} className="font-heading font-bold text-amber-800 text-sm block mt-0.5 hover:underline">
                    {store.contact.email}
                  </a>
                  <span className="text-[10px] text-neutral-400">Response within 2-4 hours</span>
                </div>
              </div>

              <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-2xl flex items-start gap-4 shadow-sm">
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-700 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-neutral-900 uppercase">Headquarters Location</h4>
                  <div className="font-semibold text-xs text-neutral-700 mt-0.5">
                    {store.contact.address}
                  </div>
                  <span className="text-[10px] text-neutral-400">Lahore, Pakistan</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-neutral-200 shadow-lg space-y-6">
            <div>
              <h2 className="font-heading text-2xl font-bold text-neutral-900">Send an Inquiry</h2>
              <p className="text-xs text-neutral-500 mt-1">Fill out the form below and our team will get back to you promptly.</p>
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-800 space-y-3 animate-fadeIn">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  <h3 className="font-heading text-lg font-bold">Message Sent Successfully!</h3>
                </div>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  Thank you, <strong>{form.name}</strong>. Your inquiry has been dispatched to our VIP Concierge team. We will contact you at <strong>{form.email}</strong> shortly.
                </p>
                <button 
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                  className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">Your Full Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 px-3 text-xs text-neutral-900 font-medium focus:outline-none focus:border-amber-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">Email Address *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="name@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 px-3 text-xs text-neutral-900 font-medium focus:outline-none focus:border-amber-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">Phone Number (Optional)</label>
                    <input 
                      type="tel" 
                      placeholder="+92 300 1234567"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 px-3 text-xs text-neutral-900 font-medium focus:outline-none focus:border-amber-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">Inquiry Subject *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Bulk Sidr Honey Order / Scent Guidance"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 px-3 text-xs text-neutral-900 font-medium focus:outline-none focus:border-amber-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Your Message *</label>
                  <textarea 
                    rows="4"
                    required
                    placeholder="Tell us how we can assist you..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-xs text-neutral-900 font-medium focus:outline-none focus:border-amber-600"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-neutral-950 font-bold text-xs rounded-xl shadow-lg hover:brightness-110 transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Concierge</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="bg-neutral-50 rounded-3xl p-8 sm:p-10 border border-neutral-200 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 font-bold text-xs rounded-full">
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" /> FAQ
            </div>
            <h2 className="font-heading text-2xl font-bold text-neutral-900">Frequently Asked Questions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="bg-white p-5 rounded-2xl border border-neutral-200 space-y-2">
              <h4 className="font-bold text-xs text-neutral-900">How do I verify the organic purity of Sidr honey?</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Every batch of our wild Sidr honey comes with an official ISO 22000 lab certificate verifying 0% added sucrose, unheated raw state, and wild blossom origin.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-neutral-200 space-y-2">
              <h4 className="font-bold text-xs text-neutral-900">What are your domestic delivery timelines in Pakistan?</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Domestic express shipments (via TCS / Leopards) are delivered in 1-2 business days across major cities (Lahore, Karachi, Islamabad).
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
