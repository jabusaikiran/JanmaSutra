import { NextResponse } from "next/server";
import { calculatePanchang } from "@/lib/astro-server";
import { generateTodayInsight } from "@/lib/gemini";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tzOffset = searchParams.get("tzOffset") || "-330"; // Default to IST

  const now = new Date();
  const dob = now.toISOString().split("T")[0];
  const tob = `${now.getHours()}:${now.getMinutes()}`;

  const panchang = calculatePanchang(dob, tob, tzOffset);
  const insight = await generateTodayInsight(panchang.tithi, panchang.nakshatra);

  return NextResponse.json({
    ...panchang,
    insight: insight.insight
  });
}
