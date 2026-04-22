import { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Buni Iphone",
  description: "Get in touch with Buni Iphone for inquiries, support, or warranty claims.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* Header */}
      <div className="bg-[#080808] border-b border-[rgba(255,255,255,0.05)] pt-16 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-light mb-4">Get in Touch</h1>
          <p className="text-[var(--color-muted)] max-w-xl text-lg">
            Whether you have a question about a product, need help with an order, or want to make a warranty claim, we're here to help.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info Left */}
          <div>
            <h2 className="font-display text-3xl mb-8">Contact Information</h2>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#111111] border border-[rgba(255,255,255,0.05)] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[var(--color-accent)]" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Visit Us</h4>
                  <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                    Level 3, One Galle Face Tower<br />
                    Colombo 02, Sri Lanka
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#111111] border border-[rgba(255,255,255,0.05)] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[var(--color-accent)]" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Call Us</h4>
                  <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                    <a href="tel:+94112345678" className="hover:text-white transition-colors">+94 11 234 5678</a><br />
                    <a href="tel:+94771234567" className="hover:text-white transition-colors">+94 77 123 4567</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#111111] border border-[rgba(255,255,255,0.05)] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[var(--color-accent)]" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Email Us</h4>
                  <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                    <a href="mailto:hello@buniiphone.lk" className="hover:text-white transition-colors">hello@buniiphone.lk</a><br />
                    <a href="mailto:support@buniiphone.lk" className="hover:text-white transition-colors">support@buniiphone.lk</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#111111] border border-[rgba(255,255,255,0.05)] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[var(--color-accent)]" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Opening Hours</h4>
                  <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                    Mon - Sat: 10:00 AM - 8:00 PM<br />
                    Sunday: 10:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Right */}
          <div className="bg-[#111111] border border-[rgba(255,255,255,0.05)] rounded-3xl p-6 md:p-10">
            <h2 className="text-2xl font-medium mb-6">Send a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
