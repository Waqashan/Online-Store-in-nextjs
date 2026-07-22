"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  Truck, 
  Globe,
  SlidersHorizontal,
  User,
  ShieldCheck
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getStoreConfig, getCategories } from "@/services/dataService";

export default function Navbar() {
  const pathname = usePathname();
  const { totalItemsCount, wishlist, setIsCartOpen, currency, setCurrency } = useCart();
  const store = getStoreConfig();
  const categories = getCategories();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top Announcement Bar */}
      {store.announcement.enabled && (
        <div className="bg-gradient-to-r from-neutral-900 via-amber-950 to-neutral-900 text-amber-200 text-xs py-2 px-4 border-b border-amber-500/20">
          <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>{store.announcement.text}</span>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-amber-300/90">
              <div className="flex items-center gap-1.5 hover:text-white">
                <Truck className="w-3 h-3 text-amber-400" />
                <span>Free Express Shipping Over {currency.symbol}{store.features.freeShippingThreshold}</span>
              </div>
              <span className="hidden sm:inline">|</span>
              <div className="flex items-center gap-1 hidden sm:flex">
                <Globe className="w-3 h-3 text-amber-400" />
                <select 
                  value={currency.code} 
                  onChange={(e) => {
                    const selected = store.supportedCurrencies.find(c => c.code === e.target.value);
                    if (selected) setCurrency(selected);
                  }}
                  className="bg-transparent text-amber-300 focus:outline-none cursor-pointer font-medium"
                >
                  {store.supportedCurrencies.map((curr) => (
                    <option key={curr.code} value={curr.code} className="bg-neutral-900 text-white">
                      {curr.code} ({curr.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <nav className={`transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-amber-500/20" : "bg-white/90 backdrop-blur-sm border-b border-neutral-200 py-4"}`}>
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex items-center justify-between">
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-700 hover:text-amber-600 transition"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-1 group">
            <div>
              <span className="font-heading text-xl sm:text-2xl font-bold tracking-widest text-neutral-900 block leading-none">
                {store.name}
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-amber-700 font-semibold block mt-0.5">
                {store.logo.subtext}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links with Mega Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <Link 
              href="/" 
              className={`text-sm font-semibold transition-colors ${pathname === "/" ? "text-amber-600" : "text-neutral-700 hover:text-amber-600"}`}
            >
              Home
            </Link>

            {/* Categories Mega Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <Link 
                href="/shop" 
                onClick={() => setIsMegaMenuOpen(false)}
                className={`text-sm font-semibold flex items-center gap-1.5 transition-colors ${pathname.startsWith("/shop") ? "text-amber-600" : "text-neutral-700 hover:text-amber-600"}`}
              >
                Categories
                <ChevronDown className={`w-4 h-4 transition-transform text-amber-600 ${isMegaMenuOpen ? "rotate-180" : ""}`} />
              </Link>

              {/* Mega Dropdown Panel */}
              {isMegaMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[850px] bg-white rounded-2xl p-6 shadow-2xl border border-amber-500/30 transition-all duration-300 transform translate-y-0 z-50 animate-fadeIn">
                  <div className="grid grid-cols-4 gap-6">
                    {categories.map((cat) => (
                      <div key={cat.id} className="space-y-3">
                        <Link 
                          href={`/shop?category=${cat.slug}`}
                          onClick={() => setIsMegaMenuOpen(false)}
                          className="font-heading text-sm font-bold text-neutral-900 hover:text-amber-600 flex items-center gap-2 border-b border-amber-500/20 pb-2 uppercase tracking-wider"
                        >
                          {cat.name}
                        </Link>
                        <ul className="space-y-1.5 text-xs text-neutral-600 font-semibold">
                          {cat.subcategories.map((sub) => (
                            <li key={sub.id}>
                              <Link 
                                href={`/shop?category=${cat.slug}&subcategory=${sub.slug}`}
                                onClick={() => setIsMegaMenuOpen(false)}
                                className="hover:text-amber-600 transition-colors flex items-center justify-between hover:translate-x-1 duration-200"
                              >
                                <span>{sub.name}</span>
                                <span className="text-[10px] text-neutral-400 font-mono">({sub.productCount})</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-100 flex justify-between items-center text-xs text-neutral-500 font-semibold">
                    <span className="flex items-center gap-2 text-amber-700 font-bold">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      Dynamic taxonomy managed seamlessly from Admin Dashboard
                    </span>
                    <Link 
                      href="/shop" 
                      onClick={() => setIsMegaMenuOpen(false)}
                      className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold rounded-lg hover:brightness-110 transition shadow-sm"
                    >
                      Explore All Collections &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link 
              href="/track-order" 
              className="text-sm font-semibold text-neutral-700 hover:text-amber-600 transition-colors"
            >
              Track Order
            </Link>

            <Link 
              href="/about" 
              className={`text-sm font-semibold transition-colors ${pathname === "/about" ? "text-amber-600" : "text-neutral-700 hover:text-amber-600"}`}
            >
              About Us
            </Link>

            <Link 
              href="/contact" 
              className={`text-sm font-semibold transition-colors ${pathname === "/contact" ? "text-amber-600" : "text-neutral-700 hover:text-amber-600"}`}
            >
              Contact
            </Link>
          </div>

          {/* Action Icons (Search, User Login, Wishlist, Cart) */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-neutral-700 hover:text-amber-600 transition hover:scale-110"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link 
              href="/login" 
              className="p-2 text-neutral-700 hover:text-amber-600 transition hover:scale-110 flex items-center gap-1"
              aria-label="User Sign In"
              title="Customer Login / Register"
            >
              <User className="w-5 h-5" />
              <span className="hidden xl:inline text-xs font-semibold">Sign In</span>
            </Link>

            <Link 
              href="/shop?wishlist=true" 
              className="relative p-2 text-neutral-700 hover:text-amber-600 transition hover:scale-110"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-neutral-950 font-bold text-[10px] rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold rounded-xl shadow-md hover:scale-105 transition-transform flex items-center gap-2"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline text-xs tracking-wider uppercase font-semibold">Bag</span>
              {totalItemsCount > 0 && (
                <span className="bg-neutral-950 text-amber-300 px-2 py-0.5 rounded-full text-xs font-mono border border-amber-400/40">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Instant Search Overlay */}
        {isSearchOpen && (
          <div className="max-w-4xl mx-auto px-4 mt-3 pb-3 animate-fadeIn">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="w-5 h-5 absolute left-4 text-amber-600" />
              <input 
                type="text"
                placeholder="Search Sidr Honey, Oud Perfumes, 24K Gold Serums, Watches, Suits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-2 border-amber-500/40 rounded-xl py-3 pl-12 pr-24 text-neutral-900 text-sm focus:outline-none focus:border-amber-600 shadow-xl"
                autoFocus
              />
              <button 
                type="submit"
                className="absolute right-2 px-4 py-1.5 bg-amber-500 text-neutral-950 font-bold text-xs rounded-lg hover:bg-amber-400 transition"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-neutral-200 px-4 py-6 mt-3 space-y-4 max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="flex flex-col gap-3">
              <Link 
                href="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-semibold text-amber-600 py-1"
              >
                Home
              </Link>
              <Link 
                href="/shop" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-semibold text-neutral-800 hover:text-amber-600 py-1"
              >
                All Collections & Shop
              </Link>
              <Link 
                href="/track-order" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-semibold text-neutral-800 hover:text-amber-600 py-1"
              >
                Track Order
              </Link>
              <Link 
                href="/about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-semibold text-neutral-800 hover:text-amber-600 py-1"
              >
                About Us
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-semibold text-neutral-800 hover:text-amber-600 py-1"
              >
                Contact Us
              </Link>
              <Link 
                href="/login" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-semibold text-neutral-800 hover:text-amber-600 py-1 flex items-center gap-2"
              >
                <User className="w-4 h-4 text-amber-600" />
                Customer Sign In / Register
              </Link>
            </div>

            <div className="pt-4 border-t border-neutral-200 space-y-2">
              <div className="font-heading text-xs font-bold text-amber-700 uppercase tracking-widest mb-2">
                Main Categories
              </div>
              {categories.map((cat) => (
                <div key={cat.id} className="space-y-1">
                  <Link 
                    href={`/shop?category=${cat.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-sm text-neutral-700 font-medium hover:text-amber-600"
                  >
                    {cat.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
