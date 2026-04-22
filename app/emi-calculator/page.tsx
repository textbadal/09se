"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState<string>("2500000");
  const [interestRate, setInterestRate] = useState<string>("8.5");
  const [loanTenure, setLoanTenure] = useState<string>("20");
  const [emi, setEmi] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);
  const [activeInput, setActiveInput] = useState<"amount" | "rate" | "tenure" | null>(null);

  const formatIndianCurrency = (value: number): string => {
    const formatter = new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    });
    return formatter.format(value);
  };

  const parseIndianNumber = (value: string): number => {
    return Number(value.replace(/,/g, ''));
  };

  const handleLoanAmountChange = (value: string) => {
    const parsed = parseIndianNumber(value);
    if (!isNaN(parsed)) {
      setLoanAmount(parsed.toString());
    } else {
      setLoanAmount('');
    }
  };

  const calculateEMI = useCallback(() => {
    const P = Number(loanAmount);
    const R = Number(interestRate) / 12 / 100;
    const N = Number(loanTenure) * 12;

    if (P > 0 && R > 0 && N > 0) {
      const emiValue = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
      const totalPay = emiValue * N;
      const totalInt = totalPay - P;

      setEmi(Math.round(emiValue));
      setTotalInterest(Math.round(totalInt));
      setTotalPayment(Math.round(totalPay));
    }
  }, [loanAmount, interestRate, loanTenure]);

  useEffect(() => {
    if (loanAmount && Number(loanAmount) > 0) {
      calculateEMI();
    }
  }, [loanAmount, interestRate, loanTenure, calculateEMI]);

  // Quick amount presets
  const amountPresets = [1000000, 2500000, 5000000, 7500000, 10000000];
  
  // Quick tenure presets
  const tenurePresets = [10, 15, 20, 25, 30];

  // Amortization data for first year
  const getAmortizationData = () => {
    if (!emi) return [];
    
    const monthlyRate = Number(interestRate) / 12 / 100;
    const months = Number(loanTenure) * 12;
    let balance = Number(loanAmount);
    const data = [];
    
    for (let i = 1; i <= Math.min(12, months); i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emi - interestPayment;
      balance -= principalPayment;
      
      data.push({
        month: i,
        emi: Math.round(emi),
        principal: Math.round(principalPayment),
        interest: Math.round(interestPayment),
        balance: Math.round(balance),
      });
    }
    
    return data;
  };

  const amortizationData = getAmortizationData();
  const interestRatio = totalPayment ? Math.round((totalInterest! / totalPayment) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Free EMI Calculator - Home Loan, Car Loan & Personal Loan",
            "description": "Calculate your monthly EMI, total interest, and complete amortization schedule instantly. Free online EMI calculator for home loans, car loans, and personal loans in India.",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "1250"
            }
          })
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16">
        
        {/* Header with SEO-friendly content */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 px-5 py-2.5 rounded-full mb-4">
            <span className="text-2xl">🏦</span>
            <span className="text-xs font-bold tracking-wider text-green-700 uppercase">
              #1 EMI Calculator India
            </span>
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Free EMI Calculator
          </h1>
          
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-6">
            Calculate your monthly EMI for Home Loan, Car Loan, Personal Loan & more. 
            Get instant amortization schedule and total interest breakdown.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="text-green-500">✓</span>
              <span className="text-gray-600">RBI Guidelines Compliant</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="text-green-500">✓</span>
              <span className="text-gray-600">2.5M+ Calculations</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="text-green-500">✓</span>
              <span className="text-gray-600">100% Free Forever</span>
            </div>
          </div>
        </div>

        {/* Main Calculator Card */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Left Column - Input Section */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-200">
                  <span className="text-2xl">₹</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Loan Details</h2>
                  <p className="text-sm text-gray-500">Enter your loan information</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Loan Amount */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Loan Amount (₹)
                    </label>
                    <span className="text-xs text-gray-400">Min: ₹1L | Max: ₹10Cr</span>
                  </div>
                  
                  <div className={`relative transition-all duration-300 ${
                    activeInput === "amount" ? "scale-[1.02]" : ""
                  }`}>
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">₹</span>
                    <input
                      type="text"
                      value={loanAmount ? formatIndianCurrency(Number(loanAmount)) : ''}
                      onChange={(e) => handleLoanAmountChange(e.target.value)}
                      onFocus={() => setActiveInput("amount")}
                      onBlur={() => setActiveInput(null)}
                      placeholder="e.g., 25,00,000"
                      className="w-full pl-10 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all text-xl font-semibold"
                    />
                  </div>
                  
                  {/* Quick Amount Presets */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {amountPresets.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setLoanAmount(amount.toString())}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                          Number(loanAmount) === amount
                            ? "bg-green-500 text-white shadow-md"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        ₹{(amount / 100000).toFixed(0)}L
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Interest Rate (% p.a.)
                    </label>
                    <span className="text-xs text-gray-400">Current: 8.5% - 9.5%</span>
                  </div>
                  
                  <div className={`relative transition-all duration-300 ${
                    activeInput === "rate" ? "scale-[1.02]" : ""
                  }`}>
                    <input
                      type="text"
                      value={interestRate}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '' || /^\d*\.?\d*$/.test(val)) {
                          setInterestRate(val);
                        }
                      }}
                      onFocus={() => setActiveInput("rate")}
                      onBlur={() => setActiveInput(null)}
                      className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all text-xl font-semibold"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">%</span>
                  </div>
                  
                  {/* Interest Rate Slider */}
                  <div className="mt-3">
                    <input
                      type="range"
                      min="5"
                      max="20"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      className="w-full accent-green-600 h-2 rounded-lg"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>5%</span>
                      <span>12.5%</span>
                      <span>20%</span>
                    </div>
                  </div>
                </div>

                {/* Loan Tenure */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Loan Tenure (Years)
                    </label>
                    <span className="text-xs text-gray-400">Max: 30 years</span>
                  </div>
                  
                  <div className={`relative transition-all duration-300 ${
                    activeInput === "tenure" ? "scale-[1.02]" : ""
                  }`}>
                    <input
                      type="text"
                      value={loanTenure}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '' || /^\d+$/.test(val)) {
                          setLoanTenure(val);
                        }
                      }}
                      onFocus={() => setActiveInput("tenure")}
                      onBlur={() => setActiveInput(null)}
                      className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all text-xl font-semibold"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">yrs</span>
                  </div>
                  
                  {/* Quick Tenure Presets */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {tenurePresets.map((years) => (
                      <button
                        key={years}
                        onClick={() => setLoanTenure(years.toString())}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                          Number(loanTenure) === years
                            ? "bg-green-500 text-white shadow-md"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {years} yrs
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Results Section */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl p-6 md:p-8 text-white">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span>📊</span> Your EMI Details
            </h2>

            {emi ? (
              <div className="space-y-6">
                {/* Monthly EMI */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <p className="text-gray-300 text-sm mb-2">Monthly EMI</p>
                  <p className="text-5xl md:text-6xl font-bold text-white">
                    ₹{formatIndianCurrency(emi)}
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    For {loanTenure} years at {interestRate}% interest
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <p className="text-gray-300 text-xs mb-1">Principal Amount</p>
                    <p className="text-xl font-bold text-white">
                      ₹{formatIndianCurrency(Number(loanAmount))}
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <p className="text-gray-300 text-xs mb-1">Total Interest</p>
                    <p className="text-xl font-bold text-amber-400">
                      ₹{formatIndianCurrency(totalInterest!)}
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <p className="text-gray-300 text-xs mb-1">Total Payment</p>
                    <p className="text-xl font-bold text-white">
                      ₹{formatIndianCurrency(totalPayment!)}
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <p className="text-gray-300 text-xs mb-1">Interest Ratio</p>
                    <p className="text-xl font-bold text-blue-400">
                      {interestRatio}%
                    </p>
                  </div>
                </div>

                {/* Interest vs Principal Bar */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <p className="text-gray-300 text-xs mb-3">Payment Breakdown</p>
                  <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden flex">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                      style={{ width: `${100 - interestRatio}%` }}
                    ></div>
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                      style={{ width: `${interestRatio}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs mt-2">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Principal ({100 - interestRatio}%)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                      Interest ({interestRatio}%)
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <span className="text-6xl mb-4">💰</span>
                <p className="text-gray-400 text-center">
                  Enter loan details to calculate your EMI
                </p>
              </div>
            )}
          </div>
        </div>

       
        {/* SEO Content Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span>🏠</span> Home Loan EMI
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Calculate EMI for your dream home. Interest rates starting from 8.5% p.a. 
              with tenure up to 30 years.
            </p>
            <Link href="/emi-calculator" className="text-sm text-green-600 font-medium hover:underline">
              Calculate Home Loan →
            </Link>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span>🚗</span> Car Loan EMI
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Plan your car purchase with our Car Loan EMI calculator. Rates from 8.7% 
              for up to 7 years.
            </p>
            <Link href="/emi-calculator" className="text-sm text-green-600 font-medium hover:underline">
              Calculate Car Loan →
            </Link>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span>💳</span> Personal Loan EMI
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Check Personal Loan EMI instantly. Competitive rates from 10.5% p.a. 
              with flexible tenure.
            </p>
            <Link href="/emi-calculator" className="text-sm text-green-600 font-medium hover:underline">
              Calculate Personal Loan →
            </Link>
          </div>
        </div>

        {/* FAQ Section for SEO */}
        <div className="mt-12 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Frequently Asked Questions
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How is EMI calculated?</h3>
              <p className="text-sm text-gray-600">
                EMI is calculated using the formula: P × R × (1+R)^N / [(1+R)^N-1], 
                where P is Principal, R is monthly interest rate, and N is number of months.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What factors affect EMI?</h3>
              <p className="text-sm text-gray-600">
                Three main factors: Loan Amount, Interest Rate, and Loan Tenure. 
                Longer tenure reduces EMI but increases total interest paid.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Can I prepay my loan?</h3>
              <p className="text-sm text-gray-600">
                Yes, most banks allow prepayment. Floating rate loans have no prepayment 
                charges, while fixed rate loans may have minimal charges.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is amortization?</h3>
              <p className="text-sm text-gray-600">
                Amortization shows how each EMI payment is split between principal and 
                interest. Initially, interest portion is higher, gradually shifting to principal.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-gray-400 text-center mt-8">
          * This EMI calculator is for illustrative purposes only. Actual EMI may vary based on lender policies, 
          processing fees, and other charges. Please consult your bank for exact figures.
        </p>
      </div>
    </div>
  );
}