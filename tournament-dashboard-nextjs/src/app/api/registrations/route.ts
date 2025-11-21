import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tournamentId = searchParams.get("tournamentId");
    const userId = searchParams.get("userId");
    const status = searchParams.get("status");
    
    const where: any = {};
    if (tournamentId) where.tournamentId = tournamentId;
    if (userId) where.userId = userId;
    if (status) where.status = status;
    
    const registrations = await prisma.tournamentRegistration.findMany({
      where,
      include: {
        tournament: {
          select: {
            id: true,
            name: true,
            status: true,
            startDate: true,
            location: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: { registeredAt: "desc" },
    });
    return NextResponse.json(registrations);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const registration = await prisma.tournamentRegistration.create({
      data: {
        tournamentId: body.tournamentId,
        userId: body.userId,
        status: body.status || "PENDING",
      },
      include: {
        tournament: {
          select: {
            id: true,
            name: true,
            status: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    return NextResponse.json(registration, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create registration" }, { status: 500 });
  }
}
