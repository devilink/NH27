import type { Metadata } from "next";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import Loader from "@/components/layout/Loader";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

export const metadata: Metadata = {
  title: {
    template: "%s | NH27 Outfits",
    default: "NH27 Outfits | Bespoke Luxury & Modern Essentials",
  },
  description: "Experience the art of masculinity with NH27 Outfits. Discover our curated collection of luxury timepieces, exclusive footwear, and premium apparel designed for the modern gentleman.",
  keywords: ["Luxury Menswear", "Designer Watches", "Premium Footwear", "Men's Fashion", "NH27 Outfits", "Bespoke Clothing"],
  authors: [{ name: "NH27" }],
  creator: "NH27 Outfits",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nh27-outfits.com",
    title: "NH27 Outfits | Bespoke Luxury",
    description: "The Art of Masculinity. Curated essentials and luxurious timepieces.",
    siteName: "NH27 Outfits",
    images: [
      {
        url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2938&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "NH27 Outfits Luxury Lifestyle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NH27 Outfits | Bespoke Luxury",
    description: "The Art of Masculinity. Curated essentials and luxurious timepieces.",
    creator: "@nh27outfits",
    images: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2938&auto=format&fit=crop"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth" suppressHydrationWarning>
        <body className="antialiased selection:bg-[#d4af37] selection:text-black min-h-screen flex flex-col font-sans transition-colors duration-500 ease-in-out">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange={false} // Allow color transitions
          >
            <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
            <Loader />
            <Navbar />
            <CartDrawer />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
