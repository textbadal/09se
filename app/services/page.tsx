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
  Clock,
  Globe,
  Ruler,
  Building2,
  Home,
  PenTool,
  Cable,
  Droplets,
  Compass,
  Shield,
  Zap,
  Calendar,
  IndianRupee
} from "lucide-react";

type Service = {
  title: string;
  description: string;
  detailedDescription: string;
  price: string;
  nriPrice?: string;
  image: string;
  features: string[];
  timeline: string;
  popular?: boolean;
  icon: React.ReactNode;
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

type ProjectType = {
  title: string;
  description: string;
  image: string;
  priceRange: string;
};

const services: Service[] = [
  {
    title: "Complete Architectural Drawing Set",
    description: "Comprehensive construction-ready drawings including all plans required for approval and execution.",
    detailedDescription: "Our flagship service provides a complete set of architectural drawings essential for construction and municipal approvals. This includes detailed floor plans, elevations, sections, foundation plans, roof plans, door/window schedules, and electrical/plumbing layouts. Perfect for Indian homeowners and NRIs building their dream home remotely. All drawings comply with local building codes and Vastu principles.",
    price: "₹29,999 onwards",
    nriPrice: "$499 onwards",
    image: "/images/floor3.webp",
    features: [
      "Complete working drawings set",
      "Municipal approval ready",
      "Structural details included",
      "Vastu compliance",
      "5 revisions per drawing",
      "Digital & printed copies",
      "Construction support"
    ],
    timeline: "10-15 days",
    popular: true,
    icon: <Building2 className="w-6 h-6" />
  },
  {
    title: "Custom House Design",
    description: "Bespoke residential design tailored to your lifestyle, plot size, and aesthetic preferences.",
    detailedDescription: "Get a fully customized home design that reflects your personality and meets your family's unique needs. We consider your plot dimensions, orientation, local climate, and personal preferences to create a home that's both beautiful and functional. Our designs blend contemporary architecture with traditional Indian elements. Special attention given to NRI requirements like home automation readiness and multi-generational living spaces.",
    price: "₹19,999 onwards",
    nriPrice: "$349 onwards",
    image: "/images/gallery9.jpg",
    features: [
      "Personalized design concept",
      "3D visualization included",
      "Multiple design options",
      "Climate-responsive design",
      "Vastu consultation",
      "Material recommendations",
      "Unlimited concept revisions"
    ],
    timeline: "7-10 days"
  },
  {
    title: "2D & 3D Floor Plans",
    description: "Detailed floor plans with precise measurements and realistic 3D visualizations.",
    detailedDescription: "Professional floor plans that bring clarity to your project. We provide both 2D technical drawings with accurate dimensions and stunning 3D floor plans that help you visualize spaces better. Includes furniture layout suggestions, traffic flow analysis, and space optimization recommendations. Essential for NRIs to understand spatial relationships without physical site visits.",
    price: "₹4,999 onwards",
    nriPrice: "$99 onwards",
    image: "/images/gallery23.jpg",
    features: [
      "Accurate measurements",
      "3D rendered views",
      "Furniture layout",
      "Area statement",
      "Room dimensions chart",
      "4K resolution renders",
      "Walkthrough video (add-on)"
    ],
    timeline: "3-4 days",
    popular: true,
    icon: <Ruler className="w-6 h-6" />
  },
  {
    title: "3D Elevation & Exterior Design",
    description: "Photorealistic exterior renderings showcasing your home's facade and landscaping.",
    detailedDescription: "Visualize your home's exterior with stunning photorealistic 3D renderings. We create detailed elevation views from all angles, complete with material textures, lighting effects, and landscaping elements. Choose from contemporary, traditional, or fusion styles. Day and night renders included. NRIs particularly appreciate this service for remote decision-making on exterior finishes.",
    price: "₹7,999 onwards",
    nriPrice: "$149 onwards",
    image: "/images/services/plumbing-electrical.jpg",
    features: [
      "4K photorealistic renders",
      "Day & night views",
      "Material visualization",
      "Landscaping design",
      "Color scheme options",
      "360° exterior views",
      "Material specification sheet"
    ],
    timeline: "5-7 days",
    icon: <Home className="w-6 h-6" />
  },
  {
    title: "Interior Design & Detailing",
    description: "Complete interior design package with detailed drawings and material specifications.",
    detailedDescription: "Transform your interiors with our comprehensive design service. We provide detailed interior elevations, false ceiling designs, flooring patterns, electrical layouts, and custom furniture drawings. Includes material mood boards, color palettes, and a complete BOQ (Bill of Quantities) for procurement. Special packages available for NRI clients with virtual design consultations.",
    price: "₹14,999 onwards",
    nriPrice: "$279 onwards",
    image: "/images/services/footing.jpg",
    features: [
      "Room-wise interior elevations",
      "False ceiling design",
      "Flooring layout & pattern",
      "Custom furniture drawings",
      "Material mood board",
      "Complete BOQ provided",
      "Virtual consultation available"
    ],
    timeline: "8-12 days",
    icon: <PenTool className="w-6 h-6" />
  },
  {
    title: "Structural & MEP Drawings",
    description: "Complete structural, electrical, and plumbing drawings for construction execution.",
    detailedDescription: "Technical drawings essential for construction execution. Includes detailed structural drawings with reinforcement details, column/beam layouts, electrical point layouts, plumbing and drainage plans. All drawings adhere to Indian Standard codes and local building regulations. Perfect for contractors to execute work without ambiguity.",
    price: "₹12,999 onwards",
    nriPrice: "$229 onwards",
    image: "/images/services/vastu.jpg",
    features: [
      "Structural working drawings",
      "RCC detailing",
      "Electrical layout plan",
      "Plumbing & drainage plan",
      "HVAC provisions",
      "Quantity estimates",
      "Contractor coordination support"
    ],
    timeline: "7-10 days",
    icon: <Cable className="w-6 h-6" />
  },
  {
    title: "Vastu Compliant Design Package",
    description: "Specialized design service ensuring your home adheres to Vastu Shastra principles.",
    detailedDescription: "Design your home in harmony with Vastu Shastra. Our Vastu experts work alongside architects to create designs that balance traditional principles with modern aesthetics. Includes detailed Vastu analysis, directional recommendations, room placement guidance, and remedial solutions for existing constraints. Highly recommended for Indian families and NRIs who value traditional wisdom.",
    price: "₹8,999 onwards",
    nriPrice: "$159 onwards",
    image: "/images/gallery23.jpg",
    features: [
      "Complete Vastu analysis",
      "Directional recommendations",
      "Room placement as per Vastu",
      "Remedial solutions provided",
      "Energy flow optimization",
      "Color recommendations",
      "Pooja room design included"
    ],
    timeline: "5-7 days",
    popular: true,
    icon: <Compass className="w-6 h-6" />
  },
  {
    title: "NRI Design Management Package",
    description: "End-to-end design and coordination service for NRIs building homes in India.",
    detailedDescription: "A comprehensive service designed specifically for NRIs building homes in India. We act as your local representatives - managing design, coordinating with contractors, providing regular updates, and ensuring quality execution. Includes virtual meetings, weekly progress reports with photos/videos, and assistance with material selection from abroad. Your peace of mind is our priority.",
    price: "Contact for pricing",
    nriPrice: "Starting at $1,499",
    image: "/images/gallery9.jpg",
    features: [
      "Dedicated project manager",
      "Virtual design meetings",
      "Weekly progress reports",
      "Photo & video documentation",
      "Contractor coordination",
      "Material procurement support",
      "Site inspection reports",
      "Multi-timezone availability"
    ],
    timeline: "Project-based",
    icon: <Globe className="w-6 h-6" />
  }
];

const projectTypes: ProjectType[] = [
  {
    title: "Individual House / Villa",
    description: "Custom designed independent houses and luxury villas with complete drawing sets.",
    image: "/images/gallery9.jpg",
    priceRange: "₹29,999 - ₹49,999"
  },
  {
    title: "Duplex / Triplex Homes",
    description: "Multi-level residential designs optimized for space and functionality.",
    image: "/images/floor3.webp",
    priceRange: "₹34,999 - ₹59,999"
  },
  {
    title: "Apartment Interiors",
    description: "Detailed interior drawings for apartments with custom furniture designs.",
    image: "/images/gallery23.jpg",
    priceRange: "₹14,999 - ₹29,999"
  },
  {
    title: "Farmhouse / Resort",
    description: "Specialized designs for farmhouses and small resorts with landscape integration.",
    image: "/images/services/plumbing-electrical.jpg",
    priceRange: "₹39,999 onwards"
  }
];

const faqs = [
  {
    question: "Do you provide services for NRI clients?",
    answer: "Absolutely! We specialize in working with NRI clients. We offer flexible consultation hours across different time zones, virtual meetings, and comprehensive project management services. Our NRI package includes regular video updates, detailed documentation, and we can coordinate with your local representatives or contractors in India.",
  },
  {
    question: "What's included in the Complete Architectural Drawing Set?",
    answer: "Our complete set includes: Site Plan, All Floor Plans (with dimensions), Front & Side Elevations, Sections (minimum 2), Foundation Plan, Column Layout, Roof Plan, Door/Window Schedule, Electrical Layout, Plumbing Layout, and a detailed Area Statement. All drawings are construction-ready and suitable for municipal approvals.",
  },
  {
    question: "How do you handle projects remotely?",
    answer: "We use a streamlined remote workflow: Initial video consultation to understand requirements, digital site measurement guidance (or we can arrange local survey), cloud-based design sharing for reviews, video presentations of designs, and digital delivery of all drawings. We're experienced in remote project management.",
  },
  {
    question: "Are your designs compliant with local building codes?",
    answer: "Yes, all our designs adhere to National Building Code (NBC) of India and local municipal regulations. We're familiar with bylaws across major Indian cities and can customize designs to meet specific local requirements.",
  },
  {
    question: "What is your revision policy?",
    answer: "We believe in getting it right. Each service includes a specified number of free revisions. For complete drawing sets, we offer up to 5 revisions per drawing type. Additional revisions beyond this are charged nominally. Our process ensures we capture your requirements accurately upfront.",
  },
  {
    question: "How do I share my plot details with you?",
    answer: "You can share plot documents (sale deed, survey sketch, site photos) via email or WhatsApp. We'll guide you on taking basic measurements if a professional survey isn't available. For NRIs, we can also arrange professional site surveys through our network.",
  },
  {
    question: "What file formats will I receive?",
    answer: "You'll receive drawings in PDF (for printing/sharing), DWG (AutoCAD format for contractors), and high-resolution JPG/PNG images. 3D views are provided in high-resolution renders. Source files can be provided upon request.",
  },
  {
    question: "Do you provide construction support after delivering drawings?",
    answer: "Yes, we offer ongoing support including contractor queries clarification, minor modifications during construction, and we can recommend trusted contractors in many cities. For comprehensive support, consider our NRI Design Management Package.",
  },
  {
    question: "What is your payment structure?",
    answer: "We require 50% advance to start work, 30% after initial design approval, and 20% upon final delivery. For NRI clients, we accept international bank transfers, PayPal, and Wise. Indian clients can pay via UPI, bank transfer, or card.",
  },
  {
    question: "How long does the complete design process take?",
    answer: "A typical complete drawing set takes 10-15 working days from the date of receiving all required inputs. Timeline may vary based on project complexity and revision cycles. Rush delivery options are available.",
  }
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Patna, Bihar",
    text: "The complete drawing set was incredibly detailed. My contractor said it's one of the most professional sets he's worked with. Construction is progressing smoothly without any confusion.",
    rating: 5,
    service: "Complete Architectural Drawing Set"
  },
  {
    name: "Dr. Priya Menon",
    location: "Dubai, UAE (NRI Client)",
    text: "Being in Dubai, I was worried about building a home in Kerala. Their NRI package was a blessing! Regular video updates, detailed drawings, and they coordinated everything with my local contractor. Highly professional!",
    rating: 5,
    service: "NRI Design Management Package"
  },
  {
    name: "Amit Sharma",
    location: "San Francisco, USA (NRI Client)",
    text: "I appreciated their understanding of both Indian and international standards. The virtual consultation across time zones was seamless. My parents in India are thrilled with the Vastu-compliant design.",
    rating: 5,
    service: "Custom House Design + Vastu Package"
  },
  {
    name: "Sneha Reddy",
    location: "Hyderabad, Telangana",
    text: "Their interior detailing saved us so much money during execution. The BOQ was accurate, and the custom furniture drawings helped our carpenter deliver exactly what we envisioned.",
    rating: 5,
    service: "Interior Design & Detailing"
  }
];

const teamMembers: TeamMember[] = [
  {
    name: "Ar. Vikram Singh",
    role: "Principal Architect",
    experience: "15+ years",
    image: "/images/team/architect1.jpg",
    specialties: ["Residential Architecture", "Vastu Integration", "NRI Projects"]
  },
  {
    name: "Ar. Meera Iyer",
    role: "Senior Architect",
    experience: "10+ years",
    image: "/images/team/designer1.jpg",
    specialties: ["Contemporary Design", "Sustainable Architecture", "3D Visualization"]
  },
  {
    name: "Er. Rohan Mehta",
    role: "Structural Engineer",
    experience: "12+ years",
    image: "/images/team/engineer1.jpg",
    specialties: ["Structural Design", "Seismic Compliance", "Cost Optimization"]
  },
  {
    name: "Pt. Ananya Sharma",
    role: "Vastu & Design Consultant",
    experience: "18+ years",
    image: "/images/team/vastu1.jpg",
    specialties: ["Vastu Shastra", "Astrological Integration", "Energy Harmonization"]
  }
];

const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Discovery Call",
    description: "Detailed video consultation to understand your requirements, plot details, budget, and aesthetic preferences.",
    icon: <Phone className="w-8 h-8" />
  },
  {
    step: 2,
    title: "Site Information",
    description: "We guide you to provide plot dimensions, soil report (if available), and any existing site photos or survey drawings.",
    icon: <MapPin className="w-8 h-8" />
  },
  {
    step: 3,
    title: "Concept Design",
    description: "Our team creates initial floor plans and 3D massing models for your review and feedback.",
    icon: <PenTool className="w-8 h-8" />
  },
  {
    step: 4,
    title: "Design Development",
    description: "We refine the design based on your feedback, developing detailed drawings and elevations.",
    icon: <FileText className="w-8 h-8" />
  },
  {
    step: 5,
    title: "Review & Revisions",
    description: "Multiple rounds of virtual presentations and revisions until you're completely satisfied with the design.",
    icon: <Users className="w-8 h-8" />
  },
  {
    step: 6,
    title: "Final Delivery",
    description: "We deliver the complete drawing set in multiple formats along with all necessary documentation.",
    icon: <CheckCircle className="w-8 h-8" />
  }
];

export default function Services() {
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedTeamMember, setSelectedTeamMember] = useState<number | null>(null);
  const [priceView, setPriceView] = useState<"indian" | "nri">("indian");

  const filteredServices = services.filter(service => {
    if (activeTab === "all") return true;
    if (activeTab === "popular") return service.popular;
    return true;
  });

  return (
    <main className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 text-center px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/5 dark:via-purple-500/5 dark:to-pink-500/5 rounded-3xl -z-10"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -z-10"></div>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium mb-6">
            🇮🇳 Serving Indian & NRI Clients Worldwide
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent"
        >
          Complete Architectural Drawings<br />For Your Dream Home
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 text-lg md:text-xl opacity-80 max-w-3xl mx-auto mb-8"
        >
          Professional construction-ready drawings delivered digitally. Perfect for Indian homeowners and NRIs building remotely. Municipal approval ready, Vastu compliant, and contractor friendly.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="/contact"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-lg font-medium"
          >
            <Calendar size={20} /> Book Free Consultation
          </a>
          <a
            href="#services"
            className="border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 px-8 py-4 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all text-lg font-medium"
          >
            View Our Services
          </a>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-gray-600 dark:text-gray-400"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-500" />
            <span>100% Satisfaction Guaranteed</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-500" />
            <span>Trusted by 200+ NRI Families</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span>Fast 10-Day Delivery</span>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "750+", label: "Projects Delivered" },
              { value: "15+", label: "Years Experience" },
              { value: "28", label: "States Served" },
              { value: "98%", label: "Client Satisfaction" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Types */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">We Design For Every Vision</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg">
            From compact urban homes to sprawling farmhouses, our expertise covers all residential project types.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projectTypes.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="relative h-64">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                  <p className="text-sm opacity-90 mb-2">{project.description}</p>
                  <p className="text-sm font-semibold text-indigo-300">{project.priceRange}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Professional Drawing Services</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg mb-6">
            Comprehensive architectural documentation for every stage of your project. Choose individual services or opt for our complete package.
          </p>
          
          {/* Price Toggle */}
          <div className="inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1 mb-4">
            <button 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                priceView === "indian" 
                  ? "bg-white dark:bg-gray-700 shadow text-indigo-600 dark:text-indigo-400" 
                  : "text-gray-600 dark:text-gray-400"
              }`}
              onClick={() => setPriceView("indian")}
            >
              <IndianRupee className="w-4 h-4 inline mr-1" />
              Indian Pricing
            </button>
            <button 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                priceView === "nri" 
                  ? "bg-white dark:bg-gray-700 shadow text-indigo-600 dark:text-indigo-400" 
                  : "text-gray-600 dark:text-gray-400"
              }`}
              onClick={() => setPriceView("nri")}
            >
              <Globe className="w-4 h-4 inline mr-1" />
              NRI Pricing (USD)
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            <button 
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "all" 
                  ? "bg-indigo-600 text-white shadow-md" 
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All Services
            </button>
            <button 
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "popular" 
                  ? "bg-indigo-600 text-white shadow-md" 
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
              onClick={() => setActiveTab("popular")}
            >
              Most Popular
            </button>
          </div>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -8 }}
              className={`rounded-2xl border shadow-lg overflow-hidden bg-white dark:bg-gray-800 transition-all cursor-pointer ${
                service.popular ? 'ring-2 ring-indigo-500 ring-offset-2' : 'hover:shadow-xl'
              }`}
              onClick={() => setExpandedService(expandedService === idx ? null : idx)}
            >
              {service.popular && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-lg">
                  ⭐ MOST POPULAR
                </div>
              )}
              <div className="relative w-full h-52">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                {service.icon && (
                  <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 p-2 rounded-lg">
                    {service.icon}
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold">{service.title}</h3>
                </div>
                
                <div className="flex items-center gap-4 mb-3">
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {priceView === "indian" ? service.price : (service.nriPrice || "Contact us")}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{service.timeline}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {service.description}
                </p>
                
                <AnimatePresence>
                  {expandedService === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t pt-4 mt-2"
                    >
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{service.detailedDescription}</p>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {service.features.map((feature, featureIdx) => (
                          <div key={featureIdx} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-medium shadow-md">
                        Get Started with {service.title}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="mt-4 flex justify-between items-center text-sm">
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                    {expandedService === idx ? 'Show less' : 'Click for details'}
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

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Why Clients Trust Us</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto text-lg">
            We combine architectural expertise with a deep understanding of Indian construction practices and NRI requirements.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="w-8 h-8" />,
                title: "Construction-Ready Drawings",
                description: "Every drawing set is detailed, dimensioned, and ready for contractor execution. No ambiguity, no delays."
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "NRI-Friendly Process",
                description: "Virtual consultations, flexible time zones, and digital delivery. Build your Indian home from anywhere."
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Municipal Approval Ready",
                description: "All drawings comply with local building codes and are suitable for plan sanctioning."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center"
              >
                <div className="w-16 h-16 mx-auto bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Keeping existing but updating styling */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Streamlined Process</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto text-lg">
            A proven workflow designed for clarity and collaboration, whether you're next door or across the globe.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white">
                    <span className="text-xl font-bold">{step.step}</span>
                  </div>
                  <div className="text-indigo-600 dark:text-indigo-400">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Keeping with updated styling */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Meet Your Design Team</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto text-lg">
          Experienced professionals dedicated to bringing your vision to life with precision and creativity.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md text-center cursor-pointer hover:shadow-xl transition-all"
              onClick={() => setSelectedTeamMember(selectedTeamMember === idx ? null : idx)}
            >
              <div className="w-32 h-32 mx-auto mb-4 relative rounded-full overflow-hidden border-4 border-indigo-100 dark:border-indigo-900">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-indigo-600 dark:text-indigo-400 font-medium">{member.role}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{member.experience} experience</p>
              
              <AnimatePresence>
                {selectedTeamMember === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t"
                  >
                    <h4 className="font-medium mb-2 text-sm">Specialties:</h4>
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
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">What Our Clients Say</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto text-lg">
            Hear from homeowners and NRIs who trusted us with their dream home designs.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-lg italic mb-6">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <p className="font-bold text-lg">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</p>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-1 font-medium">{testimonial.service}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Frequently Asked Questions</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-10 text-lg">
          Everything you need to know about our architectural drawing services.
        </p>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold pr-8">{faq.question}</h3>
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
                    className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed"
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
      <section className="py-20 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Ready to Start Your Dream Home Project?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl mb-8 opacity-95"
          >
            Get a free consultation with our senior architect. Let's discuss your vision.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="/contact"
              className="bg-white text-indigo-600 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all font-bold text-lg"
            >
              Schedule Free Consultation
            </a>
            <a
              href="tel:+919876543210"
              className="border-2 border-white px-8 py-4 rounded-xl hover:bg-white/10 transition-all flex items-center gap-2 text-lg font-medium"
            >
              <Phone size={20} /> Call Us Now
            </a>
            <a
              href="mailto:info@homedesign.com"
              className="border-2 border-white px-8 py-4 rounded-xl hover:bg-white/10 transition-all flex items-center gap-2 text-lg font-medium"
            >
              <Mail size={20} /> Email Us
            </a>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex items-center justify-center gap-2"
          >
            <MapPin size={18} /> Serving clients across India • NRI Desk available 24/7
          </motion.p>
        </div>
      </section>
    </main>
  );
}