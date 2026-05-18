import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(
    request: NextRequest
) {

    const token =
        request.cookies.get("access_token");

    const isLoginPage =
        request.nextUrl.pathname === "/login";

    // ยังไม่ได้ login
    if (!token && !isLoginPage) {

        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }

    // login แล้ว แต่จะเข้า login อีก
    if (token && isLoginPage) {

        return NextResponse.redirect(
            new URL("/dashboard", request.url)
        );
    }

    return NextResponse.next();
}