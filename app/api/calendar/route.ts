import { NextResponse } from "next/server";
import { calculatePanchang } from "@/lib/astro-server";
import { FESTIVALS } from "@/lib/festivals";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const month = parseInt(searchParams.get("month") || new Date().getMonth().toString());
  const year = parseInt(searchParams.get("year") || new Date().getFullYear().toString());
  const tzOffset = searchParams.get("tzOffset") || "-330";

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calendarData = [];

  for (let d = 1; d <= daysInMonth; d++) {
    const dob = `${year}-${(month + 1).toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
    const dateObj = new Date(year, month, d);
    const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    const panchang = calculatePanchang(dob, "12:00", tzOffset);
    
    // Festival matching based on Sun Rasi and Tithi
    const festival = FESTIVALS.find(f => {
      return f.sunRasi === panchang._internal.sunRasi && f.tithi === panchang._internal.tithiIndex;
    });

    calendarData.push({
      day: d,
      dob,
      dayOfWeek,
      ...panchang,
      festival: festival || null
    });
  }

  return NextResponse.json({
    year,
    month,
    days: calendarData
  });
}
