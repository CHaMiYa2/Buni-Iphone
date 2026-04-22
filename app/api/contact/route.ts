import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { resend } from '@/lib/resend';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy_key';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 1. Insert into Supabase
    const { error } = await supabase
      .from('contact_messages')
      .insert([{
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      }]);

    if (error) {
      console.error("Supabase insert error:", error);
      throw new Error("Database error");
    }

    // 2. Send Email using Resend
    await resend.emails.send({
      from: 'Buni Iphone <notifications@buniiphone.lk>',
      to: 'hello@buniiphone.lk', // Admin email
      replyTo: data.email,
      subject: `Contact Form: ${data.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <h3>Message:</h3>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
