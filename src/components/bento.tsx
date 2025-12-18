import Features from "./ui/features-8";
import Threads from "./ui/Threads";

export const Bento = () => {
  return (
    <section className="relative w-full py-20 bg-black flex flex-col items-center overflow-hidden">
      {/* Full-width animated background */}
      <div className="absolute inset-0 z-0">
        <Threads />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 w-11/12 max-w-7xl">
        <Features />
      </div>
    </section>
  );
};
