"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroOptimized() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">

      {/* LEFT CONTENT */}
      <div>

        {/* Tag */}
        <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
          🏡 Modern House Design Experts
        </span>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Plan Your Dream Home <br />
          <span className="text-blue-600">Smartly & Affordably</span>
        </h1>

        {/* Description */}
        <p className="mt-5 text-lg text-gray-700 max-w-lg">
          Use our smart tools to estimate construction cost, check vastu, 
          and explore complete house design services.
        </p>

        {/* CTA */}
        <div className="mt-6 flex gap-4 flex-wrap">
          <Link
            href="/payment"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
          >
            Book Design @ ₹499
          </Link>

          <a
            href="https://wa.me/916205820278"
            target="_blank"
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-600 transition"
          >
            WhatsApp
          </a>
        </div>

        {/* 🔥 TOOLS & SERVICES (Clickable) */}
        <div className="mt-10">

          <p className="text-sm font-semibold text-gray-500 mb-3">
            TOOLS & SERVICES
          </p>

          <div className="flex flex-wrap gap-3">

            <Link
              href="/calculator"
              className="bg-white border px-4 py-2 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition text-sm font-medium"
            >
              🧮 Construction Calculator
            </Link>

            <Link
              href="/vastu"
              className="bg-white border px-4 py-2 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition text-sm font-medium"
            >
              🧭 Vastu Analysis
            </Link>

            <Link
              href="/services"
              className="bg-white border px-4 py-2 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition text-sm font-medium"
            >
              🏗️ Complete Design Services
            </Link>

          </div>

          <p className="mt-4 text-xs text-gray-500">
            Trusted by 5000+ homeowners across India
          </p>

        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative">
        <div className="rounded-2xl overflow-hidden shadow-xl border">

          <Image
            src="/images/gallery25.jpg"
            alt="House design"
            width={700}
            height={500}
            className="w-full h-auto"
            priority
          />

          <div className="absolute bottom-4 left-4 bg-green-500 text-white px-4 py-2 rounded-lg font-bold">
            Starting @ ₹16,999
          </div>
        </div>

        <div className="absolute -top-4 -right-4 bg-white shadow px-4 py-2 rounded-lg text-sm font-semibold">
          ⭐ 5000+ Clients
        </div>
      </div>

    </section>
  );
}