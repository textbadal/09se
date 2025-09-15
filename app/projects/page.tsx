"use client";

import { useState } from "react";
import { FileText, Search } from "lucide-react";
import GalleryPage from "../gallery/page";

const projects = [
  {
    id: 1,
    title: "27x51 Floor Plan",
    description: "Spacious 3BHK with modern elevation design.",
    dimensions: { width: 27, length: 51 },
    pdf: "/projects/prashant patel ji-ground floor 1.pdf",
  },
  {
    id: 2,
    title: "27x51 Floor Plan",
    description: "Perfect for small families, 3 bedrooms and hall.",
    dimensions: { width: 27, length: 51 },
    pdf: "/projects/prashant patel ji- FF final plan.pdf",
  },
  {
    id: 3,
    title: "30x40 Floor Plan",
    description: "Luxury duplex with parking space.",
    dimensions: { width: 30, length: 40 },
    pdf: "/projects/30X40 (ground floor plan).pdf",
  },
  {
    id: 4,
    title: "48x58 Floor Plan",
    description: "Luxury duplex with parking space.",
    dimensions: { width: 48, length: 58 },
    pdf: "/projects/GROUND FLOOR PLAN.pdf",
  },
  {
    id: 5,
    title: "26x60 Floor Plan",
    description: "Luxury duplex with parking space.",
    dimensions: { width: 26, length: 60 },
    pdf: "/projects/GROUND FLOOR PLAN 1.pdf",
  },
  {
    id: 6,
    title: "46x28 Floor Plan",
    description: "Luxury duplex with parking space.",
    dimensions: { width: 46, length: 28 },
    pdf: "/projects/28X46 (GROUND FLOOR PLAN).pdf",
  },
  {
    id: 7,
    title: "38x45 Floor Plan",
    description: "Luxury duplex with parking space.",
    dimensions: { width: 38, length: 45 },
    pdf: "/projects/GROUND FLOOR PLAN (Mr.VAIBHAV JI)).merged.pdf",
  },
  {
    id: 8,
    title: "42x58 Floor Plan",
    description: "Luxury duplex with parking space.",
    dimensions: { width: 42, length: 58 },
    pdf: "/projects/GROUND FLOOR PLAN 2.pdf",
  },
  {
    id: 9,
    title: "41x48 Floor Plan",
    description: "Luxury duplex with parking space.",
    dimensions: { width: 41, length: 48 },
    pdf: "/projects/SONU JI 1ST FLOOR  PLAN (F).pdf",
  },
  {
    id: 10,
    title: "41x48 Floor Plan",
    description: "Luxury duplex with parking space.",
    dimensions: { width: 41, length: 48 },
    pdf: "/projects/SONU JI GROUND FLOOR PLAN  (F).pdf",
  },
  {
    id: 11,
    title: "51x48 Floor Plan",
    description: "Luxury duplex with parking space.",
    dimensions: { width: 51, length: 48 },
    pdf: "/projects/SONU JI BASEMENT FLOOR PLAN (F1).pdf",
  },
  {
    id: 12,
    title: "23x51 Floor Plan",
    description: "Luxury duplex with parking space.",
    dimensions: { width: 23, length: 51 },
    pdf: "/projects/MR BADAL RAJ JI GROUND FLOOR PLAN.pdf",
  },
  {
    id: 13,
    title: "1BHK APARTMENT 40' X 50'.pdf",
    description: "Luxury duplex with parking space.",
    dimensions: { width: 40, length: 50 },
    pdf: "/projects/1BHK APARTMENT 40' X 50'.pdf",
  },
  {
    id: 14,
    title: "1RK APATMENT 40' X 50'.pdf",
    description: "Luxury duplex with parking space.",
    dimensions: { width: 40, length: 50 },
    pdf: "/projects/1RK APATMENT 40' X 50'.pdf",
  },
  {
    id: 15,
    title: "1RK APATMENT-2 40' X 50'.pdf",
    description: "Luxury duplex with parking space.",
    dimensions: { width: 40, length: 50 },
    pdf: "/projects/1RK APATMENT-2 40' X 50'.pdf",
  },
  {
    id: 16,
    title: "1RK APATMENT-3 40' X 50'.pdf",
    description: "Luxury duplex with parking space.",
    dimensions: { width: 40, length: 50 },
    pdf: "/projects/1RK APATMENT-3 40' X 50'.pdf",
  },
];

export default function ProjectsPage() {
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");

  const filteredProjects = projects.filter((project) => {
    const matchWidth = width ? project.dimensions.width === Number(width) : true;
    const matchLength = length ? project.dimensions.length === Number(length) : true;
    return matchWidth && matchLength;
  });

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        📐 Find Your Floor Plan
      </h1>

      {/* Search Bar */}
      <form
        className="flex flex-col sm:flex-row gap-3 justify-center mb-10"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="number"
          placeholder="Width (ft)"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          className="w-full sm:w-40 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          type="number"
          placeholder="Length (ft)"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="w-full sm:w-40 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <button className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
          <Search size={16} /> Search
        </button>
      </form>

      {/* Results */}
      {filteredProjects.length > 0 ? (
        <ul className="space-y-5">
          {filteredProjects.map((project) => (
            <li
              key={project.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border rounded-lg p-5 shadow-sm hover:shadow-md transition"
            >
              {/* Left Info */}
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{project.title}</h3>
                <p className="text-gray-600 text-sm">{project.description}</p>
                <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  {project.dimensions.width}×{project.dimensions.length} ft
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-3 w-full sm:w-auto">
                <a
                  href={project.pdf}
                  target="_blank"
                  className="flex-1 sm:flex-none px-4 py-2 text-sm rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-center"
                >
                  View
                </a>
                <a
                  href={project.pdf}
                  download
                  className="flex-1 sm:flex-none px-4 py-2 text-sm rounded-lg bg-amber-500 text-white hover:bg-amber-600 text-center"
                >
                  Download
                </a>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-500 mt-12">
          <FileText className="mx-auto mb-3 text-gray-400" size={40} />
          <p>No plans found for {width && length ? `${width}×${length} ft` : "your search"}.</p>
          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(
              `${width}x${length} house floor plan pdf`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Search on Google →
          </a>
        </div>
       )}
<GalleryPage />
</section>

);
}