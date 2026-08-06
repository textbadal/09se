"use client";

import React, { useState, useEffect } from "react";
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
  Loader2,
  FileText,
  User,
  Briefcase,
  Clock,
  Mail,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  RefreshCw,
  Calendar,
  Building2,
  MapPin,
  Phone,
  Award,
  GraduationCap,
  Code,
  Palette,
  Megaphone,
  Database,
  Shield,
  BarChart,
  PenTool,
  Users,
  Settings,
  Cpu,
  Globe,
  BookOpen,
} from "lucide-react";

// ============================================================
// CONSTANTS
// ============================================================

const FIXED_COMPANY_NAME = "Dream Homes Bihar";
const DEFAULT_LOGO_URL = "/fevicon.png";
const DEFAULT_AUTHORIZED_NAME = "Sumit Singh";
const DEFAULT_AUTHORIZED_TITLE = "HR Manager";
const DEFAULT_AUTHORIZED_SIGNATURE_URL = "/sumit_singh.png";
const DEFAULT_SEAL_URL = "/seal.png";

// Internship Domains
const INTERNSHIP_DOMAINS = [
  { value: "software-development", label: "💻 Software Development", icon: Code },
  { value: "web-development", label: "🌐 Web Development", icon: Globe },
  { value: "mobile-development", label: "📱 Mobile App Development", icon: Cpu },
  { value: "ui-ux-design", label: "🎨 UI/UX Design", icon: Palette },
  { value: "graphic-design", label: "🖌️ Graphic Design", icon: PenTool },
  { value: "digital-marketing", label: "📊 Digital Marketing", icon: Megaphone },
  { value: "social-media", label: "📱 Social Media Management", icon: Users },
  { value: "content-writing", label: "✍️ Content Writing", icon: BookOpen },
  { value: "data-science", label: "📈 Data Science", icon: BarChart },
  { value: "data-analytics", label: "📉 Data Analytics", icon: Database },
  { value: "cybersecurity", label: "🔒 Cybersecurity", icon: Shield },
  { value: "it-support", label: "🖥️ IT Support", icon: Settings },
  { value: "hr", label: "👥 Human Resources", icon: Users },
  { value: "finance", label: "💰 Finance", icon: Briefcase },
  { value: "sales", label: "📈 Sales", icon: BarChart },
  { value: "operations", label: "⚙️ Operations", icon: Settings },
];

// Position suggestions based on domain
const POSITION_SUGGESTIONS: Record<string, string[]> = {
  "software-development": ["Software Developer Intern", "Full Stack Developer Intern", "Backend Developer Intern"],
  "web-development": ["Frontend Developer Intern", "React Developer Intern", "Next.js Developer Intern", "Web Developer Intern"],
  "mobile-development": ["React Native Developer Intern", "Flutter Developer Intern", "iOS Developer Intern", "Android Developer Intern"],
  "ui-ux-design": ["UI/UX Design Intern", "Product Design Intern", "User Research Intern"],
  "graphic-design": ["Graphic Design Intern", "Visual Design Intern", "Brand Design Intern"],
  "digital-marketing": ["Digital Marketing Intern", "SEO Intern", "PPC Intern", "Content Marketing Intern"],
  "social-media": ["Social Media Intern", "Community Management Intern", "Content Creation Intern"],
  "content-writing": ["Content Writer Intern", "Technical Writer Intern", "Copywriting Intern"],
  "data-science": ["Data Science Intern", "Machine Learning Intern", "AI Research Intern"],
  "data-analytics": ["Data Analyst Intern", "Business Analyst Intern", "BI Analyst Intern"],
  "cybersecurity": ["Cybersecurity Intern", "Security Analyst Intern", "Penetration Testing Intern"],
  "it-support": ["IT Support Intern", "Network Administrator Intern", "System Administrator Intern"],
  "hr": ["HR Intern", "Talent Acquisition Intern", "Employee Relations Intern"],
  "finance": ["Finance Intern", "Investment Banking Intern", "Financial Analyst Intern"],
  "sales": ["Sales Intern", "Business Development Intern", "Account Management Intern"],
  "operations": ["Operations Intern", "Project Management Intern", "Supply Chain Intern"],
};

// Department mapping
const DEPARTMENT_MAPPING: Record<string, string> = {
  "software-development": "Engineering",
  "web-development": "Engineering",
  "mobile-development": "Engineering",
  "ui-ux-design": "Design",
  "graphic-design": "Design",
  "digital-marketing": "Marketing",
  "social-media": "Marketing",
  "content-writing": "Marketing",
  "data-science": "Data",
  "data-analytics": "Data",
  "cybersecurity": "IT",
  "it-support": "IT",
  "hr": "Human Resources",
  "finance": "Finance",
  "sales": "Sales",
  "operations": "Operations",
};

// ============================================================
// INTERFACE
// ============================================================

interface OfferDetails {
  internName: string;
  internEmail: string;
  internPhone: string;
  position: string;
  department: string;
  reportingTo: string;
  reportingTitle: string;
  startDate: string;
  endDate: string;
  duration: string;
  stipend: string;
  stipendCurrency: string;
  stipendFrequency: "monthly" | "weekly" | "hourly";
  workMode: "onsite" | "remote" | "hybrid";
  workingHours: string;
  offerValidity: string;
  issueDate: string;
  offerNumber: string;
  companyName: string;
  authorizedName: string;
  authorizedTitle: string;
  authorizedEmail: string;
  authorizedPhone: string;
  companyAddress: string;
  companyWebsite: string;
  joiningInstructions: string;
  customMessage: string;
  internshipDomain: string;
}

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

const getNextOfferNumber = (): string => {
  if (typeof window === "undefined") return "INT-2026-0001";
  const year = new Date().getFullYear();
  const storageKey = `int_offer_counter_${year}`;
  const counter = parseInt(localStorage.getItem(storageKey) || "0", 10) + 1;
  localStorage.setItem(storageKey, counter.toString());
  return `INT-${year}-${String(counter).padStart(4, "0")}`;
};

const formatDate = (dateStr: string): string => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const calculateDuration = (startStr: string, endStr: string): string => {
  if (!startStr || !endStr) return "";
  const start = new Date(startStr);
  const end = new Date(endStr);
  if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) return "";

  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const months = Math.floor(diffDays / 30);
  const remainingDays = diffDays % 30;

  if (months === 0) return `${diffDays} Day${diffDays > 1 ? "s" : ""}`;
  if (remainingDays === 0) return `${months} Month${months > 1 ? "s" : ""}`;
  return `${months} Month${months > 1 ? "s" : ""}, ${remainingDays} Day${remainingDays > 1 ? "s" : ""}`;
};

const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePhone = (phone: string): boolean => {
  return /^[\+\d\s\-\(\)]{10,15}$/.test(phone);
};

// ============================================================
// PDF STYLES
// ============================================================

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
    position: "relative",
  },
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "#1E3A8A",
    paddingBottom: 15,
    marginBottom: 15,
  },
  logo: {
    width: 60,
    height: 60,
    objectFit: "contain",
  },
  headerText: {
    textAlign: "right",
  },
  companyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  refText: {
    fontSize: 8,
    color: "#64748B",
    marginTop: 3,
  },
  documentTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E3A8A",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 3,
    marginVertical: 10,
  },
  paragraph: {
    fontSize: 10,
    lineHeight: 1.6,
    color: "#334155",
    marginBottom: 6,
    textAlign: "justify",
  },
  bold: {
    fontWeight: "bold",
    color: "#1E293B",
  },
  table: {
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 4,
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  tableCell: {
    padding: 6,
    fontSize: 9,
    color: "#334155",
  },
  tableCellLabel: {
    width: "35%",
    fontWeight: "bold",
    backgroundColor: "#F8FAFC",
  },
  tableCellValue: {
    width: "65%",
  },
  footer: {
    borderTopWidth: 3,
    borderTopColor: "#1E3A8A",
    paddingTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 10,
  },
  signBlock: {
    width: "45%",
  },
  signatureImg: {
    height: 40,
    width: 130,
    objectFit: "contain",
    marginBottom: 3,
  },
  sealImg: {
    height: 70,
    width: 70,
    objectFit: "contain",
    position: "absolute",
    right: 50,
    bottom: 50,
    opacity: 0.7,
  },
  signLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#94A3B8",
    width: "100%",
    marginBottom: 3,
  },
  signName: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1E293B",
  },
  signTitle: {
    fontSize: 8,
    color: "#64748B",
  },
  signEmail: {
    fontSize: 7,
    color: "#94A3B8",
    marginTop: 2,
  },
  companyInfo: {
    fontSize: 7,
    color: "#64748B",
    textAlign: "right",
    marginTop: 4,
  },
  acceptanceBlock: {
    marginTop: 10,
    padding: 12,
    backgroundColor: "#F8FAFC",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  acceptanceText: {
    fontSize: 10,
    color: "#1E293B",
    textAlign: "center",
  },
  acceptanceLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#94A3B8",
    width: "60%",
    marginHorizontal: "auto",
    marginVertical: 5,
  },
  watermark: {
    position: "absolute",
    fontSize: 60,
    color: "#F1F5F9",
    textAlign: "center",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%) rotate(-30deg)",
    opacity: 0.3,
  },
});

// ============================================================
// PDF COMPONENT
// ============================================================

const InternshipOfferPDF = ({ details }: { details: OfferDetails }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.watermark}>DREAM HOMES</Text>
        
        <View style={styles.container}>
          <View>
            <View style={styles.header}>
              <PdfImage src={DEFAULT_LOGO_URL} style={styles.logo} />
              <View style={styles.headerText}>
                <Text style={styles.companyTitle}>{details.companyName}</Text>
                <Text style={styles.refText}>Offer No: {details.offerNumber}</Text>
                <Text style={styles.refText}>Date: {formatDate(details.issueDate)}</Text>
              </View>
            </View>

            <Text style={styles.documentTitle}>Internship Offer Letter</Text>

            <Text style={styles.paragraph}>
              <Text style={styles.bold}>Dear {details.internName},</Text>
            </Text>

            <Text style={styles.paragraph}>
              We are delighted to offer you the position of <Text style={styles.bold}>{details.position}</Text> at {details.companyName}. 
              We were impressed with your qualifications and believe your skills will make a valuable contribution to our team.
            </Text>

            {details.customMessage && (
              <Text style={styles.paragraph}>{details.customMessage}</Text>
            )}

            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, styles.tableCellLabel]}>
                  <Text>Domain</Text>
                </View>
                <View style={[styles.tableCell, styles.tableCellValue]}>
                  <Text>{details.internshipDomain || "General"}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, styles.tableCellLabel]}>
                  <Text>Start Date</Text>
                </View>
                <View style={[styles.tableCell, styles.tableCellValue]}>
                  <Text>{formatDate(details.startDate)}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, styles.tableCellLabel]}>
                  <Text>Duration</Text>
                </View>
                <View style={[styles.tableCell, styles.tableCellValue]}>
                  <Text>{details.duration}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, styles.tableCellLabel]}>
                  <Text>Stipend</Text>
                </View>
                <View style={[styles.tableCell, styles.tableCellValue]}>
                  <Text>{details.stipendCurrency} {details.stipend} / {details.stipendFrequency}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, styles.tableCellLabel]}>
                  <Text>Department</Text>
                </View>
                <View style={[styles.tableCell, styles.tableCellValue]}>
                  <Text>{details.department}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, styles.tableCellLabel]}>
                  <Text>Reporting To</Text>
                </View>
                <View style={[styles.tableCell, styles.tableCellValue]}>
                  <Text>{details.reportingTo} ({details.reportingTitle})</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, styles.tableCellLabel]}>
                  <Text>Work Mode</Text>
                </View>
                <View style={[styles.tableCell, styles.tableCellValue]}>
                  <Text>{details.workMode.toUpperCase()}</Text>
                </View>
              </View>
              <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
                <View style={[styles.tableCell, styles.tableCellLabel]}>
                  <Text>Working Hours</Text>
                </View>
                <View style={[styles.tableCell, styles.tableCellValue]}>
                  <Text>{details.workingHours}</Text>
                </View>
              </View>
            </View>

            {details.joiningInstructions && (
              <Text style={[styles.paragraph, { marginTop: 8 }]}>
                <Text style={styles.bold}>📋 Joining Instructions: </Text>
                {details.joiningInstructions}
              </Text>
            )}

            <Text style={[styles.paragraph, { marginTop: 8 }]}>
              Please review this offer and confirm your acceptance by signing and returning a copy of this letter by{' '}
              <Text style={styles.bold}>{formatDate(details.offerValidity)}</Text>.
            </Text>

            <Text style={styles.paragraph}>
              We look forward to welcoming you to our team and wish you a rewarding experience with us.
            </Text>

            <View style={styles.acceptanceBlock}>
              <Text style={styles.acceptanceText}>
                <Text style={styles.bold}>Accepted By</Text>
              </Text>
              <Text style={styles.acceptanceText}>{details.internName}</Text>
              <View style={styles.acceptanceLine} />
              <Text style={styles.acceptanceText}>
                Signature: ___________________ &nbsp;&nbsp; Date: ___________________
              </Text>
            </View>
          </View>

          <View style={styles.footer}>
            <View style={styles.signBlock}>
              <PdfImage src={DEFAULT_AUTHORIZED_SIGNATURE_URL} style={styles.signatureImg} />
              <View style={styles.signLine} />
              <Text style={styles.signName}>{details.authorizedName}</Text>
              <Text style={styles.signTitle}>
                {details.authorizedTitle}, {details.companyName}
              </Text>
              {details.authorizedEmail && (
                <Text style={styles.signEmail}>{details.authorizedEmail}</Text>
              )}
            </View>

            <View style={{ alignItems: "flex-end" }}>
              {details.companyAddress && (
                <Text style={styles.companyInfo}>{details.companyAddress}</Text>
              )}
              {details.companyWebsite && (
                <Text style={styles.companyInfo}>{details.companyWebsite}</Text>
              )}
              {details.authorizedPhone && (
                <Text style={styles.companyInfo}>Phone: {details.authorizedPhone}</Text>
              )}
            </View>
          </View>

          <PdfImage src={DEFAULT_SEAL_URL} style={styles.sealImg} />
        </View>
      </Page>
    </Document>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function InternshipOfferPage() {
  const [isClient, setIsClient] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"basic" | "work" | "additional">("basic");

  const [details, setDetails] = useState<OfferDetails>({
    internName: "",
    internEmail: "",
    internPhone: "",
    position: "",
    department: "Engineering",
    reportingTo: DEFAULT_AUTHORIZED_NAME,
    reportingTitle: DEFAULT_AUTHORIZED_TITLE,
    startDate: "",
    endDate: "",
    duration: "",
    stipend: "15000",
    stipendCurrency: "₹",
    stipendFrequency: "monthly",
    workMode: "onsite",
    workingHours: "40 hours/week",
    offerValidity: "",
    issueDate: "",
    offerNumber: "",
    companyName: FIXED_COMPANY_NAME,
    authorizedName: DEFAULT_AUTHORIZED_NAME,
    authorizedTitle: DEFAULT_AUTHORIZED_TITLE,
    authorizedEmail: "hr@dreamhomesbihar.com",
    authorizedPhone: "+91 98765 43210",
    companyAddress: "Dream Homes Bihar, Patna, Bihar",
    companyWebsite: "www.dreamhomesbihar.com",
    joiningInstructions: "Please report to the HR department on your first day at 9:00 AM with original ID proof.",
    customMessage: "",
    internshipDomain: "",
  });

  // Initialize
  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const validityDate = new Date();
    validityDate.setDate(today.getDate() + 7);
    
    setDetails((prev) => ({
      ...prev,
      offerNumber: getNextOfferNumber(),
      issueDate: today.toISOString().split("T")[0],
      offerValidity: validityDate.toISOString().split("T")[0],
    }));
  }, []);

  // Calculate duration when dates change
  useEffect(() => {
    if (details.startDate && details.endDate) {
      const computedDuration = calculateDuration(details.startDate, details.endDate);
      if (computedDuration) {
        setDetails((prev) => ({ ...prev, duration: computedDuration }));
      }
    }
  }, [details.startDate, details.endDate]);

  // Handle domain change
  const handleDomainChange = (domain: string) => {
    const suggestions = POSITION_SUGGESTIONS[domain] || [];
    const department = DEPARTMENT_MAPPING[domain] || "General";
    
    setDetails((prev) => ({
      ...prev,
      internshipDomain: domain,
      department: department,
      position: suggestions.length > 0 ? suggestions[0] : prev.position,
    }));
  };

  // General change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Validation
  const validateForm = (): boolean => {
    if (!details.internName.trim()) {
      setSaveMessage({ type: "error", text: "Please enter intern's name" });
      return false;
    }
    if (!details.position.trim()) {
      setSaveMessage({ type: "error", text: "Please enter position" });
      return false;
    }
    if (!details.startDate || !details.endDate) {
      setSaveMessage({ type: "error", text: "Please select start and end dates" });
      return false;
    }
    if (details.internEmail && !validateEmail(details.internEmail)) {
      setSaveMessage({ type: "error", text: "Please enter a valid email address" });
      return false;
    }
    if (details.internPhone && !validatePhone(details.internPhone)) {
      setSaveMessage({ type: "error", text: "Please enter a valid phone number" });
      return false;
    }
    return true;
  };

  // Reset to defaults
  const resetToDefaults = () => {
    const today = new Date();
    const validityDate = new Date();
    validityDate.setDate(today.getDate() + 7);
    
    setDetails((prev) => ({
      ...prev,
      internName: "",
      internEmail: "",
      internPhone: "",
      position: "",
      department: "Engineering",
      startDate: "",
      endDate: "",
      duration: "",
      stipend: "15000",
      workMode: "onsite",
      joiningInstructions: "Please report to the HR department on your first day at 9:00 AM with original ID proof.",
      customMessage: "",
      issueDate: today.toISOString().split("T")[0],
      offerValidity: validityDate.toISOString().split("T")[0],
      offerNumber: getNextOfferNumber(),
      internshipDomain: "",
    }));
    setSaveMessage({ type: "success", text: "Reset to default values" });
    setTimeout(() => setSaveMessage(null), 3000);
  };

  // Fill sample data
  const fillSampleData = () => {
    const today = new Date();
    const endDate = new Date();
    endDate.setMonth(today.getMonth() + 3);
    const validityDate = new Date();
    validityDate.setDate(today.getDate() + 7);

    setDetails((prev) => ({
      ...prev,
      internName: "Mantasha Khan",
      internEmail: "mantasha.khan@example.com",
      internPhone: "+91 98765 43210",
      position: "Frontend Developer Intern",
      department: "Engineering",
      internshipDomain: "web-development",
      startDate: today.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      stipend: "15000",
      workMode: "onsite",
      joiningInstructions: "Please report to the HR department on your first day at 9:00 AM with original ID proof.",
      customMessage: "We are particularly excited about your experience with React and modern web development.",
      issueDate: today.toISOString().split("T")[0],
      offerValidity: validityDate.toISOString().split("T")[0],
      offerNumber: getNextOfferNumber(),
    }));
    setSaveMessage({ type: "success", text: "Sample data loaded" });
    setTimeout(() => setSaveMessage(null), 3000);
  };

  // Quick fill template
  const fillTemplate = (template: "developer" | "designer" | "marketing" | "data" | "hr") => {
    const today = new Date();
    const endDate = new Date();
    endDate.setMonth(today.getMonth() + 3);
    const validityDate = new Date();
    validityDate.setDate(today.getDate() + 7);

    const templates = {
      developer: {
        position: "Frontend Developer Intern",
        department: "Engineering",
        stipend: "15000",
        domain: "web-development",
      },
      designer: {
        position: "UI/UX Design Intern",
        department: "Design",
        stipend: "12000",
        domain: "ui-ux-design",
      },
      marketing: {
        position: "Digital Marketing Intern",
        department: "Marketing",
        stipend: "10000",
        domain: "digital-marketing",
      },
      data: {
        position: "Data Science Intern",
        department: "Data",
        stipend: "18000",
        domain: "data-science",
      },
      hr: {
        position: "HR Intern",
        department: "Human Resources",
        stipend: "10000",
        domain: "hr",
      },
    };

    const selected = templates[template];
    setDetails((prev) => ({
      ...prev,
      position: selected.position,
      department: selected.department,
      stipend: selected.stipend,
      internshipDomain: selected.domain,
      startDate: today.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      issueDate: today.toISOString().split("T")[0],
      offerValidity: validityDate.toISOString().split("T")[0],
      offerNumber: getNextOfferNumber(),
    }));
    setSaveMessage({ type: "info", text: `${template.charAt(0).toUpperCase() + template.slice(1)} template loaded` });
    setTimeout(() => setSaveMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 p-4 sm:p-6 md:p-8 font-sans text-slate-800">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-6 print:hidden">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg border border-slate-200/60 flex flex-wrap gap-4 justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-blue-900 text-white p-2.5 rounded-xl shadow-lg shadow-blue-200">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-blue-900">Internship Offer Generator</h1>
              <p className="text-sm text-slate-500">Create professional internship offer letters instantly</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={fillSampleData}
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium px-4 py-2 rounded-xl border border-emerald-200 text-sm flex items-center gap-2 transition-all"
            >
              <GraduationCap className="w-4 h-4" /> Sample Data
            </button>

            <button
              onClick={resetToDefaults}
              className="bg-white hover:bg-slate-50 text-slate-700 font-medium px-4 py-2 rounded-xl border border-slate-200 text-sm flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
            >
              <RefreshCw className="w-4 h-4" /> Reset
            </button>

            <button
              onClick={() => window.print()}
              className="bg-white hover:bg-slate-50 text-slate-700 font-medium px-4 py-2 rounded-xl border border-slate-200 text-sm flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
            >
              <Printer className="w-4 h-4" /> Print
            </button>

            {isClient && (
              <PDFDownloadLink
                document={<InternshipOfferPDF details={details} />}
                fileName={`Internship_Offer_${details.internName || "Candidate"}_${
                  details.offerNumber || "Draft"
                }.pdf`}
                className={`bg-blue-900 hover:bg-blue-800 text-white font-medium px-5 py-2 rounded-xl text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-200 hover:shadow-xl ${
                  !details.internName || !details.position ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => {
                  if (!validateForm()) {
                    return false;
                  }
                }}
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

        {/* Save message */}
        {saveMessage && (
          <div className={`mt-3 px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium transition-all ${
            saveMessage.type === "success" 
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
              : saveMessage.type === "error"
              ? "bg-red-50 text-red-700 border border-red-200"
              : "bg-blue-50 text-blue-700 border border-blue-200"
          }`}>
            {saveMessage.type === "success" ? <CheckCircle className="w-4 h-4" /> : 
             saveMessage.type === "error" ? <AlertCircle className="w-4 h-4" /> :
             <AlertCircle className="w-4 h-4" />}
            {saveMessage.text}
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Sidebar */}
        <section className="lg:col-span-5 print:hidden space-y-4 max-h-[85vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-slate-100">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/60 space-y-3">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex-1 py-2 px-3 rounded-xl text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center gap-1.5 transition-all"
              >
                {showPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {showPreview ? "Hide Preview" : "Show Preview"}
              </button>
              <button
                onClick={() => {
                  const newRef = getNextOfferNumber();
                  setDetails((prev) => ({ ...prev, offerNumber: newRef }));
                  setSaveMessage({ type: "success", text: `New offer number generated: ${newRef}` });
                  setTimeout(() => setSaveMessage(null), 3000);
                }}
                className="flex-1 py-2 px-3 rounded-xl text-xs font-medium bg-slate-50 text-slate-600 hover:bg-slate-100 flex items-center justify-center gap-1.5 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" /> New Offer #
              </button>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => fillTemplate("developer")}
                className="flex-1 py-1.5 px-2 rounded-lg text-xs font-medium bg-purple-50 text-purple-600 hover:bg-purple-100 transition-all"
              >
                💻 Developer
              </button>
              <button
                onClick={() => fillTemplate("designer")}
                className="flex-1 py-1.5 px-2 rounded-lg text-xs font-medium bg-pink-50 text-pink-600 hover:bg-pink-100 transition-all"
              >
                🎨 Designer
              </button>
              <button
                onClick={() => fillTemplate("marketing")}
                className="flex-1 py-1.5 px-2 rounded-lg text-xs font-medium bg-orange-50 text-orange-600 hover:bg-orange-100 transition-all"
              >
                📊 Marketing
              </button>
              <button
                onClick={() => fillTemplate("data")}
                className="flex-1 py-1.5 px-2 rounded-lg text-xs font-medium bg-cyan-50 text-cyan-600 hover:bg-cyan-100 transition-all"
              >
                📈 Data
              </button>
              <button
                onClick={() => fillTemplate("hr")}
                className="flex-1 py-1.5 px-2 rounded-lg text-xs font-medium bg-green-50 text-green-600 hover:bg-green-100 transition-all"
              >
                👥 HR
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
            <div className="flex border-b border-slate-200">
              <button
                onClick={() => setActiveTab("basic")}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-all ${
                  activeTab === "basic"
                    ? "bg-blue-50 text-blue-700 border-b-2 border-blue-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <User className="w-4 h-4 inline mr-2" />
                Basic
              </button>
              <button
                onClick={() => setActiveTab("work")}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-all ${
                  activeTab === "work"
                    ? "bg-blue-50 text-blue-700 border-b-2 border-blue-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Briefcase className="w-4 h-4 inline mr-2" />
                Work
              </button>
              <button
                onClick={() => setActiveTab("additional")}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-all ${
                  activeTab === "additional"
                    ? "bg-blue-50 text-blue-700 border-b-2 border-blue-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Clock className="w-4 h-4 inline mr-2" />
                More
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Basic Tab */}
              {activeTab === "basic" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Intern Full Name *</label>
                    <input
                      type="text"
                      name="internName"
                      value={details.internName}
                      onChange={handleChange}
                      placeholder="e.g., John Doe"
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
                      <input
                        type="email"
                        name="internEmail"
                        value={details.internEmail}
                        onChange={handleChange}
                        placeholder="email@example.com"
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Phone</label>
                      <input
                        type="text"
                        name="internPhone"
                        value={details.internPhone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Internship Domain *</label>
                    <select
                      name="internshipDomain"
                      value={details.internshipDomain}
                      onChange={(e) => {
                        handleDomainChange(e.target.value);
                      }}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select Domain</option>
                      {INTERNSHIP_DOMAINS.map((domain) => (
                        <option key={domain.value} value={domain.value}>
                          {domain.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Position *</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="position"
                        value={details.position}
                        onChange={handleChange}
                        placeholder="e.g., Frontend Developer Intern"
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        list="position-suggestions"
                      />
                      <datalist id="position-suggestions">
                        {details.internshipDomain && POSITION_SUGGESTIONS[details.internshipDomain]?.map((pos) => (
                          <option key={pos} value={pos} />
                        ))}
                      </datalist>
                      {details.internshipDomain && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {POSITION_SUGGESTIONS[details.internshipDomain]?.slice(0, 3).map((pos) => (
                            <button
                              key={pos}
                              onClick={() => setDetails(prev => ({ ...prev, position: pos }))}
                              className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-all"
                            >
                              {pos}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Department</label>
                    <input
                      type="text"
                      name="department"
                      value={details.department}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      readOnly={!!details.internshipDomain}
                    />
                  </div>
                </>
              )}

              {/* Work Tab */}
              {activeTab === "work" && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Start Date *</label>
                      <input
                        type="date"
                        name="startDate"
                        value={details.startDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">End Date *</label>
                      <input
                        type="date"
                        name="endDate"
                        value={details.endDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    Duration: <span className="font-semibold text-slate-700">{details.duration || "Select dates to calculate"}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Stipend</label>
                      <input
                        type="text"
                        name="stipend"
                        value={details.stipend}
                        onChange={handleChange}
                        placeholder="15000"
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Currency</label>
                      <select
                        name="stipendCurrency"
                        value={details.stipendCurrency}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="₹">₹ (INR)</option>
                        <option value="$">$ (USD)</option>
                        <option value="€">€ (EUR)</option>
                        <option value="£">£ (GBP)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Frequency</label>
                      <select
                        name="stipendFrequency"
                        value={details.stipendFrequency}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="monthly">Monthly</option>
                        <option value="weekly">Weekly</option>
                        <option value="hourly">Hourly</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Work Mode</label>
                      <select
                        name="workMode"
                        value={details.workMode}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="onsite">🏢 Onsite</option>
                        <option value="remote">🏠 Remote</option>
                        <option value="hybrid">🔄 Hybrid</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Working Hours</label>
                      <input
                        type="text"
                        name="workingHours"
                        value={details.workingHours}
                        onChange={handleChange}
                        placeholder="40 hours/week"
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Reporting To</label>
                      <input
                        type="text"
                        name="reportingTo"
                        value={details.reportingTo}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Reporting Title</label>
                      <input
                        type="text"
                        name="reportingTitle"
                        value={details.reportingTitle}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Additional Tab */}
              {activeTab === "additional" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Offer Validity Date *</label>
                    <input
                      type="date"
                      name="offerValidity"
                      value={details.offerValidity}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Issue Date</label>
                    <input
                      type="date"
                      name="issueDate"
                      value={details.issueDate}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Custom Message</label>
                    <textarea
                      name="customMessage"
                      rows={3}
                      value={details.customMessage}
                      onChange={handleChange}
                      placeholder="Add a personalized message to the intern..."
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Joining Instructions</label>
                    <textarea
                      name="joiningInstructions"
                      rows={3}
                      value={details.joiningInstructions}
                      onChange={handleChange}
                      placeholder="Instructions for the intern on joining day..."
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Live Preview */}
        <section className={`lg:col-span-7 flex justify-center transition-all duration-300 ${!showPreview ? "opacity-50 scale-95 pointer-events-none" : ""}`}>
          <div className="w-full overflow-x-auto">
            <div
              id="printable-area"
              className="w-[210mm] min-h-[297mm] bg-white p-10 rounded-2xl shadow-xl border border-slate-200 mx-auto text-slate-900 relative"
              style={{
                fontSize: '9pt',
                lineHeight: 1.6,
                fontFamily: 'Georgia, "Times New Roman", serif',
              }}
            >
              <div className="flex flex-col h-full relative">
                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                  <span className="text-7xl font-bold text-blue-900 transform -rotate-30">DREAM HOMES</span>
                </div>

                {/* Header */}
                <div className="flex justify-between items-center border-b-3 pb-3 mb-4" style={{ borderBottomColor: "#1E3A8A" }}>
                  <img
                    src={DEFAULT_LOGO_URL}
                    alt="Logo"
                    className="h-14 w-14 object-contain"
                    onError={(e) => (e.target as HTMLImageElement).style.display = "none"}
                  />
                  <div className="text-right">
                    <h1 className="text-xl font-bold uppercase tracking-wide text-slate-800">
                      {details.companyName}
                    </h1>
                    <p className="text-[8px] font-mono text-slate-500">Offer No: {details.offerNumber || "Not assigned"}</p>
                    <p className="text-[8px] text-slate-500">Date: {formatDate(details.issueDate) || "Not set"}</p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold uppercase text-center tracking-widest mb-4 text-blue-900">
                  Internship Offer Letter
                </h2>

                <div className="flex-1">
                  <p className="mb-3">
                    <strong className="text-slate-800">Dear {details.internName || "[Intern Name]"},</strong>
                  </p>

                  <p className="mb-3 text-justify">
                    We are delighted to offer you the position of <strong className="text-slate-800">{details.position || "[Position]"}</strong> at {details.companyName}.
                    We were impressed with your qualifications and believe your skills will make a valuable contribution to our team.
                  </p>

                  {details.customMessage && (
                    <p className="mb-3 text-justify">{details.customMessage}</p>
                  )}

                  {/* Offer Details Table */}
                  <div className="my-4 border border-slate-200 rounded overflow-hidden">
                    <div className="grid grid-cols-2 border-b border-slate-200">
                      <div className="p-2.5 bg-slate-50 font-bold text-sm">Domain</div>
                      <div className="p-2.5 text-sm">
                        {details.internshipDomain ? INTERNSHIP_DOMAINS.find(d => d.value === details.internshipDomain)?.label || details.internshipDomain : "Not set"}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 border-b border-slate-200">
                      <div className="p-2.5 bg-slate-50 font-bold text-sm">Start Date</div>
                      <div className="p-2.5 text-sm">{formatDate(details.startDate) || "Not set"}</div>
                    </div>
                    <div className="grid grid-cols-2 border-b border-slate-200">
                      <div className="p-2.5 bg-slate-50 font-bold text-sm">Duration</div>
                      <div className="p-2.5 text-sm">{details.duration || "Not calculated"}</div>
                    </div>
                    <div className="grid grid-cols-2 border-b border-slate-200">
                      <div className="p-2.5 bg-slate-50 font-bold text-sm">Stipend</div>
                      <div className="p-2.5 text-sm">{details.stipendCurrency} {details.stipend || "0"} / {details.stipendFrequency}</div>
                    </div>
                    <div className="grid grid-cols-2 border-b border-slate-200">
                      <div className="p-2.5 bg-slate-50 font-bold text-sm">Department</div>
                      <div className="p-2.5 text-sm">{details.department || "Not set"}</div>
                    </div>
                    <div className="grid grid-cols-2 border-b border-slate-200">
                      <div className="p-2.5 bg-slate-50 font-bold text-sm">Reporting To</div>
                      <div className="p-2.5 text-sm">{details.reportingTo} ({details.reportingTitle})</div>
                    </div>
                    <div className="grid grid-cols-2 border-b border-slate-200">
                      <div className="p-2.5 bg-slate-50 font-bold text-sm">Work Mode</div>
                      <div className="p-2.5 text-sm">{details.workMode.toUpperCase()}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="p-2.5 bg-slate-50 font-bold text-sm">Working Hours</div>
                      <div className="p-2.5 text-sm">{details.workingHours}</div>
                    </div>
                  </div>

                  {details.joiningInstructions && (
                    <p className="mb-3 text-justify">
                      <strong>📋 Joining Instructions: </strong>
                      {details.joiningInstructions}
                    </p>
                  )}

                  <p className="mb-3 text-justify">
                    Please review this offer and confirm your acceptance by signing and returning a copy of this letter by{' '}
                    <strong className="text-slate-800">{formatDate(details.offerValidity) || "Not set"}</strong>.
                  </p>

                  <p className="mb-4 text-justify">
                    We look forward to welcoming you to our team and wish you a rewarding experience with us.
                  </p>

                  {/* Acceptance Block */}
                  <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200 text-center">
                    <p className="text-sm font-bold text-slate-800">Accepted By</p>
                    <p className="text-sm mt-1">{details.internName || "[Intern Name]"}</p>
                    <div className="w-3/5 mx-auto border-b border-slate-400 my-2" />
                    <p className="text-sm text-slate-600">Signature: ___________________ &nbsp;&nbsp; Date: ___________________</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t flex justify-between items-end mt-4" style={{ borderTopColor: "#1E3A8A" }}>
                  <div>
                    <img
                      src={DEFAULT_AUTHORIZED_SIGNATURE_URL}
                      alt="Signature"
                      className="h-14 object-contain mb-1"
                      onError={(e) => (e.target as HTMLImageElement).style.display = "none"}
                    />
                    <div className="w-48 border-b border-slate-400 mb-1" />
                    <p className="font-bold text-sm text-slate-800">{details.authorizedName}</p>
                    <p className="text-xs text-slate-600">{details.authorizedTitle}, {details.companyName}</p>
                  </div>

                  <div className="text-right text-[8px] text-slate-400">
                    {details.companyAddress && <p>{details.companyAddress}</p>}
                    {details.companyWebsite && <p>{details.companyWebsite}</p>}
                    {details.authorizedPhone && <p>📞 {details.authorizedPhone}</p>}
                  </div>
                </div>

                {/* Seal */}
                <div className="absolute bottom-20 right-12 opacity-70">
                  <img
                    src={DEFAULT_SEAL_URL}
                    alt="Seal"
                    className="h-16 w-16 object-contain"
                    onError={(e) => (e.target as HTMLImageElement).style.display = "none"}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        @media print {
          .print\\:hidden { display: none !important; }
          body { background: white !important; padding: 0 !important; margin: 0 !important; }
          #printable-area { 
            box-shadow: none !important; 
            border: none !important; 
            border-radius: 0 !important; 
            margin: 0 !important; 
            padding: 0.8cm !important; 
            width: 100% !important; 
            min-height: 100vh !important;
          }
          .lg\\:col-span-7 { max-width: 100% !important; flex: 1 !important; }
          .lg\\:col-span-5 { display: none !important; }
        }
        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 8px; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #93a3d0; border-radius: 8px; }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover { background: #6b7fc0; }
        .border-3 { border-width: 3px; }
      `}</style>
    </div>
  );
}