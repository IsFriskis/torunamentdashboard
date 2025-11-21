import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const match = await prisma.match.findUnique({
      where: { id: params.id },
      include: {
        tournament: {
          select: {
            id: true,
            name: true,
            status: true,
          },
        },
        homeTeam: true,
        awayTeam: true,
      },
    });
    if (!match) return NextResponse.json({ error: "Match not found" }, { status: 404 });
    return NextResponse.json(match);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch match" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const updateData: any = {};
    
    if (body.homeScore !== undefined) updateData.homeScore = body.homeScore;
    if (body.awayScore !== undefined) updateData.awayScore = body.awayScore;
    if (body.matchDate) updateData.matchDate = new Date(body.matchDate);
    if (body.matchTime) updateData.matchTime = body.matchTime;
    if (body.status) updateData.status = body.status;
    
    const match = await prisma.match.update({
      where: { id: params.id },
      data: updateData,
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
    return NextResponse.json(match);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update match" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.match.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Match deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete match" }, { status: 500 });
  }
}
