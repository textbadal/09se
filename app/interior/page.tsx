"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  ChevronDown, 
  MessageCircle, 
  Layout, 
  Compass, 
  ArrowRight, 
  Star, 
  Sparkles, 
  Sliders, 
  CheckCircle2, 
  HelpCircle,
  PhoneCall,
  Home,
  Palette
} from "lucide-react";

// --- SWIPER IMPORTS ---
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// ==========================================
// 1. MOCK DATA & TYPES
// ==========================================

const GALLERY_IMAGES = [
  { id: 1, title: "Japandi Living Room", url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80" },
  { id: 2, title: "Modern Minimalist Kitchen", url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80" },
  { id: 3, title: "Biophilic Master Bedroom", url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80" },
  { id: 4, title: "Sleek Modular Wardrobe", url: "https://images.unsplash.com/photo-1558882224-cca166733360?auto=format&fit=crop&w=800&q=80" },
  { id: 5, title: "Luxury Dining Suite", url: "https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&w=800&q=80" },
];

const STYLES = [
  { name: "Japandi", desc: "The perfect fusion of Japanese simplicity and Scandinavian warmth.", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=500&q=80" },
  { name: "Modern Luxury", desc: "Rich textures, metallic accents, and bespoke lighting layouts.", image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=500&q=80" },
  { name: "Minimalist", desc: "Decluttered spaces prioritizing functional beauty and clean lines.", image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=500&q=80" },
  { name: "Bohemian Chic", desc: "Warm earthy tones, natural fibers, and vibrant plants.", image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=500&q=80" },
];

const STEPS = [
  { phase: "01", title: "Virtual Consultation", desc: "Discuss your lifestyle, floor plan, and design aspirations with our interior stylists." },
  { phase: "02", title: "Space Planning (2D)", desc: "We map out high-efficiency furniture layouts and circulation paths for your spaces." },
  { phase: "03", title: "3D Photorealistic Visuals", desc: "See your actual materials, custom cabinetry, paints, and ambient lights in 4K renders." },
  { phase: "04", title: "BOQ & Styling Guide", desc: "Receive a comprehensive shopping list of furniture, fixtures, paint codes, and modular specs." },
];

const TESTIMONIALS = [
  { name: "Meera Nair", role: "3BHK Owner, Bangalore", text: "They turned our compact apartment into a spacious Scandinavian haven. The 3D renders were so realistic that execution was completely stress-free!", rating: 5 },
  { name: "Karan Johar", role: "Penthouse Owner, Gurgaon", text: "Incredible attention to space planning and bespoke lighting. The material lists saved us at least 15% on local vendor quotes.", rating: 5 },
  { name: "Rohan & Pooja", role: "Modular Kitchen Client, Pune", text: "We opted for the 3D plan to design our kitchen. Excellent coordination over WhatsApp and very clean documentation.", rating: 5 },
];

const FAQS = [
  { q: "What is included in the 2D Space Layout package?", a: "The 2D package includes scale-accurate floor plans detailing furniture placement, custom wall partitions, clearance margins, and optimal movement pathways." },
  { q: "Can we use the 3D designs directly for modular execution?", a: "Yes! Our 3D renders map exact material scales and dimensions. We also provide the precise Bill of Quantities (BOQ) with color codes and finish details." },
  { q: "How do revisions work if I don't like the first draft?", a: "Your dedicated designer will work closely with you. The Premium 3D package includes up to 3 rounds of changes to refine colors, materials, or furniture selections." },
  { q: "Do you provide physical site execution?", a: "We provide complete virtual design blueprints, layouts, and material lists that any local contractor or modular factory can build from effortlessly, saving you massive interior designer commission fees." },
];

const TEAM = [
  { name: "Id. Tanya Sen", role: "Principal Interior Architect", phone: "919999999999", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80" },
  { name: "Id. Kabir Mehta", role: "Bespoke Furniture & Lighting Specialist", phone: "919999999999", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80" },
];

// ==========================================
// 2. HELPER COMPONENTS & ANIMATION HOOKS
// ==========================================

const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    let totalMilliseconds = duration * 1000;
    let incrementTime = Math.abs(Math.floor(totalMilliseconds / end));

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count.toLocaleString()}</span>;
};

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
// MAIN INTERIOR LANDING COMPONENT
// ==========================================
export default function InteriorLandingPage() {
  const getWhatsAppLink = (number: string, message: string) => {
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  };

  return (
    <main className="bg-slate-950 text-slate-50 min-h-screen font-sans selection:bg-emerald-500 selection:text-slate-950 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 md:px-8 py-24 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center z-10 space-y-6">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
          >
            <Sparkles className="w-3.5 h-3.5" /> High-End Virtual Interior Architecture
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl md:text-7xl font-extrabold tracking-tight"
          >
            Design Spaces That <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
              Tell Your Story
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto text-slate-400 text-base md:text-lg leading-relaxed"
          >
            Save up to 40% on designer commissions. Get bespoke 2D space planning layouts, photo-realistic 3D walkthrough renderings, and premium shopping guides online.
          </motion.p>

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
              Configure Your Space <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="#comparison" 
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 border border-slate-800 hover:border-slate-700 font-semibold rounded-lg transition-all flex items-center justify-center gap-2 text-slate-200"
            >
              Compare 2D vs 3D
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. AUTO-SCROLLING INTERIOR SHOWCASE */}
      <section className="py-12 bg-slate-950/80 border-y border-slate-900/60 overflow-hidden relative">
        <div className="absolute top-0 bottom-0 left-0 w-24 md:w-48 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 md:w-48 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden">
          <motion.div 
            className="flex gap-6 shrink-0"
            animate={{ x: [0, -1000] }}
            transition={{ 
              ease: "linear", 
              duration: 25, 
              repeat: Infinity 
            }}
          >
            {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((img, i) => (
              <div 
                key={i} 
                className="relative w-72 h-48 md:w-96 md:h-60 rounded-xl overflow-hidden border border-slate-800 shadow-xl group"
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover brightness-90 group-hover:scale-105 transition-all duration-500 ease-out" 
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
              <AnimatedCounter value={1200} />+
            </h3>
            <p className="text-slate-400 text-xs md:text-sm mt-2 font-medium uppercase tracking-wider">Rooms Designed</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-5xl font-extrabold text-emerald-400">
              <AnimatedCounter value={95} />%
            </h3>
            <p className="text-slate-400 text-xs md:text-sm mt-2 font-medium uppercase tracking-wider">Execution Accuracy</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-5xl font-extrabold text-emerald-400">
              <AnimatedCounter value={18} />
            </h3>
            <p className="text-slate-400 text-xs md:text-sm mt-2 font-medium uppercase tracking-wider">Style Specialties</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-5xl font-extrabold text-emerald-400">
              <AnimatedCounter value={4} />.9★
            </h3>
            <p className="text-slate-400 text-xs md:text-sm mt-2 font-medium uppercase tracking-wider">Google Rating</p>
          </div>
        </div>
      </section>

      {/* 4. 2D VS 3D COMPARISON */}
      <section id="comparison" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Concept to Reality</span>
          <h2 className="text-3xl md:text-5xl font-bold">2D Spatial Plans vs 3D Walkthroughs</h2>
          <p className="text-slate-400">Optimize dimensions first, then step inside your future home virtually.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* 2D Plan Overview */}
          <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:border-slate-800 transition">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center">
                <Layout className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-100">2D Space Layout</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Crucial foundational blueprints mapping functional spatial usage, optimal clearances, furniture dimensions, plumbing zones, and wiring plans.
              </p>
              <ul className="space-y-2 pt-2">
                {["Detailed Ergonomic Spacing", "Electrical & Lighting Points", "Accurate Wall Partition Alignments", "True-to-Scale Layout Drawing"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-900">
              <span className="text-xs text-slate-500 block">Ideal For:</span>
              <p className="text-slate-300 text-sm font-semibold mt-1">Plumbers, Electricians, and Carpentry Layouts.</p>
            </div>
          </div>

          {/* 3D Render Overview */}
          <div className="bg-gradient-to-b from-slate-900/50 to-slate-950 border border-emerald-500/20 rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500/40 transition">
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-bl-xl">
              Most Recommended
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-500 text-slate-950 rounded-lg flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-100">3D Immersive Design</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Your entire room modeled with accurate material rendering, custom laminate finishes, realistic fabric draping, wood textures, and ambient shadow simulations.
              </p>
              <ul className="space-y-2 pt-2">
                {["Laminate, Paint & Fabric Mapping", "Lighting Intensity Scenarios", "Custom Wardrobe & Modular Unit Finishes", "Multi-Angle High-Res Views"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-900">
              <span className="text-xs text-emerald-500/80 block">Ideal For:</span>
              <p className="text-emerald-300 text-sm font-semibold mt-1">Complete design conceptualization, color finalization, and material procurement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRICING CARDS */}
      <section id="pricing" className="py-20 px-4 md:px-8 bg-slate-900/20 border-y border-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Sensible Interior Plans</span>
            <h2 className="text-3xl md:text-5xl font-bold">Flat-Rate Interior Services</h2>
            <p className="text-slate-400">Skip percentage commissions. Pay an upfront, transparent cost based on your design needs.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            {/* 2D Design Card */}
            <div className="bg-slate-950 border border-slate-900 rounded-3xl p-8 flex flex-col justify-between hover:border-slate-800 transition">
              <div>
                <h3 className="text-xl font-bold text-slate-100">Bespoke 2D Layout Plan</h3>
                <p className="text-slate-400 text-xs mt-1">Scale drawings for perfect space utility.</p>
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-slate-100">₹3,000</span>
                  <span className="text-slate-400 text-sm font-medium"> / Per Room</span>
                </div>
                <hr className="border-slate-900 my-6" />
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> Floor & Furniture Placement Layout
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> Electrical, Light & Switch Points Mapping
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> Ceiling Outline & Height Measurements
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 line-through">
                    Realistic Color Matching
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-500 line-through">
                    Material Procurement BOQ
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <a 
                  href={getWhatsAppLink("919999999999", "Hi! I am interested in booking a 2D Layout Plan (₹3,000/Room). Please guide me on steps.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block py-3 bg-slate-900 hover:bg-slate-800 text-slate-100 font-semibold rounded-xl text-center transition"
                >
                  Order 2D Layout
                </a>
              </div>
            </div>

            {/* 3D Design Card */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-emerald-500/80 rounded-3xl p-8 flex flex-col justify-between relative shadow-2xl shadow-emerald-500/5">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-full">
                Most Popular Package
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100">Premium 3D Visualizer</h3>
                <p className="text-slate-400 text-xs mt-1">Walk through your custom interiors in full 4K.</p>
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-emerald-400">₹6,500</span>
                  <span className="text-slate-400 text-sm font-medium"> / Per Room</span>
                </div>
                <hr className="border-emerald-500/20 my-6" />
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-sm text-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> Entire 2D Layout Plan Package Included
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> Photo-Realistic 3D Interior Views (3 Angles)
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> Color, Texture, Wallpaper & Laminate Guide
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> Custom Carpentry Designs (TV Unit, Wardrobe)
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> Detailed Shopping List & BOQ Specifications
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <a 
                  href={getWhatsAppLink("919999999999", "Hi! I am looking for the Premium 3D Interior Package (₹6,500/Room). Let me share my room layout details.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-center transition shadow-lg shadow-emerald-500/20"
                >
                  Order 3D Room Design
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. STYLE GALLERY */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Curated Moodboards</span>
          <h2 className="text-3xl md:text-5xl font-bold">Aesthetics We Specialize In</h2>
          <p className="text-slate-400">Explore signature interior styles tailored to match your personal vibe.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STYLES.map((style, i) => (
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
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Smooth Execution</span>
            <h2 className="text-3xl md:text-5xl font-bold">How We Work Together</h2>
            <p className="text-slate-400">Step-by-step virtual design workflow optimized for fast and stress-free delivery.</p>
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

      {/* 8. TESTIMONIALS SLIDER */}
      <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Client Success Stories</span>
          <h2 className="text-3xl md:text-5xl font-bold">Loved By Homeowners</h2>
        </div>

        <div className="bg-slate-900/25 border border-slate-900/80 rounded-3xl p-6 md:p-10 backdrop-blur-sm">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: ".swiper-custom-pagination-interior" }}
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
          <div className="swiper-custom-pagination-interior flex justify-center gap-1.5 pt-2" />
        </div>
      </section>

      {/* 9. THE DESIGN TEAM */}
      <section className="py-20 px-4 md:px-8 bg-slate-900/20 border-t border-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Bespoke Designers</span>
            <h2 className="text-3xl md:text-5xl font-bold">Expert Interior Stylists</h2>
            <p className="text-slate-400">Consult immediately with our team over WhatsApp for advice on materials and pricing.</p>
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
                  href={getWhatsAppLink(member.phone, `Hi ${member.name}, I would like to consult with you for my home's interior design layout.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-850 border border-emerald-500/20 text-emerald-400 font-medium text-xs rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <MessageCircle className="w-4 h-4" /> Consult on WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQS */}
      <section className="py-20 px-4 md:px-8 max-w-3xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex p-2 rounded-full bg-slate-900 text-emerald-400 mb-2">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-sm">Have queries about styling, modular layouts, or execution plans? We've got answers.</p>
        </div>

        <div className="bg-slate-900/10 border border-slate-900 rounded-2xl p-6 backdrop-blur-sm">
          {FAQS.map((faq, idx) => (
            <AccordionItem key={idx} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

     

      

    </main>
  );
}