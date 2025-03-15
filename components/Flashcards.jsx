"use client";

import { motion } from "framer-motion";


export default function Flashcards() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#080A0C] text-white px-8 ">
      
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-12 mb-16">
        
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-[90%] h-[300px] md:h-[400px] bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg">
          <img src="/cybersecurity.webp" alt="" />
          </div>
        </div>
        
        
        <div className="w-full md:w-1/2 text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide text-white mb-4">
            Chain Sentinel: The Future of Web3 Security
          </h2>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-4">
            As blockchain technology advances, so do cyber threats. Chain Sentinel is built to safeguard decentralized networks with cutting-edge security solutions, ensuring data integrity and smart contract safety.
          </p>
          <p className="text-lg text-gray-400 leading-relaxed mb-4">
            From real-time AI-driven threat detection to automated smart contract audits, we provide a comprehensive security layer for the Web3 ecosystem.
          </p>
          <p className="text-lg text-gray-400 leading-relaxed">
            Stay ahead of malicious actors with decentralized encryption, robust anomaly detection, and proactive security audits.
          </p>
        </div>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full max-w-6xl">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="glass-card rounded-2xl border border-white/20 backdrop-blur-xl bg-white/10 shadow-xl p-10 h-auto"
          >
            <h3 className="text-2xl font-semibold mb-2 text-white">
              {feature.title}
            </h3>
            <p className="text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Feature content
const features = [
    {
      title: "Decentralized Encryption",
      description: "End-to-end encryption ensures that user data remains secure across decentralized applications. By leveraging blockchain-based cryptographic techniques, sensitive information is protected from unauthorized access, making it nearly impossible for hackers to decrypt data without proper authorization."
    },
    {
      title: "AI Threat Detection",
      description: "Real-time artificial intelligence continuously monitors and analyzes blockchain transactions and smart contract interactions to detect anomalies, fraud attempts, and vulnerabilities before they can be exploited. This proactive approach helps prevent cyber threats before they materialize."
    },
    {
      title: "Smart Contract Audits",
      description: "Automated and manual smart contract audits help identify security loopholes, coding errors, and vulnerabilities that could lead to exploits like reentrancy attacks or unauthorized fund withdrawals. These audits ensure that decentralized applications run securely and efficiently."
    },
    {
      title: "Zero-Knowledge Proofs",
      description: "Zero-knowledge proof cryptography enables transactions and identity verifications without revealing sensitive user data. This ensures privacy in Web3 applications while maintaining trust and compliance with security standards, eliminating the need for third-party intermediaries."
    },
    {
      title: "Multi-Signature Authentication",
      description: "A multi-signature (multi-sig) authentication system requires multiple authorized signatures before approving critical blockchain transactions. This significantly reduces the risk of unauthorized fund transfers, phishing attacks, and wallet breaches by distributing security among multiple parties."
    },
    {
      title: "Secure Node Infrastructure",
      description: "Protecting blockchain nodes from DDoS attacks and malicious takeovers is essential for maintaining network integrity. Secure node infrastructure ensures that decentralized systems remain resilient against cyber threats by implementing redundancy, encryption, and access control mechanisms."
    }
  ];
  
