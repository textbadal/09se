"use client";

import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { 
  Download, Plus, Trash2, Check, Edit3, 
  Eye, EyeOff, Settings, Building2, Users, FileText,
  Home, Layers, Lightbulb, TrendingUp, X
} from "lucide-react";

interface ServiceConfig {
  id: string;
  label: string;
  icon: React.ReactNode;
  prices: Record<string, number>;
  deliverables: string[];
  description: string;
}

interface CustomItem {
  id: string;
  label: string;
  price: number;
}

const SERVICES_CATALOG: ServiceConfig[] = [
  {
    id: "architectural",
    label: "Floor Plan Design",
    icon: <Home size={18} />,
    prices: { Ground: 2999, "G+1": 3999, "G+2": 4499, "G+3": 4999 },
    description: "Complete architectural layout and planning",
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
    icon: <Layers size={18} />,
    prices: { Ground: 4000, "G+1": 4500, "G+2": 4500, "G+3": 6500 },
    description: "Structural engineering and reinforcement plans",
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
    icon: <Lightbulb size={18} />,
    prices: { Ground: 3000, "G+1": 3000, "G+2": 3000, "G+3": 4000 },
    description: "Complete MEP system design and schematics",
    deliverables: [
      "Electrical Schematics (Conduit Routing & Switchboard placements)",
      "Plumbing & Sanitation Plans (Freshwater & Drainage systems)",
    ],
  },
  {
    id: "elevation3d",
    label: "3D Front Elevation",
    icon: <TrendingUp size={18} />,
    prices: { Ground: 3000, "G+1": 3500, "G+2": 4000, "G+3": 4500 },
    description: "High-quality 3D exterior visualization",
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
  const [showPreview, setShowPreview] = useState(true);

  const [form, setForm] = useState({
    clientName: "",
    location: "",
    plotArea: "",
    numberOfFloors: "G+1",
    advanceAmount: 1000,
  });

  const [terms, setTerms] = useState<string[]>([
    "Initial concepts will be generated within 10 to 15 business days following advance acquisition. Deadlines exclude public holidays and weekends.",
    "Fee structures isolate remote technical design compilation only. Site engineering diagnostics, architectural line verification, or physical construction inspections are completely excluded.",
  ]);

  const [selectedServices, setSelectedServices] = useState<Record<string, boolean>>({
    architectural: true,
    structural: true,
    mep: true,
    elevation3d: true,
  });

  // Simple price editing - just click and type
  const [customPrices, setCustomPrices] = useState<Record<string, Record<string, number>>>({});

  const [customItems, setCustomItems] = useState<CustomItem[]>([]);
  const [manualLabel, setManualLabel] = useState("");
  const [manualPrice, setManualPrice] = useState("");

  useEffect(() => {
    const random = Math.floor(1000 + Math.random() * 9000);
    const date = new Date();
    setQuoteNumber(`DH-${date.getFullYear()}-${random}`);
  }, []);

  const getServicePrice = (config: ServiceConfig) => {
    const floor = form.numberOfFloors;
    const customPrice = customPrices[config.id]?.[floor];
    if (customPrice !== undefined && customPrice > 0) {
      return customPrice;
    }
    return config.prices[floor] || 0;
  };

  // Super simple price update - just click on price and type
  const updatePrice = (serviceId: string, floor: string, value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0) return;
    
    setCustomPrices(prev => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        [floor]: numValue
      }
    }));
  };

  // Reset to default
  const resetPrice = (serviceId: string, floor: string) => {
    setCustomPrices(prev => {
      const newPrices = { ...prev };
      if (newPrices[serviceId]) {
        delete newPrices[serviceId][floor];
        if (Object.keys(newPrices[serviceId]).length === 0) {
          delete newPrices[serviceId];
        }
      }
      return newPrices;
    });
  };

  const baseTotal = SERVICES_CATALOG.filter(
    (s) => selectedServices[s.id]
  ).reduce((sum, s) => sum + getServicePrice(s), 0);

  const customTotal = customItems.reduce((sum, item) => sum + item.price, 0);
  const totalAmount = baseTotal + customTotal;

  const advanceAmount = Number(form.advanceAmount) || 0;
  const calculatedAdvance = Math.min(advanceAmount, totalAmount);
  const calculatedBalance = Math.max(0, totalAmount - calculatedAdvance);

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

  const downloadPDF = async () => {
    if (!quoteRef.current || isGenerating) return;
    try {
      setIsGenerating(true);
      const canvas = await html2canvas(quoteRef.current, {
        scale: 2.5,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: 1024,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector<HTMLElement>("#invoice-container");
          if (clonedElement) {
            clonedElement.style.width = "800px";
            clonedElement.style.padding = "24px";
          }
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

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 print:bg-white print:p-0">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 print:hidden">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Building2 className="text-blue-600" size={28} />
              Quotation Generator
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Create professional architectural quotations - click any price to edit
            </p>
          </div>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition"
          >
            {showPreview ? <EyeOff size={18} /> : <Eye size={18} />}
            <span className="text-sm font-medium">{showPreview ? "Hide" : "Show"} Preview</span>
          </button>
        </div>

        <div className={`grid ${showPreview ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-6 print:block`}>
          
          {/* FORM CONFIGURATION */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 print:hidden">
            <div className="flex items-center gap-2 mb-6">
              <Settings size={20} className="text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Project Configuration</h2>
            </div>

            <div className="space-y-4">
              {/* Client Details - Simplified */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Client Name</label>
                <input
                  name="clientName"
                  placeholder="Enter client name"
                  value={form.clientName}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Project Location</label>
                <input
                  name="location"
                  placeholder="Enter project location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Plot Area</label>
                  <input
                    name="plotArea"
                    placeholder="e.g. 1200 sq.ft"
                    value={form.plotArea}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Number of Floors</label>
                  <select
                    name="numberOfFloors"
                    value={form.numberOfFloors}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                  >
                    <option value="Ground">Ground</option>
                    <option value="G+1">G+1</option>
                    <option value="G+2">G+2</option>
                    <option value="G+3">G+3</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Advance Payment (₹)</label>
                <input
                  type="number"
                  name="advanceAmount"
                  value={form.advanceAmount}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              {/* Services Selection with SUPER EASY Price Editing */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-3">
                  <FileText size={18} className="text-blue-600" />
                  Services - Click any price to edit
                </h3>
                <div className="space-y-3">
                  {SERVICES_CATALOG.map((service) => {
                    const price = getServicePrice(service);
                    const isCustom = customPrices[service.id]?.[form.numberOfFloors] !== undefined;
                    
                    return (
                      <div
                        key={service.id}
                        className={`bg-white rounded-lg border-2 transition ${
                          selectedServices[service.id] 
                            ? 'border-blue-500 shadow-sm' 
                            : 'border-gray-200 opacity-60'
                        }`}
                      >
                        <div className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 flex-1">
                              <input
                                type="checkbox"
                                checked={selectedServices[service.id]}
                                onChange={() => handleServiceToggle(service.id)}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <div className="flex items-center gap-2">
                                <span className="text-blue-600">{service.icon}</span>
                                <div>
                                  <span className="text-sm font-medium text-gray-900">{service.label}</span>
                                  <span className="text-xs text-gray-500 ml-2">{service.description}</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* SUPER EASY PRICE EDITING - Just click and type */}
                            <div className="flex items-center gap-2">
                              <div className="relative">
                                <input
                                  type="number"
                                  value={price}
                                  onChange={(e) => updatePrice(service.id, form.numberOfFloors, e.target.value)}
                                  className={`w-28 border-2 rounded-lg px-3 py-1.5 text-sm font-bold text-center transition ${
                                    isCustom 
                                      ? 'border-blue-400 bg-blue-50 text-blue-700' 
                                      : 'border-gray-300 bg-white text-gray-900 hover:border-blue-300'
                                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                  onFocus={(e) => e.target.select()}
                                />
                                {isCustom && (
                                  <button
                                    onClick={() => resetPrice(service.id, form.numberOfFloors)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition"
                                    title="Reset to default price"
                                  >
                                    <X size={12} />
                                  </button>
                                )}
                              </div>
                              <span className="text-xs font-medium text-gray-500">₹</span>
                            </div>
                          </div>
                          
                          {/* Quick reference - all floor prices */}
                          <div className="mt-2 flex gap-2 flex-wrap">
                            {Object.keys(service.prices).map((floor) => {
                              const customPrice = customPrices[service.id]?.[floor];
                              const defaultPrice = service.prices[floor];
                              const isCustomPrice = customPrice !== undefined;
                              const isSelected = floor === form.numberOfFloors;
                              
                              return (
                                <button
                                  key={floor}
                                  onClick={() => {
                                    if (isSelected) {
                                      // If selected, focus the input for editing
                                      const input = document.querySelector(`input[value="${price}"]`);
                                      if (input) (input as HTMLInputElement).focus();
                                    }
                                  }}
                                  className={`text-[10px] px-2.5 py-0.5 rounded-full transition ${
                                    isSelected 
                                      ? 'bg-blue-600 text-white font-semibold' 
                                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                  } ${isCustomPrice ? 'border-2 border-blue-400' : ''}`}
                                >
                                  {floor}: ₹{(isCustomPrice ? customPrice : defaultPrice).toLocaleString("en-IN")}
                                </button>
                              );
                            })}
                          </div>
                          <div className="mt-1 text-[10px] text-gray-400">
                            💡 Click on any floor price above to edit
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-2 text-xs text-gray-500 flex items-center gap-3">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-3 h-3 bg-blue-50 border-2 border-blue-400 rounded"></span>
                    Blue = Custom price
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-3 h-3 bg-blue-600 rounded"></span>
                    Blue = Selected floor
                  </span>
                  <span className="inline-flex items-center gap-1 text-red-500">
                    <X size={12} /> Reset to default
                  </span>
                </div>
              </div>

              {/* Custom Items */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-3">
                  <Plus size={18} className="text-blue-600" />
                  Add Custom Items
                </h3>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Item description"
                    value={manualLabel}
                    onChange={(e) => setManualLabel(e.target.value)}
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                  />
                  <input
                    type="number"
                    placeholder="Price (₹)"
                    value={manualPrice}
                    onChange={(e) => setManualPrice(e.target.value)}
                    className="w-28 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                  />
                  <button
                    onClick={handleAddCustomItem}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-lg flex items-center gap-1 transition"
                  >
                    <Plus size={16} /> Add
                  </button>
                </div>
                {customItems.length > 0 && (
                  <div className="space-y-1.5">
                    {customItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-gray-200"
                      >
                        <span className="text-sm text-gray-700">{item.label}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-gray-900">
                            ₹{item.price.toLocaleString("en-IN")}
                          </span>
                          <button
                            onClick={() => handleRemoveCustomItem(item.id)}
                            className="text-red-500 hover:text-red-700 transition p-0.5"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions - Only Download button now */}
              <button
                onClick={downloadPDF}
                disabled={isGenerating}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition"
              >
                <Download size={20} /> {isGenerating ? "Generating PDF..." : "Download PDF"}
              </button>
            </div>
          </div>

          {/* INVOICE PREVIEW */}
          {showPreview && (
            <div className="overflow-x-auto">
              <div
                id="invoice-container"
                ref={quoteRef}
                style={{
                  backgroundColor: "#ffffff",
                  color: "#1f2937",
                  borderColor: "#e5e7eb",
                }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 print:shadow-none print:border-none print:p-0 min-w-[320px]"
              >
                {/* Header */}
                <div className="flex justify-between border-b-2 pb-4" style={{ borderColor: "#f3f4f6" }}>
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Building2 size={20} className="text-white" />
                      </div>
                      <div>
                        <h1 className="text-xl font-bold" style={{ color: "#1e3a8a" }}>
                          DREAM HOMES BIHAR
                        </h1>
                        <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#9ca3af" }}>
                          Architectural Drawings & Engineering Services
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-xs" style={{ color: "#4b5563" }}>
                    <p className="font-bold text-sm" style={{ color: "#111827" }}>
                      {quoteNumber || "Generating..."}
                    </p>
                    <p className="mt-0.5 text-[11px]" style={{ color: "#6b7280" }}>
                      {new Date().toLocaleDateString("en-IN", { 
                        day: '2-digit', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>

                {/* Project Details - Simplified */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-xs">
                  <div className="p-3 rounded-xl border" style={{ backgroundColor: "#f9fafb", borderColor: "#f3f4f6" }}>
                    <h4 className="font-bold text-[10px] uppercase tracking-wider mb-1.5" style={{ color: "#9ca3af" }}>
                      <Users size={12} className="inline mr-1" /> Client Details
                    </h4>
                    <p className="font-bold" style={{ color: "#1f2937" }}>
                      {form.clientName || "—"}
                    </p>
                    <p className="mt-0.5" style={{ color: "#4b5563" }}>
                      {form.location || "—"}
                    </p>
                    {form.plotArea && (
                      <p style={{ color: "#4b5563" }}>Plot: {form.plotArea}</p>
                    )}
                  </div>
                  <div className="p-3 rounded-xl border" style={{ backgroundColor: "#f9fafb", borderColor: "#f3f4f6" }}>
                    <h4 className="font-bold text-[10px] uppercase tracking-wider mb-1.5" style={{ color: "#9ca3af" }}>
                      <FileText size={12} className="inline mr-1" /> Project Scope
                    </h4>
                    <p className="font-bold" style={{ color: "#1f2937" }}>
                      {form.numberOfFloors} Design
                    </p>
                  </div>
                </div>

                {/* Itemized Table with Prices */}
                <div className="mt-4">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b font-bold text-[10px] uppercase" style={{ borderColor: "#e5e7eb", color: "#9ca3af" }}>
                        <th className="pb-2 pl-1">Module Description</th>
                        <th className="pb-2 text-center">Deliverables</th>
                        <th className="pb-2 pr-1 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SERVICES_CATALOG.filter((s) => selectedServices[s.id]).map((service) => {
                        const price = getServicePrice(service);
                        const isCustom = customPrices[service.id]?.[form.numberOfFloors] !== undefined;
                        return (
                          <tr key={service.id} className="border-b" style={{ borderColor: "#f3f4f6" }}>
                            <td className="py-2.5 pl-1 align-top">
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold" style={{ color: "#111827" }}>
                                  {service.label}
                                </span>
                                {isCustom && (
                                  <span className="text-[8px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                                    Custom
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-2.5 px-2 align-top">
                              <ul className="list-disc pl-3 space-y-0.5 text-[10px] sm:text-[11px]" style={{ color: "#6b7280" }}>
                                {service.deliverables.slice(0, 2).map((item, idx) => (
                                  <li key={idx}>{item}</li>
                                ))}
                                {service.deliverables.length > 2 && (
                                  <li className="text-blue-500">+{service.deliverables.length - 2} more</li>
                                )}
                              </ul>
                            </td>
                            <td className="py-2.5 pr-1 text-right font-bold align-top whitespace-nowrap">
                              ₹{price.toLocaleString("en-IN")}
                            </td>
                          </tr>
                        );
                      })}

                      {customItems.map((item) => (
                        <tr key={item.id} className="border-b" style={{ borderColor: "#f3f4f6" }}>
                          <td className="py-2.5 pl-1">
                            <span className="font-bold" style={{ color: "#111827" }}>
                              {item.label}
                            </span>
                            <br />
                            <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#3b82f6" }}>
                              Custom Addition
                            </span>
                          </td>
                          <td className="py-2.5 px-2 text-center text-xs text-gray-400">—</td>
                          <td className="py-2.5 pr-1 text-right font-bold whitespace-nowrap">
                            ₹{item.price.toLocaleString("en-IN")}
                          </td>
                        </tr>
                      ))}

                      {totalAmount === 0 && (
                        <tr>
                          <td className="py-6 text-center font-medium italic" style={{ color: "#9ca3af" }} colSpan={3}>
                            No modules selected. Configure package inclusion in the sidebar.
                          </td>
                        </tr>
                      )}

                      <tr className="font-bold text-sm" style={{ backgroundColor: "#eff6ff", color: "#1e3a8a" }}>
                        <td className="py-2.5 pl-3 rounded-l-xl" colSpan={2}>
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
                  <h4 className="font-bold text-[10px] uppercase tracking-wider mb-1.5" style={{ color: "#9ca3af" }}>
                    Terms & Project Governance
                  </h4>
                  <div className="border rounded-xl p-3 text-[10px] sm:text-[11px] leading-relaxed font-sans space-y-2" style={{ backgroundColor: "#f9fafb", borderColor: "#f3f4f6", color: "#4b5563" }}>
                    <p>
                      <strong>1. Dynamic Milestones Architecture:</strong>
                      <br />• <strong>Booking Advance:</strong> An
                      upfront setup payment of{" "}
                      <strong>₹{calculatedAdvance.toLocaleString("en-IN")}</strong>{" "}
                      is required to launch project draft cycles.
                      <br />•{" "}
                      <strong>Project Execution Balance:</strong>{" "}
                      The outstanding balance of{" "}
                      <strong>₹{calculatedBalance.toLocaleString("en-IN")}</strong>{" "}
                      must be settled immediately following schematic layout approval.
                    </p>

                    {terms.map((term, index) => (
                      <p key={index}>
                        <strong>{index + 2}. Policy Clause:</strong> {term}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Signatures */}
                <div className="flex justify-between mt-6 pt-4 border-t" style={{ borderColor: "#f3f4f6" }}>
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
                    <div className="w-28 sm:w-36 border-b mb-1 ml-auto" style={{ borderColor: "#d1d5db" }}></div>
                    <p className="text-[10px]" style={{ color: "#9ca3af" }}>
                      Accepted By Client
                    </p>
                  </div>
                </div>

                
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}