"use client";
import { useEffect, useState } from "react";

type Newsletter = {
  id: string;
  email: string;
  createdAt: string;
};

export default function NewsletterList() {
  const [list, setList] = useState<Newsletter[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/newsletter")
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(setList)
      .catch(err => {
        console.error("Failed to fetch newsletter list:", err);
        setError("Failed to load newsletter subscribers. Please try again later.");
      });
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Newsletter Subscribers</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <ul>
        {list.map((n) => (
          <li key={n.id} className="mb-2">
            <span className="font-mono">{n.email}</span>
            <span className="text-gray-400 text-xs ml-2">{new Date(n.createdAt).toLocaleString()}</span>
          </li>
        ))}
        {list.length === 0 && !error && <li className="text-gray-500">No subscribers yet.</li>}
      </ul>
    </div>
  );
}
