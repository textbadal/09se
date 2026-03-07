import { certificates } from "@/data/certificates";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return certificates.map((cert) => ({
    id: cert.id,
  }));
}

export default async function VerificationPage({ params }: Props) {
  const { id } = await params;

  const cert = certificates.find((c) => c.id === id);

  if (!cert) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold text-red-600">
          Certificate Not Found
        </h1>
        <p className="mt-4 text-gray-600">
          The certificate ID you entered is invalid.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-20">
      <div className="border rounded-lg p-8 shadow-md">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Certificate Verified ✅
        </h1>

        <div className="space-y-2">
          <p><strong>Name:</strong> {cert.name}</p>
          <p><strong>Domain:</strong> {cert.domain}</p>
          <p><strong>Certificate ID:</strong> {cert.id}</p>
          <p><strong>Issued By:</strong> Dream Homes Bihar</p>
        </div>
      </div>
    </div>
  );
}