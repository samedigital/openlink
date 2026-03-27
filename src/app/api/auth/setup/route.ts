import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await prisma.user.findUnique({
    where: { supabaseId: user.id },
  });
  if (existing) return NextResponse.json(existing);

  // Use provided username or derive from email
  let body: { username?: string } = {};
  try { body = await req.json(); } catch {}

  let username = body.username?.trim().toLowerCase() || "";

  if (!username) {
    username = user.email!
      .split("@")[0]
      .replace(/[^a-z0-9]/gi, "")
      .toLowerCase()
      .slice(0, 20);
  }

  // Validate username format
  if (!/^[a-z0-9_-]{3,20}$/.test(username)) {
    return NextResponse.json({ error: "Invalid username format" }, { status: 400 });
  }

  // Check username taken
  const taken = await prisma.user.findUnique({ where: { username } });
  if (taken) {
    return NextResponse.json({ error: "Username already taken" }, { status: 409 });
  }

  const newUser = await prisma.user.create({
    data: {
      supabaseId: user.id,
      email: user.email!,
      username,
      bio: "My links, all in one place.",
    },
  });

  return NextResponse.json(newUser);
}
