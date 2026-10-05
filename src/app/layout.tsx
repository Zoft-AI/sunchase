import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { CondoProvider } from "@/components/condo-context";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sunchase Beachfront Condos | South Padre Island",
  description:
    "Breezy beachfront condos at the heart of South Padre Island. Stay in two, three, and four-bedroom homes with gulf views, a pool, and every comfort for a longer getaway.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-foam text-ink">
        <CondoProvider>{children}</CondoProvider>
      </body>
    </html>
  );
}
