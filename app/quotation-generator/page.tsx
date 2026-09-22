"use client";

import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Download,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Settings,
  Building2,
  Users,
  FileText,
  Home as HomeIcon,
  Layers,
  Lightbulb,
  TrendingUp,
  X,
  Phone,
  Mail,
  MapPin,
  Globe,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Shield,
  CreditCard,
  Landmark,
} from "lucide-react";

interface ServiceConfig {
  id: string;
  label: string;
  icon: React.ReactNode;
  prices: Record<string, number>;
  deliverables: string[];
  description: string;
  category: string;
}

interface CustomItem {
  id: string;
  label: string;
  price: number;
  description?: string;
}

const SERVICES_CATALOG: ServiceConfig[] = [
  {
    id: "architectural",
    label: "Floor Plan Design",
    icon: <HomeIcon size={18} />,
    prices: { Ground: 2999, "G+1": 3999, "G+2": 4499, "G+3": 4999 },
    description: "Complete architectural layout and planning",
    category: "Architectural",
    deliverables: [
      "Working Floor Plans (All Floors)",
      "Site & Furniture Layouts",
      "Wall Centerline / Masonry Plans",
      "Cross-Sections & Openings Schedules",
      "Door & Window Schedule",
    ],
  },
  {
    id: "structural",
    label: "Structural Drawings",
    icon: <Layers size={18} />,
    prices: { Ground: 4000, "G+1": 4500, "G+2": 4500, "G+3": 6500 },
    description: "Structural engineering and reinforcement plans",
    category: "Structural",
    deliverables: [
      "Foundation & Footing Detail Maps",
      "Column Placement & Layout Schemes",
      "Plinth & Roof Beam Concrete Schedules",
      "Slab Reinforcement Specifications",
      "Structural Notes & Specifications",
    ],
  },
  {
    id: "mep",
    label: "Electrical & Plumbing",
    icon: <Lightbulb size={18} />,
    prices: { Ground: 3000, "G+1": 3000, "G+2": 3000, "G+3": 4000 },
    description: "Complete MEP system design and schematics",
    category: "MEP Services",
    deliverables: [
      "Electrical Schematics (Conduit Routing & Switchboard placements)",
      "Plumbing & Sanitation Plans (Freshwater & Drainage systems)",
      "Lighting Layout & Fixture Schedule",
      "Water Supply & Drainage Schematics",
    ],
  },
  {
    id: "elevation3d",
    label: "3D Front Elevation",
    icon: <TrendingUp size={18} />,
    prices: { Ground: 3000, "G+1": 3500, "G+2": 4000, "G+3": 4500 },
    description: "High-quality 3D exterior visualization",
    category: "Visualization",
    deliverables: [
      "High-Fidelity Exterior 3D Rendering",
      "Material Guide Suggestions",
      "Modern Concept Color Profiles",
      "Night View Rendering (Optional)",
    ],
  },
];

const FLOOR_OPTIONS = ["Ground", "G+1", "G+2", "G+3"] as const;

const COMMON_TERMS = [
  "Initial concepts will be generated within 10 to 15 business days following advance acquisition. Deadlines exclude public holidays and weekends.",
  "Fee structures isolate remote technical design compilation only. Site engineering diagnostics, architectural line verification, or physical construction inspections are completely excluded.",
  "Any revisions beyond two rounds of design changes will be billed separately at standard hourly rates.",
  "All drawings and documents remain the intellectual property of Dream Homes Bihar until full payment is received.",
  "The client is responsible for obtaining all necessary statutory approvals and permits.",
];

export default function QuotationGenerator() {
  const quoteRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [quoteNumber, setQuoteNumber] = useState("");
  const [showPreview, setShowPreview] = useState(true);
  const [showTerms, setShowTerms] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [form, setForm] = useState({
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    location: "",
    plotArea: "",
    numberOfFloors: "G+1",
    advanceAmount: 1000,
    validityDays: 30,
    deliveryWeeks: "2-3",
  });

  const [terms] = useState<string[]>(COMMON_TERMS);

  const [selectedServices, setSelectedServices] = useState<Record<string, boolean>>({
    architectural: true,
    structural: true,
    mep: true,
    elevation3d: true,
  });

  const [customPrices, setCustomPrices] = useState<Record<string, Record<string, number>>>({});
  const [customItems, setCustomItems] = useState<CustomItem[]>([]);
  const [manualLabel, setManualLabel] = useState("");
  const [manualPrice, setManualPrice] = useState("");
  const [manualDescription, setManualDescription] = useState("");

  useEffect(() => {
    const random = Math.floor(1000 + Math.random() * 9000);
    const date = new Date();
    setQuoteNumber(`DHB-${date.getFullYear()}-${random}`);
  }, []);

  const getServicePrice = (config: ServiceConfig) => {
    const floor = form.numberOfFloors;
    const customPrice = customPrices[config.id]?.[floor];
    if (customPrice !== undefined && customPrice > 0) {
      return customPrice;
    }
    return config.prices[floor] || 0;
  };

  const updatePrice = (serviceId: string, floor: string, value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0) return;

    setCustomPrices((prev) => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        [floor]: numValue,
      },
    }));
  };

  const resetPrice = (serviceId: string, floor: string) => {
    setCustomPrices((prev) => {
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

  const baseTotal = SERVICES_CATALOG.filter((s) => selectedServices[s.id]).reduce(
    (sum, s) => sum + getServicePrice(s),
    0
  );

  const customTotal = customItems.reduce((sum, item) => sum + item.price, 0);
  const subtotal = baseTotal + customTotal;
  const gstRate = 0.18;
  const gstAmount = Math.round(subtotal * gstRate);
  const totalAmount = subtotal + gstAmount;

  const advanceAmount = Number(form.advanceAmount) || 0;
  const calculatedAdvance = Math.min(advanceAmount, totalAmount);
  const calculatedBalance = Math.max(0, totalAmount - calculatedAdvance);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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
      description: manualDescription || undefined,
    };
    setCustomItems([...customItems, newItem]);
    setManualLabel("");
    setManualPrice("");
    setManualDescription("");
  };

  const handleRemoveCustomItem = (id: string) => {
    setCustomItems(customItems.filter((item) => item.id !== id));
  };

  const quickSelectAll = () => {
    setSelectedServices({
      architectural: true,
      structural: true,
      mep: true,
      elevation3d: true,
    });
  };

  const quickClearAll = () => {
    setSelectedServices({
      architectural: false,
      structural: false,
      mep: false,
      elevation3d: false,
    });
  };

  const downloadPDF = async () => {
    if (!quoteRef.current || isGenerating) return;
    try {
      setIsGenerating(true);
      await new Promise((resolve) => setTimeout(resolve, 100));

      const sourceEl = quoteRef.current;

      const canvas = await html2canvas(sourceEl, {
        scale: 3,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: 1200,
        onclone: (clonedDoc) => {
          const clonedRoot = clonedDoc.querySelector<HTMLElement>("#invoice-container");
          if (clonedRoot) {
            clonedRoot.style.width = "900px";
            clonedRoot.style.padding = "32px";
            clonedRoot.style.boxShadow = "none";
            clonedRoot.style.backgroundColor = "#ffffff";
            clonedRoot.style.color = "#1f2937";
          }

          // Map original DOM nodes to cloned DOM nodes and copy resolved computed styles.
          const originals = sourceEl.querySelectorAll<HTMLElement>("*");
          const clones = clonedDoc.querySelectorAll<HTMLElement>("#invoice-container *");

          const colorProps = [
            "color",
            "backgroundColor",
            "borderTopColor",
            "borderRightColor",
            "borderBottomColor",
            "borderLeftColor",
            "outlineColor",
            "fill",
            "stroke",
            "textDecorationColor",
          ] as const;

          originals.forEach((origEl, i) => {
            const clonedEl = clones[i];
            if (!clonedEl) return;

            const computed = window.getComputedStyle(origEl);

            colorProps.forEach((prop) => {
              const value = computed[prop as keyof CSSStyleDeclaration] as string;
              if (value && value !== "none" && !value.includes("oklch")) {
                try {
                  (clonedEl.style as unknown as Record<string, string>)[prop] = value;
                } catch {
                  /* ignore */
                }
              }
            });

            // Handle boxShadow separately (can contain oklch too)
            const shadow = computed.boxShadow;
            if (shadow && shadow !== "none" && !shadow.includes("oklch")) {
              clonedEl.style.boxShadow = shadow;
            }
          });

          // Final safety pass: strip any remaining oklch declarations from inline styles
          const all = clonedDoc.getElementsByTagName("*");
          for (let i = 0; i < all.length; i++) {
            const el = all[i] as HTMLElement;
            if (!el.style) continue;
            const sd = el.style;
            for (let j = sd.length - 1; j >= 0; j--) {
              const propName = sd[j];
              const propValue = sd.getPropertyValue(propName);
              if (propValue && propValue.includes("oklch")) {
                sd.removeProperty(propName);
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
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const validityDate = new Date();
  validityDate.setDate(validityDate.getDate() + Number(form.validityDays));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 p-4 sm:p-6 print:bg-white print:p-0">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 print:hidden">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <Building2 className="text-white" size={22} />
              </div>
              <div>
                Quotation Generator
                <span className="block text-xs font-normal text-gray-500 mt-0.5">
                  Professional Architectural Quotations
                </span>
              </div>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all text-sm font-medium text-gray-700"
            >
              <Settings size={16} />
              {showAdvanced ? "Hide" : "Show"} Advanced
            </button>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all text-sm font-medium text-gray-700"
            >
              {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
              {showPreview ? "Hide" : "Show"} Preview
            </button>
          </div>
        </div>

        <div
          className={`grid ${
            showPreview ? "lg:grid-cols-2" : "lg:grid-cols-1"
          } gap-6 print:block`}
        >
          {/* FORM CONFIGURATION */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 print:hidden">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <Settings size={18} className="text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Project Configuration</h2>
            </div>

            <div className="space-y-5">
              {/* Client Details */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Users size={14} />
                  Client Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Client Name *
                    </label>
                    <input
                      name="clientName"
                      placeholder="Enter client name"
                      value={form.clientName}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Phone
                      </label>
                      <input
                        name="clientPhone"
                        placeholder="+91 XXXXX XXXXX"
                        value={form.clientPhone}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Email
                      </label>
                      <input
                        name="clientEmail"
                        type="email"
                        placeholder="client@email.com"
                        value={form.clientEmail}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <FileText size={14} />
                  Project Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Project Location
                    </label>
                    <input
                      name="location"
                      placeholder="Enter project location"
                      value={form.location}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Plot Area
                      </label>
                      <input
                        name="plotArea"
                        placeholder="e.g. 1200 sq.ft"
                        value={form.plotArea}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Number of Floors
                      </label>
                      <select
                        name="numberOfFloors"
                        value={form.numberOfFloors}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                      >
                        {FLOOR_OPTIONS.map((floor) => (
                          <option key={floor} value={floor}>
                            {floor}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Settings */}
              {showAdvanced && (
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <h3 className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Shield size={14} />
                    Advanced Settings
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Advance (₹)
                      </label>
                      <input
                        type="number"
                        name="advanceAmount"
                        value={form.advanceAmount}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Validity (Days)
                      </label>
                      <input
                        type="number"
                        name="validityDays"
                        value={form.validityDays}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Delivery (Weeks)
                      </label>
                      <input
                        name="deliveryWeeks"
                        value={form.deliveryWeeks}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Services Selection */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <FileText size={18} className="text-blue-600" />
                    Service Modules
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={quickSelectAll}
                      className="text-[10px] px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium"
                    >
                      Select All
                    </button>
                    <button
                      onClick={quickClearAll}
                      className="text-[10px] px-2 py-1 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 transition font-medium"
                    >
                      Clear
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  {SERVICES_CATALOG.map((service) => {
                    const price = getServicePrice(service);
                    const isCustom =
                      customPrices[service.id]?.[form.numberOfFloors] !== undefined;

                    return (
                      <div
                        key={service.id}
                        className={`bg-white rounded-xl border-2 transition-all ${
                          selectedServices[service.id]
                            ? "border-blue-500 shadow-md shadow-blue-100"
                            : "border-gray-200 opacity-60"
                        }`}
                      >
                        <div className="p-3.5">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3 flex-1">
                              <input
                                type="checkbox"
                                checked={selectedServices[service.id]}
                                onChange={() => handleServiceToggle(service.id)}
                                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-blue-600">{service.icon}</span>
                                  <span className="text-sm font-semibold text-gray-900">
                                    {service.label}
                                  </span>
                                </div>
                                <p className="text-[11px] text-gray-500 mt-0.5">
                                  {service.description}
                                </p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {service.deliverables.slice(0, 3).map((d, i) => (
                                    <span
                                      key={i}
                                      className="text-[9px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded"
                                    >
                                      {d.length > 30 ? d.substring(0, 30) + "..." : d}
                                    </span>
                                  ))}
                                  {service.deliverables.length > 3 && (
                                    <span className="text-[9px] px-1.5 py-0.5 bg-blue-50 text-blue-500 rounded font-medium">
                                      +{service.deliverables.length - 3} more
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <div className="relative">
                                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">
                                  ₹
                                </span>
                                <input
                                  type="number"
                                  value={price}
                                  onChange={(e) =>
                                    updatePrice(service.id, form.numberOfFloors, e.target.value)
                                  }
                                  className={`w-24 border-2 rounded-lg pl-6 pr-2 py-1.5 text-sm font-bold text-right transition ${
                                    isCustom
                                      ? "border-blue-400 bg-blue-50 text-blue-700"
                                      : "border-gray-200 bg-white text-gray-900 hover:border-blue-300"
                                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                  onFocus={(e) => e.target.select()}
                                />
                                {isCustom && (
                                  <button
                                    onClick={() => resetPrice(service.id, form.numberOfFloors)}
                                    className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition shadow-sm"
                                    title="Reset to default price"
                                  >
                                    <X size={10} />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="mt-2.5 flex gap-1.5 flex-wrap">
                            {Object.keys(service.prices).map((floor) => {
                              const customPrice = customPrices[service.id]?.[floor];
                              const defaultPrice = service.prices[floor];
                              const isCustomPrice = customPrice !== undefined;
                              const isSelected = floor === form.numberOfFloors;

                              return (
                                <button
                                  key={floor}
                                  onClick={() => {
                                    setForm({ ...form, numberOfFloors: floor });
                                  }}
                                  className={`text-[10px] px-2 py-0.5 rounded-full transition-all ${
                                    isSelected
                                      ? "bg-blue-600 text-white font-semibold shadow-sm"
                                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                  } ${isCustomPrice && !isSelected ? "ring-1 ring-blue-400" : ""}`}
                                >
                                  {floor}: ₹
                                  {(isCustomPrice ? customPrice : defaultPrice).toLocaleString(
                                    "en-IN"
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Custom Items */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-3">
                  <Plus size={18} className="text-blue-600" />
                  Add Custom Line Items
                </h3>
                <div className="space-y-2 mb-3">
                  <div className="flex gap-2">
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
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Optional description/notes"
                      value={manualDescription}
                      onChange={(e) => setManualDescription(e.target.value)}
                      className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                    />
                    <button
                      onClick={handleAddCustomItem}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-lg flex items-center gap-1.5 transition font-medium text-sm"
                    >
                      <Plus size={16} />
                      Add
                    </button>
                  </div>
                </div>
                {customItems.length > 0 && (
                  <div className="space-y-2">
                    {customItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200 shadow-sm"
                      >
                        <div>
                          <span className="text-sm font-medium text-gray-700">{item.label}</span>
                          {item.description && (
                            <p className="text-[10px] text-gray-400 mt-0.5">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-gray-900">
                            ₹{item.price.toLocaleString("en-IN")}
                          </span>
                          <button
                            onClick={() => handleRemoveCustomItem(item.id)}
                            className="text-red-500 hover:text-red-700 transition p-1 hover:bg-red-50 rounded"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Summary */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 text-white">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Price Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">GST (18%)</span>
                    <span className="font-medium">₹{gstAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="border-t border-gray-700 pt-2 mt-2 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-lg">
                      ₹{totalAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Advance</span>
                    <span className="text-green-400 font-medium">
                      ₹{calculatedAdvance.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Balance</span>
                    <span className="text-amber-400 font-medium">
                      ₹{calculatedBalance.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <button
                onClick={downloadPDF}
                disabled={isGenerating || totalAmount === 0}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all shadow-lg shadow-blue-200 disabled:shadow-none"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download size={20} />
                    Download Quotation PDF
                  </>
                )}
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
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 print:shadow-none print:border-none print:p-0 min-w-[340px]"
              >
                {/* Header */}
                <div
                  className="flex justify-between items-start pb-5"
                  style={{ borderBottom: "2px solid #1e3a8a" }}
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{
                          background: "linear-gradient(135deg, #1d4ed8 0%, #3730a3 100%)",
                          boxShadow: "0 4px 6px rgba(29, 78, 216, 0.2)",
                        }}
                      >
                        <Building2 size={24} style={{ color: "#ffffff" }} />
                      </div>
                      <div>
                        <h1
                          className="text-xl sm:text-2xl font-bold tracking-tight"
                          style={{ color: "#1e3a8a" }}
                        >
                          DREAM HOMES BIHAR
                        </h1>
                        <p
                          className="text-[10px] font-semibold tracking-[0.2em] uppercase"
                          style={{ color: "#6b7280" }}
                        >
                          Architectural Drawings & Engineering Services
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className="inline-block px-3 py-1 rounded-lg mb-2"
                      style={{ backgroundColor: "#eff6ff" }}
                    >
                      <p
                        className="text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: "#1e3a8a" }}
                      >
                        Quotation
                      </p>
                    </div>
                    <p className="text-xs font-bold" style={{ color: "#111827" }}>
                      {quoteNumber || "Generating..."}
                    </p>
                    <p className="text-[11px] mt-0.5" style={{ color: "#6b7280" }}>
                      {formatDate(new Date())}
                    </p>
                  </div>
                </div>

                {/* Company Info & Client Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                  <div className="p-4 rounded-xl" style={{ backgroundColor: "#f8fafc" }}>
                    <h4
                      className="font-bold text-[10px] uppercase tracking-wider mb-2 flex items-center gap-1.5"
                      style={{ color: "#1e3a8a" }}
                    >
                      <Building2 size={12} />
                      From
                    </h4>
                    <p className="font-bold text-sm" style={{ color: "#111827" }}>
                      Dream Homes Bihar
                    </p>
                    <div className="mt-1.5 space-y-0.5 text-[11px]" style={{ color: "#4b5563" }}>
                      <p className="flex items-center gap-1.5">
                        <MapPin size={10} style={{ color: "#9ca3af" }} />
                        Patna, Bihar, India
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Phone size={10} style={{ color: "#9ca3af" }} />
                        +91 62058 20278
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Mail size={10} style={{ color: "#9ca3af" }} />
                        info@dreamhomesbihar.in
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Globe size={10} style={{ color: "#9ca3af" }} />
                        www.dreamhomesbihar.in
                      </p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl" style={{ backgroundColor: "#f8fafc" }}>
                    <h4
                      className="font-bold text-[10px] uppercase tracking-wider mb-2 flex items-center gap-1.5"
                      style={{ color: "#1e3a8a" }}
                    >
                      <Users size={12} />
                      Bill To
                    </h4>
                    <p className="font-bold text-sm" style={{ color: "#111827" }}>
                      {form.clientName || "—"}
                    </p>
                    <div className="mt-1.5 space-y-0.5 text-[11px]" style={{ color: "#4b5563" }}>
                      {form.clientPhone && (
                        <p className="flex items-center gap-1.5">
                          <Phone size={10} style={{ color: "#9ca3af" }} />
                          {form.clientPhone}
                        </p>
                      )}
                      {form.clientEmail && (
                        <p className="flex items-center gap-1.5">
                          <Mail size={10} style={{ color: "#9ca3af" }} />
                          {form.clientEmail}
                        </p>
                      )}
                      {form.location && (
                        <p className="flex items-center gap-1.5">
                          <MapPin size={10} style={{ color: "#9ca3af" }} />
                          {form.location}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Details Bar */}
                <div
                  className="mt-4 p-3 rounded-xl flex flex-wrap items-center gap-4 text-[11px]"
                  style={{ backgroundColor: "#eff6ff" }}
                >
                  <div className="flex items-center gap-1.5">
                    <HomeIcon size={12} style={{ color: "#2563eb" }} />
                    <span className="font-medium" style={{ color: "#1e3a8a" }}>
                      Floors:
                    </span>
                    <span style={{ color: "#374151" }}>{form.numberOfFloors}</span>
                  </div>
                  {form.plotArea && (
                    <div className="flex items-center gap-1.5">
                      <Layers size={12} style={{ color: "#2563eb" }} />
                      <span className="font-medium" style={{ color: "#1e3a8a" }}>
                        Plot Area:
                      </span>
                      <span style={{ color: "#374151" }}>{form.plotArea}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} style={{ color: "#2563eb" }} />
                    <span className="font-medium" style={{ color: "#1e3a8a" }}>
                      Valid Until:
                    </span>
                    <span style={{ color: "#374151" }}>{formatDate(validityDate)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} style={{ color: "#2563eb" }} />
                    <span className="font-medium" style={{ color: "#1e3a8a" }}>
                      Delivery:
                    </span>
                    <span style={{ color: "#374151" }}>{form.deliveryWeeks} weeks</span>
                  </div>
                </div>

                {/* Itemized Table */}
                <div className="mt-5">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
                        <th
                          className="pb-2.5 pl-2 font-bold text-[10px] uppercase tracking-wider"
                          style={{ color: "#6b7280" }}
                        >
                          #
                        </th>
                        <th
                          className="pb-2.5 font-bold text-[10px] uppercase tracking-wider"
                          style={{ color: "#6b7280" }}
                        >
                          Module Description
                        </th>
                        <th
                          className="pb-2.5 font-bold text-[10px] uppercase tracking-wider text-center"
                          style={{ color: "#6b7280" }}
                        >
                          Deliverables
                        </th>
                        <th
                          className="pb-2.5 pr-2 font-bold text-[10px] uppercase tracking-wider text-right"
                          style={{ color: "#6b7280" }}
                        >
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {SERVICES_CATALOG.filter((s) => selectedServices[s.id]).map(
                        (service, index) => {
                          const price = getServicePrice(service);
                          const isCustom =
                            customPrices[service.id]?.[form.numberOfFloors] !== undefined;
                          return (
                            <tr
                              key={service.id}
                              style={{ borderBottom: "1px solid #f3f4f6" }}
                            >
                              <td
                                className="py-3 pl-2 align-top text-[11px] font-medium"
                                style={{ color: "#9ca3af" }}
                              >
                                {String(index + 1).padStart(2, "0")}
                              </td>
                              <td className="py-3 align-top">
                                <div className="flex items-center gap-1.5">
                                  <span
                                    className="font-bold text-sm"
                                    style={{ color: "#111827" }}
                                  >
                                    {service.label}
                                  </span>
                                  {isCustom && (
                                    <span
                                      className="text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider"
                                      style={{
                                        color: "#2563eb",
                                        backgroundColor: "#eff6ff",
                                      }}
                                    >
                                      Custom
                                    </span>
                                  )}
                                </div>
                                <p
                                  className="text-[10px] mt-0.5"
                                  style={{ color: "#6b7280" }}
                                >
                                  {service.description}
                                </p>
                              </td>
                              <td className="py-3 px-2 align-top">
                                <ul
                                  className="space-y-0.5 text-[10px]"
                                  style={{ color: "#6b7280" }}
                                >
                                  {service.deliverables.slice(0, 3).map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-1">
                                      <CheckCircle2
                                        size={8}
                                        style={{ color: "#22c55e", marginTop: "2px", flexShrink: 0 }}
                                      />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                  {service.deliverables.length > 3 && (
                                    <li
                                      className="font-medium pl-3"
                                      style={{ color: "#3b82f6" }}
                                    >
                                      +{service.deliverables.length - 3} more items
                                    </li>
                                  )}
                                </ul>
                              </td>
                              <td
                                className="py-3 pr-2 text-right font-bold align-top whitespace-nowrap text-sm"
                                style={{ color: "#111827" }}
                              >
                                ₹{price.toLocaleString("en-IN")}
                              </td>
                            </tr>
                          );
                        }
                      )}

                      {customItems.map((item, index) => (
                        <tr key={item.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                          <td
                            className="py-3 pl-2 align-top text-[11px] font-medium"
                            style={{ color: "#9ca3af" }}
                          >
                            {String(
                              SERVICES_CATALOG.filter((s) => selectedServices[s.id]).length +
                                index +
                                1
                            ).padStart(2, "0")}
                          </td>
                          <td className="py-3 align-top">
                            <span
                              className="font-bold text-sm"
                              style={{ color: "#111827" }}
                            >
                              {item.label}
                            </span>
                            {item.description && (
                              <p
                                className="text-[10px] mt-0.5"
                                style={{ color: "#6b7280" }}
                              >
                                {item.description}
                              </p>
                            )}
                            <span
                              className="text-[9px] font-bold uppercase tracking-wider"
                              style={{ color: "#2563eb" }}
                            >
                              Custom Addition
                            </span>
                          </td>
                          <td
                            className="py-3 px-2 text-center text-[10px]"
                            style={{ color: "#9ca3af" }}
                          >
                            —
                          </td>
                          <td
                            className="py-3 pr-2 text-right font-bold whitespace-nowrap text-sm"
                            style={{ color: "#111827" }}
                          >
                            ₹{item.price.toLocaleString("en-IN")}
                          </td>
                        </tr>
                      ))}

                      {totalAmount === 0 && (
                        <tr>
                          <td
                            className="py-8 text-center font-medium italic"
                            style={{ color: "#9ca3af" }}
                            colSpan={4}
                          >
                            No modules selected. Configure package inclusion in the sidebar.
                          </td>
                        </tr>
                      )}

                      {/* Subtotal */}
                      <tr style={{ backgroundColor: "#f8fafc" }}>
                        <td
                          colSpan={3}
                          className="py-2 pl-2 text-right text-[11px] font-medium"
                          style={{ color: "#6b7280" }}
                        >
                          Subtotal
                        </td>
                        <td
                          className="py-2 pr-2 text-right font-semibold text-sm"
                          style={{ color: "#111827" }}
                        >
                          ₹{subtotal.toLocaleString("en-IN")}
                        </td>
                      </tr>

                      {/* GST */}
                      <tr style={{ backgroundColor: "#f8fafc" }}>
                        <td
                          colSpan={3}
                          className="py-2 pl-2 text-right text-[11px] font-medium"
                          style={{ color: "#6b7280" }}
                        >
                          GST @ 18%
                        </td>
                        <td
                          className="py-2 pr-2 text-right font-semibold text-sm"
                          style={{ color: "#111827" }}
                        >
                          ₹{gstAmount.toLocaleString("en-IN")}
                        </td>
                      </tr>

                      {/* Total */}
                      <tr style={{ backgroundColor: "#1e3a8a", color: "#ffffff" }}>
                        <td
                          colSpan={3}
                          className="py-3 pl-3 text-right text-sm font-bold rounded-l-lg"
                        >
                          Total Investment
                        </td>
                        <td className="py-3 pr-3 text-right font-bold text-lg rounded-r-lg whitespace-nowrap">
                          ₹{totalAmount.toLocaleString("en-IN")}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Payment Summary */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div
                    className="p-3 rounded-xl"
                    style={{ border: "2px solid #22c55e", backgroundColor: "#f0fdf4" }}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <CreditCard size={12} style={{ color: "#16a34a" }} />
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: "#15803d" }}
                      >
                        Advance Payment
                      </span>
                    </div>
                    <p className="text-lg font-bold" style={{ color: "#15803d" }}>
                      ₹{calculatedAdvance.toLocaleString("en-IN")}
                    </p>
                    <p className="text-[9px] mt-0.5" style={{ color: "#166534" }}>
                      Due at project initiation
                    </p>
                  </div>
                  <div
                    className="p-3 rounded-xl"
                    style={{ border: "2px solid #f59e0b", backgroundColor: "#fffbeb" }}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Landmark size={12} style={{ color: "#d97706" }} />
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: "#b45309" }}
                      >
                        Balance Due
                      </span>
                    </div>
                    <p className="text-lg font-bold" style={{ color: "#b45309" }}>
                      ₹{calculatedBalance.toLocaleString("en-IN")}
                    </p>
                    <p className="text-[9px] mt-0.5" style={{ color: "#92400e" }}>
                      Payable on layout approval
                    </p>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="mt-5">
                  <button
                    onClick={() => setShowTerms(!showTerms)}
                    className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider mb-2 hover:opacity-70 transition"
                    style={{ color: "#1e3a8a" }}
                  >
                    {showTerms ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    Terms & Conditions
                  </button>
                  {showTerms && (
                    <div
                      className="border rounded-xl p-4 text-[10px] leading-relaxed space-y-2.5"
                      style={{
                        backgroundColor: "#f8fafc",
                        borderColor: "#e5e7eb",
                        color: "#4b5563",
                      }}
                    >
                      <div className="flex items-start gap-2">
                        <AlertCircle
                          size={12}
                          style={{ color: "#3b82f6", marginTop: "2px", flexShrink: 0 }}
                        />
                        <p>
                          <strong style={{ color: "#111827" }}>Payment Terms:</strong> Booking
                          advance of{" "}
                          <strong style={{ color: "#1e3a8a" }}>
                            ₹{calculatedAdvance.toLocaleString("en-IN")}
                          </strong>{" "}
                          is required to initiate the project. The balance of{" "}
                          <strong style={{ color: "#1e3a8a" }}>
                            ₹{calculatedBalance.toLocaleString("en-IN")}
                          </strong>{" "}
                          must be settled immediately following schematic layout approval.
                        </p>
                      </div>
                      {terms.map((term, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <span
                            className="font-bold mt-0.5 flex-shrink-0"
                            style={{ color: "#3b82f6" }}
                          >
                            {index + 2}.
                          </span>
                          <p>{term}</p>
                        </div>
                      ))}
                      <div
                        className="flex items-start gap-2 pt-1"
                        style={{ borderTop: "1px solid #e5e7eb" }}
                      >
                        <Shield
                          size={12}
                          style={{ color: "#3b82f6", marginTop: "2px", flexShrink: 0 }}
                        />
                        <p>
                          <strong style={{ color: "#111827" }}>Validity:</strong> This quotation
                          is valid for {form.validityDays} days from the date of issue. Prices
                          are subject to change thereafter.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Signatures */}
                <div
                  className="flex justify-between mt-8 pt-5"
                  style={{ borderTop: "1px solid #e5e7eb" }}
                >
                  <div>
                    <div className="h-12 flex items-end mb-2">
                      <img
                        src="/Ankit_Pandey_sign.png"
                        alt="Authorized Signature"
                        className="h-10 w-auto object-contain mix-blend-multiply"
                        crossOrigin="anonymous"
                      />
                    </div>
                    <div
                      className="w-32 mb-1.5"
                      style={{ borderBottom: "1px solid #d1d5db" }}
                    ></div>
                    <p className="font-bold text-xs" style={{ color: "#111827" }}>
                      Dream Homes Bihar
                    </p>
                    <p className="text-[10px]" style={{ color: "#9ca3af" }}>
                      Authorized Signatory
                    </p>
                  </div>
                  <div className="text-right flex flex-col justify-end">
                    <div
                      className="w-36 mb-1.5 ml-auto"
                      style={{ borderBottom: "1px solid #d1d5db" }}
                    ></div>
                    <p className="text-[10px] font-medium" style={{ color: "#6b7280" }}>
                      Client Acceptance
                    </p>
                    <p className="text-[9px]" style={{ color: "#9ca3af" }}>
                      Date: _______________
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div
                  className="mt-6 pt-4 text-center"
                  style={{ borderTop: "1px solid #f3f4f6" }}
                >
                  <p className="text-[9px]" style={{ color: "#9ca3af" }}>
                    This is a computer-generated quotation and does not require a physical
                    signature.
                  </p>
                  <p className="text-[9px] mt-0.5" style={{ color: "#9ca3af" }}>
                    Dream Homes Bihar • Patna, Bihar • +91 62058 20278 •
                    info@dreamhomesbihar.in
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}