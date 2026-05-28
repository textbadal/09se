"use client";

import { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Download,
  Printer,
  Share2,
  FileText,
  User,
  MapPin,
  Ruler,
  Palette,
  HardHat,
  Zap,
  Droplets,
  Building2,
  Layers,
  Home,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock,
  RefreshCw,
  Shield,
  Award,
} from "lucide-react";

export default function QuotationGenerator() {
  const quoteRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    clientName: "",
    phone: "",
    email: "",
    projectName: "",
    plotArea: "",
    builtUpArea: "",
    location: "",
    numberOfFloors: "G+1",
    plotFacing: "East",
    vastuCompliance: "yes",
    revisions: "3",
    designStyle: "Modern Contemporary",
    specialRequests: "",
    preferredStartDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    terms: "1. Base package includes complete architectural drawings as specified.\n2. Up to 3 revisions included for floor plans and elevations.\n3. Additional revisions charged at ₹2,500 per revision.\n4. Structural drawings are for G+2 maximum (typical residential).\n5. Working drawings include detailed dimensions and specifications.\n6. Electrical & Plumbing layouts as per architectural plan.\n7. 50% advance required to start work, 50% on drawing delivery.\n8. Timeline: 10-15 working days for complete set.\n9. Site visits (if required) charged extra at ₹1,500 per visit.\n10. 3D Elevations provided in high-resolution JPEG/PNG format.",
  });

  // Package price
  const PACKAGE_PRICE = 15999;
  const GST_RATE = 18;
  
  const calculateGST = () => (PACKAGE_PRICE * GST_RATE) / 100;
  const totalAmount = PACKAGE_PRICE + calculateGST();

  const quoteNumber = useMemo(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(1000 + Math.random() * 9000);
    return `DH/ARCH/${year}/${month}/${random}`;
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!form.clientName.trim()) newErrors.clientName = "Client name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email format";
    if (!form.projectName.trim()) newErrors.projectName = "Project name is required";
    if (!form.location.trim()) newErrors.location = "Location is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const downloadPDF = async () => {
    if (!quoteRef.current) return;
    
    const canvas = await html2canvas(quoteRef.current, {
      scale: 2,
      useCORS: true,
      logging: false,
    });
    
    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 210;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Architectural-Quotation-${quoteNumber}.pdf`);
  };

  const printQuote = () => {
    window.print();
  };

  const shareWhatsapp = () => {
    if (!validateForm()) {
      alert("Please fill all required fields before sharing");
      return;
    }
    
    const text = `
🏗️ *DREAM HOMES BIHAR - Complete Architectural Drawings Package*

━━━━━━━━━━━━━━━━━━━━━

📋 *Quotation Details*
Quote No: ${quoteNumber}
Date: ${new Date().toLocaleDateString()}

👤 *Client Information*
Name: ${form.clientName}
Phone: ${form.phone}
Email: ${form.email}

🏠 *Project Details*
Project: ${form.projectName}
Location: ${form.location}
Plot Area: ${form.plotArea || '—'} sqft
Built-up Area: ${form.builtUpArea || '—'} sqft
Floors: ${form.numberOfFloors}
Plot Facing: ${form.plotFacing}
Vastu Compliance: ${form.vastuCompliance === 'yes' ? '✓ Included' : 'Not required'}

━━━━━━━━━━━━━━━━━━━━━

📐 *Package Includes (₹15,999)*

✓ Floor Plans with Vastu compliance
✓ 3D Elevations (Front & Back)
✓ Structural Drawings
✓ Electrical Layouts
✓ Plumbing & Sanitary Drawings
✓ Detailed Working Drawings
✓ ${form.revisions} Free Revisions

━━━━━━━━━━━━━━━━━━━━━

💰 *Cost Breakdown*

Package Cost: ₹${PACKAGE_PRICE.toLocaleString()}
GST (${GST_RATE}%): ₹${calculateGST().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━
*Total Amount: ₹${totalAmount.toLocaleString()}*
━━━━━━━━━━━━━━━━━━━━━

⏱️ *Delivery Timeline*
10-15 working days for complete set

💳 *Payment Terms*
50% Advance • 50% on Delivery

━━━━━━━━━━━━━━━━━━━━━

*For Dream Homes Bihar*
Building Dreams, Creating Homes 🏡
    `;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-10 px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
        
        {/* FORM SECTION */}
        <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-xl shadow-lg">
              <FileText className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Architectural Drawings</h1>
              <p className="text-gray-500 text-sm">Complete Package @ ₹15,999 + GST</p>
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {/* Client Information */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <User size={16} /> Client Information
              </label>
              <div className="space-y-3">
                <div>
                  <input
                    name="clientName"
                    placeholder="Client Name *"
                    value={form.clientName}
                    onChange={handleChange}
                    className={`border rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.clientName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.clientName && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.clientName}</p>}
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      name="phone"
                      placeholder="Phone Number *"
                      value={form.phone}
                      onChange={handleChange}
                      className={`border rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <input
                      name="email"
                      type="email"
                      placeholder="Email Address *"
                      value={form.email}
                      onChange={handleChange}
                      className={`border rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Building2 size={16} /> Project Details
              </label>
              <div className="space-y-3">
                <div>
                  <input
                    name="projectName"
                    placeholder="Project Name *"
                    value={form.projectName}
                    onChange={handleChange}
                    className={`border rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.projectName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.projectName && <p className="text-red-500 text-xs mt-1">{errors.projectName}</p>}
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      name="plotArea"
                      type="number"
                      placeholder="Plot Area (sqft)"
                      value={form.plotArea}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-xl p-3 w-full pl-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Ruler size={16} className="absolute left-3 top-3.5 text-gray-400" />
                  </div>
                  <div className="relative">
                    <input
                      name="builtUpArea"
                      type="number"
                      placeholder="Built-up Area (sqft)"
                      value={form.builtUpArea}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-xl p-3 w-full pl-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Home size={16} className="absolute left-3 top-3.5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <input
                    name="location"
                    placeholder="Project Location *"
                    value={form.location}
                    onChange={handleChange}
                    className={`border rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <select
                    name="numberOfFloors"
                    value={form.numberOfFloors}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Ground Floor Only">Ground Floor Only</option>
                    <option value="G+1">G+1</option>
                    <option value="G+2">G+2</option>
                    <option value="G+3">G+3</option>
                  </select>
                  
                  <select
                    name="plotFacing"
                    value={form.plotFacing}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="East">East Facing</option>
                    <option value="West">West Facing</option>
                    <option value="North">North Facing</option>
                    <option value="South">South Facing</option>
                    <option value="North-East">North-East Facing</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <select
                    name="vastuCompliance"
                    value={form.vastuCompliance}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="yes">✓ Include Vastu Compliance</option>
                    <option value="no">Without Vastu Compliance</option>
                  </select>
                  
                  <select
                    name="designStyle"
                    value={form.designStyle}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Modern Contemporary">Modern Contemporary</option>
                    <option value="Traditional">Traditional Indian</option>
                    <option value="Minimalist">Minimalist</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Villa Style">Villa Style</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500">Free Revisions Included</label>
                    <select
                      name="revisions"
                      value={form.revisions}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="2">2 Revisions</option>
                      <option value="3">3 Revisions</option>
                      <option value="4">4 Revisions</option>
                      <option value="5">5 Revisions</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Preferred Start Date</label>
                    <input
                      name="preferredStartDate"
                      type="date"
                      value={form.preferredStartDate}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    rows={3}
                    name="specialRequests"
                    placeholder="Special Requirements / Notes (Optional)"
                    value={form.specialRequests}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <CheckCircle size={16} /> Terms & Conditions
              </label>
              <textarea
                rows={8}
                name="terms"
                value={form.terms}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </form>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3 mt-8 pt-4 border-t">
            <button
              onClick={downloadPDF}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl p-3 flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-md"
            >
              <Download size={18} />
              PDF
            </button>
            <button
              onClick={printQuote}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl p-3 flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-md"
            >
              <Printer size={18} />
              Print
            </button>
            <button
              onClick={shareWhatsapp}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl p-3 flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-md"
            >
              <Share2 size={18} />
              Share
            </button>
          </div>
        </div>

        {/* QUOTATION PREVIEW */}
        <div ref={quoteRef} className="relative bg-white rounded-3xl shadow-xl overflow-hidden print:shadow-none">
          <div className="p-8">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <div className="text-[80px] font-black rotate-[-25deg] whitespace-nowrap">
                DREAM HOMES BIHAR
              </div>
            </div>

            <div className="relative z-10">
              {/* Header */}
              <div className="border-b-2 border-gray-200 pb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <img src="/fevicon.png" alt="logo" className="h-14 mb-3 object-contain" />
                    <h1 className="text-2xl font-bold text-gray-800">DREAM HOMES BIHAR</h1>
                    <p className="text-gray-500 text-sm">Architectural Design & Drawings</p>
                  </div>
                  <div className="text-right">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2 rounded-lg">
                      <p className="text-xs text-gray-500">Quote Number</p>
                      <p className="font-bold text-blue-600 text-sm">{quoteNumber}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Date: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Package Title */}
              <div className="mt-6 text-center">
                <div className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                  COMPLETE ARCHITECTURAL PACKAGE
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mt-3">₹{PACKAGE_PRICE.toLocaleString()} + GST</h2>
                <p className="text-gray-500 text-sm">Fixed Price • No Hidden Charges</p>
              </div>

              {/* Client & Project Details */}
              <div className="grid grid-cols-2 gap-6 mt-6">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm">
                    <User size={14} /> Client Details
                  </h3>
                  <div className="space-y-1 text-xs">
                    <p><strong>Name:</strong> {form.clientName || "—"}</p>
                    <p><strong>Phone:</strong> {form.phone || "—"}</p>
                    <p><strong>Email:</strong> {form.email || "—"}</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm">
                    <Building2 size={14} /> Project Details
                  </h3>
                  <div className="space-y-1 text-xs">
                    <p><strong>Project:</strong> {form.projectName || "—"}</p>
                    <p><strong>Location:</strong> {form.location || "—"}</p>
                    <p><strong>Plot:</strong> {form.plotArea ? `${form.plotArea} sqft` : "—"} | <strong>Built-up:</strong> {form.builtUpArea ? `${form.builtUpArea} sqft` : "—"}</p>
                    <p><strong>Floors:</strong> {form.numberOfFloors} | <strong>Facing:</strong> {form.plotFacing}</p>
                  </div>
                </div>
              </div>

              {/* Services Included */}
              <div className="mt-6">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Layers size={16} /> Package Inclusions
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: <Home size={14} />, text: "Floor Plans (All Floors)" },
                    { icon: <TrendingUp size={14} />, text: "3D Elevations (Front & Back)" },
                    { icon: <HardHat size={14} />, text: "Structural Drawings" },
                    { icon: <Zap size={14} />, text: "Electrical Layouts" },
                    { icon: <Droplets size={14} />, text: "Plumbing & Sanitary" },
                    { icon: <Ruler size={14} />, text: "Detailed Working Drawings" },
                    { icon: <RefreshCw size={14} />, text: `${form.revisions} Free Revisions` },
                    { icon: <Shield size={14} />, text: "Vastu Compliance" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm p-2 bg-green-50 rounded-lg">
                      <div className="text-green-600">{item.icon}</div>
                      <span className="text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Requests */}
              {form.specialRequests && (
                <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <p className="text-sm font-semibold text-yellow-800">📝 Special Requirements:</p>
                  <p className="text-sm text-gray-700 mt-1">{form.specialRequests}</p>
                </div>
              )}

              {/* Cost Breakdown */}
              <div className="mt-6">
                <h3 className="font-bold text-gray-800 mb-3">Cost Breakdown</h3>
                <div className="border rounded-xl overflow-hidden">
                  <div className="divide-y">
                    <div className="flex justify-between p-3 bg-gray-50">
                      <span>Complete Architectural Package</span>
                      <span className="font-semibold">₹{PACKAGE_PRICE.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between p-3">
                      <span>GST ({GST_RATE}%)</span>
                      <span>₹{calculateGST().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-blue-50 font-bold text-lg">
                      <span>Total Amount Payable</span>
                      <span className="text-blue-600">₹{totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Amount in Words */}
              <div className="mt-3 p-2 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">
                  <strong>Amount in Words:</strong> {totalAmount === 0 ? "Zero" : `${Math.floor(totalAmount).toLocaleString()} Rupees Only`}
                </p>
              </div>

              {/* Timeline */}
              <div className="mt-6 p-4 bg-blue-50 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">Estimated Delivery</p>
                    <p className="font-semibold text-gray-800">10-15 Working Days</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw size={20} className="text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">Free Revisions</p>
                    <p className="font-semibold text-gray-800">{form.revisions} Included</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={20} className="text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">Validity</p>
                    <p className="font-semibold text-gray-800">30 Days</p>
                  </div>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="mt-6">
                <h3 className="font-bold text-gray-800 mb-2 text-sm">Terms & Conditions</h3>
                <div className="whitespace-pre-line text-gray-600 text-xs bg-gray-50 p-3 rounded-lg max-h-40 overflow-y-auto">
                  {form.terms}
                </div>
              </div>

              {/* Payment Terms */}
              <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-sm font-semibold text-orange-800">💰 Payment Terms:</p>
                <p className="text-sm text-gray-700">50% Advance to start work • 50% on final delivery of drawings</p>
                <p className="text-xs text-gray-500 mt-1">Bank transfer, UPI, or Cheque accepted</p>
              </div>

              {/* Signature */}
              <div className="mt-6 pt-4 border-t flex justify-between items-end">
                <div>
                  <p className="text-xs text-gray-500">For Dream Homes Bihar</p>
                  <div className="mt-4">
                    <p className="text-xs font-semibold">Authorized Signatory</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Client Acceptance</p>
                  <div className="mt-4 w-40 border-b-2 border-gray-300"></div>
                  <p className="text-xs text-gray-400 mt-1">Date: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}