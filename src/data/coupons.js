// Active Promotional Coupons & Discount Rules

export const coupons = [
  {
    code: "AUREATE20",
    discountPercentage: 20,
    minOrderAmount: 100,
    description: "20% OFF on all luxury orders over $100",
    isFlashSale: true,
  },
  {
    code: "ROYALORGANIC",
    discountAmount: 15,
    minOrderAmount: 75,
    description: "$15 OFF on pure Sidr Honey & Organics",
    isFlashSale: false,
  },
  {
    code: "VIPLUXE",
    discountPercentage: 25,
    minOrderAmount: 250,
    description: "25% VIP Discount on orders above $250",
    isFlashSale: true,
  }
];

export const flashSaleTimer = {
  title: "MIDNIGHT GOLD FLASH SALE",
  subtitle: "Up to 40% OFF on Royal Sidr Honey, Oud Perfumes & 24K Gold Serums",
  endTimeISO: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 48 hours from now
};
