"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
}

export function TimePicker({ value, onChange }: TimePickerProps) {
  const [hour, setHour] = React.useState<string>("12");
  const [minute, setMinute] = React.useState<string>("00");
  const [ampm, setAmpm] = React.useState<"AM" | "PM">("AM");

  // Parse initial value if exists (format: HH:mm)
  React.useEffect(() => {
    if (value) {
      const [h, m] = value.split(":");
      let parsedHour = parseInt(h, 10);
      setAmpm(parsedHour >= 12 ? "PM" : "AM");
      parsedHour = parsedHour % 12 || 12;
      setHour(parsedHour.toString().padStart(2, "0"));
      setMinute(m);
    }
  }, [value]);

  const handleTimeChange = (newHour: string, newMinute: string, newAmpm: "AM" | "PM") => {
    let rawHour = parseInt(newHour, 10);
    if (newAmpm === "PM" && rawHour < 12) rawHour += 12;
    if (newAmpm === "AM" && rawHour === 12) rawHour = 0;
    
    const formattedHour = rawHour.toString().padStart(2, "0");
    onChange(`${formattedHour}:${newMinute}`);
  };

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));

  return (
    <Popover>
      <PopoverTrigger className={cn(
        "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border shadow-xs h-9 px-4 py-2 w-full justify-start text-left font-normal bg-[#FDFBF7] border-stone-200 text-stone-900 hover:bg-white hover:text-stone-900",
        !value && "text-stone-500"
      )}>
        <Clock className="mr-2 h-4 w-4" />
        {value ? `${hour}:${minute} ${ampm}` : <span>Select time (Optional)</span>}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2 border-stone-200 bg-white shadow-lg" align="start">
        <div className="flex gap-2 h-48">
          <ScrollArea className="w-16 h-full flex items-center justify-start border-r border-stone-100 pr-2">
            <div className="flex flex-col gap-1 w-full pb-32">
              {hours.map((h) => (
                <Button
                  key={h}
                  variant="ghost"
                  className={cn("w-full h-8 text-sm", hour === h ? "bg-saffron text-white hover:bg-saffron hover:text-white" : "hover:bg-stone-100 text-stone-700")}
                  onClick={() => {
                    setHour(h);
                    handleTimeChange(h, minute, ampm);
                  }}
                >
                  {h}
                </Button>
              ))}
            </div>
          </ScrollArea>
          <ScrollArea className="w-16 h-full border-r border-stone-100 pr-2">
            <div className="flex flex-col gap-1 pb-32">
              {minutes.map((m) => (
                <Button
                  key={m}
                  variant="ghost"
                  className={cn("w-full h-8 text-sm", minute === m ? "bg-saffron text-white hover:bg-saffron hover:text-white" : "hover:bg-stone-100 text-stone-700")}
                  onClick={() => {
                    setMinute(m);
                    handleTimeChange(hour, m, ampm);
                  }}
                >
                  {m}
                </Button>
              ))}
            </div>
          </ScrollArea>
          <div className="flex flex-col gap-2 w-16">
            <Button
              variant="ghost"
              className={cn("flex-1 text-sm", ampm === "AM" ? "bg-saffron text-white hover:bg-saffron hover:text-white" : "hover:bg-stone-100 text-stone-700")}
              onClick={() => {
                setAmpm("AM");
                handleTimeChange(hour, minute, "AM");
              }}
            >
              AM
            </Button>
            <Button
              variant="ghost"
              className={cn("flex-1 text-sm", ampm === "PM" ? "bg-saffron text-white hover:bg-saffron hover:text-white" : "hover:bg-stone-100 text-stone-700")}
              onClick={() => {
                setAmpm("PM");
                handleTimeChange(hour, minute, "PM");
              }}
            >
              PM
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
