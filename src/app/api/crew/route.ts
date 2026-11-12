import { NextResponse } from "next/server";
import { crew, crewSeries, getCrew } from "@/lib/demo-data";

export const dynamic = "force-static";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (id) {
    const c = getCrew(id);
    const series = crewSeries.find((s) => s.crewId === id)!;
    return NextResponse.json({ crew: c, series });
  }
  return NextResponse.json({ crew, crewSeries });
}
