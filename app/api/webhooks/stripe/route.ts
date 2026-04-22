import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';
import { resend } from '@/lib/resend';

// Use service role key to bypass RLS for webhook operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy_key'
);

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    
    // Parse items from metadata
    let items = [];
    try {
      items = JSON.parse(session.metadata.items_json);
    } catch (e) {
      console.error("Failed to parse items from metadata", e);
    }

    // 1. Insert order into Supabase
    const { data: orderData, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert([
        {
          items: items,
          total: session.amount_total / 100, // Convert back from cents
          stripe_id: session.id,
          status: 'confirmed',
          delivery_address: session.customer_details?.address ? JSON.stringify(session.customer_details.address) : null,
        }
      ])
      .select('id')
      .single();

    if (orderError) {
      console.error("Failed to insert order:", orderError);
    }

    // 2. Decrement stock for each item
    for (const item of items) {
      const { data: product } = await supabaseAdmin
        .from('products')
        .select('stock')
        .eq('id', item.product_id)
        .single();
        
      if (product) {
        await supabaseAdmin
          .from('products')
          .update({ stock: Math.max(0, product.stock - item.qty) })
          .eq('id', item.product_id);
      }
    }

    // 3. Send order confirmation email
    if (session.customer_details?.email) {
      try {
        await resend.emails.send({
          from: 'Buni Iphone <orders@buniiphone.lk>', // Note: requires verified domain on Resend
          to: session.customer_details.email,
          subject: 'Your Buni Iphone Order Confirmation',
          html: `
            <h1>Thank you for your order!</h1>
            <p>Your order has been confirmed and is being processed.</p>
            <p><strong>Order ID:</strong> ${orderData?.id || session.id}</p>
            <p><strong>Total:</strong> Rs. ${session.amount_total / 100}</p>
            <h3>Items:</h3>
            <ul>
              ${items.map((i: any) => `<li>${i.qty}x ${i.name} (${i.storage}, ${i.color})</li>`).join('')}
            </ul>
            <p>We will notify you once your order is shipped.</p>
          `
        });
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
      }
    }
  }

  return NextResponse.json({ received: true });
}
