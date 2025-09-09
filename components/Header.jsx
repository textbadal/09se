"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, Home, Sparkles } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home", icon: <Home size={16} /> },
    { href: "/services", label: "Services" },
    { href: "/products", label: "Products" },
    { href: "/gallery", label: "Our Work" },
   { href: "/projects", label: "Projects" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-md py-2" : "bg-gradient-to-r from-blue-50 to-amber-50 py-3"}`}>
      <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
           <Image
  src="/fevicon.png"
  alt="Dream Homes Bihar Logo"
  width={50}
  height={50}
  className="object-contain transition-transform duration-300 group-hover:scale-110"
/>

            <div className="absolute -top-1 -right-1">
              <Sparkles size={12} className="text-amber-500 fill-amber-500" />
            </div>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-amber-600 bg-clip-text text-transparent">
              Dream Homes Bihar
            </h1>
            <p className="text-xs text-gray-500">Building Dreams Together</p>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex items-center gap-1 py-2 px-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 group"
              >
                {link.icon && <span className="opacity-70 group-hover:opacity-100">{link.icon}</span>}
                {link.label}
                <div className="h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-300 mt-1"></div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Call-to-Action */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+916205820278"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-amber-600 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <Phone size={16} />
            <span>+91 62058 20278</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg bg-gradient-to-r from-blue-100 to-amber-100 hover:from-blue-200 hover:to-amber-200 transition-all duration-300"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg animate-fadeIn">
          <ul className="flex flex-col p-4 gap-1 text-sm font-medium text-gray-700">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  {link.icon && link.icon}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="p-4 border-t">
            <a
              href="tel:+916205820278"
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-blue-600 to-amber-500 px-4 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all"
            >
              <Phone size={16} />
              +91 62058 20278
            </a>
          </div>
        </div>
      )}
    </header>
  );
}