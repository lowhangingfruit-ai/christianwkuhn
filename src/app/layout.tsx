import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Christian W. Kuhn",
  description:
    "Retail Banker at Bank of Marin. Founder of The Ferment Guide & Noble House Spice. Community advocate in San Rafael, CA.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌊</text></svg>",
  },
  openGraph: {
    title: "Christian W. Kuhn",
    description:
      "Retail Banker at Bank of Marin. Founder of The Ferment Guide & Noble House Spice. Community advocate in San Rafael, CA.",
    url: "https://christianwkuhn.com",
    siteName: "Christian W. Kuhn",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 900,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
