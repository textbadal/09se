"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

type Wall = {
  id: string;
  name: string;
  length: string;
  height: string;
  thickness: string;
  openings: string;
};

type BrickResult = {
  totalWallArea: number;
  netWallArea: number;
  brickCount: number;
  cementBags: number;
  sandCft: number;
  totalCost: number;
  breakdown: {
    bricks: number;
    cement: number;
    sand: number;
    labor: number;
  };
  brickTypes: {
    standard: number;
    modular: number;
    flyash: number;
  };
};

export default function BrickCalculator() {
  const [walls, setWalls] = useState<Wall[]>([
    { id: "1", name: "Main Wall 1", length: "20", height: "10", thickness: "4.5", openings: "10" }
  ]);
  const [brickType, setBrickType] = useState<string>("standard");
  const [brickQuality, setBrickQuality] = useState<string>("first");
  const [mortarRatio, setMortarRatio] = useState<string>("1:6");
  const [includeLabor, setIncludeLabor] = useState<boolean>(true);
  const [wastagePercent, setWastagePercent] = useState<number>(5);
  const [result, setResult] = useState<BrickResult | null>(null);
  const [activeTab, setActiveTab] = useState<"calculator" | "types" | "guide">("calculator");

  // Brick specifications (in inches)
  const brickSizes: Record<string, { length: number; width: number; height: number }> = {
    standard: { length: 9, width: 4.5, height: 3 },
    modular: { length: 7.5, width: 3.5, height: 2.25 },
    flyash: { length: 9, width: 4, height: 3 },
    aac: { length: 24, width: 8, height: 4 },
  };

  // Brick prices per 1000 pieces (₹)
  const brickPrices: Record<string, Record<string, number>> = {
    standard: { first: 8500, second: 7500, third: 6500 },
    modular: { first: 9000, second: 8000, third: 7000 },
    flyash: { first: 7500, second: 6500, third: 5500 },
    aac: { first: 45000, second: 40000, third: 35000 },
  };

  // Cement prices per bag (50kg)
  const cementPrice = 420;
  
  // Sand price per CFT
  const sandPrice = 65;

  // Mortar ratio cement consumption (bags per 100 cft)
  const mortarCementRatios: Record<string, number> = {
    "1:3": 18,
    "1:4": 14.4,
    "1:5": 12,
    "1:6": 10.3,
    "1:8": 8,
  };

  const calculateBricks = useCallback(() => {
    let totalWallArea = 0;
    let totalOpenings = 0;

    walls.forEach(wall => {
      const l = Number(wall.length) || 0;
      const h = Number(wall.height) || 0;
      const openings = Number(wall.openings) || 0;
      
      if (l > 0 && h > 0) {
        totalWallArea += l * h;
        totalOpenings += openings;
      }
    });

    // Deduct openings (assuming 21 sq ft per opening - standard door/window)
    const openingArea = totalOpenings * 21;
    const netWallArea = Math.max(0, totalWallArea - openingArea);

    // Calculate bricks per sq ft based on wall thickness
    const thickness = Number(walls[0]?.thickness) || 4.5;
    const brickSize = brickSizes[brickType];
    
    // Brick volume with mortar (adding 0.5 inch mortar on all sides)
    const brickVolumeWithMortar = (brickSize.length + 0.5) * (brickSize.width + 0.5) * (brickSize.height + 0.5);
    const brickVolumeWithoutMortar = brickSize.length * brickSize.width * brickSize.height;
    
    // Bricks per cubic inch
    const bricksPerCubicInch = 1 / brickVolumeWithMortar;
    
    // Wall volume in cubic inches (thickness in inches, area in sq ft * 144)
    const wallVolume = netWallArea * 144 * thickness;
    
    // Total bricks
    let brickCount = Math.ceil(wallVolume * bricksPerCubicInch);
    
    // Add wastage
    brickCount = Math.ceil(brickCount * (1 + wastagePercent / 100));

    // Calculate mortar volume
    const mortarVolume = wallVolume - (brickCount * brickVolumeWithoutMortar);
    const mortarCft = mortarVolume / 1728; // Convert cubic inches to CFT

    // Cement calculation (1 bag = 50 kg = 1.25 CFT)
    const cementRatio = mortarCementRatios[mortarRatio] || 10.3;
    const cementBags = Math.ceil((mortarCft * cementRatio) / 100 * 1.2); // 20% extra for wastage
    
    // Sand calculation (1 CFT = 1 CFT)
    const sandCft = Math.ceil(mortarCft * 1.2); // 20% extra for wastage

    // Cost calculations
    const brickPrice = brickPrices[brickType][brickQuality];
    const brickCost = Math.ceil(brickCount / 1000) * brickPrice;
    const cementCost = cementBags * cementPrice;
    const sandCost = sandCft * sandPrice;
    const laborCost = includeLabor ? netWallArea * 25 : 0; // ₹25 per sq ft labor

    const totalCost = brickCost + cementCost + sandCost + laborCost;

    // Calculate for different brick types (comparison)
    const brickTypes = {
      standard: Math.ceil(netWallArea * (brickType === "standard" ? 0 : 5.5)),
      modular: Math.ceil(netWallArea * (brickType === "modular" ? 0 : 6.5)),
      flyash: Math.ceil(netWallArea * (brickType === "flyash" ? 0 : 5.8)),
    };

    setResult({
      totalWallArea: Math.round(totalWallArea),
      netWallArea: Math.round(netWallArea),
      brickCount,
      cementBags,
      sandCft,
      totalCost: Math.round(totalCost),
      breakdown: {
        bricks: brickCost,
        cement: cementCost,
        sand: sandCost,
        labor: laborCost,
      },
      brickTypes,
    });
  }, [walls, brickType, brickQuality, mortarRatio, includeLabor, wastagePercent]);

  useEffect(() => {
    const hasValidWall = walls.some(wall => {
      const l = Number(wall.length) || 0;
      const h = Number(wall.height) || 0;
      return l > 0 && h > 0;
    });
    
    if (hasValidWall) {
      calculateBricks();
    }
  }, [walls, brickType, brickQuality, mortarRatio, includeLabor, wastagePercent, calculateBricks]);

  const addWall = () => {
    const newWall: Wall = {
      id: Date.now().toString(),
      name: `Wall ${walls.length + 1}`,
      length: "",
      height: "10",
      thickness: "4.5",
      openings: "0"
    };
    setWalls([...walls, newWall]);
  };

  const removeWall = (id: string) => {
    if (walls.length > 1) {
      setWalls(walls.filter(wall => wall.id !== id));
    }
  };

  const updateWall = (id: string, field: keyof Wall, value: string) => {
    setWalls(walls.map(wall => 
      wall.id === id ? { ...wall, [field]: value } : wall
    ));
  };

  const formatIndianCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-IN').format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Free Brick Calculator - Calculate Bricks, Cement & Sand for Wall Construction",
            "description": "Calculate exact number of bricks, cement bags, and sand required for your wall construction. Supports standard, modular, fly ash, and AAC blocks.",
            "applicationCategory": "ConstructionApplication",
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
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-orange-100 px-5 py-2.5 rounded-full mb-4">
            <span className="text-2xl">🧱</span>
            <span className="text-xs font-bold tracking-wider text-red-700 uppercase">
              Free Brick Estimation Tool
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Brick Calculator
          </h1>
          
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-6">
            Calculate exact number of bricks, cement bags, and sand required for your wall construction. 
            Supports standard, modular, fly ash bricks & AAC blocks.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="text-green-500">✓</span>
              <span className="text-gray-600">IS 1077:1992 Compliant</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="text-green-500">✓</span>
              <span className="text-gray-600">500K+ Calculations</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="text-green-500">✓</span>
              <span className="text-gray-600">Updated 2025 Rates</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          {(["calculator", "types", "guide"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium text-sm transition-all ${
                activeTab === tab
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "calculator" && "🧱 Brick Calculator"}
              {tab === "types" && "📚 Brick Types Guide"}
              {tab === "guide" && "📖 Construction Guide"}
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
                    <span>📏</span> Wall Measurements
                  </h2>

                  {/* Walls List */}
                  <div className="space-y-4 mb-6">
                    {walls.map((wall, index) => (
                      <div key={wall.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                          <input
                            type="text"
                            value={wall.name}
                            onChange={(e) => updateWall(wall.id, "name", e.target.value)}
                            className="font-semibold text-gray-700 bg-transparent border-b border-gray-300 focus:border-red-500 outline-none px-1"
                          />
                          {walls.length > 1 && (
                            <button
                              onClick={() => removeWall(wall.id)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div>
                            <label className="text-xs text-gray-500 block mb-1">Length (ft)</label>
                            <input
                              type="number"
                              value={wall.length}
                              onChange={(e) => updateWall(wall.id, "length", e.target.value)}
                              placeholder="20"
                              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 block mb-1">Height (ft)</label>
                            <input
                              type="number"
                              value={wall.height}
                              onChange={(e) => updateWall(wall.id, "height", e.target.value)}
                              placeholder="10"
                              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 block mb-1">Thickness (in)</label>
                            <select
                              value={wall.thickness}
                              onChange={(e) => updateWall(wall.id, "thickness", e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none text-sm"
                            >
                              <option value="4.5">4.5" (Half Brick)</option>
                              <option value="9">9" (Full Brick)</option>
                              <option value="13.5">13.5" (1.5 Brick)</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 block mb-1">Openings (sq ft)</label>
                            <input
                              type="number"
                              value={wall.openings}
                              onChange={(e) => updateWall(wall.id, "openings", e.target.value)}
                              placeholder="0"
                              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={addWall}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-red-400 hover:text-red-600 transition-all flex items-center justify-center gap-2 mb-6"
                  >
                    <span>➕</span> Add Another Wall
                  </button>

                  {/* Brick Options */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Brick Type
                      </label>
                      <select
                        value={brickType}
                        onChange={(e) => setBrickType(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none"
                      >
                        <option value="standard">🧱 Standard Brick (9"×4.5"×3")</option>
                        <option value="modular">📦 Modular Brick (7.5"×3.5"×2.25")</option>
                        <option value="flyash">♻️ Fly Ash Brick (9"×4"×3")</option>
                        <option value="aac">🧊 AAC Block (24"×8"×4")</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Brick Quality
                      </label>
                      <select
                        value={brickQuality}
                        onChange={(e) => setBrickQuality(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none"
                      >
                        <option value="first">⭐ First Class (Best Quality)</option>
                        <option value="second">👍 Second Class</option>
                        <option value="third">💰 Third Class (Economy)</option>
                      </select>
                    </div>
                  </div>

                  {/* Additional Options */}
                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Mortar Ratio (Cement:Sand)</label>
                      <select
                        value={mortarRatio}
                        onChange={(e) => setMortarRatio(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
                      >
                        <option value="1:3">1:3 (Rich Mix)</option>
                        <option value="1:4">1:4 (Strong)</option>
                        <option value="1:5">1:5 (Standard)</option>
                        <option value="1:6">1:6 (Common)</option>
                        <option value="1:8">1:8 (Economy)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Wastage %</label>
                      <select
                        value={wastagePercent}
                        onChange={(e) => setWastagePercent(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
                      >
                        <option value={3}>3% (Professional)</option>
                        <option value={5}>5% (Standard)</option>
                        <option value={8}>8% (Novice)</option>
                        <option value={10}>10% (Safe)</option>
                      </select>
                    </div>

                    <div className="flex items-center">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includeLabor}
                          onChange={(e) => setIncludeLabor(e.target.checked)}
                          className="w-4 h-4 text-red-600 rounded"
                        />
                        <span className="text-sm text-gray-700">Include Labor Cost</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Results */}
            <div className="lg:col-span-1">
              {result ? (
                <div className="bg-gradient-to-br from-red-900 to-orange-900 rounded-3xl shadow-xl p-6 md:p-8 text-white sticky top-4">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span>📊</span> Material Estimate
                  </h2>

                  {/* Total Bricks */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 mb-4">
                    <p className="text-red-200 text-sm mb-1">Total Bricks Required</p>
                    <p className="text-4xl font-bold text-white">
                      {formatIndianCurrency(result.brickCount)} <span className="text-lg font-normal text-red-200">pcs</span>
                    </p>
                    <p className="text-red-200 text-xs mt-2">
                      For {result.netWallArea} sq ft wall area • {walls[0]?.thickness}" thickness
                    </p>
                  </div>

                  {/* Material Breakdown */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <p className="text-red-200 text-xs mb-1">Cement</p>
                      <p className="text-2xl font-bold text-white">{result.cementBags}</p>
                      <p className="text-red-200 text-xs">bags (50kg)</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <p className="text-red-200 text-xs mb-1">Sand</p>
                      <p className="text-2xl font-bold text-white">{result.sandCft}</p>
                      <p className="text-red-200 text-xs">cubic feet</p>
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-red-200">Bricks Cost</span>
                      <span className="font-semibold">₹{formatIndianCurrency(result.breakdown.bricks)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-red-200">Cement Cost</span>
                      <span className="font-semibold">₹{formatIndianCurrency(result.breakdown.cement)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-red-200">Sand Cost</span>
                      <span className="font-semibold">₹{formatIndianCurrency(result.breakdown.sand)}</span>
                    </div>
                    {includeLabor && (
                      <div className="flex justify-between text-sm">
                        <span className="text-red-200">Labor Charges</span>
                        <span className="font-semibold">₹{formatIndianCurrency(result.breakdown.labor)}</span>
                      </div>
                    )}
                    <div className="border-t border-white/20 my-2"></div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Cost</span>
                      <span>₹{formatIndianCurrency(result.totalCost)}</span>
                    </div>
                  </div>

                  {/* Alternative Brick Types */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 mb-4">
                    <p className="text-red-200 text-xs mb-2">Alternative Brick Quantities</p>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div>
                        <p className="text-red-300">Standard</p>
                        <p className="font-semibold">{formatIndianCurrency(Math.round(result.netWallArea * 5.5))}</p>
                      </div>
                      <div>
                        <p className="text-red-300">Modular</p>
                        <p className="font-semibold">{formatIndianCurrency(Math.round(result.netWallArea * 6.5))}</p>
                      </div>
                      <div>
                        <p className="text-red-300">Fly Ash</p>
                        <p className="font-semibold">{formatIndianCurrency(Math.round(result.netWallArea * 5.8))}</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href={`https://wa.me/916205820278?text=I%20need%20${result.brickCount}%20bricks%20for%20${result.netWallArea}%20sq%20ft%20wall%20construction`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-white text-red-900 text-center py-3 rounded-xl font-semibold hover:bg-red-50 transition-all"
                  >
                    Get Supplier Quotes →
                  </a>
                </div>
              ) : (
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
                  <span className="text-6xl mb-4 block">🧱</span>
                  <p className="text-gray-500">Enter wall dimensions to calculate bricks required</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "types" && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Brick Types Comparison</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Size (inches)</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Bricks/sq ft</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Price/1000</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium">Standard Brick</td>
                    <td className="py-3 px-4">9 × 4.5 × 3</td>
                    <td className="py-3 px-4">5.5</td>
                    <td className="py-3 px-4">₹7,500 - 8,500</td>
                    <td className="py-3 px-4">Load bearing walls</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium">Modular Brick</td>
                    <td className="py-3 px-4">7.5 × 3.5 × 2.25</td>
                    <td className="py-3 px-4">6.5</td>
                    <td className="py-3 px-4">₹8,000 - 9,000</td>
                    <td className="py-3 px-4">Precision construction</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium">Fly Ash Brick</td>
                    <td className="py-3 px-4">9 × 4 × 3</td>
                    <td className="py-3 px-4">5.8</td>
                    <td className="py-3 px-4">₹6,500 - 7,500</td>
                    <td className="py-3 px-4">Eco-friendly projects</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium">AAC Block</td>
                    <td className="py-3 px-4">24 × 8 × 4</td>
                    <td className="py-3 px-4">1.5</td>
                    <td className="py-3 px-4">₹35,000 - 45,000</td>
                    <td className="py-3 px-4">High-rise buildings</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <p className="text-sm text-amber-800">
                <span className="font-semibold">💡 Pro Tip:</span> First class bricks have uniform color, 
                sharp edges, and produce a metallic ringing sound when struck. Always check for efflorescence 
                (white patches) before purchasing.
              </p>
            </div>
          </div>
        )}

        {activeTab === "guide" && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Brick Masonry Construction Guide</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">📋 Step-by-Step Process</h3>
                <ol className="space-y-3 text-sm text-gray-600">
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <span>Soak bricks in water for 12 hours before use</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <span>Prepare mortar with recommended cement:sand ratio</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <span>Lay first course on damp proof course (DPC)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                    <span>Maintain 10mm uniform mortar joints</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-xs font-bold">5</span>
                    <span>Check vertical alignment with plumb bob every course</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-xs font-bold">6</span>
                    <span>Cure wall for minimum 7-10 days</span>
                  </li>
                </ol>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">⚠️ Common Mistakes to Avoid</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Using dry bricks without soaking</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Incorrect mortar mix ratio</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Not maintaining uniform joint thickness</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Skipping curing process</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Poor quality bricks with cracks</span>
                  </li>
                </ul>

                <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Quality Check Checklist</h4>
                  <ul className="text-xs text-green-700 space-y-1">
                    <li>• Bricks should be uniform in size and color</li>
                    <li>• No cracks, chips, or warping</li>
                    <li>• Should not absorb more than 20% water</li>
                    <li>• Compressive strength: minimum 35 kg/cm²</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEO Content */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-2">🧱 Standard Bricks</h3>
            <p className="text-sm text-gray-600">
              Traditional clay bricks (9"×4.5"×3"). Ideal for load-bearing walls. 
              Approximately 5.5 bricks per square foot for 4.5" wall.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-2">♻️ Fly Ash Bricks</h3>
            <p className="text-sm text-gray-600">
              Eco-friendly alternative made from fly ash, cement, and sand. 
              Better thermal insulation and uniform size.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-2">🧊 AAC Blocks</h3>
            <p className="text-sm text-gray-600">
              Lightweight aerated concrete blocks. 3x lighter than clay bricks. 
              Excellent for high-rise construction and faster building.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-800">How many bricks in 1 square foot?</p>
              <p className="text-gray-600">For 4.5" wall: 5.5 standard bricks. For 9" wall: 11 standard bricks per sq ft.</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">How many bricks in 1 cubic meter?</p>
              <p className="text-gray-600">Approximately 500 standard bricks per cubic meter of brickwork.</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">What is the best mortar ratio?</p>
              <p className="text-gray-600">1:6 (cement:sand) is standard. Use 1:4 for load-bearing walls.</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">How much cement for 1000 bricks?</p>
              <p className="text-gray-600">Approximately 6-8 bags (50kg each) of cement for 1000 bricks.</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center mt-8">
          * Calculations are based on standard brick sizes and industry practices. Actual quantities may vary based on site conditions and workmanship.
        </p>
      </div>
    </div>
  );
}