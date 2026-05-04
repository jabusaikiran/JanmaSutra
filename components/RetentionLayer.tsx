"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Share2, Download, Sparkles } from "lucide-react";
import { toPng } from "html-to-image";

interface RetentionLayerProps {
  userPanchang: {
    tithi: string;
    nakshatra: string;
    paksha: string;
  };
  name?: string;
  nextBirthday?: string | null;
}

export function RetentionLayer({ userPanchang, name, nextBirthday }: RetentionLayerProps) {
  const [todayData, setTodayData] = useState<any>(null);
  const [loadingToday, setLoadingToday] = useState(true);
  const cardRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Save to local storage
    if (typeof window !== "undefined") {
      const profile = { name, panchang: userPanchang, nextBirthday };
      localStorage.setItem("vedic_profile", JSON.stringify(profile));
    }

    // Fetch today's insight
    async function fetchToday() {
      try {
        const res = await fetch("/api/today");
        const data = await res.json();
        setTodayData(data);
      } catch (err) {
        console.error("Failed to fetch today's insight", err);
      } finally {
        setLoadingToday(false);
      }
    }
    fetchToday();
  }, [userPanchang, name, nextBirthday]);

  const handleDownloadCard = async () => {
    if (cardRef.current === null) return;
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true });
      const link = document.createElement("a");
      link.download = `vedic-identity-${name || "seeker"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to download card", err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Vedic Identity",
          text: `I am born under ${userPanchang.tithi} Tithi and ${userPanchang.nakshatra} Nakshatra. Find your real cosmic birthday!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share failed", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // Countdown for next birthday
  const [countdown, setCountdown] = useState("");
  useEffect(() => {
    if (!nextBirthday) return;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(nextBirthday).getTime();
      const distance = target - now;

      if (distance < 0) {
        setCountdown("It's your Lunar Birthday today!");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setCountdown(`${days}d ${hours}h until your real birthday`);
    }, 1000);
    return () => clearInterval(interval);
  }, [nextBirthday]);

  return (
    <div className="space-y-12 mt-16 pt-16 border-t border-stone-200">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Today's Insight Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-stone-50 rounded-3xl p-8 border border-stone-200 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sparkles className="w-12 h-12 text-saffron" />
          </div>
          <h3 className="text-xs font-bold text-saffron uppercase tracking-[0.2em] mb-4">Today&apos;s Insight</h3>
          {loadingToday ? (
            <div className="space-y-2 animate-pulse">
              <div className="h-4 bg-stone-200 rounded w-full"></div>
              <div className="h-4 bg-stone-200 rounded w-3/4"></div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-white p-2 rounded-lg border border-stone-200">
                  <p className="text-[10px] uppercase font-bold text-stone-400">Tithi</p>
                  <p className="text-sm font-serif">{todayData?.tithi}</p>
                </div>
                <div className="bg-white p-2 rounded-lg border border-stone-200">
                  <p className="text-[10px] uppercase font-bold text-stone-400">Nakshatra</p>
                  <p className="text-sm font-serif">{todayData?.nakshatra}</p>
                </div>
              </div>
              <p className="text-stone-700 leading-relaxed italic">
                &quot;{todayData?.insight}&quot;
              </p>
            </>
          )}

          {nextBirthday && (
            <div className="mt-8 pt-8 border-t border-stone-200">
              <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.15em] mb-2 text-center">Your Next Lunar Birthday</h4>
              <div className="text-center">
                <p className="text-lg font-serif text-stone-900">{countdown}</p>
                <p className="text-[10px] text-stone-500 mt-1 uppercase">{new Date(nextBirthday).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Shareable Card Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col items-center justify-center space-y-6"
        >
          <div 
            ref={cardRef}
            className="w-full aspect-[4/5] max-w-[320px] bg-[#FDFBF7] p-8 border border-stone-200 rounded-2xl shadow-xl flex flex-col items-center justify-between text-center relative"
          >
            <div className="absolute inset-4 border border-saffron/20 pointer-events-none rounded-lg"></div>
            <div className="space-y-1">
              <h4 className="text-[10px] font-bold text-saffron uppercase tracking-[0.3em]">Sanatana Identity</h4>
              <div className="w-8 h-px bg-saffron/30 mx-auto"></div>
            </div>
            
            <div className="py-6 flex flex-col items-center">
              <div className="text-4xl mb-4">🌙</div>
              <p className="text-2xl font-serif text-stone-900 mb-1">{name || "Seeker"}</p>
              <div className="text-[10px] uppercase tracking-widest text-stone-400 mb-6 font-bold">Vedic Profile</div>
              
              <div className="space-y-4 w-full">
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-[10px] uppercase font-bold text-stone-400">Tithi</span>
                  <span className="text-xs font-serif text-stone-800">{userPanchang.tithi}</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-[10px] uppercase font-bold text-stone-400">Nakshatra</span>
                  <span className="text-xs font-serif text-stone-800">{userPanchang.nakshatra}</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-[10px] uppercase font-bold text-stone-400">Paksha</span>
                  <span className="text-xs font-serif text-stone-800">{userPanchang.paksha}</span>
                </div>
              </div>
            </div>

            <div className="text-[8px] text-stone-400 uppercase tracking-widest">
              Generated by Vedic Time
            </div>
          </div>

          <div className="flex gap-3 w-full max-w-[320px]">
            <button 
              onClick={handleDownloadCard}
              className="flex-1 flex items-center justify-center gap-2 bg-white border border-stone-200 p-3 rounded-xl hover:bg-stone-50 transition-colors text-xs font-bold uppercase tracking-wider text-stone-700"
            >
              <Download className="w-4 h-4" /> Download
            </button>
            <button 
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-2 bg-saffron text-white p-3 rounded-xl hover:opacity-90 transition-opacity text-xs font-bold uppercase tracking-wider"
            >
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
