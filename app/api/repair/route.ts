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
      .from('repair_bookings')
      .insert([{
        name: data.name,
        phone: data.phone,
        iphone_model: data.iphone_model,
        service_type: data.service_type,
        service_price: data.service_price,
        preferred_date: data.preferred_date,
      }]);

    if (error) {
      console.error("Supabase insert error:", error);
      throw new Error("Database error");
    }

    // 2. Send Email using Resend
    await resend.emails.send({
      from: 'Buni Iphone <notifications@buniiphone.lk>',
      to: 'hello@buniiphone.lk', // Admin email
      subject: `New Repair Booking: ${data.iphone_model}`,
      html: `
        <h2>New Repair Booking</h2>
        <p><strong>Customer:</strong> ${data.name}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Device:</strong> ${data.iphone_model}</p>
        <p><strong>Service:</strong> ${data.service_type} (Est. Rs. ${data.service_price})</p>
        <p><strong>Preferred Date:</strong> ${data.preferred_date}</p>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Repair API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
