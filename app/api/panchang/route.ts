import { NextResponse } from "next/server";
import { calculatePanchang } from "@/lib/astro-server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dob = searchParams.get("dob");
  const tob = searchParams.get("tob") || "12:00";
  const tzOffset = searchParams.get("tzOffset") || "-330";

  if (!dob) {
    return NextResponse.json({ error: "Date of birth (dob) is required" }, { status: 400 });
  }

  try {
    const panchang = calculatePanchang(dob, tob, tzOffset);
    return NextResponse.json(panchang);
  } catch (error) {
    return NextResponse.json({ error: "Failed to calculate panchang" }, { status: 500 });
  }
}
