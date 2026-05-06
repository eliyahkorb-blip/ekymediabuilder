import { NextResponse } from "next/server";

export function middleware(request) {
  const user = process.env.BASIC_AUTH_USER;
  const password = process.env.BASIC_AUTH_PASSWORD;

  if (!user || !password) {
    return new NextResponse("Missing auth env vars", { status: 500 });
  }

  const auth = request.headers.get("authorization");
  const expected = "Basic " + btoa(`${user}:${password}`);

  if (auth !== expected) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
