// components/Footer.jsx
"use client";

import Link from "next/link";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaYoutube, 
  FaWhatsapp,
  FaLinkedinIn
} from "react-icons/fa";
import { 
  MdLocationOn, 
  MdPhone, 
  MdEmail, 
  MdAccessTime,
  MdArrowForward
} from "react-icons/md";
import { 
  BiBuildingHouse, 
  BiHome, 
  BiBuilding,
  BiRocket
} from "react-icons/bi";
import { GiIndiaGate } from "react-icons/gi";
import { SiGooglemaps } from "react-icons/si";
import { BsGlobe2 } from "react-icons/bs";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* Top Border */}
      <div className="h-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BiBuildingHouse className="w-8 h-8 text-yellow-500" />
              <div>
                <h2 className="text-2xl font-bold text-yellow-500">Dream Homes</h2>
                <p className="text-xs text-gray-500">Bihar | India | Global</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Vastu-compliant homes, modern interiors, and architectural plans across India and worldwide.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <GiIndiaGate className="text-yellow-500" />
              <span className="text-sm">
                <span className="text-white font-semibold">15+ Years</span>
                <span className="text-gray-500"> of Excellence</span>
              </span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-500 mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              {[
                "House Planning",
                "Vastu Consultancy",
                "3D Elevation Design",
                "Interior Designing",
                "Commercial Projects",
                "Renovation Services",
              ].map((service) => (
                <li key={service}>
                  <Link 
                    href={`/services/${service.toLowerCase().replace(/\s+/g, '-')}`}
                    className="hover:text-yellow-400 transition flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-yellow-500 rounded-full group-hover:w-2 transition-all" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-500 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                "About Us",
                "Portfolio",
                "Testimonials",
                "Blog",
                "FAQ",
                "Contact",
              ].map((link) => (
                <li key={link}>
                  <Link 
                    href={`/${link.toLowerCase()}`}
                    className="hover:text-yellow-400 transition flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-yellow-500 rounded-full group-hover:w-2 transition-all" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-500 mb-4">Get In Touch</h3>
            <div className="space-y-3 text-sm">
              
              <div className="flex items-center gap-3">
                <MdPhone className="text-yellow-500 flex-shrink-0" />
                <div>
                  <a href="tel:+916205820278" className="hover:text-yellow-400 transition">
                    +91 62058 20278
                  </a>
                  
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MdPhone className="text-yellow-500 flex-shrink-0" />
                <div>
                  <a href="tel:+91 7817872924" className="hover:text-yellow-400 transition">
                    +91 78178 72924
                  </a>
                  
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MdPhone className="text-yellow-500 flex-shrink-0" />
                <div>
                  <a href="tel:+918282802920" className="hover:text-yellow-400 transition">
                    +91 82828 02920
                  </a>
                  
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MdEmail className="text-yellow-500 flex-shrink-0" />
                <a href="mailto:contactdreamhomesbihar@gmail.com" className="hover:text-yellow-400 transition break-all">
                  contactdreamhomesbihar@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MdAccessTime className="text-yellow-500 flex-shrink-0" />
                <span className="text-gray-400">Mon-Sat: 9AM - 7PM (IST)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Locations */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Patna", "Delhi NCR", "Mumbai", "Bangalore", 
              "Chennai", "Hyderabad", "Kolkata", "Pune"
            ].map((city) => (
              <Link
                key={city}
                href={`/locations/${city.toLowerCase().replace(/\s+/g, '-')}`}
                className={`px-3 py-1 rounded-full text-xs transition ${
                  city === "Patna" 
                    ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" 
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-yellow-400"
                }`}
              >
                {city}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {["USA", "UK", "Canada", "Australia", "UAE", "Singapore"].map((country) => (
              <Link
                key={country}
                href={`/locations/${country.toLowerCase()}`}
                className="px-3 py-1 rounded-full text-xs bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-yellow-400 transition flex items-center gap-1"
              >
                <BsGlobe2 className="text-[10px]" />
                {country}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-sm text-gray-400">
              © {currentYear} <span className="text-yellow-500 font-semibold">Dream Homes Bihar</span>
              . All rights reserved.
            </p>
            
            <div className="flex items-center gap-4">
              {/* Social Icons */}
              {[
                { icon: FaFacebookF, href: "https://facebook.com/dreamhomesbihar", label: "Facebook" },
                { icon: FaInstagram, href: "https://instagram.com/dreamhomesbihar", label: "Instagram" },
                { icon: FaYoutube, href: "https://youtube.com/@dreamhomesbihar", label: "YouTube" },
                { icon: FaLinkedinIn, href: "https://linkedin.com/company/dreamhomesbihar", label: "LinkedIn" },
                { icon: FaWhatsapp, href: "https://wa.me/916205820278", label: "WhatsApp" },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-gray-500 hover:text-yellow-400 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            <div className="flex gap-3 text-xs">
              <Link href="/privacy-policy" className="text-gray-500 hover:text-yellow-400 transition">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-yellow-400 transition">
                Terms
              </Link>
              <Link href="/sitemap" className="text-gray-500 hover:text-yellow-400 transition">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-yellow-500 text-gray-900 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300 z-40"
        aria-label="Scroll to top"
      >
        <BiRocket className="w-5 h-5" />
      </button>
    </footer>
  );
}