"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle, FaArrowRight, FaWhatsapp, FaPhone, FaMapMarkerAlt, FaRuler, FaHome, FaCalendar, FaRupeeSign } from "react-icons/fa";

// This would typically come from a CMS or database
const projectData = {
  title: "Modern Vastu-Compliant 3 BHK Home in Patna",
  subtitle: "30x40 Corner Plot - Complete Architectural Design & Execution Drawings",
  location: "Boring Road, Patna, Bihar",
  completionDate: "December 2024",
  plotSize: "30' x 40' (1200 sq ft)",
  builtUpArea: "2400 sq ft (G+1)",
  constructionCost: "₹48 Lakhs",
  duration: "10 months",
  
  client: {
    name: "Sharma Family",
    requirement: "Modern 3 BHK home with Vastu compliance, dedicated pooja room, and parking",
    testimonial: "Dream Homes Bihar transformed our vision into reality. The 3D visualizations helped us make decisions before construction began. Highly recommended for anyone building a home in Patna!",
  },
  
  challenge: "The corner plot had two road frontages, making Vastu compliance challenging. Client wanted modern elevation while maintaining traditional Vastu principles.",
  
  solution: "We oriented the main entrance to Northeast, placed kitchen in Southeast, and master bedroom in Southwest. The corner advantage was used for a grand elevation with balcony on first floor.",
  
  services: [
    "2D Floor Plans (G+1)",
    "3D Elevation Design",
    "Structural Drawings",
    "Electrical & Plumbing Layout",
    "Vastu Consultation",
    "Site Supervision Support",
  ],
  
  gallery: [
    { type: "image", src: "/images/gallery1.jpg", alt: "Modern house elevation Patna Bihar", caption: "Front Elevation" },
    { type: "image", src: "/images/gallery2.jpg", alt: "Ground floor plan 30x40 Patna", caption: "Ground Floor Plan" },
    { type: "image", src: "/images/gallery3.jpg", alt: "First floor plan 3 BHK Patna", caption: "First Floor Plan" },
    { type: "image", src: "/images/gallery4.jpg", alt: "3D house design Patna Bihar", caption: "3D Exterior View" },
    { type: "image", src: "/images/gallery5.jpg", alt: "Living room interior design Patna", caption: "Living Room" },
    { type: "image", src: "/images/gallery1.jpg", alt: "Modular kitchen design Bihar", caption: "Modular Kitchen" },
  ],
  
  vastuFeatures: [
    { feature: "Main Entrance", direction: "Northeast", benefit: "Brings prosperity and positive energy" },
    { feature: "Kitchen", direction: "Southeast", benefit: "Fire element in ideal position for health" },
    { feature: "Master Bedroom", direction: "Southwest", benefit: "Stability and peaceful sleep" },
    { feature: "Pooja Room", direction: "Northeast", benefit: "Sacred space in most auspicious direction" },
    { feature: "Staircase", direction: "Southwest", benefit: "Doesn't block energy flow" },
  ],
  
  keyFeatures: [
    "Double-height living room with clerestory windows",
    "Open kitchen with breakfast counter",
    "Three spacious bedrooms with attached bathrooms",
    "Dedicated pooja room with marble flooring",
    "Covered car parking for 2 vehicles",
    "Terrace garden with seating area",
    "Solar water heater ready",
    "Earthquake-resistant RCC structure",
  ],
  
  seoKeywords: [
    "house design Patna",
    "30x40 house plan Bihar",
    "3 BHK home design Patna",
    "Vastu house Bihar",
    "architect Patna",
    "modern elevation Bihar",
    "G+1 house plan",
  ],
};

// Related projects (would come from CMS)
const relatedProjects = [
  {
    id: 1,
    title: "Contemporary Duplex in Gaya",
    location: "Gaya, Bihar",
    plotSize: "40x50",
    image: "/projects/gaya-duplex/thumb.jpg",
    link: "/projects/contemporary-duplex-gaya",
  },
  {
    id: 2,
    title: "Traditional Bungalow in Muzaffarpur",
    location: "Muzaffarpur, Bihar",
    plotSize: "50x60",
    image: "/projects/muzaffarpur-bungalow/thumb.jpg",
    link: "/projects/traditional-bungalow-muzaffarpur",
  },
  {
    id: 3,
    title: "4 BHK Luxury Home in Bhagalpur",
    location: "Bhagalpur, Bihar",
    plotSize: "40x60",
    image: "/projects/bhagalpur-luxury/thumb.jpg",
    link: "/projects/luxury-home-bhagalpur",
  },
];

export default function ProjectCaseStudy() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showEnquiry, setShowEnquiry] = useState(false);

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": projectData.title,
            "description": `Architectural design and drawings for ${projectData.plotSize} Vastu-compliant home in ${projectData.location}. Complete case study with floor plans, elevation, and construction details.`,
            "image": projectData.gallery.map(img => img.src),
            "author": {
              "@type": "Organization",
              "name": "Dream Homes Bihar",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Patna",
                "addressRegion": "Bihar",
                "addressCountry": "IN"
              }
            },
            "locationCreated": {
              "@type": "Place",
              "name": projectData.location,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Patna",
                "addressRegion": "Bihar"
              }
            },
            "keywords": projectData.seoKeywords.join(", "),
            "datePublished": "2024-12-15",
            "provider": {
              "@type": "ProfessionalService",
              "name": "Dream Homes Bihar",
              "serviceType": "Architectural Services"
            }
          })
        }}
      />

      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <ol className="flex items-center text-sm text-gray-500 flex-wrap gap-y-1">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
            <li className="mx-2">/</li>
            <li><Link href="/projects" className="hover:text-blue-600">Projects</Link></li>
            <li className="mx-2">/</li>
            <li><Link href="/projects/patna" className="hover:text-blue-600">Patna</Link></li>
            <li className="mx-2">/</li>
            <li className="text-gray-900 font-medium truncate">{projectData.title}</li>
          </ol>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        
        {/* Hero Section */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <FaMapMarkerAlt className="text-sm" />
            Project Case Study • {projectData.location}
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {projectData.title}
          </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl">
            {projectData.subtitle} • Complete architectural design and working drawings for a modern Vastu-compliant home in Patna, Bihar.
          </p>
        </div>

        {/* Project Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <FaRuler className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Plot Size</p>
              <p className="font-semibold text-gray-800">{projectData.plotSize}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <FaHome className="text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Built-up Area</p>
              <p className="font-semibold text-gray-800">{projectData.builtUpArea}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <FaRupeeSign className="text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Construction Cost</p>
              <p className="font-semibold text-gray-800">{projectData.constructionCost}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <FaCalendar className="text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Completion</p>
              <p className="font-semibold text-gray-800">{projectData.completionDate}</p>
            </div>
          </div>
        </div>

        {/* Main Gallery */}
        <div className="mb-12">
          <div className="bg-gray-100 rounded-2xl overflow-hidden relative">
            {/* Main Image */}
            <div className="relative aspect-[16/9] bg-gray-200">
              <Image
                src={projectData.gallery[selectedImage].src}
                alt={projectData.gallery[selectedImage].alt}
                fill
                className="object-cover"
                priority={selectedImage === 0}
              />
            </div>
            
            {/* Caption */}
            <div className="p-4 bg-white border-t">
              <p className="font-medium text-gray-800">{projectData.gallery[selectedImage].caption}</p>
              <p className="text-sm text-gray-500">{projectData.gallery[selectedImage].alt}</p>
            </div>
          </div>
          
          {/* Thumbnail Strip */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-3">
            {projectData.gallery.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index ? "border-blue-600 shadow-md" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Project Overview */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Challenge & Solution */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Project Overview</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="text-red-500">🎯</span> The Challenge
                  </h3>
                  <p className="text-gray-600">{projectData.challenge}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="text-green-500">✨</span> Our Solution
                  </h3>
                  <p className="text-gray-600">{projectData.solution}</p>
                </div>
              </div>
            </div>

            {/* Vastu Features */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl border border-orange-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🧿</span> Vastu Compliance Features
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-3">
                {projectData.vastuFeatures.map((item, index) => (
                  <div key={index} className="bg-white rounded-xl p-3 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-800">{item.feature}</span>
                      <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                        {item.direction}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{item.benefit}</p>
                  </div>
                ))}
              </div>
              
              <p className="text-sm text-orange-700 mt-4">
                This home achieved a 92% Vastu compliance score, ensuring positive energy flow throughout.
              </p>
            </div>

            {/* Key Features */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Key Design Features</h2>
              
              <div className="grid sm:grid-cols-2 gap-3">
                {projectData.keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Client & Services */}
          <div className="space-y-6">
            
            {/* Client Testimonial */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">"</span>
                <h3 className="font-semibold text-lg">Client Testimonial</h3>
              </div>
              <p className="text-blue-50 mb-4 leading-relaxed">
                {projectData.client.testimonial}
              </p>
              <p className="font-medium">— {projectData.client.name}</p>
              <p className="text-sm text-blue-200">Homeowner, {projectData.location}</p>
            </div>

            {/* Services Provided */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-800 mb-3">Services Provided</h3>
              <ul className="space-y-2">
                {projectData.services.map((service, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <FaCheckCircle className="text-blue-600 text-sm" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Box */}
            <div className="bg-gray-900 rounded-2xl p-6 text-white">
              <h3 className="font-semibold text-lg mb-2">Want a Similar Home?</h3>
              <p className="text-gray-400 text-sm mb-4">
                Get custom architectural drawings for your plot in Bihar. Free consultation available.
              </p>
              <div className="space-y-2">
                <a
                  href="https://wa.me/916205820278?text=I'm%20interested%20in%20architectural%20drawings%20similar%20to%20your%20Patna%20project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all"
                >
                  <FaWhatsapp /> WhatsApp Us
                </a>
                <button
                  onClick={() => setShowEnquiry(true)}
                  className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all border border-white/20"
                >
                  <FaPhone size={14} /> Request Callback
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Construction Timeline */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Construction Timeline</h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-6">
              {[
                { month: "1-2", phase: "Foundation & Plinth", status: "completed" },
                { month: "3-4", phase: "Ground Floor Structure", status: "completed" },
                { month: "5-6", phase: "First Floor & Roof", status: "completed" },
                { month: "7-8", phase: "Plastering & Flooring", status: "completed" },
                { month: "9", phase: "Electrical & Plumbing", status: "completed" },
                { month: "10", phase: "Finishing & Handover", status: "completed" },
              ].map((item, index) => (
                <div key={index} className="relative flex items-start gap-4 ml-4">
                  <div className={`absolute left-0 w-4 h-4 rounded-full -translate-x-[6px] ${
                    item.status === "completed" ? "bg-green-500" : "bg-gray-300"
                  }`}></div>
                  <div className="ml-6">
                    <p className="text-sm font-semibold text-gray-500">Month {item.month}</p>
                    <p className="font-medium text-gray-800">{item.phase}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Projects */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Similar Projects in Bihar</h2>
            <Link href="/projects" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              View All <FaArrowRight size={14} />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {relatedProjects.map((project) => (
              <Link
                key={project.id}
                href={project.link}
                className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all"
              >
                <div className="relative aspect-[4/3] bg-gray-200">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <FaMapMarkerAlt size={12} /> {project.location}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{project.plotSize} Plot</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* SEO Footer */}
        <div className="border-t border-gray-200 pt-8">
          <div className="prose prose-sm max-w-none text-gray-500">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              About This Project - Modern Vastu Home in Patna, Bihar
            </h3>
            <p>
              This 30x40 G+1 residence in Boring Road, Patna showcases Dream Homes Bihar's expertise in creating 
              Vastu-compliant modern homes. The project included complete architectural drawings - 2D floor plans, 
              3D elevation design, structural drawings, and MEP layouts. Located in one of Patna's prime residential 
              areas, this home demonstrates how traditional Vastu principles can be seamlessly integrated with 
              contemporary architecture.
            </p>
            <p className="mt-2">
              <strong>Services used:</strong> Architectural design, Vastu consultation, 3D visualization, structural 
              drawings, and construction support. If you're planning to build a house in Patna, Gaya, Muzaffarpur, 
              or anywhere in Bihar, contact Dream Homes Bihar for professional architectural services.
            </p>
            
            {/* Keyword Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {projectData.seoKeywords.map((keyword, index) => (
                <span key={index} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      {showEnquiry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Get Free Consultation</h3>
            <p className="text-gray-600 text-sm mb-4">
              Share your details and we'll call you within 24 hours.
            </p>
            
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 outline-none"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 outline-none"
              />
              <input
                type="text"
                placeholder="Plot Size (e.g., 30x40)"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 outline-none"
              />
              <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 outline-none">
                <option value="">Select City</option>
                <option value="patna">Patna</option>
                <option value="gaya">Gaya</option>
                <option value="muzaffarpur">Muzaffarpur</option>
                <option value="bhagalpur">Bhagalpur</option>
                <option value="other">Other</option>
              </select>
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowEnquiry(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}