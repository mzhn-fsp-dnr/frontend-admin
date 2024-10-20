import ReactQueryProvider from "@/components/providers/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const font = Inter({ subsets: ["cyrillic", "latin"] });

export const metadata: Metadata = {
  title: "Dolphin - Рабочее пространство",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${font.className} antialiased`}>
        <TooltipProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </TooltipProvider>
        <Toaster />        
      </body>
    </html>
  );
}
