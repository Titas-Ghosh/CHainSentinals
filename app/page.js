'use client';
import Hero from "../components/Hero";
import Flashcards from "../components/Flashcards";
import Link from "next/link";
import Globe from "../components/Globe";

const Homepage = () => {
  return (
    <main className="bg-black text-white flex flex-col gap-10">
      <Hero />
      <Globe />
      <Flashcards />

      
       
      
    </main>
  );
};

export default Homepage;
