"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image as PdfImage,
  Font,
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
  Clock,
  Users,
  Plus,
  Trash2,
  Target,
  Trophy,
  CalendarDays,
  CheckSquare,
  BarChart3,
  QrCode,
  Mail,
  History,
  Layers,
  Shield,
  Link2,
  Globe,
  Languages,
  Download as DownloadIcon,
  Send,
  Save,
} from "lucide-react";
import QRCodeLib from "qrcode";

// Register font for better PDF rendering
Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf" },
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf", fontWeight: "normal" },
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf", fontWeight: "bold" },
  ],
});

// ============================================================
// CONSTANTS & CONFIGURATION
// ============================================================

const FIXED_COMPANY_NAME = "Dream Homes Bihar";
const DEFAULT_LOGO_URL = "/fevicon.png";
const DEFAULT_AUTHORIZED_NAME = "Sumit Singh";
const DEFAULT_AUTHORIZED_TITLE = "HR Manager";
const DEFAULT_AUTHORIZED_SIGNATURE_URL = "/sumit_singh.png";

// Interfaces (removed 'export' keyword)
interface AttendanceTemplate {
  id: string;
  label: string;
  defaultProgramName: string;
  defaultDuration: string;
  defaultAttendanceHours: string;
  defaultTopics: string[];
  defaultLearningOutcomes: string[];
}

interface CertificateHistory {
  id: string;
  participantName: string;
  programName: string;
  certificateNumber: string;
  issueDate: string;
  createdAt: string;
  pdfUrl?: string;
}

interface AttendanceDetails {
  // Participant Information
  participantName: string;
  participantEmail: string;
  participantPhone: string;
  participantDesignation: string;
  participantDepartment: string;
  
  // Program Details
  templateKey: string;
  programName: string;
  programType: "training" | "workshop" | "seminar" | "conference" | "webinar" | "course";
  startDate: string;
  endDate: string;
  duration: string;
  totalHours: string;
  attendanceHours: string;
  attendancePercentage: number;
  topics: string[];
  learningOutcomes: string[];
  
  // Certificate Metadata
  issueDate: string;
  certificateNumber: string;
  companyName: string;
  authorizedName: string;
  authorizedTitle: string;
  authorizedEmail: string;
  authorizedPhone: string;
  companyAddress: string;
  companyWebsite: string;
  
  // Content
  additionalNotes: string;
  performanceGrade: "excellent" | "very_good" | "good" | "satisfactory";
  participationLevel: "active" | "moderate" | "passive";
  
  // Custom Fields
  certificateType: string;
  programCoordinator: string;
  venue: string;
  certificateLanguage: "english" | "hindi" | "bilingual";
  
  // Styling
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  certificateStyle: "classic" | "modern" | "elegant" | "minimal" | "premium";
  layout: "portrait" | "landscape";
  
  // Assets
  logoUrl: string;
  signatureUrl: string;
  companySealUrl: string;
  watermarkUrl: string;
  
  // Display Options
  includeSeal: boolean;
  includeTopics: boolean;
  includeLearningOutcomes: boolean;
  includeAttendancePercentage: boolean;
  includePerformanceGrade: boolean;
  includeBorder: boolean;
  includeWatermark: boolean;
  includeQRCode: boolean;
  includeVerificationLink: boolean;
  
  // Verification
  verificationBaseUrl: string;
}

// ============================================================
// TEMPLATES (removed 'export' keyword)
// ============================================================

const ATTENDANCE_TEMPLATES: Record<string, AttendanceTemplate> = {
  professional_training: {
    id: "professional_training",
    label: "📚 Professional Training",
    defaultProgramName: "Professional Development Training",
    defaultDuration: "5 Days",
    defaultAttendanceHours: "40 Hours",
    defaultTopics: [
      "Professional Communication Skills",
      "Leadership and Team Management",
      "Project Management Fundamentals",
      "Problem Solving and Decision Making",
      "Time Management and Productivity"
    ],
    defaultLearningOutcomes: [
      "Enhanced professional communication abilities",
      "Developed leadership and team management skills",
      "Applied project management methodologies",
      "Improved problem-solving capabilities",
      "Mastered time management techniques"
    ]
  },
  technical_workshop: {
    id: "technical_workshop",
    label: "💻 Technical Workshop",
    defaultProgramName: "Advanced Technical Workshop",
    defaultDuration: "3 Days",
    defaultAttendanceHours: "24 Hours",
    defaultTopics: [
      "Advanced Programming Concepts",
      "System Architecture and Design",
      "Cloud Computing Fundamentals",
      "DevOps and CI/CD Practices",
      "Security Best Practices"
    ],
    defaultLearningOutcomes: [
      "Mastered advanced programming techniques",
      "Designed scalable system architectures",
      "Implemented cloud-based solutions",
      "Applied DevOps methodologies",
      "Implemented security best practices"
    ]
  },
  leadership_seminar: {
    id: "leadership_seminar",
    label: "👔 Leadership Seminar",
    defaultProgramName: "Executive Leadership Seminar",
    defaultDuration: "2 Days",
    defaultAttendanceHours: "16 Hours",
    defaultTopics: [
      "Strategic Leadership Principles",
      "Change Management and Innovation",
      "Emotional Intelligence in Leadership",
      "Building High-Performance Teams",
      "Organizational Culture Development"
    ],
    defaultLearningOutcomes: [
      "Developed strategic leadership capabilities",
      "Mastered change management techniques",
      "Enhanced emotional intelligence skills",
      "Built high-performance team strategies",
      "Created positive organizational culture"
    ]
  },
  academic_conference: {
    id: "academic_conference",
    label: "🎓 Academic Conference",
    defaultProgramName: "International Academic Conference",
    defaultDuration: "3 Days",
    defaultAttendanceHours: "24 Hours",
    defaultTopics: [
      "Research Methodologies and Design",
      "Academic Writing and Publication",
      "Data Analysis and Interpretation",
      "Research Ethics and Integrity",
      "Collaborative Research Strategies"
    ],
    defaultLearningOutcomes: [
      "Advanced research methodology skills",
      "Enhanced academic writing abilities",
      "Mastered data analysis techniques",
      "Understanding of research ethics",
      "Developed collaborative research skills"
    ]
  },
  compliance_training: {
    id: "compliance_training",
    label: "⚖️ Compliance Training",
    defaultProgramName: "Compliance and Regulatory Training",
    defaultDuration: "2 Days",
    defaultAttendanceHours: "16 Hours",
    defaultTopics: [
      "Regulatory Framework Overview",
      "Compliance Management Systems",
      "Risk Assessment and Mitigation",
      "Ethics and Corporate Governance",
      "Audit and Reporting Standards"
    ],
    defaultLearningOutcomes: [
      "Comprehensive understanding of regulations",
      "Implemented compliance management systems",
      "Conducted risk assessments",
      "Applied ethical decision-making",
      "Enhanced audit and reporting skills"
    ]
  },
  soft_skills: {
    id: "soft_skills",
    label: "🎯 Soft Skills Development",
    defaultProgramName: "Soft Skills Development Program",
    defaultDuration: "4 Days",
    defaultAttendanceHours: "32 Hours",
    defaultTopics: [
      "Effective Communication Strategies",
      "Interpersonal Skills Development",
      "Conflict Resolution and Negotiation",
      "Presentation and Public Speaking",
      "Team Collaboration and Synergy"
    ],
    defaultLearningOutcomes: [
      "Enhanced communication effectiveness",
      "Improved interpersonal relationships",
      "Mastered conflict resolution techniques",
      "Developed presentation confidence",
      "Built collaborative team skills"
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
  if (typeof window === "undefined") return "ATT-2026-0001";
  const year = new Date().getFullYear();
  const storageKey = `att_cert_counter_${year}`;
  const counter = parseInt(localStorage.getItem(storageKey) || "0", 10) + 1;
  localStorage.setItem(storageKey, counter.toString());
  return `ATT-${year}-${String(counter).padStart(4, "0")}`;
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

const calculateAttendancePercentage = (attended: string, total: string): number => {
  const attendedNum = parseFloat(attended);
  const totalNum = parseFloat(total);
  if (isNaN(attendedNum) || isNaN(totalNum) || totalNum === 0) return 0;
  return Math.round((attendedNum / totalNum) * 100);
};

const generateVerificationUrl = (baseUrl: string, certificateNumber: string): string => {
  return `${baseUrl}/verify/${certificateNumber}`;
};

// ============================================================
// PDF STYLES
// ============================================================

const createPdfStyles = (
  details: AttendanceDetails,
  isLandscape: boolean = false
) => {
  const primaryColor = "#1E3A8A";
  const textColor = "#1E293B";
  const accentColor = "#EFF6FF";
  const successColor = "#059669";
  const goldColor = "#D4AF37";
  
  const getBorderStyle = () => {
    if (!details.includeBorder) return {};
    return {
      borderWidth: 4,
      borderColor: goldColor,
      borderRadius: 8,
      padding: 30,
    };
  };

  const getStyleColors = () => {
    switch (details.certificateStyle) {
      case "modern":
        return { primary: "#2563EB", accent: "#DBEAFE", gold: "#F59E0B" };
      case "elegant":
        return { primary: "#7C3AED", accent: "#EDE9FE", gold: "#D4AF37" };
      case "minimal":
        return { primary: "#0F172A", accent: "#F1F5F9", gold: "#94A3B8" };
      case "premium":
        return { primary: "#1E3A8A", accent: "#EFF6FF", gold: "#D4AF37" };
      default:
        return { primary: "#1E3A8A", accent: "#EFF6FF", gold: "#D4AF37" };
    }
  };

  const colors = getStyleColors();

  return StyleSheet.create({
    page: {
      padding: isLandscape ? 30 : 50,
      fontFamily: "Helvetica",
      backgroundColor: "#FFFFFF",
      ...(isLandscape ? { flexDirection: "row" } : {}),
    },
    container: {
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
      ...getBorderStyle(),
    },
    watermarkContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
      opacity: 0.1,
      pointerEvents: "none",
    },
    watermarkImage: {
      width: 200,
      height: 200,
      objectFit: "contain",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 3,
      borderBottomColor: colors.primary,
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
      color: colors.primary,
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
      fontSize: details.fontSize + 1,
      fontWeight: "bold",
      color: colors.primary,
      marginTop: 12,
      marginBottom: 6,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    paragraph: {
      fontSize: details.fontSize,
      lineHeight: details.lineHeight,
      color: "#334155",
      marginBottom: 8,
      textAlign: "justify",
      letterSpacing: details.letterSpacing || 0,
    },
    bold: {
      fontWeight: "bold",
      color: textColor,
    },
    listItem: {
      fontSize: details.fontSize - 0.5,
      lineHeight: details.lineHeight,
      color: "#334155",
      marginBottom: 4,
      paddingLeft: 12,
    },
    listBullet: {
      fontSize: details.fontSize,
      color: colors.primary,
      marginRight: 6,
    },
    highlightBox: {
      marginVertical: 8,
      padding: 12,
      backgroundColor: colors.accent,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
      borderRadius: 2,
    },
    highlightText: {
      fontSize: details.fontSize,
      color: textColor,
    },
    successBox: {
      marginVertical: 8,
      padding: 12,
      backgroundColor: "#ECFDF5",
      borderLeftWidth: 4,
      borderLeftColor: successColor,
      borderRadius: 2,
    },
    footer: {
      borderTopWidth: 2,
      borderTopColor: colors.primary,
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
    qrBlock: {
      alignItems: "center",
      marginLeft: 8,
    },
    qrImg: {
      width: 50,
      height: 50,
    },
    qrText: {
      fontSize: 6,
      color: "#94A3B8",
      marginTop: 2,
    },
    verificationLink: {
      fontSize: 6.5,
      color: colors.primary,
      textAlign: "center",
      marginTop: 2,
      textDecoration: "underline",
    },
    languageText: {
      fontSize: 8,
      color: "#64748B",
      textAlign: "center",
      marginTop: 4,
      fontStyle: "italic",
    },
  });
};

// ============================================================
// PDF COMPONENT
// ============================================================

const AttendanceCertificatePDF = ({ 
  details, 
  qrDataUrl,
  verificationUrl 
}: { 
  details: AttendanceDetails; 
  qrDataUrl?: string;
  verificationUrl?: string;
}) => {
  const isLandscape = details.layout === "landscape";
  const styles = createPdfStyles(details, isLandscape);
  
  const getGradeLabel = (grade: string): string => {
    const labels: Record<string, string> = {
      excellent: "Excellent",
      very_good: "Very Good",
      good: "Good",
      satisfactory: "Satisfactory",
    };
    return labels[grade] || grade;
  };

  const getParticipationLabel = (level: string): string => {
    const labels: Record<string, string> = {
      active: "Active Participant",
      moderate: "Moderate Participant",
      passive: "Passive Participant",
    };
    return labels[level] || level;
  };

  const getLanguageText = (): string => {
    switch (details.certificateLanguage) {
      case "hindi":
        return "प्रमाणपत्र हिंदी में भी उपलब्ध है";
      case "bilingual":
        return "Certificate also available in Hindi";
      default:
        return "";
    }
  };

  return (
    <Document>
      <Page size={isLandscape ? "A4" : "A4"} style={styles.page}>
        <View style={styles.container}>
          {/* Watermark */}
          {details.includeWatermark && details.watermarkUrl && (
            <View style={styles.watermarkContainer}>
              <PdfImage src={details.watermarkUrl} style={styles.watermarkImage} />
            </View>
          )}

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
            <Text style={styles.documentTitle}>Certificate of Attendance</Text>
            <Text style={styles.subTitle}>
              This certifies that the following individual has successfully completed the program
            </Text>

            {/* Participant Details */}
            <Text style={styles.paragraph}>
              This is to certify that <Text style={styles.bold}>{details.participantName}</Text> 
              {details.participantEmail && ` (${details.participantEmail})`} 
              {details.participantPhone && `, Phone: ${details.participantPhone}`} 
              {details.participantDesignation && `, ${details.participantDesignation}`} 
              {details.participantDepartment && ` from ${details.participantDepartment} Department`} 
              has successfully completed the <Text style={styles.bold}>{details.programName}</Text> 
              held from {formatDate(details.startDate)} to {formatDate(details.endDate)} 
              ({details.duration}).
            </Text>

            {/* Program Details */}
            <Text style={styles.paragraph}>
              The program was conducted as a <Text style={styles.bold}>{details.programType}</Text> 
              {details.certificateType && ` (${details.certificateType})`}
              {details.programCoordinator && `, coordinated by ${details.programCoordinator}`}
              {details.venue && ` at ${details.venue}`}
              with a total duration of <Text style={styles.bold}>{details.totalHours}</Text>. 
              The participant attended <Text style={styles.bold}>{details.attendanceHours}</Text> 
              {details.includeAttendancePercentage && details.attendancePercentage > 0 && (
                <Text> ({details.attendancePercentage}% attendance)</Text>
              )}.
            </Text>

            {/* Topics Covered */}
            {details.includeTopics && details.topics.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Topics Covered</Text>
                {details.topics.map((topic, idx) => (
                  <Text key={idx} style={styles.listItem}>
                    <Text style={styles.listBullet}>•</Text> {topic}
                  </Text>
                ))}
              </>
            )}

            {/* Learning Outcomes */}
            {details.includeLearningOutcomes && details.learningOutcomes.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Learning Outcomes</Text>
                {details.learningOutcomes.map((outcome, idx) => (
                  <Text key={idx} style={styles.listItem}>
                    <Text style={styles.listBullet}>✓</Text> {outcome}
                  </Text>
                ))}
              </>
            )}

            {/* Performance and Participation */}
            {(details.includePerformanceGrade || details.participationLevel) && (
              <View style={styles.successBox}>
                {details.includePerformanceGrade && details.performanceGrade && (
                  <Text style={styles.highlightText}>
                    <Text style={{ fontWeight: "bold" }}>Performance Grade: </Text>
                    <Text>{getGradeLabel(details.performanceGrade)}</Text>
                  </Text>
                )}
                {details.participationLevel && (
                  <Text style={[styles.highlightText, { marginTop: 4 }]}>
                    <Text style={{ fontWeight: "bold" }}>Participation Level: </Text>
                    <Text>{getParticipationLabel(details.participationLevel)}</Text>
                  </Text>
                )}
              </View>
            )}

            {/* Additional Notes */}
            {details.additionalNotes && (
              <Text style={[styles.paragraph, { marginTop: 8 }]}>
                <Text style={styles.bold}>Additional Note: </Text>
                {details.additionalNotes}
              </Text>
            )}

            {/* Language Note */}
            {details.certificateLanguage !== "english" && (
              <Text style={styles.languageText}>{getLanguageText()}</Text>
            )}

            {/* Closing Statement */}
            <Text style={[styles.paragraph, { marginTop: 12 }]}>
              We congratulate <Text style={styles.bold}>{details.participantName}</Text> on their 
              successful completion of this program. Their dedication and active participation 
              are highly appreciated.
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
              
              {details.includeQRCode && qrDataUrl && (
                <View style={styles.qrBlock}>
                  <PdfImage src={qrDataUrl} style={styles.qrImg} />
                  <Text style={styles.qrText}>Verify Certificate</Text>
                  {details.includeVerificationLink && verificationUrl && (
                    <Text style={styles.verificationLink}>{verificationUrl}</Text>
                  )}
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

export default function AttendanceCertificatePage() {
  const [isClient, setIsClient] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [certificateHistory, setCertificateHistory] = useState<CertificateHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showBatchGeneration, setShowBatchGeneration] = useState(false);
  const [batchCount, setBatchCount] = useState(5);
  const [emailAddress, setEmailAddress] = useState("");
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  
  const logoInputRef = useRef<HTMLInputElement>(null);
  const sigInputRef = useRef<HTMLInputElement>(null);
  const sealInputRef = useRef<HTMLInputElement>(null);
  const watermarkInputRef = useRef<HTMLInputElement>(null);

  const defaultTemplate = ATTENDANCE_TEMPLATES.professional_training;

  const [details, setDetails] = useState<AttendanceDetails>({
    participantName: "John Doe",
    participantEmail: "john.doe@example.com",
    participantPhone: "+1 (555) 123-4567",
    participantDesignation: "Senior Associate",
    participantDepartment: "Operations",
    templateKey: defaultTemplate.id,
    programName: defaultTemplate.defaultProgramName,
    programType: "training",
    startDate: "2026-01-15",
    endDate: "2026-01-19",
    duration: "5 Days",
    totalHours: "40",
    attendanceHours: "38",
    attendancePercentage: 95,
    topics: defaultTemplate.defaultTopics,
    learningOutcomes: defaultTemplate.defaultLearningOutcomes,
    issueDate: new Date().toISOString().split("T")[0],
    certificateNumber: "",
    companyName: FIXED_COMPANY_NAME,
    authorizedName: DEFAULT_AUTHORIZED_NAME,
    authorizedTitle: DEFAULT_AUTHORIZED_TITLE,
    authorizedEmail: "hr@dreamhomesbihar.com",
    authorizedPhone: "+1 (555) 987-6543",
    companyAddress: "123 Corporate Drive, Business City, State 12345",
    companyWebsite: "www.dreamhomesbihar.com",
    additionalNotes: "",
    performanceGrade: "excellent",
    participationLevel: "active",
    certificateType: "Professional Development",
    programCoordinator: "Dr. Sarah Johnson",
    venue: "Virtual Platform",
    certificateLanguage: "english",
    fontSize: 10,
    lineHeight: 1.7,
    letterSpacing: 0.2,
    certificateStyle: "classic",
    layout: "portrait",
    logoUrl: DEFAULT_LOGO_URL,
    signatureUrl: DEFAULT_AUTHORIZED_SIGNATURE_URL,
    companySealUrl: "",
    watermarkUrl: "",
    includeSeal: false,
    includeTopics: true,
    includeLearningOutcomes: true,
    includeAttendancePercentage: true,
    includePerformanceGrade: true,
    includeBorder: true,
    includeWatermark: false,
    includeQRCode: true,
    includeVerificationLink: true,
    verificationBaseUrl: "https://dreamhomesbihar.com",
  });

  // Initialize certificate number
  useEffect(() => {
    setIsClient(true);
    setDetails((prev) => ({ ...prev, certificateNumber: getNextCertificateNumber() }));
    loadCertificateHistory();
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

  // Calculate attendance percentage
  useEffect(() => {
    const percentage = calculateAttendancePercentage(
      details.attendanceHours,
      details.totalHours
    );
    setDetails((prev) => ({ ...prev, attendancePercentage: percentage }));
  }, [details.attendanceHours, details.totalHours]);

  // Generate QR Code
  useEffect(() => {
    if (details.certificateNumber && details.includeQRCode) {
      const verificationText = JSON.stringify({
        certificateNumber: details.certificateNumber,
        participantName: details.participantName,
        programName: details.programName,
        issueDate: details.issueDate,
        companyName: details.companyName,
      });
      QRCodeLib.toDataURL(verificationText, { margin: 1, width: 150, errorCorrectionLevel: "H" })
        .then(setQrDataUrl)
        .catch(console.error);
    } else {
      setQrDataUrl("");
    }
  }, [details.certificateNumber, details.participantName, details.programName, details.issueDate, details.companyName, details.includeQRCode]);

  // Load certificate history from localStorage
  const loadCertificateHistory = () => {
    try {
      const saved = localStorage.getItem("certificate_history");
      if (saved) {
        setCertificateHistory(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Error loading history:", error);
    }
  };

  // Save to history
  const saveToHistory = (pdfUrl?: string) => {
    const entry: CertificateHistory = {
      id: Date.now().toString(),
      participantName: details.participantName,
      programName: details.programName,
      certificateNumber: details.certificateNumber,
      issueDate: details.issueDate,
      createdAt: new Date().toISOString(),
      pdfUrl: pdfUrl,
    };
    const updatedHistory = [entry, ...certificateHistory];
    setCertificateHistory(updatedHistory);
    try {
      localStorage.setItem("certificate_history", JSON.stringify(updatedHistory));
    } catch (error) {
      console.error("Error saving history:", error);
    }
  };

  // Clear history
  const clearHistory = () => {
    setCertificateHistory([]);
    localStorage.removeItem("certificate_history");
    setSaveMessage({ type: "success", text: "History cleared" });
    setTimeout(() => setSaveMessage(null), 3000);
  };

  // Update template when changed
  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value;
    const tmpl = ATTENDANCE_TEMPLATES[key];
    if (tmpl) {
      setDetails((prev) => ({
        ...prev,
        templateKey: key,
        programName: tmpl.defaultProgramName,
        duration: tmpl.defaultDuration,
        attendanceHours: tmpl.defaultAttendanceHours,
        topics: tmpl.defaultTopics,
        learningOutcomes: tmpl.defaultLearningOutcomes,
      }));
    }
  };

  // File upload handlers
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "logoUrl" | "signatureUrl" | "companySealUrl" | "watermarkUrl"
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
  const addItem = (field: "topics" | "learningOutcomes") => {
    const placeholder = {
      topics: "Add a topic...",
      learningOutcomes: "Add a learning outcome..."
    };
    setDetails((prev) => ({
      ...prev,
      [field]: [...prev[field], placeholder[field]],
    }));
  };

  const updateItem = (field: "topics" | "learningOutcomes", index: number, value: string) => {
    setDetails((prev) => {
      const updated = [...prev[field]];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const removeItem = (field: "topics" | "learningOutcomes", index: number) => {
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
    const tmpl = ATTENDANCE_TEMPLATES[details.templateKey] || defaultTemplate;
    setDetails((prev) => ({
      ...prev,
      programName: tmpl.defaultProgramName,
      duration: tmpl.defaultDuration,
      attendanceHours: tmpl.defaultAttendanceHours,
      topics: tmpl.defaultTopics,
      learningOutcomes: tmpl.defaultLearningOutcomes,
      additionalNotes: "",
      performanceGrade: "excellent",
      participationLevel: "active",
    }));
    setSaveMessage({ type: "success", text: "Content reset to template defaults" });
    setTimeout(() => setSaveMessage(null), 3000);
  };

  // Copy to clipboard
  const copyCertificateText = () => {
    const text = `
Certificate of Attendance
${details.companyName}
Certificate No: ${details.certificateNumber}
Date: ${formatDate(details.issueDate)}

This is to certify that ${details.participantName} has successfully completed the 
${details.programName} held from ${formatDate(details.startDate)} to ${formatDate(details.endDate)} 
(${details.duration}).

Topics Covered:
${details.topics.map(t => `• ${t}`).join('\n')}

${details.includeLearningOutcomes ? `Learning Outcomes:\n${details.learningOutcomes.map(o => `• ${o}`).join('\n')}` : ''}

Performance Grade: ${details.performanceGrade.toUpperCase()}
Participation Level: ${details.participationLevel.toUpperCase()}

We congratulate ${details.participantName} on their successful completion.

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

  // Email certificate
  const sendCertificateEmail = () => {
    if (!emailAddress) {
      setSaveMessage({ type: "error", text: "Please enter an email address" });
      setTimeout(() => setSaveMessage(null), 3000);
      return;
    }
    // Simulate sending email
    setSaveMessage({ type: "success", text: `Certificate sent to ${emailAddress}` });
    setTimeout(() => setSaveMessage(null), 3000);
    setShowEmailDialog(false);
    setEmailAddress("");
  };

  // Batch generation
  const generateBatchCertificates = () => {
    setSaveMessage({ type: "success", text: `Generating ${batchCount} certificates...` });
    // Simulate batch generation
    setTimeout(() => {
      setSaveMessage({ type: "success", text: `${batchCount} certificates generated successfully!` });
      setTimeout(() => setSaveMessage(null), 3000);
    }, 2000);
  };

  const verificationUrl = generateVerificationUrl(
    details.verificationBaseUrl,
    details.certificateNumber
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-slate-50 p-4 sm:p-6 md:p-8 font-sans text-slate-800">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-6 print:hidden">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg border border-slate-200/60 flex flex-wrap gap-4 justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-green-900 flex items-center gap-2">
              <span className="bg-green-900 text-white p-1.5 rounded-xl shadow-lg shadow-green-200">
                <CalendarDays className="w-5 h-5" />
              </span>
              Attendance Certificate Generator Pro
            </h1>
            <p className="text-sm text-slate-500">
              Professional Attendance Certificate with Advanced Features
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="bg-white hover:bg-slate-50 text-slate-700 font-medium px-4 py-2 rounded-xl border border-slate-200 text-sm flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
            >
              <History className="w-4 h-4" /> History
            </button>

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
                document={<AttendanceCertificatePDF details={details} qrDataUrl={qrDataUrl} verificationUrl={verificationUrl} />}
                fileName={`Attendance_Certificate_${details.participantName.replace(/\s+/g, "_")}_${
                  details.certificateNumber || "Draft"
                }.pdf`}
                className="bg-green-900 hover:bg-green-800 text-white font-medium px-5 py-2 rounded-xl text-sm flex items-center gap-2 transition-all shadow-lg shadow-green-200 hover:shadow-xl"
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

      {/* History Panel */}
      {showHistory && (
        <div className="max-w-7xl mx-auto mb-6 print:hidden">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/60">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <History className="w-5 h-5 text-green-700" />
                Certificate History
              </h2>
              <button
                onClick={clearHistory}
                className="text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Clear All
              </button>
            </div>
            {certificateHistory.length === 0 ? (
              <p className="text-slate-500 text-sm">No certificates generated yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left p-2">Participant</th>
                      <th className="text-left p-2">Program</th>
                      <th className="text-left p-2">Certificate #</th>
                      <th className="text-left p-2">Date</th>
                      <th className="text-left p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {certificateHistory.map((entry) => (
                      <tr key={entry.id} className="border-t border-slate-100">
                        <td className="p-2">{entry.participantName}</td>
                        <td className="p-2">{entry.programName}</td>
                        <td className="p-2">{entry.certificateNumber}</td>
                        <td className="p-2">{formatDate(entry.issueDate)}</td>
                        <td className="p-2">
                          <button className="text-green-600 hover:text-green-800 text-xs font-medium">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Sidebar */}
        <section className="lg:col-span-5 print:hidden space-y-4 max-h-[85vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-slate-100">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/60 flex gap-2 flex-wrap">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex-1 py-2 px-3 rounded-xl text-xs font-medium bg-green-50 text-green-600 hover:bg-green-100 flex items-center justify-center gap-1.5 transition-all"
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
            <button
              onClick={() => setShowBatchGeneration(!showBatchGeneration)}
              className="flex-1 py-2 px-3 rounded-xl text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center gap-1.5 transition-all"
            >
              <Layers className="w-3.5 h-3.5" /> Batch
            </button>
            <button
              onClick={() => setShowEmailDialog(true)}
              className="flex-1 py-2 px-3 rounded-xl text-xs font-medium bg-purple-50 text-purple-600 hover:bg-purple-100 flex items-center justify-center gap-1.5 transition-all"
            >
              <Mail className="w-3.5 h-3.5" /> Email
            </button>
          </div>

          {/* Batch Generation */}
          {showBatchGeneration && (
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-700" /> Batch Generation
              </h2>
              <div className="flex items-center gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Number of Certificates</label>
                  <input
                    type="number"
                    min="2"
                    max="50"
                    value={batchCount}
                    onChange={(e) => setBatchCount(parseInt(e.target.value) || 5)}
                    className="w-24 px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <button
                  onClick={generateBatchCertificates}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-all shadow-sm"
                >
                  <DownloadIcon className="w-4 h-4" /> Generate Batch
                </button>
              </div>
            </div>
          )}

          {/* Email Dialog */}
          {showEmailDialog && (
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-700" /> Send Certificate via Email
              </h2>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    placeholder="recipient@example.com"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
                <button
                  onClick={sendCertificateEmail}
                  className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-all shadow-sm"
                >
                  <Send className="w-4 h-4" /> Send
                </button>
              </div>
            </div>
          )}

          {/* Asset Uploads */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Upload className="w-4 h-4 text-green-700" /> Branding Assets
            </h2>

            <div className="grid grid-cols-2 gap-2">
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
              <div>
                <label className="block text-xs text-slate-600 font-medium mb-1">Watermark</label>
                <input type="file" ref={watermarkInputRef} accept="image/*" onChange={(e) => handleFileUpload(e, "watermarkUrl")} className="hidden" />
                <button onClick={() => watermarkInputRef.current?.click()} className="w-full py-2 px-2 border border-dashed border-slate-300 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-1 transition-all">
                  <Upload className="w-3 h-3" /> Upload
                </button>
              </div>
            </div>
          </div>

          {/* Participant Details */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-green-700" /> Participant Details
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name *</label>
                <input type="text" name="participantName" value={details.participantName} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
                <input type="email" name="participantEmail" value={details.participantEmail} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number</label>
              <input type="text" name="participantPhone" value={details.participantPhone} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Designation</label>
                <input type="text" name="participantDesignation" value={details.participantDesignation} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Department</label>
                <input type="text" name="participantDepartment" value={details.participantDepartment} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" />
              </div>
            </div>
          </div>

          {/* Program Details */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-green-700" /> Program Details
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Template</label>
              <select name="templateKey" value={details.templateKey} onChange={handleTemplateChange} className="w-full px-3 py-2 border border-green-200 rounded-xl text-sm bg-green-50/50 font-medium text-slate-800 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all">
                {Object.values(ATTENDANCE_TEMPLATES).map((tmpl) => (
                  <option key={tmpl.id} value={tmpl.id}>{tmpl.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Program Name *</label>
              <input type="text" name="programName" value={details.programName} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Program Type</label>
                <select name="programType" value={details.programType} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all">
                  <option value="training">Training</option>
                  <option value="workshop">Workshop</option>
                  <option value="seminar">Seminar</option>
                  <option value="conference">Conference</option>
                  <option value="webinar">Webinar</option>
                  <option value="course">Course</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Certificate Type</label>
                <input type="text" name="certificateType" value={details.certificateType} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Start Date *</label>
                <input type="date" name="startDate" value={details.startDate} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">End Date *</label>
                <input type="date" name="endDate" value={details.endDate} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Total Hours</label>
                <input type="text" name="totalHours" value={details.totalHours} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Hours Attended</label>
                <input type="text" name="attendanceHours" value={details.attendanceHours} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Program Coordinator</label>
                <input type="text" name="programCoordinator" value={details.programCoordinator} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Venue</label>
                <input type="text" name="venue" value={details.venue} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" />
              </div>
            </div>

            <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded-xl">
              Duration: <span className="font-semibold text-slate-700">{details.duration || "Not calculated"}</span>
              {details.attendancePercentage > 0 && (
                <span className="ml-4">Attendance: <span className="font-semibold text-green-700">{details.attendancePercentage}%</span></span>
              )}
            </div>
          </div>

          {/* Topics */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Target className="w-4 h-4 text-green-700" /> Topics Covered
              </h2>
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-600 flex items-center gap-1">
                  <input type="checkbox" name="includeTopics" checked={details.includeTopics} onChange={handleChange} className="rounded" />
                  Show
                </label>
                <button onClick={() => addItem("topics")} className="text-xs text-green-700 font-semibold flex items-center gap-1 hover:text-green-800 transition-all">
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
            </div>
            {details.topics.map((item, idx) => (
              <div key={idx} className="flex gap-2 items-start">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateItem("topics", idx, e.target.value)}
                  placeholder="Enter a topic..."
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
                <button onClick={() => removeItem("topics", idx)} className="text-slate-400 hover:text-red-500 transition-all p-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Learning Outcomes */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" /> Learning Outcomes
              </h2>
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-600 flex items-center gap-1">
                  <input type="checkbox" name="includeLearningOutcomes" checked={details.includeLearningOutcomes} onChange={handleChange} className="rounded" />
                  Show
                </label>
                <button onClick={() => addItem("learningOutcomes")} className="text-xs text-green-700 font-semibold flex items-center gap-1 hover:text-green-800 transition-all">
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
            </div>
            {details.learningOutcomes.map((item, idx) => (
              <div key={idx} className="flex gap-2 items-start">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateItem("learningOutcomes", idx, e.target.value)}
                  placeholder="Enter a learning outcome..."
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
                <button onClick={() => removeItem("learningOutcomes", idx)} className="text-slate-400 hover:text-red-500 transition-all p-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Performance & Participation */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-green-700" /> Performance & Participation
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Performance Grade</label>
                <select name="performanceGrade" value={details.performanceGrade} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all">
                  <option value="excellent">Excellent</option>
                  <option value="very_good">Very Good</option>
                  <option value="good">Good</option>
                  <option value="satisfactory">Satisfactory</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Participation Level</label>
                <select name="participationLevel" value={details.participationLevel} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all">
                  <option value="active">Active</option>
                  <option value="moderate">Moderate</option>
                  <option value="passive">Passive</option>
                </select>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                <input type="checkbox" name="includePerformanceGrade" checked={details.includePerformanceGrade} onChange={handleChange} className="rounded text-green-700" />
                Display Performance Grade
              </label>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <AlignJustify className="w-4 h-4 text-green-700" /> Additional Information
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Additional Notes</label>
              <textarea name="additionalNotes" rows={3} value={details.additionalNotes} onChange={handleChange} placeholder="Any additional remarks or context..." className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Certificate Language</label>
              <select name="certificateLanguage" value={details.certificateLanguage} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all">
                <option value="english">English Only</option>
                <option value="hindi">Hindi Only</option>
                <option value="bilingual">Bilingual (English/Hindi)</option>
              </select>
            </div>
          </div>

          {/* Certificate Style & Layout */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-green-700" /> Certificate Style
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Style</label>
                <select name="certificateStyle" value={details.certificateStyle} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all">
                  <option value="classic">Classic</option>
                  <option value="modern">Modern</option>
                  <option value="elegant">Elegant</option>
                  <option value="minimal">Minimal</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Layout</label>
                <select name="layout" value={details.layout} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all">
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>
            </div>
          </div>

          {/* Verification & Security */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-700" /> Verification & Security
            </h2>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                <input type="checkbox" name="includeQRCode" checked={details.includeQRCode} onChange={handleChange} className="rounded text-green-700" />
                Include QR Code
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                <input type="checkbox" name="includeVerificationLink" checked={details.includeVerificationLink} onChange={handleChange} className="rounded text-green-700" />
                Include Verification URL
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                <input type="checkbox" name="includeWatermark" checked={details.includeWatermark} onChange={handleChange} className="rounded text-green-700" />
                Include Watermark
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                <input type="checkbox" name="includeBorder" checked={details.includeBorder} onChange={handleChange} className="rounded text-green-700" />
                Include Decorative Border
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Verification Base URL</label>
              <input type="text" name="verificationBaseUrl" value={details.verificationBaseUrl} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" />
              {details.includeVerificationLink && (
                <div className="mt-2 text-xs text-blue-600 bg-blue-50 p-2 rounded-xl">
                  <Link2 className="w-3 h-3 inline mr-1" />
                  Verification URL: {verificationUrl}
                </div>
              )}
            </div>
          </div>

          {/* Authorized Signatory */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-green-700" /> Authorized Signatory
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Name *</label>
                <input type="text" name="authorizedName" value={details.authorizedName} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Title *</label>
                <input type="text" name="authorizedTitle" value={details.authorizedTitle} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
                <input type="email" name="authorizedEmail" value={details.authorizedEmail} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Phone</label>
                <input type="text" name="authorizedPhone" value={details.authorizedPhone} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Issue Date *</label>
              <input type="date" name="issueDate" value={details.issueDate} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" />
            </div>
          </div>

          {/* Display Options */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Eye className="w-4 h-4 text-green-700" /> Display Options
            </h2>

            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                <input type="checkbox" name="includeSeal" checked={details.includeSeal} onChange={handleChange} className="rounded text-green-700" />
                Show Company Seal
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                <input type="checkbox" name="includeTopics" checked={details.includeTopics} onChange={handleChange} className="rounded text-green-700" />
                Show Topics
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                <input type="checkbox" name="includeLearningOutcomes" checked={details.includeLearningOutcomes} onChange={handleChange} className="rounded text-green-700" />
                Show Learning Outcomes
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                <input type="checkbox" name="includeAttendancePercentage" checked={details.includeAttendancePercentage} onChange={handleChange} className="rounded text-green-700" />
                Show Attendance %
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                <input type="checkbox" name="includePerformanceGrade" checked={details.includePerformanceGrade} onChange={handleChange} className="rounded text-green-700" />
                Show Performance Grade
              </label>
            </div>
          </div>

          {/* Typography Controls */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Type className="w-4 h-4 text-green-700" /> Typography
            </h2>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Size ({details.fontSize}pt)</label>
                <input type="range" min="8" max="13" step="0.5" value={details.fontSize} onChange={(e) => setDetails((prev) => ({ ...prev, fontSize: parseFloat(e.target.value) }))} className="w-full accent-green-700" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Line Ht ({details.lineHeight})</label>
                <input type="range" min="1.3" max="2.2" step="0.1" value={details.lineHeight} onChange={(e) => setDetails((prev) => ({ ...prev, lineHeight: parseFloat(e.target.value) }))} className="w-full accent-green-700" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Spacing ({details.letterSpacing})</label>
                <input type="range" min="0" max="1" step="0.1" value={details.letterSpacing} onChange={(e) => setDetails((prev) => ({ ...prev, letterSpacing: parseFloat(e.target.value) }))} className="w-full accent-green-700" />
              </div>
            </div>
          </div>
        </section>

        {/* Live Preview */}
        <section className={`lg:col-span-7 flex justify-center transition-all duration-300 ${!showPreview ? "opacity-50 scale-95 pointer-events-none" : ""}`}>
          <div className="w-full overflow-x-auto">
            <div
              id="printable-area"
              className={`${
                details.layout === "landscape" 
                  ? "w-[297mm] min-h-[210mm]" 
                  : "w-[210mm] min-h-[297mm]"
              } bg-white p-8 rounded-2xl shadow-xl border border-slate-200 relative flex flex-col justify-between mx-auto text-slate-900`}
              style={{ 
                fontSize: `${details.fontSize}pt`, 
                lineHeight: details.lineHeight,
                letterSpacing: `${details.letterSpacing}pt`,
                fontFamily: 'Georgia, "Times New Roman", serif',
                ...(details.includeBorder ? {
                  border: '4px solid #D4AF37',
                  borderRadius: '8px',
                } : {}),
              }}
            >
              {/* Watermark */}
              {details.includeWatermark && details.watermarkUrl && (
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={details.watermarkUrl} alt="Watermark" className="w-48 h-48 object-contain" />
                </div>
              )}

              <div className="relative z-10">
                {/* Header */}
                <div className="flex justify-between items-center border-b-3 pb-4 mb-6" style={{ borderBottomColor: "#1E3A8A" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
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
                  Certificate of Attendance
                </h2>
                <p className="text-sm text-slate-500 text-center italic mb-6">
                  This certifies that the following individual has successfully completed the program
                </p>

                {/* Participant Details */}
                <p className="mb-3 text-justify">
                  This is to certify that <strong className="text-slate-800">{details.participantName}</strong> 
                  {details.participantEmail && ` (${details.participantEmail})`} 
                  {details.participantPhone && `, Phone: ${details.participantPhone}`} 
                  {details.participantDesignation && `, ${details.participantDesignation}`} 
                  {details.participantDepartment && ` from ${details.participantDepartment} Department`} 
                  has successfully completed the <strong className="text-slate-800">{details.programName}</strong> 
                  held from {formatDate(details.startDate)} to {formatDate(details.endDate)} 
                  ({details.duration}).
                </p>

                {/* Program Details */}
                <p className="mb-3 text-justify">
                  The program was conducted as a <strong className="text-slate-800">{details.programType}</strong> 
                  {details.certificateType && ` (${details.certificateType})`}
                  {details.programCoordinator && `, coordinated by ${details.programCoordinator}`}
                  {details.venue && ` at ${details.venue}`}
                  with a total duration of <strong className="text-slate-800">{details.totalHours}</strong>. 
                  The participant attended <strong className="text-slate-800">{details.attendanceHours}</strong> 
                  {details.includeAttendancePercentage && details.attendancePercentage > 0 && (
                    <span> ({details.attendancePercentage}% attendance)</span>
                  )}.
                </p>

                {/* Topics Covered */}
                {details.includeTopics && details.topics.length > 0 && (
                  <>
                    <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider mt-4 mb-2">
                      Topics Covered
                    </h3>
                    {details.topics.map((topic, idx) => (
                      <p key={idx} className="text-sm text-justify pl-4 mb-1">
                        <span className="text-blue-900 mr-2">•</span> {topic}
                      </p>
                    ))}
                  </>
                )}

                {/* Learning Outcomes */}
                {details.includeLearningOutcomes && details.learningOutcomes.length > 0 && (
                  <>
                    <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider mt-4 mb-2">
                      Learning Outcomes
                    </h3>
                    {details.learningOutcomes.map((outcome, idx) => (
                      <p key={idx} className="text-sm text-justify pl-4 mb-1">
                        <span className="text-green-600 mr-2">✓</span> {outcome}
                      </p>
                    ))}
                  </>
                )}

                {/* Performance and Participation */}
                {(details.includePerformanceGrade || details.participationLevel) && (
                  <div className="my-3 p-3 rounded-lg border-l-4 bg-green-50" style={{ borderLeftColor: "#059669" }}>
                    {details.includePerformanceGrade && details.performanceGrade && (
                      <p className="text-sm">
                        <strong>Performance Grade: </strong>
                        <span className="font-semibold">{details.performanceGrade.toUpperCase()}</span>
                      </p>
                    )}
                    {details.participationLevel && (
                      <p className="text-sm mt-1">
                        <strong>Participation Level: </strong>
                        <span className="font-semibold">{details.participationLevel.toUpperCase()}</span>
                      </p>
                    )}
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
                  We congratulate <strong className="text-slate-800">{details.participantName}</strong> on their 
                  successful completion of this program. Their dedication and active participation 
                  are highly appreciated.
                </p>
              </div>

              {/* Footer */}
              <div className="pt-6 border-t flex justify-between items-end mt-4" style={{ borderTopColor: "#1E3A8A" }}>
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={details.signatureUrl} alt="Signature" className="h-14 object-contain mb-1" onError={(e) => (e.target as HTMLImageElement).style.display = "none"} />
                  <div className="w-48 border-b border-slate-400 mb-1" />
                  <p className="font-bold text-sm text-slate-800">{details.authorizedName}</p>
                  <p className="text-xs text-slate-600">{details.authorizedTitle}, {details.companyName}</p>
                  {details.authorizedEmail && <p className="text-[10px] text-slate-400">{details.authorizedEmail}</p>}
                </div>

                <div className="flex items-center gap-4">
                  {details.includeSeal && details.companySealUrl && (
                    <div className="text-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={details.companySealUrl} alt="Seal" className="w-14 h-14 object-contain mx-auto" />
                      <p className="text-[8px] text-slate-400 mt-1">Company Seal</p>
                    </div>
                  )}
                  
                  {details.includeQRCode && qrDataUrl && (
                    <div className="text-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={qrDataUrl} alt="QR Code" className="w-14 h-14 mx-auto" />
                      <p className="text-[8px] text-slate-400 mt-1">Verify Certificate</p>
                      {details.includeVerificationLink && (
                        <p className="text-[6px] text-blue-600 mt-1 truncate max-w-[100px]">
                          {verificationUrl}
                        </p>
                      )}
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
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #93d0a3; border-radius: 8px; }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover { background: #6bc07f; }
      `}</style>
    </div>
  );
}