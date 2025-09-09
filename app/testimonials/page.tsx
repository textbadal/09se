"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Patna, Bihar",
      feedback:
        "Dream Homes Bihar designed my house perfectly as per Vastu. The team is very professional and cooperative!",
      image: "/images/user1.jpg",
    },
    {
      name: "Anjali Singh",
      role: "Gaya, Bihar",
      feedback:
        "They provided me with an amazing 3D front elevation. My family loved the design!",
      image: "/images/user2.jpg",
    },
    {
      name: "Amit Sharma",
      role: "Muzaffarpur, Bihar",
      feedback:
        "Affordable pricing and top-class service. Highly recommended for house planning!",
      image: "/images/user3.jpg",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center">What Our Clients Say</h1>
      <p className="mt-4 text-lg text-gray-600 text-center max-w-2xl mx-auto">
        Real feedback from our happy customers across Bihar.
      </p>

      {/* Testimonials Slider */}
      <div className="mt-12">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border shadow hover:shadow-lg transition h-full flex flex-col">
                <div className="flex items-center gap-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{t.name}</h3>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-700 dark:text-gray-300 italic">
                  “{t.feedback}”
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </main>
  );
}
