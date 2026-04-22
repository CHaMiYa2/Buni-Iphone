"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "Are your iPhones factory unlocked?",
    answer: "Yes, every iPhone we sell is 100% factory unlocked and can be used with any network provider in Sri Lanka or globally."
  },
  {
    question: "What does your 12-month warranty cover?",
    answer: "Our comprehensive 12-month warranty covers any manufacturer defects and internal hardware failures under normal use. It does not cover accidental damage, liquid damage, or unauthorized repairs."
  },
  {
    question: "Do you offer installment plans?",
    answer: "Yes, we partner with major credit cards in Sri Lanka (ComBank, HNB, Sampath, etc.) to offer 3, 6, 12, and 24-month installment plans. Processing fees may apply depending on your bank."
  },
  {
    question: "How does the trade-in process work?",
    answer: "Simply fill out our online estimator to get a quote. If you accept, we'll arrange a free pickup within Colombo. Once our technicians verify the condition, the credit will be applied to your new purchase or transferred to your bank."
  },
  {
    question: "Do you deliver outside of Colombo?",
    answer: "Yes, we deliver island-wide. Deliveries within Colombo 1-15 are completed the same day for orders placed before 2 PM. Outstation deliveries typically take 1-3 business days."
  },
  {
    question: "What comes in the box with a refurbished iPhone?",
    answer: "Our refurbished iPhones come in a premium Buni Iphone box, complete with a high-quality charging cable. Wall adapters and earphones are sold separately, aligning with Apple's current environmental initiatives."
  }
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {FAQS.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={index} 
            className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'border-[var(--color-accent)] bg-[#111111]' : 'border-[rgba(255,255,255,0.05)] bg-[#080808] hover:border-[rgba(255,255,255,0.15)]'}`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex justify-between items-center p-6 text-left"
            >
              <span className={`font-medium transition-colors ${isOpen ? 'text-white' : 'text-[var(--color-muted)]'}`}>
                {faq.question}
              </span>
              <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[var(--color-accent)]' : 'text-[var(--color-muted)]'}`} />
            </button>
            <div 
              className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
              style={{ maxHeight: isOpen ? '200px' : '0' }}
            >
              <div className="p-6 pt-0 text-sm text-[var(--color-muted)] leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
