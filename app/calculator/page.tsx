"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/* TYPES */
type Materials = {
  cement: number;
  steel: number;
  sand: number;
  aggregate: number;
  bricks: number;
};

type Result = {
  totalArea: number;
  plotArea: number;
  length: number;
  width: number;
  cost: number;
  costPerSqft: number;
  breakdown: {
    material: number;
    labor: number;
    finishing: number;
    architecture: number;
    contingency: number;
  };
  materials: Materials;
  timeline: number;
  savings: number;
} | null;

export default function CalculatorPage() {
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [floors, setFloors] = useState<number>(1);
  const [type, setType] = useState<string>("standard");
  const [location, setLocation] = useState<string>("tier2");
  const [result, setResult] = useState<Result>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [activeTab, setActiveTab] = useState<"cost" | "materials" | "timeline">("cost");

  /* COST RATES with location multiplier */
  const rates: Record<string, number> = {
    basic: 1500,
    standard: 1800,
    premium: 2200,
    luxury: 3000,
  };

  const locationMultiplier: Record<string, number> = {
    tier1: 1.3,
    tier2: 1.0,
    tier3: 0.85,
    rural: 0.75,
  };

  const calculatePlotArea = () => {
    const l = Number(length);
    const w = Number(width);
    if (isNaN(l) || isNaN(w) || l <= 0 || w <= 0) return 0;
    return l * w;
  };

  const calculate = () => {
    const plotArea = calculatePlotArea();
    if (plotArea <= 0) return;

    setIsCalculating(true);

    // Simulate calculation delay for better UX
    setTimeout(() => {
      const totalArea = plotArea * floors;
      const baseRate = rates[type];
      const multiplier = locationMultiplier[location];
      const adjustedRate = baseRate * multiplier;
      const cost = Math.round(totalArea * adjustedRate);

      const factor = totalArea / 1000;

      /* Enhanced MATERIAL ESTIMATION */
      const materials: Materials = {
        cement: Math.round(400 * factor * (type === "premium" ? 1.2 : 1)),
        steel: Number((4.5 * factor * (floors > 1 ? 1.15 : 1)).toFixed(2)),
        sand: Math.round(2000 * factor),
        aggregate: Math.round(1500 * factor),
        bricks: Math.round(8000 * factor),
      };

      /* Detailed COST BREAKDOWN */
      const breakdown = {
        material: Math.round(cost * 0.45),
        labor: Math.round(cost * 0.25),
        finishing: Math.round(cost * 0.15),
        architecture: Math.round(cost * 0.08),
        contingency: Math.round(cost * 0.07),
      };

      /* Construction Timeline Estimate (in months) */
      const timeline = Math.round((totalArea / 500) * (floors * 0.8));

      /* Potential Savings with Optimization */
      const savings = Math.round(cost * 0.12);

      setResult({
        totalArea,
        plotArea,
        length: Number(length),
        width: Number(width),
        cost,
        costPerSqft: adjustedRate,
        materials,
        breakdown,
        timeline,
        savings,
      });

      setIsCalculating(false);
    }, 600);
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    const plotArea = calculatePlotArea();
    if (plotArea > 0) {
      calculate();
    }
  }, [length, width, floors, type, location]);

  const plotArea = calculatePlotArea();
  const isValidPlot = plotArea > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
            <span className="text-2xl">🧮</span>
            <span className="text-xs font-bold tracking-wider text-blue-700 uppercase">
              Professional Estimation Tool
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Smart Construction Cost Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enter your plot dimensions to get accurate material estimates, cost breakdown, and construction timeline.
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          
          {/* Input Section */}
          <div className="p-6 md:p-8 bg-gradient-to-r from-gray-50 to-white border-b">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Length Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Plot Length (ft)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="e.g., 40"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full pl-4 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg font-medium"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">ft</span>
                </div>
              </div>

              {/* Width Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Plot Width (ft)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="e.g., 30"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full pl-4 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg font-medium"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">ft</span>
                </div>
              </div>

              {/* Floors Select */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Number of Floors
                </label>
                <select
                  value={floors}
                  onChange={(e) => setFloors(Number(e.target.value))}
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-700 font-medium cursor-pointer"
                >
                  <option value={1}>🏠 Ground Floor Only</option>
                  <option value={2}>🏡 G + 1 Floor</option>
                  <option value={3}>🏢 G + 2 Floors</option>
                  <option value={4}>🏗️ G + 3 Floors</option>
                </select>
              </div>

              {/* Construction Type */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Construction Quality
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-700 font-medium cursor-pointer"
                >
                  <option value="basic">Basic</option>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>

              {/* Location */}
              <div className="space-y-2 md:col-span-2 lg:col-span-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Location Tier
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-700 font-medium cursor-pointer"
                >
                  <option value="tier1">🏙️ Metro City (Tier 1)</option>
                  <option value="tier2">🌆 Urban (Tier 2)</option>
                  <option value="tier3">🏘️ Semi-Urban (Tier 3)</option>
                  <option value="rural">🌾 Rural Area</option>
                </select>
              </div>
            </div>

            {/* Quick Stats Bar */}
            {isValidPlot && (
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                <span className="inline-flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Plot Area: <strong>{plotArea.toLocaleString()} sq ft</strong> ({Number(length)}&apos; × {Number(width)}&apos;)
                </span>
                <span className="text-gray-300 hidden sm:inline">•</span>
                <span className="inline-flex items-center gap-1">
                  Total Built-up: <strong>{(plotArea * floors).toLocaleString()} sq ft</strong>
                </span>
                <span className="text-gray-300 hidden sm:inline">•</span>
                <span>Rate: <strong>₹{Math.round(rates[type] * locationMultiplier[location]).toLocaleString()}/sqft</strong></span>
              </div>
            )}
          </div>

          {/* Results Section */}
          {result ? (
            <div className="p-6 md:p-8">
              
              {/* Total Cost Card */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 md:p-8 text-white mb-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <p className="text-blue-100 text-sm mb-1">Total Estimated Cost</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl md:text-5xl font-bold">₹{result.cost.toLocaleString()}</span>
                      <span className="text-blue-200 text-sm">approx.</span>
                    </div>
                    <p className="text-blue-100 text-sm mt-2">
                      Plot: {result.length}&apos; × {result.width}&apos; ({result.plotArea.toLocaleString()} sq ft) • Built-up: {result.totalArea.toLocaleString()} sq ft
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
                      <p className="text-blue-100 text-xs">Per Sq Ft</p>
                      <p className="text-xl font-bold">₹{result.costPerSqft.toLocaleString()}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
                      <p className="text-blue-100 text-xs">Timeline</p>
                      <p className="text-xl font-bold">{result.timeline} mos</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 mb-6">
                {(["cost", "materials", "timeline"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 font-medium text-sm transition-all ${
                      activeTab === tab
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab === "cost" && "💰 Cost Breakdown"}
                    {tab === "materials" && "🧱 Material Estimate"}
                    {tab === "timeline" && "📅 Timeline & Savings"}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="mb-8">
                {activeTab === "cost" && (
                  <div className="space-y-4">
                    {Object.entries(result.breakdown).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">
                            {key === "material" && "🧱"}
                            {key === "labor" && "👷"}
                            {key === "finishing" && "🎨"}
                            {key === "architecture" && "📐"}
                            {key === "contingency" && "🔒"}
                          </span>
                          <span className="font-medium text-gray-700 capitalize">{key}</span>
                          <span className="text-xs text-gray-500">
                            ({Math.round((value / result.cost) * 100)}%)
                          </span>
                        </div>
                        <span className="font-semibold text-gray-900">₹{value.toLocaleString()}</span>
                      </div>
                    ))}
                    
                    {/* Progress Bar */}
                    <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-amber-600">💡</span>
                        <span className="font-medium text-amber-800">Potential Savings</span>
                      </div>
                      <p className="text-sm text-amber-700">
                        Optimize your plan and save up to <strong>₹{result.savings.toLocaleString()}</strong> with professional design consultation.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "materials" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(result.materials).map(([key, value]) => (
                      <div key={key} className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-2xl mb-2 block">
                              {key === "cement" && "🧱"}
                              {key === "steel" && "🔩"}
                              {key === "sand" && "🏖️"}
                              {key === "aggregate" && "🪨"}
                              {key === "bricks" && "🧱"}
                            </span>
                            <p className="font-semibold text-gray-800 capitalize">{key}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">
                              {typeof value === "number" && key === "steel" 
                                ? value.toFixed(2) 
                                : value.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500">
                              {key === "cement" && "bags"}
                              {key === "steel" && "tons"}
                              {key === "sand" && "cft"}
                              {key === "aggregate" && "cft"}
                              {key === "bricks" && "units"}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-blue-500 h-1.5 rounded-full"
                            style={{ 
                              width: `${Math.min((value / (key === "cement" ? 1000 : key === "steel" ? 10 : 5000)) * 100, 100)}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "timeline" && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-4xl">📅</span>
                        <div>
                          <p className="text-2xl font-bold text-gray-800">{result.timeline} Months</p>
                          <p className="text-sm text-gray-600">Estimated Construction Timeline</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {["Foundation", "Structure", "Masonry", "Plumbing & Electrical", "Finishing", "Handover"].map((phase, i) => (
                          <div key={phase} className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              i < 2 ? "bg-green-500 text-white" : 
                              i < 4 ? "bg-yellow-500 text-white" : 
                              "bg-gray-300 text-gray-600"
                            }`}>
                              {i + 1}
                            </div>
                            <span className="text-sm text-gray-700">{phase}</span>
                            <span className="text-xs text-gray-400 ml-auto">
                              {Math.round(result.timeline * (0.15 + i * 0.17))} weeks
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA Section */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`https://wa.me/916205820278?text=I%20want%20house%20design%20for%20${result.length}%20x%20${result.width}%20plot%20(${result.plotArea}%20sq%20ft)%20with%20estimated%20cost%20₹${result.cost.toLocaleString()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white text-center py-4 rounded-xl font-semibold transition-all transform hover:scale-[1.02] shadow-lg shadow-green-200 flex items-center justify-center gap-2"
                >
                  <span>💬</span>
                  Get Professional House Plan
                  <span>→</span>
                </a>
                <Link
                  href="/services/design"
                  className="flex-1 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 text-center py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <span>📋</span>
                  View Design Services
                </Link>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-gray-400 text-center mt-6">
                * Estimates are indicative. Final costs may vary based on site conditions and specifications.
              </p>

            </div>
          ) : (
            <div className="p-12 text-center">
              {isCalculating ? (
                <div className="space-y-4">
                  <div className="inline-block animate-spin text-4xl">⚙️</div>
                  <p className="text-gray-500">Calculating your estimate...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <span className="text-6xl">📐</span>
                  <p className="text-gray-500">Enter plot length and width above to get started</p>
                  <p className="text-xs text-gray-400">Example: 40 ft × 30 ft = 1200 sq ft</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span>✓</span> 5,000+ Estimates Generated
          </div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <span>✓</span> Industry Standard Rates
          </div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <span>✓</span> Updated for 2024
          </div>
        </div>

      </div>
    </div>
  );
}