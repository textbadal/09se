"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function PaymentPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is this ₹499 booking fee?",
      a: "This is a small booking amount to confirm your project. The remaining amount will be discussed after consultation.",
    },
    {
      q: "Is the ₹499 refundable?",
      a: "The booking fee is adjustable in your final project cost but is non-refundable once the work has started.",
    },
    {
      q: "What happens after payment?",
      a: "After payment, our team will contact you within 24 hours to understand your requirements and begin the process.",
    },
    {
      q: "How can I contact you?",
      a: "You can contact us anytime via WhatsApp or call at +91 62058 20278.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50 px-4 py-12 flex items-center justify-center">
      <div className="max-w-xl w-full">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-3">
          Dream Homes Bihar
        </h1>
        <p className="text-center text-gray-600 mb-8">
          House Planning
        </p>

        {/* Booking Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 text-center mb-10">
          <h2 className="text-xl font-semibold mb-2">
            Booking Fee
          </h2>

          <p className="text-3xl font-bold text-blue-600 mb-4">
            ₹499
          </p>

          <ul className="text-sm text-gray-600 mb-6 space-y-2">
            <li>✔ Project Consultation Included</li>
            <li>✔ Priority Support</li>
            <li>✔ Amount Adjusted in Final Cost</li>
          </ul>

          <a
            href="https://payments.cashfree.com/forms/dream-homes-booking"
            target="_blank"
            className="block w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Pay Now
          </a>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border rounded-xl p-4 cursor-pointer"
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              >
                <div className="flex justify-between items-center">
                  <p className="font-medium">{faq.q}</p>
                  {openIndex === index ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </div>

                {openIndex === index && (
                  <p className="text-sm text-gray-600 mt-2">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Trust Line */}
        <p className="text-center text-xs text-gray-500 mt-6">
          🔒 Secure payments powered by Cashfree
        </p>
      </div>
    </div>
  );
}