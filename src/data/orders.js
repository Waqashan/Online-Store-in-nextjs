// Sample Orders for Order Tracking Demo & Admin Preview

export const sampleOrders = [
  {
    id: "AUR-892401",
    customerName: "Alexander Vance",
    email: "alexander.vance@example.com",
    phone: "+1 (555) 019-2834",
    status: "Shipped",
    statusStep: 3, // 1: Order Placed, 2: Processing, 3: Shipped, 4: Out for Delivery, 5: Delivered
    paymentMethod: "Credit Card (Stripe)",
    paymentStatus: "Paid",
    shippingAddress: "450 Park Avenue, Suite 1200, New York, NY 10022",
    createdAt: "2026-07-20T14:22:00Z",
    estimatedDelivery: "2026-07-23",
    trackingNumber: "TRK-EXP-9920148",
    carrier: "DHL Express Gold Courier",
    subtotal: 274.99,
    discount: 55.00,
    shippingFee: 0,
    total: 219.99,
    items: [
      {
        productName: "Black Oud Royale Niche Eau De Parfum (100ml)",
        variant: "100ml Spray",
        quantity: 1,
        unitPrice: 185.00,
        image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=300&q=80"
      },
      {
        productName: "Royal Wild-Harvested Sidr Honey (1kg)",
        variant: "1kg Royal Jar",
        quantity: 1,
        unitPrice: 89.99,
        image: "https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=300&q=80"
      }
    ]
  },
  {
    id: "AUR-892402",
    customerName: "Sophia Al-Mansoor",
    email: "sophia.mansoor@example.com",
    phone: "+971 50 123 4567",
    status: "Processing",
    statusStep: 2,
    paymentMethod: "Cash on Delivery (COD)",
    paymentStatus: "Pending COD",
    shippingAddress: "Villa 42, Al Wasl Road, Jumeirah 2, Dubai, UAE",
    createdAt: "2026-07-21T09:15:00Z",
    estimatedDelivery: "2026-07-24",
    trackingNumber: "TRK-EXP-9920149",
    carrier: "Aramex Priority",
    subtotal: 495.00,
    discount: 99.00,
    shippingFee: 0,
    total: 396.00,
    items: [
      {
        productName: "Monarch Royal 18K Gold Skeleton Automatic Watch",
        variant: "18K Gold Mesh Bracelet",
        quantity: 1,
        unitPrice: 495.00,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80"
      }
    ]
  }
];
