"use client";

import { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Printer } from "lucide-react";

export default function InternOfferPage() {
  const letterRef = useRef<HTMLDivElement>(null);

  const [logo, setLogo] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  const [form, setForm] = useState({
    internName: "",
    role: "",
    email: "",
    phone: "",
    college: "",
    duration: "2",
    startDate: "",
    stipend: "Unpaid",
    workMode: "Remote",
    reportingManager: "",
    companyName: "Dream Homes Bihar",
    companyAddress: "",
    terms:
      "• Maintain confidentiality.\n• Follow company policies.\n• Internship certificate after successful completion.\n• Internship may be terminated for misconduct.",
  });

  const offerId = useMemo(() => {
    const random = Math.floor(
      1000 + Math.random() * 9000
    );

    return `DHB-INT-${new Date().getFullYear()}-${random}`;
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (value: string) => void
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () =>
      setter(reader.result as string);

    reader.readAsDataURL(file);
  };

  const endDate = () => {
    if (!form.startDate) return "-";

    const start = new Date(form.startDate);

    start.setMonth(
      start.getMonth() +
      Number(form.duration)
    );

    return start.toLocaleDateString();
  };

  const downloadPDF = async () => {
    if (!letterRef.current) return;

    const canvas =
      await html2canvas(
        letterRef.current,
        {
          scale: 3,
          backgroundColor: "#ffffff",
          useCORS: true,
        }
      );

    const img =
      canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
    });

    const width = 210;

    const height =
      (canvas.height * width) /
      canvas.width;

    pdf.addImage(
      img,
      "PNG",
      0,
      0,
      width,
      height
    );

    pdf.save(
      `${form.internName || "Intern"}-Offer-Letter.pdf`
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6">

        {/* FORM */}

        <div className="bg-white rounded-2xl p-6 shadow">

          <h1 className="text-2xl font-bold mb-6">
            Intern Offer Generator
          </h1>

          <div className="space-y-4">

            <input
              name="internName"
              placeholder="Intern Name"
              value={form.internName}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            />

            <input
              name="role"
              placeholder="Role"
              value={form.role}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            />

            <div className="grid grid-cols-2 gap-3">

              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />

              <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />

            </div>

            <input
              name="college"
              placeholder="College / University"
              value={form.college}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            />

            <div className="grid grid-cols-2 gap-3">

              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />

              <select
                name="duration"
                value={form.duration}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              >
                <option value="1">
                  1 Month
                </option>

                <option value="2">
                  2 Months
                </option>

                <option value="3">
                  3 Months
                </option>

                <option value="6">
                  6 Months
                </option>

              </select>

            </div>

            <div className="grid grid-cols-2 gap-3">

              <select
                name="stipend"
                value={form.stipend}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              >
                <option>
                  Unpaid
                </option>

                <option>
                  ₹1000
                </option>

                <option>
                  ₹2000
                </option>

                <option>
                  ₹5000
                </option>

              </select>

              <select
                name="workMode"
                value={form.workMode}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              >
                <option>
                  Remote
                </option>

                <option>
                  Hybrid
                </option>

                <option>
                  Office
                </option>

              </select>

            </div>

            <input
              name="reportingManager"
              placeholder="Reporting Manager"
              value={form.reportingManager}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            />

            <textarea
              rows={5}
              name="terms"
              value={form.terms}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            />

            <div className="space-y-2">

              <label className="text-sm font-medium">
                Company Logo
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImage(
                    e,
                    setLogo
                  )
                }
              />

              <label className="text-sm font-medium">
                Signature
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImage(
                    e,
                    setSignature
                  )
                }
              />

              <label className="text-sm font-medium">
                Intern Photo
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImage(
                    e,
                    setPhoto
                  )
                }
              />

            </div>

            <div className="grid grid-cols-2 gap-3">

              <button
                onClick={downloadPDF}
                className="bg-blue-600 text-white p-3 rounded-lg flex justify-center gap-2"
              >
                <Download size={18}/>
                Generate PDF
              </button>

              <button
                onClick={() =>
                  window.print()
                }
                className="bg-green-600 text-white p-3 rounded-lg flex justify-center gap-2"
              >
                <Printer size={18}/>
                Print
              </button>

            </div>

          </div>

        </div>

        {/* LETTER */}

        <div
          ref={letterRef}
          className="bg-white rounded-2xl p-10 shadow"
        >

          <div className="flex justify-between">

            <div>

              {logo && (
                <img
                  src={logo}
                  className="h-16 mb-3"
                />
              )}

              <h1 className="text-3xl font-bold">
                INTERNSHIP OFFER LETTER
              </h1>

              <p className="text-gray-500">
                Offer ID: {offerId}
              </p>

            </div>

            {photo && (
              <img
                src={photo}
                className="w-24 h-24 object-cover rounded-lg border"
              />
            )}

          </div>

          <div className="mt-8 text-[15px] leading-8">

            <p>
              Dear <b>{form.internName || "Candidate"}</b>,
            </p>

            <p>
              We are pleased to offer you the role of
              <b> {form.role || "Intern"} </b>
              at
              <b> {form.companyName}</b>.
            </p>

            <p>
              Internship Duration:
              <b> {form.duration} Month(s)</b>
            </p>

            <p>
              Start Date:
              <b> {form.startDate || "-"}</b>
            </p>

            <p>
              End Date:
              <b> {endDate()}</b>
            </p>

            <p>
              Work Mode:
              <b> {form.workMode}</b>
            </p>

            <p>
              Stipend:
              <b> {form.stipend}</b>
            </p>

            <p>
              Reporting Manager:
              <b> {form.reportingManager}</b>
            </p>

            <p>
              College:
              <b> {form.college}</b>
            </p>

            <div className="border rounded-lg p-4 bg-gray-50 whitespace-pre-line mt-6 text-sm">
              {form.terms}
            </div>

          </div>

          <div className="flex justify-between mt-20">

            <div>

              {signature && (
                <img
                  src={signature}
                  className="h-14 mb-2"
                />
              )}

              <div className="border-b w-44"></div>

              <p className="mt-2">
                Authorized Signatory
              </p>

            </div>

            <div>

              <div className="border-b w-44"></div>

              <p className="mt-2">
                Candidate Signature
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}