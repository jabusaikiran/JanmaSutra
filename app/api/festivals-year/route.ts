import { NextResponse } from "next/server";
import { getJulianDay, getEphemerisData } from "@/lib/astro-server";
import { FESTIVALS } from "@/lib/festivals";

// Helper function locally or imported
function findFestivalDate(sunRasi: number, tithiIndex: number, targetYear: number, offsetMins: number) {
  // Start from Jan 1st of target year and search for match
  for (let d = 1; d <= 366; d++) {
     // We define Julian Day at Noon
     const jd_et = getJulianDay(targetYear, 1, d, 12, 0, offsetMins);
     const data = getEphemerisData(jd_et);
     
     if (data.sunRasi === sunRasi && data.tithiIndex === tithiIndex) {
       // Return the date
       return new Date(targetYear, 0, d).toISOString().split('T')[0];
     }

     // Safety break for non-leap years
     if (d === 366) {
       const ms = Date.UTC(targetYear, 0, d, 12, 0, 0);
       if (new Date(ms).getUTCFullYear() > targetYear) break;
     }
  }
  return null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const year = parseInt(searchParams.get("year") || new Date().getFullYear().toString());
  const tzOffset = parseInt(searchParams.get("tzOffset") || "-330");

  const results = FESTIVALS.map(fest => {
    const date = findFestivalDate(fest.sunRasi, fest.tithi, year, tzOffset);
    return {
      ...fest,
      date
    };
  }).filter(f => f.date); // only return festivals that occur in the year (though they all should)

  // Sort by date
  results.sort((a, b) => (a.date || "").localeCompare(b.date || ""));

  return NextResponse.json(results);
}

// Since I am importing private functions from astro-server, I need to make sure they are exported.
// I saw findNextBirthday exported, but getJulianDay and getEphemerisData were NOT exported in the previous view.
// I should probably export them or just copy-paste the logic if they are small.
// Let's check astro-server.ts exports again.
