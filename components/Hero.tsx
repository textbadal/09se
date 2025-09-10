import Image from "next/image";

export default function HeroAlternateNoFramer() {
  return (
    <section className="relative flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-16 md:py-24 gap-10 md:gap-16 overflow-hidden">
      
      {/* Left Image with Enhanced Container */}
      <div className="flex-1 relative">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white transform transition-transform duration-700 hover:scale-[1.02]">
          <Image 
            src="/images/flex1.png" 
            alt="Dream Home" 
            width={600} 
            height={400} 
            className="w-full h-auto"
          />
          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-tr from-blue-400 to-purple-400 rounded-full opacity-60 filter blur-3xl animate-float-slow z-0"></div>
        <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-50 filter blur-2xl animate-float-slower z-0"></div>
        
        {/* Badge on image */}
        <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg px-4 py-2 transform rotate-3 z-10">
          <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🏆 500+ Happy Clients
          </span>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 text-center md:text-left relative z-10">
        <div className="mb-4">
          <span className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-semibold mb-3 shadow-sm">
            🏡 Transforming Dreams Into Reality
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
          Design Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">Dream Home</span> Effortlessly
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-md mx-auto md:mx-0 leading-relaxed">
          Get expert Vastu-compliant house plans, modern elevations, and personalized designs — tailored to your budget and lifestyle.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <a
            href="#contact"
            className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg group"
          >
            <span>Free Consultation</span>
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </a>
          <a
            href="#services"
            className="inline-flex items-center justify-center border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm"
          >
            <span>Explore Services</span>
          </a>
        </div>

        {/* Feature badges */}
        <div className="mt-12 grid grid-cols-2 sm:flex gap-3 justify-center md:justify-start">
          {[
            { text: "Vastu-Compliant", icon: "⚖️" },
            { text: "Modern Design", icon: "✨" },
            { text: "Fast Delivery", icon: "🚀" },
            { text: "Affordable", icon: "💰" }
          ].map((feature, idx) => (
            <div 
              key={idx} 
              className="flex items-center bg-white text-gray-800 px-4 py-2 rounded-xl font-medium text-sm shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <span className="mr-2">{feature.icon}</span>
              {feature.text}
            </div>
          ))}
        </div>
        
        {/* Trust indicator */}
        <div className="mt-10 flex items-center justify-center md:justify-start">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white"></div>
            ))}
          </div>
          <div className="ml-4 text-sm text-gray-600">
            <p className="font-semibold">Trusted by 500+ clients</p>
            <p className="text-xs">Across Bihar and Jharkhand</p>
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-10 filter blur-3xl animate-pulse-slow z-0"></div>
      <div className="absolute bottom-10 right-20 w-64 h-64 bg-gradient-to-l from-blue-200 to-cyan-200 rounded-full opacity-10 filter blur-2xl animate-pulse-slower z-0"></div>
      
      {/* Floating elements */}
      <div className="absolute top-1/4 left-5 animate-bounce-slow hidden md:block">
        <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
      </div>
      <div className="absolute bottom-1/3 right-10 animate-bounce-slower hidden md:block">
        <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
      </div>
    </section>
  );
}
