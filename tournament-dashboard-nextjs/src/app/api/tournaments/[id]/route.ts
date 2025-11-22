import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const tournament = await prisma.tournament.findUnique({
      where: { id },
      include: {
        organizer: { select: { id: true, name: true, email: true, image: true } },
        teams: { orderBy: { points: "desc" } },
        matches: { include: { homeTeam: true, awayTeam: true }, orderBy: { matchDate: "asc" } },
        registrations: { include: { user: { select: { id: true, name: true, email: true } } } },
      },
    });
    if (!tournament) return NextResponse.json({ error: "Tournament not found" }, { status: 404 });
    return NextResponse.json(tournament);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tournament" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updateData: any = {};
    if (body.name) updateData.name = body.name;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.location) updateData.location = body.location;
    if (body.startDate) updateData.startDate = new Date(body.startDate);
    if (body.startTime) updateData.startTime = body.startTime;
    if (body.endDate) updateData.endDate = new Date(body.endDate);
    if (body.endTime) updateData.endTime = body.endTime;
    if (body.status) updateData.status = body.status;
    if (body.entryFee !== undefined) updateData.entryFee = body.entryFee;
    if (body.maxParticipants !== undefined) updateData.maxParticipants = body.maxParticipants;
    
    const tournament = await prisma.tournament.update({
      where: { id },
      data: updateData,
      include: { organizer: { select: { id: true, name: true, email: true } } },
    });
    return NextResponse.json(tournament);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update tournament" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.tournament.delete({ where: { id } });
    return NextResponse.json({ message: "Tournament deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete tournament" }, { status: 500 });
  }
}
