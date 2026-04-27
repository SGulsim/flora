import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { getUserId } from "@/server/session";

export async function GET() {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ collections: [] });
    const cols = await prisma.quizCollection.findMany({
      where: { userId },
      orderBy: { savedAt: "desc" },
    });
    return NextResponse.json({ collections: cols });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ collections: [] });
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    const { answers, bouquetIds } = await request.json();
    const col = await prisma.quizCollection.create({
      data: { userId, answers, bouquetIds },
    });
    return NextResponse.json({ collection: col });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Ошибка" }, { status: 500 });
  }
}
