// app/api/insights/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { insights } from "../../../constants/next";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const insight = insights.find((item) => item.id.toString() === id);

  if (!insight) {
    return NextResponse.json({ message: "Insight not found" }, { status: 404 });
  }

  return NextResponse.json(insight);
}
