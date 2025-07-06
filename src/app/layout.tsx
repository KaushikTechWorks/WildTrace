import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WildTrace - Endangered Species Conservation Tracker",
  description: "Track endangered species and conservation efforts using public biodiversity datasets. Interactive maps and actionable insights for conservationists, researchers, and the public.",
  keywords: ["conservation", "endangered species", "biodiversity", "wildlife", "tracking", "maps"],
  authors: [{ name: "WildTrace Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background text-foreground">
          {children}
        </div>
      </body>
    </html>
  );
}
