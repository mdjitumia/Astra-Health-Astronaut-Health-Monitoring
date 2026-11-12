import { NextResponse } from "next/server";
import {
  mission,
  crew,
  missionSeries,
  alerts,
  aggregate,
} from "@/lib/demo-data";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({
    mission,
    aggregates: {
      heartRate: aggregate("heartRate"),
      hrv: aggregate("hrv"),
      sleep: aggregate("sleep"),
      respiratory: aggregate("respiratory"),
    },
    crewSummary: crew.map((c) => ({
      id: c.id,
      name: c.name,
      role: c.role,
      callsign: c.callsign,
      avatarColor: c.avatarColor,
      heartRate: c.heartRate,
      status: c.status,
    })),
    series: missionSeries,
    alerts,
    disclaimer: mission.disclaimer,
  });
}
