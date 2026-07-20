"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Paintbrush, Check, ArrowLeft, MessageCircle, Sun, Maximize2, Sparkles, Layers, 
  ChevronDown, Star, ChevronLeft, ChevronRight, Eye, Hammer, HardHat, FileText
} from "lucide-react";

// ==========================================
// LOCAL FRONT ELEVATION IMAGERY & BLUEPRINTS
// ==========================================
const SAMPLE_SLIDER_FILES = [
  "/FRONT ELEVATION ( 2D DETAILS).pdf", 
  "/G+1 FINAL RENDERS.pdf",
  "/SOUTH SIDE ELEVATION.pdf" 
];

const PRICING_TIERS = [
  {
    name: "Standard 3D Facade",
    price: "₹3,499",
    period: "Single View",
    desc: "A single, high-definition photorealistic front angle rendering focusing on core material selection and massing.",
    features: [
      "1 Ultra-HD daytime perspective render",
      "Standard material mapping (Paint, Stone cladding, Wood)",
      "Accurate boundary wall and gate styling",
      "Basic landscape and environmental integration",
      "2 design modification loops"
    ],
    primary: false
  },
  {
    name: "Premium Multi-Angle Vista",
    price: "₹5,499",
    period: "Package",
    desc: "A complete visual package showcasing your property across multiple angles, lighting profiles, and ambient environments.",
    features: [
      "3 Ultra-HD renders (Front, Left/Right Isometric, Night View)",
      "Advanced physically-based texture rendering (PBR)",
      "Realistic interior mood lighting glow through glazing",
      "High-fidelity softscape, vehicles, and context design",
      "Layered source 3D modeling files (.3DS / .MAX)",
      "Unlimited revisions until structural aesthetic sign-off"
    ],
    primary: true
  }
];

const TESTIMONIALS = [
  {
    quote: "The night render with the integrated warm architectural lighting was stunning. It gave us the exact blueprint our lighting contractor needed to run the exterior conduits.",
    author: "Devendra Singhania",
    role: "Villa Owner, Hyderabad",
    rating: 5
  },
  {
    quote: "We utilized their 3D facades to market our premium duplex project before ground-break. The realism of the textures sold the inventory in record time.",
    author: "Pranav Mehta",
    role: "MD, Vista Spaces Developers",
    rating: 5
  }
];

const TEAM_MEMBERS = [
  {
    name: "Samridhi Arya",
    role: "Dream Homes Group",
    exp: "for any query +91 99059 31544",
    avatar: "/Samridhi Arya.jpeg"
  },
  {
    name: "Rohan Das",
    role: "Lead 3D Visualization Artist",
    exp: "7+ Years Practice",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80"
  }
];

const DETAIL_FAQS = [
  { 
    q: "What files do I need to supply to begin the 3D elevation process?", 
    a: "We require your finalized 2D floor plans (in PDF or .DWG CAD format). If you have specific style references, material preferences (e.g., exposed concrete, natural timber panels, travertine marble), or color palettes in mind, you can share those as well." 
  },
  { 
    q: "Can the 3D elevation renders be modified if I don't like the material selection?", 
    a: "Absolutely. Depending on the tier you choose, we offer targeted revision rounds where we swap out materials, adjust color schemes, change structural cladding configurations, or tweak the outdoor landscaping components." 
  },
  { 
    q: "Are the elevation designs physically constructible?", 
    a: "Yes. Unlike generic designs, our team coordinates the 3D elevation models strictly against real-world structural guidelines. We ensure cantilevers, beam projections, column grids, and glass spans align with standard civil engineering capabilities." 
  }
];

const OTHER_SERVICES = [
  { id: "floor-plans", title: "2D Floor Plans & Space Mapping", desc: "Precision structural layouts and boundary zoning." },
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

export default function ElevationRendersDetailPage() {
  const WHATSAPP_NUMBER = "919905931544"; // Updated to match team member contact dynamically
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  // Set the specific layout PDF you want to display at the bottom here
  const BOTTOM_PDF_FILE = "/FRONT ELEVATION ( 2D DETAILS).pdf"; 

  const getWhatsAppLink = (msg: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  const nextImage = () => setCurrentImgIdx((prev) => (prev + 1) % SAMPLE_SLIDER_FILES.length);
  const prevImage = () => setCurrentImgIdx((prev) => (prev - 1 + SAMPLE_SLIDER_FILES.length) % SAMPLE_SLIDER_FILES.length);

  const currentFile = SAMPLE_SLIDER_FILES[currentImgIdx];
  const isPDF = currentFile.toLowerCase().endsWith(".pdf");

  return (
    <main className="bg-slate-50/40 text-slate-900 min-h-screen py-16 px-4 md:px-8 font-sans selection:bg-emerald-100 antialiased">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Navigation Head */}
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition">
          <ArrowLeft className="w-4 h-4" /> Back to Capabilities
        </Link>

        {/* High-End Interactive Showcase */}
        <div className="relative h-[320px] md:h-[520px] rounded-3xl overflow-hidden group bg-slate-900 border border-slate-200 shadow-sm">
          {isPDF ? (
            <iframe 
              src={`${currentFile}#toolbar=0&navpanes=0`} 
              className="w-full h-full border-none bg-white"
              title="Blueprint Elevation Plan"
            />
          ) : (
            <img 
              src={currentFile} 
              alt={`Front Elevation Content ${currentImgIdx + 1}`} 
              className="w-full h-full object-cover transition-all duration-700"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none" />
          
          {/* Slider Controls */}
          <button 
            onClick={prevImage} 
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/95 shadow-md hover:bg-slate-50 hover:scale-105 text-slate-800 transition backdrop-blur-sm z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={nextImage} 
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/95 shadow-md hover:bg-slate-50 hover:scale-105 text-slate-800 transition backdrop-blur-sm z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
          <div className="absolute bottom-6 left-6 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white flex flex-col gap-0.5 pointer-events-none z-10">
            <span className="text-[10px] font-bold text-emerald-400 tracking-widest uppercase">
              {isPDF ? "Technical Blueprint" : "Visual Fidelity"}
            </span>
            <span className="text-xs font-semibold">
              {isPDF ? "2D Structural Plan Blueprint" : "Photorealistic Modern Facade Modeling"}
            </span>
          </div>

          <div className="absolute bottom-6 right-6 flex gap-1.5 z-10">
            {SAMPLE_SLIDER_FILES.map((_, i) => (
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
                <Paintbrush className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
                  3D Facade Elevation & Rendering
                </h1>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  Experience your property before construction begins. Our architectural visualization studio crafts bespoke, hyper-realistic 3D front elevations, mapping accurate materiality, light reflections, and modern massing tailored to your floor plans.
                </p>
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Design Specifications & Deliverables */}
            <div className="space-y-4 bg-white border border-slate-200 p-6 md:p-8 rounded-3xl shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Rendering Metrics & Standards</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Physically Based Materials</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Accurate light interactions on glass, brickwork, metal composites, concrete finishes, and wood grain textures.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Sun className="w-4 h-4 text-emerald-600" />
                    <span>Atmospheric Lighting</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Custom noon sunlight paths, crisp overcast diffusions, or high-end evening twilight illumination models.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Maximize2 className="w-4 h-4 text-emerald-600" />
                    <span>Scale Accuracy</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Modeled block-by-block directly from your flat 2D layout files to guarantee dimensional constructibility on site.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Layers className="w-4 h-4 text-emerald-600" />
                    <span>Polished Environment Scapes</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Lush modern softscapes, customized entryways, boundary gate detailing, and street infrastructure integration.
                  </p>
                </div>
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Structured Pricing Packages */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Visualization Packages</h3>
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
                      href={getWhatsAppLink(`Hi, I am interested in booking the ${tier.name} package for my building's 3D front elevation.`)}
                      target="_blank" rel="noopener noreferrer"
                      className={`w-full text-center py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition mt-6 block ${tier.primary ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm" : "bg-slate-900 hover:bg-slate-800 text-white"}`}
                    >
                      Commission Render
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Design Leads */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Assigned Production Artists</h3>
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

            {/* Core Elevation FAQs */}
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
                <span className="text-[9px] font-black uppercase bg-emerald-500 text-slate-950 px-2.5 py-1 rounded-full tracking-wider">Direct Access</span>
                <h4 className="font-extrabold text-base pt-1">Consult with Design Desk</h4>
              </div>
              
              <p className="text-slate-400 text-xs leading-relaxed">
                Send your layout blueprints (.DWG or .PDF format) directly to our visualization desk over WhatsApp for layout evaluation and instant turnaround estimates.
              </p>
              
              <a 
                href={getWhatsAppLink("Hi! I have 2D plans ready and would like to coordinate a premium 3D facade elevation.")}
                target="_blank" rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-center text-xs tracking-wide uppercase transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Initiate Facade Brief
              </a>

              <div className="pt-3 border-t border-slate-800 flex flex-col gap-2 text-[10px] text-slate-400">
                <div className="flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-emerald-400" /> High-Fidelity Photorealism Renders
                </div>
                <div className="flex items-center gap-2">
                  <Hammer className="w-3.5 h-3.5 text-emerald-400" /> Complies with Architectural Masonry Specs
                </div>
                <div className="flex items-center gap-2">
                  <HardHat className="w-3.5 h-3.5 text-emerald-400" /> Direct Senior CAD Architect Reviews
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

        {/* ========================================== */}
        {/* NEW: DEDICATED BOTTOM BLUEPRINT PDF VIEWER */}
        {/* ========================================== */}
        <div className="w-full space-y-4 pt-4">
          <div className="flex items-center gap-2 text-slate-950">
            <div className="p-2 bg-slate-900 text-white rounded-lg">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider">Reference Structural Layout Document</h3>
              <p className="text-[11px] text-slate-500">Scroll or zoom directly inside the viewport below to inspect detailed specifications.</p>
            </div>
          </div>
          <div className="w-full h-[500px] md:h-[650px] rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm">
            <iframe 
              src="/3D Front Elevation.pdf"
              className="w-full h-full border-none"
              title="Bottom Detailed Architectural Blueprint"
            />
          </div>
        </div>

      </div>
    </main>
  );
}