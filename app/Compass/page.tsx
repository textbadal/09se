"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type Facing = "North" | "East" | "South" | "West";

export default function CompassAdvisorPage() {
  const [heading, setHeading] = useState(0);
  const [isSupported, setIsSupported] = useState(false);

  // ---- Device orientation ----
  useEffect(() => {
    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      setIsSupported(true);

      const handler = (e: DeviceOrientationEvent) => {
        if (e.alpha != null) setHeading(e.alpha);
      };

      window.addEventListener("deviceorientation", handler);
      return () => window.removeEventListener("deviceorientation", handler);
    }
  }, []);

  // ---- Desktop fallback ----
  const rotateLeft = () => setHeading((p) => (p - 15 + 360) % 360);
  const rotateRight = () => setHeading((p) => (p + 15) % 360);

  // ---- Degree → Facing ----
  const facing: Facing = useMemo(() => {
    const d = heading;
    if (d >= 45 && d < 135) return "East";
    if (d >= 135 && d < 225) return "South";
    if (d >= 225 && d < 315) return "West";
    return "North";
  }, [heading]);

  // ---- Vastu suggestion engine (simple + explainable) ----
  const suggestions = useMemo(() => {
    // Base “ideal” zones (directional guidance)
    const base = {
      entrance: "North / East",
      living: "North / East",
      kitchen: "South-East",
      masterBedroom: "South-West",
      kidsBedroom: "West / North-West",
      toilet: "West / South",
      pooja: "North-East",
      staircase: "South / West",
      waterTank: "South-West (overhead), North-East (underground)",
    };

    // Adjust emphasis by plot facing (simple heuristic)
    let emphasis: string[] = [];
    let score = 80;

    if (facing === "North") {
      emphasis = [
        "Main gate/entrance in North or North-East",
        "Keep North side open for light",
      ];
      score = 90;
    } else if (facing === "East") {
      emphasis = [
        "Entrance in East or North-East",
        "Maximize morning sunlight in living areas",
      ];
      score = 92;
    } else if (facing === "South") {
      emphasis = [
        "Shift main entrance towards South-East or South-West (avoid center South)",
        "Use shading on South facade",
      ];
      score = 75;
    } else {
      // West
      emphasis = [
        "Entrance towards North-West or West-North",
        "Control heat gain on West walls",
      ];
      score = 78;
    }

    return { base, emphasis, score };
  }, [facing]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-2 text-center">
        Smart Plot Direction & Vastu Advisor
      </h1>

      <p className="text-gray-600 mb-6 text-center max-w-md">
        We detect your direction and suggest a practical room layout for better
        light, ventilation, and vastu alignment.
      </p>

      {/* ---- Floor Plan + Compass Overlay ---- */}
      <div className="relative w-full max-w-xl">
        <Image
          src="/images/floorplan.jpg" // replace with your image
          alt="Floor Plan"
          width={600}
          height={600}
          className="rounded-xl shadow-md"
        />

        {/* Compass */}
        <div className="absolute top-4 right-4 w-24 h-24 bg-white/80 backdrop-blur rounded-full shadow flex items-center justify-center">
          <div
            className="relative w-20 h-20 rounded-full border-2 border-gray-400 flex items-center justify-center transition-transform duration-300"
            style={{ transform: `rotate(${-heading}deg)` }}
          >
            <span className="absolute top-1 text-red-500 text-xs font-bold">
              N
            </span>
            <span className="absolute right-1 text-xs">E</span>
            <span className="absolute bottom-1 text-xs">S</span>
            <span className="absolute left-1 text-xs">W</span>
            <div className="w-2 h-2 bg-black rounded-full"></div>
          </div>
        </div>

        {/* Facing badge */}
        <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow">
          {facing} Facing Plot
        </div>
      </div>

      {/* ---- Heading ---- */}
      <p className="mt-4 text-sm text-gray-600">
        Heading: {Math.round(heading)}°
      </p>

      {/* Desktop controls */}
      {!isSupported && (
        <div className="flex gap-2 mt-3">
          <button
            onClick={rotateLeft}
            className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            ⟲
          </button>
          <button
            onClick={rotateRight}
            className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            ⟳
          </button>
        </div>
      )}

      {/* ---- Suggestions ---- */}
      <div className="mt-8 grid md:grid-cols-2 gap-6 w-full max-w-3xl">
        {/* Base layout */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="font-semibold mb-3">Recommended Room Placement</h2>
          <ul className="text-sm space-y-1">
            <li>Entrance: {suggestions.base.entrance}</li>
            <li>Living: {suggestions.base.living}</li>
            <li>Kitchen: {suggestions.base.kitchen}</li>
            <li>Master Bedroom: {suggestions.base.masterBedroom}</li>
            <li>Kids Bedroom: {suggestions.base.kidsBedroom}</li>
            <li>Toilet: {suggestions.base.toilet}</li>
            <li>Pooja Room: {suggestions.base.pooja}</li>
            <li>Staircase: {suggestions.base.staircase}</li>
            <li>Water Tank: {suggestions.base.waterTank}</li>
          </ul>
        </div>

        {/* Facing-specific advice */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="font-semibold mb-3">For {facing} Facing Plot</h2>
          <ul className="text-sm space-y-2">
            {suggestions.emphasis.map((e, i) => (
              <li key={i}>• {e}</li>
            ))}
          </ul>

          <div className="mt-4">
            <p className="text-sm text-gray-500">Vastu Compatibility</p>
            <p className="text-xl font-semibold text-green-600">
              {suggestions.score} / 100
            </p>
          </div>
        </div>
      </div>

      {/* ---- CTA ---- */}
      <div className="mt-8 bg-blue-600 text-white rounded-xl p-6 text-center max-w-md">
        <h2 className="text-lg font-semibold mb-2">
          Get a Custom Plan for Your Plot
        </h2>
        <p className="text-sm mb-4">
          We’ll design your house based on your exact direction, plot size, and
          needs.
        </p>

        <a
          href="https://wa.me/916205820278"
          target="_blank"
          className="inline-block bg-white text-blue-600 px-5 py-2 rounded-lg font-medium hover:bg-gray-100"
        >
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}