"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { Button } from "@/components/ui/Button";
import { Minus, Plus, Trash2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, updateQuantity, removeItem, getSubtotal } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = getSubtotal();
  const delivery = 500;
  const total = subtotal + (items.length > 0 ? delivery : 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      
      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Failed to initiate checkout");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4 py-24 bg-[#0a0a0a]">
        <h1 className="font-display text-4xl mb-6">Your Cart is Empty</h1>
        <p className="text-[var(--color-muted)] mb-8">Looks like you haven't added any products to your cart yet.</p>
        <Button asChild size="lg">
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="font-display text-4xl md:text-5xl mb-12">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-8">
            <div className="hidden md:grid grid-cols-6 gap-4 pb-4 border-b border-[rgba(255,255,255,0.05)] text-sm uppercase tracking-wider text-[var(--color-muted)]">
              <div className="col-span-3">Product</div>
              <div className="text-center">Quantity</div>
              <div className="text-right col-span-2">Total</div>
            </div>

            {items.map((item, idx) => (
              <div key={`${item.product_id}-${item.storage}-${item.color}-${idx}`} className="flex flex-col md:grid md:grid-cols-6 gap-6 items-center py-6 border-b border-[rgba(255,255,255,0.05)]">
                {/* Product Info */}
                <div className="col-span-3 w-full flex items-center gap-6">
                  <div className="relative w-24 h-24 bg-[#111111] rounded-xl overflow-hidden shrink-0">
                    <Image src={item.image || "https://res.cloudinary.com/demo/image/upload/v1/iphone-placeholder.png"} alt={item.name} fill className="object-contain p-2" />
                  </div>
                  <div>
                    <Link href={`/shop/${item.product_id}`} className="text-lg font-medium hover:text-[var(--color-accent)] transition-colors line-clamp-1 mb-1">
                      {item.name}
                    </Link>
                    <p className="text-sm text-[var(--color-muted)] mb-2">
                      {item.storage} • {item.color}
                    </p>
                    <button 
                      onClick={() => removeItem(item.product_id, item.storage, item.color)}
                      className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>

                {/* Quantity */}
                <div className="w-full md:w-auto flex justify-between md:justify-center items-center">
                  <span className="md:hidden text-sm text-[var(--color-muted)]">Quantity</span>
                  <div className="flex items-center gap-3 border border-[rgba(255,255,255,0.1)] rounded-full px-3 py-1.5 bg-[#111111]">
                    <button onClick={() => updateQuantity(item.product_id, item.storage, item.color, item.qty - 1)} className="p-1 hover:text-[var(--color-accent)] transition-colors disabled:opacity-50" disabled={item.qty <= 1}>
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-4 text-center text-sm">{item.qty}</span>
                    <button onClick={() => updateQuantity(item.product_id, item.storage, item.color, item.qty + 1)} className="p-1 hover:text-[var(--color-accent)] transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="w-full md:w-auto flex justify-between md:justify-end md:col-span-2 items-center">
                  <span className="md:hidden text-sm text-[var(--color-muted)]">Total</span>
                  <span className="text-lg">{formatPrice(item.price * item.qty)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#111111] border border-[rgba(255,255,255,0.05)] rounded-3xl p-8 sticky top-24">
              <h2 className="text-xl font-medium mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--color-muted)]">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-muted)]">Delivery (Colombo)</span>
                  <span>{formatPrice(delivery)}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-[rgba(255,255,255,0.05)] mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-base font-medium">Total</span>
                  <span className="font-display text-3xl text-[var(--color-accent)]">{formatPrice(total)}</span>
                </div>
              </div>

              <Button 
                onClick={handleCheckout} 
                className="w-full py-6 text-base rounded-xl"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Proceed to Checkout"}
              </Button>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[var(--color-muted)]">
                <ShieldCheck className="w-4 h-4" /> Secure checkout powered by Stripe
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
