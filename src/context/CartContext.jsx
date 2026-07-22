"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { storeConfig } from "@/data/storeConfig";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [currency, setCurrency] = useState(storeConfig.currency);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Load from localStorage on client side
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("aureate_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem("aureate_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (e) {
      console.error("Failed to parse localStorage:", e);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("aureate_cart", JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("aureate_wishlist", JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  const addToCart = (product, variant = null, quantity = 1, overridePrice = null) => {
    setCart((prevCart) => {
      const itemKey = `${product.id}-${variant ? variant.id : "default"}${overridePrice ? "-bulk" : ""}`;
      const existingIndex = prevCart.findIndex((item) => item.itemKey === itemKey);

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const unitPrice = overridePrice !== null ? overridePrice : (variant ? variant.price : product.price);
        return [
          ...prevCart,
          {
            itemKey,
            productId: product.id,
            slug: product.slug,
            name: product.name + (overridePrice ? " (Bulk Promo)" : ""),
            image: product.mainImage,
            brand: product.brand,
            variant: variant ? variant.name : "Standard",
            sku: variant ? variant.sku : product.sku,
            unitPrice,
            quantity,
          },
        ];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemKey) => {
    setCart((prev) => prev.filter((item) => item.itemKey !== itemKey));
  };

  const updateQuantity = (itemKey, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.itemKey === itemKey) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((p) => p.id === productId);
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercentage) {
      discountAmount = (cartSubtotal * appliedCoupon.discountPercentage) / 100;
    } else if (appliedCoupon.discountAmount) {
      discountAmount = appliedCoupon.discountAmount;
    }
  }

  const freeShippingThreshold = storeConfig.features.freeShippingThreshold;
  const shippingFee = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 15;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        appliedCoupon,
        setAppliedCoupon,
        currency,
        setCurrency,
        cartSubtotal,
        discountAmount,
        shippingFee,
        cartTotal,
        totalItemsCount,
        freeShippingThreshold,
        quickViewProduct,
        setQuickViewProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
