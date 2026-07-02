"use client";

import { useState } from "react";
import Link from "next/link";

export default function ArchitecturalPackage() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const packagePhases = [
    {
      title: "Concept & Spatial Layout",
      subtitle: "Phase 01",
      description: "The foundational blueprint of the project. We focus on optimizing spatial flow, natural light, ventilation, and optional Vastu compliance before any structural commitments are made.",
      deliverables: ["2D Architectural Floor Plans", "Furniture Layout Matrix", "Zoning & Site Orientation Analysis", "Basic Digital Cross-Sections"],
    },
    {
      title: "3D Visualization & Exterior Design",
      subtitle: "Phase 02",
      description: "Translate flat layouts into immersive imagery. This phase removes guesswork, allowing you to finalize textures, material cladding, color palettes, and structural geometry.",
      deliverables: ["Photorealistic 3D Front Elevation", "3D Landscape & Boundary Concepts", "Daylight/Nightlight Render Simulations", "Material Selection Board"],
    },
    {
      title: "Structural Engineering blue-prints",
      subtitle: "Phase 03",
      description: "The physical safety engine of your build. Complete heavy civil blueprints calibrated specifically for site-soil specifications, ensuring long-term load bearing security.",
      deliverables: ["Foundation & Excavation Mapping", "Column & Beam Positioning Schedules", "Plinth & Slab Reinforcement Details", "Bar Bending Schedule (BBS) Guides"],
    },
    {
      title: "MEP & On-Site Execution Drawings",
      subtitle: "Phase 04",
      description: "The internal nervous system of the building. Comprehensive schematics detailing electrical distribution, water management, and climate layouts to avoid on-site clashes.",
      deliverables: ["Electrical Socket & Automation Maps", "Water Supply & Sewage Drainage Lines", "HVAC / Air Conditioning Routing", "Luxury Toilet Fixture Detailing"],
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 antialiased selection:bg-amber-100">
      
      {/* JSON-LD Product & Service Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Complete Residential Architectural Design Package",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Your Design Studio",
              "description": "Premium architectural design and engineering services."
            },
            "areaServed": "India",
            "description": "Comprehensive 4-Phase architectural package including concept layouts, 3D visualization, structural calculations, and MEP blueprints.",
            "offers": {
              "@type": "Offer",
              "priceCurrency": "INR",
              "price": "Price on Request"
            }
          })
        }}
      />

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        
        {/* Breadcrumb Navigation */}
        <nav className="text-xs font-semibold tracking-wider uppercase text-slate-400 mb-6">
          <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/projects" className="hover:text-slate-600 transition-colors">Portfolio</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800">Architectural Package</span>
        </nav>

        {/* Hero Title Section */}
        <header className="border-b border-slate-200/80 pb-10 mb-12">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-950 mb-4 max-w-3xl leading-tight">
            Comprehensive Residential Architectural Package
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
            A cohesive blueprint framework charting every square inch from master conceptualization to precise structural execution layouts.
          </p>
        </header>

        {/* Dynamic Architectural Phases Matrix */}
        <section className="grid md:grid-cols-12 gap-8 items-start mb-20">
          
          {/* Tab Selection Switches */}
          <div className="md:col-span-5 space-y-2.5">
            <span className="block text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-4">
              Execution Timeline
            </span>
            {packagePhases.map((phase, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveTab(index)}
                className={`w-full text-left p-4 rounded-2xl transition-all duration-200 border text-sm ${
                  activeTab === index
                    ? "bg-white border-slate-200 shadow-md shadow-slate-100/40 translate-x-1"
                    : "bg-transparent border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wider uppercase ${
                    activeTab === index ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-500"
                  }`}>
                    {phase.subtitle}
                  </span>
                  <span className="font-bold tracking-tight">{phase.title}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Tab Panel Content Box */}
          <div className="md:col-span-7 bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 md:p-8 min-h-[340px] flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold tracking-widest text-amber-600 uppercase">
                {packagePhases[activeTab].subtitle} Delivery Parameters
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mt-1 mb-4">
                {packagePhases[activeTab].title}
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                {packagePhases[activeTab].description}
              </p>
            </div>

            {/* Deliverables List Checklist */}
            <div className="border-t border-slate-100 pt-6">
              <span className="block text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-3">
                Tangible Blueprint Handouts
              </span>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {packagePhases[activeTab].deliverables.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Project Technical Specifications */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-10 mb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
              Operational Scope
            </span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white mt-1 mb-4">
              Ready to construct with absolute engineering confidence?
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Every blueprint delivery contains certified municipal baseline standards ready to hand straight over to structural site contractors and civil engineers. 
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/contact" 
                className="bg-white text-slate-950 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-100 transition-colors shadow-sm"
              >
                Inquire For Estimate
              </Link>
              <Link 
                href="/portfolio" 
                className="border border-slate-700 text-slate-300 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:border-slate-500 hover:text-white transition-colors"
              >
                Browse Design Portfolio
              </Link>
            </div>
          </div>
        </section>

        {/* Technical FAQ Accompanying Panel */}
        <section className="border-t border-slate-200/80 pt-12">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-6">
            Package Integration FAQs
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-xs leading-relaxed text-slate-500">
            <div>
              <h3 className="font-bold text-slate-800 mb-2">Can elements of individual phases be swapped out?</h3>
              <p>
                Our packages are sequentially bundled. Since structural and engineering drawings rely fully on the finalized structural configurations approved inside the early conceptual frameworks, phases must run downstream in order.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 mb-2">Are municipal structural approvals processed in this package?</h3>
              <p>
                This blueprint stack includes all standard compliance metrics and structural engineering calculations needed by government-licensed structural engineers for submission. Local state liaison submissions can be handled separately on request.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}