"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Info, 
  ArrowLeft, 
  Sparkles, 
  Moon, 
  Compass, 
  CloudMoon, 
  Sun,
  Book
} from "lucide-react";
import Link from "next/link";
import { CalendarDay, Festival, UserProfile } from "@/lib/types";
import { getShortTithi } from "@/lib/utils-panchang";
import { DayDetailView } from "@/components/calendar/DayDetailView";
import { FestivalCard } from "@/components/calendar/FestivalCard";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState<CalendarDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [yearlyFestivals, setYearlyFestivals] = useState<Festival[]>([]);
  const [loadingYearly, setLoadingYearly] = useState(false);
  const [pendingSelection, setPendingSelection] = useState<string | null>(null);
  
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem("vedic_profile");
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setTimeout(() => setUserProfile(parsed), 0);
      } catch (e) {
        console.error("Failed to parse profile", e);
      }
    }
    setTimeout(() => setIsLoaded(true), 0);
  }, []);

  useEffect(() => {
    const year = currentDate.getFullYear();
    async function fetchYearly() {
      setLoadingYearly(true);
      try {
        const res = await fetch(`/api/festivals-year?year=${year}`);
        setYearlyFestivals(await res.json());
      } catch (err) {
        console.error("Yearly festivals fetch error:", err);
      } finally {
        setLoadingYearly(false);
      }
    }
    fetchYearly();
  }, [currentDate]);

  useEffect(() => {
    async function fetchCalendar() {
      setLoading(true);
      try {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const res = await fetch(`/api/calendar?month=${month}&year=${year}`);
        const data = await res.json();
        setCalendarData(data.days);
        
        const targetDate = pendingSelection || new Date().toISOString().split('T')[0];
        const targetDay = data.days.find((d: CalendarDay) => d.dob === targetDate);
        if (targetDay) {
          setSelectedDay(targetDay);
          setPendingSelection(null);
        }
      } catch (err) {
        console.error("Calendar fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCalendar();
  }, [currentDate, pendingSelection]);

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const handleFestivalClick = (dateStr: string) => {
    const date = new Date(dateStr);
    setPendingSelection(dateStr);
    setCurrentDate(new Date(date.getFullYear(), date.getMonth(), 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 md:py-20 font-sans">
        <header className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl mb-4 text-stone-900">Panchang Calendar</h1>
          <p className="text-stone-600">Align your daily life with cosmic time.</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between px-4">
              <h2 className="font-serif text-2xl text-stone-800">
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex gap-2">
                <button onClick={() => navigateMonth(-1)} className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-400">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={() => navigateMonth(1)} className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-400">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="bg-white border border-stone-200 rounded-3xl p-4 md:p-8 shadow-sm">
              <div className="grid grid-cols-7 mb-4">
                {weekDays.map((d) => (
                  <div key={d} className="text-center text-[10px] font-bold text-stone-400 uppercase tracking-widest py-2">{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 md:gap-4">
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square"></div>
                ))}
                
                {loading ? (
                  Array.from({ length: 30 }).map((_, i) => (
                    <div key={`skeleton-${i}`} className="aspect-square bg-stone-50 rounded-xl animate-pulse"></div>
                  ))
                ) : (
                  calendarData.map((day) => {
                    const isToday = new Date().toDateString() === new Date(day.dob).toDateString();
                    const isPersonalBday = userProfile && userProfile.panchang?.tithi === day.tithi;
                    const isAmavasya = day.tithi.toLowerCase().includes('amavasya');
                    const isSelected = selectedDay?.dob === day.dob;
                    
                    return (
                      <button 
                        key={day.dob}
                        onClick={() => setSelectedDay(day)}
                        className={`
                          aspect-square rounded-xl p-1 md:p-2 flex flex-col items-center justify-between transition-all relative border 
                          ${isSelected ? 'border-saffron bg-saffron/5 shadow-md scale-105 z-10' : 'border-transparent hover:bg-stone-50 hover:border-stone-100'}
                          ${isToday ? ' ring-2 ring-saffron/20' : ''}
                        `}
                      >
                        <span className={`text-xs md:text-sm font-bold ${isToday ? 'text-saffron' : 'text-stone-700'}`}>{day.day}</span>
                        
                        <div className="flex gap-0.5 mt-0.5 justify-center">
                          {isPersonalBday && <div className="w-1 h-1 bg-saffron rounded-full" title="Lunar Birthday"></div>}
                          {day.festival && <div className="w-1 h-1 bg-indigo-400 rounded-full" title={day.festival.name}></div>}
                          {isAmavasya && <div className="w-1 h-1 bg-white rounded-full shadow-xs border border-stone-200" title="Amavasya"></div>}
                        </div>

                        <div className="h-3 flex items-center justify-center">
                           <span className="text-[7px] md:text-[9px] text-stone-400 truncate max-w-full font-serif font-medium">
                             {getShortTithi(day.tithi)}
                           </span>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          <aside className="space-y-8">
            <AnimatePresence mode="wait">
              {selectedDay ? (
                <motion.div key="selected-day" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <DayDetailView selectedDay={selectedDay} userProfile={userProfile} />
                </motion.div>
              ) : (
                <motion.div key="empty-day" className="bg-stone-50 rounded-3xl p-12 text-center border border-dashed border-stone-200">
                  <Info className="w-12 h-12 text-stone-200 mx-auto mb-4" />
                  <p className="text-stone-400 text-sm">Select a date to see its Vedic significance.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <section className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm">
              <h3 className="font-serif text-xl mb-6 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-saffron" />
                This Month&apos;s Festivals
              </h3>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={`fest-skeleton-${i}`} className="h-20 bg-stone-50 rounded-2xl animate-pulse"></div>
                  ))
                ) : calendarData.some(d => d.festival) ? (
                  calendarData.filter(d => d.festival).map((day) => (
                    <button 
                      key={day.festival?.name || day.dob} 
                      onClick={() => setSelectedDay(day)}
                      className="w-full text-left group p-4 bg-stone-50 hover:bg-saffron/5 rounded-2xl border border-transparent hover:border-saffron/20 transition-all font-sans"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-sm text-stone-800">{day.festival?.name}</h4>
                        <div className="text-right">
                          <span className="block text-[10px] font-bold text-saffron uppercase">{day.dayOfWeek}</span>
                          <span className="block text-[9px] text-stone-400">{new Date(day.dob).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-stone-500 leading-relaxed line-clamp-2 italic">{day.festival?.description}</p>
                    </button>
                  ))
                ) : (
                  <div className="py-8 text-center"><p className="text-stone-400 text-xs">No major festivals this month.</p></div>
                )}
              </div>
            </section>
          </aside>
        </div>
      </main>

      <section className="bg-stone-50 py-20 border-t border-stone-200 mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Yearly Festival Map</h2>
            <p className="text-stone-500 max-w-2xl mx-auto">Explore all major Vedic observances and cosmic celebrations for the year {currentDate.getFullYear()}.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {loadingYearly ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={`fest-year-skeleton-${i}`} className="h-32 bg-white rounded-3xl animate-pulse border border-stone-100"></div>
              ))
            ) : yearlyFestivals.length > 0 ? (
              yearlyFestivals.map((fest) => (
                <FestivalCard key={fest.name + (fest.date || "")} festival={fest} onClick={handleFestivalClick} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-stone-200">
                <p className="text-stone-400 text-sm">Synchronizing your festival map...</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
