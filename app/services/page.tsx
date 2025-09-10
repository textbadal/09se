"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type Service = {
  title: string;
  description: string;
  price: string;
  image: string;
};

const services: Service[] = [
  {
    title: "2D Floor Plan",
    description: "Detailed floor plans for your home with measurements and layout.",
    price: "₹999 onwards",
    image: "/images/floor3.webp",
  },
  {
    title: "3D Elevation Design",
    description: "Realistic 3D elevation rendering of your house design.",
    price: "₹1,999 onwards",
    image: "/images/gallery9.jpg",
  },
  {
    title: "Interior Design",
    description: "Complete interior design with Vastu compliance and decor suggestions.",
    price: "₹2,499 onwards",
    image: "/images/gallery23.jpg",
  },
  {
    title: "Plumbing & Electrical Plan",
    description: "Professional plumbing and electrical layout for smooth construction.",
    price: "₹1,499 onwards",
    image: "/images/services/plumbing-electrical.jpg",
  },
  {
    title: "Footing Plan",
    description: "Accurate footing plan for safe and strong foundation.",
    price: "₹999 onwards",
    image: "/images/services/footing.jpg",
  },
  {
    title: "Vastu Compliance Check",
    description: "Ensure your home follows Vastu principles for positivity.",
    price: "₹799 onwards",
    image: "/images/services/vastu.jpg",
  },
];

export default function Services() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <main className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <section className="py-20 text-center px-6 max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold"
        >
          Our Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 text-lg opacity-80 max-w-2xl mx-auto"
        >
          Affordable, professional services for Indian clients with detailed planning and design.
        </motion.p>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              className="rounded-xl border shadow-lg overflow-hidden bg-white dark:bg-gray-800 transition cursor-pointer"
              onClick={() => setExpanded(expanded === idx ? null : idx)}
            >
              <div className="relative w-full h-56">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5 text-left">
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-2 font-medium text-indigo-600">{service.price}</p>
                {expanded === idx && (
                  <p className="mt-3 text-gray-700 dark:text-gray-200">{service.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-20 px-6 max-w-7xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-xl">
        <h2 className="text-3xl font-bold text-center mb-10">Pricing Summary</h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 text-center">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-5 bg-white dark:bg-gray-700 shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-indigo-600 font-bold mb-2">{service.price}</p>
              <p className="text-gray-700 dark:text-gray-200 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
