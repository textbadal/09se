"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  ChevronUp, 
  Star, 
  CheckCircle, 
  Users,
  Award,
  FileText,
  Phone,
  Mail,
  MapPin,
  Clock,
  Heart,
  ShieldCheck,
  Zap,
  Sparkles
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
  {
    title: "Vastu-Based Floor Plan (Starter)",
    description: "Start your home design with expert planning.",
    detailedDescription: "Get a professional floor plan designed as per Vastu with unlimited revisions until satisfaction. Perfect starting point for your dream home.",
    price: "₹3,499",
    image: "/images/floor3.webp",
    features: ["Vastu-based planning", "Unlimited revisions", "Optimized room layout", "Plot utilization guidance"],
    timeline: "2-3 days",
    advance: 499,
    paymentLink: "https://payments.cashfree.com/forms/dream-homes-booking"
  },
  {
    title: "3D Elevation Design",
    description: "See your home before you build it.",
    detailedDescription: "Get realistic 3D elevation designs with materials, textures, lighting, and exterior detailing for a clear visualization.",
    price: "₹4,999",
    image: "/images/gallery11.jpg",
    features: ["Photorealistic render", "Modern elevation styles", "Multiple angle views", "5 revisions included"],
    timeline: "4-5 days",
    advance: 499,
    paymentLink: "https://payments.cashfree.com/forms/dream-homes-booking"
  },
  {
    title: "Complete House Design Package",
    description: "Everything required to build your dream home.",
    detailedDescription: "Our premium package includes complete architectural drawings: Vastu floor plan with unlimited revisions, 3D elevation, 2D elevation, structural guidance, electrical & plumbing layouts, and working drawings.",
    price: "₹16,999",
    image: "/images/dhb-16999.webp",
    features: ["Vastu Floor Plan (Unlimited revisions)", "3D Elevation Design", "2D Elevation Drawings", "Structural Blueprints", "Electrical Layouts & Plumbing Plans", "Complete Execution Documentation", "Priority Architect Support"],
    timeline: "7-10 days",
    popular: true,
    advance: 1999,
    paymentLink: "https://payments.cashfree.com/forms/dream-homes-booking"
  },
  {
    title: "Vastu Consultation",
    description: "Expert guidance for positive energy flow.",
    detailedDescription: "Detailed Vastu analysis with practical remedies for better health, wealth, and harmony.",
    price: "₹799",
    image: "/images/product2.jpg",
    features: ["Direction analysis", "Room placement advice", "Remedy suggestions"],
    timeline: "1-2 days",
    advance: 499,
    paymentLink: "https://payments.cashfree.com/forms/dream-homes-booking"
  },
  {
    title: "Interior Layout Plan",
    description: "Smart interior planning for better living.",
    detailedDescription: "Furniture layout, space optimization, and basic interior planning to enhance usability and aesthetics.",
    price: "₹3,499",
    image: "/images/gallery13.jpg",
    features: ["Furniture layout", "Space optimization", "Modern design ideas"],
    timeline: "2-3 days",
    advance: 499,
    paymentLink: "https://payments.cashfree.com/forms/dream-homes-booking"
  }
];

const faqs = [
  { question: "Do you provide services outside Bihar?", answer: "Yes, we serve clients all over India with online consultation and design delivery. We use modern collaboration tools to work with clients remotely, regardless of location. We've successfully completed projects in over 15 states across India." },
  { question: "Are your designs Vastu-compliant?", answer: "Yes, every design can be customized as per Vastu principles to bring positivity and balance. We can also incorporate Feng Shui principles upon request. Our team includes Vastu experts who ensure traditional principles are harmoniously integrated with modern design requirements." },
  { question: "How fast will I get my plan?", answer: "Most plans are delivered within 3–5 working days, depending on complexity. Rush delivery is available for an additional fee. The exact timeline will be confirmed after we understand your specific requirements during the initial consultation." },
  { question: "Can I request changes after delivery?", answer: "Yes, we provide free revisions until you're fully satisfied with your plan. The number of revisions depends on the service package you choose. We believe in perfecting your design until it matches your vision completely." },
  { question: "What information do I need to provide?", answer: "You'll need to share your plot dimensions, preferred room sizes, any specific requirements, and inspiration images if you have them. We'll guide you through the information collection process with a detailed questionnaire." },
  { question: "Do you provide construction guidance?", answer: "Yes, we offer basic guidance for construction based on our designs. We can also recommend trusted contractors in your area. For an additional fee, we provide site supervision services to ensure proper implementation of our designs." }
];

const testimonials = [
  { name: "Rajesh Kumar", location: "Patna, Bihar", text: "The 3D elevation design helped me visualize my home perfectly. The team was responsive to all my change requests and delivered beyond expectations.", rating: 5, service: "3D Elevation Design" },
  { name: "Priya Singh", location: "Lucknow, UP", text: "Their Vastu compliance service transformed our home's energy. We've seen positive changes since implementing their suggestions. Highly recommended!", rating: 5, service: "Vastu Compliance Check" },
  { name: "Amit Sharma", location: "Ranchi, Jharkhand", text: "The plumbing and electrical plans were detailed and easy to follow. Our contractor appreciated the professionalism and accuracy of the drawings.", rating: 5, service: "Plumbing & Electrical Plan" },
  { name: "Sneha Patel", location: "Surat, Gujarat", text: "I availed their complete package for my new home. The interior design suggestions were practical and beautiful. The team completed everything on time.", rating: 5, service: "Complete Home Design Package" }
];

const teamMembers: TeamMember[] = [
  { name: "Aryan Singh", role: "Lead Architect", experience: "12+ years", image: "/images/team/architect1.jpg", specialties: ["Modern Architecture", "Vastu Compliance", "3D Visualization"] },
  { name: "Priya Verma", role: "Interior Designer", experience: "8+ years", image: "/images/team/designer1.jpg", specialties: ["Residential Interiors", "Space Optimization", "Color Theory"] },
  { name: "Rohan Mehta", role: "Structural Engineer", experience: "10+ years", image: "/images/team/engineer1.jpg", specialties: ["Foundation Design", "Structural Integrity", "Material Science"] },
  { name: "Ananya Das", role: "Vastu Consultant", experience: "15+ years", image: "/images/team/vastu1.jpg", specialties: ["Vastu Shastra", "Energy Flow", "Traditional Architecture"] }
];

const processSteps: ProcessStep[] = [
  { step: 1, title: "Consultation", description: "We discuss your requirements, budget, and vision through a detailed digital sync.", icon: <Phone className="w-5 h-5" /> },
  { step: 2, title: "Site Analysis", description: "We analyze your parameters to map out exact physical site constraints.", icon: <FileText className="w-5 h-5" /> },
  { step: 3, title: "Concept Drafts", description: "Our architecture desk details layout drafts matching spatial criteria.", icon: <Heart className="w-5 h-5" /> },
  { step: 4, title: "Interactive Review", description: "Designs are presented directly for real-time customer feedback alignment.", icon: <Users className="w-5 h-5" /> },
  { step: 5, title: "Refinements", description: "We meticulously polish layouts line-by-line until they match your expectations.", icon: <CheckCircle className="w-5 h-5" /> },
  { step: 6, title: "Final Delivery", description: "Receive high-resolution blueprints, engineering sheets, and structural metrics.", icon: <Award className="w-5 h-5" /> }
];

export default function Services() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedTeamMember, setSelectedTeamMember] = useState<number | null>(null);

  const filteredServices = services.filter(service => {
    if (activeTab === "all") return true;
    if (activeTab === "popular") return service.popular;
    return true;
  });

  const handlePayment = (service: Service) => {
    if (!service.paymentLink) return;
    window.open(service.paymentLink, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 min-h-screen antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* 🚀 Dynamic Header / Hero Area Hero Context */}
      <section className="relative pt-20 pb-12 overflow-hidden bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-900">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0))] dark:bg-grid-slate-900/50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" /> India-Wide Digital Architectural Services
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 tracking-tight text-slate-900 dark:text-white">
            Architectural Solutions, <span className="text-indigo-600 dark:text-indigo-400">Perfectly Executed.</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base sm:text-lg md:text-xl font-normal leading-relaxed">
            Premium Vastu floors, immersive 3D elevation layouts, and complete engineering documentation packages compiled by licensed professionals.
          </p>

          {/* Core Trust Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12 pt-8 border-t border-slate-100 dark:border-slate-900">
            {[
              { label: "Design Delivery", value: "100% Digital", icon: <Zap className="w-4 h-4 text-amber-500" /> },
              { label: "Vastu Integration", value: "Expert Backed", icon: <CheckCircle className="w-4 h-4 text-emerald-500" /> },
              { label: "Project Footprint", value: "15+ States", icon: <MapPin className="w-4 h-4 text-indigo-500" /> },
              { label: "Financial Safeguard", value: "Secure Escrow", icon: <ShieldCheck className="w-4 h-4 text-blue-500" /> }
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800/80">
                <div className="p-2 rounded-lg bg-white dark:bg-slate-950 shadow-sm">{stat.icon}</div>
                <div className="text-left">
                  <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">{stat.label}</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🛠️ Services Segment */}
      <section id="services" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-left">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Explore Our Design Packages
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xl">
              Select an option below to start your engagement. We offer standalone consulting layout checks alongside robust turnkey blueprint drafting.
            </p>
          </div>

          {/* Custom Navigation Tab Selector */}
          <div className="flex bg-slate-200/60 dark:bg-slate-800/80 p-1 rounded-xl self-start md:self-auto border border-slate-300/20">
            {[
              { id: "all", label: "All Packages" },
              { id: "popular", label: "Most Popular Only" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === tab.id 
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Card Architecture Grid */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {filteredServices.map((service, idx) => (
            <motion.div
              key={idx}
              layout
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className={`group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-800 border transition-all overflow-hidden ${
                service.popular 
                  ? "ring-2 ring-indigo-500 dark:ring-indigo-400 border-transparent shadow-xl shadow-indigo-500/5 dark:shadow-indigo-500/10" 
                  : "border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md"
              }`}
            >
              <div>
                {/* Visual Image Shell */}
                <div className="relative w-full h-56 overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-w-7xl) 33vw"
                    className="object-cover group-hover:scale-105 transition duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-slate-900/20" />
                  
                  {service.popular && (
                    <span className="absolute top-4 right-4 bg-indigo-600 text-white text-[10px] uppercase tracking-widest font-black px-3 py-1 rounded-full shadow-md z-10 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 fill-white" /> Flagship Choice
                    </span>
                  )}

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white z-10">
                    <span className="text-xs bg-slate-900/60 backdrop-blur-md px-2.5 py-1 rounded-md font-medium inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" /> {service.timeline}
                    </span>
                  </div>
                </div>

                {/* Core Descriptive Context */}
                <div className="p-6">
                  <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {service.title}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">{service.price}</span>
                    <span className="text-xs text-slate-400">Fixed Package Value</span>
                  </div>
                  
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="h-px bg-slate-100 dark:bg-slate-700 mb-5" />

                  {/* Bullet Spec Matrices */}
                  <h4 className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-3">Included Scope & Outputs</h4>
                  <ul className="space-y-2.5">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm text-slate-600 dark:text-slate-300">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-2.5 mt-0.5 flex-shrink-0" />
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Anchors */}
              <div className="p-6 pt-0 mt-auto">
                <div className="flex flex-col gap-2.5">
                  <button
                    onClick={() => handlePayment(service)}
                    className={`w-full py-3 rounded-xl font-bold text-sm tracking-wide shadow-sm active:scale-[0.99] transition-all ${
                      service.popular
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20"
                        : "bg-slate-900 hover:bg-slate-800 dark:bg-indigo-950 dark:hover:bg-indigo-900 text-white"
                    }`}
                  >
                    Instant Onboarding Book
                  </button>
                  <a
                    href={`https://wa.me/916205820278?text=Hi,%20I%20want%20to%20know%20more%20about%20${encodeURIComponent(service.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center border border-slate-200 dark:border-slate-700 py-2.5 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors"
                  >
                    Inquire Blueprint Specs
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🧭 The Project Roadmap Grid Section */}
      <section className="py-24 px-4 sm:px-6 bg-slate-100 dark:bg-slate-950 border-y border-slate-200/80 dark:border-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 rounded-full">Operational System</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-3 sm:text-4xl">Our Precision Blueprint Framework</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">How we advance project scopes from custom brief inputs down through structural generation engineering templates remotely.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {processSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center shadow-inner font-bold">
                      {step.icon}
                    </div>
                    <span className="text-xs font-black text-slate-300 dark:text-slate-700">STG / 0{step.step}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 👥 Human Expertise Panel */}
      <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Engineered By Specialists</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Every plan is verified across individual disciplines to align structural viability with Vastu requirements.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, idx) => {
            const isSelected = selectedTeamMember === idx;
            return (
              <motion.div 
                key={idx}
                layout
                className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-800/80 text-center cursor-pointer hover:border-indigo-400 dark:hover:border-indigo-900 transition-all duration-300 flex flex-col justify-between select-none"
                onClick={() => setSelectedTeamMember(isSelected ? null : idx)}
              >
                <div>
                  <div className="w-24 h-24 mx-auto mb-4 relative rounded-full overflow-hidden border-2 border-slate-100 dark:border-slate-800 bg-slate-100">
                    <Image src={member.image} alt={member.name} fill sizes="96px" className="object-cover" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{member.name}</h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold tracking-tight">{member.role}</p>
                  <span className="inline-block mt-2 text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full font-bold">{member.experience} Field Exp</span>
                  
                  <AnimatePresence initial={false}>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-left">
                          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Core Matrix</p>
                          <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                            {member.specialties.map((spec, sIdx) => (
                              <li key={sIdx} className="flex items-center gap-1.5 font-medium">
                                <span className="w-1 h-1 rounded-full bg-indigo-500" /> {spec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <div className="mt-5 text-[10px] font-bold text-indigo-500 uppercase tracking-widest pt-2 border-t border-slate-50 dark:border-slate-800/40">
                  {isSelected ? 'Collapse Specs' : 'Expand Focus Area'}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 💬 Verified Case Reviews */}
      <section className="py-24 px-4 sm:px-6 bg-slate-100 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Client Verification Records</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Real feedback structural case validations received from real active residential construction sites across India.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((test, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex mb-3 gap-0.5">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 italic text-sm leading-relaxed mb-6">
                    &ldquo;{test.text}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-sm text-slate-900 dark:text-white">{test.name}</p>
                    <p className="text-xs text-slate-400 flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-300" /> {test.location}</p>
                  </div>
                  <span className="text-[11px] bg-slate-100 dark:bg-indigo-950/60 text-slate-600 dark:text-indigo-400 px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">
                    {test.service}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ❓ Support Accordion */}
      <section className="py-24 px-4 sm:px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white text-center mb-2">Technical Core FAQ</h2>
        <p className="text-center text-slate-500 dark:text-slate-400 mb-12 text-sm">Clear foundational data insights outlining engineering scopes, file types, and onboarding queries.</p>
        
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 shadow-sm overflow-hidden transition-all duration-200">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 flex justify-between items-center gap-4 font-bold text-slate-900 dark:text-white focus:outline-none hover:bg-slate-50 dark:hover:bg-slate-800/40 text-sm sm:text-base"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-indigo-500 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-indigo-500 flex-shrink-0" />}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3 font-medium">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 🚀 High Conversion Closure Strip */}
      <section className="py-20 px-4 sm:px-6 bg-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.8),transparent)]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Let's Construct Safely.</h2>
          <p className="text-base md:text-lg mb-10 opacity-90 max-w-xl mx-auto font-medium">
            Avoid structural failure pitfalls. Secure precision engineered floor layouts blueprint verified prior to breaking ground.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <a href="/contact" className="bg-white text-indigo-700 hover:bg-slate-50 px-8 py-4 rounded-xl shadow-lg transition active:scale-95 font-bold text-sm tracking-wide">
              Initiate Project Brief
            </a>
            <a href="tel:+919876543210" className="bg-white/10 border border-white/20 hover:bg-white/20 backdrop-blur-md px-6 py-4 rounded-xl transition flex items-center gap-2 text-sm font-bold">
              <Phone size={16} /> Direct Desk Line
            </a>
            <a href="mailto:info@homedesign.com" className="bg-white/10 border border-white/20 hover:bg-white/20 backdrop-blur-md px-6 py-4 rounded-xl transition flex items-center gap-2 text-sm font-bold">
              <Mail size={16} /> Technical Email
            </a>
          </div>
          <p className="mt-12 text-xs opacity-75 flex items-center justify-center gap-1.5 font-medium">
            <MapPin size={14} /> National Distribution Operations Focal Base: Patna, Bihar, India
          </p>
        </div>
      </section>
    </main>
  );
}