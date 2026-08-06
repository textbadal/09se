"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image as PdfImage,
} from "@react-pdf/renderer";
import QRCodeLib from "qrcode";

// ============================================================
// CONSTANTS & CONFIGURATION
// ============================================================

const FIXED_COMPANY_NAME = "Averiqo Technologies";
const DEFAULT_LOGO_URL = "/Averiqo Technologies logo.jpeg";
const DEFAULT_HR_NAME = "Shivam Singh";
const DEFAULT_HR_TITLE = "HR Manager";
const DEFAULT_HR_EMAIL = "hr@averiqotech.com";
const DEFAULT_HR_SIGNATURE_URL = "/Shivam singh signature.png";
const DEFAULT_SEAL_URL = "/Averiqo Technologies seal stamp.png";

// Company Contact Information
const COMPANY_INFO = {
  name: "Averiqo Technologies",
  address: "123 Tech Park, Electronic City, Bangalore - 560100, India",
  website: "www.averiqotech.com",
  email: "info@averiqotech.com",
  phone: "+91 80 1234 5678",
};

 interface SkillRating {
  category: string;
  score: number;
}

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

 interface LORDetails {
  candidateName: string;
  templateKey: string;
  role: string;
  startDate: string;
  endDate: string;
  duration: string;
  issueDate: string;
  referenceNumber: string;
  companyName: string;
  companyAddress: string;
  companyWebsite: string;
  companyEmail: string;
  companyPhone: string;
  managerName: string;
  managerTitle: string;
  managerEmail: string;
  relationship: string;
  bodyText: string;
  keyStrengths: string;
  customParagraphs: string[];
  ratings: SkillRating[];
  additionalNotes: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  logoUrl: string;
  signatureUrl: string;
  companySealUrl: string;
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
    label: "Software Engineering",
    defaultRole: "Senior Full Stack Developer",
    relationship: "supervised directly during their tenure as a lead developer on critical software initiatives",
    bodyText:
      "demonstrated exceptional proficiency in software engineering principles, clean architecture, and problem-solving. They consistently delivered high-quality, scalable code, optimized application performance, and collaborated seamlessly with cross-functional technical teams.",
    keyStrengths:
      "Full-stack development (React, Node.js, Python), API design, cloud architecture, code review leadership, and technical documentation.",
    industry: "Technology",
    suggestedRatings: [
      { category: "Technical Proficiency", score: 5 },
      { category: "Code Quality", score: 5 },
      { category: "Problem Solving", score: 5 },
      { category: "Team Collaboration", score: 4 },
      { category: "Project Delivery", score: 5 },
      { category: "Innovation", score: 4 },
    ],
  },
  data_science: {
    id: "data_science",
    label: "Data Science & AI",
    defaultRole: "Senior Data Scientist",
    relationship: "supervised their work on machine learning and data analytics initiatives",
    bodyText:
      "demonstrated exceptional analytical skills and expertise in machine learning, statistical modeling, and data visualization. They developed sophisticated predictive models that drove key business decisions and optimized data pipelines.",
    keyStrengths:
      "Machine Learning, Python/R, SQL, TensorFlow/PyTorch, Data Visualization, Statistical Analysis, and Big Data.",
    industry: "Technology",
    suggestedRatings: [
      { category: "Technical Proficiency", score: 5 },
      { category: "Analytical Thinking", score: 5 },
      { category: "Problem Solving", score: 5 },
      { category: "Communication", score: 4 },
      { category: "Project Delivery", score: 4 },
      { category: "Innovation", score: 5 },
    ],
  },
  cybersecurity: {
    id: "cybersecurity",
    label: "Cybersecurity",
    defaultRole: "Senior Security Engineer",
    relationship: "worked closely with on security infrastructure and incident response",
    bodyText:
      "exhibited exceptional expertise in cybersecurity, including threat detection, vulnerability assessment, and security architecture. They successfully implemented robust security protocols and strengthened our organization's security posture.",
    keyStrengths:
      "Security Architecture, Penetration Testing, SIEM, Incident Response, Cloud Security, and Compliance.",
    industry: "Technology",
    suggestedRatings: [
      { category: "Technical Proficiency", score: 5 },
      { category: "Security Awareness", score: 5 },
      { category: "Problem Solving", score: 5 },
      { category: "Team Collaboration", score: 4 },
      { category: "Incident Response", score: 5 },
      { category: "Compliance Knowledge", score: 4 },
    ],
  },
  devops: {
    id: "devops",
    label: "DevOps & Cloud",
    defaultRole: "Senior DevOps Engineer",
    relationship: "managed their work on cloud infrastructure and CI/CD pipelines",
    bodyText:
      "demonstrated outstanding expertise in DevOps practices, cloud infrastructure, and automation. They designed and maintained robust CI/CD pipelines and optimized system performance for high availability and scalability.",
    keyStrengths:
      "AWS/GCP/Azure, Kubernetes, Docker, CI/CD, Infrastructure as Code, Monitoring, and System Architecture.",
    industry: "Technology",
    suggestedRatings: [
      { category: "Technical Proficiency", score: 5 },
      { category: "Infrastructure Management", score: 5 },
      { category: "Automation", score: 5 },
      { category: "Problem Solving", score: 4 },
      { category: "Team Collaboration", score: 4 },
      { category: "Scalability Design", score: 5 },
    ],
  },
  product_management: {
    id: "product_management",
    label: "Product Management",
    defaultRole: "Senior Product Manager",
    relationship: "directly managed product strategy and development initiatives",
    bodyText:
      "showcased exceptional product management skills, including product strategy, market research, and stakeholder management. They successfully led cross-functional teams to deliver innovative products and prioritized features based on data-driven insights.",
    keyStrengths:
      "Product Strategy, Market Research, Agile/Scrum, User Experience, Data Analysis, and Stakeholder Management.",
    industry: "Business",
    suggestedRatings: [
      { category: "Strategic Thinking", score: 5 },
      { category: "Leadership", score: 5 },
      { category: "Communication", score: 5 },
      { category: "Problem Solving", score: 4 },
      { category: "Innovation", score: 5 },
      { category: "Project Delivery", score: 4 },
    ],
  },
  marketing: {
    id: "marketing",
    label: "Marketing & Digital",
    defaultRole: "Senior Marketing Manager",
    relationship: "collaborated closely on marketing strategy and campaign execution",
    bodyText:
      "demonstrated exceptional marketing expertise, including digital strategy, brand management, and campaign optimization. They successfully launched multi-channel campaigns and drove significant growth in customer engagement.",
    keyStrengths:
      "Digital Marketing, Brand Strategy, SEO/SEM, Social Media, Content Strategy, Analytics, and Campaign Management.",
    industry: "Business",
    suggestedRatings: [
      { category: "Strategic Thinking", score: 5 },
      { category: "Creative Vision", score: 5 },
      { category: "Analytical Skills", score: 4 },
      { category: "Communication", score: 5 },
      { category: "Innovation", score: 5 },
      { category: "Project Delivery", score: 4 },
    ],
  },
  finance: {
    id: "finance",
    label: "Finance & Banking",
    defaultRole: "Senior Financial Analyst",
    relationship: "supervised financial analysis and reporting activities",
    bodyText:
      "exhibited exceptional financial acumen, including financial modeling, risk assessment, and strategic planning. They provided valuable insights through comprehensive financial analysis and contributed to key investment decisions.",
    keyStrengths:
      "Financial Modeling, Risk Management, Investment Analysis, Budgeting, Financial Reporting, and Strategic Planning.",
    industry: "Finance",
    suggestedRatings: [
      { category: "Financial Expertise", score: 5 },
      { category: "Analytical Thinking", score: 5 },
      { category: "Attention to Detail", score: 5 },
      { category: "Problem Solving", score: 4 },
      { category: "Communication", score: 4 },
      { category: "Strategic Planning", score: 5 },
    ],
  },
  human_resources: {
    id: "human_resources",
    label: "Human Resources",
    defaultRole: "Senior HR Manager",
    relationship: "worked with on talent acquisition and employee development",
    bodyText:
      "demonstrated exceptional HR expertise, including talent acquisition, employee relations, and organizational development. They successfully implemented HR strategies that improved employee engagement and fostered a positive workplace culture.",
    keyStrengths:
      "Talent Acquisition, Employee Relations, Performance Management, Training & Development, HR Analytics, and Employment Law.",
    industry: "Business",
    suggestedRatings: [
      { category: "HR Expertise", score: 5 },
      { category: "Communication", score: 5 },
      { category: "Employee Relations", score: 5 },
      { category: "Problem Solving", score: 4 },
      { category: "Leadership", score: 5 },
      { category: "Strategic Thinking", score: 4 },
    ],
  },
  legal: {
    id: "legal",
    label: "Legal & Compliance",
    defaultRole: "Senior Legal Counsel",
    relationship: "supervised legal matters and compliance initiatives",
    bodyText:
      "exhibited exceptional legal expertise, including contract law, regulatory compliance, and risk management. They provided sound legal advice and ensured compliance with applicable laws and regulations.",
    keyStrengths:
      "Contract Law, Regulatory Compliance, Risk Assessment, Corporate Law, Intellectual Property, and Legal Research.",
    industry: "Legal",
    suggestedRatings: [
      { category: "Legal Expertise", score: 5 },
      { category: "Analytical Thinking", score: 5 },
      { category: "Communication", score: 5 },
      { category: "Problem Solving", score: 5 },
      { category: "Attention to Detail", score: 5 },
      { category: "Negotiation Skills", score: 4 },
    ],
  },
  sales: {
    id: "sales",
    label: "Sales & Business Development",
    defaultRole: "Senior Sales Director",
    relationship: "directly managed their sales performance and strategy",
    bodyText:
      "demonstrated exceptional sales expertise, including strategic selling, relationship building, and revenue growth. They consistently exceeded sales targets and successfully negotiated complex deals.",
    keyStrengths:
      "Strategic Selling, Negotiation, CRM Management, Pipeline Management, Revenue Growth, and Client Relations.",
    industry: "Business",
    suggestedRatings: [
      { category: "Sales Expertise", score: 5 },
      { category: "Communication", score: 5 },
      { category: "Negotiation Skills", score: 5 },
      { category: "Relationship Building", score: 5 },
      { category: "Strategic Thinking", score: 4 },
      { category: "Team Leadership", score: 4 },
    ],
  },
  civil_engineering: {
    id: "civil_engineering",
    label: "Civil Engineering",
    defaultRole: "Senior Civil Engineer",
    relationship: "supervised civil infrastructure and construction projects",
    bodyText:
      "demonstrated exceptional civil engineering expertise, including structural design, project management, and construction supervision. They successfully managed large-scale infrastructure projects and delivered them on time and within budget.",
    keyStrengths:
      "Structural Design, Project Management, Construction Supervision, AutoCAD/Civil 3D, Building Codes, and Quality Assurance.",
    industry: "Construction",
    suggestedRatings: [
      { category: "Technical Expertise", score: 5 },
      { category: "Project Management", score: 5 },
      { category: "Design Quality", score: 5 },
      { category: "Problem Solving", score: 4 },
      { category: "Safety Compliance", score: 5 },
      { category: "Team Leadership", score: 4 },
    ],
  },
  mechanical_engineering: {
    id: "mechanical_engineering",
    label: "Mechanical Engineering",
    defaultRole: "Senior Mechanical Engineer",
    relationship: "supervised mechanical design and engineering projects",
    bodyText:
      "demonstrated exceptional mechanical engineering expertise, including product design, thermodynamics, and manufacturing processes. They successfully designed and optimized mechanical systems with innovative problem-solving.",
    keyStrengths:
      "Product Design, CAD (SolidWorks/AutoCAD), FEA, Thermodynamics, Manufacturing Processes, and Prototyping.",
    industry: "Engineering",
    suggestedRatings: [
      { category: "Technical Expertise", score: 5 },
      { category: "Design Quality", score: 5 },
      { category: "Problem Solving", score: 5 },
      { category: "Project Management", score: 4 },
      { category: "Innovation", score: 4 },
      { category: "Team Collaboration", score: 4 },
    ],
  },
  electrical_engineering: {
    id: "electrical_engineering",
    label: "Electrical Engineering",
    defaultRole: "Senior Electrical Engineer",
    relationship: "managed electrical engineering and system design initiatives",
    bodyText:
      "exhibited exceptional electrical engineering skills, including circuit design, power systems, and embedded systems. They successfully designed and implemented complex electrical systems with impressive technical expertise.",
    keyStrengths:
      "Circuit Design, Power Systems, Embedded Systems, PCB Design, PLC Programming, and Safety Compliance.",
    industry: "Engineering",
    suggestedRatings: [
      { category: "Technical Expertise", score: 5 },
      { category: "Problem Solving", score: 5 },
      { category: "Design Quality", score: 5 },
      { category: "Project Management", score: 4 },
      { category: "Innovation", score: 4 },
      { category: "Safety Compliance", score: 5 },
    ],
  },
  architecture: {
    id: "architecture",
    label: "Architecture",
    defaultRole: "Senior Architect",
    relationship: "supervised architectural design and project planning",
    bodyText:
      "demonstrated exceptional architectural expertise, including design conception, spatial planning, and sustainable design. They created innovative architectural solutions that balanced aesthetics, functionality, and environmental considerations.",
    keyStrengths:
      "Architectural Design, Space Planning, AutoCAD/Revit, Sustainable Design, Project Management, and 3D Visualization.",
    industry: "Construction",
    suggestedRatings: [
      { category: "Design Quality", score: 5 },
      { category: "Technical Proficiency", score: 5 },
      { category: "Problem Solving", score: 5 },
      { category: "Project Management", score: 4 },
      { category: "Innovation", score: 5 },
      { category: "Client Communication", score: 4 },
    ],
  },
  healthcare: {
    id: "healthcare",
    label: "Healthcare & Medical",
    defaultRole: "Clinical Specialist",
    relationship: "worked closely with in clinical settings, reporting to me as department head",
    bodyText:
      "demonstrated exceptional clinical expertise, patient care skills, and medical knowledge. They consistently maintained the highest standards of healthcare delivery and showed remarkable empathy and professionalism.",
    keyStrengths:
      "Clinical Diagnosis, Patient Care, Medical Documentation, Team Collaboration, Emergency Response, and Healthcare Administration.",
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
  nursing: {
    id: "nursing",
    label: "Nursing",
    defaultRole: "Senior Nurse",
    relationship: "supervised their nursing practice and patient care activities",
    bodyText:
      "exhibited exceptional nursing expertise, including patient assessment, care planning, and medical administration. They provided compassionate, high-quality patient care and demonstrated strong clinical judgment.",
    keyStrengths:
      "Patient Assessment, Care Planning, Medication Administration, Wound Care, Patient Education, and Emergency Response.",
    industry: "Healthcare",
    suggestedRatings: [
      { category: "Clinical Expertise", score: 5 },
      { category: "Patient Care", score: 5 },
      { category: "Communication", score: 5 },
      { category: "Problem Solving", score: 4 },
      { category: "Team Collaboration", score: 5 },
      { category: "Professionalism", score: 5 },
    ],
  },
  pharmacy: {
    id: "pharmacy",
    label: "Pharmacy",
    defaultRole: "Senior Pharmacist",
    relationship: "supervised pharmaceutical services and medication management",
    bodyText:
      "exhibited exceptional pharmaceutical expertise, including medication therapy management, drug information, and patient counseling. They ensured safe and effective medication use and maintained high standards of pharmaceutical care.",
    keyStrengths:
      "Medication Therapy Management, Drug Information, Patient Counseling, Clinical Pharmacy, and Regulatory Compliance.",
    industry: "Healthcare",
    suggestedRatings: [
      { category: "Clinical Knowledge", score: 5 },
      { category: "Patient Care", score: 5 },
      { category: "Communication", score: 5 },
      { category: "Problem Solving", score: 4 },
      { category: "Compliance", score: 5 },
      { category: "Team Collaboration", score: 4 },
    ],
  },
  psychology: {
    id: "psychology",
    label: "Psychology",
    defaultRole: "Senior Psychologist",
    relationship: "supervised their clinical practice and counseling activities",
    bodyText:
      "exhibited exceptional psychological expertise, including assessment, diagnosis, and therapeutic interventions. They provided compassionate, evidence-based mental health care and maintained the highest ethical standards.",
    keyStrengths:
      "Clinical Assessment, Diagnosis, Therapy (CBT, DBT), Psychological Testing, Crisis Intervention, and Patient Counseling.",
    industry: "Healthcare",
    suggestedRatings: [
      { category: "Clinical Expertise", score: 5 },
      { category: "Patient Care", score: 5 },
      { category: "Communication", score: 5 },
      { category: "Problem Solving", score: 4 },
      { category: "Ethical Practice", score: 5 },
      { category: "Research Skills", score: 4 },
    ],
  },
  education: {
    id: "education",
    label: "Education & Teaching",
    defaultRole: "Senior Educator",
    relationship: "supervised their teaching and curriculum development activities",
    bodyText:
      "demonstrated exceptional teaching skills, curriculum development expertise, and a deep commitment to student success. They created engaging learning experiences and consistently achieved excellent learning outcomes.",
    keyStrengths:
      "Curriculum Design, Classroom Management, Student Engagement, Educational Technology, Assessment Design, and Student Mentoring.",
    industry: "Education",
    suggestedRatings: [
      { category: "Teaching Excellence", score: 5 },
      { category: "Communication", score: 5 },
      { category: "Student Engagement", score: 5 },
      { category: "Innovation", score: 4 },
      { category: "Curriculum Design", score: 5 },
      { category: "Mentoring", score: 4 },
    ],
  },
  academic_research: {
    id: "academic_research",
    label: "Academic Research",
    defaultRole: "Senior Research Associate",
    relationship: "mentored across multiple research project lifecycles and academic assignments",
    bodyText:
      "showcased high analytical ability, disciplined work habits, and a strong commitment to excellence. They consistently exceeded expectations in task execution, documentation, and continuous learning.",
    keyStrengths:
      "Research Methodology, Academic Writing, Data Analysis, Critical Thinking, Teaching Assistance, and Project Coordination.",
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
  creative_design: {
    id: "creative_design",
    label: "Creative Design",
    defaultRole: "Creative Director",
    relationship: "supervised their creative work and design initiatives across multiple projects",
    bodyText:
      "brought exceptional creativity, design thinking, and visual communication skills to every project. Their ability to translate complex ideas into compelling visual narratives was outstanding.",
    keyStrengths:
      "Creative Direction, Visual Design, Brand Strategy, User Experience Design, Team Leadership, and Creative Problem-Solving.",
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
  journalism: {
    id: "journalism",
    label: "Journalism & Media",
    defaultRole: "Senior Journalist",
    relationship: "supervised their journalism and content creation work",
    bodyText:
      "demonstrated exceptional journalism skills, including investigative reporting, content creation, and editorial leadership. They produced compelling stories and maintained high ethical standards.",
    keyStrengths:
      "Investigative Reporting, Content Creation, Editing, Digital Media, Multimedia Storytelling, and Editorial Leadership.",
    industry: "Media",
    suggestedRatings: [
      { category: "Reporting Excellence", score: 5 },
      { category: "Writing Quality", score: 5 },
      { category: "Research Skills", score: 5 },
      { category: "Problem Solving", score: 4 },
      { category: "Innovation", score: 4 },
      { category: "Team Leadership", score: 4 },
    ],
  },
  social_work: {
    id: "social_work",
    label: "Social Work",
    defaultRole: "Senior Social Worker",
    relationship: "supervised their social work and community support activities",
    bodyText:
      "demonstrated exceptional social work expertise, including case management, community outreach, and advocacy. They provided comprehensive support to vulnerable populations and worked tirelessly to improve community wellbeing.",
    keyStrengths:
      "Case Management, Community Outreach, Advocacy, Counseling, Crisis Intervention, and Social Services Coordination.",
    industry: "Social Services",
    suggestedRatings: [
      { category: "Case Management", score: 5 },
      { category: "Communication", score: 5 },
      { category: "Problem Solving", score: 5 },
      { category: "Empathy", score: 5 },
      { category: "Advocacy Skills", score: 5 },
      { category: "Team Collaboration", score: 4 },
    ],
  },
  biotechnology: {
    id: "biotechnology",
    label: "Biotechnology",
    defaultRole: "Senior Biotech Researcher",
    relationship: "supervised biotech research and development initiatives",
    bodyText:
      "exhibited exceptional biotechnology expertise, including molecular biology, genetic engineering, and bioprocessing. They conducted groundbreaking research and contributed significantly to scientific advancement.",
    keyStrengths:
      "Molecular Biology, Genetic Engineering, Bioprocessing, Research Design, Lab Management, and Scientific Writing.",
    industry: "Science",
    suggestedRatings: [
      { category: "Research Quality", score: 5 },
      { category: "Technical Proficiency", score: 5 },
      { category: "Problem Solving", score: 5 },
      { category: "Innovation", score: 5 },
      { category: "Project Management", score: 4 },
      { category: "Team Collaboration", score: 4 },
    ],
  },
  environmental_science: {
    id: "environmental_science",
    label: "Environmental Science",
    defaultRole: "Senior Environmental Scientist",
    relationship: "supervised environmental assessments and sustainability initiatives",
    bodyText:
      "demonstrated exceptional environmental science expertise, including environmental impact assessment, sustainability planning, and ecological research. They developed sustainable solutions and contributed to environmental protection efforts.",
    keyStrengths:
      "Environmental Assessment, Sustainability Planning, Ecological Research, Data Analysis, Environmental Policy, and GIS Mapping.",
    industry: "Science",
    suggestedRatings: [
      { category: "Scientific Knowledge", score: 5 },
      { category: "Analytical Skills", score: 5 },
      { category: "Problem Solving", score: 5 },
      { category: "Innovation", score: 4 },
      { category: "Project Management", score: 4 },
      { category: "Communication", score: 4 },
    ],
  },
  accounting: {
    id: "accounting",
    label: "Accounting",
    defaultRole: "Senior Accountant",
    relationship: "supervised accounting and financial reporting activities",
    bodyText:
      "exhibited exceptional accounting expertise, including financial reporting, tax compliance, and audit management. They maintained accurate financial records and ensured regulatory compliance.",
    keyStrengths:
      "Financial Reporting, Tax Compliance, Audit Management, GAAP, Financial Analysis, and Regulatory Compliance.",
    industry: "Finance",
    suggestedRatings: [
      { category: "Accounting Expertise", score: 5 },
      { category: "Attention to Detail", score: 5 },
      { category: "Problem Solving", score: 4 },
      { category: "Compliance", score: 5 },
      { category: "Communication", score: 4 },
      { category: "Ethical Practice", score: 5 },
    ],
  },
  business_management: {
    id: "business_management",
    label: "Business Management",
    defaultRole: "Business Operations Manager",
    relationship: "managed during key business expansion and operational workflows, reporting to me directly",
    bodyText:
      "displayed exemplary strategic thinking, market research capabilities, and team coordination. They took strong initiative in organizing projects and driving efficiency improvements across departments.",
    keyStrengths:
      "Strategic Planning, Operational Management, Data Analysis, Team Leadership, Process Optimization, and Stakeholder Communication.",
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
    return `${months} Month${months > 1 ? "s" : ""}, ${remainingDays} Day${
      remainingDays > 1 ? "s" : ""
    }`;
  }
  if (remainingMonths === 0 && remainingDays === 0) {
    return `${years} Year${years > 1 ? "s" : ""}`;
  }
  let result = `${years} Year${years > 1 ? "s" : ""}`;
  if (remainingMonths > 0)
    result += `, ${remainingMonths} Month${remainingMonths > 1 ? "s" : ""}`;
  if (remainingDays > 0)
    result += `, ${remainingDays} Day${remainingDays > 1 ? "s" : ""}`;
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

const createPdfStyles = (
  fontSize: number,
  lineHeight: number,
  letterSpacing: number
) => {
  const primaryColor = "#1a1a2e";
  const goldColor = "#c9a84c";

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
      alignItems: "flex-start",
      borderBottomWidth: 4,
      borderBottomColor: goldColor,
      paddingBottom: 16,
      marginBottom: 16,
    },
    logo: {
      width: 85,
      height: 85,
      objectFit: "contain",
    },
    headerText: {
      textAlign: "right",
      flex: 1,
      marginLeft: 20,
    },
    companyTitle: {
      fontSize: 22,
      fontWeight: "bold",
      color: primaryColor,
      textTransform: "uppercase",
      letterSpacing: 2,
    },
    companyAddress: {
      fontSize: 8,
      color: "#64748B",
      marginTop: 2,
      lineHeight: 1.4,
    },
    companyContact: {
      fontSize: 7.5,
      color: "#64748B",
      marginTop: 2,
    },
    refText: {
      fontSize: 8.5,
      color: "#64748B",
      marginTop: 4,
      fontWeight: "bold",
    },
    documentTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: primaryColor,
      textAlign: "center",
      textTransform: "uppercase",
      letterSpacing: 3,
      marginVertical: 16,
      paddingBottom: 10,
      borderBottomWidth: 2,
      borderBottomColor: goldColor,
    },
    salutation: {
      fontSize: fontSize + 1,
      fontWeight: "bold",
      color: primaryColor,
      marginBottom: 12,
      textTransform: "uppercase",
      letterSpacing: 1,
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
      color: primaryColor,
    },
    highlightBox: {
      marginVertical: 12,
      padding: 14,
      backgroundColor: "#f8f4ec",
      borderLeftWidth: 6,
      borderLeftColor: goldColor,
      borderRadius: 4,
    },
    highlightText: {
      fontSize: fontSize,
      color: "#1a1a2e",
    },
    ratingsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 6,
      marginVertical: 10,
      padding: 16,
      backgroundColor: "#f8f4ec",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#e8e0d4",
    },
    ratingItem: {
      width: "48%",
      fontSize: 9,
      color: "#1a1a2e",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 4,
      borderBottomWidth: 1,
      borderBottomColor: "#e8e0d4",
    },
    ratingLabel: {
      fontWeight: "bold",
      color: primaryColor,
    },
    ratingValue: {
      color: goldColor,
      fontWeight: "bold",
    },
    footer: {
      borderTopWidth: 3,
      borderTopColor: goldColor,
      paddingTop: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
    signBlock: {
      width: "50%",
    },
    signatureContainer: {
      position: "relative",
      flexDirection: "row",
      alignItems: "center",
    },
    signatureImg: {
      height: 40,
      width: 140,
      objectFit: "contain",
      marginBottom: 2,
    },
    sealOverlay: {
      position: "absolute",
      right: -20,
      bottom: -10,
      width: 60,
      height: 60,
      objectFit: "contain",
      opacity: 0.8,
    },
    signLine: {
      borderBottomWidth: 1,
      borderBottomColor: "#94A3B8",
      width: "100%",
      marginBottom: 4,
    },
    signName: {
      fontSize: 11,
      fontWeight: "bold",
      color: primaryColor,
    },
    signTitle: {
      fontSize: 9,
      color: "#64748B",
    },
    signEmail: {
      fontSize: 8,
      color: "#64748B",
      marginTop: 1,
    },
    signTextBlock: {
      marginTop: 4,
    },
    qrBlock: {
      alignItems: "center",
    },
    qrImg: {
      width: 55,
      height: 55,
    },
    qrText: {
      fontSize: 6.5,
      color: "#94A3B8",
      marginTop: 2,
    },
  });
};

// ============================================================
// PDF COMPONENT
// ============================================================

const LORPDF = ({
  details,
  qrDataUrl,
}: {
  details: LORDetails;
  qrDataUrl: string;
}) => {
  const styles = createPdfStyles(
    details.fontSize,
    details.lineHeight,
    details.letterSpacing
  );

  // Use the image URLs directly
  const logoUrl = details.logoUrl;
  const signatureUrl = details.signatureUrl;
  const sealUrl = details.companySealUrl;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View>
            {/* Header */}
            <View style={styles.header}>
              {logoUrl && (
                <PdfImage src={logoUrl} style={styles.logo} />
              )}
              <View style={styles.headerText}>
                <Text style={styles.companyTitle}>{details.companyName}</Text>
                <Text style={styles.companyAddress}>{details.companyAddress}</Text>
                <Text style={styles.companyContact}>
                  {details.companyWebsite} | {details.companyEmail} | {details.companyPhone}
                </Text>
                <Text style={styles.refText}>Ref: {details.referenceNumber}</Text>
                <Text style={styles.refText}>Date: {formatDate(details.issueDate)}</Text>
              </View>
            </View>

            {/* Title */}
            <Text style={styles.documentTitle}>Letter of Recommendation</Text>

            {/* Salutation */}
            <Text style={styles.salutation}>To Whom It May Concern,</Text>

            {/* Opening Paragraph */}
            <Text style={styles.paragraph}>
              It is my distinct pleasure to write this letter of recommendation
              for <Text style={styles.bold}>{details.candidateName}</Text>, who
              served as a <Text style={styles.bold}>{details.role}</Text> at{" "}
              <Text style={styles.bold}>{details.companyName}</Text> from{" "}
              {formatDate(details.startDate)} to {formatDate(details.endDate)}{" "}
              {details.duration ? `(${details.duration})` : ""}. In my capacity
              as {details.managerTitle}, I {details.relationship}.
            </Text>

            {/* Body */}
            <Text style={styles.paragraph}>
              During their tenure with us, {details.candidateName}{" "}
              {details.bodyText}
            </Text>

            {/* Key Strengths Box */}
            {details.includeStrengthBox && details.keyStrengths && (
              <View style={styles.highlightBox}>
                <Text style={styles.highlightText}>
                  <Text style={{ fontWeight: "bold", color: "#1a1a2e" }}>
                    Key Strengths & Capabilities:{" "}
                  </Text>
                  {details.keyStrengths}
                </Text>
              </View>
            )}

            {/* Professional Skills Assessment */}
            {details.includeRatings && details.ratings.length > 0 && (
              <View style={styles.ratingsGrid}>
                {details.ratings.map((item, idx) => (
                  <View key={idx} style={styles.ratingItem}>
                    <Text style={styles.ratingLabel}>{item.category}:</Text>
                    <Text style={styles.ratingValue}>
                      {item.score === 5 && "Exceptional"}
                      {item.score === 4 && "Proficient"}
                      {item.score === 3 && "Competent"}
                      {item.score === 2 && "Developing"}
                      {item.score === 1 && "Foundational"}
                    </Text>
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
              Beyond their professional capabilities, {details.candidateName}{" "}
              proved to be a dependable, proactive, and ethical team member with
              excellent communication skills and a strong commitment to
              organizational values.
            </Text>

            {details.additionalNotes && (
              <Text style={styles.paragraph}>
                <Text style={{ fontWeight: "bold", color: "#1a1a2e" }}>
                  Additional Note:{" "}
                </Text>
                {details.additionalNotes}
              </Text>
            )}

            <Text style={styles.paragraph}>
              I recommend {details.candidateName} without reservation for any
              professional or academic endeavor they choose to pursue.
            </Text>

            <Text style={[styles.paragraph, { marginTop: 12 }]}>Sincerely,</Text>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.signBlock}>
              <View style={styles.signatureContainer}>
                {signatureUrl && (
                  <PdfImage src={signatureUrl} style={styles.signatureImg} />
                )}
                {details.includeSeal && sealUrl && (
                  <PdfImage src={sealUrl} style={styles.sealOverlay} />
                )}
              </View>
              <View style={styles.signLine} />
              <View style={styles.signTextBlock}>
                <Text style={styles.signName}>{details.managerName}</Text>
                <Text style={styles.signTitle}>
                  {details.managerTitle}, {details.companyName}
                </Text>
                <Text style={styles.signEmail}>{details.managerEmail}</Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
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
// MAIN COMPONENT - Simplified
// ============================================================

export default function LORGeneratorPage() {
  const [isClient, setIsClient] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);
  const [isManualRef, setIsManualRef] = useState(false);

  const defaultTemplate = LOR_TEMPLATES.software_engineering;

  const [details, setDetails] = useState<LORDetails>({
    candidateName: "Name",
    templateKey: defaultTemplate.id,
    role: defaultTemplate.defaultRole,
    startDate: "2026-01-15",
    endDate: "2026-06-30",
    duration: "2 Years, 5 Months",
    issueDate: new Date().toISOString().split("T")[0],
    referenceNumber: "",
    companyName: FIXED_COMPANY_NAME,
    companyAddress: COMPANY_INFO.address,
    companyWebsite: COMPANY_INFO.website,
    companyEmail: COMPANY_INFO.email,
    companyPhone: COMPANY_INFO.phone,
    managerName: DEFAULT_HR_NAME,
    managerTitle: DEFAULT_HR_TITLE,
    managerEmail: DEFAULT_HR_EMAIL,
    relationship: defaultTemplate.relationship,
    bodyText: defaultTemplate.bodyText,
    keyStrengths: defaultTemplate.keyStrengths,
    customParagraphs: [],
    ratings: defaultTemplate.suggestedRatings || [],
    additionalNotes: "",
    fontSize: 10,
    lineHeight: 1.7,
    letterSpacing: 0.2,
    logoUrl: DEFAULT_LOGO_URL,
    signatureUrl: DEFAULT_HR_SIGNATURE_URL,
    companySealUrl: DEFAULT_SEAL_URL,
    includeQR: true,
    includeSeal: true,
    includeRatings: true,
    includeStrengthBox: true,
  });

  useEffect(() => {
    setIsClient(true);
    if (!isManualRef) {
      setDetails((prev) => ({
        ...prev,
        referenceNumber: getNextLORReferenceNumber(),
      }));
    }
  }, [isManualRef]);

  useEffect(() => {
    if (details.startDate && details.endDate) {
      const computedDuration = calculateDuration(
        details.startDate,
        details.endDate
      );
      if (computedDuration) {
        setDetails((prev) => ({ ...prev, duration: computedDuration }));
      }
    }
  }, [details.startDate, details.endDate]);

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

  const qrVerificationText = useMemo(() => {
    return `LOR Ref: ${details.referenceNumber} | Candidate: ${details.candidateName} | Role: ${details.role} | Company: ${details.companyName} | Issued: ${details.issueDate}`;
  }, [
    details.referenceNumber,
    details.candidateName,
    details.role,
    details.companyName,
    details.issueDate,
  ]);

  useEffect(() => {
    if (details.referenceNumber && details.includeQR) {
      QRCodeLib.toDataURL(qrVerificationText, {
        margin: 1,
        width: 150,
        errorCorrectionLevel: "H",
      })
        .then(setQrDataUrl)
        .catch(console.error);
    } else {
      setQrDataUrl("");
    }
  }, [qrVerificationText, details.referenceNumber, details.includeQR]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === "checkbox") {
      setDetails((prev) => ({ ...prev, [name]: checked }));
    } else {
      setDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

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
    showNotification("success", "Content reset to template defaults");
  };

  const showNotification = (type: "success" | "error" | "info", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const copyLORText = () => {
    const text = `
LETTER OF RECOMMENDATION

${details.companyName}
${details.companyAddress}
${details.companyWebsite} | ${details.companyEmail} | ${details.companyPhone}
Reference: ${details.referenceNumber}
Date: ${formatDate(details.issueDate)}

TO WHOM IT MAY CONCERN,

It is my distinct pleasure to write this letter of recommendation for ${details.candidateName}, 
who served as a ${details.role} at ${details.companyName} from ${formatDate(
      details.startDate
    )} 
to ${formatDate(details.endDate)} (${details.duration}). In my capacity as ${
      details.managerTitle
    }, 
I ${details.relationship}.

During their tenure with us, ${details.candidateName} ${details.bodyText}

Key Strengths: ${details.keyStrengths}

${details.customParagraphs.filter((p) => p.trim()).join("\n\n")}

I recommend ${details.candidateName} without reservation for any professional or academic 
endeavor they choose to pursue.

Sincerely,
${details.managerName}
${details.managerTitle}, ${details.companyName}
${details.managerEmail}
    `;
    navigator.clipboard
      .writeText(text)
      .then(() => showNotification("success", "Copied to clipboard!"))
      .catch(() => showNotification("error", "Failed to copy"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-6 font-sans">
      {/* Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 max-w-md animate-in slide-in-from-top-2">
          <div
            className={`px-6 py-4 rounded-xl shadow-lg border flex items-center gap-3 ${
              notification.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : notification.type === "error"
                ? "bg-red-50 border-red-200 text-red-800"
                : "bg-blue-50 border-blue-200 text-blue-800"
            }`}
          >
            {notification.type === "success" && (
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
            {notification.type === "error" && (
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
            {notification.type === "info" && (
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
            )}
            <span className="text-sm font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8 print:hidden">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 px-8 py-6 flex flex-wrap gap-4 justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-slate-900 p-3 rounded-xl">
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">LOR Generator</h1>
              <p className="text-sm text-slate-500">Professional Letter of Recommendation</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print
            </button>

            <button
              onClick={copyLORText}
              className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy Text
            </button>

            <button
              onClick={resetToDefaults}
              className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>

            {isClient && (
              <PDFDownloadLink
                document={<LORPDF details={details} qrDataUrl={qrDataUrl} />}
                fileName={`LOR_${details.candidateName.replace(/\s+/g, "_")}_${
                  details.referenceNumber || "Draft"
                }.pdf`}
                className="px-6 py-2.5 text-sm font-medium text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-900/20"
              >
                {({ loading }) => (
                  <>
                    {loading ? (
                      <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    )}
                    Download PDF
                  </>
                )}
              </PDFDownloadLink>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Sidebar - Only Details Tab */}
        <section className="lg:col-span-5 print:hidden space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
              <div className="w-1 h-8 bg-amber-400 rounded-full"></div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                Candidate Details
              </h3>
            </div>

            <div className="space-y-5 pt-5">
              {/* 1. Full Name */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="candidateName"
                  value={details.candidateName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all bg-slate-50"
                  placeholder="Enter candidate name"
                />
              </div>

              {/* 2. Reference Number */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-slate-700">
                    Reference Number
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isManualRef}
                      onChange={(e) => {
                        setIsManualRef(e.target.checked);
                        if (!e.target.checked) {
                          setDetails((prev) => ({
                            ...prev,
                            referenceNumber: getNextLORReferenceNumber(),
                          }));
                        }
                      }}
                      className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                    />
                    Manual Entry
                  </label>
                </div>
                <input
                  type="text"
                  name="referenceNumber"
                  value={details.referenceNumber}
                  onChange={handleChange}
                  placeholder={isManualRef ? "Enter reference number" : "Auto-generated"}
                  disabled={!isManualRef}
                  className={`w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all ${
                    isManualRef ? "bg-slate-50" : "bg-slate-100 text-slate-500"
                  }`}
                />
                {!isManualRef && (
                  <p className="text-xs text-slate-400 mt-1">
                    Auto-generated. Toggle "Manual Entry" to customize.
                  </p>
                )}
              </div>

              {/* 3. Domain Name (Role) */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Domain Name
                </label>
                <select
                  value={details.templateKey}
                  onChange={handleTemplateChange}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50 font-medium text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none transition-all"
                >
                  {Object.values(LOR_TEMPLATES).map((tmpl) => (
                    <option key={tmpl.id} value={tmpl.id}>
                      {tmpl.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-400 mt-1">
                  Selecting a domain will auto-fill the role, relationship, and key strengths.
                </p>
              </div>

              {/* 4. Start Date & End Date */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={details.startDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={details.endDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all bg-slate-50"
                  />
                </div>
              </div>

              {/* Duration Display */}
              <div className="bg-slate-50 rounded-xl px-4 py-3 text-sm border border-slate-200">
                <span className="text-slate-500">Duration: </span>
                <span className="font-semibold text-slate-900">
                  {details.duration || "Not calculated"}
                </span>
              </div>

              {/* 5. Issue Date */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Issue Date
                </label>
                <input
                  type="date"
                  name="issueDate"
                  value={details.issueDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all bg-slate-50"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Live Preview */}
        <section className="lg:col-span-7 flex justify-center">
          <div className="w-full overflow-x-auto">
            <div
              id="printable-area"
              className="w-[210mm] min-h-[297mm] bg-white p-12 rounded-2xl shadow-xl border border-slate-200 relative flex flex-col justify-between mx-auto text-slate-900"
              style={{
                fontSize: `${details.fontSize}pt`,
                lineHeight: details.lineHeight,
                letterSpacing: `${details.letterSpacing}pt`,
                fontFamily: '"Times New Roman", Times, serif',
              }}
            >
              <div>
                {/* Letterhead Header */}
                <div
                  className="flex justify-between items-start border-b-4 pb-4 mb-6"
                  style={{ borderBottomColor: "#c9a84c" }}
                >
                  <img
                    src={details.logoUrl}
                    alt="Logo"
                    className="h-20 w-20 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="text-right flex-1 ml-5">
                    <h1 className="text-xl font-bold uppercase tracking-wide text-slate-900">
                      {details.companyName}
                    </h1>
                    <p className="text-[9px] text-slate-500 mt-1 leading-relaxed">
                      {details.companyAddress}
                    </p>
                    <p className="text-[8px] text-slate-500 mt-1">
                      {details.companyWebsite} | {details.companyEmail} | {details.companyPhone}
                    </p>
                    <p className="text-[9px] font-mono text-slate-600 mt-2 font-semibold">
                      Ref: {details.referenceNumber}
                    </p>
                    <p className="text-[9px] text-slate-500">
                      Date: {formatDate(details.issueDate)}
                    </p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold uppercase text-center tracking-widest mb-6 text-slate-900 border-b-2 border-amber-400 pb-3">
                  Letter of Recommendation
                </h2>

                <p className="font-bold text-sm text-slate-900 mb-3 tracking-wide">
                  TO WHOM IT MAY CONCERN,
                </p>

                <p className="mb-3 text-justify leading-relaxed">
                  It is my distinct pleasure to write this letter of
                  recommendation for{" "}
                  <strong className="text-slate-900">
                    {details.candidateName}
                  </strong>
                  , who served as a{" "}
                  <strong className="text-slate-900">{details.role}</strong> at{" "}
                  <strong className="text-slate-900">
                    {details.companyName}
                  </strong>{" "}
                  from {formatDate(details.startDate)} to{" "}
                  {formatDate(details.endDate)}{" "}
                  {details.duration ? `(${details.duration})` : ""}. In my
                  capacity as {details.managerTitle}, I {details.relationship}.
                </p>

                <p className="mb-3 text-justify leading-relaxed">
                  During their tenure with us, {details.candidateName}{" "}
                  {details.bodyText}
                </p>

                {details.includeStrengthBox && details.keyStrengths && (
                  <div
                    className="my-4 p-4 rounded-lg border-l-4 text-sm bg-slate-50"
                    style={{ borderLeftColor: "#c9a84c" }}
                  >
                    <strong className="text-slate-900">Key Strengths & Capabilities: </strong>
                    {details.keyStrengths}
                  </div>
                )}

                {details.includeRatings && details.ratings.length > 0 && (
                  <div className="my-3 p-4 border rounded-lg grid grid-cols-2 gap-3 text-sm bg-slate-50 border-slate-200">
                    {details.ratings.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center pr-2 py-1 border-b border-slate-100 last:border-0"
                      >
                        <span className="font-semibold text-slate-900">
                          {item.category}:
                        </span>
                        <span className="text-amber-600 font-medium">
                          {item.score === 5 && "Exceptional"}
                          {item.score === 4 && "Proficient"}
                          {item.score === 3 && "Competent"}
                          {item.score === 2 && "Developing"}
                          {item.score === 1 && "Foundational"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {details.customParagraphs.map(
                  (p, idx) =>
                    p.trim() && (
                      <p key={idx} className="mb-3 text-justify leading-relaxed">
                        {p}
                      </p>
                    )
                )}

                <p className="mb-3 text-justify leading-relaxed">
                  Beyond their professional capabilities,{" "}
                  {details.candidateName} proved to be a dependable, proactive,
                  and ethical team member with excellent communication skills
                  and a strong commitment to organizational values.
                </p>

                {details.additionalNotes && (
                  <p className="mb-3 text-justify leading-relaxed">
                    <strong className="text-slate-900">Additional Note: </strong>
                    {details.additionalNotes}
                  </p>
                )}

                <p className="mb-4 text-justify leading-relaxed">
                  I recommend {details.candidateName} without reservation for
                  any professional or academic endeavor they choose to pursue.
                </p>

                <p className="mt-4">Sincerely,</p>
              </div>

              {/* Footer */}
              <div
                className="pt-6 border-t-3 flex justify-between items-end"
                style={{ borderTopColor: "#c9a84c" }}
              >
                <div>
                  <div className="relative inline-block">
                    <img
                      src={details.signatureUrl}
                      alt="Signature"
                      className="h-14 object-contain mb-1"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    {details.includeSeal && details.companySealUrl && (
                      <img
                        src={details.companySealUrl}
                        alt="Company Seal"
                        className="absolute -right-12 -bottom-8 w-20 h-20 object-contain opacity-70"
                        style={{ zIndex: 10 }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    )}
                  </div>
                  <div className="w-64 border-b border-slate-300 mb-1" />
                  <p className="font-bold text-sm text-slate-900">
                    {details.managerName}
                  </p>
                  <p className="text-xs text-slate-600">
                    {details.managerTitle}, {details.companyName}
                  </p>
                  <p className="text-[9px] text-slate-500 mt-0.5">
                    {details.managerEmail}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {details.includeQR && qrDataUrl && (
                    <div className="text-center">
                      <img
                        src={qrDataUrl}
                        alt="QR Code"
                        className="w-14 h-14 mx-auto"
                      />
                      <p className="text-[8px] text-slate-400 mt-1">
                        Verify LOR
                      </p>
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
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in { animation: slideIn 0.2s ease-out; }
      `}</style>
    </div>
  );
}