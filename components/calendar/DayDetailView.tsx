"use client";

import React from "react";
import { Sparkles, Calendar as CalendarIcon } from "lucide-react";
import { CalendarDay, UserProfile } from "@/lib/types";
import { getShortTithi } from "@/lib/utils-panchang";

interface DayDetailViewProps {
  selectedDay: CalendarDay;
  userProfile: UserProfile | null;
}

export function DayDetailView({ selectedDay, userProfile }: DayDetailViewProps) {
  const isToday = new Date(selectedDay.dob).toDateString() === new Date().toDateString();
  const isPersonalBday = userProfile && userProfile.panchang?.tithi === selectedDay.tithi;

  return (
    <div className="bg-stone-900 text-stone-100 rounded-3xl p-8 border border-stone-800 shadow-xl">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-[9px] font-bold text-saffron uppercase tracking-[0.2em] mb-1">
            {isToday ? "Today" : "Observation"}
          </p>
          <h4 className="font-serif text-lg">
            {selectedDay.dayOfWeek}, {new Date(selectedDay.dob).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
          </h4>
        </div>
        <CalendarIcon className="w-5 h-5 text-saffron/40" />
      </div>

      <div className="space-y-4">
        {selectedDay.festival && (
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <p className="text-[9px] font-bold uppercase tracking-wider text-indigo-300">Festival</p>
            </div>
            <p className="text-base font-serif text-white mb-0.5">{selectedDay.festival.name}</p>
            <p className="text-[10px] text-white/50 leading-snug line-clamp-2 italic">{selectedDay.festival.description}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <p className="text-[9px] uppercase text-white/30 font-bold mb-0.5">Tithi</p>
            <p className="text-xs font-serif">{getShortTithi(selectedDay.tithi)}</p>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <p className="text-[9px] uppercase text-white/30 font-bold mb-0.5">Nakshatra</p>
            <p className="text-xs font-serif">{getShortTithi(selectedDay.nakshatra)}</p>
          </div>
        </div>

        <div className="flex items-center justify-between bg-white/5 px-4 py-3 rounded-2xl border border-white/10">
          <p className="text-[10px] uppercase text-white/30 font-bold">Paksha</p>
          <p className="text-xs font-serif text-saffron">{selectedDay.paksha}</p>
        </div>

        {isPersonalBday && (
          <div className="bg-saffron/10 p-3 rounded-2xl border border-saffron/20 flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-saffron" />
            <p className="text-[10px] font-bold uppercase tracking-wider text-saffron">Lunar Birthday</p>
          </div>
        )}
      </div>
    </div>
  );
}
