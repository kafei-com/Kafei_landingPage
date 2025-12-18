"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { AnomalousMatterHero } from "./ui/anomalous";
import { Marquee } from "./ui/marquee";

const heroTexts = [
    {
        title: "Hyperspeed Running",
        description: "Experience the real magic of hyperspeed with dynamic motion and energy.",
    },
    {
        title: "Performance",
        description: "Built for speed, designed for endurance — feel the power of innovation.",
    },
    {
        title: "Limitless Motion",
        description: "Push your boundaries and reach hyperspeed velocity with style and precision.",
    },
];

// marquee logos and texts
const logos = [
  { name: "Google", src: "/logos/" },
  { name: "Microsoft", src: "/logos/microsoft.png" },
  { name: "TCS", src: "/logos/tcs.png" },
  { name: "Infosys", src: "/logos/infosys.png" },
  { name: "Accenture", src: "/logos/accenture.png" },
  { name: "Deloitte", src: "/logos/deloitte.png" },
  { name: "Capgemini", src: "/logos/capgemini.png" },
  { name: "IBM", src: "/logos/ibm.png" },
];


const Hero = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % heroTexts.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const { title, description } = heroTexts[index];

    return (
        <section className="relative w-full min-h-screen flex flex-col md:flex-row items-center justify-center bg-black overflow-hidden">
            {/* TEXT SIDE */}
            <div className="relative z-10 order-2 md:order-1 w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left px-6 sm:px-8 md:pl-20 py-10 md:py-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 80 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -80 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-[0_0_15px_rgba(0,255,100,0.3)]">
                            {title}
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-white/80 mt-3 sm:mt-4 leading-relaxed max-w-[600px]">
                            {description}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ANIMATION SIDE */}
            <div className="relative order-1 md:order-2 w-full md:w-1/2 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="w-full h-[60vh] sm:h-[70vh] md:h-screen flex items-center justify-center"
                >
                    <AnomalousMatterHero />
                </motion.div>
            </div>

            {/* GRADIENT OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent md:hidden pointer-events-none" />

            {/* MARQUEE */}
            <div className="absolute bottom-0 w-full">
                <Marquee pauseOnHover speed={30} className="bg-black/40 py-4">
                    {logos.map((logo, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-center mx-10 opacity-80 hover:opacity-100 transition"
                        >
                            <img
                                src={logo.src}
                                alt={logo.name}
                                className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                            />
                        </div>
                    ))}
                </Marquee>
            </div>

        </section>
    );
};

export default Hero;
