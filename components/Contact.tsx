"use client";

import React from "react";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-100 text-gray-900">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold">Get in Touch</h2>
        <p className="mt-4 text-lg opacity-80">
          Have questions or want to start your dream project?  
          We’d love to hear from you!
        </p>

        {/* Quick Contact Options */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="tel:+916205820278"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition"
          >
            📞 Call Us
          </a>
          <a
            href="https://wa.me/916205820278"
            target="_blank"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition"
          >
            💬 WhatsApp
          </a>
          <a
            href="mailto:dreamhomesbihar@gmail.com"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            ✉️ Email Us
          </a>
        </div>

        {/* Info + Form Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
            <p className="mb-4">
              Dream Homes Bihar provides professional house planning, 
              3D elevation, and vastu consultancy across Bihar.
            </p>
            <ul className="space-y-3 text-lg">
              <li>📍 Patna, Bihar, India</li>
              <li>📞 +91 62058 20278</li>
              <li>✉️ dreamhomesbihar@gmail.com</li>
            </ul>
            <div className="mt-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3569.2066379555!2d85.1415!3d25.5941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58f35b46!2sPatna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1633093812345!5m2!1sen!2sin"
                width="100%"
                height="250"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Send Us a Message</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  className="w-full mt-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-black"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full mt-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-black"
                  placeholder="Your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Message</label>
                <textarea
                  rows={4}
                  className="w-full mt-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-black"
                  placeholder="Tell us about your project..."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition"
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
