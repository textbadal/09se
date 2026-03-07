// app/internships/layout.tsx
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Internships & Careers | Dream Homes Bihar",
  description:
    "Explore internships and career opportunities at Dream Homes Bihar in civil engineering, architecture, house planning, interior design, and construction management.",
  keywords: [
    "Dream Homes Bihar internships",
    "civil engineering internship Bihar",
    "architecture internship Bihar",
    "house planning internship",
    "interior design internship Bihar",
    "construction careers Bihar",
    "Dream Homes Bihar jobs",
  ],

  openGraph: {
    title: "Internships & Careers | Dream Homes Bihar",
    description:
      "Kickstart your career with hands-on internships and job opportunities at Dream Homes Bihar.",
    url: "https://dreamhomesbihar.com/internships",
    siteName: "Dream Homes Bihar",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Internships & Careers | Dream Homes Bihar",
    description:
      "Start your professional journey with Dream Homes Bihar through real-world internships.",
  },
};

export default function InternshipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Internships & Career Opportunities
          </h1>

          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
            Gain real-world experience in architecture, civil engineering,
            house planning, interior design, and construction management
            with <strong>Dream Homes Bihar</strong>.
          </p>

          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <a
              href="https://forms.gle/VvErvJUJuhCiVPm5A"
              className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
            >
              Apply for Internship
            </a>

            <a
              href="/contact"
              className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="flex-grow py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-12 px-6 border-t">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">

          <div className="p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">
              Real Project Experience
            </h3>
            <p className="text-gray-600">
              Work on real architecture, planning, and construction projects.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">
              Internship Certificate
            </h3>
            <p className="text-gray-600">
              Receive an official certificate from Dream Homes Bihar after
              successful completion.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">
              Career Growth
            </h3>
            <p className="text-gray-600">
              High-performing interns may receive full-time opportunities.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}