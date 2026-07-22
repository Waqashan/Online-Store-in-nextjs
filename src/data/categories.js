// Dynamic Categories & Subcategories Data
// Admins can easily add/edit/delete categories dynamically from the Admin Panel.

export const categories = [
  {
    id: "cat-organics",
    slug: "organics",
    name: "Organics",
    description: "100% Raw Wild Sidr Honey, Organic A2 Desi Ghee, Cold-Pressed Oils & Royal Dry Fruits.",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80",
    bannerImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1600&q=80",
    icon: "Leaf",
    featured: true,
    displayOrder: 1,
    subcategories: [
      { id: "sub-honey", slug: "sidr-honey", name: "Honey", productCount: 14 },
      { id: "sub-ghee", slug: "desi-ghee", name: "Desi Ghee", productCount: 8 },
      { id: "sub-oils", slug: "cold-pressed-oils", name: "Oils", productCount: 19 },
      { id: "sub-dryfruits", slug: "dry-fruits", name: "Dry Fruits", productCount: 22 },
    ]
  },
  {
    id: "cat-perfumes",
    slug: "perfumes",
    name: "Perfumes",
    description: "French Colognes, Niche Scents, Royal Oud Attars, Luxury Body Sprays & Discovery Testers.",
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
    bannerImage: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1600&q=80",
    icon: "Sparkles",
    featured: true,
    displayOrder: 2,
    subcategories: [
      { id: "sub-men-perfume", slug: "men-perfumes", name: "Men", productCount: 32 },
      { id: "sub-women-perfume", slug: "women-perfumes", name: "Women", productCount: 38 },
      { id: "sub-unisex-perfume", slug: "unisex-perfumes", name: "Unisex", productCount: 18 },
      { id: "sub-attars", slug: "royal-attars", name: "Attars", productCount: 25 },
      { id: "sub-sprays", slug: "body-sprays", name: "Body Sprays", productCount: 15 },
      { id: "sub-testers", slug: "discovery-testers", name: "Testers", productCount: 12 },
    ]
  },
  {
    id: "cat-skincare",
    slug: "skin-care",
    name: "Skin Care",
    description: "Dermatologist-tested anti-aging serums, 24K Gold face elixirs, moisturizers, and cleansers.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    bannerImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1600&q=80",
    icon: "Smile",
    featured: true,
    displayOrder: 3,
    subcategories: [
      { id: "sub-serums", slug: "face-serums", name: "24K Serums", productCount: 24 },
      { id: "sub-moisturizers", slug: "moisturizers", name: "Moisturizers", productCount: 16 },
      { id: "sub-cleansers", slug: "cleansers", name: "Cleansers", productCount: 20 },
    ]
  },
  {
    id: "cat-beauty",
    slug: "beauty",
    name: "Beauty",
    description: "High-pigment luxury makeup, nourishing hair care treatments & face sculpting tools.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    bannerImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1600&q=80",
    icon: "Heart",
    featured: true,
    displayOrder: 4,
    subcategories: [
      { id: "sub-makeup", slug: "makeup", name: "Makeup", productCount: 45 },
      { id: "sub-haircare", slug: "hair-care", name: "Hair Care", productCount: 28 },
      { id: "sub-facecare", slug: "face-care", name: "Face Care", productCount: 17 },
    ]
  },
  {
    id: "cat-watches",
    slug: "watches",
    name: "Watches",
    description: "Handcrafted automatic watches, 18K gold chronographs, and Swiss-inspired horology.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    bannerImage: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80",
    icon: "Watch",
    featured: true,
    displayOrder: 5,
    subcategories: [
      { id: "sub-mens-watches", slug: "mens-watches", name: "Chronographs", productCount: 30 },
      { id: "sub-womens-watches", slug: "womens-watches", name: "Automatics", productCount: 26 },
      { id: "sub-smart-watches", slug: "smart-watches", name: "Smart Watches", productCount: 14 },
    ]
  },
  {
    id: "cat-clothes",
    slug: "clothes",
    name: "Clothes",
    description: "Bespoke formal suits, embroidered silk dresses, velvet shawls, and designer apparel.",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80",
    bannerImage: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1600&q=80",
    icon: "Shirt",
    featured: true,
    displayOrder: 6,
    subcategories: [
      { id: "sub-formal", slug: "formal-wear", name: "Bespoke Suits", productCount: 22 },
      { id: "sub-women-dresses", slug: "women-dresses", name: "Silk Gowns", productCount: 34 },
      { id: "sub-ethnic", slug: "ethnic-couture", name: "Designer Ethnic", productCount: 40 },
    ]
  },
  {
    id: "cat-shoes",
    slug: "shoes",
    name: "Shoes",
    description: "Hand-stitched Italian leather Oxfords, designer heels, and handcrafted loafers.",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
    bannerImage: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1600&q=80",
    icon: "Footprints",
    featured: false,
    displayOrder: 7,
    subcategories: [
      { id: "sub-oxfords", slug: "leather-oxfords", name: "Italian Oxfords", productCount: 18 },
      { id: "sub-heels", slug: "designer-heels", name: "Designer Heels", productCount: 25 },
      { id: "sub-loafers", slug: "handcrafted-loafers", name: "Handcrafted Loafers", productCount: 16 },
    ]
  },
  {
    id: "cat-electronics",
    slug: "electronics",
    name: "Electronics",
    description: "Audiophile noise-cancelling wireless headphones & luxury high-tech gadgets.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    bannerImage: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1600&q=80",
    icon: "Headphones",
    featured: false,
    displayOrder: 8,
    subcategories: [
      { id: "sub-audio", slug: "audiophile-sound", name: "Wireless Headphones", productCount: 20 },
      { id: "sub-gadgets", slug: "smart-home", name: "High-Tech Gadgets", productCount: 15 },
    ]
  }
];
