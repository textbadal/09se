"use client";

import { useState } from "react";

export default function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-4 font-semibold text-purple-900 flex justify-between items-center"
      >
        {question}
        <span>{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="px-6 pb-4 text-gray-700">
          {answer}
        </div>
      )}
    </div>
  );
}