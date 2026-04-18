"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ShieldCheck } from "lucide-react";

export default function PaymentPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is this ₹499 booking fee?",
      a: "This is a small booking amount to confirm your project. The remaining amount will be discussed after consultation.",
    },
    {
      q: "Is the ₹499 refundable?",
      a: "The booking fee is adjustable in your final project cost but is non-refundable once work has started.",
    },
    {
      q: "What happens after payment?",
      a: "Our team will contact you within 24 hours to start your house planning process.",
    },
    {
      q: "Is payment secure?",
      a: "Yes, payments are processed securely via Cashfree with bank-level security.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 flex justify-center">
      <div className="max-w-4xl w-full">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold">
            Book Your House Design Consultation
          </h1>
          <p className="text-gray-600 mt-2">
            Trusted house planning services across Bihar
          </p>
        </div>

        {/* Main Card */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Left Side - Details */}
          <div className="bg-white p-6 rounded-2xl shadow-md border">
            <h2 className="text-xl font-semibold mb-4">
              What You Get
            </h2>

            <ul className="space-y-3 text-gray-700 text-sm">
              <li>✔ 1-on-1 consultation call</li>
              <li>✔ Custom floor plan guidance</li>
              <li>✔ Vastu-friendly design suggestions</li>
              <li>✔ Budget planning support</li>
              <li>✔ Priority project handling</li>
            </ul>

            <div className="mt-6 flex items-center gap-2 text-green-600 text-sm">
              <ShieldCheck size={18} />
              Secure & Verified Service
            </div>
          </div>

          {/* Right Side - Payment */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border text-center">

            <p className="text-sm text-gray-500 mb-2">
              One-Time Booking Fee
            </p>

            <h2 className="text-4xl font-bold text-blue-600 mb-4">
              ₹499
            </h2>

            <p className="text-sm text-gray-600 mb-6">
              This amount will be adjusted in your final project cost
            </p>

            <a
              href="https://payments.cashfree.com/forms/dream-homes-booking"
              target="_blank"
              className="block w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition mb-3"
            >
              Pay ₹499 Now
            </a>

            <a
              href="https://payments.cashfree.com/forms/dream-homes"
              target="_blank"
              className="block w-full bg-gray-200 text-gray-800 py-3 rounded-xl font-medium hover:bg-gray-300 transition"
            >
              Pay Remaining Amount
            </a>

            <p className="text-xs text-gray-500 mt-4">
          🔒 Secure payments powered by Cashfree
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 mt-10">
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

       
      </div>
    </div>
  );
}