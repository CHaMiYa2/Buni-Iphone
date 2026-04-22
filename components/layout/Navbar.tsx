"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Trade-In", href: "/trade-in" },
  { name: "Repair", href: "/repair" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // To prevent hydration mismatch for persisted store
  const [mounted, setMounted] = useState(false);
  const cartItemsCount = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-[#080808]/85 backdrop-blur-[20px] border-b border-[rgba(255,255,255,0.07)]">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        
        {/* Logo */}
        <Link 
          href="/" 
          className="font-display text-2xl text-[var(--color-accent)] font-medium tracking-wide"
        >
          Buni Iphone
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/");
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-[13px] uppercase tracking-[0.06em] transition-colors duration-300",
                  isActive ? "text-white" : "text-[var(--color-muted)] hover:text-white"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link 
            href="/cart" 
            className="flex items-center gap-2 text-[13px] uppercase tracking-[0.06em] text-[var(--color-muted)] hover:text-white transition-colors"
          >
            <span className="hidden sm:inline">Cart</span>
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              {mounted && cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[var(--color-accent)] text-[9px] font-bold text-black">
                  {cartItemsCount}
                </span>
              )}
            </div>
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-[#080808] z-40 flex flex-col p-6 animate-fade-up">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/");
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-2xl font-display tracking-wide",
                    isActive ? "text-[var(--color-accent)]" : "text-white"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
