"use client";
import { useState } from "react";

export default function CyberSecuritySection() {
  const [walletAddress, setWalletAddress] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckWallet = async () => {
    if (!walletAddress) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`http://127.0.0.1:8000/check_wallet/${walletAddress}`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Error fetching wallet data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#080A0C] text-white px-8">
      <h2 className="text-4xl font-extrabold mb-6">Check Wallet Security</h2>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Enter Wallet Address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          className="p-2 text-black rounded-md"
        />
        <button
          onClick={handleCheckWallet}
          className="bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-700"
        >
          {loading ? "Checking..." : "Check"}
        </button>
      </div>

      {/* Display Results */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {result && (
        <div className="mt-6 bg-gray-900 p-4 rounded-md">
          <p><strong>Wallet:</strong> {result.wallet}</p>
          <p><strong>Status:</strong> {result.status}</p>
          <p><strong>Risk Level:</strong> {result.risk}</p>
        </div>
      )}
    </section>
  );
}
