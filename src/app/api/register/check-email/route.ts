import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email || typeof email !== "string") {
    return NextResponse.json({ exists: false }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  return NextResponse.json({ exists: !!user }, { status: 200 });
}
