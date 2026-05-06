import { NextResponse } from 'next/server';

function unauthorized() {
  return new NextResponse('Passwort erforderlich', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="EKY Builder", charset="UTF-8"',
      'Cache-Control': 'no-store'
    }
  });
}

export function middleware(request) {
  const user = process.env.BASIC_AUTH_USER;
  const password = process.env.BASIC_AUTH_PASSWORD;

  if (!user || !password) {
    return new NextResponse('BASIC_AUTH_USER und BASIC_AUTH_PASSWORD sind noch nicht gesetzt. Bitte in Vercel unter Project Settings → Environment Variables eintragen.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' }
    });
  }

  const auth = request.headers.get('authorization');
  if (!auth || !auth.startsWith('Basic ')) return unauthorized();

  try {
    const decoded = atob(auth.slice('Basic '.length));
    const separator = decoded.indexOf(':');
    const givenUser = decoded.slice(0, separator);
    const givenPassword = decoded.slice(separator + 1);

    if (givenUser === user && givenPassword === password) {
      const response = NextResponse.next();
      response.headers.set('Cache-Control', 'no-store');
      return response;
    }
  } catch (_) {}

  return unauthorized();
}

export const config = {
  matcher: ['/', '/builder/:path*']
};
