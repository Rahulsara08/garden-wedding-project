import type { Metadata } from "next";
import { Playfair_Display, Jost, Alex_Brush, Cinzel_Decorative, Cormorant_Garamond, Great_Vibes } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const alexBrush = Alex_Brush({
  variable: "--font-script",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const cinzelDeco = Cinzel_Decorative({
  variable: "--font-cinzel-deco",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mayura-wedding.vercel.app"),
  title: "Riya & Aarav | Wedding Celebration Invitation",
  description: "Together with their families, Riya & Aarav invite you to celebrate their wedding in Vrindavan on 12 February 2027.",
  openGraph: {
    title: "Riya & Aarav — Wedding Celebration",
    description: "Two souls, one journey — under the peacock sky. Shri Vrindavan Gardens, 12 February 2027.",
    images: [
      {
        url: "/assets/reference-hero.png",
        width: 1200,
        height: 630,
        alt: "Riya & Aarav Wedding Invitation",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jost.variable} ${alexBrush.variable} ${cinzelDeco.variable} ${cormorant.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-sage paper-texture selection:bg-gold/20 selection:text-forest">
        {children}
      </body>
    </html>
  );
}
