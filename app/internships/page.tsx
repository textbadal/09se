"use client";

type Internship = {
  title: string;
  duration: string;
  mode: string;
  type: "Paid" | "Unpaid";
  level: string;
  responsibilities: string[];
  eligibility: string[];
};

const internships: Internship[] = [
  {
    title: "Civil Engineering Internship",
    duration: "1 – 3 Months",
    mode: "Remote / Hybrid",
    type: "Paid",
    level: "Students & Fresh Graduates",
    responsibilities: [
      "Prepare 2D residential house plans using AutoCAD",
      "Assist in site layout and measurement drawings",
      "Support quantity estimation and BOQ preparation",
      "Understand residential construction workflows",
    ],
    eligibility: [
      "Diploma / B.Tech / B.E in Civil Engineering",
      "Basic knowledge of AutoCAD",
      "Strong interest in construction & planning",
    ],
  },
  {
    title: "Architecture & House Planning Internship",
    duration: "2 Months",
    mode: "Remote",
    type: "Unpaid",
    level: "Architecture & Planning Students",
    responsibilities: [
      "Create floor plans and space planning concepts",
      "Assist in elevation and layout designs",
      "Apply basic Vastu principles",
      "Support planning team in live projects",
    ],
    eligibility: [
      "Architecture / Planning students",
      "Basic design understanding",
      "Creative and detail-oriented mindset",
    ],
  },
  {
    title: "Interior Design Internship",
    duration: "2 Months",
    mode: "Remote",
    type: "Unpaid",
    level: "Interior Design Students",
    responsibilities: [
      "Assist in interior layout planning",
      "Support furniture placement and room styling",
      "Work on color schemes and material selection",
      "Create basic interior concepts for residential spaces",
    ],
    eligibility: [
      "Interior Design / Architecture students",
      "Basic understanding of interior design",
      "Creative thinking and attention to detail",
    ],
  },
  {
    title: "Business & Operations Internship",
    duration: "1 – 2 Months",
    mode: "Remote",
    type: "Unpaid",
    level: "Management Students",
    responsibilities: [
      "Client communication and follow-ups",
      "Project documentation and reporting",
      "Assist in business operations",
      "Support marketing and coordination tasks",
    ],
    eligibility: [
      "BBA / MBA / Management students",
      "Good communication skills",
      "Interest in startup operations",
    ],
  },
];

export default function InternshipsPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* HERO SECTION */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Internships & Career Opportunities
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join Dream Homes Bihar and gain practical experience in civil
            engineering, architecture, house planning, interior design,
            and construction project support.
          </p>
        </div>
      </section>

      {/* INTERNSHIP LIST */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Current Internship Openings
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          {internships.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-1">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500 mb-3">
                {item.duration} • {item.mode} •{" "}
                <span className="font-semibold">{item.type}</span>
              </p>

              <p className="text-sm mb-4">
                <span className="font-semibold">Level:</span>{" "}
                {item.level}
              </p>

              <h4 className="font-semibold mb-2">
                Key Responsibilities
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-600 mb-4 space-y-1">
                {item.responsibilities.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>

              <h4 className="font-semibold mb-2">Eligibility</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 mb-6 space-y-1">
                {item.eligibility.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>

              {/* CTA */}
              <div>
                <a
                  href="https://forms.gle/your-form"
                  target="_blank"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm"
                >
                  Apply Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}