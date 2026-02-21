"use client";

import React, { useState } from "react";
import { 
  Search, 
  CheckCircle, 
  XCircle, 
  Briefcase, 
  Calendar, 
  MapPin,
  Award,
  ExternalLink,
  ChevronRight,
  Clock,
  BookOpen,
  Users,
  Sparkles
} from "lucide-react";

/* ================== CERTIFICATE DATA ================== */
const certificates = [
  {
    id: "DHB-INT-001",
    name: "Astha Shrivastava",
    domain: "Investment Banking",
    duration: "2 Months",
    issueDate: "15 Jan 2025",
    skills: ["Financial Modeling", "Valuation", "M&A"],
    grade: "A",
    issuer: "DHB Academy"
  },
  {
    id: "DHB-INT-002",
    name: "Chandril Sarkar",
    domain: "Cloud Computing",
    duration: "3 Months",
    issueDate: "20 Jan 2025",
    skills: ["AWS", "Azure", "DevOps"],
    grade: "A+",
    issuer: "DHB Academy"
  },
  {
    id: "DHB-INT-003",
    name: "Priya Sharma",
    domain: "Data Science",
    duration: "3 Months",
    issueDate: "25 Jan 2025",
    skills: ["Python", "Machine Learning", "SQL"],
    grade: "A",
    issuer: "DHB Academy"
  },
  {
    id: "DHB-INT-004",
    name: "Rahul Verma",
    domain: "Full Stack Development",
    duration: "4 Months",
    issueDate: "28 Jan 2025",
    skills: ["React", "Node.js", "MongoDB"],
    grade: "A+",
    issuer: "DHB Academy"
  }
];

/* ================== INTERNSHIP DATA ================== */
const internships = [
  {
    title: "Full Stack Web Development",
    duration: "3 Months",
    mode: "Remote",
    type: "Paid",
    positions: 5,
    startDate: "March 2025",
    description: "Build real-world web applications using MERN stack",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    icon: "💻"
  },
  {
    title: "Data Science & Analytics",
    duration: "3 Months",
    mode: "Hybrid",
    type: "Paid",
    positions: 3,
    startDate: "April 2025",
    description: "Work on data-driven projects and ML models",
    skills: ["Python", "Pandas", "Scikit-learn", "SQL"],
    icon: "📊"
  },
  {
    title: "Cloud Architecture",
    duration: "2 Months",
    mode: "Remote",
    type: "Unpaid",
    positions: 4,
    startDate: "March 2025",
    description: "Learn and implement cloud solutions on AWS/Azure",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
    icon: "☁️"
  },
  {
    title: "Digital Marketing",
    duration: "2 Months",
    mode: "Remote",
    type: "Paid",
    positions: 6,
    startDate: "April 2025",
    description: "Manage social media campaigns and SEO strategies",
    skills: ["SEO", "Social Media", "Analytics", "Content"],
    icon: "📱"
  },
  {
    title: "Investment Banking",
    duration: "2 Months",
    mode: "On-site",
    type: "Paid",
    positions: 3,
    startDate: "May 2025",
    description: "Work on financial modeling and valuation projects",
    skills: ["Financial Modeling", "Excel", "Valuation"],
    icon: "📈"
  },
  {
    title: "UI/UX Design",
    duration: "2 Months",
    mode: "Remote",
    type: "Unpaid",
    positions: 4,
    startDate: "March 2025",
    description: "Design user interfaces and create prototypes",
    skills: ["Figma", "Adobe XD", "Wireframing"],
    icon: "🎨"
  }
];

export default function InternshipsPage() {
  const [certificateId, setCertificateId] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [filterType, setFilterType] = useState("all");

  const verifyCertificate = () => {
    if (!certificateId.trim()) return;
    
    setIsVerifying(true);
    
    // Simulate API call
    setTimeout(() => {
      const found = certificates.find(
        (cert) => cert.id.toLowerCase() === certificateId.toLowerCase()
      );
      setResult(found || "not-found");
      setIsVerifying(false);
    }, 1000);
  };

  const filteredInternships = filterType === "all" 
    ? internships 
    : internships.filter(intern => intern.type.toLowerCase() === filterType);

  return (
    <main className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Internships & Careers
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Launch your career with industry-leading internships and verify your certificates instantly
          </p>
          
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">100+</span> Interns Placed
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">50+</span> Industry Partners
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">95%</span> Success Rate
            </div>
          </div>
        </div>
      </section>

      {/* ================= INTERNSHIPS ================= */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Available Internships
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Choose from a variety of internships designed to give you real-world experience
            </p>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <button
                onClick={() => setFilterType("all")}
                className={`px-6 py-2 rounded-full transition-all ${
                  filterType === "all" 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                All Internships
              </button>
              <button
                onClick={() => setFilterType("paid")}
                className={`px-6 py-2 rounded-full transition-all ${
                  filterType === "paid" 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Paid
              </button>
              <button
                onClick={() => setFilterType("unpaid")}
                className={`px-6 py-2 rounded-full transition-all ${
                  filterType === "unpaid" 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Unpaid
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInternships.map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{item.icon}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      item.type === "Paid" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-orange-100 text-orange-700"
                    }`}>
                      {item.type}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Duration: {item.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>Mode: {item.mode}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{item.positions} positions available</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Starts: {item.startDate}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <button className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-blue-600 transition-all duration-300 flex items-center justify-center group">
                    Apply Now
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CERTIFICATE VERIFICATION ================= */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
              <Award className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Certificate Verification
            </h2>
            <p className="text-gray-600 text-lg">
              Verify the authenticity of your DHB Academy certificates instantly
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Enter Certificate ID (e.g., DHB-INT-001)"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && verifyCertificate()}
                />
              </div>
              <button
                onClick={verifyCertificate}
                disabled={isVerifying}
                className="md:w-48 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isVerifying ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Verify
                  </>
                )}
              </button>
            </div>

            {/* Sample Certificate IDs */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              <span className="text-sm text-gray-500">Sample IDs:</span>
              {certificates.slice(0, 3).map((cert, idx) => (
                <button
                  key={idx}
                  onClick={() => setCertificateId(cert.id)}
                  className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition"
                >
                  {cert.id}
                </button>
              ))}
            </div>

            {/* ================= RESULT ================= */}
            {result && (
              <div className={`mt-8 p-6 rounded-xl animate-slide-up ${
                result !== "not-found" 
                  ? "bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200" 
                  : "bg-gradient-to-br from-red-50 to-rose-50 border border-red-200"
              }`}>
                {result !== "not-found" ? (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                      <h3 className="text-2xl font-bold text-gray-900">Certificate Verified</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500">Certificate ID</p>
                          <p className="font-mono font-semibold">{result.id}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Recipient Name</p>
                          <p className="text-lg font-semibold">{result.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Domain</p>
                          <p className="font-medium">{result.domain}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500">Duration</p>
                          <p className="font-medium">{result.duration}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Issue Date</p>
                          <p className="font-medium">{result.issueDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Grade</p>
                          <p className="font-medium">{result.grade}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-green-200">
                      <p className="text-sm text-gray-500 mb-2">Skills Acquired</p>
                      <div className="flex flex-wrap gap-2">
                        {result.skills.map((skill, idx) => (
                          <span key={idx} className="px-3 py-1 bg-green-200 text-green-800 text-sm rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <XCircle className="w-8 h-8 text-red-600" />
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Certificate Not Found</h3>
                      <p className="text-gray-600 mt-1">
                        No certificate found with ID "{certificateId}". Please check and try again.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl text-center">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-3">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-semibold">Instant Verification</h4>
              <p className="text-sm text-gray-600 mt-1">Get results in seconds</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl text-center">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-3">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-semibold">Blockchain Secured</h4>
              <p className="text-sm text-gray-600 mt-1">Tamper-proof certificates</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl text-center">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-3">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-semibold">Globally Recognized</h4>
              <p className="text-sm text-gray-600 mt-1">Accepted worldwide</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Add missing imports
import { Shield, Globe } from 'lucide-react';

// Add these styles to your global CSS or use a styled-components solution
const styles = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fade-in {
    animation: fade-in 0.6s ease-out;
  }
  
  .animate-fade-in-up {
    opacity: 0;
    animation: fade-in 0.6s ease-out forwards;
  }
  
  .animate-slide-up {
    animation: slide-up 0.4s ease-out;
  }
`;