'use server';
import { cookies } from 'next/headers';

export async function loginAdmin(password: string) {
  const correctPassword = process.env.ADMIN_PASSWORD || 'VibeCoder2026';
  
  if (password === correctPassword) {
    // Set a secure HTTP-only cookie
    (await cookies()).set('admin_token', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });
    return { success: true };
  }
  return { success: false, error: 'Incorrect password' };
}

export async function logoutAdmin() {
  (await cookies()).delete('admin_token');
  return { success: true };
}

export async function checkAuth() {
  return (await cookies()).has('admin_token');
}
