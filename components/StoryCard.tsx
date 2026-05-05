"use client";

import { useRef, useState } from "react";
import { Download, Share2, Type, PaintBucket } from "lucide-react";
import { toPng } from "html-to-image";
import { format } from "date-fns";
import { GiFeather, GiTrident, GiBowArrow, GiFlangedMace, GiLotusFlower, GiElephantHead, GiChakram, GiSun, GiCoins, GiLyre, GiCrossedSwords, GiThirdEye, GiSunSpear, GiLightningTrio, GiBookAura, GiMountains, GiLion, GiFlowerStar } from "react-icons/gi";

interface StoryCardProps {
  name: string;
  tithi: string;
  nakshatra: string;
  paksha: string;
  insight: string;
  archetype: string;
  nextBirthdayDate: string | null;
  targetYear: number;
  zodiacSign?: { name: string; icon: string } | null;
}

type ThemeType = "classic" | "krishna" | "shiva" | "ram" | "hanuman" | "devi" | "ganesha" | "vishnu" | "surya" | "lakshmi" | "durga" | "saraswati" | "brahma" | "kali" | "kartikeya" | "indra" | "parvati" | "narasimha" | "sundari";

const THEMES: Record<ThemeType, {
  id: ThemeType,
  name: string,
  bg: string,
  text: string,
  muted: string,
  accent: string,
  cardBg: string,
  art: React.ReactNode
}> = {
  classic: {
    id: "classic",
    name: "Vedic Classic",
    bg: "bg-gradient-to-b from-[#F9F7F2] to-[#EAE4D3]",
    text: "text-stone-800",
    muted: "text-[#6b625a]",
    accent: "text-[#B89F70]",
    cardBg: "bg-[#B89F70]/10 border-[#B89F70]/20",
    art: null
  },
  krishna: {
    id: "krishna",
    name: "Krishna Blue",
    bg: "bg-gradient-to-b from-[#0F172A] to-[#1E3A8A]",
    text: "text-white",
    muted: "text-blue-200",
    accent: "text-yellow-400",
    cardBg: "bg-blue-900/40 border-blue-400/30",
    art: <GiFeather className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] opacity-[0.08] text-white -rotate-12 pointer-events-none" />
  },
  shiva: {
    id: "shiva",
    name: "Shiva Slate",
    bg: "bg-gradient-to-b from-[#1C1917] to-[#44403C]",
    text: "text-white",
    muted: "text-stone-300",
    accent: "text-orange-400",
    cardBg: "bg-stone-800/50 border-stone-500/30",
    art: <GiTrident className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] opacity-[0.08] text-white pointer-events-none" />
  },
  ram: {
    id: "ram",
    name: "Ram Saffron",
    bg: "bg-gradient-to-b from-[#EA580C] to-[#991B1B]",
    text: "text-white",
    muted: "text-orange-200",
    accent: "text-yellow-300",
    cardBg: "bg-black/10 border-white/20",
    art: <GiBowArrow className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] opacity-[0.08] text-white -rotate-45 pointer-events-none" />
  },
  hanuman: {
    id: "hanuman",
    name: "Sindoor Red",
    bg: "bg-gradient-to-b from-[#DC2626] to-[#7F1D1D]",
    text: "text-white",
    muted: "text-red-200",
    accent: "text-yellow-400",
    cardBg: "bg-black/10 border-white/20",
    art: <GiFlangedMace className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-[0.08] text-white pointer-events-none" />
  },
  devi: {
    id: "devi",
    name: "Devi Lotus",
    bg: "bg-gradient-to-b from-[#BE185D] to-[#831843]",
    text: "text-white",
    muted: "text-pink-200",
    accent: "text-pink-300",
    cardBg: "bg-black/10 border-white/20",
    art: <GiLotusFlower className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] opacity-[0.08] text-white pointer-events-none" />
  },
  ganesha: {
    id: "ganesha",
    name: "Ganesha Gold",
    bg: "bg-gradient-to-b from-[#F59E0B] to-[#B45309]",
    text: "text-white",
    muted: "text-orange-100",
    accent: "text-yellow-100",
    cardBg: "bg-black/10 border-white/20",
    art: <GiElephantHead className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] opacity-[0.08] text-white pointer-events-none" />
  },
  vishnu: {
    id: "vishnu",
    name: "Vishnu Azure",
    bg: "bg-gradient-to-b from-[#0284C7] to-[#1E3A8A]",
    text: "text-white",
    muted: "text-sky-200",
    accent: "text-yellow-300",
    cardBg: "bg-black/10 border-white/20",
    art: <GiChakram className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-[0.08] text-white pointer-events-none" />
  },
  surya: {
    id: "surya",
    name: "Surya Amber",
    bg: "bg-gradient-to-b from-[#FCD34D] to-[#EA580C]",
    text: "text-[#431407]",
    muted: "text-orange-900/70",
    accent: "text-orange-950",
    cardBg: "bg-white/20 border-white/40",
    art: <GiSun className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] opacity-[0.10] text-orange-900 pointer-events-none" />
  },
  lakshmi: {
    id: "lakshmi",
    name: "Lakshmi Rose",
    bg: "bg-gradient-to-b from-[#F9A8D4] to-[#BE185D]",
    text: "text-white",
    muted: "text-pink-100",
    accent: "text-yellow-300",
    cardBg: "bg-black/10 border-white/20",
    art: <GiCoins className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] opacity-[0.08] text-white pointer-events-none" />
  },
  durga: {
    id: "durga",
    name: "Durga Crimson",
    bg: "bg-gradient-to-b from-[#E11D48] to-[#881337]",
    text: "text-white",
    muted: "text-red-200",
    accent: "text-yellow-400",
    cardBg: "bg-black/10 border-white/20",
    art: <GiCrossedSwords className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] opacity-[0.08] text-white pointer-events-none" />
  },
  saraswati: {
    id: "saraswati",
    name: "Saraswati Pearl",
    bg: "bg-gradient-to-b from-[#F0F9FF] to-[#BAE6FD]",
    text: "text-[#0369A1]",
    muted: "text-[#0284C7]/70",
    accent: "text-[#075985]",
    cardBg: "bg-white/40 border-white/60",
    art: <GiLyre className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] opacity-[0.08] text-[#0369A1] pointer-events-none" />
  },
  brahma: {
    id: "brahma",
    name: "Brahma Ruby",
    bg: "bg-gradient-to-b from-[#FDA4AF] to-[#9F1239]",
    text: "text-white",
    muted: "text-rose-100",
    accent: "text-yellow-200",
    cardBg: "bg-black/10 border-white/20",
    art: <GiBookAura className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] opacity-[0.08] text-white pointer-events-none" />
  },
  kali: {
    id: "kali",
    name: "Kali Midnight",
    bg: "bg-gradient-to-b from-[#09090B] to-[#4C0519]",
    text: "text-white",
    muted: "text-rose-300",
    accent: "text-red-500",
    cardBg: "bg-white/5 border-white/10",
    art: <GiThirdEye className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] opacity-[0.10] text-red-500 pointer-events-none" />
  },
  kartikeya: {
    id: "kartikeya",
    name: "Kartikeya Flame",
    bg: "bg-gradient-to-b from-[#FB923C] to-[#C2410C]",
    text: "text-white",
    muted: "text-orange-100",
    accent: "text-yellow-300",
    cardBg: "bg-black/10 border-white/20",
    art: <GiSunSpear className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] opacity-[0.08] text-white pointer-events-none" />
  },
  indra: {
    id: "indra",
    name: "Indra Storm",
    bg: "bg-gradient-to-b from-[#38BDF8] to-[#0369A1]",
    text: "text-white",
    muted: "text-sky-100",
    accent: "text-yellow-300",
    cardBg: "bg-black/10 border-white/20",
    art: <GiLightningTrio className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] opacity-[0.08] text-white pointer-events-none" />
  },
  parvati: {
    id: "parvati",
    name: "Parvati Peak",
    bg: "bg-gradient-to-b from-[#A7F3D0] to-[#059669]",
    text: "text-white",
    muted: "text-emerald-100",
    accent: "text-yellow-300",
    cardBg: "bg-black/10 border-white/20",
    art: <GiMountains className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] opacity-[0.08] text-white pointer-events-none" />
  },
  narasimha: {
    id: "narasimha",
    name: "Narasimha Gold",
    bg: "bg-gradient-to-b from-[#FDE047] to-[#B45309]",
    text: "text-yellow-950",
    muted: "text-yellow-900",
    accent: "text-red-700",
    cardBg: "bg-white/30 border-white/40",
    art: <GiLion className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-[0.10] text-orange-900 pointer-events-none" />
  },
  sundari: {
    id: "sundari",
    name: "Tripura Blossom",
    bg: "bg-gradient-to-b from-[#FBCFE8] to-[#C026D3]",
    text: "text-white",
    muted: "text-fuchsia-100",
    accent: "text-yellow-300",
    cardBg: "bg-black/10 border-white/20",
    art: <GiFlowerStar className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] opacity-[0.08] text-white pointer-events-none" />
  }
};

export function StoryCard({ name, tithi, nakshatra, paksha, insight, archetype, nextBirthdayDate, targetYear, zodiacSign }: StoryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [themeId, setThemeId] = useState<ThemeType>("classic");

  const theme = THEMES[themeId];

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      setIsDownloading(true);
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.download = `my-tithi-${name || 'birth'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to download image", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 mt-4 w-full max-w-[300px] sm:max-w-[310px] mx-auto px-4 sm:px-0">
      <div className="text-center">
        <h3 className="font-serif text-lg sm:text-xl font-medium text-stone-900 mb-0.5">Share Your Story</h3>
        <p className="text-[10px] sm:text-xs text-stone-600 flex items-center justify-center gap-1">
          <PaintBucket className="w-3 h-3" /> Customize design
        </p>
      </div>

      <div className="relative w-full group">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10 pointer-events-none"></div>
        <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-1 w-full pb-2 px-2 snap-x select-none">
          {Object.values(THEMES).map((t) => (
            <button
              key={t.id}
              onClick={() => setThemeId(t.id as ThemeType)}
              className={`whitespace-nowrap flex-shrink-0 snap-start px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-all ${
                themeId === t.id 
                  ? 'bg-stone-800 text-white shadow-sm scale-105' 
                  : 'bg-white text-stone-800 border border-stone-100 hover:bg-stone-50'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* The Story Canvas */}
      <div 
        ref={cardRef}
        className={`relative w-full aspect-[9/16] rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-lg border border-white/5 flex flex-col items-center justify-start p-4 sm:p-5 text-center shrink-0 ${theme.bg}`}
      >
        {/* Abstract/God Line Art */}
        {theme.art}
        
        {/* Generic Background Elements */}
        {themeId === "classic" && (
          <>
            <div className="absolute top-0 right-0 w-64 h-64 bg-saffron/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-stone-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3"></div>
          </>
        )}
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center h-full justify-between py-1 sm:py-3 w-full min-h-max gap-1 sm:gap-2">
          
          <div className="space-y-1 sm:space-y-2 flex flex-col items-center">
            <span className={`uppercase tracking-widest text-[7px] sm:text-[10px] font-bold ${theme.accent}`}>Janma Sutra</span>
            
            <div className="flex flex-col items-center">
              {zodiacSign && (
                <div 
                  className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-2xl shadow-sm border border-white/5 backdrop-blur-md mb-0.5 sm:mb-2 ${
                    themeId === 'classic' 
                      ? 'bg-white border-stone-200/20 text-stone-900' 
                      : 'bg-black/20 border-white/5 text-white'
                  }`}
                  title={zodiacSign.name}
                >
                  {zodiacSign.icon}
                </div>
              )}
              <h2 className={`font-serif text-base sm:text-2xl font-medium tracking-tight ${theme.text}`}>
                {name ? `${name}'s` : 'My'} True Birthday
              </h2>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1 sm:gap-3 w-full flex-1 justify-center">
            <div className={`p-4 sm:p-5 rounded-[1.5rem] sm:rounded-[2rem] border inline-flex items-center justify-center min-w-[110px] min-h-[110px] sm:min-w-[160px] sm:min-h-[160px] shadow-sm backdrop-blur-sm transition-all ${theme.cardBg}`}>
              <div className="flex flex-col items-center justify-center text-center">
                <span className={`text-[7px] sm:text-xs uppercase tracking-widest mb-0.5 sm:mb-1.5 font-medium ${theme.muted}`}>Tithi</span>
                <span className={`font-serif text-lg sm:text-3xl font-semibold capitalize leading-none ${theme.text}`}>{tithi.split(" ").slice(1).join(" ")}</span>
                <span className={`text-[7px] sm:text-xs uppercase tracking-wider mt-0.5 sm:mt-1.5 font-medium ${theme.accent}`}>{paksha}</span>
              </div>
            </div>
            
            <div className="space-y-0 sm:space-y-1 w-full">
              <span className={`text-[7px] sm:text-xs uppercase tracking-widest font-medium ${theme.muted}`}>Archetype</span>
              <div className={`font-serif text-sm sm:text-xl font-medium leading-tight px-2 ${theme.text}`}>
                {archetype}
              </div>
            </div>
          </div>

          <div className="space-y-1.5 sm:space-y-2.5 w-full shrink-0">
            {nextBirthdayDate && (
              <div className={`mx-auto w-[90%] sm:w-fit backdrop-blur-sm px-3 py-1.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl border border-white/5 shadow-sm flex flex-col items-center gap-0 sm:gap-0.5 ${themeId === 'classic' ? 'bg-white/80 border-stone-200/20' : 'bg-black/20 border-white/5'}`}>
                <span className={`text-[0.5rem] sm:text-[0.6rem] uppercase tracking-widest font-bold text-center ${themeId === 'classic' ? 'text-[#B89F70]' : theme.accent}`}>
                  Your {targetYear} Tithi Birthday
                </span>
                <span className={`font-serif text-sm sm:text-xl font-semibold mt-0.5 mb-0.5 ${theme.text}`}>
                  {format(new Date(nextBirthdayDate), "MMMM do")}
                </span>
                <span className={`text-[0.4rem] sm:text-[0.5rem] uppercase tracking-wider text-center opacity-90 leading-tight ${theme.text}`}>
                  As per Sanatana Dharma Calendar
                </span>
              </div>
            )}
             <div className={`h-px w-6 sm:w-10 mx-auto mt-1 sm:mt-3 ${themeId === 'classic' ? 'bg-stone-200' : 'bg-white/20'}`}></div>
             <p className={`text-[8px] sm:text-[10px] max-w-[180px] leading-relaxed mx-auto italic mt-1 sm:mt-2 ${theme.muted}`}>
               &quot;Born under the light of {nakshatra}&quot;
             </p>
             <div className={`mt-1 sm:mt-3 pt-1 sm:pt-2 text-[0.4rem] sm:text-[0.55rem] uppercase tracking-[0.15em] opacity-70 ${theme.text}`}>
               Check your actual birthday at Janma Sutra
             </div>
          </div>

        </div>
      </div>

      {/* Actions */}
      <div className="w-full flex flex-col items-center gap-3 mt-3 sm:mt-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 w-full">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full flex items-center justify-center gap-2 bg-white border border-stone-200 text-stone-900 px-3 py-1.5 sm:py-1.5 rounded-full font-medium hover:bg-stone-50 transition-all shadow-sm disabled:opacity-70"
          >
            {isDownloading ? (
              <span className="animate-pulse text-xs sm:text-xs">Preparing...</span>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 sm:w-3.5 sm:h-3.5" />
                <span className="text-xs sm:text-xs">Download</span>
              </>
            )}
          </button>
          
          <button
            onClick={async () => {
              try {
                if (navigator.share) {
                  await navigator.share({
                    title: 'My Cosmic Blueprint',
                    text: 'Discover your true Vedic birthday and cosmic identity.',
                    url: window.location.href,
                  });
                } else {
                  await navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              } catch (err) {
                console.error('Error sharing:', err);
              }
            }}
            className="w-full flex items-center justify-center gap-2 bg-saffron text-white px-3 py-1.5 sm:py-1.5 rounded-full font-medium hover:bg-saffron/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <Share2 className="w-3.5 h-3.5 sm:w-3.5 sm:h-3.5" />
            <span className="text-xs sm:text-xs">Share with Friends</span>
          </button>
        </div>
        
        <p className="text-[10px] sm:text-[11px] text-earth-mid text-center px-4 leading-relaxed mt-0.5 sm:mt-1">
          Spread the cosmic wisdom. Download your blueprint as an image or share the link with others.
        </p>
      </div>
    </div>
  );
}
