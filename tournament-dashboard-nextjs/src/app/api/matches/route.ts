import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tournamentId = searchParams.get("tournamentId");
    const homeTeamId = searchParams.get("homeTeamId");
    const awayTeamId = searchParams.get("awayTeamId");
    const status = searchParams.get("status");
    
    const where: any = {};
    if (tournamentId) where.tournamentId = tournamentId;
    if (homeTeamId) where.homeTeamId = homeTeamId;
    if (awayTeamId) where.awayTeamId = awayTeamId;
    if (status) where.status = status;
    
    const matches = await prisma.match.findMany({
      where,
      include: {
        tournament: {
          select: {
            id: true,
            name: true,
          },
        },
        homeTeam: true,
        awayTeam: true,
      },
      orderBy: { matchDate: "asc" },
    });
    return NextResponse.json(matches);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch matches" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const match = await prisma.match.create({
      data: {
        tournamentId: body.tournamentId,
        homeTeamId: body.homeTeamId,
        awayTeamId: body.awayTeamId,
        homeScore: body.homeScore,
        awayScore: body.awayScore,
        matchDate: new Date(body.matchDate),
        matchTime: body.matchTime,
        status: body.status || "SCHEDULED",
      },
      include: {
        tournament: {
          select: {
            id: true,
            name: true,
          },
        },
        homeTeam: true,
        awayTeam: true,
      },
    });
    return NextResponse.json(match, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create match" }, { status: 500 });
  }
}
