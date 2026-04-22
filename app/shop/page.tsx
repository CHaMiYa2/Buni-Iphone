import { supabase } from "@/lib/supabase";
import { ProductGrid } from "@/components/product/ProductGrid";

export const revalidate = 60; // revalidate every minute

export const metadata = {
  title: "Shop iPhones | Buni Iphone",
  description: "Browse our collection of premium new, refurbished, and pre-owned iPhones in Sri Lanka.",
};

export default async function ShopPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const filter = typeof searchParams?.filter === 'string' ? searchParams.filter : undefined;
  const model = typeof searchParams?.model === 'string' ? `iPhone ${searchParams.model} Series` : undefined;

  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
  }

  let initialFilter = "All";
  if (filter && ["New", "Refurbished", "Used"].includes(filter)) {
    initialFilter = filter;
  } else if (model) {
    initialFilter = model;
  }

  return (
    <div className="flex-1 bg-[#0a0a0a]">
      {/* Header */}
      <div className="bg-[#080808] border-b border-[rgba(255,255,255,0.05)] pt-16 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-light mb-4">The Collection</h1>
          <p className="text-[var(--color-muted)] max-w-xl">
            Explore our curated selection of premium iPhones. Every device is tested, unlocked, and backed by our 12-month warranty.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <ProductGrid 
          initialProducts={products || []} 
          initialFilter={initialFilter} 
        />
      </div>
    </div>
  );
}
