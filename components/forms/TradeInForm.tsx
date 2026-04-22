"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  model: z.string().min(1, "Please select a model"),
  storage: z.string().min(1, "Please select storage capacity"),
  condition: z.string().min(1, "Please select condition"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  pickup_address: z.string().min(5, "Please enter a complete address"),
});

type FormData = z.infer<typeof schema>;

const MODELS = [
  { id: "15-pro-max", name: "iPhone 15 Pro Max", basePrice: 200000 },
  { id: "15-pro", name: "iPhone 15 Pro", basePrice: 175000 },
  { id: "15", name: "iPhone 15", basePrice: 140000 },
  { id: "14-pro-max", name: "iPhone 14 Pro Max", basePrice: 150000 },
  { id: "14-pro", name: "iPhone 14 Pro", basePrice: 130000 },
  { id: "14", name: "iPhone 14", basePrice: 100000 },
  { id: "13-pro-max", name: "iPhone 13 Pro Max", basePrice: 110000 },
  { id: "13-pro", name: "iPhone 13 Pro", basePrice: 90000 },
  { id: "13", name: "iPhone 13", basePrice: 70000 },
];

const STORAGE_OPTIONS = [
  { id: "128GB", multiplier: 1.0 },
  { id: "256GB", multiplier: 1.12 },
  { id: "512GB", multiplier: 1.2 },
  { id: "1TB", multiplier: 1.3 },
];

const CONDITION_OPTIONS = [
  { id: "Excellent", multiplier: 0.85, desc: "Flawless, no scratches, battery > 90%" },
  { id: "Good", multiplier: 0.72, desc: "Minor wear, fully functional, battery > 80%" },
  { id: "Fair", multiplier: 0.56, desc: "Noticeable scratches, fully functional" },
  { id: "Poor", multiplier: 0.35, desc: "Cracked screen or back, functional issues" },
];

export function TradeInForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      model: "",
      storage: "",
      condition: "",
    }
  });

  const selectedModelId = watch("model");
  const selectedStorageId = watch("storage");
  const selectedConditionId = watch("condition");

  const estimatedValue = useMemo(() => {
    if (!selectedModelId || !selectedStorageId || !selectedConditionId) return null;

    const model = MODELS.find(m => m.id === selectedModelId);
    const storage = STORAGE_OPTIONS.find(s => s.id === selectedStorageId);
    const condition = CONDITION_OPTIONS.find(c => c.id === selectedConditionId);

    if (model && storage && condition) {
      return Math.round(model.basePrice * storage.multiplier * condition.multiplier);
    }
    return null;
  }, [selectedModelId, selectedStorageId, selectedConditionId]);

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      
      const payload = {
        ...data,
        estimated_value: estimatedValue,
        modelName: MODELS.find(m => m.id === data.model)?.name
      };

      const res = await fetch("/api/trade-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setSuccess(true);
      toast.success("Trade-in request submitted successfully!");
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

  if (success) {
    return (
      <div className="bg-[#111111] border border-[rgba(255,255,255,0.05)] rounded-3xl p-8 text-center animate-fade-up">
        <h3 className="font-display text-3xl mb-4 text-[var(--color-accent)]">Request Received</h3>
        <p className="text-[var(--color-muted)] mb-6">
          Thank you! We have received your trade-in request. Our team will contact you within 24 hours to schedule the pickup and finalize the evaluation.
        </p>
        <Button onClick={() => setSuccess(false)} variant="outline">Submit Another Request</Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
      {/* Form Left */}
      <div className="lg:col-span-3">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Device Details */}
          <div className="bg-[#111111] border border-[rgba(255,255,255,0.05)] rounded-3xl p-6 md:p-8 space-y-6">
            <h3 className="text-xl font-medium mb-6">Device Details</h3>
            
            <div>
              <label className="block text-sm text-[var(--color-muted)] mb-2">Select your iPhone model</label>
              <select 
                {...register("model")}
                className="w-full bg-[#181818] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              >
                <option value="">Select a model...</option>
                {MODELS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
              {errors.model && <p className="text-red-400 text-xs mt-1">{errors.model.message}</p>}
            </div>

            <div>
              <label className="block text-sm text-[var(--color-muted)] mb-2">Storage Capacity</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {STORAGE_OPTIONS.map((s) => (
                  <label key={s.id} className={`cursor-pointer border rounded-xl py-3 text-center transition-all ${selectedStorageId === s.id ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]' : 'border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.3)] text-[var(--color-muted)]'}`}>
                    <input type="radio" value={s.id} {...register("storage")} className="hidden" />
                    <span className="text-sm font-medium">{s.id}</span>
                  </label>
                ))}
              </div>
              {errors.storage && <p className="text-red-400 text-xs mt-1">{errors.storage.message}</p>}
            </div>

            <div>
              <label className="block text-sm text-[var(--color-muted)] mb-2">Device Condition</label>
              <div className="space-y-3">
                {CONDITION_OPTIONS.map((c) => (
                  <label key={c.id} className={`flex items-start p-4 cursor-pointer border rounded-xl transition-all ${selectedConditionId === c.id ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10' : 'border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.3)]'}`}>
                    <input type="radio" value={c.id} {...register("condition")} className="hidden" />
                    <div className="flex-1">
                      <div className={`text-sm font-medium mb-1 ${selectedConditionId === c.id ? 'text-[var(--color-accent)]' : 'text-white'}`}>{c.id}</div>
                      <div className="text-xs text-[var(--color-muted)]">{c.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.condition && <p className="text-red-400 text-xs mt-1">{errors.condition.message}</p>}
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-[#111111] border border-[rgba(255,255,255,0.05)] rounded-3xl p-6 md:p-8 space-y-6">
            <h3 className="text-xl font-medium mb-6">Contact & Pickup Details</h3>
            
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

            <div>
              <label className="block text-sm text-[var(--color-muted)] mb-2">Pickup Address</label>
              <textarea 
                {...register("pickup_address")}
                rows={3}
                className="w-full bg-[#181818] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
              ></textarea>
              {errors.pickup_address && <p className="text-red-400 text-xs mt-1">{errors.pickup_address.message}</p>}
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} size="lg" className="w-full py-6 rounded-xl text-base">
            {isSubmitting ? "Submitting..." : "Submit Trade-In Request"}
          </Button>

        </form>
      </div>

      {/* Live Estimate Card Right */}
      <div className="lg:col-span-2">
        <div className="bg-[#111111] border border-[rgba(255,255,255,0.05)] rounded-3xl p-8 sticky top-24">
          <h2 className="text-xl font-medium mb-2">Live Estimate</h2>
          <p className="text-sm text-[var(--color-muted)] mb-8">Estimated value is based on the details provided. Final value is subject to physical inspection.</p>
          
          <div className="bg-[#080808] border border-[rgba(255,255,255,0.05)] rounded-2xl p-6 mb-8 text-center">
            {estimatedValue !== null ? (
              <div>
                <span className="block text-sm uppercase tracking-widest text-[var(--color-muted)] mb-4">Estimated Value</span>
                <span className="font-display text-5xl text-[var(--color-accent)]">{formatPrice(estimatedValue)}</span>
              </div>
            ) : (
              <div className="text-[var(--color-muted)] py-4">
                Please select your device details to see the estimated value.
              </div>
            )}
          </div>

          {selectedModelId && (
            <div className="space-y-3 text-sm border-t border-[rgba(255,255,255,0.05)] pt-6">
              <div className="flex justify-between">
                <span className="text-[var(--color-muted)]">Model</span>
                <span className="text-white">{MODELS.find(m => m.id === selectedModelId)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-muted)]">Storage</span>
                <span className="text-white">{selectedStorageId || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-muted)]">Condition</span>
                <span className="text-white">{selectedConditionId || "-"}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
