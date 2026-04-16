"use client";

import { useState } from "react";
import jsPDF from "jspdf";

export default function CertificateGenerator() {
  const [form, setForm] = useState({
    name: "",
    domain: "",
    duration: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateCertificate = () => {
    const doc = new jsPDF();

    const certId = "DHB-" + Date.now();

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(20);
    doc.text("INTERNSHIP CERTIFICATE", 105, 30, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");

    doc.text(
      `This is to certify that ${form.name} has successfully completed an internship in ${form.domain} at Dream Homes Bihar.`,
      20,
      60,
      { maxWidth: 170 }
    );

    doc.text(
      `Duration: ${form.duration}`,
      20,
      80
    );

    doc.text(
      `Certificate ID: ${certId}`,
      20,
      100
    );

    doc.text(
      "Dream Homes Bihar",
      20,
      130
    );

    doc.text(
      "Authorized Signature",
      150,
      130
    );

    doc.save(`${form.name}-certificate.pdf`);
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-6">
        Certificate Generator
      </h1>

      <input
        name="name"
        placeholder="Student Name"
        onChange={handleChange}
        className="w-full mb-3 p-3 border rounded"
      />

      <input
        name="domain"
        placeholder="Domain (Civil / Architecture)"
        onChange={handleChange}
        className="w-full mb-3 p-3 border rounded"
      />

      <input
        name="duration"
        placeholder="Duration (Jan 2026 - Feb 2026)"
        onChange={handleChange}
        className="w-full mb-4 p-3 border rounded"
      />

      <button
        onClick={generateCertificate}
        className="bg-black text-white px-6 py-3 rounded"
      >
        Generate Certificate
      </button>
    </div>
  );
}