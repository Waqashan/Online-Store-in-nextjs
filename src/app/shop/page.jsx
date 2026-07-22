"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  Filter, 
  SlidersHorizontal, 
  Search, 
  X, 
  Grid, 
  List, 
  RotateCcw,
  Sparkles
} from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { getCategories, getBrands, filterProducts } from "@/services/dataService";

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryParam = searchParams.get("category") || "all";
  const subcategoryParam = searchParams.get("subcategory") || "all";
  const brandParam = searchParams.get("brand") || "all";
  const searchParam = searchParams.get("search") || "";
  const featuredParam = searchParams.get("featured") === "true";

  const categories = getCategories();
  const brands = getBrands();

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedSubcategory, setSelectedSubcategory] = useState(subcategoryParam);
  const [selectedBrand, setSelectedBrand] = useState(brandParam);
  const [maxPrice, setMaxPrice] = useState(600);
  const [minRating, setMinRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const activeCategoryObj = useMemo(() => {
    return categories.find((c) => c.slug === selectedCategory);
  }, [selectedCategory, categories]);

  const filteredProducts = useMemo(() => {
    let result = filterProducts({
      category: selectedCategory,
      subcategory: selectedSubcategory,
      brand: selectedBrand,
      minPrice: 0,
      maxPrice,
      rating: minRating,
      searchQuery,
      sortBy,
    });

    if (featuredParam) {
      result = result.filter((p) => p.isFeatured);
    }
    return result;
  }, [selectedCategory, selectedSubcategory, selectedBrand, maxPrice, minRating, searchQuery, sortBy, featuredParam]);

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedSubcategory("all");
    setSelectedBrand("all");
    setMaxPrice(600);
    setMinRating(0);
    setSearchQuery("");
    setSortBy("newest");
    router.push("/shop");
  };

  return (
    <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-10 bg-white text-neutral-900">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-white rounded-3xl p-8 mb-10 border border-amber-500/30 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-amber-500/30 rounded-full text-amber-800 text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Curated Catalog & Dynamic Search
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-neutral-900">
            {activeCategoryObj ? activeCategoryObj.name : "All Luxury Collections"}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl">
            {activeCategoryObj ? activeCategoryObj.description : "Browse Sidr organics, French oud perfumes, 24K gold skin serums, automatic watches & bespoke couture."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white border border-amber-500/30 px-4 py-2 rounded-2xl text-xs text-neutral-700 shadow-sm font-semibold">
            Showing <span className="font-bold text-amber-700">{filteredProducts.length}</span> items
          </div>

          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden px-4 py-2 bg-amber-500 text-neutral-950 font-bold text-xs rounded-2xl flex items-center gap-1.5 shadow-md"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* DESKTOP SIDEBAR FILTERS */}
        <aside className="hidden lg:block lg:col-span-3 xl:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm space-y-6 sticky top-24">
            
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <h3 className="font-heading text-sm font-bold text-neutral-900 uppercase tracking-widest flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-amber-600" /> Filter Catalog
              </h3>
              <button 
                onClick={handleResetFilters}
                className="text-[11px] text-neutral-500 hover:text-amber-700 flex items-center gap-1 font-semibold"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block">
                Category
              </label>
              <select 
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedSubcategory("all");
                }}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 px-3 text-xs text-neutral-900 font-semibold focus:outline-none focus:border-amber-600"
              >
                <option value="all">All Main Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory Filter */}
            {activeCategoryObj && activeCategoryObj.subcategories.length > 0 && (
              <div className="space-y-2 animate-fadeIn">
                <label className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                  Subcategory
                </label>
                <select 
                  value={selectedSubcategory}
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                  className="w-full bg-amber-50/50 border border-amber-500/40 rounded-xl py-2.5 px-3 text-xs text-neutral-900 font-semibold focus:outline-none focus:border-amber-600"
                >
                  <option value="all">All Subcategories</option>
                  {activeCategoryObj.subcategories.map((sub) => (
                    <option key={sub.id} value={sub.slug}>
                      {sub.name} ({sub.productCount})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Brand Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block">
                Brand
              </label>
              <select 
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 px-3 text-xs text-neutral-900 font-semibold focus:outline-none focus:border-amber-600"
              >
                <option value="all">All Brands</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-neutral-700 font-semibold">
                <span>Max Price:</span>
                <span className="font-bold text-amber-700">${maxPrice}</span>
              </div>
              <input 
                type="range"
                min="0"
                max="600"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>

            {/* Rating Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block">
                Minimum Rating
              </label>
              <div className="flex items-center gap-1">
                {[0, 4, 4.5, 4.8].map((stars) => (
                  <button 
                    key={stars}
                    onClick={() => setMinRating(stars)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition ${
                      minRating === stars 
                        ? "bg-amber-500 border-amber-400 text-neutral-950" 
                        : "bg-neutral-50 border-neutral-200 text-neutral-600"
                    }`}
                  >
                    {stars === 0 ? "All" : `${stars}★`}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* MAIN PRODUCT LISTING */}
        <main className="lg:col-span-9 xl:col-span-10 space-y-6">
          
          {/* Controls Bar */}
          <div className="bg-white rounded-2xl p-4 border border-neutral-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-3 text-amber-600" />
              <input 
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2 pl-9 pr-3 text-xs text-neutral-900 focus:outline-none focus:border-amber-600 font-medium"
              />
            </div>

            {/* Sorting & Layout Buttons */}
            <div className="flex items-center justify-between w-full sm:w-auto gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500 font-semibold">Sort:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-neutral-50 border border-neutral-200 rounded-xl py-1.5 px-3 text-xs text-neutral-900 font-semibold focus:outline-none focus:border-amber-600"
                >
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              <div className="flex items-center gap-1 border border-neutral-200 bg-neutral-50 p-1 rounded-xl">
                <button 
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition ${viewMode === "grid" ? "bg-amber-500 text-neutral-950" : "text-neutral-500"}`}
                  aria-label="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg transition ${viewMode === "list" ? "bg-amber-500 text-neutral-950" : "text-neutral-500"}`}
                  aria-label="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Active Filter Pills */}
          {(selectedCategory !== "all" || selectedSubcategory !== "all" || selectedBrand !== "all" || searchQuery !== "") && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-neutral-500 font-semibold">Active Filters:</span>
              {selectedCategory !== "all" && (
                <span className="px-3 py-1 bg-amber-100 border border-amber-300 text-amber-900 font-semibold rounded-full flex items-center gap-1">
                  Category: {selectedCategory}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory("all")} />
                </span>
              )}
              {selectedSubcategory !== "all" && (
                <span className="px-3 py-1 bg-amber-100 border border-amber-300 text-amber-900 font-semibold rounded-full flex items-center gap-1">
                  Subcategory: {selectedSubcategory}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedSubcategory("all")} />
                </span>
              )}
              {selectedBrand !== "all" && (
                <span className="px-3 py-1 bg-amber-100 border border-amber-300 text-amber-900 font-semibold rounded-full flex items-center gap-1">
                  Brand: {selectedBrand}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedBrand("all")} />
                </span>
              )}
              {searchQuery && (
                <span className="px-3 py-1 bg-amber-100 border border-amber-300 text-amber-900 font-semibold rounded-full flex items-center gap-1">
                  Query: "{searchQuery}"
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                </span>
              )}
            </div>
          )}

          {/* Products Grid / List */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-neutral-200 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-neutral-800">No products match your criteria</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Try resetting your category or price filters to explore our full luxury inventory.
              </p>
              <button 
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-gold-gradient text-neutral-950 font-bold text-xs rounded-xl shadow-md"
              >
                Clear All Filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
                  <img src={product.mainImage} alt={product.name} className="w-32 h-32 object-cover rounded-xl shrink-0" />
                  <div className="flex-1 space-y-1 text-center sm:text-left">
                    <span className="text-[10px] text-amber-700 uppercase font-bold">{product.brand}</span>
                    <h3 className="font-heading text-base font-bold text-neutral-900">{product.name}</h3>
                    <p className="text-xs text-neutral-500 line-clamp-2">{product.shortDescription}</p>
                    <div className="font-heading text-lg font-bold text-amber-700">${product.price}</div>
                  </div>
                  <button 
                    onClick={() => router.push(`/product/${product.slug}`)}
                    className="px-5 py-2.5 bg-gold-gradient text-neutral-950 font-bold text-xs rounded-xl shadow-md"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}

        </main>

      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center text-amber-600 font-bold">Loading catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
