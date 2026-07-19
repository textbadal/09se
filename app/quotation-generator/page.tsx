"use client";

import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Printer, Share2, Plus, Trash2 } from "lucide-react";

// 1. Unified Configuration Matrix for Scalable Maintenance
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
    label: "Architectural Drawings Package",
    prices: { "Ground": 5000, "G+1": 6500, "G+2": 8000, "G+3": 9500 },
    deliverables: ["Working Floor Plans (All Floors)", "Site & Furniture Layouts", "Wall Centerline / Masonry Plans", "Cross-Sections & Openings Schedules"]
  },
  {
    id: "structural",
    label: "Structural Engineering Blueprint",
    prices: { "Ground": 3500, "G+1": 4500, "G+2": 5500, "G+3": 6500 },
    deliverables: ["Foundation & Footing Detail Maps", "Column Placement & Layout Schemes", "Plinth & Roof Beam Concrete Schedules", "Slab Reinforcement Specifications"]
  },
  {
    id: "mep",
    label: "MEP Infrastructure Layouts",
    prices: { "Ground": 2000, "G+1": 2500, "G+2": 3000, "G+3": 3500 },
    deliverables: ["Electrical Schematics (Conduit Routing & Switchboard placements)", "Plumbing & Sanitation Plans (Freshwater & Drainage systems)"]
  },
  {
    id: "elevation3d",
    label: "Photorealistic 3D Front Elevation",
    prices: { "Ground": 2499, "G+1": 2499, "G+2": 2499, "G+3": 2499 },
    deliverables: ["High-Fidelity Exterior 3D Rendering", "Material Guide Suggestions", "Modern Concept Color Profiles"]
  }
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
    revisions: "3"
  });

  const [selectedServices, setSelectedServices] = useState<Record<string, boolean>>({
    architectural: true,
    structural: true,
    mep: true,
    elevation3d: true,
  });

  // State for manual items array
  const [customItems, setCustomItems] = useState<CustomItem[]>([]);
  // Local state for the custom item entry inputs
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

  // Compute exact live dynamic totals including the manual line items
  const baseTotal = SERVICES_CATALOG
    .filter((s) => selectedServices[s.id])
    .reduce((sum, s) => sum + getServicePrice(s), 0);

  const customTotal = customItems.reduce((sum, item) => sum + item.price, 0);
  const totalAmount = baseTotal + customTotal;

  // Dynamic Advance Calculation (35% Milestone Booking Fee)
  const calculatedAdvance = Math.round(totalAmount * 0.35);
  const calculatedBalance = totalAmount - calculatedAdvance;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleServiceToggle = (id: string) => {
    setSelectedServices(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Add item handler
  const handleAddCustomItem = () => {
    if (!manualLabel.trim() || !manualPrice) return;
    
    const newItem: CustomItem = {
      id: Math.random().toString(36).substr(2, 9),
      label: manualLabel,
      price: parseFloat(manualPrice) || 0
    };

    setCustomItems([...customItems, newItem]);
    setManualLabel("");
    setManualPrice("");
  };

  // Remove item handler
  const handleRemoveCustomItem = (id: string) => {
    setCustomItems(customItems.filter(item => item.id !== id));
  };

  const downloadPDF = async () => {
    if (!quoteRef.current || isGenerating) return;
    try {
      setIsGenerating(true);
      const canvas = await html2canvas(quoteRef.current, {
        scale: 3,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        onclone: (clonedDoc) => {
          const elements = clonedDoc.getElementsByTagName("*");
          for (let i = 0; i < elements.length; i++) {
            const el = elements[i] as HTMLElement;
            if (el.style) {
              el.style.boxShadow = "none";
              el.style.textShadow = "none";
              const computed = window.getComputedStyle(el);
              if (computed.borderColor?.includes("oklch")) el.style.borderColor = "#e5e7eb";
              if (computed.backgroundColor?.includes("oklch")) el.style.backgroundColor = "transparent";
              if (computed.color?.includes("oklch")) el.style.color = "#1f2937";
            }
          }
        }
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(`Quotation-${quoteNumber || "Draft"}.pdf`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const shareWhatsApp = () => {
    const text = `*Quotation No:* ${quoteNumber}\n\n*Client:* ${form.clientName || "N/A"}\n*Project:* ${form.projectName || "N/A"}\n\n*Total Amount:* ₹${totalAmount.toLocaleString('en-IN')}\n*Advance Booking Fee:* ₹${calculatedAdvance.toLocaleString('en-IN')}\n\n_Dream Homes Bihar_`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 print:bg-white print:p-0">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 print:block">
        
        {/* FORM CONFIGURATION SIDE */}
        <div className="bg-white p-6 rounded-2xl shadow print:hidden space-y-5">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Quotation Engine</h1>
            <p className="text-xs text-gray-500">Configure architectural metrics & components.</p>
          </div>

          <div className="space-y-3.5">
            <input name="clientName" placeholder="Client Name" value={form.clientName} onChange={handleChange} className="w-full border p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            <div className="grid grid-cols-2 gap-3">
              <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="border p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              <input name="email" placeholder="Email Address" value={form.email} onChange={handleChange} className="border p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <input name="projectName" placeholder="Project Name" value={form.projectName} onChange={handleChange} className="w-full border p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            <input name="location" placeholder="Location" value={form.location} onChange={handleChange} className="w-full border p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />

            <div className="grid grid-cols-2 gap-3">
              <input name="plotArea" placeholder="Plot Area" value={form.plotArea} onChange={handleChange} className="border p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              <input name="builtUpArea" placeholder="Built-up Area" value={form.builtUpArea} onChange={handleChange} className="border p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <select name="numberOfFloors" value={form.numberOfFloors} onChange={handleChange} className="border p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Ground">Ground</option>
                <option value="G+1">G+1</option>
                <option value="G+2">G+2</option>
                <option value="G+3">G+3</option>
              </select>
              <select name="plotFacing" value={form.plotFacing} onChange={handleChange} className="border p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500">
                <option>East</option>
                <option>West</option>
                <option>North</option>
                <option>South</option>
              </select>
            </div>

            {/* SERVICES CHECKLIST */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2.5">
              <h3 className="text-xs font-bold text-gray-500 tracking-wider uppercase">Select Included Modules</h3>
              {SERVICES_CATALOG.map((service) => (
                <label key={service.id} className="flex items-start gap-3 p-2 bg-white rounded-lg border border-gray-200 shadow-sm cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={selectedServices[service.id]}
                    onChange={() => handleServiceToggle(service.id)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1 text-xs">
                    <span className="font-semibold text-gray-800 block">{service.label}</span>
                    <span className="text-blue-600 font-bold mt-0.5 block">
                      ₹{getServicePrice(service).toLocaleString("en-IN")}.00
                    </span>
                  </div>
                </label>
              ))}
            </div>

            {/* MANUAL ADJUSTMENTS CONFIGURATOR */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3">
              <h3 className="text-xs font-bold text-gray-500 tracking-wider uppercase">Add Custom Adjustments</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g., Extra Site Inspection Visit"
                  value={manualLabel}
                  onChange={(e) => setManualLabel(e.target.value)}
                  className="flex-1 border p-2 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                />
                <input
                  type="number"
                  placeholder="Price (₹)"
                  value={manualPrice}
                  onChange={(e) => setManualPrice(e.target.value)}
                  className="w-24 border p-2 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                />
                <button
                  onClick={handleAddCustomItem}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 rounded-lg flex items-center justify-center transition"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Dynamic management list for added adjustments */}
              {customItems.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  {customItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center bg-white p-2 rounded-lg border border-gray-100 text-xs shadow-sm">
                      <span className="text-gray-700 font-medium truncate max-w-[200px]">{item.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">₹{item.price.toLocaleString("en-IN")}</span>
                        <button onClick={() => handleRemoveCustomItem(item.id)} className="text-red-500 hover:text-red-700 p-0.5 transition">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4">
            <button onClick={downloadPDF} disabled={isGenerating} className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white p-2.5 rounded-lg text-sm flex justify-center items-center gap-2 font-medium transition">
              <Download size={16} /> {isGenerating ? "..." : "PDF"}
            </button>
            <button onClick={() => window.print()} className="bg-gray-800 hover:bg-gray-900 text-white p-2.5 rounded-lg text-sm flex justify-center items-center gap-2 font-medium transition">
              <Printer size={16} /> Print
            </button>
            <button onClick={shareWhatsApp} className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-lg text-sm flex justify-center items-center gap-2 font-medium transition">
              <Share2 size={16} /> Share
            </button>
          </div>
        </div>

        {/* INVOICE PREVIEW SIDE */}
        <div ref={quoteRef} style={{ backgroundColor: "#ffffff", color: "#1f2937" }} className="p-8 rounded-2xl shadow border border-gray-200 print:shadow-none print:border-none print:p-0">
          
          {/* Brand Header */}
          <div className="flex justify-between border-b-2 pb-5" style={{ borderColor: "#f3f4f6" }}>
            <div>
              <h1 className="text-xl font-black tracking-wide" style={{ color: "#1e3a8a" }}>DREAM HOMES BIHAR</h1>
              <p className="text-[10px] font-bold tracking-widest uppercase mt-0.5" style={{ color: "#9ca3af" }}>
                Architectural Drawings & Engineering Services
              </p>
            </div>
            <div className="text-right text-xs" style={{ color: "#4b5563" }}>
              <p className="font-bold text-sm" style={{ color: "#111827" }}>{quoteNumber || "Generating..."}</p>
              <p className="mt-0.5" style={{ color: "#6b7280" }}>{new Date().toLocaleDateString("en-IN")}</p>
            </div>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-2 gap-6 mt-5 text-xs">
            <div className="p-3 rounded-xl border" style={{ backgroundColor: "#f9fafb", borderColor: "#f3f4f6" }}>
              <h4 className="font-bold text-[10px] uppercase tracking-wider mb-1.5" style={{ color: "#9ca3af" }}>Client Details</h4>
              <p className="font-bold" style={{ color: "#1f2937" }}>{form.clientName || "—"}</p>
              <p className="mt-0.5" style={{ color: "#4b5563" }}>{form.phone || "—"}</p>
              <p style={{ color: "#4b5563" }}>{form.email || "—"}</p>
            </div>
            <div className="p-3 rounded-xl border" style={{ backgroundColor: "#f9fafb", borderColor: "#f3f4f6" }}>
              <h4 className="font-bold text-[10px] uppercase tracking-wider mb-1.5" style={{ color: "#9ca3af" }}>Project Scope</h4>
              <p className="font-bold" style={{ color: "#1f2937" }}>{form.projectName || "—"}</p>
              <p className="mt-0.5" style={{ color: "#4b5563" }}>{form.location || "—"}</p>
              <p className="mt-1 font-semibold text-[11px]" style={{ color: "#6b7280" }}>
                {form.numberOfFloors} Design | {form.plotFacing} Facing 
                {form.plotArea && ` | Plot: ${form.plotArea}`}
                {form.builtUpArea && ` | Built-up: ${form.builtUpArea}`}
              </p>
            </div>
          </div>

          {/* Itemized Estimate Table */}
          <div className="mt-6">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b font-bold text-[10px] uppercase" style={{ borderColor: "#e5e7eb", color: "#9ca3af" }}>
                  <th className="pb-2 pl-1">Module Description</th>
                  <th className="pb-2 pr-1 text-right">Net Value</th>
                </tr>
              </thead>
              <tbody>
                {/* 1. System Services Catalog Items */}
                {SERVICES_CATALOG.filter(s => selectedServices[s.id]).map((service) => (
                  <tr key={service.id} className="border-b" style={{ borderColor: "#f3f4f6" }}>
                    <td className="py-3.5 pl-1 align-top">
                      <span className="font-bold text-gray-900 block">{service.label}</span>
                      <ul className="list-disc pl-4 mt-1 space-y-0.5 text-[11px] text-gray-500">
                        {service.deliverables.map((item, idx) => <li key={idx}>{item}</li>)}
                      </ul>
                    </td>
                    <td className="py-3.5 pr-1 text-right font-bold align-top text-gray-800">
                      ₹{getServicePrice(service).toLocaleString("en-IN")}.00
                    </td>
                  </tr>
                ))}

                {/* 2. Custom Rendered Manual Adjustment Lines */}
                {customItems.map((item) => (
                  <tr key={item.id} className="border-b" style={{ borderColor: "#f3f4f6" }}>
                    <td className="py-3.5 pl-1 align-top">
                      <span className="font-bold text-gray-900 block">{item.label}</span>
                      <span className="text-[10px] text-blue-500 font-semibold uppercase tracking-wider">Custom Adjustment Line</span>
                    </td>
                    <td className="py-3.5 pr-1 text-right font-bold align-top text-gray-800">
                      ₹{item.price.toLocaleString("en-IN")}.00
                    </td>
                  </tr>
                ))}
                
                {totalAmount === 0 && (
                  <tr>
                    <td className="py-8 text-center font-medium italic text-gray-400" colSpan={2}>
                      No modules selected. Configure package inclusion inside sidebar configuration interface.
                    </td>
                  </tr>
                )}

                <tr className="font-bold text-sm" style={{ backgroundColor: "#eff6ff", color: "#1e3a8a" }}>
                  <td className="py-3 pl-3 rounded-l-xl">Total Net Estimated Investment</td>
                  <td className="py-3 pr-3 text-right rounded-r-xl">
                    ₹{totalAmount.toLocaleString("en-IN")}.00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Dynamic Terms & Milestones Display */}
          <div className="mt-6">
            <h4 className="font-bold text-[10px] uppercase tracking-wider mb-1.5" style={{ color: "#9ca3af" }}>Terms & Project Governance</h4>
            <div className="border rounded-xl p-3.5 text-[11px] leading-relaxed font-sans space-y-2.5" style={{ backgroundColor: "#f9fafb", borderColor: "#f3f4f6", color: "#4b5563" }}>
              <p>
                <strong>1. Dynamic Milestones Architecture:</strong>
                <br />• <strong>Booking Advance (35%):</strong> An upfront setup payment of <strong>₹{calculatedAdvance.toLocaleString("en-IN")}</strong> is required to launch project draft cycles.
                <br />• <strong>Project Execution Balance (65%):</strong> The outstanding balance of <strong>₹{calculatedBalance.toLocaleString("en-IN")}</strong> must be settled immediately following schematic layout approval, strictly prior to high-resolution CAD compilation delivery.
              </p>
              <p>
                <strong>2. Turnaround Framework:</strong> Initial concepts will be generated within 10 to 15 business days following advance acquisition. Deadlines exclude public holidays and weekends.
              </p>
              <p>
                <strong>3. Modification Scope:</strong> This quote allows for up to {form.revisions} complimentary configuration corrections. Final approvals lock drawing state; subsequent structural modifications generate independent change-order costs.
              </p>
              <p>
                <strong>4. Scope Constraints:</strong> Fee structures isolate remote technical design compilation only. Site engineering diagnostics, architectural line verification, or physical construction inspections are completely excluded.
              </p>
            </div>
          </div>

          {/* Corporate Signatures */}
          <div className="flex justify-between mt-8 pt-6 border-t" style={{ borderColor: "#f3f4f6" }}>
            <div>
              <div className="h-12 flex items-end mb-1">
                <img src="/Ankit_Pandey_sign.png" alt="Authorized Signature" className="h-11 w-auto object-contain mix-blend-multiply" crossOrigin="anonymous" />
              </div>
              <p className="font-bold text-xs text-gray-800">Dream Homes Bihar</p>
              <p className="text-[10px] text-gray-400">Authorized Signatory</p>
            </div>
            <div className="text-right flex flex-col justify-end">
              <div className="w-36 border-b mb-1 ml-auto" style={{ borderColor: "#d1d5db" }}></div>
              <p className="text-[10px] text-gray-400">Accepted By Client</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}