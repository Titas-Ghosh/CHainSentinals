import Globe from "./Globe";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col items-center justify-center bg-black ">
      <h2 className="text-4xl md:text-6xl font-bold text-center font-exo text-gray-200 tracking-wide">
        CHAIN SENTINEL
      </h2>

      <Globe />
    </section>
  );
}
