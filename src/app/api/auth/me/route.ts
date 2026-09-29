import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/jwt";

export async function GET() {
  const session = await getSessionUser();

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: session,
  });
}
