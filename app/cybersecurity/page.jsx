'use client';
import { useEffect, useState } from "react";
import axios from "axios";

// Use environment variables to switch URLs
const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000/ws/transactions";
const BLACKLIST_API = process.env.NEXT_PUBLIC_BLACKLIST_API || "http://localhost:8000/blacklisted_list";


function Blacklisted() {
  const [transactions, setTransactions] = useState([]);
  const [blacklist, setBlacklist] = useState([]);
  const [view, setView] = useState("transactions"); // Toggle between Transactions & Blacklist

  useEffect(() => {
    const socket = new WebSocket(WS_URL);

    socket.onmessage = (event) => {
      try {
        const newTransactions = JSON.parse(event.data);
        console.log("🔍 Incoming Transactions:", newTransactions); // Debugging
        setTransactions((prev) => [...newTransactions, ...prev]);
      } catch (error) {
        console.error("❌ Error parsing WebSocket data:", error);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    fetchBlacklist();
  }, []);

  const fetchBlacklist = async () => {
    try {
      const { data } = await axios.get(BLACKLIST_API);
      setBlacklist(data);
    } catch (error) {
      console.error("❌ Error fetching blacklist:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">🛡️ Ethereum Fraud Detection</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setView("transactions")}
          className={`px-4 py-2 rounded ${view === "transactions" ? "bg-blue-600" : "bg-gray-700"}`}>
          Transactions
        </button>
        <button
          onClick={() => setView("blacklist")}
          className={`px-4 py-2 rounded ${view === "blacklist" ? "bg-red-600" : "bg-gray-700"}`}>
          Blacklist
        </button>
      </div>

      {view === "transactions" ? (
        <TransactionTable transactions={transactions} />
      ) : (
        <BlacklistTable blacklist={blacklist} fetchBlacklist={fetchBlacklist} />
      )}
    </div>
  );
}

// TransactionTable and BlacklistTable remain unchanged

export default Blacklisted;
