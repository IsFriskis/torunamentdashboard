import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const sessionToken = searchParams.get("sessionToken");
    
    const where: any = {};
    if (userId) where.userId = userId;
    if (sessionToken) where.sessionToken = sessionToken;
    
    const sessions = await prisma.session.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { expires: "desc" },
    });
    return NextResponse.json(sessions);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const session = await prisma.session.create({
      data: {
        sessionToken: body.sessionToken,
        userId: body.userId,
        expires: new Date(body.expires),
      },
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
    return NextResponse.json(session, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
  }
}
