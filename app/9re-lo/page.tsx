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
  User,
  FileText,
  Users,
  Building,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const FIXED_COMPANY_NAME = "Averiqo Technologies";
const FIXED_COMPANY_ADDRESS = "Saguna More, Danapur, Patna - 801503, India";
const FIXED_COMPANY_WEBSITE = "www.averiqotech.com";
const FIXED_COMPANY_EMAIL = "info@averiqotech.com";
const FIXED_COMPANY_PHONE = "+91 93349 91688";
const FIXED_LOGO_URL = "/Averiqo Technologies logo.jpeg";
const FIXED_HR_NAME = "Shivam Singh";
const FIXED_HR_TITLE = "HR Manager";
const FIXED_HR_SIGNATURE_URL = "/Shivam singh signature.png";

interface OfferLetterDetails {
  candidateName: string;
  position: string;
  startDate: string;
  endDate: string;
  offerDate: string;
  referenceNumber: string;
  companyName: string;
  companyAddress: string;
  companyWebsite: string;
  companyEmail: string;
  companyPhone: string;
  managerName: string;
  managerTitle: string;
  stipend: string;
  stipendPeriod: string;
  internshipType: string;
  workMode: string;
  duration: string;
  reportingTo: string;
  additionalTerms: string;
  internshipScope: string;
}

// Sample data pre-filled
const SAMPLE_DATA: OfferLetterDetails = {
  candidateName: "Priya Sharma",
  position: "Full Stack Development Intern",
  startDate: "2026-09-01",
  endDate: "2026-11-30",
  offerDate: "2026-08-11",
  referenceNumber: "AVQ-2026-001",
  companyName: FIXED_COMPANY_NAME,
  companyAddress: FIXED_COMPANY_ADDRESS,
  companyWebsite: FIXED_COMPANY_WEBSITE,
  companyEmail: FIXED_COMPANY_EMAIL,
  companyPhone: FIXED_COMPANY_PHONE,
  managerName: FIXED_HR_NAME,
  managerTitle: FIXED_HR_TITLE,
  stipend: "Performance Based",
  stipendPeriod: "",
  internshipType: "Full-Time",
  workMode: "Remote",
  duration: "3 Months",
  reportingTo: FIXED_HR_NAME,
  additionalTerms: "1. The intern must maintain confidentiality of company data.\n2. Performance review will be conducted monthly.\n3. Flexible working hours with core hours 10 AM - 4 PM.",
  internshipScope: "Develop and maintain web applications using React and Node.js.\nCollaborate with the development team on project deliverables.\nWrite clean, scalable, and well-documented code.\nParticipate in daily stand-ups and sprint planning meetings.\nTroubleshoot and debug applications as needed.",
};

// Stipend options
const STIPEND_OPTIONS = [
  { value: "Unpaid", label: "Unpaid" },
  { value: "₹5,000", label: "₹5,000" },
  { value: "₹7,500", label: "₹7,500" },
  { value: "₹10,000", label: "₹10,000" },
  { value: "₹12,000", label: "₹12,000" },
  { value: "₹15,000", label: "₹15,000" },
  { value: "₹18,000", label: "₹18,000" },
  { value: "₹20,000", label: "₹20,000" },
  { value: "₹25,000", label: "₹25,000" },
  { value: "Performance Based", label: "Performance Based" },
  { value: "Custom", label: "Custom (Enter Below)" },
];

const getNextOfferReferenceNumber = (): string => {
  if (typeof window === "undefined") return "AVQ-2026-001";
  const year = new Date().getFullYear();
  const storageKey = `intern_ref_counter_${year}`;
  const counter = parseInt(localStorage.getItem(storageKey) || "0", 10) + 1;
  localStorage.setItem(storageKey, counter.toString());
  return `AVQ-${year}-${String(counter).padStart(3, "0")}`;
};

// Calculate duration between two dates
const calculateDuration = (startDate: string, endDate: string): string => {
  if (!startDate || !endDate) return "3 Months";
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (end <= start) return "3 Months";
  
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();
  
  if (days < 0) {
    months--;
    const prevMonth = new Date(end.getFullYear(), end.getMonth() - 1, 0);
    days += prevMonth.getDate();
  }
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  // Calculate total weeks
  const totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;
  
  // If months >= 1, show only months
  if (months >= 1) {
    if (years > 0) {
      return `${years} Year${years > 1 ? 's' : ''} ${months > 0 ? `${months} Month${months > 1 ? 's' : ''}` : ''}`.trim();
    }
    return `${months} Month${months > 1 ? 's' : ''}`;
  }
  
  // If less than 1 month, show weeks and days
  if (weeks > 0) {
    if (remainingDays > 0) {
      return `${weeks} Week${weeks > 1 ? 's' : ''} ${remainingDays} Day${remainingDays > 1 ? 's' : ''}`;
    }
    return `${weeks} Week${weeks > 1 ? 's' : ''}`;
  }
  
  // If less than a week, show days
  if (remainingDays > 0) {
    return `${remainingDays} Day${remainingDays > 1 ? 's' : ''}`;
  }
  
  return "3 Months";
};

// Professional PDF Styles - Enhanced
const styles = StyleSheet.create({
  page: {
    padding: 40,
    paddingTop: 30,
    paddingBottom: 25,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
  },
  decorativeTop: {
    height: 4,
    backgroundColor: "#1A2E5A",
    width: "100%",
    marginBottom: 12,
  },
  decorativeAccent: {
    height: 2,
    backgroundColor: "#C9A84C",
    width: "60%",
    marginBottom: 15,
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#1A2E5A",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 55,
    height: 55,
    borderRadius: 6,
  },
  companyInfo: {
    flexDirection: "column",
  },
  companyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A2E5A",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  companyTagline: {
    fontSize: 8,
    color: "#888888",
    marginTop: 1,
    letterSpacing: 0.5,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  refNumber: {
    fontSize: 9,
    color: "#1A2E5A",
    fontWeight: "bold",
    backgroundColor: "#F8F6F0",
    padding: "4px 12px",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#D4C9A8",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1A2E5A",
    textTransform: "uppercase",
    letterSpacing: 4,
    textAlign: "center",
    marginVertical: 8,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: "#1A2E5A",
  },
  dateText: {
    fontSize: 9,
    color: "#555555",
    textAlign: "right",
    marginBottom: 8,
    fontWeight: "medium",
  },
  recipientBlock: {
    marginBottom: 8,
    backgroundColor: "#F8F6F0",
    padding: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#E8E4DA",
  },
  recipientName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1A2E5A",
  },
  greeting: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1A2E5A",
    marginBottom: 4,
  },
  paragraph: {
    fontSize: 9,
    lineHeight: 1.7,
    color: "#333333",
    marginBottom: 4,
    textAlign: "justify",
  },
  infoBox: {
    marginVertical: 6,
    padding: 10,
    paddingHorizontal: 12,
    backgroundColor: "#F8F6F0",
    borderWidth: 2,
    borderColor: "#1A2E5A",
    borderRadius: 6,
  },
  infoRow: {
    flexDirection: "row",
    paddingVertical: 3,
    borderBottomWidth: 0.5,
    borderBottomColor: "#D4C9A8",
  },
  infoRowLast: {
    flexDirection: "row",
    paddingVertical: 3,
  },
  infoLabel: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#1A2E5A",
    width: "26%",
    paddingRight: 4,
  },
  infoValue: {
    fontSize: 8,
    color: "#333333",
    width: "24%",
    paddingRight: 4,
  },
  scopeSection: {
    marginVertical: 4,
  },
  scopeTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#1A2E5A",
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    borderBottomWidth: 1,
    borderBottomColor: "#1A2E5A",
    paddingBottom: 2,
  },
  scopeItem: {
    fontSize: 8,
    lineHeight: 1.6,
    color: "#555555",
    marginBottom: 0.5,
    paddingLeft: 10,
  },
  certificateNote: {
    fontSize: 8.5,
    lineHeight: 1.6,
    color: "#333333",
    marginVertical: 4,
    textAlign: "justify",
    fontStyle: "italic",
    backgroundColor: "#FDFCF8",
    padding: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#C9A84C",
    borderStyle: "solid",
  },
  footer: {
    marginTop: 6,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: "#1A2E5A",
  },
  signatureSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
    paddingHorizontal: 10,
  },
  signBlock: {
    width: "30%",
    alignItems: "center",
  },
  signatureImg: {
    height: 35,
    width: 110,
    objectFit: "contain",
    marginBottom: 2,
  },
  signLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
    width: "90%",
    marginBottom: 1,
  },
  signName: {
    fontSize: 8.5,
    fontWeight: "bold",
    color: "#1A2E5A",
  },
  signTitle: {
    fontSize: 7.5,
    color: "#666666",
    textAlign: "center",
  },
  acceptanceBlock: {
    width: "30%",
    alignItems: "center",
  },
  acceptanceLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
    width: "90%",
    marginBottom: 1,
  },
  acceptanceText: {
    fontSize: 7.5,
    color: "#666666",
  },
  companyContact: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: "#E8E4DA",
    gap: 6,
  },
  contactItem: {
    fontSize: 7,
    color: "#888888",
  },
  contactSeparator: {
    fontSize: 7,
    color: "#CCCCCC",
  },
  footerNote: {
    fontSize: 6.5,
    color: "#AAAAAA",
    textAlign: "center",
    marginTop: 3,
    fontStyle: "italic",
  },
  additionalTerms: {
    fontSize: 8,
    lineHeight: 1.5,
    color: "#555555",
    marginTop: 2,
  },
});

const OfferLetterPDF = ({ details }: { details: OfferLetterDetails }) => {
  const scopeItems = details.internshipScope
    ? details.internshipScope.split('\n').filter(item => item.trim() !== '')
    : [
        "Assist with tasks and projects related to your assigned department.",
        "Apply your academic and technical knowledge to practical projects.",
        "Collaborate with team members and follow assigned timelines.",
        "Participate in meetings, training sessions, and project activities as required.",
        "Maintain professional communication and conduct throughout the internship."
      ];

  const additionalTermsItems = details.additionalTerms
    ? details.additionalTerms.split('\n').filter(item => item.trim() !== '')
    : [];

  // Get display value for stipend
  const getStipendDisplay = () => {
    if (!details.stipend || details.stipend.trim() === '') return 'Not specified';
    if (details.stipend === 'Unpaid') return 'Unpaid';
    if (details.stipend === 'Performance Based') return 'Performance Based';
    if (details.stipendPeriod && details.stipendPeriod !== '') {
      return `${details.stipend} ${details.stipendPeriod}`;
    }
    return details.stipend;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.decorativeTop} />
        <View style={styles.decorativeAccent} />

        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <PdfImage src={FIXED_LOGO_URL} style={styles.logo} />
            <View style={styles.companyInfo}>
              <Text style={styles.companyTitle}>{details.companyName}</Text>
              <Text style={styles.companyTagline}>Excellence in Technology</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.refNumber}>Ref: {details.referenceNumber}</Text>
          </View>
        </View>

        <Text style={styles.title}>Internship Offer Letter</Text>

        <Text style={styles.dateText}>Date: {details.offerDate}</Text>

        <View style={styles.recipientBlock}>
          <Text style={styles.recipientName}>{details.candidateName}</Text>
        </View>

        <Text style={styles.greeting}>Dear {details.candidateName},</Text>

        <Text style={styles.paragraph}>
          We are pleased to offer you the opportunity to join{" "}
          <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
            {details.companyName}
          </Text>{" "}
          as a <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
            {details.position}
          </Text>. We believe this internship will provide you with valuable practical 
          experience, professional exposure, and an opportunity to work with 
          leading-edge technology.
        </Text>

        <Text style={styles.paragraph}>
          We have arranged for you to participate in a{" "}
          <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
            {details.duration}
          </Text>{" "}
          internship program with us. You will be working in a{" "}
          <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
            {details.workMode}
          </Text>{" "}
          capacity and will be reporting to{" "}
          <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
            {details.reportingTo}
          </Text>.
        </Text>

        <View style={styles.infoBox}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Position</Text>
            <Text style={styles.infoValue}>{details.position}</Text>
            <Text style={styles.infoLabel}>Type</Text>
            <Text style={styles.infoValue}>{details.internshipType}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Duration</Text>
            <Text style={styles.infoValue}>{details.duration}</Text>
            <Text style={styles.infoLabel}>Work Mode</Text>
            <Text style={styles.infoValue}>{details.workMode}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Start Date</Text>
            <Text style={styles.infoValue}>{details.startDate}</Text>
            <Text style={styles.infoLabel}>End Date</Text>
            <Text style={styles.infoValue}>{details.endDate}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Reporting To</Text>
            <Text style={styles.infoValue}>{details.reportingTo}</Text>
            <Text style={styles.infoLabel}></Text>
            <Text style={styles.infoValue}></Text>
          </View>
          <View style={styles.infoRowLast}>
            <Text style={styles.infoLabel}>Stipend</Text>
            <Text style={styles.infoValue}>{getStipendDisplay()}</Text>
            <Text style={styles.infoLabel}></Text>
            <Text style={styles.infoValue}></Text>
          </View>
        </View>

        <View style={styles.scopeSection}>
          <Text style={styles.scopeTitle}>Internship Scope & Responsibilities</Text>
          {scopeItems.slice(0, 4).map((item, index) => (
            <Text key={index} style={styles.scopeItem}>
              • {item.trim()}
            </Text>
          ))}
        </View>

        {additionalTermsItems.length > 0 && (
          <View style={{ marginVertical: 3 }}>
            <Text style={[styles.scopeTitle, { fontSize: 8 }]}>
              Additional Terms & Conditions
            </Text>
            {additionalTermsItems.slice(0, 3).map((item, index) => (
              <Text key={index} style={styles.additionalTerms}>
                • {item.trim()}
              </Text>
            ))}
          </View>
        )}

        <Text style={styles.certificateNote}>
          Upon successful completion, you may receive an{" "}
          <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
            Internship Completion Certificate
          </Text>{" "}
          and a{" "}
          <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
            Letter of Recommendation
          </Text>{" "}
          based on performance.
        </Text>

        <Text style={[styles.paragraph, { marginTop: 3 }]}>
          We look forward to welcoming you to our team.
         
        </Text>

        <View style={styles.footer}>
          <View style={styles.signatureSection}>
            <View style={styles.signBlock}>
              <PdfImage src={FIXED_HR_SIGNATURE_URL} style={styles.signatureImg} />
              <View style={styles.signLine} />
              <Text style={styles.signName}>{details.managerName}</Text>
              <Text style={styles.signTitle}>
                {details.managerTitle}, {details.companyName}
              </Text>
            </View>

            <View style={styles.acceptanceBlock}>
              <View style={{ height: 30, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 7.5, color: "#999999" }}>Signature</Text>
              </View>
              <View style={styles.acceptanceLine} />
              <Text style={styles.acceptanceText}>Intern's Signature</Text>
              <Text style={[styles.acceptanceText, { marginTop: 1 }]}>Date: ___________</Text>
            </View>

            <View style={styles.acceptanceBlock}>
              <View style={{ height: 30, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 7.5, color: "#999999" }}>Date</Text>
              </View>
              <View style={styles.acceptanceLine} />
              <Text style={styles.acceptanceText}>Date of Acceptance</Text>
              <Text style={[styles.acceptanceText, { marginTop: 1 }]}>Place: ___________</Text>
            </View>
          </View>
        </View>

        <View style={styles.companyContact}>
          <Text style={styles.contactItem}>{details.companyAddress}</Text>
          <Text style={styles.contactSeparator}>|</Text>
          <Text style={styles.contactItem}>Phone: {details.companyPhone}</Text>
          <Text style={styles.contactSeparator}>|</Text>
          <Text style={styles.contactItem}>Email: {details.companyEmail}</Text>
          <Text style={styles.contactSeparator}>|</Text>
          <Text style={styles.contactItem}>Website: {details.companyWebsite}</Text>
        </View>

        <Text style={styles.footerNote}>
          This document is electronically generated and does not require a physical signature 
          if digitally signed by {details.companyName}.
        </Text>
      </Page>
    </Document>
  );
};

export default function OfferLetterGeneratorPage() {
  const [isClient, setIsClient] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const [isCustomStipend, setIsCustomStipend] = useState(false);
  const [selectedStipendOption, setSelectedStipendOption] = useState("Performance Based");

  const [details, setDetails] = useState<OfferLetterDetails>({
    candidateName: "Priya Sharma",
    position: "Full Stack Development Intern",
    startDate: "2026-09-01",
    endDate: "2026-11-30",
    offerDate: "2026-08-11",
    referenceNumber: "AVQ-2026-001",
    companyName: FIXED_COMPANY_NAME,
    companyAddress: FIXED_COMPANY_ADDRESS,
    companyWebsite: FIXED_COMPANY_WEBSITE,
    companyEmail: FIXED_COMPANY_EMAIL,
    companyPhone: FIXED_COMPANY_PHONE,
    managerName: FIXED_HR_NAME,
    managerTitle: FIXED_HR_TITLE,
    stipend: "Performance Based",
    stipendPeriod: "",
    internshipType: "Full-Time",
    workMode: "Remote",
    duration: "3 Months",
    reportingTo: FIXED_HR_NAME,
    additionalTerms: "1. The intern must maintain confidentiality of company data.\n2. Performance review will be conducted monthly.\n3. Flexible working hours with core hours 10 AM - 4 PM.",
    internshipScope: "Develop and maintain web applications using React and Node.js.\nCollaborate with the development team on project deliverables.\nWrite clean, scalable, and well-documented code.\nParticipate in daily stand-ups and sprint planning meetings.\nTroubleshoot and debug applications as needed.",
  });

  useEffect(() => {
    setIsClient(true);
    setDetails((prev) => ({ 
      ...prev, 
      referenceNumber: getNextOfferReferenceNumber(),
    }));
  }, []);

  useEffect(() => {
    if (details.startDate && details.endDate) {
      const duration = calculateDuration(details.startDate, details.endDate);
      setDetails((prev) => ({ ...prev, duration }));
    }
  }, [details.startDate, details.endDate]);

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

  const handleStipendChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedStipendOption(value);
    
    if (value === "Custom") {
      setIsCustomStipend(true);
      setDetails((prev) => ({ ...prev, stipend: "" }));
    } else {
      setIsCustomStipend(false);
      setDetails((prev) => ({ ...prev, stipend: value, stipendPeriod: "" }));
    }
    setTouchedFields((prev) => new Set(prev).add("stipend"));
  };

  const handleCustomStipendChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails((prev) => ({ ...prev, stipend: e.target.value }));
    setTouchedFields((prev) => new Set(prev).add("stipend"));
  };

  const handleBlur = (fieldName: string) => {
    setTouchedFields((prev) => new Set(prev).add(fieldName));
  };

  const loadSampleData = () => {
    const sampleWithRef = {
      ...SAMPLE_DATA,
      referenceNumber: getNextOfferReferenceNumber(),
    };
    setDetails(sampleWithRef);
    setIsCustomStipend(false);
    setSelectedStipendOption("Performance Based");
    setTouchedFields(new Set(Object.keys(sampleWithRef)));
  };

  const isFormValid = useMemo(() => {
    const requiredFields: (keyof OfferLetterDetails)[] = [
      'candidateName', 'position', 'startDate', 'endDate', 'stipend', 'reportingTo'
    ];
    return requiredFields.every(field => details[field]?.trim() !== '');
  }, [details]);

  const getCompletionPercentage = useMemo(() => {
    const totalFields = 13;
    const filledFields = Object.values(details).filter(val => 
      val && val.toString().trim() !== ''
    ).length;
    return Math.round((filledFields / totalFields) * 100);
  }, [details]);

  const requiredField = (fieldName: string) => {
    const requiredFields = ['candidateName', 'position', 'startDate', 'endDate', 'stipend', 'reportingTo'];
    return requiredFields.includes(fieldName);
  };

  const isFieldInvalid = (fieldName: string) => {
    const value = details[fieldName as keyof OfferLetterDetails];
    return touchedFields.has(fieldName) && requiredField(fieldName) && !value?.trim();
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 md:p-8 font-sans text-slate-800">
      <header className="max-w-7xl mx-auto mb-6 print:hidden">
        <div className="bg-white rounded-xl px-6 py-4 shadow-sm border border-slate-200">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <span className="bg-[#1A2E5A] text-white p-1.5 rounded-lg">
                  <FileText className="w-5 h-5" />
                </span>
                Internship Offer Letter Generator
              </h1>
              <p className="text-sm text-slate-500">
                Professional Internship Offer Letters for{" "}
                <span className="font-semibold text-slate-700">{FIXED_COMPANY_NAME}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
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
                onClick={loadSampleData}
                className="bg-green-50 hover:bg-green-100 text-green-700 font-medium px-4 py-2 rounded-lg border border-green-300 text-sm flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> Reset Sample
              </button>

              <button
                onClick={() => window.print()}
                className="bg-white hover:bg-slate-50 text-slate-700 font-medium px-4 py-2 rounded-lg border border-slate-300 text-sm flex items-center gap-2"
              >
                <Printer className="w-4 h-4" /> Print
              </button>

              {isClient && (
                <PDFDownloadLink
                  document={<OfferLetterPDF details={details} />}
                  fileName={`Internship_Offer_${details.candidateName.replace(/\s+/g, "_") || "Draft"}_${
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

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-5 print:hidden space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Edit className="w-5 h-5 text-[#1A2E5A]" /> Offer Letter Details
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
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Reference Number
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="referenceNumber"
                  value={details.referenceNumber}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none bg-[#F8F6F0]"
                  readOnly
                />
                <button
                  type="button"
                  onClick={handleAutoGenerateRef}
                  className="px-3 py-2 bg-[#1A2E5A] hover:bg-[#142442] text-white rounded-lg text-sm font-medium flex items-center gap-1 transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Candidate Name */}
            <div className="border-t pt-4">
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Candidate Name *
              </label>
              <input
                type="text"
                name="candidateName"
                value={details.candidateName}
                onChange={handleChange}
                onBlur={() => handleBlur('candidateName')}
                placeholder="Enter candidate's full name"
                className={`w-full px-3 py-2 border ${isFieldInvalid('candidateName') ? 'border-red-500' : 'border-slate-300'} rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none`}
                required
              />
              {isFieldInvalid('candidateName') && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Name is required
                </p>
              )}
            </div>

            {/* Internship Position */}
            <div className="border-t pt-4">
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Internship Position *
              </label>
              <input
                type="text"
                name="position"
                value={details.position}
                onChange={handleChange}
                onBlur={() => handleBlur('position')}
                placeholder="e.g., Digital Marketing Intern"
                className={`w-full px-3 py-2 border ${isFieldInvalid('position') ? 'border-red-500' : 'border-slate-300'} rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none`}
                required
              />
              {isFieldInvalid('position') && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Position is required
                </p>
              )}
            </div>

            {/* Start Date & End Date */}
            <div className="border-t pt-4">
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Internship Period *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-500 mb-1">Start Date</label>
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
                      <AlertCircle className="w-3 h-3" /> Required
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 mb-1">End Date</label>
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
                      <AlertCircle className="w-3 h-3" /> Required
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-2 p-2 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-600">
                  <span className="font-semibold">Duration:</span> {details.duration}
                </p>
              </div>
            </div>

            {/* Offer Date */}
            <div className="border-t pt-4">
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Offer Date
              </label>
              <input
                type="date"
                name="offerDate"
                value={details.offerDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none"
              />
            </div>

            {/* Additional Fields - Collapsible */}
            <details className="border-t pt-4 mt-2">
              <summary className="text-sm font-semibold text-slate-700 cursor-pointer hover:text-[#1A2E5A]">
                Additional Details <span className="text-xs text-slate-400">(click to expand)</span>
              </summary>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    <Users className="w-3 h-3 inline mr-1" /> Reporting To *
                  </label>
                  <input
                    type="text"
                    name="reportingTo"
                    value={details.reportingTo}
                    onChange={handleChange}
                    onBlur={() => handleBlur('reportingTo')}
                    placeholder="Manager/Supervisor name"
                    className={`w-full px-3 py-2 border ${isFieldInvalid('reportingTo') ? 'border-red-500' : 'border-slate-300'} rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none`}
                    required
                  />
                  {isFieldInvalid('reportingTo') && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Reporting manager is required
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    Internship Type
                  </label>
                  <select
                    name="internshipType"
                    value={details.internshipType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Work from Home">Work from Home</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    Work Mode
                  </label>
                  <select
                    name="workMode"
                    value={details.workMode}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none"
                  >
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    Stipend / Compensation *
                  </label>
                  <select
                    name="stipendSelect"
                    value={isCustomStipend ? "Custom" : selectedStipendOption}
                    onChange={handleStipendChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none"
                  >
                    {STIPEND_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {isCustomStipend && (
                    <div className="mt-2">
                      <input
                        type="text"
                        name="stipend"
                        value={details.stipend}
                        onChange={handleCustomStipendChange}
                        onBlur={() => handleBlur('stipend')}
                        placeholder="e.g., ₹30,000 or Unpaid"
                        className={`w-full px-3 py-2 border ${isFieldInvalid('stipend') ? 'border-red-500' : 'border-slate-300'} rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none`}
                        required
                      />
                      {isFieldInvalid('stipend') && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Stipend is required
                        </p>
                      )}
                    </div>
                  )}
                  {!isCustomStipend && selectedStipendOption !== "Performance Based" && selectedStipendOption !== "Unpaid" && (
                    <div className="mt-2">
                      <select
                        name="stipendPeriod"
                        value={details.stipendPeriod}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none"
                      >
                        <option value="per month">Per Month</option>
                        <option value="per week">Per Week</option>
                        <option value="per day">Per Day</option>
                      </select>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    Internship Scope / Responsibilities
                  </label>
                  <textarea
                    name="internshipScope"
                    value={details.internshipScope}
                    onChange={handleChange}
                    placeholder="Enter the scope of work and responsibilities..."
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none resize-y"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    Additional Terms & Conditions
                  </label>
                  <textarea
                    name="additionalTerms"
                    value={details.additionalTerms}
                    onChange={handleChange}
                    placeholder="Enter any additional terms..."
                    rows={2}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none resize-y"
                  />
                </div>
              </div>
            </details>

            <div className="mt-4 p-3 bg-[#F8F6F0] rounded-lg border border-[#C9A84C]">
              <p className="text-xs text-[#1A2E5A] flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Note:</strong> Fields marked with * are required.
                  {!isFormValid && ' Please fill in all required fields to enable PDF download.'}
                </span>
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setDetails({
                    candidateName: "",
                    position: "",
                    startDate: "",
                    endDate: "",
                    offerDate: new Date().toISOString().split("T")[0],
                    referenceNumber: getNextOfferReferenceNumber(),
                    companyName: FIXED_COMPANY_NAME,
                    companyAddress: FIXED_COMPANY_ADDRESS,
                    companyWebsite: FIXED_COMPANY_WEBSITE,
                    companyEmail: FIXED_COMPANY_EMAIL,
                    companyPhone: FIXED_COMPANY_PHONE,
                    managerName: FIXED_HR_NAME,
                    managerTitle: FIXED_HR_TITLE,
                    stipend: "",
                    stipendPeriod: "",
                    internshipType: "Full-Time",
                    workMode: "Remote",
                    duration: "3 Months",
                    reportingTo: FIXED_HR_NAME,
                    additionalTerms: "",
                    internshipScope: "Assist with tasks and projects related to your assigned department.\nApply your academic and technical knowledge to practical projects.\nCollaborate with team members and follow assigned timelines.\nParticipate in meetings, training sessions, and project activities as required.\nMaintain professional communication and conduct throughout the internship.",
                  });
                  setIsCustomStipend(false);
                  setSelectedStipendOption("Performance Based");
                  setTouchedFields(new Set());
                }}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all"
              >
                Clear All
              </button>
            </div>
          </div>
        </section>

        {/* Preview */}
        <section className={`lg:col-span-7 flex justify-center ${!isPreviewVisible ? 'hidden lg:flex' : ''}`}>
          <div className="w-full overflow-x-auto">
            <div
              id="printable-area"
              className="w-[210mm] min-h-[297mm] bg-white p-8 rounded-xl shadow-lg border-4 border-[#1A2E5A] relative flex flex-col mx-auto"
            >
              <div className="border-2 border-[#1A2E5A] p-6 h-full flex flex-col relative">
                <div className="w-full h-1 bg-[#1A2E5A] mb-2"></div>
                <div className="w-3/5 h-0.5 bg-[#C9A84C] mx-auto mb-3"></div>

                <div className="flex justify-between items-center border-b-2 border-[#1A2E5A] pb-2 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={FIXED_LOGO_URL}
                      alt="Logo"
                      className="h-14 w-14 object-contain rounded"
                      onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                    />
                    <div>
                      <h1 className="text-base font-bold text-[#1A2E5A] uppercase tracking-wide">
                        {details.companyName}
                      </h1>
                      <p className="text-[8px] text-slate-500">Excellence in Technology</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-[#1A2E5A] bg-[#F8F6F0] px-3 py-1 rounded border border-[#D4C9A8]">
                      Ref: {details.referenceNumber || "Not Set"}
                    </p>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-[#1A2E5A] uppercase tracking-widest text-center mb-2 border-b-2 border-[#1A2E5A] pb-1">
                  Internship Offer Letter
                </h2>

                <div className="text-right mb-2">
                  <p className="text-xs text-slate-600">Date: {details.offerDate}</p>
                </div>

                <div className="mb-2 bg-[#F8F6F0] p-2 rounded border border-[#E8E4DA]">
                  <p className="text-sm font-bold text-[#1A2E5A]">{details.candidateName || "[Candidate Name]"}</p>
                </div>

                <div className="flex-1 text-sm text-slate-700 space-y-1.5">
                  <p className="font-bold text-[#1A2E5A] text-[10px]">Dear {details.candidateName || "[Candidate Name]"},</p>

                  <p className="leading-relaxed text-justify text-[9px]">
                    We are pleased to offer you the opportunity to join{" "}
                    <strong className="text-[#1A2E5A]">{details.companyName}</strong>{" "}
                    as a <strong className="text-[#1A2E5A]">{details.position || "[Position]"}</strong>. 
                    We believe this internship will provide you with valuable practical 
                    experience, professional exposure, and an opportunity to work with 
                    leading-edge technology.
                  </p>

                  <p className="leading-relaxed text-justify text-[9px]">
                    We have arranged for you to participate in a{" "}
                    <strong className="text-[#1A2E5A]">{details.duration || "[Duration]"}</strong>{" "}
                    internship program with us. You will be working in a{" "}
                    <strong className="text-[#1A2E5A]">{details.workMode || "[Work Mode]"}</strong>{" "}
                    capacity and will be reporting to{" "}
                    <strong className="text-[#1A2E5A]">{details.reportingTo || "[Manager]"}</strong>.
                  </p>

                  <div className="bg-[#F8F6F0] border-2 border-[#1A2E5A] p-2 rounded">
                    <div className="space-y-0.5">
                      <div className="flex text-[8px] border-b border-[#D4C9A8] pb-0.5">
                        <span className="font-bold text-[#1A2E5A] w-[26%]">Position</span>
                        <span className="text-slate-700 w-[24%]">{details.position || "N/A"}</span>
                        <span className="font-bold text-[#1A2E5A] w-[26%]">Type</span>
                        <span className="text-slate-700 w-[24%]">{details.internshipType || "N/A"}</span>
                      </div>
                      <div className="flex text-[8px] border-b border-[#D4C9A8] pb-0.5">
                        <span className="font-bold text-[#1A2E5A] w-[26%]">Duration</span>
                        <span className="text-slate-700 w-[24%]">{details.duration || "N/A"}</span>
                        <span className="font-bold text-[#1A2E5A] w-[26%]">Work Mode</span>
                        <span className="text-slate-700 w-[24%]">{details.workMode || "N/A"}</span>
                      </div>
                      <div className="flex text-[8px] border-b border-[#D4C9A8] pb-0.5">
                        <span className="font-bold text-[#1A2E5A] w-[26%]">Start Date</span>
                        <span className="text-slate-700 w-[24%]">{details.startDate || "N/A"}</span>
                        <span className="font-bold text-[#1A2E5A] w-[26%]">End Date</span>
                        <span className="text-slate-700 w-[24%]">{details.endDate || "N/A"}</span>
                      </div>
                      <div className="flex text-[8px] border-b border-[#D4C9A8] pb-0.5">
                        <span className="font-bold text-[#1A2E5A] w-[26%]">Reporting To</span>
                        <span className="text-slate-700 w-[24%]">{details.reportingTo || "N/A"}</span>
                        <span className="font-bold text-[#1A2E5A] w-[26%]"></span>
                        <span className="text-slate-700 w-[24%]"></span>
                      </div>
                      <div className="flex text-[8px]">
                        <span className="font-bold text-[#1A2E5A] w-[26%]">Stipend</span>
                        <span className="text-slate-700 w-[74%]">
                          {details.stipend ? 
                            details.stipend === 'Unpaid' ? 'Unpaid' :
                            details.stipend === 'Performance Based' ? 'Performance Based' :
                            `${details.stipend} ${details.stipendPeriod || ''}` 
                          : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="font-bold text-[#1A2E5A] text-[8px] uppercase tracking-wide border-b border-[#1A2E5A] pb-0.5">Internship Scope & Responsibilities</p>
                    <div className="text-[8px] text-slate-600 leading-relaxed mt-0.5">
                      {details.internshipScope.split('\n').filter(item => item.trim() !== '').slice(0, 4).map((item, index) => (
                        <div key={index}>• {item.trim()}</div>
                      ))}
                    </div>
                  </div>

                  {details.additionalTerms && (
                    <div>
                      <p className="font-bold text-[#1A2E5A] text-[8px] uppercase tracking-wide border-b border-[#1A2E5A] pb-0.5">Additional Terms & Conditions</p>
                      <div className="text-[8px] text-slate-600 leading-relaxed mt-0.5">
                        {details.additionalTerms.split('\n').filter(item => item.trim() !== '').slice(0, 3).map((item, index) => (
                          <div key={index}>• {item.trim()}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="leading-relaxed text-justify text-[8.5px] italic text-slate-600 bg-[#FDFCF8] p-1.5 rounded border border-[#C9A84C]">
                    Upon successful completion, you may receive an{" "}
                    <strong className="text-[#1A2E5A]">Internship Completion Certificate</strong>{" "}
                    and a <strong className="text-[#1A2E5A]">Letter of Recommendation</strong>.
                  </p>

                  <p className="leading-relaxed text-justify text-[9px]">
                    We look forward to welcoming you to our team.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-2 pt-2 border-t-2 border-[#1A2E5A]">
                  <div className="text-center">
                    <img src={FIXED_HR_SIGNATURE_URL} alt="Signature" className="h-8 max-w-[100px] object-contain mx-auto" />
                    <div className="w-[90%] mx-auto border-b border-[#333] my-0.5"></div>
                    <p className="text-[9px] font-bold text-[#1A2E5A]">{details.managerName}</p>
                    <p className="text-[7px] text-slate-500">{details.managerTitle}, {details.companyName}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-[8px] text-slate-400">Signature</p>
                    <div className="w-[90%] mx-auto border-b border-[#333] my-0.5"></div>
                    <p className="text-[8px] text-slate-500">Intern's Signature</p>
                    <p className="text-[8px] text-slate-400 mt-0.5">Date: ___________</p>
                  </div>

                  <div className="text-center">
                    <p className="text-[8px] text-slate-400">Date</p>
                    <div className="w-[90%] mx-auto border-b border-[#333] my-0.5"></div>
                    <p className="text-[8px] text-slate-500">Date of Acceptance</p>
                    <p className="text-[8px] text-slate-400 mt-0.5">Place: ___________</p>
                  </div>
                </div>

                <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-[7px] text-slate-400 border-t border-[#E8E4DA] pt-1.5">
                  <span>{details.companyAddress}</span>
                  <span className="text-slate-300">|</span>
                  <span>Phone: {details.companyPhone}</span>
                  <span className="text-slate-300">|</span>
                  <span>Email: {details.companyEmail}</span>
                  <span className="text-slate-300">|</span>
                  <span>Website: {details.companyWebsite}</span>
                </div>

                <div className="mt-0.5 pt-0.5 border-t border-dashed border-slate-200">
                  <p className="text-[6px] text-slate-400 text-center italic">
                    Electronically generated. No physical signature required if digitally signed.
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