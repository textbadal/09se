"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import {
  FileText,
  PhoneCall,
  Camera,
  Calculator,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
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
  X,
  Tag,
  Gift,
  Percent,
  Clock,
  Megaphone,
} from "lucide-react";

/* ============================================================
   DATA
   ============================================================ */

// Banner-style offers (top rotating bar)
const bannerOffers = [
  {
    Icon: Percent,
    badge: "Limited Time",
    title: "Flat 20% OFF on 2D Floor Plans",
    subtitle: "Get your complete architectural drawing set at an unbeatable price.",
    cta: "Claim Offer",
    href: "/quotation",
    gradient: "from-blue-700 via-indigo-700 to-purple-700",
    accent: "text-amber-300",
    badgeBg: "bg-amber-400/20 ring-amber-300/40 text-amber-200",
  },
  {
    Icon: Gift,
    badge: "Free Bonus",
    title: "Free Vastu Consultation with Every Package",
    subtitle: "Our certified Vastu experts will review your design at no extra cost.",
    cta: "Book Now",
    href: "/vastu",
    gradient: "from-emerald-700 via-teal-700 to-cyan-700",
    accent: "text-emerald-200",
    badgeBg: "bg-white/20 ring-white/30 text-white",
  },
  {
    Icon: Sparkles,
    badge: "Combo Deal",
    title: "3D Elevation + Floor Plan @ ₹4,999",
    subtitle: "Save up to 40% when you bundle your design deliverables together.",
    cta: "Get Combo",
    href: "/services",
    gradient: "from-orange-600 via-rose-600 to-pink-600",
    accent: "text-amber-200",
    badgeBg: "bg-white/20 ring-white/30 text-white",
  },
  {
    Icon: Clock,
    badge: "Ends Soon",
    title: "Free BOQ Report with Structural Drawings",
    subtitle: "Get a detailed bill of quantities absolutely free with every order.",
    cta: "Know More",
    href: "/boq-generator",
    gradient: "from-violet-700 via-purple-700 to-fuchsia-700",
    accent: "text-fuchsia-200",
    badgeBg: "bg-white/20 ring-white/30 text-white",
  },
  {
    Icon: PhoneCall,
    badge: "Zero Cost",
    title: "First Call with a Licensed Architect is Free",
    subtitle: "Talk directly to an expert about your project — no strings attached.",
    cta: "Call Now",
    href: "/contact",
    gradient: "from-slate-800 via-slate-900 to-black",
    accent: "text-amber-300",
    badgeBg: "bg-amber-400/20 ring-amber-300/40 text-amber-200",
  },
];

// Ticker offers
const tickerOffers = [
  { text: "🎉 Flat 20% OFF on 2D Floor Plans", cta: "Claim", href: "/quotation" },
  { text: "🏠 Free Vastu Consultation with Every Package", cta: "Book", href: "/vastu" },
  { text: "📐 3D Elevation + Floor Plan Combo @ ₹4,999", cta: "Get", href: "/services" },
  { text: "⚡ Free BOQ Report with Structural Drawings", cta: "Know More", href: "/boq-generator" },
  { text: "📞 First Architect Call is Free", cta: "Call", href: "/contact" },
];

// ============================================================
// FLIPKART-STYLE SLIDING POSTERS
// Replace these image paths with your actual poster images
// ============================================================
const posters = [
  {
    id: 1,
    image: "/posters/2d-floor-plan-example.webp",
    alt: "Flat 20% OFF on 2D Floor Plans",
    href: "/quotation",
    gradient: "from-blue-900 via-indigo-800 to-purple-900",
    title: "Flat 20% OFF",
    subtitle: "On All 2D Floor Plans",
    cta: "Claim Offer",
  },
  {
    id: 2,
    image: "/posters/30x40-floor-plan.webp",
    alt: "3D Elevation + Floor Plan Combo",
    href: "/services",
    gradient: "from-orange-900 via-rose-800 to-pink-900",
    title: "Design Combo",
    subtitle: "3D Elevation + Floor Plan @ ₹4,999",
    cta: "Get Combo",
  },
  {
    id: 3,
    image: "/posters/30x50-floor-plan.webp",
    alt: "Free Vastu Consultation",
    href: "/vastu",
    gradient: "from-emerald-900 via-teal-800 to-cyan-900",
    title: "Free Vastu",
    subtitle: "Consultation with Every Package",
    cta: "Book Now",
  },
  {
    id: 4,
    image: "/posters/40x60-floor-plan.webp",
    alt: "Free BOQ Report",
    href: "/boq-generator",
    gradient: "from-violet-900 via-purple-800 to-fuchsia-900",
    title: "Free BOQ Report",
    subtitle: "With Structural Drawings Package",
    cta: "Know More",
  },
  {
    id: 5,
    image: "/posters/gallery7.jpg",
    alt: "Talk to a Licensed Architect",
    href: "/contact",
    gradient: "from-slate-900 via-slate-800 to-black",
    title: "First Call Free",
    subtitle: "Talk to a Licensed Architect",
    cta: "Call Now",
  },
];

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

const statStrip = [
  { k: "48h", v: "Avg. Delivery" },
  { k: "4.9★", v: "Rated" },
  { k: "12+", v: "Free Tools" },
];

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
   1️⃣  OFFER BANNER (rotating top bar)
   ============================================================ */

function OfferBanner() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [dismissing, setDismissing] = useState(false);

  const total = bannerOffers.length;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (paused || !visible) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next, paused, visible]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("offerBannerDismissed") === "1") {
        setVisible(false);
      }
    }
  }, []);

  const handleDismiss = () => {
    setDismissing(true);
    setTimeout(() => {
      setVisible(false);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("offerBannerDismissed", "1");
      }
    }, 300);
  };

  if (!visible) return null;

  return (
    <div
      className={`relative isolate overflow-hidden transition-all duration-300 ${
        dismissing ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-label="Special offers banner"
    >
      <div className="relative h-[68px] sm:h-[76px]">
        {bannerOffers.map((o, i) => {
          const Icon = o.Icon;
          const isActive = i === current;
          return (
            <div
              key={i}
              className={`absolute inset-0 bg-gradient-to-r ${o.gradient} text-white transition-all duration-700 ease-out ${
                isActive
                  ? "translate-x-0 opacity-100"
                  : i < current
                  ? "-translate-x-full opacity-0"
                  : "translate-x-full opacity-0"
              }`}
              aria-hidden={!isActive}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.10)_50%,transparent_75%)] bg-[length:200%_100%] animate-[sheen_5s_linear_infinite]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />
              <div className="relative mx-auto flex h-full max-w-7xl items-center gap-4 px-4 pr-24 sm:px-6 sm:pr-28">
                <div className="hidden shrink-0 items-center justify-center sm:flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur">
                    <Icon className={`h-5 w-5 ${o.accent}`} strokeWidth={2.2} />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] ring-1 ${o.badgeBg} backdrop-blur`}
                  >
                    <Tag className="h-2.5 w-2.5" strokeWidth={2.5} />
                    {o.badge}
                  </span>
                  <h3 className="mt-1 truncate text-sm font-bold leading-tight sm:text-base">
                    {o.title}
                  </h3>
                  <p className="hidden truncate text-xs text-white/80 sm:block">
                    {o.subtitle}
                  </p>
                </div>
                <Link
                  href={o.href}
                  className="group hidden shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-gray-900 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl sm:inline-flex"
                >
                  {o.cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 z-30 flex items-center gap-1 pr-3 sm:pr-4">
        <button
          onClick={prev}
          aria-label="Previous offer"
          className="pointer-events-auto hidden h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur transition-all hover:bg-white/25 sm:flex"
        >
          <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2.5} />
        </button>
        <button
          onClick={next}
          aria-label="Next offer"
          className="pointer-events-auto hidden h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur transition-all hover:bg-white/25 sm:flex"
        >
          <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.5} />
        </button>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss offers"
          className="pointer-events-auto ml-1 flex h-7 w-7 items-center justify-center rounded-full bg-black/20 text-white/80 ring-1 ring-white/20 backdrop-blur transition-all hover:bg-black/40 hover:text-white"
        >
          <X className="h-3.5 w-3.5" strokeWidth={2.5} />
        </button>
      </div>

      <div className="pointer-events-none absolute bottom-1.5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5">
        {bannerOffers.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to offer ${i + 1}`}
            className={`pointer-events-auto h-1.5 rounded-full transition-all ${
              i === current ? "w-5 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {!paused && (
        <div className="absolute bottom-0 left-0 z-30 h-0.5 w-full bg-white/10">
          <div
            key={current}
            className="h-full bg-white/70"
            style={{ animation: "bannerProgress 5s linear forwards" }}
          />
        </div>
      )}
    </div>
  );
}

/* ============================================================
   2️⃣  OFFER TICKER (scrolling marquee)
   ============================================================ */

function OfferTicker() {
  const [visible, setVisible] = useState(true);
  const [dismissing, setDismissing] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("offerTickerDismissed") === "1") {
        setVisible(false);
      }
    }
  }, []);

  const handleDismiss = () => {
    setDismissing(true);
    setTimeout(() => {
      setVisible(false);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("offerTickerDismissed", "1");
      }
    }, 300);
  };

  if (!visible) return null;

  const loopedOffers = [...tickerOffers, ...tickerOffers];

  return (
    <div
      className={`relative isolate overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white transition-all duration-300 ${
        dismissing ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
      role="region"
      aria-label="Announcements"
    >
      <div className="group relative flex items-center">
        <div className="z-20 hidden shrink-0 items-center gap-1.5 border-r border-white/15 bg-black/30 px-3 py-1.5 sm:flex">
          <Megaphone className="h-3 w-3 text-amber-300" strokeWidth={2.5} />
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-amber-300">
            Updates
          </span>
        </div>

        <div className="relative flex-1 overflow-hidden">
          <div className="flex w-max animate-[ticker_38s_linear_infinite] group-hover:[animation-play-state:paused]">
            {loopedOffers.map((offer, i) => (
              <Link
                key={i}
                href={offer.href}
                className="flex shrink-0 items-center gap-2 border-r border-white/10 px-5 py-1.5 text-xs font-medium transition-colors hover:bg-white/5 sm:text-[13px]"
              >
                <span className="whitespace-nowrap">{offer.text}</span>
                <span className="whitespace-nowrap rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-200 ring-1 ring-amber-300/30">
                  {offer.cta}
                </span>
              </Link>
            ))}
          </div>
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-slate-900 to-transparent" />
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-slate-900 to-transparent" />
        </div>

        <button
          onClick={handleDismiss}
          aria-label="Dismiss updates"
          className="z-20 flex shrink-0 items-center justify-center border-l border-white/15 bg-black/30 px-3 py-1.5 text-white/70 transition-colors hover:bg-black/50 hover:text-white"
        >
          <X className="h-3.5 w-3.5" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   3️⃣  SLIDING POSTER CAROUSEL (Flipkart style)
   ============================================================ */

function PosterCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = posters.length;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

  // Auto-rotate every 4.5s
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [next, paused]);

  // Swipe support (touch)
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (touchStart == null || touchEnd == null) return;
    const dist = touchStart - touchEnd;
    if (dist > 50) next();
    if (dist < -50) prev();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 sm:pt-5">
      <div
        className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm sm:rounded-3xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-label="Promotional posters"
      >
        {/* ===== Slides ===== */}
        <div className="relative h-[220px] sm:h-[300px] md:h-[380px] lg:h-[440px]">
          {posters.map((p, i) => {
            const isActive = i === current;
            return (
              <Link
                key={p.id}
                href={p.href}
                aria-hidden={!isActive}
                tabIndex={isActive ? 0 : -1}
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  isActive
                    ? "translate-x-0 opacity-100"
                    : i < current
                    ? "-translate-x-full opacity-0"
                    : "translate-x-full opacity-0"
                }`}
              >
                {/* Background gradient (fallback if image fails) */}
                <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient}`} />

                {/* Poster image */}
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1280px"
                  className="object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.opacity = "0";
                  }}
                />

                {/* Dark gradient overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

                {/* Text content */}
                <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-16">
                  <span className="mb-2 inline-flex w-fit items-center gap-1 rounded-full bg-amber-400/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-900 shadow">
                    <Sparkles className="h-2.5 w-2.5" strokeWidth={2.5} />
                    Special Offer
                  </span>
                  <h2 className="max-w-md text-xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
                    {p.title}
                  </h2>
                  <p className="mt-2 max-w-sm text-xs text-white/85 sm:text-sm md:text-base">
                    {p.subtitle}
                  </p>
                  <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-gray-900 shadow-lg transition-transform hover:-translate-y-0.5 sm:text-sm">
                    {p.cta}
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ===== Arrow controls ===== */}
        <button
          onClick={prev}
          aria-label="Previous poster"
          className="absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-lg ring-1 ring-black/5 backdrop-blur transition-all hover:bg-white hover:scale-105 sm:flex h-10 w-10 md:h-11 md:w-11"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
        </button>
        <button
          onClick={next}
          aria-label="Next poster"
          className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-lg ring-1 ring-black/5 backdrop-blur transition-all hover:bg-white hover:scale-105 sm:flex h-10 w-10 md:h-11 md:w-11"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
        </button>

        {/* ===== Dot indicators ===== */}
        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 sm:bottom-4">
          {posters.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to poster ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === current
                  ? "w-6 bg-white shadow"
                  : "w-1.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        {/* ===== Progress bar ===== */}
        {!paused && (
          <div className="absolute bottom-0 left-0 z-20 h-0.5 w-full bg-white/10">
            <div
              key={current}
              className="h-full bg-white/80"
              style={{ animation: "bannerProgress 4.5s linear forwards" }}
            />
          </div>
        )}
      </div>

      {/* ===== Thumbnail strip (like Flipkart's small posters below) ===== */}
      <div className="mt-3 grid grid-cols-5 gap-2 sm:gap-3">
        {posters.map((p, i) => {
          const isActive = i === current;
          return (
            <button
              key={p.id}
              onClick={() => setCurrent(i)}
              aria-label={`Go to poster ${i + 1}`}
              className={`group relative aspect-[16/10] overflow-hidden rounded-lg border-2 transition-all sm:rounded-xl ${
                isActive
                  ? "border-blue-500 ring-2 ring-blue-500/20"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient}`} />
              <Image
                src={p.image}
                alt=""
                fill
                sizes="(max-width: 640px) 20vw, 200px"
                className={`object-cover transition-transform duration-500 ${
                  isActive ? "scale-105" : "group-hover:scale-105"
                }`}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = "0";
                }}
              />
              <div
                className={`absolute inset-0 bg-black transition-opacity ${
                  isActive ? "opacity-0" : "opacity-30 group-hover:opacity-10"
                }`}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-1.5">
                <p className="truncate text-[9px] font-bold uppercase tracking-wider text-white sm:text-[10px]">
                  {p.title}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   MAIN PAGE COMPONENT (hero removed)
   ============================================================ */

export default function HeroOptimized() {
  return (
    <section
      aria-label="Home"
      className="relative isolate overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white"
    >
      {/* ============ 1️⃣ ROTATING BANNER ============ */}
      <OfferBanner />

      {/* ============ 2️⃣ SCROLLING TICKER ============ */}
      <OfferTicker />

      {/* ============ 3️⃣ SLIDING POSTER CAROUSEL ============ */}
      <PosterCarousel />

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

      <div className="mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-6 md:pt-14 md:pb-20">
        {/* ============ TRUST BADGES STRIP (replaces hero trust bar) ============ */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-2xl border border-gray-200 bg-white/70 px-5 py-4 backdrop-blur sm:gap-x-8">
          {trustBadges.map(({ Icon, label }, i) => (
            <div key={i} className="flex items-center gap-2 text-xs font-medium text-gray-600 sm:text-sm">
              <Icon className="h-4 w-4 text-blue-500" strokeWidth={2} />
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* ============ PORTFOLIO SHOWCASE ============ */}
        <div>
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

        {/* ============ PRIMARY CTAs ============ */}
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

        {/* ============ FREE TOOLS ============ */}
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