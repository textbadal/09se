"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Home,
  Building2,
  Ruler,
  RefreshCcw,
  Compass,
  Quote,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const services = [
  {
    id: 1,
    icon: <Home className="w-10 h-10 text-indigo-600" />,
    title: "Residential Design",
    description:
      "Tailored house plans designed with modern aesthetics and vastu compliance. Perfect for villas, duplexes, and apartments.",
  },
  {
    id: 2,
    icon: <Building2 className="w-10 h-10 text-indigo-600" />,
    title: "Commercial Design",
    description:
      "Creative, functional, and brand-aligned commercial spaces. Offices, retail, and hospitality projects executed with precision.",
  },
  {
    id: 3,
    icon: <Ruler className="w-10 h-10 text-indigo-600" />,
    title: "Custom Floor Plans",
    description:
      "Unique layouts crafted from scratch with 2D blueprints & immersive 3D views. Fully customized to your requirements.",
  },
  {
    id: 4,
    icon: <RefreshCcw className="w-10 h-10 text-indigo-600" />,
    title: "Renovation & Remodeling",
    description:
      "Transform existing homes with modern upgrades while maintaining vastu principles. Breathe new life into your property.",
  },
  {
    id: 5,
    icon: <Compass className="w-10 h-10 text-indigo-600" />,
    title: "Vastu Consultation",
    description:
      "Expert vastu audits & layout optimization to ensure harmony, prosperity, and well-being in your living or workspace.",
  },
];

const pricingPlans = [
  {
    id: 1,
    name: "Standard",
    price: "₹1,999",
    features: [
      "2D Floor Plan",
      "Vastu Guidance",
      "Furniture Layout",
      "Up to 1000 sq.ft",
      "Unlimited Revisions",
    ],
  },
  {
    id: 2,
    name: "Premium",
    price: "₹5,999",
    features: [
      "2D Floor Plan + Front Elevation",
      "Vastu Guidance",
      "Furniture Layout",
      "Up to 2000 sq.ft",
      "Unlimited Revisions",
    ],
    highlight: true,
  },
  {
    id: 3,
    name: "Complete Package",
    price: "₹13,999",
    features: [
      "2D Floor Plan + Front Elevation",
      "Structural Drawings (Footing, Beam, Slab)",
      "Detailed Electrical & Plumbing",
      "Vastu Guidance",
      "Furniture Layout",
      "Up to 2000 sq.ft",
      "Unlimited Revisions",
    ],
  },
];

const testimonials = [
  {
    id: 1,
    name: "Prashant Patel",
    feedback:
      "Dream Homes Bihar designed our duplex with perfection. They balanced vastu with a modern look beautifully. Highly recommended!",
  },
  {
    id: 2,
    name: "Neha Singh",
    feedback:
      "The team was very professional. I loved the 3D visualization, it helped us imagine our home before construction.",
  },
  {
    id: 3,
    name: "Amit Kumar",
    feedback:
      "Best service in Patna! Affordable, vastu-compliant, and quick delivery of floor plans. Couldn&apos;t be happier.",
  },
];

const faqs = [
  {
    id: 1,
    question: "How long does it take to design a house plan?",
    answer:
      "Typically, a custom floor plan takes 7-10 working days depending on the complexity and requirements.",
  },
  {
    id: 2,
    question: "Do you provide vastu-compliant designs?",
    answer:
      "Yes, all our designs are checked for vastu principles to ensure harmony, health, and prosperity.",
  },
  {
    id: 3,
    question: "Can you provide 3D visualization before finalizing?",
    answer:
      "Absolutely! We provide realistic 3D elevation and walkthroughs so you can visualize your home.",
  },
  {
    id: 4,
    question: "Do you handle construction also?",
    answer:
      "Currently, we specialize in planning, design, and consultation. We also guide clients during construction through partner contractors.",
  },
];

export default function ServicesPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Professional Services
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            From concept to completion, we deliver vastu-compliant, modern designs that transform your vision into reality.
          </p>
          <a
            href="/contact"
            className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-full shadow hover:bg-gray-100 transition inline-block"
          >
            Get a Free Consultation
          </a>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-4">What We Offer</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Comprehensive architectural solutions tailored to your needs, combining modern design with traditional vastu principles.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Transparent Pricing</h2>
          <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
            Choose the package that best fits your needs. All plans include professional designs and vastu compliance.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: plan.id * 0.1 }}
                className={`bg-white rounded-xl shadow-md p-8 ${plan.highlight ? "border-2 border-indigo-600 relative" : "border border-gray-200"}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold text-indigo-600 mb-6">{plan.price}</p>
                <ul className="text-left text-gray-700 space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href="/contact" className={`block w-full px-4 py-3 rounded-lg font-semibold ${plan.highlight ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-gray-100 text-indigo-600 hover:bg-gray-200"} transition`}>
                  Get Started
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about our services.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow p-6 relative"
              >
                <Quote className="w-8 h-8 text-indigo-500 absolute top-4 left-4 opacity-30" />
                <p className="text-gray-600 mb-4 mt-2">{t.feedback}</p>
                <h4 className="font-semibold text-indigo-700">{t.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 text-center mb-12">
          Have questions? We're here to help you understand our process and services.
        </p>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: faq.id * 0.1 }}
              className="bg-white rounded-xl shadow p-6"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                aria-expanded={openFAQ === faq.id}
                className="flex justify-between items-center w-full text-left"
              >
                <span className="font-medium text-lg">{faq.question}</span>
                {openFAQ === faq.id ? (
                  <ChevronUp className="w-5 h-5 text-indigo-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-indigo-600" />
                )}
              </button>
              {openFAQ === faq.id && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 text-gray-600"
                >
                  {faq.answer}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 py-16 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Dream Project?
          </h2>
          <p className="mb-8 opacity-90 text-lg">
            Get in touch with our experts today for vastu-compliant and modern house designs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-full shadow hover:bg-gray-100 transition"
            >
              Contact Us
            </a>
            <a
              href="/projects"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full shadow hover:bg-white hover:text-indigo-600 transition"
            >
              View Our Work
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
