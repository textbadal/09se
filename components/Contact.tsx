"use client";

import React from "react";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-gray-50 to-white text-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Let’s Build Your Dream Home
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Get in touch with our experts for house planning, 3D elevation, and vastu consultation.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="tel:+916205820278"
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-black text-white font-medium shadow hover:shadow-lg hover:scale-105 transition"
          >
            <Phone size={18} /> Call Now
          </a>

          <a
            href="https://wa.me/916205820278"
            target="_blank"
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-green-500 text-white font-medium shadow hover:shadow-lg hover:scale-105 transition"
          >
            <MessageCircle size={18} /> WhatsApp
          </a>

          <a
            href="mailto:dreamhomesbihar@gmail.com"
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 text-white font-medium shadow hover:shadow-lg hover:scale-105 transition"
          >
            <Mail size={18} /> Email Us
          </a>
        </div>

        {/* Grid Section */}
        <div className="mt-20 grid md:grid-cols-2 gap-12">
          {/* Info Card */}
          <div className="bg-white p-8 rounded-2xl shadow-md border">
            <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>

            <p className="text-gray-600 mb-6">
              We provide professional architectural services across Bihar. Reach out to us for personalized consultation.
            </p>

            <div className="space-y-4 text-gray-700">
              <div className="flex items-center gap-3">
                <MapPin size={18} /> Patna, Bihar, India
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} /> +91 62058 20278
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} /> dreamhomesbihar@gmail.com
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3569.2066379555!2d85.1415!3d25.5941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58f35b46!2sPatna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1633093812345!5m2!1sen!2sin"
                width="100%"
                height="250"
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white p-8 rounded-2xl shadow-md border">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

            <form className="space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full mt-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-black outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full mt-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-black outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Your Message</label>
                <textarea
                  rows={4}
                  placeholder="Describe your project..."
                  className="w-full mt-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-black outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition shadow"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}