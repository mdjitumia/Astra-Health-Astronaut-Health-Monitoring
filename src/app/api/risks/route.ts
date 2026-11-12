import { NextResponse } from "next/server";
import { riskAssessments, getRisk, getCrew } from "@/lib/demo-data";

export const dynamic = "force-static";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (id) {
    const risk = getRisk(id);
    const c = getCrew(id);
    return NextResponse.json({ crew: c, risk });
  }
  return NextResponse.json({
    risks: riskAssessments.map((r) => ({
      ...r,
      crew: getCrew(r.crewId),
    })),
  });
}
