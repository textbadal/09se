"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Check, ArrowLeft, MessageCircle, Compass, Sun, Wind, Layers, 
  ChevronDown, Star, ChevronLeft, ChevronRight, Eye, Sparkles, ShieldCheck
} from "lucide-react";

// ==========================================
// VASTU ORIENTED ARCHITECTURAL IMAGERY
// ==========================================
const SAMPLE_SLIDER_IMAGES = [
  // 1. Serene modern courtyard highlighting natural light & spatial symmetry
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
  // 2. Open-plan premium living area optimized for ventilation (Prana)
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  // 3. Contemporary architectural entrance framing positive energy paths
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
];

const PRICING_TIERS = [
  {
    name: "Standard Vastu Blueprint",
    price: "₹8,999",
    period: "Floor Plan Audit",
    desc: "An exhaustive overlay analysis of your existing 2D floor plans with targeted correction maps for primary zones.",
    features: [
      "Directional mapping (Ashta Dikpalakas grid alignment)",
      "Zonal analysis for Entrance, Kitchen, and Master Suite",
      "Non-destructive corrective remedy suggestions",
      "Color and material element advice for imbalanced zones",
      "1 video consultation with our Vastu Planning expert"
    ],
    primary: false
  },
  {
    name: "Integrated Vastu & Modern Architecture",
    price: "₹16,499",
    period: "Custom Design",
    desc: "A complete custom floor plan designed from scratch, achieving a flawless balance of ancient energetic principles and ultra-modern spatial flow.",
    features: [
      "100% custom Vastu-compliant layout designed from scratch",
      "Full 16-zone detailed energetic division layout map",
      "Calculated placements for main doors, staircases, and borewells",
      "Window sizing for balanced morning light & cross-ventilation",
      "Layered, edit-ready CAD source file exports (.DWG)",
      "Unlimited revisions for structural/Vastu harmony sign-off"
    ],
    primary: true
  }
];

const TESTIMONIALS = [
  {
    quote: "We wanted a zero-compromise modern home that still respected our traditions. They designed a beautiful double-height living room exactly in the Brahma Sthan without breaking the modern clean-line aesthetic.",
    author: "Narayana Murthy",
    role: "Villa Owner, Bangalore",
    rating: 5
  },
  {
    quote: "Highly detailed guidelines. Our construction team had no issues following the precise directional markers for plumbing lines and septic tanks.",
    author: "Vasundhara Raje",
    role: "Homeowner, Jaipur",
    rating: 5
  }
];

const TEAM_MEMBERS = [
  {
    name: "Dr. H.S. Shastri",
    role: "Senior Vastu Shastra Consultant",
    exp: "18+ Years Practice",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80"
  },
  {
    name: "Aravind Sharma",
    role: "Lead Architectural Planner",
    exp: "12+ Years Practice",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80"
  }
];

const DETAIL_FAQS = [
  { 
    q: "Do I have to sacrifice modern architectural style to make a home Vastu-compliant?", 
    a: "No. Vastu Shastra is an ancient science of spatial flow, solar paths, and wind directions. We seamlessly embed these principles (like placing heavy structures in the South-West and water features in the North-East) within contemporary, minimalist, and luxury designs without cluttering your aesthetic." 
  },
  { 
    q: "Can you analyze an existing floor plan that is already drawn?", 
    a: "Yes. Our 'Standard Vastu Blueprint' tier is designed specifically for this. We overlay a precise 16-zone grid over your existing PDF or CAD layouts and offer structural or lifestyle remedies to fix directional clashes." 
  },
  { 
    q: "What are the most critical Vastu sectors you look at?", 
    a: "We prioritize the Northeast zone (Eshanya - source of morning light and water), the Southeast zone (Agneya - kitchen and fire elements), the Southwest zone (Nairutya - master bedroom and stability), and the central zone (Brahmasthan - which must remain open and free-flowing)." 
  }
];

const OTHER_SERVICES = [
  { id: "floor-plans", title: "2D Floor Plans & Space Mapping", desc: "Precision structural layouts and boundary zoning." },
  { id: "elevation-renders", title: "3D Facade Elevation", desc: "Photorealistic structural facade rendering." },
  { id: "structural-drawings", title: "Structural Engineering", desc: "Foundation reinforcement load maps." }
];

function Accordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 py-4 last:border-0">
      <button 
        onClick={() => setOpen(!open)} 
        className="w-full flex justify-between items-center text-left font-bold text-slate-900 text-sm hover:text-emerald-600 transition"
      >
        <span>{q}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? "rotate-180 text-emerald-600" : ""}`} />
      </button>
      {open && <p className="text-xs text-slate-500 mt-2 leading-relaxed">{a}</p>}
    </div>
  );
}

export default function VastuPlansDetailPage() {
  const WHATSAPP_NUMBER = "919999999999";
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  const getWhatsAppLink = (msg: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  const nextImage = () => setCurrentImgIdx((prev) => (prev + 1) % SAMPLE_SLIDER_IMAGES.length);
  const prevImage = () => setCurrentImgIdx((prev) => (prev - 1 + SAMPLE_SLIDER_IMAGES.length) % SAMPLE_SLIDER_IMAGES.length);

  return (
    <main className="bg-slate-50/40 text-slate-900 min-h-screen py-16 px-4 md:px-8 font-sans selection:bg-emerald-100 antialiased">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Navigation Head */}
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition">
          <ArrowLeft className="w-4 h-4" /> Back to Capabilities
        </Link>

        {/* High-End Interactive Vastu Showcase */}
        <div className="relative h-[320px] md:h-[520px] rounded-3xl overflow-hidden group bg-slate-900 border border-slate-200 shadow-sm">
          <img 
            src={SAMPLE_SLIDER_IMAGES[currentImgIdx]} 
            alt={`Vastu Architectural Alignment ${currentImgIdx + 1}`} 
            className="w-full h-full object-cover transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
          
          <button 
            onClick={prevImage} 
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/95 shadow-md hover:bg-slate-50 hover:scale-105 text-slate-800 transition backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={nextImage} 
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/95 shadow-md hover:bg-slate-50 hover:scale-105 text-slate-800 transition backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
          <div className="absolute bottom-6 left-6 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white flex flex-col gap-0.5">
            <span className="text-[10px] font-bold text-emerald-400 tracking-widest uppercase">Ancient Wisdom</span>
            <span className="text-xs font-semibold">16-Zone Energetic Structural Overlay</span>
          </div>

          <div className="absolute bottom-6 right-6 flex gap-1.5">
            {SAMPLE_SLIDER_IMAGES.map((_, i) => (
              <span key={i} className={`w-2 h-2 rounded-full transition-all ${currentImgIdx === i ? "bg-emerald-400 w-5" : "bg-white/40"}`} />
            ))}
          </div>
        </div>

        {/* Content Layout Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Architectural Specifications */}
          <div className="lg:col-span-2 space-y-10">
            <div className="space-y-4">
              <div className="inline-flex p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
                <Compass className="w-6 h-6 animate-spin-[spin_10s_linear_infinite]" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
                  Vastu Shastra Planning & Layouts
                </h1>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  Bridge the gap between contemporary luxury and positive spatial frequencies. Our Vastu planning blends scientific micro-climatology, optimal daylight angles, and natural air movements to secure health, prosperity, and peace of mind within your new modern layout.
                </p>
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Design Specifications & Deliverables */}
            <div className="space-y-4 bg-white border border-slate-200 p-6 md:p-8 rounded-3xl shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Vastu Pillars & Layout Design</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Sun className="w-4 h-4 text-emerald-600" />
                    <span>Solar-Path Orientation</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Strategic window and entrance placement to harvest germ-destroying infrared and healing ultraviolet morning light rays.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Wind className="w-4 h-4 text-emerald-600" />
                    <span>Magnetic Grid Convergence</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Bedhead orientations, desk placements, and partition panels mapped strictly to earth's natural geomagnetic pathways.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Layers className="w-4 h-4 text-emerald-600" />
                    <span>Elements Balances (Pancha Bhoota)</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Harmonizing Space, Air, Fire, Water, and Earth sectors to eliminate internal domestic stress vectors.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Remedy-Driven Space Planning</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Engineered design changes that resolve structural defects without requiring heavy walls or beams to be physically demolished.
                  </p>
                </div>
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Structured Pricing Packages */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Planning Packages</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {PRICING_TIERS.map((tier, idx) => (
                  <div key={idx} className={`p-6 rounded-2xl border transition flex flex-col justify-between ${tier.primary ? "border-emerald-500 bg-emerald-50/10 shadow-sm" : "border-slate-200 bg-white"}`}>
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-extrabold text-slate-900 text-sm">{tier.name}</h4>
                        {tier.primary && <span className="text-[8px] font-black uppercase bg-emerald-600 text-white px-2 py-0.5 rounded">Highly Recommended</span>}
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-slate-900">{tier.price}</span>
                        <span className="text-slate-400 text-xs">/ {tier.period}</span>
                      </div>
                      <p className="text-slate-500 text-xs leading-relaxed">{tier.desc}</p>
                      <hr className="border-slate-200/60" />
                      <ul className="space-y-2.5">
                        {tier.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <a 
                      href={getWhatsAppLink(`Hi, I'm looking to secure the ${tier.name} package to bring proper Vastu compliance into my floor plans.`)}
                      target="_blank" rel="noopener noreferrer"
                      className={`w-full text-center py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition mt-6 block ${tier.primary ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm" : "bg-slate-900 hover:bg-slate-800 text-white"}`}
                    >
                      Book Vastu Consultation
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Design Leads */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Assigned Experts</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {TEAM_MEMBERS.map((member, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 border border-slate-200 bg-white rounded-2xl shadow-xs">
                    <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{member.name}</h4>
                      <p className="text-xs text-slate-500">{member.role}</p>
                      <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded mt-1.5 inline-block">{member.exp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Testimonials */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Verified Client Reviews</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {TESTIMONIALS.map((t, idx) => (
                  <div key={idx} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3 flex flex-col justify-between">
                    <p className="text-slate-600 text-xs italic leading-relaxed">"{t.quote}"</p>
                    <div className="flex justify-between items-center pt-2">
                      <div>
                        <h5 className="font-bold text-slate-900 text-xs">{t.author}</h5>
                        <p className="text-[10px] text-slate-400">{t.role}</p>
                      </div>
                      <div className="flex gap-0.5 text-amber-500">
                        {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Core Vastu FAQs */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Frequently Asked Questions</h3>
              <div className="border border-slate-200 rounded-3xl p-6 bg-white shadow-xs">
                {DETAIL_FAQS.map((faq, idx) => (
                  <Accordion key={idx} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar Area Sticky Panel */}
          <div className="space-y-6 sticky top-6">
            <div className="bg-slate-950 text-white rounded-3xl p-6 space-y-4 shadow-sm border border-slate-800">
              <div className="space-y-1">
                <span className="text-[9px] font-black uppercase bg-emerald-500 text-slate-950 px-2.5 py-1 rounded-full tracking-wider">Direct Path Access</span>
                <h4 className="font-extrabold text-base pt-1">Consult with Vastu Desk</h4>
              </div>
              
              <p className="text-slate-400 text-xs leading-relaxed">
                Connect with our certified Vastu team on WhatsApp to evaluate potential layouts, plan boundary dimensions, and calculate dynamic solar lighting paths.
              </p>
              
              <a 
                href={getWhatsAppLink("Hi! I have floor plans ready and would like a modern architectural Vastu analysis.")}
                target="_blank" rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-center text-xs tracking-wide uppercase transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Start Vastu Audit
              </a>

              <div className="pt-3 border-t border-slate-800 flex flex-col gap-2 text-[10px] text-slate-400">
                <div className="flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-emerald-400" /> Precision 16-Zone Compass Alignments
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" /> Layered .DWG CAD Layout Charts Included
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> No-Demolition Remedial Layouts
                </div>
              </div>
            </div>

            {/* Contextual Links to Alternating Options */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3 shadow-xs">
              <h4 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">Additional Service Integration</h4>
              <div className="space-y-2">
                {OTHER_SERVICES.map((s) => (
                  <Link key={s.id} href={`/services/${s.id}`} className="block p-3 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition group">
                    <h5 className="font-bold text-slate-800 text-xs group-hover:text-emerald-600 transition">{s.title}</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5 truncate">{s.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}