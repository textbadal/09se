
"use client";

import React, { useEffect, useMemo, useState } from "react";
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
  Clock,
  Award,
  AlertCircle,
  CheckCircle,
  GraduationCap,
} from "lucide-react";

// --------------------------------------------------
// COMPANY DETAILS
// --------------------------------------------------

const FIXED_COMPANY_NAME = "Dream Homes Bihar";
const FIXED_COMPANY_ADDRESS = "Saguna More, Danapur-801503";
const FIXED_COMPANY_WEBSITE = "www.dreamhomesbihar.in";
const FIXED_COMPANY_EMAIL = "careers@dreamhomesbihar.in";
const FIXED_COMPANY_PHONE = "+91 62058 20278";

const FIXED_LOGO_URL = "/fevicon.png";
const FIXED_HR_NAME = "Sumit Singh";
const FIXED_HR_TITLE = "HR Manager";
const FIXED_HR_SIGNATURE_URL = "/sumit_singh.png";

// --------------------------------------------------
// EMPLOYMENT DETAILS TYPE
// --------------------------------------------------

interface EmploymentDetails {
  referenceNumber: string;
  employeeName: string;
  employeeAddress: string;
  employeeEmail: string;
  designation: string;
  department: string;
  employmentType: string;
  workMode: string;

  joiningDate: string;
  offerDate: string;

  salary: string;
  salaryPeriod: string;
  salaryBreakup: string;
  incentives: string;

  probationPeriod: string;
  workingHours: string;
  weeklyOff: string;
  workLocation: string;
  reportingTo: string;
  noticePeriod: string;
  leavePolicy: string;

  responsibilities: string;
  additionalTerms: string;

  companyName: string;
  companyAddress: string;
  companyWebsite: string;
  companyEmail: string;
  companyPhone: string;

  managerName: string;
  managerTitle: string;
}

// --------------------------------------------------
// REFERENCE NUMBER GENERATOR
// --------------------------------------------------

const getNextOfferReferenceNumber = (): string => {
  if (typeof window === "undefined") return "DHB-2026-0001";

  const year = new Date().getFullYear();
  const storageKey = `employment_ref_counter_${year}`;

  const counter =
    parseInt(localStorage.getItem(storageKey) || "0", 10) + 1;

  localStorage.setItem(storageKey, counter.toString());

  return `DHB-${year}-${String(counter).padStart(4, "0")}`;
};

// --------------------------------------------------
// PDF STYLES
// --------------------------------------------------

// --------------------------------------------------
// IMPROVED PDF STYLES
// --------------------------------------------------

const styles = StyleSheet.create({
  page: {
    paddingTop: 105,
    paddingBottom: 65,
    paddingHorizontal: 48,
    fontFamily: "Helvetica",
    fontSize: 9,
    color: "#334155",
    backgroundColor: "#FFFFFF",
    lineHeight: 1.5,
  },

  // Repeating page border
  pageBorder: {
    position: "absolute",
    top: 18,
    left: 18,
    right: 18,
    bottom: 18,
    borderWidth: 1.2,
    borderColor: "#1A2E5A",
  },

  // Repeating header
  header: {
    position: "absolute",
    top: 27,
    left: 48,
    right: 48,
    borderBottomWidth: 2,
    borderBottomColor: "#C9A84C",
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    width: 52,
    height: 52,
    objectFit: "contain",
  },

  headerRight: {
    flex: 1,
    alignItems: "flex-end",
  },

  companyTitle: {
    fontSize: 17,
    fontFamily: "Helvetica-Bold",
    color: "#1A2E5A",
    textTransform: "uppercase",
    letterSpacing: 0.7,
  },

  companyTagline: {
    fontSize: 7,
    color: "#64748B",
    marginTop: 3,
  },

  refText: {
    fontSize: 7.5,
    color: "#64748B",
    marginTop: 4,
  },

  // Repeating footer
  footer: {
    position: "absolute",
    bottom: 25,
    left: 48,
    right: 48,
    paddingTop: 7,
    borderTopWidth: 0.7,
    borderTopColor: "#CBD5E1",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  footerText: {
    fontSize: 6.5,
    color: "#94A3B8",
  },

  pageNumber: {
    fontSize: 7,
    color: "#1A2E5A",
    fontFamily: "Helvetica-Bold",
  },

  // Watermark
  watermarkContainer: {
    position: "absolute",
    top: 340,
    left: 45,
    right: 45,
    alignItems: "center",
    justifyContent: "center",
  },

  watermarkText: {
    fontSize: 43,
    fontFamily: "Helvetica-Bold",
    color: "#1A2E5A",
    opacity: 0.045,
    letterSpacing: 4,
    transform: "rotate(-30deg)",
  },

  // Main title
  title: {
    fontSize: 19,
    fontFamily: "Helvetica-Bold",
    color: "#1A2E5A",
    textTransform: "uppercase",
    letterSpacing: 1.3,
    textAlign: "center",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 7.5,
    color: "#C9A84C",
    textAlign: "center",
    marginBottom: 18,
    letterSpacing: 1.5,
  },

  dateBlock: {
    alignItems: "flex-end",
    marginBottom: 13,
  },

  dateText: {
    fontSize: 8,
    color: "#64748B",
  },

  recipientBlock: {
    marginBottom: 13,
    padding: 11,
    backgroundColor: "#F8F6F0",
    borderLeftWidth: 3,
    borderLeftColor: "#C9A84C",
  },

  recipientName: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#1A2E5A",
  },

  recipientDetail: {
    fontSize: 7.5,
    color: "#64748B",
    marginTop: 3,
  },

  paragraph: {
    fontSize: 8.5,
    lineHeight: 1.6,
    color: "#334155",
    marginBottom: 8,
    textAlign: "justify",
  },

  // Section headings
  sectionTitle: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: "#1A2E5A",
    marginTop: 11,
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#C9A84C",
    paddingBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },

  // Details table
  detailsBox: {
    marginTop: 3,
    marginBottom: 8,
    borderWidth: 0.7,
    borderColor: "#D9D4C8",
    backgroundColor: "#FFFFFF",
  },

  detailRow: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 9,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E8E4DA",
  },

  detailLabel: {
    fontSize: 7.8,
    fontFamily: "Helvetica-Bold",
    color: "#1A2E5A",
    width: "36%",
    paddingRight: 8,
  },

  detailValue: {
    fontSize: 7.8,
    color: "#334155",
    width: "64%",
  },

  // Compensation highlight
  salaryBox: {
    backgroundColor: "#F8F6F0",
    borderWidth: 0.8,
    borderColor: "#C9A84C",
    padding: 10,
    marginBottom: 8,
  },

  salaryHeading: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#1A2E5A",
    marginBottom: 4,
  },

  salaryText: {
    fontSize: 8,
    lineHeight: 1.5,
    color: "#334155",
    marginBottom: 3,
  },

  // Bullets
  bullet: {
    fontSize: 8,
    lineHeight: 1.5,
    color: "#334155",
    marginBottom: 4,
    paddingLeft: 5,
  },

  termsText: {
    fontSize: 7.8,
    lineHeight: 1.6,
    color: "#475569",
    textAlign: "justify",
  },

  termsParagraph: {
    marginBottom: 6,
  },

  // Signatures
  signatureSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 27,
    paddingTop: 10,
  },

  signBlock: {
    width: "43%",
    alignItems: "center",
  },

  signatureImg: {
    height: 34,
    width: 110,
    objectFit: "contain",
    marginBottom: 4,
  },

  signSpace: {
    height: 38,
  },

  signLine: {
    borderBottomWidth: 0.8,
    borderBottomColor: "#1A2E5A",
    width: "100%",
    marginBottom: 6,
  },

  signName: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: "#1A2E5A",
    textAlign: "center",
  },

  signTitle: {
    fontSize: 7,
    color: "#64748B",
    textAlign: "center",
    marginTop: 3,
  },

  // Company contact
  companyContact: {
    borderTopWidth: 1,
    borderTopColor: "#C9A84C",
    marginTop: 19,
    paddingTop: 8,
    alignItems: "center",
  },

  contactText: {
    fontSize: 6.8,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 3,
  },

  footerNote: {
    fontSize: 6.5,
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 4,
    fontStyle: "italic",
  },
});
// --------------------------------------------------
// PDF DOCUMENT
// --------------------------------------------------

// --------------------------------------------------
// IMPROVED PDF DOCUMENT
// --------------------------------------------------

const EmploymentOfferPDF = ({
  details,
}: {
  details: EmploymentDetails;
}) => {
  const formatDate = (value: string) => {
    if (!value) return "To be confirmed";

    const date = new Date(`${value}T00:00:00`);

    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const detailRow = (label: string, value: string) => (
    <View style={styles.detailRow} wrap={false}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>
        {value || "As applicable"}
      </Text>
    </View>
  );

  const renderBullets = (value: string) => {
    const lines = value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    return lines.map((line, index) => (
      <View key={`bullet-${index}`} wrap={false}>
        <Text style={styles.bullet}>• {line}</Text>
      </View>
    ));
  };

  const renderTerms = (value: string) => {
    const paragraphs = value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    return paragraphs.map((line, index) => (
      <View key={`term-${index}`} wrap={false}>
        <Text style={[styles.termsText, styles.termsParagraph]}>
          {line}
        </Text>
      </View>
    ));
  };

  // Resolve Next.js public assets to absolute URLs in the browser.
  const getAssetUrl = (path: string) => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}${path}`;
    }

    return path;
  };

  return (
    <Document
      title={`Employment Offer - ${details.employeeName || "Draft"}`}
      author={details.companyName}
      subject="Employment Offer Letter"
      creator="Dream Homes Bihar"
    >
      <Page size="A4" style={styles.page} wrap>

        {/* REPEATING PAGE BORDER */}

        <View style={styles.pageBorder} fixed />

        {/* REPEATING WATERMARK */}

        <View style={styles.watermarkContainer} fixed>
          <Text style={styles.watermarkText}>
            DREAM HOMES BIHAR
          </Text>
        </View>

        {/* REPEATING HEADER */}

        <View style={styles.header} fixed>
          <PdfImage
            src={getAssetUrl(FIXED_LOGO_URL)}
            style={styles.logo}
          />

          <View style={styles.headerRight}>
            <Text style={styles.companyTitle}>
              {details.companyName}
            </Text>

            <Text style={styles.companyTagline}>
              Architectural Design & Planning Services
            </Text>

            <Text style={styles.refText}>
              Reference: {details.referenceNumber || "Not Generated"}
            </Text>
          </View>
        </View>

        {/* REPEATING FOOTER */}

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            {details.companyWebsite} | {details.companyPhone}
          </Text>

          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>

        {/* DOCUMENT TITLE */}

        <Text style={styles.title}>
          Employment Offer Letter
        </Text>

        <Text style={styles.subtitle}>
          FORMAL LETTER OF APPOINTMENT
        </Text>

        {/* DATE */}

        <View style={styles.dateBlock}>
          <Text style={styles.dateText}>
            Date: {formatDate(details.offerDate)}
          </Text>
        </View>

        {/* EMPLOYEE INFORMATION */}

        <View style={styles.recipientBlock} wrap={false}>
          <Text style={styles.recipientName}>
            {details.employeeName || "[Employee Name]"}
          </Text>

          {details.employeeAddress ? (
            <Text style={styles.recipientDetail}>
              {details.employeeAddress}
            </Text>
          ) : null}

          {details.employeeEmail ? (
            <Text style={styles.recipientDetail}>
              {details.employeeEmail}
            </Text>
          ) : null}
        </View>

        {/* INTRODUCTION */}

        <Text style={styles.paragraph}>
          Dear {details.employeeName || "Candidate"},
        </Text>

        <Text style={styles.paragraph}>
          We are pleased to offer you employment with{" "}
          <Text style={{ fontFamily: "Helvetica-Bold", color: "#1A2E5A" }}>
            {details.companyName}
          </Text>{" "}
          for the position of{" "}
          <Text style={{ fontFamily: "Helvetica-Bold", color: "#1A2E5A" }}>
            {details.designation}
          </Text>{" "}
          in the {details.department} department.
        </Text>

        <Text style={styles.paragraph}>
          We believe your skills and contribution will be valuable to
          our organisation. We look forward to having you as a member
          of our team.
        </Text>

        <Text style={styles.paragraph}>
          Your proposed date of joining is{" "}
          <Text style={{ fontFamily: "Helvetica-Bold" }}>
            {formatDate(details.joiningDate)}
          </Text>.
        </Text>

        {/* EMPLOYMENT DETAILS */}

        <Text style={styles.sectionTitle} minPresenceAhead={40}>
          01. Employment Details
        </Text>

        <View style={styles.detailsBox}>
          {detailRow("Designation", details.designation)}
          {detailRow("Department", details.department)}
          {detailRow("Employment Type", details.employmentType)}
          {detailRow("Work Arrangement", details.workMode)}
          {detailRow("Joining Date", formatDate(details.joiningDate))}
          {detailRow("Work Location", details.workLocation)}
          {detailRow("Reporting To", details.reportingTo)}
          {detailRow("Probation Period", details.probationPeriod)}
          {detailRow("Working Hours", details.workingHours)}
          {detailRow("Weekly Off", details.weeklyOff)}
          {detailRow("Notice Period", details.noticePeriod)}
          {detailRow("Leave Policy", details.leavePolicy)}
        </View>

        {/* SALARY DETAILS */}

        <Text style={styles.sectionTitle} minPresenceAhead={45}>
          02. Salary & Compensation
        </Text>

        <View style={styles.salaryBox}>
          <Text style={styles.salaryHeading}>
            Compensation Details
          </Text>

          <Text style={styles.salaryText}>
            Salary: {details.salary} {details.salaryPeriod}
          </Text>

          <Text style={styles.salaryText}>
            Incentives: {details.incentives || "As per company policy"}
          </Text>

          {details.salaryBreakup ? (
            <Text style={styles.salaryText}>
              {details.salaryBreakup}
            </Text>
          ) : null}
        </View>

        {/* RESPONSIBILITIES */}

        {details.responsibilities.trim() ? (
          <>
            <Text style={styles.sectionTitle} minPresenceAhead={35}>
              03. Key Responsibilities
            </Text>

            {renderBullets(details.responsibilities)}
          </>
        ) : null}

        {/* TERMS */}

        <Text style={styles.sectionTitle} minPresenceAhead={35}>
          04. Terms & Conditions
        </Text>

        {renderTerms(details.additionalTerms)}

        {/* ACCEPTANCE */}

        <Text style={styles.sectionTitle} minPresenceAhead={45}>
          05. Acceptance of Offer
        </Text>

        <Text style={styles.paragraph}>
          This offer is subject to the terms stated in this letter
          and any applicable written employment agreement or company
          policy. Please confirm your acceptance by signing below
          and returning a copy of this letter to the company.
        </Text>

        <Text style={styles.paragraph}>
          We welcome you to {details.companyName} and wish you success
          in your professional journey with us.
        </Text>

        {/* SIGNATURE SECTION */}

        <View style={styles.signatureSection} wrap={false}>

          {/* COMPANY SIGNATURE */}

          <View style={styles.signBlock}>
            <PdfImage
              src={getAssetUrl(FIXED_HR_SIGNATURE_URL)}
              style={styles.signatureImg}
            />

            <View style={styles.signLine} />

            <Text style={styles.signName}>
              {details.managerName}
            </Text>

            <Text style={styles.signTitle}>
              {details.managerTitle}
            </Text>

            <Text style={styles.signTitle}>
              For {details.companyName}
            </Text>
          </View>

          {/* EMPLOYEE SIGNATURE */}

          <View style={styles.signBlock}>
            <View style={styles.signSpace} />

            <View style={styles.signLine} />

            <Text style={styles.signName}>
              {details.employeeName}
            </Text>

            <Text style={styles.signTitle}>
              Employee Acceptance
            </Text>

            <Text style={styles.signTitle}>
              Signature & Date
            </Text>
          </View>
        </View>

        {/* COMPANY CONTACT */}

        <View style={styles.companyContact} wrap={false}>
          <Text style={styles.contactText}>
            {details.companyAddress}
          </Text>

          <Text style={styles.contactText}>
            {details.companyWebsite} | {details.companyEmail}
          </Text>

          <Text style={styles.contactText}>
            Phone: {details.companyPhone}
          </Text>

          <Text style={styles.footerNote}>
            This document is electronically generated by{" "}
            {details.companyName}.
          </Text>
        </View>

      </Page>
    </Document>
  );
};
// --------------------------------------------------
// MAIN PAGE
// --------------------------------------------------

export default function EmploymentOfferLetterPage() {
  const [isClient, setIsClient] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(
    new Set()
  );
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);

  const [details, setDetails] = useState<EmploymentDetails>({
    referenceNumber: "",
    employeeName: "",
    employeeAddress: "",
    employeeEmail: "",

    designation: "Sales Executive",
    department: "Sales & Business Development",
    employmentType: "Full-Time",
    workMode: "Work From Home",

    joiningDate: "",
    offerDate: new Date().toISOString().split("T")[0],

    salary: "5000",
    salaryPeriod: "per month",
    salaryBreakup: "Fixed monthly salary as mentioned above.",
    incentives: "Performance-based incentives as per company policy.",

    probationPeriod: "3 Months",
    workingHours: "9:00 AM - 6:00 PM",
    weeklyOff: "Sunday",
    workLocation: "Remote / Work From Home",
    reportingTo: "Sales Manager",
    noticePeriod: "15 days during probation; 30 days after confirmation.",
    leavePolicy: "As per company policy and applicable law.",

    responsibilities:
      "Contact prospective customers and follow up on leads.\nExplain architectural design services and pricing to potential clients.\nMaintain customer details and follow-up records.\nCoordinate with the design team and sales manager.\nAchieve assigned sales and customer service targets.\nMaintain professional communication with customers.",

    additionalTerms:
      "1. The employee shall maintain confidentiality of all company information, customer details, pricing, architectural drawings and business records.\n\n2. The employee shall perform assigned duties responsibly and follow reasonable instructions from the reporting manager.\n\n3. Company data, accounts and customer information must not be shared with unauthorised persons.\n\n4. Any change in salary, incentives or employment conditions shall be communicated in writing by the company.\n\n5. Employment may be terminated in accordance with the notice period and applicable employment terms.",

    companyName: FIXED_COMPANY_NAME,
    companyAddress: FIXED_COMPANY_ADDRESS,
    companyWebsite: FIXED_COMPANY_WEBSITE,
    companyEmail: FIXED_COMPANY_EMAIL,
    companyPhone: FIXED_COMPANY_PHONE,

    managerName: FIXED_HR_NAME,
    managerTitle: FIXED_HR_TITLE,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto-generate reference number

  const handleAutoGenerateRef = () => {
    setDetails((prev) => ({
      ...prev,
      referenceNumber: getNextOfferReferenceNumber(),
    }));
  };

  // Update fields

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    setTouchedFields((prev) => new Set(prev).add(name));
  };

  const handleBlur = (fieldName: string) => {
    setTouchedFields((prev) => new Set(prev).add(fieldName));
  };

  // Required fields

  const requiredFields: (keyof EmploymentDetails)[] = [
    "employeeName",
    "designation",
    "joiningDate",
    "salary",
  ];

  const isFormValid = useMemo(() => {
    return requiredFields.every(
      (field) => details[field].trim() !== ""
    );
  }, [details]);

  const userFields = [
    "referenceNumber",
    "employeeName",
    "designation",
    "department",
    "joiningDate",
    "salary",
    "employmentType",
    "workMode",
    "probationPeriod",
  ];

  const completionPercentage = useMemo(() => {
    const filledFields = userFields.filter((field) => {
      const value = details[field as keyof EmploymentDetails];
      return value && value.trim() !== "";
    });

    return Math.round(
      (filledFields.length / userFields.length) * 100
    );
  }, [details]);

  const isRequired = (field: string) =>
    requiredFields.includes(field as keyof EmploymentDetails);

  const isFieldInvalid = (field: string) => {
    return (
      touchedFields.has(field) &&
      isRequired(field) &&
      !details[field as keyof EmploymentDetails].trim()
    );
  };

  // Clear form

  const handleClear = () => {
    setDetails({
      ...details,
      referenceNumber: "",
      employeeName: "",
      employeeAddress: "",
      employeeEmail: "",
      designation: "",
      department: "",
      joiningDate: "",
      salary: "",
      salaryBreakup: "",
      incentives: "",
      responsibilities: "",
      additionalTerms: "",
      offerDate: new Date().toISOString().split("T")[0],
    });

    setTouchedFields(new Set());
  };

  // --------------------------------------------------
  // FORM INPUT COMPONENT
  // --------------------------------------------------

  const inputClass =
    "w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none";

  const labelClass =
    "block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1";

  const inputField = (
    name: keyof EmploymentDetails,
    label: string,
    type = "text",
    placeholder = ""
  ) => (
    <div key={name}>
      <label className={labelClass}>
        {label} {isRequired(name) && "*"}
      </label>

      <input
        type={type}
        name={name}
        value={details[name]}
        onChange={handleChange}
        onBlur={() => handleBlur(name)}
        placeholder={placeholder}
        className={`${inputClass} ${
          isFieldInvalid(name) ? "border-red-500" : ""
        }`}
      />

      {isFieldInvalid(name) && (
        <p className="text-xs text-red-500 mt-1">
          <AlertCircle className="w-3 h-3 inline mr-1" />
          This field is required.
        </p>
      )}
    </div>
  );

  const textAreaField = (
    name: keyof EmploymentDetails,
    label: string,
    rows = 4
  ) => (
    <div key={name}>
      <label className={labelClass}>{label}</label>

      <textarea
        name={name}
        value={details[name]}
        onChange={handleChange}
        rows={rows}
        className={`${inputClass} resize-y`}
      />
    </div>
  );

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 md:p-8 font-sans text-slate-800">

      {/* HEADER */}

      <header className="max-w-7xl mx-auto mb-6 print:hidden">
        <div className="bg-white rounded-xl px-6 py-4 shadow-sm border border-slate-200">
          <div className="flex flex-wrap gap-4 justify-between items-center">

            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <span className="bg-[#1A2E5A] text-white p-1.5 rounded-lg">
                  <Briefcase className="w-5 h-5" />
                </span>

                Employment Offer Generator
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Professional Employment Offer Letters for{" "}
                <strong className="text-slate-700">
                  {FIXED_COMPANY_NAME}
                </strong>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">

              {/* PROGRESS */}

              <div className="hidden md:flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border">
                <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1A2E5A] rounded-full"
                    style={{
                      width: `${completionPercentage}%`,
                    }}
                  />
                </div>

                <span className="text-xs font-medium">
                  {completionPercentage}%
                </span>
              </div>

              {/* PRINT */}

              <button
                onClick={() => window.print()}
                className="bg-white hover:bg-slate-50 text-slate-700 font-medium px-4 py-2 rounded-lg border text-sm flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>

              {/* DOWNLOAD */}

              {isClient && (
                <PDFDownloadLink
                  document={<EmploymentOfferPDF details={details} />}
                  fileName={`Employment_Offer_${details.employeeName.replace(/\s+/g, "_") || "Draft"}_${details.referenceNumber || "Draft"}.pdf`}
                  className={`${
                    isFormValid
                      ? "bg-[#1A2E5A] hover:bg-[#142442]"
                      : "bg-slate-400 pointer-events-none"
                  } text-white font-medium px-5 py-2 rounded-lg text-sm flex items-center gap-2`}
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

      {/* MAIN GRID */}

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT FORM */}

        <section className="lg:col-span-5 print:hidden space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-5">

            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Edit className="w-5 h-5 text-[#1A2E5A]" />
                Employment Details
              </h2>

              <button
                onClick={() => setIsPreviewVisible(!isPreviewVisible)}
                className="text-xs text-[#1A2E5A] font-medium lg:hidden"
              >
                {isPreviewVisible ? "Hide Preview" : "Show Preview"}
              </button>
            </div>

            {/* REFERENCE NUMBER */}

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className={labelClass}>
                  Reference Number
                </label>

                <button
                  type="button"
                  onClick={handleAutoGenerateRef}
                  className="text-[11px] text-[#1A2E5A] flex items-center gap-1 font-medium"
                >
                  <RefreshCw className="w-3 h-3" />
                  Auto Generate
                </button>
              </div>

              <input
                type="text"
                name="referenceNumber"
                value={details.referenceNumber}
                onChange={handleChange}
                placeholder="Enter reference number"
                className={`${inputClass} font-mono`}
              />
            </div>

            {/* EMPLOYEE INFORMATION */}

            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-[#1A2E5A]" />
                Employee Information
              </h3>

              <div className="space-y-3">
                {inputField(
                  "employeeName",
                  "Full Name",
                  "text",
                  "Enter employee's full name"
                )}

                {inputField(
                  "employeeAddress",
                  "Address",
                  "text",
                  "Employee address"
                )}

                {inputField(
                  "employeeEmail",
                  "Email Address",
                  "email",
                  "employee@email.com"
                )}
              </div>
            </div>

            {/* JOB INFORMATION */}

            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#1A2E5A]" />
                Job Information
              </h3>

              <div className="space-y-3">
                {inputField(
                  "designation",
                  "Designation",
                  "text",
                  "e.g. Sales Executive"
                )}

                {inputField(
                  "department",
                  "Department",
                  "text",
                  "e.g. Sales & Marketing"
                )}

                <div>
                  <label className={labelClass}>
                    Employment Type
                  </label>

                  <select
                    name="employmentType"
                    value={details.employmentType}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option>Full-Time</option>
                    <option>Part-Time</option>
                    <option>Fixed-Term</option>
                    <option>Contract</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>
                    Work Mode
                  </label>

                  <select
                    name="workMode"
                    value={details.workMode}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option>Work From Home</option>
                    <option>On-site</option>
                    <option>Hybrid</option>
                    <option>Remote</option>
                  </select>
                </div>
              </div>
            </div>

            {/* DATES */}

            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#1A2E5A]" />
                Employment Dates
              </h3>

              <div className="space-y-3">
                {inputField("offerDate", "Offer Date", "date")}
                {inputField("joiningDate", "Joining Date", "date")}
              </div>
            </div>

            {/* SALARY */}

            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-[#1A2E5A]" />
                Salary & Incentives
              </h3>

              <div className="space-y-3">
                {inputField(
                  "salary",
                  "Salary Amount",
                  "text",
                  "e.g. ₹5,000"
                )}

                <div>
                  <label className={labelClass}>
                    Salary Period
                  </label>

                  <select
                    name="salaryPeriod"
                    value={details.salaryPeriod}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option>per month</option>
                    <option>per year</option>
                    <option>per week</option>
                    <option>per day</option>
                  </select>
                </div>

                {textAreaField(
                  "salaryBreakup",
                  "Salary Details",
                  3
                )}

                {textAreaField(
                  "incentives",
                  "Incentive Structure",
                  3
                )}
              </div>
            </div>

            {/* WORK DETAILS */}

            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#1A2E5A]" />
                Work Conditions
              </h3>

              <div className="space-y-3">
                {inputField(
                  "probationPeriod",
                  "Probation Period",
                  "text",
                  "e.g. 3 Months"
                )}

                {inputField(
                  "workingHours",
                  "Working Hours",
                  "text",
                  "e.g. 9 AM - 6 PM"
                )}

                {inputField(
                  "weeklyOff",
                  "Weekly Off",
                  "text",
                  "e.g. Sunday"
                )}

                {inputField(
                  "workLocation",
                  "Work Location",
                  "text",
                  "e.g. Work From Home"
                )}

                {inputField(
                  "reportingTo",
                  "Reporting Manager",
                  "text",
                  "e.g. Sales Manager"
                )}

                {inputField(
                  "noticePeriod",
                  "Notice Period",
                  "text",
                  "e.g. 30 days"
                )}

                {inputField(
                  "leavePolicy",
                  "Leave Policy",
                  "text",
                  "As per company policy"
                )}
              </div>
            </div>

            {/* RESPONSIBILITIES */}

            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold mb-3">
                Job Responsibilities
              </h3>

              {textAreaField(
                "responsibilities",
                "Responsibilities (one per line)",
                7
              )}
            </div>

            {/* TERMS */}

            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold mb-3">
                Terms & Conditions
              </h3>

              {textAreaField(
                "additionalTerms",
                "Employment Terms",
                8
              )}
            </div>

            {/* ACTIONS */}

            <div className="flex gap-3 pt-3">
              <button
                onClick={handleClear}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Clear Form
              </button>

              <button
                onClick={handleAutoGenerateRef}
                className="flex-1 px-4 py-2 bg-[#1A2E5A] text-white rounded-lg text-sm font-medium"
              >
                Generate Reference
              </button>
            </div>

            <div className="p-3 bg-[#F8F6F0] rounded-lg border border-[#C9A84C]">
              <p className="text-xs text-[#1A2E5A] flex items-start gap-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />

                <span>
                  <strong>Note:</strong> Fields marked with * are
                  compulsory. Fill in the employee information and
                  compensation details to enable PDF download.
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* RIGHT LIVE PREVIEW */}

        <section
          className={`lg:col-span-7 flex justify-center ${
            !isPreviewVisible ? "hidden lg:flex" : ""
          }`}
        >
          <div className="w-full overflow-x-auto">

            <div
              id="printable-area"
              className="w-[210mm] min-h-[297mm] bg-white p-6 rounded-xl shadow-lg border-4 border-[#1A2E5A] relative mx-auto"
            >
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
                <div className="text-6xl font-bold text-[#1A2E5A] -rotate-[30deg] tracking-widest">
                  DREAM HOMES BIHAR
                </div>
              </div>

              <div className="border-2 border-[#1A2E5A] p-6 min-h-[265mm] flex flex-col relative">

                {/* PREVIEW HEADER */}

                <div className="flex justify-between items-center border-b-2 border-[#C9A84C] pb-4 mb-5">
                  <img
                    src={FIXED_LOGO_URL}
                    alt="Dream Homes Bihar Logo"
                    className="h-14 w-14 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />

                  <div className="text-right">
                    <h1 className="text-xl font-bold text-[#1A2E5A] uppercase">
                      {details.companyName}
                    </h1>

                    <p className="text-[9px] text-slate-500">
                      Architectural Design & Planning Services
                    </p>

                    <p className="text-[9px] text-slate-400 mt-1">
                      Ref: {details.referenceNumber || "Not Generated"}
                    </p>
                  </div>
                </div>

                {/* PREVIEW TITLE */}

                <h2 className="text-xl font-bold text-[#1A2E5A] uppercase tracking-widest text-center">
                  Employment Offer Letter
                </h2>

                <p className="text-[9px] text-[#C9A84C] text-center tracking-widest mt-1 mb-4">
                  LETTER OF APPOINTMENT
                </p>

                <div className="text-right text-xs text-slate-600 mb-4">
                  Date: {details.offerDate}
                </div>

                {/* RECIPIENT */}

                <div className="bg-[#F8F6F0] border-l-4 border-[#C9A84C] p-3 mb-4">
                  <p className="font-bold text-[#1A2E5A] text-sm">
                    {details.employeeName || "[Employee Name]"}
                  </p>

                  <p className="text-xs text-slate-500">
                    {details.employeeAddress}
                  </p>

                  <p className="text-xs text-slate-500">
                    {details.employeeEmail}
                  </p>
                </div>

                {/* LETTER BODY */}

                <div className="text-xs text-slate-700 space-y-3 flex-1">

                  <p className="font-bold text-[#1A2E5A]">
                    Dear {details.employeeName || "[Employee Name]"},
                  </p>

                  <p className="leading-relaxed text-justify">
                    We are pleased to offer you employment with{" "}
                    <strong className="text-[#1A2E5A]">
                      {details.companyName}
                    </strong>{" "}
                    for the position of{" "}
                    <strong className="text-[#1A2E5A]">
                      {details.designation || "[Designation]"}
                    </strong>{" "}
                    in the {details.department || "[Department]"} department.
                    We look forward to having you as a valuable member of
                    our team.
                  </p>

                  <p className="leading-relaxed">
                    Your proposed joining date is{" "}
                    <strong>
                      {details.joiningDate || "[Joining Date]"}
                    </strong>.
                  </p>

                  {/* EMPLOYMENT DETAILS */}

                  <h3 className="font-bold text-[#1A2E5A] border-b border-[#C9A84C] pb-1">
                    EMPLOYMENT DETAILS
                  </h3>

                  <div className="bg-[#F8F6F0] border border-[#C9A84C] p-3 rounded">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10px]">
                      {[
                        ["Designation", details.designation],
                        ["Department", details.department],
                        ["Employment Type", details.employmentType],
                        ["Work Mode", details.workMode],
                        ["Joining Date", details.joiningDate],
                        ["Work Location", details.workLocation],
                        ["Reporting To", details.reportingTo],
                        ["Probation", details.probationPeriod],
                        ["Working Hours", details.workingHours],
                        ["Weekly Off", details.weeklyOff],
                        ["Notice Period", details.noticePeriod],
                        ["Leave Policy", details.leavePolicy],
                      ].map(([label, value]) => (
                        <div key={label}>
                          <span className="font-bold text-[#1A2E5A]">
                            {label}:{" "}
                          </span>
                          {value || "N/A"}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SALARY */}

                  <h3 className="font-bold text-[#1A2E5A] border-b border-[#C9A84C] pb-1">
                    SALARY & COMPENSATION
                  </h3>

                  <div className="bg-[#F8F6F0] p-3 border border-[#C9A84C] rounded">
                    <p>
                      <strong className="text-[#1A2E5A]">
                        Salary:{" "}
                      </strong>
                      {details.salary
                        ? `${details.salary} ${details.salaryPeriod}`
                        : "Not specified"}
                    </p>

                    <p className="mt-2">
                      <strong className="text-[#1A2E5A]">
                        Incentives:{" "}
                      </strong>
                      {details.incentives || "As per company policy"}
                    </p>

                    <p className="mt-2">
                      {details.salaryBreakup}
                    </p>
                  </div>

                  {/* RESPONSIBILITIES */}

                  {details.responsibilities && (
                    <>
                      <h3 className="font-bold text-[#1A2E5A] border-b border-[#C9A84C] pb-1">
                        KEY RESPONSIBILITIES
                      </h3>

                      <div className="whitespace-pre-line text-[10px] leading-relaxed">
                        {details.responsibilities
                          .split("\n")
                          .filter(Boolean)
                          .map((line) => `• ${line.trim()}`)
                          .join("\n")}
                      </div>
                    </>
                  )}

                  {/* TERMS */}

                  <h3 className="font-bold text-[#1A2E5A] border-b border-[#C9A84C] pb-1">
                    TERMS & CONDITIONS
                  </h3>

                  <p className="whitespace-pre-line text-[10px] leading-relaxed text-slate-600">
                    {details.additionalTerms}
                  </p>

                  <p className="leading-relaxed text-justify">
                    Please confirm your acceptance of this offer by
                    signing below and returning a copy to the company.
                    We welcome you to Dream Homes Bihar and wish you
                    success in your professional journey.
                  </p>
                </div>

                {/* SIGNATURE */}

                <div className="flex justify-between mt-8 pt-4 border-t-2 border-[#C9A84C]">
                  <div className="text-center w-[42%]">
                    <div className="h-10 flex items-center justify-center">
                      <img
                        src={FIXED_HR_SIGNATURE_URL}
                        alt="HR Signature"
                        className="h-9 max-w-[130px] object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>

                    <div className="border-b border-[#1A2E5A] mb-1" />

                    <p className="text-xs font-bold text-[#1A2E5A]">
                      {details.managerName}
                    </p>

                    <p className="text-[9px] text-slate-500">
                      {details.managerTitle}
                    </p>

                    <p className="text-[9px] text-slate-500">
                      {details.companyName}
                    </p>
                  </div>

                  <div className="text-center w-[42%]">
                    <div className="h-10" />

                    <div className="border-b border-[#1A2E5A] mb-1" />

                    <p className="text-xs font-bold text-[#1A2E5A]">
                      {details.employeeName || "Employee Name"}
                    </p>

                    <p className="text-[9px] text-slate-500">
                      Employee Acceptance
                    </p>

                    <p className="text-[9px] text-slate-500">
                      Signature & Date
                    </p>
                  </div>
                </div>

                {/* COMPANY FOOTER */}

                <div className="mt-4 pt-3 border-t border-slate-200 text-center text-[8px] text-slate-400 space-y-1">
                  <p>{details.companyAddress}</p>

                  <p>
                    {details.companyWebsite} | {details.companyEmail}
                  </p>

                  <p>{details.companyPhone}</p>

                  <p className="italic mt-2">
                    This document is electronically generated by{" "}
                    {details.companyName}.
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
