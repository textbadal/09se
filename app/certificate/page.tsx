"use client";

import { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Printer } from "lucide-react";

export default function CertificatePage() {
  const certRef =
    useRef<HTMLDivElement>(null);

  const [logo, setLogo] =
    useState<string | null>(null);

  const [signature, setSignature] =
    useState<string | null>(null);

  const [seal, setSeal] =
    useState<string | null>(null);

  const [form, setForm] = useState({
    candidateName: "",
    role: "",
    college: "",
    startDate: "",
    endDate: "",
    companyName: "Dream Homes Bihar",
    mentor: "",
  });

  const certificateId =
    useMemo(() => {
      const random =
        Math.floor(
          1000 +
          Math.random() * 9000
        );

      return `CERT-${new Date().getFullYear()}-${random}`;
    }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const uploadImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (v: string) => void
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onload = () =>
      setter(
        reader.result as string
      );

    reader.readAsDataURL(
      file
    );
  };

  const downloadPDF =
    async () => {
      if (!certRef.current)
        return;

      const canvas =
        await html2canvas(
          certRef.current,
          {
            scale: 3,
            backgroundColor:
              "#ffffff",
          }
        );

      const img =
        canvas.toDataURL(
          "image/png"
        );

      const pdf =
        new jsPDF({
          orientation:
            "landscape",
          unit: "mm",
          format: "a4",
        });

      pdf.addImage(
        img,
        "PNG",
        0,
        0,
        297,
        210
      );

      pdf.save(
        `${form.candidateName}-Certificate.pdf`
      );
    };

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6">

        {/* FORM */}

        <div className="bg-white p-6 rounded-2xl shadow">

          <h1 className="text-2xl font-bold mb-6">
            Certificate Generator
          </h1>

          <div className="space-y-4">

            <input
              name="candidateName"
              placeholder="Candidate Name"
              value={
                form.candidateName
              }
              onChange={
                handleChange
              }
              className="border p-3 rounded-lg w-full"
            />

            <input
              name="role"
              placeholder="Internship Role"
              value={
                form.role
              }
              onChange={
                handleChange
              }
              className="border p-3 rounded-lg w-full"
            />

            <input
              name="college"
              placeholder="College"
              value={
                form.college
              }
              onChange={
                handleChange
              }
              className="border p-3 rounded-lg w-full"
            />

            <div className="grid grid-cols-2 gap-3">

              <input
                type="date"
                name="startDate"
                value={
                  form.startDate
                }
                onChange={
                  handleChange
                }
                className="border p-3 rounded-lg"
              />

              <input
                type="date"
                name="endDate"
                value={
                  form.endDate
                }
                onChange={
                  handleChange
                }
                className="border p-3 rounded-lg"
              />

            </div>

            <input
              name="mentor"
              placeholder="Mentor Name"
              value={
                form.mentor
              }
              onChange={
                handleChange
              }
              className="border p-3 rounded-lg"
            />

            <div className="space-y-2">

              <label>
                Logo
              </label>

              <input
                type="file"
                onChange={(e)=>
                  uploadImage(
                    e,
                    setLogo
                  )
                }
              />

              <label>
                Signature
              </label>

              <input
                type="file"
                onChange={(e)=>
                  uploadImage(
                    e,
                    setSignature
                  )
                }
              />

              <label>
                Seal
              </label>

              <input
                type="file"
                onChange={(e)=>
                  uploadImage(
                    e,
                    setSeal
                  )
                }
              />

            </div>

            <div className="grid grid-cols-2 gap-3">

              <button
                onClick={
                  downloadPDF
                }
                className="bg-blue-600 text-white p-3 rounded-lg flex justify-center gap-2"
              >
                <Download size={18}/>
                PDF
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

        {/* CERTIFICATE */}

        <div
          ref={certRef}
          className="bg-white rounded-2xl shadow p-10 border-[14px] border-yellow-500"
        >

          <div className="text-center">

            {logo && (
              <img
                src={logo}
                className="h-20 mx-auto mb-4"
              />
            )}

            <h1 className="text-5xl font-bold">
              CERTIFICATE
            </h1>

            <p className="text-gray-500 mt-2">
              Certificate of Completion
            </p>

          </div>

          <div className="mt-12 text-center leading-9">

            <p>
              This certifies that
            </p>

            <h2 className="text-4xl font-bold my-5">
              {form.candidateName ||
                "Candidate Name"}
            </h2>

            <p>
              has successfully completed internship as
            </p>

            <h3 className="text-2xl font-semibold mt-3">
              {form.role ||
                "Intern"}
            </h3>

            <p className="mt-6">
              from
              {" "}
              <b>
                {form.startDate ||
                  "-"}
              </b>
              {" "}to{" "}
              <b>
                {form.endDate ||
                  "-"}
              </b>
            </p>

            <p className="mt-5">
              under
              {" "}
              <b>
                {form.companyName}
              </b>
            </p>

            <p>
              Certificate ID:
              {" "}
              {certificateId}
            </p>

          </div>

          <div className="flex justify-between mt-16">

            <div>

              {signature && (
                <img
                  src={signature}
                  className="h-14 mb-2"
                />
              )}

              <div className="border-b w-48"></div>

              <p>
                Authorized Signatory
              </p>

            </div>

            <div>

              {seal && (
                <img
                  src={seal}
                  className="h-20"
                />
              )}

            </div>

            <div>

              <div className="border-b w-48"></div>

              <p>
                Mentor Signature
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}