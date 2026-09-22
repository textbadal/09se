"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  Calculator,
  Ruler,
  Building2,
  MapPin,
  Sparkles,
  Download,
  MessageCircle,
  FileText,
  TrendingUp,
  Clock,
  IndianRupee,
  Layers,
  CheckCircle2,
  Info,
  Loader2,
  AlertTriangle,
  RefreshCw,
  Shield,
} from "lucide-react";

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
   CONSTANTS
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

const QUALITY_META: Record<ConstructionQuality, { label: string; desc: string }> = {
  basic: { label: "Basic Specification", desc: "Essential finishes, standard fittings" },
  standard: { label: "Standard Execution", desc: "Quality materials, branded fittings" },
  premium: { label: "Premium Grade", desc: "High-end finishes, imported fittings" },
  luxury: { label: "Luxury Fitouts", desc: "Designer interiors, smart home ready" },
};

const LOCATION_META: Record<LocationTier, { label: string; desc: string }> = {
  tier1: { label: "Tier 1 Metro", desc: "Delhi, Mumbai, Bangalore, etc." },
  tier2: { label: "Tier 2 Urban", desc: "Patna, Lucknow, Jaipur, etc." },
  tier3: { label: "Tier 3 Semi-Urban", desc: "District headquarters" },
  rural: { label: "Rural Outskirts", desc: "Villages & remote areas" },
};

/* ==========================================
   BOQ CALCULATION ENGINE
   ========================================== */
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
    amount: offsetDiff,
  });

  const timelineMonths = Math.max(2, Math.round((totalArea / 500) * (inputs.floors * 0.8)));

  return {
    totalArea,
    plotArea,
    length: l,
    width: w,
    totalCost,
    costPerSqft: Math.round(adjustedRate),
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
  const reportRef = useRef<HTMLDivElement>(null);

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

  const handleReset = () => {
    setInputs({ length: "", width: "", floors: 1, type: "standard", location: "tier2" });
    setResult(null);
  };

  /* ==========================================================
     PROFESSIONAL PDF GENERATION
     Builds a dedicated A4-optimized report with inline styles only
     ========================================================== */
  const handlePdfGeneration = async () => {
    if (!result || isPdfGenerating) return;

    try {
      setIsPdfGenerating(true);
      await new Promise((resolve) => setTimeout(resolve, 200));

      const formatINR = (n: number) =>
        new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

      const esc = (s: string) =>
        s.replace(/[&<>"']/g, (c) =>
          ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] || c)
        );

      // ----------------------------------------------------------
      // Create hidden A4 container
      // ----------------------------------------------------------
      const reportEl = document.createElement("div");
      reportEl.id = "pdf-only-report";
      reportEl.style.cssText = `
        position: fixed;
        left: -99999px;
        top: 0;
        width: 794px;
        background: #ffffff;
        color: #0f172a;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        font-size: 11px;
        line-height: 1.5;
        padding: 0;
        box-sizing: border-box;
      `;

      const civilTotal = result.civilBOQ.reduce((s, i) => s + i.amount, 0);
      const finishingTotal = result.finishingBOQ.reduce((s, i) => s + i.amount, 0);

      const docId = `DHB-BOQ-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
      const today = new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      // Build the two BOQ tables
      const buildTable = (items: BOQItem[], scheduleLabel: string, scheduleTotal: number) => `
        <div style="margin-bottom: 18px;">
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #0f172a; padding-bottom: 6px; margin-bottom: 0;">
            <div style="font-size: 11px; font-weight: 800; color: #0f172a; letter-spacing: 0.3px; text-transform: uppercase;">
              ${scheduleLabel}
            </div>
            <div style="font-size: 9px; font-weight: 700; color: #64748b; letter-spacing: 0.8px;">
              SUBTOTAL: ₹${formatINR(scheduleTotal)}
            </div>
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 9.5px;">
            <thead>
              <tr style="background: #f1f5f9;">
                <th style="padding: 8px 8px; text-align: left; font-size: 8.5px; font-weight: 800; color: #475569; letter-spacing: 0.6px; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; width: 40px;">Item</th>
                <th style="padding: 8px 8px; text-align: left; font-size: 8.5px; font-weight: 800; color: #475569; letter-spacing: 0.6px; text-transform: uppercase; border-bottom: 1px solid #cbd5e1;">Description of Work</th>
                <th style="padding: 8px 8px; text-align: center; font-size: 8.5px; font-weight: 800; color: #475569; letter-spacing: 0.6px; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; width: 45px;">Unit</th>
                <th style="padding: 8px 8px; text-align: right; font-size: 8.5px; font-weight: 800; color: #475569; letter-spacing: 0.6px; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; width: 70px;">Qty</th>
                <th style="padding: 8px 8px; text-align: right; font-size: 8.5px; font-weight: 800; color: #475569; letter-spacing: 0.6px; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; width: 60px;">Rate</th>
                <th style="padding: 8px 8px; text-align: right; font-size: 8.5px; font-weight: 800; color: #475569; letter-spacing: 0.6px; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; width: 90px;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${items
                .map(
                  (item, idx) => `
                <tr style="background: ${idx % 2 === 0 ? "#ffffff" : "#fafbfc"};">
                  <td style="padding: 7px 8px; font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 8.5px; font-weight: 700; color: #64748b; border-bottom: 1px solid #f1f5f9; vertical-align: top;">${item.id}</td>
                  <td style="padding: 7px 8px; color: #1e293b; line-height: 1.45; border-bottom: 1px solid #f1f5f9; vertical-align: top;">${esc(item.description)}</td>
                  <td style="padding: 7px 8px; text-align: center; border-bottom: 1px solid #f1f5f9; vertical-align: top;">
                    <span style="display: inline-block; padding: 1px 5px; background: #e2e8f0; color: #334155; border-radius: 2px; font-size: 8px; font-weight: 700; letter-spacing: 0.3px;">
                      ${item.uom}
                    </span>
                  </td>
                  <td style="padding: 7px 8px; text-align: right; font-family: 'SF Mono', Monaco, Consolas, monospace; font-weight: 600; color: #0f172a; border-bottom: 1px solid #f1f5f9; vertical-align: top;">${item.quantity.toLocaleString("en-IN")}</td>
                  <td style="padding: 7px 8px; text-align: right; font-family: 'SF Mono', Monaco, Consolas, monospace; font-weight: 600; color: #475569; border-bottom: 1px solid #f1f5f9; vertical-align: top;">${item.rate.toLocaleString("en-IN")}</td>
                  <td style="padding: 7px 8px; text-align: right; font-family: 'SF Mono', Monaco, Consolas, monospace; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9; vertical-align: top;">${item.amount.toLocaleString("en-IN")}</td>
                </tr>
              `
                )
                .join("")}
              <tr style="background: #f1f5f9;">
                <td colspan="5" style="padding: 9px 8px; text-align: right; font-size: 9px; font-weight: 800; color: #334155; letter-spacing: 0.6px; text-transform: uppercase; border-top: 1.5px solid #0f172a;">
                  ${scheduleLabel.replace(/Schedule [AB] — /, "")} Subtotal
                </td>
                <td style="padding: 9px 8px; text-align: right; font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 11px; font-weight: 900; color: #0f172a; border-top: 1.5px solid #0f172a;">
                  ₹${formatINR(scheduleTotal)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      `;

      reportEl.innerHTML = `
        <!-- ============ HEADER (Letterhead) ============ -->
        <div style="background: #0f172a; color: #ffffff; padding: 18px 24px; display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 40px; height: 40px; background: #2563eb; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 18px; color: #ffffff;">
              DH
            </div>
            <div>
              <div style="font-size: 16px; font-weight: 900; letter-spacing: -0.3px; line-height: 1.1;">
                DREAM HOMES BIHAR
              </div>
              <div style="font-size: 8px; font-weight: 700; color: #93c5fd; letter-spacing: 1.5px; text-transform: uppercase; margin-top: 3px;">
                Architectural Drawings & Engineering Services
              </div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 8px; font-weight: 700; color: #93c5fd; letter-spacing: 1.5px; text-transform: uppercase;">
              Document
            </div>
            <div style="font-size: 13px; font-weight: 900; letter-spacing: -0.2px; margin-top: 2px;">
              BILL OF QUANTITIES
            </div>
          </div>
        </div>

        <!-- ============ CONTACT STRIP ============ -->
        <div style="background: #f8fafc; padding: 8px 24px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; font-size: 8.5px; color: #475569;">
          <div>📍 Patna, Bihar, India</div>
          <div>📞 +91 62058 20278</div>
          <div>✉️ info@dreamhomesbihar.com</div>
          <div>🌐 www.dreamhomesbihar.com</div>
        </div>

        <!-- ============ MAIN CONTENT ============ -->
        <div style="padding: 24px;">

          <!-- Document Meta Bar -->
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 12px; margin-bottom: 20px; padding: 12px 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px;">
            <div>
              <div style="font-size: 7.5px; font-weight: 800; color: #64748b; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 3px;">Document No.</div>
              <div style="font-size: 10px; font-weight: 800; color: #0f172a; font-family: 'SF Mono', Monaco, Consolas, monospace;">${docId}</div>
            </div>
            <div>
              <div style="font-size: 7.5px; font-weight: 800; color: #64748b; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 3px;">Date</div>
              <div style="font-size: 10px; font-weight: 800; color: #0f172a;">${today}</div>
            </div>
            <div>
              <div style="font-size: 7.5px; font-weight: 800; color: #64748b; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 3px;">Index Year</div>
              <div style="font-size: 10px; font-weight: 800; color: #0f172a;">2026</div>
            </div>
            <div>
              <div style="font-size: 7.5px; font-weight: 800; color: #64748b; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 3px;">Validity</div>
              <div style="font-size: 10px; font-weight: 800; color: #0f172a;">30 Days</div>
            </div>
          </div>

          <!-- Section: Project Parameters -->
          <div style="margin-bottom: 18px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
              <div style="width: 3px; height: 14px; background: #2563eb; border-radius: 2px;"></div>
              <div style="font-size: 11px; font-weight: 800; color: #0f172a; letter-spacing: 0.3px; text-transform: uppercase;">
                Project Parameters
              </div>
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 9.5px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden;">
              <tr>
                <td style="padding: 8px 12px; background: #f1f5f9; color: #475569; font-weight: 700; width: 22%; border-bottom: 1px solid #e2e8f0;">Plot Dimensions</td>
                <td style="padding: 8px 12px; color: #0f172a; font-weight: 700; width: 28%; border-bottom: 1px solid #e2e8f0;">${inputs.length}' × ${inputs.width}' (${formatINR(currentPlotArea)} sq.ft)</td>
                <td style="padding: 8px 12px; background: #f1f5f9; color: #475569; font-weight: 700; width: 22%; border-bottom: 1px solid #e2e8f0;">Structure Type</td>
                <td style="padding: 8px 12px; color: #0f172a; font-weight: 700; width: 28%; border-bottom: 1px solid #e2e8f0;">${inputs.floors === 1 ? "Ground Floor Only" : `Ground + ${inputs.floors - 1} (G+${inputs.floors - 1})`}</td>
              </tr>
              <tr>
                <td style="padding: 8px 12px; background: #f1f5f9; color: #475569; font-weight: 700;">Construction Quality</td>
                <td style="padding: 8px 12px; color: #0f172a; font-weight: 700;">${QUALITY_META[inputs.type].label}</td>
                <td style="padding: 8px 12px; background: #f1f5f9; color: #475569; font-weight: 700;">Location Tier</td>
                <td style="padding: 8px 12px; color: #0f172a; font-weight: 700;">${LOCATION_META[inputs.location].label}</td>
              </tr>
            </table>
          </div>

          <!-- Section: Summary Metrics -->
          <div style="margin-bottom: 20px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
              <div style="width: 3px; height: 14px; background: #2563eb; border-radius: 2px;"></div>
              <div style="font-size: 11px; font-weight: 800; color: #0f172a; letter-spacing: 0.3px; text-transform: uppercase;">
                Estimate Summary
              </div>
            </div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
              <div style="background: #0f172a; color: #ffffff; padding: 12px 14px; border-radius: 6px;">
                <div style="font-size: 7.5px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: #93c5fd; margin-bottom: 5px;">
                  Total Estimate
                </div>
                <div style="font-size: 17px; font-weight: 900; letter-spacing: -0.4px; font-family: 'SF Mono', Monaco, Consolas, monospace;">
                  ₹${formatINR(result.totalCost)}
                </div>
              </div>
              <div style="background: #ffffff; color: #0f172a; padding: 12px 14px; border-radius: 6px; border: 1px solid #e2e8f0;">
                <div style="font-size: 7.5px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: #64748b; margin-bottom: 5px;">
                  Built-Up Area
                </div>
                <div style="font-size: 15px; font-weight: 900; letter-spacing: -0.3px;">
                  ${formatINR(result.totalArea)} <span style="font-size: 10px; color: #64748b;">ft²</span>
                </div>
              </div>
              <div style="background: #ffffff; color: #0f172a; padding: 12px 14px; border-radius: 6px; border: 1px solid #e2e8f0;">
                <div style="font-size: 7.5px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: #64748b; margin-bottom: 5px;">
                  Rate / Sq.Ft
                </div>
                <div style="font-size: 15px; font-weight: 900; letter-spacing: -0.3px; font-family: 'SF Mono', Monaco, Consolas, monospace;">
                  ₹${formatINR(result.costPerSqft)}
                </div>
              </div>
              <div style="background: #ffffff; color: #0f172a; padding: 12px 14px; border-radius: 6px; border: 1px solid #e2e8f0;">
                <div style="font-size: 7.5px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: #64748b; margin-bottom: 5px;">
                  Est. Timeline
                </div>
                <div style="font-size: 15px; font-weight: 900; letter-spacing: -0.3px;">
                  ${result.timelineMonths} <span style="font-size: 10px; color: #64748b;">months</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Section: Schedule A - Civil BOQ -->
          ${buildTable(result.civilBOQ, "Schedule A — Structural Civil Works", civilTotal)}

          <!-- Section: Schedule B - Finishing BOQ -->
          ${buildTable(result.finishingBOQ, "Schedule B — Finishes & MEP Works", finishingTotal)}

          <!-- Grand Total Block -->
          <div style="background: #0f172a; color: #ffffff; padding: 16px 20px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <div>
              <div style="font-size: 8px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: #93c5fd;">
                Grand Total Estimate
              </div>
              <div style="font-size: 9px; color: #cbd5e1; margin-top: 3px;">
                Schedule A + Schedule B • Includes materials, labor & overheads
              </div>
            </div>
            <div style="font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 24px; font-weight: 900; letter-spacing: -0.8px;">
              ₹${formatINR(result.totalCost)}
            </div>
          </div>

          <!-- Amount in Words -->
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px 14px; margin-bottom: 18px;">
            <div style="font-size: 7.5px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: #64748b; margin-bottom: 3px;">
              Amount in Words
            </div>
            <div style="font-size: 10px; font-weight: 700; color: #0f172a; font-style: italic;">
              ${numberToWords(result.totalCost)}
            </div>
          </div>

          <!-- Payment Milestones -->
          <div style="margin-bottom: 18px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
              <div style="width: 3px; height: 14px; background: #2563eb; border-radius: 2px;"></div>
              <div style="font-size: 11px; font-weight: 800; color: #0f172a; letter-spacing: 0.3px; text-transform: uppercase;">
                Payment Milestones
              </div>
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 9.5px; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden;">
              <thead>
                <tr style="background: #f1f5f9;">
                  <th style="padding: 8px 12px; text-align: left; font-size: 8px; font-weight: 800; color: #475569; letter-spacing: 0.6px; text-transform: uppercase; border-bottom: 1px solid #cbd5e1;">Stage</th>
                  <th style="padding: 8px 12px; text-align: left; font-size: 8px; font-weight: 800; color: #475569; letter-spacing: 0.6px; text-transform: uppercase; border-bottom: 1px solid #cbd5e1;">Description</th>
                  <th style="padding: 8px 12px; text-align: center; font-size: 8px; font-weight: 800; color: #475569; letter-spacing: 0.6px; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; width: 60px;">Share</th>
                  <th style="padding: 8px 12px; text-align: right; font-size: 8px; font-weight: 800; color: #475569; letter-spacing: 0.6px; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; width: 90px;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${[
                  { stage: "Stage 1", desc: "Booking advance — design kickoff", pct: 10 },
                  { stage: "Stage 2", desc: "Design approval — drawings handover", pct: 40 },
                  { stage: "Stage 3", desc: "Structural execution — foundation to slab", pct: 40 },
                  { stage: "Stage 4", desc: "Handover — final finishing & clearance", pct: 10 },
                ]
                  .map(
                    (s, i) => `
                  <tr style="background: ${i % 2 === 0 ? "#ffffff" : "#fafbfc"};">
                    <td style="padding: 8px 12px; font-weight: 800; color: #0f172a; font-size: 9px; border-bottom: 1px solid #f1f5f9;">${s.stage}</td>
                    <td style="padding: 8px 12px; color: #475569; border-bottom: 1px solid #f1f5f9;">${s.desc}</td>
                    <td style="padding: 8px 12px; text-align: center; font-weight: 700; color: #2563eb; border-bottom: 1px solid #f1f5f9; font-family: 'SF Mono', Monaco, Consolas, monospace;">${s.pct}%</td>
                    <td style="padding: 8px 12px; text-align: right; font-weight: 800; color: #0f172a; border-bottom: 1px solid #f1f5f9; font-family: 'SF Mono', Monaco, Consolas, monospace;">₹${formatINR(Math.round((result.totalCost * s.pct) / 100))}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>

          <!-- Terms & Notes -->
          <div style="margin-bottom: 18px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
              <div style="width: 3px; height: 14px; background: #f59e0b; border-radius: 2px;"></div>
              <div style="font-size: 11px; font-weight: 800; color: #0f172a; letter-spacing: 0.3px; text-transform: uppercase;">
                Important Notes & Terms
              </div>
            </div>
            <div style="background: #fffbeb; border-left: 3px solid #f59e0b; padding: 12px 16px; border-radius: 4px;">
              <ol style="margin: 0; padding-left: 18px; font-size: 9px; color: #78350f; line-height: 1.75;">
                <li>This parametric Bill of Quantities is an engineering approximation based on standard material indexes and current market rates for the selected location tier.</li>
                <li>Actual quantities may vary depending on site conditions, structural design specifics, architectural layout, and material availability at the time of execution.</li>
                <li>Rates are calibrated to <strong>2026 market indexes</strong> and are subject to revision if project commencement is delayed beyond 30 days from issue date.</li>
                <li>All quantities must be verified with a licensed structural engineer before procurement or contractor engagement.</li>
                <li>GST and other statutory taxes, if applicable, will be charged extra at actual rates at the time of invoicing.</li>
                <li>This estimate excludes: land acquisition, statutory approvals, external development charges, and any government levies.</li>
                <li>Payment milestones are indicative. Final schedule will be mutually agreed upon contract signing.</li>
              </ol>
            </div>
          </div>

          <!-- Signatures -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; margin-top: 40px; padding-top: 24px; border-top: 1px solid #e2e8f0;">
            <div>
              <div style="height: 50px;"></div>
              <div style="border-top: 1px solid #94a3b8; padding-top: 8px;">
                <div style="font-size: 11px; font-weight: 800; color: #0f172a;">For Dream Homes Bihar</div>
                <div style="font-size: 9px; color: #64748b; margin-top: 3px;">Authorized Signatory</div>
              </div>
            </div>
            <div>
              <div style="height: 50px;"></div>
              <div style="border-top: 1px solid #94a3b8; padding-top: 8px;">
                <div style="font-size: 11px; font-weight: 800; color: #0f172a;">Client Acceptance</div>
                <div style="font-size: 9px; color: #64748b; margin-top: 3px;">Signature & Date</div>
              </div>
            </div>
          </div>

        </div>

        <!-- ============ FOOTER ============ -->
        <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 12px 24px; text-align: center;">
          <div style="font-size: 8px; color: #94a3b8; line-height: 1.7;">
            This is a computer-generated document and does not require a physical signature.<br>
            <strong style="color: #475569;">Dream Homes Bihar</strong> • Patna, Bihar • +91 62058 20278 • info@dreamhomesbihar.com<br>
            Document ID: ${docId} • Generated on ${today} • © 2026 All rights reserved
          </div>
        </div>
      `;

      document.body.appendChild(reportEl);

      // ----------------------------------------------------------
      // Render to canvas
      // ----------------------------------------------------------
      const canvas = await html2canvas(reportEl, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        width: 794,
        height: reportEl.scrollHeight,
        windowWidth: 794,
        windowHeight: reportEl.scrollHeight,
      });

      document.body.removeChild(reportEl);

      // ----------------------------------------------------------
      // Build PDF — multi-page aware
      // ----------------------------------------------------------
      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const margin = 0;
      const contentWidth = pdfWidth - margin * 2;
      const contentHeight = (canvas.height * contentWidth) / canvas.width;

      // Single page fit
      if (contentHeight <= pdfHeight) {
        pdf.addImage(imgData, "JPEG", margin, margin, contentWidth, contentHeight, undefined, "FAST");
      } else {
        // Multi-page: iterate and slice
        let heightLeft = contentHeight;
        let position = margin;

        pdf.addImage(imgData, "JPEG", margin, position, contentWidth, contentHeight, undefined, "FAST");
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
          position = heightLeft - contentHeight + margin;
          pdf.addPage();
          pdf.addImage(imgData, "JPEG", margin, position, contentWidth, contentHeight, undefined, "FAST");
          heightLeft -= pdfHeight;
        }
      }

      pdf.save(`DHB-BOQ-${inputs.length}x${inputs.width}-${Date.now()}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsPdfGenerating(false);
    }
  };

  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-800 antialiased">
      {/* TOP BAR */}
      <div className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2 font-semibold">
            <Shield size={14} className="text-blue-400" />
            <span className="tracking-wide">Dream Homes Bihar</span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline">Engineering Tools Suite</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 hidden md:inline">Index Year: 2026</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Live Engine
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* HEADER */}
        <header className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 mb-3">
              <Calculator size={12} className="text-blue-600" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
                Parametric BOQ Engine
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-tight">
              Bill of Quantities
              <span className="block text-slate-400 font-light text-lg sm:text-xl md:text-2xl mt-1">
                Engineering-grade construction cost estimation
              </span>
            </h1>
            <p className="text-slate-500 text-sm mt-2 max-w-2xl leading-relaxed">
              Get a material-wise cost breakdown for your home construction project — accurate to
              industry standards with location-aware pricing.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm">
              <CheckCircle2 size={14} className="text-emerald-500" />
              IS-code based
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm">
              <Sparkles size={14} className="text-amber-500" />
              AI-calibrated
            </div>
          </div>
        </header>

        {/* MAIN WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT — INPUTS */}
          <aside className="lg:col-span-4 lg:sticky lg:top-6 lg:self-start">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Ruler size={16} className="text-blue-600" />
                    Project Parameters
                  </h2>
                  <button
                    onClick={handleReset}
                    className="text-[10px] font-semibold text-slate-400 hover:text-slate-700 flex items-center gap-1 transition-colors"
                  >
                    <RefreshCw size={11} />
                    Reset
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Fill in the details below to generate your BOQ
                </p>
              </div>

              <div className="p-5 space-y-5">
                {/* Dimensions */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                    Plot Dimensions
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="Length"
                        value={inputs.length}
                        onChange={(e) => handleInputChange("length", e.target.value)}
                        className="w-full pl-3 pr-9 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-slate-900 font-semibold placeholder:font-normal placeholder:text-slate-400"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 pointer-events-none">
                        FT
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="Width"
                        value={inputs.width}
                        onChange={(e) => handleInputChange("width", e.target.value)}
                        className="w-full pl-3 pr-9 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-slate-900 font-semibold placeholder:font-normal placeholder:text-slate-400"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 pointer-events-none">
                        FT
                      </span>
                    </div>
                  </div>
                  {currentPlotArea > 0 && (
                    <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold bg-emerald-50 rounded-md px-2.5 py-1.5">
                      <CheckCircle2 size={12} />
                      Plot area: {formatINR(currentPlotArea)} sq.ft
                    </div>
                  )}
                </div>

                {/* Floors */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Building2 size={11} />
                    Structure Type
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { v: 1, l: "G" },
                      { v: 2, l: "G+1" },
                      { v: 3, l: "G+2" },
                      { v: 4, l: "G+3" },
                    ].map((f) => (
                      <button
                        key={f.v}
                        type="button"
                        onClick={() => handleInputChange("floors", f.v)}
                        className={`py-2 rounded-lg text-xs font-bold transition-all ${
                          inputs.floors === f.v
                            ? "bg-slate-900 text-white shadow-md"
                            : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                        }`}
                      >
                        {f.l}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quality */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles size={11} />
                    Construction Quality
                  </label>
                  <div className="space-y-1.5">
                    {(Object.keys(QUALITY_META) as ConstructionQuality[]).map((q) => {
                      const meta = QUALITY_META[q];
                      const active = inputs.type === q;
                      return (
                        <button
                          key={q}
                          type="button"
                          onClick={() => handleInputChange("type", q)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg border transition-all ${
                            active
                              ? "border-blue-500 bg-blue-50 ring-1 ring-blue-100"
                              : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-xs font-bold ${
                                active ? "text-blue-700" : "text-slate-700"
                              }`}
                            >
                              {meta.label}
                            </span>
                            {active && <CheckCircle2 size={13} className="text-blue-600" />}
                          </div>
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                            {meta.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <MapPin size={11} />
                    Project Location
                  </label>
                  <select
                    value={inputs.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value as LocationTier)
                    }
                    className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm text-slate-900 font-semibold cursor-pointer"
                  >
                    {(Object.keys(LOCATION_META) as LocationTier[]).map((loc) => (
                      <option key={loc} value={loc}>
                        {LOCATION_META[loc].label}
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] text-slate-400 mt-1.5 leading-tight">
                    {LOCATION_META[inputs.location].desc}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3.5 bg-blue-50 border border-blue-100 rounded-xl flex gap-2.5">
              <Info size={14} className="text-blue-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-blue-900 leading-relaxed">
                Rates are calibrated to <strong>2026 market indexes</strong> and vary by city tier.
                Use this estimate for planning — actual quotes depend on design specifics.
              </p>
            </div>
          </aside>

          {/* RIGHT — RESULTS */}
          <main className="lg:col-span-8" ref={reportRef}>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {result ? (
                <div>
                  {/* SUMMARY */}
                  <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white p-6 md:p-7">
                    <div className="flex items-start justify-between mb-5">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <FileText size={14} className="text-blue-300" />
                          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-300">
                            Bill of Quantities
                          </span>
                        </div>
                        <h3 className="text-lg md:text-xl font-black tracking-tight">
                          Construction Cost Estimate
                        </h3>
                        <p className="text-[11px] text-slate-400 mt-1">
                          {inputs.length}' × {inputs.width}' •{" "}
                          {inputs.floors === 1 ? "Ground" : `G+${inputs.floors - 1}`} •{" "}
                          {QUALITY_META[inputs.type].label} • {LOCATION_META[inputs.location].label}
                        </p>
                      </div>
                      <div className="hidden sm:flex flex-col items-end">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                          Generated
                        </span>
                        <span className="text-xs font-semibold text-white mt-0.5">
                          {new Date().toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <KPICard
                        icon={<IndianRupee size={14} />}
                        label="Total Estimate"
                        value={`₹${formatINR(result.totalCost)}`}
                        highlight
                      />
                      <KPICard
                        icon={<Layers size={14} />}
                        label="Built-Up Area"
                        value={`${formatINR(result.totalArea)} ft²`}
                      />
                      <KPICard
                        icon={<TrendingUp size={14} />}
                        label="Rate / sq.ft"
                        value={`₹${formatINR(result.costPerSqft)}`}
                      />
                      <KPICard
                        icon={<Clock size={14} />}
                        label="Timeline"
                        value={`${result.timelineMonths} mo`}
                      />
                    </div>
                  </div>

                  {/* TABS */}
                  <div className="border-b border-slate-200 px-6 bg-slate-50/50">
                    <div className="flex gap-1 overflow-x-auto">
                      <TabButton
                        active={activeTab === "civil_boq"}
                        onClick={() => setActiveTab("civil_boq")}
                        icon={<Building2 size={14} />}
                        label="Structural Civil Works"
                        sub="Schedule A"
                      />
                      <TabButton
                        active={activeTab === "finishing_boq"}
                        onClick={() => setActiveTab("finishing_boq")}
                        icon={<Sparkles size={14} />}
                        label="Finishes & MEP"
                        sub="Schedule B"
                      />
                    </div>
                  </div>

                  {/* TABLE */}
                  <div className="p-6">
                    <div className="overflow-x-auto border border-slate-200 rounded-xl">
                      <table className="w-full text-left border-collapse min-w-[720px]">
                        <thead>
                          <tr className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider border-b-2 border-slate-200">
                            <th className="py-3 px-3 w-14">Item</th>
                            <th className="py-3 px-4">Description of Work</th>
                            <th className="py-3 px-3 w-16 text-center">Unit</th>
                            <th className="py-3 px-3 w-24 text-right">Qty</th>
                            <th className="py-3 px-3 w-24 text-right">Rate</th>
                            <th className="py-3 px-4 w-32 text-right">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs">
                          {(activeTab === "civil_boq"
                            ? result.civilBOQ
                            : result.finishingBOQ
                          ).map((item, idx) => (
                            <tr
                              key={item.id}
                              className={`transition-colors ${
                                idx % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                              } hover:bg-blue-50/40`}
                            >
                              <td className="py-3.5 px-3 font-bold text-slate-400 font-mono text-[11px]">
                                {item.id}
                              </td>
                              <td className="py-3.5 px-4 font-medium text-slate-700 leading-relaxed">
                                {item.description}
                              </td>
                              <td className="py-3.5 px-3 text-center">
                                <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase">
                                  {item.uom}
                                </span>
                              </td>
                              <td className="py-3.5 px-3 text-right font-semibold text-slate-900 font-mono tabular-nums">
                                {item.quantity.toLocaleString("en-IN")}
                              </td>
                              <td className="py-3.5 px-3 text-right font-semibold text-slate-600 font-mono tabular-nums">
                                {item.rate.toLocaleString("en-IN")}
                              </td>
                              <td className="py-3.5 px-4 text-right font-bold text-slate-900 font-mono tabular-nums">
                                ₹{item.amount.toLocaleString("en-IN")}
                              </td>
                            </tr>
                          ))}
                          <tr className="bg-slate-50 border-t-2 border-slate-300">
                            <td colSpan={5} className="py-3.5 px-4 text-right">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                {activeTab === "civil_boq"
                                  ? "Schedule A Subtotal"
                                  : "Schedule B Subtotal"}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right text-sm font-black text-slate-900 font-mono tabular-nums">
                              ₹
                              {(activeTab === "civil_boq"
                                ? result.civilBOQ.reduce((s, i) => s + i.amount, 0)
                                : result.finishingBOQ.reduce((s, i) => s + i.amount, 0)
                              ).toLocaleString("en-IN")}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* GRAND TOTAL */}
                    <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block">
                          Grand Total Estimate
                        </span>
                        <span className="text-[11px] text-blue-100 mt-0.5 block">
                          Includes all schedules, materials & labor
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl md:text-3xl font-black tracking-tight font-mono tabular-nums">
                          ₹{formatINR(result.totalCost)}
                        </span>
                      </div>
                    </div>

                    {/* CTA BAR */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                      <button
                        type="button"
                        onClick={handlePdfGeneration}
                        disabled={isPdfGenerating}
                        className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3 rounded-lg text-xs font-bold tracking-wide transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                      >
                        {isPdfGenerating ? (
                          <>
                            <Loader2 size={14} className="animate-spin" />
                            Generating PDF...
                          </>
                        ) : (
                          <>
                            <Download size={14} />
                            Download Professional PDF
                          </>
                        )}
                      </button>

                      <a
                        href={`https://wa.me/916205820278?text=I%20require%20comprehensive%20house%20blueprints%20matching%20the%20generated%20BOQ%20specification%20for%20my%20${result.length}%20x%20${result.width}%20plot%20area.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg text-xs font-bold tracking-wide transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                      >
                        <MessageCircle size={14} />
                        Request Detailed Quote
                      </a>

                      <Link
                        href="/services/design"
                        className="w-full bg-white border border-slate-300 hover:bg-slate-50 hover:border-slate-400 text-slate-700 py-3 rounded-lg text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-2"
                      >
                        <FileText size={14} />
                        View Design Services
                      </Link>
                    </div>

                    {/* DISCLAIMER */}
                    <div className="mt-5 p-3.5 rounded-lg bg-amber-50 border border-amber-100 flex gap-2.5">
                      <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-amber-900 leading-relaxed">
                        <strong>Disclaimer:</strong> This parametric BOQ is an engineering
                        approximation based on standard indexes. Actual quantities depend on site
                        conditions, structural design, and material availability. Verify with a
                        licensed structural engineer before procurement.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* EMPTY STATE */
                <div className="p-10 md:p-16 text-center">
                  {isCalculating ? (
                    <div className="space-y-3 max-w-xs mx-auto">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-50">
                        <Loader2 size={22} className="animate-spin text-blue-600" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-800">Computing Quantities</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Processing structural takeoff sheets and material indexes...
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-w-sm mx-auto">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100">
                        <Calculator size={28} className="text-slate-400" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-800">Ready to Estimate</h3>
                        <p className="text-xs text-slate-500 leading-relaxed mt-1.5">
                          Enter your plot dimensions on the left to generate a complete Bill of
                          Quantities with material-wise breakdown and cost analysis.
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-4 pt-3 text-[10px] text-slate-400 font-semibold">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 size={12} className="text-emerald-500" />
                          Instant
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle2 size={12} className="text-emerald-500" />
                          Free
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle2 size={12} className="text-emerald-500" />
                          PDF Export
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

/* ==========================================
   SUB-COMPONENTS
   ========================================== */
function KPICard({
  icon,
  label,
  value,
  highlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-3 border transition-all ${
        highlight
          ? "bg-white/10 border-white/20 backdrop-blur-sm"
          : "bg-white/5 border-white/10"
      }`}
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        <span className={highlight ? "text-blue-300" : "text-slate-400"}>{icon}</span>
        <span
          className={`text-[9px] font-bold uppercase tracking-wider ${
            highlight ? "text-blue-200" : "text-slate-400"
          }`}
        >
          {label}
        </span>
      </div>
      <div
        className={`font-black font-mono tabular-nums ${
          highlight ? "text-xl text-white" : "text-base text-white"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  sub: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-3.5 text-left transition-all flex items-center gap-2.5 whitespace-nowrap ${
        active ? "text-blue-600" : "text-slate-500 hover:text-slate-800"
      }`}
    >
      <span
        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
          active ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500"
        }`}
      >
        {icon}
      </span>
      <div>
        <div className="text-xs font-bold leading-tight">{label}</div>
        <div className="text-[9px] font-semibold uppercase tracking-wider opacity-70 mt-0.5">
          {sub}
        </div>
      </div>
      {active && (
        <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-600 rounded-t-full" />
      )}
    </button>
  );
}

/* ==========================================
   HELPER: Number to words (Indian numbering)
   ========================================== */
function numberToWords(num: number): string {
  if (num === 0) return "Zero Rupees Only";

  const ones = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen",
  ];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  const twoDigits = (n: number): string => {
    if (n < 20) return ones[n];
    return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
  };

  const threeDigits = (n: number): string => {
    if (n < 100) return twoDigits(n);
    return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + twoDigits(n % 100) : "");
  };

  let result = "";
  const crore = Math.floor(num / 10000000);
  const lakh = Math.floor((num % 10000000) / 100000);
  const thousand = Math.floor((num % 100000) / 1000);
  const hundred = num % 1000;

  if (crore) result += threeDigits(crore) + " Crore ";
  if (lakh) result += threeDigits(lakh) + " Lakh ";
  if (thousand) result += threeDigits(thousand) + " Thousand ";
  if (hundred) result += threeDigits(hundred);

  return "Rupees " + result.trim() + " Only";
}