import { NextResponse } from "next/server";
import {
  radiationLocations,
  radiationExposure,
  radiationWarnings,
  getCrew,
} from "@/lib/demo-data";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({
    locations: radiationLocations,
    exposure: radiationExposure.map((e) => ({ ...e, crew: getCrew(e.crewId) })),
    warnings: radiationWarnings,
  });
}
