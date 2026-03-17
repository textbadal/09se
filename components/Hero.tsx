import Image from "next/image";

export default function HeroOptimized() {
  return (
    <section className="relative flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-16 md:py-24 gap-10 overflow-hidden">

      {/* LEFT IMAGE */}
      <div className="flex-1 relative">
        <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white">
          
          <Image
            src="/images/dhb-16999.webp"
            alt="Modern dream home design"
            width={600}
            height={400}
            priority
            quality={80}
            className="w-full h-auto"
          />

          {/* Price Badge */}
          <div className="absolute bottom-4 left-4 bg-green-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
            Starting @ ₹16,999
          </div>
        </div>

        {/* Trust Badge */}
        <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-md px-3 py-1 text-sm font-semibold">
          🏆 5000+ Homes Designed
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 text-center md:text-left">

        {/* Tagline */}
        <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
          🏡 Vastu + Modern Design Experts
        </span>

        {/* HEADLINE */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Get Your Dream Home Design <br />
          <span className="text-blue-600">Starting @ ₹16,999</span>
        </h1>

        {/* SUBTEXT */}
        <p className="mt-5 text-lg text-gray-700 max-w-md mx-auto md:mx-0">
          Custom house plans, 2D layouts, and modern elevations tailored to your needs. Fast delivery & expert support.
        </p>

        {/* CTA BUTTONS */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/916205820278?text=Hi%20I%20want%20house%20design"
            target="_blank"
            className="bg-green-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:scale-105 transition-all duration-300"
          >
            Contact Now
          </a>

          {/* Secondary CTA */}
          <a
            href="#services"
            className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            View Plans
          </a>
        </div>

        {/* FEATURES */}
        <div className="mt-10 flex flex-wrap gap-3 justify-center md:justify-start">
          {[
            "Vastu-Compliant",
            "Modern Design",
            "Fast Delivery",
            "Affordable"
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white px-4 py-2 rounded-lg shadow text-sm font-medium"
            >
              ✔ {item}
            </div>
          ))}
        </div>

        {/* TRUST TEXT */}
        <div className="mt-8 text-sm text-gray-600">
          <p className="font-semibold">5000+ Homes Designed Across India</p>
          <p className="text-xs">Limited Time Offer – Book Today</p>
        </div>
      </div>
    </section>
  );
}