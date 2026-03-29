"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    caseType: "",
    caseNumber: "",
    year: "",
  });

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/fetch-case", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black px-4">

      <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 text-white">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center mb-2">
          Court Case Fetcher
        </h1>
        <p className="text-center text-gray-400 text-sm mb-6">
          Instantly fetch case details with structured insights
        </p>

        {/* FORM */}
        <div className="space-y-4">

          <input
            placeholder="Case Type (e.g. W.P.)"
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            value={form.caseType}
            onChange={(e) =>
              setForm({ ...form, caseType: e.target.value })
            }
          />

          <input
            placeholder="Case Number"
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            value={form.caseNumber}
            onChange={(e) =>
              setForm({ ...form, caseNumber: e.target.value })
            }
          />

          <input
            placeholder="Filing Year"
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            value={form.year}
            onChange={(e) =>
              setForm({ ...form, year: e.target.value })
            }
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg font-semibold"
          >
            {loading ? "Fetching..." : "Fetch Case"}
          </button>
        </div>

        {/* NAV */}
        <a
          href="/history"
          className="block text-center mt-4 text-sm text-blue-400 underline"
        >
          View Search History
        </a>

        {/* ERROR */}
        {error && (
          <p className="text-red-400 text-sm mt-4 text-center">
            {error}
          </p>
        )}

        {/* RESULT */}
        {result && result.data && (
          <div className="mt-6 bg-white/10 border border-white/20 p-4 rounded-xl">

            <h2 className="text-lg font-semibold text-center mb-3">
              Case Details
            </h2>

            <div className="space-y-1 text-sm text-gray-200">
              <p><strong>Type:</strong> {result.data.caseType}</p>
              <p><strong>Number:</strong> {result.data.caseNumber}</p>
              <p><strong>Year:</strong> {result.data.year}</p>
              <p><strong>Status:</strong> {result.data.responseData.status}</p>
              <p><strong>Title:</strong> {result.data.responseData.title}</p>
              <p><strong>Parties:</strong> {result.data.responseData.parties}</p>
              <p><strong>Hearing:</strong> {result.data.responseData.hearingDate}</p>
            </div>

            <p className="text-xs text-gray-400 mt-3 text-center">
              {new Date(result.data.createdAt).toLocaleString()}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}