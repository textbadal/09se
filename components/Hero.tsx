"use client";

import Link from "next/link";

export default function HeroOptimized() {
  const services = [
{ 
      icon: "🏗️", 
      title: "Design Services", 
      desc: "2D Plans to 3D Walkthroughs",
      gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
      border: "border-emerald-200/50",
      hoverBorder: "hover:border-emerald-300",
      glow: "group-hover:shadow-emerald-500/20",
      href: "/services"
    },
    { 
      icon: "📐", 
      title: "Floor Plans", 
      desc: "Custom Layout & Space Planning",
      gradient: "from-orange-500/10 via-amber-500/5 to-transparent",
      border: "border-orange-200/50",
      hoverBorder: "hover:border-orange-300",
      glow: "group-hover:shadow-orange-500/20",
      href: "/services"
    },
    

    { 
      icon: "🧮", 
      title: "Construction Calculator", 
      desc: "Instant BOQ & Cost Estimation",
      gradient: "from-blue-500/10 via-cyan-500/5 to-transparent",
      border: "border-blue-200/50",
      hoverBorder: "hover:border-blue-300",
      glow: "group-hover:shadow-blue-500/20",
      href: "/calculator"
    },
    { 
      icon: "🧭", 
      title: "Vastu Analysis", 
      desc: "AI-Powered Compliance Check",
      gradient: "from-purple-500/10 via-pink-500/5 to-transparent",
      border: "border-purple-200/50",
      hoverBorder: "hover:border-purple-300",
      glow: "group-hover:shadow-purple-500/20",
      href: "/vastu"
    },
    
    { 
      icon: "✨", 
      title: "Explore All Tools", 
      desc: "Interior, Landscape & 12+ More",
      gradient: "from-indigo-500/10 via-violet-500/5 to-transparent",
      border: "border-indigo-200/50",
      hoverBorder: "hover:border-indigo-300",
      glow: "group-hover:shadow-indigo-500/20",
      href: "/services",
      isMore: true 
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-100/10 rounded-full blur-3xl"></div>
      </div>

      <div className="text-center relative">
        {/* Animated Premium Badge */}
        <div className="inline-flex items-center gap-3 mb-14 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full blur-md opacity-50"></div>
          <div className="relative inline-flex items-center gap-3 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 px-7 py-2.5 rounded-full border border-amber-300/60 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-r from-amber-500 to-orange-500"></span>
            </span>
            <span className="text-xs font-bold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-orange-700 uppercase">
              Professional Services
            </span>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-r from-amber-500 to-orange-500"></span>
            </span>
          </div>
        </div>

        {/* Glass Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Link
              href={service.href}
              key={index}
              className="group relative block"
            >
              <div
                className={`relative backdrop-blur-xl bg-gradient-to-br ${service.gradient} rounded-3xl p-7 shadow-md hover:shadow-2xl ${service.glow} transition-all duration-500 cursor-pointer border ${service.border} ${service.hoverBorder} hover:scale-[1.02] hover:-translate-y-1`}
              >
                {/* Animated corner gradient */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/50 to-transparent rounded-tr-3xl pointer-events-none"></div>
                
                {/* Subtle inner glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                {/* Icon with floating animation */}
                <div className="text-5xl mb-5 transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500 drop-shadow-sm">
                  {service.icon}
                </div>
                
                <h3 className="font-bold text-gray-800 mb-2 text-lg tracking-tight">
                  {service.title}
                </h3>
                
                <p className="text-sm text-gray-600 font-medium leading-relaxed">
                  {service.desc}
                </p>
                
                {/* Call to action text that appears on hover */}
                <div className="mt-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-xs font-semibold text-gray-700">
                    {service.isMore ? "Browse All" : "Explore Tool"}
                  </span>
                  <svg className="w-4 h-4 text-gray-700 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Decorative bottom line */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent ${service.border.replace('border', 'via')} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl`}></div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <Link 
          href="/services"
          className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-all duration-300 group"
        >
          <span>View All 12+ Professional Services</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>

        {/* Enhanced Stats Bar with Links */}
        <div className="mt-14 inline-flex items-stretch bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/60 overflow-hidden">
          {/* Happy Homeowners Section - Clickable */}
          <Link href="/testimonials" className="group flex items-center gap-4 px-8 py-5 hover:bg-gray-50/80 transition-all duration-300">
            <div className="flex -space-x-3">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-11 h-11 rounded-full bg-gradient-to-br ${
                    i === 0 ? 'from-amber-400 to-orange-400' :
                    i === 1 ? 'from-blue-400 to-cyan-400' :
                    i === 2 ? 'from-purple-400 to-pink-400' :
                    'from-emerald-400 to-teal-400'
                  } border-3 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold`}
                >
                  {["JD", "PS", "AR", "MK"][i]}
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">5,000+</p>
              <p className="text-xs text-gray-500 font-medium">Happy Homeowners</p>
            </div>
          </Link>
          
          {/* Divider */}
          <div className="w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
          
          {/* Professional Tools Section - Clickable */}
          <Link href="/services" className="group flex items-center gap-4 px-8 py-5 hover:bg-gray-50/80 transition-all duration-300">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-inner">
              <span className="text-2xl">🛠️</span>
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">12+</p>
              <p className="text-xs text-gray-500 font-medium">Professional Tools</p>
            </div>
          </Link>
          
          {/* Divider */}
          <div className="w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
          
          {/* Rating Section - Clickable */}
          <Link href="/reviews" className="group flex items-center gap-4 px-8 py-5 hover:bg-gray-50/80 transition-all duration-300">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-yellow-100 to-amber-100 flex items-center justify-center">
              <span className="text-2xl">⭐</span>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">4.9</span>
                <span className="text-xs text-gray-500">/5.0</span>
              </div>
              <p className="text-xs text-gray-500 font-medium">1,200+ Reviews</p>
            </div>
          </Link>
        </div>
        
      
          
   
      </div>
    </section>
  );
}