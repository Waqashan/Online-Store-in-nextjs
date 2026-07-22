# sheraz.pk - Multi-Category Luxury & Organics Emporium

> [!IMPORTANT]
> This project represents a **state-of-the-art e-commerce storefront** built specifically for the **sheraz.pk** brand. It features custom-tailored local fonts, a modular homepage structure, dynamic option builders, custom bulk promo algorithms, and a comprehensive admin inventory control suite.

## Project Overview
**sheraz.pk** is a premium online retail destination built on top of **Next.js 14+ (App Router)** and styled with custom high-contrast **Tailwind CSS**. It combines a refined luxury storefront with an advanced administrative portal to manage product catalogs, order fulfillment, and dynamic categories.

### 🚀 Live Preview
[https://sheraz.pk](https://sheraz.pk) *(Or your Vercel deployment link)*

### 🛠 Key Features

#### 🏪 Customer Storefront
- **Refined Luxury Design**: Responsive grid systems with custom typography leveraging downloaded **Italiana** (headings) and **Montserrat** (body) fonts.
- **Dynamic Mega Dropdown Menu**: Stateful, crisp category dropdown navigation panel that auto-dismisses upon link click to prevent sticky states.
- **Dynamic Weight Selector**: Add-to-cart variant selector built specifically for packaging variations (e.g. `250G`, `600G`, `1200G` with automatic price updates).
- **Special Bulk Savings Panel**:
  - *Buy 2: Save Rs. 80* (Add to Cart button)
  - *Buy 3+: Save Rs. 160* (Add to Cart button)
  - Handles item calculations and transfers discounted values to the cart.
- **8 Custom Policy & Support Pages**:
  - About Us, Contact, Customer Support Hub (WhatsApp integrations), Shipping Policy (TCS & Leopards timelines), Return Policy, Lifetime Purity Guarantee, Privacy, and Terms.

#### 🔐 Admin Control Center
- **Overview & Analytics**:
  - Timeframe Filters (Today, Last 7 Days, Last 30 Days, This Month, All Time) updating metrics dynamically.
  - Store Status maintenance switch widget.
  - Low Stock Alerts warnings flag listing items with `< 15` units, featuring a single-click `+50 Restock` button.
- **Products Catalog Editor**:
  - Real-time search filter across Title, SKU, brand, and categories.
  - Edit details modal to configure titles, SEO Meta tags, full description tables, and colors list.
  - Multi-Image selector with scrolling preview thumbnails.
  - Custom variants builder & dynamic bulk offers button editor.
- **Categories & Subcategories Builder**:
  - Add nested subcategories (comma-separated list) during category creation.
  - Edit category name, display order, description, and custom image URL.
  - Delete or add subcategories inline inside the taxonomy grid.
- **Customer Orders Hub**:
  - Timeframe filter selector (Today, Weekly, Monthly, Custom range inputs) and search bar.
  - Status pipeline filtering tabs (Processing, Shipped, Delivered, Cancelled).
  - Explicit **"Update Status"** click-to-confirm button to prevent accidental state changes.
  - Courier dispatch assignment field (TCS / Leopards courier codes).
  - Print Invoice modal supporting PDF downloads and physical thermal receipts.

---

## Technical Stack

- **Framework**: Next.js 14+ (App Router)
- **React**: 18+
- **Styling**: Tailwind CSS with custom global variables (`globals.css`)
- **Typography**: Local downloaded `.woff2` files (Italiana & Montserrat)
- **Icons**: Lucide React
- **State Management**: React Context (Cart, Wishlist, Currency settings)

---

## Project Structure

```
Online-Store-in-nextjs/
├── src/
│   ├── app/                      # Next.js App Router Pages
│   │   ├── admin/                # Admin Panel Layouts
│   │   │   ├── categories/       # Taxonomy Builder
│   │   │   ├── products/         # Products option manager
│   │   │   ├── orders/           # Customer Orders Hub
│   │   │   └── page.jsx          # Dashboard Overview & KPIs
│   │   ├── product/[slug]/       # Dynamic Detail View with weight selectors
│   │   ├── about/                # Sourcing & heritage
│   │   ├── contact/              # Support & feedback channels
│   │   ├── customer-service/     # Help desk lines
│   │   ├── shipping-policy/      # Logistics guidelines
│   │   ├── return-policy/        # Refund parameters
│   │   ├── guarantee/            # Lifetime Purity Guarantee details
│   │   ├── privacy/              # Privacy regulations
│   │   ├── terms/                # Corporate Terms of Use
│   │   └── layout.jsx            # LocalFont loader variables
│   ├── components/               # Reusable UI Blocks
│   │   ├── admin/                # Admin dashboard layout
│   │   ├── home/                 # Homepage sections (Hero, Featured, Value)
│   │   └── product/              # Cards & QuickView modals
│   ├── context/                  # Global CartContext state handlers
│   ├── data/                     # Data catalog storage
│   │   ├── products.js           # Items metadata and variant arrays
│   │   ├── categories.js         # Master taxonomy configurations
│   │   └── storeConfig.js        # Global corporate settings
```

---

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Online-Store-in-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Build Production Bundle**
   ```bash
   npm run build
   ```

---

## License
MIT
