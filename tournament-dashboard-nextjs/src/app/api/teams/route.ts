import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tournamentId = searchParams.get("tournamentId");
    const where = tournamentId ? { tournamentId } : {};
    
    const teams = await prisma.team.findMany({
      where,
      include: { tournament: { select: { id: true, name: true } } },
      orderBy: { points: "desc" },
    });
    return NextResponse.json(teams);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch teams" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const team = await prisma.team.create({
      data: {
        name: body.name,
        tournamentId: body.tournamentId,
        wins: body.wins || 0,
        losses: body.losses || 0,
        draws: body.draws || 0,
        points: body.points || 0,
      },
      include: { tournament: true },
    });
    return NextResponse.json(team, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create team" }, { status: 500 });
  }
}
