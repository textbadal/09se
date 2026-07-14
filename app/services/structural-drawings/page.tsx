"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Check, ArrowLeft, MessageCircle, Ruler, Move, Compass, Layers, 
  ChevronDown, Star, ChevronLeft, ChevronRight, HardHat, ShieldCheck, Flame, Zap
} from "lucide-react";

// ==========================================
// PROFESSIONAL CIVIL & STRUCTURAL SCHEMATICS
// ==========================================
const SAMPLE_SLIDER_IMAGES = [
  // 1. Close-up of structural reinforcing rebar grids being prepared for concrete pouring
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80",
  // 2. High-end modern residential concrete framing and column structure under construction
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
  // 3. Contemporary structural engineering layout blueprint and site tools
  "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=1200&q=80"
];

const PRICING_TIERS = [
  {
    name: "Standard Foundation Map",
    price: "₹12,499",
    period: "Up to 3 Floors",
    desc: "Essential structural load-distribution drawings optimized for standard residential frames and masonry works.",
    features: [
      "Excavation and foundation layout drawings",
      "Plinth beam & column layout reinforcements",
      "Detailed column schedule & bar bending references",
      "High-res printable PDF structural drawings",
      "2 engineering consultation cycles"
    ],
    primary: false
  },
  {
    name: "Comprehensive Structural Pack",
    price: "₹22,999",
    period: "Complete Project",
    desc: "Complete civil execution package covering the entire building skeleton with advanced seismic and load factor considerations.",
    features: [
      "All standard foundation maps included",
      "Floor-by-floor slab reinforcement schedules",
      "Staircase and lintel-chajja detailing",
      "Seismic (Earthquake-resistant) reinforcement planning",
      "Layered, editable CAD source files (.DWG)",
      "Direct coordination calls with our Lead Structural Engineer"
    ],
    primary: true
  }
];

const TESTIMONIALS = [
  {
    quote: "Our site contractor was highly impressed with the precision of the bar bending schedules. It helped us reduce rebar waste on-site by almost 15%.",
    author: "Manoj Swamy",
    role: "Independent Villa Builder, Pune",
    rating: 5
  },
  {
    quote: "Meticulous structural detailing. The load calculations for our cantilevered living space perfectly supported the modern facade we wanted without requiring extra columns.",
    author: "Siddharth Sen",
    role: "Developer, Arc & Stone Projects",
    rating: 5
  }
];

const TEAM_MEMBERS = [
  {
    name: "Vikram Malhotra",
    role: "Senior Civil & Structural Engineer",
    exp: "14+ Years Practice",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80"
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
    q: "Why are structural engineering drawings required if I already have a 2D floor plan?", 
    a: "A floor plan only dictates where walls, windows, and furniture go. Structural drawings act as the 'skeleton' of your build. They outline the concrete grade, rebar diameters, foundation depths, and structural beam sizes required to safely support the building's overall dead and live loads." 
  },
  { 
    q: "How do you calculate the steel and concrete requirements?", 
    a: "Our civil engineering team utilizes advanced finite element modeling software to perform rigid stress analyses. We factor in soil bearing capacities, floor counts, dead weight of masonry, and regional seismic zone profiles to optimize safety margins without over-engineering." 
  },
  { 
    q: "Do these structural plans comply with local building regulations?", 
    a: "Yes. All structural steel framing, slab configurations, and civil calculations strictly conform to IS (Indian Standard) Codes for concrete structures, ensuring quick, hassle-free municipal corporation approvals." 
  }
];

const OTHER_SERVICES = [
  { id: "floor-plans", title: "2D Floor Plans & Space Mapping", desc: "Precision structural layouts and boundary zoning." },
  { id: "elevation-renders", title: "3D Facade Elevation", desc: "Photorealistic structural facade rendering." },
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

export default function StructuralDrawingsDetailPage() {
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

        {/* High-End Interactive Structural Showcase */}
        <div className="relative h-[320px] md:h-[520px] rounded-3xl overflow-hidden group bg-slate-900 border border-slate-200 shadow-sm">
          <img 
            src={SAMPLE_SLIDER_IMAGES[currentImgIdx]} 
            alt={`Structural Framework ${currentImgIdx + 1}`} 
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
            <span className="text-[10px] font-bold text-emerald-400 tracking-widest uppercase">Civil Engineering</span>
            <span className="text-xs font-semibold">Load Calculations & Reinforced Concrete Schedules</span>
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
                <HardHat className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
                  Structural Engineering & Steel Detailing
                </h1>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  Safeguard the integrity of your investment. Our structural engineering unit delivers ultra-detailed foundation, column, beam, and slab reinforcement drawings, balancing absolute on-site safety with structural efficiency and material cost optimization.
                </p>
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Design Specifications & Deliverables */}
            <div className="space-y-4 bg-white border border-slate-200 p-6 md:p-8 rounded-3xl shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Engineering Deliverables</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Seismic-Resistant Planning</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Steel ductility mapping tailored to localized regional earthquake and horizontal shear vectors.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Layers className="w-4 h-4 text-emerald-600" />
                    <span>Bar Bending Schedules (BBS)</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Clear, detailed instructions dictating steel cutting lengths and bend radii to minimize on-site waste.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Ruler className="w-4 h-4 text-emerald-600" />
                    <span>Slab and Lintel Schedules</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Precise structural maps for secondary elements, stairs, and roof cantilevers for cracking prevention.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Move className="w-4 h-4 text-emerald-600" />
                    <span>Footing & Excavation Maps</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Accurate digging depths and concrete thickness guidelines designed to handle your specific soil pressure.
                  </p>
                </div>
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Structured Pricing Packages */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Engineering Packages</h3>
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
                      href={getWhatsAppLink(`Hi, I am looking to secure the ${tier.name} track for my project's structural load mapping.`)}
                      target="_blank" rel="noopener noreferrer"
                      className={`w-full text-center py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition mt-6 block ${tier.primary ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm" : "bg-slate-900 hover:bg-slate-800 text-white"}`}
                    >
                      Book Structural Review
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Design Leads */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Assigned Structural Engineers</h3>
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

            {/* Core Structural FAQs */}
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
                <span className="text-[9px] font-black uppercase bg-emerald-500 text-slate-950 px-2.5 py-1 rounded-full tracking-wider">Fast-Track Engineering</span>
                <h4 className="font-extrabold text-base pt-1">Consult with Civil Desk</h4>
              </div>
              
              <p className="text-slate-400 text-xs leading-relaxed">
                Send your finalized 2D floor plans directly to our civil desk over WhatsApp for structural evaluation, load pathway check, and steel estimation parameters.
              </p>
              
              <a 
                href={getWhatsAppLink("Hi! I have floor plans ready and would like to coordinate structural engineering drawings for my build.")}
                target="_blank" rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-center text-xs tracking-wide uppercase transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Start Structural Brief
              </a>

              <div className="pt-3 border-t border-slate-800 flex flex-col gap-2 text-[10px] text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> IS Code & Municipal Compliance
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" /> Layered .DWG CAD Structural Files
                </div>
                <div className="flex items-center gap-2">
                  <HardHat className="w-3.5 h-3.5 text-emerald-400" /> Direct Coordination with Site Contractor
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