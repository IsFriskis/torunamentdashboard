import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const provider = searchParams.get("provider");
    
    const where: any = {};
    if (userId) where.userId = userId;
    if (provider) where.provider = provider;
    
    const accounts = await prisma.account.findMany({
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
      orderBy: { provider: "asc" },
    });
    return NextResponse.json(accounts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch accounts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const account = await prisma.account.create({
      data: {
        userId: body.userId,
        type: body.type,
        provider: body.provider,
        providerAccountId: body.providerAccountId,
        refresh_token: body.refresh_token,
        access_token: body.access_token,
        expires_at: body.expires_at,
        token_type: body.token_type,
        scope: body.scope,
        id_token: body.id_token,
        session_state: body.session_state,
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
    return NextResponse.json(account, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
  }
}
