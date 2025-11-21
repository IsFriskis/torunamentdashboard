import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const payment = await prisma.payment.findUnique({
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
        tournament: {
          select: {
            id: true,
            name: true,
            status: true,
            entryFee: true,
            startDate: true,
            location: true,
          },
        },
      },
    });
    if (!payment) return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    return NextResponse.json(payment);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch payment" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const updateData: any = {};
    
    if (body.status) updateData.status = body.status;
    if (body.stripePaymentId) updateData.stripePaymentId = body.stripePaymentId;
    if (body.amount !== undefined) updateData.amount = body.amount;
    if (body.currency) updateData.currency = body.currency;
    
    const payment = await prisma.payment.update({
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
        tournament: {
          select: {
            id: true,
            name: true,
            entryFee: true,
          },
        },
      },
    });
    return NextResponse.json(payment);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update payment" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.payment.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Payment deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete payment" }, { status: 500 });
  }
}
