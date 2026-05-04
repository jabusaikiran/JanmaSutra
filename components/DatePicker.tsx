"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger className={cn(
        "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border shadow-xs h-9 px-4 py-2 w-full justify-start text-left font-normal bg-[#FDFBF7] border-stone-200 text-stone-900 hover:bg-white hover:text-stone-900",
        !value && "text-stone-500"
      )}>
        <CalendarIcon className="mr-2 h-4 w-4" />
        {value ? format(value, "PPP") : <span>Pick a date</span>}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border-stone-200 bg-white" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
          captionLayout="dropdown"
          fromYear={1900}
          toYear={new Date().getFullYear()}
          className="text-stone-900"
        />
      </PopoverContent>
    </Popover>
  );
}
