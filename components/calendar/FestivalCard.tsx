"use client";

import React from "react";
import { Sparkles, Calendar as CalendarIcon } from "lucide-react";
import { Festival } from "@/lib/types";

interface FestivalCardProps {
  festival: Festival;
  onClick: (date: string) => void;
}

export function FestivalCard({ festival, onClick }: FestivalCardProps) {
  const festDate = new Date(festival.date || "");
  const isPast = festDate < new Date(new Date().setHours(0, 0, 0, 0));

  return (
    <button
      onClick={() => festival.date && onClick(festival.date)}
      className={`
        text-left p-4 md:p-6 rounded-[2rem] border transition-all hover:shadow-md group relative overflow-hidden bg-white
        ${isPast ? 'opacity-50 grayscale-[0.5]' : 'border-stone-100 hover:border-saffron/30 hover:bg-stone-50/50'}
      `}
    >
      <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Sparkles className="w-12 h-12" />
      </div>

      <div className="flex justify-between items-start mb-2">
        <div className="px-2 py-0.5 bg-saffron/10 rounded-full">
          <span className="text-[8px] font-bold text-saffron uppercase tracking-tight">{festival.month}</span>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-stone-900">
            {festDate.toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
          </p>
        </div>
      </div>

      <h5 className="font-serif text-sm md:text-base mb-1 group-hover:text-saffron transition-colors text-stone-800 line-clamp-1">{festival.name}</h5>
      <p className="text-[9px] text-stone-500 leading-tight line-clamp-2 italic mb-2">
        {festival.description}
      </p>

      <div className="flex items-center gap-1 text-[8px] font-bold text-stone-400 uppercase">
        <CalendarIcon className="w-2.5 h-2.5" />
        Reveal in Calendar
      </div>
    </button>
  );
}
