import { stripe } from "@/lib/stripe";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default async function CheckoutSuccessPage(props: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const searchParams = await props.searchParams;
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-24 bg-[#0a0a0a]">
        <h1 className="text-2xl mb-4">Invalid Session</h1>
        <Button asChild><Link href="/">Return Home</Link></Button>
      </div>
    );
  }

  let session;
  let items = [];
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.metadata?.items_json) {
      items = JSON.parse(session.metadata.items_json);
    }
  } catch (e) {
    console.error(e);
  }

  if (!session) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-24 bg-[#0a0a0a]">
        <h1 className="text-2xl mb-4">Session Not Found</h1>
        <Button asChild><Link href="/">Return Home</Link></Button>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Estimate delivery: next day for Colombo
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 1);
  const formattedDate = deliveryDate.toLocaleDateString('en-LK', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="bg-[#0a0a0a] min-h-screen py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] mb-8">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        
        <h1 className="font-display text-4xl md:text-5xl mb-4">Order Confirmed</h1>
        <p className="text-[var(--color-muted)] text-lg mb-12">
          Thank you for your purchase. We've sent a confirmation email with your order details.
        </p>

        <div className="bg-[#111111] border border-[rgba(255,255,255,0.05)] rounded-3xl p-8 text-left mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-[rgba(255,255,255,0.05)]">
            <div>
              <p className="text-sm text-[var(--color-muted)] mb-1">Order Reference</p>
              <p className="font-medium text-white">{session.id.slice(-8).toUpperCase()}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--color-muted)] mb-1">Estimated Delivery</p>
              <p className="font-medium text-[var(--color-accent)]">{formattedDate}</p>
            </div>
          </div>

          <h3 className="font-medium text-white mb-6">Order Items</h3>
          <div className="space-y-4 mb-8">
            {items.map((item: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-4">
                  <span className="text-[var(--color-muted)]">{item.qty}x</span>
                  <span>{item.name} <span className="text-[var(--color-muted)]">({item.storage}, {item.color})</span></span>
                </div>
                <span>{formatPrice(item.price * item.qty)}</span>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-[rgba(255,255,255,0.05)] flex justify-between items-center">
            <span className="font-medium">Total Paid</span>
            <span className="font-display text-2xl text-[var(--color-accent)]">
              {session.amount_total ? formatPrice(session.amount_total / 100) : 'N/A'}
            </span>
          </div>
        </div>

        <Button asChild size="lg">
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
