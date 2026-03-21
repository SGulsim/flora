import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/server/db";

const USER_COOKIE = "flora_user_id";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get(USER_COOKIE)?.value;
    if (!userId) {
      return NextResponse.json({ orders: [] });
    }
    const orders = await prisma.order.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({
      orders: orders.map((o) => ({
        id: o.id,
        total: o.total,
        date: o.createdAt,
        status: o.status,
      })),
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ orders: [] });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get(USER_COOKIE)?.value ?? null;
    const body = await request.json();
    const { items, total, cardText } = body as {
      items: { bouquetId: string; quantity: number }[];
      total: number;
      cardText?: string | null;
    };
    if (!items?.length || typeof total !== "number") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    const order = await prisma.order.create({
      data: {
        userId,
        total: Math.round(total),
        status: "pending",
        cardText: cardText || null,
        items: {
          create: items.map((i) => ({
            bouquetId: i.bouquetId,
            quantity: i.quantity,
          })),
        },
      },
    });
    return NextResponse.json({ orderId: order.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
