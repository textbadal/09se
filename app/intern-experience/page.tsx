"use client";

import React, { useState, useEffect, useRef } from "react";
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
  FileText,
  Upload,
  Sliders,
  User,
  Calendar,
  Building2,
  Type,
  AlignJustify,
  CheckCircle,
  AlertCircle,
  RotateCcw,
  Copy,
  Eye,
  EyeOff,
  RefreshCw,
  Award,
  Briefcase,
  Plus,
  Trash2,
  Target,
  Trophy,
  Users,
} from "lucide-react";

// ============================================================
// CONSTANTS & CONFIGURATION
// ============================================================

const FIXED_COMPANY_NAME = "Dream Homes Bihar";
const DEFAULT_LOGO_URL = "/fevicon.png";
const DEFAULT_AUTHORIZED_NAME = "Sumit Singh";
const DEFAULT_AUTHORIZED_TITLE = "HR Manager";
const DEFAULT_AUTHORIZED_SIGNATURE_URL = "/sumit_singh.png";

export interface ExperienceTemplate {
  id: string;
  label: string;
  defaultRole: string;
  defaultDepartment: string;
  responsibilities: string[];
  achievements: string[];
  skills: string[];
}

export interface ExperienceDetails {
  employeeName: string;
  employeeEmail: string;
  employeePhone: string;
  employeeAddress: string;
  templateKey: string;
  role: string;
  department: string;
  startDate: string;
  endDate: string;
  duration: string;
  employmentType: "full-time" | "part-time" | "contract" | "internship";
  reportingTo: string;
  issueDate: string;
  certificateNumber: string;
  companyName: string;
  authorizedName: string;
  authorizedTitle: string;
  authorizedEmail: string;
  authorizedPhone: string;
  companyAddress: string;
  companyWebsite: string;
  responsibilities: string[];
  achievements: string[];
  skills: string[];
  additionalNotes: string;
  performanceRating: "outstanding" | "excellent" | "good" | "satisfactory";
  reasonForLeaving: string;
  rehirable: boolean;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  logoUrl: string;
  signatureUrl: string;
  companySealUrl: string;
  includeSeal: boolean;
  includeSkills: boolean;
  includeAchievements: boolean;
  includePerformanceRating: boolean;
}

// ============================================================
// TEMPLATES
// ============================================================

export const EXPERIENCE_TEMPLATES: Record<string, ExperienceTemplate> = {
  software_engineering: {
    id: "software_engineering",
    label: "💻 Software Engineering",
    defaultRole: "Senior Software Engineer",
    defaultDepartment: "Engineering",
    responsibilities: [
      "Designed, developed, and maintained scalable web applications using modern technologies",
      "Led code reviews and mentored junior developers, ensuring code quality and best practices",
      "Collaborated with cross-functional teams to define, design, and ship new features",
      "Optimized application performance and implemented CI/CD pipelines"
    ],
    achievements: [
      "Successfully delivered 15+ major features on time and within budget",
      "Reduced bug reports by 30% through comprehensive testing and code review processes",
      "Recognized as 'Employee of the Quarter' for exceptional performance"
    ],
    skills: [
      "React.js, Node.js, TypeScript, Python",
      "AWS, Docker, Kubernetes, CI/CD",
      "REST APIs, GraphQL, Microservices",
      "Git, Agile/Scrum, JIRA"
    ]
  },
  civil_architecture: {
    id: "civil_architecture",
    label: "🏗️ Civil Engineering & Architecture",
    defaultRole: "Senior Civil Engineer",
    defaultDepartment: "Engineering",
    responsibilities: [
      "Managed residential and commercial construction projects from planning to completion",
      "Prepared structural drawings, site plans, and technical specifications",
      "Conducted site inspections and ensured compliance with building codes",
      "Coordinated with clients, contractors, and regulatory authorities"
    ],
    achievements: [
      "Successfully delivered 20+ residential projects with 100% client satisfaction",
      "Reduced project costs by 15% through efficient resource management",
      "Received 'Best Project Award' for innovative architectural design"
    ],
    skills: [
      "AutoCAD, Revit, Civil 3D, SketchUp",
      "Structural Analysis, Project Management",
      "Building Codes, Safety Standards",
      "Site Planning, Construction Management"
    ]
  },
  business_management: {
    id: "business_management",
    label: "📊 Business Management",
    defaultRole: "Business Operations Manager",
    defaultDepartment: "Operations",
    responsibilities: [
      "Led business operations and strategic initiatives across multiple departments",
      "Developed and implemented operational strategies to improve efficiency",
      "Analyzed business metrics and prepared reports for executive leadership",
      "Managed cross-functional teams and fostered continuous improvement"
    ],
    achievements: [
      "Increased operational efficiency by 35% through process automation",
      "Achieved 20% revenue growth through strategic business development",
      "Successfully led 50+ team members across 5 departments"
    ],
    skills: [
      "Strategic Planning, Business Development",
      "Operations Management, Process Optimization",
      "Data Analysis, Financial Management",
      "Team Leadership, Stakeholder Management"
    ]
  },
  academic_research: {
    id: "academic_research",
    label: "🎓 Academic & Research",
    defaultRole: "Senior Research Associate",
    defaultDepartment: "Research & Development",
    responsibilities: [
      "Conducted research using advanced methodologies and analytical tools",
      "Published research findings in peer-reviewed journals",
      "Supervised research assistants and coordinated research projects",
      "Developed research proposals and secured funding"
    ],
    achievements: [
      "Published 10+ research papers in top-tier international journals",
      "Received research grants totaling $500,000+",
      "Presented at 15+ international conferences"
    ],
    skills: [
      "Research Methodology, Data Analysis",
      "Statistical Analysis (SPSS, R, Python)",
      "Academic Writing, Grant Writing",
      "Project Management, Team Leadership"
    ]
  },
  healthcare: {
    id: "healthcare",
    label: "🏥 Healthcare & Medical",
    defaultRole: "Senior Clinical Specialist",
    defaultDepartment: "Clinical Services",
    responsibilities: [
      "Provided comprehensive clinical care to patients",
      "Diagnosed and managed complex medical conditions",
      "Collaborated with multidisciplinary healthcare teams",
      "Maintained accurate patient records and documentation"
    ],
    achievements: [
      "Achieved 95% patient satisfaction rate",
      "Successfully treated 500+ patients with excellent clinical outcomes",
      "Recognized for excellence in patient care and clinical leadership"
    ],
    skills: [
      "Clinical Diagnosis, Patient Care",
      "Medical Documentation, EMR Systems",
      "Emergency Response, Critical Care",
      "Team Collaboration, Communication"
    ]
  },
  marketing: {
    id: "marketing",
    label: "📢 Marketing & Communications",
    defaultRole: "Senior Marketing Manager",
    defaultDepartment: "Marketing",
    responsibilities: [
      "Developed and executed comprehensive marketing strategies",
      "Led brand management and positioning initiatives",
      "Managed marketing budgets and tracked ROI on campaigns",
      "Analyzed market trends and consumer insights"
    ],
    achievements: [
      "Increased brand awareness by 40% through integrated marketing campaigns",
      "Achieved 50% growth in social media engagement",
      "Successfully launched 10+ products with record-breaking sales"
    ],
    skills: [
      "Digital Marketing, Social Media Strategy",
      "Content Creation, Brand Management",
      "Market Research, Consumer Insights",
      "SEO/SEM, Analytics, Campaign Management"
    ]
  },
  finance: {
    id: "finance",
    label: "💰 Finance & Accounting",
    defaultRole: "Senior Financial Analyst",
    defaultDepartment: "Finance",
    responsibilities: [
      "Led financial analysis and reporting for the organization",
      "Managed financial planning, forecasting, and budgeting processes",
      "Ensured compliance with accounting standards and regulatory requirements",
      "Performed risk assessments and financial modeling"
    ],
    achievements: [
      "Improved financial reporting accuracy by 30%",
      "Reduced operational costs by 15% through financial optimization",
      "Successfully managed a $50M+ budget"
    ],
    skills: [
      "Financial Analysis, Budgeting, Forecasting",
      "Accounting Standards (GAAP/IFRS)",
      "Data Analysis, Financial Modeling",
      "Risk Assessment, Compliance"
    ]
  }
};

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

const calculateDuration = (startStr: string, endStr: string): string => {
  if (!startStr || !endStr) return "";
  const start = new Date(startStr);
  const end = new Date(endStr);
  if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) return "";

  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const months = Math.floor(diffDays / 30);
  const remainingDays = diffDays % 30;
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0 && months === 0) return `${diffDays} Days`;
  if (years === 0) {
    if (remainingDays === 0) return `${months} Month${months > 1 ? "s" : ""}`;
    return `${months} Month${months > 1 ? "s" : ""}, ${remainingDays} Day${remainingDays > 1 ? "s" : ""}`;
  }
  if (remainingMonths === 0 && remainingDays === 0) {
    return `${years} Year${years > 1 ? "s" : ""}`;
  }
  let result = `${years} Year${years > 1 ? "s" : ""}`;
  if (remainingMonths > 0) result += `, ${remainingMonths} Month${remainingMonths > 1 ? "s" : ""}`;
  if (remainingDays > 0) result += `, ${remainingDays} Day${remainingDays > 1 ? "s" : ""}`;
  return result;
};

const getNextCertificateNumber = (): string => {
  if (typeof window === "undefined") return "EXP-2026-0001";
  const year = new Date().getFullYear();
  const storageKey = `exp_cert_counter_${year}`;
  const counter = parseInt(localStorage.getItem(storageKey) || "0", 10) + 1;
  localStorage.setItem(storageKey, counter.toString());
  return `EXP-${year}-${String(counter).padStart(4, "0")}`;
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

// ============================================================
// PDF STYLES
// ============================================================

const createPdfStyles = (fontSize: number, lineHeight: number, letterSpacing: number) => {
  const primaryColor = "#1E3A8A";
  const textColor = "#1E293B";
  const accentColor = "#EFF6FF";
  
  return StyleSheet.create({
    page: {
      padding: 50,
      fontFamily: "Helvetica",
      backgroundColor: "#FFFFFF",
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
      borderBottomColor: primaryColor,
      paddingBottom: 20,
      marginBottom: 20,
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
      fontSize: 18,
      fontWeight: "bold",
      color: textColor,
      textTransform: "uppercase",
      letterSpacing: 1.5,
    },
    refText: {
      fontSize: 9,
      color: "#64748B",
      marginTop: 2,
    },
    documentTitle: {
      fontSize: 22,
      fontWeight: "bold",
      color: primaryColor,
      textAlign: "center",
      textTransform: "uppercase",
      letterSpacing: 3,
      marginVertical: 12,
    },
    subTitle: {
      fontSize: 12,
      color: "#64748B",
      textAlign: "center",
      marginBottom: 16,
      fontStyle: "italic",
    },
    sectionTitle: {
      fontSize: fontSize + 1,
      fontWeight: "bold",
      color: primaryColor,
      marginTop: 12,
      marginBottom: 6,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    paragraph: {
      fontSize: fontSize,
      lineHeight: lineHeight,
      color: "#334155",
      marginBottom: 8,
      textAlign: "justify",
      letterSpacing: letterSpacing || 0,
    },
    bold: {
      fontWeight: "bold",
      color: textColor,
    },
    listItem: {
      fontSize: fontSize - 0.5,
      lineHeight: lineHeight,
      color: "#334155",
      marginBottom: 4,
      paddingLeft: 12,
    },
    listBullet: {
      fontSize: fontSize,
      color: primaryColor,
      marginRight: 6,
    },
    highlightBox: {
      marginVertical: 8,
      padding: 12,
      backgroundColor: accentColor,
      borderLeftWidth: 4,
      borderLeftColor: primaryColor,
      borderRadius: 2,
    },
    highlightText: {
      fontSize: fontSize,
      color: textColor,
    },
    footer: {
      borderTopWidth: 2,
      borderTopColor: primaryColor,
      paddingTop: 16,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
    signBlock: {
      width: "45%",
    },
    signatureImg: {
      height: 40,
      width: 140,
      objectFit: "contain",
      marginBottom: 4,
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
      color: textColor,
    },
    signTitle: {
      fontSize: 8.5,
      color: "#64748B",
    },
    signEmail: {
      fontSize: 7.5,
      color: "#94A3B8",
      marginTop: 2,
    },
    sealBlock: {
      alignItems: "center",
      marginRight: 8,
    },
    sealImg: {
      width: 60,
      height: 60,
      objectFit: "contain",
    },
    sealText: {
      fontSize: 6.5,
      color: "#94A3B8",
      marginTop: 2,
    },
    companyInfo: {
      fontSize: 7.5,
      color: "#64748B",
      textAlign: "right",
      marginTop: 8,
    },
  });
};

// ============================================================
// PDF COMPONENT
// ============================================================

const ExperienceCertificatePDF = ({ details }: { details: ExperienceDetails }) => {
  const styles = createPdfStyles(details.fontSize, details.lineHeight, details.letterSpacing);
  
  const getRatingLabel = (rating: string): string => {
    const labels: Record<string, string> = {
      outstanding: "Outstanding Performance",
      excellent: "Excellent Performance",
      good: "Good Performance",
      satisfactory: "Satisfactory Performance",
    };
    return labels[rating] || rating;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View>
            {/* Header */}
            <View style={styles.header}>
              <PdfImage src={details.logoUrl} style={styles.logo} />
              <View style={styles.headerText}>
                <Text style={styles.companyTitle}>{details.companyName}</Text>
                <Text style={styles.refText}>Certificate No: {details.certificateNumber}</Text>
                <Text style={styles.refText}>Date: {formatDate(details.issueDate)}</Text>
              </View>
            </View>

            {/* Title */}
            <Text style={styles.documentTitle}>Certificate of Experience</Text>
            <Text style={styles.subTitle}>
              This certifies that the following individual has demonstrated exceptional performance
            </Text>

            {/* Employee Details */}
            <Text style={styles.paragraph}>
              This is to certify that <Text style={styles.bold}>{details.employeeName}</Text> 
              {details.employeeEmail && ` (${details.employeeEmail})`} 
              {details.employeePhone && `, Phone: ${details.employeePhone}`} 
              {details.employeeAddress && `, residing at ${details.employeeAddress}`} 
              was employed with <Text style={styles.bold}>{details.companyName}</Text> 
              as <Text style={styles.bold}>{details.role}</Text> in the 
              <Text style={styles.bold}> {details.department}</Text> department 
              from {formatDate(details.startDate)} to {formatDate(details.endDate)} 
              ({details.duration}). During their tenure, they reported to 
              <Text style={styles.bold}> {details.reportingTo}</Text>.
            </Text>

            {/* Employment Type */}
            <Text style={styles.paragraph}>
              Their employment was <Text style={styles.bold}>{details.employmentType.replace('-', ' ')}</Text> 
              {details.reasonForLeaving && ` and they left the organization due to ${details.reasonForLeaving}`}.
              {details.rehirable && " They are eligible for rehire and we would gladly welcome them back."}
              {!details.rehirable && " They are not eligible for rehire."}
            </Text>

            {/* Responsibilities */}
            <Text style={styles.sectionTitle}>Key Responsibilities</Text>
            {details.responsibilities.map((resp, idx) => (
              <Text key={idx} style={styles.listItem}>
                <Text style={styles.listBullet}>•</Text> {resp}
              </Text>
            ))}

            {/* Achievements */}
            {details.includeAchievements && details.achievements.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Key Achievements</Text>
                {details.achievements.map((achievement, idx) => (
                  <Text key={idx} style={styles.listItem}>
                    <Text style={styles.listBullet}>★</Text> {achievement}
                  </Text>
                ))}
              </>
            )}

            {/* Skills */}
            {details.includeSkills && details.skills.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Skills & Competencies</Text>
                <Text style={styles.paragraph}>
                  {details.skills.join(" • ")}
                </Text>
              </>
            )}

            {/* Performance Rating */}
            {details.includePerformanceRating && details.performanceRating && (
              <View style={styles.highlightBox}>
                <Text style={styles.highlightText}>
                  <Text style={{ fontWeight: "bold" }}>Performance Rating: </Text>
                  <Text>{getRatingLabel(details.performanceRating)}</Text>
                </Text>
              </View>
            )}

            {/* Additional Notes */}
            {details.additionalNotes && (
              <Text style={[styles.paragraph, { marginTop: 8 }]}>
                <Text style={styles.bold}>Additional Note: </Text>
                {details.additionalNotes}
              </Text>
            )}

            {/* Closing Statement */}
            <Text style={[styles.paragraph, { marginTop: 12 }]}>
              We wish <Text style={styles.bold}>{details.employeeName}</Text> all the best in their 
              future endeavors. They have been a valuable asset to our organization and we have no 
              hesitation in recommending them for any position they may seek.
            </Text>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.signBlock}>
              <PdfImage src={details.signatureUrl} style={styles.signatureImg} />
              <View style={styles.signLine} />
              <Text style={styles.signName}>{details.authorizedName}</Text>
              <Text style={styles.signTitle}>
                {details.authorizedTitle}, {details.companyName}
              </Text>
              {details.authorizedEmail && (
                <Text style={styles.signEmail}>{details.authorizedEmail}</Text>
              )}
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              {details.includeSeal && details.companySealUrl && (
                <View style={styles.sealBlock}>
                  <PdfImage src={details.companySealUrl} style={styles.sealImg} />
                  <Text style={styles.sealText}>Company Seal</Text>
                </View>
              )}
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
          </View>
        </View>
      </Page>
    </Document>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function ExperienceCertificatePage() {
  const [isClient, setIsClient] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  const logoInputRef = useRef<HTMLInputElement>(null);
  const sigInputRef = useRef<HTMLInputElement>(null);
  const sealInputRef = useRef<HTMLInputElement>(null);

  const defaultTemplate = EXPERIENCE_TEMPLATES.software_engineering;

  const [details, setDetails] = useState<ExperienceDetails>({
    employeeName: "John Doe",
    employeeEmail: "john.doe@example.com",
    employeePhone: "+1 (555) 123-4567",
    employeeAddress: "123 Main Street, City, State 12345",
    templateKey: defaultTemplate.id,
    role: defaultTemplate.defaultRole,
    department: defaultTemplate.defaultDepartment,
    startDate: "2024-01-15",
    endDate: "2026-06-30",
    duration: "2 Years, 5 Months",
    employmentType: "full-time",
    reportingTo: "Jane Smith",
    issueDate: new Date().toISOString().split("T")[0],
    certificateNumber: "",
    companyName: FIXED_COMPANY_NAME,
    authorizedName: DEFAULT_AUTHORIZED_NAME,
    authorizedTitle: DEFAULT_AUTHORIZED_TITLE,
    authorizedEmail: "hr@dreamhomesbihar.com",
    authorizedPhone: "+1 (555) 987-6543",
    companyAddress: "123 Corporate Drive, Business City, State 12345",
    companyWebsite: "www.dreamhomesbihar.com",
    responsibilities: defaultTemplate.responsibilities,
    achievements: defaultTemplate.achievements,
    skills: defaultTemplate.skills,
    additionalNotes: "",
    performanceRating: "excellent",
    reasonForLeaving: "career growth",
    rehirable: true,
    fontSize: 10,
    lineHeight: 1.7,
    letterSpacing: 0.2,
    logoUrl: DEFAULT_LOGO_URL,
    signatureUrl: DEFAULT_AUTHORIZED_SIGNATURE_URL,
    companySealUrl: "",
    includeSeal: false,
    includeSkills: true,
    includeAchievements: true,
    includePerformanceRating: true,
  });

  // Initialize certificate number
  useEffect(() => {
    setIsClient(true);
    setDetails((prev) => ({ ...prev, certificateNumber: getNextCertificateNumber() }));
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

  // Update template when changed
  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value;
    const tmpl = EXPERIENCE_TEMPLATES[key];
    if (tmpl) {
      setDetails((prev) => ({
        ...prev,
        templateKey: key,
        role: tmpl.defaultRole,
        department: tmpl.defaultDepartment,
        responsibilities: tmpl.responsibilities,
        achievements: tmpl.achievements,
        skills: tmpl.skills,
      }));
    }
  };

  // File upload handlers
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "logoUrl" | "signatureUrl" | "companySealUrl"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDetails((prev) => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // List management functions
  const addItem = (field: "responsibilities" | "achievements" | "skills") => {
    const placeholder = {
      responsibilities: "Add a responsibility...",
      achievements: "Add an achievement...",
      skills: "Add a skill..."
    };
    setDetails((prev) => ({
      ...prev,
      [field]: [...prev[field], placeholder[field]],
    }));
  };

  const updateItem = (field: "responsibilities" | "achievements" | "skills", index: number, value: string) => {
    setDetails((prev) => {
      const updated = [...prev[field]];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const removeItem = (field: "responsibilities" | "achievements" | "skills", index: number) => {
    setDetails((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  // General change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    if (type === "checkbox") {
      setDetails((prev) => ({ ...prev, [name]: checked }));
    } else {
      setDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Reset to defaults
  const resetToDefaults = () => {
    const tmpl = EXPERIENCE_TEMPLATES[details.templateKey] || defaultTemplate;
    setDetails((prev) => ({
      ...prev,
      role: tmpl.defaultRole,
      department: tmpl.defaultDepartment,
      responsibilities: tmpl.responsibilities,
      achievements: tmpl.achievements,
      skills: tmpl.skills,
      additionalNotes: "",
      performanceRating: "excellent",
      reasonForLeaving: "career growth",
      rehirable: true,
    }));
    setSaveMessage({ type: "success", text: "Content reset to template defaults" });
    setTimeout(() => setSaveMessage(null), 3000);
  };

  // Copy to clipboard
  const copyCertificateText = () => {
    const text = `
Certificate of Experience
${details.companyName}
Certificate No: ${details.certificateNumber}
Date: ${formatDate(details.issueDate)}

This is to certify that ${details.employeeName} was employed with ${details.companyName} 
as ${details.role} in the ${details.department} department from ${formatDate(details.startDate)} 
to ${formatDate(details.endDate)} (${details.duration}).

Key Responsibilities:
${details.responsibilities.map(r => `• ${r}`).join('\n')}

${details.includeAchievements ? `Key Achievements:\n${details.achievements.map(a => `• ${a}`).join('\n')}` : ''}

${details.includeSkills ? `Skills & Competencies:\n${details.skills.join(' • ')}` : ''}

Performance Rating: ${details.performanceRating.toUpperCase()}

We wish ${details.employeeName} all the best in their future endeavors.

Sincerely,
${details.authorizedName}
${details.authorizedTitle}, ${details.companyName}
    `;
    navigator.clipboard.writeText(text).then(() => {
      setSaveMessage({ type: "success", text: "Copied to clipboard!" });
      setTimeout(() => setSaveMessage(null), 2000);
    }).catch(() => {
      setSaveMessage({ type: "error", text: "Failed to copy" });
      setTimeout(() => setSaveMessage(null), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 p-4 sm:p-6 md:p-8 font-sans text-slate-800">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-6 print:hidden">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg border border-slate-200/60 flex flex-wrap gap-4 justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
              <span className="bg-blue-900 text-white p-1.5 rounded-xl shadow-lg shadow-blue-200">
                <Award className="w-5 h-5" />
              </span>
              Experience Certificate Generator
            </h1>
            <p className="text-sm text-slate-500">
              Professional Employment Experience Certificate
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => window.print()}
              className="bg-white hover:bg-slate-50 text-slate-700 font-medium px-4 py-2 rounded-xl border border-slate-200 text-sm flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
            >
              <Printer className="w-4 h-4" /> Print
            </button>

            <button
              onClick={copyCertificateText}
              className="bg-white hover:bg-slate-50 text-slate-700 font-medium px-4 py-2 rounded-xl border border-slate-200 text-sm flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
            >
              <Copy className="w-4 h-4" /> Copy Text
            </button>

            <button
              onClick={resetToDefaults}
              className="bg-white hover:bg-slate-50 text-slate-700 font-medium px-4 py-2 rounded-xl border border-slate-200 text-sm flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>

            {isClient && (
              <PDFDownloadLink
                document={<ExperienceCertificatePDF details={details} />}
                fileName={`Experience_Certificate_${details.employeeName.replace(/\s+/g, "_")}_${
                  details.certificateNumber || "Draft"
                }.pdf`}
                className="bg-blue-900 hover:bg-blue-800 text-white font-medium px-5 py-2 rounded-xl text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-200 hover:shadow-xl"
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
          <div className={`mt-3 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium ${
            saveMessage.type === "success" 
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
              : "bg-red-50 text-red-700 border border-red-200"
          }`}>
            {saveMessage.type === "success" ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {saveMessage.text}
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Sidebar */}
        <section className="lg:col-span-5 print:hidden space-y-4 max-h-[85vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-slate-100">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/60 flex gap-2 flex-wrap">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex-1 py-2 px-3 rounded-xl text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center gap-1.5 transition-all"
            >
              {showPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {showPreview ? "Hide Preview" : "Show Preview"}
            </button>
            <button
              onClick={() => {
                const newRef = getNextCertificateNumber();
                setDetails((prev) => ({ ...prev, certificateNumber: newRef }));
              }}
              className="flex-1 py-2 px-3 rounded-xl text-xs font-medium bg-slate-50 text-slate-600 hover:bg-slate-100 flex items-center justify-center gap-1.5 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" /> New Certificate #
            </button>
          </div>

          {/* Asset Uploads */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Upload className="w-4 h-4 text-blue-700" /> Branding Assets
            </h2>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs text-slate-600 font-medium mb-1">Logo</label>
                <input type="file" ref={logoInputRef} accept="image/*" onChange={(e) => handleFileUpload(e, "logoUrl")} className="hidden" />
                <button onClick={() => logoInputRef.current?.click()} className="w-full py-2 px-2 border border-dashed border-slate-300 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-1 transition-all">
                  <Upload className="w-3 h-3" /> Upload
                </button>
              </div>
              <div>
                <label className="block text-xs text-slate-600 font-medium mb-1">Signature</label>
                <input type="file" ref={sigInputRef} accept="image/*" onChange={(e) => handleFileUpload(e, "signatureUrl")} className="hidden" />
                <button onClick={() => sigInputRef.current?.click()} className="w-full py-2 px-2 border border-dashed border-slate-300 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-1 transition-all">
                  <Upload className="w-3 h-3" /> Upload
                </button>
              </div>
              <div>
                <label className="block text-xs text-slate-600 font-medium mb-1">Seal</label>
                <input type="file" ref={sealInputRef} accept="image/*" onChange={(e) => handleFileUpload(e, "companySealUrl")} className="hidden" />
                <button onClick={() => sealInputRef.current?.click()} className="w-full py-2 px-2 border border-dashed border-slate-300 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-1 transition-all">
                  <Upload className="w-3 h-3" /> Upload
                </button>
              </div>
            </div>
          </div>

          {/* Employee Details */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-blue-700" /> Employee Details
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name *</label>
                <input type="text" name="employeeName" value={details.employeeName} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
                <input type="email" name="employeeEmail" value={details.employeeEmail} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number</label>
              <input type="text" name="employeePhone" value={details.employeePhone} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Address</label>
              <input type="text" name="employeeAddress" value={details.employeeAddress} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
            </div>
          </div>

          {/* Employment Details */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-700" /> Employment Details
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Template</label>
              <select name="templateKey" value={details.templateKey} onChange={handleTemplateChange} className="w-full px-3 py-2 border border-blue-200 rounded-xl text-sm bg-blue-50/50 font-medium text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all">
                {Object.values(EXPERIENCE_TEMPLATES).map((tmpl) => (
                  <option key={tmpl.id} value={tmpl.id}>{tmpl.label}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Role / Designation *</label>
                <input type="text" name="role" value={details.role} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Department</label>
                <input type="text" name="department" value={details.department} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Start Date *</label>
                <input type="date" name="startDate" value={details.startDate} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">End Date *</label>
                <input type="date" name="endDate" value={details.endDate} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Employment Type</label>
              <select name="employmentType" value={details.employmentType} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                <option value="full-time">Full-Time</option>
                <option value="part-time">Part-Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Reporting To</label>
              <input type="text" name="reportingTo" value={details.reportingTo} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
            </div>

            <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded-xl">
              Total Duration: <span className="font-semibold text-slate-700">{details.duration || "Not calculated"}</span>
            </div>
          </div>

          {/* Responsibilities */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-700" /> Key Responsibilities
              </h2>
              <button onClick={() => addItem("responsibilities")} className="text-xs text-blue-700 font-semibold flex items-center gap-1 hover:text-blue-800 transition-all">
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
            {details.responsibilities.map((item, idx) => (
              <div key={idx} className="flex gap-2 items-start">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateItem("responsibilities", idx, e.target.value)}
                  placeholder="Enter a responsibility..."
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button onClick={() => removeItem("responsibilities", idx)} className="text-slate-400 hover:text-red-500 transition-all p-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" /> Key Achievements
              </h2>
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-600 flex items-center gap-1">
                  <input type="checkbox" name="includeAchievements" checked={details.includeAchievements} onChange={handleChange} className="rounded" />
                  Show
                </label>
                <button onClick={() => addItem("achievements")} className="text-xs text-blue-700 font-semibold flex items-center gap-1 hover:text-blue-800 transition-all">
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
            </div>
            {details.achievements.map((item, idx) => (
              <div key={idx} className="flex gap-2 items-start">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateItem("achievements", idx, e.target.value)}
                  placeholder="Enter an achievement..."
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button onClick={() => removeItem("achievements", idx)} className="text-slate-400 hover:text-red-500 transition-all p-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-700" /> Skills & Competencies
              </h2>
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-600 flex items-center gap-1">
                  <input type="checkbox" name="includeSkills" checked={details.includeSkills} onChange={handleChange} className="rounded" />
                  Show
                </label>
                <button onClick={() => addItem("skills")} className="text-xs text-blue-700 font-semibold flex items-center gap-1 hover:text-blue-800 transition-all">
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
            </div>
            {details.skills.map((item, idx) => (
              <div key={idx} className="flex gap-2 items-start">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateItem("skills", idx, e.target.value)}
                  placeholder="Enter a skill..."
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button onClick={() => removeItem("skills", idx)} className="text-slate-400 hover:text-red-500 transition-all p-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Additional Information */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <AlignJustify className="w-4 h-4 text-blue-700" /> Additional Information
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Additional Notes</label>
              <textarea name="additionalNotes" rows={3} value={details.additionalNotes} onChange={handleChange} placeholder="Any additional remarks, special achievements, or context..." className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Performance Rating</label>
                <select name="performanceRating" value={details.performanceRating} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                  <option value="outstanding">Outstanding</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="satisfactory">Satisfactory</option>
                </select>
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer pb-1">
                  <input type="checkbox" name="includePerformanceRating" checked={details.includePerformanceRating} onChange={handleChange} className="rounded text-blue-700" />
                  Display rating
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Reason for Leaving</label>
              <input type="text" name="reasonForLeaving" value={details.reasonForLeaving} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                <input type="checkbox" name="rehirable" checked={details.rehirable} onChange={handleChange} className="rounded text-blue-700" />
                Eligible for Rehire
              </label>
            </div>
          </div>

          {/* Authorized Signatory */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-700" /> Authorized Signatory
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Name *</label>
                <input type="text" name="authorizedName" value={details.authorizedName} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Title *</label>
                <input type="text" name="authorizedTitle" value={details.authorizedTitle} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
                <input type="email" name="authorizedEmail" value={details.authorizedEmail} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Phone</label>
                <input type="text" name="authorizedPhone" value={details.authorizedPhone} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Issue Date *</label>
              <input type="date" name="issueDate" value={details.issueDate} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
            </div>
          </div>

          {/* Display Options */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-700" /> Display Options
            </h2>

            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                <input type="checkbox" name="includeSeal" checked={details.includeSeal} onChange={handleChange} className="rounded text-blue-700" />
                Show Company Seal
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                <input type="checkbox" name="includeSkills" checked={details.includeSkills} onChange={handleChange} className="rounded text-blue-700" />
                Show Skills
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                <input type="checkbox" name="includeAchievements" checked={details.includeAchievements} onChange={handleChange} className="rounded text-blue-700" />
                Show Achievements
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                <input type="checkbox" name="includePerformanceRating" checked={details.includePerformanceRating} onChange={handleChange} className="rounded text-blue-700" />
                Show Performance Rating
              </label>
            </div>
          </div>

          {/* Typography Controls */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Type className="w-4 h-4 text-blue-700" /> Typography
            </h2>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Size ({details.fontSize}pt)</label>
                <input type="range" min="8" max="13" step="0.5" value={details.fontSize} onChange={(e) => setDetails((prev) => ({ ...prev, fontSize: parseFloat(e.target.value) }))} className="w-full accent-blue-700" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Line Ht ({details.lineHeight})</label>
                <input type="range" min="1.3" max="2.2" step="0.1" value={details.lineHeight} onChange={(e) => setDetails((prev) => ({ ...prev, lineHeight: parseFloat(e.target.value) }))} className="w-full accent-blue-700" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Spacing ({details.letterSpacing})</label>
                <input type="range" min="0" max="1" step="0.1" value={details.letterSpacing} onChange={(e) => setDetails((prev) => ({ ...prev, letterSpacing: parseFloat(e.target.value) }))} className="w-full accent-blue-700" />
              </div>
            </div>
          </div>
        </section>

        {/* Live Preview */}
        <section className={`lg:col-span-7 flex justify-center transition-all duration-300 ${!showPreview ? "opacity-50 scale-95 pointer-events-none" : ""}`}>
          <div className="w-full overflow-x-auto">
            <div
              id="printable-area"
              className="w-[210mm] min-h-[297mm] bg-white p-12 rounded-2xl shadow-xl border border-slate-200 relative flex flex-col justify-between mx-auto text-slate-900"
              style={{ 
                fontSize: `${details.fontSize}pt`, 
                lineHeight: details.lineHeight,
                letterSpacing: `${details.letterSpacing}pt`,
                fontFamily: 'Georgia, "Times New Roman", serif',
              }}
            >
              <div>
                {/* Header */}
                <div className="flex justify-between items-center border-b-3 pb-4 mb-6" style={{ borderBottomColor: "#1E3A8A" }}>
                  <img src={details.logoUrl} alt="Logo" className="h-16 w-16 object-contain" onError={(e) => (e.target as HTMLImageElement).style.display = "none"} />
                  <div className="text-right">
                    <h1 className="text-xl font-bold uppercase tracking-wide text-slate-800">
                      {details.companyName}
                    </h1>
                    <p className="text-xs font-mono text-slate-500 mt-1">Certificate No: {details.certificateNumber}</p>
                    <p className="text-xs text-slate-500">Date: {formatDate(details.issueDate)}</p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold uppercase text-center tracking-widest mb-2 text-blue-900">
                  Certificate of Experience
                </h2>
                <p className="text-sm text-slate-500 text-center italic mb-6">
                  This certifies that the following individual has demonstrated exceptional performance
                </p>

                {/* Employee Details */}
                <p className="mb-3 text-justify">
                  This is to certify that <strong className="text-slate-800">{details.employeeName}</strong> 
                  {details.employeeEmail && ` (${details.employeeEmail})`} 
                  {details.employeePhone && `, Phone: ${details.employeePhone}`} 
                  {details.employeeAddress && `, residing at ${details.employeeAddress}`} 
                  was employed with <strong className="text-slate-800">{details.companyName}</strong> 
                  as <strong className="text-slate-800">{details.role}</strong> in the 
                  <strong className="text-slate-800"> {details.department}</strong> department 
                  from {formatDate(details.startDate)} to {formatDate(details.endDate)} 
                  ({details.duration}). During their tenure, they reported to 
                  <strong className="text-slate-800"> {details.reportingTo}</strong>.
                </p>

                {/* Employment Type */}
                <p className="mb-3 text-justify">
                  Their employment was <strong className="text-slate-800">{details.employmentType.replace('-', ' ')}</strong> 
                  {details.reasonForLeaving && ` and they left the organization due to ${details.reasonForLeaving}`}.
                  {details.rehirable && " They are eligible for rehire and we would gladly welcome them back."}
                  {!details.rehirable && " They are not eligible for rehire."}
                </p>

                {/* Responsibilities */}
                <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider mt-4 mb-2">
                  Key Responsibilities
                </h3>
                {details.responsibilities.map((resp, idx) => (
                  <p key={idx} className="text-sm text-justify pl-4 mb-1">
                    <span className="text-blue-900 mr-2">•</span> {resp}
                  </p>
                ))}

                {/* Achievements */}
                {details.includeAchievements && details.achievements.length > 0 && (
                  <>
                    <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider mt-4 mb-2">
                      Key Achievements
                    </h3>
                    {details.achievements.map((achievement, idx) => (
                      <p key={idx} className="text-sm text-justify pl-4 mb-1">
                        <span className="text-amber-500 mr-2">★</span> {achievement}
                      </p>
                    ))}
                  </>
                )}

                {/* Skills */}
                {details.includeSkills && details.skills.length > 0 && (
                  <>
                    <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider mt-4 mb-2">
                      Skills & Competencies
                    </h3>
                    <p className="text-sm mb-3">
                      {details.skills.join(" • ")}
                    </p>
                  </>
                )}

                {/* Performance Rating */}
                {details.includePerformanceRating && details.performanceRating && (
                  <div className="my-3 p-3 rounded-lg border-l-4 bg-blue-50" style={{ borderLeftColor: "#1E3A8A" }}>
                    <p className="text-sm">
                      <strong>Performance Rating: </strong>
                      <span className="font-semibold">{details.performanceRating.toUpperCase()}</span>
                    </p>
                  </div>
                )}

                {/* Additional Notes */}
                {details.additionalNotes && (
                  <p className="text-sm mt-3 text-justify">
                    <strong>Additional Note: </strong>
                    {details.additionalNotes}
                  </p>
                )}

                {/* Closing Statement */}
                <p className="text-sm mt-4 text-justify">
                  We wish <strong className="text-slate-800">{details.employeeName}</strong> all the best in their 
                  future endeavors. They have been a valuable asset to our organization and we have no 
                  hesitation in recommending them for any position they may seek.
                </p>
              </div>

              {/* Footer */}
              <div className="pt-6 border-t flex justify-between items-end" style={{ borderTopColor: "#1E3A8A" }}>
                <div>
                  <img src={details.signatureUrl} alt="Signature" className="h-14 object-contain mb-1" onError={(e) => (e.target as HTMLImageElement).style.display = "none"} />
                  <div className="w-48 border-b border-slate-400 mb-1" />
                  <p className="font-bold text-sm text-slate-800">{details.authorizedName}</p>
                  <p className="text-xs text-slate-600">{details.authorizedTitle}, {details.companyName}</p>
                  {details.authorizedEmail && <p className="text-[10px] text-slate-400">{details.authorizedEmail}</p>}
                </div>

                <div className="flex items-center gap-4">
                  {details.includeSeal && details.companySealUrl && (
                    <div className="text-center">
                      <img src={details.companySealUrl} alt="Seal" className="w-14 h-14 object-contain mx-auto" />
                      <p className="text-[8px] text-slate-400 mt-1">Company Seal</p>
                    </div>
                  )}
                  <div className="text-right text-[8px] text-slate-400">
                    {details.companyAddress && <p>{details.companyAddress}</p>}
                    {details.companyWebsite && <p>{details.companyWebsite}</p>}
                    {details.authorizedPhone && <p>Phone: {details.authorizedPhone}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Print Styles */}
      <style>{`
        @media print {
          .print\\:hidden { display: none !important; }
          body { background: white !important; padding: 0 !important; margin: 0 !important; }
          #printable-area { 
            box-shadow: none !important; 
            border: none !important; 
            border-radius: 0 !important; 
            margin: 0 !important; 
            padding: 1.5cm !important; 
            width: 100% !important; 
            min-height: 100vh !important;
          }
          .lg\\:col-span-7 { max-width: 100% !important; flex: 1 !important; }
          .lg\\:col-span-5 { display: none !important; }
          .bg-gradient-to-br { background: white !important; }
          .shadow-lg, .shadow-xl, .shadow-sm { box-shadow: none !important; }
        }
        .border-b-3 { border-bottom-width: 3px; }
        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 8px; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #93a3d0; border-radius: 8px; }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover { background: #6b7fc0; }
      `}</style>
    </div>
  );
}