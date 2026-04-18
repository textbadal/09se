"use client";

import Image from "next/image";

export default function HeroOptimized() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">

      {/* LEFT CONTENT */}
      <div className="text-center md:text-left">

        {/* Tag */}
        <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
          🏡 Modern House Design Experts
        </span>

        {/* H1 */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Get Your Dream Home Design <br />
          <span className="text-blue-600">Starting @ ₹16,999</span>
        </h1>

        {/* Description */}
        <p className="mt-5 text-lg text-gray-700 max-w-lg mx-auto md:mx-0">
          Professional 2D floor plans, 3D elevation designs, and modern layouts 
          tailored to your needs. Fast delivery, expert support, and affordable pricing.
        </p>

        {/* CTA */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

          <a
            href="/payment"
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            Book Now @ ₹499
          </a>

          <a
            href="https://wa.me/916205820278?text=Hi%20I%20want%20house%20design"
            target="_blank"
            className="bg-green-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:scale-105 transition-all duration-300"
          >
            Chat on WhatsApp
          </a>
        </div>

        {/* Features */}
        <div className="mt-10 flex flex-wrap gap-3 justify-center md:justify-start">
          {[
            "Modern Designs",
            "Fast Delivery",
            "Affordable Pricing",
            "Expert Support",
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white px-4 py-2 rounded-lg shadow text-sm font-medium"
            >
              ✔ {item}
            </div>
          ))}
        </div>

        {/* Trust */}
        <div className="mt-8 text-sm text-gray-600">
          <p className="font-semibold">5000+ Happy Clients Worldwide</p>
          <p className="text-xs">Trusted Design Service</p>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative">
        <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200">

          <Image
            src="/images/gallery25.jpg"
            alt="Modern house design with 2D floor plan and 3D elevation"
            width={700}
            height={500}
            priority
            quality={85}
            className="w-full h-auto"
          />

          <div className="absolute bottom-4 left-4 bg-green-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
            Starting @ ₹16,999
          </div>
        </div>

        <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg px-4 py-2 text-sm font-semibold">
          ⭐ 5000+ Clients
        </div>
      </div>
    </section>
  );
}