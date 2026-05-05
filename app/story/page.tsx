"use client";

import React from "react";
import { motion } from "motion/react";
import { Sun, Orbit, Sparkles, Map, Users, Info } from "lucide-react";

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function StoryPage() {
  return (
    <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-12 md:py-24 space-y-24 md:space-y-32">
      {/* 1. HERO SECTION */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center space-y-6"
      >
        <h1 className="font-serif text-4xl md:text-7xl font-medium tracking-tight text-stone-900 leading-[1.1]">
          Your birth was never <br className="hidden md:block" /> just a date.
        </h1>
        <p className="text-stone-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          In Sanatana Dharma, time is not just measured — it is experienced. We created JanmaSutra to bring that understanding back into everyday life.
        </p>
      </motion.section>

      {/* 2. THE PROBLEM */}
      <section className="space-y-12">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-6">Somewhere, we lost the connection</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "The Fixed Date",
              text: "Most people only know their Gregorian birthday, viewing their arrival as a static point on a standard calendar.",
              icon: Info
            },
            {
              title: "Forgotten Rhythms",
              text: "Traditional systems like Panchang are rarely part of daily life anymore, relegated to rituals rather than identity.",
              icon: Map
            },
            {
              title: "Lost Identity",
              text: "Our identity has slowly become disconnected from culture and the profound shifts of celestial time.",
              icon: Users
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-stone-200 p-8 rounded-3xl space-y-4 shadow-sm"
            >
              <div className="w-10 h-10 bg-stone-50 rounded-full flex items-center justify-center text-stone-400">
                <item.icon className="w-5 h-5" />
              </div>
              <p className="text-stone-700 leading-relaxed font-medium">{item.title}</p>
              <p className="text-stone-500 text-sm leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. THE INSIGHT */}
      <section className="max-w-2xl mx-auto text-center space-y-8">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
        >
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-8">Time in Sanatana Dharma is different</h2>
          <div className="space-y-6 text-stone-600 text-lg leading-relaxed">
            <p>
              Time follows a <strong className="text-stone-900 font-medium tracking-tight">cosmic rhythm</strong>, guided by the intricate dance of both the sun and the moon. It is not linear, but cyclical and atmospheric.
            </p>
            <p>
              Birth is not just a date — it is a <strong className="text-stone-900 font-medium tracking-tight">moment aligned with nature</strong>. It captures the unique state of the universe at the exact second you stepped into it.
            </p>
            <p>
              Concepts like <strong className="text-stone-900 font-medium tracking-tight">Tithi and Nakshatra</strong> reflect this deeper understanding, mapping our existence to the phases of the moon and the positioning of stars.
            </p>
          </div>
        </motion.div>
      </section>

      {/* 4. COMPARISON SECTION */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900">A Different Way of Looking at Time</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Most of us grow up celebrating birthdays based on a fixed calendar date. 
            But traditional Indian timekeeping follows a different approach — one that aligns with cosmic cycles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Indic */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#FFFBF5] border border-orange-100 p-8 md:p-12 rounded-[2.5rem] space-y-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-saffron rounded-full flex items-center justify-center">
                <Orbit className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-serif text-2xl text-stone-900">Indic (Sanatana Dharma)</h3>
            </div>
            <ul className="space-y-4">
              {[
                "Based on sun and moon alignment (lunisolar)",
                "Defined by Tithi and Nakshatra",
                "Connected to festivals and cultural cycles",
                "Rooted in astronomical calculations",
                "Reflects a sense of continuity across generations"
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-stone-700">
                  <span className="text-saffron shrink-0 mt-1.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Western */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="bg-white border border-stone-200 p-8 md:p-12 rounded-[2.5rem] space-y-8"
          >
            <div className="flex items-center gap-3 text-stone-400">
              <Sun className="w-8 h-8" />
              <h3 className="font-serif text-2xl text-stone-900">Western (Gregorian)</h3>
            </div>
            <ul className="space-y-4">
              {[
                "Based on the solar cycle",
                "Fixed calendar dates each year",
                "Designed for global standardization",
                "Practical for modern systems",
                "Widely used across the world"
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-stone-500">
                  <span className="text-stone-300 shrink-0 mt-1.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pt-8"
        >
          <p className="text-stone-500 italic text-lg">
            Both systems help us track time. <br className="md:hidden" />
            But one helps you track <span className="text-saffron font-medium">who you are within it</span>.
          </p>
        </motion.div>
      </section>

      {/* 5. WHY WE BUILT THIS */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-6">Why JanmaSutra exists</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Accessibility",
              text: "To make ancient knowledge accessible to anyone, regardless of their familiarity with Sanskrit or complex astrology."
            },
            {
              title: "Intentionality",
              text: "To simplify without losing meaning. We focus on the core attributes that define your traditional identity."
            },
            {
              title: "Rediscovery",
              text: "To help people rediscover their roots and view their existence through a lens that has guided millions for millennia."
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center space-y-4"
            >
              <h4 className="font-serif text-xl text-stone-900">{item.title}</h4>
              <p className="text-stone-500 text-sm leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. WHAT THIS IS */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-saffron/5 border border-saffron/10 rounded-[3rem] p-8 md:p-16 text-center"
      >
        <Sparkles className="w-8 h-8 text-saffron mx-auto mb-6" />
        <p className="font-serif text-2xl md:text-3xl text-stone-900 leading-relaxed max-w-2xl mx-auto">
          &ldquo;JanmaSutra is not an astrology app. It&apos;s a modern way to understand your identity through the lens of Sanatana Dharma.&rdquo;
        </p>
      </motion.section>

      {/* 7. FUTURE VISION */}
      <section className="space-y-12 pb-12">
        <div className="text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-6">Where this is going</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              title: "Lineage & Patterns",
              text: "Exploring how family patterns emerge across generations through Tithi and Nakshatra."
            },
            {
              title: "Cultural Calendar",
              text: "A living calendar that helps you align your daily activities with the cosmic pulse."
            },
            {
              title: "Deeper Roots",
              text: "A personalized journey into your ancestry, identity, and the timeless wisdom of the Panchang."
            }
          ].map((item, i) => (
            <div key={i} className="space-y-3">
              <h4 className="font-bold text-stone-900 text-xs uppercase tracking-widest">{item.title}</h4>
              <p className="text-stone-500 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FINAL SECTION */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center space-y-8 pt-12 md:pt-24 border-t border-stone-200"
      >
        <p className="text-stone-500 text-xl md:text-2xl font-serif max-w-xl mx-auto leading-relaxed">
          &ldquo;This is just the beginning. <br className="hidden md:block" />
          Your story didn&apos;t start with a date — it started with a moment in time.&rdquo;
        </p>
        <div className="flex justify-center">
           <div className="w-px h-16 bg-stone-300" />
        </div>

        <div className="space-y-6 pt-12">
          <a
            href="https://wa.me/917702183149?text=Hey%2C%20I%20visited%20Janma%20Sutra%20and%20wanted%20to%20say%20Hi%21"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-stone-900 hover:bg-stone-800 text-stone-50 px-8 py-4 rounded-full shadow-lg font-medium text-sm transition-all active:scale-95"
            id="whatsapp-button"
          >
            Say Hi to Developer
          </a>
          <p className="text-stone-500 text-sm font-medium tracking-wide">
            Connect for collaboration, support, or just say hi.
          </p>
        </div>
      </motion.section>
    </main>
  );
}
