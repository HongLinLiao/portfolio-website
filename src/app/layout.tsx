import type { Metadata } from "next";
import { Mulish, Lora } from "next/font/google";
import "./globals.css";
import SystemProvider from "@/components/provider/SystemProvider";

const mulish = Mulish({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mulish",
});

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
      <body className={`${mulish.className}  font-sans`}>
        <SystemProvider>{children}</SystemProvider>
      </body>
    </html>
  );
}
