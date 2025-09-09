"use client";

import { useState } from "react";
import Image from "next/image"; // ✅ Import Next Image
import {
  Home,
  PenTool,
  Building,
  Compass,
  FileText,
  Map,
  Users,
  Ruler,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Phone,
  MessageCircle,
  Quote,
  Star,
} from "lucide-react";

const services = [
  {
    id: 1,
    name: "House Planning",
    description:
      "Tailored house plans designed with vastu compliance, modern standards, and your exact requirements.",
    icon: Home,
    details: [
      { label: "Starting Price", value: "₹999", icon: Ruler },
      { label: "Delivery", value: "2-3 Days", icon: FileText },
      { label: "Revisions", value: "2 Free", icon: PenTool },
    ],
    benefits: [
      "Customized as per plot size & family needs",
      "Vastu-compliant designs",
      "Detailed floor plan with dimensions",
    ],
  },
  {
    id: 2,
    name: "Interior Design",
    description:
      "Transform your space with beautiful, functional, and budget-friendly interior designs.",
    icon: PenTool,
    details: [
      { label: "Starting Price", value: "₹2,499", icon: Ruler },
      { label: "Delivery", value: "5-7 Days", icon: FileText },
      { label: "Consultation", value: "Free", icon: Users },
    ],
    benefits: [
      "Personalized design concepts",
      "3D visualizations for clarity",
      "Smart space utilization",
    ],
  },
  {
    id: 3,
    name: "3D Elevation",
    description:
      "Get realistic 3D front elevations that bring your dream home to life before construction.",
    icon: Building,
    details: [
      { label: "Starting Price", value: "₹1,499", icon: Ruler },
      { label: "Delivery", value: "3-4 Days", icon: FileText },
      { label: "Views", value: "3 Angles", icon: Compass },
    ],
    benefits: [
      "Photorealistic rendering",
      "Multiple viewing angles",
      "Modern & traditional styles",
    ],
  },
  {
    id: 4,
    name: "Vastu Consultation",
    description:
      "Expert vastu guidance for homes and offices to bring harmony, health, and prosperity.",
    icon: Compass,
    details: [
      { label: "Starting Price", value: "₹599", icon: Ruler },
      { label: "Delivery", value: "1-2 Days", icon: FileText },
      { label: "Mode", value: "Online/Offline", icon: Map },
    ],
    benefits: [
      "Experienced vastu consultants",
      "On-site or online sessions",
      "Practical remedies & solutions",
    ],
  },
];

const faqs = [
  {
    q: "How do I get started with a house plan?",
    a: "Simply share your plot size and requirements via WhatsApp or call us. Our experts will guide you step by step.",
  },
  {
    q: "Are your designs vastu-compliant?",
    a: "Yes, all our plans are vastu-compliant while ensuring modern design standards.",
  },
  {
    q: "How will I receive my designs?",
    a: "We provide digital delivery via email/WhatsApp in PDF, JPEG, and CAD formats.",
  },
  {
    q: "Can I request revisions?",
    a: "Yes, every service includes free revisions to ensure your satisfaction.",
  },
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    feedback:
      "Dream Homes Bihar provided us with a beautiful and vastu-compliant house plan. The team was very cooperative!",
    location: "Patna, Bihar",
  },
  {
    name: "Anjali Verma",
    feedback:
      "The 3D elevation they created looked exactly like our completed home. Truly professional service!",
    location: "Gaya, Bihar",
  },
  {
    name: "Amit Singh",
    feedback:
      "Affordable, quick, and high-quality designs. I highly recommend their services.",
    location: "Muzaffarpur, Bihar",
  },
];

export default function ServicesPage() {
  const [openService, setOpenService] = useState<number | null>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white py-20 px-6 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 800 800"
          >
            <circle cx="400" cy="400" r="400" fill="white" />
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* Left content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Design Your Dream Home <br />
              <span className="text-yellow-300">With Expert Guidance</span>
            </h1>
            <p className="text-lg text-blue-100 max-w-xl mb-6">
              We provide professional house planning, interior design, 3D
              elevation, and vastu consultation — everything you need to bring
              your dream home to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="#services"
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-6 py-3 rounded-full shadow-lg transition"
              >
                Explore Services
              </a>
              <a
                href="https://wa.me/919876543210?text=Hi, I want to know more about your services"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-full shadow-lg backdrop-blur-md transition flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Right image */}
          <div className="flex-1 relative">
            <Image
              src="/images/head.png"
              alt="Dream Home Design"
              width={600}
              height={400}
              unoptimized // ✅ required for static export
              className="w-full rounded-2xl shadow-2xl border-4 border-white/20"
            />
            <div className="absolute -bottom-6 -left-6 bg-white text-blue-600 px-6 py-3 rounded-xl shadow-xl font-semibold">
              Trusted by 1000+ Families
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-6">
          {services.map((service) => {
            const Icon = service.icon;
            const isOpen = openService === service.id;

            return (
              <div
                key={service.id}
                className="bg-white shadow-md rounded-2xl overflow-hidden transition"
              >
                {/* Service Header */}
                <button
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setOpenService(isOpen ? null : service.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Icon className="w-7 h-7 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>

                {/* Expanded Content */}
                {isOpen && (
                  <div className="px-5 pb-6">
                    {/* Service Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                      {service.details.map((detail, i) => {
                        const DetailIcon = detail.icon;
                        return (
                          <div
                            key={i}
                            className="bg-gray-50 p-4 rounded-xl text-center"
                          >
                            <DetailIcon className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                            <div className="text-xs text-gray-500">
                              {detail.label}
                            </div>
                            <div className="text-sm font-semibold text-gray-900">
                              {detail.value}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Benefits */}
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">
                        Why Choose This Service?
                      </h4>
                      <ul className="space-y-2">
                        {service.benefits.map((benefit, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-gray-600 text-sm"
                          >
                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-blue-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openFAQ === i;
              return (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <button
                    className="flex items-center justify-between w-full p-5 text-left"
                    onClick={() => setOpenFAQ(isOpen ? null : i)}
                  >
                    <span className="text-gray-900 font-medium">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-gray-600">{faq.a}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Clients Say
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl shadow-lg p-6 flex flex-col justify-between"
              >
                <Quote className="w-8 h-8 text-blue-600 mb-4" />
                <p className="text-gray-700 mb-4 italic">"{t.feedback}"</p>
                <div className="mt-auto">
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.location}</div>
                  <div className="flex text-yellow-400 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Ready to Start Your Dream Project?
          </h2>
          <p className="text-gray-600 mb-6">
            Get in touch with our expert team today and let’s design something
            amazing together.
          </p>
          <a
            href="tel:+91-9876543210"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow-md"
          >
            <Phone className="w-5 h-5" />
            Call Now
          </a>
        </div>
      </section>
    </div>
  );
}
