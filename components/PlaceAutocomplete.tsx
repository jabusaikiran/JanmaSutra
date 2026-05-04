"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Loader2, MapPin } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Place {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

interface PlaceAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
}

export function PlaceAutocomplete({ value, onChange }: PlaceAutocompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [places, setPlaces] = React.useState<Place[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const debouncedQuery = useDebounce(query, 300);

  React.useEffect(() => {
    if (!debouncedQuery) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPlaces([]);
      return;
    }

    const fetchPlaces = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            debouncedQuery
          )}&format=jsonv2&addressdetails=1&limit=5`,
          {
            headers: {
              "User-Agent": "JanmaSutra-App",
            },
          }
        );
        const data = await res.json();
        setPlaces(data || []);
      } catch (error) {
        console.error("Error fetching places:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaces();
  }, [debouncedQuery]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={cn(
        "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border shadow-xs h-9 px-4 py-2 w-full justify-between font-normal bg-[#FDFBF7] border-stone-200 text-stone-900 hover:bg-white hover:text-stone-900",
        !value && "text-stone-500"
      )}>
        <div className="flex items-center truncate">
          <MapPin className="mr-2 h-4 w-4 shrink-0" />
          <span className="truncate">{value || "Search place of birth..."}</span>
        </div>
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0 border-stone-200 bg-white">
        <Command shouldFilter={false} className="bg-transparent">
          <CommandInput
            placeholder="Type a city name..."
            value={query}
            onValueChange={setQuery}
            className="text-stone-900 placeholder:text-stone-400"
          />
          <CommandList>
            {isLoading && (
              <div className="flex items-center justify-center p-4 text-sm text-stone-500">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </div>
            )}
            {!isLoading && places.length === 0 && query && (
              <CommandEmpty className="text-stone-500 p-4 text-center text-sm">No places found.</CommandEmpty>
            )}
            <CommandGroup>
              {places.map((place) => (
                <CommandItem
                  key={place.place_id}
                  value={place.display_name}
                  onSelect={(currentValue) => {
                    onChange(place.display_name);
                    setOpen(false);
                    setQuery("");
                  }}
                  className="cursor-pointer text-stone-800"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 shrink-0 text-saffron",
                      value === place.display_name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="truncate">{place.display_name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
