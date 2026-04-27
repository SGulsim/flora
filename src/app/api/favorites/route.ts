import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { getUserId } from "@/server/session";

export async function GET() {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ ids: [] });
    const favs = await prisma.favorite.findMany({ where: { userId }, select: { bouquetId: true } });
    return NextResponse.json({ ids: favs.map((f) => f.bouquetId) });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ids: [] });
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    const { bouquetId } = await request.json();
    await prisma.favorite.upsert({
      where: { userId_bouquetId: { userId, bouquetId } },
      update: {},
      create: { userId, bouquetId },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Ошибка" }, { status: 500 });
  }
}
