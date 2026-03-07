"use client";

import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  Users, 
  Globe, 
  CheckCircle, 
  Sparkles,
  Target,
  Heart,
  Brain,
  Star,
  ChevronDown,
  MessageCircle,
  Shield,
  Award,
  Play,
  Quote
} from "lucide-react";
import Image from "next/image";

export default function BootcampClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Who is this bootcamp best suited for?",
      a: "This intensive is designed for professionals, entrepreneurs, and growth-oriented individuals who seek clarity, emotional mastery, and structured mindset evolution in their personal and professional lives."
    },
    {
      q: "Is this bootcamp theoretical or practical?",
      a: "This is a practice-intensive experience. Each session combines guided meditation, experiential awareness exercises, and practical manifestation protocols you can immediately apply."
    },
    {
      q: "How much time is required daily?",
      a: "Live sessions run 60-75 minutes. We recommend an additional 15-20 minutes for integration practices to maximize your transformation."
    },
    {
      q: "Is this different from free online content?",
      a: "Absolutely. This bootcamp offers a structured curriculum, personalized guidance, and a supportive community—transforming scattered information into embodied wisdom."
    },
    {
      q: "Will I get recording access?",
      a: "Yes, all sessions are recorded and available for 30 days, allowing you to revisit the practices and integrate at your own pace."
    }
  ];

  const benefits = [
    {
      icon: <Brain className="w-6 h-6 text-purple-600" />,
      title: "Mental Clarity",
      description: "Cut through mental noise and access crystal-clear decision-making"
    },
    {
      icon: <Heart className="w-6 h-6 text-purple-600" />,
      title: "Emotional Mastery",
      description: "Develop unshakeable emotional balance and resilience"
    },
    {
      icon: <Target className="w-6 h-6 text-purple-600" />,
      title: "Focused Action",
      description: "Transform insights into consistent, purposeful action"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-purple-600" />,
      title: "Conscious Creation",
      description: "Learn to manifest from presence, not lack or desperation"
    }
  ];

  const curriculum = [
    {
      day: "Day 1: Foundation",
      time: "March 10 | 7:00 PM IST",
      topics: [
        "The Science of Manifestation & Neuroplasticity",
        "Identifying & Releasing Limiting Beliefs",
        "Setting Conscious Intentions"
      ],
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      day: "Day 2: Integration",
      time: "March 11 | 7:00 PM IST",
      topics: [
        "Guided Deep Meditation Practices",
        "Emotional Cleansing Techniques",
        "Aligning Thoughts, Emotions & Actions"
      ],
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      day: "Day 3: Application",
      time: "March 12 | 7:00 PM IST",
      topics: [
        "Law of Attraction: Beyond Surface Level",
        "Daily Practices for Sustained Growth",
        "Creating Your Personal Transformation Protocol"
      ],
      image: "https://images.unsplash.com/photo-1474418397713-6f21b9e5833f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Marketing Professional",
      content: "This bootcamp shifted something fundamental in me. The practices are simple yet profound. I finally understand what true manifestation means.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108777-466fd0c1dab7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Rahul Mehta",
      role: "Entrepreneur",
      content: "Structured, practical, and transformative. The facilitator&apos;s approach cuts through the noise and delivers what actually works.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Anjali Desai",
      role: "Yoga Instructor",
      content: "The perfect blend of spiritual wisdom and practical application. My meditation practice has deepened tremendously.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    }
  ];

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-transparent to-transparent" />
        
        {/* Hero Image Overlay */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1519834785169-98be25ec3f84?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Meditation background"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-medium">Limited to 25 Seats • Live Interactive Sessions</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-100 to-purple-200 bg-clip-text text-transparent">
                3-Day Manifestation & Meditation Bootcamp
              </h1>
              
              <p className="text-xl text-purple-100 mb-10 max-w-2xl lg:mx-0 leading-relaxed">
                A transformative journey to cultivate mental clarity, emotional mastery, 
                and conscious creation — guided by ancient wisdom and modern neuroscience.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <Calendar className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm">March 10-12, 2026</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <Clock className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm">7:00 PM IST Daily</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
               <a
  href="https://forms.gle/4HoFKWAkZHRfntpP9"
  target="_blank"
  rel="noopener noreferrer"
  className="group inline-flex items-center justify-center gap-2 bg-yellow-400 text-purple-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-xl"
>
  <MessageCircle className="w-5 h-5" />
  Register for ₹199
</a>
                <button className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all">
                  <Play className="w-5 h-5" />
                  Watch Preview
                </button>
              </div>
              
              {/* Participant Avatars */}
              <div className="flex items-center gap-4 mt-8 justify-center lg:justify-start">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-purple-300 flex items-center justify-center text-xs font-bold text-purple-900">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-purple-200">
                  <span className="font-bold">150+</span> students already enrolled
                </p>
              </div>
            </div>
            
            {/* Hero Right Image */}
            <div className="hidden lg:block relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Meditation session"
                  width={600}
                  height={800}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                    <p className="text-white font-semibold">Next Batch Starting Soon</p>
                    <p className="text-sm text-purple-100">Join 25 like-minded individuals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK INFO GRID */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <InfoCard 
            icon={<Calendar className="w-6 h-6 text-purple-600" />}
            title="Duration" 
            value="3 Days" 
            subtext="Live Interactive"
          />
          <InfoCard 
            icon={<Globe className="w-6 h-6 text-purple-600" />}
            title="Format" 
            value="Live Online" 
            subtext="Zoom Sessions"
          />
          <InfoCard 
            icon={<Users className="w-6 h-6 text-purple-600" />}
            title="Level" 
            value="All Levels" 
            subtext="Beginner Friendly"
          />
          <InfoCard 
            icon={<MessageCircle className="w-6 h-6 text-purple-600" />}
            title="Language" 
            value="Hinglish" 
            subtext="Hindi + English"
          />
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Transform Your Inner World
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            More than motivation—practical tools for lasting change
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FACILITATOR SECTION WITH PHOTO */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1544717301-9cdcb1f5940f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Facilitator - Meditation Teacher"
                  width={600}
                  height={800}
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                    <p className="text-sm text-gray-600">10+ years of experience</p>
                  </div>
                </div>
              </div>
              {/* Certification Badge */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-4 shadow-xl">
                <Award className="w-8 h-8 text-purple-900" />
              </div>
            </div>
            
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-200 px-4 py-2 rounded-full mb-6">
                <Award className="w-4 h-4 text-purple-700" />
                <span className="text-sm font-semibold text-purple-700">Master Facilitator</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Meet Anand Sharma
              </h2>
              <p className="text-xl text-purple-600 mb-6">Holistic Wellness Practitioner & Meditation Guide</p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                A certified holistic wellness practitioner with over a decade of experience 
                guiding individuals through the intersection of ancient wisdom and modern 
                neuroscience. Trained in multiple meditation traditions and certified in 
                cognitive behavioral techniques, Anand brings a uniquely grounded approach 
                to manifestation and mindset work.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-purple-600">500+</p>
                  <p className="text-sm text-gray-600">Students Guided</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-purple-600">10+</p>
                  <p className="text-sm text-gray-600">Years Experience</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </div>
                <span className="text-gray-600">4.9 (200+ reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULUM SECTION WITH IMAGES */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your 3-Day Transformation
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A carefully crafted journey from understanding to embodiment
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {curriculum.map((day, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-xl transition-all">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={day.image}
                  alt={day.day}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Day {i + 1}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-900 mb-2">{day.day}</h3>
                <p className="text-sm text-purple-600 mb-4">{day.time}</p>
                <ul className="space-y-3">
                  {day.topics.map((topic, j) => (
                    <li key={j} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS WITH PHOTOS */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Participants Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real transformations from real people
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg relative">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-purple-200" />
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="w-16 h-16 rounded-full object-cover border-2 border-purple-200"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic">&ldquo;{testimonial.content}&rdquo;</p>
              </div>
            ))}
          </div>
          
          {/* Video Testimonial Placeholder */}
          <div className="mt-12 relative rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1518611012118-696072013579?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Group session"
              width={1200}
              height={400}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <button className="bg-white rounded-full p-6 shadow-xl hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-purple-600" />
              </button>
            </div>
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-2xl font-bold">Watch testimonials</p>
              <p>Hear from our past participants</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about the bootcamp
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 text-lg">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="px-6 pb-6 text-gray-600 border-t pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA WITH BACKGROUND IMAGE */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Meditation background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/95 to-purple-800/95" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
            <Shield className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-medium">30-Day Money-Back Guarantee</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Mind?
          </h2>
          
          <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
            Join a community of conscious creators. Your journey to clarity and emotional mastery starts here.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <a
  href="https://forms.gle/4HoFKWAkZHRfntpP9"
  target="_blank"
  rel="noopener noreferrer"
  className="group inline-flex items-center justify-center gap-2 bg-yellow-400 text-purple-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-xl"
>
  <MessageCircle className="w-5 h-5" />
  Reserve Your Seat for ₹199
</a>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-purple-200">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Live Interactive Sessions
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Recording Access
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Practice Materials
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Community Access
            </span>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="flex -space-x-2">
              {[1,2,3,4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-purple-400"></div>
              ))}
            </div>
            <p className="text-purple-200">
              <span className="font-bold">12 spots remaining</span> for this batch
            </p>
          </div>
        </div>
      </section>

    
    </main>
  );
}

/* Enhanced Info Card */
function InfoCard({ icon, title, value, subtext }: { 
  icon: React.ReactNode; 
  title: string; 
  value: string; 
  subtext: string 
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 flex items-start gap-4 hover:shadow-xl transition-all">
      <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="font-bold text-gray-900 text-lg">{value}</p>
        <p className="text-sm text-gray-600">{subtext}</p>
      </div>
    </div>
  );
}