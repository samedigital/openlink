import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/getUser";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const blocks = await prisma.block.findMany({
    where: { userId: user.id },
    orderBy: { order: "asc" },
  });

  return NextResponse.json(blocks);
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  // Place at the top (order 0), shift others down
  await prisma.block.updateMany({
    where: { userId: user.id },
    data: { order: { increment: 1 } },
  });

  const block = await prisma.block.create({
    data: {
      userId: user.id,
      type: body.variant === "bento_parent" ? "SOCIAL_GRID" : "LINK",
      title: body.title ?? "",
      url: body.url ?? "",
      iconName: body.iconName ?? "default",
      variant: body.variant ?? "list",
      order: 0,
    },
  });

  return NextResponse.json(block);
}
