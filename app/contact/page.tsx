"use client";

import { useState } from "react";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("✅ Your message has been sent! (Backend integration needed)");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-24">
      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Have questions or want to start your dream project? Let’s talk.
        </p>
      </div>

     

      {/* Quick Actions */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
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
          href="mailto:contactdreamhomesbihar@gmail.com"
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 text-white font-medium shadow hover:shadow-lg hover:scale-105 transition"
        >
          <Mail size={18} /> Email
        </a>
      </div>

      {/* Contact Section */}
      <div className="mt-16 grid md:grid-cols-2 gap-12">
        {/* Left: Info Card */}
        <div className="bg-white p-8 rounded-2xl shadow-md border">
          <h2 className="text-2xl font-semibold mb-4">Our Office</h2>

          <p className="text-gray-600 mb-6">
            Dream Homes Bihar provides professional house planning, 3D elevation, and vastu consultancy services.
          </p>

          <div className="space-y-4 text-gray-700">
            <div className="flex items-center gap-3">
              <MapPin size={18} /> Patna, Bihar, India
            </div>

            {/* Highlighted Numbers Inside Card */}
            <div className="bg-gray-100 p-4 rounded-xl">
              <p className="text-sm text-gray-500 mb-2">Phone Numbers</p>
              <div className="space-y-2">
                <a href="tel:+916205820278" className="block font-semibold text-lg hover:text-black">
                  +91 62058 20278
                </a>
                <a href="tel:+917817872924" className="block font-semibold text-lg hover:text-black">
                  +91 78178 72924
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={18} /> contactdreamhomesbihar@gmail.com
            </div>
          </div>

          {/* Map */}
          <div className="mt-6 overflow-hidden rounded-xl border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902457909058!2d85.1376!3d25.5941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58c7c5b18f1f%3A0x7a1429b1d9d3e50f!2sPatna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1706500000000!5m2!1sen!2sin"
              width="100%"
              height="250"
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Right: Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-md border space-y-5"
        >
          <h2 className="text-2xl font-semibold mb-2">Send a Message</h2>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="mt-1 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Tell us about your project..."
              className="mt-1 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
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
    </main>
  );
}