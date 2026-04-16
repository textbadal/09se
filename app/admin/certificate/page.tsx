"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import QRCode from "qrcode";

export default function CertificateGenerator() {
  const [form, setForm] = useState({
    name: "",
    domain: "",
    duration: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateCertificate = async () => {
    const doc = new jsPDF("landscape");

    const certId = "DHB-" + Date.now();
    const issueDate = new Date().toLocaleDateString();

    const verifyUrl = `https://dreamhomesbihar.in/verification?id=${certId}`;
    const qrData = await QRCode.toDataURL(verifyUrl);

    // Border
    doc.setDrawColor(0);
    doc.setLineWidth(1.5);
    doc.rect(10, 10, 277, 190);

    doc.setLineWidth(0.5);
    doc.rect(15, 15, 267, 180);

    // Header
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(26);
    doc.text("Dream Homes Bihar", 148, 35, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");
    doc.text("Building Dreams Together", 148, 43, { align: "center" });

    // Title
    doc.setFontSize(24);
    doc.setFont("Times", "bold");
    doc.text("INTERNSHIP CERTIFICATE", 148, 65, { align: "center" });

    doc.line(90, 70, 205, 70);

    // Content
    doc.setFontSize(14);
    doc.setFont("Times", "normal");

    doc.text("This is to certify that", 148, 85, { align: "center" });

    doc.setFont("Times", "bold");
    doc.setFontSize(20);
    doc.text(form.name.toUpperCase(), 148, 100, { align: "center" });

    doc.setFont("Times", "normal");
    doc.setFontSize(14);

    doc.text(
      `has successfully completed an internship in ${form.domain} at Dream Homes Bihar`,
      148,
      115,
      { align: "center", maxWidth: 220 }
    );

    doc.text(
      `during the period of ${form.duration}.`,
      148,
      125,
      { align: "center" }
    );

    doc.text(
      "During this period, the intern demonstrated dedication, creativity, and good technical skills.",
      148,
      140,
      { align: "center", maxWidth: 220 }
    );

    // Footer
    doc.setFontSize(11);
    doc.text(`Certificate ID: ${certId}`, 25, 165);
    doc.text(`Date: ${issueDate}`, 25, 175);
    doc.text("Verify at: dreamhomesbihar.in/verification", 25, 185);

    // Signature
    doc.setFont("Times", "bold");
    doc.text("Authorized Signature", 230, 165);
    doc.setFont("Times", "normal");
    doc.text("Dream Homes Bihar", 230, 175);

    // QR
    doc.addImage(qrData, "PNG", 235, 115, 40, 40);
    doc.setFontSize(10);
    doc.text("Scan to Verify", 245, 160);

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