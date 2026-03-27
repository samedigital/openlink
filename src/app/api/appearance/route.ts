import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/getUser";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  return NextResponse.json({
    theme: user.theme,
    buttonStyle: user.buttonStyle,
    buttonShape: user.buttonShape,
    hoverEffect: user.hoverEffect,
    fontFamily: user.fontFamily,
  });
}

export async function PUT(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: {
      ...(body.theme !== undefined && { theme: body.theme }),
      ...(body.buttonStyle !== undefined && { buttonStyle: body.buttonStyle }),
      ...(body.buttonShape !== undefined && { buttonShape: body.buttonShape }),
      ...(body.hoverEffect !== undefined && { hoverEffect: body.hoverEffect }),
      ...(body.fontFamily !== undefined && { fontFamily: body.fontFamily }),
    },
  });

  return NextResponse.json({
    theme: updated.theme,
    buttonStyle: updated.buttonStyle,
    buttonShape: updated.buttonShape,
    hoverEffect: updated.hoverEffect,
    fontFamily: updated.fontFamily,
  });
}
