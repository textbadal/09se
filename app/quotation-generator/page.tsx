"use client";

import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Printer, Share2, Plus, Trash2, Check, Edit3 } from "lucide-react";

interface ServiceConfig {
  id: string;
  label: string;
  prices: Record<string, number>;
  deliverables: string[];
}

interface CustomItem {
  id: string;
  label: string;
  price: number;
}

const SERVICES_CATALOG: ServiceConfig[] = [
  {
    id: "architectural",
    label: "Floor Plan",
    prices: { Ground: 2999, "G+1": 3999, "G+2": 4499, "G+3": 4999 },
    deliverables: [
      "Working Floor Plans (All Floors)",
      "Site & Furniture Layouts",
      "Wall Centerline / Masonry Plans",
      "Cross-Sections & Openings Schedules",
    ],
  },
  {
    id: "structural",
    label: "Structural Drawings",
    prices: { Ground: 4000, "G+1": 4500, "G+2": 4500, "G+3": 6500 },
    deliverables: [
      "Foundation & Footing Detail Maps",
      "Column Placement & Layout Schemes",
      "Plinth & Roof Beam Concrete Schedules",
      "Slab Reinforcement Specifications",
    ],
  },
  {
    id: "mep",
    label: "Electrical & Plumbing",
    prices: { Ground: 3000, "G+1": 3000, "G+2": 3000, "G+3": 4000 },
    deliverables: [
      "Electrical Schematics (Conduit Routing & Switchboard placements)",
      "Plumbing & Sanitation Plans (Freshwater & Drainage systems)",
    ],
  },
  {
    id: "elevation3d",
    label: "3D Front Elevation",
    prices: { Ground: 3000, "G+1": 3500, "G+2": 4000, "G+3": 4500 },
    deliverables: [
      "High-Fidelity Exterior 3D Rendering",
      "Material Guide Suggestions",
      "Modern Concept Color Profiles",
    ],
  },
];

export default function QuotationGenerator() {
  const quoteRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [quoteNumber, setQuoteNumber] = useState("");

  const [form, setForm] = useState({
    clientName: "",
    phone: "",
    email: "",
    projectName: "",
    location: "",
    plotArea: "",
    builtUpArea: "",
    numberOfFloors: "G+1",
    plotFacing: "East",
    revisions: "3",
    advancePercent: 35,
  });

  const [terms, setTerms] = useState<string[]>([
    "Initial concepts will be generated within 10 to 15 business days following advance acquisition. Deadlines exclude public holidays and weekends.",
    "Fee structures isolate remote technical design compilation only. Site engineering diagnostics, architectural line verification, or physical construction inspections are completely excluded.",
  ]);
  const [newTermText, setNewTermText] = useState("");

  const [selectedServices, setSelectedServices] = useState<Record<string, boolean>>({
    architectural: true,
    structural: true,
    mep: true,
    elevation3d: true,
  });

  const [customItems, setCustomItems] = useState<CustomItem[]>([]);
  const [manualLabel, setManualLabel] = useState("");
  const [manualPrice, setManualPrice] = useState("");

  useEffect(() => {
    const random = Math.floor(1000 + Math.random() * 9000);
    const date = new Date();
    setQuoteNumber(`DH-${date.getFullYear()}-${random}`);
  }, []);

  const getServicePrice = (config: ServiceConfig) => {
    return config.prices[form.numberOfFloors] || 0;
  };

  const baseTotal = SERVICES_CATALOG.filter(
    (s) => selectedServices[s.id]
  ).reduce((sum, s) => sum + getServicePrice(s), 0);

  const customTotal = customItems.reduce((sum, item) => sum + item.price, 0);
  const totalAmount = baseTotal + customTotal;

  const advancePercent = Number(form.advancePercent) || 0;
  const calculatedAdvance = Math.round(totalAmount * (advancePercent / 100));
  const calculatedBalance = totalAmount - calculatedAdvance;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleServiceToggle = (id: string) => {
    setSelectedServices((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddCustomItem = () => {
    if (!manualLabel.trim() || !manualPrice) return;

    const newItem: CustomItem = {
      id: crypto.randomUUID(),
      label: manualLabel,
      price: parseFloat(manualPrice) || 0,
    };

    setCustomItems([...customItems, newItem]);
    setManualLabel("");
    setManualPrice("");
  };

  const handleRemoveCustomItem = (id: string) => {
    setCustomItems(customItems.filter((item) => item.id !== id));
  };

  const handleAddTerm = () => {
    if (!newTermText.trim()) return;
    setTerms([...terms, newTermText.trim()]);
    setNewTermText("");
  };

  const handleRemoveTerm = (index: number) => {
    setTerms(terms.filter((_, i) => i !== index));
  };

  const handleTermChange = (index: number, value: string) => {
    const updated = [...terms];
    updated[index] = value;
    setTerms(updated);
  };

  // Mobile-Friendly & Auto-Fit PDF Generator
  const downloadPDF = async () => {
    if (!quoteRef.current || isGenerating) return;
    try {
      setIsGenerating(true);

      const canvas = await html2canvas(quoteRef.current, {
        scale: 2.5,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: 1024, // Forces desktop view during capture regardless of screen size
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector<HTMLElement>("#invoice-container");
          if (clonedElement) {
            clonedElement.style.width = "800px"; // Normalizes width for PDF generation
            clonedElement.style.padding = "24px";
          }

          // Clean up oklch colors for html2canvas compatibility
          const elements = clonedDoc.getElementsByTagName("*");
          for (let i = 0; i < elements.length; i++) {
            const el = elements[i] as HTMLElement;
            if (el.style) {
              const styleDeclaration = el.style;
              for (let j = styleDeclaration.length - 1; j >= 0; j--) {
                const propName = styleDeclaration[j];
                const propValue = styleDeclaration.getPropertyValue(propName);
                if (propValue && propValue.includes("oklch")) {
                  styleDeclaration.removeProperty(propName);
                }
              }

              const computed = window.getComputedStyle(el);
              if (computed.borderColor?.includes("oklch")) {
                el.style.borderColor = "#e5e7eb";
              }
              if (computed.backgroundColor?.includes("oklch")) {
                el.style.backgroundColor =
                  el.tagName === "TABLE" || el.tagName === "TR"
                    ? "transparent"
                    : "#ffffff";
              }
              if (computed.color?.includes("oklch")) {
                el.style.color = "#1f2937";
              }
            }
          }
        },
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.98);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
      const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      if (imgHeight > pdfHeight) {
        const scaledWidth = (pdfHeight * canvas.width) / canvas.height;
        const xOffset = (pdfWidth - scaledWidth) / 2;
        pdf.addImage(imgData, "JPEG", xOffset, 0, scaledWidth, pdfHeight);
      } else {
        pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
      }

      pdf.save(`Quotation-${quoteNumber || "Draft"}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const shareWhatsApp = () => {
    const text = `*Quotation No:* ${quoteNumber}\n\n*Client:* ${
      form.clientName || "N/A"
    }\n*Project:* ${
      form.projectName || "N/A"
    }\n\n*Total Amount:* ₹${totalAmount.toLocaleString(
      "en-IN"
    )}\n*Booking Advance (${advancePercent}%):* ₹${calculatedAdvance.toLocaleString(
      "en-IN"
    )}\n\n_Dream Homes Bihar_`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-6 print:bg-white print:p-0">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 print:block">
        
        {/* FORM CONFIGURATION SIDE */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow print:hidden space-y-5">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Quotation Engine</h1>
            <p className="text-xs text-gray-500">
              Configure architectural metrics, pricing & custom terms.
            </p>
          </div>

          <div className="space-y-3.5">
            <input
              name="clientName"
              placeholder="Client Name"
              value={form.clientName}
              onChange={handleChange}
              className="w-full border p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="border p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="border p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              name="projectName"
              placeholder="Project Name"
              value={form.projectName}
              onChange={handleChange}
              className="w-full border p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              className="w-full border p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                name="plotArea"
                placeholder="Plot Area (e.g. 1200 sq.ft)"
                value={form.plotArea}
                onChange={handleChange}
                className="border p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="builtUpArea"
                placeholder="Built-up Area"
                value={form.builtUpArea}
                onChange={handleChange}
                className="border p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <select
                name="numberOfFloors"
                value={form.numberOfFloors}
                onChange={handleChange}
                className="border p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Ground">Ground</option>
                <option value="G+1">G+1</option>
                <option value="G+2">G+2</option>
                <option value="G+3">G+3</option>
              </select>
              <select
                name="plotFacing"
                value={form.plotFacing}
                onChange={handleChange}
                className="border p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option>East</option>
                <option>West</option>
                <option>North</option>
                <option>South</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-[11px] font-semibold text-gray-500 block mb-1">
                  Advance % (Milestone)
                </label>
                <input
                  type="number"
                  name="advancePercent"
                  value={form.advancePercent}
                  onChange={handleChange}
                  placeholder="35"
                  className="w-full border p-2 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-gray-500 block mb-1">
                  Free Revisions Count
                </label>
                <input
                  type="number"
                  name="revisions"
                  value={form.revisions}
                  onChange={handleChange}
                  placeholder="3"
                  className="w-full border p-2 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
            </div>

            <div className="bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-200 space-y-2.5">
              <h3 className="text-xs font-bold text-gray-500 tracking-wider uppercase">
                Select Included Modules
              </h3>
              {SERVICES_CATALOG.map((service) => (
                <label
                  key={service.id}
                  className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-200 shadow-sm cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={selectedServices[service.id]}
                    onChange={() => handleServiceToggle(service.id)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1 text-xs">
                    <span className="font-semibold text-gray-800 block">
                      {service.label}
                    </span>
                  </div>
                </label>
              ))}
            </div>

            <div className="bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-200 space-y-3">
              <h3 className="text-xs font-bold text-gray-500 tracking-wider uppercase">
                Add Custom Line Items
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g., Extra Site Inspection"
                  value={manualLabel}
                  onChange={(e) => setManualLabel(e.target.value)}
                  className="flex-1 border p-2 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                />
                <input
                  type="number"
                  placeholder="Price (₹)"
                  value={manualPrice}
                  onChange={(e) => setManualPrice(e.target.value)}
                  className="w-20 sm:w-24 border p-2 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                />
                <button
                  onClick={handleAddCustomItem}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 rounded-lg flex items-center justify-center transition"
                >
                  <Plus size={16} />
                </button>
              </div>

              {customItems.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  {customItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center bg-white p-2 rounded-lg border border-gray-100 text-xs shadow-sm"
                    >
                      <span className="text-gray-700 font-medium truncate max-w-[150px] sm:max-w-[200px]">
                        {item.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">
                          ₹{item.price.toLocaleString("en-IN")}
                        </span>
                        <button
                          onClick={() => handleRemoveCustomItem(item.id)}
                          className="text-red-500 hover:text-red-700 p-0.5 transition"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-200 space-y-3">
              <div className="flex items-center gap-1.5">
                <Edit3 size={14} className="text-gray-500" />
                <h3 className="text-xs font-bold text-gray-500 tracking-wider uppercase">
                  Customize Governance Terms
                </h3>
              </div>

              <div className="space-y-2">
                {terms.map((term, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <textarea
                      value={term}
                      onChange={(e) => handleTermChange(idx, e.target.value)}
                      rows={2}
                      className="flex-1 text-xs border p-2 rounded-lg bg-white outline-none focus:ring-1 focus:ring-blue-500 resize-y"
                    />
                    <button
                      onClick={() => handleRemoveTerm(idx)}
                      className="text-red-500 hover:text-red-700 p-1 transition mt-1"
                      title="Remove term"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Add custom clause..."
                  value={newTermText}
                  onChange={(e) => setNewTermText(e.target.value)}
                  className="flex-1 border p-2 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                />
                <button
                  onClick={handleAddTerm}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 rounded-lg flex items-center justify-center transition"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4">
            <button
              onClick={downloadPDF}
              disabled={isGenerating}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white p-2.5 rounded-lg text-xs sm:text-sm flex justify-center items-center gap-1 sm:gap-2 font-medium transition"
            >
              <Download size={16} /> {isGenerating ? "..." : "PDF"}
            </button>
            <button
              onClick={() => window.print()}
              className="bg-gray-800 hover:bg-gray-900 text-white p-2.5 rounded-lg text-xs sm:text-sm flex justify-center items-center gap-1 sm:gap-2 font-medium transition"
            >
              <Printer size={16} /> Print
            </button>
            <button
              onClick={shareWhatsApp}
              className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-lg text-xs sm:text-sm flex justify-center items-center gap-1 sm:gap-2 font-medium transition"
            >
              <Share2 size={16} /> Share
            </button>
          </div>
        </div>

        {/* INVOICE PREVIEW SIDE */}
        <div className="overflow-x-auto">
          <div
            id="invoice-container"
            ref={quoteRef}
            style={{
              backgroundColor: "#ffffff",
              color: "#1f2937",
              borderColor: "#e5e7eb",
            }}
            className="p-5 sm:p-6 rounded-2xl shadow border print:shadow-none print:border-none print:p-0 min-w-[320px]"
          >
            {/* Header */}
            <div
              className="flex justify-between border-b-2 pb-4"
              style={{ borderColor: "#f3f4f6" }}
            >
              <div>
                <h1
                  className="text-lg sm:text-xl font-black tracking-wide"
                  style={{ color: "#1e3a8a" }}
                >
                  DREAM HOMES BIHAR
                </h1>
                <p
                  className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase mt-0.5"
                  style={{ color: "#9ca3af" }}
                >
                  Architectural Drawings & Engineering Services
                </p>
              </div>
              <div className="text-right text-xs" style={{ color: "#4b5563" }}>
                <p className="font-bold text-xs sm:text-sm" style={{ color: "#111827" }}>
                  {quoteNumber || "Generating..."}
                </p>
                <p className="mt-0.5 text-[11px]" style={{ color: "#6b7280" }}>
                  {new Date().toLocaleDateString("en-IN")}
                </p>
              </div>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 text-xs">
              <div
                className="p-3 rounded-xl border"
                style={{ backgroundColor: "#f9fafb", borderColor: "#f3f4f6" }}
              >
                <h4
                  className="font-bold text-[10px] uppercase tracking-wider mb-1"
                  style={{ color: "#9ca3af" }}
                >
                  Client Details
                </h4>
                <p className="font-bold" style={{ color: "#1f2937" }}>
                  {form.clientName || "—"}
                </p>
                <p className="mt-0.5" style={{ color: "#4b5563" }}>
                  {form.phone || "—"}
                </p>
                <p style={{ color: "#4b5563" }}>{form.email || "—"}</p>
              </div>
              <div
                className="p-3 rounded-xl border"
                style={{ backgroundColor: "#f9fafb", borderColor: "#f3f4f6" }}
              >
                <h4
                  className="font-bold text-[10px] uppercase tracking-wider mb-1"
                  style={{ color: "#9ca3af" }}
                >
                  Project Scope
                </h4>
                <p className="font-bold" style={{ color: "#1f2937" }}>
                  {form.projectName || "—"}
                </p>
                <p className="mt-0.5" style={{ color: "#4b5563" }}>
                  {form.location || "—"}
                </p>
                <p
                  className="mt-1 font-semibold text-[10px] sm:text-[11px]"
                  style={{ color: "#6b7280" }}
                >
                  {form.numberOfFloors} Design | {form.plotFacing} Facing
                  {form.plotArea && ` | Plot: ${form.plotArea}`}
                  {form.builtUpArea && ` | Built-up: ${form.builtUpArea}`}
                </p>
              </div>
            </div>

            {/* Itemized Table */}
            <div className="mt-4">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr
                    className="border-b font-bold text-[10px] uppercase"
                    style={{ borderColor: "#e5e7eb", color: "#9ca3af" }}
                  >
                    <th className="pb-2 pl-1">Module Description</th>
                    <th className="pb-2 pr-1 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {SERVICES_CATALOG.filter((s) => selectedServices[s.id]).map(
                    (service) => (
                      <tr
                        key={service.id}
                        className="border-b"
                        style={{ borderColor: "#f3f4f6" }}
                      >
                        <td className="py-2.5 pl-1 align-top">
                          <span
                            className="font-bold block"
                            style={{ color: "#111827" }}
                          >
                            {service.label}
                          </span>
                          <ul
                            className="list-disc pl-4 mt-1 space-y-0.5 text-[10px] sm:text-[11px]"
                            style={{ color: "#6b7280" }}
                          >
                            {service.deliverables.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </td>
                        <td className="py-2.5 pr-1 text-right font-bold align-top">
                          <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold"
                            style={{
                              color: "#059669",
                              backgroundColor: "#ecfdf5",
                            }}
                          >
                            <Check size={12} /> Included
                          </span>
                        </td>
                      </tr>
                    )
                  )}

                  {customItems.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b"
                      style={{ borderColor: "#f3f4f6" }}
                    >
                      <td className="py-2.5 pl-1 align-top">
                        <span
                          className="font-bold block"
                          style={{ color: "#111827" }}
                        >
                          {item.label}
                        </span>
                        <span
                          className="text-[10px] font-semibold uppercase tracking-wider"
                          style={{ color: "#3b82f6" }}
                        >
                          Custom Addition
                        </span>
                      </td>
                      <td className="py-2.5 pr-1 text-right font-bold align-top">
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold"
                          style={{
                            color: "#059669",
                            backgroundColor: "#ecfdf5",
                          }}
                        >
                          <Check size={12} /> Included
                        </span>
                      </td>
                    </tr>
                  ))}

                  {totalAmount === 0 && (
                    <tr>
                      <td
                        className="py-6 text-center font-medium italic"
                        style={{ color: "#9ca3af" }}
                        colSpan={2}
                      >
                        No modules selected. Configure package inclusion inside sidebar.
                      </td>
                    </tr>
                  )}

                  <tr
                    className="font-bold text-xs sm:text-sm"
                    style={{ backgroundColor: "#eff6ff", color: "#1e3a8a" }}
                  >
                    <td className="py-2.5 pl-3 rounded-l-xl">
                      Total Net Estimated Investment
                    </td>
                    <td className="py-2.5 pr-3 text-right rounded-r-xl whitespace-nowrap">
                      ₹{totalAmount.toLocaleString("en-IN")}.00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Dynamic Terms & Milestones */}
            <div className="mt-4">
              <h4
                className="font-bold text-[10px] uppercase tracking-wider mb-1"
                style={{ color: "#9ca3af" }}
              >
                Terms & Project Governance
              </h4>
              <div
                className="border rounded-xl p-3 text-[10px] sm:text-[11px] leading-relaxed font-sans space-y-2"
                style={{
                  backgroundColor: "#f9fafb",
                  borderColor: "#f3f4f6",
                  color: "#4b5563",
                }}
              >
                <p>
                  <strong>1. Dynamic Milestones Architecture:</strong>
                  <br />• <strong>Booking Advance ({advancePercent}%):</strong> An
                  upfront setup payment of{" "}
                  <strong>
                    ₹{calculatedAdvance.toLocaleString("en-IN")}
                  </strong>{" "}
                  is required to launch project draft cycles.
                  <br />•{" "}
                  <strong>
                    Project Execution Balance ({100 - advancePercent}%):
                  </strong>{" "}
                  The outstanding balance of{" "}
                  <strong>
                    ₹{calculatedBalance.toLocaleString("en-IN")}
                  </strong>{" "}
                  must be settled immediately following schematic layout approval,
                  strictly prior to high-resolution CAD compilation delivery.
                </p>

                <p>
                  <strong>2. Modification Scope:</strong> This quote allows for up
                  to {form.revisions} complimentary configuration corrections.
                  Final approvals lock drawing state; subsequent structural
                  modifications generate independent change-order costs.
                </p>

                {terms.map((term, index) => (
                  <p key={index}>
                    <strong>{index + 3}. Policy Clause:</strong> {term}
                  </p>
                ))}
              </div>
            </div>

            {/* Signatures */}
            <div
              className="flex justify-between mt-6 pt-4 border-t"
              style={{ borderColor: "#f3f4f6" }}
            >
              <div>
                <div className="h-10 flex items-end mb-1">
                  <img
                    src="/Ankit_Pandey_sign.png"
                    alt="Authorized Signature"
                    className="h-9 w-auto object-contain mix-blend-multiply"
                    crossOrigin="anonymous"
                  />
                </div>
                <p className="font-bold text-xs" style={{ color: "#1f2937" }}>
                  Dream Homes Bihar
                </p>
                <p className="text-[10px]" style={{ color: "#9ca3af" }}>
                  Authorized Signatory
                </p>
              </div>
              <div className="text-right flex flex-col justify-end">
                <div
                  className="w-28 sm:w-36 border-b mb-1 ml-auto"
                  style={{ borderColor: "#d1d5db" }}
                ></div>
                <p className="text-[10px]" style={{ color: "#9ca3af" }}>
                  Accepted By Client
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}