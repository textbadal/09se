"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function GalleryPage() {
  const allProjects = [
    { src: "/images/gallery1.jpg", title: "Modern Duplex", category: "Residential" },
    { src: "/images/gallery2.jpg", title: "Traditional Vastu House", category: "Residential" },
    { src: "/images/gallery3.jpg", title: "3D Front Elevation", category: "Design" },
    { src: "/images/gallery4.jpg", title: "Interior Design", category: "Design" },
    { src: "/images/gallery5.jpg", title: "Bungalow Plan", category: "Residential" },
    { src: "/images/gallery6.jpg", title: "Commercial Building", category: "Commercial" },
    { src: "/images/gallery7.jpg", title: "Commercial Building", category: "Interior" },
    { src: "/images/gallery8.jpg", title: "Commercial Building", category: "Interior" },
    { src: "/images/gallery9.jpg", title: "Commercial Building", category: "Exterior" },
    { src: "/images/gallery10.jpg", title: "Commercial Building", category: "Exterior" },
    { src: "/images/gallery11.jpg", title: "Commercial Building", category: "Exterior" },
    { src: "/images/gallery12.jpg", title: "Commercial Building", category: "Exterior" },
    { src: "/images/gallery13.jpg", title: "Commercial Building", category: "Interior" },
    { src: "/images/gallery14.jpg", title: "Commercial Building", category: "Exterior" },
    { src: "/images/gallery15.jpg", title: "Commercial Building", category: "Exterior" },
    { src: "/images/gallery16.jpg", title: "Commercial Building", category: "Interior" },
    { src: "/images/gallery17.jpg", title: "Commercial Building", category: "Exterior" },
    { src: "/images/gallery18.jpg", title: "Commercial Building", category: "Exterior" },
    { src: "/images/gallery19.jpg", title: "Commercial Building", category: "Interior" },
    { src: "/images/gallery20.jpg", title: "Commercial Building", category: "Interior" },
    { src: "/images/gallery21.jpg", title: "Commercial Building", category: "Interior" },
    { src: "/images/gallery22.jpg", title: "Commercial Building", category: "Interior" },
    { src: "/images/gallery23.jpg", title: "Commercial Building", category: "Interior" },
    { src: "/images/gallery24.jpg", title: "Commercial Building", category: "Interior" },
    { src: "/images/gallery25.jpg", title: "Commercial Building", category: "Exterior" },
    { src: "/images/gallery26.jpg", title: "Commercial Building", category: "Exterior" },
    { src: "/images/gallery27.jpg", title: "Commercial Building", category: "Exterior" },
    { src: "/images/gallery28.jpg", title: "Commercial Building", category: "Exterior" },
    { src: "/images/gallery29.jpg", title: "Commercial Building", category: "Exterior" },
    { src: "/images/gallery30.jpg", title: "Commercial Building", category: "Exterior" },
    { src: "/images/gallery31.jpg", title: "Commercial Building", category: "Exterior" },
    { src: "/images/gallery32.jpg", title: "Classic Design", category: "Exterior" },
    { src: "/images/gallery33.jpg", title: "Classic Design", category: "Exterior" },
    { src: "/images/gallery34.jpg", title: "Classic Design", category: "Exterior" },
    { src: "/images/gallery35.jpg", title: "Classic Design", category: "Exterior" },
  ];

  const categories = ["All", "Residential", "Design", "Interior", "Exterior"];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const filteredProjects = selectedCategory === "All" 
    ? allProjects 
    : allProjects.filter(p => p.category === selectedCategory);

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center">Our Projects</h1>
      <p className="mt-4 text-lg text-gray-600 text-center max-w-2xl mx-auto">
        Explore our portfolio of vastu-compliant residential, commercial, and interior projects.
      </p>

      {/* Category Filters */}
      <div className="flex justify-center gap-4 mt-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full font-medium transition ${
              selectedCategory === cat 
                ? "bg-blue-600 text-white shadow-lg" 
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid mt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, idx) => (
          <div
            key={idx}
            onClick={() => setLightboxIndex(idx)}
            className="rounded-xl overflow-hidden border shadow hover:shadow-xl transition cursor-pointer group"
          >
            <img
              src={project.src}
              alt={project.title}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-3 text-sm font-medium bg-gray-100 dark:bg-gray-800">{project.title}</div>
          </div>
        ))}
      </div>

      {/* Mobile Slider */}
      <div className="mt-12 md:hidden">
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          pagination={{ clickable: true }}
          slidesPerView={1}
        >
          {filteredProjects.map((project, idx) => (
            <SwiperSlide key={idx}>
              <div
                onClick={() => setLightboxIndex(idx)}
                className="rounded-xl overflow-hidden border shadow hover:shadow-lg transition cursor-pointer"
              >
                <img
                  src={project.src}
                  alt={project.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-3 text-sm font-medium bg-gray-100 dark:bg-gray-800">{project.title}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Lightbox */}
      {lightboxIndex >= 0 && (
        <Lightbox
          open={lightboxIndex >= 0}
          close={() => setLightboxIndex(-1)}
          slides={filteredProjects.map((p) => ({ src: p.src }))}
          index={lightboxIndex}
        />
      )}
    </main>
  );
}
