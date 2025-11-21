import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const identifier = searchParams.get("identifier");
    
    const where: any = {};
    if (identifier) where.identifier = identifier;
    
    const tokens = await prisma.verificationToken.findMany({
      where,
      orderBy: { expires: "desc" },
    });
    return NextResponse.json(tokens);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch verification tokens" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = await prisma.verificationToken.create({
      data: {
        identifier: body.identifier,
        token: body.token,
        expires: new Date(body.expires),
      },
    });
    return NextResponse.json(token, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create verification token" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const identifier = searchParams.get("identifier");
    const token = searchParams.get("token");
    
    if (!identifier || !token) {
      return NextResponse.json(
        { error: "identifier and token are required" },
        { status: 400 }
      );
    }
    
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier,
          token,
        },
      },
    });
    return NextResponse.json({ message: "Verification token deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete verification token" }, { status: 500 });
  }
}
