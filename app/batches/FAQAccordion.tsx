"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Who is this bootcamp best suited for?",
    a: "This bootcamp is for individuals who value clarity, emotional discipline and structured inner growth."
  },
  {
    q: "Is this just theory?",
    a: "No. Each session includes guided meditation and applied mindset practices."
  },
  {
    q: "How much time is required daily?",
    a: "About 60 minutes live, plus optional 10–15 minutes self-practice."
  },
  {
    q: "Is this different from free content?",
    a: "Yes. This bootcamp offers structured guidance, discipline and clarity instead of random information."
  }
];

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-white shadow-lg rounded-2xl p-8 mb-16">
      <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4 max-w-4xl mx-auto">
        {faqs.map((faq, i) => (
          <div key={i} className="border rounded-xl">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full text-left p-4 font-semibold text-purple-900"
            >
              {faq.q}
            </button>
            {open === i && (
              <div className="p-4 text-gray-700 border-t">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}