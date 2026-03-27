import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/getUser";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const block = await prisma.block.update({
    where: { id, userId: user.id },
    data: {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.url !== undefined && { url: body.url }),
      ...(body.iconName !== undefined && { iconName: body.iconName }),
      ...(body.isEnabled !== undefined && { isEnabled: body.isEnabled }),
    },
  });

  return NextResponse.json(block);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  await prisma.block.delete({ where: { id, userId: user.id } });

  return NextResponse.json({ success: true });
}
