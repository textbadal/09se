"use client";

import React, { useState } from "react";
import {
  Home,
  Sparkles,
  Heart,
  Moon,
  Sun,
  Star,
  Compass,
  Flower2,
  Zen,
  Users,
  Calendar,
  Clock,
  Video,
  IndianRupee,
  CheckCircle,
  ChevronRight,
  Quote,
  BookOpen,
  MessageCircle,
  Mail,
  Phone,
  Award,
  TrendingUp,
  Brain,
  Wind,
  Leaf,
  Gem,
  Infinity
} from "lucide-react";

export default function HolisticBatchPage() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Thank you for your interest! We'll contact you soon.");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-indigo-50">
      {/* Hero Section with Background Pattern */}
      <section className="relative bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float-slow">
          <Star className="w-8 h-8 text-yellow-300 opacity-30" />
        </div>
        <div className="absolute bottom-20 right-10 animate-float">
          <Moon className="w-12 h-12 text-blue-300 opacity-20" />
        </div>
        <div className="absolute top-40 right-20 animate-float-delayed">
          <Sun className="w-10 h-10 text-orange-300 opacity-20" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 mr-2 text-yellow-300" />
              <span className="text-sm font-medium">Limited Seats Available</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Holistic Growth
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                Transformation Batch
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-purple-200 max-w-3xl mx-auto mb-8">
              Align Your Environment • Master Your Mind • Transform Your Life
            </p>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {["Vastu Shastra", "Law of Attraction", "Energy Healing", "Manifestation"].map((item, idx) => (
                <span key={idx} className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                  {item}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center">
                Enroll Now
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
              <button className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300">
                Download Brochure
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">500+</div>
                <div className="text-sm text-purple-200">Graduates</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">4.9</div>
                <div className="text-sm text-purple-200">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">15+</div>
                <div className="text-sm text-purple-200">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">24/7</div>
                <div className="text-sm text-purple-200">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="fill-white">
            <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,58.7C1248,64,1344,64,1392,64L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* ===== ABOUT THE BATCH ===== */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              About the Batch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive 4-week journey to transform your life through ancient wisdom and modern techniques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                The Holistic Growth Batch is designed to help individuals align
                their environment, thoughts, and energy to create a balanced
                and positive life. This program blends ancient wisdom with
                practical techniques for personal and spiritual development.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Through interactive sessions, practical exercises, and guided
                meditations, you'll learn to harness the power of your mind,
                optimize your living space, and manifest your deepest desires.
              </p>
              
              <div className="space-y-3 mt-6">
                {[
                  "✓ Live interactive sessions with expert trainers",
                  "✓ Practical exercises and assignments",
                  "✓ Personal mentorship and guidance",
                  "✓ Lifetime access to course materials",
                  "✓ Certificate of completion"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Home, label: "Vastu" },
                    { icon: Brain, label: "Mind" },
                    { icon: Heart, label: "Healing" },
                    { icon: Star, label: "Manifest" }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl text-center shadow-lg">
                      <item.icon className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-300 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-300 rounded-full opacity-20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BATCH DETAILS ===== */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Batch Details
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about the program
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Calendar, label: "Duration", value: "4 Weeks", sub: "Weekend Sessions" },
              { icon: Video, label: "Mode", value: "Online Live", sub: "Interactive Sessions" },
              { icon: Users, label: "Batch Size", value: "Limited Seats", sub: "Personal Attention" },
              { icon: IndianRupee, label: "Investment", value: "₹2,999", sub: "Early Bird: ₹2,499" }
            ].map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl text-center group hover:shadow-xl transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full text-white mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-8 h-8" />
                </div>
                <p className="text-sm text-gray-500 uppercase tracking-wider">{item.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{item.value}</p>
                <p className="text-sm text-gray-600 mt-1">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TOPICS COVERED ===== */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What You'll Learn
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive curriculum covering all aspects of holistic growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Home,
                title: "Vastu Shastra",
                description: "Learn how space alignment, directions, and energy flow influence health, relationships, and prosperity.",
                topics: ["5 Elements Theory", "Directional Energies", "Remedies", "Space Clearing"]
              },
              {
                icon: Brain,
                title: "Law of Attraction",
                description: "Understand how thoughts and emotions shape reality and how to attract success and abundance.",
                topics: ["The Secret", "Visualization", "Gratitude", "Affirmations"]
              },
              {
                icon: Heart,
                title: "Healing Practices",
                description: "Explore simple healing techniques for emotional balance, stress relief, and inner peace.",
                topics: ["Energy Healing", "Chakra Balancing", "Meditation", "Breathwork"]
              },
              {
                icon: Star,
                title: "Manifestation",
                description: "Learn practical manifestation methods including visualization, affirmations, and intention setting.",
                topics: ["Goal Setting", "Vision Boards", "Scripting", "Rituals"]
              }
            ].map((module, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl text-white">
                      <module.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{module.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{module.description}</p>
                  
                  <div className="space-y-2">
                    {module.topics.map((topic, tidx) => (
                      <div key={tidx} className="flex items-center text-sm text-gray-700">
                        <Sparkles className="w-4 h-4 text-purple-500 mr-2" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRAINER PROFILE ===== */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Your Guide
            </h2>
            <p className="text-xl text-gray-600">
              Learn from a master practitioner with years of experience
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              {/* Trainer Image with Animation */}
              <div className="relative group">
                <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl group-hover:scale-105 transition-transform duration-300">
                  <span className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 animate-pulse opacity-75"></span>
                  <span className="relative">SK</span>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-white animate-bounce">
                  <Award className="w-6 h-6" />
                </div>
              </div>

              {/* Trainer Info */}
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  Swati Kapoor
                </h3>
                <p className="text-xl text-purple-600 mb-4">
                  Certified Holistic Coach & Vastu Consultant
                </p>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  With over 12 years of experience in holistic healing and spiritual guidance, 
                  Swati has transformed the lives of 500+ individuals across 15 countries. 
                  She combines ancient Vedic wisdom with modern psychological approaches to 
                  create powerful transformational experiences.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: "Years Experience", value: "12+" },
                    { label: "Students Trained", value: "500+" },
                    { label: "Workshops", value: "100+" },
                    { label: "Countries", value: "15" }
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-purple-600">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Certifications */}
                <div className="flex flex-wrap gap-2">
                  {["Certified Vastu Expert", "Reiki Master", "Life Coach", "Meditation Teacher"].map((cert, idx) => (
                    <span key={idx} className="bg-white px-3 py-1 rounded-full text-sm text-purple-700 border border-purple-200">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from real people who transformed their lives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                location: "Mumbai",
                text: "This program completely transformed my perspective on life. The Vastu tips alone brought so much positive energy to my home!",
                rating: 5
              },
              {
                name: "Rahul Verma",
                location: "Bangalore",
                text: "The manifestation techniques I learned helped me land my dream job within 3 months. Unbelievably powerful!",
                rating: 5
              },
              {
                name: "Anjali Desai",
                location: "Delhi",
                text: "Swati's guidance on energy healing helped me overcome years of anxiety. Forever grateful for this journey.",
                rating: 5
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-xl relative">
                <Quote className="absolute top-4 right-4 w-8 h-8 text-purple-200" />
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about the program
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Do I need any prior experience?",
                a: "No prior experience is required. This program is designed for beginners as well as those already on their spiritual journey."
              },
              {
                q: "What is the time commitment?",
                a: "Sessions are held on weekends for 2 hours each. You'll also have daily practices that take 15-20 minutes."
              },
              {
                q: "Will I get a certificate?",
                a: "Yes, upon successful completion of the program, you'll receive a certificate from DHB Academy."
              },
              {
                q: "Can I attend if I'm outside India?",
                a: "Absolutely! The sessions are online and timings are adjusted to accommodate different time zones."
              }
            ].map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <span className="font-semibold text-gray-900">{faq.q}</span>
                  <ChevronRight className={`w-5 h-5 transition-transform ${activeFaq === idx ? 'rotate-90' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-6 py-4 bg-gray-50 text-gray-700">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ENROLLMENT FORM ===== */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Begin Your Transformation
            </h2>
            <p className="text-xl text-purple-200">
              Limited seats available for the upcoming batch
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message (Optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Any specific questions or requirements?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Enroll Now - ₹2,999 Only
              </button>

              <p className="text-center text-sm text-purple-200">
                Early bird discount available. Limited to first 20 students.
              </p>
            </form>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: Phone, text: "+91 98765 43210" },
              { icon: Mail, text: "holistic@dhbacademy.com" },
              { icon: MessageCircle, text: "Chat with us" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-center gap-3 text-purple-200">
                <item.icon className="w-5 h-5" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// Add these styles to your global CSS
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes float-slow {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-30px); }
  }
  
  @keyframes float-delayed {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-25px); }
  }
  
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-float-slow {
    animation: float-slow 8s ease-in-out infinite;
  }
  
  .animate-float-delayed {
    animation: float-delayed 7s ease-in-out infinite;
  }
  
  .animate-fade-in {
    animation: fade-in 1s ease-out;
  }
`;