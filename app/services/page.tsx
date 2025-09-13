"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Star, CheckCircle, ArrowRight, Heart, Zap, Shield } from "lucide-react";

type Service = {
  title: string;
  description: string;
  price: string;
  image: string;
  features: string[];
  popular?: boolean;
};

const services: Service[] = [
  {
    title: "2D Floor Plan",
    description: "Detailed floor plans for your home with measurements and layout. Perfect for construction planning and space optimization.",
    price: "₹999 onwards",
    image: "/images/floor3.webp",
    features: ["Accurate measurements", "Room layout optimization", "Furniture placement", "3 revisions included"]
  },
  {
    title: "3D Elevation Design",
    description: "Realistic 3D elevation rendering of your house design. Visualize your dream home before construction begins.",
    price: "₹1,999 onwards",
    image: "/images/gallery9.jpg",
    features: ["Photorealistic rendering", "Multiple angle views", "Material visualization", "5 revisions included"],
    popular: true
  },
  {
    title: "Interior Design",
    description: "Complete interior design with Vastu compliance and decor suggestions. Create harmonious living spaces.",
    price: "₹2,499 onwards",
    image: "/images/gallery23.jpg",
    features: ["Vastu-compliant designs", "Color scheme suggestions", "Furniture recommendations", "Unlimited revisions"]
  },
  {
    title: "Plumbing & Electrical Plan",
    description: "Professional plumbing and electrical layout for smooth construction and future maintenance.",
    price: "₹1,499 onwards",
    image: "/images/services/plumbing-electrical.jpg",
    features: ["Code-compliant designs", "Fixture placement", "Circuit planning", "3 revisions included"]
  },
  {
    title: "Footing Plan",
    description: "Accurate footing plan for safe and strong foundation. Essential for structural integrity.",
    price: "₹999 onwards",
    image: "/images/services/footing.jpg",
    features: ["Structural accuracy", "Material specifications", "Load calculations", "2 revisions included"]
  },
  {
    title: "Vastu Compliance Check",
    description: "Ensure your home follows Vastu principles for positivity, prosperity, and wellbeing.",
    price: "₹799 onwards",
    image: "/images/services/vastu.jpg",
    features: ["Direction analysis", "Remedial suggestions", "Room placement guidance", "Detailed report"]
  },
];

const faqs = [
  {
    question: "Do you provide services outside Bihar?",
    answer: "Yes, we serve clients all over India with online consultation and design delivery. We use modern collaboration tools to work with clients remotely.",
  },
  {
    question: "Are your designs Vastu-compliant?",
    answer: "Yes, every design can be customized as per Vastu principles to bring positivity and balance. We can also incorporate Feng Shui principles upon request.",
  },
  {
    question: "How fast will I get my plan?",
    answer: "Most plans are delivered within 3–5 working days, depending on complexity. Rush delivery is available for an additional fee.",
  },
  {
    question: "Can I request changes after delivery?",
    answer: "Yes, we provide free revisions until you're fully satisfied with your plan. The number of revisions depends on the service package you choose.",
  },
  {
    question: "What information do I need to provide?",
    answer: "You'll need to share your plot dimensions, preferred room sizes, any specific requirements, and inspiration images if you have them.",
  },
  {
    question: "Do you provide construction guidance?",
    answer: "Yes, we offer basic guidance for construction based on our designs. We can also recommend trusted contractors in your area.",
  },
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Patna, Bihar",
    text: "The 3D elevation design helped me visualize my home perfectly. The team was responsive to all my change requests.",
    rating: 5
  },
  {
    name: "Priya Singh",
    location: "Lucknow, UP",
    text: "Their Vastu compliance service transformed our home's energy. We've seen positive changes since implementing their suggestions.",
    rating: 5
  },
  {
    name: "Amit Sharma",
    location: "Ranchi, Jharkhand",
    text: "The plumbing and electrical plans were detailed and easy to follow. Our contractor appreciated the professionalism.",
    rating: 4
  }
];

export default function Services() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  // Filter services based on tab (for future filtering functionality)
  const filteredServices = services.filter(service => {
    if (activeTab === "all") return true;
    if (activeTab === "popular") return service.popular;
    return true;
  });

  return (
    <main className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 text-center px-6 max-w-7xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-10 dark:opacity-5 rounded-3xl -z-10"></div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Design Your Dream Home, Stress-Free
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 text-lg opacity-80 max-w-2xl mx-auto mb-8"
        >
          From floor plans to interiors — everything you need, at affordable prices, delivered anywhere in India.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="/contact"
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl shadow hover:bg-indigo-700 transition flex items-center gap-2"
          >
            Get Free Consultation <ArrowRight size={18} />
          </a>
          <a
            href="#services"
            className="border border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 px-8 py-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition"
          >
            Explore Services
          </a>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                <Heart className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Customer-Centric Approach</h3>
            <p className="text-gray-600 dark:text-gray-300">We prioritize your vision and needs, ensuring complete satisfaction with unlimited revisions.</p>
          </motion.div>

          <motion.div 
            className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                <Zap className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Turnaround</h3>
            <p className="text-gray-600 dark:text-gray-300">Get your designs delivered within 3-5 days without compromising on quality or details.</p>
          </motion.div>

          <motion.div 
            className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                <Shield className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Vastu Compliant</h3>
            <p className="text-gray-600 dark:text-gray-300">All our designs follow Vastu principles to ensure positivity and harmony in your living space.</p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Our Services</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          We offer comprehensive home design services to bring your vision to life with precision and creativity.
        </p>
        
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className={`rounded-xl border shadow-lg overflow-hidden bg-white dark:bg-gray-800 transition-all cursor-pointer relative ${service.popular ? 'ring-2 ring-indigo-500' : ''}`}
              onClick={() => setExpanded(expanded === idx ? null : idx)}
            >
              {service.popular && (
                <div className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  MOST POPULAR
                </div>
              )}
              <div className="relative w-full h-56">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity"></div>
              </div>
              <div className="p-5 text-left">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="font-bold text-indigo-600 whitespace-nowrap ml-2">{service.price}</p>
                </div>
                
                <AnimatePresence>
                  {expanded === idx ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="mt-3 text-gray-700 dark:text-gray-300">{service.description}</p>
                      <ul className="mt-4 space-y-2">
                        {service.features.map((feature, featureIdx) => (
                          <li key={featureIdx} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                        Select This Plan
                      </button>
                    </motion.div>
                  ) : (
                    <motion.p 
                      className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-2"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {service.description}
                    </motion.p>
                  )}
                </AnimatePresence>
                
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {expanded === idx ? 'Click to collapse' : 'Click for details'}
                  </span>
                  {expanded === idx ? (
                    <ChevronUp className="w-5 h-5 text-indigo-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-indigo-600" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">What Our Clients Say</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about our services.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic mb-6">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Highlight */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <motion.div 
          className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 p-8 md:p-12 rounded-2xl shadow-xl text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-6">Transparent Pricing</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            No hidden costs. Pay only for what you need. Affordable plans starting at just{" "}
            <span className="font-bold">₹799</span>. Custom packages available for complete home design.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="bg-white text-indigo-600 px-8 py-4 rounded-xl shadow hover:bg-gray-100 transition font-semibold"
            >
              Get Free Consultation
            </a>
            <a
              href="/pricing"
              className="border border-white text-white px-8 py-4 rounded-xl hover:bg-white/10 transition"
            >
              View Detailed Pricing
            </a>
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Frequently Asked Questions</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
          Have questions? We're here to help you with everything you need to know.
        </p>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md cursor-pointer"
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                {openFaq === idx ? (
                  <ChevronUp className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                )}
              </div>
              <AnimatePresence>
                {openFaq === idx && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 text-gray-700 dark:text-gray-300"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Design Your Dream Home?</h2>
          <p className="text-lg mb-8 opacity-90">
            Get started today with a free consultation. Our design experts are ready to bring your vision to life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="bg-white text-indigo-600 px-8 py-4 rounded-xl shadow hover:bg-gray-100 transition font-semibold"
            >
              Start Your Project
            </a>
            <a
              href="tel:+919876543210"
              className="border border-white px-8 py-4 rounded-xl hover:bg-white/10 transition"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}