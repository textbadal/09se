"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
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
  Star,
  Plus,
  Trash2,
  User,
  Calendar,
  Building2,
  Type,
  AlignJustify,
  CheckCircle,
  AlertCircle,
  RotateCcw,
  Copy,
  QrCode,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";
import QRCodeLib from "qrcode";

// ============================================================
// CONSTANTS & CONFIGURATION
// ============================================================

const FIXED_COMPANY_NAME = "Dream Homes Bihar";
const DEFAULT_LOGO_URL = "/fevicon.png";
const DEFAULT_HR_NAME = "Sumit Singh";
const DEFAULT_HR_TITLE = "HR Manager";
const DEFAULT_HR_SIGNATURE_URL = "/sumit_singh.png";

 interface LORTemplate {
  id: string;
  label: string;
  defaultRole: string;
  relationship: string;
  bodyText: string;
  keyStrengths: string;
  industry: string;
  suggestedRatings: SkillRating[];
}

 interface SkillRating {
  category: string;
  score: number;
}

 interface LORDetails {
  // Personal Information
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  
  // Employment Details
  templateKey: string;
  role: string;
  department: string;
  startDate: string;
  endDate: string;
  duration: string;
  employmentType: "full-time" | "part-time" | "contract" | "internship";
  
  // Letter Metadata
  issueDate: string;
  referenceNumber: string;
  companyName: string;
  managerName: string;
  managerTitle: string;
  managerEmail: string;
  
  // Content
  relationship: string;
  bodyText: string;
  keyStrengths: string;
  customParagraphs: string[];
  ratings: SkillRating[];
  additionalNotes: string;
  
  // Styling
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  
  // Assets
  logoUrl: string;
  signatureUrl: string;
  companySealUrl: string;
  
  // Verification
  includeQR: boolean;
  includeSeal: boolean;
  includeRatings: boolean;
  includeStrengthBox: boolean;
}

// ============================================================
// TEMPLATES
// ============================================================

 const LOR_TEMPLATES: Record<string, LORTemplate> = {
  software_engineering: {
    id: "software_engineering",
    label: "💻 Software Engineering",
    defaultRole: "Senior Full Stack Developer",
    relationship: "supervised directly during their tenure as a lead developer on critical software initiatives",
    bodyText:
      "demonstrated exceptional proficiency in software engineering principles, clean architecture, and problem-solving. They consistently delivered high-quality, scalable code, optimized application performance, and collaborated seamlessly with cross-functional technical teams. Their expertise in modern frameworks and cloud infrastructure significantly accelerated our product roadmap.",
    keyStrengths:
      "Full-stack development (React, Node.js, Python), API design, cloud architecture (AWS/Azure), code review leadership, and technical documentation.",
    industry: "Technology",
    suggestedRatings: [
      { category: "Technical Proficiency", score: 5 },
      { category: "Code Quality & Standards", score: 5 },
      { category: "Problem Solving", score: 5 },
      { category: "Team Collaboration", score: 4 },
      { category: "Project Delivery", score: 5 },
      { category: "Innovation & Creativity", score: 4 },
    ],
  },
  civil_architecture: {
    id: "civil_architecture",
    label: "🏗️ Civil Engineering & Architecture",
    defaultRole: "Senior Architectural Engineer",
    relationship: "closely monitored across residential and commercial planning projects, reporting directly to me",
    bodyText:
      "exhibited remarkable skill in structural drafting, site measurement verification, CAD modeling, and elevation design. Their attention to structural integrity, client requirements, and material efficiency was outstanding throughout. They successfully managed multiple projects simultaneously while maintaining exceptional quality standards.",
    keyStrengths:
      "CAD/BIM proficiency, structural analysis, project management, building codes compliance, sustainable design, and client communication.",
    industry: "Construction",
    suggestedRatings: [
      { category: "Technical Proficiency", score: 5 },
      { category: "Project Management", score: 4 },
      { category: "Design Quality", score: 5 },
      { category: "Client Communication", score: 4 },
      { category: "Problem Solving", score: 4 },
      { category: "Team Leadership", score: 4 },
    ],
  },
  business_management: {
    id: "business_management",
    label: "📊 Business & Management",
    defaultRole: "Business Operations Manager",
    relationship: "managed during key business expansion and operational workflows, reporting to me directly",
    bodyText:
      "displayed exemplary strategic thinking, market research capabilities, and team coordination. They took strong initiative in organizing projects, analyzing operational metrics, and driving efficiency improvements across departments. Their leadership style fostered a culture of accountability and continuous improvement.",
    keyStrengths:
      "Strategic planning, operational management, data analysis, team leadership, process optimization, and stakeholder communication.",
    industry: "Business",
    suggestedRatings: [
      { category: "Strategic Thinking", score: 5 },
      { category: "Team Leadership", score: 5 },
      { category: "Project Management", score: 4 },
      { category: "Communication", score: 5 },
      { category: "Problem Solving", score: 4 },
      { category: "Innovation", score: 4 },
    ],
  },
  academic_general: {
    id: "academic_general",
    label: "🎓 Academic & Research",
    defaultRole: "Senior Research Associate",
    relationship: "mentored across multiple research project lifecycles and academic assignments",
    bodyText:
      "showcased high analytical ability, disciplined work habits, and a strong commitment to excellence. They consistently exceeded expectations in task execution, documentation, and continuous learning. Their research methodology and academic rigor were commendable.",
    keyStrengths:
      "Research methodology, academic writing, data analysis, critical thinking, teaching assistance, and project coordination.",
    industry: "Education",
    suggestedRatings: [
      { category: "Research Quality", score: 5 },
      { category: "Analytical Thinking", score: 5 },
      { category: "Academic Writing", score: 4 },
      { category: "Project Management", score: 4 },
      { category: "Teaching Ability", score: 4 },
      { category: "Innovation", score: 4 },
    ],
  },
  healthcare: {
    id: "healthcare",
    label: "🏥 Healthcare & Medical",
    defaultRole: "Clinical Specialist",
    relationship: "worked closely with in clinical settings, reporting to me as department head",
    bodyText:
      "demonstrated exceptional clinical expertise, patient care skills, and medical knowledge. They consistently maintained the highest standards of healthcare delivery and showed remarkable empathy and professionalism in patient interactions.",
    keyStrengths:
      "Clinical diagnosis, patient care, medical documentation, team collaboration, emergency response, and healthcare administration.",
    industry: "Healthcare",
    suggestedRatings: [
      { category: "Clinical Knowledge", score: 5 },
      { category: "Patient Care", score: 5 },
      { category: "Communication", score: 4 },
      { category: "Team Collaboration", score: 4 },
      { category: "Problem Solving", score: 4 },
      { category: "Professionalism", score: 5 },
    ],
  },
  creative: {
    id: "creative",
    label: "🎨 Creative & Design",
    defaultRole: "Creative Director",
    relationship: "supervised their creative work and design initiatives across multiple projects",
    bodyText:
      "brought exceptional creativity, design thinking, and visual communication skills to every project. Their ability to translate complex ideas into compelling visual narratives was outstanding. They consistently pushed creative boundaries while maintaining brand consistency.",
    keyStrengths:
      "Creative direction, visual design, brand strategy, user experience design, team leadership, and creative problem-solving.",
    industry: "Creative",
    suggestedRatings: [
      { category: "Creative Vision", score: 5 },
      { category: "Design Quality", score: 5 },
      { category: "Brand Strategy", score: 4 },
      { category: "Team Collaboration", score: 4 },
      { category: "Innovation", score: 5 },
      { category: "Project Delivery", score: 4 },
    ],
  },
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

const getNextLORReferenceNumber = (): string => {
  if (typeof window === "undefined") return "LOR-2026-0001";
  const year = new Date().getFullYear();
  const storageKey = `lor_ref_counter_${year}`;
  const counter = parseInt(localStorage.getItem(storageKey) || "0", 10) + 1;
  localStorage.setItem(storageKey, counter.toString());
  return `LOR-${year}-${String(counter).padStart(4, "0")}`;
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
      fontSize: 20,
      fontWeight: "bold",
      color: primaryColor,
      textAlign: "center",
      textTransform: "uppercase",
      letterSpacing: 2,
      marginVertical: 16,
    },
    salutation: {
      fontSize: fontSize + 1,
      fontWeight: "bold",
      color: textColor,
      marginBottom: 12,
    },
    paragraph: {
      fontSize: fontSize,
      lineHeight: lineHeight,
      color: "#334155",
      marginBottom: 10,
      textAlign: "justify",
      letterSpacing: letterSpacing || 0,
    },
    bold: {
      fontWeight: "bold",
      color: textColor,
    },
    highlightBox: {
      marginVertical: 10,
      padding: 10,
      backgroundColor: accentColor,
      borderLeftWidth: 4,
      borderLeftColor: primaryColor,
      borderRadius: 2,
    },
    highlightText: {
      fontSize: fontSize,
      color: textColor,
    },
    ratingsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 6,
      marginVertical: 10,
      padding: 12,
      backgroundColor: accentColor,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: "#E2E8F0",
    },
    ratingItem: {
      width: "48%",
      fontSize: 8.5,
      color: "#334155",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 2,
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
      width: 50,
      height: 50,
      objectFit: "contain",
    },
    qrBlock: {
      alignItems: "center",
    },
    qrImg: {
      width: 50,
      height: 50,
    },
    qrText: {
      fontSize: 6.5,
      color: "#94A3B8",
      marginTop: 2,
    },
    sealText: {
      fontSize: 6,
      color: "#94A3B8",
      marginTop: 2,
    },
  });
};

// ============================================================
// PDF COMPONENT
// ============================================================

const LORPDF = ({ details, qrDataUrl }: { details: LORDetails; qrDataUrl: string }) => {
  const styles = createPdfStyles(details.fontSize, details.lineHeight, details.letterSpacing);
  
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
                <Text style={styles.refText}>Ref: {details.referenceNumber}</Text>
                <Text style={styles.refText}>Date: {formatDate(details.issueDate)}</Text>
              </View>
            </View>

            {/* Title */}
            <Text style={styles.documentTitle}>Letter of Recommendation</Text>
            
            {/* Salutation */}
            <Text style={styles.salutation}>TO WHOM IT MAY CONCERN,</Text>

            {/* Opening Paragraph */}
            <Text style={styles.paragraph}>
              It is my distinct pleasure to write this letter of recommendation for{" "}
              <Text style={styles.bold}>{details.candidateName}</Text>, who served as a{" "}
              <Text style={styles.bold}>{details.role}</Text> in the{" "}
              <Text style={styles.bold}>{details.department || "Department"}</Text> at{" "}
              <Text style={styles.bold}>{details.companyName}</Text> from{" "}
              {formatDate(details.startDate)} to {formatDate(details.endDate)}{" "}
              {details.duration ? `(${details.duration})` : ""}. In my capacity as{" "}
              {details.managerTitle}, I {details.relationship}.
            </Text>

            {/* Body */}
            <Text style={styles.paragraph}>
              During their tenure with us, {details.candidateName} {details.bodyText}
            </Text>

            {/* Key Strengths Box */}
            {details.includeStrengthBox && details.keyStrengths && (
              <View style={styles.highlightBox}>
                <Text style={styles.highlightText}>
                  <Text style={{ fontWeight: "bold" }}>Key Strengths & Expertise: </Text>
                  {details.keyStrengths}
                </Text>
              </View>
            )}

            {/* Ratings Matrix */}
            {details.includeRatings && details.ratings.length > 0 && (
              <View style={styles.ratingsGrid}>
                {details.ratings.map((item, idx) => (
                  <View key={idx} style={styles.ratingItem}>
                    <Text style={{ fontWeight: "bold" }}>{item.category}:</Text>
                    <Text>{"★".repeat(item.score)}{"☆".repeat(5 - item.score)}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Custom Paragraphs */}
            {details.customParagraphs.map(
              (p, idx) =>
                p.trim() && (
                  <Text key={idx} style={styles.paragraph}>
                    {p}
                  </Text>
                )
            )}

            {/* Closing Paragraphs */}
            <Text style={styles.paragraph}>
              Beyond their professional capabilities, {details.candidateName} proved to be a dependable,
              proactive, and ethical team member with excellent communication skills and a strong
              commitment to organizational values.
            </Text>

            {details.additionalNotes && (
              <Text style={styles.paragraph}>
                <Text style={{ fontWeight: "bold" }}>Additional Note: </Text>
                {details.additionalNotes}
              </Text>
            )}

            <Text style={styles.paragraph}>
              I recommend {details.candidateName} without reservation for any professional
              or academic endeavor they choose to pursue.
            </Text>

            <Text style={[styles.paragraph, { marginTop: 8 }]}>Sincerely,</Text>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.signBlock}>
              <PdfImage src={details.signatureUrl} style={styles.signatureImg} />
              <View style={styles.signLine} />
              <Text style={styles.signName}>{details.managerName}</Text>
              <Text style={styles.signTitle}>
                {details.managerTitle}, {details.companyName}
              </Text>
              {details.managerEmail && (
                <Text style={styles.signEmail}>{details.managerEmail}</Text>
              )}
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              {details.includeSeal && details.companySealUrl && (
                <View style={styles.sealBlock}>
                  <PdfImage src={details.companySealUrl} style={styles.sealImg} />
                  <Text style={styles.sealText}>Company Seal</Text>
                </View>
              )}
              {details.includeQR && qrDataUrl && (
                <View style={styles.qrBlock}>
                  <PdfImage src={qrDataUrl} style={styles.qrImg} />
                  <Text style={styles.qrText}>Verify LOR</Text>
                </View>
              )}
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

export default function LORGeneratorPage() {
  const [isClient, setIsClient] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [showPreview, setShowPreview] = useState(true);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  const logoInputRef = useRef<HTMLInputElement>(null);
  const sigInputRef = useRef<HTMLInputElement>(null);
  const sealInputRef = useRef<HTMLInputElement>(null);

  const defaultTemplate = LOR_TEMPLATES.software_engineering;

  const [details, setDetails] = useState<LORDetails>({
    candidateName: "Alex Morgan",
    candidateEmail: "alex.morgan@example.com",
    candidatePhone: "+1 (555) 123-4567",
    templateKey: defaultTemplate.id,
    role: defaultTemplate.defaultRole,
    department: "Engineering",
    startDate: "2024-01-15",
    endDate: "2026-06-30",
    duration: "2 Years, 5 Months",
    employmentType: "full-time",
    issueDate: new Date().toISOString().split("T")[0],
    referenceNumber: "",
    companyName: FIXED_COMPANY_NAME,
    managerName: DEFAULT_HR_NAME,
    managerTitle: DEFAULT_HR_TITLE,
    managerEmail: "hr@dreamhomesbihar.com",
    relationship: defaultTemplate.relationship,
    bodyText: defaultTemplate.bodyText,
    keyStrengths: defaultTemplate.keyStrengths,
    customParagraphs: [],
    ratings: defaultTemplate.suggestedRatings || [
      { category: "Technical Proficiency", score: 5 },
      { category: "Communication & Teamwork", score: 4 },
      { category: "Problem Solving", score: 5 },
      { category: "Punctuality & Ethics", score: 5 },
    ],
    additionalNotes: "",
    fontSize: 10,
    lineHeight: 1.7,
    letterSpacing: 0.2,
    logoUrl: DEFAULT_LOGO_URL,
    signatureUrl: DEFAULT_HR_SIGNATURE_URL,
    companySealUrl: "",
    includeQR: true,
    includeSeal: false,
    includeRatings: true,
    includeStrengthBox: true,
  });

  // Initialize reference number
  useEffect(() => {
    setIsClient(true);
    setDetails((prev) => ({ ...prev, referenceNumber: getNextLORReferenceNumber() }));
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
    const tmpl = LOR_TEMPLATES[key];
    if (tmpl) {
      setDetails((prev) => ({
        ...prev,
        templateKey: key,
        role: tmpl.defaultRole,
        relationship: tmpl.relationship,
        bodyText: tmpl.bodyText,
        keyStrengths: tmpl.keyStrengths,
        ratings: tmpl.suggestedRatings || prev.ratings,
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

  // Rating management
  const handleRatingChange = (index: number, score: number) => {
    setDetails((prev) => {
      const newRatings = [...prev.ratings];
      newRatings[index].score = score;
      return { ...prev, ratings: newRatings };
    });
  };

  const addRatingCategory = () => {
    setDetails((prev) => ({
      ...prev,
      ratings: [...prev.ratings, { category: "New Category", score: 3 }],
    }));
  };

  const removeRatingCategory = (index: number) => {
    setDetails((prev) => ({
      ...prev,
      ratings: prev.ratings.filter((_, i) => i !== index),
    }));
  };

  const updateRatingCategory = (index: number, newCategory: string) => {
    setDetails((prev) => {
      const newRatings = [...prev.ratings];
      newRatings[index].category = newCategory;
      return { ...prev, ratings: newRatings };
    });
  };

  // Custom paragraphs management
  const addCustomParagraph = () => {
    setDetails((prev) => ({
      ...prev,
      customParagraphs: [...prev.customParagraphs, ""],
    }));
  };

  const updateCustomParagraph = (index: number, val: string) => {
    setDetails((prev) => {
      const updated = [...prev.customParagraphs];
      updated[index] = val;
      return { ...prev, customParagraphs: updated };
    });
  };

  const removeCustomParagraph = (index: number) => {
    setDetails((prev) => ({
      ...prev,
      customParagraphs: prev.customParagraphs.filter((_, i) => i !== index),
    }));
  };

  // QR Code generation
  const qrVerificationText = useMemo(() => {
    return `LOR Ref: ${details.referenceNumber} | Candidate: ${details.candidateName} | Role: ${details.role} | Company: ${details.companyName} | Issued: ${details.issueDate}`;
  }, [details.referenceNumber, details.candidateName, details.role, details.companyName, details.issueDate]);

  useEffect(() => {
    if (details.referenceNumber && details.includeQR) {
      QRCodeLib.toDataURL(qrVerificationText, { margin: 1, width: 150, errorCorrectionLevel: "H" })
        .then(setQrDataUrl)
        .catch(console.error);
    } else {
      setQrDataUrl("");
    }
  }, [qrVerificationText, details.referenceNumber, details.includeQR]);

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
    const tmpl = LOR_TEMPLATES[details.templateKey] || defaultTemplate;
    setDetails((prev) => ({
      ...prev,
      role: tmpl.defaultRole,
      relationship: tmpl.relationship,
      bodyText: tmpl.bodyText,
      keyStrengths: tmpl.keyStrengths,
      ratings: tmpl.suggestedRatings || prev.ratings,
      customParagraphs: [],
      additionalNotes: "",
    }));
    setSaveMessage({ type: "success", text: "Content reset to template defaults" });
    setTimeout(() => setSaveMessage(null), 3000);
  };

  // Copy to clipboard
  const copyLORText = () => {
    const text = `
Letter of Recommendation
${details.companyName}
Ref: ${details.referenceNumber}
Date: ${formatDate(details.issueDate)}

TO WHOM IT MAY CONCERN,

It is my distinct pleasure to write this letter of recommendation for ${details.candidateName}, 
who served as a ${details.role} at ${details.companyName} from ${formatDate(details.startDate)} 
to ${formatDate(details.endDate)} (${details.duration}). In my capacity as ${details.managerTitle}, 
I ${details.relationship}.

During their tenure with us, ${details.candidateName} ${details.bodyText}

Key Strengths: ${details.keyStrengths}

${details.customParagraphs.filter(p => p.trim()).join("\n\n")}

I recommend ${details.candidateName} without reservation for any professional or academic 
endeavor they choose to pursue.

Sincerely,
${details.managerName}
${details.managerTitle}, ${details.companyName}
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
                <FileText className="w-5 h-5" />
              </span>
              LOR Generator Pro
            </h1>
            <p className="text-sm text-slate-500">
              Professional Letter of Recommendation Generator
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
              onClick={copyLORText}
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
                document={<LORPDF details={details} qrDataUrl={qrDataUrl} />}
                fileName={`LOR_${details.candidateName.replace(/\s+/g, "_")}_${
                  details.referenceNumber || "Draft"
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
                const newRef = getNextLORReferenceNumber();
                setDetails((prev) => ({ ...prev, referenceNumber: newRef }));
              }}
              className="flex-1 py-2 px-3 rounded-xl text-xs font-medium bg-slate-50 text-slate-600 hover:bg-slate-100 flex items-center justify-center gap-1.5 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" /> New Ref #
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

          {/* Basic Details */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-blue-700" /> Candidate & Employment
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
                <input type="text" name="candidateName" value={details.candidateName} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
                <input type="email" name="candidateEmail" value={details.candidateEmail} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Role Title</label>
                <input type="text" name="role" value={details.role} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Department</label>
                <input type="text" name="department" value={details.department} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Template</label>
              <select name="templateKey" value={details.templateKey} onChange={handleTemplateChange} className="w-full px-3 py-2 border border-blue-200 rounded-xl text-sm bg-blue-50/50 font-medium text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all">
                {Object.values(LOR_TEMPLATES).map((tmpl) => (
                  <option key={tmpl.id} value={tmpl.id}>{tmpl.label}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Start Date</label>
                <input type="date" name="startDate" value={details.startDate} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">End Date</label>
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

            <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded-xl">
              Duration: <span className="font-semibold text-slate-700">{details.duration || "Not calculated"}</span>
            </div>
          </div>

          {/* Letter Content */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Edit className="w-4 h-4 text-blue-700" /> Letter Content
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Relationship Context</label>
              <input type="text" name="relationship" value={details.relationship} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Core Recommendation Text</label>
              <textarea name="bodyText" rows={3} value={details.bodyText} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Key Strengths</label>
              <textarea name="keyStrengths" rows={2} value={details.keyStrengths} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Additional Notes</label>
              <textarea name="additionalNotes" rows={2} value={details.additionalNotes} onChange={handleChange} placeholder="Any special context or achievements..." className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" />
            </div>
          </div>

          {/* Ratings Matrix */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" /> Performance Ratings
              </h2>
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-600 flex items-center gap-1">
                  <input type="checkbox" name="includeRatings" checked={details.includeRatings} onChange={handleChange} className="rounded" />
                  Show
                </label>
                <button onClick={addRatingCategory} className="text-xs text-blue-700 font-semibold flex items-center gap-1 hover:text-blue-800 transition-all">
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {details.ratings.map((rating, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <input
                    type="text"
                    value={rating.category}
                    onChange={(e) => updateRatingCategory(idx, e.target.value)}
                    className="flex-1 px-2 py-1 border border-slate-200 rounded-lg text-xs bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingChange(idx, star)}
                        className={`text-sm transition-all ${star <= rating.score ? "text-amber-400 scale-110" : "text-slate-300 hover:text-amber-200"}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <button onClick={() => removeRatingCategory(idx)} className="text-slate-400 hover:text-red-500 transition-all p-1">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Paragraphs */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <AlignJustify className="w-4 h-4 text-blue-700" /> Custom Paragraphs
              </h2>
              <button onClick={addCustomParagraph} className="text-xs text-blue-700 font-semibold flex items-center gap-1 hover:text-blue-800 transition-all">
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
            {details.customParagraphs.map((para, idx) => (
              <div key={idx} className="flex gap-2 items-start">
                <textarea rows={2} value={para} onChange={(e) => updateCustomParagraph(idx, e.target.value)} placeholder="Custom achievement or specific praise..." className="flex-1 px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" />
                <button onClick={() => removeCustomParagraph(idx)} className="text-slate-400 hover:text-red-500 transition-all p-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Manager Info */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-700" /> Manager & Company
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Manager Name</label>
                <input type="text" name="managerName" value={details.managerName} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Manager Title</label>
                <input type="text" name="managerTitle" value={details.managerTitle} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Manager Email</label>
              <input type="email" name="managerEmail" value={details.managerEmail} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Company Name</label>
              <input type="text" name="companyName" value={details.companyName} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Issue Date</label>
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
                <input type="checkbox" name="includeQR" checked={details.includeQR} onChange={handleChange} className="rounded text-blue-700" />
                Show QR Code
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                <input type="checkbox" name="includeSeal" checked={details.includeSeal} onChange={handleChange} className="rounded text-blue-700" />
                Show Company Seal
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                <input type="checkbox" name="includeStrengthBox" checked={details.includeStrengthBox} onChange={handleChange} className="rounded text-blue-700" />
                Show Strengths Box
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                <input type="checkbox" name="includeRatings" checked={details.includeRatings} onChange={handleChange} className="rounded text-blue-700" />
                Show Ratings
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
                {/* Letterhead Header */}
                <div className="flex justify-between items-center border-b-3 pb-4 mb-6" style={{ borderBottomColor: "#1E3A8A" }}>
                  <img src={details.logoUrl} alt="Logo" className="h-16 w-16 object-contain" onError={(e) => (e.target as HTMLImageElement).style.display = "none"} />
                  <div className="text-right">
                    <h1 className="text-xl font-bold uppercase tracking-wide text-slate-800">
                      {details.companyName}
                    </h1>
                    <p className="text-xs font-mono text-slate-500 mt-1">Ref: {details.referenceNumber}</p>
                    <p className="text-xs text-slate-500">Date: {formatDate(details.issueDate)}</p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold uppercase text-center tracking-widest mb-6 text-blue-900">
                  Letter of Recommendation
                </h2>

                <p className="font-bold text-sm text-slate-800 mb-3">TO WHOM IT MAY CONCERN,</p>

                <p className="mb-3 text-justify">
                  It is my distinct pleasure to write this letter of recommendation for{" "}
                  <strong className="text-slate-800">{details.candidateName}</strong>, who served as a{" "}
                  <strong className="text-slate-800">{details.role}</strong> in the{" "}
                  <strong className="text-slate-800">{details.department || "Department"}</strong> at{" "}
                  <strong className="text-slate-800">{details.companyName}</strong> from{" "}
                  {formatDate(details.startDate)} to {formatDate(details.endDate)}{" "}
                  {details.duration ? `(${details.duration})` : ""}. In my capacity as{" "}
                  {details.managerTitle}, I {details.relationship}.
                </p>

                <p className="mb-3 text-justify">
                  During their tenure with us, {details.candidateName} {details.bodyText}
                </p>

                {details.includeStrengthBox && details.keyStrengths && (
                  <div className="my-3 p-3 rounded-lg border-l-4 text-sm bg-blue-50" style={{ borderLeftColor: "#1E3A8A" }}>
                    <strong>Key Strengths & Expertise: </strong>
                    {details.keyStrengths}
                  </div>
                )}

                {details.includeRatings && details.ratings.length > 0 && (
                  <div className="my-3 p-3 border rounded-lg grid grid-cols-2 gap-2 text-xs bg-blue-50 border-slate-200">
                    {details.ratings.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center pr-2">
                        <span className="font-semibold text-slate-700">{item.category}:</span>
                        <span className="text-amber-500 font-mono">
                          {"★".repeat(item.score)}
                          <span className="text-slate-300">{"★".repeat(5 - item.score)}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {details.customParagraphs.map((p, idx) => p.trim() && (
                  <p key={idx} className="mb-3 text-justify">{p}</p>
                ))}

                <p className="mb-3 text-justify">
                  Beyond their professional capabilities, {details.candidateName} proved to be a dependable,
                  proactive, and ethical team member with excellent communication skills and a strong
                  commitment to organizational values.
                </p>

                {details.additionalNotes && (
                  <p className="mb-3 text-justify">
                    <strong>Additional Note: </strong>
                    {details.additionalNotes}
                  </p>
                )}

                <p className="mb-4 text-justify">
                  I recommend {details.candidateName} without reservation for any professional
                  or academic endeavor they choose to pursue.
                </p>

                <p>Sincerely,</p>
              </div>

              {/* Footer */}
              <div className="pt-6 border-t flex justify-between items-end" style={{ borderTopColor: "#1E3A8A" }}>
                <div>
                  <img src={details.signatureUrl} alt="Signature" className="h-14 object-contain mb-1" onError={(e) => (e.target as HTMLImageElement).style.display = "none"} />
                  <div className="w-48 border-b border-slate-400 mb-1" />
                  <p className="font-bold text-sm text-slate-800">{details.managerName}</p>
                  <p className="text-xs text-slate-600">{details.managerTitle}, {details.companyName}</p>
                  {details.managerEmail && <p className="text-[10px] text-slate-400">{details.managerEmail}</p>}
                </div>

                <div className="flex items-center gap-4">
                  {details.includeSeal && details.companySealUrl && (
                    <div className="text-center">
                      <img src={details.companySealUrl} alt="Seal" className="w-14 h-14 object-contain mx-auto" />
                      <p className="text-[8px] text-slate-400 mt-1">Company Seal</p>
                    </div>
                  )}
                  {details.includeQR && qrDataUrl && (
                    <div className="text-center">
                      <img src={qrDataUrl} alt="QR Code" className="w-14 h-14 mx-auto" />
                      <p className="text-[8px] text-slate-400 mt-1">Verify LOR</p>
                    </div>
                  )}
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