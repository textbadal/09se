// app/page.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");

  // Projects data
  const projects = [
    {
      id: 1,
      title: "Luxury Villa - Patna",
      category: "Residential",
      location: "Patna, Bihar",
      area: "3500 sq.ft",
      year: "2024",
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop",
      featured: true,
    },
    {
      id: 2,
      title: "Corporate Office - Gaya",
      category: "Commercial",
      location: "Gaya, Bihar",
      area: "2500 sq.ft",
      year: "2023",
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      featured: false,
    },
    {
      id: 3,
      title: "Eco Farmhouse - Nalanda",
      category: "Residential",
      location: "Nalanda, Bihar",
      area: "5000 sq.ft",
      year: "2024",
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
      featured: true,
    },
    {
      id: 4,
      title: "Shopping Complex - Muzaffarpur",
      category: "Commercial",
      location: "Muzaffarpur, Bihar",
      area: "8000 sq.ft",
      year: "2023",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
      featured: false,
    },
    {
      id: 5,
      title: "Heritage Resort - Bodh Gaya",
      category: "Hospitality",
      location: "Bodh Gaya, Bihar",
      area: "12000 sq.ft",
      year: "2024",
      image:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop",
      featured: true,
    },
    {
      id: 6,
      title: "Apartment Complex - Darbhanga",
      category: "Residential",
      location: "Darbhanga, Bihar",
      area: "15000 sq.ft",
      year: "2023",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
      featured: false,
    },
  ];

  const categories = ["All", "Residential", "Commercial", "Hospitality"];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-white">
     
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Crafting
                <span className="block text-orange-500">Extraordinary</span>
                Spaces
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Where visionary architecture meets timeless elegance. We create
                spaces that inspire and endure.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-700 transition">
                  Explore Our Work
                </button>
                <button className="border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition">
                  Contact Us
                </button>
              </div>
              <div className="flex gap-8 mt-8">
                <div>
                  <div className="text-2xl font-bold">15+</div>
                  <div className="text-sm text-gray-400">Years Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">100+</div>
                  <div className="text-sm text-gray-400">Projects</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-sm text-gray-400">Satisfaction</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-48 rounded-2xl overflow-hidden">
                  <Image
                    src={projects[0].image}
                    alt="Project"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden">
                  <Image
                    src={projects[1].image}
                    alt="Project"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative h-48 rounded-2xl overflow-hidden">
                  <Image
                    src={projects[2].image}
                    alt="Project"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden">
                  <Image
                    src={projects[3].image}
                    alt="Project"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-orange-600 font-semibold">ABOUT US</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
                Designing Dreams, Building Futures
              </h2>
              <p className="text-gray-600 mb-4">
                Dream Homes Bihar is a premier architectural design studio
                dedicated to creating spaces that reflect the rich cultural
                heritage of Bihar.
              </p>
              <p className="text-gray-600 mb-6">
                With over a decade of experience, we specialize in residential,
                commercial, and institutional projects.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">15+</div>
                  <div className="text-sm text-gray-600">Awards</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">100+</div>
                  <div className="text-sm text-gray-600">Projects</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">50+</div>
                  <div className="text-sm text-gray-600">Clients</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">10+</div>
                  <div className="text-sm text-gray-600">Cities</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-56 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop"
                    alt="Architecture"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-56 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop"
                    alt="Design"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative h-56 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"
                    alt="Interior"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-56 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop"
                    alt="Planning"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-orange-600 font-semibold">SERVICES</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              What We Offer
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Architectural Design",
                desc: "Innovative spatial planning and design solutions",
              },
              {
                title: "Interior Design",
                desc: "Creative interior solutions for your space",
              },
              {
                title: "Urban Planning",
                desc: "Strategic development for sustainable growth",
              },
              {
                title: "Project Management",
                desc: "End-to-end execution with precision",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
              >
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🏗️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <span className="text-orange-600 font-semibold">PORTFOLIO</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                Featured Projects
              </h2>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    activeFilter === category
                      ? "bg-orange-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition"
              >
                <div className="relative h-64">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  {project.featured && (
                    <span className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Featured
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold">{project.title}</h3>
                    <p className="text-sm text-gray-300">{project.location}</p>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{project.category}</span>
                    <span>{project.area}</span>
                    <span>{project.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold">15+</div>
              <div className="text-sm text-orange-100">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold">100+</div>
              <div className="text-sm text-orange-100">Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold">98%</div>
              <div className="text-sm text-orange-100">Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold">50+</div>
              <div className="text-sm text-orange-100">Team Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-orange-600 font-semibold">TESTIMONIALS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              What Our Clients Say
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <p className="text-gray-600 mb-4">
                "The team at Dream Homes transformed our vision into reality.
                Their attention to detail is remarkable."
              </p>
              <div>
                <div className="font-semibold text-gray-900">Dr. Rajesh Kumar</div>
                <div className="text-sm text-gray-500">Homeowner, Patna</div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <p className="text-gray-600 mb-4">
                "Working with Dream Homes was an absolute pleasure. They
                delivered our project ahead of schedule."
              </p>
              <div>
                <div className="font-semibold text-gray-900">Priya Singh</div>
                <div className="text-sm text-gray-500">Business Owner, Gaya</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Create Your Dream Space?
          </h2>
          <p className="text-gray-300 mb-8">
            Let's collaborate to bring your architectural vision to life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-700 transition">
              Get Started
            </button>
            <button className="border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition">
              Contact Us
            </button>
          </div>
        </div>
      </section>

     
    </div>
  );
}