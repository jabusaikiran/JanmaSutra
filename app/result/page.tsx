import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, Info, HelpCircle } from "lucide-react";
import { calculatePanchang, findNextBirthday } from "@/lib/astro-server";
import { getZodiacSign } from "@/lib/astro-shared";
import { NextBirthdaySelector } from "@/components/NextBirthdaySelector";
import { IdentitySection } from "@/components/IdentitySection";
import { NAKSHATRA_TRAITS } from "@/lib/astro-insights";
import { RetentionLayer } from "@/components/RetentionLayer";

export default async function ResultPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const dob = params.dob as string;
  const tob = params.tob as string;
  const place = params.place as string;
  const tzOffset = params.tzOffset as string;
  const name = params.name as string || "";
  const targetYearParam = params.targetYear as string;

  if (!dob || !place) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center h-screen">
        <p className="text-earth-mid mb-4">Please provide your birth details to continue.</p>
        <Link href="/" className="text-saffron hover:underline font-medium flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Go Back
        </Link>
      </div>
    );
  }

  const panchang = calculatePanchang(dob, tob, tzOffset);
  const zodiacSign = getZodiacSign(dob);
  
  const getTithiIcon = (tithi: string) => {
    const t = tithi.toLowerCase();
    if (t.includes('amavasya')) return "🌑";
    if (t.includes('purnima')) return "🌕";
    if (t.includes('shukla')) return "🌓";
    return "🌗";
  };

  const targetYear = targetYearParam ? parseInt(targetYearParam, 10) : new Date().getFullYear();
  const nextBirthdayDate = findNextBirthday(panchang._internal.sunRasi, panchang._internal.tithiIndex, targetYear, tzOffset);

  const nakshatraMeaning = NAKSHATRA_TRAITS[panchang.nakshatra];

  return (
    <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 md:py-20 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
      <div className="text-center mb-10 md:mb-16 space-y-2 md:space-y-4">
        <h2 className="text-[10px] md:text-sm font-bold tracking-[0.2em] text-saffron uppercase">Your Cosmic Alignment</h2>
        <div className="font-serif text-2xl md:text-3xl text-stone-700 max-w-xl mx-auto px-4 relative inline-flex items-center justify-center gap-2 group">
          <span>Born at a precise moment in the celestial rhythm.</span>
          <details className="inline-block relative cursor-pointer font-sans [&>summary::-webkit-details-marker]:hidden">
            <summary className="list-none focus:outline-none">
              <HelpCircle className="w-5 h-5 text-stone-400 hover:text-saffron transition-colors" />
            </summary>
            {/* Tooltip Dropdown */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 md:w-80 bg-white border border-stone-200 rounded-xl shadow-xl p-4 text-left z-50 animate-in fade-in zoom-in-95 duration-200">
              <h4 className="text-xs font-bold text-saffron uppercase tracking-widest mb-2 border-b border-stone-100 pb-2">The Panchang System</h4>
              <p className="text-sm text-stone-600 leading-relaxed font-sans">
                Unlike the solar Gregorian calendar which tracks the sun, the Hindu Panchang tracks the intricate dance between the Sun and Moon. Your Tithi (lunar phase) and Nakshatra (lunar mansion) reveal deeper patterns about your true nature and life path.
              </p>
            </div>
          </details>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-10 md:mb-12">
        {zodiacSign && (
          <div className="bg-amber-50 p-3 md:p-6 rounded-xl md:rounded-2xl text-center border border-amber-200 shadow-[0_4px_20px_rgba(217,119,6,0.05)] flex flex-col items-center justify-center">
            <div className="text-2xl md:text-4xl mb-1 md:mb-3">{zodiacSign.icon}</div>
            <h4 className="font-serif text-[15px] md:text-2xl text-amber-950 mb-0.5 md:mb-1 leading-tight">{zodiacSign.name}</h4>
            <p className="text-[9px] md:text-sm text-amber-800 uppercase tracking-wider">Zodiac Sign</p>
          </div>
        )}
        <div className="bg-indigo-50 p-3 md:p-6 rounded-xl md:rounded-2xl text-center border border-indigo-200 shadow-[0_4px_20px_rgba(79,70,229,0.05)] flex flex-col items-center justify-center">
          <div className="text-2xl md:text-4xl mb-1 md:mb-3">{getTithiIcon(panchang.tithi)}</div>
          <h4 className="font-serif text-[15px] md:text-2xl text-indigo-950 mb-0.5 md:mb-1 leading-tight">{panchang.tithi}</h4>
          <p className="text-[9px] md:text-sm text-indigo-800 uppercase tracking-wider">Lunar Phase</p>
        </div>
        <div className="bg-rose-50 p-3 md:p-6 rounded-xl md:rounded-2xl text-center border border-rose-200 shadow-[0_4px_20px_rgba(225,29,72,0.05)] flex flex-col items-center justify-center">
          <div className="text-2xl md:text-4xl mb-1 md:mb-3">⭐</div>
          <h4 className="font-serif text-[15px] md:text-2xl text-rose-950 mb-0.5 md:mb-1 leading-tight">{panchang.nakshatra}</h4>
          <p className="text-[9px] md:text-sm text-rose-800 uppercase tracking-wider">Birth Star</p>
        </div>
        <div className="bg-teal-50 p-3 md:p-6 rounded-xl md:rounded-2xl text-center border border-teal-200 shadow-[0_4px_20px_rgba(13,148,136,0.05)] flex flex-col items-center justify-center">
          <div className="text-2xl md:text-4xl mb-1 md:mb-3">☀️</div>
          <h4 className="font-serif text-[15px] md:text-2xl text-teal-950 mb-0.5 md:mb-1 leading-tight">{panchang.paksha}</h4>
          <p className="text-[9px] md:text-sm text-teal-800 uppercase tracking-wider">Moon Cycle</p>
        </div>
      </div>

      {nakshatraMeaning && (
        <div className="bg-rose-50/50 border border-rose-100 rounded-xl p-4 md:p-5 text-center mb-10 md:mb-12 shadow-[0_2px_10px_rgba(225,29,72,0.03)] mx-auto max-w-2xl">
          <p className="text-sm md:text-base text-rose-900 leading-relaxed">
            <span className="font-semibold">{panchang.nakshatra} Star:</span> {nakshatraMeaning}
          </p>
        </div>
      )}

      <NextBirthdaySelector initialYear={targetYear} calculatedDate={nextBirthdayDate} />

      <IdentitySection 
        panchang={{ tithi: panchang.tithi, nakshatra: panchang.nakshatra, paksha: panchang.paksha }} 
        name={name}
        targetYear={targetYear}
        nextBirthdayDate={nextBirthdayDate}
        zodiacSign={zodiacSign}
      />

      <div className="text-center max-w-xl mx-auto mb-10 mt-10 md:mb-16 md:mt-16 px-4">
        <h3 className="font-serif text-lg md:text-2xl text-stone-800 mb-3 md:mb-4 opacity-90 italic">&quot;From the Panchang&quot;</h3>
        <div className="w-12 md:w-16 h-px bg-saffron/50 mx-auto mb-4 md:mb-6"></div>
        <p className="text-stone-700 leading-relaxed text-xs md:text-base">
          Time in Sanatana Dharma follows a cosmic rhythm. The moon affects the mind and emotions, while the sun guides the soul. Your birth is not an accident of dates, but a precise alignment with nature&apos;s timeless cycles.
        </p>
      </div>

      <RetentionLayer 
        userPanchang={{ tithi: panchang.tithi, nakshatra: panchang.nakshatra, paksha: panchang.paksha }}
        name={name}
        nextBirthday={nextBirthdayDate}
      />
    </main>
  );
}
