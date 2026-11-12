import { NextResponse } from "next/server";
import { countermeasures, recoveryTrajectory, getCrew } from "@/lib/demo-data";

export const dynamic = "force-static";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const crewId = searchParams.get("crewId");
  const items = crewId
    ? countermeasures.filter((c) => c.crewId === crewId)
    : countermeasures;
  return NextResponse.json({
    countermeasures: items.map((c) => ({ ...c, crew: getCrew(c.crewId) })),
    recoveryTrajectory,
  });
}
