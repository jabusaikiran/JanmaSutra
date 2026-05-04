"use client";

import React from "react";
import { motion } from "motion/react";
import { Heart, Trash2 } from "lucide-react";
import { FamilyMember } from "@/lib/types";
import { getShortTithi } from "@/lib/utils-panchang";

interface FamilyMemberCardProps {
  member: FamilyMember;
  onRemove: (id: string) => void;
}

export function FamilyMemberCard({ member, onRemove }: FamilyMemberCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-stone-50 border border-stone-200 rounded-xl md:rounded-2xl p-4 md:p-6 relative group"
    >
      <button 
        onClick={() => onRemove(member.id)}
        className="absolute top-3 right-3 text-stone-300 hover:text-red-500 transition-colors opacity-0 md:group-hover:opacity-100"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full border border-stone-100 flex items-center justify-center shadow-xs shrink-0">
          <Heart className="w-5 h-5 md:w-6 md:h-6 text-saffron/30" />
        </div>
        <div className="min-w-0">
          <h4 className="font-serif text-base md:text-lg leading-tight truncate">{member.name}</h4>
          <p className="text-[9px] md:text-[10px] font-bold text-saffron uppercase tracking-widest mb-2">{member.relation}</p>
          
          <div className="flex gap-4 md:gap-8">
            <div>
              <p className="text-[8px] text-stone-400 uppercase font-black tracking-tight">Tithi</p>
              <p className="text-xs text-stone-700 font-serif">{getShortTithi(member.panchang.tithi)}</p>
            </div>
            <div>
              <p className="text-[8px] text-stone-400 uppercase font-black tracking-tight">Nakshatra</p>
              <p className="text-xs text-stone-700 font-serif">{getShortTithi(member.panchang.nakshatra)}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
