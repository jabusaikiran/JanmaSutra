"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";

interface Props {
  initialYear: number;
  calculatedDate: string | null;
}

export function NextBirthdaySelector({ initialYear, calculatedDate }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [year, setYear] = useState<number>(initialYear);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value, 10);
    setYear(newYear);

    const params = new URLSearchParams(searchParams.toString());
    params.set("targetYear", newYear.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

  return (
    <div className="bg-[#FFF9F0] p-4 md:p-6 rounded-2xl border border-amber-200 mb-8 pt-6 relative">
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-3 md:px-4 py-1 rounded-full border border-amber-200 text-[10px] md:text-xs font-bold text-orange-600 uppercase tracking-widest whitespace-nowrap shadow-sm">
        Find Tithi Birthday
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 mt-2">
        <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
          <span className="text-stone-700 font-medium text-xs md:text-sm whitespace-nowrap">Select Year:</span>
          <select 
            value={year}
            onChange={handleYearChange}
            className="flex-1 bg-white border border-amber-200 rounded-lg px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm text-stone-900 outline-none focus:ring-2 focus:ring-orange-400/30"
          >
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div className="text-center md:text-right bg-white px-4 md:px-6 py-2 md:py-3 rounded-xl shadow-sm border border-amber-100 min-w-[200px] w-full md:w-auto">
          {calculatedDate ? (
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex flex-col text-center md:text-left">
                <span className="text-stone-500 text-[10px] md:text-xs uppercase tracking-widest mb-0.5 md:mb-1">Celebrate on</span>
                <span className="font-serif text-lg md:text-xl text-stone-900 font-semibold mb-2">
                  {format(new Date(calculatedDate), "MMMM do, yyyy")}
                </span>
                <p className="text-xs text-stone-500 italic max-w-[200px]">
                  Your exact cosmic alignment falls on this day.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-stone-500 text-xs md:text-sm py-2">
              Not found in this year
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
