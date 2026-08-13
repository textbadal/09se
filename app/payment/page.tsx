// app/payment/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { 
  CreditCard, 
  Building2, 
  Smartphone, 
  QrCode, 
  ShieldCheck, 
  Clock, 
  CheckCircle2,
  ExternalLink,
  IndianRupee,
  AlertCircle,
  Phone,
  Mail,
  MessageCircle
} from "lucide-react";

export const metadata: Metadata = {
  title: "Make a Payment | Dream Homes Bihar",
  description: "Secure online payment for house planning, Vastu designs, and 3D elevation services. Pay via UPI, card, or bank transfer.",
  keywords: "payment, dream homes, house planning, vastu, 3d elevation, bihar",
  openGraph: {
    title: "Make a Payment | Dream Homes Bihar",
    description: "Secure online payment for your dream home services.",
    type: "website",
    url: "https://dreamhomesbihar.in/payment",
  },
};

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
       
        {/* ===== PAYMENT OPTIONS GRID ===== */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          
          {/* --- Card 1: Online Payment --- */}
          <div className="group relative bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-200/40 hover:-translate-y-1 border border-slate-100">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600 group-hover:scale-110 transition-transform duration-300">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-semibold text-slate-900">Pay Online</h2>
                </div>
                <span className="text-xs font-medium bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">⭐ Recommended</span>
              </div>
              
              <p className="text-slate-600 mb-4">
                Pay instantly via credit/debit card, UPI, net banking, or wallet.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {["VISA", "Mastercard", "Rupay", "UPI", "Paytm", "PhonePe"].map((method) => (
                  <span key={method} className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full font-medium">
                    {method}
                  </span>
                ))}
              </div>
              
              <Link
                href="https://rzp.io/rzp/dreamhomes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/30 active:scale-95"
              >
                <span>Proceed to Pay</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
              
              <p className="text-xs text-slate-400 mt-3 text-center">
                🔒 Secured by Razorpay
              </p>
            </div>
          </div>

          {/* --- Card 2: UPI / QR --- */}
          <div className="group relative bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-200/40 hover:-translate-y-1 border border-slate-100">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 rounded-xl text-blue-600 group-hover:scale-110 transition-transform duration-300">
                    <QrCode className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-semibold text-slate-900">Scan & Pay</h2>
                </div>
                <span className="text-xs font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">UPI</span>
              </div>
              
              <p className="text-slate-600 mb-4">
                Scan the QR code with any UPI app (Google Pay, PhonePe, Paytm, etc.)
              </p>
              
              {/* QR Code Image */}
              <div className="flex flex-col items-center mb-4">
                <div className="relative w-48 h-48 bg-white rounded-xl overflow-hidden border-2 border-slate-200 shadow-md flex items-center justify-center">
                  {/* Replace the src with your actual QR code image path */}
                  <Image
                    src="/QrCode Dream Homes Bihar.jpeg"  // ← Change this to your QR code path
                    alt="UPI QR Code for Dream Homes Bihar"
                    width={192}
                    height={192}
                    className="object-contain p-2"
                    priority
                  />
                </div>
                
               
              </div>
              
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-slate-600 text-sm">
                  <IndianRupee className="w-4 h-4" />
                  <span>Enter the exact amount while paying</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== TRUST SIGNALS ===== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: ShieldCheck, label: "256-bit SSL Secure" },
            { icon: Clock, label: "Instant Confirmation" },
            { icon: CheckCircle2, label: "Payment Receipt" },
            { icon: Smartphone, label: "All UPI Apps" }
          ].map((item, index) => (
            <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-100">
              <item.icon className="w-5 h-5 text-emerald-600 mx-auto mb-1.5" />
              <p className="text-xs font-medium text-slate-700">{item.label}</p>
            </div>
          ))}
        </div>

        {/* ===== SUPPORT SECTION ===== */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 mb-8 border border-emerald-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-100 rounded-full">
                <MessageCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Need Help?</h4>
                <p className="text-sm text-slate-600">We're here to assist you with your payment</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/916205820278"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-medium transition-colors"
              >
                <Phone className="w-4 h-4" />
                WhatsApp
              </a>
              <a
                href="mailto:support@dreamhomesbihar.in"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl font-medium border border-slate-200 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
}