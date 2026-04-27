import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { getUserId } from "@/server/session";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ bouquetId: string }> }
) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    const { bouquetId } = await params;
    const { quantity } = await request.json();
    if (quantity <= 0) {
      await prisma.cartItem.deleteMany({ where: { userId, bouquetId } });
      return NextResponse.json({ ok: true });
    }
    const item = await prisma.cartItem.update({
      where: { userId_bouquetId: { userId, bouquetId } },
      data: { quantity },
    });
    return NextResponse.json({ item });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Ошибка" }, { status: 500 });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ bouquetId: string }> }
) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ ok: true });
    const { bouquetId } = await params;
    await prisma.cartItem.deleteMany({ where: { userId, bouquetId } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Ошибка" }, { status: 500 });
  }
}
