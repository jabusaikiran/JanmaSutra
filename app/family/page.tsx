"use client";

import React from "react";
import { motion } from "motion/react";
import { Users, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function FamilyPage() {
  return (
    <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-12 md:py-24">
      <div className="text-center mb-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors text-[10px] font-bold uppercase tracking-widest mb-8"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to Home
        </Link>
        <h1 className="font-serif text-4xl md:text-6xl text-stone-900 mb-4">Family Layer</h1>
        <p className="text-stone-500 max-w-md mx-auto">Connecting the cosmic threads of your lineage.</p>
      </div>

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-stone-200 rounded-[3rem] p-12 md:p-24 text-center shadow-sm relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-saffron/20" />
        
        <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-stone-100">
           <Users className="w-8 h-8 text-stone-200" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 bg-saffron/10 text-saffron rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
          <Sparkles className="w-3 h-3" />
          Coming Soon
        </div>

        <h2 className="font-serif text-2xl md:text-3xl text-stone-900 mb-6">
          Mapping your heritage <br className="hidden md:block" /> through the stars.
        </h2>
        
        <p className="text-stone-500 max-w-sm mx-auto leading-relaxed text-sm">
          We are currently building the Family Layer — a space where you can map your ancestry, explore Nakshatra patterns across generations, and understand the deep cultural roots that define your family identity.
        </p>

        <div className="mt-12 pt-12 border-t border-stone-100 flex flex-col items-center gap-4">
          <p className="text-[10px] font-bold text-stone-300 uppercase tracking-[0.2em]">The JanmaSutra Vision</p>
          <div className="w-1 h-8 bg-stone-100" />
        </div>
      </motion.section>

      <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-stone-50/50 rounded-3xl border border-stone-100">
           <h3 className="font-serif text-lg text-stone-900 mb-2">Lineage Patterns</h3>
           <p className="text-stone-500 text-xs leading-relaxed">Discover recurring Tithis and Nakshatras within your family tree and see how cosmic attributes flow through bloodlines.</p>
        </div>
        <div className="p-8 bg-stone-50/50 rounded-3xl border border-stone-100">
           <h3 className="font-serif text-lg text-stone-900 mb-2">Cultural Calendar</h3>
           <p className="text-stone-500 text-xs leading-relaxed">Integrated family reminders for traditional dates, custom Panchang views, and shared identity moments.</p>
        </div>
      </section>
    </main>
  );
}

