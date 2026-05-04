"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { MoveRight } from "lucide-react";
import { format } from "date-fns";
import { DatePicker } from "@/components/DatePicker";
import { TimePicker } from "@/components/TimePicker";
import { PlaceAutocomplete } from "@/components/PlaceAutocomplete";

export default function Home() {
  const router = useRouter();
  const [dob, setDob] = useState<Date | undefined>(undefined);
  const [tob, setTob] = useState("");
  const [place, setPlace] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dob || !place) return;
    setIsLoading(true);
    const tzOffset = new Date().getTimezoneOffset().toString();
    const dobString = format(dob, "yyyy-MM-dd");
    const params = new URLSearchParams({ dob: dobString, tob, place, tzOffset });
    if (name) params.append("name", name);
    router.push(`/result?${params.toString()}`);
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 md:py-24 max-w-4xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <h1 className="font-serif text-4xl md:text-7xl font-medium tracking-tight mb-4 md:mb-6 text-stone-900">
          Your real birthday isn&apos;t what you think.
        </h1>
        <p className="text-stone-700 text-base md:text-xl max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
          In Sanatana Dharma, your birth is defined by cosmic time — not just a calendar date. Discover the moment you were truly born.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="w-full max-w-md bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(217,119,6,0.05)]"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-stone-600 uppercase tracking-wider text-xs">
              Name (Optional)
            </label>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring border border-input shadow-xs h-9 px-4 py-2 w-full justify-start text-left font-normal bg-[#FDFBF7] border-stone-200 text-stone-900 hover:bg-white placeholder:text-stone-400"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-stone-600 uppercase tracking-wider text-xs">
              Date of Birth *
            </label>
            <DatePicker value={dob} onChange={setDob} />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-stone-600 uppercase tracking-wider text-xs">
              Time of Birth (Optional)
            </label>
            <TimePicker value={tob} onChange={setTob} />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-stone-600 uppercase tracking-wider text-xs">
              Place of Birth *
            </label>
            <PlaceAutocomplete value={place} onChange={setPlace} />
          </div>

          <button
            type="submit"
            disabled={!dob || !place || isLoading}
            className="w-full mt-4 flex items-center justify-center gap-2 bg-saffron hover:opacity-90 text-white px-4 py-2.5 md:py-3 rounded-md shadow-md font-medium text-sm transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                 <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                 <span>Discovering...</span>
              </span>
            ) : (
              <>
                Find Your Birth Tithi
                <MoveRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </main>
  );
}
