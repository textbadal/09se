"use client";

import Image from "next/image";
import { FaDownload, FaStar, FaFire, FaRocket, FaCheckCircle } from "react-icons/fa";
import Script from "next/script";
import { useState, useEffect } from "react";

interface Product {
  id: number;
  title: string;
  price: string;
  description: string;
  image: string;
  downloadLink: string;
  badge?: "Best Seller" | "Popular" | "New";
}

const products: Product[] = [
  {
    id: 1,
    title: "10,000+ House Floor Plans Pack",
    price: "₹199",
    description: "Get instant access to a huge library of house plans in CAD & PDF format.",
    image: "/images/product1.jpg",
    downloadLink: "https://forms.gle/9DerZQwDMW9H8u2T8",
    badge: "Best Seller",
  },
  {
    id: 2,
    title: "Vastu Shastra Guide (E-book)",
    price: "₹49",
    description: "A complete guide to designing vastu-compliant homes.",
    image: "/images/product2.jpg",
    downloadLink: "https://forms.gle/YourGoogleFormLinkHere",
    badge: "Popular",
  },
  {
    id: 10,
    title: "Eco-Friendly Home Guide",
    price: "₹29",
    description: "Tips and plans to design energy-efficient, sustainable homes.",
    image: "/images/product10.jpg",
    downloadLink: "https://forms.gle/YourGoogleFormLinkHere",
    badge: "New",
  },
];

export default function ProductsPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getBadgeGradient = (badge?: Product["badge"]) => {
    switch (badge) {
      case "Best Seller":
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black";
      case "Popular":
        return "bg-gradient-to-r from-pink-500 to-pink-700 text-white";
      case "New":
        return "bg-gradient-to-r from-green-500 to-green-700 text-white";
      default:
        return "";
    }
  };

  const getBadgeIcon = (badge?: Product["badge"]) => {
    switch (badge) {
      case "Best Seller":
        return <FaStar className="inline mr-1" size={12} />;
      case "Popular":
        return <FaFire className="inline mr-1" size={12} />;
      case "New":
        return <FaRocket className="inline mr-1" size={12} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Structured Data */}
      <Script
        id="products-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: products.map((product, index) => ({
              "@type": "Product",
              position: index + 1,
              name: product.title,
              description: product.description,
              image: `https://dreamhomesbihar.online${product.image}`,
              brand: { "@type": "Brand", name: "Dream Homes Bihar" },
              offers: {
                "@type": "Offer",
                url: product.downloadLink,
                priceCurrency: "INR",
                price: product.price.replace("₹", ""),
                availability: "https://schema.org/InStock",
              },
            })),
          }),
        }}
      />

      <Script
  id="faq-schema"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I get the downloads after purchase?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Once you click the 'Instant Download' button, you’ll be redirected to our Google Form link. Submit your details, and you’ll receive the files immediately."
          }
        },
        {
          "@type": "Question",
          name: "Are the floor plans Vastu compliant?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! Most of our plans are designed with Vastu principles in mind. You can also tweak them as needed."
          }
        },
        {
          "@type": "Question",
          name: "Can I use these plans for commercial projects?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our plans are mainly for personal use, but you can modify and adapt them for your projects with proper customization."
          }
        },
        {
          "@type": "Question",
          name: "Do I need special software to open the files?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The packs include PDF (openable on any device) and CAD drawings (which can be opened in AutoCAD or similar software)."
          }
        }
      ]
    }),
  }}
/>


      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-yellow-50 via-white to-yellow-100 py-16 md:py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-200 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full translate-x-1/3 translate-y-1/3 opacity-30"></div>

        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10 relative z-10">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Instant Access to Premium <span className="text-yellow-600">House Plans</span> & Guides
            </h1>
            <p className="text-gray-700 text-lg md:text-xl mb-8">
              Download Vastu-compliant floor plans, eco-friendly home guides, and more — instantly!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start">
              <a
                href={products[0].downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold rounded-xl text-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-xl"
              >
                <FaDownload /> Get Your Pack Now
              </a>

              <div className="flex items-center mt-4 sm:mt-0">
                <div className="flex -space-x-3 mr-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="w-10 h-10 rounded-full bg-yellow-500 border-2 border-white"></div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">Trusted by <span className="font-bold">1000+</span> users</p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto md:mx-0">
              {["Instant download", "No registration", "Premium quality"].map((feature, index) => (
                <div key={index} className="flex items-center text-sm text-gray-600">
                  <FaCheckCircle className="text-yellow-500 mr-1" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-1/2 relative w-full h-64 md:h-96">
            <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-3xl rotate-3 opacity-20"></div>
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/images/product1.jpg" alt="Digital Products Hero" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Premium <span className="text-yellow-600">Digital Products</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Carefully curated resources to help you design and build your dream home
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`bg-white rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 overflow-hidden relative flex flex-col ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {product.badge && (
                  <span
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full font-bold text-xs shadow-lg z-10 flex items-center ${getBadgeGradient(
                      product.badge
                    )}`}
                  >
                    {getBadgeIcon(product.badge)}
                    {product.badge}
                  </span>
                )}

                <div className="relative w-full h-60 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h3>
                  <p className="text-gray-600 mb-4 flex-1">{product.description}</p>

                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Only</span>
                      <span className="text-2xl font-extrabold text-yellow-600">{product.price}</span>
                    </div>

                    <a
                      href={product.downloadLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white shadow-md hover:shadow-lg hover:gap-3"
                    >
                      <FaDownload /> Instant Download
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>




      

      {/* Bottom Fixed CTA for Mobile */}
      <div className="fixed bottom-4 left-0 w-full flex justify-center z-50 px-4 md:hidden">
        <a
          href={products[0].downloadLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full max-w-md flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold rounded-full shadow-lg text-lg transition-transform transform hover:scale-105"
        >
          <FaDownload /> Get Now
        </a>
      </div>

      {/* Testimonial Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">What Our <span className="text-yellow-400">Customers Say</span></h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Rajesh K.", comment: "The floor plans pack saved me thousands in architect fees!" },
              { name: "Priya S.", comment: "The Vastu guide helped me design a home that feels so peaceful." },
              { name: "Amit P.", comment: "Instant delivery and excellent quality. Will buy again!" }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-2xl">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 mx-1" />
                  ))}
                </div>
                <p className="italic mb-4">&quot;{testimonial.comment}&quot;</p>
                <p className="font-semibold text-yellow-400">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

 <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked <span className="text-yellow-600">Questions</span>
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "How do I get the downloads after purchase?",
                a: "Once you click the 'Instant Download' button, you’ll be redirected to our Google Form link. Submit your details, and you’ll receive the files immediately.",
              },
              {
                q: "Are the floor plans Vastu compliant?",
                a: "Yes! Most of our plans are designed with Vastu principles in mind. You can also tweak them as needed.",
              },
              {
                q: "Can I use these plans for commercial projects?",
                a: "Our plans are mainly for personal use, but you can modify and adapt them for your projects with proper customization.",
              },
              {
                q: "Do I need special software to open the files?",
                a: "The packs include PDF (openable on any device) and CAD drawings (which can be opened in AutoCAD or similar software).",
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="group bg-white border border-gray-200 rounded-xl p-5 shadow-md"
              >
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  {faq.q}
                  <span className="ml-2 transition-transform group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-3 text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}