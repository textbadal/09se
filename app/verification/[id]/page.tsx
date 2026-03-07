import { certificates } from "@/data/certificates";

type Props = {
  params: {
    id: string;
  };
};

export function generateStaticParams() {
  return certificates.map((cert) => ({
    id: cert.id,
  }));
}

export default function CertificatePage({ params }: Props) {
  const certificate = certificates.find(
    (c) => c.id.toLowerCase() === params.id.toLowerCase()
  );

  if (!certificate) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">
            Certificate Not Found
          </h1>
          <p className="text-gray-600">
            This certificate ID does not exist in our records.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-16">
      <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold text-center mb-4">
          Certificate Verified ✓
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Internship certificate issued by
          <span className="font-semibold text-blue-600">
            {" "}Dream Homes Bihar
          </span>
        </p>

        <div className="space-y-3 text-sm">
          <p><strong>Name:</strong> {certificate.name}</p>
          <p><strong>Domain:</strong> {certificate.domain}</p>
          <p><strong>Duration:</strong> {certificate.duration}</p>
          <p><strong>Issued On:</strong> {certificate.issuedOn}</p>
          <p><strong>Certificate ID:</strong> {certificate.id}</p>
        </div>

      </div>
    </main>
  );
}