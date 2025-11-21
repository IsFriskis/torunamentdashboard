import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const tournamentId = searchParams.get("tournamentId");
    const status = searchParams.get("status");
    
    const where: any = {};
    if (userId) where.userId = userId;
    if (tournamentId) where.tournamentId = tournamentId;
    if (status) where.status = status;
    
    const payments = await prisma.payment.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        tournament: {
          select: {
            id: true,
            name: true,
            status: true,
            entryFee: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(payments);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payment = await prisma.payment.create({
      data: {
        userId: body.userId,
        tournamentId: body.tournamentId,
        stripePaymentId: body.stripePaymentId,
        amount: body.amount,
        currency: body.currency || "usd",
        status: body.status || "PENDING",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        tournament: {
          select: {
            id: true,
            name: true,
            entryFee: true,
          },
        },
      },
    });
    return NextResponse.json(payment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create payment" }, { status: 500 });
  }
}
