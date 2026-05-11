'use server';

import { supabaseAdmin } from '@/lib/supabase-admin';

export async function sendMessage(formData: FormData) {

  const name    = formData.get('name')    as string;
  const email   = formData.get('email')   as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { success: false, error: 'All fields are required.' };
  }

  const { error } = await supabaseAdmin
    .from('messages')
    .insert([{ name, email, message }]);

  if (error) {
    console.error('Supabase error:', error);
    return { success: false, error: 'Failed to send. Please try again.' };
  }

  return { success: true };
}
