// app/internships/layout.tsx
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Internships & Careers | Dream Homes Bihar",
  description:
    "Explore internships and career opportunities at Dream Homes Bihar in civil engineering, architecture, house planning, web development, and business operations.",
  keywords: [
    "Dream Homes Bihar internships",
    "civil engineering internship",
    "architecture internship",
    "house planning jobs",
    "construction careers Bihar",
    "web development internship Bihar",
  ],
  openGraph: {
    title: "Internships & Careers | Dream Homes Bihar",
    description:
      "Kickstart your career with hands-on internships and job opportunities at Dream Homes Bihar.",
    type: "website",
  },
};

export default function InternshipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="internships-layout">
      {/* Page Header */}
      <header className="internships-header">
        <h1>Internships & Career Opportunities</h1>
        <p>
          Build real-world experience with Dream Homes Bihar through structured
          internships and professional career roles.
        </p>
      </header>

      {/* Page Content */}
      <section className="internships-content">{children}</section>

      {/* Footer Note */}
      <footer className="internships-footer">
        <p>
          © {new Date().getFullYear()} Dream Homes Bihar. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
