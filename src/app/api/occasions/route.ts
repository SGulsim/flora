import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { getUserId } from "@/server/session";

export async function GET() {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ occasions: [] });
    const occasions = await prisma.occasion.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ occasions });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ occasions: [] });
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    const { date, type, recipientName, reminderDays } = await request.json();
    if (!date || !recipientName) {
      return NextResponse.json({ error: "Заполните дату и имя" }, { status: 400 });
    }
    const occasion = await prisma.occasion.create({
      data: { userId, date, type, recipientName, reminderDays: reminderDays ?? 3 },
    });
    return NextResponse.json({ occasion });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Ошибка" }, { status: 500 });
  }
}
