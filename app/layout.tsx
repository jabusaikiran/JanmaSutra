import type { Metadata } from 'next';
import './globals.css';
import { Geist, Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: 'Janma Sutra – Discover Your True Birth Tithi',
  description: 'In Sanatana Dharma, your birth is defined by cosmic time — not just a calendar date.',
};

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable, playfair.variable)}>
      <body className="font-sans antialiased bg-[#FAF8F5] text-stone-900 min-h-screen flex flex-col" suppressHydrationWarning>
        <div className="flex-1 max-w-[1024px] mx-auto w-full px-4 sm:px-8 py-8 flex flex-col h-full">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
