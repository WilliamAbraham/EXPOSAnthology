import { NextResponse } from "next/server";
import worksData from "@/data/works.json";

export async function GET() {
  return NextResponse.json(worksData);
}
