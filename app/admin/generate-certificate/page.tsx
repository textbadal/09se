"use client";

import { useState } from "react";

export default function CertificateGenerator() {

  const [name,setName] = useState("");
  const [domain,setDomain] = useState("");
  const [duration,setDuration] = useState("");
  const [id,setId] = useState("");

  const generateID = () => {
    const random = Math.floor(Math.random()*900 + 100);
    setId(`DHB-${random}`);
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-20">

      <h1 className="text-3xl font-bold mb-8">
        Certificate Generator
      </h1>

      <div className="space-y-4 w-96">

        <input
          className="border p-2 w-full"
          placeholder="Student Name"
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Domain"
          onChange={(e)=>setDomain(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Duration"
          onChange={(e)=>setDuration(e.target.value)}
        />

        <button
          onClick={generateID}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Generate Certificate ID
        </button>

        {id && (
          <div className="border p-4 mt-6">

            <p><b>ID:</b> {id}</p>

            <p className="mt-2">
              Verification Link:
            </p>

            <p className="text-blue-600">
              dreamhomesbihar.com/verification/{id}
            </p>

            <pre className="bg-gray-100 p-3 mt-4 text-sm overflow-auto">
{`{
 id: "${id}",
 name: "${name}",
 domain: "${domain}",
 duration: "${duration}",
 issueDate: "ADD_DATE"
}`}
            </pre>

          </div>
        )}

      </div>

    </div>
  );
}