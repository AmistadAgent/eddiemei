import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import { HERO_IMAGE_URL } from "@/data/site";
import "./globals.css";
import { MemorialProviders } from "@/components/MemorialProviders";
import { SiteControls } from "@/components/SiteControls";

const display = Cormorant_Garamond({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const ui = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-ui",
});

const siteUrl = "https://eddiemei.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Eddie Mei — A life remembered",
  description:
    "A quiet video gallery: choose a memory topic, watch, and listen.",
  openGraph: {
    title: "Eddie Mei",
    description: "A life remembered through moments",
    type: "website",
    url: siteUrl,
    images: [
      { url: HERO_IMAGE_URL, width: 1200, height: 630, alt: "Eddie Mei" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${display.variable} ${ui.variable} scroll-smooth`}
      lang="en"
    >
      <body
        className="min-h-dvh font-sans antialiased selection:bg-amber-200/80 selection:text-[#1a1a1a]"
        suppressHydrationWarning
      >
        <MemorialProviders>
          <div className="flex min-h-dvh w-full flex-col">
            <div
              className="sticky top-0 z-40 w-full border-b border-[#dcd4c6]/80 bg-[--bg]/90 px-4 py-3 backdrop-blur-sm sm:px-8 sm:py-4"
            >
              <div className="mx-auto flex w-full max-w-5xl items-center justify-end">
                <SiteControls />
              </div>
            </div>
            <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-0 sm:px-0">
              {children}
            </div>
          </div>
        </MemorialProviders>
      </body>
    </html>
  );
}
