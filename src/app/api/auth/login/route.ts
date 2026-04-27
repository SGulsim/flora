import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { verifyPassword } from "@/server/password";
import { setSessionCookie } from "@/server/session";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Введите email и пароль" }, { status: 400 });
    }
    const user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json({ error: "Неверный email или пароль" }, { status: 401 });
    }
    const res = NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone },
    });
    setSessionCookie(res, user.id);
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
