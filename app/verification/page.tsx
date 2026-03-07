"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerificationPage() {
  const [certificateId, setCertificateId] = useState("");
  const router = useRouter();

  const handleVerify = () => {
    if (!certificateId.trim()) return;

    const id = certificateId.trim().toUpperCase();

    // redirect to dynamic verification page
    router.push(`/verification/${id}`);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
      <div className="max-w-xl w-full bg-white shadow-lg rounded-2xl p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Certificate Verification
          </h1>

          <p className="text-gray-600 text-sm">
            Verify internship certificates issued by{" "}
            <span className="font-semibold text-blue-600">
              Dream Homes Bihar
            </span>
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm mb-6">
          Enter the Certificate ID printed on the internship certificate.
        </div>

        {/* Input */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Example: DHB-CE-001"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleVerify}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            Verify
          </button>
        </div>

      </div>
    </main>
  );
}