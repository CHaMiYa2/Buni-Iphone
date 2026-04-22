import { Metadata } from "next";
import Image from "next/image";
import { FAQAccordion } from "@/components/about/FAQAccordion";

export const metadata: Metadata = {
  title: "Our Story | Buni Iphone",
  description: "Learn about Buni Iphone's mission to redefine the premium iPhone experience in Sri Lanka.",
};

const TEAM = [
  { name: "Avishka Fernando", role: "Founder & CEO", img: "https://res.cloudinary.com/demo/image/upload/v1/user_1.jpg" },
  { name: "Sarah Silva", role: "Head of Operations", img: "https://res.cloudinary.com/demo/image/upload/v1/user_2.jpg" },
  { name: "Dilshan Perera", role: "Lead Technician", img: "https://res.cloudinary.com/demo/image/upload/v1/user_3.jpg" },
];

export default function AboutPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* Manifesto Hero */}
      <section className="py-24 md:py-32 px-4 flex justify-center items-center text-center min-h-[60vh] bg-[#080808]">
        <div className="max-w-4xl mx-auto">
          <blockquote className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight font-light text-white mb-8">
            "We believe that premium technology should be accessible, reliable, and backed by unwavering trust."
          </blockquote>
          <p className="text-[var(--color-accent)] tracking-[0.2em] uppercase text-sm font-medium">The Buni Iphone Manifesto</p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-4xl mb-6">Redefining the standard.</h2>
            <div className="space-y-6 text-[var(--color-muted)] leading-relaxed">
              <p>
                Founded in Colombo, Buni Iphone started with a simple observation: buying an iPhone in Sri Lanka was often fraught with uncertainty. Inconsistent quality, lack of warranty, and questionable origins made the experience stressful rather than exciting.
              </p>
              <p>
                We set out to change that. By establishing rigorous 40-point quality checks, partnering directly with certified suppliers, and offering a steadfast 12-month warranty on every device, we've removed the anxiety from the equation.
              </p>
              <p>
                Today, Buni Iphone isn't just a store; it's a standard of excellence. Whether you're buying a brand new iPhone 15 Pro Max or trading in your trusty iPhone 13, you can expect the same premium, transparent, and seamless experience.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#111111] p-8 rounded-3xl border border-[rgba(255,255,255,0.05)] text-center flex flex-col justify-center aspect-square">
              <span className="font-display text-5xl text-[var(--color-accent)] mb-2">40+</span>
              <span className="text-sm uppercase tracking-wider text-[var(--color-muted)]">Point Inspection</span>
            </div>
            <div className="bg-[#111111] p-8 rounded-3xl border border-[rgba(255,255,255,0.05)] text-center flex flex-col justify-center aspect-square mt-12">
              <span className="font-display text-5xl text-[var(--color-accent)] mb-2">12m</span>
              <span className="text-sm uppercase tracking-wider text-[var(--color-muted)]">Warranty</span>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-[#080808] border-y border-[rgba(255,255,255,0.05)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl mb-4">The People Behind the Vault</h2>
            <p className="text-[var(--color-muted)]">Dedicated professionals committed to your premium experience.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {TEAM.map((member, i) => (
              <div key={i} className="text-center group">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 border border-[rgba(255,255,255,0.1)] group-hover:border-[var(--color-accent)]">
                  <Image src={member.img} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-medium mb-1 group-hover:text-[var(--color-accent)] transition-colors">{member.name}</h3>
                <p className="text-[var(--color-muted)] text-sm uppercase tracking-wider">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl mb-4">Frequently Asked Questions</h2>
          <p className="text-[var(--color-muted)]">Everything you need to know about buying from Buni Iphone.</p>
        </div>
        
        <FAQAccordion />
      </section>
    </div>
  );
}
