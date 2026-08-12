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
  Award,
  Star,
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
  // Common fields
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
  
  // Internship specific
  internshipDuration?: string;
  stipend?: string;
  education?: string;
  university?: string;
  academicYear?: string;
  projectScope?: string;
  mentorName?: string;

  // Experience Letter specific
  employeeId?: string;
  joiningDate?: string;
  lastWorkingDate?: string;
  totalExperience?: string;
  skills?: string;
  achievements?: string;
  reasonForLeaving?: string;
  performanceRating?: string;
  eligibilityForRehire?: string;
  responsibilities?: string;
  projectsWorked?: string;
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
  // Experience Letter specific styles
  experienceBox: {
    marginVertical: 8,
    padding: 10,
    backgroundColor: "#F8F6F0",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#C9A84C",
  },
  experienceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E4DA",
  },
  experienceLabel: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#1A2E5A",
    width: "30%",
  },
  experienceValue: {
    fontSize: 8,
    color: "#334155",
    width: "70%",
  },
});

// PDF Document Renderer
const OfferLetterPDF = ({ details }: { details: OfferLetterDetails }) => {
  const isInternship = details.employmentType === "Internship";
  const isExperience = details.employmentType === "Experience Letter";
  const documentTitle = isExperience ? "Experience Letter" : isInternship ? "Internship Offer Letter" : "Offer Letter";
  const compensationLabel = isInternship ? "Stipend" : isExperience ? "Final CTC" : "Compensation";

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

          {/* Badge */}
          {(isInternship || isExperience) && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>
                {isExperience ? "Employment Verification" : "Internship Program"}
              </Text>
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
            {isExperience && details.employeeId && (
              <Text style={styles.recipientDetail}>Employee ID: {details.employeeId}</Text>
            )}
          </View>

          {/* Body */}
          <View style={styles.body}>
            <Text style={styles.greeting}>Dear {details.candidateName},</Text>

            {isExperience ? (
              // Experience Letter content
              <>
                <Text style={styles.paragraph}>
                  This is to certify that <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
                    {details.candidateName}
                  </Text> was employed with <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
                    {details.companyName}
                  </Text> as a <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
                    {details.position}
                  </Text> in the <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
                    {details.department}
                  </Text> department. During their tenure with us, they demonstrated exceptional 
                  professionalism, dedication, and technical expertise.
                </Text>

                <Text style={styles.paragraph}>
                  {details.candidateName} joined our organization on{" "}
                  <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
                    {details.joiningDate || details.startDate}
                  </Text> and served until{" "}
                  <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
                    {details.lastWorkingDate || details.endDate || "present"}
                  </Text>
                  {details.totalExperience && (
                    <> with a total experience of{" "}
                    <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
                      {details.totalExperience}
                    </Text>
                    </>
                  )}
                  . They reported to{" "}
                  <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
                    {details.reportingTo || details.managerName}
                  </Text> and worked at our{" "}
                  <Text style={{ fontWeight: "bold", color: "#1A2E5A" }}>
                    {details.workLocation}
                  </Text> location.
                </Text>

                {/* Key Details */}
                <View style={styles.experienceBox}>
                  <View style={styles.experienceRow}>
                    <Text style={styles.experienceLabel}>Employee ID</Text>
                    <Text style={styles.experienceValue}>{details.employeeId || "N/A"}</Text>
                  </View>
                  <View style={styles.experienceRow}>
                    <Text style={styles.experienceLabel}>Position</Text>
                    <Text style={styles.experienceValue}>{details.position}</Text>
                  </View>
                  <View style={styles.experienceRow}>
                    <Text style={styles.experienceLabel}>Department</Text>
                    <Text style={styles.experienceValue}>{details.department}</Text>
                  </View>
                  <View style={styles.experienceRow}>
                    <Text style={styles.experienceLabel}>Joining Date</Text>
                    <Text style={styles.experienceValue}>{details.joiningDate || details.startDate}</Text>
                  </View>
                  <View style={styles.experienceRow}>
                    <Text style={styles.experienceLabel}>Last Working Date</Text>
                    <Text style={styles.experienceValue}>{details.lastWorkingDate || details.endDate || "Present"}</Text>
                  </View>
                  {details.totalExperience && (
                    <View style={styles.experienceRow}>
                      <Text style={styles.experienceLabel}>Total Experience</Text>
                      <Text style={styles.experienceValue}>{details.totalExperience}</Text>
                    </View>
                  )}
                  {details.salary && (
                    <View style={styles.experienceRow}>
                      <Text style={styles.experienceLabel}>Final CTC</Text>
                      <Text style={styles.experienceValue}>{details.salary} {details.salaryPeriod}</Text>
                    </View>
                  )}
                  <View style={[styles.experienceRow, { borderBottomWidth: 0 }]}>
                    <Text style={styles.experienceLabel}>Reporting To</Text>
                    <Text style={styles.experienceValue}>{details.reportingTo || details.managerName}</Text>
                  </View>
                </View>

                {/* Skills and Achievements */}
                {details.skills && (
                  <View style={styles.termsSection}>
                    <Text style={styles.termsTitle}>Key Skills</Text>
                    <Text style={styles.termsText}>{details.skills}</Text>
                  </View>
                )}

                {details.achievements && (
                  <View style={styles.termsSection}>
                    <Text style={styles.termsTitle}>Achievements & Contributions</Text>
                    <Text style={styles.termsText}>{details.achievements}</Text>
                  </View>
                )}

                {details.responsibilities && (
                  <View style={styles.termsSection}>
                    <Text style={styles.termsTitle}>Key Responsibilities</Text>
                    <Text style={styles.termsText}>{details.responsibilities}</Text>
                  </View>
                )}

                {details.projectsWorked && (
                  <View style={styles.termsSection}>
                    <Text style={styles.termsTitle}>Projects Worked On</Text>
                    <Text style={styles.termsText}>{details.projectsWorked}</Text>
                  </View>
                )}

                {details.performanceRating && (
                  <View style={styles.termsSection}>
                    <Text style={styles.termsTitle}>Performance Rating</Text>
                    <Text style={styles.termsText}>
                      {details.performanceRating} 
                      {details.eligibilityForRehire && ` - ${details.eligibilityForRehire}`}
                    </Text>
                  </View>
                )}

                <Text style={[styles.paragraph, { marginTop: 10 }]}>
                  Throughout their employment, {details.candidateName} has been a valuable asset 
                  to our team, consistently demonstrating strong work ethic, technical proficiency, 
                  and excellent collaboration skills. They have contributed significantly to our 
                  projects and have been a positive influence on their colleagues.
                </Text>

                <Text style={[styles.paragraph, { marginTop: 8 }]}>
                  We wish {details.candidateName} all the best in their future endeavors and have 
                  no hesitation in recommending them for future employment opportunities. They 
                  leave our organization with our best wishes and appreciation.
                </Text>
              </>
            ) : isInternship ? (
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
                  {details.internshipDuration && (
                    <View style={styles.highlightRow}>
                      <Text style={styles.highlightLabel}>Duration</Text>
                      <Text style={styles.highlightValue}>{details.internshipDuration}</Text>
                    </View>
                  )}
                  {details.education && (
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
                  {details.projectScope && (
                    <View style={styles.highlightRow}>
                      <Text style={styles.highlightLabel}>Project Scope</Text>
                      <Text style={styles.highlightValue}>{details.projectScope}</Text>
                    </View>
                  )}
                  <View style={[styles.highlightRow, { borderBottomWidth: 0 }]}>
                    <Text style={styles.highlightLabel}>Mentor</Text>
                    <Text style={styles.highlightValue}>
                      {details.mentorName || details.reportingTo}
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
                  <View style={styles.highlightRow}>
                    <Text style={styles.highlightLabel}>{compensationLabel}</Text>
                    <Text style={styles.highlightValue}>
                      {details.salary} {details.salaryPeriod}
                    </Text>
                  </View>
                  <View style={styles.highlightRow}>
                    <Text style={styles.highlightLabel}>Working Hours</Text>
                    <Text style={styles.highlightValue}>{details.workingHours}</Text>
                  </View>
                  <View style={styles.highlightRow}>
                    <Text style={styles.highlightLabel}>Probation Period</Text>
                    <Text style={styles.highlightValue}>{details.probationPeriod}</Text>
                  </View>
                  <View style={[styles.highlightRow, { borderBottomWidth: 0 }]}>
                    <Text style={styles.highlightLabel}>Reporting To</Text>
                    <Text style={styles.highlightValue}>{details.reportingTo}</Text>
                  </View>
                </View>

                {/* Additional Terms */}
                {details.additionalTerms && (
                  <View style={styles.termsSection}>
                    <Text style={styles.termsTitle}>Additional Terms & Conditions</Text>
                    <Text style={styles.termsText}>{details.additionalTerms}</Text>
                  </View>
                )}

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

            {!isExperience ? (
              <>
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
              </>
            ) : (
              // Experience Letter - Authorized Signatory only
              <View style={[styles.acceptanceBlock, { width: "68%" }]}>
                <View style={{ height: 45, justifyContent: "center", alignItems: "center" }}>
                  <Text style={{ fontSize: 8, color: "#64748B" }}>Authorized Signatory</Text>
                </View>
                <View style={styles.acceptanceLine} />
                <Text style={styles.acceptanceText}>Company Seal</Text>
                <Text style={[styles.acceptanceText, { marginTop: 2 }]}>Date: ___________</Text>
              </View>
            )}
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
    salaryPeriod: "per annum",
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
    // Experience Letter specific
    employeeId: "",
    joiningDate: "",
    lastWorkingDate: "",
    totalExperience: "",
    skills: "",
    achievements: "",
    reasonForLeaving: "",
    performanceRating: "",
    eligibilityForRehire: "",
    responsibilities: "",
    projectsWorked: "",
  });

  const isInternship = details.employmentType === "Internship";
  const isExperience = details.employmentType === "Experience Letter";

  useEffect(() => {
    setIsClient(true);
    setDetails((prev) => ({ ...prev, referenceNumber: getNextOfferReferenceNumber() }));
  }, []);

  useEffect(() => {
    // Auto-set salary period for internship
    if (isInternship && details.salaryPeriod === "per annum") {
      setDetails((prev) => ({ ...prev, salaryPeriod: "per month" }));
    }
    // Auto-set for experience letter
    if (isExperience && details.salaryPeriod === "per month") {
      setDetails((prev) => ({ ...prev, salaryPeriod: "per annum" }));
    }
  }, [isInternship, isExperience]);

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
    if (isExperience) {
      requiredFields.push('joiningDate', 'lastWorkingDate', 'employeeId');
    }
    return requiredFields.every(field => details[field]?.trim() !== '');
  }, [details, isInternship, isExperience]);

  // Get completion percentage
  const getCompletionPercentage = useMemo(() => {
    const totalFields = isExperience ? 28 : isInternship ? 22 : 18;
    const filledFields = Object.values(details).filter(val => 
      val && val.toString().trim() !== ''
    ).length;
    return Math.round((filledFields / totalFields) * 100);
  }, [details, isInternship, isExperience]);

  const requiredField = (fieldName: string) => {
    const requiredFields = ['candidateName', 'candidateEmail', 'candidatePhone', 'candidateAddress', 
      'position', 'department', 'startDate', 'salary', 'reportingTo', 'workLocation'];
    if (isInternship) {
      requiredFields.push('mentorName');
    }
    if (isExperience) {
      requiredFields.push('joiningDate', 'lastWorkingDate', 'employeeId');
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
                {isExperience ? "Experience Letter Generator" : 
                 isInternship ? "Internship Offer Generator" : 
                 "Offer Letter Generator"}
              </h1>
              <p className="text-sm text-slate-500">
                Professional {isExperience ? "Experience" : 
                 isInternship ? "Internship " : "Employment "}
                {isExperience ? "Letters" : isInternship ? "Offer Letters" : "Offer Letters"} for{" "}
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
                  fileName={`${isExperience ? "Experience" : isInternship ? "Internship" : "Offer"}_Letter_${details.candidateName.replace(/\s+/g, "_") || "Draft"}_${
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

      {/* Main Studio Grid */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Inputs */}
        <section className="lg:col-span-5 print:hidden space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Edit className="w-5 h-5 text-[#1A2E5A]" /> 
                {isExperience ? "Experience Details" : 
                 isInternship ? "Internship Details" : 
                 "Offer Details"}
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

            {/* Document Type Selection */}
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
                <option value="Experience Letter">Experience Letter</option>
                <option value="Part-Time">Part-Time Offer Letter</option>
                <option value="Contract">Contract Offer Letter</option>
              </select>
            </div>

            {/* Candidate Information */}
            <div className="border-t pt-4 mt-2">
              <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-3">
                <User className="w-4 h-4 text-[#1A2E5A]" /> 
                {isExperience ? "Employee Information" : "Candidate Information"}
                <span className="text-xs text-red-500">*</span>
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    {isExperience ? "Employee Name *" : "Full Name *"}
                  </label>
                  <input
                    type="text"
                    name="candidateName"
                    value={details.candidateName}
                    onChange={handleChange}
                    onBlur={() => handleBlur('candidateName')}
                    placeholder={isExperience ? "Enter employee's full name" : "Enter candidate's full name"}
                    className={`w-full px-3 py-2 border ${isFieldInvalid('candidateName') ? 'border-red-500' : 'border-slate-300'} rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none`}
                    required
                  />
                  {isFieldInvalid('candidateName') && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Name is required
                    </p>
                  )}
                </div>

                {/* Experience Letter - Employee ID */}
                {isExperience && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                      <Award className="w-3 h-3 inline mr-1" /> Employee ID *
                    </label>
                    <input
                      type="text"
                      name="employeeId"
                      value={details.employeeId}
                      onChange={handleChange}
                      onBlur={() => handleBlur('employeeId')}
                      placeholder="e.g., EMP-2023-001"
                      className={`w-full px-3 py-2 border ${isFieldInvalid('employeeId') ? 'border-red-500' : 'border-slate-300'} rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none`}
                      required
                    />
                    {isFieldInvalid('employeeId') && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Employee ID is required
                      </p>
                    )}
                  </div>
                )}

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
                      <AlertCircle className="w-3 h-3" /> Phone number is required
                    </p>
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
                {isExperience ? "Employment Details" : 
                 isInternship ? "Internship Details" : 
                 "Position Details"}
                <span className="text-xs text-red-500">*</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    {isExperience ? "Last Position / Role *" : 
                     isInternship ? "Internship Role *" : 
                     "Position / Role *"}
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={details.position}
                    onChange={handleChange}
                    onBlur={() => handleBlur('position')}
                    placeholder={isInternship ? "e.g., Software Engineering Intern" : 
                               isExperience ? "e.g., Senior Software Engineer" : 
                               "e.g., Senior Software Engineer"}
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
                    {isExperience ? "Supervisor / Manager" : 
                     isInternship ? "Mentor / Supervisor *" : 
                     "Reporting To *"}
                  </label>
                  <input
                    type="text"
                    name={isInternship ? "mentorName" : "reportingTo"}
                    value={isInternship ? details.mentorName : details.reportingTo}
                    onChange={handleChange}
                    onBlur={() => handleBlur(isInternship ? "mentorName" : "reportingTo")}
                    placeholder={isInternship ? "Mentor/Supervisor name" : 
                               isExperience ? "Supervisor/Manager name" : 
                               "Manager/Supervisor name"}
                    className={`w-full px-3 py-2 border ${isFieldInvalid(isInternship ? "mentorName" : "reportingTo") ? 'border-red-500' : 'border-slate-300'} rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none`}
                    required={!isExperience}
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

                {/* Experience Letter - Reason for Leaving */}
                {isExperience && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                      Reason for Leaving
                    </label>
                    <input
                      type="text"
                      name="reasonForLeaving"
                      value={details.reasonForLeaving}
                      onChange={handleChange}
                      placeholder="e.g., Career growth, Personal reasons"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none"
                    />
                  </div>
                )}

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

            {/* Date Information */}
            <div className="border-t pt-4 mt-2">
              <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-[#1A2E5A]" /> 
                {isExperience ? "Employment Dates" : 
                 isInternship ? "Internship Dates" : 
                 "Employment Details"}
                <span className="text-xs text-red-500">*</span>
              </h3>

              {isExperience ? (
                <>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                        Joining Date *
                      </label>
                      <input
                        type="date"
                        name="joiningDate"
                        value={details.joiningDate}
                        onChange={handleChange}
                        onBlur={() => handleBlur('joiningDate')}
                        className={`w-full px-3 py-2 border ${isFieldInvalid('joiningDate') ? 'border-red-500' : 'border-slate-300'} rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none`}
                        required
                      />
                      {isFieldInvalid('joiningDate') && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Joining date is required
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                        Last Working Date *
                      </label>
                      <input
                        type="date"
                        name="lastWorkingDate"
                        value={details.lastWorkingDate}
                        onChange={handleChange}
                        onBlur={() => handleBlur('lastWorkingDate')}
                        className={`w-full px-3 py-2 border ${isFieldInvalid('lastWorkingDate') ? 'border-red-500' : 'border-slate-300'} rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none`}
                        required
                      />
                      {isFieldInvalid('lastWorkingDate') && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Last working date is required
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                        Total Experience
                      </label>
                      <input
                        type="text"
                        name="totalExperience"
                        value={details.totalExperience}
                        onChange={handleChange}
                        placeholder="e.g., 3 Years 2 Months"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none"
                      />
                    </div>

                    <div>
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
                  </div>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>

            {/* Compensation / Stipend / CTC */}
            <div className="border-t pt-4 mt-2">
              <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-3">
                <Briefcase className="w-4 h-4 text-[#1A2E5A]" /> 
                {isExperience ? "Final Compensation" : 
                 isInternship ? "Stipend" : 
                 "Compensation"}
                <span className="text-xs text-red-500">*</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    {isExperience ? "Final CTC *" : 
                     isInternship ? "Stipend Amount *" : 
                     "Salary / Compensation *"}
                  </label>
                  <input
                    type="text"
                    name="salary"
                    value={details.salary}
                    onChange={handleChange}
                    onBlur={() => handleBlur('salary')}
                    placeholder={isExperience ? "e.g., ₹15,00,000" : 
                               isInternship ? "e.g., ₹15,000" : 
                               "e.g., ₹12,00,000"}
                    className={`w-full px-3 py-2 border ${isFieldInvalid('salary') ? 'border-red-500' : 'border-slate-300'} rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none`}
                    required
                  />
                  {isFieldInvalid('salary') && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> 
                      {isExperience ? "CTC is required" : 
                       isInternship ? "Stipend is required" : 
                       "Salary is required"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    {isExperience ? "CTC Period *" : 
                     isInternship ? "Stipend Period *" : 
                     "Salary Period *"}
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

            {/* Experience Letter - Additional Fields */}
            {isExperience && (
              <>
                <div className="border-t pt-4 mt-2">
                  <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-3">
                    <Star className="w-4 h-4 text-[#1A2E5A]" /> Skills & Achievements
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                        Key Skills
                      </label>
                      <textarea
                        name="skills"
                        value={details.skills}
                        onChange={handleChange}
                        placeholder="e.g., React.js, Python, AWS, Project Management"
                        rows={2}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none resize-y"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                        Achievements & Contributions
                      </label>
                      <textarea
                        name="achievements"
                        value={details.achievements}
                        onChange={handleChange}
                        placeholder="e.g., Led a team of 5 developers, Reduced response time by 40%"
                        rows={3}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none resize-y"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                        Key Responsibilities
                      </label>
                      <textarea
                        name="responsibilities"
                        value={details.responsibilities}
                        onChange={handleChange}
                        placeholder="e.g., Developed and maintained web applications, Conducted code reviews"
                        rows={3}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none resize-y"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                        Projects Worked On
                      </label>
                      <textarea
                        name="projectsWorked"
                        value={details.projectsWorked}
                        onChange={handleChange}
                        placeholder="e.g., E-commerce Platform, Mobile App Development"
                        rows={2}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none resize-y"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                          Performance Rating
                        </label>
                        <select
                          name="performanceRating"
                          value={details.performanceRating}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none"
                        >
                          <option value="">Select Rating</option>
                          <option value="Outstanding">Outstanding</option>
                          <option value="Excellent">Excellent</option>
                          <option value="Very Good">Very Good</option>
                          <option value="Good">Good</option>
                          <option value="Satisfactory">Satisfactory</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                          Eligibility for Rehire
                        </label>
                        <select
                          name="eligibilityForRehire"
                          value={details.eligibilityForRehire}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A2E5A] focus:outline-none"
                        >
                          <option value="">Select Option</option>
                          <option value="Eligible for Rehire">Eligible for Rehire</option>
                          <option value="Not Eligible for Rehire">Not Eligible for Rehire</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

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

            {/* Additional Terms / Notes */}
            <div className="border-t pt-4 mt-2">
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                {isExperience ? "Additional Notes" : "Additional Terms & Conditions"}
              </label>
              <textarea
                name="additionalTerms"
                value={details.additionalTerms}
                onChange={handleChange}
                placeholder={isExperience ? 
                  "Enter any additional notes or remarks..." : 
                  isInternship ? 
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
                  The {isExperience ? "experience" : 
                   isInternship ? "internship offer" : 
                   "offer"} letter will be generated as a professional PDF document.
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
                    salaryPeriod: isInternship ? "per month" : isExperience ? "per annum" : "per annum",
                    employmentType: isInternship ? "Internship" : isExperience ? "Experience Letter" : "Full-Time",
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
                    employeeId: "",
                    joiningDate: "",
                    lastWorkingDate: "",
                    totalExperience: "",
                    skills: "",
                    achievements: "",
                    reasonForLeaving: "",
                    performanceRating: "",
                    eligibilityForRehire: "",
                    responsibilities: "",
                    projectsWorked: "",
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
                  {isExperience ? "Experience Letter" : 
                   isInternship ? "Internship Offer Letter" : 
                   "Offer Letter"}
                </h2>

                {/* Badge */}
                {(isInternship || isExperience) && (
                  <div className="bg-[#1A2E5A] text-white text-center py-1 px-4 rounded-md self-center mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {isExperience ? "Employment Verification" : "Internship Program"}
                    </span>
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
                  {isExperience && details.employeeId && (
                    <p className="text-sm text-slate-600">Employee ID: {details.employeeId}</p>
                  )}
                </div>

                {/* Body */}
                <div className="flex-1 text-sm text-slate-700 space-y-3">
                  <p className="font-bold text-[#1A2E5A]">
                    Dear {details.candidateName || "[Candidate Name]"},
                  </p>

                  {isExperience ? (
                    <>
                      <p className="leading-relaxed text-justify">
                        This is to certify that <strong className="text-[#1A2E5A]">{details.candidateName || "[Employee Name]"}</strong> was employed with <strong className="text-[#1A2E5A]">{details.companyName}</strong> as a <strong className="text-[#1A2E5A]">{details.position || "[Position]"}</strong> in the <strong className="text-[#1A2E5A]">{details.department || "[Department]"}</strong> department. During their tenure with us, they demonstrated exceptional professionalism, dedication, and technical expertise.
                      </p>

                      <p className="leading-relaxed text-justify">
                        {details.candidateName || "[Employee Name]"} joined our organization on{" "}
                        <strong className="text-[#1A2E5A]">{details.joiningDate || details.startDate || "[Joining Date]"}</strong> and served until{" "}
                        <strong className="text-[#1A2E5A]">{details.lastWorkingDate || details.endDate || "present"}</strong>
                        {details.totalExperience && (
                          <> with a total experience of{" "}
                          <strong className="text-[#1A2E5A]">{details.totalExperience}</strong>
                          </>
                        )}
                        . They reported to{" "}
                        <strong className="text-[#1A2E5A]">{details.reportingTo || details.managerName || "[Manager]"}</strong> and worked at our{" "}
                        <strong className="text-[#1A2E5A]">{details.workLocation || "[Location]"}</strong> location.
                      </p>

                      {/* Key Details Box */}
                      <div className="bg-[#F8F6F0] border border-[#C9A84C] p-3 rounded">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                          <div>
                            <span className="font-bold text-[#1A2E5A]">Employee ID:</span>{" "}
                            {details.employeeId || "N/A"}
                          </div>
                          <div>
                            <span className="font-bold text-[#1A2E5A]">Position:</span>{" "}
                            {details.position || "N/A"}
                          </div>
                          <div>
                            <span className="font-bold text-[#1A2E5A]">Department:</span>{" "}
                            {details.department || "N/A"}
                          </div>
                          <div>
                            <span className="font-bold text-[#1A2E5A]">Joining Date:</span>{" "}
                            {details.joiningDate || details.startDate || "N/A"}
                          </div>
                          <div>
                            <span className="font-bold text-[#1A2E5A]">Last Working Date:</span>{" "}
                            {details.lastWorkingDate || details.endDate || "Present"}
                          </div>
                          {details.totalExperience && (
                            <div>
                              <span className="font-bold text-[#1A2E5A]">Total Experience:</span>{" "}
                              {details.totalExperience}
                            </div>
                          )}
                          {details.salary && (
                            <div>
                              <span className="font-bold text-[#1A2E5A]">Final CTC:</span>{" "}
                              {details.salary} {details.salaryPeriod}
                            </div>
                          )}
                          <div>
                            <span className="font-bold text-[#1A2E5A]">Reporting To:</span>{" "}
                            {details.reportingTo || details.managerName || "N/A"}
                          </div>
                        </div>
                      </div>

                      {/* Skills and Achievements */}
                      {details.skills && (
                        <div>
                          <p className="font-bold text-[#1A2E5A] text-xs uppercase tracking-wide mt-2">
                            Key Skills
                          </p>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {details.skills}
                          </p>
                        </div>
                      )}

                      {details.achievements && (
                        <div>
                          <p className="font-bold text-[#1A2E5A] text-xs uppercase tracking-wide mt-2">
                            Achievements & Contributions
                          </p>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {details.achievements}
                          </p>
                        </div>
                      )}

                      {details.responsibilities && (
                        <div>
                          <p className="font-bold text-[#1A2E5A] text-xs uppercase tracking-wide mt-2">
                            Key Responsibilities
                          </p>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {details.responsibilities}
                          </p>
                        </div>
                      )}

                      {details.projectsWorked && (
                        <div>
                          <p className="font-bold text-[#1A2E5A] text-xs uppercase tracking-wide mt-2">
                            Projects Worked On
                          </p>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {details.projectsWorked}
                          </p>
                        </div>
                      )}

                      {(details.performanceRating || details.eligibilityForRehire) && (
                        <div className="bg-[#F8F6F0] border border-[#C9A84C] p-2 rounded">
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            {details.performanceRating && (
                              <div>
                                <span className="font-bold text-[#1A2E5A]">Performance Rating:</span>{" "}
                                {details.performanceRating}
                              </div>
                            )}
                            {details.eligibilityForRehire && (
                              <div>
                                <span className="font-bold text-[#1A2E5A]">Rehire Status:</span>{" "}
                                {details.eligibilityForRehire}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <p className="leading-relaxed text-justify">
                        Throughout their employment, {details.candidateName || "[Employee Name]"} has been a valuable asset 
                        to our team, consistently demonstrating strong work ethic, technical proficiency, 
                        and excellent collaboration skills. They have contributed significantly to our 
                        projects and have been a positive influence on their colleagues.
                      </p>

                      <p className="leading-relaxed text-justify">
                        We wish {details.candidateName || "[Employee Name]"} all the best in their future endeavors and have 
                        no hesitation in recommending them for future employment opportunities. They 
                        leave our organization with our best wishes and appreciation.
                      </p>
                    </>
                  ) : isInternship ? (
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
                          {details.internshipDuration && (
                            <div>
                              <span className="font-bold text-[#1A2E5A]">Duration:</span>{" "}
                              {details.internshipDuration}
                            </div>
                          )}
                          {details.education && (
                            <div>
                              <span className="font-bold text-[#1A2E5A]">Education:</span>{" "}
                              {details.education}
                            </div>
                          )}
                          <div>
                            <span className="font-bold text-[#1A2E5A]">Stipend:</span>{" "}
                            {details.salary ? `${details.salary} ${details.salaryPeriod}` : "N/A"}
                          </div>
                          {details.projectScope && (
                            <div>
                              <span className="font-bold text-[#1A2E5A]">Project:</span>{" "}
                              {details.projectScope}
                            </div>
                          )}
                          <div>
                            <span className="font-bold text-[#1A2E5A]">Mentor:</span>{" "}
                            {details.mentorName || details.reportingTo || "N/A"}
                          </div>
                        </div>
                      </div>

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
                          <div>
                            <span className="font-bold text-[#1A2E5A]">Compensation:</span>{" "}
                            {details.salary ? `${details.salary} ${details.salaryPeriod}` : "N/A"}
                          </div>
                          <div>
                            <span className="font-bold text-[#1A2E5A]">Working Hours:</span>{" "}
                            {details.workingHours || "N/A"}
                          </div>
                          <div>
                            <span className="font-bold text-[#1A2E5A]">Probation:</span>{" "}
                            {details.probationPeriod || "N/A"}
                          </div>
                          <div>
                            <span className="font-bold text-[#1A2E5A]">Reports To:</span>{" "}
                            {details.reportingTo || "N/A"}
                          </div>
                        </div>
                      </div>

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

                  {isExperience ? (
                    // Experience Letter - Authorized Signatory
                    <div className="col-span-2 text-center">
                      <div className="h-12 flex items-center justify-center">
                        <p className="text-xs text-slate-400">Authorized Signatory</p>
                      </div>
                      <div className="w-full border-b border-[#1A2E5A] my-1"></div>
                      <p className="text-xs text-slate-500">Company Seal</p>
                      <p className="text-xs text-slate-400 mt-1">Date: ___________</p>
                    </div>
                  ) : (
                    // Offer/Internship - Candidate Signature
                    <>
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
                    </>
                  )}
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