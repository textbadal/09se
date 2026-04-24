"use client";

import Link from "next/link";

export default function HeroOptimized() {
  const services = [
    { 
      icon: "🏗️", 
      title: "Design Services", 
      desc: "2D Plans to 3D Walkthroughs",
      color: "emerald",
      href: "/services"
    },
    { 
      icon: "📐", 
      title: "Floor Plans", 
      desc: "Custom Layout & Space Planning",
      color: "orange",
      href: "/services"
    },
    { 
      icon: "🧮", 
      title: "Construction Calculator", 
      desc: "Instant BOQ & Cost Estimation",
      color: "blue",
      href: "/calculator"
    },
    { 
      icon: "🧭", 
      title: "Vastu Analysis", 
      desc: "AI-Powered Compliance Check",
      color: "purple",
      href: "/vastu"
    },
    { 
      icon: "🏦", 
      title: "EMI Calculator", 
      desc: "#1 EMI Calculator India",
      color: "green",
      href: "/emi-calculator"
    },
    { 
      icon: "✨", 
      title: "Explore All Tools", 
      desc: "Interior, Landscape & 12+ More",
      color: "indigo",
      href: "/services",
      isMore: true 
    },
  ];

  const colorMap: Record<string, { bg: string; text: string; border: string; hover: string }> = {
    emerald: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", hover: "hover:bg-emerald-100" },
    orange: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", hover: "hover:bg-orange-100" },
    blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", hover: "hover:bg-blue-100" },
    purple: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", hover: "hover:bg-purple-100" },
    green: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", hover: "hover:bg-green-100" },
    indigo: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200", hover: "hover:bg-indigo-100" },
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* Floating Background Shapes - reduced opacity for less distraction */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 -left-20 w-80 h-80 bg-gradient-to-br from-amber-100/20 to-orange-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-cyan-100/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-purple-100/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-emerald-100/20 rounded-full blur-2xl animate-float-delayed"></div>
      </div>

      <div className="relative">
        {/* Compact Header */}
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold tracking-wider text-gray-600 uppercase mb-3">
            Our Services
          </span>
          <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-2">
            Everything you need to{" "}
            <span className="font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              build smarter
            </span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm">
            Professional tools and services for homeowners, architects, and builders across India
          </p>
        </div>

        {/* Compact Card Grid - smaller cards, tighter spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const colors = colorMap[service.color];
            return (
              <Link
                href={service.href}
                key={index}
                className="group relative"
              >
                <div className={`relative ${colors.bg} rounded-xl p-3.5 border ${colors.border} transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md`}>
                  {/* Smaller Background Icon */}
                  <div className="absolute top-2 right-3 text-4xl opacity-10 group-hover:opacity-20 transition-opacity">
                    {service.icon}
                  </div>
                  
                  {/* Compact Content */}
                  <div className="relative flex items-start gap-3">
                    {/* Smaller Icon Box */}
                    <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center text-xl border ${colors.border} shrink-0`}>
                      {service.icon}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 text-sm mb-0.5 truncate">
                        {service.title}
                      </h3>
                      
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {service.desc}
                      </p>
                      
                      {/* Compact Arrow Indicator */}
                      <div className="mt-1.5 flex items-center text-xs font-medium text-gray-400 group-hover:text-gray-600 transition-colors">
                        <span>{service.isMore ? "Browse all" : "Learn more"}</span>
                        <svg className="w-3 h-3 ml-0.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Compact Stats Row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 md:gap-12">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">5,000+</p>
            <p className="text-xs text-gray-500">Happy Homeowners</p>
          </div>
          <div className="w-px h-6 bg-gray-300"></div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">12+</p>
            <p className="text-xs text-gray-500">Professional Tools</p>
          </div>
          <div className="w-px h-6 bg-gray-300"></div>
          <div className="text-center">
            <div className="flex items-center gap-0.5 justify-center">
              <span className="text-2xl font-bold text-gray-800">4.9</span>
              <span className="text-yellow-400 text-base">★</span>
            </div>
            <p className="text-xs text-gray-500">1,200+ Reviews</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(15px) translateX(-10px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}