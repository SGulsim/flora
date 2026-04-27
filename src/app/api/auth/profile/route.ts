import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { getUserId } from "@/server/session";

export async function PATCH(request: Request) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    const { name, email, phone } = await request.json();
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name !== undefined && { name: name.trim() }),
        ...(email !== undefined && { email: email.trim().toLowerCase() }),
        ...(phone !== undefined && { phone: phone.trim() }),
      },
    });
    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
