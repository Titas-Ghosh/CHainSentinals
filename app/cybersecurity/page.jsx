'use client';
import { useEffect, useState } from "react";
import axios from "axios";

const WS_URL = "ws://localhost:8000/ws/transactions";
const BLACKLIST_API = "http://localhost:8000/blacklisted_list";

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

const TransactionTable = ({ transactions }) => (
  <div className="w-full max-w-3xl text-white">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-700">
          <th className="p-3 text-left">Sender</th>
          <th className="p-3 text-left">Amount (ETH)</th>
          <th className="p-3 text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        {transactions.length === 0 ? (
          <tr>
            <td colSpan="3" className="text-center p-4 text-gray-400">
              No transactions yet...
            </td>
          </tr>
        ) : (
          transactions.map((tx, index) => (
            <tr
              key={index}
              className={`border-b ${tx.status === "Suspicious" ? "bg-red-500" : "bg-gray-800"}`}>
              <td className="p-3 truncate">{tx.sender}</td>
              <td className="p-3">{tx.amount}</td>
              <td className="p-3 font-bold">{tx.status}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

const BlacklistTable = ({ blacklist, fetchBlacklist }) => (
  <div className="w-full max-w-3xl">
    <div className="flex justify-between mb-4">
      <h2 className="text-2xl font-bold">🚫 Blacklisted Wallets</h2>
      <button
        onClick={fetchBlacklist}
        className="px-4 py-2 bg-red-500 text-white rounded">
        Refresh 🔄
      </button>
    </div>

    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-700">
          <th className="p-3 text-left">Wallet Address</th>
        </tr>
      </thead>
      <tbody>
        {blacklist.length === 0 ? (
          <tr>
            <td className="text-center p-4 text-gray-400">No blacklisted wallets.</td>
          </tr>
        ) : (
          blacklist.map((wallet, index) => (
            <tr key={index} className="border-b bg-red-600">
              <td className="p-3">{wallet}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default Blacklisted;
