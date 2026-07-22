// Data Abstraction Layer (Data Service)
// All components fetch data through these service methods.
// When connecting to a real REST API backend later, only update these service functions!

import { storeConfig } from "@/data/storeConfig";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { brands } from "@/data/brands";
import { coupons, flashSaleTimer } from "@/data/coupons";
import { sampleOrders } from "@/data/orders";
import { reviews } from "@/data/reviews";

export const getStoreConfig = () => storeConfig;

export const getCategories = () => {
  return categories.sort((a, b) => a.displayOrder - b.displayOrder);
};

export const getCategoryBySlug = (slug) => {
  return categories.find((cat) => cat.slug === slug);
};

export const getProducts = () => {
  return products;
};

export const getProductBySlug = (slug) => {
  return products.find((prod) => prod.slug === slug);
};

export const getFeaturedProducts = () => {
  return products.filter((prod) => prod.isFeatured);
};

export const getFlashDeals = () => {
  return {
    timer: flashSaleTimer,
    items: products.filter((prod) => prod.isFlashDeal),
  };
};

export const getProductsByCategory = (categorySlug, subcategorySlug = null) => {
  return products.filter((prod) => {
    const matchCategory = prod.categorySlug === categorySlug;
    if (!subcategorySlug) return matchCategory;
    return matchCategory && prod.subcategorySlug === subcategorySlug;
  });
};

export const filterProducts = ({ category, subcategory, brand, minPrice, maxPrice, rating, searchQuery, sortBy }) => {
  let list = [...products];

  if (category && category !== "all") {
    list = list.filter((p) => p.categorySlug === category);
  }
  if (subcategory && subcategory !== "all") {
    list = list.filter((p) => p.subcategorySlug === subcategory);
  }
  if (brand && brand !== "all") {
    list = list.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
  }
  if (minPrice !== undefined && minPrice !== null) {
    list = list.filter((p) => p.price >= Number(minPrice));
  }
  if (maxPrice !== undefined && maxPrice !== null) {
    list = list.filter((p) => p.price <= Number(maxPrice));
  }
  if (rating) {
    list = list.filter((p) => p.rating >= Number(rating));
  }
  if (searchQuery && searchQuery.trim() !== "") {
    const q = searchQuery.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.categorySlug.toLowerCase().includes(q) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
    );
  }

  // Sorting
  if (sortBy === "price-low") {
    list.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    list.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    list.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "newest") {
    list.sort((a, b) => (b.isNewArrival ? 1 : -1));
  }

  return list;
};

export const getBrands = () => brands;
export const getCoupons = () => coupons;
export const getReviews = () => reviews;

export const getOrderById = (orderId) => {
  return sampleOrders.find((ord) => ord.id.toLowerCase() === orderId.toLowerCase() || ord.trackingNumber.toLowerCase() === orderId.toLowerCase());
};

export const getAllOrders = () => sampleOrders;
