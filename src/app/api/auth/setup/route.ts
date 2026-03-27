import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
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

  // Derive a clean username from email
  const baseUsername = user.email!
    .split("@")[0]
    .replace(/[^a-z0-9]/gi, "")
    .toLowerCase()
    .slice(0, 20);

  // Ensure username is unique
  let username = baseUsername;
  let attempt = 1;
  while (await prisma.user.findUnique({ where: { username } })) {
    username = `${baseUsername}${attempt++}`;
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
