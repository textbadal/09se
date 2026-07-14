"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Grid, Check, ArrowLeft, MessageCircle, Ruler, Move, Compass, Layers, 
  ChevronDown, Star, ChevronLeft, ChevronRight, HardHat, FileCheck, ShieldAlert
} from "lucide-react";

// ==========================================
// PREMIUM FRONT ELEVATION & SCHEMATIC IMAGERY
// ==========================================
const SAMPLE_SLIDER_IMAGES = [
  // 1. Ultra-modern dual-level residential front elevation with warm lighting
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
  // 2. Contemporary minimalist concrete and timber facade elevation
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  // 3. Crisp architectural rendering of a modern luxury villa facade
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
];

const PRICING_TIERS = [
  {
    name: "Standard CAD Layout",
    price: "₹4,999",
    period: "Per Floor",
    desc: "Comprehensive 2D dimensioning and space planning optimized for standard municipal approval and local contracting.",
    features: [
      "Precision 2D internal wall alignments",
      "Exact door, window, and opening schedules",
      "Ergonomic structural furniture mapping",
      "Scale-accurate high-resolution PDF blueprints",
      "2 complete architectural design revisions"
    ],
    primary: false
  },
  {
    name: "Premium Vastu Blueprint",
    price: "₹8,999",
    period: "Per Floor",
    desc: "Our flagship planning standard integrating advanced spatial psychology with strict directional mathematical zoning.",
    features: [
      "All standard CAD deliverables included",
      "Complete 16-Zone Vastu Shastra optimization",
      "Detailed column centerline & structural coordinate maps",
      "Layered, edit-ready CAD source file exports (.DWG)",
      "Direct design review calls with our Senior Engineer",
      "Unlimited revisions up to civil foundation sign-off"
    ],
    primary: true
  }
];

const TESTIMONIALS = [
  {
    quote: "The 2D layouts were highly accurate. Our site contractors executed the structural masonry directly from their layered CAD files without a single dimension collision on-site.",
    author: "Rajesh Kumar",
    role: "Property Owner, Bangalore",
    rating: 5
  },
  {
    quote: "Extremely clean column grids. The alignment between our ground floor plans and the structural front elevation was seamless, preserving the exact modern aesthetic we purchased.",
    author: "Anjali Sharma",
    role: "Real Estate Developer",
    rating: 5
  }
];

const TEAM_MEMBERS = [
  {
    name: "Aravind Sharma",
    role: "Lead Architectural Planner",
    exp: "12+ Years Practice",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80"
  },
  {
    name: "Vikram Malhotra",
    role: "Senior CAD Structural Engineer",
    exp: "8+ Years Practice",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80"
  }
];

const DETAIL_FAQS = [
  { 
    q: "How do you coordinate 2D floor plans with modern front elevations?", 
    a: "Our planning process is fully integrated. When drafting the interior layouts, we calculate structural window placements, floor-to-ceiling heights, and wall thicknesses to directly support clean, modern exterior massing and high-end front elevation profiles." 
  },
  { 
    q: "What technical parameters are verified prior to drawing delivery?", 
    a: "Every layout undergoes a rigid design review checklist, including regulatory setback verifications, natural lighting and cross-ventilation mapping, functional circulation clearances, and exact structural grid alignments." 
  },
  { 
    q: "Can my local engineering consultant edit the final file outputs?", 
    a: "Yes. Our premium package includes completely layered, clean industry-standard AutoCAD (.DWG) source files, allowing your site engineer or local project manager to easily extract coordinates or implement future modifications." 
  }
];

const OTHER_SERVICES = [
  { id: "elevation-renders", title: "3D Facade Elevation", desc: "Photorealistic structural facade rendering." },
  { id: "structural-drawings", title: "Structural Engineering", desc: "Foundation reinforcement load maps." },
  { id: "electrical-plumbing", title: "Electrical & Plumbing", desc: "Concealed pipeline and utility conduit layout charts." }
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

export default function FloorPlansDetailPage() {
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

        {/* High-End Interactive Front Elevation Showcase */}
        <div className="relative h-[320px] md:h-[520px] rounded-3xl overflow-hidden group bg-slate-900 border border-slate-200 shadow-sm">
          <img 
            src={SAMPLE_SLIDER_IMAGES[currentImgIdx]} 
            alt={`Front Elevation ${currentImgIdx + 1}`} 
            className="w-full h-full object-cover transition-all duration-700"
          />
          {/* Subtle gradient to keep controls legible */}
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
            <span className="text-[10px] font-bold text-emerald-400 tracking-widest uppercase">Project Showcase</span>
            <span className="text-xs font-semibold">Premium Architectural Front Elevation Rendering</span>
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
                <Grid className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
                  2D Floor Plans & Spatial Engineering
                </h1>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  Every project begins with absolute spatial accuracy. Our technical floor planning methodology optimizes circulation, maximizes clear carpet area, and aligns seamlessly with high-end modern front elevations and load-bearing framing.
                </p>
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Design Specifications & Deliverables */}
            <div className="space-y-4 bg-white border border-slate-200 p-6 md:p-8 rounded-3xl shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Layout Specifications</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Ruler className="w-4 h-4 text-emerald-600" />
                    <span>Dimensional Accuracy</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Precise structural layouts displaying wall dimensions, window and structural openings down to the millimeter.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Move className="w-4 h-4 text-emerald-600" />
                    <span>Circulation & Egress</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Flow charting to streamline high-traffic pathways and eliminate underutilized square footage.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Compass className="w-4 h-4 text-emerald-600" />
                    <span>Orientation Optimization</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Zoning aligned with sun-path and wind micro-climates for structural ventilation and ambient thermal control.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Layers className="w-4 h-4 text-emerald-600" />
                    <span>System Compatibility</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Clean coordinate grids directly supporting MEP drawings and architectural facade elevations.
                  </p>
                </div>
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Structured Pricing Packages */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Design Pricing Packages</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {PRICING_TIERS.map((tier, idx) => (
                  <div key={idx} className={`p-6 rounded-2xl border transition flex flex-col justify-between ${tier.primary ? "border-emerald-500 bg-emerald-50/10 shadow-sm" : "border-slate-200 bg-white"}`}>
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-extrabold text-slate-900 text-sm">{tier.name}</h4>
                        {tier.primary && <span className="text-[8px] font-black uppercase bg-emerald-600 text-white px-2 py-0.5 rounded">Primary Selection</span>}
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
                      href={getWhatsAppLink(`Hi, I want to initiate the ${tier.name} package for my site layout.`)}
                      target="_blank" rel="noopener noreferrer"
                      className={`w-full text-center py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition mt-6 block ${tier.primary ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm" : "bg-slate-900 hover:bg-slate-800 text-white"}`}
                    >
                      Book Layout
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Design Leads */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Assigned Architectural Lead Panel</h3>
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

            {/* Core Blueprint FAQs */}
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
                <span className="text-[9px] font-black uppercase bg-emerald-500 text-slate-950 px-2.5 py-1 rounded-full tracking-wider">Fast-Track Onboarding</span>
                <h4 className="font-extrabold text-base pt-1">Consult with Architecture Desk</h4>
              </div>
              
              <p className="text-slate-400 text-xs leading-relaxed">
                Skip configuration delays. Send over your raw plot dimensions and setback parameters directly to our senior desk over WhatsApp for immediate coordination.
              </p>
              
              <a 
                href={getWhatsAppLink("Hi! I have plot metrics ready and would like to review floor planning with an architectural designer.")}
                target="_blank" rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-center text-xs tracking-wide uppercase transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Start Layout Brief
              </a>

              <div className="pt-3 border-t border-slate-800 flex flex-col gap-2 text-[10px] text-slate-400">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-3.5 h-3.5 text-emerald-400" /> Standard .PDF & .DWG CAD Formats
                </div>
                <div className="flex items-center gap-2">
                  <HardHat className="w-3.5 h-3.5 text-emerald-400" /> Structural-aligned Elevation Planning
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