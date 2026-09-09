// app/page.tsx
"use client";

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { 
  Building2, 
  Home, 
  Users, 
  Award, 
  ArrowRight,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Sparkles,
  Compass,
  Layers,
  PenTool,
  TreePine,
  ArrowUpRight,
  Quote,
  Play,
  ChevronRight,
  Clock,
  Star,
  Globe,
  Heart,
  Eye,
  MoveRight,
  Plus,
  Minus
} from 'lucide-react';

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredProject, setHoveredProject] = useState(null);

  // Projects portfolio
  const projects = [
    {
      id: 1,
      title: 'Luxury Villa',
      location: 'Patna, Bihar',
      category: 'Residential',
      area: '3500 sq.ft',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
      featured: true,
      description: 'Modern villa with traditional Bihar elements',
      style: 'Contemporary',
      status: 'Completed'
    },
    {
      id: 2,
      title: 'Corporate Headquarters',
      location: 'Gaya, Bihar',
      category: 'Commercial',
      area: '2500 sq.ft',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      featured: false,
      description: 'Contemporary office space with sustainable design',
      style: 'Modern',
      status: 'In Progress'
    },
    {
      id: 3,
      title: 'Eco Farmhouse',
      location: 'Nalanda, Bihar',
      category: 'Residential',
      area: '5000 sq.ft',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop',
      featured: true,
      description: 'Eco-friendly farmhouse with organic gardens',
      style: 'Sustainable',
      status: 'Completed'
    },
    {
      id: 4,
      title: 'Retail Complex',
      location: 'Muzaffarpur, Bihar',
      category: 'Commercial',
      area: '8000 sq.ft',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      featured: false,
      description: 'Modern retail space with innovative design',
      style: 'Contemporary',
      status: 'Completed'
    },
    {
      id: 5,
      title: 'Heritage Resort',
      location: 'Bodh Gaya, Bihar',
      category: 'Hospitality',
      area: '12000 sq.ft',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
      featured: true,
      description: 'Luxury resort blending tradition with modernity',
      style: 'Heritage',
      status: 'In Progress'
    },
    {
      id: 6,
      title: 'Luxury Apartments',
      location: 'Darbhanga, Bihar',
      category: 'Residential',
      area: '15000 sq.ft',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      featured: false,
      description: 'Modern apartment complex with premium amenities',
      style: 'Modern',
      status: 'Completed'
    }
  ];

  const categories = ['All', 'Residential', 'Commercial', 'Hospitality'];

  // Services
  const services = [
    {
      icon: PenTool,
      title: 'Architectural Design',
      description: 'Innovative spatial planning and aesthetic design solutions',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Layers,
      title: 'Interior Design',
      description: 'Creative interior solutions that reflect your personality',
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      icon: Compass,
      title: 'Urban Planning',
      description: 'Strategic development for sustainable urban growth',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Building2,
      title: 'Project Management',
      description: 'End-to-end execution with precision and quality',
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  // Stats
  const stats = [
    { number: '15+', label: 'Years Experience', icon: Clock },
    { number: '100+', label: 'Projects Delivered', icon: Building2 },
    { number: '98%', label: 'Client Satisfaction', icon: Star },
    { number: '50+', label: 'Expert Team', icon: Users }
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Homeowner, Patna',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      text: 'The team at Dream Homes transformed our vision into reality. Their attention to detail and commitment to sustainability is remarkable.',
      rating: 5
    },
    {
      name: 'Priya Singh',
      role: 'Business Owner, Gaya',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      text: 'Working with Dream Homes was an absolute pleasure. They delivered our commercial project ahead of schedule with exceptional quality.',
      rating: 5
    }
  ];

  // FAQ
  const faqs = [
    {
      question: 'What services do you offer?',
      answer: 'We offer comprehensive architectural services including design, planning, interior design, and project management.'
    },
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary based on scope and complexity. A residential project typically takes 3-6 months.'
    },
    {
      question: 'Do you handle sustainable design?',
      answer: 'Yes, we specialize in eco-friendly and sustainable design solutions including green building practices.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Premium Design */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-500/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-r from-orange-600/10 to-transparent blur-3xl"></div>
          {/* Grid Pattern */}
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                <span className="text-white/80 text-sm font-medium">Since 2010</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Crafting
                <span className="block text-orange-400">Extraordinary</span>
                <span className="block">Spaces</span>
              </h1>
              
              <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
                Where visionary architecture meets timeless elegance. We create spaces 
                that inspire, endure, and celebrate the rich heritage of Bihar.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button className="group bg-orange-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-600 transition-all shadow-2xl shadow-orange-500/30 flex items-center gap-2">
                  Explore Our Work
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="group border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Schedule Consultation
                </button>
              </div>
              
              <div className="flex flex-wrap gap-8 pt-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="text-2xl font-bold text-white">{stat.number}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  {[0, 1].map((i) => (
                    <div key={i} className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
                      <Image
                        src={projects[i].image}
                        alt={projects[i].title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-sm font-medium">{projects[i].title}</p>
                        <p className="text-xs text-gray-300">{projects[i].location}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4 pt-8">
                  {[2, 3].map((i) => (
                    <div key={i} className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
                      <Image
                        src={projects[i].image}
                        alt={projects[i].title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-sm font-medium">{projects[i].title}</p>
                        <p className="text-xs text-gray-300">{projects[i].location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-orange-500 w-24 h-24 rounded-full flex items-center justify-center shadow-2xl">
                <Award className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section with Parallax Style */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=800&fit=crop"
                      alt="Architecture"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=800&fit=crop"
                      alt="Design"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=800&fit=crop"
                      alt="Interior"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=800&fit=crop"
                      alt="Planning"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 bg-orange-500 text-white px-8 py-6 rounded-2xl shadow-2xl">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-orange-500 font-semibold">
                <span className="w-8 h-0.5 bg-orange-500"></span>
                ABOUT US
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Designing Dreams,
                <span className="block text-orange-500">Building Futures</span>
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Dream Homes Bihar is a premier architectural design studio dedicated to 
                creating spaces that reflect the rich cultural heritage of Bihar while 
                meeting the demands of modern living.
              </p>
              <p className="text-gray-600 leading-relaxed">
                With over a decade of experience, we specialize in residential, commercial, 
                and institutional projects that combine aesthetic excellence with sustainable 
                practices and functional design.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { icon: Award, text: '15+ Awards' },
                  { icon: Building2, text: '100+ Projects' },
                  { icon: Users, text: '50+ Clients' },
                  { icon: Globe, text: '10+ Cities' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-orange-500" />
                    </div>
                    <span className="font-medium text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services with Glassmorphism */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-orange-500 font-semibold mb-4">
              <span className="w-8 h-0.5 bg-orange-500"></span>
              SERVICES
              <span className="w-8 h-0.5 bg-orange-500"></span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What We <span className="text-orange-500">Offer</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Comprehensive architectural solutions tailored to your unique needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/20"
              >
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-orange-500 text-sm font-semibold flex items-center gap-1">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects with Filter */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-orange-500 font-semibold mb-4">
                <span className="w-8 h-0.5 bg-orange-500"></span>
                PORTFOLIO
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Featured <span className="text-orange-500">Projects</span>
              </h2>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === category
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects
              .filter(p => activeFilter === 'All' || p.category === activeFilter)
              .map((project) => (
                <div
                  key={project.id}
                  className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {/* Overlay Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <div className="transform transition-all duration-500">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-orange-400 bg-orange-500/20 px-3 py-1 rounded-full backdrop-blur-sm">
                            {project.category}
                          </span>
                          {project.featured && (
                            <span className="text-xs font-medium text-white bg-orange-500 px-3 py-1 rounded-full backdrop-blur-sm">
                              Featured
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                        <p className="text-sm text-gray-300">{project.location}</p>
                        
                        <div className={`mt-4 flex items-center gap-4 text-sm text-gray-300 transition-all duration-500 ${
                          hoveredProject === project.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}>
                          <span>{project.area}</span>
                          <span>•</span>
                          <span>{project.year}</span>
                          <span>•</span>
                          <span className="text-orange-400">{project.status}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* View Button */}
                    <button className={`absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full transition-all duration-500 ${
                      hoveredProject === project.id ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                    }`}>
                      <ArrowUpRight className="w-5 h-5 text-gray-900" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-orange-600 via-orange-500 to-orange-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '15+', label: 'Years Experience' },
              { number: '100+', label: 'Projects Delivered' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '50+', label: 'Team Members' }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-sm text-orange-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-orange-500 font-semibold mb-4">
              <span className="w-8 h-0.5 bg-orange-500"></span>
              TESTIMONIALS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our <span className="text-orange-500">Clients Say</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <Quote className="w-10 h-10 text-orange-200 mb-4" />
                <p className="text-gray-600 leading-relaxed mb-6">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-orange-200">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-orange-500 font-semibold mb-4">
              <span className="w-8 h-0.5 bg-orange-500"></span>
              FAQ
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-orange-500">Questions</span>
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="group bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300">
                <button className="w-full px-6 py-4 flex items-center justify-between text-left">
                  <span className="font-semibold text-gray-900 group-hover:text-orange-500 transition-colors">
                    {faq.question}
                  </span>
                  <Plus className="w-5 h-5 text-orange-500 flex-shrink-0" />
                </button>
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Create Your <span className="text-orange-400">Dream Space</span>?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's collaborate to bring your architectural vision to life. 
            Schedule a consultation today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-orange-500 text-white px-10 py-4 rounded-full font-semibold hover:bg-orange-600 transition-all shadow-2xl shadow-orange-500/30 flex items-center gap-2 group">
              Get Started
              <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-white/20 text-white px-10 py-4 rounded-full font-semibold hover:bg-white/10 transition-all flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Contact Us
            </button>
          </div>
        </div>
      </section>

     
    </div>
  );
}