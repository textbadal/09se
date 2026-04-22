"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Room {
  id: string;
  name: string;
  type: string;
  width: number;
  length: number;
  x: number;
  y: number;
  color: string;
  vastuScore: number;
}

interface FloorPlan {
  id: number;
  name: string;
  rooms: Room[];
  totalArea: number;
  vastuScore: number;
  carpetArea: number;
  efficiency: number;
  estimatedCost: number;
}

export default function SmartFloorPlanGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Input state
  const [plotLength, setPlotLength] = useState<number>(40);
  const [plotWidth, setPlotWidth] = useState<number>(30);
  const [facing, setFacing] = useState<string>("north");
  const [bhk, setBHK] = useState<string>("2");
  const [style, setStyle] = useState<string>("standard");
  const [floors, setFloors] = useState<number>(1);
  
  // Generated plans
  const [plans, setPlans] = useState<FloorPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Room templates by BHK
  const roomTemplates: Record<string, Array<{ type: string; name: string; minArea: number; idealWidth: number; idealLength: number }>> = {
    "1": [
      { type: "living", name: "Living Room", minArea: 150, idealWidth: 12, idealLength: 13 },
      { type: "bedroom", name: "Master Bedroom", minArea: 120, idealWidth: 10, idealLength: 12 },
      { type: "kitchen", name: "Kitchen", minArea: 80, idealWidth: 8, idealLength: 10 },
      { type: "bathroom", name: "Bathroom", minArea: 40, idealWidth: 5, idealLength: 8 },
    ],
    "2": [
      { type: "living", name: "Living Room", minArea: 180, idealWidth: 12, idealLength: 15 },
      { type: "bedroom", name: "Master Bedroom", idealWidth: 12, idealLength: 12, minArea: 140 },
      { type: "bedroom", name: "Second Bedroom", minArea: 110, idealWidth: 10, idealLength: 11 },
      { type: "kitchen", name: "Kitchen", minArea: 80, idealWidth: 8, idealLength: 10 },
      { type: "bathroom", name: "Bathroom 1", minArea: 40, idealWidth: 5, idealLength: 8 },
      { type: "bathroom", name: "Bathroom 2", minArea: 36, idealWidth: 6, idealLength: 6 },
    ],
    "3": [
      { type: "living", name: "Living Room", minArea: 200, idealWidth: 14, idealLength: 15 },
      { type: "dining", name: "Dining Room", minArea: 100, idealWidth: 10, idealLength: 10 },
      { type: "bedroom", name: "Master Bedroom", minArea: 150, idealWidth: 12, idealLength: 13 },
      { type: "bedroom", name: "Second Bedroom", minArea: 120, idealWidth: 10, idealLength: 12 },
      { type: "bedroom", name: "Third Bedroom", minArea: 110, idealWidth: 10, idealLength: 11 },
      { type: "kitchen", name: "Kitchen", minArea: 90, idealWidth: 9, idealLength: 10 },
      { type: "bathroom", name: "Bathroom 1", minArea: 40, idealWidth: 5, idealLength: 8 },
      { type: "bathroom", name: "Bathroom 2", minArea: 36, idealWidth: 6, idealLength: 6 },
      { type: "bathroom", name: "Bathroom 3", minArea: 36, idealWidth: 6, idealLength: 6 },
    ],
    "4": [
      { type: "living", name: "Living Room", minArea: 220, idealWidth: 14, idealLength: 16 },
      { type: "dining", name: "Dining Room", minArea: 120, idealWidth: 10, idealLength: 12 },
      { type: "bedroom", name: "Master Bedroom", minArea: 160, idealWidth: 12, idealLength: 14 },
      { type: "bedroom", name: "Second Bedroom", minArea: 130, idealWidth: 11, idealLength: 12 },
      { type: "bedroom", name: "Third Bedroom", minArea: 120, idealWidth: 10, idealLength: 12 },
      { type: "bedroom", name: "Fourth Bedroom", minArea: 110, idealWidth: 10, idealLength: 11 },
      { type: "kitchen", name: "Kitchen", minArea: 100, idealWidth: 10, idealLength: 10 },
      { type: "bathroom", name: "Bathroom 1", minArea: 40, idealWidth: 5, idealLength: 8 },
      { type: "bathroom", name: "Bathroom 2", minArea: 36, idealWidth: 6, idealLength: 6 },
      { type: "bathroom", name: "Bathroom 3", minArea: 36, idealWidth: 6, idealLength: 6 },
      { type: "bathroom", name: "Bathroom 4", minArea: 36, idealWidth: 6, idealLength: 6 },
      { type: "pooja", name: "Pooja Room", minArea: 40, idealWidth: 5, idealLength: 8 },
    ],
  };

  // Room colors
  const roomColors: Record<string, string> = {
    living: "#FF6B6B",
    dining: "#FFA07A",
    bedroom: "#4ECDC4",
    kitchen: "#FFEAA7",
    bathroom: "#A8E6CF",
    pooja: "#DDA0DD",
    balcony: "#98D8C8",
    passage: "#E8E8E8",
  };

  // Vastu ideal positions (relative to plot)
  const vastuPositions: Record<string, { ideal: string[]; avoid: string[] }> = {
    living: { ideal: ["north", "east", "northeast"], avoid: ["south", "southwest"] },
    kitchen: { ideal: ["southeast"], avoid: ["north", "northeast"] },
    bedroom: { ideal: ["southwest", "south"], avoid: ["northeast", "southeast"] },
    bathroom: { ideal: ["northwest", "southeast"], avoid: ["northeast", "southwest"] },
    dining: { ideal: ["west", "east"], avoid: ["southwest"] },
    pooja: { ideal: ["northeast", "east"], avoid: ["south", "southwest"] },
  };

  // Calculate Vastu score based on room position
  const getVastuScore = (roomType: string, x: number, y: number, roomWidth: number, roomLength: number): number => {
    const rules = vastuPositions[roomType];
    if (!rules) return 70;

    const centerX = x + roomWidth / 2;
    const centerY = y + roomLength / 2;
    const relativeX = centerX / plotWidth;
    const relativeY = centerY / plotLength;

    // Determine direction
    let direction = "";
    if (relativeX < 0.33 && relativeY < 0.33) direction = "southwest";
    else if (relativeX < 0.33 && relativeY > 0.66) direction = "northwest";
    else if (relativeX > 0.66 && relativeY < 0.33) direction = "southeast";
    else if (relativeX > 0.66 && relativeY > 0.66) direction = "northeast";
    else if (relativeY < 0.33) direction = "south";
    else if (relativeY > 0.66) direction = "north";
    else if (relativeX < 0.33) direction = "west";
    else if (relativeX > 0.66) direction = "east";
    else direction = "center";

    if (rules.ideal.includes(direction)) return 95 + Math.floor(Math.random() * 6);
    if (rules.avoid.includes(direction)) return 30 + Math.floor(Math.random() * 20);
    return 60 + Math.floor(Math.random() * 25);
  };

  // Generate a single floor plan
  const generateSinglePlan = (planId: number, variation: number): FloorPlan => {
    const plotArea = plotLength * plotWidth;
    const templates = roomTemplates[bhk] || roomTemplates["2"];
    const rooms: Room[] = [];
    
    // Different layout strategies based on variation
    let currentX = 2;
    let currentY = 2;
    let rowHeight = 0;
    let totalCarpetArea = 0;
    let totalVastuScore = 0;

    // Sort rooms differently based on variation for different layouts
    const sortedTemplates = [...templates];
    if (variation === 1) {
      // Bedrooms first
      sortedTemplates.sort((a, b) => {
        if (a.type === "bedroom" && b.type !== "bedroom") return -1;
        if (a.type !== "bedroom" && b.type === "bedroom") return 1;
        return 0;
      });
    } else if (variation === 2) {
      // Living and common areas first
      sortedTemplates.sort((a, b) => {
        if ((a.type === "living" || a.type === "dining") && !(b.type === "living" || b.type === "dining")) return -1;
        if (!(a.type === "living" || a.type === "dining") && (b.type === "living" || b.type === "dining")) return 1;
        return 0;
      });
    }

    sortedTemplates.forEach((template, index) => {
      // Use ideal dimensions or calculate
      let roomWidth = template.idealWidth;
      let roomLength = template.idealLength;
      
      // Adjust for variation
      if (variation === 3 && template.type === "living") {
        roomWidth = Math.min(roomWidth + 2, plotWidth - 4);
      }

      // Check if room fits in current row
      if (currentX + roomWidth + 2 > plotWidth - 2) {
        currentX = 2;
        currentY += rowHeight + 2;
        rowHeight = 0;
      }

      // Check vertical fit
      if (currentY + roomLength + 2 > plotLength - 2) {
        currentY = 2;
      }

      // Calculate Vastu score
      const vastuScore = getVastuScore(template.type, currentX, currentY, roomWidth, roomLength);

      const room: Room = {
        id: `${planId}-${index}-${variation}`,
        name: template.name,
        type: template.type,
        width: roomWidth,
        length: roomLength,
        x: currentX,
        y: currentY,
        color: roomColors[template.type] || "#CCCCCC",
        vastuScore,
      };

      rooms.push(room);
      
      totalCarpetArea += roomWidth * roomLength;
      totalVastuScore += vastuScore;
      
      currentX += roomWidth + 2;
      rowHeight = Math.max(rowHeight, roomLength);
    });

    // Add passage (corridor)
    const passageWidth = 3;
    rooms.push({
      id: `${planId}-passage-${variation}`,
      name: "Passage",
      type: "passage",
      width: passageWidth,
      length: plotLength - 4,
      x: plotWidth / 2 - 1.5,
      y: 2,
      color: roomColors.passage,
      vastuScore: 80,
    });

    const avgVastuScore = Math.round(totalVastuScore / templates.length);
    const efficiency = Math.round((totalCarpetArea / plotArea) * 100);
    
    const costPerSqFt = style === "premium" ? 2200 : style === "economy" ? 1500 : 1800;
    const estimatedCost = plotArea * costPerSqFt * floors;

    const planNames = ["Classic Layout", "Modern Design", "Vastu Optimized", "Space Efficient"];
    
    return {
      id: planId,
      name: `${planNames[variation]} - ${bhk} BHK`,
      rooms,
      totalArea: plotArea,
      vastuScore: avgVastuScore,
      carpetArea: totalCarpetArea,
      efficiency,
      estimatedCost,
    };
  };

  // Generate all plans
  const generatePlans = useCallback(() => {
    setIsGenerating(true);
    
    // Use setTimeout to allow UI to update
    setTimeout(() => {
      try {
        const newPlans: FloorPlan[] = [];
        for (let i = 0; i < 4; i++) {
          newPlans.push(generateSinglePlan(i, i));
        }
        
        // Sort by Vastu score
        newPlans.sort((a, b) => b.vastuScore - a.vastuScore);
        
        setPlans(newPlans);
        setSelectedPlan(0);
      } catch (error) {
        console.error("Error generating plans:", error);
      } finally {
        setIsGenerating(false);
      }
    }, 100);
  }, [plotLength, plotWidth, bhk, style, floors]);

  // Draw the canvas
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || plans.length === 0) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const plan = plans[selectedPlan];
    if (!plan) return;

    const scale = 10; // pixels per foot
    const padding = 30;
    
    // Set canvas dimensions
    canvas.width = plotWidth * scale + padding * 2;
    canvas.height = plotLength * scale + padding * 2;

    // Clear canvas with white background
    ctx.fillStyle = "#f5f5f5";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw plot boundary (outer wall)
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 3;
    ctx.strokeRect(padding, padding, plotWidth * scale, plotLength * scale);

    // Draw plot dimensions
    ctx.fillStyle = "#666";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`${plotWidth}'`, padding + (plotWidth * scale) / 2, padding - 8);
    ctx.fillText(`${plotLength}'`, padding - 15, padding + (plotLength * scale) / 2);

    // Draw entrance arrow based on facing
    ctx.fillStyle = "#4CAF50";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    
    if (facing === "north") {
      ctx.fillText("🚪 ENTRANCE ↑", padding + (plotWidth * scale) / 2, padding - 15);
    } else if (facing === "east") {
      ctx.fillText("🚪 ENTRANCE →", padding + plotWidth * scale + 20, padding + (plotLength * scale) / 2);
    } else if (facing === "south") {
      ctx.fillText("🚪 ENTRANCE ↓", padding + (plotWidth * scale) / 2, padding + plotLength * scale + 20);
    } else {
      ctx.fillText("🚪 ENTRANCE ←", padding - 20, padding + (plotLength * scale) / 2);
    }

    // Draw rooms
    plan.rooms.forEach(room => {
      const x = padding + room.x * scale;
      const y = padding + room.y * scale;
      const w = room.width * scale;
      const h = room.length * scale;

      // Fill room with color
      ctx.fillStyle = room.color + "80"; // 50% opacity
      ctx.fillRect(x, y, w, h);

      // Draw room border
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x, y, w, h);

      // Room name
      ctx.fillStyle = "#222";
      ctx.font = "bold 11px Arial";
      ctx.textAlign = "left";
      ctx.fillText(room.name, x + 5, y + 18);

      // Room dimensions
      ctx.fillStyle = "#555";
      ctx.font = "9px Arial";
      ctx.fillText(`${room.width}'×${room.length}'`, x + 5, y + 32);

      // Vastu score indicator
      const scoreColor = room.vastuScore >= 80 ? "#4CAF50" : room.vastuScore >= 60 ? "#FFC107" : "#F44336";
      ctx.fillStyle = scoreColor;
      ctx.beginPath();
      ctx.arc(x + w - 10, y + 10, 7, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = "bold 8px Arial";
      ctx.textAlign = "center";
      ctx.fillText(room.vastuScore.toString(), x + w - 10, y + 13);
    });

    // Draw compass
    const compassX = canvas.width - 50;
    const compassY = 50;
    
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(compassX, compassY, 25, 0, 2 * Math.PI);
    ctx.stroke();
    
    // North arrow
    ctx.fillStyle = "#F44336";
    ctx.beginPath();
    ctx.moveTo(compassX, compassY - 20);
    ctx.lineTo(compassX - 6, compassY + 5);
    ctx.lineTo(compassX + 6, compassY + 5);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = "#333";
    ctx.font = "bold 10px Arial";
    ctx.textAlign = "center";
    ctx.fillText("N", compassX, compassY - 28);

  }, [plans, selectedPlan, plotWidth, plotLength, facing]);

  // Redraw when plans or selection changes
  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Get Vastu rating text
  const getVastuRating = (score: number): string => {
    if (score >= 80) return "Excellent Vastu";
    if (score >= 65) return "Good Vastu";
    if (score >= 50) return "Average Vastu";
    return "Needs Improvement";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            🏠 Smart Floor Plan Generator
          </h1>
          <p className="text-gray-600">
            Enter plot dimensions → Get complete Vastu-compliant house plans instantly
          </p>
        </div>

        {/* Input Panel */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            
            {/* Plot Length */}
            <div>
              <label className="text-xs text-gray-500 block mb-1">Plot Length (ft)</label>
              <input
                type="number"
                value={plotLength}
                onChange={(e) => setPlotLength(Number(e.target.value))}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                min="20"
                max="100"
              />
            </div>

            {/* Plot Width */}
            <div>
              <label className="text-xs text-gray-500 block mb-1">Plot Width (ft)</label>
              <input
                type="number"
                value={plotWidth}
                onChange={(e) => setPlotWidth(Number(e.target.value))}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                min="20"
                max="100"
              />
            </div>

            {/* Plot Facing */}
            <div>
              <label className="text-xs text-gray-500 block mb-1">Plot Facing</label>
              <select
                value={facing}
                onChange={(e) => setFacing(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              >
                <option value="north">North ⬆️</option>
                <option value="south">South ⬇️</option>
                <option value="east">East ➡️</option>
                <option value="west">West ⬅️</option>
              </select>
            </div>

            {/* BHK Type */}
            <div>
              <label className="text-xs text-gray-500 block mb-1">BHK Type</label>
              <select
                value={bhk}
                onChange={(e) => setBHK(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              >
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4 BHK</option>
              </select>
            </div>

            {/* Style */}
            <div>
              <label className="text-xs text-gray-500 block mb-1">Construction Style</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              >
                <option value="economy">Economy</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
            </div>

            {/* Floors */}
            <div>
              <label className="text-xs text-gray-500 block mb-1">Floors</label>
              <select
                value={floors}
                onChange={(e) => setFloors(Number(e.target.value))}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              >
                <option value={1}>G Floor</option>
                <option value={2}>G+1</option>
                <option value={3}>G+2</option>
                <option value={4}>G+3</option>
              </select>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generatePlans}
            disabled={isGenerating}
            className="w-full mt-6 bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Plans...
              </>
            ) : (
              <>
                <span>🎨</span>
                Generate Floor Plans
              </>
            )}
          </button>
          
          <p className="text-xs text-gray-400 text-center mt-2">
            Total Plot Area: {plotWidth * plotLength} sq ft
          </p>
        </div>

        {/* Results Section */}
        {plans.length > 0 && (
          <>
            {/* Plan Selector */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {plans.map((plan, index) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(index)}
                  className={`p-4 rounded-xl text-left transition-all ${
                    selectedPlan === index
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm">{plan.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      plan.vastuScore >= 80 ? "bg-green-100 text-green-700" :
                      plan.vastuScore >= 60 ? "bg-yellow-100 text-yellow-700" :
                      "bg-red-100 text-red-700"
                    } ${selectedPlan === index ? "bg-white/20 text-white" : ""}`}>
                      {plan.vastuScore}%
                    </span>
                  </div>
                  <div className={`text-xs ${selectedPlan === index ? "text-blue-100" : "text-gray-500"}`}>
                    <div>Carpet: {plan.carpetArea} sq ft</div>
                    <div>Efficiency: {plan.efficiency}%</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Canvas Display */}
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {plans[selectedPlan]?.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {plotWidth}' × {plotLength}' Plot • {bhk} BHK • {facing} Facing
                  </p>
                </div>
                <button
                  onClick={() => {
                    const canvas = canvasRef.current;
                    if (canvas) {
                      const link = document.createElement("a");
                      link.download = `floor-plan-${plotWidth}x${plotLength}-${bhk}bhk.png`;
                      link.href = canvas.toDataURL("image/png");
                      link.click();
                    }
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium flex items-center gap-2"
                >
                  <span>📸</span> Download Plan
                </button>
              </div>
              
              <div className="overflow-auto border border-gray-200 rounded-lg bg-gray-50 p-2">
                <canvas ref={canvasRef} className="mx-auto" />
              </div>
              
              <div className="flex items-center justify-center gap-6 mt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  Excellent (80-100%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  Good (60-79%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  Needs Work (&lt;60%)
                </span>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-gray-500 text-xs mb-1">Plot Area</p>
                <p className="text-2xl font-bold text-gray-800">{plotWidth * plotLength} sq ft</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-gray-500 text-xs mb-1">Carpet Area</p>
                <p className="text-2xl font-bold text-gray-800">{plans[selectedPlan]?.carpetArea} sq ft</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-gray-500 text-xs mb-1">Vastu Score</p>
                <p className={`text-2xl font-bold ${
                  plans[selectedPlan]?.vastuScore >= 80 ? "text-green-600" :
                  plans[selectedPlan]?.vastuScore >= 60 ? "text-yellow-600" : "text-red-600"
                }`}>
                  {plans[selectedPlan]?.vastuScore}% - {getVastuRating(plans[selectedPlan]?.vastuScore || 0)}
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-gray-500 text-xs mb-1">Est. Cost</p>
                <p className="text-2xl font-bold text-blue-600">₹{formatCurrency(plans[selectedPlan]?.estimatedCost || 0)}</p>
              </div>
            </div>

            {/* Room List */}
            <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
              <h4 className="font-semibold text-gray-800 mb-3">Room Details</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {plans[selectedPlan]?.rooms.filter(r => r.type !== "passage").map(room => (
                  <div key={room.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: room.color }}></div>
                      <span className="text-sm text-gray-700">{room.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{room.width}'×{room.length}'</span>
                      <span className={`text-xs font-semibold ${
                        room.vastuScore >= 80 ? "text-green-600" :
                        room.vastuScore >= 60 ? "text-yellow-600" : "text-red-600"
                      }`}>
                        {room.vastuScore}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`https://wa.me/916205820278?text=I'm%20interested%20in%20the%20${plotWidth}x${plotLength}%20${bhk}%20BHK%20floor%20plan%20(${facing}%20facing)`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                <span>💬</span>
                Get Working Drawings & Estimates
              </a>
              <button
                onClick={generatePlans}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                <span>🔄</span>
                Regenerate More Options
              </button>
            </div>
          </>
        )}

        {/* Empty State */}
        {plans.length === 0 && !isGenerating && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <span className="text-6xl mb-4 block">🏗️</span>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Ready to Design Your Home?</h3>
            <p className="text-gray-500 mb-6">
              Click "Generate Floor Plans" above to create Vastu-compliant layouts for your plot.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <span>✓ 1-4 BHK Options</span>
              <span>✓ Vastu Compliance</span>
              <span>✓ Cost Estimation</span>
              <span>✓ Download Plans</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}