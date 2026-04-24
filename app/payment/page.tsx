"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ShieldCheck } from "lucide-react";

export default function PaymentPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How do I make the payment?",
      a: "After discussion, our team will share a payment link. Click the 'Pay Now' button to complete your payment securely.",
    },
    {
      q: "Is payment secure?",
      a: "Yes, payments are processed securely via Cashfree with bank-level security.",
    },
    {
      q: "What happens after payment?",
      a: "Our team will confirm your payment and start working on your project immediately.",
    },
    {
      q: "Can I get a receipt?",
      a: "Yes, you'll receive an email receipt instantly after successful payment.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 flex justify-center">
      <div className="max-w-4xl w-full">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold">
            Complete Your Payment
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

          {/* Right Side - Payment Gateway */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border text-center">

            <div className="mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Secure Payment Gateway
              </h3>
              <p className="text-sm text-gray-500">
                Click below to pay the agreed amount after discussion with our team
              </p>
            </div>

            <a
              href="https://payments.cashfree.com/forms/dream-homes"
              target="_blank"
              className="block w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
            >
              Pay Now
            </a>

            <div className="mt-4 flex items-center justify-center gap-3 text-xs text-gray-400">
              <span>💳 Card</span>
              <span>📱 UPI</span>
              <span>🏦 NetBanking</span>
              <span>💼 Wallet</span>
            </div>

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