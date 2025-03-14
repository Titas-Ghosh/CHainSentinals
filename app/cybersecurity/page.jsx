"use client";
import { useState, useEffect } from "react";

export default function Blacklist(){
    const [blacklistedWallets, setBlacklistedWallets] = useState([]);
    const [searchWallet, setSearchWallet] = useState(""); // user input
    const [searchResult, setSearchResult] = useState(null); //  search result

    useEffect(() => {
        fetch("http://127.0.0.1:8000/blacklist")
            .then((res) => res.json())
            .then((data) => setBlacklistedWallets(data.blacklisted_wallets))
            .catch((error) => console.error("Error fetching blacklist:", error));
    }, []);

    const handleSearch = () => {
        if (blacklistedWallets.includes(searchWallet)) {
            setSearchResult("🚨 This wallet is blacklisted!");
        } else {
            setSearchResult("✅ This wallet is safe.");
        }
    };

    return (
        <div>
            <h2>🚨 Blacklisted Wallets</h2>
            {blacklistedWallets.length > 0 ? (
                <ul>
                    {blacklistedWallets.map((wallet, index) => (
                        <li key={index}>{wallet}</li>
                    ))}
                </ul>
            ) : (
                <p>No blacklisted wallets yet.</p>
            )}

            <h3>🔍 Check a Wallet</h3>
            <input
                type="text"
                placeholder="Enter wallet address"
                value={searchWallet}
                onChange={(e) => setSearchWallet(e.target.value)}
            />
            <button onClick={handleSearch}>Check</button>

            {searchResult && <p>{searchResult}</p>}
        </div>
    );
};


