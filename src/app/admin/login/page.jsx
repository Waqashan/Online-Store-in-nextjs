"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Key, 
  ArrowRight, 
  SlidersHorizontal,
  Sparkles,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { getStoreConfig } from "@/services/dataService";

export default function AdminLoginPage() {
  const router = useRouter();
  const store = getStoreConfig();
  const [email, setEmail] = useState("admin@aureate.luxe");
  const [password, setPassword] = useState("admin123");
  const [securityPin, setSecurityPin] = useState("9900");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    setTimeout(() => {
      if (email && password) {
        // Save session flag
        if (typeof window !== "undefined") {
          localStorage.setItem("aureate_admin_session", JSON.stringify({
            role: "Super Admin",
            email: email,
            loginTime: new Date().toISOString()
          }));
        }
        router.push("/admin");
      } else {
        setIsLoading(false);
        setErrorMsg("Invalid administrator credentials or security PIN.");
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-700/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-8">
        
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            Security Gateway
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-wider text-white">
            {store.name} <span className="text-gold-gradient">Control Center</span>
          </h1>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            Restricted Access Admin Portal for Catalog Management, Orders, Inventory & Store Configuration.
          </p>
        </div>

        {/* Card */}
        <div className="bg-neutral-900/90 border border-amber-500/30 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl space-y-6">
          
          {errorMsg && (
            <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            
            <div>
              <label className="text-xs font-bold text-neutral-300 block mb-1.5">Administrator Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-950/80 border border-neutral-800 focus:border-amber-500 text-white rounded-xl py-3 pl-10 pr-4 text-xs font-mono focus:outline-none transition"
                  placeholder="admin@aureate.luxe"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-300 block mb-1.5">Master Key / Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-950/80 border border-neutral-800 focus:border-amber-500 text-white rounded-xl py-3 pl-10 pr-4 text-xs font-mono focus:outline-none transition"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-300 block mb-1.5">Security Auth PIN</label>
              <div className="relative">
                <Key className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  maxLength="4"
                  value={securityPin}
                  onChange={(e) => setSecurityPin(e.target.value)}
                  className="w-full bg-neutral-950/80 border border-neutral-800 focus:border-amber-500 text-amber-400 rounded-xl py-3 pl-10 pr-4 text-xs font-mono tracking-widest focus:outline-none transition"
                  placeholder="9900"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:brightness-110 transition flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                <>
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Access Admin Control Center</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Direct Demo Quick Login */}
          <div className="pt-4 border-t border-neutral-800/80 text-center">
            <button 
              onClick={() => {
                setEmail("admin@aureate.luxe");
                setPassword("admin123");
                setSecurityPin("9900");
                handleAdminLogin({ preventDefault: () => {} });
              }}
              className="text-xs text-amber-400 hover:text-amber-300 font-bold underline transition"
            >
              ⚡ Quick One-Click Demo Admin Login
            </button>
          </div>

        </div>

        <div className="text-center text-[11px] text-neutral-500">
          <Link href="/" className="hover:text-amber-400 transition">&larr; Return to Aureate Luxe Store</Link>
        </div>

      </div>
    </div>
  );
}
