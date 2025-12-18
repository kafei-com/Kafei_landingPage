import React from "react";
import OrbitingItem from "./OrbitingItem";
import Robot from "./Robot";

import controller from "../../assets/controller.png";
import rubiksCube from "../../assets/controller.png";
import coins from "../../assets/controller.png";
import lightning from "../../assets/controller.png";
import wires from "../../assets/controller.png";
import gem from "../../assets/controller.png";

export default function AnimationContainer() {
  return (
    <div className="relative w-full max-w-[80%] h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Green concentric circles */}
      <div className="absolute border border-green-400/50 rounded-full w-[300px] h-[300px] md:w-[400px] md:h-[400px]" />
      <div className="absolute border border-green-400/50 rounded-full w-[450px] h-[450px] md:w-[600px] md:h-[600px]" />
      <div className="absolute border border-green-400/50 rounded-full w-[600px] h-[600px] md:w-[800px] md:h-[800px]" />

      <Robot />

      <OrbitingItem image={controller} alt="Controller" size={100} distance={220} duration="15s" delay="0s" />
      <OrbitingItem image={rubiksCube} alt="Rubik's Cube" size={90} distance={300} duration="20s" delay="-5s" />
      <OrbitingItem image={coins} alt="Coins" size={80} distance={350} duration="25s" delay="-10s" />
      <OrbitingItem image={lightning} alt="Lightning" size={60} distance={180} duration="12s" delay="-18s" />
      <OrbitingItem image={wires} alt="Wires" size={80} distance={380} duration="18s" delay="-3s" />
      <OrbitingItem image={gem} alt="Gem" size={40} distance={150} duration="10s" delay="-8s" />
    </div>
  );
}
