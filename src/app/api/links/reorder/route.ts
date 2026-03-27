import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/getUser";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { ids }: { ids: string[] } = await req.json();

  await prisma.$transaction(
    ids.map((id, index) =>
      prisma.block.update({
        where: { id, userId: user.id },
        data: { order: index },
      })
    )
  );

  return NextResponse.json({ success: true });
}
