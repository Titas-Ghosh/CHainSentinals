import Globe from "./Globe";

import { useRouter } from "next/navigation";

export default function Hero() {
  const router=useRouter();
  return (
    
    <section className="h-screen flex flex-col items-center justify-center bg-black ">
      <h2 className="text-4xl md:text-6xl font-bold text-center font-exo text-gray-200 tracking-wide">
        CHAIN SENTINEL
      </h2>
      <button
        onClick={() => router.push("/cybersecurity")}
        className="mt-6 bg-blue-500 px-6 py-2 text-white rounded-md hover:bg-blue-700"
      >
        Check Wallet Security
      </button>

      <Globe />
    
    </section>
  );
}
