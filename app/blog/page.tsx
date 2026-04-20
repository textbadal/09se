// /app/blog/page.tsx

import Link from "next/link";

const blogs = [
  {
    slug: "construction-cost-bihar",
    title: "Construction Cost in Bihar Per Sq Ft (2026 Guide)",
    desc: "Complete cost breakdown, materials, and budget planning tips for building a house in Bihar.",
  },
  {
    slug: "1000-sqft-house-plan",
    title: "Best 1000 Sq Ft House Plan Ideas (2BHK & 3BHK)",
    desc: "Explore modern layouts and smart space planning ideas for small homes.",
  },
  {
    slug: "low-budget-house-construction",
    title: "Low Budget House Construction Tips in India",
    desc: "Save money while building your dream home with practical construction tips.",
  },
  {
    slug: "vastu-tips-home",
    title: "Top Vastu Tips for Home in India",
    desc: "Learn vastu directions for kitchen, bedroom, and entrance for a positive home.",
  },
  {
    slug: "2bhk-house-design",
    title: "2BHK House Design Ideas for Modern Homes",
    desc: "Simple and modern 2BHK design ideas for Indian families.",
  },
  {
    slug: "modern-house-design-india",
    title: "Modern House Design Trends in India (2026)",
    desc: "Latest elevation, layout, and smart home design trends.",
  },
  {
    slug: "construction-material-cost",
    title: "Construction Material Cost Breakdown in India",
    desc: "Understand cement, steel, and labor cost distribution in construction.",
  },
  {
    slug: "house-design-mistakes",
    title: "Common House Design Mistakes to Avoid",
    desc: "Avoid costly mistakes while planning your house.",
  },
  {
    slug: "small-house-design",
    title: "Small House Design Ideas for Indian Homes",
    desc: "Make your small home look bigger with smart design tips.",
  },
  {
    slug: "house-planning-guide",
    title: "Step-by-Step House Planning Guide (India)",
    desc: "From budget to construction, a complete planning guide.",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">🏡 Home Design & Construction Blog</h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Explore expert guides on house design, construction cost, vastu tips, and modern home planning in India.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <Link
            key={blog.slug}
            href={`/blog/${blog.slug}`}
            className="block border rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              {blog.title}
            </h2>

            <p className="text-gray-600 text-sm">
              {blog.desc}
            </p>

            <span className="inline-block mt-4 text-blue-600 font-semibold text-sm">
              Read More →
            </span>
          </Link>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 bg-blue-50 p-8 rounded-2xl text-center">
        <h3 className="text-2xl font-bold mb-2">
          Need a Custom House Design?
        </h3>
        <p className="text-gray-600 mb-4">
          Get professional 2D plans, 3D elevation & vastu-compliant layouts.
        </p>

        <a
          href="/services"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Explore Services
        </a>
      </div>

    </div>
  );
}