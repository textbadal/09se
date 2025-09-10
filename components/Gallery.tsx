"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import Image from "next/image";

// Static list of gallery images
const projects = [
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
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold"
        >
          Our Work
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 text-lg opacity-80"
        >
          A glimpse of the designs & projects we’ve completed for our clients.
        </motion.p>

        <div className="mt-12">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            speed={1000}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {projects.map((project, idx) => (
              <SwiperSlide key={idx}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="rounded-xl overflow-hidden border shadow hover:shadow-lg transition"
                >
                  <div className="relative w-full h-64">
                    <Image
                      src={project.src}
                      alt={project.title}
                      fill
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-3 text-sm font-medium capitalize">
                    {project.title}
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
