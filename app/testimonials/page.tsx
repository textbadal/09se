"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Delhi",
      feedback:
        "Dream Homes Bihar designed my house perfectly as per Vastu. The team is very professional and cooperative!",
      image: "/images/user1.jpg",
    },
    {
      name: "Anjali Singh",
      role: "Mumbai, Maharashtra",
      feedback:
        "They provided me with an amazing 3D front elevation. My family loved the design!",
      image: "/images/user2.jpg",
    },
    {
      name: "Amit Sharma",
      role: "Bangalore, Karnataka",
      feedback:
        "Affordable pricing and top-class service. Highly recommended for house planning!",
      image: "/images/user3.jpg",
    },
    {
      name: "Priya Verma",
      role: "Jaipur, Rajasthan",
      feedback:
        "They gave me a customized plan that suited my budget. I am very happy with the results!",
      image: "/images/user4.jpg",
    },
    {
      name: "Suresh Prasad",
      role: "Chennai, Tamil Nadu",
      feedback:
        "Excellent design quality and timely delivery. Their Vastu suggestions really helped.",
      image: "/images/user5.jpg",
    },
    {
      name: "Neha Gupta",
      role: "Kolkata, West Bengal",
      feedback:
        "The 3D design looked so real that we could visualize our dream home before construction.",
      image: "/images/user6.jpg",
    },
    {
      name: "Arun Mishra",
      role: "Lucknow, Uttar Pradesh",
      feedback:
        "Professional team with deep knowledge in house planning. Truly value for money!",
      image: "/images/user7.jpg",
    },
    {
      name: "Kiran Devi",
      role: "Hyderabad, Telangana",
      feedback:
        "Very responsive and supportive team. They made the whole process stress-free.",
      image: "/images/user8.jpg",
    },
  ];

  const faqs = [
    {
      question: "Do you provide Vastu-compliant house designs?",
      answer:
        "Yes, all our house plans are designed keeping Vastu principles in mind, while also balancing modern design needs.",
    },
    {
      question: "Can I get a customized house plan as per my plot size?",
      answer:
        "Absolutely! We create tailored house plans as per your plot size, budget, and specific requirements.",
    },
    {
      question: "Do you provide 3D elevation designs?",
      answer:
        "Yes, we specialize in realistic 3D front elevation designs so you can visualize your dream home before construction.",
    },
    {
      question: "What is the price range of your services?",
      answer:
        "Our services start as low as ₹999 and go up depending on the complexity of the project.",
    },
    {
      question: "Do you provide services outside Bihar?",
      answer:
        "Yes! We serve clients across all of India through our online house planning and design services.",
    },
  ];

  // ✅ Explicit type fix for TypeScript error
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
          What Our Clients Say
        </h1>
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Real stories from happy homeowners across{" "}
          <span className="font-semibold">India</span> who trusted us for their
          dream house planning and design.
        </p>
      </section>

      {/* Testimonials Slider */}
      <section>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border shadow hover:shadow-xl transition h-full flex flex-col">
                {/* User Info */}
                <div className="flex items-center gap-4">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                      {t.name}
                    </h3>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
                {/* Feedback */}
                <p className="mt-6 text-gray-700 dark:text-gray-300 italic leading-relaxed">
                  “{t.feedback}”
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* FAQ Section */}
      <section className="mt-24">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto">
          Here are some common questions our clients ask before starting their
          house planning journey with us.
        </p>

        <div className="mt-12 max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border rounded-xl p-4 bg-white dark:bg-gray-900 shadow"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                aria-expanded={openFAQ === idx}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="font-medium text-lg text-gray-900 dark:text-white">
                  {faq.question}
                </span>
                {openFAQ === idx ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {openFAQ === idx && (
                <p className="mt-3 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
