import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Premium Men's Barbershop & Grooming Lounge`,
  description: siteConfig.description,
  keywords: [
    "Barbershop",
    "Men's Haircut",
    "Hot Towel Shave",
    "Beard Trim",
    "Bangalore Barbershop",
    "Indiranagar Salon",
    "UrbanEdge Barbers",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: `${siteConfig.name} — Sharp Style. Sharp You.`,
    description: siteConfig.description,
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Oswald:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#112119] text-[#f3f4f1] antialiased selection:bg-[#d4b26f] selection:text-[#0e1a14]">
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
