import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { getUserId } from "@/server/session";

export async function GET() {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ user: null });
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return NextResponse.json({ user: null });
    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ user: null });
  }
}
