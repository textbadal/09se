"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { 
  Calculator, 
  Layers, 
  MapPin, 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  Wrench, 
  Paintbrush, 
  ShieldAlert,
  ArrowRight,
  Info
} from "lucide-react";

/* ==========================================
   TYPES & INTERFACES
   ========================================== */
export type ConstructionQuality = "basic" | "standard" | "premium" | "luxury";
export type LocationTier = "tier1" | "tier2" | "tier3" | "rural";

export interface EstimateResult {
  plotArea: number;
  totalArea: number;
  costPerSqft: number;
  totalCost: number;
  civilCost: number;
  finishingCost: number;
  mepCost: number;
  contingencyCost: number;
  timelineRange: string;
}

/* ==========================================
   CONFIG & CALCULATION ENGINE
   ========================================== */
const BASE_RATES: Record<ConstructionQuality, number> = {
  basic: 1500,
  standard: 1800,
  premium: 2200,
  luxury: 3000,
};

const LOCATION_MULTIPLIERS: Record<LocationTier, number> = {
  tier1: 1.3,
  tier2: 1.0,
  tier3: 0.85,
  rural: 0.75,
};

// Budget Allocation Percentages
const ALLOCATIONS = {
  civil: 0.52,       // 52% Core Structure, Masonry, Foundation
  finishing: 0.28,   // 28% Flooring, Painting, False Ceiling, Woodwork
  mep: 0.15,         // 15% Mechanical, Electrical, Plumbing
  contingency: 0.05, // 5% Buffer for market inflation / unexpected site costs
};

/* ==========================================
   MAIN COMPONENT
   ========================================== */
export default function CostEstimatorPage() {
  // Input States
  const [length, setLength] = useState<number>(30);
  const [width, setWidth] = useState<number>(40);
  const [floors, setFloors] = useState<number>(1);
  const [quality, setQuality] = useState<ConstructionQuality>("standard");
  const [location, setLocation] = useState<LocationTier>("tier2");

  // Interactive UI States
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  // Compute live responsive metrics
  const estimate: EstimateResult = useMemo(() => {
    const plotArea = length * width;
    const totalArea = plotArea * floors;
    const rawRate = BASE_RATES[quality];
    const multiplier = LOCATION_MULTIPLIERS[location];
    const costPerSqft = Math.round(rawRate * multiplier);
    
    const totalCost = totalArea * costPerSqft;
    
    // Calculate broken-down graphical categories
    const civilCost = Math.round(totalCost * ALLOCATIONS.civil);
    const finishingCost = Math.round(totalCost * ALLOCATIONS.finishing);
    const mepCost = Math.round(totalCost * ALLOCATIONS.mep);
    const contingencyCost = Math.round(totalCost * ALLOCATIONS.contingency);

    // Timeline duration approximation framework
    const baseMonths = Math.round((totalArea / 600) * (floors * 0.85));
    const timelineRange = `${Math.max(6, baseMonths - 1)} to ${baseMonths + 2}`;

    return {
      plotArea,
      totalArea,
      costPerSqft,
      totalCost,
      civilCost,
      finishingCost,
      mepCost,
      contingencyCost,
      timelineRange,
    };
  }, [length, width, floors, quality, location]);

  // Trigger slight loading animation shimmer when sliders/buttons toggle
  useEffect(() => {
    setIsCalculating(true);
    const timer = setTimeout(() => setIsCalculating(false), 200);
    return () => clearTimeout(timer);
  }, [length, width, floors, quality, location]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans pb-16">
      
      {/* Visual Hero Header */}
      <div className="bg-slate-900 text-white py-12 px-4 border-b border-slate-800">
        <div className="max-w-6xl mx-auto text-center md:text-left md:flex justify-between items-center">
          <div>
            <span className="bg-blue-500/10 text-blue-400 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
              Step 1: Budget Forecast Engine
            </span>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mt-2 text-white">
              Instant Construction Cost Estimator
            </h1>
            <p className="text-slate-400 text-sm mt-2 max-w-xl leading-relaxed">
              Plan your structural investments safely. Adjust sliders to map dynamic 
              budget calculations across foundational components instantly.
            </p>
          </div>
          <div className="hidden md:block bg-slate-800/50 border border-slate-700/60 p-4 rounded-xl text-right">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest block">Market Baseline Index</span>
            <span className="text-xl font-black text-emerald-400">Live Q3 2026</span>
          </div>
        </div>
      </div>

      {/* Calculator Interface Workspace Layout */}
      <div className="max-w-6xl mx-auto px-4 -mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Grid: Parameter Input Sliders Panel */}
        <div className="lg:col-span-5 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Calculator className="text-blue-600 w-5 h-5" />
            <h2 className="font-bold text-sm text-slate-900 uppercase tracking-wider">Configure Plot Specifications</h2>
          </div>

          {/* Plot Length Slider Input */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-600">
              <label htmlFor="range-length" className="flex items-center gap-1">Plot Length <span className="text-slate-400 font-normal">(ft)</span></label>
              <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-mono text-sm">{length} ft</span>
            </div>
            <input
              id="range-length"
              type="range"
              min="15"
              max="120"
              step="5"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
            />
          </div>

          {/* Plot Width Slider Input */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-600">
              <label htmlFor="range-width" className="flex items-center gap-1">Plot Width <span className="text-slate-400 font-normal">(ft)</span></label>
              <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-mono text-sm">{width} ft</span>
            </div>
            <input
              id="range-width"
              type="range"
              min="15"
              max="100"
              step="5"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
            />
          </div>

          {/* Floor Elevation Selector Blocks */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-600 block">Number of Floors</span>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFloors(f)}
                  className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all ${
                    floors === f 
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm" 
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {f === 1 ? "Ground" : `G + ${f - 1}`}
                </button>
              ))}
            </div>
          </div>

          {/* Quality Specifications Cards */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-600 flex items-center justify-between">
              <span>Material Specification Grade</span>
              <button 
                type="button"
                onMouseEnter={() => setShowTooltip("quality")}
                onMouseLeave={() => setShowTooltip(null)}
                className="text-slate-400 hover:text-slate-600"
                aria-label="Quality info"
              >
                <Info className="w-3.5 h-3.5" />
              </button>
            </span>
            {showTooltip === "quality" && (
              <div className="bg-slate-900 text-white p-2 rounded text-[10px] leading-relaxed absolute z-10 max-w-xs shadow-lg">
                Basic = Brick/Local tiles. Standard = Branded items (Finolex/Cera). Premium = Modular setups & Marble layout. Luxury = Italian finish, automated systems.
              </div>
            )}
            <div className="grid grid-cols-2 gap-2">
              {(["basic", "standard", "premium", "luxury"] as ConstructionQuality[]).map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setQuality(q)}
                  className={`p-3 text-left rounded-xl border transition-all flex flex-col justify-between ${
                    quality === q 
                      ? "bg-slate-900 text-white border-slate-900 shadow-md" 
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-xs font-bold capitalize flex items-center gap-1">
                    {q === "luxury" && <Sparkles className="w-3 h-3 text-amber-400" />}
                    {q}
                  </span>
                  <span className={`text-[10px] mt-1 font-mono ${quality === q ? "text-slate-300" : "text-slate-400"}`}>
                    ₹{BASE_RATES[q]}/sqft
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Logistical Zone Dropdown selection */}
          <div className="space-y-2">
            <label htmlFor="select-zone" className="text-xs font-bold text-slate-600 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" /> Logistical Zone Multiplier
            </label>
            <select
              id="select-zone"
              value={location}
              onChange={(e) => setLocation(e.target.value as LocationTier)}
              className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-xs font-bold text-slate-700 cursor-pointer shadow-xs"
            >
              <option value="tier1">Metros / Tier 1 Cities (High Logistics, Labor Cost)</option>
              <option value="tier2">Urban Centers / Tier 2 Cities (Baseline Standard)</option>
              <option value="tier3">Semi-Urban / Towns Tier 3</option>
              <option value="rural">Rural Outskirts (Low Material Handling Logistics)</option>
            </select>
          </div>
        </div>

        {/* Right Grid: Visual Financial Dashboard Analysis Output */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Forecast Valuation Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 overflow-hidden relative">
            <div className={`transition-opacity duration-200 ${isCalculating ? "opacity-40" : "opacity-100"}`}>
              
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                Total Budget Allocation Summary
              </span>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between border-b border-slate-100 pb-5 gap-1">
                <span className="text-4xl font-black text-slate-900 tracking-tight">
                  ₹{estimate.totalCost.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                  ≈ ₹{estimate.costPerSqft.toLocaleString()} per Sq.Ft
                </span>
              </div>

              {/* High level structural specs micro-tags */}
              <div className="grid grid-cols-3 gap-2 py-4 text-center border-b border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Super Built Area</span>
                  <strong className="text-slate-800 text-sm font-bold">{estimate.totalArea.toLocaleString()} sq.ft</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Plot Footprint</span>
                  <strong className="text-slate-800 text-sm font-bold">{estimate.plotArea.toLocaleString()} sq.ft</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Est. Timeline</span>
                  <strong className="text-blue-600 text-sm font-bold">{estimate.timelineRange} mos</strong>
                </div>
              </div>

              {/* Categorical Breakdown Allocation Grid Matrix */}
              <div className="mt-6 space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Cost Segregation Blueprint</h3>
                
                {/* Civil Cost */}
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Layers className="w-4 h-4" /></div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Structural Civil Work</h4>
                      <p className="text-[10px] text-slate-400 font-medium">Foundation, Brickwork, RCC Frame (52%)</p>
                    </div>
                  </div>
                  <strong className="text-xs font-bold text-slate-900">₹{estimate.civilCost.toLocaleString()}</strong>
                </div>

                {/* Finishing Cost */}
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Paintbrush className="w-4 h-4" /></div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Interior & Exterior Finishes</h4>
                      <p className="text-[10px] text-slate-400 font-medium">Flooring, Paint, Plaster, Doors (28%)</p>
                    </div>
                  </div>
                  <strong className="text-xs font-bold text-slate-900">₹{estimate.finishingCost.toLocaleString()}</strong>
                </div>

                {/* MEP Cost */}
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Wrench className="w-4 h-4" /></div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">MEP Infrastructure Services</h4>
                      <p className="text-[10px] text-slate-400 font-medium">Electrical Piping, Plumbing, Sanitary (15%)</p>
                    </div>
                  </div>
                  <strong className="text-xs font-bold text-slate-900">₹{estimate.mepCost.toLocaleString()}</strong>
                </div>

                {/* Contingency Buffer Cost */}
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-rose-50 text-rose-600 rounded-lg"><ShieldAlert className="w-4 h-4" /></div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Contingency Escalation Buffer</h4>
                      <p className="text-[10px] text-slate-400 font-medium">Market Volatility, Safety Index Margin (5%)</p>
                    </div>
                  </div>
                  <strong className="text-xs font-bold text-slate-900">₹{estimate.contingencyCost.toLocaleString()}</strong>
                </div>
              </div>

            </div>
          </div>

          {/* Core Next Step CTA Block Redirecting to Page 2 (BOQ Engine) */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-6 text-white flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-black text-base tracking-tight flex items-center justify-center sm:justify-start gap-2">
                <span>📋</span> Ready for Line-Item Material Breakdowns?
              </h3>
              <p className="text-blue-100 text-xs font-medium max-w-md leading-relaxed">
                Convert this high-level estimation forecast into a legally compliant, structural engineering Bill of Quantities breakdown sheet.
              </p>
            </div>
            <Link
              href="/boq-generator"
              className="bg-white text-blue-700 font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-md hover:bg-blue-50 transition-all flex items-center gap-2 whitespace-nowrap group shrink-0"
            >
              Generate Detailed BOQ
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}