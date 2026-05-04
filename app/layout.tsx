import type { Metadata } from 'next';
import './globals.css';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'Janma Sutra – Discover Your True Birth Tithi',
  description: 'In Sanatana Dharma, your birth is defined by cosmic time — not just a calendar date.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="font-sans antialiased bg-[#FAF8F5] text-stone-900 min-h-screen flex flex-col" suppressHydrationWarning>
        <div className="flex-1 max-w-[1024px] mx-auto w-full px-4 sm:px-8 py-8 flex flex-col h-full">
          <header className='flex justify-between items-center mb-6 sm:mb-12'>
            <div className='flex items-center gap-2 sm:gap-3'>
              <div className='w-8 h-8 sm:w-10 sm:h-10 bg-saffron rounded-full flex items-center justify-center shrink-0'>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6 text-white opacity-90">
                  <path d="M12 12c-.5 0-.5.5-.5.5s0 .5.5.5.5 0 .5-.5-.5-1-1.5-1-1.5.5-1.5 1.5.5 2.5 2 2.5 2.5-1 2.5-2.5-1-3.5-3-3.5-3.5 1.5-3.5 3.5 1.5 4.5 4 4.5 4.5-2 4.5-4.5-2-5.5-5-5.5-5.5 2.5-5.5 5.5 2.5 6.5 6 6.5" />
                </svg>
              </div>
              <span className='text-lg sm:text-xl font-serif tracking-tight font-bold'>Janma <span className='text-saffron font-normal'>Sutra</span></span>
            </div>
            <div className='text-xs sm:text-sm uppercase tracking-widest text-stone-500 font-semibold hidden sm:block'>Birth Tithi Discovery</div>
          </header>
          {children}
          <footer className='flex justify-center border-t border-stone-200 pt-4 mt-auto'>
            <div className='text-[10px] uppercase tracking-[0.2em] text-stone-400'>Rooted in Panchang • Designed for the Modern Soul</div>
          </footer>
        </div>
      </body>
    </html>
  );
}
