import { RepairForm } from "@/components/forms/RepairForm";

export const metadata = {
  title: "Expert iPhone Repair | Buni Iphone",
  description: "Book an appointment for expert iPhone repair services in Colombo. Genuine parts, certified technicians, and quick turnaround.",
};

export default function RepairPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* Header */}
      <div className="bg-[#080808] border-b border-[rgba(255,255,255,0.05)] pt-16 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-light mb-4">Expert Repair Centre</h1>
          <p className="text-[var(--color-muted)] max-w-xl text-lg">
            Genuine parts, certified technicians, and transparent pricing. Book your repair appointment today.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <RepairForm />
      </div>
    </div>
  );
}
