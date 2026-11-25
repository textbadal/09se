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

// Official Brand Colors — Navy & Gold (Authoritative Palette)
const BRAND = {
  navy: "#0F2547",
  navyLight: "#1E3A5F",
  gold: "#B8860B",
  goldLight: "#D4AF37",
  goldSoft: "#F5EEDC",
  text: "#1E293B",
  textMuted: "#64748B",
  border: "#0F2547",
  bg: "#FFFFFF",
};

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
    label: "Business Development & Partnerships",
    defaultRole: "Business Development Intern",
    description:
      "conducted comprehensive market and competitor research, identified strategic partnership opportunities, mapped potential client accounts, and supported senior leadership in structuring outreach strategies and long-term growth roadmaps.",
    highlights:
      "Demonstrated strong analytical thinking, stakeholder communication, market intelligence gathering, partnership evaluation, and the ability to translate research into actionable business growth strategies.",
  },
  sales: {
    id: "sales",
    label: "Sales & Revenue Generation",
    defaultRole: "Sales Executive Intern",
    description:
      "drove end-to-end sales cycles including lead prospecting, cold outreach, qualification calls, tailored product demonstrations, proposal drafting, price negotiation, and post-sale account management, while consistently maintaining accurate CRM records and pursuing assigned revenue targets.",
    highlights:
      "Exhibited exceptional persuasion, objection-handling, deal-closing ability, disciplined pipeline management, and a consistent record of meeting or exceeding monthly sales quotas through consultative selling.",
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

// ---------- PDF STYLES (Single Page Optimized) ----------
const pdfStyles = StyleSheet.create({
  page: {
    padding: 0,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
  },
  outerFrame: {
    margin: 12,                 // Reduced from 20
    borderWidth: 3,
    borderColor: BRAND.navy,
    padding: 4,                 // Reduced from 6
    flex: 1,
  },
  goldFrame: {
    borderWidth: 1,
    borderColor: BRAND.gold,
    padding: 14,                // Reduced from 20
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cornerMark: {
    position: "absolute",
    width: 18,                  // Reduced from 24
    height: 18,
    borderColor: BRAND.gold,
  },
  topLeft: { top: 6, left: 6, borderTopWidth: 2, borderLeftWidth: 2 },
  topRight: { top: 6, right: 6, borderTopWidth: 2, borderRightWidth: 2 },
  bottomLeft: { bottom: 6, left: 6, borderBottomWidth: 2, borderLeftWidth: 2 },
  bottomRight: { bottom: 6, right: 6, borderBottomWidth: 2, borderRightWidth: 2 },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,           // Reduced from 12
    borderBottomWidth: 2,
    borderBottomColor: BRAND.gold,
  },
  logo: { width: 48, height: 48 },   // Reduced from 58
  headerCenter: { alignItems: "center", flex: 1 },
  companyName: {
    fontSize: 18,               // Reduced from 20
    fontFamily: "Helvetica-Bold",
    color: BRAND.navy,
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  companyTagline: {
    fontSize: 7,
    color: BRAND.gold,
    letterSpacing: 4,
    marginTop: 2,
    textTransform: "uppercase",
  },
  headerRight: { alignItems: "flex-end", width: 110 },
  refText: { fontSize: 7.5, color: BRAND.textMuted, fontFamily: "Helvetica" },
  refLabel: { fontSize: 6.5, color: BRAND.gold, letterSpacing: 1 },

  // Title block
  titleBlock: { alignItems: "center", marginTop: 10, marginBottom: 6 },  // Reduced
  certTitle: {
    fontSize: 26,               // Reduced from 30
    fontFamily: "Helvetica-Bold",
    color: BRAND.navy,
    letterSpacing: 7,
    textTransform: "uppercase",
  },
  goldRule: {
    width: 70,
    height: 2,
    backgroundColor: BRAND.gold,
    marginTop: 4,
    marginBottom: 4,
  },
  certSubtitle: {
    fontSize: 9,
    color: BRAND.gold,
    letterSpacing: 5,
    textTransform: "uppercase",
    fontFamily: "Helvetica-Bold",
  },

  // Body
  body: { alignItems: "center", marginTop: 8, paddingHorizontal: 8 },   // Reduced
  presentedText: {
    fontSize: 9,
    color: BRAND.textMuted,
    fontStyle: "italic",
    marginBottom: 4,
  },
  candidateName: {
    fontSize: 26,               // Reduced from 32
    fontFamily: "Helvetica-Bold",
    color: BRAND.navy,
    letterSpacing: 1,
    marginVertical: 4,
    textAlign: "center",
  },
  nameUnderline: {
    width: 220,
    height: 1,
    backgroundColor: BRAND.gold,
    marginBottom: 8,            // Reduced from 12
  },
  bodyText: {
    fontSize: 9.5,              // Reduced from 10.5
    lineHeight: 1.55,           // Reduced from 1.7
    color: BRAND.text,
    textAlign: "center",
    maxWidth: "90%",
  },
  bodyStrong: { fontFamily: "Helvetica-Bold", color: BRAND.navy },
  performanceLine: {
    fontSize: 9,
    color: BRAND.text,
    textAlign: "center",
    marginTop: 5,               // Reduced from 8
    maxWidth: "90%",
    lineHeight: 1.5,
  },
  highlightBox: {
    marginTop: 9,               // Reduced from 14
    paddingVertical: 6,         // Reduced from 8
    paddingHorizontal: 14,
    backgroundColor: BRAND.goldSoft,
    borderLeftWidth: 3,
    borderLeftColor: BRAND.gold,
    borderRightWidth: 3,
    borderRightColor: BRAND.gold,
    maxWidth: "85%",
  },
  highlightLabel: {
    fontSize: 6.5,
    color: BRAND.gold,
    letterSpacing: 2,
    textTransform: "uppercase",
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
    textAlign: "center",
  },
  highlightText: {
    fontSize: 8.5,
    color: BRAND.text,
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: 1.45,
  },

  // Footer
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 12,              // Reduced from 24
    paddingTop: 8,              // Reduced from 12
    borderTopWidth: 1,
    borderTopColor: BRAND.gold,
  },
  signBlock: { width: "32%", alignItems: "center" },
  signatureImg: {
    height: 36,                 // Reduced from 42
    width: 120,
    objectFit: "contain",
    marginBottom: 2,
  },
  signLine: {
    borderBottomWidth: 1,
    borderBottomColor: BRAND.navy,
    width: "100%",
    marginBottom: 3,
  },
  signName: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: BRAND.navy,
  },
  signTitle: { fontSize: 7, color: BRAND.textMuted, marginTop: 1 },
  sealBlock: {
    width: "26%",
    alignItems: "center",
    justifyContent: "center",
  },
  qrImg: { width: 50, height: 50 },   // Reduced from 55
  qrCaption: {
    fontSize: 6,
    color: BRAND.textMuted,
    marginTop: 3,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  dateValue: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: BRAND.navy,
    marginBottom: 3,
  },

  // Bottom strip
  bottomStrip: {
    marginTop: 6,               // Reduced from 10
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    borderTopStyle: "dashed",
  },
  bottomStripText: {
    fontSize: 6,
    color: BRAND.textMuted,
    textAlign: "center",
    letterSpacing: 0.3,
    fontStyle: "italic",
  },
});

// ---------- PDF Document ----------
const CertificatePDF = ({
  details,
  qrDataUrl,
}: {
  details: CertificateDetails;
  qrDataUrl: string;
}) => {
  return (
    <Document
      title={`Certificate of Completion — ${details.candidateName}`}
      author={details.companyName}
      subject="Internship Certificate of Completion"
      creator={details.companyName}
    >
      <Page size="A4" orientation="landscape" style={pdfStyles.page} wrap={false}>
        <View style={pdfStyles.outerFrame}>
          <View style={pdfStyles.goldFrame}>
            {/* Corner marks */}
            <View style={[pdfStyles.cornerMark, pdfStyles.topLeft]} />
            <View style={[pdfStyles.cornerMark, pdfStyles.topRight]} />
            <View style={[pdfStyles.cornerMark, pdfStyles.bottomLeft]} />
            <View style={[pdfStyles.cornerMark, pdfStyles.bottomRight]} />

            {/* Header */}
            <View style={pdfStyles.header}>
              <PdfImage src={FIXED_LOGO_URL} style={pdfStyles.logo} />
              <View style={pdfStyles.headerCenter}>
                <Text style={pdfStyles.companyName}>{details.companyName}</Text>
              </View>
              <View style={pdfStyles.headerRight}>
                <Text style={pdfStyles.refLabel}>REFERENCE</Text>
                <Text style={pdfStyles.refText}>{details.referenceNumber}</Text>
                <Text style={[pdfStyles.refLabel, { marginTop: 3 }]}>ISSUED</Text>
                <Text style={pdfStyles.refText}>{details.issueDate}</Text>
              </View>
            </View>

            {/* Title */}
            <View style={pdfStyles.titleBlock}>
              <Text style={pdfStyles.certTitle}>Certificate</Text>
              <View style={pdfStyles.goldRule} />
              <Text style={pdfStyles.certSubtitle}>of Completion</Text>
            </View>

            {/* Body */}
            <View style={pdfStyles.body}>
              <Text style={pdfStyles.presentedText}>
                This certificate is proudly presented to
              </Text>
              <Text style={pdfStyles.candidateName}>
                {details.candidateName}
              </Text>
              <View style={pdfStyles.nameUnderline} />

              <Text style={pdfStyles.bodyText}>
                in recognition of the successful completion of an internship as a{" "}
                <Text style={pdfStyles.bodyStrong}>{details.role}</Text> at{" "}
                <Text style={pdfStyles.bodyStrong}>{details.companyName}</Text> from{" "}
                <Text style={pdfStyles.bodyStrong}>{details.startDate}</Text> to{" "}
                <Text style={pdfStyles.bodyStrong}>{details.endDate}</Text>
                {details.duration ? ` (${details.duration})` : ""}. During this
                tenure, the candidate {details.domainDescription}
              </Text>

              <Text style={pdfStyles.performanceLine}>
                Overall performance was rated as{" "}
                <Text style={pdfStyles.bodyStrong}>{details.performance}</Text>,
                demonstrating exceptional dedication, professional conduct, and
                technical competence.
              </Text>

              {details.domainHighlights && (
                <View style={pdfStyles.highlightBox}>
                  <Text style={pdfStyles.highlightLabel}>
                    Competencies &amp; Highlights
                  </Text>
                  <Text style={pdfStyles.highlightText}>
                    {details.domainHighlights}
                  </Text>
                </View>
              )}
            </View>

            {/* Footer */}
            <View style={pdfStyles.footer}>
              <View style={pdfStyles.signBlock}>
                <PdfImage
                  src={FIXED_HR_SIGNATURE_URL}
                  style={pdfStyles.signatureImg}
                />
                <View style={pdfStyles.signLine} />
                <Text style={pdfStyles.signName}>{details.managerName}</Text>
                <Text style={pdfStyles.signTitle}>
                  {details.managerTitle}, {details.companyName}
                </Text>
              </View>

              <View style={pdfStyles.sealBlock}>
                {qrDataUrl && (
                  <PdfImage src={qrDataUrl} style={pdfStyles.qrImg} />
                )}
                <Text style={pdfStyles.qrCaption}>
                  Scan to verify authenticity
                </Text>
              </View>

              <View style={pdfStyles.signBlock}>
                <Text style={pdfStyles.dateValue}>{details.issueDate}</Text>
                <View style={pdfStyles.signLine} />
                <Text style={pdfStyles.signName}>Date of Issuance</Text>
                <Text style={pdfStyles.signTitle}>
                  Authorized by {details.companyName}
                </Text>
              </View>
            </View>

            {/* Bottom strip */}
            <View style={pdfStyles.bottomStrip}>
              <Text style={pdfStyles.bottomStripText}>
                This certificate is electronically generated and remains valid
                without a physical seal when verified via the reference number or
                QR code above.
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

// ---------- MAIN PAGE ----------
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
    domainDescription: defaultDomain.description,
    domainHighlights: defaultDomain.highlights,
  });

  useEffect(() => {
    setIsClient(true);
    setDetails((prev) => ({
      ...prev,
      referenceNumber: getNextCertReferenceNumber(),
    }));
  }, []);

  // Auto-calc duration
  useEffect(() => {
    if (details.startDate && details.endDate) {
      const d = calculateDuration(details.startDate, details.endDate);
      if (d) setDetails((prev) => ({ ...prev, duration: d }));
    }
  }, [details.startDate, details.endDate]);

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

  const qrVerificationText = useMemo(
    () =>
      `Certificate Ref: ${details.referenceNumber} | Candidate: ${details.candidateName} | Role: ${details.role} | Issued By: ${FIXED_COMPANY_NAME}`,
    [details.referenceNumber, details.candidateName, details.role]
  );

  useEffect(() => {
    if (details.referenceNumber) {
      QRCodeLib.toDataURL(qrVerificationText, { margin: 1, width: 120 })
        .then(setQrDataUrl)
        .catch(console.error);
    }
  }, [qrVerificationText, details.referenceNumber]);

  const handleAutoGenerateRef = () => {
    setDetails((prev) => ({
      ...prev,
      referenceNumber: getNextCertReferenceNumber(),
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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
                <span className="bg-[#0F2547] text-white p-1.5 rounded-lg">
                  <Award className="w-5 h-5" />
                </span>
                Certificate Studio
              </h1>
              <p className="text-sm text-slate-500">
                Official Certificate Generator for{" "}
                <span className="font-semibold text-slate-700">
                  {FIXED_COMPANY_NAME}
                </span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => window.print()}
                className="bg-white hover:bg-slate-50 text-slate-700 font-medium px-4 py-2 rounded-lg border border-slate-300 text-sm flex items-center gap-2 transition-all"
              >
                <Printer className="w-4 h-4" /> Print
              </button>

              {isClient && (
                <PDFDownloadLink
                  document={
                    <CertificatePDF details={details} qrDataUrl={qrDataUrl} />
                  }
                  fileName={`Certificate_${details.candidateName.replace(
                    /\s+/g,
                    "_"
                  )}_${details.referenceNumber || "Draft"}.pdf`}
                  className="bg-[#0F2547] hover:bg-[#0A1A33] text-white font-medium px-5 py-2 rounded-lg text-sm flex items-center gap-2 transition-all shadow-sm"
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

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Inputs */}
        <section className="lg:col-span-4 print:hidden space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Edit className="w-5 h-5 text-[#0F2547]" /> Details &amp; Parameters
            </h2>

            {/* Domain */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-[#0F2547]" /> Industry
                Domain
              </label>
              <select
                name="domainKey"
                value={details.domainKey}
                onChange={handleDomainChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-800 focus:ring-2 focus:ring-[#0F2547] focus:outline-none"
              >
                {Object.values(DOMAIN_TEMPLATES).map((tmpl) => (
                  <option key={tmpl.id} value={tmpl.id}>
                    {tmpl.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Reference */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Reference No.
                </label>
                <button
                  type="button"
                  onClick={handleAutoGenerateRef}
                  className="text-[11px] text-[#0F2547] hover:text-[#0A1A33] flex items-center gap-1 font-medium"
                >
                  <RefreshCw className="w-3 h-3" /> New Ref
                </button>
              </div>
              <input
                type="text"
                name="referenceNumber"
                value={details.referenceNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-[#0F2547] focus:outline-none"
              />
            </div>

            {/* Candidate */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Candidate Full Name
              </label>
              <input
                type="text"
                name="candidateName"
                value={details.candidateName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-[#0F2547] focus:outline-none"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Internship Role Title
              </label>
              <input
                type="text"
                name="role"
                value={details.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0F2547] focus:outline-none"
              />
            </div>

            {/* Dates */}
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

            {/* Performance */}
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

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#0F2547]" /> Work Description
              </label>
              <textarea
                name="domainDescription"
                rows={3}
                value={details.domainDescription}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs leading-relaxed focus:ring-2 focus:ring-[#0F2547] focus:outline-none"
              />
            </div>

            {/* Highlights */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Key Highlights / Skills
              </label>
              <textarea
                name="domainHighlights"
                rows={2}
                value={details.domainHighlights}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs leading-relaxed focus:ring-2 focus:ring-[#0F2547] focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* Live Preview */}
        <section className="lg:col-span-8 flex justify-center">
          <div className="w-full overflow-x-auto">
            <div
              id="printable-area"
              className="w-[297mm] h-[210mm] bg-white p-4 shadow-lg border-4 border-[#0F2547] relative flex flex-col mx-auto"
            >
              {/* Gold inner frame */}
              <div className="border border-[#B8860B] p-6 h-full flex flex-col relative">
                {/* Corner marks */}
                <div className="absolute top-1 left-1 w-5 h-5 border-t-2 border-l-2 border-[#B8860B]" />
                <div className="absolute top-1 right-1 w-5 h-5 border-t-2 border-r-2 border-[#B8860B]" />
                <div className="absolute bottom-1 left-1 w-5 h-5 border-b-2 border-l-2 border-[#B8860B]" />
                <div className="absolute bottom-1 right-1 w-5 h-5 border-b-2 border-r-2 border-[#B8860B]" />

                {/* Header */}
                <div className="flex justify-between items-center border-b-2 border-[#B8860B] pb-3">
                  <img
                    src={FIXED_LOGO_URL}
                    alt="Logo"
                    className="h-14 w-14 object-contain"
                    onError={(e) =>
                      ((e.target as HTMLImageElement).style.display = "none")
                    }
                  />
                  <div className="text-center flex-1">
                    <h1 className="text-xl font-bold tracking-widest text-[#0F2547] uppercase">
                      {details.companyName}
                    </h1>
                  </div>
                  <div className="text-right text-xs text-slate-500 w-[120px]">
                    <p className="text-[9px] text-[#B8860B] tracking-wider">
                      REFERENCE
                    </p>
                    <p className="font-mono">{details.referenceNumber}</p>
                    <p className="text-[9px] text-[#B8860B] tracking-wider mt-1">
                      ISSUED
                    </p>
                    <p className="font-mono">{details.issueDate}</p>
                  </div>
                </div>

                {/* Title */}
                <div className="text-center mt-5 mb-2">
                  <h2 className="text-3xl font-extrabold tracking-[8px] text-[#0F2547] uppercase">
                    Certificate
                  </h2>
                  <div className="w-20 h-0.5 bg-[#B8860B] mx-auto my-2" />
                  <p className="text-xs text-[#B8860B] tracking-[5px] uppercase font-bold">
                    of Completion
                  </p>
                </div>

                {/* Body */}
                <div className="text-center mt-3 flex-1 flex flex-col items-center justify-center">
                  <p className="text-sm italic text-slate-500 mb-2">
                    This certificate is proudly presented to
                  </p>
                  <h3 className="text-4xl font-extrabold text-[#0F2547] tracking-wide">
                    {details.candidateName || "[Candidate Name]"}
                  </h3>
                  <div className="w-64 h-px bg-[#B8860B] my-3" />

                  <p className="text-sm leading-relaxed text-slate-700 max-w-3xl mx-auto">
                    in recognition of the successful completion of an internship
                    as a{" "}
                    <strong className="text-[#0F2547] font-semibold">
                      {details.role || "[Role]"}
                    </strong>{" "}
                    at{" "}
                    <strong className="text-[#0F2547] font-semibold">
                      {details.companyName}
                    </strong>{" "}
                    from <strong>{details.startDate}</strong> to{" "}
                    <strong>{details.endDate}</strong>{" "}
                    {details.duration ? `(${details.duration})` : ""}. During this
                    tenure, the candidate {details.domainDescription}
                  </p>

                  <p className="text-sm text-slate-700 mt-2 max-w-3xl mx-auto">
                    Overall performance was rated as{" "}
                    <strong className="text-[#0F2547] font-semibold">
                      {details.performance}
                    </strong>
                    , demonstrating exceptional dedication, professional conduct,
                    and technical competence.
                  </p>

                  {details.domainHighlights && (
                    <div className="mt-4 px-4 py-2.5 bg-[#F5EEDC] border-l-3 border-r-3 border-[#B8860B] max-w-2xl mx-auto">
                      <p className="text-[9px] text-[#B8860B] tracking-[2px] uppercase font-bold mb-1 text-center">
                        Competencies &amp; Highlights
                      </p>
                      <p className="text-xs text-slate-700 italic text-center leading-relaxed">
                        {details.domainHighlights}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="grid grid-cols-3 gap-6 items-end mt-6 pt-3 border-t border-[#B8860B]">
                  <div className="text-center">
                    <div className="h-14 flex items-center justify-center">
                      <img
                        src={FIXED_HR_SIGNATURE_URL}
                        alt="Signature"
                        className="h-12 max-w-[200px] object-contain"
                        onError={(e) =>
                          ((e.target as HTMLImageElement).style.display = "none")
                        }
                      />
                    </div>
                    <div className="w-full border-b border-[#0F2547] my-1" />
                    <p className="text-sm font-bold text-[#0F2547]">
                      {details.managerName}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {details.managerTitle}, {details.companyName}
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    {isClient && (
                      <div className="p-1.5 bg-white border border-slate-200 rounded">
                        <QRCode value={qrVerificationText} size={55} />
                      </div>
                    )}
                    <span className="text-[9px] text-slate-400 mt-1 uppercase tracking-wider">
                      Scan to verify authenticity
                    </span>
                  </div>

                  <div className="text-center">
                    <div className="h-14 flex items-center justify-center">
                      <span className="text-base font-bold text-[#0F2547]">
                        {details.issueDate}
                      </span>
                    </div>
                    <div className="w-full border-b border-[#0F2547] my-1" />
                    <p className="text-sm font-bold text-[#0F2547]">
                      Date of Issuance
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Authorized by {details.companyName}
                    </p>
                  </div>
                </div>

                {/* Bottom strip */}
                <div className="mt-3 pt-2 border-t border-dashed border-slate-200">
                  <p className="text-[8px] text-slate-400 text-center italic">
                    This certificate is electronically generated and remains
                    valid without a physical seal when verified via the reference
                    number or QR code above.
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