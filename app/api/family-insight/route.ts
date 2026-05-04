import { NextResponse } from "next/server";
import { generateFamilyInsight } from "@/lib/gemini";

export async function POST(request: Request) {
  try {
    const { nakshatras } = await request.json();
    if (!nakshatras || !Array.isArray(nakshatras)) {
      return NextResponse.json({ error: "Invalid nakshatras list" }, { status: 400 });
    }

    const { insight } = await generateFamilyInsight(nakshatras);
    return NextResponse.json({ insight });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate family insight" }, { status: 500 });
  }
}
