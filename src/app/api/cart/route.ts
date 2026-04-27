import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { getUserId } from "@/server/session";

export async function GET() {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ items: [] });
    const items = await prisma.cartItem.findMany({ where: { userId } });
    return NextResponse.json({ items });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ items: [] });
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    const { bouquetId, name, price, image, quantity = 1 } = await request.json();
    const item = await prisma.cartItem.upsert({
      where: { userId_bouquetId: { userId, bouquetId } },
      update: { quantity: { increment: quantity } },
      create: { userId, bouquetId, name, price, image, quantity },
    });
    return NextResponse.json({ item });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Ошибка" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ ok: true });
    await prisma.cartItem.deleteMany({ where: { userId } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Ошибка" }, { status: 500 });
  }
}
