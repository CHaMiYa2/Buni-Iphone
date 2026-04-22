import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const deliveryFee = 500; // Fixed delivery for Colombo

    const line_items = items.map((item: any) => ({
      price_data: {
        currency: 'lkr',
        product_data: {
          name: `${item.name} - ${item.storage} (${item.color})`,
          images: item.image ? [item.image] : [],
          metadata: {
            product_id: item.product_id,
            storage: item.storage,
            color: item.color
          }
        },
        unit_amount: item.price * 100, // Stripe expects amounts in cents/smallest currency unit
      },
      quantity: item.qty,
    }));

    // Add delivery fee as a line item
    line_items.push({
      price_data: {
        currency: 'lkr',
        product_data: {
          name: 'Delivery (Colombo)',
        },
        unit_amount: deliveryFee * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/cart`,
      metadata: {
        items_json: JSON.stringify(items),
      }
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
