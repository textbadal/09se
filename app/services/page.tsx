"use client";

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
import { motion } from "framer-motion";
import { useState } from "react";

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
    name: "Starter",
    price: "₹999",
    features: [
      "Basic Floor Plan (2D)",
      "Up to 1000 sq.ft",
      "Vastu Guidance",
      "PDF Delivery",
    ],
  },
  {
    id: 2,
    name: "Standard",
    price: "₹4,999",
    features: [
      "Detailed Floor Plan (2D + 3D Elevation)",
      "Up to 2000 sq.ft",
      "Full Vastu Compliance",
      "2 Revisions",
      "PDF + CAD Delivery",
    ],
    highlight: true,
  },
  {
    id: 3,
    name: "Premium",
    price: "₹9,999",
    features: [
      "Complete House Planning (2D + 3D)",
      "Unlimited Sq.ft",
      "Vastu Consultation + Corrections",
      "3 Revisions",
      "CAD + PDF + 3D Walkthrough",
      "Execution Support",
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
      "Best service in Patna! Affordable, vastu-compliant, and quick delivery of floor plans. Couldn’t be happier.",
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
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Our Services
          </motion.h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            Dream Homes Bihar offers complete architectural & interior solutions
            – blending modern design with vastu harmony.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 max-w-6xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition"
          >
            <div className="mb-6">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Pricing Section */}
      <section className="bg-indigo-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Our Pricing Plans</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`relative rounded-2xl p-8 shadow-lg bg-white ${
                  plan.highlight ? "border-2 border-indigo-600 scale-105" : ""
                }`}
              >
                {plan.highlight && (
                  <span className="absolute top-0 right-0 bg-indigo-600 text-white text-xs px-3 py-1 rounded-bl-lg rounded-tr-2xl font-medium">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <p className="text-4xl font-bold text-indigo-600 mb-6">
                  {plan.price}
                </p>
                <ul className="text-gray-700 space-y-3 mb-6 text-left">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span>✅</span> {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact"
                  className={`px-6 py-3 rounded-full font-semibold shadow transition ${
                    plan.highlight
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Get Started
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Why Choose Dream Homes Bihar?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-gray-700">
            <div className="p-6 bg-indigo-50 rounded-xl shadow">
              <h4 className="font-semibold text-lg mb-2">
                Vastu + Modern Design
              </h4>
              <p>
                Perfect balance of traditional vastu principles and modern
                architecture.
              </p>
            </div>
            <div className="p-6 bg-indigo-50 rounded-xl shadow">
              <h4 className="font-semibold text-lg mb-2">Local Expertise</h4>
              <p>
                Deep knowledge of Bihar’s culture, climate, and construction
                practices.
              </p>
            </div>
            <div className="p-6 bg-indigo-50 rounded-xl shadow">
              <h4 className="font-semibold text-lg mb-2">
                Personalized Solutions
              </h4>
              <p>
                We design spaces uniquely tailored to your lifestyle and budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
        <div className="grid md:grid-cols-5 gap-6 text-center">
          {[
            "Consultation",
            "Concept Design",
            "3D Visualization",
            "Final Plan",
            "Execution Support",
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-white rounded-xl shadow hover:shadow-lg"
            >
              <div className="text-2xl font-bold text-indigo-600 mb-2">
                {i + 1}
              </div>
              <p className="font-medium">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">What Our Clients Say</h2>
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
                <p className="text-gray-600 mb-4">{t.feedback}</p>
                <h4 className="font-semibold text-indigo-700">{t.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-xl shadow p-4">
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
                <p className="mt-3 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 py-16 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Your Dream Project?
        </h2>
        <p className="mb-6 opacity-90">
          Get in touch with our experts today for vastu-compliant and modern
          house designs.
        </p>
        <a
          href="/contact"
          className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-full shadow hover:bg-gray-100 transition"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
}
