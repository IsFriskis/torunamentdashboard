import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * @swagger
 * /api/tournaments:
 *   get:
 *     tags:
 *       - Tournaments
 *     summary: Get all tournaments
 *     description: Retrieve a list of all tournaments with optional filters
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [UPCOMING, ONGOING, COMPLETED, CANCELLED]
 *         description: Filter by tournament status
 *       - in: query
 *         name: organizerId
 *         schema:
 *           type: string
 *         description: Filter by organizer ID
 *     responses:
 *       200:
 *         description: A list of tournaments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tournament'
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/tournaments:
 *   post:
 *     tags:
 *       - Tournaments
 *     summary: Create a new tournament
 *     description: Create a new tournament with the provided details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - location
 *               - startDate
 *               - startTime
 *               - endDate
 *               - endTime
 *               - organizerId
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               startTime:
 *                 type: string
 *               endDate:
 *                 type: string
 *                 format: date
 *               endTime:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [UPCOMING, ONGOING, COMPLETED, CANCELLED]
 *               entryFee:
 *                 type: integer
 *               maxParticipants:
 *                 type: integer
 *               organizerId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tournament created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tournament'
 *       500:
 *         description: Server error
 */
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
