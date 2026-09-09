"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  ChevronUp, 
  Star, 
  CheckCircle2, 
  Award, 
  FileText, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Crown, 
  Layers, 
  Compass, 
  ArrowRight, 
  Check, 
  Building2,
  X,
  Sliders,
  Maximize2
} from "lucide-react";

type Service = {
  id: string;
  category: "starter" | "standard" | "luxury" | "estate";
  title: string;
  tagline: string;
  description: string;
  price: string;
  rawPrice: number;
  image: string;
  features: string[];
  deliverables: string[];
  timeline: string;
  popular?: boolean;
  exclusive?: boolean;
  advance: number;
  paymentLink: string;
};

const services: Service[] = [
  {
    id: "vastu-starter",
    category: "starter",
    title: "Vastu Layout Drafting",
    tagline: "Essential Spatial Planning",
    description: "Ideal starting point for residential planning. Optimized 2D floor layouts strictly structured around Vastu Shastra orientation matrices.",
    price: "₹3,499",
    rawPrice: 3499,
    image: "/images/floor3.webp",
    features: [
      "Vastu Orientation & Direction Matrix",
      "Optimized Room & Space Allocation",
      "Plot Boundary & Setback Metrics",
      "Unlimited Digital Revisions"
    ],
    deliverables: ["2D High-Res CAD Floor Plan", "Vastu Compliance Sheet"],
    timeline: "2–3 Days",
    advance: 499,
    paymentLink: "https://payments.cashfree.com/forms/dream-homes-booking"
  },
  {
    id: "3d-elevation",
    category: "standard",
    title: "3D Facade & Render Suite",
    tagline: "Photorealistic Exterior Design",
    description: "High-definition 3D renders with real material mapping, custom lighting schemes, and elevation detailing for complete visualization.",
    price: "₹6,999",
    rawPrice: 6999,
    image: "/images/gallery11.jpg",
    features: [
      "4K Photorealistic Renders",
      "Material, Texture & Lighting Specs",
      "Multiple View Angles (Day & Night)",
      "5 Revision Cycles Included"
    ],
    deliverables: ["High-Res Renders (PDF/PNG)", "Material Spec Sheet"],
    timeline: "4–5 Days",
    advance: 999,
    paymentLink: "https://payments.cashfree.com/forms/dream-homes-booking"
  },
  {
    id: "complete-house-package",
    category: "standard",
    title: "Complete Blueprint Package",
    tagline: "Turnkey Execution Working Drawings",
    description: "Complete set of execution drawings including structural calculation sheets, electrical circuits, plumbing schematics, and 3D elevations.",
    price: "₹18,999",
    rawPrice: 18999,
    image: "/images/dhb-16999.webp",
    features: [
      "Vastu Floor Plans (Unlimited Revisions)",
      "3D Exterior Elevation Renders",
      "Structural Engineering Blueprints",
      "Electrical & Plumbing (MEP) Layouts",
      "Boundary Wall & Gate Details",
      "Priority Senior Architect Support"
    ],
    deliverables: ["Full Construction Blueprints (PDF/CAD)", "Structural Stability Sheet"],
    timeline: "7–10 Days",
    popular: true,
    advance: 2999,
    paymentLink: "https://payments.cashfree.com/forms/dream-homes-booking"
  },
  {
    id: "luxury-villa-blueprint",
    category: "luxury",
    title: "Luxury Villa & Residence Suite",
    tagline: "Custom Architectural Engineering",
    description: "Designed for premium duplexes, villas, and multi-story bungalows. Includes landscape architecture, structural stress analysis, and dedicated senior architect oversight.",
    price: "₹49,999",
    rawPrice: 49999,
    image: "/images/product2.jpg",
    features: [
      "Complete Structural, MEP & Architectural Blueprint Suite",
      "Custom Landscape & Courtyard Master Plan",
      "Soil Load & Foundation Analysis",
      "3D Walkthrough Animation Video (1080p)",
      "Assigned Senior Architect & Lead Structural Engineer",
      "Unlimited Revisions & Direct Site Team Consults"
    ],
    deliverables: ["Full Blueprint Book (Print-Ready PDF + CAD)", "3D Walkthrough Video", "Material BOQ"],
    timeline: "14–20 Days",
    exclusive: true,
    advance: 9999,
    paymentLink: "https://payments.cashfree.com/forms/dream-homes-booking"
  },
  {
    id: "turnkey-interior-bim",
    category: "luxury",
    title: "Turnkey BIM & Interior Executive Suite",
    tagline: "3D BIM & Custom Interior Design",
    description: "Complete 3D Building Information Modeling (BIM), custom interior room elevations, HVAC schematics, itemized BOQ cost breakdowns, and live contractor coordination.",
    price: "₹89,999",
    rawPrice: 89999,
    image: "/images/gallery13.jpg",
    features: [
      "Full BIM 3D Structural & Architectural Model",
      "Room-by-Room Interior Elevation & Ceiling Plans",
      "HVAC, Automation & Security Wiring Schematics",
      "Bill of Quantities (BOQ) with Material Cost Breakdown",
      "Weekly Contractor Tele-Guidance Calls",
      "Full Vastu Shastra Audit Certificate"
    ],
    deliverables: ["Master Dossier (Digital + Hard Copy)", "BIM 3D Model File", "Itemized BOQ Sheet"],
    timeline: "25–30 Days",
    exclusive: true,
    advance: 14999,
    paymentLink: "https://payments.cashfree.com/forms/dream-homes-booking"
  },
  {
    id: "estate-commercial-masterplan",
    category: "estate",
    title: "Commercial & Ultra-Estate Masterplan",
    tagline: "Large-Scale Multi-Acre Architectural Engineering",
    description: "For luxury farmhouses, commercial complexes, and multi-family estates. Includes zoning permissions, civil engineering, traffic flow analysis, and site supervision.",
    price: "₹1,49,999",
    rawPrice: 149999,
    image: "/images/gallery11.jpg",
    features: [
      "Comprehensive Multi-Acre Site Masterplanning",
      "Commercial Civil Engineering & Load Calculations",
      "Complete Architectural, MEP, Interior & BIM Integration",
      "4K Cinematic Architectural Walkthrough (4K 60fps)",
      "Bi-Weekly Site Supervision Calls with Chief Architect",
      "Turnkey Vendor & Contractor Onboarding Support"
    ],
    deliverables: ["Bound Architectural Blueprint Dossier", "4K Video Walkthrough", "Complete Civil Engineering Master File"],
    timeline: "30–45 Days",
    exclusive: true,
    advance: 25000,
    paymentLink: "https://payments.cashfree.com/forms/dream-homes-booking"
  }
];

const comparisonMatrix = [
  { feature: "Vastu 2D Floor Plans", starter: true, standard: true, luxury: true, estate: true },
  { feature: "3D Exterior Renders", starter: false, standard: "Standard (4K)", luxury: "Advanced (4K)", estate: "Cinematic (4K 60fps)" },
  { feature: "Structural & Civil Engineering", starter: false, standard: true, luxury: true, estate: true },
  { feature: "MEP (Electrical & Plumbing)", starter: false, standard: true, luxury: true, estate: true },
  { feature: "BIM 3D Modeling", starter: false, standard: false, luxury: true, estate: true },
  { feature: "Bill of Quantities (BOQ) & Costs", starter: false, standard: false, luxury: true, estate: true },
  { feature: "Dedicated Senior Architect Lead", starter: false, standard: false, luxury: true, estate: true },
  { feature: "Contractor Onboarding Calls", starter: false, standard: false, luxury: "Weekly", estate: "Bi-Weekly" },
  { feature: "Physical Bound Dossier Delivery", starter: false, standard: false, luxury: true, estate: true }
];

export default function ServicesAlternative() {
  const [activeTab, setActiveTab] = useState<"cards" | "matrix">("cards");
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <main className="bg-slate-950 text-slate-100 min-h-screen antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* 🚀 Dark Minimalist Hero */}
      <section className="relative pt-28 pb-16 border-b border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Architectural Engineering & Spatial Masterplanning</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight text-white leading-tight">
            High-Precision Architecture. <br />
            <span className="bg-gradient-to-r from-indigo-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              Engineered Without Compromise.
            </span>
          </h1>

          <p className="text-slate-400 max-w-3xl mx-auto text-base sm:text-lg font-normal leading-relaxed">
            From essential Vastu layouts to turnkey BIM 3D luxury estate blueprints. Designed to meet National Building Code (NBC) standards.
          </p>

          {/* Toggle Control Bar */}
          <div className="flex justify-center mt-10">
            <div className="bg-slate-900 p-1.5 rounded-xl border border-slate-800 flex gap-2">
              <button
                onClick={() => setActiveTab("cards")}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === "cards" 
                    ? "bg-indigo-600 text-white shadow-md" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Layers className="w-4 h-4" /> Package Cards
              </button>
              <button
                onClick={() => setActiveTab("matrix")}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === "matrix" 
                    ? "bg-indigo-600 text-white shadow-md" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Sliders className="w-4 h-4" /> Compare Matrix
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 📦 Tab Content 1: Package Cards Grid */}
      {activeTab === "cards" && (
        <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.id}
                className={`group relative flex flex-col justify-between rounded-3xl bg-slate-900 border transition-all duration-300 overflow-hidden ${
                  service.category === "estate"
                    ? "border-amber-500/50 shadow-2xl shadow-amber-500/10"
                    : service.exclusive
                    ? "border-amber-500/30"
                    : service.popular
                    ? "border-indigo-500 shadow-xl shadow-indigo-500/10"
                    : "border-slate-800 hover:border-slate-700"
                }`}
              >
                <div>
                  {/* Card Image */}
                  <div className="relative w-full h-56 bg-slate-950 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-w-7xl) 33vw"
                      className="object-cover group-hover:scale-105 transition duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                      {service.category === "estate" && (
                        <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                          <Crown className="w-3 h-3 fill-slate-950" /> Estate Tier
                        </span>
                      )}
                      {service.popular && (
                        <span className="bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                          Most Popular
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10">
                      <span className="text-xs bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg font-medium text-slate-300 border border-slate-800 inline-flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-indigo-400" /> {service.timeline}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-1">{service.tagline}</p>
                    <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>

                    <div className="flex items-baseline gap-2 mb-4 bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-3xl font-black text-white">{service.price}</span>
                      <span className="text-xs text-slate-400">/ fixed package</span>
                    </div>

                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">{service.description}</p>

                    <div className="h-px bg-slate-800 mb-5" />

                    {/* Features List */}
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-3">Core Scope Included</h4>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start text-xs text-slate-300">
                          <Check className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-6 pt-0 mt-auto flex flex-col gap-2.5">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="w-full py-2.5 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-xs font-bold text-slate-200 transition flex items-center justify-center gap-1.5"
                  >
                    <Maximize2 className="w-3.5 h-3.5" /> View Scope Details
                  </button>
                  <a
                    href={service.paymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 rounded-xl font-bold text-xs tracking-wide text-center transition ${
                      service.category === "estate"
                        ? "bg-amber-400 hover:bg-amber-500 text-slate-950 font-black"
                        : "bg-indigo-600 hover:bg-indigo-500 text-white"
                    }`}
                  >
                    Book Package (Advance ₹{service.advance})
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 📊 Tab Content 2: Direct Comparison Matrix */}
      {activeTab === "matrix" && (
        <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950">
                    <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-400">Features / Deliverables</th>
                    <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-300">Starter (₹3,499)</th>
                    <th className="p-5 text-xs font-bold uppercase tracking-wider text-indigo-400">Complete (₹18,999)</th>
                    <th className="p-5 text-xs font-bold uppercase tracking-wider text-amber-400">Luxury BIM (₹89,999)</th>
                    <th className="p-5 text-xs font-bold uppercase tracking-wider text-amber-300">Estate Tier (₹1,49,999)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                  {comparisonMatrix.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30 transition">
                      <td className="p-5 font-semibold text-slate-200">{row.feature}</td>
                      <td className="p-5 text-slate-400">{typeof row.starter === "boolean" ? (row.starter ? <Check className="w-4 h-4 text-emerald-400" /> : <X className="w-4 h-4 text-slate-600" />) : row.starter}</td>
                      <td className="p-5 text-slate-300">{typeof row.standard === "boolean" ? (row.standard ? <Check className="w-4 h-4 text-emerald-400" /> : <X className="w-4 h-4 text-slate-600" />) : row.standard}</td>
                      <td className="p-5 text-amber-300 font-medium">{typeof row.luxury === "boolean" ? (row.luxury ? <Check className="w-4 h-4 text-amber-400" /> : <X className="w-4 h-4 text-slate-600" />) : row.luxury}</td>
                      <td className="p-5 text-amber-400 font-bold">{typeof row.estate === "boolean" ? (row.estate ? <Check className="w-4 h-4 text-amber-400" /> : <X className="w-4 h-4 text-slate-600" />) : row.estate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* 🔍 Dynamic Detail Scope Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-xs font-black uppercase tracking-widest text-indigo-400">{selectedService.tagline}</span>
              <h3 className="text-2xl font-black text-white mt-1 mb-2">{selectedService.title}</h3>
              <p className="text-slate-400 text-xs sm:text-sm mb-6">{selectedService.description}</p>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 mb-6 flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Total Package Price</p>
                  <p className="text-2xl font-black text-white">{selectedService.price}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Booking Advance</p>
                  <p className="text-lg font-bold text-indigo-400">₹{selectedService.advance}</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Scope Breakdown:</h4>
                  <ul className="space-y-2">
                    {selectedService.features.map((item, idx) => (
                      <li key={idx} className="flex items-center text-xs text-slate-300 gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Deliverables & Output Files:</h4>
                  <ul className="space-y-1 text-xs text-slate-400">
                    {selectedService.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <a
                href={selectedService.paymentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition shadow-lg shadow-indigo-600/20"
              >
                Proceed with Onboarding Booking
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}