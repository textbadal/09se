"use client";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-500">Dream Homes Bihar</h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            We design vastu-compliant homes, modern interiors, and 
            architectural plans tailored to your dreams. Luxury meets tradition.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-500 mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="/services" className="hover:text-yellow-400 transition">Services</a></li>
            <li><a href="/gallery" className="hover:text-yellow-400 transition">Gallery</a></li>
            <li><a href="/testimonials" className="hover:text-yellow-400 transition">Testimonials</a></li>
            <li><a href="/contact" className="hover:text-yellow-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-500 mb-4">Our Services</h3>
          <ul className="space-y-3 text-sm">
            <li>🏠 House Planning</li>
            <li>📐 Vastu Consultancy</li>
            <li>🎨 3D Elevation Design</li>
            <li>🛋 Interior Designing</li>
            <li>🏢 Commercial Projects</li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-500 mb-4">Stay Connected</h3>
          <ul className="space-y-3 text-sm mb-6">
            <li>📍 Patna, Bihar</li>
            <li>📞 <a href="tel:+916205820278" className="hover:text-yellow-400">+91 62058 20278</a></li>
            <li>📧 <a href="mailto:dreamhomesbihar@gmail.com" className="hover:text-yellow-400">dreamhomesbihar@gmail.com</a></li>
          </ul>

          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:scale-110 transition text-blue-600"><FaFacebookF /></a>
            <a href="#" className="hover:scale-110 transition text-pink-500"><FaInstagram /></a>
            <a href="#" className="hover:scale-110 transition text-sky-400"><FaTwitter /></a>
            <a href="#" className="hover:scale-110 transition text-red-600"><FaYoutube /></a>
            <a href="https://wa.me/916205820278" target="_blank" className="hover:scale-110 transition text-green-500"><FaWhatsapp /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 dark:border-gray-700 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} <span className="text-yellow-500 font-semibold">Dream Homes Bihar</span>. All rights reserved.
      </div>
    </footer>
  );
}
