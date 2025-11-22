import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all tournaments
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const organizerId = searchParams.get("organizerId");

    const where: any = {};
    if (status) where.status = status;
    if (organizerId) where.organizerId = organizerId;

    const tournaments = await prisma.tournament.findMany({
      where,
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        _count: {
          select: {
            registrations: true,
            teams: true,
            matches: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tournaments);
  } catch (error) {
    console.error("Error fetching tournaments:", error);
    return NextResponse.json(
      { error: "Failed to fetch tournaments" },
      { status: 500 }
    );
  }
}

// POST create tournament
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      location,
      startDate,
      startTime,
      endDate,
      endTime,
      status,
      entryFee,
      maxParticipants,
      organizerId,
    } = body;

    const tournament = await prisma.tournament.create({
      data: {
        name,
        description,
        location,
        startDate: new Date(startDate),
        startTime,
        endDate: new Date(endDate),
        endTime,
        status: status || 'UPCOMING',
        entryFee: entryFee || 0,
        maxParticipants,
        organizerId,
      },
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(tournament, { status: 201 });
  } catch (error) {
    console.error("Error creating tournament:", error);
    return NextResponse.json(
      { error: "Failed to create tournament" },
      { status: 500 }
    );
  }
}
