import localFont from "next/font/local";
import "./globals.css";
import SystemProvider from "@/components/provider/SystemProvider";
import { Metadata } from "next";

const mulish = localFont({
  src: "../../public/fonts/Mulish/regular.ttf",
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
    <html lang="en" suppressHydrationWarning className={`${mulish.variable}`}>
      <body className="font-main">
        <SystemProvider>{children}</SystemProvider>
      </body>
    </html>
  );
}
