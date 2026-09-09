import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "2D Floor Plan Design Services in Bihar | Dream Homes Bihar",
  description:
    "Get customized 2D floor plan designs for residential homes in Bihar. House plans for different plot sizes, bedrooms, parking, rooms, staircase and practical space planning.",
  keywords: [
    "2D floor plan design",
    "2D floor plan design in Bihar",
    "2D house plan",
    "house floor plan design",
    "2D floor plan Bihar",
    "residential floor plan",
    "house plan design Bihar",
    "Dream Homes Bihar",
  ],
  alternates: {
    canonical: "https://dreamhomesbihar.in/2d-floor-plan",
  },
  openGraph: {
    title: "2D Floor Plan Design Services in Bihar | Dream Homes Bihar",
    description:
      "Customized 2D floor plans designed around your plot size, requirements and lifestyle.",
    url: "https://dreamhomesbihar.in/2d-floor-plan",
    siteName: "Dream Homes Bihar",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "2D Floor Plan Design Services in Bihar",
    description:
      "Customized residential 2D floor plan design by Dream Homes Bihar.",
  },
};

const faqs = [
  {
    question: "What is a 2D floor plan?",
    answer:
      "A 2D floor plan is a top-view architectural drawing that shows the arrangement of rooms and spaces within a home, including walls, doors, windows, rooms, bathrooms, kitchen, staircase and other planned areas.",
  },
  {
    question: "Can you design a 2D floor plan according to my plot size?",
    answer:
      "Yes. A residential floor plan can be planned around your plot dimensions and your requirements, subject to the information and requirements provided for the project.",
  },
  {
    question: "Can you design a 3BHK 2D floor plan?",
    answer:
      "Yes. We can plan residential layouts for different configurations such as 2BHK, 3BHK and 4BHK, depending on the plot size and project requirements.",
  },
  {
    question: "Do you design plans for 30x40 plots?",
    answer:
      "Yes. 30x40 is one of the common residential plot sizes. The final layout depends on your requirements, site conditions and applicable planning considerations.",
  },
  {
    question: "Can the floor plan include parking?",
    answer:
      "Yes, parking can be considered as part of the space-planning requirements where the available plot area permits it.",
  },
  {
    question: "Can I request changes to the floor plan?",
    answer:
      "Revision availability depends on the selected service or package. Please discuss your requirements and revision expectations with our team before starting the project.",
  },
  {
    question: "How long does a 2D floor plan take?",
    answer:
      "The timeline depends on the complexity of the project, plot size, requirements and revision process. Contact Dream Homes Bihar with your requirements for an estimated timeline.",
  },
  {
    question: "How do I get started?",
    answer:
      "Share your plot dimensions, preferred number of bedrooms, floors, parking requirements and other important requirements with our team. We can then discuss the appropriate design service for your project.",
  },
];

const floorPlanExamples = [
  {
    title: "30 × 40 House Plan",
    subtitle: "Residential 2D Floor Plan",
    image: "/images/floor-plans/30x40-floor-plan.webp",
  },
  {
    title: "30 × 50 House Plan",
    subtitle: "Residential 2D Floor Plan",
    image: "/images/floor-plans/30x50-floor-plan.webp",
  },
  {
    title: "40 × 60 House Plan",
    subtitle: "Residential 2D Floor Plan",
    image: "/images/floor-plans/40x60-floor-plan.webp",
  },
];

const plotSizes = [
  "20 × 30",
  "20 × 40",
  "25 × 40",
  "30 × 40",
  "30 × 50",
  "40 × 60",
];

const configurations = [
  "1 BHK",
  "2 BHK",
  "3 BHK",
  "4 BHK",
  "5 BHK",
  "Duplex",
];

const includedFeatures = [
  {
    title: "Space Planning",
    description:
      "Logical arrangement of rooms and spaces based on your available area and requirements.",
  },
  {
    title: "Room Layout",
    description:
      "Plan bedrooms, living areas, kitchen, bathrooms and other required spaces.",
  },
  {
    title: "Dimensions",
    description:
      "Clear dimensions can be incorporated into the floor plan according to the project requirements.",
  },
  {
    title: "Parking Planning",
    description:
      "Parking requirements can be considered when planning the available plot area.",
  },
  {
    title: "Staircase Planning",
    description:
      "Staircase placement can be considered for multi-floor residential layouts.",
  },
  {
    title: "Light & Ventilation",
    description:
      "The layout can consider practical placement of openings and circulation for the home.",
  },
];

const steps = [
  {
    number: "01",
    title: "Share Your Requirements",
    description:
      "Send your plot dimensions, number of bedrooms, floors, parking requirements and other preferences.",
  },
  {
    number: "02",
    title: "Discuss the Layout",
    description:
      "Our team understands your requirements and discusses the appropriate planning approach.",
  },
  {
    number: "03",
    title: "Floor Plan Design",
    description:
      "The residential layout is developed around your requirements and available space.",
  },
  {
    number: "04",
    title: "Review",
    description:
      "Review the proposed layout and communicate feedback according to your selected service.",
  },
  {
    number: "05",
    title: "Final Plan",
    description:
      "The final deliverable is prepared according to the agreed scope of the project.",
  },
];

const services = [
  {
    title: "House Design",
    href: "/house-design",
    description: "Complete residential house design solutions.",
  },
  {
    title: "3D House Design",
    href: "/3d-house-design",
    description: "Visualize your home's exterior and design concept.",
  },
  {
    title: "Architectural Design",
    href: "/architectural-design",
    description: "Professional residential architectural planning.",
  },
];

export default function TwoDFloorPlanPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "2D Floor Plan Design Services",
    serviceType: "2D Floor Plan Design",
    provider: {
      "@type": "Organization",
      name: "Dream Homes Bihar",
      url: "https://dreamhomesbihar.in",
    },
    areaServed: {
      "@type": "State",
      name: "Bihar",
    },
    url: "https://dreamhomesbihar.in/2d-floor-plan",
    description:
      "Customized 2D floor plan design services for residential properties in India.",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {/* =========================================================
          STRUCTURED DATA
      ========================================================= */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      <main className="overflow-hidden bg-white text-slate-900">
        {/* =========================================================
            HERO SECTION
        ========================================================= */}

        <section className="relative bg-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.20),transparent_35%)]" />

          <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* Hero Content */}

              <div>
                <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80">
                  Residential Floor Plan Design
                </div>

                <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  2D Floor Plan Design Services in India
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                  Get a practical and customized 2D floor plan designed around
                  your plot size, room requirements, parking, circulation and
                  lifestyle.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="https://wa.me/6205820278"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                  >
                    Get Your Floor Plan
                  </a>

                  <Link
                    href="/projects"
                    className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    View Our Projects
                  </Link>
                </div>

                <div className="mt-8 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-2xl font-bold text-white">2D</p>
                    <p className="text-sm text-slate-400">Floor Planning</p>
                  </div>

                  <div>
                    <p className="text-2xl font-bold text-white">Custom</p>
                    <p className="text-sm text-slate-400">Requirements</p>
                  </div>

                  <div>
                    <p className="text-2xl font-bold text-white">India</p>
                    <p className="text-sm text-slate-400">Service Area</p>
                  </div>
                </div>
              </div>

              {/* Hero Image */}

              <div className="relative">
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-white p-3 shadow-2xl">
                  <div className="overflow-hidden rounded-2xl bg-slate-100">
                    <img
                      src="/images/floor-plans/featured-floor-plan.webp"
                      alt="2D residential floor plan designed by Dream Homes Bihar"
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            TRUST / INTRO
        ========================================================= */}

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  Custom Planning
                </p>
                <h2 className="mt-2 text-xl font-bold">
                  Designed around your plot
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Plan your home's spaces around the dimensions and requirements
                  of your property.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  Residential
                </p>
                <h2 className="mt-2 text-xl font-bold">
                  Practical home layouts
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Plan rooms, circulation, parking and other residential spaces
                  according to the project brief.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  Get Started
                </p>
                <h2 className="mt-2 text-xl font-bold">
                  Share your requirements
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Tell us your plot size and requirements to discuss your
                  project.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            WHAT IS A 2D FLOOR PLAN
        ========================================================= */}

        <section className="bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  2D Floor Plan
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  What is a 2D floor plan?
                </h2>

                <p className="mt-6 leading-8 text-slate-600">
                  A 2D floor plan is a top-view drawing that shows how the
                  different spaces of a home are arranged within the available
                  area.
                </p>

                <p className="mt-4 leading-8 text-slate-600">
                  It helps you understand the relationship between rooms,
                  circulation areas and other spaces before moving further with
                  your house design or construction planning.
                </p>

                <div className="mt-8">
                  <Link
                    href="/house-design"
                    className="font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Explore our house design service →
                  </Link>
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
                <img
                  src="/images/floor-plans/2d-floor-plan-example.webp"
                  alt="Detailed 2D house floor plan example"
                  className="w-full rounded-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            EXAMPLES
        ========================================================= */}

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Our Work
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                2D Floor Plan Examples
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Explore examples of residential floor plans for different plot
                sizes and home requirements.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {floorPlanExamples.map((plan) => (
                <article
                  key={plan.title}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src={plan.image}
                      alt={`${plan.title} 2D floor plan`}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold">{plan.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {plan.subtitle}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/portfolio"
                className="inline-flex rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold transition hover:bg-slate-50"
              >
                See More Projects
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================
            WHAT IS INCLUDED
        ========================================================= */}

        <section className="bg-slate-950 text-white">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                What's Included
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                What can be included in your 2D floor plan?
              </h2>

              <p className="mt-5 leading-7 text-slate-300">
                Your exact deliverables depend on the selected service and
                project requirements.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {includedFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-lg">
                    ✓
                  </div>

                  <h3 className="text-lg font-bold">{feature.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            PLOT SIZES
        ========================================================= */}

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  Plot Sizes
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  2D floor plans for different plot sizes
                </h2>

                <p className="mt-5 leading-7 text-slate-600">
                  We can discuss residential floor-plan requirements for
                  different plot dimensions. The final design depends on your
                  actual site and requirements.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {plotSizes.map((size) => (
                  <div
                    key={size}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center transition hover:border-blue-300 hover:bg-blue-50"
                  >
                    <p className="text-xl font-bold">{size}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      House Plan
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            CONFIGURATIONS
        ========================================================= */}

        <section className="bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Home Configuration
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Choose your home configuration
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
                Tell us how you want to use your home and we can discuss a
                suitable layout for your available space.
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3">
              {configurations.map((configuration) => (
                <div
                  key={configuration}
                  className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
                >
                  <p className="text-xl font-bold">{configuration}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Floor Plan
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            PROCESS
        ========================================================= */}

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Our Process
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                How our 2D floor plan process works
              </h2>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-5">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <p className="text-3xl font-black text-blue-600">
                    {step.number}
                  </p>

                  <h3 className="mt-5 text-lg font-bold">{step.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            PRICING
        ========================================================= */}

        <section className="bg-slate-50">
          <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  Pricing
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  Get a custom quote for your floor plan
                </h2>

                <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
                  The cost of a floor plan can depend on the plot size,
                  complexity, number of floors, requirements and selected
                  deliverables.
                </p>
              </div>

              <div className="mt-8 flex justify-center">
                <a
                  href="https://wa.me/YOUR_WHATSAPP_NUMBER"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-xl bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Get Your Custom Quote
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            WHY DREAM HOMES BIHAR
        ========================================================= */}

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  Why Dream Homes Bihar
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  A floor plan designed around your requirements
                </h2>

                <p className="mt-5 leading-7 text-slate-600">
                  Your floor plan is an important part of the home-design
                  process. We focus on understanding your requirements before
                  planning the layout.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Customized residential layouts",
                  "Plot-size based planning",
                  "Practical room arrangement",
                  "Parking considerations",
                  "Bedroom and floor configuration",
                  "Clear communication",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200 p-5"
                  >
                    <div className="flex gap-3">
                      <span className="font-bold text-blue-600">✓</span>
                      <span className="font-medium">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            RELATED SERVICES
        ========================================================= */}

        <section className="bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Explore More
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Related design services
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {services.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="text-xl font-bold group-hover:text-blue-600">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {service.description}
                  </p>

                  <p className="mt-5 text-sm font-semibold text-blue-600">
                    Learn more →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            FAQ
        ========================================================= */}

        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                FAQ
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Frequently asked questions
              </h2>
            </div>

            <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group p-6"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-semibold">
                    <span>{faq.question}</span>

                    <span className="text-xl transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            FINAL CTA
        ========================================================= */}

        <section className="bg-slate-950">
          <div className="mx-auto max-w-5xl px-6 py-20 text-center lg:px-8 lg:py-24">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
              Start Your Project
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Have a plot? Let's design your home.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Share your plot dimensions and requirements with Dream Homes
              Bihar and discuss your custom 2D floor plan.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="https://wa.me/6202520278"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                Get Your Floor Plan
              </a>

              <Link
                href="/contact"
                className="inline-flex rounded-xl border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}