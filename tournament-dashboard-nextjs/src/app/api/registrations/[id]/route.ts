import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const registration = await prisma.tournamentRegistration.findUnique({
      where: { id: params.id },
      include: {
        tournament: {
          select: {
            id: true,
            name: true,
            status: true,
            startDate: true,
            location: true,
            entryFee: true,
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
    });
    if (!registration) return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    return NextResponse.json(registration);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch registration" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const updateData: any = {};
    
    if (body.status) updateData.status = body.status;
    
    const registration = await prisma.tournamentRegistration.update({
      where: { id: params.id },
      data: updateData,
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
    return NextResponse.json(registration);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update registration" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.tournamentRegistration.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Registration deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete registration" }, { status: 500 });
  }
}
