import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { getUserId } from "@/server/session";

export async function GET() {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ subscriptions: [] });
    const subs = await prisma.dbSubscription.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ subscriptions: subs });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ subscriptions: [] });
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    const { planId, planName, price, name, phone, startDate, comment } = await request.json();
    const sub = await prisma.dbSubscription.create({
      data: { userId, planId, planName, price, name, phone, startDate, comment: comment ?? "" },
    });
    return NextResponse.json({ subscription: sub });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Ошибка" }, { status: 500 });
  }
}
