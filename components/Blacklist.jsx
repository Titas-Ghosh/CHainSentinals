"use client";  // ✅ Required for React components in Next.js App Router

import { useEffect, useState } from "react";

const Blacklist = () => {
    const [blacklistedWallets, setBlacklistedWallets] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/blacklist")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                console.log("Fetched data:", data);
                setBlacklistedWallets(data.blacklisted_wallets || []);
            })
            .catch((err) => console.error("Fetch error:", err));
    }, []);

    return (
        <div className="blacklist-container">
            <h2>🚨 Blacklisted Wallets</h2>
            {blacklistedWallets.length === 0 ? (
                <p>No blacklisted wallets yet.</p>
            ) : (
                <ul>
                    {blacklistedWallets.map((wallet, index) => (
                        <li key={index}>{wallet}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Blacklist;
