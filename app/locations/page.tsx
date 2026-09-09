// app/locations/page.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  MdLocationOn, 
  MdPhone, 
  MdEmail, 
  MdArrowForward,
  MdCheckCircle,
  MdStar
} from "react-icons/md";
import { 
  FaWhatsapp
} from "react-icons/fa";
import { BiBuildingHouse, BiRocket } from "react-icons/bi";
import { BsGlobe2 } from "react-icons/bs";
import { GiIndiaGate } from "react-icons/gi";

// City data
const cityData = {
  india: [
    {
      name: "Patna",
      state: "Bihar",
      slug: "patna",
      isMain: true,
      description: "Our headquarters and primary design studio serving Bihar with expert architecture and Vastu consultancy.",
      services: ["House Planning", "Vastu Consultancy", "3D Elevation", "Interior Design"],
      projects: 150,
      rating: 4.9,
      reviews: 120,
      address: "Boring Road, Patna, Bihar 800001",
      phone: "+91 62058 20278",
      email: "contact@dreamhomesbihar.com",
      featured: true,
    },
    {
      name: "Delhi NCR",
      state: "Delhi",
      slug: "delhi-ncr",
      description: "Premium architecture and design services for Delhi, Noida, Gurugram, and the National Capital Region.",
      services: ["Commercial Projects", "Luxury Villas", "Interior Design", "Smart Homes"],
      projects: 85,
      rating: 4.8,
      reviews: 95,
      address: "Sector 62, Noida, Uttar Pradesh",
      phone: "+91 98765 43210",
      email: "delhi@dreamhomesbihar.com",
      featured: true,
    },
    {
      name: "Mumbai",
      state: "Maharashtra",
      slug: "mumbai",
      description: "Coastal architecture and Vastu-compliant designs for Mumbai's unique urban landscape.",
      services: ["Apartment Design", "Vastu Consultancy", "Interior Design", "Renovation"],
      projects: 65,
      rating: 4.7,
      reviews: 78,
      address: "Bandra West, Mumbai, Maharashtra 400050",
      phone: "+91 98765 43211",
      email: "mumbai@dreamhomesbihar.com",
      featured: false,
    },
    {
      name: "Bangalore",
      state: "Karnataka",
      slug: "bangalore",
      description: "Modern architecture and sustainable design solutions for Bangalore's tech-savvy clientele.",
      services: ["Smart Homes", "Sustainable Architecture", "Commercial Design", "3D Elevation"],
      projects: 70,
      rating: 4.8,
      reviews: 82,
      address: "Indiranagar, Bangalore, Karnataka 560038",
      phone: "+91 98765 43212",
      email: "bangalore@dreamhomesbihar.com",
      featured: false,
    },
    {
      name: "Chennai",
      state: "Tamil Nadu",
      slug: "chennai",
      description: "Dravidian-inspired architecture combined with modern Vastu-compliant designs.",
      services: ["Vastu Consultancy", "Traditional Architecture", "Interior Design", "Renovation"],
      projects: 55,
      rating: 4.6,
      reviews: 60,
      address: "Adyar, Chennai, Tamil Nadu 600020",
      phone: "+91 98765 43213",
      email: "chennai@dreamhomesbihar.com",
      featured: false,
    },
    {
      name: "Hyderabad",
      state: "Telangana",
      slug: "hyderabad",
      description: "Nizam-style architecture and modern design solutions for Hyderabad's growing urban needs.",
      services: ["Commercial Projects", "Luxury Villas", "Smart Homes", "3D Elevation"],
      projects: 60,
      rating: 4.7,
      reviews: 68,
      address: "Jubilee Hills, Hyderabad, Telangana 500033",
      phone: "+91 98765 43214",
      email: "hyderabad@dreamhomesbihar.com",
      featured: false,
    },
    {
      name: "Kolkata",
      state: "West Bengal",
      slug: "kolkata",
      description: "Colonial-inspired architecture with modern amenities and Vastu compliance.",
      services: ["Heritage Design", "Vastu Consultancy", "Interior Design", "Renovation"],
      projects: 50,
      rating: 4.6,
      reviews: 55,
      address: "Salt Lake City, Kolkata, West Bengal 700091",
      phone: "+91 98765 43215",
      email: "kolkata@dreamhomesbihar.com",
      featured: false,
    },
    {
      name: "Pune",
      state: "Maharashtra",
      slug: "pune",
      description: "Educational hub architecture and modern residential design for Pune's growing population.",
      services: ["Educational Institutions", "Residential Design", "Interior Design", "Smart Homes"],
      projects: 45,
      rating: 4.5,
      reviews: 50,
      address: "Koregaon Park, Pune, Maharashtra 411001",
      phone: "+91 98765 43216",
      email: "pune@dreamhomesbihar.com",
      featured: false,
    },
  ],
  international: [
    {
      name: "United States",
      slug: "us",
      flag: "🇺🇸",
      cities: "NY, CA, TX, FL",
      description: "Global architecture and design services for US clients seeking Vastu-compliant and modern designs.",
      services: ["Vastu Consultancy", "Modern Architecture", "Sustainable Design", "Interior Design"],
      projects: 35,
      rating: 4.9,
      reviews: 42,
      address: "New York, USA",
      phone: "+1 212-555-0123",
      email: "us@dreamhomesbihar.com",
      timezone: "EST/PST",
      featured: true,
    },
    {
      name: "United Kingdom",
      slug: "uk",
      flag: "🇬🇧",
      cities: "London, Manchester",
      description: "British-inspired architecture with Vastu principles for UK-based clients.",
      services: ["Heritage Design", "Vastu Consultancy", "Modern Architecture", "Interior Design"],
      projects: 28,
      rating: 4.8,
      reviews: 35,
      address: "London, UK",
      phone: "+44 20 7123 4567",
      email: "uk@dreamhomesbihar.com",
      timezone: "GMT",
      featured: false,
    },
    {
      name: "Canada",
      slug: "canada",
      flag: "🇨🇦",
      cities: "Toronto, Vancouver",
      description: "Cold-climate architecture with Vastu compliance for Canadian homes and offices.",
      services: ["Winter Architecture", "Vastu Consultancy", "Interior Design", "Renovation"],
      projects: 22,
      rating: 4.7,
      reviews: 28,
      address: "Toronto, Canada",
      phone: "+1 416-555-0123",
      email: "canada@dreamhomesbihar.com",
      timezone: "EST/PST",
      featured: false,
    },
    {
      name: "Australia",
      slug: "australia",
      flag: "🇦🇺",
      cities: "Sydney, Melbourne",
      description: "Modern Australian architecture with Vastu and sustainable design principles.",
      services: ["Sustainable Design", "Modern Architecture", "Vastu Consultancy", "Smart Homes"],
      projects: 20,
      rating: 4.8,
      reviews: 25,
      address: "Sydney, Australia",
      phone: "+61 2 8123 4567",
      email: "australia@dreamhomesbihar.com",
      timezone: "AEST",
      featured: false,
    },
    {
      name: "UAE",
      slug: "uae",
      flag: "🇦🇪",
      cities: "Dubai, Abu Dhabi",
      description: "Luxury desert architecture with Vastu compliance for UAE clients.",
      services: ["Luxury Villas", "Vastu Consultancy", "Modern Architecture", "Interior Design"],
      projects: 30,
      rating: 4.9,
      reviews: 38,
      address: "Dubai, UAE",
      phone: "+971 4 123 4567",
      email: "uae@dreamhomesbihar.com",
      timezone: "GST",
      featured: true,
    },
    {
      name: "Singapore",
      slug: "singapore",
      flag: "🇸🇬",
      cities: "Singapore City",
      description: "Modern tropical architecture with Vastu principles for Singapore residents.",
      services: ["Tropical Design", "Vastu Consultancy", "Smart Homes", "Interior Design"],
      projects: 18,
      rating: 4.7,
      reviews: 22,
      address: "Singapore",
      phone: "+65 6123 4567",
      email: "singapore@dreamhomesbihar.com",
      timezone: "SGT",
      featured: false,
    },
    {
      name: "Germany",
      slug: "germany",
      flag: "🇩🇪",
      cities: "Berlin, Munich",
      description: "German precision architecture with Vastu compliance for European clients.",
      services: ["Precision Design", "Vastu Consultancy", "Sustainable Architecture", "Interior Design"],
      projects: 15,
      rating: 4.6,
      reviews: 18,
      address: "Berlin, Germany",
      phone: "+49 30 1234 5678",
      email: "germany@dreamhomesbihar.com",
      timezone: "CET",
      featured: false,
    },
    {
      name: "France",
      slug: "france",
      flag: "🇫🇷",
      cities: "Paris, Lyon",
      description: "French-inspired architecture with Vastu principles for France-based clients.",
      services: ["French Design", "Vastu Consultancy", "Modern Architecture", "Interior Design"],
      projects: 12,
      rating: 4.5,
      reviews: 15,
      address: "Paris, France",
      phone: "+33 1 2345 6789",
      email: "france@dreamhomesbihar.com",
      timezone: "CET",
      featured: false,
    },
  ],
};

// Location Card Component
function LocationCard({ location, type }: { location: any; type: 'india' | 'international' }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`group relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-500/10 ${
      location.featured ? 'lg:col-span-2' : ''
    }`}>
      {/* Featured Badge */}
      {location.featured && (
        <div className="absolute top-4 right-4 z-10 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
          Featured
        </div>
      )}
      
      {/* Image Placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20 group-hover:opacity-30 transition-opacity">
          {type === 'india' ? '🏠' : '🌍'}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        {location.isMain && (
          <div className="absolute top-4 left-4 z-10 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold border border-yellow-500/30">
            <MdCheckCircle className="inline mr-1" />
            Main Office
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
              {location.name}
            </h3>
            {type === 'india' ? (
              <p className="text-sm text-gray-400">{location.state}</p>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-2xl">{location.flag}</span>
                <span className="text-sm text-gray-400">{location.cities}</span>
              </div>
            )}
          </div>
          {type === 'international' && location.timezone && (
            <span className="text-[10px] bg-gray-800 px-2 py-1 rounded text-gray-400">
              {location.timezone}
            </span>
          )}
        </div>

        <p className="text-sm text-gray-400 leading-relaxed mb-4">
          {location.description}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-4 mb-4 text-xs">
          <div className="flex items-center gap-1 text-gray-400">
            <MdStar className="text-yellow-500" />
            <span className="font-semibold text-white">{location.rating}</span>
            <span>({location.reviews} reviews)</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <BiBuildingHouse className="text-yellow-500" />
            <span className="font-semibold text-white">{location.projects}+</span>
            <span>projects</span>
          </div>
        </div>

        {/* Services */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {location.services.map((service: string) => (
            <span key={service} className="text-[10px] bg-gray-800 px-2.5 py-1 rounded-full text-gray-300 border border-gray-700">
              {service}
            </span>
          ))}
        </div>

        {/* Contact */}
        <div className="space-y-1.5 text-sm mb-4">
          {location.address && (
            <div className="flex items-center gap-2 text-gray-400">
              <MdLocationOn className="text-yellow-500 text-xs" />
              <span className="text-xs">{location.address}</span>
            </div>
          )}
          {location.phone && (
            <div className="flex items-center gap-2 text-gray-400">
              <MdPhone className="text-yellow-500 text-xs" />
              <a href={`tel:${location.phone.replace(/\s/g, '')}`} className="text-xs hover:text-yellow-400 transition">
                {location.phone}
              </a>
            </div>
          )}
          {location.email && (
            <div className="flex items-center gap-2 text-gray-400">
              <MdEmail className="text-yellow-500 text-xs" />
              <a href={`mailto:${location.email}`} className="text-xs hover:text-yellow-400 transition break-all">
                {location.email}
              </a>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-gray-800">
          <Link
            href={`/locations/${location.slug}`}
            className="flex-1 text-center bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-400 transition flex items-center justify-center gap-2 group"
          >
            View Details
            <MdArrowForward className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href={`https://wa.me/916205820278?text=Hi%2C%20I%27m%20interested%20in%20your%20services%20in%20${location.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500/20 text-green-400 px-3 py-2 rounded-lg hover:bg-green-500/30 transition flex items-center gap-2"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function LocationsPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="bg-gray-950 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-900 to-gray-950 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-yellow-500/10 p-3 rounded-2xl">
                <BsGlobe2 className="w-12 h-12 text-yellow-500" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Our <span className="text-yellow-500">Locations</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Dream Homes Bihar provides expert architecture, Vastu consultancy, and design services 
              across India and worldwide. Find us in your city or country.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="bg-gray-800/50 px-6 py-3 rounded-xl border border-gray-700">
                <div className="text-2xl font-bold text-yellow-500">20+</div>
                <div className="text-xs text-gray-400">Cities Worldwide</div>
              </div>
              <div className="bg-gray-800/50 px-6 py-3 rounded-xl border border-gray-700">
                <div className="text-2xl font-bold text-yellow-500">500+</div>
                <div className="text-xs text-gray-400">Projects Completed</div>
              </div>
              <div className="bg-gray-800/50 px-6 py-3 rounded-xl border border-gray-700">
                <div className="text-2xl font-bold text-yellow-500">98%</div>
                <div className="text-xs text-gray-400">Client Satisfaction</div>
              </div>
              <div className="bg-gray-800/50 px-6 py-3 rounded-xl border border-gray-700">
                <div className="text-2xl font-bold text-yellow-500">15+</div>
                <div className="text-xs text-gray-400">Years Experience</div>
              </div>
            </div>

            {/* Search/Filter */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="#india" className="px-6 py-2 bg-yellow-500 text-gray-900 rounded-full font-semibold hover:bg-yellow-400 transition">
                <GiIndiaGate className="inline mr-2" />
                India
              </a>
              <a href="#international" className="px-6 py-2 bg-gray-800 text-gray-300 rounded-full font-semibold hover:bg-gray-700 hover:text-yellow-400 transition">
                <BsGlobe2 className="inline mr-2" />
                International
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* India Locations */}
      <section id="india" className="py-16 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <GiIndiaGate className="text-3xl text-yellow-500" />
            <div>
              <h2 className="text-3xl font-bold text-white">Services Across India</h2>
              <p className="text-gray-400">Expert architecture and design services in major Indian cities</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cityData.india.map((location) => (
              <LocationCard key={location.slug} location={location} type="india" />
            ))}
          </div>
        </div>
      </section>

      {/* International Locations */}
      <section id="international" className="py-16 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <BsGlobe2 className="text-3xl text-yellow-500" />
            <div>
              <h2 className="text-3xl font-bold text-white">Global Presence</h2>
              <p className="text-gray-400">Serving clients worldwide with world-class architecture</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cityData.international.map((location) => (
              <LocationCard key={location.slug} location={location} type="international" />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-yellow-500/10 via-transparent to-yellow-500/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Not in Our List? <span className="text-yellow-500">No Problem!</span>
          </h2>
          <p className="text-gray-400 mb-6">
            We serve clients worldwide through our virtual consultation services. 
            Contact us today to discuss your project regardless of your location.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition flex items-center gap-2"
            >
              Contact Us
              <MdArrowForward />
            </Link>
            <a
              href="https://wa.me/916205820278"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500/20 text-green-400 px-8 py-3 rounded-xl font-semibold hover:bg-green-500/30 transition border border-green-500/30 flex items-center gap-2"
            >
              <FaWhatsapp />
              WhatsApp Consultation
            </a>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button - Fixed with Client Component */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-yellow-500 text-gray-900 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300 z-40 animate-bounce"
          aria-label="Scroll to top"
        >
          <BiRocket className="w-5 h-5" />
        </button>
      )}
    </main>
  );
}