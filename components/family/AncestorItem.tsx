"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Ancestor } from "@/lib/types";

interface AncestorItemProps {
  ancestor: Ancestor;
  onRemove: (id: string) => void;
}

export function AncestorItem({ ancestor, onRemove }: AncestorItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl group border border-stone-100 hover:border-saffron/20 transition-all shadow-sm">
      <div>
        <p className="font-bold text-stone-800">{ancestor.name}</p>
        <p className="text-[10px] text-stone-500 uppercase font-medium">
          {ancestor.deathDate ? format(ancestor.deathDate, "MMMM d, yyyy") : "Timeless Memory"}
        </p>
      </div>
      <button 
        onClick={() => onRemove(ancestor.id)}
        className="p-2 text-stone-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
