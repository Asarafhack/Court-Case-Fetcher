"use client";

import { useEffect, useState } from "react";

export default function HistoryPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/history")
      .then((res) => res.json())
      .then((res) => {
        setData(res.data || []);
        setLoading(false);
      });
  }, []);
  <a href="/" className="block text-center text-blue-400 underline mb-6">
  ← Back to Home
</a>

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Search History
      </h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-center">No history found</p>
      ) : (
        <div className="space-y-4 max-w-xl mx-auto">
          {data.map((item) => (
<div
  key={item._id}
  className="bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-xl shadow hover:scale-[1.02] transition"
>
  <h2 className="font-semibold text-lg text-white">
  {item.caseType} {item.caseNumber} ({item.year})
</h2>

<p className="text-sm text-gray-300">
  Status: <span className="text-blue-400">{item.responseData.status}</span>
</p>

<p className="text-xs text-gray-400">
  {new Date(item.createdAt).toLocaleString()}
</p>
<h2 className="font-semibold text-lg text-white">
  {item.caseType} {item.caseNumber} ({item.year})
</h2>

<p className="text-sm text-gray-300">
  Status: <span className="text-blue-400">{item.responseData.status}</span>
</p>

<p className="text-xs text-gray-400">
  {new Date(item.createdAt).toLocaleString()}
</p>              <p><strong>{item.caseType} {item.caseNumber} ({item.year})</strong></p>
              <p>Status: {item.responseData.status}</p>
              <p className="text-xs text-gray-500">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}