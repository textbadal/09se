"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Rahul Kumar",
      text: "Dream Homes Bihar designed my duplex perfectly as per Vastu. The team was professional and very helpful.",
      image: "/images/user1.jpg",
    },
    {
      name: "Anjali Singh",
      text: "I loved the 3D elevation design they created. It looked exactly like my dream house!",
      image: "/images/user2.jpg",
    },
    {
      name: "Vikash Sharma",
      text: "Affordable, quick, and creative. Highly recommend them for house planning and interior ideas.",
      image: "/images/user3.jpg",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">What Our Clients Say</h2>
        <p className="mt-4 text-lg opacity-80">
          Hear from the happy families who built their dream homes with us.
        </p>

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
            {testimonials.map((t, idx) => (
              <SwiperSlide key={idx}>
                <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow border">
                  <div className="flex flex-col items-center">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                    />
                    <p className="mt-4 text-gray-700 dark:text-gray-200 italic">
                      “{t.text}”
                    </p>
                    <h4 className="mt-3 font-semibold text-gray-900 dark:text-white">
                      {t.name}
                    </h4>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
