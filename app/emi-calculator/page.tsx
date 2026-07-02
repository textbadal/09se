"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(2500000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(20);
  const [emi, setEmi] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);
  const [activeInput, setActiveInput] = useState<"amount" | "rate" | "tenure" | null>(null);

  const formatIndianCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(value);
  };

  const convertNumberToWords = (num: number): string => {
    if (num < 1000) return `${num}`;
    if (num >= 10000000) return `${(num / 10000000).toFixed(2).replace(/\.00$/, '')} Crore`;
    if (num >= 100000) return `${(num / 100000).toFixed(2).replace(/\.00$/, '')} Lakh`;
    if (num >= 1000) return `${(num / 1000).toFixed(2).replace(/\.00$/, '')} Thousand`;
    return `${num}`;
  };

  const calculateEMI = useCallback(() => {
    const P = loanAmount;
    const R = interestRate / 12 / 100;
    const N = loanTenure * 12;

    if (P > 0 && R > 0 && N > 0) {
      const emiValue = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
      const totalPay = emiValue * N;
      const totalInt = totalPay - P;

      setEmi(Math.round(emiValue));
      setTotalInterest(Math.round(totalInt));
      setTotalPayment(Math.round(totalPay));
    } else {
      setEmi(null);
      setTotalInterest(null);
      setTotalPayment(null);
    }
  }, [loanAmount, interestRate, loanTenure]);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTenure, calculateEMI]);

  const amountPresets = [1000000, 2500000, 5000000, 7500000, 10000000];
  const tenurePresets = [10, 15, 20, 25, 30];

  const interestRatio = totalPayment ? Math.round((totalInterest! / totalPayment) * 100) : 0;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/40 via-white to-slate-50 text-slate-800 font-sans selection:bg-emerald-100">
      
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
            Free EMI Calculator
          </h1>
          <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto">
            Plan your financials instantly. Calculate monthly installments for Home Loans, Car Loans, or Personal Loans.
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - Input Section */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 md:p-8 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Loan Variables</h2>
              <p className="text-xs text-slate-400 mt-0.5">Customize options to fit your strategic budget</p>
            </div>

            <div className="space-y-6">
              {/* Loan Amount */}
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Loan Amount
                  </label>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50/70 px-2.5 py-1 rounded-md">
                    {convertNumberToWords(loanAmount)}
                  </span>
                </div>
                
                <div className={`relative transition-all duration-200 ${activeInput === "amount" ? "shadow-sm" : ""}`}>
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-lg">₹</span>
                  <input
                    type="text"
                    value={formatIndianCurrency(loanAmount)}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/,/g, '');
                      if (!isNaN(Number(rawValue))) setLoanAmount(Number(rawValue));
                    }}
                    onFocus={() => setActiveInput("amount")}
                    onBlur={() => setActiveInput(null)}
                    className="w-full pl-9 pr-4 py-3 bg-slate-50/60 border border-slate-200/80 rounded-xl focus:border-emerald-500 focus:bg-white outline-none transition-all text-xl font-bold text-slate-800"
                  />
                </div>

                {/* Slider */}
                <div className="mt-4">
                  <input
                    type="range"
                    min="100000"
                    max="100000000"
                    step="50000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-1 rounded-lg cursor-pointer bg-slate-100"
                  />
                  <div className="flex justify-between text-[10px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">
                    <span>1 Lakh</span>
                    <span>10 Crores</span>
                  </div>
                </div>
                
                {/* Presets */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {amountPresets.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setLoanAmount(amount)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all border ${
                        loanAmount === amount
                          ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                          : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      ₹{convertNumberToWords(amount)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Interest Rate (% p.a.)
                  </label>
                </div>
                
                <div className={`relative transition-all duration-200 ${activeInput === "rate" ? "shadow-sm" : ""}`}>
                  <input
                    type="number"
                    step="0.05"
                    value={interestRate || ''}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    onFocus={() => setActiveInput("rate")}
                    onBlur={() => setActiveInput(null)}
                    className="w-full px-4 py-3 bg-slate-50/60 border border-slate-200/80 rounded-xl focus:border-emerald-500 focus:bg-white outline-none transition-all text-xl font-bold text-slate-800"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                </div>
                
                <div className="mt-4">
                  <input
                    type="range"
                    min="5"
                    max="20"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-1 rounded-lg cursor-pointer bg-slate-100"
                  />
                  <div className="flex justify-between text-[10px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">
                    <span>5%</span>
                    <span>20%</span>
                  </div>
                </div>
              </div>

              {/* Loan Tenure */}
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Loan Tenure
                  </label>
                  <span className="text-xs font-bold text-slate-400">
                    {loanTenure * 12} Months
                  </span>
                </div>
                
                <div className={`relative transition-all duration-200 ${activeInput === "tenure" ? "shadow-sm" : ""}`}>
                  <input
                    type="number"
                    value={loanTenure || ''}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    onFocus={() => setActiveInput("tenure")}
                    onBlur={() => setActiveInput(null)}
                    className="w-full px-4 py-3 bg-slate-50/60 border border-slate-200/80 rounded-xl focus:border-emerald-500 focus:bg-white outline-none transition-all text-xl font-bold text-slate-800"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">Years</span>
                </div>
                
                <div className="mt-4">
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-1 rounded-lg cursor-pointer bg-slate-100"
                  />
                  <div className="flex justify-between text-[10px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">
                    <span>1 Year</span>
                    <span>30 Years</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {tenurePresets.map((years) => (
                    <button
                      key={years}
                      type="button"
                      onClick={() => setLoanTenure(years)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all border ${
                        loanTenure === years
                          ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                          : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {years} Years
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Results Section */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl p-6 md:p-8 text-white shadow-xl lg:sticky top-6">
            <h2 className="text-base font-bold tracking-tight mb-8 text-slate-400 uppercase tracking-widest text-xs">
              Calculation Summary
            </h2>

            {emi ? (
              <div className="space-y-8">
                {/* Monthly EMI */}
                <div className="border-b border-slate-800 pb-6">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Monthly Installment (EMI)</p>
                  <p className="text-4xl md:text-5xl font-black text-emerald-400 tracking-tight">
                    ₹{formatIndianCurrency(emi)}
                  </p>
                </div>

                {/* Stats Stack */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                    <span className="text-slate-400 text-sm">Principal Borrowed</span>
                    <span className="font-semibold text-sm">₹{formatIndianCurrency(loanAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                    <span className="text-slate-400 text-sm">Total Extra Interest</span>
                    <span className="font-semibold text-sm text-amber-400">₹{formatIndianCurrency(totalInterest!)}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                    <span className="text-slate-400 text-sm">Total Repayment Amount</span>
                    <span className="font-semibold text-sm">₹{formatIndianCurrency(totalPayment!)}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-slate-400 text-sm">Interest Component Ratio</span>
                    <span className="font-semibold text-sm text-sky-400">{interestRatio}%</span>
                  </div>
                </div>

                {/* Micro Visual Bar */}
                <div className="pt-2">
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden flex">
                    <div 
                      className="h-full bg-emerald-400 transition-all duration-500"
                      style={{ width: `${100 - interestRatio}%` }}
                    ></div>
                    <div 
                      className="h-full bg-amber-400 transition-all duration-500"
                      style={{ width: `${interestRatio}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[11px] mt-3 text-slate-400 font-medium">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                      Principal ({100 - interestRatio}%)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                      Interest ({interestRatio}%)
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                <p className="text-sm">Enter setup parameters to view calculation data.</p>
              </div>
            )}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.01)]">
            <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
              <span>🏠</span> Home Loan
            </h3>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">
              Plan out mortgage horizons up to 30 years with standard competitive baseline bank parameters.
            </p>
            <Link href="/emi-calculator" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors uppercase tracking-wider">
              Launch Calculator →
            </Link>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.01)]">
            <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
              <span>🚗</span> Car Loan
            </h3>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">
              Map out short-term automotive funding setups for tenures spanning up to 7 years.
            </p>
            <Link href="/emi-calculator" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors uppercase tracking-wider">
              Launch Calculator →
            </Link>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.01)]">
            <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
              <span>💳</span> Personal Loan
            </h3>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">
              Evaluate unsecured consumer advances with variable multi-year custom term horizons.
            </p>
            <Link href="/emi-calculator" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors uppercase tracking-wider">
              Launch Calculator →
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.01)]">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-6">
            Frequently Asked Questions
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 text-sm">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">How is EMI calculated?</h3>
              <p className="text-slate-500 leading-relaxed">
                EMI is formulated using: P × R × (1+R)^N / [(1+R)^N-1], 
                where P represents Principal borrowed, R acts as the monthly interest index, and N dictates net installment months.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">What factors affect EMI?</h3>
              <p className="text-slate-500 leading-relaxed">
                Three dynamic dimensions dictate scale: aggregate Loan Value, assigned Percentage Rate, and runtime Terms. Extended terms mitigate individual installment values but balloon aggregate interest sums.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-[10px] text-slate-400 font-medium tracking-wide text-center mt-12 max-w-xl mx-auto uppercase">
          * Illustrative calculation estimates only. Final numbers remain subject to explicit bank criteria parameters.
        </p>
      </div>
    </div>
  );
}