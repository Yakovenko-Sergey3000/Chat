import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import ServerFetcher from "@/app/chat/_components/Shared/Utils/ServerFetcher";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/chat")) {
    const res = await ServerFetcher("/api/auth/current_user");
    const { user } = await res.json();

    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (request.nextUrl.pathname === "/chat") {
      return NextResponse.redirect(new URL("/chat/messages", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/login")) {
    const res = await ServerFetcher("/api/auth/current_user");
    const { user } = await res.json();

    if (user) {
      return NextResponse.redirect(new URL("/chat/messages", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/registration")) {
    const res = await ServerFetcher("/api/auth/current_user");
    const { user } = await res.json();

    if (user) {
      return NextResponse.redirect(new URL("/chat/messages", request.url));
    }
  }
}

export const config = {
  matcher: ["/chat/:path*", "/login/:path*", "/registration/:path*"],
};
