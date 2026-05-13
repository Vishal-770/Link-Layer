import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/providers/ClientProviders";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://link-layer.vercel.app"),
  title: {
    default: "LinkLayer | Enterprise URL Infrastructure & Analytics",
    template: "%s | LinkLayer",
  },
  description: "Secure, fast URL infrastructure for modern digital experiences. Featuring Redis-backed redirects, Safe Browsing protection, and real-time analytics.",
  keywords: [
    "URL Shortener", 
    "Link Management", 
    "QR Code Engine", 
    "Link Analytics", 
    "Redis Caching", 
    "URL Security", 
    "Google Safe Browsing",
    "Geo-tracking"
  ],
  authors: [{ name: "LinkLayer Engineering" }],
  creator: "LinkLayer",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://link-layer.vercel.app",
    title: "LinkLayer | High-Performance URL Infrastructure",
    description: "Enterprise-grade URL shortening with real-time analytics and military-grade security gates.",
    siteName: "LinkLayer",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "LinkLayer Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkLayer | High-Performance URL Infrastructure",
    description: "Enterprise-grade URL shortening with real-time analytics and military-grade security gates.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  verification: {
    google: "uMEQW4n942oZXX663dP1N2Mq4LaCUGVfN89UF0pu0TI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-secondary/30 selection:text-secondary`}
      >
        <ClientProviders>
          {children}
        </ClientProviders>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-XXXX-Y', 'auto');
            ga('send', 'pageview');
          `}
        </Script>
      </body>
    </html>
  );
}
