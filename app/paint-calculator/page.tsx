"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

type Room = {
  id: string;
  name: string;
  length: string;
  width: string;
  height: string;
  doors: string;
  windows: string;
};

type PaintResult = {
  totalArea: number;
  netArea: number;
  paintNeeded: number;
  primerNeeded: number;
  puttyNeeded: number;
  totalCost: number;
  breakdown: {
    paint: number;
    primer: number;
    putty: number;
    labor: number;
  };
  coats: {
    one: number;
    two: number;
    three: number;
  };
};

export default function PaintCalculator() {
  const [rooms, setRooms] = useState<Room[]>([
    { id: "1", name: "Living Room", length: "20", width: "15", height: "10", doors: "1", windows: "2" }
  ]);
  const [paintType, setPaintType] = useState<string>("premium");
  const [finishType, setFinishType] = useState<string>("smooth");
  const [includeCeiling, setIncludeCeiling] = useState<boolean>(true);
  const [includePrimer, setIncludePrimer] = useState<boolean>(true);
  const [includePutty, setIncludePutty] = useState<boolean>(true);
  const [coats, setCoats] = useState<number>(2);
  const [result, setResult] = useState<PaintResult | null>(null);
  const [activeTab, setActiveTab] = useState<"calculator" | "guide" | "colors">("calculator");

  // Paint coverage rates (sq ft per liter)
  const coverageRates: Record<string, Record<string, number>> = {
    economy: { smooth: 130, rough: 100, textured: 80 },
    standard: { smooth: 140, rough: 110, textured: 90 },
    premium: { smooth: 160, rough: 130, textured: 100 },
    luxury: { smooth: 180, rough: 150, textured: 120 },
  };

  // Paint prices per liter (₹)
  const paintPrices: Record<string, number> = {
    economy: 180,
    standard: 280,
    premium: 420,
    luxury: 650,
  };

  // Standard dimensions
  const DOOR_AREA = 21; // 7ft x 3ft
  const WINDOW_AREA = 15; // 5ft x 3ft

  const calculatePaint = useCallback(() => {
    let totalWallArea = 0;
    let totalDoors = 0;
    let totalWindows = 0;
    let totalCeilingArea = 0;

    rooms.forEach(room => {
      const l = Number(room.length) || 0;
      const w = Number(room.width) || 0;
      const h = Number(room.height) || 0;
      const doors = Number(room.doors) || 0;
      const windows = Number(room.windows) || 0;

      if (l > 0 && w > 0 && h > 0) {
        // Wall area = 2 * (length + width) * height
        const wallArea = 2 * (l + w) * h;
        totalWallArea += wallArea;
        totalDoors += doors;
        totalWindows += windows;
        
        if (includeCeiling) {
          totalCeilingArea += l * w;
        }
      }
    });

    // Deduct door and window areas
    const doorArea = totalDoors * DOOR_AREA;
    const windowArea = totalWindows * WINDOW_AREA;
    const netWallArea = Math.max(0, totalWallArea - doorArea - windowArea);
    const totalPaintArea = netWallArea + totalCeilingArea;

    // Calculate paint needed
    const coverage = coverageRates[paintType][finishType];
    const paintForOneCoat = totalPaintArea / coverage;
    const paintNeeded = (paintForOneCoat * coats);
    
    // Primer calculation (1 coat covers 120-150 sq ft per liter)
    const primerCoverage = 130;
    const primerNeeded = includePrimer ? totalPaintArea / primerCoverage : 0;
    
    // Wall putty calculation (1 kg covers 20-25 sq ft)
    const puttyCoverage = 22;
    const puttyNeeded = includePutty ? totalPaintArea / puttyCoverage : 0;

    // Cost calculations
    const paintPrice = paintPrices[paintType];
    const paintCost = Math.ceil(paintNeeded) * paintPrice;
    const primerCost = Math.ceil(primerNeeded) * 120; // ₹120 per liter
    const puttyCost = Math.ceil(puttyNeeded) * 35; // ₹35 per kg
    const laborCost = totalPaintArea * 12; // ₹12 per sq ft labor

    const totalCost = paintCost + primerCost + puttyCost + laborCost;

    setResult({
      totalArea: Math.round(totalPaintArea),
      netArea: Math.round(netWallArea),
      paintNeeded: Math.ceil(paintNeeded * 10) / 10,
      primerNeeded: Math.ceil(primerNeeded * 10) / 10,
      puttyNeeded: Math.ceil(puttyNeeded * 10) / 10,
      totalCost: Math.round(totalCost),
      breakdown: {
        paint: paintCost,
        primer: primerCost,
        putty: puttyCost,
        labor: laborCost,
      },
      coats: {
        one: Math.ceil(paintForOneCoat * 10) / 10,
        two: Math.ceil(paintForOneCoat * 2 * 10) / 10,
        three: Math.ceil(paintForOneCoat * 3 * 10) / 10,
      },
    });
  }, [rooms, paintType, finishType, includeCeiling, includePrimer, includePutty, coats]);

  useEffect(() => {
    const hasValidRoom = rooms.some(room => {
      const l = Number(room.length) || 0;
      const w = Number(room.width) || 0;
      const h = Number(room.height) || 0;
      return l > 0 && w > 0 && h > 0;
    });
    
    if (hasValidRoom) {
      calculatePaint();
    }
  }, [rooms, paintType, finishType, includeCeiling, includePrimer, includePutty, coats, calculatePaint]);

  const addRoom = () => {
    const newRoom: Room = {
      id: Date.now().toString(),
      name: `Room ${rooms.length + 1}`,
      length: "",
      width: "",
      height: "10",
      doors: "1",
      windows: "1"
    };
    setRooms([...rooms, newRoom]);
  };

  const removeRoom = (id: string) => {
    if (rooms.length > 1) {
      setRooms(rooms.filter(room => room.id !== id));
    }
  };

  const updateRoom = (id: string, field: keyof Room, value: string) => {
    setRooms(rooms.map(room => 
      room.id === id ? { ...room, [field]: value } : room
    ));
  };

  const formatIndianCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-IN').format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Free Paint Calculator - Estimate Wall Paint Quantity & Cost",
            "description": "Calculate exactly how much paint you need for your home. Get paint quantity, primer, putty, and total cost estimation for interior and exterior walls.",
            "applicationCategory": "HomeImprovementApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            }
          })
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 px-5 py-2.5 rounded-full mb-4">
            <span className="text-2xl">🎨</span>
            <span className="text-xs font-bold tracking-wider text-amber-700 uppercase">
              Free Paint Estimation Tool
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Paint Calculator
          </h1>
          
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-6">
            Calculate exactly how much paint, primer, and putty you need. 
            Get accurate cost estimation for your home painting project.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="text-green-500">✓</span>
              <span className="text-gray-600">Asian Paints, Berger, Nerolac Compatible</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="text-green-500">✓</span>
              <span className="text-gray-600">1M+ Paint Calculations</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="text-green-500">✓</span>
              <span className="text-gray-600">Updated 2025 Rates</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          {(["calculator", "guide", "colors"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium text-sm transition-all ${
                activeTab === tab
                  ? "text-amber-600 border-b-2 border-amber-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "calculator" && "🎨 Paint Calculator"}
              {tab === "guide" && "📖 Painting Guide"}
              {tab === "colors" && "🌈 Color Visualizer"}
            </button>
          ))}
        </div>

        {activeTab === "calculator" && (
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Left Column - Input Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-6 md:p-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <span>📏</span> Room Measurements
                  </h2>

                  {/* Rooms List */}
                  <div className="space-y-4 mb-6">
                    {rooms.map((room, index) => (
                      <div key={room.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                          <input
                            type="text"
                            value={room.name}
                            onChange={(e) => updateRoom(room.id, "name", e.target.value)}
                            className="font-semibold text-gray-700 bg-transparent border-b border-gray-300 focus:border-amber-500 outline-none px-1"
                          />
                          {rooms.length > 1 && (
                            <button
                              onClick={() => removeRoom(room.id)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                          <div>
                            <label className="text-xs text-gray-500 block mb-1">Length (ft)</label>
                            <input
                              type="number"
                              value={room.length}
                              onChange={(e) => updateRoom(room.id, "length", e.target.value)}
                              placeholder="20"
                              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 block mb-1">Width (ft)</label>
                            <input
                              type="number"
                              value={room.width}
                              onChange={(e) => updateRoom(room.id, "width", e.target.value)}
                              placeholder="15"
                              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 block mb-1">Height (ft)</label>
                            <input
                              type="number"
                              value={room.height}
                              onChange={(e) => updateRoom(room.id, "height", e.target.value)}
                              placeholder="10"
                              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 block mb-1">Doors</label>
                            <input
                              type="number"
                              value={room.doors}
                              onChange={(e) => updateRoom(room.id, "doors", e.target.value)}
                              placeholder="1"
                              min="0"
                              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 block mb-1">Windows</label>
                            <input
                              type="number"
                              value={room.windows}
                              onChange={(e) => updateRoom(room.id, "windows", e.target.value)}
                              placeholder="2"
                              min="0"
                              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={addRoom}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-amber-400 hover:text-amber-600 transition-all flex items-center justify-center gap-2 mb-6"
                  >
                    <span>➕</span> Add Another Room
                  </button>

                  {/* Paint Options */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Paint Quality
                      </label>
                      <select
                        value={paintType}
                        onChange={(e) => setPaintType(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none"
                      >
                        <option value="economy">💰 Economy (₹180/L) - Basic Finish</option>
                        <option value="standard">⭐ Standard (₹280/L) - Good Coverage</option>
                        <option value="premium">✨ Premium (₹420/L) - Excellent Finish</option>
                        <option value="luxury">👑 Luxury (₹650/L) - Ultra Premium</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Wall Surface Type
                      </label>
                      <select
                        value={finishType}
                        onChange={(e) => setFinishType(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none"
                      >
                        <option value="smooth">✨ Smooth (New Plaster)</option>
                        <option value="rough">🏗️ Rough (Old Wall)</option>
                        <option value="textured">🎨 Textured Finish</option>
                      </select>
                    </div>
                  </div>

                  {/* Options Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Number of Coats</label>
                      <select
                        value={coats}
                        onChange={(e) => setCoats(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
                      >
                        <option value={1}>1 Coat</option>
                        <option value={2}>2 Coats (Recommended)</option>
                        <option value={3}>3 Coats</option>
                      </select>
                    </div>

                    <div className="flex items-center">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includeCeiling}
                          onChange={(e) => setIncludeCeiling(e.target.checked)}
                          className="w-4 h-4 text-amber-600 rounded"
                        />
                        <span className="text-sm text-gray-700">Paint Ceiling</span>
                      </label>
                    </div>

                    <div className="flex items-center">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includePrimer}
                          onChange={(e) => setIncludePrimer(e.target.checked)}
                          className="w-4 h-4 text-amber-600 rounded"
                        />
                        <span className="text-sm text-gray-700">Include Primer</span>
                      </label>
                    </div>

                    <div className="flex items-center">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includePutty}
                          onChange={(e) => setIncludePutty(e.target.checked)}
                          className="w-4 h-4 text-amber-600 rounded"
                        />
                        <span className="text-sm text-gray-700">Include Wall Putty</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Results */}
            <div className="lg:col-span-1">
              {result ? (
                <div className="bg-gradient-to-br from-amber-900 to-orange-900 rounded-3xl shadow-xl p-6 md:p-8 text-white sticky top-4">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span>📊</span> Paint Estimate
                  </h2>

                  {/* Total Paint */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 mb-4">
                    <p className="text-amber-200 text-sm mb-1">Total Paint Required</p>
                    <p className="text-4xl font-bold text-white">
                      {result.paintNeeded} <span className="text-lg font-normal text-amber-200">Litres</span>
                    </p>
                    <p className="text-amber-200 text-xs mt-2">
                      For {result.totalArea} sq ft area • {coats} coat{coats > 1 ? 's' : ''}
                    </p>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-amber-200">Paint Cost</span>
                      <span className="font-semibold">₹{formatIndianCurrency(result.breakdown.paint)}</span>
                    </div>
                    {includePrimer && (
                      <div className="flex justify-between text-sm">
                        <span className="text-amber-200">Primer ({result.primerNeeded} L)</span>
                        <span className="font-semibold">₹{formatIndianCurrency(result.breakdown.primer)}</span>
                      </div>
                    )}
                    {includePutty && (
                      <div className="flex justify-between text-sm">
                        <span className="text-amber-200">Putty ({result.puttyNeeded} kg)</span>
                        <span className="font-semibold">₹{formatIndianCurrency(result.breakdown.putty)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-amber-200">Labor Charges</span>
                      <span className="font-semibold">₹{formatIndianCurrency(result.breakdown.labor)}</span>
                    </div>
                    <div className="border-t border-white/20 my-2"></div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Cost</span>
                      <span>₹{formatIndianCurrency(result.totalCost)}</span>
                    </div>
                  </div>

                  {/* Paint Coverage Details */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 mb-4">
                    <p className="text-amber-200 text-xs mb-2">Paint Required by Coats</p>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-xs text-amber-300">1 Coat</p>
                        <p className="font-semibold">{result.coats.one} L</p>
                      </div>
                      <div>
                        <p className="text-xs text-amber-300">2 Coats</p>
                        <p className="font-semibold">{result.coats.two} L</p>
                      </div>
                      <div>
                        <p className="text-xs text-amber-300">3 Coats</p>
                        <p className="font-semibold">{result.coats.three} L</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href="https://wa.me/916205820278?text=I%20need%20painting%20service%20for%20%7E{result.totalArea}%20sq%20ft%20area"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-white text-amber-900 text-center py-3 rounded-xl font-semibold hover:bg-amber-50 transition-all"
                  >
                    Get Professional Painting Quote →
                  </a>
                </div>
              ) : (
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
                  <span className="text-6xl mb-4 block">🎨</span>
                  <p className="text-gray-500">Enter room dimensions to calculate paint required</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "guide" && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Painting Guide</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">📋 Preparation Steps</h3>
                <ol className="space-y-3 text-sm text-gray-600">
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <span>Clean walls thoroughly and remove dust, cobwebs</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <span>Fill cracks and holes with wall putty</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <span>Sand the surface for smooth finish</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                    <span>Apply primer and let it dry for 6-8 hours</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-xs font-bold">5</span>
                    <span>Apply 2 coats of paint with 4-6 hours gap</span>
                  </li>
                </ol>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">💡 Pro Tips</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex gap-2">
                    <span className="text-amber-600">•</span>
                    <span>Buy 10% extra paint for touch-ups and wastage</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-600">•</span>
                    <span>Use darker shades for accent walls, lighter for rest</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-600">•</span>
                    <span>Premium paints offer better coverage and durability</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-600">•</span>
                    <span>Best time to paint: October to March (low humidity)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-600">•</span>
                    <span>Use water-based paints for interiors, oil-based for exteriors</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "colors" && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Color Combinations 2025</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Classic White", colors: ["#FAFAFA", "#F5F5F5", "#E0E0E0"] },
                { name: "Warm Beige", colors: ["#F5E6D3", "#E8D5C4", "#D4C4B7"] },
                { name: "Sage Green", colors: ["#9CAF88", "#7A947A", "#5C7A5C"] },
                { name: "Sky Blue", colors: ["#A8D8EA", "#87CEEB", "#6BB3D9"] },
                { name: "Terracotta", colors: ["#E07A5F", "#D46A4E", "#C15B3D"] },
                { name: "Lavender", colors: ["#E6E6FA", "#D8BFD8", "#C4A4C4"] },
                { name: "Charcoal Grey", colors: ["#4A4A4A", "#3D3D3D", "#2F2F2F"] },
                { name: "Mustard Yellow", colors: ["#E1AD01", "#C99C00", "#B28B00"] },
              ].map((scheme, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-xl">
                  <p className="font-medium text-gray-800 mb-2">{scheme.name}</p>
                  <div className="flex gap-1">
                    {scheme.colors.map((color, j) => (
                      <div
                        key={j}
                        className="w-full h-12 rounded-lg shadow-inner"
                        style={{ backgroundColor: color }}
                        title={color}
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-center text-sm text-gray-500 mt-6">
              These are suggested color schemes. Always test paint samples on your wall before finalizing.
            </p>
          </div>
        )}

        {/* SEO Content */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-2">🎨 Interior Wall Paint</h3>
            <p className="text-sm text-gray-600">
              Calculate paint for bedroom, living room, kitchen interiors. 
              Premium emulsions cover 140-160 sq ft per liter.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-2">🏠 Exterior Paint</h3>
            <p className="text-sm text-gray-600">
              Weather-resistant exterior paints. Coverage: 80-100 sq ft per liter. 
              Recommended: 2 coats with primer.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-2">✨ Texture Paint</h3>
            <p className="text-sm text-gray-600">
              Designer texture paints for accent walls. Coverage varies by pattern. 
              Professional application recommended.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-800">How much area does 1 liter paint cover?</p>
              <p className="text-gray-600">Premium paints cover 140-160 sq ft per coat. Economy paints cover 120-130 sq ft per coat.</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">Do I need primer before painting?</p>
              <p className="text-gray-600">Yes, primer ensures better paint adhesion and true color. It also reduces paint consumption.</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">How many paint coats are recommended?</p>
              <p className="text-gray-600">Minimum 2 coats for even finish and proper coverage. Dark colors may need 3 coats.</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">What is wall putty used for?</p>
              <p className="text-gray-600">Wall putty smooths surface, fills minor cracks, and provides base for paint. Essential for new walls.</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center mt-8">
          * Calculations are estimates. Actual paint consumption may vary based on surface porosity, application method, and wastage.
        </p>
      </div>
    </div>
  );
}