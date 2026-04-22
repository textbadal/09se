"use client";

import { useState } from "react";

/* ✅ TYPES */
type VastuForm = {
  plot: string;
  entrance: string;
  kitchen: string;
  bedroom: string;
  bathroom: string;
  living: string;
};

type VastuResult = {
  score: number;
  tips: string[];
} | null;

type SelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
};

/* ✅ MAIN COMPONENT */
export default function VastuPage() {
  const [form, setForm] = useState<VastuForm>({
    plot: "north",
    entrance: "east",
    kitchen: "southeast",
    bedroom: "southwest",
    bathroom: "northwest",
    living: "north",
  });

  const [result, setResult] = useState<VastuResult>(null);

  const handleChange = (key: keyof VastuForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const calculateVastu = () => {
    let score = 100;
    const tips: string[] = [];

    // Rules
    if (!["north", "east"].includes(form.entrance)) {
      score -= 20;
      tips.push("Main entrance should ideally face North or East.");
    }

    if (form.kitchen !== "southeast") {
      score -= 15;
      tips.push("Kitchen is best in South-East direction.");
    }

    if (form.bedroom !== "southwest") {
      score -= 15;
      tips.push("Master bedroom should be in South-West.");
    }

    if (form.bathroom !== "northwest") {
      score -= 10;
      tips.push("Bathroom is ideal in North-West.");
    }

    if (form.living !== "north" && form.living !== "east") {
      score -= 10;
      tips.push("Living room should be in North or East.");
    }

    if (form.plot === "south") {
      score -= 10;
      tips.push("South-facing plots need careful vastu planning.");
    }

    setResult({ score, tips });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">

      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">🧭 Vastu Analysis Tool</h1>
        <p className="text-gray-600 mt-2">
          Check your home’s vastu compliance instantly
        </p>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-8 space-y-6">

        {/* Form */}
        <div className="grid md:grid-cols-2 gap-6">

          <Select
            label="Plot Facing"
            value={form.plot}
            onChange={(v) => handleChange("plot", v)}
            options={["north", "east", "west", "south"]}
          />

          <Select
            label="Main Entrance"
            value={form.entrance}
            onChange={(v) => handleChange("entrance", v)}
            options={["north", "east", "west", "south"]}
          />

          <Select
            label="Kitchen Direction"
            value={form.kitchen}
            onChange={(v) => handleChange("kitchen", v)}
            options={["southeast", "northwest", "southwest", "northeast"]}
          />

          <Select
            label="Master Bedroom"
            value={form.bedroom}
            onChange={(v) => handleChange("bedroom", v)}
            options={["southwest", "northwest", "northeast", "southeast"]}
          />

          <Select
            label="Bathroom"
            value={form.bathroom}
            onChange={(v) => handleChange("bathroom", v)}
            options={["northwest", "southeast", "southwest", "northeast"]}
          />

          <Select
            label="Living Room"
            value={form.living}
            onChange={(v) => handleChange("living", v)}
            options={["north", "east", "west", "south"]}
          />

        </div>

        {/* Button */}
        <button
          onClick={calculateVastu}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Check Vastu Score
        </button>

        {/* Result */}
        {result && (
          <div className="space-y-6">

            {/* Score */}
            <div>
              <p className="text-center font-bold text-xl">
                Vastu Score: {result.score}/100
              </p>

              <div className="w-full bg-gray-200 h-3 rounded-full mt-2">
                <div
                  className={`h-3 rounded-full ${
                    result.score > 80
                      ? "bg-green-500"
                      : result.score > 50
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${result.score}%` }}
                />
              </div>
            </div>

            {/* Tips */}
            <div className="bg-white border rounded-lg p-4">
              <p className="font-semibold mb-2">Suggestions:</p>

              {result.tips.length === 0 ? (
                <p className="text-green-600 text-sm">
                  Your plan is vastu compliant ✅
                </p>
              ) : (
                <ul className="text-sm space-y-1">
                  {result.tips.map((tip, i) => (
                    <li key={i}>• {tip}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* CTA */}
            <a
              href="https://wa.me/916205820278?text=I%20checked%20vastu%20and%20want%20house%20design"
              target="_blank"
              className="block bg-green-500 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Get Vastu Perfect House Plan
            </a>

          </div>
        )}

      </div>

      {/* Trust */}
      <div className="mt-10 text-center text-sm text-gray-500">
        Trusted by 5000+ homeowners across India
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 text-center mt-4">
        *This is a basic vastu analysis. Final planning should be done by expert.
      </p>

    </div>
  );
}

/* ✅ SELECT COMPONENT */
function Select({ label, value, onChange, options }: SelectProps) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border px-4 py-3 rounded-lg"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}