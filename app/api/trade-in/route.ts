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
      .from('trade_ins')
      .insert([{
        name: data.name,
        phone: data.phone,
        model: data.modelName,
        storage: data.storage,
        condition: data.condition,
        estimated_value: data.estimated_value,
        pickup_address: data.pickup_address,
      }]);

    if (error) {
      console.error("Supabase insert error:", error);
      throw new Error("Database error");
    }

    // 2. Send Email using Resend
    // We send this to the business owner, or the customer if email was provided.
    // Since email isn't in the form, we'll send a notification to the admin.
    await resend.emails.send({
      from: 'Buni Iphone <notifications@buniiphone.lk>',
      to: 'hello@buniiphone.lk', // Admin email
      subject: `New Trade-In Request: ${data.modelName}`,
      html: `
        <h2>New Trade-In Request</h2>
        <p><strong>Customer:</strong> ${data.name}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Device:</strong> ${data.modelName} (${data.storage})</p>
        <p><strong>Condition:</strong> ${data.condition}</p>
        <p><strong>Estimated Value:</strong> Rs. ${data.estimated_value}</p>
        <p><strong>Pickup Address:</strong> ${data.pickup_address}</p>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Trade-in API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
