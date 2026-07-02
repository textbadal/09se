"use client";

import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Printer, Share2 } from "lucide-react";

export default function QuotationGenerator() {
  const quoteRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [quoteNumber, setQuoteNumber] = useState("");

  const PACKAGE_PRICE = 15999;
  const GST_RATE = 18;

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
   terms: `
1. Payment Milestones (Advance & Balance):
   • Advance Payment: A non-refundable advance of ₹4,500 is required to initiate the project and begin drafting.
   • Remaining Balance: The final balance must be cleared in full immediately after you approve the initial concepts/layouts, and strictly BEFORE the final, high-resolution construction drawings are delivered.

2. Project Delivery Timeline:
   • The initial draft/concepts will be shared within 10 to 15 working days from the date the advance payment is received.
   • Weekends and public holidays are excluded. Delivery of final packages depends on how quickly you provide feedback on changes.

3. Revisions & Modification Policy:
   • This package includes only the specified number of complimentary design updates. 
   • Any revision requests made after this limit is reached—or after you have officially approved and frozen a drawing—will be charged extra per modification.

4. Digital Delivery Format:
   • All final construction blueprints, electrical/plumbing layouts, and 3D visual renders will be delivered digitally via Email or WhatsApp (in PDF, DWG, or JPEG formats).
   • Physical hard copies or site prints are not included and will attract extra printing and courier charges.

5. Site Visits & In-Person Consulting:
   • This fee covers off-site, digital design work only. 
   • Physical site inspections, measurement verifications, or on-site construction supervision are not included. If required, site visits will be billed separately per visit plus travel expenses.
` });

  useEffect(() => {
    const random = Math.floor(1000 + Math.random() * 9000);
    const date = new Date();
    setQuoteNumber(`DH-${date.getFullYear()}-${random}`);
  }, []);

  const calculateGST = () => (PACKAGE_PRICE * GST_RATE) / 100;
  const total = PACKAGE_PRICE + calculateGST();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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
        // ABSOLUTE FIX FOR OKLCH: Clean computed style engine inside the cloned frame
        onclone: (clonedDoc) => {
          const elements = clonedDoc.getElementsByTagName("*");
          for (let i = 0; i < elements.length; i++) {
            const el = elements[i] as HTMLElement;
            
            // 1. Force override custom properties & shadows breaking html2canvas parsing engines
            if (el.style) {
              el.style.boxShadow = "none";
              el.style.textShadow = "none";
              
              // 2. Fetch runtime computed styles to detect inherited Tailwind v4 oklch preflights
              const computed = window.getComputedStyle(el);
              
              if (computed.borderColor && computed.borderColor.includes("oklch")) {
                el.style.borderColor = "#e5e7eb"; // Fallback standard gray hex
              }
              if (computed.backgroundColor && computed.backgroundColor.includes("oklch")) {
                el.style.backgroundColor = "transparent";
              }
              if (computed.color && computed.color.includes("oklch")) {
                el.style.color = "#1f2937"; // Fallback standard text hex
              }
            }
          }
        }
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

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
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const shareWhatsApp = () => {
    const text = `*Quotation No:* ${quoteNumber}\n\n*Client:* ${form.clientName || "N/A"}\n*Project:* ${form.projectName || "N/A"}\n\n*Total Amount:* ₹${total.toLocaleString('en-IN')}\n\n_Dream Homes Bihar_`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 print:bg-white print:p-0">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 print:block">
        
        {/* FORM SIDE */}
        <div className="bg-white p-6 rounded-2xl shadow print:hidden">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Create Quotation</h1>

          <div className="space-y-4">
            <input
              name="clientName"
              placeholder="Client Name"
              value={form.clientName}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <input
              name="projectName"
              placeholder="Project Name"
              value={form.projectName}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                name="plotArea"
                placeholder="Plot Area (e.g., 1200 sqft)"
                value={form.plotArea}
                onChange={handleChange}
                className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                name="builtUpArea"
                placeholder="Built-up Area"
                value={form.builtUpArea}
                onChange={handleChange}
                className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <select
                name="numberOfFloors"
                value={form.numberOfFloors}
                onChange={handleChange}
                className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option>Ground</option>
                <option>G+1</option>
                <option>G+2</option>
                <option>G+3</option>
              </select>

              <select
                name="plotFacing"
                value={form.plotFacing}
                onChange={handleChange}
                className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option>East</option>
                <option>West</option>
                <option>North</option>
                <option>South</option>
              </select>
            </div>

            <textarea
              rows={5}
              name="terms"
              value={form.terms}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
            />
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6">
            <button
              onClick={downloadPDF}
              disabled={isGenerating}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white p-3 rounded-lg flex justify-center items-center gap-2 transition"
            >
              <Download size={18} />
              {isGenerating ? "Processing..." : "PDF"}
            </button>

            <button
              onClick={() => window.print()}
              className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg flex justify-center items-center gap-2 transition"
            >
              <Printer size={18} />
              Print
            </button>

            <button
              onClick={shareWhatsApp}
              className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-lg flex justify-center items-center gap-2 transition"
            >
              <Share2 size={18} />
              Share
            </button>
          </div>
        </div>

        {/* PREVIEW SIDE */}
        <div
          ref={quoteRef}
          style={{ backgroundColor: "#ffffff", color: "#1f2937" }}
          className="p-8 rounded-2xl shadow border border-gray-200 print:shadow-none print:border-none print:p-0"
        >
          <div className="flex justify-between border-b-2 pb-6" style={{ borderColor: "#f3f4f6" }}>
            <div>
              <h1 className="text-2xl font-black tracking-wide" style={{ color: "#1e3a8a" }}>
                DREAM HOMES BIHAR
              </h1>
              <p className="text-xs font-semibold tracking-wider uppercase mt-0.5" style={{ color: "#9ca3af" }}>
                Architectural Drawings & Engineering Services
              </p>
            </div>

            <div className="text-right text-sm" style={{ color: "#4b5563" }}>
              <p className="font-bold" style={{ color: "#111827" }}>{quoteNumber || "Generating..."}</p>
              <p className="text-xs mt-1" style={{ color: "#6b7280" }}>{new Date().toLocaleDateString("en-IN")}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-6 text-sm">
            <div className="p-4 rounded-xl border" style={{ backgroundColor: "#f9fafb", borderColor: "#f3f4f6" }}>
              <h3 className="font-bold text-xs uppercase tracking-wider mb-2" style={{ color: "#9ca3af" }}>
                Client Details
              </h3>
              <p className="font-semibold" style={{ color: "#1f2937" }}>{form.clientName || "—"}</p>
              <p className="mt-1" style={{ color: "#4b5563" }}>{form.phone || "—"}</p>
              <p style={{ color: "#4b5563" }}>{form.email || "—"}</p>
            </div>

            <div className="p-4 rounded-xl border" style={{ backgroundColor: "#f9fafb", borderColor: "#f3f4f6" }}>
              <h3 className="font-bold text-xs uppercase tracking-wider mb-2" style={{ color: "#9ca3af" }}>
                Project Specs
              </h3>
              <p className="font-semibold" style={{ color: "#1f2937" }}>{form.projectName || "—"}</p>
              <p className="mt-1" style={{ color: "#4b5563" }}>{form.location || "—"}</p>
              <p className="text-xs mt-1" style={{ color: "#6b7280" }}>
                {form.numberOfFloors} Floors | {form.plotFacing} Facing 
                {form.plotArea && ` | Plot: ${form.plotArea}`}
                {form.builtUpArea && ` | Built-up: ${form.builtUpArea}`}
              </p>
            </div>
          </div>

          {/* Pricing Table */}
<div className="mt-8">
  <table className="w-full text-sm text-left">
    <thead>
      <tr className="border-b-2 text-xs uppercase font-bold" style={{ borderColor: "#e5e7eb", color: "#9ca3af" }}>
        <th className="pb-3 pl-2">Description</th>
        <th className="pb-3 pr-2 text-right">Amount</th>
      </tr>
    </thead>
    <tbody style={{ color: "#374151" }}>
      <tr className="border-b" style={{ borderColor: "#f3f4f6" }}>
        <td className="py-4 pl-2 font-medium vertical-align-top">
          <span className="text-gray-900 font-bold block mb-1">Complete Architectural Drawings Package</span>
          <div className="text-xs font-normal mt-1.5 space-y-2 text-gray-500 leading-relaxed max-w-2xl">
            <p>
              Comprehensive, construction-ready blueprint set tailored to your project requirements. Includes:
            </p>
            <ul className="list-disc pl-4 space-y-1">
              <li><strong className="text-gray-700">Architectural Drawings:</strong> Detailed Working Floor Plans (all floors), Site Layout, Furniture layout, Wall Centerline/Masonry plans, Cross-Sections, and Door-Window schedules.</li>
              <li><strong className="text-gray-700">Structural Engineering:</strong> Foundation & Footing details, Column placement maps, Plinth & Roof beam layout details, and Slab Reinforcement concrete schedules.</li>
              <li><strong className="text-gray-700">MEP Infrastructure:</strong> Full Electrical schematics (conduit routes, switchboards) and Plumbing/Sanitation layouts (fresh water routing, drainage lines).</li>
              <li><strong className="text-gray-700">3D Visualization:</strong> Photorealistic 3D Front Elevation rendering showcasing exterior design, material guides, and modern color concepts.</li>
            </ul>
            <p className="text-[11px] italic mt-2 text-gray-400">
              * Includes up to {form.revisions} complete design revision phases.
            </p>
          </div>
        </td>
        <td className="py-4 pr-2 text-right font-semibold align-top">
          ₹{PACKAGE_PRICE.toLocaleString("en-IN")}.00
        </td>
      </tr>
      <tr className="border-b" style={{ borderColor: "#f3f4f6" }}>
        <td className="py-3 pl-2" style={{ color: "#6b7280" }}>CGST + SGST ({GST_RATE}%)</td>
        <td className="py-3 pr-2 text-right font-medium" style={{ color: "#4b5563" }}>
          ₹{calculateGST().toLocaleString("en-IN")}.00
        </td>
      </tr>
      <tr className="font-bold text-base" style={{ backgroundColor: "#eff6ff", color: "#1e3a8a" }}>
        <td className="py-4 pl-3 rounded-l-xl">Total (INR)</td>
        <td className="py-4 pr-3 text-right rounded-r-xl">
          ₹{total.toLocaleString("en-IN")}.00
        </td>
      </tr>
    </tbody>
  </table>
</div>

          {/* Terms */}
          <div className="mt-8">
            <h3 className="font-bold text-xs uppercase tracking-wider mb-2" style={{ color: "#9ca3af" }}>
              Terms & Conditions
            </h3>
            <div className="border rounded-xl p-4 text-xs whitespace-pre-line font-mono leading-relaxed" style={{ backgroundColor: "#f9fafb", borderColor: "#f3f4f6", color: "#4b5563" }}>
              {form.terms}
            </div>
          </div>

          {/* Signatures */}
          <div className="flex justify-between mt-12 pt-8 border-t" style={{ borderColor: "#f3f4f6" }}>
            <div>
              {/* Pre-filled JPG Signature */}
              <div className="h-16 flex items-end mb-2">
                <img 
                  src="/Ankit_Pandey_sign.png" 
                  alt="Authorized Signature" 
                  className="h-14 w-auto object-contain Mix-blend-multiply" 
                  style={{ display: "block" }}
                  // Crucial flag for html2canvas to recognize and render cross-origin assets if hosted remotely
                  crossOrigin="anonymous" 
                />
              </div>
              <p className="font-bold text-sm" style={{ color: "#374151" }}>Dream Homes Bihar</p>
              <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>Authorized Signatory</p>
            </div>
            
            <div className="text-right flex flex-col justify-end">
              <div className="w-40 border-b mb-2 ml-auto" style={{ borderColor: "#d1d5db" }}></div>
              <p className="text-xs" style={{ color: "#9ca3af" }}>Accepted By Client</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}