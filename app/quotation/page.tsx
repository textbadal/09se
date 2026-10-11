"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  Upload,
  X,
  FileText,
  Phone,
  Mail,
  User,
  MapPin,
  Ruler,
  Building2,
  Calendar,
  IndianRupee,
  Loader2,
  BadgeCheck,
  Clock,
  ShieldCheck,
  Star,
  PencilRuler,
  Home,
  Layers,
  Sofa,
  PlugZap,
  FileSpreadsheet,
} from "lucide-react";

/* ============================================================
   SCHEMA
   ============================================================ */

const projectTypes = [
  { value: "floor-plans", label: "Floor Plans", Icon: PencilRuler },
  { value: "elevation", label: "3D Elevation", Icon: Building2 },
  { value: "structural", label: "Structural Drawings", Icon: Layers },
  { value: "interior", label: "Interior Design", Icon: Sofa },
  { value: "mep", label: "Electrical & Plumbing", Icon: PlugZap },
  { value: "boq", label: "BOQ & Cost Estimate", Icon: FileSpreadsheet },
  { value: "full-package", label: "Full Design Package", Icon: Home },
] as const;

const budgetRanges = [
  "Under ₹10 Lakhs",
  "₹10 – 25 Lakhs",
  "₹25 – 50 Lakhs",
  "₹50 Lakhs – 1 Crore",
  "Above ₹1 Crore",
  "Not sure yet",
] as const;

const timelineOptions = [
  "Immediately",
  "Within 1 month",
  "1–3 months",
  "3–6 months",
  "Just exploring",
] as const;

const quotationSchema = z.object({
  // Step 1 — Project
  projectTypes: z.array(z.string()).min(1, "Select at least one service"),
  plotArea: z.string().min(1, "Plot area is required"),
  builtUpArea: z.string().optional(),
  city: z.string().min(2, "City is required"),
  budget: z.string().min(1, "Select a budget range"),
  timeline: z.string().min(1, "Select a timeline"),

  // Step 2 — Contact
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  whatsapp: z.string().optional(),

  // Step 3 — Details
  notes: z.string().max(1000).optional(),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to continue" }),
  }),
});

type QuotationForm = z.infer<typeof quotationSchema>;

/* ============================================================
   PAGE
   ============================================================ */

export default function QuotationPage() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    watch,
    formState: { errors },
  } = useForm<QuotationForm>({
    resolver: zodResolver(quotationSchema),
    mode: "onTouched",
    defaultValues: {
      projectTypes: [],
      plotArea: "",
      builtUpArea: "",
      city: "",
      budget: "",
      timeline: "",
      fullName: "",
      email: "",
      phone: "",
      whatsapp: "",
      notes: "",
    },
  });

  const selectedTypes = watch("projectTypes");

  /* ---- Step navigation ---- */
  const nextStep = async () => {
    const fieldsByStep: Record<number, (keyof QuotationForm)[]> = {
      1: ["projectTypes", "plotArea", "city", "budget", "timeline"],
      2: ["fullName", "email", "phone"],
    };
    const valid = await trigger(fieldsByStep[step]);
    if (valid) setStep((s) => Math.min(s + 1, 3));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  /* ---- File handling ---- */
  const handleFiles = (list: FileList | null) => {
    if (!list) return;
    const incoming = Array.from(list);
    const valid = incoming.filter((f) => f.size <= 10 * 1024 * 1024);
    setFiles((prev) => [...prev, ...valid].slice(0, 5));
  };

  const removeFile = (idx: number) =>
    setFiles((prev) => prev.filter((_, i) => i !== idx));

  /* ---- Submit ---- */
  const onSubmit: SubmitHandler<QuotationForm> = async (data) => {
    setStatus("submitting");
    try {
      // Replace with your API / server action
      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) => {
        formData.append(k, Array.isArray(v) ? JSON.stringify(v) : String(v));
      });
      files.forEach((f) => formData.append("files", f));

      await new Promise((r) => setTimeout(r, 1400)); // simulate
      // await fetch("/api/quotation", { method: "POST", body: formData });

      setStatus("success");
    } catch {
      setStatus("idle");
    }
  };

  /* ============================================================
     SUCCESS
     ============================================================ */
  if (status === "success") {
    return (
      <main className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.06) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse 70% 50% at 50% 0%, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 50% at 50% 0%, black 40%, transparent 100%)",
          }}
        />
        <div className="relative mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 shadow-xl shadow-emerald-500/30">
            <CheckCircle2 className="h-10 w-10 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Quotation Request Received
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-gray-600">
            Thank you. Our team will review your requirements and send a detailed
            quotation within <span className="font-semibold text-gray-800">24 hours</span>.
          </p>

          <div className="mt-10 grid w-full max-w-md grid-cols-1 gap-3 text-left">
            {[
              { Icon: Clock, text: "Confirmation email sent" },
              { Icon: Phone, text: "We'll call within 24 hours" },
              { Icon: FileText, text: "Detailed quote in your inbox" },
            ].map(({ Icon, text }, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white/70 px-4 py-3 backdrop-blur"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                  <Icon className="h-4 w-4 text-blue-600" strokeWidth={2} />
                </div>
                <span className="text-sm font-medium text-gray-700">{text}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Back to Home
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gray-400"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* ============================================================
     FORM
     ============================================================ */
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-white">
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(15,23,42,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.08) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
          }}
        />
        <div className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-blue-200/40 via-indigo-100/30 to-transparent blur-3xl" />
        <div className="absolute -top-24 right-0 h-[32rem] w-[32rem] rounded-full bg-gradient-to-br from-amber-200/40 via-orange-100/30 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        {/* ---------- Header ---------- */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3.5 py-1.5 shadow-sm backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[11px] font-semibold tracking-wide text-gray-700">
              Free quotation · No obligation
            </span>
          </div>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Get Your{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Free Quotation
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-600 sm:text-base">
            Tell us about your project. Our licensed architects will send a
            detailed item-wise quotation within 24 hours.
          </p>
        </div>

        {/* ---------- Progress ---------- */}
        <div className="mx-auto mb-10 max-w-3xl">
          <div className="flex items-center justify-between">
            {[
              { n: 1, label: "Project" },
              { n: 2, label: "Contact" },
              { n: 3, label: "Details" },
            ].map((s, i) => (
              <div key={s.n} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-bold transition-all ${
                      step > s.n
                        ? "border-blue-600 bg-blue-600 text-white"
                        : step === s.n
                        ? "border-blue-600 bg-white text-blue-600 shadow-lg shadow-blue-600/20"
                        : "border-gray-300 bg-white text-gray-400"
                    }`}
                  >
                    {step > s.n ? <Check className="h-4 w-4" strokeWidth={3} /> : s.n}
                  </div>
                  <span
                    className={`mt-2 text-[11px] font-semibold ${
                      step >= s.n ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < 2 && (
                  <div className="mx-3 h-0.5 flex-1 self-start rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all duration-500"
                      style={{ width: step > s.n ? "100%" : "0%" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ---------- Form card ---------- */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl shadow-slate-900/5"
        >
          <div className="p-6 sm:p-8">
            {/* ================= STEP 1 ================= */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="mb-3 block text-sm font-semibold text-gray-900">
                    What services do you need?{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="projectTypes"
                    control={control}
                    render={({ field }) => (
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {projectTypes.map(({ value, label, Icon }) => {
                          const active = field.value.includes(value);
                          return (
                            <button
                              key={value}
                              type="button"
                              onClick={() =>
                                field.onChange(
                                  active
                                    ? field.value.filter((v: string) => v !== value)
                                    : [...field.value, value]
                                )
                              }
                              className={`group flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition-all ${
                                active
                                  ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/20"
                                  : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                              }`}
                            >
                              <div
                                className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                                  active ? "bg-blue-600" : "bg-gray-100"
                                }`}
                              >
                                <Icon
                                  className={`h-4 w-4 ${
                                    active ? "text-white" : "text-gray-600"
                                  }`}
                                  strokeWidth={2}
                                />
                              </div>
                              <span
                                className={`text-xs font-semibold ${
                                  active ? "text-blue-900" : "text-gray-700"
                                }`}
                              >
                                {label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  />
                  {errors.projectTypes && (
                    <p className="mt-2 text-xs font-medium text-red-600">
                      {errors.projectTypes.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field
                    label="Plot Area (sq.ft)"
                    Icon={Ruler}
                    placeholder="e.g. 1200"
                    error={errors.plotArea?.message}
                    {...register("plotArea")}
                  />
                  <Field
                    label="Built-up Area (sq.ft)"
                    Icon={Ruler}
                    placeholder="optional"
                    error={errors.builtUpArea?.message}
                    {...register("builtUpArea")}
                  />
                </div>

                <Field
                  label="City / Location"
                  Icon={MapPin}
                  placeholder="e.g. Bengaluru"
                  error={errors.city?.message}
                  {...register("city")}
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                      Budget Range <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <IndianRupee className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <select
                        {...register("budget")}
                        className="w-full appearance-none rounded-xl border border-gray-300 bg-white py-2.5 pl-9 pr-9 text-sm text-gray-900 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option value="">Select budget</option>
                        {budgetRanges.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                      <svg
                        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {errors.budget && (
                      <p className="mt-1.5 text-xs font-medium text-red-600">
                        {errors.budget.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                      Timeline <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <select
                        {...register("timeline")}
                        className="w-full appearance-none rounded-xl border border-gray-300 bg-white py-2.5 pl-9 pr-9 text-sm text-gray-900 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option value="">Select timeline</option>
                        {timelineOptions.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      <svg
                        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {errors.timeline && (
                      <p className="mt-1.5 text-xs font-medium text-red-600">
                        {errors.timeline.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ================= STEP 2 ================= */}
            {step === 2 && (
              <div className="space-y-5">
                <Field
                  label="Full Name"
                  Icon={User}
                  placeholder="Your full name"
                  error={errors.fullName?.message}
                  {...register("fullName")}
                />
                <Field
                  label="Email Address"
                  Icon={Mail}
                  type="email"
                  placeholder="you@example.com"
                  error={errors.email?.message}
                  {...register("email")}
                />
                <Field
                  label="Mobile Number"
                  Icon={Phone}
                  type="tel"
                  placeholder="10-digit mobile"
                  error={errors.phone?.message}
                  maxLength={10}
                  {...register("phone")}
                />
                <Field
                  label="WhatsApp (optional)"
                  Icon={Phone}
                  type="tel"
                  placeholder="If different from mobile"
                  error={errors.whatsapp?.message}
                  maxLength={10}
                  {...register("whatsapp")}
                />
              </div>
            )}

            {/* ================= STEP 3 ================= */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-900">
                    Additional Notes (optional)
                  </label>
                  <textarea
                    {...register("notes")}
                    rows={5}
                    placeholder="Tell us about your project — style preferences, specific requirements, site conditions, etc."
                    className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                  {errors.notes && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {errors.notes.message}
                    </p>
                  )}
                </div>

                {/* File upload */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-900">
                    Upload Reference Files (optional)
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      handleFiles(e.dataTransfer.files);
                    }}
                    className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50/50 px-6 py-8 text-center transition-colors hover:border-blue-400 hover:bg-blue-50/40"
                  >
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                      <Upload className="h-5 w-5 text-blue-600" strokeWidth={2} />
                    </div>
                    <p className="text-sm font-semibold text-gray-800">
                      Click to upload or drag &amp; drop
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      PDF, JPG, PNG, DWG · Max 10MB each · Up to 5 files
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.dwg"
                      onChange={(e) => handleFiles(e.target.files)}
                      className="hidden"
                    />
                  </div>

                  {files.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {files.map((file, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                            <FileText className="h-4 w-4 text-blue-600" strokeWidth={2} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-semibold text-gray-800">
                              {file.name}
                            </p>
                            <p className="text-[10px] text-gray-500">
                              {(file.size / 1024).toFixed(0)} KB
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(i)}
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                            aria-label="Remove file"
                          >
                            <X className="h-4 w-4" strokeWidth={2} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Terms */}
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 bg-gray-50/50 p-4">
                  <input
                    type="checkbox"
                    {...register("agreeToTerms")}
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500/40"
                  />
                  <span className="text-xs leading-relaxed text-gray-600">
                    I agree to be contacted by the design team regarding this
                    quotation request and accept the{" "}
                    <Link href="/terms" className="font-semibold text-blue-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="font-semibold text-blue-600 hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <p className="text-xs font-medium text-red-600">
                    {errors.agreeToTerms.message}
                  </p>
                )}

                {/* Trust reminders */}
                <div className="grid grid-cols-1 gap-2 rounded-xl border border-blue-100 bg-blue-50/50 p-3 sm:grid-cols-3">
                  {[
                    { Icon: Clock, text: "24hr response" },
                    { Icon: ShieldCheck, text: "Data protected" },
                    { Icon: BadgeCheck, text: "Licensed team" },
                  ].map(({ Icon, text }, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] font-medium text-blue-900">
                      <Icon className="h-3.5 w-3.5 text-blue-600" strokeWidth={2} />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ---------- Footer / Nav ---------- */}
          <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/60 px-6 py-4 sm:px-8">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
                Back
              </button>
            ) : (
              <span className="text-xs text-gray-400">
                Step {step} of 3
              </span>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="group inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                Continue
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={status === "submitting"}
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Get My Quotation
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            )}
          </div>
        </form>

        {/* ---------- Trust footer ---------- */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {[
            { Icon: Star, text: "4.9★ · 1,200+ reviews" },
            { Icon: BadgeCheck, text: "Licensed architects" },
            { Icon: ShieldCheck, text: "100% confidential" },
          ].map(({ Icon, text }, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
              <Icon className="h-3.5 w-3.5 text-gray-400" strokeWidth={2} />
              {text}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

/* ============================================================
   REUSABLE FIELD
   ============================================================ */

import { forwardRef, type InputHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  Icon: LucideIcon;
  error?: string;
};

const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, Icon, error, ...props }, ref) => (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-900">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          ref={ref}
          {...props}
          className={`w-full rounded-xl border bg-white py-2.5 pl-9 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:ring-2 ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
          }`}
        />
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
    </div>
  )
);
Field.displayName = "Field";