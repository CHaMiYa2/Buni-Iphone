"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setSuccess(true);
      toast.success("Message sent successfully!");
      reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-[#111111] border border-[rgba(255,255,255,0.05)] rounded-3xl p-8 text-center animate-fade-up">
        <h3 className="font-display text-3xl mb-4 text-[var(--color-accent)]">Message Sent</h3>
        <p className="text-[var(--color-muted)] mb-6">
          Thank you for reaching out. A member of our team will get back to you within 24 hours.
        </p>
        <Button onClick={() => setSuccess(false)} variant="outline">Send Another Message</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-[var(--color-muted)] mb-2">Name</label>
          <input 
            type="text"
            {...register("name")}
            className="w-full bg-[#181818] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors"
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm text-[var(--color-muted)] mb-2">Email Address</label>
          <input 
            type="email"
            {...register("email")}
            className="w-full bg-[#181818] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors"
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm text-[var(--color-muted)] mb-2">Subject</label>
        <select 
          {...register("subject")}
          className="w-full bg-[#181818] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors"
        >
          <option value="">Select a subject...</option>
          <option value="Sales Inquiry">Sales Inquiry</option>
          <option value="Order Support">Order Support</option>
          <option value="Warranty Claim">Warranty Claim</option>
          <option value="Other">Other</option>
        </select>
        {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
      </div>

      <div>
        <label className="block text-sm text-[var(--color-muted)] mb-2">Message</label>
        <textarea 
          {...register("message")}
          rows={5}
          className="w-full bg-[#181818] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
        ></textarea>
        {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} size="lg" className="w-full py-6 rounded-xl text-base">
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
