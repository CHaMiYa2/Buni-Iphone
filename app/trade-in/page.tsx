import { TradeInForm } from "@/components/forms/TradeInForm";

export const metadata = {
  title: "Trade-In Your iPhone | Buni Iphone",
  description: "Get an instant estimate for your old iPhone. Hassle-free trade-in process with free pickup in Colombo.",
};

export default function TradeInPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* Header */}
      <div className="bg-[#080808] border-b border-[rgba(255,255,255,0.05)] pt-16 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-light mb-4">Trade In & Upgrade</h1>
          <p className="text-[var(--color-muted)] max-w-xl text-lg">
            Turn your current device into credit towards a new one. Get a quick estimate and enjoy a seamless upgrade experience.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <TradeInForm />
      </div>
    </div>
  );
}
