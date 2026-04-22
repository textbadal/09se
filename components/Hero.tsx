"use client";

import Link from "next/link";

export default function HeroOptimized() {
  const services = [
    { 
      icon: "🏗️", 
      title: "Design Services", 
      desc: "From 2D plans to immersive 3D walkthroughs",
      color: "emerald",
      href: "/services"
    },
    { 
      icon: "📐", 
      title: "Floor Plans", 
      desc: "Custom layouts optimized for your lifestyle",
      color: "amber",
      href: "/services"
    },
    { 
      icon: "🧮", 
      title: "Construction Calculator", 
      desc: "Accurate BOQ and cost estimation in seconds",
      color: "cyan",
      href: "/calculator"
    },
    { 
      icon: "🧭", 
      title: "Vastu Analysis", 
      desc: "AI-powered compliance check with remedies",
      color: "purple",
      href: "/vastu"
    },
    { 
      icon: "🏦", 
      title: "EMI Calculator", 
      desc: "Plan your home loan with precision",
      color: "green",
      href: "/emi-calculator"
    },
    { 
      icon: "✨", 
      title: "Explore All Tools", 
      desc: "Interior, landscape, and 12+ more services",
      color: "pink",
      href: "/services",
      isMore: true 
    },
  ];

  const neonColors: Record<string, { glow: string; border: string; text: string }> = {
    emerald: { glow: "shadow-emerald-500/30", border: "border-emerald-500/50", text: "text-emerald-400" },
    amber: { glow: "shadow-amber-500/30", border: "border-amber-500/50", text: "text-amber-400" },
    cyan: { glow: "shadow-cyan-500/30", border: "border-cyan-500/50", text: "text-cyan-400" },
    purple: { glow: "shadow-purple-500/30", border: "border-purple-500/50", text: "text-purple-400" },
    green: { glow: "shadow-green-500/30", border: "border-green-500/50", text: "text-green-400" },
    pink: { glow: "shadow-pink-500/30", border: "border-pink-500/50", text: "text-pink-400" },
  };

  return (
    <section className="relative bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]"></div>

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 relative z-10">
        
        {/* Neon Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700 mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-mono tracking-wider text-gray-400 uppercase">
              Professional Toolkit
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Build Your{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Dream Home
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Everything you need to plan, design, and build your perfect home in one place
          </p>
        </div>

        {/* Neon Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const neon = neonColors[service.color];
            return (
              <Link
                href={service.href}
                key={index}
                className="group relative"
              >
                <div className={`relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border ${neon.border} transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 ${neon.glow} hover:shadow-2xl`}>
                  
                  {/* Neon Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-${service.color}-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  {/* Icon */}
                  <div className={`w-14 h-14 bg-gray-900 rounded-xl flex items-center justify-center mb-5 text-3xl border ${neon.border} group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className={`font-bold text-white text-lg mb-2 ${neon.text}`}>
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {service.desc}
                  </p>
                  
                  {/* Action */}
                  <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-gray-300 transition-colors">
                    <span>{service.isMore ? "View All Tools" : "Get Started"}</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  
                  {/* Corner Accent */}
                  <div className={`absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 ${neon.border} rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Stats with Neon */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8">
          {[
            { value: "5K+", label: "Happy Clients", icon: "👥" },
            { value: "12+", label: "Professional Tools", icon: "🛠️" },
            { value: "4.9", label: "Average Rating", icon: "⭐" },
            { value: "24/7", label: "Support Available", icon: "💬" },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-3 px-6 py-3 bg-gray-800/30 backdrop-blur-sm rounded-full border border-gray-700">
              <span className="text-xl">{stat.icon}</span>
              <div>
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}