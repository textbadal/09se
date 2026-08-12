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
} from "lucide-react";

const FIXED_COMPANY_NAME = "Averiqo Technologies";
const FIXED_COMPANY_ADDRESS = "123 Tech Park, Electronic City, Bangalore - 560100, India";
const FIXED_COMPANY_WEBSITE = "www.averiqo.com";
const FIXED_COMPANY_EMAIL = "careers@averiqo.com";
const FIXED_COMPANY_PHONE = "+91 80 4123 4567";
const FIXED_LOGO_URL = "/Averiqo Technologies logo.jpeg";
const FIXED_HR_NAME = "Shivam Singh";
const FIXED_HR_TITLE = "HR Manager";
const FIXED_HR_SIGNATURE_URL = "/Shivam singh signature.png";

interface OfferLetterDetails {
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  candidateAddress: string;
  position: string;
  department: string;
  startDate: string;
  endDate?: string;
  offerDate: string;
  referenceNumber: string;
  companyName: string;
  companyAddress: string;
  companyWebsite: string;
  companyEmail: string;
  companyPhone: string;
  managerName: string;
  managerTitle: string;
  salary: string;
  salaryPeriod: string;
  employmentType: string;
  workLocation: string;
  probationPeriod: string;
  workingHours: string;
  reportingTo: string;
  additionalTerms: string;
  // Internship specific fields
  internshipDuration?: string;
  stipend?: string;
  education?: string;
  university?: string;
  academicYear?: string;
  projectScope?: string;
  mentorName?: string;
}

// Sequential Reference Number Generator
const getNextOfferReferenceNumber = (): string => {
  if (typeof window === "undefined") return "OFFER-2026-0001";
  const year = new Date().getFullYear();
  const storageKey = `offer_ref_counter_${year}`;
  const counter = parseInt(localStorage.getItem(storageKey) || "0", 10) + 1;
  localStorage.setItem(storageKey, counter.toString());
  return `OFFER-${year}-${String(counter).padStart(4, "0")}`;
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
  // Internship specific styles
  badgeContainer: {
    backgroundColor: "#1A2E5A",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: "center",
    marginBottom: 10,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});

// PDF Document Renderer
const OfferLetterPDF = ({ details }: { details: OfferLetterDetails }) => {
  const isInternship = details.employmentType === "Internship";
  const documentTitle = isInternship ? "Internship Offer Letter" : "Offer Letter";
  const compensationLabel = isInternship ? "Stipend" : "Compensation";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.outerBorder}>
          {/* Watermark */}
          <View style={styles.watermarkContainer}>
            <Text style={styles.watermarkText}>AVERIQO</Text>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <PdfImage src={FIXED_LOGO_URL} style={styles.logo} />
            <View style={styles.headerRight}>
              <Text style={styles.companyTitle}>{details.companyName}</Text>
              <Text style={styles.companyTagline}>Excellence in Technology</Text>
              <Text style={styles.refText}>Ref: {details.referenceNumber}</Text>
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>{documentTitle}</Text>

          {/* Internship Badge */}
          {isInternship && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>Internship Program</Text>
            </View>
          )}

          {/* Date */}
          <View style={styles.dateBlock}>
            <Text style={styles.dateText}>Date: {details.offerDate}</Text>
          </View>

          {/* Recipient */}
          <View style={styles.recipientBlock}>
            <Text style={styles.recipientName}>{details.candidateName}</Text>
            <Text style={styles.recipientDetail}>{details.candidateAddress}</Text>
            <Text style={styles.recipientDetail}>Email: {details.candidateEmail}</Text>
            <Text style={styles.recipientDetail}>Phone: {details.candidatePhone}</Text>
            {isInternship && details.university && (
              <Text style={styles.recipientDetail}>University: {details.university}</Text>
            )}
          </View>

          {/* Body */}
          <View style={styles.body}>
            <Text style={styles.greeting}>Dear {details.candidateName},</Text>

            {isInternship ? (
              // Internship specific content
              <>
                <Text style={styles.paragraph}>
                  We are pleased to offer you the position of{" "}
                  <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
                    {details.position}
                  </Text>{" "}
                  as an Intern in the{" "}
                  <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
                    {details.department}
                  </Text>{" "}
                  department at{" "}
                  <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
                    {details.companyName}
                  </Text>. We were impressed by your academic achievements, skills, and 
                  enthusiasm, and we believe this internship will provide you with valuable 
                  hands-on experience in the technology industry.
                </Text>

                <Text style={styles.paragraph}>
                  Your internship will commence on{" "}
                  <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
                    {details.startDate}
                  </Text>
                  {details.endDate && (
                    <> and will continue until{" "}
                    <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
                      {details.endDate}
                    </Text>
                    </>
                  )}
                  {details.internshipDuration && (
                    <> for a duration of{" "}
                    <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
                      {details.internshipDuration}
                    </Text>
                    </>
                  )}
                  . You will be working under the mentorship of{" "}
                  <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
                    {details.mentorName || details.reportingTo}
                  </Text>{" "}
                  at our{" "}
                  <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
                    {details.workLocation}
                  </Text>{" "}
                  location.
                </Text>
              </>
            ) : (
              // Full-time employment content
              <>
                <Text style={styles.paragraph}>
                  We are delighted to offer you the position of{" "}
                  <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
                    {details.position}
                  </Text>{" "}
                  in the{" "}
                  <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
                    {details.department}
                  </Text>{" "}
                  department at{" "}
                  <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
                    {details.companyName}
                  </Text>. We were thoroughly impressed by your skills, experience, and 
                  enthusiasm, and we believe you will be a valuable addition to our team.
                </Text>

                <Text style={styles.paragraph}>
                  Your expected start date will be{" "}
                  <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
                    {details.startDate}
                  </Text>. You will be reporting to{" "}
                  <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
                    {details.reportingTo}
                  </Text>{" "}
                  and will be working at our{" "}
                  <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
                    {details.workLocation}
                  </Text>{" "}
                  location.
                </Text>
              </>
            )}

            {/* Key Details */}
            <View style={styles.highlightBox}>
              <View style={styles.highlightRow}>
                <Text style={styles.highlightLabel}>Position</Text>
                <Text style={styles.highlightValue}>{details.position}</Text>
              </View>
              <View style={styles.highlightRow}>
                <Text style={styles.highlightLabel}>Department</Text>
                <Text style={styles.highlightValue}>{details.department}</Text>
              </View>
              <View style={styles.highlightRow}>
                <Text style={styles.highlightLabel}>Employment Type</Text>
                <Text style={styles.highlightValue}>{details.employmentType}</Text>
              </View>
              {isInternship && details.internshipDuration && (
                <View style={styles.highlightRow}>
                  <Text style={styles.highlightLabel}>Duration</Text>
                  <Text style={styles.highlightValue}>{details.internshipDuration}</Text>
                </View>
              )}
              {isInternship && details.education && (
                <View style={styles.highlightRow}>
                  <Text style={styles.highlightLabel}>Education</Text>
                  <Text style={styles.highlightValue}>{details.education}</Text>
                </View>
              )}
              <View style={styles.highlightRow}>
                <Text style={styles.highlightLabel}>{compensationLabel}</Text>
                <Text style={styles.highlightValue}>
                  {details.salary} {details.salaryPeriod}
                </Text>
              </View>
              {!isInternship && (
                <>
                  <View style={styles.highlightRow}>
                    <Text style={styles.highlightLabel}>Working Hours</Text>
                    <Text style={styles.highlightValue}>{details.workingHours}</Text>
                  </View>
                  <View style={styles.highlightRow}>
                    <Text style={styles.highlightLabel}>Probation Period</Text>
                    <Text style={styles.highlightValue}>{details.probationPeriod}</Text>
                  </View>
                </>
              )}
              {isInternship && details.projectScope && (
                <View style={styles.highlightRow}>
                  <Text style={styles.highlightLabel}>Project Scope</Text>
                  <Text style={styles.highlightValue}>{details.projectScope}</Text>
                </View>
              )}
              <View style={[styles.highlightRow, { borderBottomWidth: 0 }]}>
                <Text style={styles.highlightLabel}>
                  {isInternship ? "Mentor" : "Reporting To"}
                </Text>
                <Text style={styles.highlightValue}>
                  {isInternship ? details.mentorName || details.reportingTo : details.reportingTo}
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

            {isInternship ? (
              // Internship closing
              <>
                <Text style={[styles.paragraph, { marginTop: 10 }]}>
                  This internship offers you the opportunity to gain practical experience, 
                  work on real-world projects, and develop professional skills under expert 
                  guidance. We are committed to providing you with a meaningful learning 
                  experience and support for your professional growth.
                </Text>

                <Text style={[styles.paragraph, { marginTop: 8 }]}>
                  To accept this internship offer, please sign the acceptance section below 
                  and return this letter by{" "}
                  {new Date(new Date(details.offerDate).setDate(new Date(details.offerDate).getDate() + 5)).toLocaleDateString()}.
                </Text>
              </>
            ) : (
              // Full-time closing
              <>
                <Text style={[styles.paragraph, { marginTop: 10 }]}>
                  This offer is subject to the successful completion of background verification 
                  and reference checks. Please review the attached terms and conditions carefully. 
                  We look forward to welcoming you to our team and wish you a successful career 
                  with {details.companyName}.
                </Text>

                <Text style={[styles.paragraph, { marginTop: 8 }]}>
                  To accept this offer, please sign the acceptance section below and return this 
                  letter by{" "}
                  {new Date(new Date(details.offerDate).setDate(new Date(details.offerDate).getDate() + 7)).toLocaleDateString()}.
                </Text>
              </>
            )}
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
              <Text style={styles.acceptanceText}>Candidate's Signature</Text>
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

export default function OfferLetterGeneratorPage() {
  const [isClient, setIsClient] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);

  const [details, setDetails] = useState<OfferLetterDetails>({
    candidateName: "",
    candidateEmail: "",
    candidatePhone: "",
    candidateAddress: "",
    position: "",
    department: "",
    startDate: "",
    endDate: "",
    offerDate: new Date().toISOString().split("T")[0],
    referenceNumber: "",
    companyName: FIXED_COMPANY_NAME,
    companyAddress: FIXED_COMPANY_ADDRESS,
    companyWebsite: FIXED_COMPANY_WEBSITE,
    companyEmail: FIXED_COMPANY_EMAIL,
    companyPhone: FIXED_COMPANY_PHONE,
    managerName: FIXED_HR_NAME,
    managerTitle: FIXED_HR_TITLE,
    salary: "",
    salaryPeriod: "per month",
    employmentType: "Full-Time",
    workLocation: "Bangalore, India",
    probationPeriod: "6 Months",
    workingHours: "9:00 AM - 6:00 PM (Monday to Friday)",
    reportingTo: FIXED_HR_NAME,
    additionalTerms: "",
    // Internship specific
    internshipDuration: "",
    stipend: "",
    education: "",
    university: "",
    academicYear: "",
    projectScope: "",
    mentorName: "",
  });

  const isInternship = details.employmentType === "Internship";

  useEffect(() => {
    setIsClient(true);
    setDetails((prev) => ({ ...prev, referenceNumber: getNextOfferReferenceNumber() }));
  }, []);

  useEffect(() => {
    // Auto-set salary period for internship
    if (isInternship && details.salaryPeriod === "per annum") {
      setDetails((prev) => ({ ...prev, salaryPeriod: "per month" }));
    }
  }, [isInternship]);

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
    const requiredFields: (keyof OfferLetterDetails)[] = [
      'candidateName', 'candidateEmail', 'candidatePhone', 'candidateAddress',
      'position', 'department', 'startDate', 'salary', 'reportingTo', 'workLocation'
    ];
    if (isInternship) {
      requiredFields.push('mentorName');
    }
    return requiredFields.every(field => details[field]?.trim() !== '');
  }, [details, isInternship]);

  // Get completion percentage
  const getCompletionPercentage = useMemo(() => {
    const totalFields = isInternship ? 22 : 18;
    const filledFields = Object.values(details).filter(val => 
      val && val.toString().trim() !== ''
    ).length;
    return Math.round((filledFields / totalFields) * 100);
  }, [details, isInternship]);

  const requiredField = (fieldName: string) => {
    const requiredFields = ['candidateName', 'candidateEmail', 'candidatePhone', 'candidateAddress', 
      'position', 'department', 'startDate', 'salary', 'reportingTo', 'workLocation'];
    if (isInternship) {
      requiredFields.push('mentorName');
    }
    return requiredFields.includes(fieldName);
  };

  const isFieldInvalid = (fieldName: string) => {
    const value = details[fieldName as keyof OfferLetterDetails];
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
                  <FileText className="w-5 h-5" />
                </span>
                {isInternship ? "Internship Offer Generator" : "Offer Letter Generator"}
              </h1>
              <p className="text-sm text-slate-500">
                Professional {isInternship ? "Internship " : "Employment "}
                Offer {isInternship ? "Letters" : "Letters"} for{" "}
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
                  document={<OfferLetterPDF details={details} />}
                  fileName={`${isInternship ? "Internship" : "Offer"}_Letter_${details.candidateName.replace(/\s+/g, "_") || "Draft"}_${
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
                      {isInternship ? "Download PDF" : "Download PDF"}
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
                <Edit className="w-5 h-5 text-[#1A2E5A]" /> 
                {isInternship ? "Internship Details" : "Offer Details"}
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

            {/* Employment Type Selection */}
            <div className="border-t pt-4 mt-2">
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Document Type *
              </label>
              <select
                name="employmentType"
                value={details.employmentType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none"
              >
                <option value="Full-Time">Full-Time Offer Letter</option>
                <option value="Internship">Internship Offer Letter</option>
                <option value="Part-Time">Part-Time Offer Letter</option>
                <option value="Contract">Contract Offer Letter</option>
              </select>
            </div>

            {/* Candidate Information */}
            <div className="border-t pt-4 mt-2">
              <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-3">
                <User className="w-4 h-4 text-[#1A2E5A]" /> Candidate Information
                <span className="text-xs text-red-500">*</span>
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    Full Name *
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

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    <Mail className="w-3 h-3 inline mr-1" /> Email Address *
                  </label>
                  <input
                    type="email"
                    name="candidateEmail"
                    value={details.candidateEmail}
                    onChange={handleChange}
                    onBlur={() => handleBlur('candidateEmail')}
                    placeholder="candidate@email.com"
                    className={`w-full px-3 py-2 border ${isFieldInvalid('candidateEmail') ? 'border-red-500' : 'border-slate-300'} rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none`}
                    required
                  />
                  {isFieldInvalid('candidateEmail') && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Email is required
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    <Phone className="w-3 h-3 inline mr-1" /> Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="candidatePhone"
                    value={details.candidatePhone}
                    onChange={handleChange}
                    onBlur={() => handleBlur('candidatePhone')}
                    placeholder="+91 98765 43210"
                    className={`w-full px-3 py-2 border ${isFieldInvalid('candidatePhone') ? 'border-red-500' : 'border-slate-300'} rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none`}
                    required
                  />
                  {isFieldInvalid('candidatePhone') && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Phone number is required                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    <MapPin className="w-3 h-3 inline mr-1" /> Address *
                  </label>
                  <input
                    type="text"
                    name="candidateAddress"
                    value={details.candidateAddress}
                    onChange={handleChange}
                    onBlur={() => handleBlur('candidateAddress')}
                    placeholder="Complete postal address"
                    className={`w-full px-3 py-2 border ${isFieldInvalid('candidateAddress') ? 'border-red-500' : 'border-slate-300'} rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none`}
                    required
                  />
                  {isFieldInvalid('candidateAddress') && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Address is required
                    </p>
                  )}
                </div>

                {/* Internship-specific fields */}
                {isInternship && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                        <GraduationCap className="w-3 h-3 inline mr-1" /> University / Institution
                      </label>
                      <input
                        type="text"
                        name="university"
                        value={details.university}
                        onChange={handleChange}
                        placeholder="Name of University/College"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                        Education / Degree
                      </label>
                      <input
                        type="text"
                        name="education"
                        value={details.education}
                        onChange={handleChange}
                        placeholder="e.g., B.Tech Computer Science"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                        Academic Year
                      </label>
                      <input
                        type="text"
                        name="academicYear"
                        value={details.academicYear}
                        onChange={handleChange}
                        placeholder="e.g., 3rd Year, Final Year"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Position Details */}
            <div className="border-t pt-4 mt-2">
              <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-3">
                <Briefcase className="w-4 h-4 text-[#1A2E5A]" /> 
                {isInternship ? "Internship Details" : "Position Details"}
                <span className="text-xs text-red-500">*</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    {isInternship ? "Internship Role *" : "Position / Role *"}
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={details.position}
                    onChange={handleChange}
                    onBlur={() => handleBlur('position')}
                    placeholder={isInternship ? "e.g., Software Engineering Intern" : "e.g., Senior Software Engineer"}
                    className={`w-full px-3 py-2 border ${isFieldInvalid('position') ? 'border-red-500' : 'border-slate-300'} rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none`}
                    required
                  />
                  {isFieldInvalid('position') && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Position is required
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    Department *
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={details.department}
                    onChange={handleChange}
                    onBlur={() => handleBlur('department')}
                    placeholder="e.g., Engineering, Marketing"
                    className={`w-full px-3 py-2 border ${isFieldInvalid('department') ? 'border-red-500' : 'border-slate-300'} rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none`}
                    required
                  />
                  {isFieldInvalid('department') && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Department is required
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    <Users className="w-3 h-3 inline mr-1" /> 
                    {isInternship ? "Mentor / Supervisor *" : "Reporting To *"}
                  </label>
                  <input
                    type="text"
                    name={isInternship ? "mentorName" : "reportingTo"}
                    value={isInternship ? details.mentorName : details.reportingTo}
                    onChange={handleChange}
                    onBlur={() => handleBlur(isInternship ? "mentorName" : "reportingTo")}
                    placeholder={isInternship ? "Mentor/Supervisor name" : "Manager/Supervisor name"}
                    className={`w-full px-3 py-2 border ${isFieldInvalid(isInternship ? "mentorName" : "reportingTo") ? 'border-red-500' : 'border-slate-300'} rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none`}
                    required
                  />
                  {isFieldInvalid(isInternship ? "mentorName" : "reportingTo") && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> 
                      {isInternship ? "Mentor name is required" : "Reporting manager is required"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    <Building className="w-3 h-3 inline mr-1" /> Work Location *
                  </label>
                  <input
                    type="text"
                    name="workLocation"
                    value={details.workLocation}
                    onChange={handleChange}
                    onBlur={() => handleBlur('workLocation')}
                    placeholder="Office location"
                    className={`w-full px-3 py-2 border ${isFieldInvalid('workLocation') ? 'border-red-500' : 'border-slate-300'} rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none`}
                    required
                  />
                  {isFieldInvalid('workLocation') && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Work location is required
                    </p>
                  )}
                </div>

                {/* Internship Duration */}
                {isInternship && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                        <Clock className="w-3 h-3 inline mr-1" /> Internship Duration
                      </label>
                      <input
                        type="text"
                        name="internshipDuration"
                        value={details.internshipDuration}
                        onChange={handleChange}
                        placeholder="e.g., 3 Months, 6 Months"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                        Project Scope
                      </label>
                      <input
                        type="text"
                        name="projectScope"
                        value={details.projectScope}
                        onChange={handleChange}
                        placeholder="e.g., Frontend Development, Data Analysis"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Employment Details */}
            <div className="border-t pt-4 mt-2">
              <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-[#1A2E5A]" /> 
                {isInternship ? "Internship Dates" : "Employment Details"}
                <span className="text-xs text-red-500">*</span>
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    {isInternship ? "Start Date *" : "Start Date *"}
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
                    {isInternship ? "End Date" : "Offer Date"}
                  </label>
                  <input
                    type="date"
                    name={isInternship ? "endDate" : "offerDate"}
                    value={isInternship ? details.endDate : details.offerDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none"
                  />
                </div>
              </div>

              {!isInternship && (
                <div className="space-y-3 mt-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                      Employment Type *
                    </label>
                    <select
                      name="employmentType"
                      value={details.employmentType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none"
                    >
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                      Probation Period *
                    </label>
                    <input
                      type="text"
                      name="probationPeriod"
                      value={details.probationPeriod}
                      onChange={handleChange}
                      placeholder="e.g., 6 Months"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none"
                      required
                    />
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
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none"
                      required
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Compensation */}
            <div className="border-t pt-4 mt-2">
              <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-3">
                <Briefcase className="w-4 h-4 text-[#1A2E5A]" /> 
                {isInternship ? "Stipend" : "Compensation"}
                <span className="text-xs text-red-500">*</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    {isInternship ? "Stipend Amount *" : "Salary / Compensation *"}
                  </label>
                  <input
                    type="text"
                    name="salary"
                    value={details.salary}
                    onChange={handleChange}
                    onBlur={() => handleBlur('salary')}
                    placeholder={isInternship ? "e.g., ₹15,000" : "e.g., ₹12,00,000"}
                    className={`w-full px-3 py-2 border ${isFieldInvalid('salary') ? 'border-red-500' : 'border-slate-300'} rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none`}
                    required
                  />
                  {isFieldInvalid('salary') && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> 
                      {isInternship ? "Stipend is required" : "Salary is required"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    {isInternship ? "Stipend Period *" : "Salary Period *"}
                  </label>
                  <select
                    name="salaryPeriod"
                    value={details.salaryPeriod}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none"
                  >
                    {isInternship ? (
                      <>
                        <option value="per month">Per Month</option>
                        <option value="per week">Per Week</option>
                        <option value="per day">Per Day</option>
                      </>
                    ) : (
                      <>
                        <option value="per annum">Per Annum</option>
                        <option value="per month">Per Month</option>
                        <option value="per week">Per Week</option>
                        <option value="per day">Per Day</option>
                        <option value="per hour">Per Hour</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
            </div>

            {/* Company Information */}
            <div className="border-t pt-4 mt-2">
              <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-3">
                <Building className="w-4 h-4 text-[#1A2E5A]" /> Company Information
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={details.companyName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none bg-slate-50"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    <MapPin className="w-3 h-3 inline mr-1" /> Company Address
                  </label>
                  <input
                    type="text"
                    name="companyAddress"
                    value={details.companyAddress}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none bg-slate-50"
                    readOnly
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                      <Globe className="w-3 h-3 inline mr-1" /> Website
                    </label>
                    <input
                      type="text"
                      name="companyWebsite"
                      value={details.companyWebsite}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none bg-slate-50"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                      <Phone className="w-3 h-3 inline mr-1" /> Company Phone
                    </label>
                    <input
                      type="text"
                      name="companyPhone"
                      value={details.companyPhone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none bg-slate-50"
                      readOnly
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    <Mail className="w-3 h-3 inline mr-1" /> Company Email
                  </label>
                  <input
                    type="text"
                    name="companyEmail"
                    value={details.companyEmail}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none bg-slate-50"
                    readOnly
                  />
                </div>
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
                placeholder={isInternship ? 
                  "Enter any additional terms, conditions, or internship-specific details..." : 
                  "Enter any additional terms, conditions, or benefits..."
                }
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
                  The {isInternship ? "internship offer" : "offer"} letter will be generated as a professional PDF document.
                  {!isFormValid && ' Please fill in all required fields to enable PDF download.'}
                </span>
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setDetails({
                    candidateName: "",
                    candidateEmail: "",
                    candidatePhone: "",
                    candidateAddress: "",
                    position: "",
                    department: "",
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
                    salary: "",
                    salaryPeriod: isInternship ? "per month" : "per annum",
                    employmentType: isInternship ? "Internship" : "Full-Time",
                    workLocation: "Bangalore, India",
                    probationPeriod: "6 Months",
                    workingHours: "9:00 AM - 6:00 PM (Monday to Friday)",
                    reportingTo: FIXED_HR_NAME,
                    additionalTerms: "",
                    internshipDuration: "",
                    stipend: "",
                    education: "",
                    university: "",
                    academicYear: "",
                    projectScope: "",
                    mentorName: "",
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
                  AVERIQO
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
                    <p className="text-[10px] text-slate-500 tracking-wide">Excellence in Technology</p>
                    <p className="text-[10px] text-slate-400 mt-1">Ref: {details.referenceNumber || "Not Set"}</p>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-[#1A2E5A] uppercase tracking-widest text-center mb-4">
                  {isInternship ? "Internship Offer Letter" : "Offer Letter"}
                </h2>

                {/* Internship Badge */}
                {isInternship && (
                  <div className="bg-[#1A2E5A] text-white text-center py-1 px-4 rounded-md self-center mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider">Internship Program</span>
                  </div>
                )}

                {/* Date */}
                <div className="text-right mb-4">
                  <p className="text-sm text-slate-600">Date: {details.offerDate}</p>
                </div>

                {/* Recipient */}
                <div className="mb-4">
                  <p className="text-base font-bold text-[#1A2E5A]">{details.candidateName || "[Candidate Name]"}</p>
                  <p className="text-sm text-slate-600">{details.candidateAddress || "[Address]"}</p>
                  <p className="text-sm text-slate-600">Email: {details.candidateEmail || "[Email]"}</p>
                  <p className="text-sm text-slate-600">Phone: {details.candidatePhone || "[Phone]"}</p>
                  {isInternship && details.university && (
                    <p className="text-sm text-slate-600">University: {details.university}</p>
                  )}
                </div>

                {/* Body */}
                <div className="flex-1 text-sm text-slate-700 space-y-3">
                  <p className="font-bold text-[#1A2E5A]">
                    Dear {details.candidateName || "[Candidate Name]"},
                  </p>

                  {isInternship ? (
                    <>
                      <p className="leading-relaxed text-justify">
                        We are pleased to offer you the position of{" "}
                        <strong className="text-[#1A2E5A]">{details.position || "[Position]"}</strong>{" "}
                        as an Intern in the{" "}
                        <strong className="text-[#1A2E5A]">{details.department || "[Department]"}</strong>{" "}
                        department at{" "}
                        <strong className="text-[#1A2E5A]">{details.companyName}</strong>. 
                        We were impressed by your academic achievements, skills, and 
                        enthusiasm, and we believe this internship will provide you with valuable 
                        hands-on experience in the technology industry.
                      </p>

                      <p className="leading-relaxed text-justify">
                        Your internship will commence on{" "}
                        <strong className="text-[#1A2E5A]">{details.startDate || "[Start Date]"}</strong>
                        {details.endDate && (
                          <> and will continue until{" "}
                          <strong className="text-[#1A2E5A]">{details.endDate}</strong>
                          </>
                        )}
                        {details.internshipDuration && (
                          <> for a duration of{" "}
                          <strong className="text-[#1A2E5A]">{details.internshipDuration}</strong>
                          </>
                        )}
                        . You will be working under the mentorship of{" "}
                        <strong className="text-[#1A2E5A]">{details.mentorName || details.reportingTo || "[Mentor]"}</strong>{" "}
                        at our{" "}
                        <strong className="text-[#1A2E5A]">{details.workLocation || "[Location]"}</strong>{" "}
                        location.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="leading-relaxed text-justify">
                        We are delighted to offer you the position of{" "}
                        <strong className="text-[#1A2E5A]">{details.position || "[Position]"}</strong>{" "}
                        in the <strong className="text-[#1A2E5A]">{details.department || "[Department]"}</strong>{" "}
                        department at <strong className="text-[#1A2E5A]">{details.companyName}</strong>. 
                        We were thoroughly impressed by your skills, experience, and enthusiasm, and 
                        we believe you will be a valuable addition to our team.
                      </p>

                      <p className="leading-relaxed text-justify">
                        Your expected start date will be{" "}
                        <strong className="text-[#1A2E5A]">{details.startDate || "[Start Date]"}</strong>. 
                        You will be reporting to{" "}
                        <strong className="text-[#1A2E5A]">{details.reportingTo || "[Manager]"}</strong>{" "}
                        and will be working at our{" "}
                        <strong className="text-[#1A2E5A]">{details.workLocation || "[Location]"}</strong>{" "}
                        location.
                      </p>
                    </>
                  )}

                  {/* Key Details Box */}
                  <div className="bg-[#F8F6F0] border border-[#C9A84C] p-3 rounded">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                      <div>
                        <span className="font-bold text-[#1A2E5A]">Position:</span>{" "}
                        {details.position || "N/A"}
                      </div>
                      <div>
                        <span className="font-bold text-[#1A2E5A]">Department:</span>{" "}
                        {details.department || "N/A"}
                      </div>
                      <div>
                        <span className="font-bold text-[#1A2E5A]">Type:</span>{" "}
                        {details.employmentType || "N/A"}
                      </div>
                      {isInternship && details.internshipDuration && (
                        <div>
                          <span className="font-bold text-[#1A2E5A]">Duration:</span>{" "}
                          {details.internshipDuration}
                        </div>
                      )}
                      {isInternship && details.education && (
                        <div>
                          <span className="font-bold text-[#1A2E5A]">Education:</span>{" "}
                          {details.education}
                        </div>
                      )}
                      <div>
                        <span className="font-bold text-[#1A2E5A]">
                          {isInternship ? "Stipend:" : "Compensation:"}
                        </span>{" "}
                        {details.salary ? `${details.salary} ${details.salaryPeriod}` : "N/A"}
                      </div>
                      {!isInternship && (
                        <>
                          <div>
                            <span className="font-bold text-[#1A2E5A]">Working Hours:</span>{" "}
                            {details.workingHours || "N/A"}
                          </div>
                          <div>
                            <span className="font-bold text-[#1A2E5A]">Probation:</span>{" "}
                            {details.probationPeriod || "N/A"}
                          </div>
                        </>
                      )}
                      {isInternship && details.projectScope && (
                        <div>
                          <span className="font-bold text-[#1A2E5A]">Project:</span>{" "}
                          {details.projectScope}
                        </div>
                      )}
                      <div>
                        <span className="font-bold text-[#1A2E5A]">
                          {isInternship ? "Mentor:" : "Reports To:"}
                        </span>{" "}
                        {isInternship ? details.mentorName || details.reportingTo || "N/A" : details.reportingTo || "N/A"}
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

                  {isInternship ? (
                    <>
                      <p className="leading-relaxed text-justify">
                        This internship offers you the opportunity to gain practical experience, 
                        work on real-world projects, and develop professional skills under expert 
                        guidance. We are committed to providing you with a meaningful learning 
                        experience and support for your professional growth.
                      </p>

                      <p className="leading-relaxed text-justify">
                        To accept this internship offer, please sign the acceptance section below 
                        and return this letter by{" "}
                        {details.offerDate ? 
                          new Date(new Date(details.offerDate).setDate(new Date(details.offerDate).getDate() + 5)).toLocaleDateString() 
                          : "[Date]" 
                        }.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="leading-relaxed text-justify">
                        This offer is subject to the successful completion of background verification 
                        and reference checks. Please review the attached terms and conditions carefully. 
                        We look forward to welcoming you to our team and wish you a successful career 
                        with {details.companyName}.
                      </p>

                      <p className="leading-relaxed text-justify">
                        To accept this offer, please sign the acceptance section below and return this 
                        letter by{" "}
                        {details.offerDate ? 
                          new Date(new Date(details.offerDate).setDate(new Date(details.offerDate).getDate() + 7)).toLocaleDateString() 
                          : "[Date]" 
                        }.
                      </p>
                    </>
                  )}
                </div>

                {/* Footer with Signatures */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t-2 border-[#C9A84C]">
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
                    <p className="text-xs text-slate-500">Candidate's Signature</p>
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