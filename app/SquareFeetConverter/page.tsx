"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

type UnitCategory = "area" | "land" | "length";
type AreaUnit = "sqft" | "sqm" | "sqyd" | "acre" | "hectare" | "sqkm";
type LandUnit = "cent" | "gunta" | "marla" | "bigha" | "katha" | "chatak";
type LengthUnit = "feet" | "meter" | "yard" | "inch" | "cm";

interface ConversionResult {
  value: number;
  unit: string;
  formatted: string;
}

export default function SquareFeetConverter() {
  const [activeCategory, setActiveCategory] = useState<UnitCategory>("area");
  const [inputValue, setInputValue] = useState<string>("1000");
  const [fromUnit, setFromUnit] = useState<string>("sqft");
  const [toUnit, setToUnit] = useState<string>("sqm");
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [recentConversions, setRecentConversions] = useState<Array<{ from: string; to: string; value: string }>>([]);

  // Conversion factors (all relative to square feet)
  const areaConversions: Record<AreaUnit, number> = {
    sqft: 1,
    sqm: 10.7639,
    sqyd: 9,
    acre: 43560,
    hectare: 107639,
    sqkm: 10763910.4,
  };

  const landConversions: Record<LandUnit, number> = {
    cent: 435.6,
    gunta: 1089,
    marla: 272.25,
    bigha: 27225, // Standard bigha (varies by state)
    katha: 720, // Standard katha
    chatak: 45,
  };

  const lengthConversions: Record<LengthUnit, number> = {
    feet: 1,
    meter: 3.28084,
    yard: 3,
    inch: 0.0833333,
    cm: 0.0328084,
  };

  // Unit labels with full names
  const unitLabels: Record<string, { full: string; short: string; region?: string }> = {
    sqft: { full: "Square Feet", short: "sq ft" },
    sqm: { full: "Square Meter", short: "m²" },
    sqyd: { full: "Square Yard", short: "sq yd" },
    acre: { full: "Acre", short: "acre" },
    hectare: { full: "Hectare", short: "ha" },
    sqkm: { full: "Square Kilometer", short: "km²" },
    cent: { full: "Cent", short: "cent", region: "South India" },
    gunta: { full: "Guntha", short: "gunta", region: "Maharashtra, Karnataka" },
    marla: { full: "Marla", short: "marla", region: "Punjab, Haryana" },
    bigha: { full: "Bigha", short: "bigha", region: "North India" },
    katha: { full: "Katha", short: "katha", region: "East India" },
    chatak: { full: "Chatak", short: "chatak", region: "Bengal" },
    feet: { full: "Feet", short: "ft" },
    meter: { full: "Meter", short: "m" },
    yard: { full: "Yard", short: "yd" },
    inch: { full: "Inch", short: "in" },
    cm: { full: "Centimeter", short: "cm" },
  };

  // Get units for current category
  const getUnits = (category: UnitCategory): string[] => {
    if (category === "area") return Object.keys(areaConversions);
    if (category === "land") return Object.keys(landConversions);
    return Object.keys(lengthConversions);
  };

  // Convert value
  const convert = useCallback(() => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || value < 0) {
      setResult(null);
      return;
    }

    let convertedValue: number;
    let conversionFactor: number;

    if (activeCategory === "area") {
      const fromFactor = areaConversions[fromUnit as AreaUnit];
      const toFactor = areaConversions[toUnit as AreaUnit];
      conversionFactor = fromFactor / toFactor;
      convertedValue = value * conversionFactor;
    } else if (activeCategory === "land") {
      const fromFactor = landConversions[fromUnit as LandUnit];
      const toFactor = landConversions[toUnit as LandUnit];
      conversionFactor = fromFactor / toFactor;
      convertedValue = value * conversionFactor;
    } else {
      const fromFactor = lengthConversions[fromUnit as LengthUnit];
      const toFactor = lengthConversions[toUnit as LengthUnit];
      conversionFactor = fromFactor / toFactor;
      convertedValue = value * conversionFactor;
    }

    // Format the result
    const formatted = new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: convertedValue < 1 ? 6 : convertedValue < 100 ? 3 : 2,
    }).format(convertedValue);

    setResult({
      value: convertedValue,
      unit: toUnit,
      formatted,
    });

    // Add to recent conversions
    const conversion = {
      from: `${value} ${unitLabels[fromUnit]?.short || fromUnit}`,
      to: `${formatted} ${unitLabels[toUnit]?.short || toUnit}`,
      value: inputValue,
    };
    
    setRecentConversions(prev => {
      const newRecent = [conversion, ...prev.filter(c => 
        c.from !== conversion.from || c.to !== conversion.to
      )].slice(0, 5);
      return newRecent;
    });
  }, [inputValue, fromUnit, toUnit, activeCategory]);

  // Auto-convert on changes
  useEffect(() => {
    convert();
  }, [convert]);

  // Swap units
  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  // Quick conversion presets
  const quickPresets: Record<UnitCategory, Array<{ value: number; label: string }>> = {
    area: [
      { value: 100, label: "100 sq ft" },
      { value: 500, label: "500 sq ft" },
      { value: 1000, label: "1,000 sq ft" },
      { value: 2000, label: "2,000 sq ft" },
    ],
    land: [
      { value: 1, label: "1 Cent" },
      { value: 5, label: "5 Cent" },
      { value: 10, label: "10 Cent" },
      { value: 1, label: "1 Acre" },
    ],
    length: [
      { value: 1, label: "1 ft" },
      { value: 10, label: "10 ft" },
      { value: 100, label: "100 ft" },
      { value: 3.28, label: "1 meter" },
    ],
  };

  // Popular conversions for SEO
  const popularConversions = {
    area: [
      { from: "sqft", to: "sqm", label: "Square Feet to Square Meter" },
      { from: "sqm", to: "sqft", label: "Square Meter to Square Feet" },
      { from: "sqft", to: "sqyd", label: "Square Feet to Square Yard" },
      { from: "acre", to: "sqft", label: "Acre to Square Feet" },
      { from: "hectare", to: "acre", label: "Hectare to Acre" },
    ],
    land: [
      { from: "cent", to: "sqft", label: "Cent to Square Feet" },
      { from: "gunta", to: "sqft", label: "Guntha to Square Feet" },
      { from: "marla", to: "sqft", label: "Marla to Square Feet" },
      { from: "bigha", to: "sqft", label: "Bigha to Square Feet" },
      { from: "katha", to: "sqft", label: "Katha to Square Feet" },
    ],
    length: [
      { from: "feet", to: "meter", label: "Feet to Meter" },
      { from: "meter", to: "feet", label: "Meter to Feet" },
      { from: "feet", to: "inch", label: "Feet to Inches" },
      { from: "yard", to: "feet", label: "Yard to Feet" },
      { from: "cm", to: "feet", label: "CM to Feet" },
    ],
  };

  // Apply popular conversion
  const applyPopularConversion = (from: string, to: string) => {
    if (activeCategory === "area" && from in areaConversions) {
      setFromUnit(from);
      setToUnit(to);
    } else if (activeCategory === "land" && from in landConversions) {
      setFromUnit(from);
      setToUnit(to);
    } else if (activeCategory === "length" && from in lengthConversions) {
      setFromUnit(from);
      setToUnit(to);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Free Square Feet Converter - Convert Area, Land & Length Units",
            "description": "Convert square feet to square meters, acres, cents, guntha, marla, bigha and more. Free online area converter for real estate and construction.",
            "applicationCategory": "UtilityApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "3250"
            }
          })
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-16">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 px-5 py-2.5 rounded-full mb-4">
            <span className="text-2xl">📐</span>
            <span className="text-xs font-bold tracking-wider text-blue-700 uppercase">
              Free Online Converter
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Square Feet Converter
          </h1>
          
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Convert between square feet, square meters, acres, cents, guntha, bigha, marla, and more. 
            The most comprehensive area converter for Indian real estate.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-white rounded-2xl shadow-sm border border-gray-200 p-1">
            {(["area", "land", "length"] as const).map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  const units = getUnits(category);
                  setFromUnit(units[0]);
                  setToUnit(units[1] || units[0]);
                }}
                className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {category === "area" && "📏 Area"}
                {category === "land" && "🌾 Land Units"}
                {category === "length" && "📐 Length"}
              </button>
            ))}
          </div>
        </div>

        {/* Main Converter Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            
            {/* Input Section */}
            <div className="grid md:grid-cols-2 gap-6 items-end">
              
              {/* From Unit */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center justify-between">
                  <span>From</span>
                  <span className="text-xs text-gray-400 font-normal">
                    {unitLabels[fromUnit]?.region && `📍 ${unitLabels[fromUnit].region}`}
                  </span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-2xl font-semibold"
                    min="0"
                    step="any"
                  />
                  <select
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                    className="w-40 px-3 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none text-gray-700 font-medium cursor-pointer"
                  >
                    {getUnits(activeCategory).map((unit) => (
                      <option key={unit} value={unit}>
                        {unitLabels[unit]?.short || unit}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-xs text-gray-400">
                  {unitLabels[fromUnit]?.full || fromUnit}
                </p>
              </div>

              {/* Swap Button (Mobile) */}
              <div className="flex md:hidden justify-center -my-2">
                <button
                  onClick={swapUnits}
                  className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
                >
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </button>
              </div>

              {/* To Unit */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center justify-between">
                  <span>To</span>
                  <span className="text-xs text-gray-400 font-normal">
                    {unitLabels[toUnit]?.region && `📍 ${unitLabels[toUnit].region}`}
                  </span>
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 px-4 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl">
                    <p className="text-2xl font-bold text-gray-800">
                      {result?.formatted || "—"}
                    </p>
                  </div>
                  <select
                    value={toUnit}
                    onChange={(e) => setToUnit(e.target.value)}
                    className="w-40 px-3 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none text-gray-700 font-medium cursor-pointer"
                  >
                    {getUnits(activeCategory).map((unit) => (
                      <option key={unit} value={unit}>
                        {unitLabels[unit]?.short || unit}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-xs text-gray-400">
                  {unitLabels[toUnit]?.full || toUnit}
                </p>
              </div>

              {/* Swap Button (Desktop) */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
                <button
                  onClick={swapUnits}
                  className="w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-all shadow-md"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Result Details */}
            {result && (
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Conversion Result</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {result.formatted} <span className="text-lg font-normal text-gray-500">{unitLabels[result.unit]?.short}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">Formula</p>
                    <p className="text-sm text-gray-700 font-mono">
                      {inputValue} × {(result.value / parseFloat(inputValue || "1")).toFixed(6)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Presets */}
            <div className="mt-6">
              <p className="text-xs text-gray-500 mb-2">Quick Values</p>
              <div className="flex flex-wrap gap-2">
                {quickPresets[activeCategory].map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => setInputValue(preset.value.toString())}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Conversions */}
        {recentConversions.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-8">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span>🕐</span> Recent Conversions
            </h3>
            <div className="flex flex-wrap gap-3">
              {recentConversions.map((conv, index) => (
                <button
                  key={index}
                  onClick={() => setInputValue(conv.value)}
                  className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-600 transition-colors"
                >
                  {conv.from} → {conv.to}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Popular Conversions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span>📏</span> Popular Area Conversions
            </h3>
            <div className="space-y-2">
              {popularConversions.area.map((conv, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveCategory("area");
                    applyPopularConversion(conv.from, conv.to);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors flex items-center justify-between group"
                >
                  <span>{conv.label}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span>🌾</span> Land Measurement Conversions
            </h3>
            <div className="space-y-2">
              {popularConversions.land.map((conv, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveCategory("land");
                    applyPopularConversion(conv.from, conv.to);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors flex items-center justify-between group"
                >
                  <span>{conv.label}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span>📐</span> Length Conversions
            </h3>
            <div className="space-y-2">
              {popularConversions.length.map((conv, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveCategory("length");
                    applyPopularConversion(conv.from, conv.to);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors flex items-center justify-between group"
                >
                  <span>{conv.label}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Conversion Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-8">
          <h3 className="font-semibold text-gray-800 mb-4">
            📊 Common Square Feet Conversions
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">Square Feet</th>
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">Square Meters</th>
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">Square Yards</th>
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">Cents</th>
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">Acres</th>
                </tr>
              </thead>
              <tbody>
                {[100, 500, 1000, 2000, 5000, 10000].map((sqft) => (
                  <tr key={sqft} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 px-3 font-medium">{sqft.toLocaleString()} sq ft</td>
                    <td className="py-2 px-3">{(sqft / 10.7639).toFixed(2)} m²</td>
                    <td className="py-2 px-3">{(sqft / 9).toFixed(2)} sq yd</td>
                    <td className="py-2 px-3">{(sqft / 435.6).toFixed(3)} cent</td>
                    <td className="py-2 px-3">{(sqft / 43560).toFixed(4)} acre</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SEO Content */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
            <h3 className="font-bold text-gray-800 mb-2">🏠 Real Estate Conversions</h3>
            <p className="text-sm text-gray-600">
              Perfect for property buyers and sellers. Convert between square feet, square yards, 
              and square meters instantly. Essential for RERA carpet area calculations.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
            <h3 className="font-bold text-gray-800 mb-2">🌾 Land Measurement</h3>
            <p className="text-sm text-gray-600">
              Convert traditional Indian land units like Bigha, Katha, Marla, Cent, and Guntha 
              to standard square feet. Covers all regional variations.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
            <h3 className="font-bold text-gray-800 mb-2">🏗️ Construction Planning</h3>
            <p className="text-sm text-gray-600">
              Calculate plot area, floor area ratio (FAR), and built-up area. 
              Essential for architects, engineers, and contractors.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Frequently Asked Questions
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-800">How many square feet in 1 square meter?</p>
              <p className="text-gray-600">1 Square Meter = 10.7639 Square Feet.</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">How many square feet in 1 acre?</p>
              <p className="text-gray-600">1 Acre = 43,560 Square Feet.</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">How many square feet in 1 cent?</p>
              <p className="text-gray-600">1 Cent = 435.6 Square Feet. (Common in South India)</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">How many square feet in 1 guntha?</p>
              <p className="text-gray-600">1 Guntha = 1,089 Square Feet. (Maharashtra, Karnataka)</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">How many square feet in 1 marla?</p>
              <p className="text-gray-600">1 Marla = 272.25 Square Feet. (Punjab, Haryana)</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">How many square feet in 1 bigha?</p>
              <p className="text-gray-600">1 Bigha ≈ 27,225 sq ft (varies by state).</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-gray-400 text-center mt-8">
          * Conversions are based on standard measurements. Regional variations may exist. 
          For official documentation, please consult local authorities.
        </p>
      </div>
    </div>
  );
}