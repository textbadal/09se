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
  Briefcase,
  Calendar,
  Star,
} from "lucide-react";
import QRCode from "react-qr-code";
import QRCodeLib from "qrcode";

const FIXED_COMPANY_NAME = "Averiqo Technologies";
const FIXED_LOGO_URL = "/Averiqo Technologies logo.jpeg";
const FIXED_HR_NAME = "Shivam Singh";
const FIXED_HR_TITLE = "HR Manager";
const FIXED_HR_SIGNATURE_URL = "/Shivam singh signature.png";

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
    defaultRole: "Full Stack Web Developer",
    description:
      "demonstrated exceptional technical expertise in frontend and backend development, delivering high-quality code, optimizing system performance, and implementing scalable architectural solutions.",
    highlights:
      "Exhibited outstanding proficiency in modern JavaScript/TypeScript, RESTful services, version control with Git, and collaborative Agile workflows with a focus on code quality and best practices.",
  },
  data_science: {
    id: "data_science",
    label: "Data Science & Analytics",
    defaultRole: "Data Analyst",
    description:
      "demonstrated exceptional analytical capabilities in processing complex datasets, developing advanced predictive models, and delivering data-driven insights that significantly impacted business decision-making.",
    highlights:
      "Showcased outstanding expertise in Python, SQL, data visualization tools, and statistical analysis with remarkable attention to data accuracy and actionable intelligence.",
  },
  ui_ux_design: {
    id: "ui_ux_design",
    label: "UI/UX & Product Design",
    defaultRole: "UI/UX Product Designer",
    description:
      "demonstrated exceptional design excellence in crafting intuitive user experiences, innovative wireframes, high-fidelity prototypes, and user-centered design solutions that elevated platform usability.",
    highlights:
      "Exhibited outstanding mastery of design systems, accessibility standards (WCAG), usability testing methodologies, and interactive prototyping in Figma.",
  },
  digital_marketing: {
    id: "digital_marketing",
    label: "Digital Marketing & Growth",
    defaultRole: "Digital Marketing Specialist",
    description:
      "demonstrated exceptional strategic marketing capabilities in executing innovative multi-channel campaigns, driving significant user acquisition, and optimizing conversion funnels for measurable growth.",
    highlights:
      "Achieved outstanding results in user engagement, demonstrating mastery in campaign analytics, content strategy, and audience segmentation with proven ROI impact.",
  },
  civil_engineering: {
    id: "civil_engineering",
    label: "Civil & Structural Engineering",
    defaultRole: "Site & Structural Design Engineer",
    description:
      "demonstrated exceptional engineering excellence in architectural planning, structural analysis, and project execution with meticulous attention to safety standards and quality control.",
    highlights:
      "Exhibited outstanding proficiency in CAD drafting, structural analysis, site supervision, and material cost optimization with a commitment to engineering excellence.",
  },
  business_development: {
    id: "business_development",
    label: "Business Development & Sales",
    defaultRole: "Business Development Executive",
    description:
      "demonstrated exceptional business acumen in market analysis, strategic client acquisition, and revenue growth initiatives, consistently exceeding performance targets.",
    highlights:
      "Exhibited outstanding negotiation skills, client relationship management, deal pipeline optimization, and strategic communication with remarkable business impact.",
  },
  content_writing: {
    id: "content_writing",
    label: "Content Writing & Communications",
    defaultRole: "Content Strategist & Writer",
    description:
      "demonstrated exceptional writing excellence in creating compelling narratives, impactful marketing content, and thought leadership pieces that strengthened brand authority.",
    highlights:
      "Delivered outstanding narrative content with exceptional SEO optimization, meticulous editing, and audience-focused communication strategies.",
  },
  human_resources: {
    id: "human_resources",
    label: "Human Resources & Talent Acquisition",
    defaultRole: "Human Resources Specialist",
    description:
      "demonstrated exceptional HR expertise in talent acquisition, employee engagement, and organizational development, contributing significantly to workforce optimization.",
    highlights:
      "Exhibited outstanding professionalism in recruitment, onboarding, policy implementation, and employee relations with exceptional organizational skills.",
  },
  finance_accounting: {
    id: "finance_accounting",
    label: "Finance & Financial Analysis",
    defaultRole: "Financial Analyst",
    description:
      "demonstrated exceptional financial acumen in strategic planning, risk assessment, and performance analysis, delivering accurate insights that drove informed decision-making.",
    highlights:
      "Exhibited outstanding precision in quantitative modeling, financial forecasting, budget optimization, and strategic financial planning.",
  },
  graphic_design: {
    id: "graphic_design",
    label: "Graphic Design & Branding",
    defaultRole: "Brand & Graphic Designer",
    description:
      "demonstrated exceptional creative excellence in visual communication, brand identity development, and innovative design solutions that elevated brand presence.",
    highlights:
      "Exhibited outstanding creative vision, mastery of design principles, brand consistency, and professional design software with remarkable aesthetic sensibility.",
  },
  cyber_security: {
    id: "cyber_security",
    label: "Cybersecurity & IT Operations",
    defaultRole: "Cybersecurity Associate",
    description:
      "demonstrated exceptional security expertise in vulnerability assessment, threat mitigation, and security protocol implementation, ensuring robust system protection.",
    highlights:
      "Exhibited outstanding technical knowledge in network security, risk management, compliance standards, and incident response strategies.",
  },
  project_management: {
    id: "project_management",
    label: "Project Management",
    defaultRole: "Associate Project Manager",
    description:
      "demonstrated exceptional project leadership in coordinating cross-functional teams, delivering projects on time, and optimizing processes for maximum efficiency.",
    highlights:
      "Exhibited outstanding capability in risk management, stakeholder communication, resource optimization, and strategic project execution.",
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
  marks: string;
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

// PDF Stylesheet - Navy Blue & Gold Theme with Excellence Accent
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
  },
  outerBorder: {
    borderWidth: 4,
    borderColor: "#C9A84C",
    height: "100%",
    padding: 15,
    position: "relative",
    backgroundColor: "#FFFFFF",
  },
  goldAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 8,
    backgroundColor: "#C9A84C",
  },
  watermarkContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.05,
  },
  watermarkText: {
    fontSize: 80,
    color: "#C9A84C",
    fontWeight: "bold",
    transform: "rotate(-30deg)",
    letterSpacing: 10,
  },
  innerBorder: {
    borderWidth: 2,
    borderColor: "#1A2E5A",
    height: "100%",
    padding: 20,
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#C9A84C",
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
    color: "#1A2E5A",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  certTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#C9A84C",
    textTransform: "uppercase",
    letterSpacing: 4,
    marginTop: 2,
  },
  certSubtitle: {
    fontSize: 10,
    color: "#1A2E5A",
    marginTop: 2,
    textTransform: "uppercase",
    letterSpacing: 3,
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
  excellenceBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    gap: 8,
  },
  starIcon: {
    fontSize: 16,
    color: "#C9A84C",
  },
  excellenceText: {
    fontSize: 12,
    color: "#C9A84C",
    fontWeight: "bold",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  presentsText: {
    fontSize: 11,
    color: "#64748B",
    fontStyle: "italic",
    marginBottom: 4,
  },
  candidateName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1A2E5A",
    textDecoration: "underline",
    textDecorationColor: "#C9A84C",
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
    padding: 10,
    backgroundColor: "#FDF9F0",
    borderRadius: 4,
    maxWidth: "92%",
    borderWidth: 2,
    borderColor: "#C9A84C",
  },
  highlightText: {
    fontSize: 9,
    color: "#1A2E5A",
    fontStyle: "italic",
    textAlign: "center",
    fontWeight: "medium",
  },
  marksContainer: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 24,
    backgroundColor: "#FDF9F0",
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#C9A84C",
  },
  marksText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A2E5A",
  },
  marksValue: {
    color: "#C9A84C",
    fontSize: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderTopWidth: 2,
    borderTopColor: "#C9A84C",
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

// PDF Document Renderer
const CertificatePDF = ({
  details,
  qrDataUrl,
}: {
  details: CertificateDetails;
  qrDataUrl: string;
}) => {
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.outerBorder}>
          <View style={styles.goldAccent} />
          {/* Watermark */}
          <View style={styles.watermarkContainer}>
            <Text style={styles.watermarkText}>EXCELLENCE</Text>
          </View>
          
          <View style={styles.innerBorder}>
            {/* Header */}
            <View style={styles.header}>
              <PdfImage src={FIXED_LOGO_URL} style={styles.logo} />
              <View style={styles.headerCenter}>
                <Text style={styles.companyTitle}>{details.companyName}</Text>
                <Text style={styles.certTitle}>Certificate of Excellence</Text>
                <Text style={styles.certSubtitle}>Awarded for Outstanding Performance</Text>
              </View>
              <View style={styles.refBlock}>
                <Text style={styles.refText}>Ref: {details.referenceNumber}</Text>
                <Text style={[styles.refText, { marginTop: 2 }]}>Date: {details.issueDate}</Text>
              </View>
            </View>

            {/* Body */}
            <View style={styles.body}>
              <View style={styles.excellenceBadge}>
                <Text style={styles.starIcon}>★</Text>
                <Text style={styles.excellenceText}>Excellence Award</Text>
                <Text style={styles.starIcon}>★</Text>
              </View>
              <Text style={styles.presentsText}>This Certificate of Excellence is proudly presented to</Text>
              <Text style={styles.candidateName}>{details.candidateName}</Text>
              <Text style={styles.certDescription}>
                in recognition of outstanding performance and exceptional contributions as a{" "}
                <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>{details.role}</Text> at{" "}
                <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>{details.companyName}</Text>{" "}
                from {details.startDate} to {details.endDate}{" "}
                {details.duration ? `(${details.duration})` : ""}. During this tenure, they{" "}
                {details.domainDescription}
              </Text>

              {details.marks && (
                <View style={styles.marksContainer}>
                  <Text style={styles.marksText}>
                    Excellence Rating: <Text style={styles.marksValue}>{details.marks}/10</Text>
                  </Text>
                </View>
              )}

              {details.domainHighlights && (
                <View style={styles.highlightBox}>
                  <Text style={styles.highlightText}>
                    ⭐ Key Achievements: {details.domainHighlights}
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
                  <Text style={{ fontSize: 10, fontWeight: "bold", color: "#1A2E5A" }}>
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
    candidateName: "",
    domainKey: defaultDomain.id,
    role: defaultDomain.defaultRole,
    startDate: "",
    endDate: "",
    duration: "",
    issueDate: new Date().toISOString().split("T")[0],
    referenceNumber: "",
    companyName: FIXED_COMPANY_NAME,
    managerName: FIXED_HR_NAME,
    managerTitle: FIXED_HR_TITLE,
    marks: "",
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
    return `Certificate of Excellence Ref: ${details.referenceNumber} | Candidate: ${details.candidateName} | Role: ${details.role} | Rating: ${details.marks}/10 | Issued By: ${FIXED_COMPANY_NAME}`;
  }, [details.referenceNumber, details.candidateName, details.role, details.marks]);

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

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 md:p-8 font-sans text-slate-800">
      {/* Top Header Controls */}
      <header className="max-w-7xl mx-auto mb-6 print:hidden">
        <div className="bg-white rounded-xl px-6 py-4 shadow-sm border border-slate-200">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <span className="bg-[#C9A84C] text-white p-1.5 rounded-lg">
                  <Star className="w-5 h-5" />
                </span>
                Certificate of Excellence Studio
              </h1>
              <p className="text-sm text-slate-500">
                Distinguished Recognition Program for{" "}
                <span className="font-semibold text-slate-700">{FIXED_COMPANY_NAME}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => window.print()}
                className="bg-white hover:bg-slate-50 text-slate-700 font-medium px-4 py-2 rounded-lg border border-slate-300 text-sm flex items-center gap-2 transition-all shadow-xs"
              >
                <Printer className="w-4 h-4" /> Print
              </button>

              {isClient && (
                <PDFDownloadLink
                  document={<CertificatePDF details={details} qrDataUrl={qrDataUrl} />}
                  fileName={`Certificate_of_Excellence_${details.candidateName.replace(/\s+/g, "_") || "Draft"}_${
                    details.referenceNumber || "Draft"
                  }.pdf`}
                  className="bg-[#C9A84C] hover:bg-[#B8963A] text-white font-medium px-5 py-2 rounded-lg text-sm flex items-center gap-2 transition-all shadow-sm"
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
              <Edit className="w-5 h-5 text-[#C9A84C]" /> Award Details
            </h2>

            {/* Reference Number */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Reference Number
                </label>
                <button
                  type="button"
                  onClick={handleAutoGenerateRef}
                  className="text-[11px] text-[#C9A84C] hover:text-[#B8963A] flex items-center gap-1 font-medium"
                >
                  <RefreshCw className="w-3 h-3" /> Generate New
                </button>
              </div>
              <input
                type="text"
                name="referenceNumber"
                value={details.referenceNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-[#C9A84C] focus:outline-none"
              />
            </div>

            {/* Candidate Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Recipient Full Name *
              </label>
              <input
                type="text"
                name="candidateName"
                value={details.candidateName}
                onChange={handleChange}
                placeholder="Enter recipient's full name"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-[#C9A84C] focus:outline-none"
                required
              />
            </div>

            {/* Domain */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-[#C9A84C]" /> Domain
              </label>
              <select
                name="domainKey"
                value={details.domainKey}
                onChange={handleDomainChange}
                className="w-full px-3 py-2 border border-[#C9A84C] rounded-lg text-sm bg-[#FDF9F0] font-medium text-slate-800 focus:ring-2 focus:ring-[#C9A84C] focus:outline-none"
              >
                {Object.values(DOMAIN_TEMPLATES).map((tmpl) => (
                  <option key={tmpl.id} value={tmpl.id}>
                    {tmpl.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Start & End Date */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  <Calendar className="w-3 h-3 inline mr-1 text-slate-400" /> Start Date *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={details.startDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#C9A84C] focus:outline-none"
                  required
                />
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
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#C9A84C] focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Duration (Auto-calculated) */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Duration (Auto-calculated)
              </label>
              <input
                type="text"
                name="duration"
                value={details.duration}
                onChange={handleChange}
                placeholder="Will be auto-calculated"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-600"
                disabled
              />
            </div>

            {/* Marks */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Excellence Rating (out of 10) *
              </label>
              <input
                type="number"
                name="marks"
                value={details.marks}
                onChange={handleChange}
                placeholder="Enter rating (e.g., 9.5)"
                min="0"
                max="10"
                step="0.1"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#C9A84C] focus:outline-none"
                required
              />
            </div>

            {/* Info Note */}
            <div className="mt-4 p-3 bg-[#FDF9F0] rounded-lg border-2 border-[#C9A84C]">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4 text-[#C9A84C] fill-[#C9A84C]" />
                <p className="text-xs font-semibold text-[#1A2E5A]">Certificate of Excellence</p>
              </div>
              <p className="text-xs text-[#1A2E5A]">
                This prestigious award recognizes outstanding performance and exceptional contributions. 
                All fields marked with * are required.
              </p>
            </div>
          </div>
        </section>

        {/* Live Preview Display */}
        <section className="lg:col-span-8 flex justify-center">
          <div className="w-full overflow-x-auto">
            <div
              id="printable-area"
              className="w-[297mm] h-[210mm] bg-white p-6 rounded-xl shadow-lg border-4 border-[#C9A84C] relative flex flex-col justify-between mx-auto"
            >
              {/* Gold Accent Bar - Preview */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-[#C9A84C] rounded-t-xl"></div>
              
              {/* Watermark - Preview */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
                <div className="text-[80px] font-bold text-[#C9A84C] -rotate-[30deg] tracking-[10px] select-none">
                  EXCELLENCE
                </div>
              </div>

              <div className="border-2 border-[#1A2E5A] p-8 h-full flex flex-col justify-between relative mt-1">
                {/* Header */}
                <div className="flex justify-between items-center border-b-2 border-[#C9A84C] pb-4">
                  <img
                    src={FIXED_LOGO_URL}
                    alt="Logo"
                    className="h-16 w-16 object-contain"
                    onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                  />
                  <div className="text-center">
                    <h1 className="text-2xl font-bold tracking-wide text-[#1A2E5A] uppercase">
                      {details.companyName}
                    </h1>
                    <h2 className="text-3xl font-extrabold uppercase tracking-widest mt-1 text-[#C9A84C]">
                      Certificate of Excellence
                    </h2>
                    <p className="text-xs text-[#1A2E5A] uppercase tracking-widest mt-1">
                      Awarded for Outstanding Performance
                    </p>
                  </div>
                  <div className="text-right text-xs text-slate-500">
                    <p className="font-mono">Ref: {details.referenceNumber || "Not Set"}</p>
                    <p className="mt-1">Date: {details.issueDate}</p>
                  </div>
                </div>

                {/* Body Content */}
                <div className="text-center my-auto py-4">
                  {/* Excellence Badge */}
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-[#C9A84C] text-xl">★</span>
                    <span className="text-sm font-bold text-[#C9A84C] tracking-widest uppercase">
                      Excellence Award
                    </span>
                    <span className="text-[#C9A84C] text-xl">★</span>
                  </div>
                  
                  <p className="text-sm italic text-slate-500 mb-1">This Certificate of Excellence is proudly presented to</p>
                  <h3 className="text-4xl font-extrabold text-[#1A2E5A] underline underline-offset-8 my-3 font-serif decoration-[#C9A84C]">
                    {details.candidateName || "[Recipient Name]"}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-700 max-w-3xl mx-auto mt-4">
                    in recognition of outstanding performance and exceptional contributions as a{" "}
                    <strong className="text-[#1A2E5A] font-semibold">
                      {details.role || "[Role]"}
                    </strong>{" "}
                    at{" "}
                    <strong className="text-[#1A2E5A] font-semibold">{details.companyName}</strong>{" "}
                    from <span className="font-medium">{details.startDate || "[Start Date]"}</span> to{" "}
                    <span className="font-medium">{details.endDate || "[End Date]"}</span>{" "}
                    {details.duration ? `(${details.duration})` : ""}. During this tenure, they{" "}
                    {details.domainDescription}
                  </p>

                  {details.marks && (
                    <div className="mt-4 px-6 py-2 bg-[#FDF9F0] rounded-lg border-2 border-[#C9A84C] inline-block">
                      <p className="text-lg font-bold text-[#1A2E5A]">
                        Excellence Rating: <span className="text-[#C9A84C] text-2xl">{details.marks}/10</span>
                      </p>
                    </div>
                  )}

                  {details.domainHighlights && (
                    <div className="mt-4 p-3 bg-[#FDF9F0] rounded-lg max-w-2xl mx-auto border-2 border-[#C9A84C]">
                      <p className="text-xs text-[#1A2E5A] font-medium">
                        <span className="text-[#C9A84C] text-sm">⭐</span>{" "}
                        <strong className="font-semibold">Key Achievements:</strong>{" "}
                        {details.domainHighlights}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer / Signatures */}
                <div className="grid grid-cols-3 gap-6 items-end pt-4 border-t-2 border-[#C9A84C]">
                  <div className="text-center">
                    <div className="h-16 flex items-center justify-center">
                      <img
                        src={FIXED_HR_SIGNATURE_URL}
                        alt="Signature"
                        className="h-14 max-w-[200px] object-contain"
                      />
                    </div>
                    <div className="w-full border-b border-[#1A2E5A] my-1"></div>
                    <p className="text-sm font-bold text-[#1A2E5A]">{details.managerName}</p>
                    <p className="text-xs text-slate-500">
                      {details.managerTitle}, {details.companyName}
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    {isClient && (
                      <div className="p-1.5 bg-white border-2 border-[#C9A84C] rounded shadow-xs">
                        <QRCode value={qrVerificationText} size={60} />
                      </div>
                    )}
                    <span className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">
                      Scan to Verify
                    </span>
                  </div>

                  <div className="text-center">
                    <div className="h-16 flex items-center justify-center">
                      <span className="text-base font-bold text-[#1A2E5A]">{details.issueDate}</span>
                    </div>
                    <div className="w-full border-b border-[#1A2E5A] my-1"></div>
                    <p className="text-sm font-bold text-[#1A2E5A]">Date of Issuance</p>
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