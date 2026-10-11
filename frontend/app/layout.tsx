import type { Metadata } from "next";
import { Caveat, Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://talha-portfolio.vercel.app"),
  applicationName: "Talha — Portfolio",
  title: "Talha — I build solutions for a better tomorrow",
  description:
    "Talha is a passionate developer turning ideas into real-world applications with focus on impact, usability, and innovation. Based in Taxila, Pakistan.",
  keywords: ["Talha", "developer", "portfolio", "full-stack", "Taxila"],
  authors: [{ name: "Talha" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Talha — I build solutions for a better tomorrow",
    description:
      "A passionate developer who loves turning ideas into real-world applications.",
    type: "website",
    url: "https://talha-portfolio.vercel.app",
    siteName: "Talha — Portfolio",
    locale: "en_US",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Talha — I build solutions for a better tomorrow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Talha — I build solutions for a better tomorrow",
    description:
      "A passionate developer who loves turning ideas into real-world applications.",
    images: ["/og.jpg"],
  },
};

// Structured data — only facts present on this website.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Talha",
      url: "https://talha-portfolio.vercel.app",
      sameAs: [
        "https://github.com/talha-096",
        "https://www.linkedin.com/in/talha-ghafoor-475aa926a",
      ],
    },
    {
      "@type": "WebSite",
      name: "Talha — I build solutions for a better tomorrow",
      url: "https://talha-portfolio.vercel.app",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${caveat.variable} h-full`}>
      <body className="min-h-full bg-[#05010f] text-[#f4f2ff] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
