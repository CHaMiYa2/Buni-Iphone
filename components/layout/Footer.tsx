import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.07)] bg-[#080808] pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div>
          <Link href="/" className="font-display text-2xl text-[var(--color-accent)] font-medium tracking-wide mb-6 inline-block">
            Buni Iphone
          </Link>
          <p className="text-[var(--color-muted)] text-sm leading-relaxed mb-6">
            Your trusted source for premium iPhones in Sri Lanka. Experience uncompromising quality, 12-month warranties, and exceptional service.
          </p>
        </div>

        <div>
          <h4 className="text-white font-medium mb-6 tracking-wide">Shop</h4>
          <ul className="space-y-4 text-sm text-[var(--color-muted)]">
            <li><Link href="/shop?filter=New" className="hover:text-white transition-colors">New iPhones</Link></li>
            <li><Link href="/shop?filter=Refurbished" className="hover:text-white transition-colors">Refurbished iPhones</Link></li>
            <li><Link href="/shop?filter=Used" className="hover:text-white transition-colors">Pre-Owned iPhones</Link></li>
            <li><Link href="/shop?model=15" className="hover:text-white transition-colors">iPhone 15 Series</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-6 tracking-wide">Services</h4>
          <ul className="space-y-4 text-sm text-[var(--color-muted)]">
            <li><Link href="/trade-in" className="hover:text-white transition-colors">Trade-In Estimator</Link></li>
            <li><Link href="/repair" className="hover:text-white transition-colors">Repair Center</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">Our Story</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-6 tracking-wide">Contact</h4>
          <ul className="space-y-4 text-sm text-[var(--color-muted)]">
            <li>Level 3, One Galle Face Tower<br />Colombo 02, Sri Lanka</li>
            <li><a href="tel:+94112345678" className="hover:text-[var(--color-accent)] transition-colors">+94 11 234 5678</a></li>
            <li><a href="mailto:hello@buniiphone.lk" className="hover:text-[var(--color-accent)] transition-colors">hello@buniiphone.lk</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-[rgba(255,255,255,0.07)] flex flex-col md:flex-row justify-between items-center text-xs text-[var(--color-muted)]">
        <p>&copy; {new Date().getFullYear()} Buni Iphone. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-white transition-colors">Warranty Info</Link>
        </div>
      </div>
    </footer>
  );
}
