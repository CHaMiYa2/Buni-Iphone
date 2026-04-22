"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/lib/cart-store";
import { toast } from "sonner";
import { Check } from "lucide-react";

interface AddToCartFormProps {
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
    storage: string[];
    colors: string[];
  };
}

export function AddToCartForm({ product }: AddToCartFormProps) {
  const [selectedStorage, setSelectedStorage] = useState(product.storage[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "");
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      product_id: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
      storage: selectedStorage,
      color: selectedColor,
      image: product.images[0] || "",
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="space-y-8">
      {/* Storage Selector */}
      {product.storage && product.storage.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-white mb-3 tracking-wide">Storage</h3>
          <div className="flex flex-wrap gap-3">
            {product.storage.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedStorage(s)}
                className={`px-6 py-3 rounded-xl border text-sm font-medium transition-all ${
                  selectedStorage === s
                    ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                    : "border-[rgba(255,255,255,0.1)] text-[var(--color-muted)] hover:border-[rgba(255,255,255,0.3)] hover:text-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color Selector */}
      {product.colors && product.colors.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-white mb-3 tracking-wide">Color</h3>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedColor(c)}
                className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-all flex items-center gap-2 ${
                  selectedColor === c
                    ? "border-white text-white"
                    : "border-[rgba(255,255,255,0.1)] text-[var(--color-muted)] hover:border-[rgba(255,255,255,0.3)] hover:text-white"
                }`}
              >
                {selectedColor === c && <Check className="w-4 h-4" />}
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add to Cart */}
      <div className="pt-6 border-t border-[rgba(255,255,255,0.05)]">
        <Button onClick={handleAddToCart} size="lg" className="w-full text-base py-6 rounded-xl">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export function ImageGallery({ images, name }: { images: string[], name: string }) {
  const [mainImage, setMainImage] = useState(images[0] || "");

  return (
    <div className="flex flex-col gap-4 sticky top-24">
      <div className="relative aspect-square w-full bg-[#111111] rounded-3xl overflow-hidden border border-[rgba(255,255,255,0.05)] p-8">
        <Image
          src={mainImage || "https://res.cloudinary.com/demo/image/upload/v1/iphone-placeholder.png"}
          alt={name}
          fill
          className="object-contain drop-shadow-2xl"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button 
              key={i} 
              onClick={() => setMainImage(img)}
              className={`relative w-20 h-20 shrink-0 bg-[#111111] rounded-xl overflow-hidden border transition-colors ${
                mainImage === img ? "border-[var(--color-accent)]" : "border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.3)]"
              }`}
            >
              <Image src={img} alt={`${name} view ${i+1}`} fill className="object-contain p-2" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
