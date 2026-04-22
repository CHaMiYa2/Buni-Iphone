import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { useCartStore } from "@/lib/cart-store";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  old_price?: number | null;
  badge?: string | null;
  images: string[];
  condition: string;
  storage: string[];
  colors: string[];
}

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      product_id: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
      storage: product.storage[0] || '128GB',
      color: product.colors[0] || 'Default',
      image: product.images[0] || '',
    });
    toast.success(`${product.name} added to cart`);
  };

  const formattedPrice = new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 0,
  }).format(product.price);

  const formattedOldPrice = product.old_price 
    ? new Intl.NumberFormat('en-LK', {
        style: 'currency',
        currency: 'LKR',
        minimumFractionDigits: 0,
      }).format(product.old_price)
    : null;

  return (
    <Link href={`/shop/${product.id}`} className="group block bg-[#111111] rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.15)] transition-all duration-300">
      <div className="relative aspect-square p-6 flex items-center justify-center bg-[#151515]">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {product.badge && (
            <Badge variant={product.badge.toLowerCase() as any}>{product.badge}</Badge>
          )}
        </div>
        
        {/* Image */}
        <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500">
          <Image
            src={product.images[0] || "https://res.cloudinary.com/demo/image/upload/v1/iphone-placeholder.png"}
            alt={product.name}
            fill
            className="object-contain drop-shadow-2xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-display text-xl text-white mb-2 group-hover:text-[var(--color-accent)] transition-colors">{product.name}</h3>
        <p className="text-[var(--color-muted)] text-sm mb-4">{product.condition} • {product.storage.length} Storage Options</p>
        
        <div className="flex items-end justify-between mt-auto">
          <div>
            <div className="text-[var(--color-accent)] font-medium text-lg">
              {formattedPrice}
            </div>
            {formattedOldPrice && (
              <div className="text-[var(--color-muted)] text-sm line-through decoration-[var(--color-muted)]">
                {formattedOldPrice}
              </div>
            )}
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="h-10 w-10 rounded-full bg-[#181818] flex items-center justify-center hover:bg-[var(--color-accent)] hover:text-black transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}
