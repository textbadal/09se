"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  ChevronUp, 
  Star, 
  CheckCircle, 
  Heart, 
  Users,
  Award,
  FileText,
  Phone,
  Mail,
  MapPin,
  Clock
} from "lucide-react";

type Service = {
  title: string;
  description: string;
  detailedDescription: string;
  price: string;
  image: string;
  features: string[];
  timeline: string;
  popular?: boolean;
  advance: number;
  paymentLink: string;
};

type TeamMember = {
  name: string;
  role: string;
  experience: string;
  image: string;
  specialties: string[];
};

type ProcessStep = {
  step: number;
  title: string;
  description: string;
  icon: React.ReactNode;
};
const services: Service[] = [
  // 🔹 ENTRY SERVICE (FUNNEL)
  {
    title: "Vastu-Based Floor Plan (Starter)",
    description: "Start your home design with expert planning.",
    detailedDescription:
      "Get a professional floor plan designed as per Vastu with unlimited revisions until satisfaction. Perfect starting point for your dream home.",
    price: "₹2,999",
    image: "/images/floor3.webp",
    features: [
      "Vastu-based planning",
      "Unlimited revisions",
      "Optimized room layout",
      "Plot utilization guidance"
    ],
    timeline: "2-3 days",
    advance: 499,
    paymentLink: "https://payments.cashfree.com/forms/dream-homes-booking"
  },

  // 🔹 MID SERVICE
  {
    title: "3D Elevation Design",
    description: "See your home before you build it.",
    detailedDescription:
      "Get realistic 3D elevation designs with materials, textures, lighting, and exterior detailing for a clear visualization.",
    price: "₹4,999",
    image: "/images/gallery11.jpg",
    features: [
      "Photorealistic render",
      "Modern elevation styles",
      "Multiple angle views",
      "5 revisions included"
    ],
    timeline: "4-5 days",
    advance: 499,
    paymentLink: "https://payments.cashfree.com/forms/dream-homes-booking"
  },

  

  // 🔹 PREMIUM MAIN OFFER (MOST IMPORTANT)
  {
    title: "Complete House Design Package",
    description: "Everything required to build your dream home.",
    detailedDescription:
      "Our premium package includes complete architectural drawings: Vastu floor plan with unlimited revisions, 3D elevation, 2D elevation, structural guidance, electrical & plumbing layouts, and working drawings.",
    price: "₹16,999",
    image: "/images/dhb-16999.webp",
    features: [
      "Vastu Floor Plan (Unlimited revisions)",
      "3D Elevation Design",
      "2D Elevation",
      "Structural Drawings",
      "Electrical Layout",
      "Plumbing Plan",
      "Working Drawings",
      "Priority Support"
    ],
    timeline: "7-10 days",
    popular: true,
    advance: 1999,
    paymentLink: "https://payments.cashfree.com/forms/dream-homes-booking"
  },

  // 🔹 ADD-ON SERVICES (BOOST AOV)
  {
    title: "Vastu Consultation",
    description: "Expert guidance for positive energy flow.",
    detailedDescription:
      "Detailed Vastu analysis with practical remedies for better health, wealth, and harmony.",
    price: "₹799",
    image: "/images/product2.jpg",
    features: [
      "Direction analysis",
      "Room placement advice",
      "Remedy suggestions"
    ],
    timeline: "1-2 days",
    advance: 499,
    paymentLink: "https://payments.cashfree.com/forms/dream-homes-booking"
  },

  {
    title: "Interior Layout Plan",
    description: "Smart interior planning for better living.",
    detailedDescription:
      "Furniture layout, space optimization, and basic interior planning to enhance usability and aesthetics.",
    price: "₹1,499",
    image: "/images/gallery13.jpg",
    features: [
      "Furniture layout",
      "Space optimization",
      "Modern design ideas"
    ],
    timeline: "2-3 days",
    advance: 499,
    paymentLink: "https://payments.cashfree.com/forms/dream-homes-booking"
  }
];

const faqs = [
  {
    question: "Do you provide services outside Bihar?",
    answer: "Yes, we serve clients all over India with online consultation and design delivery. We use modern collaboration tools to work with clients remotely, regardless of location. We&apos;ve successfully completed projects in over 15 states across India.",
  },
  {
    question: "Are your designs Vastu-compliant?",
    answer: "Yes, every design can be customized as per Vastu principles to bring positivity and balance. We can also incorporate Feng Shui principles upon request. Our team includes Vastu experts who ensure traditional principles are harmoniously integrated with modern design requirements.",
  },
  {
    question: "How fast will I get my plan?",
    answer: "Most plans are delivered within 3–5 working days, depending on complexity. Rush delivery is available for an additional fee. The exact timeline will be confirmed after we understand your specific requirements during the initial consultation.",
  },
  {
    question: "Can I request changes after delivery?",
    answer: "Yes, we provide free revisions until you&apos;re fully satisfied with your plan. The number of revisions depends on the service package you choose. We believe in perfecting your design until it matches your vision completely.",
  },
  {
    question: "What information do I need to provide?",
    answer: "You&apos;ll need to share your plot dimensions, preferred room sizes, any specific requirements, and inspiration images if you have them. We&apos;ll guide you through the information collection process with a detailed questionnaire.",
  },
  {
    question: "Do you provide construction guidance?",
    answer: "Yes, we offer basic guidance for construction based on our designs. We can also recommend trusted contractors in your area. For an additional fee, we provide site supervision services to ensure proper implementation of our designs.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept bank transfers, UPI payments, and major credit/debit cards. We typically require a 50% advance to begin work, with the balance due upon project completion.",
  },
  {
    question: "Can you work with my existing architect?",
    answer: "Absolutely. We frequently collaborate with local architects and contractors to enhance their plans with our specialized design expertise while ensuring seamless execution.",
  },
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Patna, Bihar",
    text: "The 3D elevation design helped me visualize my home perfectly. The team was responsive to all my change requests and delivered beyond expectations.",
    rating: 5,
    service: "3D Elevation Design"
  },
  {
    name: "Priya Singh",
    location: "Lucknow, UP",
    text: "Their Vastu compliance service transformed our home&apos;s energy. We&apos;ve seen positive changes since implementing their suggestions. Highly recommended!",
    rating: 5,
    service: "Vastu Compliance Check"
  },
  {
    name: "Amit Sharma",
    location: "Ranchi, Jharkhand",
    text: "The plumbing and electrical plans were detailed and easy to follow. Our contractor appreciated the professionalism and accuracy of the drawings.",
    rating: 4,
    service: "Plumbing & Electrical Plan"
  },
  {
    name: "Sneha Patel",
    location: "Surat, Gujarat",
    text: "I availed their complete package for my new home. The interior design suggestions were practical and beautiful. The team completed everything on time.",
    rating: 5,
    service: "Complete Home Design Package"
  }
];

const teamMembers: TeamMember[] = [
  {
    name: "Aryan Singh",
    role: "Lead Architect",
    experience: "12+ years",
    image: "/images/team/architect1.jpg",
    specialties: ["Modern Architecture", "Vastu Compliance", "3D Visualization"]
  },
  {
    name: "Priya Verma",
    role: "Interior Designer",
    experience: "8+ years",
    image: "/images/team/designer1.jpg",
    specialties: ["Residential Interiors", "Space Optimization", "Color Theory"]
  },
  {
    name: "Rohan Mehta",
    role: "Structural Engineer",
    experience: "10+ years",
    image: "/images/team/engineer1.jpg",
    specialties: ["Foundation Design", "Structural Integrity", "Material Science"]
  },
  {
    name: "Ananya Das",
    role: "Vastu Consultant",
    experience: "15+ years",
    image: "/images/team/vastu1.jpg",
    specialties: ["Vastu Shastra", "Energy Flow", "Traditional Architecture"]
  }
];

const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Consultation",
    description: "We discuss your requirements, budget, and vision through a detailed consultation.",
    icon: <Phone className="w-8 h-8" />
  },
  {
    step: 2,
    title: "Site Analysis",
    description: "We analyze your space (remotely or in-person) to understand constraints and opportunities.",
    icon: <FileText className="w-8 h-8" />
  },
  {
    step: 3,
    title: "Concept Development",
    description: "Our team creates initial design concepts based on your requirements and our expertise.",
    icon: <Heart className="w-8 h-8" />
  },
  {
    step: 4,
    title: "Design Presentation",
    description: "We present the design concepts for your feedback and suggestions.",
    icon: <Users className="w-8 h-8" />
  },
  {
    step: 5,
    title: "Revision & Finalization",
    description: "We refine the designs based on your feedback until you&apos;re completely satisfied.",
    icon: <CheckCircle className="w-8 h-8" />
  },
  {
    step: 6,
    title: "Delivery",
    description: "We deliver the final designs in your preferred format along with necessary documentation.",
    icon: <Award className="w-8 h-8" />
  }
];

export default function Services() {
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedTeamMember, setSelectedTeamMember] = useState<number | null>(null);

  const filteredServices = services.filter(service => {
    if (activeTab === "all") return true;
    if (activeTab === "popular") return service.popular;
    return true;
  });
  const handlePayment = (service: Service) => {
  if (!service.paymentLink) {
    alert("Payment link not available. Please contact support.");
    return;
  }

  // Redirect to Cashfree Payment Page
  window.open(service.paymentLink, "_blank");
};

  return (
    <main className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
     
{/* Services Grid */}
<section id="services" className="py-24 px-6 max-w-7xl mx-auto">
  <div className="text-center mb-16">
    <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
      Our Professional Services
    </h2>

    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
      Thoughtfully crafted architectural solutions combining design excellence and practical execution.
    </p>

    <p className="text-sm text-gray-500 mt-4">
      Trusted by homeowners across India • Fast delivery • Expert guidance
    </p>

    {/* Tabs */}
    <div className="flex flex-wrap justify-center mt-8 gap-3">
      <button 
        className={`px-5 py-2.5 rounded-full text-sm font-medium transition ${
          activeTab === "all"
            ? "bg-indigo-600 text-white shadow-md"
            : "bg-gray-100 dark:bg-gray-700"
        }`}
        onClick={() => setActiveTab("all")}
      >
        All Services
      </button>

      <button 
        className={`px-5 py-2.5 rounded-full text-sm font-medium transition ${
          activeTab === "popular"
            ? "bg-indigo-600 text-white shadow-md"
            : "bg-gray-100 dark:bg-gray-700"
        }`}
        onClick={() => setActiveTab("popular")}
      >
        Most Popular
      </button>
    </div>
  </div>

  <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {filteredServices.map((service, idx) => (
      <motion.div
        key={idx}
        whileHover={{ y: -6 }}
        className={`group relative rounded-2xl border bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition-all overflow-hidden ${
          service.popular ? "ring-1 ring-indigo-500" : ""
        }`}
      >

        {/* Badge */}
        {service.popular && (
          <div className="absolute top-4 left-4 z-10 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
            Most Popular
          </div>
        )}

        {/* Image */}
        <div className="relative w-full h-52 overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="p-6">

          {/* Title */}
          <h3 className="text-xl font-semibold mb-1">
            {service.title}
          </h3>

          {/* Price */}
          <p className="text-indigo-600 font-semibold text-lg mb-2">
            {service.price}
          </p>

          {/* Timeline */}
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <Clock className="w-4 h-4 mr-1" />
            {service.timeline}
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {service.description}
          </p>

          {/* Features */}
          <ul className="space-y-2 mb-6">
            {service.features.slice(0, 3).map((feature, i) => (
              <li key={i} className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                {feature}
              </li>
            ))}
          </ul>

          {/* CTA (SIMPLE & CLEAR) */}
          <div className="flex flex-col gap-3">

            {/* PAYMENT BUTTON */}
            <button
              onClick={() => handlePayment(service)}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition"
            >
              Book Now
            </button>

            {/* CONTACT BUTTON */}
            <a
              href={`https://wa.me/916205820278?text=Hi, I want to know more about ${service.title}`}
              target="_blank"
              className="w-full text-center border border-gray-300 dark:border-gray-600 py-2.5 rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Contact Us
            </a>

          </div>

          {/* Trust */}
          <p className="text-xs text-gray-400 text-center mt-4">
            Secure Payment • Transparent Pricing • Expert Support
          </p>
        </div>
      </motion.div>
    ))}
  </div>
</section>
      {/* Process Section */}
      <section className="py-20 px-6 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Our Design Process</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
            We follow a structured, collaborative process to ensure your vision is realized with precision and creativity.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md text-center"
              >
                <div className="w-16 h-16 mx-auto bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
                  {step.icon}
                </div>
                <div className="text-2xl font-bold text-indigo-600 mb-2">Step {step.step}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Meet Our Expert Team</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
          Our team of experienced professionals brings together expertise in architecture, 
          interior design, engineering, and Vastu to deliver comprehensive home design solutions.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center cursor-pointer"
              onClick={() => setSelectedTeamMember(selectedTeamMember === idx ? null : idx)}
            >
              <div className="w-32 h-32 mx-auto mb-4 relative rounded-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-indigo-600 dark:text-indigo-400">{member.role}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{member.experience} experience</p>
              
              <AnimatePresence>
                {selectedTeamMember === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4"
                  >
                    <h4 className="font-medium mb-2">Specialties:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300">
                      {member.specialties.map((specialty, sIdx) => (
                        <li key={sIdx} className="mb-1">• {specialty}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="mt-4 text-sm text-indigo-600 dark:text-indigo-400">
                {selectedTeamMember === idx ? 'Click to collapse' : 'Click for details'}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">What Our Clients Say</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied customers have to say about our services.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                <p className="text-gray-600 dark:text-gray-300 italic mb-6">&quot;{testimonial.text}&quot;</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</p>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-1">{testimonial.service}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Frequently Asked Questions</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
          Have questions? We&apos;re here to help you with everything you need to know.
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
              className="border border-white px-8 py-4 rounded-xl hover:bg-white/10 transition flex items-center gap-2"
            >
              <Phone size={18} /> Call Us Now
            </a>
            <a
              href="mailto:info@homedesign.com"
              className="border border-white px-8 py-4 rounded-xl hover:bg-white/10 transition flex items-center gap-2"
            >
              <Mail size={18} /> Email Us
            </a>
          </div>
          <p className="mt-8 flex items-center justify-center gap-2">
            <MapPin size={18} /> Serving clients across India from our offices in Patna, Bihar
          </p>
        </div>
      </section>
    </main>
  );
}