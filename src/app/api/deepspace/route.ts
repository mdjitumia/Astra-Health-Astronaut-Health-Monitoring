import { NextResponse } from "next/server";
import { deepSpaceState } from "@/lib/demo-data";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(deepSpaceState);
}
