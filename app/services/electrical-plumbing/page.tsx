"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Check, ArrowLeft, MessageCircle, Ruler, Move, Compass, Layers, 
  ChevronDown, Star, ChevronLeft, ChevronRight, Zap, Droplets, ShieldCheck, Flame, Cpu
} from "lucide-react";

// ==========================================
// PROFESSIONAL MEP / UTILITY SYSTEM IMAGERY
// ==========================================
const SAMPLE_SLIDER_IMAGES = [
  // 1. Neat professional electrical copper wiring conduit layout
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
  // 2. High-end modern bathroom layout with concealed plumbing framework
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
  // 3. Structured residential distribution panel and utility system under construction
  "https://images.unsplash.com/photo-1558211583-d26f610c1eb1?auto=format&fit=crop&w=1200&q=80"
];

const PRICING_TIERS = [
  {
    name: "Standard MEP Layout",
    price: "₹7,499",
    period: "Up to 3 Floors",
    desc: "Essential utility maps outlining fundamental power outlets, lighting circuits, and basic plumbing routing plans.",
    features: [
      "Standard electrical point & lighting switchboard layouts",
      "Basic sanitary, water supply, and drainage routes",
      "Power outlet mappings for standard domestic appliances",
      "High-resolution PDF utility diagrams",
      "2 complete modification and revision loops"
    ],
    primary: false
  },
  {
    name: "Premium Integrated MEP Pack",
    price: "₹12,999",
    period: "Complete Project",
    desc: "A highly coordinated, zero-clash blueprint balancing complex electrical circuits, backup power systems, and premium plumbing fixtures.",
    features: [
      "All standard MEP layouts included",
      "Balanced 3-Phase load distribution schedule & circuit charting",
      "Concealed pressure-pump water supply & loop calculations",
      "Air conditioning conduit routing and copper pipe placements",
      "Layered, edit-ready CAD source file exports (.DWG)",
      "Direct technical consultation with our Lead Systems Engineer"
    ],
    primary: true
  }
];

const TESTIMONIALS = [
  {
    quote: "Thanks to the detailed plumbing line drawings, we completed our concealed premium bathroom fittings without chipping a single load-bearing column on-site.",
    author: "Karthik Reddy",
    role: "Property Owner, Chennai",
    rating: 5
  },
  {
    quote: "Their electrical load distribution charts made it simple for our electrician to pull wires and set up our 3-phase inverter system. Zero guesswork.",
    author: "Meera Sen",
    role: "Developer, Sovereign Homes",
    rating: 5
  }
];

const TEAM_MEMBERS = [
  {
    name: "Aniket Roy",
    role: "Senior MEP Systems Designer",
    exp: "10+ Years Practice",
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
    q: "Why are electrical and plumbing drawings needed before casting concrete slabs?", 
    a: "Modern homes hide pipes and conduits inside concrete roofs and floors. Having these plans finalized beforehand ensures that sleeve inserts and PVC conduit pipes are placed precisely inside the formwork before casting, completely avoiding hazardous cutting or structural drill-outs later." 
  },
  { 
    q: "How is the home's total electrical load calculated?", 
    a: "Our engineers systematically calculate the power demand of heating elements, high-tonnage HVAC systems, pump motors, smart automation hubs, and standard appliances. We balance these loads across your electrical phases to prevent voltage fluctuations and safely scale your main MCB breakers." 
  },
  { 
    q: "Does your plumbing layout optimize water pressure and slope?", 
    a: "Absolutely. We draft exact drainage and sewer line slopes to maintain gravity flow. Water supply lines are routed to maintain uniform pressure across multi-level residential layouts, factoring in hot/cold lines and overhead storage dynamics." 
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

export default function ElectricalPlumbingDetailPage() {
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

        {/* High-End Interactive Technical Showcase */}
        <div className="relative h-[320px] md:h-[520px] rounded-3xl overflow-hidden group bg-slate-900 border border-slate-200 shadow-sm">
          <img 
            src={SAMPLE_SLIDER_IMAGES[currentImgIdx]} 
            alt={`MEP Utility Infrastructure ${currentImgIdx + 1}`} 
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
            <span className="text-[10px] font-bold text-emerald-400 tracking-widest uppercase">MEP Engineering</span>
            <span className="text-xs font-semibold">Concealed Conduit Routing & Hydraulic Utility Systems</span>
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
              <div className="inline-flex gap-2 p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
                <Zap className="w-6 h-6 shrink-0" />
                <div className="w-px h-6 bg-emerald-200" />
                <Droplets className="w-6 h-6 shrink-0" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
                  Electrical & Plumbing (MEP) Layouts
                </h1>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  Avoid costly structural rectifications on site. Our integrated Mechanical, Electrical, and Plumbing (MEP) plans coordinate power configurations, plumbing routes, water pressure lines, and safety breakers directly to support smooth construction execution.
                </p>
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Design Specifications & Deliverables */}
            <div className="space-y-4 bg-white border border-slate-200 p-6 md:p-8 rounded-3xl shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Utility Layout Deliverables</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Cpu className="w-4 h-4 text-emerald-600 animate-pulse" />
                    <span>Concealed Circuitry & Automation</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Precise switchboard placements, backup line conduits, smart lighting hubs, and specialized internet/TV connection ports.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Droplets className="w-4 h-4 text-emerald-600" />
                    <span>Clash-Free Plumbing Nodes</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Calculated routes for inlet water lines, concealed flushing lines, and gravity-fed soil/waste discharge systems.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Flame className="w-4 h-4 text-emerald-600" />
                    <span>Thermal Optimization (AC & Geysers)</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Dedicated heavy-gauge circuitry and neat condensate drain outflows for water heaters and air conditioners.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Unbalanced Load & Phase Safety</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Phase-balanced distribution board schematics to isolate short circuits and completely protect high-end appliances.
                  </p>
                </div>
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Structured Pricing Packages */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">MEP Engineering Packages</h3>
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
                      href={getWhatsAppLink(`Hi, I am interested in booking the ${tier.name} package for my site's Electrical & Plumbing layout.`)}
                      target="_blank" rel="noopener noreferrer"
                      className={`w-full text-center py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition mt-6 block ${tier.primary ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm" : "bg-slate-900 hover:bg-slate-800 text-white"}`}
                    >
                      Book Utility Plan
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Design Leads */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Assigned MEP Engineers</h3>
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

            {/* Core MEP FAQs */}
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
                <h4 className="font-extrabold text-base pt-1">Consult with Utility Desk</h4>
              </div>
              
              <p className="text-slate-400 text-xs leading-relaxed">
                Send your finalized 2D floor layouts directly to our systems engineers over WhatsApp for a complete utility infrastructure evaluation and estimation schedule.
              </p>
              
              <a 
                href={getWhatsAppLink("Hi! I have my floor plans ready and would like to review MEP drawings for power and plumbing routes.")}
                target="_blank" rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-center text-xs tracking-wide uppercase transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Start MEP Brief
              </a>

              <div className="pt-3 border-t border-slate-800 flex flex-col gap-2 text-[10px] text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> National Building Code (NBC) Compliant
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" /> Layered .DWG CAD Plumbing & Circuit Files
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" /> Coordinated directly with Site Contractors
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