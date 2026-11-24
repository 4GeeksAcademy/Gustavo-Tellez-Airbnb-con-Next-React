"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { SearchProvider, useSearch } from "@/components/shared/SearchContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <body suppressHydrationWarning className="min-h-full bg-white text-gray-900">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="flex-1">{children}</main>
    </body>
  );
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <SearchProvider>
        <LayoutContent>{children}</LayoutContent>
      </SearchProvider>
    </html>
  );
}

export default RootLayout;
