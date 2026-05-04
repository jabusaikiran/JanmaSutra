"use client";

import { useState, useEffect } from "react";
import { generateIdentityInsight } from "@/lib/gemini";
import { StoryCard } from "@/components/StoryCard";
import { TITHI_MEANINGS } from "@/lib/astro-insights";

interface Panchang {
  tithi: string;
  nakshatra: string;
  paksha: string;
}

export function IdentitySection({ panchang, name, targetYear, nextBirthdayDate, zodiacSign }: { panchang: Panchang, name: string, targetYear: number, nextBirthdayDate: string | null, zodiacSign?: { name: string, icon: string } | null }) {
  const [identity, setIdentity] = useState<{ insight: string, archetype: string, coreTrait: string, behavior: string, strength: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIdentity() {
      setLoading(true);
      try {
        const result = await generateIdentityInsight(panchang.tithi, panchang.nakshatra, panchang.paksha);
        setIdentity(result);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchIdentity();
  }, [panchang.tithi, panchang.nakshatra, panchang.paksha]);

  if (loading || !identity) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <p className="text-stone-500 animate-pulse">Reading the cosmic blueprint...</p>
      </div>
    );
  }

  const tithiName = panchang.tithi.split(" ")[1] || panchang.tithi;
  const tithiMeaning = TITHI_MEANINGS[tithiName];

  return (
    <>
      <div className="bg-gradient-to-br from-[#FFF9F0] to-[#FDFBF7] border-2 border-amber-200/60 rounded-2xl p-8 lg:p-12 mb-16 relative overflow-hidden shadow-[0_4px_20px_rgba(217,119,6,0.03)] animate-in fade-in zoom-in-95 duration-500 delay-150 fill-mode-both">
        <div className="absolute -top-5 -right-5 w-20 h-20 border border-amber-200/50 rounded-full"></div>
        
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <h2 className="text-sm font-bold tracking-[0.2em] text-saffron uppercase mb-6">Your Essence</h2>
          <div className="mb-10 text-stone-800">
            <h3 className="font-serif text-4xl md:text-5xl font-medium mb-3">The {identity.archetype}</h3>
            <p className="text-lg md:text-xl font-serif italic text-stone-600">{identity.coreTrait}.</p>
          </div>
          
          <p className="text-base md:text-lg text-stone-800 leading-relaxed mb-8">
            {identity.insight}
          </p>

          <div className="bg-white p-6 rounded-xl flex flex-col md:flex-row border border-amber-100 justify-center gap-6 md:gap-12 text-left md:text-center items-start md:items-center mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-1">Natural Behavior</p>
              <p className="text-stone-800 font-medium capitalize">{identity.behavior}</p>
            </div>
            <div className="hidden md:block w-px h-12 bg-orange-200"></div>
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-1">Inherent Strength</p>
              <p className="text-stone-800 font-medium capitalize">{identity.strength}</p>
            </div>
          </div>

          {tithiMeaning && (
            <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-4 md:p-5 text-left mb-2">
              <h4 className="flex items-center gap-2 text-orange-800 font-bold text-xs md:text-sm uppercase tracking-widest mb-2">
                <span className="text-lg">🌙</span> Power of {tithiName}
              </h4>
              <p className="text-stone-700 text-xs md:text-sm leading-relaxed">
                {tithiMeaning}
              </p>
            </div>
          )}
        </div>
      </div>

      <StoryCard 
        name={name} 
        tithi={panchang.tithi} 
        nakshatra={panchang.nakshatra} 
        paksha={panchang.paksha} 
        insight={identity.insight} 
        archetype={identity.archetype} 
        nextBirthdayDate={nextBirthdayDate}
        targetYear={targetYear}
        zodiacSign={zodiacSign}
      />
    </>
  );
}
