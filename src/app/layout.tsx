import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SystemProvider from "@/components/provider/SystemProvider";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Leo Liao | Portfolio Website",
  description: "Leo's personal portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <body className={inter.className}>{children}</body> */}
      <body>
        <SystemProvider>{children}</SystemProvider>
      </body>
    </html>
  );
}
