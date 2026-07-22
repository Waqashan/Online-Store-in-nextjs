// Centralized Store Configuration
// Easily update store name, branding, currencies, contact details, and features here!

export const storeConfig = {
  name: "sheraz.pk",
  legalName: "Sheraz.pk Luxury International Ltd.",
  tagline: "The Pinnacle of Modern Elegance & Organics",
  slogan: "Curated Luxury across Perfumes, Organics, Skin Care, Timepieces & Couture",
  logo: {
    text: "SHERAZ",
    subtext: "SHERAZ.PK E-STORE",
    badge: "100% AUTHENTIC",
  },
  currency: {
    symbol: "Rs.",
    code: "PKR",
    position: "prefix", // "prefix" | "suffix"
  },
  supportedCurrencies: [
    { code: "PKR", symbol: "Rs.", rate: 1, name: "Pakistani Rupee" },
    { code: "USD", symbol: "$", rate: 0.0036, name: "US Dollar" },
    { code: "AED", symbol: "AED", rate: 0.013, name: "UAE Dirham" },
    { code: "EUR", symbol: "€", rate: 0.0033, name: "Euro" },
  ],
  contact: {
    email: "concierge@sheraz.pk",
    phone: "+92 300 1234567",
    whatsapp: "+92 300 1234567",
    address: "Gulberg III, Main Boulevard, Lahore, Pakistan",
    workingHours: "24/7 VIP Concierge Available",
  },
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    pinterest: "https://pinterest.com",
  },
  announcement: {
    enabled: true,
    text: "✨ Exclusive Offer: Use code SHERAZ20 for 20% off + Complimentary Express Shipping nationwide!",
  },
  features: {
    freeShippingThreshold: 5000,
    enableReviews: true,
    enableWishlist: true,
    enableQuickView: true,
    enableOrderTracking: true,
    enableAdminPreview: true,
  },
  paymentMethods: [
    { id: "cod", name: "Cash on Delivery (COD)", icon: "Banknote", description: "Pay with cash upon package delivery." },
    { id: "card", name: "Credit / Debit Card (Stripe)", icon: "CreditCard", description: "Visa, Mastercard, American Express via Secure SSL." },
    { id: "bank", name: "Direct Bank Transfer", icon: "Building2", description: "Transfer directly to our official IBAN." },
    { id: "mobile_wallet", name: "JazzCash / Easypaisa / Mobile Wallet", icon: "Smartphone", description: "Instant transfer via digital mobile wallets." },
  ],
  shippingZones: [
    { id: "standard", name: "Domestic Express Courier (1-2 Days)", fee: 250 },
    { id: "overnight", name: "VIP White-Glove Same-Day Delivery", fee: 500 },
    { id: "international", name: "Global Air Freight Courier (5-7 Days)", fee: 3500 },
  ]
};
