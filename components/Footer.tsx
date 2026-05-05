"use client";

import React from "react";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto pt-16 pb-12 border-t border-stone-200 flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <a
          href="mailto:jabu.saikiran@gmail.com"
          className="inline-flex items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-full font-medium hover:bg-stone-800 transition-all shadow-md hover:shadow-lg active:scale-95 group"
        >
          <Mail className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          Say Hi to Developer
        </a>
        <p className="text-stone-500 text-sm md:text-base max-w-xs mx-auto leading-relaxed">
          Connect for collaboration, support, or just say hi.
        </p>
      </div>
      
      <div className="mt-8 text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold select-none text-center">
        Rooted in Panchang • Designed for the Modern Soul
      </div>
    </footer>
  );
}
