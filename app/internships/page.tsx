"use client";

import React, { useState } from "react";
import {
  Search,
  CheckCircle,
  XCircle,
  Calendar,
  MapPin,
  Award,
  ChevronRight,
  Clock,
  Users,
  Shield,
  Globe,
  Star,
} from "lucide-react";

/* ================= TYPES ================= */
type Certificate = {
  id: string;
  name: string;
  domain: string;
  duration: string;
  issueDate: string;
  skills: string[];
  grade: string;
  issuer: string;
};

type Internship = {
  title: string;
  duration: string;
  mode: string;
  type: "Paid" | "Unpaid";
  positions: number;
  startDate: string;
  description: string;
  skills: string[];
  icon: string;
};

/* ================= DATA ================= */
const certificates: Certificate[] = [
  {
    id: "DHB-INT-001",
    name: "Astha Shrivastava",
    domain: "Investment Banking",
    duration: "2 Months",
    issueDate: "15 Jan 2025",
    skills: ["Financial Modeling", "Valuation", "M&A"],
    grade: "A",
    issuer: "DHB Academy",
  },
  {
    id: "DHB-INT-002",
    name: "Chandril Sarkar",
    domain: "Cloud Computing",
    duration: "3 Months",
    issueDate: "20 Jan 2025",
    skills: ["AWS", "Azure", "DevOps"],
    grade: "A+",
    issuer: "DHB Academy",
  },
];

const internships: Internship[] = [
  {
    title: "Full Stack Web Development",
    duration: "3 Months",
    mode: "Remote",
    type: "Paid",
    positions: 5,
    startDate: "March 2025",
    description: "Build real-world MERN stack applications",
    skills: ["React", "Node.js", "MongoDB"],
    icon: "💻",
  },
  {
    title: "Data Science",
    duration: "3 Months",
    mode: "Hybrid",
    type: "Paid",
    positions: 3,
    startDate: "April 2025",
    description: "Work on ML & analytics projects",
    skills: ["Python", "Pandas", "ML"],
    icon: "📊",
  },
];

/* ================= PAGE ================= */
export default function InternshipsPage() {
  const [certificateId, setCertificateId] = useState("");
  const [result, setResult] = useState<Certificate | "not-found" | null>(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "paid" | "unpaid">("all");

  const verifyCertificate = () => {
    if (!certificateId.trim()) return;

    setLoading(true);
    setTimeout(() => {
      const found = certificates.find(
        (c) => c.id.toLowerCase() === certificateId.toLowerCase()
      );
      setResult(found || "not-found");
      setLoading(false);
    }, 800);
  };

  const filteredInternships =
    filter === "all"
      ? internships
      : internships.filter((i) => i.type.toLowerCase() === filter);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Internships & Careers</h1>
        <p className="text-lg text-blue-100">
          Apply for internships & verify certificates instantly
        </p>
      </section>

      {/* ================= INTERNSHIPS ================= */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Available Internships
        </h2>

        <div className="flex justify-center gap-4 mb-8">
          {["all", "paid", "unpaid"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t as any)}
              className={`px-6 py-2 rounded-full ${
                filter === t
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInternships.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-6 hover:shadow-xl transition"
            >
              <div className="flex justify-between mb-3">
                <span className="text-3xl">{item.icon}</span>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    item.type === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {item.type}
                </span>
              </div>

              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>

              <div className="text-sm text-gray-500 space-y-1 mb-4">
                <p>⏱ {item.duration}</p>
                <p>📍 {item.mode}</p>
                <p>👥 {item.positions} seats</p>
              </div>

              <button className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-blue-600">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CERTIFICATE VERIFY ================= */}
      <section
        id="verify"
        className="py-16 px-6 bg-gradient-to-br from-blue-50 to-indigo-50"
      >
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
          <h2 className="text-3xl font-bold text-center mb-6">
            Certificate Verification
          </h2>

          <div className="flex gap-3">
            <input
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && verifyCertificate()}
              placeholder="Enter Certificate ID"
              className="flex-1 border px-4 py-3 rounded-lg"
            />
            <button
              onClick={verifyCertificate}
              className="bg-blue-600 text-white px-6 rounded-lg"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </div>

          {result && (
            <div className="mt-6">
              {result === "not-found" ? (
                <p className="text-red-600 flex items-center gap-2">
                  <XCircle /> Certificate not found
                </p>
              ) : (
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-bold text-green-700 flex items-center gap-2">
                    <CheckCircle /> Verified
                  </p>
                  <p>Name: {result.name}</p>
                  <p>Domain: {result.domain}</p>
                  <p>Grade: {result.grade}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto">
          <Feature icon={Clock} title="Instant" />
          <Feature icon={Shield} title="Secure" />
          <Feature icon={Globe} title="Global" />
        </div>
      </section>
    </main>
  );
}

/* ================= SMALL COMPONENT ================= */
function Feature({
  icon: Icon,
  title,
}: {
  icon: any;
  title: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl text-center shadow">
      <Icon className="mx-auto mb-3 text-blue-600" />
      <h4 className="font-semibold">{title}</h4>
    </div>
  );
}
