"use client";

import React from "react";
import { Book, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export default function StoryPage() {
  return (
    <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 md:py-20 font-sans">
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
           <Link href="/" className="inline-flex items-center gap-2 text-stone-400 hover:text-saffron transition-colors text-sm font-bold uppercase tracking-widest">
             <ArrowLeft className="w-4 h-4" />
             Back to Home
           </Link>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl mb-4 text-stone-900">Our Story</h1>
        <p className="text-stone-600">The journey of Janma Sutra.</p>
      </div>

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[3rem] p-8 md:p-16 border border-stone-200 shadow-sm text-center"
      >
        <div className="w-20 h-20 bg-saffron/10 rounded-full flex items-center justify-center mx-auto mb-8">
           <Book className="w-8 h-8 text-saffron" />
        </div>
        <h2 className="font-serif text-2xl mb-6">Coming Soon</h2>
        <p className="text-stone-500 max-w-md mx-auto leading-relaxed">
          We are currently crafting the narrative of Janma Sutra. Stay tuned as we share the vision and inspiration behind this cosmic journey.
        </p>
      </motion.section>
    </main>
  );
}
