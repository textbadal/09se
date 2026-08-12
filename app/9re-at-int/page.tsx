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
} from "lucide-react";
import QRCode from "react-qr-code";
import QRCodeLib from "qrcode";

const FIXED_COMPANY_NAME = "Averiqo Technologies";
const FIXED_LOGO_URL = "/Averiqo Technologies logo.jpeg";
const FIXED_HR_NAME = "Shivam Singh";
const FIXED_HR_TITLE = "HR Manager";
const FIXED_HR_SIGNATURE_URL = "/Shivam singh signature.png";
const FIXED_SEAL_URL = "/Averiqo Technologies seal stamp.png";

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
      "demonstrated exceptional technical expertise by contributing to frontend and backend development, delivering clean, maintainable code, optimizing API performance, and implementing responsive, user-centric interfaces.",
    highlights:
      "Exhibited strong proficiency in modern JavaScript/TypeScript, RESTful API design, version control with Git, and collaborative Agile development methodologies.",
  },
  artificial_intelligence: {
  id: "artificial_intelligence",
  label: "Artificial Intelligence & Machine Learning",
  defaultRole: "Artificial Intelligence & Machine Learning Intern",
  description:
    "demonstrated strong technical proficiency by contributing to machine learning projects, preparing and analyzing datasets, developing predictive models, and implementing AI-driven solutions.",
  highlights:
    "Exhibited proficiency in Python, data preprocessing, machine learning algorithms, model evaluation, and AI development using modern tools and frameworks.",
},
graphic_design: {
  id: "graphic_design",
  label: "Graphic Design",
  defaultRole: "Graphic Design Intern",
  description:
    "demonstrated strong creative and technical skills by contributing to graphic design projects, developing engaging visual content, creating digital assets, and maintaining consistent visual communication across various platforms.",
  highlights:
    "Exhibited proficiency in Adobe Photoshop, Illustrator, Canva, visual composition, typography, color theory, and creative design principles.",
},
 digital_marketing_analytics: {
  id: "digital_marketing_analytics",
  label: "Digital Marketing & Analytics",
  defaultRole: "Digital Marketing & Analytics Intern",
  description:
    "demonstrated strong marketing and analytical skills by contributing to digital marketing campaigns, analyzing performance data, conducting market research, and developing data-driven strategies to improve online engagement.",
  highlights:
    "Exhibited proficiency in digital marketing, social media marketing, SEO, campaign analytics, Google Analytics, data interpretation, and performance reporting.",
},
python_programming: {
  id: "python_programming",
  label: "Python Programming",
  defaultRole: "Python Programming Intern",
  description:
    "demonstrated strong programming skills by developing Python-based applications, implementing efficient solutions, and applying programming concepts to practical projects.",
  highlights:
    "Exhibited proficiency in Python, object-oriented programming, data structures, algorithms, exception handling, and application development.",
},
data_analytics: {
  id: "data_analytics",
  label: "Data Analytics",
  defaultRole: "Data Analytics Intern",
  description:
    "demonstrated strong analytical skills by cleaning and analyzing datasets, identifying meaningful patterns, creating visualizations, and generating data-driven insights.",
  highlights:
    "Exhibited proficiency in data analysis, data visualization, statistical methods, Excel, SQL, Python, and modern analytical tools.",
},
 sales_marketing: {
  id: "sales_marketing",
  label: "Sales & Marketing",
  defaultRole: "Sales & Marketing Intern",
  description:
    "supported sales and marketing initiatives by conducting market research, identifying potential customers, assisting with promotional campaigns, and developing strategies to improve customer engagement and business growth.",
  highlights:
    "Applied strong fundamentals in market research, lead generation, customer communication, sales support, digital marketing, and campaign analysis to contribute to business development initiatives.",
},
 cybersecurity: {
  id: "cybersecurity",
  label: "Cybersecurity",
  defaultRole: "Cybersecurity Intern",
  description:
    "contributed to cybersecurity initiatives by identifying vulnerabilities, monitoring security threats, analyzing security logs, and supporting the implementation of security measures.",
  highlights:
    "Applied strong fundamentals in network security, vulnerability assessment, threat analysis, security monitoring, and incident response while following cybersecurity best practices.",
},
  business_development: {
  id: "business_development",
  label: "Business Development",
  defaultRole: "Business Development Intern",
  description:
    "conducted market research, identified business opportunities, generated qualified leads, supported partnership initiatives, and contributed to strategies focused on business growth and expansion.",
  highlights:
    "Applied strong fundamentals in market analysis, lead generation, client relationship management, opportunity identification, communication, and business growth strategies.",
},
  content_writing: {
    id: "content_writing",
    label: "Content Writing & Communications",
    defaultRole: "Content Strategist & Writer Intern",
    description:
      "produced high-quality content including articles, promotional materials, press releases, and technical documentation while maintaining consistent brand voice and messaging.",
    highlights:
      "Delivered engaging, SEO-optimized content with meticulous editing, audience-focused storytelling, and adherence to brand guidelines.",
  },
  human_resources_management: {
  id: "human_resources_management",
  label: "Human Resources Management",
  defaultRole: "Human Resources Management Intern",
  description:
    "supported human resources management activities including recruitment coordination, employee onboarding, HR documentation, attendance management, employee engagement, and day-to-day HR operations.",
  highlights:
    "Applied strong fundamentals in HR administration, recruitment, employee relations, documentation, communication, and organizational policies while maintaining confidentiality and professional standards.",
},
  finance_accounting: {
    id: "finance_accounting",
    label: "Finance & Financial Analysis",
    defaultRole: "Financial Analyst Intern",
    description:
      "performed financial forecasting, supported balance sheet audits, tracked expenses, and prepared variance analysis reports with precision and attention to detail.",
    highlights:
      "Exhibited excellence in quantitative modeling, financial statement analysis, budget preparation, and advanced spreadsheet analytics.",
  },

  financial_data_analytics: {
  id: "financial_data_analytics",
  label: "Financial Data Analytics",
  defaultRole: "Financial Data Analyst Intern",
  description:
    "analyzed financial and business data, prepared reports and dashboards, identified trends and patterns, and supported data-driven financial decision-making.",
  highlights:
    "Applied strong fundamentals in financial analysis, data visualization, Excel, statistical analysis, and business intelligence to interpret financial and operational data.",
},
  project_management: {
    id: "project_management",
    label: "Project Management",
    defaultRole: "Associate Project Manager Intern",
    description:
      "coordinated cross-functional teams, tracked project milestones, managed sprint boards, and documented scope changes to ensure successful project delivery.",
    highlights:
      "Proven capability in risk assessment, timeline management, stakeholder communication, and organized execution of project objectives.",
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

// Utility: Format date to "DD Month YYYY"
const formatDate = (dateStr: string): string => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};

// Utility: Auto-calculate duration between dates with proper month/day calculation
const calculateDuration = (startStr: string, endStr: string): string => {
  if (!startStr || !endStr) return "";
  const start = new Date(startStr);
  const end = new Date(endStr);
  if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) return "";

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  // Adjust for negative days
  if (days < 0) {
    months--;
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
  }

  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12;
  }

  const totalMonths = years * 12 + months;

  if (totalMonths === 0) {
    return `${days} Day${days > 1 ? 's' : ''}`;
  }

  if (days === 0) {
    return `${totalMonths} Month${totalMonths > 1 ? 's' : ''}`;
  }

  return `${totalMonths} Month${totalMonths > 1 ? 's' : ''} ${days} Day${days > 1 ? 's' : ''}`;
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

// PDF Stylesheet - Navy Blue & Gold Theme
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
  },
  outerBorder: {
    borderWidth: 3,
    borderColor: "#1A2E5A",
    height: "100%",
    padding: 15,
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
    opacity: 0.06,
  },
  watermarkText: {
    fontSize: 80,
    color: "#1A2E5A",
    fontWeight: "bold",
    transform: "rotate(-30deg)",
    letterSpacing: 10,
  },
  innerBorder: {
    borderWidth: 2,
    borderColor: "#C9A84C",
    height: "100%",
    padding: 20,
    flexDirection: "column",
    justifyContent: "space-between",
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#1A2E5A",
    textTransform: "uppercase",
    letterSpacing: 3,
    marginTop: 2,
  },
  subTitle: {
    fontSize: 9,
    color: "#1A2E5A",
    marginTop: 2,
    textTransform: "uppercase",
    letterSpacing: 2,
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
    fontSize: 28,
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
    padding: 8,
    backgroundColor: "#F8F6F0",
    borderRadius: 4,
    maxWidth: "92%",
    borderWidth: 1,
    borderColor: "#C9A84C",
  },
  highlightText: {
    fontSize: 9,
    color: "#334155",
    fontStyle: "italic",
    textAlign: "center",
  },
  marksContainer: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 20,
    backgroundColor: "#FDF9F0",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#C9A84C",
  },
  marksText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A2E5A",
  },
  marksValue: {
    color: "#C9A84C",
    fontSize: 18,
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
    width: "28%",
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
  sealBlock: {
    width: "28%",
    alignItems: "center",
  },
  sealImg: {
    width: 75,
    height: 75,
    objectFit: "contain",
    marginBottom: 4,
  },
  qrBlock: {
    width: "20%",
    alignItems: "center",
  },
  qrImg: {
    width: 50,
    height: 50,
  },
  qrText: {
    fontSize: 9,
    color: "#64748B",
    marginTop: 3,
    fontWeight: 'medium',
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
  const formattedIssueDate = formatDate(details.issueDate);
  const formattedStartDate = formatDate(details.startDate);
  const formattedEndDate = formatDate(details.endDate);

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.outerBorder}>
          {/* Watermark */}
          <View style={styles.watermarkContainer}>
            <Text style={styles.watermarkText}>AVERIQO</Text>
          </View>
          
          <View style={styles.innerBorder}>
            {/* Header */}
            <View style={styles.header}>
              <PdfImage src={FIXED_LOGO_URL} style={styles.logo} />
              <View style={styles.headerCenter}>
                <Text style={styles.companyTitle}>{details.companyName}</Text>
                <Text style={styles.certTitle}>Certificate of Internship</Text>
                <Text style={styles.subTitle}>Internship Program</Text>
              </View>
              <View style={styles.refBlock}>
                <Text style={styles.refText}>Ref: {details.referenceNumber}</Text>
                <Text style={[styles.refText, { marginTop: 2 }]}>Date: {formattedIssueDate}</Text>
              </View>
            </View>

            {/* Body */}
            <View style={styles.body}>
              <Text style={styles.presentsText}>This certificate is proudly presented to</Text>
              <Text style={styles.candidateName}>{details.candidateName || "[Candidate Name]"}</Text>
              <Text style={styles.certDescription}>
                in recognition of their successful completion of the internship program as a{" "}
                <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>{details.role || "[Role]"}</Text> at{" "}
                <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>{details.companyName}</Text>, 
                from <Text style={{ fontWeight: "medium" }}>{formattedStartDate || "[Start Date]"}</Text> to{" "}
                <Text style={{ fontWeight: "medium" }}>{formattedEndDate || "[End Date]"}</Text>{" "}
                {details.duration ? `(Duration: ${details.duration})` : ""}. Throughout this period, they{" "}
                {details.domainDescription}
              </Text>

              {details.marks && (
                <View style={styles.marksContainer}>
                  <Text style={styles.marksText}>
                    Performance Score: <Text style={styles.marksValue}>{details.marks}/100</Text>
                  </Text>
                </View>
              )}

              {details.domainHighlights && (
                <View style={styles.highlightBox}>
                  <Text style={styles.highlightText}>
                    Key Achievements: {details.domainHighlights}
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

              {/* Seal Section */}
              <View style={styles.sealBlock}>
                <PdfImage src={FIXED_SEAL_URL} style={styles.sealImg} />
                <Text style={styles.signTitle}>Official Seal</Text>
              </View>

              <View style={styles.qrBlock}>
                {qrDataUrl && <PdfImage src={qrDataUrl} style={styles.qrImg} />}
                <Text style={styles.qrText}>Scan to Verify</Text>
              </View>

              <View style={styles.signBlock}>
                <View style={{ height: 45, justifyContent: "center", alignItems: "center" }}>
                  <Text style={{ fontSize: 10, fontWeight: "bold", color: "#1A2E5A" }}>
                    {formattedIssueDate}
                  </Text>
                </View>
                <View style={styles.signLine} />
                <Text style={styles.signName}>Date of Issuance</Text>
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
    startDate: "2026-06-01",
    endDate: "2026-08-08",
    duration: "",
    issueDate: "",
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
    const today = new Date().toISOString().split('T')[0];
    setDetails((prev) => ({ 
      ...prev, 
      referenceNumber: getNextCertReferenceNumber(),
      issueDate: today 
    }));
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

  // QR Code Payload - Updated to include issue date
  const qrVerificationText = useMemo(() => {
    const formattedIssueDate = formatDate(details.issueDate);
    return `Certificate Ref: ${details.referenceNumber} | Candidate: ${details.candidateName} | Role: ${details.role} | Issue Date: ${formattedIssueDate} | Issued By: ${FIXED_COMPANY_NAME}`;
  }, [details.referenceNumber, details.candidateName, details.role, details.issueDate]);

  useEffect(() => {
    if (details.referenceNumber && isClient) {
      QRCodeLib.toDataURL(qrVerificationText, { margin: 1, width: 120 })
        .then(setQrDataUrl)
        .catch(console.error);
    }
  }, [qrVerificationText, details.referenceNumber, isClient]);

  const handleAutoGenerateRef = () => {
    setDetails((prev) => ({ ...prev, referenceNumber: getNextCertReferenceNumber() }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Don't render PDF components on server
  if (!isClient) {
    return (
      <div className="min-h-screen bg-slate-100 p-4 sm:p-6 md:p-8 font-sans text-slate-800 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#1A2E5A]" />
      </div>
    );
  }

  const formattedIssueDate = formatDate(details.issueDate);
  const formattedStartDate = formatDate(details.startDate);
  const formattedEndDate = formatDate(details.endDate);

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 md:p-8 font-sans text-slate-800">
      {/* Top Header Controls */}
      <header className="max-w-7xl mx-auto mb-6 print:hidden">
        <div className="bg-white rounded-xl px-6 py-4 shadow-sm border border-slate-200">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <span className="bg-[#1A2E5A] text-white p-1.5 rounded-lg">
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
              <button
                onClick={() => window.print()}
                className="bg-white hover:bg-slate-50 text-slate-700 font-medium px-4 py-2 rounded-lg border border-slate-300 text-sm flex items-center gap-2 transition-all shadow-xs"
              >
                <Printer className="w-4 h-4" /> Print
              </button>

              <PDFDownloadLink
                document={<CertificatePDF details={details} qrDataUrl={qrDataUrl} />}
                fileName={`Certificate_${details.candidateName.replace(/\s+/g, "_") || "Draft"}_${
                  details.referenceNumber || "Draft"
                }.pdf`}
                className="bg-[#1A2E5A] hover:bg-[#142442] text-white font-medium px-5 py-2 rounded-lg text-sm flex items-center gap-2 transition-all shadow-sm"
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
              <Edit className="w-5 h-5 text-[#1A2E5A]" /> Certificate Details
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
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none"
              />
            </div>

            {/* Candidate Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Candidate Full Name *
              </label>
              <input
                type="text"
                name="candidateName"
                value={details.candidateName}
                onChange={handleChange}
                placeholder="Enter candidate's full name"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none"
                required
              />
            </div>

            {/* Domain */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-[#1A2E5A]" /> Domain
              </label>
              <select
                name="domainKey"
                value={details.domainKey}
                onChange={handleDomainChange}
                className="w-full px-3 py-2 border border-[#C9A84C] rounded-lg text-sm bg-[#FDF9F0] font-medium text-slate-800 focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none"
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
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none"
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
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none"
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

            {/* Issue Date - User Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                <Calendar className="w-3 h-3 inline mr-1 text-slate-400" /> Issue Date *
              </label>
              <input
                type="date"
                name="issueDate"
                value={details.issueDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none"
                required
              />
              <p className="text-xs text-slate-400 mt-1">
                The date when the certificate is officially issued
              </p>
            </div>

            {/* Marks - Updated to 100 scale */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Marks (out of 100) *
              </label>
              <input
                type="number"
                name="marks"
                value={details.marks}
                onChange={handleChange}
                placeholder="Enter marks (e.g., 92)"
                min="0"
                max="100"
                step="1"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none"
                required
              />
            </div>

            {/* Info Note */}
            <div className="mt-4 p-3 bg-[#FDF9F0] rounded-lg border border-[#C9A84C]">
              <p className="text-xs text-[#1A2E5A]">
                <strong>Note:</strong> All fields marked with * are required. The duration will be 
                automatically calculated based on the start and end dates.
              </p>
            </div>
          </div>
        </section>

        {/* Live Preview Display */}
        <section className="lg:col-span-8 flex justify-center">
          <div className="w-full overflow-x-auto">
            <div
              id="printable-area"
              className="w-[297mm] h-[210mm] bg-white p-6 rounded-xl shadow-lg border-4 border-[#1A2E5A] relative flex flex-col justify-between mx-auto"
            >
              {/* Watermark - Preview */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06]">
                <div className="text-[80px] font-bold text-[#1A2E5A] -rotate-[30deg] tracking-[10px] select-none">
                  AVERIQO
                </div>
              </div>

              <div className="border-2 border-[#C9A84C] p-8 h-full flex flex-col justify-between relative">
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
                    <h2 className="text-3xl font-extrabold uppercase tracking-widest mt-1 text-[#1A2E5A]">
                      Certificate of Internship
                    </h2>
                    <p className="text-xs text-[#1A2E5A] uppercase tracking-widest mt-1">
                      Internship Program
                    </p>
                  </div>
                  <div className="text-right text-xs text-slate-500">
                    <p className="font-mono">Ref: {details.referenceNumber || "Not Set"}</p>
                    <p className="mt-1">Date: {formattedIssueDate}</p>
                  </div>
                </div>

                {/* Body Content */}
                <div className="text-center my-auto py-4">
                  <p className="text-sm italic text-slate-500 mb-1">This certificate is proudly presented to</p>
                  <h3 className="text-4xl font-extrabold text-[#1A2E5A] underline underline-offset-8 my-3 font-serif decoration-[#C9A84C]">
                    {details.candidateName || "[Candidate Name]"}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-700 max-w-3xl mx-auto mt-4">
                    in recognition of their successful completion of the internship program as a{" "}
                    <strong className="text-[#1A2E5A] font-semibold">
                      {details.role || "[Role]"}
                    </strong>{" "}
                    at{" "}
                    <strong className="text-[#1A2E5A] font-semibold">{details.companyName}</strong>, 
                    from <span className="font-medium">{formattedStartDate || "[Start Date]"}</span> to{" "}
                    <span className="font-medium">{formattedEndDate || "[End Date]"}</span>{" "}
                    {details.duration ? `(Duration: ${details.duration})` : ""}. Throughout this period, they{" "}
                    {details.domainDescription}
                  </p>

                  {details.marks && (
                    <div className="mt-4 px-6 py-2 bg-[#FDF9F0] rounded-lg border border-[#C9A84C] inline-block">
                      <p className="text-lg font-bold text-[#1A2E5A]">
                        Performance Score: <span className="text-[#C9A84C] text-xl">{details.marks}/100</span>
                      </p>
                    </div>
                  )}

                  {details.domainHighlights && (
                    <div className="mt-4 p-3 bg-[#F8F6F0] rounded-lg max-w-2xl mx-auto border border-[#C9A84C]">
                      <p className="text-xs text-slate-600 italic">
                        <strong className="font-semibold text-[#1A2E5A] not-italic">
                          Key Achievements:
                        </strong>{" "}
                        {details.domainHighlights}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer / Signatures */}
                <div className="grid grid-cols-4 gap-4 items-end pt-4 border-t-2 border-[#C9A84C]">
                  <div className="text-center">
                    <div className="h-16 flex items-center justify-center">
                      <img
                        src={FIXED_HR_SIGNATURE_URL}
                        alt="Signature"
                        className="h-14 max-w-[200px] object-contain"
                        onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                      />
                    </div>
                    <div className="w-full border-b border-[#1A2E5A] my-1"></div>
                    <p className="text-sm font-bold text-[#1A2E5A]">{details.managerName}</p>
                    <p className="text-xs text-slate-500">
                      {details.managerTitle}, {details.companyName}
                    </p>
                  </div>

                  {/* Seal */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="h-20 w-20 flex items-center justify-center">
                      <img
                        src={FIXED_SEAL_URL}
                        alt="Company Seal"
                        className="w-20 h-20 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            const fallback = document.createElement('div');
                            fallback.className = 'w-20 h-20 rounded-full border-4 border-[#C9A84C] flex items-center justify-center bg-[#FDF9F0]';
                            fallback.innerHTML = `
                              <div class="text-center">
                                <div class="text-[10px] font-bold text-[#1A2E5A] uppercase leading-tight">Averiqo</div>
                                <div class="text-[8px] text-[#1A2E5A]">Official</div>
                                <div class="text-[8px] text-[#1A2E5A]">Seal</div>
                              </div>
                            `;
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">
                      Official Seal
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    {isClient && (
                      <div className="p-1.5 bg-white border border-slate-200 rounded shadow-xs">
                        <QRCode value={qrVerificationText} size={60} />
                      </div>
                    )}
                    <span className="text-[11px] text-slate-500 mt-1 uppercase tracking-wider font-medium">
                      Scan to Verify
                    </span>
                  </div>

                  <div className="text-center">
                    <div className="h-16 flex items-center justify-center">
                      <span className="text-base font-bold text-[#1A2E5A]">{formattedIssueDate}</span>
                    </div>
                    <div className="w-full border-b border-[#1A2E5A] my-1"></div>
                    <p className="text-sm font-bold text-[#1A2E5A]">Date of Issuance</p>
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