import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { getUserId } from "@/server/session";

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ bouquetId: string }> }
) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ ok: true });
    const { bouquetId } = await params;
    await prisma.favorite.deleteMany({ where: { userId, bouquetId } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Ошибка" }, { status: 500 });
  }
}
