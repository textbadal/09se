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
  Award,
  Palette,
  Calendar,
  Briefcase,
  Sparkles,
} from "lucide-react";
import QRCode from "react-qr-code";
import QRCodeLib from "qrcode";

const FIXED_COMPANY_NAME = "Dream Homes Bihar";
const FIXED_LOGO_URL = "/fevicon.png";
const FIXED_HR_NAME = "Sumit Singh";
const FIXED_HR_TITLE = "HR Manager";
const FIXED_HR_SIGNATURE_URL = "/sumit_singh.png";

 type ThemeVariant = "modern" | "classic" | "luxury";

 interface DomainTemplate {
  id: string;
  label: string;
  defaultRole: string;
  description: string;
  highlights: string;
}

// Popular Industry Domains with Tailored Content Templates
 const DOMAIN_TEMPLATES: Record<string, DomainTemplate> = {
  software_engineering: {
    id: "software_engineering",
    label: "Software Engineering & Web Dev",
    defaultRole: "Full Stack Web Developer Intern",
    description:
      "contributed directly to frontend and backend architectural tasks, shipping clean code, optimizing API endpoints, and implementing responsive UI features.",
    highlights:
      "Demonstrated strong proficiency in modern JavaScript/TypeScript, RESTful services, version control with Git, and collaborative Agile workflows.",
  },
  data_science: {
    id: "data_science",
    label: "Data Science & Analytics",
    defaultRole: "Data Analyst Intern",
    description:
      "analyzed complex datasets, constructed automated reporting dashboards, and built predictive statistical models to extract actionable business insights.",
    highlights:
      "Showcased expertise in Python, SQL, data visualization tools, and statistical analysis while maintaining high standards for data accuracy.",
  },
  ui_ux_design: {
    id: "ui_ux_design",
    label: "UI/UX & Product Design",
    defaultRole: "UI/UX Product Design Intern",
    description:
      "crafted intuitive user journeys, wireframes, high-fidelity UI prototypes, and user research surveys to enhance total platform accessibility and user engagement.",
    highlights:
      "Exhibited deep understanding of design systems, accessibility standards (WCAG), usability testing, and interactive prototyping in Figma.",
  },
  digital_marketing: {
    id: "digital_marketing",
    label: "Digital Marketing & Growth",
    defaultRole: "Digital Marketing Specialist Intern",
    description:
      "executed multi-channel digital campaigns, managed social media assets, optimized SEO copy, and analyzed audience acquisition funnels.",
    highlights:
      "Achieved measurable growth in user engagement, mastering campaign analytics, content strategy, and target audience segmentation.",
  },
  civil_engineering: {
    id: "civil_engineering",
    label: "Civil & Structural Engineering",
    defaultRole: "Site & Structural Design Intern",
    description:
      "assisted in architectural blueprint revisions, structural drafting, site measurement verifications, and compliance monitoring with safety regulations.",
    highlights:
      "Applied solid fundamentals in CAD drafting, structural analysis, site supervision, and material cost estimation.",
  },
  business_development: {
    id: "business_development",
    label: "Business Development & Sales",
    defaultRole: "Business Development Intern",
    description:
      "conducted market landscape research, identified client leads, formulated sales outreach pipelines, and participated in strategic client pitch presentations.",
    highlights:
      "Demonstrated strong negotiation tactics, client relationship management, deal pipeline tracking, and consultative communication skills.",
  },
  content_writing: {
    id: "content_writing",
    label: "Content Writing & Communications",
    defaultRole: "Content Strategist & Writer Intern",
    description:
      "authored high-impact articles, promotional copy, press releases, and technical documentation while upholding strict brand tone guidelines.",
    highlights:
      "Delivered engaging narrative content, SEO-friendly messaging, meticulous editing, and audience-focused communication strategy.",
  },
  human_resources: {
    id: "human_resources",
    label: "Human Resources & Talent Acquisition",
    defaultRole: "Human Resources Specialist Intern",
    description:
      "facilitated end-to-end recruitment pipelines, candidate screening, onboarding workflows, and internal employee engagement initiatives.",
    highlights:
      "Maintained exemplary confidentiality, professional communication, policy awareness, and organized HR administrative management.",
  },
  finance_accounting: {
    id: "finance_accounting",
    label: "Finance & Financial Analysis",
    defaultRole: "Financial Analyst Intern",
    description:
      "conducted financial forecasting, balance sheet auditing support, expense tracking, and variance analysis reports.",
    highlights:
      "Exhibited precision in quantitative modeling, financial statement interpretation, budget preparation, and spreadsheet analytics.",
  },
  graphic_design: {
    id: "graphic_design",
    label: "Graphic Design & Branding",
    defaultRole: "Brand & Graphic Designer Intern",
    description:
      "created compelling promotional graphics, brand collateral, presentation decks, and visual marketing assets.",
    highlights:
      "Mastered composition, visual storytelling, brand color theory, typography hierarchy, and creative software suites.",
  },
  cyber_security: {
    id: "cyber_security",
    label: "Cybersecurity & IT Operations",
    defaultRole: "Cybersecurity Associate Intern",
    description:
      "assisted with vulnerability assessments, system security audit logs, incident response documentation, and network monitoring.",
    highlights:
      "Displayed thorough understanding of network security protocols, threat mitigation techniques, and compliance standards.",
  },
  project_management: {
    id: "project_management",
    label: "Project Management",
    defaultRole: "Associate Project Manager Intern",
    description:
      "coordinated cross-functional team deliverables, tracked milestone schedules, updated sprint boards, and documented project scope changes.",
    highlights:
      "Proven capability in risk identification, timeline planning, stakeholder updates, and organized execution management.",
  },
};

interface CertificateDetails {
  candidateName: string;
  domainKey: string;
  role: string;
  startDate: string;
  endDate: string;
  duration: string;
  issueDate: string;
  referenceNumber: string;
  companyName: string;
  managerName: string;
  managerTitle: string;
  performance: string;
  theme: ThemeVariant;
  domainDescription: string;
  domainHighlights: string;
}

// Utility: Auto-calculate duration between dates
const calculateDuration = (startStr: string, endStr: string): string => {
  if (!startStr || !endStr) return "";
  const start = new Date(startStr);
  const end = new Date(endStr);
  if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) return "";

  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const months = Math.floor(diffDays / 30);
  const remainingDays = diffDays % 30;

  if (months === 0) return `${diffDays} Days`;
  if (remainingDays === 0) return `${months} Month${months > 1 ? "s" : ""}`;
  return `${months} Month${months > 1 ? "s" : ""}, ${remainingDays} Day${
    remainingDays > 1 ? "s" : ""
  }`;
};

// Sequential Reference Number Generator
const getNextCertReferenceNumber = (): string => {
  if (typeof window === "undefined") return "CERT-2026-0001";
  const year = new Date().getFullYear();
  const storageKey = `cert_ref_counter_${year}`;
  const counter = parseInt(localStorage.getItem(storageKey) || "0", 10) + 1;
  localStorage.setItem(storageKey, counter.toString());
  return `CERT-${year}-${String(counter).padStart(4, "0")}`;
};

// Theme Color Palettes for PDF
const pdfThemeStyles = {
  modern: { primary: "#4F46E5", border: "#6366F1", text: "#0F172A", bg: "#FFFFFF" },
  classic: { primary: "#1E3A8A", border: "#1E3A8A", text: "#1E293B", bg: "#F8FAFC" },
  luxury: { primary: "#D97706", border: "#B45309", text: "#111827", bg: "#FFFDF5" },
};

// PDF Stylesheet Generator
const createPdfStyles = (theme: ThemeVariant) => {
  const colors = pdfThemeStyles[theme] || pdfThemeStyles.modern;
  return StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: "Helvetica",
      backgroundColor: colors.bg,
    },
    outerBorder: {
      borderWidth: 3,
      borderColor: colors.border,
      height: "100%",
      padding: 15,
    },
    innerBorder: {
      borderWidth: 1,
      borderColor: colors.primary,
      height: "100%",
      padding: 20,
      flexDirection: "column",
      justify: "space-between",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: "#E2E8F0",
      paddingBottom: 10,
    },
    logo: {
      width: 50,
      height: 50,
    },
    headerCenter: {
      textAlign: "center",
      alignItems: "center",
    },
    companyTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      textTransform: "uppercase",
    },
    certTitle: {
      fontSize: 22,
      fontWeight: "bold",
      color: colors.primary,
      textTransform: "uppercase",
      letterSpacing: 2,
      marginTop: 2,
    },
    subTitle: {
      fontSize: 9,
      color: "#64748B",
      marginTop: 2,
      textTransform: "uppercase",
      letterSpacing: 1.5,
    },
    refBlock: {
      alignItems: "flex-end",
    },
    refText: {
      fontSize: 8,
      color: "#64748B",
    },
    body: {
      textAlign: "center",
      marginVertical: 10,
      alignItems: "center",
    },
    presentsText: {
      fontSize: 11,
      color: "#64748B",
      fontStyle: "italic",
      marginBottom: 4,
    },
    candidateName: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      textDecoration: "underline",
      marginVertical: 4,
    },
    certDescription: {
      fontSize: 10,
      lineHeight: 1.6,
      color: "#334155",
      textAlign: "center",
      maxWidth: "92%",
      marginTop: 6,
    },
    highlightBox: {
      marginTop: 8,
      padding: 8,
      backgroundColor: "#F1F5F9",
      borderRadius: 4,
      maxWidth: "92%",
    },
    highlightText: {
      fontSize: 9,
      color: "#334155",
      fontStyle: "italic",
      textAlign: "center",
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      borderTopWidth: 1,
      borderTopColor: "#E2E8F0",
      paddingTop: 10,
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
      borderBottomColor: "#94A3B8",
      width: "100%",
      marginBottom: 4,
    },
    signName: {
      fontSize: 10,
      fontWeight: "bold",
      color: colors.text,
    },
    signTitle: {
      fontSize: 8,
      color: "#64748B",
    },
    qrBlock: {
      width: "25%",
      alignItems: "center",
    },
    qrImg: {
      width: 50,
      height: 50,
    },
    qrText: {
      fontSize: 7,
      color: "#94A3B8",
      marginTop: 3,
    },
  });
};

// PDF Document Renderer
const CertificatePDF = ({
  details,
  qrDataUrl,
}: {
  details: CertificateDetails;
  qrDataUrl: string;
}) => {
  const styles = createPdfStyles(details.theme);
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.outerBorder}>
          <View style={styles.innerBorder}>
            {/* Header */}
            <View style={styles.header}>
              <PdfImage src={FIXED_LOGO_URL} style={styles.logo} />
              <View style={styles.headerCenter}>
                <Text style={styles.companyTitle}>{details.companyName}</Text>
                <Text style={styles.certTitle}>Certificate of Completion</Text>
                <Text style={styles.subTitle}>Internship Program</Text>
              </View>
              <View style={styles.refBlock}>
                <Text style={styles.refText}>Ref: {details.referenceNumber}</Text>
                <Text style={[styles.refText, { marginTop: 2 }]}>Date: {details.issueDate}</Text>
              </View>
            </View>

            {/* Body */}
            <View style={styles.body}>
              <Text style={styles.presentsText}>This is proudly presented to</Text>
              <Text style={styles.candidateName}>{details.candidateName}</Text>
              <Text style={styles.certDescription}>
                for successfully completing an internship as a{" "}
                <Text style={{ fontWeight: "bold" }}>{details.role}</Text> at{" "}
                <Text style={{ fontWeight: "bold" }}>{details.companyName}</Text> from{" "}
                {details.startDate} to {details.endDate}{" "}
                {details.duration ? `(${details.duration})` : ""}. During this tenure, they{" "}
                {details.domainDescription}
                {"\n\n"}
                Their overall performance was rated as{" "}
                <Text style={{ fontWeight: "bold" }}>{details.performance}</Text>, demonstrating strong
                dedication, professional initiative, and technical capability.
              </Text>

              {details.domainHighlights && (
                <View style={styles.highlightBox}>
                  <Text style={styles.highlightText}>
                    Key Highlights: {details.domainHighlights}
                  </Text>
                </View>
              )}
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <View style={styles.signBlock}>
                <PdfImage src={FIXED_HR_SIGNATURE_URL} style={styles.signatureImg} />
                <View style={styles.signLine} />
                <Text style={styles.signName}>{details.managerName}</Text>
                <Text style={styles.signTitle}>
                  {details.managerTitle}, {details.companyName}
                </Text>
              </View>

              <View style={styles.qrBlock}>
                {qrDataUrl && <PdfImage src={qrDataUrl} style={styles.qrImg} />}
                <Text style={styles.qrText}>Scan to Verify Authenticity</Text>
              </View>

              <View style={styles.signBlock}>
                <View style={{ height: 45, justifyContent: "center", alignItems: "center" }}>
                  <Text style={{ fontSize: 10, fontWeight: "bold", color: "#0F172A" }}>
                    {details.issueDate}
                  </Text>
                </View>
                <View style={styles.signLine} />
                <Text style={styles.signName}>Date of Issuance</Text>
                <Text style={styles.signTitle}>Official Authority</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default function CertificateGeneratorPage() {
  const [isClient, setIsClient] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  const defaultDomain = DOMAIN_TEMPLATES.software_engineering;

  const [details, setDetails] = useState<CertificateDetails>({
    candidateName: "Alex Morgan",
    domainKey: defaultDomain.id,
    role: defaultDomain.defaultRole,
    startDate: "2026-06-01",
    endDate: "2026-08-31",
    duration: "3 Months",
    issueDate: new Date().toISOString().split("T")[0],
    referenceNumber: "",
    companyName: FIXED_COMPANY_NAME,
    managerName: FIXED_HR_NAME,
    managerTitle: FIXED_HR_TITLE,
    performance: "Outstanding",
    theme: "modern",
    domainDescription: defaultDomain.description,
    domainHighlights: defaultDomain.highlights,
  });

  useEffect(() => {
    setIsClient(true);
    setDetails((prev) => ({ ...prev, referenceNumber: getNextCertReferenceNumber() }));
  }, []);

  // Recalculate duration automatically on date changes
  useEffect(() => {
    if (details.startDate && details.endDate) {
      const computedDuration = calculateDuration(details.startDate, details.endDate);
      if (computedDuration) {
        setDetails((prev) => ({ ...prev, duration: computedDuration }));
      }
    }
  }, [details.startDate, details.endDate]);

  // Handle Domain Switch
  const handleDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value;
    const template = DOMAIN_TEMPLATES[key];
    if (template) {
      setDetails((prev) => ({
        ...prev,
        domainKey: key,
        role: template.defaultRole,
        domainDescription: template.description,
        domainHighlights: template.highlights,
      }));
    }
  };

  // QR Code Payload
  const qrVerificationText = useMemo(() => {
    return `Certificate Ref: ${details.referenceNumber} | Candidate: ${details.candidateName} | Role: ${details.role} | Issued By: ${FIXED_COMPANY_NAME}`;
  }, [details.referenceNumber, details.candidateName, details.role]);

  useEffect(() => {
    if (details.referenceNumber) {
      QRCodeLib.toDataURL(qrVerificationText, { margin: 1, width: 120 })
        .then(setQrDataUrl)
        .catch(console.error);
    }
  }, [qrVerificationText, details.referenceNumber]);

  const handleAutoGenerateRef = () => {
    setDetails((prev) => ({ ...prev, referenceNumber: getNextCertReferenceNumber() }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const themeClasses = {
    modern: {
      border: "border-indigo-600",
      title: "text-indigo-600",
      accent: "bg-indigo-50 text-indigo-700",
    },
    classic: {
      border: "border-blue-900",
      title: "text-blue-900",
      accent: "bg-blue-50 text-blue-900",
    },
    luxury: {
      border: "border-amber-600",
      title: "text-amber-600",
      accent: "bg-amber-50 text-amber-800",
    },
  }[details.theme];

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 md:p-8 font-sans text-slate-800">
      {/* Top Header Controls */}
      <header className="max-w-7xl mx-auto mb-6 print:hidden">
        <div className="bg-white rounded-xl px-6 py-4 shadow-sm border border-slate-200">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <span className="bg-indigo-600 text-white p-1.5 rounded-lg">
                  <Award className="w-5 h-5" />
                </span>
                Certificate Studio
              </h1>
              <p className="text-sm text-slate-500">
                Official Document Generator for{" "}
                <span className="font-semibold text-slate-700">{FIXED_COMPANY_NAME}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Theme Selector */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-medium">
                <Palette className="w-3.5 h-3.5 ml-2 text-slate-500" />
                {(["modern", "classic", "luxury"] as ThemeVariant[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setDetails((prev) => ({ ...prev, theme: t }))}
                    className={`px-3 py-1.5 rounded-md capitalize transition-all ${
                      details.theme === t
                        ? "bg-white text-slate-900 shadow-xs font-semibold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <button
                onClick={() => window.print()}
                className="bg-white hover:bg-slate-50 text-slate-700 font-medium px-4 py-2 rounded-lg border border-slate-300 text-sm flex items-center gap-2 transition-all shadow-xs"
              >
                <Printer className="w-4 h-4" /> Print
              </button>

              {isClient && (
                <PDFDownloadLink
                  document={<CertificatePDF details={details} qrDataUrl={qrDataUrl} />}
                  fileName={`Certificate_${details.candidateName.replace(/\s+/g, "_")}_${
                    details.referenceNumber || "Draft"
                  }.pdf`}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-lg text-sm flex items-center gap-2 transition-all shadow-sm"
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
        <section className="lg:col-span-4 print:hidden space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Edit className="w-5 h-5 text-indigo-600" /> Details & Parameters
            </h2>

            {/* Industry Domain Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-indigo-600" /> Industry Domain
              </label>
              <select
                name="domainKey"
                value={details.domainKey}
                onChange={handleDomainChange}
                className="w-full px-3 py-2 border border-indigo-200 rounded-lg text-sm bg-indigo-50/50 font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                {Object.values(DOMAIN_TEMPLATES).map((tmpl) => (
                  <option key={tmpl.id} value={tmpl.id}>
                    {tmpl.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Reference No.
                </label>
                <button
                  type="button"
                  onClick={handleAutoGenerateRef}
                  className="text-[11px] text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-medium"
                >
                  <RefreshCw className="w-3 h-3" /> New Ref
                </button>
              </div>
              <input
                type="text"
                name="referenceNumber"
                value={details.referenceNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Candidate Full Name
              </label>
              <input
                type="text"
                name="candidateName"
                value={details.candidateName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Internship Role Title
              </label>
              <input
                type="text"
                name="role"
                value={details.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={details.startDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={details.endDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" /> Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={details.duration}
                  onChange={handleChange}
                  placeholder="e.g. 3 Months"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  Issue Date
                </label>
                <input
                  type="date"
                  name="issueDate"
                  value={details.issueDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Performance Evaluation
              </label>
              <select
                name="performance"
                value={details.performance}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
              >
                <option value="Outstanding">Outstanding</option>
                <option value="Excellent">Excellent</option>
                <option value="Very Good">Very Good</option>
                <option value="Satisfactory">Satisfactory</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-600" /> Domain Copy / Work Description
              </label>
              <textarea
                name="domainDescription"
                rows={3}
                value={details.domainDescription}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs leading-relaxed focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Key Highlights / Skills
              </label>
              <textarea
                name="domainHighlights"
                rows={2}
                value={details.domainHighlights}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs leading-relaxed focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* Live Preview Display */}
        <section className="lg:col-span-8 flex justify-center">
          <div className="w-full overflow-x-auto">
            <div
              id="printable-area"
              className={`w-[297mm] h-[210mm] bg-white p-6 rounded-xl shadow-lg border-4 ${themeClasses.border} relative flex flex-col justify-between mx-auto`}
            >
              <div className="border border-slate-300 p-8 h-full flex flex-col justify-between">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-4 border-slate-200">
                  <img
                    src={FIXED_LOGO_URL}
                    alt="Logo"
                    className="h-16 w-16 object-contain"
                    onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                  />
                  <div className="text-center">
                    <h1 className="text-2xl font-bold tracking-wide text-slate-900 uppercase">
                      {details.companyName}
                    </h1>
                    <h2
                      className={`text-3xl font-extrabold uppercase tracking-widest mt-1 ${themeClasses.title}`}
                    >
                      Certificate of Completion
                    </h2>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
                      Internship Program
                    </p>
                  </div>
                  <div className="text-right text-xs text-slate-500">
                    <p className="font-mono">Ref: {details.referenceNumber}</p>
                    <p className="mt-1">Date: {details.issueDate}</p>
                  </div>
                </div>

                {/* Body Content */}
                <div className="text-center my-auto py-4">
                  <p className="text-sm italic text-slate-500 mb-1">This is proudly presented to</p>
                  <h3 className="text-4xl font-extrabold text-slate-900 underline underline-offset-8 my-3 font-serif">
                    {details.candidateName || "[Candidate Name]"}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-700 max-w-3xl mx-auto mt-4">
                    for successfully completing an internship as a{" "}
                    <strong className="text-slate-900 font-semibold">
                      {details.role || "[Role]"}
                    </strong>{" "}
                    at{" "}
                    <strong className="text-slate-900 font-semibold">{details.companyName}</strong>{" "}
                    from <span className="font-medium">{details.startDate}</span> to{" "}
                    <span className="font-medium">{details.endDate}</span>{" "}
                    {details.duration ? `(${details.duration})` : ""}. During this tenure, they{" "}
                    {details.domainDescription}
                  </p>
                  <p className="text-sm text-slate-600 mt-2">
                    Their overall performance was rated as{" "}
                    <strong className={`font-semibold ${themeClasses.title}`}>
                      {details.performance}
                    </strong>
                    , demonstrating strong dedication, professional initiative, and technical capability.
                  </p>

                  {details.domainHighlights && (
                    <div className="mt-4 p-3 bg-slate-50 rounded-lg max-w-2xl mx-auto border border-slate-200">
                      <p className="text-xs text-slate-600 italic">
                        <strong className="font-semibold text-slate-800 not-italic">
                          Key Highlights:
                        </strong>{" "}
                        {details.domainHighlights}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer / Signatures */}
                <div className="grid grid-cols-3 gap-6 items-end pt-4 border-t border-slate-200">
                  <div className="text-center">
                    <div className="h-16 flex items-center justify-center">
                      <img
                        src={FIXED_HR_SIGNATURE_URL}
                        alt="Signature"
                        className="h-14 max-w-[200px] object-contain"
                      />
                    </div>
                    <div className="w-full border-b border-slate-400 my-1"></div>
                    <p className="text-sm font-bold text-slate-900">{details.managerName}</p>
                    <p className="text-xs text-slate-500">
                      {details.managerTitle}, {details.companyName}
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    {isClient && (
                      <div className="p-1.5 bg-white border border-slate-200 rounded shadow-xs">
                        <QRCode value={qrVerificationText} size={60} />
                      </div>
                    )}
                    <span className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">
                      Scan to Verify
                    </span>
                  </div>

                  <div className="text-center">
                    <div className="h-16 flex items-center justify-center">
                      <span className="text-base font-bold text-slate-900">{details.issueDate}</span>
                    </div>
                    <div className="w-full border-b border-slate-400 my-1"></div>
                    <p className="text-sm font-bold text-slate-900">Date of Issuance</p>
                    <p className="text-xs text-slate-500">Authorized Signatory</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}