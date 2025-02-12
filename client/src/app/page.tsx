"use client"

import { useState } from "react";
import dotenv from "dotenv"

dotenv.config()

export default function UrlShortener() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShortUrl("");

    try {
      const response = await fetch(`${process.env.BASE_URL}/api/longurl`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ longurl: longUrl })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      setShortUrl(data.short_url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">One Time Use URL Shortener</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter long URL"
          required
          className="w-full px-4 py-2 border rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Generating..." : "Shorten URL"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {shortUrl && (
        <p className="mt-4">Short URL: <a href={shortUrl} target="_blank" className="text-blue-600 underline">{shortUrl}</a></p>
      )}
    </div>
  );
}
