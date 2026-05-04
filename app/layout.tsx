import type { Metadata } from 'next';
import './globals.css';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'Janma Sutra – Discover Your True Birth Tithi',
  description: 'In Sanatana Dharma, your birth is defined by cosmic time — not just a calendar date.',
};

import { Header } from '@/components/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="font-sans antialiased bg-[#FAF8F5] text-stone-900 min-h-screen flex flex-col" suppressHydrationWarning>
        <div className="flex-1 max-w-[1024px] mx-auto w-full px-4 sm:px-8 py-8 flex flex-col h-full">
          <Header />
          {children}
          <footer className='flex justify-center border-t border-stone-200 pt-4 mt-auto'>
            <div className='text-[10px] uppercase tracking-[0.2em] text-stone-400'>Rooted in Panchang • Designed for the Modern Soul</div>
          </footer>
        </div>
      </body>
    </html>
  );
}
