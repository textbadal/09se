"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/* ==========================================
   TYPES & INTERFACES
   ========================================== */
export type ConstructionQuality = "basic" | "standard" | "premium" | "luxury";
export type LocationTier = "tier1" | "tier2" | "tier3" | "rural";
export type ActiveTabType = "civil_boq" | "finishing_boq";

export interface BOQItem {
  id: string;
  description: string;
  uom: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface CalculationResult {
  totalArea: number;
  plotArea: number;
  length: number;
  width: number;
  totalCost: number;
  costPerSqft: number;
  civilBOQ: BOQItem[];
  finishingBOQ: BOQItem[];
  timelineMonths: number;
}

export interface CalculatorInputs {
  length: string;
  width: string;
  floors: number;
  type: ConstructionQuality;
  location: LocationTier;
}

/* ==========================================
   CONSTANTS & BOQ ENGINE
   ========================================== */
const BASE_RATES: Record<ConstructionQuality, number> = {
  basic: 1500,
  standard: 1800,
  premium: 2200,
  luxury: 3000,
};

const LOCATION_MULTIPLIERS: Record<LocationTier, number> = {
  tier1: 1.3,
  tier2: 1.0,
  tier3: 0.85,
  rural: 0.75,
};

const generateBOQReport = (inputs: CalculatorInputs): CalculationResult | null => {
  const l = Number(inputs.length);
  const w = Number(inputs.width);

  if (isNaN(l) || isNaN(w) || l <= 0 || w <= 0) return null;

  const plotArea = l * w;
  const totalArea = plotArea * inputs.floors;
  const adjustedRate = BASE_RATES[inputs.type] * LOCATION_MULTIPLIERS[inputs.location];
  const totalCost = Math.round(totalArea * adjustedRate);
  const factor = totalArea / 1000;

  const cementQty = Math.round(420 * factor * (inputs.type === "premium" ? 1.15 : 1));
  const cementRate = Math.round(430 * LOCATION_MULTIPLIERS[inputs.location]);
  const steelQty = Number((4.6 * factor * (inputs.floors > 1 ? 1.12 : 1)).toFixed(2));
  const steelRate = Math.round(65000 * LOCATION_MULTIPLIERS[inputs.location]);
  const bricksQty = Math.round(9500 * factor);
  const bricksRate = 9;
  const sandQty = Math.round(1800 * factor);
  const sandRate = 65;
  const aggregateQty = Math.round(1400 * factor);
  const aggregateRate = 75;
  const excavationVol = Math.round(totalArea * 1.2);
  const excavationRate = 12;

  const civilBOQ: BOQItem[] = [
    { id: "C1", description: "Earthwork excavation in all types of soil for foundations including lifting and disposal", uom: "CFT", quantity: excavationVol, rate: excavationRate, amount: excavationVol * excavationRate },
    { id: "C2", description: "Supplying and placing Standard OPC/PPC Grade Cement bags for RCC and masonry works", uom: "Bags", quantity: cementQty, rate: cementRate, amount: cementQty * cementRate },
    { id: "C3", description: "Providing, detailing, and binding High-Yield Strength Deformed (HYSD) Fe-550 Steel reinforcement", uom: "MT", quantity: steelQty, rate: steelRate, amount: Math.round(steelQty * steelRate) },
    { id: "C4", description: "First-class structural brickwork masonry using conventional kiln-burnt clay bricks in cement mortar", uom: "Nos", quantity: bricksQty, rate: bricksRate, amount: bricksQty * bricksRate },
    { id: "C5", description: "Fine-grained river sand/M-Sand processed for structural concrete and plastering applications", uom: "CFT", quantity: sandQty, rate: sandRate, amount: sandQty * sandRate },
    { id: "C6", description: "Crushed stone coarse aggregate (20mm down structural grade graded matrix)", uom: "CFT", quantity: aggregateQty, rate: aggregateRate, amount: aggregateQty * aggregateRate },
    { id: "C7", description: "Skilled & un-skilled labor component for execution of structural casting, shuttering, and scaffolding", uom: "Sq.Ft", quantity: totalArea, rate: Math.round(adjustedRate * 0.18), amount: Math.round(totalArea * (adjustedRate * 0.18)) },
  ];

  const structuralCivilTotal = civilBOQ.reduce((sum, item) => sum + item.amount, 0);
  const remainingBudget = totalCost - structuralCivilTotal;

  const finishingBOQ: BOQItem[] = [
    { id: "F1", description: "Vitrified tiling / Premium marble floor finishing inside rooms, hallways and staircases", uom: "Sq.Ft", quantity: Math.round(totalArea * 0.9), rate: inputs.type === "luxury" ? 250 : 120, amount: Math.round(totalArea * 0.9 * (inputs.type === "luxury" ? 250 : 120)) },
    { id: "F2", description: "Internal & External plastering finishing with premium weatherproof emulsion application coats", uom: "Sq.Ft", quantity: Math.round(totalArea * 3.4), rate: 35, amount: Math.round(totalArea * 3.4 * 35) },
    { id: "F3", description: "Complete internal plumbing concealed distribution system setup including sanitary fixtures", uom: "LS", quantity: 1, rate: Math.round(remainingBudget * 0.22), amount: Math.round(remainingBudget * 0.22) },
    { id: "F4", description: "Concealed electrical PVC conduits wiring infrastructure installation alongside core distribution boards", uom: "LS", quantity: 1, rate: Math.round(remainingBudget * 0.20), amount: Math.round(remainingBudget * 0.20) },
    { id: "F5", description: "Premium flush doors with teak wood frames and uPVC window tracking panels assembly fixes", uom: "Nos", quantity: Math.round(5 * factor * inputs.floors), rate: 12000, amount: Math.round(5 * factor * inputs.floors * 12000) },
    { id: "F6", description: "Architectural consultancy, site validation structural detailing, and structural submission engineering designs", uom: "Sq.Ft", quantity: totalArea, rate: 35, amount: Math.round(totalArea * 35) },
  ];

  const compiledTotal = structuralCivilTotal + finishingBOQ.reduce((sum, item) => sum + item.amount, 0);
  const offsetDiff = totalCost - compiledTotal;
  
  finishingBOQ.push({
    id: "F7",
    description: "Site overheads, insurance, structural contingencies, water arrangements and site safety implementation protocols",
    uom: "LS",
    quantity: 1,
    rate: offsetDiff,
    amount: offsetDiff
  });

  const timelineMonths = Math.round((totalArea / 500) * (inputs.floors * 0.8));

  return {
    totalArea,
    plotArea,
    length: l,
    width: w,
    totalCost,
    costPerSqft: adjustedRate,
    civilBOQ,
    finishingBOQ,
    timelineMonths,
  };
};

/* ==========================================
   MAIN COMPONENT
   ========================================== */
export default function CalculatorPage() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    length: "",
    width: "",
    floors: 1,
    type: "standard",
    location: "tier2",
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<ActiveTabType>("civil_boq");

  const handleInputChange = (field: keyof CalculatorInputs, value: string | number) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const currentPlotArea = useMemo(() => {
    const l = Number(inputs.length);
    const w = Number(inputs.width);
    return !isNaN(l) && !isNaN(w) && l > 0 && w > 0 ? l * w : 0;
  }, [inputs.length, inputs.width]);

  useEffect(() => {
    if (currentPlotArea > 0) {
      setIsCalculating(true);
      const timer = setTimeout(() => {
        setResult(generateBOQReport(inputs));
        setIsCalculating(false);
      }, 350);
      return () => clearTimeout(timer);
    } else {
      setResult(null);
    }
  }, [inputs, currentPlotArea]);

const handlePdfGeneration = async () => {
    const originalElement = document.getElementById("estimation-report-card");
    if (!originalElement || isPdfGenerating) return;

    try {
      setIsPdfGenerating(true);
      await new Promise((resolve) => setTimeout(resolve, 150));

      // Define standard desktop printable layout dimensions
      const printWidth = 1200;

      const canvas = await html2canvas(originalElement, {
        scale: 2, 
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: printWidth, // Forces media queries to load desktop variations
        onclone: (clonedDoc, element) => {
          // 1. Strip out global oklch rules to prevent parsing engine crashes
          clonedDoc.documentElement.removeAttribute("style");
          clonedDoc.body.removeAttribute("style");

          const sheets = Array.from(clonedDoc.styleSheets);
          sheets.forEach((sheet) => {
            try {
              const rules = Array.from(sheet.cssRules);
              for (let i = rules.length - 1; i >= 0; i--) {
                const ruleText = rules[i].cssText.toLowerCase();
                if (ruleText.includes("oklch") || ruleText.includes("oklab")) {
                  sheet.deleteRule(i);
                }
              }
            } catch (e) {
              if (sheet.ownerNode && sheet.ownerNode.parentNode) {
                sheet.ownerNode.parentNode.removeChild(sheet.ownerNode);
              }
            }
          });

          // 2. FORCE ISOLATION: Inject a parent container onto the clone to force table grid structures to layout cleanly
          const parentWrapper = clonedDoc.createElement("div");
          parentWrapper.style.width = `${printWidth}px`;
          parentWrapper.style.minWidth = `${printWidth}px`;
          parentWrapper.style.maxWidth = `${printWidth}px`;
          parentWrapper.style.padding = "40px";
          parentWrapper.style.boxSizing = "border-box";
          parentWrapper.style.backgroundColor = "#ffffff";
          parentWrapper.style.position = "absolute";
          parentWrapper.style.left = "0";
          parentWrapper.style.top = "0";

          // Move the target element into our forced print width block
          if (element && element.parentNode) {
            element.parentNode.insertBefore(parentWrapper, element);
            parentWrapper.appendChild(element);
          }

          // 3. Force layout items to drop responsive hidden modes and scale horizontally 
          element.style.width = "100%";
          element.style.maxWidth = "100%";
          element.style.minWidth = "100%";
          element.style.display = "block";

          // Force unwrap hidden horizontal table scroll fields
          const scrollingBlocks = parentWrapper.querySelectorAll(".overflow-x-auto");
          scrollingBlocks.forEach((block) => {
            const htmlBlock = block as HTMLElement;
            htmlBlock.style.overflow = "visible";
            htmlBlock.style.overflowX = "visible";
            htmlBlock.style.width = "100%";
            htmlBlock.style.display = "block";
          });

          const dataTables = parentWrapper.querySelectorAll("table");
          dataTables.forEach((table) => {
            const htmlTable = table as HTMLElement;
            htmlTable.style.width = "100%";
            htmlTable.style.minWidth = "100%";
            htmlTable.style.tableLayout = "fixed"; // Prevents cells from bunching together
          });

          // Ensure flat safe hex color parameters match on elements
          const components = parentWrapper.querySelectorAll("*");
          components.forEach((node) => {
            const item = node as HTMLElement;
            if (item.classList.contains("bg-slate-900")) {
              item.style.setProperty("background-color", "#0f172a", "important");
              item.style.setProperty("color", "#ffffff", "important");
            }
            if (item.classList.contains("bg-slate-50")) {
              item.style.setProperty("background-color", "#f8fafc", "important");
            }
          });
        }
      });

      // Render the high DPI canvas map straight to standard A4 sheets 
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const margin = 12; // Standard uniform page margin padding
      const printableWidth = pdfWidth - (margin * 2);
      const imgWidth = printableWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = margin;

      pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
      heightLeft -= (pdfHeight - (margin * 2));

      while (heightLeft > 0) {
        position = heightLeft - imgHeight + margin;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
        heightLeft -= (pdfHeight - (margin * 2));
      }

      pdf.save(`BOQ_Report_${inputs.length}_x_${inputs.width}.pdf`);
    } catch (error) {
      console.error("Critical error building system PDF report:", error);
    } finally {
      setIsPdfGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">
        
        {/* Header Block */}
        <header className="mb-10 text-center md:text-left md:flex md:items-center md:justify-between border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              Parametric Bill of Quantities (BOQ)
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Engineering Estimation Worksheet • Generated for Structural and Finishes Takeoffs.
            </p>
          </div>
          <div className="mt-4 md:mt-0 inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm">
            📅 Index Year: 2026
          </div>
        </header>

        {/* Workspace Card Container */}
        <div 
          id="estimation-report-card" 
          className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mx-auto"
        >
          {/* Parameter Inputs Area */}
          <div className="p-6 bg-slate-100 border-b border-slate-200 data-html2canvas-ignore-inputs">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              
              <div className="space-y-1">
                <label htmlFor="input-length" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Plot Length (ft)</label>
                <div className="relative">
                  <input
                    id="input-length"
                    type="number"
                    placeholder="Length"
                    value={inputs.length}
                    onChange={(e) => handleInputChange("length", e.target.value)}
                    className="w-full pl-3 pr-8 py-2 bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm text-slate-900 font-semibold"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-xs text-slate-400">ft</div>
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="input-width" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Plot Width (ft)</label>
                <div className="relative">
                  <input
                    id="input-width"
                    type="number"
                    placeholder="Width"
                    value={inputs.width}
                    onChange={(e) => handleInputChange("width", e.target.value)}
                    className="w-full pl-3 pr-8 py-2 bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm text-slate-900 font-semibold"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-xs text-slate-400">ft</div>
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="select-floors" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Elevation Structure</label>
                <select
                  id="select-floors"
                  value={inputs.floors}
                  onChange={(e) => handleInputChange("floors", Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm text-slate-700 font-semibold cursor-pointer"
                >
                  <option value={1}>Ground Floor Only</option>
                  <option value={2}>G + 1 Structure</option>
                  <option value={3}>G + 2 Structure</option>
                  <option value={4}>G + 3 Structure</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="select-quality" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Spec Quality</label>
                <select
                  id="select-quality"
                  value={inputs.type}
                  onChange={(e) => handleInputChange("type", e.target.value as ConstructionQuality)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm text-slate-700 font-semibold cursor-pointer"
                >
                  <option value="basic">Basic Specification</option>
                  <option value="standard">Standard Execution</option>
                  <option value="premium">Premium Grade</option>
                  <option value="luxury">Luxury Fitouts</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="select-location" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Logistical Zone</label>
                <select
                  id="select-location"
                  value={inputs.location}
                  onChange={(e) => handleInputChange("location", e.target.value as LocationTier)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm text-slate-700 font-semibold cursor-pointer"
                >
                  <option value="tier1">Tier 1 Metros</option>
                  <option value="tier2">Tier 2 Urban</option>
                  <option value="tier3">Tier 3 Semi-Urban</option>
                  <option value="rural">Rural Outskirts</option>
                </select>
              </div>

            </div>
          </div>

          {/* Results Tabular Presentation Workspace */}
          <div>
            {result ? (
              <div className="p-6">
                
                {/* Meta Dashboard Summary Box */}
                <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-900 text-white rounded-xl">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Gross Estimate Total</span>
                    <span className="text-xl font-black">₹{result.totalCost.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Total Built-Up Area</span>
                    <span className="text-xl font-black">{result.totalArea.toLocaleString()} Sq.Ft</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Unified Index Rate</span>
                    <span className="text-xl font-black">₹{result.costPerSqft.toLocaleString()} / Sq.Ft</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Est. Completion Schedule</span>
                    <span className="text-xl font-black">{result.timelineMonths} Months</span>
                  </div>
                </div>

                {/* BOQ Switching Tabs */}
                <div className="flex border-b border-slate-200 mb-4 data-html2canvas-ignore">
                  <button
                    onClick={() => setActiveTab("civil_boq")}
                    className={`px-4 py-2.5 font-bold text-xs uppercase tracking-wider border-b-2 transition-all ${
                      activeTab === "civil_boq" ? "text-blue-600 border-blue-600" : "text-slate-400 border-transparent hover:text-slate-600"
                    }`}
                  >
                    Structural Civil Works (Schedule A)
                  </button>
                  <button
                    onClick={() => setActiveTab("finishing_boq")}
                    className={`px-4 py-2.5 font-bold text-xs uppercase tracking-wider border-b-2 transition-all ${
                      activeTab === "finishing_boq" ? "text-blue-600 border-blue-600" : "text-slate-400 border-transparent hover:text-slate-600"
                    }`}
                  >
                    Finishes & MEP Works (Schedule B)
                  </button>
                </div>

                {/* Tabular Matrix Framework */}
                <div className="overflow-x-auto border border-slate-200 rounded-xl mb-6">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-slate-50 text-slate-600 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                        <th className="py-3 px-4 w-16">Item ID</th>
                        <th className="py-3 px-4">Description of Work Material Scope</th>
                        <th className="py-3 px-4 w-20 text-center">Unit</th>
                        <th className="py-3 px-4 w-28 text-right">Quantity</th>
                        <th className="py-3 px-4 w-28 text-right">Rate (₹)</th>
                        <th className="py-3 px-4 w-32 text-right">Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-xs">
                      {((activeTab === "civil_boq" ? result.civilBOQ : result.finishingBOQ)).map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-slate-500">{item.id}</td>
                          <td className="py-3.5 px-4 font-medium text-slate-700 leading-relaxed">{item.description}</td>
                          <td className="py-3.5 px-4 text-center font-bold text-slate-600">{item.uom}</td>
                          <td className="py-3.5 px-4 text-right font-semibold text-slate-900">{item.quantity.toLocaleString()}</td>
                          <td className="py-3.5 px-4 text-right font-semibold text-slate-600">{item.rate.toLocaleString()}</td>
                          <td className="py-3.5 px-4 text-right font-bold text-slate-900">₹{item.amount.toLocaleString()}</td>
                        </tr>
                      ))}
                      {/* Sub-total Row */}
                      <tr className="bg-slate-50/50 font-bold">
                        <td colSpan={5} className="py-4 px-4 text-right uppercase tracking-wider text-slate-500 text-[10px]">
                          Schedule Component Sub-Total:
                        </td>
                        <td className="py-4 px-4 text-right text-sm text-slate-900 font-extrabold border-t border-slate-300">
                          ₹{(activeTab === "civil_boq" 
                            ? result.civilBOQ.reduce((s,i)=>s+i.amount,0) 
                            : result.finishingBOQ.reduce((s,i)=>s+i.amount,0)
                          ).toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Functional Deployment CTA Hub */}
                <div data-html2canvas-ignore="true" className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handlePdfGeneration}
                    disabled={isPdfGenerating}
                    className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white text-center py-3 rounded-lg text-xs font-bold tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{isPdfGenerating ? "⏳" : "📥"}</span>
                    {isPdfGenerating ? "Processing BOQ Sheets..." : "Export Official BOQ PDF"}
                  </button>
                  
                  <a
                    href={`https://wa.me/916205820278?text=I%20require%20comprehensive%20house%20blueprints%20matching%20the%20generated%20BOQ%20specification%20for%20my%20${result.length}%20x%20${result.width}%20plot%20area.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center py-3 rounded-lg text-xs font-bold tracking-wide transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <span>💬</span>
                    Submit BOQ to Structural Engineer
                  </a>
                  
                  <Link
                    href="/services/design"
                    className="w-full bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-center py-3 rounded-lg text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>📋</span>
                    Architectural Rate Schedules
                  </Link>
                </div>

                {/* Disclaimer */}
                <footer className="text-[10px] text-slate-400 text-center mt-6 leading-relaxed">
                  * Structural Verification Notice: This document serves as a standard parametric Bill of Quantities breakdown approximation. Material constants are calculated from general engineering indexes. Actual volume execution parameters depend heavily on local topography, concrete design mix structural codes, and dynamic vendor raw index variations.
                </footer>

              </div>
            ) : (
              <div className="p-16 text-center">
                {isCalculating ? (
                  <div className="space-y-2">
                    <div className="inline-block animate-spin text-2xl text-blue-600">⚙️</div>
                    <p className="text-xs font-semibold text-slate-500 tracking-wide">Processing structural takeoff quantities sheets...</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-w-xs mx-auto">
                    <span className="text-4xl block" aria-hidden="true">📋</span>
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">BOQ Ledger Deactivated</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Provide dimensions to load operational quantity data schedules and material itemization arrays.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}