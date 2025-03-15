import Globe from "./Globe";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="flex flex-col items-center justify-center bg-black relative mt-10">
      
      {/* Tagline */}
      

      <div className="flex flex-col items-center justify-center gap-4 mt-10">
        
        {/* Title - CHAIN SENTINEL */}
        <h2 className="text-4xl md:text-6xl font-bold font-exo text-gray-200 tracking-wide text-center">
          CHAIN SENTINEL
        </h2>
        <h3 className=" top-10 text-lg md:text-2xl font-exo text-gray-400 tracking-wide animate-pulse text-center">
        Keeping the blockchain secure, one transaction at a time.
      </h3>

        {/* Button */}
        <button
          onClick={() => router.push("/cybersecurity")}
          className="bg-blue-500 px-6 py-2 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Check Wallet Security
        </button>
        
      </div>

      
     
    
    </section>
  );
}
