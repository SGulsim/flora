import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const USER_COOKIE = "flora_user_id";

export async function getUserId(): Promise<string | null> {
  const store = await cookies();
  return store.get(USER_COOKIE)?.value ?? null;
}

export function setSessionCookie(res: NextResponse, userId: string) {
  res.cookies.set(USER_COOKIE, userId, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}

export function clearSessionCookie(res: NextResponse) {
  res.cookies.set(USER_COOKIE, "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
    sameSite: "lax",
  });
}
