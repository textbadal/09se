// app/locations/patna/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  MdLocationOn, 
  MdPhone, 
  MdEmail, 
  MdAccessTime,
  MdArrowForward,
  MdCheckCircle,
  MdStar,
  MdPeople,
  MdHome,
  MdBusiness,
  MdDesignServices,
  MdOutlineEmojiEvents
} from "react-icons/md";
import { 
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaGoogle
} from "react-icons/fa";
import { BiBuildingHouse, BiRocket, BiAward, BiTrendingUp } from "react-icons/bi";
import { GiIndiaGate, GiLotus } from "react-icons/gi";
import { BsGlobe2, BsClockHistory } from "react-icons/bs";

export default function PatnaPage() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // City Data
  const cityData = {
    name: "Patna",
    state: "Bihar",
    country: "India",
    description: "Dream Homes Bihar's headquarters in Patna, the heart of Bihar. We provide expert architecture, Vastu consultancy, and design services to clients across Patna and surrounding regions.",
    longDescription: "With over 15 years of experience, Dream Homes Bihar has established itself as Patna's premier architecture and design studio. Our team of expert architects, Vastu consultants, and interior designers work together to create homes that are not just beautiful but also spiritually aligned and functionally superior. From traditional Bihar-style homes to modern apartments, we've designed it all.",
    founded: 2010,
    teamSize: 25,
    projectsCompleted: 150,
    clientSatisfaction: 98,
    rating: 4.9,
    reviews: 120,
    address: "Boring Road, Patna, Bihar 800001",
    addressFull: "Dream Homes Bihar, Boring Road, Patna, Bihar 800001, India",
    phone: "+91 62058 20278",
    phoneAlt: "+91 98765 43210",
    email: "contact@dreamhomesbihar.com",
    workingHours: "Mon-Sat: 9:00 AM - 7:00 PM (IST)",
    workingHoursAlt: "Sunday: By Appointment",
    languages: ["Hindi", "English", "Maithili", "Bhojpuri"],
    socialMedia: {
      facebook: "https://facebook.com/dreamhomesbihar",
      instagram: "https://instagram.com/dreamhomesbihar",
      youtube: "https://youtube.com/@dreamhomesbihar",
      linkedin: "https://linkedin.com/company/dreamhomesbihar",
      google: "https://g.page/dreamhomesbihar",
    },
    services: [
      {
        name: "House Planning",
        description: "Custom house planning services tailored to your needs",
        icon: "🏠",
        featured: true,
      },
      {
        name: "Vastu Consultancy",
        description: "Expert Vastu compliance for harmonious living",
        icon: "🧭",
        featured: true,
      },
      {
        name: "3D Elevation Design",
        description: "Stunning 3D exterior and elevation designs",
        icon: "🏗️",
        featured: true,
      },
      {
        name: "Interior Designing",
        description: "Modern and traditional interior design solutions",
        icon: "🛋️",
        featured: true,
      },
      {
        name: "Commercial Projects",
        description: "Architecture for offices, shops, and commercial spaces",
        icon: "🏢",
        featured: false,
      },
      {
        name: "Renovation Services",
        description: "Home renovation and remodeling services",
        icon: "🔨",
        featured: false,
      },
      {
        name: "Smart Home Design",
        description: "Automated and smart home solutions",
        icon: "🤖",
        featured: false,
      },
      {
        name: "Sustainable Architecture",
        description: "Eco-friendly and green building design",
        icon: "🌱",
        featured: false,
      },
    ],
    nearbyAreas: [
      "Boring Road",
      "Patna City",
      "Kankarbagh",
      "Rajendra Nagar",
      "Patliputra",
      "Danapur",
      "Phulwari Sharif",
      "Bhagalpur",
    ],
    testimonials: [
      {
        name: "Mr. Rajesh Kumar",
        location: "Boring Road, Patna",
        text: "Dream Homes Bihar designed our dream home. The Vastu compliance and modern design exceeded our expectations. Highly recommended!",
        rating: 5,
        image: "/images/testimonials/rajesh.jpg",
      },
      {
        name: "Mrs. Sunita Sharma",
        location: "Kankarbagh, Patna",
        text: "The interior design team did an amazing job with our apartment. Professional, creative, and within our budget. Thank you!",
        rating: 5,
        image: "/images/testimonials/sunita.jpg",
      },
      {
        name: "Dr. Amit Singh",
        location: "Patna City",
        text: "We needed a Vastu-compliant home for our family. Dream Homes Bihar delivered beyond our expectations with their expertise.",
        rating: 5,
        image: "/images/testimonials/amit.jpg",
      },
    ],
    team: [
      { name: "Ar. Sanjay Kumar", role: "Principal Architect", experience: "18 years" },
      { name: "Ar. Priya Singh", role: "Vastu Consultant", experience: "12 years" },
      { name: "Ar. Vikram Patel", role: "Interior Designer", experience: "10 years" },
      { name: "Mr. Ravi Sharma", role: "Project Manager", experience: "15 years" },
    ],
    projects: [
      { name: "Green Valley Villas", type: "Residential", year: "2023" },
      { name: "Saffron Heights", type: "Apartment", year: "2022" },
      { name: "Riverfront Palace", type: "Luxury Villa", year: "2023" },
      { name: "Tech Park Office", type: "Commercial", year: "2022" },
    ],
  };

  return (
    <main className="bg-gray-950 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-yellow-500/10 p-2 rounded-xl">
                  <GiIndiaGate className="w-8 h-8 text-yellow-500" />
                </div>
                <span className="text-yellow-500 font-semibold">Headquarters</span>
                <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold border border-yellow-500/30">
                  <MdCheckCircle className="inline mr-1" />
                  Main Office
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Dream Homes <span className="text-yellow-500">Patna</span>
              </h1>
              <p className="text-xl text-gray-400 mb-2">
                Bihar's Premier Architecture & Design Studio
              </p>
              <p className="text-gray-400 leading-relaxed max-w-lg">
                {cityData.longDescription}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-gray-800/50 px-4 py-3 rounded-xl border border-gray-700">
                  <div className="text-2xl font-bold text-yellow-500">{cityData.projectsCompleted}+</div>
                  <div className="text-xs text-gray-400">Projects</div>
                </div>
                <div className="bg-gray-800/50 px-4 py-3 rounded-xl border border-gray-700">
                  <div className="text-2xl font-bold text-yellow-500">{cityData.clientSatisfaction}%</div>
                  <div className="text-xs text-gray-400">Satisfaction</div>
                </div>
                <div className="bg-gray-800/50 px-4 py-3 rounded-xl border border-gray-700">
                  <div className="text-2xl font-bold text-yellow-500">{cityData.founded}</div>
                  <div className="text-xs text-gray-400">Founded</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-6">
                <a
                  href="https://wa.me/916205820278?text=Hi%2C%20I'm%20interested%20in%20your%20services%20in%20Patna"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition flex items-center gap-2"
                >
                  <FaWhatsapp />
                  WhatsApp
                </a>
                <Link
                  href="/contact"
                  className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition flex items-center gap-2"
                >
                  Contact Us
                  <MdArrowForward />
                </Link>
              </div>
            </div>

            {/* Right Content - Stats Card */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl border border-gray-700 backdrop-blur-sm">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <MdLocationOn className="text-yellow-500 text-xl" />
                  <div>
                    <p className="text-white font-semibold">Address</p>
                    <p className="text-gray-400 text-sm">{cityData.address}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MdPhone className="text-yellow-500 text-xl" />
                  <div>
                    <p className="text-white font-semibold">Phone</p>
                    <a href={`tel:${cityData.phone.replace(/\s/g, '')}`} className="text-gray-400 text-sm hover:text-yellow-400 transition">
                      {cityData.phone}
                    </a>
                    <br />
                    <a href={`tel:${cityData.phoneAlt.replace(/\s/g, '')}`} className="text-gray-500 text-xs hover:text-yellow-400 transition">
                      {cityData.phoneAlt}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MdEmail className="text-yellow-500 text-xl" />
                  <div>
                    <p className="text-white font-semibold">Email</p>
                    <a href={`mailto:${cityData.email}`} className="text-gray-400 text-sm hover:text-yellow-400 transition break-all">
                      {cityData.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MdAccessTime className="text-yellow-500 text-xl" />
                  <div>
                    <p className="text-white font-semibold">Working Hours</p>
                    <p className="text-gray-400 text-sm">{cityData.workingHours}</p>
                    <p className="text-gray-500 text-xs">{cityData.workingHoursAlt}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MdPeople className="text-yellow-500 text-xl" />
                  <div>
                    <p className="text-white font-semibold">Team Size</p>
                    <p className="text-gray-400 text-sm">{cityData.teamSize}+ Professionals</p>
                  </div>
                </div>

                {/* Languages */}
                <div className="pt-4 border-t border-gray-700">
                  <p className="text-white font-semibold mb-2">Languages</p>
                  <div className="flex flex-wrap gap-2">
                    {cityData.languages.map((lang) => (
                      <span key={lang} className="bg-gray-700/50 px-3 py-1 rounded-full text-xs text-gray-300">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Our <span className="text-yellow-500">Services</span> in Patna
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Comprehensive architecture and design services tailored to Patna's unique needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cityData.services.map((service) => (
              <div
                key={service.name}
                className={`bg-gray-900 p-6 rounded-2xl border ${
                  service.featured ? 'border-yellow-500/50 hover:border-yellow-500' : 'border-gray-800 hover:border-yellow-500/30'
                } transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-500/5 group`}
              >
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="text-lg font-semibold text-white group-hover:text-yellow-400 transition">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-400 mt-1">{service.description}</p>
                {service.featured && (
                  <span className="inline-block mt-3 text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Meet Our <span className="text-yellow-500">Expert Team</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Dedicated professionals committed to bringing your dream home to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cityData.team.map((member) => (
              <div
                key={member.name}
                className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-yellow-500/30 transition-all duration-300 text-center group"
              >
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                  👤
                </div>
                <h3 className="text-white font-semibold group-hover:text-yellow-400 transition">
                  {member.name}
                </h3>
                <p className="text-yellow-500 text-sm">{member.role}</p>
                <p className="text-gray-500 text-xs mt-1">{member.experience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Our <span className="text-yellow-500">Projects</span> in Patna
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Showcasing our best work in and around Patna
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cityData.projects.map((project) => (
              <div
                key={project.name}
                className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-yellow-500/30 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white group-hover:text-yellow-400 transition">
                    {project.name}
                  </h3>
                  <span className="text-yellow-500 text-sm">{project.year}</span>
                </div>
                <p className="text-gray-400 text-sm">{project.type}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                  <MdCheckCircle className="text-yellow-500" />
                  <span>Completed successfully</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              What Our <span className="text-yellow-500">Clients</span> Say
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Real feedback from our satisfied clients in Patna
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cityData.testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-yellow-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-full flex items-center justify-center text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-500 text-xs">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex text-yellow-500 text-sm mb-2">
                  {"★".repeat(testimonial.rating)}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Areas */}
      <section className="py-16 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              Also Serving <span className="text-yellow-500">Nearby Areas</span>
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {cityData.nearbyAreas.map((area) => (
              <span
                key={area}
                className="bg-gray-800 px-4 py-2 rounded-full text-sm text-gray-300 border border-gray-700 hover:border-yellow-500/30 hover:text-yellow-400 transition cursor-default"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Map/CTA Section */}
      <section className="py-16 bg-gradient-to-br from-yellow-500/10 via-transparent to-yellow-500/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Build Your <span className="text-yellow-500">Dream Home</span> in Patna?
          </h2>
          <p className="text-gray-400 mb-6">
            Let's discuss your project. Our team of experts is ready to help you every step of the way.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition flex items-center gap-2"
            >
              Get a Free Consultation
              <MdArrowForward />
            </Link>
            <a
              href="https://wa.me/916205820278?text=Hi%2C%20I'm%20interested%20in%20your%20services%20in%20Patna"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500/20 text-green-400 px-8 py-3 rounded-xl font-semibold hover:bg-green-500/30 transition border border-green-500/30 flex items-center gap-2"
            >
              <FaWhatsapp />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-yellow-500 text-gray-900 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300 z-40"
        aria-label="Scroll to top"
      >
        <BiRocket className="w-5 h-5" />
      </button>

      {/* Schema Markup - Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Dream Homes Bihar - Patna",
            "description": "Architecture and design studio in Patna, Bihar",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Boring Road",
              "addressLocality": "Patna",
              "addressRegion": "Bihar",
              "postalCode": "800001",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "25.5941",
              "longitude": "85.1376"
            },
            "telephone": "+916205820278",
            "email": "contact@dreamhomesbihar.com",
            "openingHours": "Mon-Sat 09:00-19:00",
            "areaServed": [
              { "@type": "City", "name": "Patna" },
              { "@type": "State", "name": "Bihar" }
            ],
            "image": "https://dreamhomesbihar.com/images/patna-office.jpg",
            "priceRange": "₹₹₹",
            "sameAs": [
              "https://facebook.com/dreamhomesbihar",
              "https://instagram.com/dreamhomesbihar",
              "https://youtube.com/@dreamhomesbihar",
              "https://linkedin.com/company/dreamhomesbihar"
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": cityData.rating,
              "reviewCount": cityData.reviews
            }
          })
        }}
      />
    </main>
  );
}