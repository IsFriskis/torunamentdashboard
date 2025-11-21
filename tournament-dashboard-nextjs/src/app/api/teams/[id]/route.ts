import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const team = await prisma.team.findUnique({
      where: { id: params.id },
      include: {
        tournament: true,
        homeMatches: { include: { awayTeam: true } },
        awayMatches: { include: { homeTeam: true } },
      },
    });
    if (!team) return NextResponse.json({ error: "Team not found" }, { status: 404 });
    return NextResponse.json(team);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch team" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const team = await prisma.team.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(team);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update team" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.team.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Team deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete team" }, { status: 500 });
  }
}
