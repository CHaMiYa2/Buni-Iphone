"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  iphone_model: z.string().min(1, "Please enter your iPhone model"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  preferred_date: z.string().min(1, "Please select a preferred date"),
});

type FormData = z.infer<typeof schema>;

const SERVICES = [
  { id: "screen", name: "Screen Replacement", price: 14500, icon: "📱" },
  { id: "battery", name: "Battery Replacement", price: 6500, icon: "🔋" },
  { id: "port", name: "Charging Port", price: 5500, icon: "🔌" },
  { id: "backglass", name: "Back Glass Repair", price: 12000, icon: "🔍" },
  { id: "water", name: "Water Damage Repair", price: 8500, icon: "💧" },
  { id: "speaker", name: "Speaker/Mic Repair", price: 4500, icon: "🔊" },
];

export function RepairForm() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (!selectedService) {
      toast.error("Please select a repair service");
      return;
    }

    try {
      setIsSubmitting(true);
      
      const serviceObj = SERVICES.find(s => s.id === selectedService);
      
      const payload = {
        ...data,
        service_type: serviceObj?.name,
        service_price: serviceObj?.price,
      };

      const res = await fetch("/api/repair", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to submit");

      toast.success("Repair booking submitted successfully! We will contact you to confirm.");
      reset();
      setSelectedService(null);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
      {/* Services Selection Left */}
      <div className="lg:col-span-3">
        <h2 className="text-2xl font-display mb-6">Select Repair Service</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {SERVICES.map((service) => (
            <button
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className={`flex items-center p-4 rounded-2xl border transition-all text-left ${
                selectedService === service.id
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10'
                  : 'border-[rgba(255,255,255,0.1)] bg-[#111111] hover:border-[rgba(255,255,255,0.3)]'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-[#181818] flex items-center justify-center text-xl shrink-0 mr-4">
                {service.icon}
              </div>
              <div className="flex-1">
                <div className={`font-medium mb-1 ${selectedService === service.id ? 'text-[var(--color-accent)]' : 'text-white'}`}>
                  {service.name}
                </div>
                <div className="text-sm text-[var(--color-muted)]">Starting from {formatPrice(service.price)}</div>
              </div>
            </button>
          ))}
        </div>

        <h2 className="text-2xl font-display mb-6">Your Details</h2>
        <form id="repair-form" onSubmit={handleSubmit(onSubmit)} className="bg-[#111111] border border-[rgba(255,255,255,0.05)] rounded-3xl p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-[var(--color-muted)] mb-2">iPhone Model</label>
              <input 
                type="text"
                placeholder="e.g. iPhone 13 Pro"
                {...register("iphone_model")}
                className="w-full bg-[#181818] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              />
              {errors.iphone_model && <p className="text-red-400 text-xs mt-1">{errors.iphone_model.message}</p>}
            </div>
            <div>
              <label className="block text-sm text-[var(--color-muted)] mb-2">Preferred Date</label>
              <input 
                type="date"
                {...register("preferred_date")}
                className="w-full bg-[#181818] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors [color-scheme:dark]"
              />
              {errors.preferred_date && <p className="text-red-400 text-xs mt-1">{errors.preferred_date.message}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-[var(--color-muted)] mb-2">Full Name</label>
              <input 
                type="text"
                {...register("name")}
                className="w-full bg-[#181818] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm text-[var(--color-muted)] mb-2">Phone Number</label>
              <input 
                type="tel"
                {...register("phone")}
                className="w-full bg-[#181818] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              />
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
            </div>
          </div>
        </form>
      </div>

      {/* Summary Card Right */}
      <div className="lg:col-span-2">
        <div className="bg-[#111111] border border-[rgba(255,255,255,0.05)] rounded-3xl p-8 sticky top-24">
          <h2 className="text-xl font-medium mb-6">Booking Summary</h2>
          
          <div className="space-y-4 mb-8 text-sm">
            <div className="flex justify-between pb-4 border-b border-[rgba(255,255,255,0.05)]">
              <span className="text-[var(--color-muted)]">Service</span>
              <span className="text-white text-right font-medium">
                {selectedService ? SERVICES.find(s => s.id === selectedService)?.name : "Not selected"}
              </span>
            </div>
            <div className="flex justify-between pb-4 border-b border-[rgba(255,255,255,0.05)]">
              <span className="text-[var(--color-muted)]">Estimated Cost</span>
              <span className="text-[var(--color-accent)] font-medium">
                {selectedService ? formatPrice(SERVICES.find(s => s.id === selectedService)?.price || 0) : "Rs. 0"}
              </span>
            </div>
          </div>

          <p className="text-xs text-[var(--color-muted)] mb-8 leading-relaxed">
            Note: The estimated cost is a starting price. Final quote will be provided after physical diagnosis by our certified technicians. Diagnostics are free if you proceed with the repair.
          </p>

          <Button type="submit" form="repair-form" disabled={isSubmitting} size="lg" className="w-full py-6 rounded-xl text-base">
            {isSubmitting ? "Booking..." : "Book Appointment"}
          </Button>
        </div>
      </div>
    </div>
  );
}
