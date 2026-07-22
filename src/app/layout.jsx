import "./globals.css";
import localFont from "next/font/local";
import { CartProvider } from "@/context/CartContext";
import AppLayoutWrapper from "@/components/layout/AppLayoutWrapper";

// Configure Italiana local font for luxury headings
const italiana = localFont({
  src: [
    {
      path: "../assets/fonts/italiana-regular.woff2",
      weight: "400",
      style: "normal",
    }
  ],
  variable: "--font-heading",
  display: "swap",
});

// Configure Montserrat local font for clean body text
const montserrat = localFont({
  src: [
    {
      path: "../assets/fonts/montserrat-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/montserrat-bold.woff2",
      weight: "700",
      style: "normal",
    }
  ],
  variable: "--font-body",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  title: "sheraz.pk | Premium Organics, Perfumes, Watches & Couture",
  description: "Curated multi-category luxury eCommerce destination featuring pure wild Sidr honey, 24K gold serums, niche French perfumes, 18K gold watches, and bespoke fashion.",
  keywords: ["sheraz.pk", "Sidr Honey", "Luxury Perfume", "24K Gold Serum", "Automatic Watches", "Organics", "Attar", "Pakistan eCommerce"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full scroll-smooth ${italiana.variable} ${montserrat.variable}`}>
      <body className="bg-white text-neutral-900 antialiased selection:bg-amber-500 selection:text-neutral-950 min-h-full flex flex-col w-full overflow-x-hidden">
        <CartProvider>
          <AppLayoutWrapper>
            {children}
          </AppLayoutWrapper>
        </CartProvider>
      </body>
    </html>
  );
}
