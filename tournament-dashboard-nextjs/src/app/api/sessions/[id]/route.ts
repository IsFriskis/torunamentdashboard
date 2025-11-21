import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await prisma.session.findUnique({
      where: { id: params.id },
      include: {
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
    if (!session) return NextResponse.json({ error: "Session not found" }, { status: 404 });
    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch session" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const updateData: any = {};
    
    if (body.sessionToken) updateData.sessionToken = body.sessionToken;
    if (body.expires) updateData.expires = new Date(body.expires);
    
    const session = await prisma.session.update({
      where: { id: params.id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update session" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.session.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Session deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete session" }, { status: 500 });
  }
}
