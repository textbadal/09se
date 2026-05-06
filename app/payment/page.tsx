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
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:py-12 flex justify-center">
      <div className="max-w-4xl w-full">

        {/* Header - Mobile Optimized */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold px-2">
            Complete Your Payment
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base px-4">
            Trusted house planning services across India
          </p>
        </div>

        {/* Main Card - Single column on mobile */}
        <div className="grid grid-cols-1 gap-6">

          {/* Payment Gateway - Full width on mobile */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg border">

            <div className="mb-5 sm:mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2 text-center">
                Secure Payment Gateway
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 text-center px-2">
                Click below to pay the agreed amount after discussion with our team
              </p>
            </div>

            {/* Pay Button - Mobile friendly touch target */}
            <a
              href="https://payments.cashfree.com/forms/dream-homes-bihar"
              target="_blank"
              className="block w-full bg-blue-600 text-white py-3.5 sm:py-3 rounded-xl font-medium hover:bg-blue-700 transition active:bg-blue-800 text-center text-base sm:text-sm"
            >
              Pay Now
            </a>

            {/* Payment Methods - Scrollable on mobile if needed */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-gray-400">
              <span className="bg-gray-50 px-2 py-1 rounded-full">💳 Card</span>
              <span className="bg-gray-50 px-2 py-1 rounded-full">📱 UPI</span>
              <span className="bg-gray-50 px-2 py-1 rounded-full">🏦 NetBanking</span>
              <span className="bg-gray-50 px-2 py-1 rounded-full">💼 Wallet</span>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              🔒 Secure payments powered by Cashfree
            </p>
          </div>
        </div>

        {/* FAQ Section - Mobile Optimized */}
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mt-6 sm:mt-10">
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
            Frequently Asked Questions
          </h2>

          <div className="space-y-2 sm:space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border rounded-xl p-3 sm:p-4 cursor-pointer active:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex justify-between items-center gap-2">
                  <p className="font-medium text-sm sm:text-base">{faq.q}</p>
                  {openIndex === index ? (
                    <ChevronUp size={18} className="flex-shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="flex-shrink-0" />
                  )}
                </div>

                {openIndex === index && (
                  <p className="text-xs sm:text-sm text-gray-600 mt-2 pt-1 border-t">
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