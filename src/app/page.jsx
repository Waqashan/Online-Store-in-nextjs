"use client";

import React, { useState, useEffect } from "react";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FlashSaleSection from "@/components/home/FlashSaleSection";
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection";
import ValuePropsSection from "@/components/home/ValuePropsSection";
import BrandsSection from "@/components/home/BrandsSection";
import ReviewsSection from "@/components/home/ReviewsSection";

import {
  getStoreConfig,
  getCategories,
  getFeaturedProducts,
  getFlashDeals,
  getBrands,
  getReviews
} from "@/services/dataService";

export default function HomePage() {
  const [store, setStore] = useState(null);
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [flashDeals, setFlashDeals] = useState(null);
  const [brands, setBrands] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setStore(getStoreConfig());
    setCategories(getCategories());
    setFeaturedProducts(getFeaturedProducts());
    setFlashDeals(getFlashDeals());
    setBrands(getBrands());
    setReviews(getReviews());
  }, []);

  if (!store || !flashDeals) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-white text-neutral-900 font-bold text-xs uppercase tracking-widest">
        Loading Luxury Experience...
      </div>
    );
  }

  return (
    <div className="space-y-20 pb-20 overflow-hidden bg-white text-neutral-900">
      <HeroSection />
      <CategoriesSection categories={categories} />
      <FlashSaleSection flashDeals={flashDeals} />
      <FeaturedProductsSection featuredProducts={featuredProducts} />
      <ValuePropsSection store={store} />
      <BrandsSection brands={brands} />
      <ReviewsSection reviews={reviews} />
    </div>
  );
}
