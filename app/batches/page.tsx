"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import {
  Calendar,
  IndianRupee,
  Users,
  Star,
  Award,
  Download,
} from "lucide-react";

/* ------------------ TYPES ------------------ */
type Testimonial = {
  name: string;
  text: string;
};

/* ------------------ PAGE ------------------ */
export default function BatchesPage() {
  /* Countdown */
  const batchStartDate = new Date("2026-03-15T10:00:00");
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = batchStartDate.getTime() - now;

      if (diff <= 0) {
        setTimeLeft("Batch Started");
        clearInterval(timer);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setTimeLeft(`${days} Days ${hours} Hours`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /* Testimonials */
  const testimonials: Testimonial[] = [
    {
      name: "Priya Sharma",
      text: "The Vastu and manifestation techniques completely changed my life.",
    },
    {
      name: "Rahul Verma",
      text: "Practical, simple, and powerful guidance. Highly recommended.",
    },
    {
      name: "Anjali Singh",
      text: "I feel more confident, calm, and aligned after this batch.",
    },
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <>
      {/* ================= SEO ================= */}
      <Head>
        <title>Holistic Growth Batch | Vastu, Manifestation & Healing</title>
        <meta
          name="description"
          content="Join our Holistic Growth Batch covering Vastu Shastra, Law of Attraction, Healing & Manifestation. Limited seats available."
        />
        <meta
          name="keywords"
          content="Vastu course, manifestation batch, healing training, law of attraction class"
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">

        {/* ================= HERO ================= */}
        <section className="text-center py-20 px-6 bg-gradient-to-r from-purple-800 to-indigo-900 text-white">
          <h1 className="text-5xl font-bold mb-4">
            Holistic Growth Transformation Batch
          </h1>
          <p className="text-xl text-purple-200 mb-6">
            Vastu • Law of Attraction • Healing • Manifestation
          </p>

          <div className="text-lg bg-white/10 inline-block px-6 py-3 rounded-xl">
            Batch Starts In: <strong>{timeLeft}</strong>
          </div>
        </section>

        {/* ================= DETAILS ================= */}
        <section className="py-16 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: Calendar, title: "Duration", value: "4 Weeks" },
            { icon: Users, title: "Mode", value: "Online Live" },
            { icon: IndianRupee, title: "Fees", value: "₹2,999" },
            { icon: Award, title: "Certificate", value: "Yes" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-6 text-center"
            >
              <item.icon className="mx-auto mb-3 text-purple-600" />
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-gray-600">{item.value}</p>
            </div>
          ))}
        </section>

        {/* ================= TRAINER ================= */}
        <section className="py-16 px-6 bg-purple-50">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center">
            <div className="w-48 h-48 bg-purple-700 text-white rounded-full flex items-center justify-center text-3xl font-bold">
              SK
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-2">Swati Kapoor</h2>
              <p className="text-purple-600 mb-4">
                Certified Holistic Coach & Vastu Expert
              </p>
              <p className="text-gray-700">
                12+ years of experience, trained 500+ students worldwide using
                ancient wisdom with modern techniques.
              </p>
            </div>
          </div>
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section className="py-16 px-6 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">What Students Say</h2>

          <div className="bg-white shadow-lg rounded-xl p-8">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <p className="italic text-gray-700 mb-4">
              "{testimonials[activeTestimonial].text}"
            </p>
            <p className="font-semibold">
              — {testimonials[activeTestimonial].name}
            </p>
          </div>
        </section>

        {/* ================= BROCHURE ================= */}
        <section className="py-16 px-6 text-center bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
          <h2 className="text-3xl font-bold mb-6">
            Download Detailed Brochure
          </h2>

          <a
            href="/brochure.pdf"
            download
            className="inline-flex items-center gap-2 bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"
          >
            <Download />
            Download PDF
          </a>
        </section>
      </main>
    </>
  );
}
