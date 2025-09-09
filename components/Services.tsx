"use client";

import React from "react";

export default function Services() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Our Services</h1>
        <p className="mb-8 text-lg">
          We provide customized house planning, 2D floor plans, and 3D
          elevation designs with modern and vastu-compliant layouts.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4">Custom Floor Plans</h2>
            <p>
              Get a personalized 2D floor plan designed as per your
              requirements, vastu guidelines, and budget.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4">3D Elevation</h2>
            <p>
              Beautiful 3D front elevation designs that give a modern and
              aesthetic look to your dream home.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4">Consultation</h2>
            <p>
              Expert guidance for vastu, house planning, and design optimization
              tailored to your family’s needs.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4">Web Design Services</h2>
            <p>
              We also provide responsive website development and design for
              architects, builders, and businesses.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
