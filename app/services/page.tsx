"use client";

import React from "react";
import { FaHome, FaBuilding, FaPencilRuler, FaTools } from "react-icons/fa";

const services = [
  {
    id: 1,
    icon: <FaHome className="text-5xl text-teal-500" />,
    title: "Residential Design",
    description:
      "We design beautiful and vastu-compliant residential spaces tailored to your lifestyle.",
  },
  {
    id: 2,
    icon: <FaBuilding className="text-5xl text-teal-500" />,
    title: "Commercial Design",
    description:
      "We create functional and modern commercial spaces that boost productivity and brand value.",
  },
  {
    id: 3,
    icon: <FaPencilRuler className="text-5xl text-teal-500" />,
    title: "Custom Floor Plans",
    description:
      "Unique, precise, and innovative floor plans designed to suit your requirements.",
  },
  {
    id: 4,
    icon: <FaTools className="text-5xl text-teal-500" />,
    title: "Renovation & Remodeling",
    description:
      "Transform your existing space into something extraordinary with our expert remodeling services.",
  },
];

export default function ServicesPage() {
  return (
    <div className="py-16 px-6 lg:px-20 bg-gray-50">
      {/* Title Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Our <span className="text-teal-500">Services</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We provide a wide range of architectural and design services to bring your dream projects to life.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-lg transition"
          >
            <div className="mb-6">{service.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {service.title}
            </h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Call To Action */}
      <div className="text-center bg-teal-500 py-12 px-6 rounded-2xl shadow-md">
        <h3 className="text-3xl font-bold text-white mb-4">
          Ready to start your project?
        </h3>
        <p className="text-white mb-6">
          Get in touch with our expert team today and let&apos;s design something amazing together.
        </p>
        <a
          href="/contact"
          className="bg-white text-teal-600 px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
