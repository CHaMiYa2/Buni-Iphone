import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { supabase } from "@/lib/supabase";
import { ShieldCheck, Truck, RefreshCw, CreditCard, PenTool, Star } from "lucide-react";

export const revalidate = 60; // revalidate every minute

export default async function Home() {
  const { data: featuredProducts } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .limit(4);

  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 overflow-hidden pt-16">
        {/* Background glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-[var(--color-accent)] opacity-[0.03] blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="text-center z-10 max-w-4xl mx-auto flex flex-col items-center animate-fade-up">
          <span className="text-[var(--color-accent)] uppercase tracking-[0.2em] text-xs font-semibold mb-6 block">
            Premium Apple Experience
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light mb-6 leading-[1.1] tracking-tight">
            The standard for <br />
            <span className="italic text-[var(--color-accent)]">premium</span> iPhones.
          </h1>
          <p className="text-[var(--color-muted)] text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Discover a curated collection of new, refurbished, and pre-owned iPhones. Backed by a 12-month warranty and delivered to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/shop">Browse Collection</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-[#080808]">
              <Link href="/trade-in">Trade In Your iPhone</Link>
            </Button>
          </div>
        </div>

        {/* Hero Mini Cards */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl z-10 px-4 animate-fade-up delay-300">
          {[
            { model: "iPhone 13", tag: "Best Value", img: "https://res.cloudinary.com/demo/image/upload/v1/iphone-13-midnight.png", offset: "mt-0 md:mt-12" },
            { model: "iPhone 15 Pro", tag: "Titanium", img: "https://res.cloudinary.com/demo/image/upload/v1/iphone-15-pro-max.png", offset: "mt-0 md:-mt-8 scale-105" },
            { model: "iPhone 14", tag: "Most Popular", img: "https://res.cloudinary.com/demo/image/upload/v1/iphone-14-midnight.png", offset: "mt-0 md:mt-12" }
          ].map((item, i) => (
            <Link href={`/shop?model=${item.model.split(' ')[1]}`} key={i} className={`group bg-[#111111] border border-[rgba(255,255,255,0.05)] rounded-2xl p-6 flex flex-col items-center hover:border-[var(--color-accent)] transition-all duration-500 ${item.offset}`}>
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-2">{item.tag}</span>
              <h3 className="font-display text-2xl text-white mb-6 group-hover:text-[var(--color-accent)] transition-colors">{item.model}</h3>
              <div className="relative w-40 h-48 transform group-hover:scale-110 transition-transform duration-700 ease-out">
                <Image src={item.img} alt={item.model} fill className="object-contain drop-shadow-2xl" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* STATS BAND */}
      <section className="border-y border-[rgba(255,255,255,0.07)] bg-[#0a0a0a] py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[rgba(255,255,255,0.05)]">
          {[
            { value: "8,400+", label: "Happy Customers" },
            { value: "12mo", label: "Warranty Included" },
            { value: "4.9★", label: "Average Rating" },
            { value: "24h", label: "Same-Day Delivery" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center">
              <span className="font-display text-3xl md:text-4xl text-[var(--color-accent)] mb-2">{stat.value}</span>
              <span className="text-xs uppercase tracking-wider text-[var(--color-muted)]">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-24 md:py-32 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl mb-4">Why choose Buni Iphone?</h2>
          <p className="text-[var(--color-muted)]">We've reimagined the process of buying an iPhone in Sri Lanka to be transparent, secure, and purely premium.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: ShieldCheck, title: "Verified & Unlocked", desc: "Every device undergoes a 40-point inspection and is factory unlocked for all networks." },
            { icon: Star, title: "12-Month Warranty", desc: "Sleep easy. We cover manufacturer defects and hardware issues for a full year." },
            { icon: Truck, title: "Same-Day Delivery", desc: "Order before 2 PM in Colombo and get your new iPhone delivered by evening." },
            { icon: RefreshCw, title: "Hassle-Free Trade-In", desc: "Upgrade effortlessly. Get an instant estimate and we'll pick up your old phone." },
            { icon: CreditCard, title: "Flexible Payment", desc: "Pay securely online, on delivery, or split into easy monthly installments." },
            { icon: PenTool, title: "Expert Repair Centre", desc: "Genuine parts and certified technicians to keep your iPhone running perfectly." }
          ].map((feature, i) => (
            <div key={i} className="bg-[#111111] border border-[rgba(255,255,255,0.05)] p-8 rounded-2xl hover:bg-[#151515] transition-colors">
              <feature.icon className="w-8 h-8 text-[var(--color-accent)] mb-6" strokeWidth={1.5} />
              <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
              <p className="text-[var(--color-muted)] leading-relaxed text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-24 bg-[#0a0a0a] border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="font-display text-4xl md:text-5xl mb-4">Featured Collection</h2>
              <p className="text-[var(--color-muted)] max-w-xl">Handpicked devices that offer the perfect balance of performance, condition, and value.</p>
            </div>
            <Link href="/shop" className="text-[var(--color-accent)] text-sm tracking-wide uppercase font-medium hover:underline underline-offset-4 shrink-0">
              View All Products
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts && featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {(!featuredProducts || featuredProducts.length === 0) && (
              <div className="col-span-full py-12 text-center text-[var(--color-muted)]">
                No featured products found. Please run the seed.sql script in your Supabase dashboard.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
