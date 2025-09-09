"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default function Gallery() {
  const projects = [
    { src: "/images/gallery1.jpg", title: "Modern Duplex" },
    { src: "/images/gallery2.jpg", title: "Traditional Vastu House" },
    { src: "/images/gallery3.jpg", title: "3D Front Elevation" },
    { src: "/images/gallery4.jpg", title: "Interior Design" },
    { src: "/images/gallery5.jpg", title: "Bungalow Plan" },
    { src: "/images/gallery6.jpg", title: "Commercial Building" },
  ];

  return (
    <section id="gallery" className="py-20 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Our Work</h2>
        <p className="mt-4 text-lg opacity-80">
          A glimpse of the designs & projects we’ve completed for our clients.
        </p>

        {/* Slider */}
        <div className="mt-12">
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {projects.map((project, idx) => (
              <SwiperSlide key={idx}>
                <div className="rounded-xl overflow-hidden border shadow hover:shadow-lg transition">
                  <img
                    src={project.src}
                    alt={project.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-3 text-sm font-medium">{project.title}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
