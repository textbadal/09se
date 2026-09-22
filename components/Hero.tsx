"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  PhoneCall,
  Camera,
  Calculator,
  ArrowRight,
  ChevronRight,
  Eye,
  FileSpreadsheet,
  Zap,
  BadgeCheck,
  MapPin,
  Star,
  Ruler,
  Home,
  Landmark,
  Compass,
  HardHat,
  Sparkles,
  PencilRuler,
  Building2,
  Layers,
  Sofa,
  PlugZap,
} from "lucide-react";

/* ============================================================
   DATA
   ============================================================ */

const portfolioShowcase = [
  {
    title: "Floor Plans",
    desc: "Detailed 2D layouts with dimensions, wall thickness & furniture placement.",
    gradient: "from-blue-500 to-indigo-600",
    href: "/2d-floor-plan",
    preview: "2D · DWG · PDF",
    badge: "Most Requested",
    image: "/images/floor-plans/30x40-floor-plan.webp",
    Icon: PencilRuler,
  },
  {
    title: "3D Elevations",
    desc: "Photorealistic front elevations with material palettes & modern concepts.",
    gradient: "from-purple-500 to-fuchsia-600",
    href: "/elevation",
    preview: "HD Render · Multi-Angle",
    badge: "Trending",
    image: "/3d/Front Elevation/front-elevation (4).jpeg",
    Icon: Building2,
  },
  {
    title: "Structural Drawings",
    desc: "Foundation, columns, beams & slab reinforcement with full RCC detailing.",
    gradient: "from-orange-500 to-red-600",
    href: "/services/structural",
    preview: "RCC · Steel · BBS",
    badge: "Engineering",
    image: "/3d/Front Elevation/front-elevation (7).jpeg",
    Icon: Layers,
  },
  {
    title: "Interior Design",
    desc: "Modular kitchens, wardrobes, false ceilings, lighting & 3D visualization.",
    gradient: "from-rose-500 to-pink-600",
    href: "/interior",
    preview: "3D Views · Shop Drawings",
    badge: "Popular",
    image: "/images/gallery23.jpg",
    Icon: Sofa,
  },
  {
    title: "Electrical & Plumbing",
    desc: "MEP schematics with conduit routing, switchboards & water line layouts.",
    gradient: "from-amber-500 to-yellow-600",
    href: "/services/mep",
    preview: "Electrical · Plumbing",
    badge: "Full Service",
    image: "/3d/Front Elevation/front-elevation (5).jpeg",
    Icon: PlugZap,
  },
  {
    title: "BOQ & Cost Estimate",
    desc: "Item-wise bill of quantities with material quantities & rate analysis.",
    gradient: "from-emerald-500 to-teal-600",
    href: "/boq-generator",
    preview: "Excel · PDF Report",
    badge: "Free Tool",
    image: "/3d/Front Elevation/front-elevation (6).jpeg",
    Icon: FileSpreadsheet,
  },
];

const primaryActions = [
  {
    Icon: FileText,
    title: "Get Free Quote",
    desc: "Professional quotation within 24 hours",
    gradient: "from-blue-600 to-indigo-700",
    bg: "from-blue-50 to-indigo-50",
    border: "border-blue-200",
    href: "/quotation",
    highlight: true,
  },
  {
    Icon: PhoneCall,
    title: "Book Consultation",
    desc: "Talk to our expert architects",
    gradient: "from-amber-500 to-orange-600",
    bg: "from-amber-50 to-orange-50",
    border: "border-amber-200",
    href: "/contact",
  },
  {
    Icon: Camera,
    title: "View Portfolio",
    desc: "500+ completed projects",
    gradient: "from-violet-500 to-purple-600",
    bg: "from-violet-50 to-purple-50",
    border: "border-violet-200",
    href: "/gallery",
  },
  {
    Icon: Calculator,
    title: "Estimate Cost",
    desc: "Instant project cost calculator",
    gradient: "from-emerald-500 to-teal-600",
    bg: "from-emerald-50 to-teal-50",
    border: "border-emerald-200",
    href: "/cost-estimator",
  },
];

const freeTools = [
  { Icon: Calculator, title: "BOQ Generator", desc: "Instant bill of quantities", color: "blue", href: "/boq-generator" },
  { Icon: Landmark, title: "EMI Calculator", desc: "Home loan EMI planner", color: "green", href: "/emi-calculator" },
  { Icon: Compass, title: "Vastu Analysis", desc: "AI-powered compliance", color: "purple", href: "/vastu" },
  { Icon: HardHat, title: "Cost Estimator", desc: "Construction cost calculator", color: "orange", href: "/cost-estimator" },
  { Icon: Ruler, title: "Area Calculator", desc: "Plot & built-up area", color: "emerald", href: "/area-calculator" },
  { Icon: Sparkles, title: "All Tools", desc: "12+ free calculators", color: "indigo", href: "/services", isMore: true },
];

const trustBadges = [
  { Icon: BadgeCheck, label: "Licensed Architects" },
  { Icon: Home, label: "5,000+ Projects" },
  { Icon: Zap, label: "24hr Response" },
  { Icon: MapPin, label: "All-India Delivery" },
  { Icon: Star, label: "1,200+ 5★ Reviews" },
];

/* Different from trust bar — adds NEW info */
const statStrip = [
  { k: "48h", v: "Avg. Delivery" },
  { k: "4.9★", v: "Rated" },
  { k: "12+", v: "Free Tools" },
];

/* Placeholder brand logos — replace with real grayscale SVGs */
const featuredLogos = [
  { name: "Brand 1", w: "w-20" },
  { name: "Brand 2", w: "w-16" },
  { name: "Brand 3", w: "w-24" },
  { name: "Brand 4", w: "w-14" },
];

const colorMap: Record<string, { bg: string; text: string; border: string; hover: string }> = {
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", hover: "hover:bg-emerald-100" },
  orange: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", hover: "hover:bg-orange-100" },
  blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", hover: "hover:bg-blue-100" },
  purple: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", hover: "hover:bg-purple-100" },
  green: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", hover: "hover:bg-green-100" },
  indigo: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200", hover: "hover:bg-indigo-100" },
};

/* ============================================================
   COMPONENT
   ============================================================ */

export default function HeroOptimized() {
  return (
    <section
      aria-label="Hero"
      className="relative isolate overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white"
    >
      {/* ============ BACKGROUND DECOR ============ */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(15,23,42,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.08) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
          }}
        />
        <div className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-amber-200/40 via-orange-100/30 to-transparent blur-3xl" />
        <div className="absolute -top-24 right-0 h-[32rem] w-[32rem] rounded-full bg-gradient-to-br from-blue-200/40 via-indigo-100/30 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-[24rem] w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-purple-100/30 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-14 pb-16 sm:px-6 md:pt-20 md:pb-20 lg:pt-24">
        {/* =====================================================
            HERO — SPLIT LAYOUT
            ===================================================== */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ---- LEFT ---- */}
          <div className="lg:col-span-7">
            {/* Social proof pill */}
            <div className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white/80 py-1.5 pl-1.5 pr-4 shadow-sm backdrop-blur">
              <div className="flex -space-x-2">
                {[
                  "from-amber-400 to-orange-500",
                  "from-blue-400 to-indigo-500",
                  "from-emerald-400 to-teal-500",
                  "from-rose-400 to-pink-500",
                ].map((g, i) => (
                  <div
                    key={i}
                    className={`h-6 w-6 rounded-full border-2 border-white bg-gradient-to-br ${g}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] font-semibold tracking-wide text-gray-700">
                  5,000+ homeowners trust us
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-gray-900 sm:text-5xl lg:text-[3.4rem]">
              Design Your{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Dream Home
                </span>
                <svg
                  aria-hidden
                  className="absolute -bottom-2 left-0 h-2 w-full"
                  viewBox="0 0 200 6"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M1 5C50 1 150 1 199 5"
                    stroke="url(#heroGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="heroGrad" x1="0" y1="0" x2="200" y2="0">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <br className="hidden sm:block" />
              <span className="text-gray-800">— From Blueprint to Handover.</span>
            </h1>

            {/* Subcopy */}
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Architectural drawings, 3D elevations, interior design, structural
              engineering, and BOQ estimation — all under one roof, delivered by
              licensed professionals.
            </p>

            {/* Two CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/quotation"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Get Free Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="/gallery"
                className="group inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gray-400 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
              >
                <Camera className="h-4 w-4 text-gray-500 transition-colors group-hover:text-gray-800" />
                View Portfolio
              </Link>
            </div>

            {/* Trust bar */}
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-gray-200/70 pt-6">
              {trustBadges.map(({ Icon, label }, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                  <Icon className="h-3.5 w-3.5 text-gray-400" strokeWidth={2} />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            {/* ADD #1: "As featured in" logo strip */}
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 opacity-70">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                As featured in
              </span>
              <div className="flex flex-wrap items-center gap-5">
                {featuredLogos.map((logo, i) => (
                  <div
                    key={i}
                    className={`h-5 ${logo.w} rounded bg-gray-200`}
                    aria-label={logo.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ---- RIGHT: Featured visual ---- */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Card stack */}
              <div className="absolute -top-4 -right-4 h-full w-full rounded-3xl border border-gray-200/70 bg-white/40 backdrop-blur" />
              <div className="absolute -top-2 -right-2 h-full w-full rounded-3xl border border-gray-200/70 bg-white/60 backdrop-blur" />

              <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl shadow-slate-900/10">
                <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                  {/* Fallback behind image */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                    <Building2 className="h-24 w-24 text-slate-300" strokeWidth={1} />
                  </div>

                  <Image
                    src="/3d/Front Elevation/front-elevation (2).jpeg"
                    alt="Featured architectural 3D elevation render"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="relative z-10 object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.opacity = "0";
                    }}
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-x-0 bottom-0 z-20 h-2/5 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

                  {/* REMOVE #2: only ONE badge now (dropped "New") */}
                  <div className="absolute left-4 top-4 z-20">
                    <span className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-900 shadow backdrop-blur">
                      Featured Project
                    </span>
                  </div>

                  {/* Bottom caption */}
                  <div className="absolute inset-x-4 bottom-4 z-20 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-white/80">
                        Modern Residence · 3BHK
                      </p>
                      <p className="text-sm font-bold text-white">Full Design + BOQ Package</p>
                    </div>
                  </div>
                </div>

                {/* Tweak #4: stat strip shows NEW info, not duplicates */}
                <div className="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100 bg-white">
                  {statStrip.map((s) => (
                    <div key={s.v} className="px-3 py-3 text-center">
                      <p className="text-sm font-bold text-gray-900">{s.k}</p>
                      <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
                        {s.v}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SWAP #3: floating chip replaced with review snippet */}
              <div className="absolute -bottom-4 -left-4 hidden max-w-[220px] rounded-2xl border border-gray-200 bg-white px-3.5 py-2.5 shadow-xl sm:block">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-1 text-[11px] leading-snug text-gray-700">
                  &ldquo;Got the drawings in 2 days. Excellent work.&rdquo;
                </p>
                <p className="mt-1 text-[10px] font-medium text-gray-400">
                  — Rahul, Bengaluru
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            PORTFOLIO SHOWCASE
            ===================================================== */}
        <div className="mt-20 md:mt-24">
          <div className="mx-auto mb-8 flex max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="inline-block rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-700">
                What We Create
              </span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Complete Architectural & Design Services
              </h2>
              <p className="mt-1.5 text-sm text-gray-500">
                Every drawing, every detail — prepared by licensed professionals.
              </p>
            </div>
            <Link
              href="/services"
              className="group inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
            >
              View All Services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioShowcase.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm outline-none transition-all duration-300 hover:-translate-y-1.5 hover:border-gray-300 hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <div className="relative aspect-[5/3] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                    <item.Icon className="h-16 w-16 text-slate-300" strokeWidth={1} />
                  </div>

                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="relative z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.opacity = "0";
                    }}
                  />

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

                  <div className="absolute left-3 top-3 z-20">
                    <span
                      className={`rounded-md bg-gradient-to-r ${item.gradient} px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-white shadow-lg`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/25 group-hover:opacity-100">
                    <span className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-gray-900 shadow-xl backdrop-blur">
                      <Eye className="h-4 w-4" strokeWidth={2.5} />
                      View Sample
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 rounded-md bg-white/95 px-2 py-0.5 shadow-sm backdrop-blur">
                    <FileText className="h-2.5 w-2.5 text-gray-500" strokeWidth={2} />
                    <span className="text-[9px] font-semibold text-gray-700">{item.preview}</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="mb-1.5 text-base font-bold text-gray-900">{item.title}</h3>
                  <p className="mb-3 min-h-[32px] text-xs leading-relaxed text-gray-600">{item.desc}</p>
                  <div className="flex items-center gap-1 text-xs font-semibold text-gray-500 transition-colors group-hover:text-blue-600">
                    <span>Explore Service</span>
                    <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* =====================================================
            PRIMARY CTAs
            ===================================================== */}
        <div className="mt-20">
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gray-300" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">
              Get Started Today
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gray-300" />
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {primaryActions.map(({ Icon, ...action }, index) => (
              <Link
                key={index}
                href={action.href}
                className={`group relative overflow-hidden rounded-xl border ${action.border} bg-gradient-to-br ${action.bg} p-4 outline-none transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
              >
                <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${action.gradient}`} />
                {action.highlight && (
                  <div className="absolute right-3 top-3">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                    </span>
                  </div>
                )}
                <div
                  className={`mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br ${action.gradient} shadow-md transition-transform group-hover:scale-110`}
                >
                  <Icon className="h-5 w-5 text-white" strokeWidth={2} />
                </div>
                <h3 className="mb-0.5 text-sm font-bold text-gray-900">{action.title}</h3>
                <p className="mb-2.5 text-[11px] text-gray-600">{action.desc}</p>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 transition-colors group-hover:text-gray-900">
                  <span>Go</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* =====================================================
            FREE TOOLS
            ===================================================== */}
        <div className="mt-16">
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gray-300" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">
              Free Tools & Calculators
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gray-300" />
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {freeTools.map((tool, index) => {
              const colors = colorMap[tool.color];
              const ToolIcon = tool.Icon;
              return (
                <Link href={tool.href} key={index} className="group relative outline-none">
                  <div
                    className={`relative rounded-xl border ${colors.border} ${colors.bg} p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
                  >
                    <div className="absolute right-3 top-2 opacity-[0.08] transition-opacity group-hover:opacity-[0.14]">
                      <ToolIcon className="h-12 w-12 text-gray-900" strokeWidth={1.5} />
                    </div>
                    <div className="relative flex items-start gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${colors.border} bg-white`}
                      >
                        <ToolIcon className={`h-5 w-5 ${colors.text}`} strokeWidth={2} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="mb-0.5 truncate text-sm font-semibold text-gray-800">
                          {tool.title}
                        </h3>
                        <p className="line-clamp-1 text-xs text-gray-500">{tool.desc}</p>
                        <div className="mt-1.5 flex items-center text-xs font-medium text-gray-400 transition-colors group-hover:text-gray-600">
                          <span>{tool.isMore ? "Browse all" : "Try now"}</span>
                          <ChevronRight className="ml-0.5 h-3 w-3 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}