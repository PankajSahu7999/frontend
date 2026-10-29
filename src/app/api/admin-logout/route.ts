import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete('crb_admin_token');

  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  
  // Set expired cookie in response headers for maximum cross-browser compatibility
  response.cookies.set({
    name: 'crb_admin_token',
    value: '',
    path: '/',
    maxAge: 0,
    expires: new Date(0),
    sameSite: 'lax',
  });

  return response;
}
