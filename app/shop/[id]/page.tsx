import { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/Badge";
import { AddToCartForm, ImageGallery } from "@/components/product/ProductInteractive";
import { Truck, ShieldCheck, CheckCircle2 } from "lucide-react";

export const revalidate = 60;

// Fetch product data for metadata
export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | Buni Iphone`,
    description: `Buy ${product.name} (${product.condition}) in Sri Lanka. 12-month warranty, same-day delivery.`,
    openGraph: {
      title: `${product.name} | Buni Iphone`,
      description: `Buy ${product.name} in Sri Lanka at the best price.`,
      images: [product.images[0]],
    }
  };
}

export default async function ProductDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!product) {
    notFound();
  }

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

  // JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: `Buy ${product.name} in Sri Lanka.`,
    brand: {
      '@type': 'Brand',
      name: 'Apple'
    },
    offers: {
      '@type': 'Offer',
      url: `https://buniiphone.lk/shop/${product.id}`,
      priceCurrency: 'LKR',
      price: product.price,
      itemCondition: product.condition === 'New' ? 'https://schema.org/NewCondition' : 'https://schema.org/UsedCondition',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    }
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left Column: Image Gallery */}
          <div className="relative">
            <ImageGallery images={product.images} name={product.name} />
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col pt-4">
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant={product.condition.toLowerCase() as any}>{product.condition}</Badge>
                {product.badge && product.badge !== product.condition && (
                  <Badge variant={product.badge.toLowerCase() as any}>{product.badge}</Badge>
                )}
                {product.stock > 0 && (
                  <span className="flex items-center gap-1.5 text-xs text-green-400 font-medium tracking-wide uppercase">
                    <CheckCircle2 className="w-3.5 h-3.5" /> In stock · Ships today
                  </span>
                )}
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-end gap-4 mb-8 pb-8 border-b border-[rgba(255,255,255,0.05)]">
                <span className="font-display text-4xl text-[var(--color-accent)]">{formattedPrice}</span>
                {formattedOldPrice && (
                  <span className="text-xl text-[var(--color-muted)] line-through decoration-[var(--color-muted)] mb-1">
                    {formattedOldPrice}
                  </span>
                )}
              </div>

              {/* Interactive Form */}
              <AddToCartForm product={product} />

              {/* Guarantees */}
              <div className="mt-12 bg-[#111111] border border-[rgba(255,255,255,0.05)] rounded-2xl p-6 grid gap-6">
                <div className="flex gap-4">
                  <ShieldCheck className="w-6 h-6 text-[var(--color-accent)] shrink-0" />
                  <div>
                    <h4 className="text-white font-medium mb-1">12-Month Warranty</h4>
                    <p className="text-sm text-[var(--color-muted)]">Comprehensive coverage for hardware defects and faults.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Truck className="w-6 h-6 text-[var(--color-accent)] shrink-0" />
                  <div>
                    <h4 className="text-white font-medium mb-1">Same-Day Delivery</h4>
                    <p className="text-sm text-[var(--color-muted)]">Order before 2 PM for evening delivery in Colombo.</p>
                  </div>
                </div>
              </div>

              {/* Specs Table */}
              {product.specs && (
                <div className="mt-12">
                  <h3 className="text-xl text-white mb-6">Technical Specifications</h3>
                  <div className="divide-y divide-[rgba(255,255,255,0.05)] border-y border-[rgba(255,255,255,0.05)]">
                    {Object.entries(product.specs as Record<string, string>).map(([key, value]) => (
                      <div key={key} className="py-4 grid grid-cols-3 gap-4">
                        <span className="text-[var(--color-muted)] text-sm">{key}</span>
                        <span className="col-span-2 text-white text-sm">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
