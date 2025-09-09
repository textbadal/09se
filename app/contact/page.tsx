"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("✅ Your message has been sent! (Backend integration needed)");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center">Contact Us</h1>
      <p className="mt-4 text-lg text-gray-600 text-center max-w-2xl mx-auto">
        Have questions or want to start your dream project? Get in touch with us!
      </p>

      {/* Contact Section */}
      <div className="mt-12 grid md:grid-cols-2 gap-10">
        {/* Left: Contact Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Our Office</h2>
          <p className="text-gray-600">
            Dream Homes Bihar <br />
            Patna, Bihar, India
          </p>
          <p>
            📞 <a href="tel:+916205820278" className="text-blue-600 hover:underline">
              +91 62058 20278
            </a>
          </p>
          <p>
            💬 <a href="https://wa.me/916205820278" target="_blank" className="text-green-600 hover:underline">
              Chat on WhatsApp
            </a>
          </p>
          <p>📧 dreamhomesbihar@gmail.com</p>

          {/* Google Map */}
          <div className="rounded-xl overflow-hidden border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902457909058!2d85.1376!3d25.5941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58c7c5b18f1f%3A0x7a1429b1d9d3e50f!2sPatna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1706500000000!5m2!1sen!2sin"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Right: Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-900 p-6 rounded-xl shadow border">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={4}
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}
