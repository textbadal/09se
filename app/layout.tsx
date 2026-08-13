import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Dream Homes Bihar | House Planning, Vastu & 3D Elevation",
  description:
    "Expert house planning, Vastu-compliant designs, 3D elevations, and structural drawings tailored for Dream Homes in Bihar.",
  // Add icons configuration here
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
    shortcut: ["/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${fontSans.variable}`}>
      <body className="font-sans bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 text-slate-900 antialiased selection:bg-emerald-500 selection:text-white flex min-h-screen flex-col">
        <Header />

        <main className="flex-1">{children}</main>

        <Footer />

        {/* Floating Social Media, Payment & Contact Dock */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
          {/* Payment / Quick Pay Button - Enhanced & Clear */}
          <a
            href="/payment"
            aria-label="Make a Payment or Book Now"
            className="group relative flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 px-5 py-3.5 text-white shadow-2xl shadow-emerald-500/30 transition-all duration-300 hover:scale-110 hover:shadow-emerald-500/50 active:scale-95"
          >
            {/* Animated gradient shimmer */}
            <span className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70" />
            
            {/* Payment Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-5deg]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5z"
              />
            </svg>

            <div className="flex flex-col items-start leading-tight">
              <span className="text-sm font-bold tracking-wide">Pay Online</span>
              <span className="text-[10px] font-medium text-emerald-100/80">
                Secure • Instant
              </span>
            </div>
          </a>

          {/* Facebook Button */}
          <a
            href="https://www.facebook.com/dreamhomesbihar/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Facebook"
            className="group flex items-center gap-2 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 p-3 text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-110 hover:shadow-blue-500/40 active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="h-5 w-5"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-semibold transition-all duration-300 group-hover:max-w-xs group-hover:pr-2">
              Facebook
            </span>
          </a>

          {/* Instagram Button */}
          <a
            href="https://instagram.com/dreamhomesbihar"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Instagram"
            className="group flex items-center gap-2 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-3 text-white shadow-lg shadow-rose-500/20 transition-all duration-300 hover:scale-110 hover:shadow-rose-500/40 active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="h-5 w-5"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-semibold transition-all duration-300 group-hover:max-w-xs group-hover:pr-2">
              Instagram
            </span>
          </a>

          {/* WhatsApp Main Button - Enhanced */}
          <a
            href="https://wa.me/916205820278"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="group relative flex items-center gap-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 px-5 py-3.5 text-white shadow-2xl shadow-emerald-500/30 transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/50 active:scale-95"
          >
            {/* Animated pulse ring */}
            <span className="absolute inset-0 -z-10 rounded-2xl bg-emerald-500/30 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100 animate-pulse" />
            
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="h-6 w-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-5deg]"
            >
              <path fillRule="evenodd" d="M1.5 12c0 2.27.71 4.38 1.93 6.13L2 22l3.96-1.4A10.45 10.45 0 0 0 12 22.5c5.8 0 10.5-4.7 10.5-10.5S17.8 1.5 12 1.5 1.5 6.2 1.5 12Zm15.34 2.82c-.22-.11-1.3-.64-1.5-.72-.2-.08-.35-.11-.5.11-.15.22-.58.72-.71.87-.13.15-.26.17-.48.06a6.08 6.08 0 0 1-1.78-1.1 6.7 6.7 0 0 1-1.23-1.53c-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.06-.11-.5-.1.21-1.42-.2-.51-.4-.44-.55-.45h-.47c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02 0 1.19.87 2.34.99 2.5.12.16 1.7 2.6 4.12 3.65.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.21-.16-.43-.27Z" clipRule="evenodd" />
            </svg>

            <div className="flex flex-col items-start leading-tight">
              <span className="text-sm font-bold tracking-wide">Chat with us</span>
              <span className="text-[10px] font-medium text-emerald-100/80">
                Quick Response
              </span>
            </div>
          </a>
        </div>
      </body>
    </html>
  );
}