'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function CyberSecurityUI() {
  return (
    <div className="bg-black text-white min-h-screen font-orbitron">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-neon-blue animate-glow">Decentralized. Secure. Unstoppable.</h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl">
          Revolutionizing cybersecurity for the decentralized world.
        </p>
        <div className="mt-6 flex gap-4">
          <button className="btn-neon">Explore Security Protocols</button>
          <button className="btn-neon-alt">Join the Network</button>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 text-center">
        <h2 className="text-4xl text-neon-purple">Why Web3 Needs Cybersecurity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 px-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-6 border border-neon-glow rounded-lg shadow-md backdrop-blur-md"
            >
              <h3 className="text-xl text-neon-blue">{feature.title}</h3>
              <p className="mt-2 text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

const features = [
  { title: "Zero Trust Security", description: "No centralized authority. Only encrypted verification." },
  { title: "Smart Contract Protection", description: "Securing DeFi protocols and preventing exploits." },
  { title: "Decentralized ID (DID)", description: "Your data. Your control." },
  { title: "On-Chain Threat Analysis", description: "Detect and mitigate attacks in real-time." },
];
