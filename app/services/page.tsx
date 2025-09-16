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
  {
    title: "2D Floor Plan",
    description: "Detailed floor plans for your home with measurements and layout.",
    detailedDescription: "Our comprehensive 2D floor plan service provides precise technical drawings that serve as the foundation for your construction project. We create scale drawings showing the layout of rooms, walls, doors, windows, and permanent fixtures. Each plan includes accurate dimensions, area calculations, and furniture placement options to maximize your space efficiency.",
    price: "₹999 onwards",
    image: "/images/floor3.webp",
    features: ["Accurate measurements", "Room layout optimization", "Furniture placement", "3 revisions included", "Scale drawings", "Area calculations"],
    timeline: "2-3 days",
    popular: true
  },
  {
    title: "3D Elevation Design",
    description: "Realistic 3D elevation rendering of your house design.",
    detailedDescription: "Transform your architectural vision into photorealistic 3D visualizations. Our elevation designs help you visualize the exterior of your home from multiple angles, with realistic textures, materials, lighting, and landscaping. We provide both daytime and nighttime renders to give you a complete understanding of how your home will look in different conditions.",
    price: "₹1,999 onwards",
    image: "/images/gallery9.jpg",
    features: ["Photorealistic rendering", "Multiple angle views", "Material visualization", "5 revisions included", "Day/Night renders", "Landscaping integration"],
    timeline: "4-5 days"
  },
  {
    title: "Interior Design",
    description: "Complete interior design with Vastu compliance and decor suggestions.",
    detailedDescription: "Create harmonious and functional living spaces with our complete interior design service. We develop cohesive design concepts that reflect your personal style while ensuring optimal functionality. Our designs include color schemes, furniture plans, lighting design, material selections, and decorative elements—all while adhering to Vastu principles for positive energy flow.",
    price: "₹2,499 onwards",
    image: "/images/gallery23.jpg",
    features: ["Vastu-compliant designs", "Color scheme suggestions", "Furniture recommendations", "Unlimited revisions", "Lighting plan", "Material selection"],
    timeline: "5-7 days",
    popular: true
  },/* Services
  {
    title: "Plumbing & Electrical Plan",
    description: "Professional plumbing and electrical layout for smooth construction.",
    detailedDescription: "Ensure your home&apos;s functional systems are perfectly planned with our detailed plumbing and electrical plans. We create comprehensive layouts that specify the placement of all outlets, switches, light fixtures, plumbing fixtures, and connections. Our plans adhere to safety standards and local building codes, helping contractors execute installations efficiently.",
    price: "₹1,499 onwards",
    image: "/images/services/plumbing-electrical.jpg",
    features: ["Code-compliant designs", "Fixture placement", "Circuit planning", "3 revisions included", "Safety compliance", "Energy efficiency optimization"],
    timeline: "3-4 days"
  }, 
  {
    title: "Footing Plan",
    description: "Accurate footing plan for safe and strong foundation.",
    detailedDescription: "Lay a solid foundation for your home with our structurally sound footing plans. Our engineers create detailed foundation plans that specify dimensions, materials, reinforcement details, and construction techniques appropriate for your soil conditions and building design. We ensure your foundation meets all structural requirements for safety and durability.",
    price: "₹999 onwards",
    image: "/images/services/footing.jpg",
    features: ["Structural accuracy", "Material specifications", "Load calculations", "2 revisions included", "Soil consideration", "Reinforcement details"],
    timeline: "2-3 days"
  },
  {
    title: "Vastu Compliance Check",
    description: "Ensure your home follows Vastu principles for positivity.",
    detailedDescription: "Create a harmonious living environment with our Vastu compliance service. Our experts analyze your plans according to ancient Vastu Shastra principles and provide detailed recommendations for optimizing energy flow, health, prosperity, and wellbeing. We offer practical solutions that balance traditional principles with modern architectural requirements.",
    price: "₹799 onwards",
    image: "/images/services/vastu.jpg",
    features: ["Direction analysis", "Remedial suggestions", "Room placement guidance", "Detailed report", "Modern-traditional balance", "Energy flow optimization"],
    timeline: "1-2 days"
  },   Grid */
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
          Professional Home Design Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 text-lg opacity-80 max-w-3xl mx-auto mb-8"
        >
          From concept to completion, we provide comprehensive architectural and interior design solutions 
          tailored to your vision, budget, and requirements. Serving clients across India with precision and creativity.
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
            <Phone size={18} /> Book Free Consultation
          </a>
          <a
            href="#services"
            className="border border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 px-8 py-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition"
          >
            Explore Our Services
          </a>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-3xl font-bold text-indigo-600 mb-2">500+</div>
              <div className="text-gray-600 dark:text-gray-300">Projects Completed</div>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-3xl font-bold text-indigo-600 mb-2">12+</div>
              <div className="text-gray-600 dark:text-gray-300">Years Experience</div>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-3xl font-bold text-indigo-600 mb-2">95%</div>
              <div className="text-gray-600 dark:text-gray-300">Client Satisfaction</div>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-3xl font-bold text-indigo-600 mb-2">25+</div>
              <div className="text-gray-600 dark:text-gray-300">Cities Across India</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Professional Services</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We offer end-to-end home design solutions from conceptualization to execution support. 
            Each service is delivered with precision, creativity, and attention to detail.
          </p>
          <div className="flex flex-wrap justify-center mt-6 gap-2">
            <button 
              className={`px-4 py-2 rounded-full ${activeTab === "all" ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}`}
              onClick={() => setActiveTab("all")}
            >
              All Services
            </button>
            <button 
              className={`px-4 py-2 rounded-full ${activeTab === "popular" ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}`}
              onClick={() => setActiveTab("popular")}
            >
              Most Popular
            </button>
          </div>
        </div>
        
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className={`rounded-xl border shadow-lg overflow-hidden bg-white dark:bg-gray-800 transition-all cursor-pointer relative ${service.popular ? 'ring-2 ring-indigo-500' : ''}`}
              onClick={() => setExpandedService(expandedService === idx ? null : idx)}
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
                
                <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{service.timeline}</span>
                </div>
                
                <AnimatePresence>
                  {expandedService === idx ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="mt-3 text-gray-700 dark:text-gray-300">{service.detailedDescription}</p>
                      <ul className="mt-4 space-y-2">
                        {service.features.map((feature, featureIdx) => (
                          <li key={featureIdx} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                        Select This Service
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
                    {expandedService === idx ? 'Click to collapse' : 'Click for details'}
                  </span>
                  {expandedService === idx ? (
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