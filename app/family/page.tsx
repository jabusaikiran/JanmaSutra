"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Users, UserPlus, Trash2, Sparkles, ArrowLeft, Heart, Star } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { DatePicker } from "@/components/DatePicker";
import { TimePicker } from "@/components/TimePicker";

import { FamilyMember, Ancestor } from "@/lib/types";
import { FamilyMemberCard } from "@/components/family/FamilyMemberCard";
import { AncestorItem } from "@/components/family/AncestorItem";

export default function FamilyPage() {
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [dob, setDob] = useState<Date | undefined>(undefined);
  const [tob, setTob] = useState("");
  const [insight, setInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Ancestor states
  const [ancestors, setAncestors] = useState<Ancestor[]>([]);
  const [ancestorName, setAncestorName] = useState("");
  const [ancestorDate, setAncestorDate] = useState<Date | undefined>(undefined);
  const [isAncestorsLoaded, setIsAncestorsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("vedic_family");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTimeout(() => setMembers(parsed), 0);
      } catch (e) {
        console.error("Failed to parse family members", e);
      }
    }
    
    const savedAncestors = localStorage.getItem("vedic_ancestors");
    if (savedAncestors) {
      try {
        const parsed = JSON.parse(savedAncestors);
        setTimeout(() => setAncestors(parsed.map((a: any) => ({ ...a, deathDate: a.deathDate ? new Date(a.deathDate) : undefined }))), 0);
      } catch (e) {
        console.error("Failed to parse ancestors", e);
      }
    }

    setTimeout(() => {
      setIsLoaded(true);
      setIsAncestorsLoaded(true);
    }, 0);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("vedic_family", JSON.stringify(members));
    }
  }, [members, isLoaded]);

  useEffect(() => {
    if (isAncestorsLoaded) {
      localStorage.setItem("vedic_ancestors", JSON.stringify(ancestors));
    }
  }, [ancestors, isAncestorsLoaded]);

  const addAncestor = () => {
    if (!ancestorName) return;
    const newAncestor: Ancestor = {
      id: crypto.randomUUID?.() || Math.random().toString(36).substring(2, 11),
      name: ancestorName,
      deathDate: ancestorDate,
    };
    setAncestors([...ancestors, newAncestor]);
    setAncestorName("");
    setAncestorDate(undefined);
  };

  const removeAncestor = (id: string) => {
    setAncestors(ancestors.filter((a) => a.id !== id));
  };

  const addMember = async () => {
    if (!name || !dob) return;
    const dobString = format(dob, "yyyy-MM-dd");
    
    try {
      const res = await fetch(`/api/panchang?dob=${dobString}&tob=${tob}`);
      const p = await res.json();
      
      const newMember: FamilyMember = {
        id: crypto.randomUUID?.() || Math.random().toString(36).substring(2, 11),
        name,
        relation,
        dob: dobString,
        tob,
        panchang: { tithi: p.tithi, nakshatra: p.nakshatra, paksha: p.paksha },
      };
      setMembers([...members, newMember]);
      setName("");
      setRelation("");
      setDob(undefined);
      setTob("");
    } catch (err) {
      console.error("Failed to add member", err);
      alert("Failed to calculate Vedic profile. Please try again.");
    }
  };

  const removeMember = (id: string) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const generateInsight = async () => {
    if (members.length < 2) return;
    setLoadingInsight(true);
    try {
      const res = await fetch("/api/family-insight", {
        method: "POST",
        body: JSON.stringify({ nakshatras: members.map((m) => m.panchang.nakshatra) }),
      });
      const data = await res.json();
      setInsight(data.insight);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingInsight(false);
    }
  };

  return (
    <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 md:py-16">
      <div className="text-center mb-8 md:mb-16">
        <h1 className="font-serif text-3xl md:text-5xl mb-2 text-stone-900">Family Layer</h1>
        <p className="text-sm text-stone-600">Track the cosmic threads that bind your family.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Form */}
        <section className="bg-white border border-stone-200 rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm space-y-4 md:space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <UserPlus className="w-4 h-4 text-saffron" />
            <h2 className="text-base md:text-lg font-serif">Add Member</h2>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-stone-400">Name</label>
                <input 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-sm outline-hidden focus:border-saffron font-sans"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-stone-400">Relation</label>
                <input 
                  value={relation} 
                  onChange={(e) => setRelation(e.target.value)}
                  placeholder="Relation"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-sm outline-hidden focus:border-saffron font-sans"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-stone-400">Date of Birth</label>
              <DatePicker value={dob} onChange={setDob} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-stone-400">Time (Optional)</label>
              <TimePicker value={tob} onChange={setTob} />
            </div>
            <button 
              onClick={addMember}
              disabled={!name || !dob}
              className="w-full bg-saffron text-white font-bold p-3.5 rounded-xl hover:opacity-90 disabled:opacity-50 transition-all uppercase text-[10px] tracking-widest mt-2"
            >
              Add to Family
            </button>
          </div>
        </section>

        {/* List */}
        <section className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-stone-400" />
              <h2 className="text-base md:text-lg font-serif">Your Circle</h2>
            </div>
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{members.length} Members</span>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[500px] pr-1 scrollbar-hide">
            <AnimatePresence mode="popLayout">
              {members.map((member) => (
                <FamilyMemberCard key={member.id} member={member} onRemove={removeMember} />
              ))}
            </AnimatePresence>

            {members.length === 0 && (
              <div className="text-center py-12 border-2 border-dashed border-stone-100 rounded-3xl">
                <Users className="w-12 h-12 text-stone-100 mx-auto mb-4" />
                <p className="text-stone-400 text-sm italic">Start adding your loved ones to see their alignments.</p>
              </div>
            )}
          </div>

          {members.length >= 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-6 border-t border-stone-200">
              <button 
                onClick={generateInsight}
                disabled={loadingInsight}
                className="w-full flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 border border-indigo-100 p-4 rounded-2xl hover:bg-indigo-100 transition-colors font-bold uppercase text-xs tracking-widest"
              >
                {loadingInsight ? <div className="w-4 h-4 border-2 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin"></div> : <Sparkles className="w-4 h-4" />}
                Generate Collective Insight
              </button>

              {insight && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 relative">
                  <p className="text-stone-700 italic leading-relaxed text-sm">&quot;{insight}&quot;</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </section>
      </div>

      <div className="mt-20">
        <section className="bg-white border border-stone-200 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="flex items-center gap-3 font-serif text-2xl mb-4">
                <Star className="w-6 h-6 text-saffron fill-saffron/20" />
                Ancestor Memory
              </h2>
              <p className="text-stone-500 text-sm mb-8 leading-relaxed font-sans">
                Honoring those who came before us. Add the memory of your ancestors to keep their legacy alive in your cosmic map.
              </p>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-stone-400">Ancestor Name</label>
                  <input 
                    value={ancestorName}
                    onChange={(e) => setAncestorName(e.target.value)}
                    placeholder="Name"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm outline-hidden focus:border-saffron font-sans"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-stone-400">Departure Date (Optional)</label>
                  <DatePicker value={ancestorDate} onChange={setAncestorDate} />
                </div>
                <button 
                  onClick={addAncestor}
                  disabled={!ancestorName}
                  className="w-full bg-stone-900 text-white rounded-xl p-4 text-xs font-bold uppercase tracking-widest hover:bg-stone-800 disabled:opacity-50 transition-all"
                >
                  Save to Ancestor Map
                </button>
              </div>
            </div>

            <div className="bg-stone-50/50 rounded-3xl p-6 border border-stone-100">
              <h3 className="text-xs font-bold uppercase text-stone-400 tracking-widest mb-4">Memory List</h3>
              <div className="space-y-3 overflow-y-auto max-h-[400px] pr-1">
                {ancestors.map((a) => (
                  <AncestorItem key={a.id} ancestor={a} onRemove={removeAncestor} />
                ))}
                {ancestors.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm border border-stone-100">
                      <Star className="w-5 h-5 text-stone-200" />
                    </div>
                    <p className="text-stone-400 text-xs italic">Keeping legacies alive.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
