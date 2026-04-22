"use client";

import { useState } from "react";

/* ✅ TYPES */
type Materials = {
  cement: number;
  steel: string;
  sand: number;
  aggregate: number;
};

type Result = {
  totalArea: number;
  cost: number;
  materials: Materials;
} | null;

/* ✅ COMPONENT */
export default function CalculatorPage() {
  const [area, setArea] = useState<string>("");
  const [floors, setFloors] = useState<number>(1);
  const [result, setResult] = useState<Result>(null);

  const calculate = () => {
    if (!area) return;

    const plot = Number(area);
    if (isNaN(plot) || plot <= 0) return;

    const totalArea = plot * floors;

    // cost estimate
    const rate = 1800;
    const cost = totalArea * rate;

    // material calculation
    const factor = totalArea / 1000;

    const materials: Materials = {
      cement: Math.round(400 * factor),
      steel: (4 * factor).toFixed(2),
      sand: Math.round(2000 * factor),
      aggregate: Math.round(1500 * factor),
    };

    setResult({
      totalArea,
      cost,
      materials,
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">

      <h1 className="text-3xl font-bold text-center mb-8">
        🧮 Construction Calculator
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-6 space-y-6">

        {/* Plot Size */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Plot Size (sq ft)
          </label>
          <input
            type="number"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full border px-4 py-3 rounded-lg"
            placeholder="e.g. 1000"
          />
        </div>

        {/* Floors */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Number of Floors
          </label>
          <select
            value={floors}
            onChange={(e) => setFloors(Number(e.target.value))}
            className="w-full border px-4 py-3 rounded-lg"
          >
            <option value={1}>Ground Floor</option>
            <option value={2}>G + 1</option>
            <option value={3}>G + 2</option>
            <option value={4}>G + 3</option>
          </select>
        </div>

        {/* Button */}
        <button
          onClick={calculate}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Calculate Estimate
        </button>

        {/* RESULT */}
        {result && (
          <div className="space-y-4">

            {/* Area */}
            <div className="bg-gray-100 p-4 rounded-lg text-center font-semibold">
              Total Built-up Area: {result.totalArea} sq ft
            </div>

            {/* Cost */}
            <div className="bg-green-100 p-4 rounded-lg text-center font-bold text-lg text-green-800">
              Estimated Cost: ₹{result.cost.toLocaleString()}
            </div>

            {/* Materials */}
            <div className="bg-white border p-4 rounded-lg">
              <p className="font-semibold mb-2">Material Estimate:</p>

              <ul className="text-sm space-y-1">
                <li>🧱 Cement: {result.materials.cement} bags</li>
                <li>🔩 Steel: {result.materials.steel} tons</li>
                <li>🏖️ Sand: {result.materials.sand} cft</li>
                <li>🪨 Aggregate: {result.materials.aggregate} cft</li>
              </ul>
            </div>

            {/* CTA */}
            <a
              href="https://wa.me/916205820278?text=I%20got%20construction%20estimate%20and%20want%20design"
              target="_blank"
              className="block bg-green-500 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Get House Design on WhatsApp
            </a>

          </div>
        )}

      </div>
    </div>
  );
}