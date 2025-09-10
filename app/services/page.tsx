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
    image: "/images/services/2d-plan.jpg",
  },
  {
    title: "3D Elevation Design",
    description: "Realistic 3D elevation rendering of your house design.",
    price: "₹1,999 onwards",
    image: "/images/services/3d-elevation.jpg",
  },
  {
    title: "Interior Design",
    description: "Complete interior design with Vastu compliance and decor suggestions.",
    price: "₹2,499 onwards",
    image: "/images/services/interior.jpg",
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
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold"
        >
          Our Services
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 text-lg opacity-80"
        >
          Affordable, professional services for Indian clients with detailed planning and design.
        </motion.p>

        {/* Services Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-3">
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
      </div>
    </section>
  );
}
