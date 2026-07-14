"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Check, ArrowLeft, MessageCircle, Layers, ChevronDown, Star, 
  ChevronLeft, ChevronRight, Sparkles, ShieldCheck, Landmark, Scale, FileText
} from "lucide-react";

// ==========================================
// HIGH-END CUSTOM ARCHITECTURAL PHOTOGRAPHY
// ==========================================
const SAMPLE_SLIDER_IMAGES = [
  // 1. Ultra-luxury modern estate with pools and sprawling landscape
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
  // 2. High-end modern concrete-and-glass commercial / residential hub
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
  // 3. Contemporary architectural masterpiece showing warm lighting & structural lines
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
];

const PRICING_TIERS = [
  {
    name: "Architectural Concept Set",
    price: "₹34,999",
    period: "Concept Stage",
    desc: "Complete architectural schematic planning to freeze the layout, flow, structural volume, and premium exterior design language.",
    features: [
      "Custom tailored 2D floor layouts (Multiple revisions)",
      "High-end 3D front facade elevation renders (Day & Twilight)",
      "Comprehensive structural concept sizing & load guidelines",
      "Vastu Shastra directional alignment integration",
      "Dedicated senior architect assigned as project manager"
    ],
    primary: false
  },
  {
    name: "Elite Blueprint Suite (MEP + Structural)",
    price: "₹64,999",
    period: "Execution Set",
    desc: "Our gold-standard complete package detailing every structural, electrical, plumbing, and aesthetic specification for site contractors.",
    features: [
      "All conceptual floor plans and 3D elevations included",
      "Full structural execution drawings (Footings, Columns, Slabs, BBS)",
      "Integrated electrical and plumbing layout schematics (MEP)",
      "Detailed door/window schedules & structural material finishes",
      "3D internal layout walk-through planning model (.RVT / .MAX)",
      "Direct design coordination calls with your civil contractor"
    ],
    primary: true
  }
]; // <-- Fixed here (changed from ')' to ']')

const TESTIMONIALS = [
  {
    quote: "Designing our 8,000 sq ft multi-generational villa felt effortless. They coordinated the architectural layout, interior spatial volume, and structural steel reinforcement drawings smoothly under one unified team.",
    author: "Raghavendra Rao",
    role: "Estate Owner, Vizag",
    rating: 5
  },
  {
    quote: "As a premium boutique builder, we needed error-free construction sets. Their Elite Blueprint Suite saved us millions in on-site clash rectifications and architectural delays.",
    author: "Vikramaditya Group",
    role: "Boutique Developers, Delhi NCR",
    rating: 5
  }
];

const TEAM_MEMBERS = [
  {
    name: "Aravind Sharma",
    role: "Principal Architectural Designer",
    exp: "12+ Years Practice",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80"
  },
  {
    name: "Vikram Malhotra",
    role: "Senior Civil & Structural Engineer",
    exp: "14+ Years Practice",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80"
  }
];

const DETAIL_FAQS = [
  { 
    q: "How does the custom architectural project workflow function?", 
    a: "We start with an intensive design brief outlining your plot coordinates, space requirements, target budget, and design style. We then systematically transition through 2D spatial layouts, 3D facade modeling, and structural/MEP engineering sets, keeping you aligned at every structural sign-off point." 
  },
  { 
    q: "Can you design for unconventional, steep, or narrow plots?", 
    a: "Absolutely. Custom plots are our specialty. Our architectural team excels at maximizing footprint efficiency, building setbacks, and ambient light distribution on challenging topographies, irregular angles, and highly constricted urban parcels." 
  },
  { 
    q: "Are your custom architectural packages ready for municipal building approvals?", 
    a: "Yes. All our floor plans, setback plans, structural calculations, and utility layouts are engineered to strictly conform to national building codes and local municipal development guidelines, streamlining your local approval pipelines." 
  }
];

const OTHER_SERVICES = [
  { id: "floor-plans", title: "2D Floor Plans & Space Mapping", desc: "Precision structural layouts and boundary zoning." },
  { id: "elevation-renders", title: "3D Facade Elevation", desc: "Photorealistic structural facade rendering." },
  { id: "structural-drawings", title: "Structural Engineering", desc: "Foundation reinforcement load maps." },
  { id: "electrical-plumbing", title: "Electrical & Plumbing", desc: "Concealed pipeline and utility conduit layout charts." },
  { id: "vastu-plans", title: "Vastu Shastra Planning", desc: "Ancient energetic alignment mapped to modern layouts." }
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

export default function CustomProjectsDetailPage() {
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

        {/* High-End Interactive Custom Projects Showcase */}
        <div className="relative h-[320px] md:h-[520px] rounded-3xl overflow-hidden group bg-slate-900 border border-slate-200 shadow-sm">
          <img 
            src={SAMPLE_SLIDER_IMAGES[currentImgIdx]} 
            alt={`Premium Custom Project ${currentImgIdx + 1}`} 
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
            <span className="text-[10px] font-bold text-emerald-400 tracking-widest uppercase">Custom Architecture</span>
            <span className="text-xs font-semibold">End-to-End Residential & Commercial Blueprint Suites</span>
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
                <Landmark className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
                  Custom Projects & Complex Architecture
                </h1>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  Design without compromise. Our Custom Projects division caters to luxury villas, multi-family homes, commercial complexes, and bespoke residential builds requiring integrated architecture, structural engineering, MEP systems, and compliance checks.
                </p>
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Design Specifications & Deliverables */}
            <div className="space-y-4 bg-white border border-slate-200 p-6 md:p-8 rounded-3xl shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Integrated Capabilities</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Holistic Design Integration</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    A unified plan where spatial layout, aesthetic facade, Vastu compliance, and engineering systems work in flawless sync.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Scale className="w-4 h-4 text-emerald-600" />
                    <span>Cost-Optimized Engineering</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Smart material maps and structural configurations designed to reduce wastage and keep site mobilization overhead low.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span>Comprehensive Documentation</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Extensive execution blueprints with structural dimensions, steel specifications, plumbing tracks, and breaker paths.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Code & Regulatory Alignment</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    All drawings are prepared directly by our licensed designers following regional building setbacks and FAR standards.
                  </p>
                </div>
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Structured Pricing Packages */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Planning & Execution Packages</h3>
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
                      href={getWhatsAppLink(`Hi, I am interested in booking the ${tier.name} track for my custom building project.`)}
                      target="_blank" rel="noopener noreferrer"
                      className={`w-full text-center py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition mt-6 block ${tier.primary ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm" : "bg-slate-900 hover:bg-slate-800 text-white"}`}
                    >
                      Initiate Design Track
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Design Leads */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Assigned Production Team</h3>
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

            {/* Core Architectural FAQs */}
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
                <span className="text-[9px] font-black uppercase bg-emerald-500 text-slate-950 px-2.5 py-1 rounded-full tracking-wider">Bespoke Access</span>
                <h4 className="font-extrabold text-base pt-1">Consult with Design Directors</h4>
              </div>
              
              <p className="text-slate-400 text-xs leading-relaxed">
                Connect directly with our primary design team over WhatsApp to share your plot maps, architectural style boards, and layout requirements for immediate assessment.
              </p>
              
              <a 
                href={getWhatsAppLink("Hi! I have a custom plot and would like to schedule a briefing call for a custom architectural project.")}
                target="_blank" rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-center text-xs tracking-wide uppercase transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Start Custom Brief
              </a>

              <div className="pt-3 border-t border-slate-800 flex flex-col gap-2 text-[10px] text-slate-400">
                <div className="flex items-center gap-2">
                  <Landmark className="w-3.5 h-3.5 text-emerald-400" /> End-to-End Conceptual & Execution Blueprints
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" /> Source .DWG, .MAX & Layered Formats
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Direct Senior Engineering Oversight
                </div>
              </div>
            </div>

            {/* Contextual Links to Alternating Options */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3 shadow-xs">
              <h4 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">Explore Modular Components</h4>
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