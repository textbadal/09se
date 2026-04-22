"use client";

import { useState } from "react";
import Link from "next/link";

/* ✅ TYPES */
type Direction = 
  | "north" | "south" | "east" | "west" 
  | "northeast" | "northwest" | "southeast" | "southwest";

type RoomType = "entrance" | "kitchen" | "bedroom" | "bathroom" | "living" | "pooja";

type VastuForm = Record<RoomType, Direction> & { plot: Direction };

type AnalysisResult = {
  overallScore: number;
  rating: "excellent" | "good" | "fair" | "needs-work";
  roomScores: Record<RoomType, number>;
  insights: string[];
  remedies: Array<{ room: RoomType; remedy: string; priority: "high" | "medium" | "low" }>;
  energyFlow: number;
  dosha: "vata" | "pitta" | "kapha" | "balanced";
  luckyColors: string[];
  bestDirections: Direction[];
} | null;

/* ✅ VASTU KNOWLEDGE BASE */
const idealDirections: Record<RoomType, Direction[]> = {
  entrance: ["north", "east", "northeast"],
  kitchen: ["southeast"],
  bedroom: ["southwest", "south"],
  bathroom: ["northwest", "southeast"],
  living: ["north", "east", "northeast"],
  pooja: ["northeast", "east"],
};

const directionScores: Record<RoomType, Record<Direction, number>> = {
  entrance: { north: 95, east: 100, northeast: 90, west: 70, northwest: 75, south: 50, southwest: 40, southeast: 60 },
  kitchen: { southeast: 100, northwest: 70, south: 75, east: 60, west: 65, north: 55, northeast: 30, southwest: 50 },
  bedroom: { southwest: 100, south: 90, west: 85, north: 70, east: 75, northwest: 65, southeast: 45, northeast: 35 },
  bathroom: { northwest: 95, southeast: 75, west: 70, south: 65, north: 60, east: 55, southwest: 50, northeast: 25 },
  living: { north: 100, east: 95, northeast: 90, west: 80, northwest: 75, south: 65, southeast: 60, southwest: 55 },
  pooja: { northeast: 100, east: 95, north: 90, west: 70, south: 45, southeast: 40, northwest: 65, southwest: 35 },
};

const remediesDatabase: Record<RoomType, Record<Direction, string>> = {
  entrance: {
    south: "Place a Vastu pyramid above the door",
    southwest: "Install bright yellow light at entrance",
    southeast: "Add a small water fountain near door",
  },
  kitchen: {
    northeast: "Paint walls in warm yellow or orange tones",
    southwest: "Use copper utensils and keep salt lamp",
    north: "Keep a small lamp burning when cooking",
  },
  bedroom: {
    southeast: "Use blue or white bedding, avoid red",
    northeast: "Place heavy wooden furniture in southwest corner",
    northwest: "Keep a night lamp on through the night",
  },
  bathroom: {
    northeast: "Place sea salt in corners, change weekly",
    southwest: "Keep a small plant outside bathroom door",
  },
  living: {
    south: "Use light-colored curtains and add mirrors",
    southwest: "Keep the space well-ventilated",
  },
  pooja: {
    south: "Place deity facing north direction",
    southeast: "Use white or yellow marble for flooring",
  },
};

/* ✅ MAIN COMPONENT */
export default function VastuPage() {
  const [step, setStep] = useState<"config" | "results">("config");
  const [form, setForm] = useState<VastuForm>({
    plot: "north",
    entrance: "east",
    kitchen: "southeast",
    bedroom: "southwest",
    bathroom: "northwest",
    living: "north",
    pooja: "northeast",
  });
  const [result, setResult] = useState<AnalysisResult>(null);
  const [expandedRoom, setExpandedRoom] = useState<RoomType | null>(null);

  const handleDirectionSelect = (room: RoomType | "plot", direction: Direction) => {
    setForm(prev => ({ ...prev, [room]: direction }));
  };

  const analyzeVastu = () => {
    const roomScores: Record<RoomType, number> = {} as any;
    let totalScore = 0;
    const insights: string[] = [];
    const remedies: AnalysisResult["remedies"] = [];

    // Calculate scores
    (Object.keys(idealDirections) as RoomType[]).forEach(room => {
      const direction = form[room];
      const score = directionScores[room][direction] || 50;
      roomScores[room] = score;
      totalScore += score;

      // Generate insights
      if (score >= 90) {
        insights.push(`✅ Your ${room} placement is excellent`);
      } else if (score < 60) {
        insights.push(`⚠️ ${room} needs attention`);
        const remedy = remediesDatabase[room]?.[direction];
        if (remedy) {
          remedies.push({
            room,
            remedy,
            priority: score < 40 ? "high" : "medium",
          });
        }
      }
    });

    const overallScore = Math.round(totalScore / 6);
    
    // Determine rating
    const rating = overallScore >= 85 ? "excellent" : 
                   overallScore >= 70 ? "good" : 
                   overallScore >= 55 ? "fair" : "needs-work";

    // Calculate energy flow
    const energyFlow = Math.round((roomScores.entrance + roomScores.living + roomScores.pooja) / 3);

    // Determine dosha based on elements
    const doshaMap: Record<string, "vata" | "pitta" | "kapha" | "balanced"> = {
      southeast: "pitta", south: "pitta",
      southwest: "kapha", west: "vata",
      northwest: "vata", north: "kapha",
      northeast: "balanced", east: "balanced",
    };
    const dosha = doshaMap[form.plot] || "balanced";

    // Lucky colors based on dosha
    const luckyColors = {
      vata: ["Warm Yellow", "Orange", "Gold", "Red"],
      pitta: ["White", "Blue", "Silver", "Green"],
      kapha: ["Red", "Orange", "Yellow", "Purple"],
      balanced: ["White", "Yellow", "Green", "Blue"],
    }[dosha];

    // Best directions
    const bestDirections = form.plot === "north" || form.plot === "east" 
      ? ["north", "east", "northeast"] as Direction[]
      : ["west", "northwest", "south"] as Direction[];

    setResult({
      overallScore,
      rating,
      roomScores,
      insights,
      remedies: remedies.slice(0, 4),
      energyFlow,
      dosha,
      luckyColors,
      bestDirections,
    });
    
    setStep("results");
  };

  const resetAnalysis = () => {
    setStep("config");
    setResult(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    if (score >= 40) return "text-orange-500";
    return "text-red-500";
  };

  const getRatingEmoji = (rating: string) => {
    return { excellent: "🏆", good: "⭐", fair: "👍", "needs-work": "🔧" }[rating] || "📊";
  };

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🧿</span>
            <span className="font-serif text-xl font-semibold text-gray-800">VastuSense</span>
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">AI</span>
          </div>
          
          {step === "results" && (
            <button
              onClick={resetAnalysis}
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              <span>←</span> New Analysis
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        
        {step === "config" ? (
          <>
            {/* Welcome Card */}
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-serif text-gray-800 mb-3">
                Harmonize Your Space
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Select the direction for each room to discover your home's Vastu energy
              </p>
            </div>

            {/* Plot Facing */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="font-medium text-gray-700 mb-4 flex items-center gap-2">
                <span>🏠</span> Plot Facing Direction
              </h2>
              <div className="flex flex-wrap gap-2">
                {["north", "south", "east", "west"].map(dir => (
                  <button
                    key={dir}
                    onClick={() => handleDirectionSelect("plot", dir as Direction)}
                    className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                      form.plot === dir
                        ? "bg-gray-900 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <span className="capitalize">{dir}</span>
                    {dir === "north" && " ⬆️"}
                    {dir === "south" && " ⬇️"}
                    {dir === "east" && " ➡️"}
                    {dir === "west" && " ⬅️"}
                  </button>
                ))}
              </div>
            </div>

            {/* Room Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {(Object.keys(idealDirections) as RoomType[]).map(room => {
                const currentDirection = form[room];
                const isIdeal = idealDirections[room].includes(currentDirection);
                
                return (
                  <div key={room} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-gray-800 capitalize flex items-center gap-2">
                          <span>
                            {room === "entrance" && "🚪"}
                            {room === "kitchen" && "🍳"}
                            {room === "bedroom" && "🛏️"}
                            {room === "bathroom" && "🚿"}
                            {room === "living" && "🛋️"}
                            {room === "pooja" && "🕉️"}
                          </span>
                          {room}
                        </h3>
                        {isIdeal && (
                          <span className="text-green-500 text-xs bg-green-50 px-2 py-1 rounded-full">✓ Ideal</span>
                        )}
                      </div>
                      
                      <select
                        value={currentDirection}
                        onChange={(e) => handleDirectionSelect(room, e.target.value as Direction)}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300"
                      >
                        {Object.keys(directionScores[room]).map(dir => (
                          <option key={dir} value={dir} className="capitalize">
                            {dir} {idealDirections[room].includes(dir as Direction) ? "⭐" : ""}
                          </option>
                        ))}
                      </select>
                      
                      <p className="text-xs text-gray-400 mt-2">
                        Ideal: {idealDirections[room].join(", ")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Analyze Button */}
            <button
              onClick={analyzeVastu}
              className="w-full bg-gray-900 text-white py-4 rounded-xl font-medium hover:bg-gray-800 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>🔮</span>
              Analyze Vastu Energy
              <span>→</span>
            </button>
          </>
        ) : (
          /* Results View */
          result && (
            <div className="space-y-6">
              
              {/* Score Hero */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="text-center">
                    <div className="text-6xl mb-2">{getRatingEmoji(result.rating)}</div>
                    <div className="text-5xl font-bold">{result.overallScore}</div>
                    <div className="text-gray-400 text-sm">out of 100</div>
                    <div className="mt-2 px-3 py-1 bg-white/10 rounded-full text-xs capitalize">
                      {result.rating.replace("-", " ")}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="text-2xl font-serif mb-3">
                      {result.overallScore >= 70 ? "✨ Beautiful Energy Flow" : "🌱 Good Foundation"}
                    </h2>
                    <div className="space-y-2">
                      {result.insights.slice(0, 3).map((insight, i) => (
                        <p key={i} className="text-gray-300 text-sm flex items-start gap-2">
                          <span className="text-white">•</span>
                          {insight}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Room Scores Grid */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-medium text-gray-800 mb-4">Room-by-Room Analysis</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {(Object.entries(result.roomScores) as [RoomType, number][]).map(([room, score]) => (
                    <button
                      key={room}
                      onClick={() => setExpandedRoom(expandedRoom === room ? null : room)}
                      className={`p-3 rounded-xl border transition-all ${
                        expandedRoom === room 
                          ? "border-purple-300 bg-purple-50" 
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-2xl mb-1">
                        {room === "entrance" && "🚪"}
                        {room === "kitchen" && "🍳"}
                        {room === "bedroom" && "🛏️"}
                        {room === "bathroom" && "🚿"}
                        {room === "living" && "🛋️"}
                        {room === "pooja" && "🕉️"}
                      </div>
                      <p className="text-xs font-medium capitalize">{room}</p>
                      <p className={`text-lg font-bold ${getScoreColor(score)}`}>{score}</p>
                    </button>
                  ))}
                </div>
                
                {/* Expanded Room Details */}
                {expandedRoom && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm font-medium capitalize mb-2">{expandedRoom}</p>
                    <p className="text-sm text-gray-600">
                      Current: {form[expandedRoom]} • Ideal: {idealDirections[expandedRoom].join(", ")}
                    </p>
                    {directionScores[expandedRoom][form[expandedRoom]] < 70 && (
                      <p className="text-sm text-purple-600 mt-2">
                        💡 {remediesDatabase[expandedRoom]?.[form[expandedRoom]] || "Consult expert for remedy"}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Energy & Dosha Cards */}
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Energy Flow */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
                  <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                    <span>🌀</span> Energy Flow Index
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-gray-800">{result.energyFlow}%</div>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
                          style={{ width: `${result.energyFlow}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    {result.energyFlow >= 80 ? "Excellent energy circulation" : 
                     result.energyFlow >= 60 ? "Good flow with room for improvement" : 
                     "Energy flow needs attention"}
                  </p>
                </div>

                {/* Dosha */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
                  <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                    <span>☯️</span> Dominant Energy
                  </h3>
                  <p className="text-3xl font-serif capitalize mb-2">{result.dosha}</p>
                  <p className="text-sm text-gray-500">
                    {result.dosha === "vata" && "Creative and dynamic energy"}
                    {result.dosha === "pitta" && "Passionate and focused energy"}
                    {result.dosha === "kapha" && "Stable and grounded energy"}
                    {result.dosha === "balanced" && "Perfect elemental balance"}
                  </p>
                </div>
              </div>

              {/* Remedies */}
              {result.remedies.length > 0 && (
                <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
                  <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                    <span>💫</span> Recommended Remedies
                  </h3>
                  <div className="space-y-3">
                    {result.remedies.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-200">
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          item.priority === "high" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {item.priority}
                        </span>
                        <div>
                          <p className="text-sm font-medium capitalize">{item.room}</p>
                          <p className="text-sm text-gray-600">{item.remedy}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Lucky Colors & Directions */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-6 border border-indigo-200">
                  <h3 className="font-medium text-indigo-800 mb-3">🎨 Lucky Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.luckyColors.map(color => (
                      <span key={color} className="px-4 py-2 bg-white rounded-full text-sm text-indigo-700 shadow-sm">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 border border-emerald-200">
                  <h3 className="font-medium text-emerald-800 mb-3">🧭 Auspicious Directions</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.bestDirections.map(dir => (
                      <span key={dir} className="px-4 py-2 bg-white rounded-full text-sm text-emerald-700 shadow-sm capitalize">
                        {dir}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gray-900 rounded-3xl p-8 text-center">
                <h3 className="text-2xl font-serif text-white mb-3">
                  Ready to Perfect Your Vastu?
                </h3>
                <p className="text-gray-400 mb-6">
                  Get a personalized consultation with our Vastu experts
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={`https://wa.me/916205820278?text=I%20want%20Vastu%20consultation.%20My%20score%20is%20${result.overallScore}%25`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                  >
                    <span>💬</span>
                    WhatsApp Consultation
                  </a>
                  <Link
                    href="/vastu-services"
                    className="px-8 py-3 bg-white text-gray-900 rounded-xl font-medium hover:bg-gray-100 transition-all"
                  >
                    View Services →
                  </Link>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={resetAnalysis}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  ← Adjust Configuration
                </button>
                <button
                  onClick={() => window.print()}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  📄 Save Report
                </button>
              </div>
            </div>
          )
        )}
      </main>
    </div>
  );
}