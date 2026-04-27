import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { hashPassword } from "@/server/password";
import { setSessionCookie } from "@/server/session";

export async function POST(request: Request) {
  try {
    const { name, email, password, phone } = await request.json();
    if (!name?.trim() || !email?.trim() || !password) {
      return NextResponse.json({ error: "Заполните все обязательные поля" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Пароль должен быть не короче 6 символов" }, { status: 400 });
    }
    const normalizedEmail = email.trim().toLowerCase();
    const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existing) {
      return NextResponse.json({ error: "Пользователь с таким email уже существует" }, { status: 409 });
    }
    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        phone: phone?.trim() ?? "",
        passwordHash,
      },
    });
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
