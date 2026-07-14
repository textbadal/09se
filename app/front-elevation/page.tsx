"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Check, 
  ChevronDown, 
  MessageCircle, 
  Layers, 
  Box, 
  ArrowRight, 
  Star, 
  Users, 
  Clock, 
  Paintbrush, 
  CheckCircle2, 
  HelpCircle,
  PhoneCall
} from "lucide-react";

// --- SWIPER IMPORTS ---
// Note: In Next.js client components, we import Swiper react components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// ==========================================
// 1. MOCK DATA & TYPES
// ==========================================

const ELEVATION_IMAGES = [
  { id: 1, title: "Modern Minimalist Villa", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" },
  { id: 2, title: "Contemporary 3-Storey", url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80" },
  { id: 3, title: "Classic Neoclassical", url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80" },
  { id: 4, title: "Industrial Chic Duplex", url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80" },
  { id: 5, title: "Ultra-Modern Glass House", url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80" },
];

const DESIGN_STYLES = [
  { name: "Modern", desc: "Clean lines, flat roofs, and expansive glass.", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80" },
  { name: "Traditional / Indian", desc: "Classic pillars, sloping roofs, and rich warm tones.", image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=500&q=80" },
  { name: "Minimalist", desc: "Stripped-back luxury focusing on form and function.", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=500&q=80" },
  { name: "Industrial", desc: "Exposed steel, raw concrete, and dramatic lighting.", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80" },
];

const STEPS = [
  { phase: "01", title: "Requirement Gathering", desc: "Share your plot size, facing direction, and style preferences via our easy brief form." },
  { phase: "02", title: "Drafting & Concepts", desc: "Our architects model your front elevation concept in high-detail 2D/3D outlines." },
  { phase: "03", title: "Refinements & Details", desc: "Collaborate with our design team to finalize materials, textures, paint colors, and lighting." },
  { phase: "04", title: "Final Delivery", desc: "Receive high-resolution 4K renders, working drawings, and accurate material specifications." },
];

const TESTIMONIALS = [
  { name: "Rahul Sharma", role: "Homeowner, Delhi", text: "The 3D elevation design completely transformed our vision. The material list they provided matched what our contractor bought perfectly!", rating: 5 },
  { name: "Ananya Iyer", role: "Property Developer, Bangalore", text: "Incredible attention to architectural accuracy. The turnaround time was fast, and the support team on WhatsApp was incredibly responsive.", rating: 5 },
  { name: "Vikram Goel", role: "Homeowner, Mumbai", text: "I was skeptical about online design services, but their 2D vs 3D comparison convinced me. Excellent value for money.", rating: 5 },
];

const FAQS = [
  { q: "What is the difference between 2D and 3D elevation designs?", a: "A 2D elevation is a flat architectural drawing showing measurements, heights, and linear layouts. A 3D elevation shows life-like textures, realistic lighting, shadows, and materials in a photo-realistic format." },
  { q: "How long does the design process take?", a: "Typically, the first draft is delivered within 3-5 business days. Revisions take 1-2 days depending on complexity." },
  { q: "Can I request changes after the initial design?", a: "Yes! Both packages include revision cycles to make sure the final output matches your dream home layout perfectly." },
  { q: "What files will I receive upon completion?", a: "You will receive high-resolution JPG/PDF renders for 3D views, and precise, scale-ready CAD/PDF drawings for 2D plans." },
];

const TEAM = [
  { name: "Ar. Amit Verma", role: "Principal Architect", phone: "919999999999", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=250&q=80" },
  { name: "Ar. Sneha Patel", role: "Lead 3D Visualizer", phone: "919999999999", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80" },
];

// ==========================================
// 2. HELPER COMPONENTS & ANIMATION HOOKS
// ==========================================

// Animated Counter Hook Component
const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = Math.abs(Math.floor(totalMiliseconds / end));

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span ref={countRef}>{count.toLocaleString()}</span>;
};

// Accordion Item
const AccordionItem = ({ q, a }: { q: string; a: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-800 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center text-left font-medium text-slate-100 hover:text-emerald-400 transition"
      >
        <span>{q}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? "rotate-180 text-emerald-400" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden text-slate-400 text-sm mt-2 leading-relaxed"
          >
            {a}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function LandingPage() {
  const containerRef = useRef(null);

  // WhatsApp Link Helper
  const getWhatsAppLink = (number: string, message: string) => {
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  };

  return (
    <main ref={containerRef} className="bg-slate-950 text-slate-50 min-h-screen font-sans selection:bg-emerald-500 selection:text-slate-950 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 md:px-8 py-20 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
        
        {/* Subtle background tech grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center z-10 space-y-6">
          {/* Badge */}
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
          >
            <Layers className="w-3.5 h-3.5" /> Next-Gen Architectural Elevation Designs
          </motion.span>

          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl md:text-7xl font-extrabold tracking-tight"
          >
            Transform Your Plot Into A <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
              Modern Masterpiece
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto text-slate-400 text-base md:text-lg leading-relaxed"
          >
            Get highly accurate 2D structural and stunning 3D photorealistic architectural front elevation plans. Tailored to your taste, budget, and local building guidelines.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <a 
              href="#pricing" 
              className="w-full sm:w-auto px-8 py-3.5 bg-emerald-500 text-slate-950 font-bold rounded-lg shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-all flex items-center justify-center gap-2"
            >
              Get Started Now <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="#comparison" 
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 border border-slate-800 hover:border-slate-700 font-semibold rounded-lg transition-all flex items-center justify-center gap-2 text-slate-200"
            >
              See 2D vs 3D Difference
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. AUTO-SCROLLING ELEVATION GALLERY (Framer Motion marquee) */}
      <section className="py-12 bg-slate-950/80 border-y border-slate-900/60 overflow-hidden relative">
        <div className="absolute top-0 bottom-0 left-0 w-24 md:w-48 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 md:w-48 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden group">
          {/* We repeat the array twice to make an infinite seamless slider */}
          <motion.div 
            className="flex gap-6 shrink-0"
            animate={{ x: [0, -1000] }}
            transition={{ 
              ease: "linear", 
              duration: 25, 
              repeat: Infinity 
            }}
          >
            {[...ELEVATION_IMAGES, ...ELEVATION_IMAGES].map((img, i) => (
              <div 
                key={i} 
                className="relative w-72 h-48 md:w-96 md:h-60 rounded-xl overflow-hidden border border-slate-800 shadow-xl group/card"
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover grayscale brightness-90 group-hover/card:grayscale-0 group-hover/card:scale-105 transition-all duration-500 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                  <p className="text-xs md:text-sm font-semibold tracking-wide text-white">{img.title}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. ANIMATED COUNTERS */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-slate-900/40 border border-slate-900 rounded-2xl p-8 backdrop-blur-sm text-center">
          <div>
            <h3 className="text-3xl md:text-5xl font-extrabold text-emerald-400">
              <AnimatedCounter value={750} />+
            </h3>
            <p className="text-slate-400 text-xs md:text-sm mt-2 font-medium uppercase tracking-wider">Completed Houses</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-5xl font-extrabold text-emerald-400">
              <AnimatedCounter value={12} />+
            </h3>
            <p className="text-slate-400 text-xs md:text-sm mt-2 font-medium uppercase tracking-wider">Years Experience</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-5xl font-extrabold text-emerald-400">
              <AnimatedCounter value={99} />%
            </h3>
            <p className="text-slate-400 text-xs md:text-sm mt-2 font-medium uppercase tracking-wider">Client Satisfaction</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-5xl font-extrabold text-emerald-400">
              <AnimatedCounter value={45} />
            </h3>
            <p className="text-slate-400 text-xs md:text-sm mt-2 font-medium uppercase tracking-wider">Architects & Artists</p>
          </div>
        </div>
      </section>

      {/* 4. 2D VS 3D COMPARISON */}
      <section id="comparison" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">The Blueprint vs Reality</span>
          <h2 className="text-3xl md:text-5xl font-bold">2D Drawings vs 3D Renderings</h2>
          <p className="text-slate-400">Why choosing the right package matters for your dream layout journey.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* 2D Plan Overview */}
          <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:border-slate-800 transition">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-100">2D Structural Layout</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                A highly precise technical blueprint focusing on real-world dimensions, architectural scales, and spatial orientation rules. Critical for contractors and site layout approvals.
              </p>
              <ul className="space-y-2 pt-2">
                {["Accurate Plot Measurements", "Door & Window Coordinates", "Structural Load Markers", "Standard Front Elevation Blueprint"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-900">
              <span className="text-xs text-slate-500 block">Best for:</span>
              <p className="text-slate-300 text-sm font-semibold mt-1">Masons, Contractors, and Council Approvals.</p>
            </div>
          </div>

          {/* 3D Render Overview */}
          <div className="bg-gradient-to-b from-slate-900/50 to-slate-950 border border-emerald-500/20 rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500/40 transition">
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-bl-xl">
              Most Recommended
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-500 text-slate-950 rounded-lg flex items-center justify-center">
                <Box className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-100">3D Photorealistic Render</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                A modern, high-definition digital representation of your facade showing actual lighting models, natural environment shading, and exact color palettes before building commences.
              </p>
              <ul className="space-y-2 pt-2">
                {["Accurate Material Mapping", "Realistic Daylight & Ambient Shadowing", "Premium Texture Visualization", "Multiple Angle Previews"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-900">
              <span className="text-xs text-emerald-500/80 block">Best for:</span>
              <p className="text-emerald-300 text-sm font-semibold mt-1">Homeowners seeking to visualize actual aesthetics, paints, and structures.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 2D & 3D PRICING CARDS */}
      <section id="pricing" className="py-20 px-4 md:px-8 bg-slate-900/20 border-y border-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Affordable Architecture</span>
            <h2 className="text-3xl md:text-5xl font-bold">Pick Your Design Package</h2>
            <p className="text-slate-400">High-fidelity drawings paired with incredible pricing. Select the plan that matches your current construction phase.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            {/* 2D Plan Card */}
            <div className="bg-slate-950 border border-slate-900 rounded-3xl p-8 flex flex-col justify-between hover:border-slate-800 transition relative">
              <div>
                <h3 className="text-xl font-bold text-slate-100">Starter 2D Elevation</h3>
                <p className="text-slate-400 text-xs mt-1">Accurate, scale-based architectural schematics.</p>
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-slate-100">₹2,000</span>
                  <span className="text-slate-400 text-sm font-medium"> / Fixed Cost</span>
                </div>
                <hr className="border-slate-900 my-6" />
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> Front Facing Elevation Plan
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> Critical Dimension Markings
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> Window & Door Sizing Details
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 line-through">
                    Realistic Textures & Materials
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 line-through">
                    Color Combination Previews
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <a 
                  href={getWhatsAppLink("919999999999", "Hi, I am interested in the 2D Elevation Package (₹2,000). Please share more details.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block py-3 bg-slate-900 hover:bg-slate-800 text-slate-100 font-semibold rounded-xl text-center transition"
                >
                  Order 2D Plan
                </a>
              </div>
            </div>

            {/* 3D Plan Card */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-emerald-500/80 rounded-3xl p-8 flex flex-col justify-between relative shadow-2xl shadow-emerald-500/5">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-full">
                Best Value Plan
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100">Premium 3D elevation</h3>
                <p className="text-slate-400 text-xs mt-1">Realistic 4K renders mapping lights, glass, and walls.</p>
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-emerald-400">₹3,500</span>
                  <span className="text-slate-400 text-sm font-medium"> / Fixed Cost</span>
                </div>
                <hr className="border-emerald-500/20 my-6" />
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-sm text-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> Complete 2D Elevation Plan (Included)
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> Photo-Realistic 3D Facade Renderings
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> Material & Paint Texture Guide
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> 2 Rounds of Dedicated Modifications
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> High-Res Digital Delivery (4K)
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <a 
                  href={getWhatsAppLink("919999999999", "Hi, I am interested in the Premium 3D Elevation Package (₹3,500). Please connect me to an architect.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-center transition shadow-lg shadow-emerald-500/20"
                >
                  Order 3D Plan
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DESIGN STYLES GALLERY */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Curated Archetypes</span>
          <h2 className="text-3xl md:text-5xl font-bold">Explore Diverse Facade Styles</h2>
          <p className="text-slate-400">From minimalist glass shapes to rich, traditional curves, we shape every dream.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DESIGN_STYLES.map((style, i) => (
            <div key={i} className="group/style bg-slate-900/30 border border-slate-900 rounded-2xl overflow-hidden hover:border-slate-800 transition">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={style.image} 
                  alt={style.name} 
                  className="w-full h-full object-cover group-hover/style:scale-110 transition-transform duration-500 ease-out" 
                />
              </div>
              <div className="p-5">
                <h4 className="font-bold text-lg text-slate-100">{style.name}</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{style.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. PROCESS TIMELINE */}
      <section className="py-20 px-4 md:px-8 bg-slate-900/10 border-t border-slate-900/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Streamlined Workflow</span>
            <h2 className="text-3xl md:text-5xl font-bold">Our Step-by-Step Execution</h2>
            <p className="text-slate-400">How we deliver precise custom elevations securely and fast.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {STEPS.map((step, idx) => (
              <div key={idx} className="relative group p-6 bg-slate-900/30 border border-slate-900 rounded-2xl">
                <span className="absolute top-4 right-6 text-4xl font-extrabold text-emerald-400/10 group-hover:text-emerald-400/20 transition">
                  {step.phase}
                </span>
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center font-bold text-sm">
                    {step.phase}
                  </div>
                  <h4 className="font-bold text-lg text-slate-100">{step.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CUSTOMER TESTIMONIALS (using Swiper Slider) */}
      <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Real Reviews</span>
          <h2 className="text-3xl md:text-5xl font-bold">What Our Customers Say</h2>
        </div>

        <div className="bg-slate-900/25 border border-slate-900/80 rounded-3xl p-6 md:p-10 backdrop-blur-sm">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: ".swiper-custom-pagination" }}
            className="w-full"
          >
            {TESTIMONIALS.map((t, idx) => (
              <SwiperSlide key={idx}>
                <div className="flex flex-col items-center text-center space-y-4 pb-8">
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-emerald-400 text-emerald-400" />
                    ))}
                  </div>
                  <p className="text-lg md:text-xl text-slate-200 italic font-medium max-w-3xl leading-relaxed">
                    "{t.text}"
                  </p>
                  <div>
                    <h4 className="font-bold text-slate-100">{t.name}</h4>
                    <span className="text-xs text-slate-500">{t.role}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Custom swiper pagination element styled to match UI theme */}
          <div className="swiper-custom-pagination flex justify-center gap-1.5 pt-2" />
        </div>
      </section>

      {/* 9. THE ARCHITECTURAL TEAM WITH WHATSAPP BUTTONS */}
      <section className="py-20 px-4 md:px-8 bg-slate-900/20 border-t border-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Meet the Designers</span>
            <h2 className="text-3xl md:text-5xl font-bold">Expert Architects at Your Service</h2>
            <p className="text-slate-400">Directly connect with our visualizers on WhatsApp to get instant project feedback.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {TEAM.map((member, i) => (
              <div key={i} className="bg-slate-950 border border-slate-900 rounded-2xl p-6 flex flex-col items-center text-center group hover:border-slate-800 transition">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-emerald-500/30 mb-4">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-lg text-slate-100">{member.name}</h4>
                <p className="text-xs text-slate-500 mb-6">{member.role}</p>
                <a 
                  href={getWhatsAppLink(member.phone, `Hi ${member.name}, I would like to discuss a front elevation design structure with you.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-850 border border-emerald-500/20 text-emerald-400 font-medium text-xs rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ ACCORDION */}
      <section className="py-20 px-4 md:px-8 max-w-3xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex p-2 rounded-full bg-slate-900 text-emerald-400 mb-2">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-sm">Everything you need to know about setting up your architectural project facade.</p>
        </div>

        <div className="bg-slate-900/10 border border-slate-900 rounded-2xl p-6 backdrop-blur-sm">
          {FAQS.map((faq, idx) => (
            <AccordionItem key={idx} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

     
      {/* 12. STICKY WHATSAPP FAB */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href={getWhatsAppLink("919999999999", "Hi! I am looking for custom front elevation designs for my house. Can you help me? Thanks.")}
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-3 rounded-full shadow-2xl transition transform hover:scale-105 active:scale-95 group"
        >
          <PhoneCall className="w-5 h-5 animate-bounce" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out text-sm font-semibold whitespace-nowrap">
            Chat on WhatsApp
          </span>
        </a>
      </div>

    </main>
  );
}