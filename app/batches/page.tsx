"use client";

export default function BatchesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white px-6 py-16">

      {/* HERO */}
      <section className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">
          Holistic Growth Transformation Batch
        </h1>
        <p className="text-lg text-purple-700">
          Vastu • Law of Attraction • Healing • Manifestation
        </p>
        <p className="mt-4 font-semibold text-gray-700">
          Batch Starts: 15 March 2026
        </p>
      </section>

      {/* BATCH DETAILS */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
        <DetailCard title="Duration" value="4 Weeks" />
        <DetailCard title="Mode" value="Online Live" />
        <DetailCard title="Fees" value="₹2,999" />
        <DetailCard title="Certificate" value="Yes" />
      </section>

      {/* TRAINER */}
      <section className="max-w-4xl mx-auto bg-purple-100 rounded-2xl p-8 mb-20">
        <h2 className="text-3xl font-bold text-purple-900 mb-4">
          Trainer Profile
        </h2>

        <p className="text-lg font-semibold text-purple-700">
          Swati Kapoor
        </p>

        <p className="text-gray-700 mt-2">
          Certified Holistic Coach and Vastu Expert with more than 12 years
          of experience. Trained over 500 students globally by combining
          ancient wisdom with modern life practices.
        </p>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-4xl mx-auto text-center mb-20">
        <h2 className="text-3xl font-bold mb-6">Student Feedback</h2>

        <div className="bg-white shadow-md rounded-xl p-6 mb-4">
          <p className="italic text-gray-700">
            The Vastu and manifestation techniques brought positivity
            and clarity into my life.
          </p>
          <p className="font-semibold mt-2">— Priya Sharma</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <p className="italic text-gray-700">
            Simple explanations, practical guidance and real results.
          </p>
          <p className="font-semibold mt-2">— Rahul Verma</p>
        </div>
      </section>

      {/* BROCHURE */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          Download Full Course Brochure
        </h2>

        <a
          href="/brochure.pdf"
          download
          className="inline-block bg-purple-800 text-white px-8 py-3 rounded-xl font-semibold hover:bg-purple-900 transition"
        >
          Download PDF
        </a>
      </section>

    </main>
  );
}

/* SMALL REUSABLE CARD */
function DetailCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 text-center">
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 mt-2">{value}</p>
    </div>
  );
}
