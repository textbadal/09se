import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "3BHK House Design in Patna | Free Architectural Drawing PDF",
  description:
    "Download a complete 3BHK house design PDF including floor plan, front elevation, structural, plumbing and electrical drawings.",
  keywords: [
    "3BHK House Design Patna",
    "House Plan PDF",
    "Architectural Drawings",
    "House Design Bihar",
    "Front Elevation Design",
    "Dream Homes Bihar",
  ],
};

export default function ProjectPage() {
  return (
    <main className="max-w-7xl mx-auto px-5 py-12">

      {/* Hero */}
      <section className="grid lg:grid-cols-2 gap-10 items-center">

        <div>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            Completed Project
          </span>

          <h1 className="text-5xl font-bold mt-5">
            3BHK House Design in Patna
          </h1>

          <p className="text-gray-600 mt-5 text-lg">
            Complete architectural drawing package including floor plans,
            front elevation, structural drawings, plumbing layout,
            electrical layout and working drawings.
          </p>

          <div className="grid grid-cols-2 gap-3 mt-8">
            <div>✔ Floor Plan</div>
            <div>✔ Front Elevation</div>
            <div>✔ Structural Drawing</div>
            <div>✔ Beam Layout</div>
            <div>✔ Column Layout</div>
            <div>✔ Electrical Drawing</div>
            <div>✔ Plumbing Drawing</div>
            <div>✔ Working Drawing</div>
          </div>

          <div className="flex gap-4 mt-8">

            <a
              href="/downloads/3bhk-house-design-patna.pdf"
              download
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              📥 Download Complete PDF
            </a>

            <Link
              href="/contact"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg"
            >
              Get Custom Design
            </Link>

          </div>
        </div>

        <div>
          <img
            src="/images/projects/3bhk-house-design-patna/front-elevation.jpg"
            alt="3BHK House Front Elevation in Patna"
            className="rounded-2xl shadow-lg w-full"
          />
        </div>

      </section>

      {/* Gallery */}

      <section className="mt-20">

        <h2 className="text-3xl font-bold mb-8">
          Project Gallery
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

          <img
            src="/images/projects/3bhk-house-design-patna/floor-plan.jpg"
            alt="Floor Plan"
            className="rounded-xl"
          />

          <img
            src="/images/projects/3bhk-house-design-patna/structural.jpg"
            alt="Structural Drawing"
            className="rounded-xl"
          />

          <img
            src="/images/projects/3bhk-house-design-patna/electrical.jpg"
            alt="Electrical Layout"
            className="rounded-xl"
          />

          <img
            src="/images/projects/3bhk-house-design-patna/plumbing.jpg"
            alt="Plumbing Layout"
            className="rounded-xl"
          />

        </div>

      </section>

      {/* Project Details */}

      <section className="mt-20 bg-gray-100 rounded-2xl p-8">

        <h2 className="text-3xl font-bold mb-6">
          Project Details
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <strong>Project Type:</strong> Residential House
          </div>

          <div>
            <strong>Configuration:</strong> 3BHK
          </div>

          <div>
            <strong>Location:</strong> Patna, Bihar
          </div>

          <div>
            <strong>Status:</strong> Completed
          </div>

          <div>
            <strong>Service:</strong> Complete Architectural Drawings
          </div>

          <div>
            <strong>Designed By:</strong> Dream Homes Bihar
          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="text-center mt-20">

        <h2 className="text-4xl font-bold">
          Need a Custom House Design?
        </h2>

        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          We provide complete house planning, front elevation,
          structural drawings, electrical, plumbing and construction
          drawings across India.
        </p>

        <Link
          href="/contact"
          className="inline-block mt-8 bg-blue-600 text-white px-8 py-4 rounded-xl text-lg hover:bg-blue-700"
        >
          Contact Dream Homes Bihar
        </Link>

      </section>

    </main>
  );
}