import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import QueryProvider from "./query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Monie",
    template: "%s | Monie 1.0",
  },
  description:
    "Monie adalah aplikasi keuangan untuk mencatat transaksi, memantau saldo, dan memahami pola pengeluaran dengan lebih mudah.",
  verification: {
    google: "aWNC-dVpCVjb4h0JZ0MKa3Hm510TlbiuOemU5QJavo8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextTopLoader
          color="#ef4444"
          height={2}
          showSpinner={false}
          crawlSpeed={200}
        />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
