import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/getUser";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  return NextResponse.json(user);
}

export async function PUT(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: {
      ...(body.username !== undefined && { username: body.username }),
      ...(body.fullName !== undefined && { fullName: body.fullName }),
      ...(body.bio !== undefined && { bio: body.bio }),
      ...(body.metaTitle !== undefined && { metaTitle: body.metaTitle }),
      ...(body.metaDesc !== undefined && { metaDesc: body.metaDesc }),
    },
  });

  return NextResponse.json(updated);
}
