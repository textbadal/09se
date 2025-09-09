"use client";

import React from "react";
import {
  Ruler,
  Building,
  Compass,
  Home,
  Paintbrush,
  Users,
} from "lucide-react";

export default function Services() {
  return (
    <section className="min-h-screen bg-gray-50 text-gray-900 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Our <span className="text-blue-600">Architectural Services</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          At <span className="font-semibold">Dream Homes Bihar</span>, we create
          homes that blend modern design, vastu compliance, and smart space
          planning. From concept to completion, we deliver architecture that is
          elegant, functional, and future-ready.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Service 1 */}
        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition">
          <Ruler className="w-10 h-10 text-blue-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            Custom Floor Plans
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Personalized 2D house plans that optimize space, ventilation, and
            natural light — designed as per your family’s lifestyle, budget, and
            vastu guidelines.
          </p>
        </div>

        {/* Service 2 */}
        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition">
          <Building className="w-10 h-10 text-blue-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            3D Elevation Designs
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Modern and premium 3D front elevation concepts that give your dream
            home a stunning, contemporary appearance while reflecting your style.
          </p>
        </div>

        {/* Service 3 */}
        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition">
          <Compass className="w-10 h-10 text-blue-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            Vastu Consultation
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Expert vastu guidance to ensure balance, harmony, and prosperity in
            your home. We design layouts that respect tradition while embracing
            modernity.
          </p>
        </div>

        {/* Service 4 */}
        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition">
          <Home className="w-10 h-10 text-blue-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            Interior Design Planning
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Smart and stylish interior layouts that combine functionality with
            aesthetics — from furniture placement to space optimization.
          </p>
        </div>

        {/* Service 5 */}
        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition">
          <Paintbrush className="w-10 h-10 text-blue-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            Renovation & Remodeling
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Transform your old spaces into modern, efficient, and visually
            appealing environments with our renovation and remodeling services.
          </p>
        </div>

        {/* Service 6 */}
        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition">
          <Users className="w-10 h-10 text-blue-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            Project Support
          </h2>
          <p className="text-gray-600 leading-relaxed">
            End-to-end assistance — including design revisions, plan approvals,
            and contractor coordination — ensuring a smooth building process.
          </p>
        </div>
      </div>
    </section>
  );
}
