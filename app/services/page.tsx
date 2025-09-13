"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

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

const faqs = [
  {
    question: "Do you provide services outside Bihar?",
    answer: "Yes, we serve clients all over India with online consultation and design delivery.",
  },
  {
    question: "Are your designs Vastu-compliant?",
    answer: "Yes, every design can be customized as per Vastu principles to bring positivity and balance.",
  },
  {
    question: "How fast will I get my plan?",
    answer: "Most plans are delivered within 3–5 working days, depending on complexity.",
  },
  {
    question: "Can I request changes after delivery?",
    answer: "Yes, we provide free revisions until you’re fully satisfied with your plan.",
  },
];

export default function Services() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
          Design Your Dream Home, Stress-Free
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 text-lg opacity-80 max-w-2xl mx-auto"
        >
          From floor plans to interiors — everything you need, at affordable prices, delivered anywhere in India.
        </motion.p>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
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

      {/* Pricing Highlight */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center bg-indigo-600 text-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Transparent Pricing</h2>
        <p className="text-lg mb-8 opacity-90">
          No hidden costs. Pay only for what you need. Affordable plans starting at just <span className="font-bold">₹799</span>.
        </p>
        <a
          href="/contact"
          className="bg-white text-indigo-600 px-8 py-4 rounded-xl shadow hover:bg-gray-100 transition"
        >
          Get Free Consultation
        </a>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow cursor-pointer"
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                {openFaq === idx ? (
                  <ChevronUp className="w-5 h-5 text-indigo-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-indigo-600" />
                )}
              </div>
              {openFaq === idx && (
                <p className="mt-3 text-gray-700 dark:text-gray-200">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
