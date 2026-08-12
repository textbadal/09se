"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image as PdfImage,
} from "@react-pdf/renderer";
import {
  Download,
  Printer,
  Edit,
  Loader2,
  RefreshCw,
  Briefcase,
  Calendar,
  Mail,
  MapPin,
  Phone,
  User,
  FileText,
  Clock,
  Users,
  Building,
  CheckCircle,
  AlertCircle,
  Globe,
  GraduationCap,
  Award,
} from "lucide-react";

const FIXED_COMPANY_NAME = "Dream Homes Bihar";
const FIXED_COMPANY_ADDRESS = "Saguna More, Danapur-801503";
const FIXED_COMPANY_WEBSITE = "www.dreamhomesbihar.in";
const FIXED_COMPANY_EMAIL = "careers@dreamhomesbihar.in";
const FIXED_COMPANY_PHONE = "+91 62058 20278";
const FIXED_LOGO_URL = "/fevicon.png";
const FIXED_HR_NAME = "Sumit Singh";
const FIXED_HR_TITLE = "HR Manager";
const FIXED_HR_SIGNATURE_URL = "/sumit_singh.png";

interface InternshipDetails {
  // User fillable fields
  referenceNumber: string;
  internName: string;
  internshipRole: string;
  startDate: string;
  endDate: string;
  stipend: string;
  internshipType: string;
  workingHours: string;
  duration: string;
  
  // Auto-filled fields

  offerDate: string;
  companyName: string;
  companyAddress: string;
  companyWebsite: string;
  companyEmail: string;
  companyPhone: string;
  managerName: string;
  managerTitle: string;
  stipendPeriod: string;
  workLocation: string;
  probationPeriod: string;
  additionalTerms: string;
  universityName: string;
  courseName: string;
}

// Sequential Reference Number Generator
const getNextOfferReferenceNumber = (): string => {
  if (typeof window === "undefined") return "INTP-2026-0001";
  const year = new Date().getFullYear();
  const storageKey = `internship_ref_counter_${year}`;
  const counter = parseInt(localStorage.getItem(storageKey) || "0", 10) + 1;
  localStorage.setItem(storageKey, counter.toString());
  return `INT-${year}-${String(counter).padStart(4, "0")}`;
};

// PDF Stylesheet - Professional Navy & Gold Theme
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
  },
  outerBorder: {
    borderWidth: 2,
    borderColor: "#1A2E5A",
    height: "100%",
    padding: 20,
    position: "relative",
  },
  watermarkContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.04,
  },
  watermarkText: {
    fontSize: 70,
    color: "#1A2E5A",
    fontWeight: "bold",
    transform: "rotate(-30deg)",
    letterSpacing: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#C9A84C",
    paddingBottom: 15,
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  companyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A2E5A",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  companyTagline: {
    fontSize: 9,
    color: "#64748B",
    marginTop: 2,
    letterSpacing: 1,
  },
  refText: {
    fontSize: 8,
    color: "#64748B",
    marginTop: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A2E5A",
    textTransform: "uppercase",
    letterSpacing: 3,
    textAlign: "center",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 14,
    color: "#C9A84C",
    textAlign: "center",
    marginBottom: 15,
    letterSpacing: 2,
  },
  dateBlock: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 15,
  },
  dateText: {
    fontSize: 10,
    color: "#334155",
  },
  recipientBlock: {
    marginBottom: 20,
  },
  recipientName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1A2E5A",
  },
  recipientDetail: {
    fontSize: 9,
    color: "#64748B",
    marginTop: 2,
  },
  body: {
    marginVertical: 10,
  },
  greeting: {
    fontSize: 11,
    color: "#1A2E5A",
    marginBottom: 8,
    fontWeight: "bold",
  },
  paragraph: {
    fontSize: 10,
    lineHeight: 1.8,
    color: "#334155",
    marginBottom: 6,
    textAlign: "justify",
  },
  highlightBox: {
    marginVertical: 10,
    padding: 12,
    backgroundColor: "#F8F6F0",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#C9A84C",
  },
  highlightRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E4DA",
  },
  highlightLabel: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#1A2E5A",
    width: "35%",
  },
  highlightValue: {
    fontSize: 9,
    color: "#334155",
    width: "65%",
  },
  termsSection: {
    marginTop: 10,
  },
  termsTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1A2E5A",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  termsText: {
    fontSize: 9,
    lineHeight: 1.6,
    color: "#64748B",
    textAlign: "justify",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderTopWidth: 2,
    borderTopColor: "#C9A84C",
    paddingTop: 15,
    marginTop: 15,
  },
  signBlock: {
    width: "32%",
    alignItems: "center",
  },
  signatureImg: {
    height: 45,
    width: 130,
    objectFit: "contain",
    marginBottom: 2,
  },
  signLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#1A2E5A",
    width: "100%",
    marginBottom: 4,
  },
  signName: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1A2E5A",
  },
  signTitle: {
    fontSize: 8,
    color: "#64748B",
  },
  acceptanceBlock: {
    width: "32%",
    alignItems: "center",
  },
  acceptanceLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#1A2E5A",
    width: "100%",
    marginBottom: 4,
  },
  acceptanceText: {
    fontSize: 8,
    color: "#64748B",
  },
  documentFooter: {
    marginTop: 8,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: "#E8E4DA",
    borderTopStyle: "dashed",
  },
  footerNote: {
    fontSize: 7,
    color: "#94A3B8",
    textAlign: "center",
    fontStyle: "italic",
    letterSpacing: 0.3,
  },
  companyContact: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 4,
    marginBottom: 2,
    gap: 12,
  },
  contactItem: {
    fontSize: 7,
    color: "#94A3B8",
    textAlign: "center",
  },
  contactSeparator: {
    fontSize: 7,
    color: "#CBD5E1",
  },
});

// PDF Document Renderer
const InternshipOfferPDF = ({ details }: { details: InternshipDetails }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.outerBorder}>
          {/* Watermark */}
          <View style={styles.watermarkContainer}>
            <Text style={styles.watermarkText}>Dream Homes Bihar</Text>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <PdfImage src={FIXED_LOGO_URL} style={styles.logo} />
            <View style={styles.headerRight}>
              <Text style={styles.companyTitle}>{details.companyName}</Text>
             
              <Text style={styles.refText}>Ref: {details.referenceNumber}</Text>
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>Internship Offer Letter</Text>
         

          {/* Date */}
          <View style={styles.dateBlock}>
            <Text style={styles.dateText}>Date: {details.offerDate}</Text>
          </View>

          {/* Recipient */}
          <View style={styles.recipientBlock}>
            <Text style={styles.recipientName}>{details.internName}</Text>
            
          </View>

          {/* Body */}
          <View style={styles.body}>
            <Text style={styles.greeting}>Dear {details.internName},</Text>

            <Text style={styles.paragraph}>
              We are pleased to offer you the position of{" "}
              <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
                {details.internshipRole}
              </Text>{" "}
              Intern at <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
                {details.companyName}
              </Text>. We were impressed by your academic achievements, skills, and 
              enthusiasm, and we believe this internship will be a valuable learning 
              experience for you.
            </Text>

            <Text style={styles.paragraph}>
              This is a <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
                {details.internshipType}
              </Text>{" "}
              internship position with a duration of{" "}
              <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
                {details.duration}
              </Text>. Your internship will begin on{" "}
              <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
                {details.startDate}
              </Text>{" "}
              and end on{" "}
              <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
                {details.endDate}
              </Text>. You will be working at our{" "}
              <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
                {details.workLocation}
              </Text>{" "}
              location.
            </Text>

            {/* Key Details */}
            <View style={styles.highlightBox}>
              <View style={styles.highlightRow}>
                <Text style={styles.highlightLabel}>Internship Role</Text>
                <Text style={styles.highlightValue}>{details.internshipRole}</Text>
              </View>
              <View style={styles.highlightRow}>
                <Text style={styles.highlightLabel}>Internship Type</Text>
                <Text style={styles.highlightValue}>{details.internshipType}</Text>
              </View>
              <View style={styles.highlightRow}>
                <Text style={styles.highlightLabel}>Duration</Text>
                <Text style={styles.highlightValue}>{details.duration}</Text>
              </View>
              <View style={styles.highlightRow}>
                <Text style={styles.highlightLabel}>Start Date</Text>
                <Text style={styles.highlightValue}>{details.startDate}</Text>
              </View>
              <View style={styles.highlightRow}>
                <Text style={styles.highlightLabel}>End Date</Text>
                <Text style={styles.highlightValue}>{details.endDate}</Text>
              </View>
              <View style={styles.highlightRow}>
                <Text style={styles.highlightLabel}>Working Hours</Text>
                <Text style={styles.highlightValue}>{details.workingHours}</Text>
              </View>
              <View style={[styles.highlightRow, { borderBottomWidth: 0 }]}>
                <Text style={styles.highlightLabel}>Stipend</Text>
                <Text style={styles.highlightValue}>
                  {details.stipend} {details.stipendPeriod}
                </Text>
              </View>
            </View>

            {/* Additional Terms */}
            {details.additionalTerms && (
              <View style={styles.termsSection}>
                <Text style={styles.termsTitle}>Additional Terms & Conditions</Text>
                <Text style={styles.termsText}>{details.additionalTerms}</Text>
              </View>
            )}

            <Text style={[styles.paragraph, { marginTop: 10 }]}>
              During this internship, you will have the opportunity to work on 
              real-world projects, develop professional skills, and gain valuable 
              industry experience. You will be mentored by experienced professionals 
              and will receive regular feedback on your performance.
            </Text>

            <Text style={styles.paragraph}>
              Please note that this internship is subject to the successful completion 
              of background verification and reference checks. You are expected to 
              adhere to the company's code of conduct and policies during your tenure.
            </Text>

            <Text style={[styles.paragraph, { marginTop: 8 }]}>
              To accept this internship offer, please sign the acceptance section 
              below and return this letter by{" "}
              {new Date(new Date(details.offerDate).setDate(new Date(details.offerDate).getDate() + 5)).toLocaleDateString()}.
            </Text>
          </View>

          {/* Footer with Signatures */}
          <View style={styles.footer}>
            <View style={styles.signBlock}>
              <PdfImage src={FIXED_HR_SIGNATURE_URL} style={styles.signatureImg} />
              <View style={styles.signLine} />
              <Text style={styles.signName}>{details.managerName}</Text>
              <Text style={styles.signTitle}>
                {details.managerTitle}, {details.companyName}
              </Text>
            </View>

            <View style={styles.acceptanceBlock}>
              <View style={{ height: 45, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 8, color: "#64748B" }}>Signature</Text>
              </View>
              <View style={styles.acceptanceLine} />
              <Text style={styles.acceptanceText}>Intern's Signature</Text>
              <Text style={[styles.acceptanceText, { marginTop: 2 }]}>Date: ___________</Text>
            </View>

            <View style={styles.acceptanceBlock}>
              <View style={{ height: 45, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 8, color: "#64748B" }}>Date</Text>
              </View>
              <View style={styles.acceptanceLine} />
              <Text style={styles.acceptanceText}>Date of Acceptance</Text>
              <Text style={[styles.acceptanceText, { marginTop: 2 }]}>Place: ___________</Text>
            </View>
          </View>

          {/* Company Contact Information */}
          <View style={styles.companyContact}>
            <Text style={styles.contactItem}>{details.companyAddress}</Text>
            <Text style={styles.contactSeparator}>|</Text>
            <Text style={styles.contactItem}>Website: {details.companyWebsite}</Text>
            <Text style={styles.contactSeparator}>|</Text>
            <Text style={styles.contactItem}>Email: {details.companyEmail}</Text>
            <Text style={styles.contactSeparator}>|</Text>
            <Text style={styles.contactItem}>Phone: {details.companyPhone}</Text>
          </View>

          {/* Document Footer */}
          <View style={styles.documentFooter}>
            <Text style={styles.footerNote}>
              This document is electronically generated and does not require a physical signature 
              if digitally signed by {details.companyName}.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default function InternshipOfferLetterPage() {
  const [isClient, setIsClient] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);

  const [details, setDetails] = useState<InternshipDetails>({
    // User fillable fields
    referenceNumber: "",
    internName: "",
    internshipRole: "",
    startDate: "",
    endDate: "",
    stipend: "",
    internshipType: "Paid",
    workingHours: "9:00 AM - 6:00 PM",
    duration: "3 Months",
    
    // Auto-filled fields
   
    offerDate: new Date().toISOString().split("T")[0],
    companyName: FIXED_COMPANY_NAME,
    companyAddress: FIXED_COMPANY_ADDRESS,
    companyWebsite: FIXED_COMPANY_WEBSITE,
    companyEmail: FIXED_COMPANY_EMAIL,
    companyPhone: FIXED_COMPANY_PHONE,
    managerName: FIXED_HR_NAME,
    managerTitle: FIXED_HR_TITLE,
    stipendPeriod: "per month",
    workLocation: "Patna, Bihar, India",
    probationPeriod: "1 Month",
    additionalTerms: "",
    universityName: "",
    courseName: "",
  });

  useEffect(() => {
    setIsClient(true);
    setDetails((prev) => ({ ...prev, referenceNumber: getNextOfferReferenceNumber() }));
  }, []);

  const handleAutoGenerateRef = () => {
    setDetails((prev) => ({ ...prev, referenceNumber: getNextOfferReferenceNumber() }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
    setTouchedFields((prev) => new Set(prev).add(name));
  };

  const handleBlur = (fieldName: string) => {
    setTouchedFields((prev) => new Set(prev).add(fieldName));
  };

  // Check if all required fields are filled
  const isFormValid = useMemo(() => {
    const requiredFields: (keyof InternshipDetails)[] = [
      'internName', 'internshipRole', 'startDate', 'endDate', 'stipend', 'duration'
    ];
    return requiredFields.every(field => details[field]?.trim() !== '');
  }, [details]);

  // Get completion percentage
  const getCompletionPercentage = useMemo(() => {
    const userFields = [
      'referenceNumber', 'internName', 'internshipRole', 
      'startDate', 'endDate', 'stipend', 'internshipType', 
      'workingHours', 'duration'
    ];
    const filledFields = userFields.filter(field => {
      const val = details[field as keyof InternshipDetails];
      return val && val.toString().trim() !== '';
    });
    return Math.round((filledFields.length / userFields.length) * 100);
  }, [details]);

  const requiredField = (fieldName: string) => {
    const requiredFields = [
      'internName', 'internshipRole', 'startDate', 'endDate', 'stipend', 'duration'
    ];
    return requiredFields.includes(fieldName);
  };

  const isFieldInvalid = (fieldName: string) => {
    const value = details[fieldName as keyof InternshipDetails];
    return touchedFields.has(fieldName) && requiredField(fieldName) && !value?.trim();
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 md:p-8 font-sans text-slate-800">
      {/* Top Header Controls */}
      <header className="max-w-7xl mx-auto mb-6 print:hidden">
        <div className="bg-white rounded-xl px-6 py-4 shadow-sm border border-slate-200">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <span className="bg-[#1A2E5A] text-white p-1.5 rounded-lg">
                  <GraduationCap className="w-5 h-5" />
                </span>
                Internship Offer Generator
              </h1>
              <p className="text-sm text-slate-500">
                Professional Internship Offer Letters for{" "}
                <span className="font-semibold text-slate-700">{FIXED_COMPANY_NAME}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Progress Indicator */}
              <div className="hidden md:flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#1A2E5A] transition-all duration-300 rounded-full"
                    style={{ width: `${getCompletionPercentage}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-slate-600">
                  {getCompletionPercentage}%
                </span>
              </div>

              <button
                onClick={() => window.print()}
                className="bg-white hover:bg-slate-50 text-slate-700 font-medium px-4 py-2 rounded-lg border border-slate-300 text-sm flex items-center gap-2 transition-all shadow-xs"
              >
                <Printer className="w-4 h-4" /> Print
              </button>

              {isClient && (
                <PDFDownloadLink
                  document={<InternshipOfferPDF details={details} />}
                  fileName={`Internship_Offer_${details.internName.replace(/\s+/g, "_") || "Draft"}_${
                    details.referenceNumber || "Draft"
                  }.pdf`}
                  className={`${
                    isFormValid 
                      ? 'bg-[#1A2E5A] hover:bg-[#142442]' 
                      : 'bg-slate-400 cursor-not-allowed'
                  } text-white font-medium px-5 py-2 rounded-lg text-sm flex items-center gap-2 transition-all shadow-sm`}
                >
                  {({ loading }) => (
                    <>
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4" />
                      )}
                      Download PDF
                    </>
                  )}
                </PDFDownloadLink>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Studio Grid */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Inputs */}
        <section className="lg:col-span-5 print:hidden space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Edit className="w-5 h-5 text-[#1A2E5A]" /> Internship Details
              </h2>
              <button
                onClick={() => setIsPreviewVisible(!isPreviewVisible)}
                className="text-xs text-[#1A2E5A] hover:text-[#142442] font-medium"
              >
                {isPreviewVisible ? 'Hide Preview' : 'Show Preview'}
              </button>
            </div>

            {/* Reference Number */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Reference Number
                </label>
                <button
                  type="button"
                  onClick={handleAutoGenerateRef}
                  className="text-[11px] text-[#1A2E5A] hover:text-[#142442] flex items-center gap-1 font-medium"
                >
                  <RefreshCw className="w-3 h-3" /> Generate New
                </button>
              </div>
              <input
                type="text"
                name="referenceNumber"
                value={details.referenceNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none bg-slate-50"
                readOnly
              />
            </div>

            {/* Intern Information */}
            <div className="border-t pt-4 mt-2">
              <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-3">
                <User className="w-4 h-4 text-[#1A2E5A]" /> Intern Information
                <span className="text-xs text-red-500">*</span>
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="internName"
                    value={details.internName}
                    onChange={handleChange}
                    onBlur={() => handleBlur('internName')}
                    placeholder="Enter intern's full name"
                    className={`w-full px-3 py-2 border ${isFieldInvalid('internName') ? 'border-red-500' : 'border-slate-300'} rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none`}
                    required
                  />
                  {isFieldInvalid('internName') && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Name is required
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Internship Details */}
            <div className="border-t pt-4 mt-2">
              <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-3">
                <Briefcase className="w-4 h-4 text-[#1A2E5A]" /> Internship Details
                <span className="text-xs text-red-500">*</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    Internship Role *
                  </label>
                  <input
                    type="text"
                    name="internshipRole"
                    value={details.internshipRole}
                    onChange={handleChange}
                    onBlur={() => handleBlur('internshipRole')}
                    placeholder="e.g., Software Development Intern"
                    className={`w-full px-3 py-2 border ${isFieldInvalid('internshipRole') ? 'border-red-500' : 'border-slate-300'} rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none`}
                    required
                  />
                  {isFieldInvalid('internshipRole') && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Role is required
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Internship Duration & Dates */}
            <div className="border-t pt-4 mt-2">
              <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-[#1A2E5A]" /> Duration & Dates
                <span className="text-xs text-red-500">*</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    Duration *
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={details.duration}
                    onChange={handleChange}
                    onBlur={() => handleBlur('duration')}
                    placeholder="e.g., 3 Months, 6 Months"
                    className={`w-full px-3 py-2 border ${isFieldInvalid('duration') ? 'border-red-500' : 'border-slate-300'} rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none`}
                    required
                  />
                  {isFieldInvalid('duration') && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Duration is required
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={details.startDate}
                      onChange={handleChange}
                      onBlur={() => handleBlur('startDate')}
                      className={`w-full px-3 py-2 border ${isFieldInvalid('startDate') ? 'border-red-500' : 'border-slate-300'} rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none`}
                      required
                    />
                    {isFieldInvalid('startDate') && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Start date is required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                      End Date *
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={details.endDate}
                      onChange={handleChange}
                      onBlur={() => handleBlur('endDate')}
                      className={`w-full px-3 py-2 border ${isFieldInvalid('endDate') ? 'border-red-500' : 'border-slate-300'} rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none`}
                      required
                    />
                    {isFieldInvalid('endDate') && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> End date is required
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Work Details */}
            <div className="border-t pt-4 mt-2">
              <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-[#1A2E5A]" /> Work Details
                <span className="text-xs text-red-500">*</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    Internship Type *
                  </label>
                  <select
                    name="internshipType"
                    value={details.internshipType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                    <option value="Partially Paid">Partially Paid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    Working Hours *
                  </label>
                  <input
                    type="text"
                    name="workingHours"
                    value={details.workingHours}
                    onChange={handleChange}
                    placeholder="e.g., 9:00 AM - 6:00 PM"
                    className={`w-full px-3 py-2 border ${isFieldInvalid('workingHours') ? 'border-red-500' : 'border-slate-300'} rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none`}
                  />
                </div>
              </div>
            </div>

            {/* Stipend */}
            <div className="border-t pt-4 mt-2">
              <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-[#1A2E5A]" /> Stipend
                <span className="text-xs text-red-500">*</span>
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  Stipend Amount *
                </label>
                <input
                  type="text"
                  name="stipend"
                  value={details.stipend}
                  onChange={handleChange}
                  onBlur={() => handleBlur('stipend')}
                  placeholder="e.g., ₹10,000"
                  className={`w-full px-3 py-2 border ${isFieldInvalid('stipend') ? 'border-red-500' : 'border-slate-300'} rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none`}
                  required
                />
                {isFieldInvalid('stipend') && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Stipend is required
                  </p>
                )}
              </div>
            </div>

            {/* Additional Terms */}
            <div className="border-t pt-4 mt-2">
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Additional Terms & Conditions
              </label>
              <textarea
                name="additionalTerms"
                value={details.additionalTerms}
                onChange={handleChange}
                placeholder="Enter any additional terms, conditions, or benefits..."
                rows={4}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none resize-y"
              />
            </div>

            {/* Info Note */}
            <div className="mt-4 p-3 bg-[#F8F6F0] rounded-lg border border-[#C9A84C]">
              <p className="text-xs text-[#1A2E5A] flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Note:</strong> All fields marked with * are required. 
                  The internship offer letter will be generated as a professional PDF document.
                  {!isFormValid && ' Please fill in all required fields to enable PDF download.'}
                </span>
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setDetails({
                    referenceNumber: getNextOfferReferenceNumber(),
                    internName: "",
                    internshipRole: "",
                    startDate: "",
                    endDate: "",
                    stipend: "",
                    internshipType: "Paid",
                    workingHours: "9:00 AM - 6:00 PM",
                    duration: "3 Months",
                   
                    offerDate: new Date().toISOString().split("T")[0],
                    companyName: FIXED_COMPANY_NAME,
                    companyAddress: FIXED_COMPANY_ADDRESS,
                    companyWebsite: FIXED_COMPANY_WEBSITE,
                    companyEmail: FIXED_COMPANY_EMAIL,
                    companyPhone: FIXED_COMPANY_PHONE,
                    managerName: FIXED_HR_NAME,
                    managerTitle: FIXED_HR_TITLE,
                    stipendPeriod: "per month",
                    workLocation: "Patna, Bihar, India",
                    probationPeriod: "1 Month",
                    additionalTerms: "",
                    universityName: "",
                    courseName: "",
                  });
                  setTouchedFields(new Set());
                }}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all"
              >
                Clear All
              </button>
            </div>
          </div>
        </section>

        {/* Live Preview Display */}
        <section className={`lg:col-span-7 flex justify-center ${!isPreviewVisible ? 'hidden lg:flex' : ''}`}>
          <div className="w-full overflow-x-auto">
            <div
              id="printable-area"
              className="w-[210mm] h-[297mm] bg-white p-8 rounded-xl shadow-lg border-4 border-[#1A2E5A] relative flex flex-col mx-auto"
            >
              {/* Watermark - Preview */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
                <div className="text-[70px] font-bold text-[#1A2E5A] -rotate-[30deg] tracking-[8px] select-none">
                  Dream Homes Bihar
                </div>
              </div>

              <div className="border-2 border-[#1A2E5A] p-6 h-full flex flex-col relative">
                {/* Header */}
                <div className="flex justify-between items-center border-b-2 border-[#C9A84C] pb-4 mb-4">
                  <img
                    src={FIXED_LOGO_URL}
                    alt="Logo"
                    className="h-16 w-16 object-contain"
                    onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                  />
                  <div className="text-right">
                    <h1 className="text-lg font-bold text-[#1A2E5A] uppercase tracking-wide">
                      {details.companyName}
                    </h1>
                   
                    <p className="text-[10px] text-slate-400 mt-1">Ref: {details.referenceNumber || "Not Set"}</p>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-[#1A2E5A] uppercase tracking-widest text-center mb-1">
                  Internship Offer Letter
                </h2>
                

                {/* Date */}
                <div className="text-right mb-4">
                  <p className="text-sm text-slate-600">Date: {details.offerDate}</p>
                </div>

                {/* Recipient */}
                <div className="mb-4">
                  <p className="text-base font-bold text-[#1A2E5A]">{details.internName || "[Intern Name]"}</p>
                 
                </div>

                {/* Body */}
                <div className="flex-1 text-sm text-slate-700 space-y-3 overflow-y-auto">
                  <p className="font-bold text-[#1A2E5A]">
                    Dear {details.internName || "[Intern Name]"},
                  </p>

                  <p className="leading-relaxed text-justify">
                    We are pleased to offer you the position of{" "}
                    <strong className="text-[#1A2E5A]">{details.internshipRole || "[Role]"}</strong>{" "}
                    Intern at <strong className="text-[#1A2E5A]">{details.companyName}</strong>. 
                    We were impressed by your academic achievements, skills, and enthusiasm, and 
                    we believe this internship will be a valuable learning experience for you.
                  </p>

                  <p className="leading-relaxed text-justify">
                    This is a <strong className="text-[#1A2E5A]">{details.internshipType || "[Type]"}</strong>{" "}
                    internship position with a duration of{" "}
                    <strong className="text-[#1A2E5A]">{details.duration || "[Duration]"}</strong>. 
                    Your internship will begin on{" "}
                    <strong className="text-[#1A2E5A]">{details.startDate || "[Start Date]"}</strong>{" "}
                    and end on{" "}
                    <strong className="text-[#1A2E5A]">{details.endDate || "[End Date]"}</strong>. 
                    You will be working at our{" "}
                    <strong className="text-[#1A2E5A]">{details.workLocation || "[Location]"}</strong>{" "}
                    location.
                  </p>

                  {/* Key Details Box */}
                  <div className="bg-[#F8F6F0] border border-[#C9A84C] p-3 rounded">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                      <div>
                        <span className="font-bold text-[#1A2E5A]">Role:</span>{" "}
                        {details.internshipRole || "N/A"}
                      </div>
                      <div>
                        <span className="font-bold text-[#1A2E5A]">Type:</span>{" "}
                        {details.internshipType || "N/A"}
                      </div>
                      <div>
                        <span className="font-bold text-[#1A2E5A]">Duration:</span>{" "}
                        {details.duration || "N/A"}
                      </div>
                      <div>
                        <span className="font-bold text-[#1A2E5A]">Start Date:</span>{" "}
                        {details.startDate || "N/A"}
                      </div>
                      <div>
                        <span className="font-bold text-[#1A2E5A]">End Date:</span>{" "}
                        {details.endDate || "N/A"}
                      </div>
                      <div>
                        <span className="font-bold text-[#1A2E5A]">Working Hours:</span>{" "}
                        {details.workingHours || "N/A"}
                      </div>
                      <div className="col-span-2">
                        <span className="font-bold text-[#1A2E5A]">Stipend:</span>{" "}
                        {details.stipend ? `${details.stipend} ${details.stipendPeriod}` : "N/A"}
                      </div>
                    </div>
                  </div>

                  {/* Additional Terms */}
                  {details.additionalTerms && (
                    <div>
                      <p className="font-bold text-[#1A2E5A] text-xs uppercase tracking-wide mt-2">
                        Additional Terms & Conditions
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {details.additionalTerms}
                      </p>
                    </div>
                  )}

                  <p className="leading-relaxed text-justify">
                    During this internship, you will have the opportunity to work on 
                    real-world projects, develop professional skills, and gain valuable 
                    industry experience. You will be mentored by experienced professionals 
                    and will receive regular feedback on your performance.
                  </p>

                  <p className="leading-relaxed text-justify">
                    To accept this internship offer, please sign the acceptance section 
                    below and return this letter by{" "}
                    {details.offerDate ? 
                      new Date(new Date(details.offerDate).setDate(new Date(details.offerDate).getDate() + 5)).toLocaleDateString() 
                      : "[Date]" 
                    }.
                  </p>
                </div>

                {/* Footer with Signatures */}
                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t-2 border-[#C9A84C]">
                  <div className="text-center">
                    <div className="h-12 flex items-center justify-center">
                      <img
                        src={FIXED_HR_SIGNATURE_URL}
                        alt="Signature"
                        className="h-10 max-w-[150px] object-contain"
                      />
                    </div>
                    <div className="w-full border-b border-[#1A2E5A] my-1"></div>
                    <p className="text-sm font-bold text-[#1A2E5A]">{details.managerName}</p>
                    <p className="text-xs text-slate-500">
                      {details.managerTitle}, {details.companyName}
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="h-12 flex items-center justify-center">
                      <p className="text-xs text-slate-400">Signature</p>
                    </div>
                    <div className="w-full border-b border-[#1A2E5A] my-1"></div>
                    <p className="text-xs text-slate-500">Intern's Signature</p>
                    <p className="text-xs text-slate-400 mt-1">Date: ___________</p>
                  </div>

                  <div className="text-center">
                    <div className="h-12 flex items-center justify-center">
                      <p className="text-xs text-slate-400">Date</p>
                    </div>
                    <div className="w-full border-b border-[#1A2E5A] my-1"></div>
                    <p className="text-xs text-slate-500">Date of Acceptance</p>
                    <p className="text-xs text-slate-400 mt-1">Place: ___________</p>
                  </div>
                </div>

                {/* Company Contact Information */}
                <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[8px] text-slate-400">
                  <span>{details.companyAddress}</span>
                  <span className="text-slate-300">|</span>
                  <span>Website: {details.companyWebsite}</span>
                  <span className="text-slate-300">|</span>
                  <span>Email: {details.companyEmail}</span>
                  <span className="text-slate-300">|</span>
                  <span>Phone: {details.companyPhone}</span>
                </div>

                {/* Document Footer */}
                <div className="mt-2 pt-2 border-t border-dashed border-slate-200">
                  <p className="text-[7px] text-slate-400 text-center italic">
                    This document is electronically generated and does not require a physical signature 
                    if digitally signed by {details.companyName}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}