import { NextRequest, NextResponse } from "next/server";
import { AuthResult } from "./api/auth";
import { authStorage } from "./lib/storage";
import { logout } from "./service/auth";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

function signin(request: NextRequest, authResult: AuthResult | undefined) {
  if (!authResult) return NextResponse.next();
  return NextResponse.redirect(new URL("/", request.nextUrl));
}

async function signout(
  request: NextRequest,
  authResult: AuthResult | undefined
) {
  await logout();
  const response = NextResponse.redirect(new URL("/signin", request.nextUrl));
  response.cookies.delete("auth");
  return response;
}

export async function middleware(request: NextRequest) {
  const authResult = await authStorage().get();

  if (request.nextUrl.pathname == "/signin") {
    return signin(request, authResult);
  }
  if (request.nextUrl.pathname == "/signout") {
    return await signout(request, authResult);
  }

  return NextResponse.next();

  // if (!authResult)
  //   return NextResponse.redirect(new URL("/signin", request.nextUrl));

  // Need refresh - check jwt exp field
  // const needRefresh = await authStorageService.needRefresh({ cookies });
  // if (!needRefresh) {
  //   return NextResponse.next();
  // }
  // return refresh(request, authResult);
}
