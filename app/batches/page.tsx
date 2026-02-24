export const metadata = {
  title: "Holistic Growth Batch | Dream Homes Bihar",
  description:
    "Join our Holistic Growth Batch covering Vastu, Law of Attraction, Healing and Manifestation. Learn energy alignment, mindset mastery and practical techniques for a balanced life.",
};

export default function BatchesPage() {
  return (
    <main className="bg-gradient-to-b from-purple-50 to-white min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto">

        {/* HERO */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">
            Holistic Growth Transformation Batch
          </h1>
          <p className="text-lg text-purple-700 max-w-3xl mx-auto">
            A carefully designed batch focusing on Vastu, Law of Attraction,
            Healing and Manifestation to bring clarity, balance and positive
            transformation in your life.
          </p>

          <div className="mt-6 inline-block bg-purple-100 text-purple-900 px-6 py-3 rounded-xl font-semibold">
            Batch Starts on 10 March 2026
          </div>
        </section>

        {/* BATCH DETAILS */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <InfoCard title="Duration" value="30 Days" />
          <InfoCard title="Mode" value="Online (Live Sessions)" />
          <InfoCard title="Fees" value="₹1,999" />
          <InfoCard title="Certificate" value="Yes (After Completion)" />
        </section>

        {/* TRAINER */}
        <section className="bg-white shadow-lg rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-purple-900 mb-4">
            Trainer Profile
          </h2>

          <p className="text-lg font-semibold text-gray-800">
            Certified Holistic Wellness Trainer
          </p>

          <p className="text-gray-700 mt-3 leading-relaxed">
            With over 7 years of experience in Vastu Shastra, Energy Healing and
            holistic practices, the trainer has guided hundreds of individuals
            towards better mindset, harmony and life balance through practical
            and easy-to-follow techniques.
          </p>
        </section>

        {/* LEARNING OUTCOMES */}
        <section className="bg-purple-50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-purple-900 mb-6">
            What You Will Learn
          </h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
            <li>✔ Basic and Advanced Vastu Principles</li>
            <li>✔ Law of Attraction Techniques for Daily Life</li>
            <li>✔ Energy Healing Fundamentals</li>
            <li>✔ Practical Manifestation Practices</li>
            <li>✔ Mindset Reprogramming Methods</li>
            <li>✔ Positive Energy Alignment Techniques</li>
          </ul>
        </section>

        {/* TESTIMONIAL */}
        <section className="bg-white shadow-lg rounded-2xl p-8 mb-16 text-center">
          <h2 className="text-3xl font-bold text-purple-900 mb-6">
            Student Testimonial
          </h2>

          <p className="text-yellow-500 text-xl mb-3">
            ★★★★★
          </p>

          <p className="italic text-gray-700 max-w-3xl mx-auto">
            This batch helped me gain clarity, confidence and positivity.
            The concepts were explained in a very simple and practical way.
          </p>

          <p className="font-semibold mt-4 text-gray-900">
            — Previous Participant
          </p>
        </section>

        {/* BROCHURE */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-purple-900 mb-4">
            Download Detailed Brochure
          </h2>

          <p className="text-gray-700 mb-6">
            Get complete information about the batch structure, syllabus and
            session plan.
          </p>

          <a
            href="/brochure.pdf"
            download
            className="inline-block bg-purple-800 text-white px-10 py-4 rounded-xl font-semibold hover:bg-purple-900 transition"
          >
            Download Brochure (PDF)
          </a>
        </section>

      </div>
    </main>
  );
}

/* REUSABLE INFO CARD */
function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 text-center">
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 mt-2">{value}</p>
    </div>
  );
}
