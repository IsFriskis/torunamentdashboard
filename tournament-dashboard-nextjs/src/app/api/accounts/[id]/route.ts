import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const account = await prisma.account.findUnique({
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
    if (!account) return NextResponse.json({ error: "Account not found" }, { status: 404 });
    return NextResponse.json(account);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch account" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const updateData: any = {};
    
    if (body.refresh_token !== undefined) updateData.refresh_token = body.refresh_token;
    if (body.access_token !== undefined) updateData.access_token = body.access_token;
    if (body.expires_at !== undefined) updateData.expires_at = body.expires_at;
    if (body.token_type) updateData.token_type = body.token_type;
    if (body.scope) updateData.scope = body.scope;
    if (body.id_token !== undefined) updateData.id_token = body.id_token;
    if (body.session_state !== undefined) updateData.session_state = body.session_state;
    
    const account = await prisma.account.update({
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
    return NextResponse.json(account);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update account" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.account.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Account deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
  }
}
