"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const InteractiveCharacterPolished = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [blink, setBlink] = useState(false);

  // Emotion State: "neutral", "happy", "suspicious", "surprised", "love"
  const [emotion, setEmotion] = useState("neutral");

  // Mouse Tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const x = (e.clientX - centerX) / (window.innerWidth / 2);
      const y = (e.clientY - centerY) / (window.innerHeight / 2);
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Blinking Logic
  useEffect(() => {
    const blinkLoop = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
      const nextBlink = Math.random() * 4000 + 2000;
      setTimeout(blinkLoop, nextBlink);
    };
    const timeoutId = setTimeout(blinkLoop, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  // Idle Emotion Cycling
  useEffect(() => {
    if (isHovered) return; // Don't cycle if user is interacting

    // Added "funny" to the roster
    const emotions = ["neutral", "suspicious", "surprised", "happy", "funny"];
    const cycleEmotions = () => {
      const randomEmotion =
        emotions[Math.floor(Math.random() * emotions.length)];
      setEmotion(randomEmotion);

      // Stay in this mood for a random time
      const nextChange = Math.random() * 5000 + 3000;
      setTimeout(cycleEmotions, nextChange);
    };

    const timeoutId = setTimeout(cycleEmotions, 3000);
    return () => clearTimeout(timeoutId);
  }, [isHovered]);

  // Reactive Emotions
  useEffect(() => {
    if (isClicking) {
      setEmotion("surprised");
    } else if (isHovered) {
      setEmotion("love");
    } else {
      setEmotion("neutral"); // Reset to neutral immediately on leave, idle loop will pick up
    }
  }, [isHovered, isClicking]);

  // Movement Dampening
  const headX = mousePosition.x * 15;
  const headY = mousePosition.y * 10;
  const eyeX = mousePosition.x * 20;
  const eyeY = mousePosition.y * 15;

  // --- EYE SHAPE DEFINITIONS ---

  // Simplified paths for smoother morphing (keeping mostly rect-based control points for simplicity or swapping distinct shapes)
  // Actually, for Framer Motion layoutId or d-path morphing, distinct paths are fine if vertex counts match reasonably,
  // but here we might switch render strategies. Let's use specific SVG shapes for complex emotions.

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-[#050505] overflow-hidden font-sans">
      <motion.div
        className="relative transition-transform duration-500 ease-out cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsClicking(true)}
        onMouseUp={() => setIsClicking(false)}
        animate={{ scale: isClicking ? 0.95 : 1 }}
      >
        <svg
          viewBox="0 0 400 400"
          className="w-[400px] h-[400px] drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          style={{ overflow: "visible" }}
        >
          {/* --- DEFS --- */}
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* --- ANTENNA --- */}
          <motion.g
            style={{ originX: "100px", originY: "100px", x: headX, y: headY }}
            animate={{
              rotate:
                emotion === "happy" || emotion === "love"
                  ? [0, -10, 5, -5, 0]
                  : emotion === "funny"
                  ? [0, 20, -20, 10, -10, 0] // Wild spinning for funny
                  : 0,
            }}
            transition={{
              duration: emotion === "funny" ? 0.5 : 0.6,
              repeat: Infinity,
              repeatDelay: emotion === "funny" ? 0 : 1,
            }}
          >
            <path
              d="M105 105 L90 80 L90 60 L75 45"
              fill="none"
              stroke="#E5E5E5"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <motion.circle
              cx="75"
              cy="40"
              r="7"
              animate={{
                fill:
                  emotion === "love"
                    ? "#ec4899"
                    : emotion === "suspicious"
                    ? "#f59e0b"
                    : emotion === "funny"
                    ? "#8b5cf6"
                    : "#E5E5E5",
              }}
            />
          </motion.g>

          {/* --- SIDE BUMPERS (Ears) --- */}
          <motion.g style={{ x: headX * 0.5, y: headY * 0.5 }}>
            <path
              d="M50 160 L50 210"
              stroke="#525252"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M350 160 L350 210"
              stroke="#525252"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
            />
          </motion.g>

          {/* --- MAIN HEAD SHAPE --- */}
          <motion.path
            d="M120 100 L280 100 L320 140 L320 240 L280 280 L120 280 L80 240 L80 140 Z"
            fill="#0a0a0a"
            stroke="#E5E5E5"
            strokeWidth="16"
            strokeLinejoin="round"
            style={{ x: headX, y: headY }}
          />

          {/* --- EYES CONTAINER --- */}
          <motion.g style={{ x: eyeX, y: eyeY }}>
            {/* 1. LEFT EYE PATCH */}
            <path
              d="M110 150 L160 140 L190 150 L195 210 L180 240 L120 250 L100 200 Z"
              fill="#262626"
              stroke="none"
            />

            {/* 2. THE 'X' EYE (Animated) */}
            <g transform="translate(145, 195)">
              <motion.g
                animate={{
                  rotate:
                    emotion === "love"
                      ? 45
                      : emotion === "suspicious"
                      ? 15
                      : emotion === "funny"
                      ? [0, 360]
                      : 0,
                  scale: emotion === "surprised" ? 1.3 : 1,
                }}
                transition={
                  emotion === "funny"
                    ? { duration: 1, repeat: Infinity, ease: "linear" }
                    : {}
                }
              >
                <line
                  x1="-15"
                  y1="-15"
                  x2="15"
                  y2="15"
                  stroke={
                    emotion === "love"
                      ? "#ec4899"
                      : emotion === "funny"
                      ? "#8b5cf6"
                      : "#E5E5E5"
                  }
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <line
                  x1="15"
                  y1="-15"
                  x2="-15"
                  y2="15"
                  stroke={
                    emotion === "love"
                      ? "#ec4899"
                      : emotion === "funny"
                      ? "#8b5cf6"
                      : "#E5E5E5"
                  }
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </motion.g>
            </g>

            {/* 3. RIGHT EYE (The Expressive One) */}
            <g transform="translate(230, 170)">
              {/* Backing Glow */}
              <motion.rect
                width="25"
                height="40"
                rx="4"
                x="-2.5"
                y="-2.5"
                fill={
                  emotion === "love"
                    ? "#ec4899"
                    : emotion === "funny"
                    ? "#8b5cf6"
                    : "#3b82f6"
                }
                className="opacity-20"
              />

              {/* The Actual Eye Shape */}
              {emotion === "love" ? (
                /* Heart Shape for Love */
                <motion.path
                  d="M10 5 Q15 0 20 5 T20 20 L10 32 L0 20 Q0 0 10 5"
                  fill="#ec4899"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                />
              ) : (
                /* Morphing Rect/Circle/Slit */
                <motion.path
                  fill={
                    emotion === "suspicious"
                      ? "#f59e0b"
                      : emotion === "funny"
                      ? "#8b5cf6"
                      : "#3b82f6"
                  }
                  animate={{
                    d:
                      emotion === "happy"
                        ? "M0 15 Q10 5 20 15 V35 H0 Z" // Happy arch
                        : emotion === "suspicious"
                        ? "M0 12 H20 V22 H0 Z" // Thin slit
                        : emotion === "surprised"
                        ? "M10 0 A10 10 0 0 1 10 35 A10 10 0 0 1 10 0" // Open circle
                        : emotion === "funny"
                        ? "M5 0 A10 10 0 0 1 5 35 A5 10 0 0 1 5 0" // Squashed oval
                        : "M0 0 H20 V35 H0 Z", // Neutral Rect (default)
                    scaleY: blink ? 0.1 : 1,
                    y: emotion === "funny" ? [0, -5, 0] : 0, // Bounce in funny mode
                  }}
                  transition={{
                    d: { duration: 0.3 },
                    scaleY: { duration: 0.1 },
                    y: { duration: 0.5, repeat: Infinity },
                  }}
                />
              )}
            </g>
          </motion.g>

          {/* --- MOUTH --- */}
          <motion.path
            fill={emotion === "funny" ? "#ef4444" : "none"} // Fill red tongue for funny
            stroke={emotion === "funny" ? "none" : "#E5E5E5"}
            strokeWidth={emotion === "funny" ? "0" : "6"}
            strokeLinecap="round"
            style={{ x: headX, y: headY }}
            animate={{
              d:
                emotion === "happy" || emotion === "love"
                  ? "M160 245 Q200 270 240 245" // Smile
                  : emotion === "surprised"
                  ? "M190 245 Q200 260 210 245" // O-mouth small
                  : emotion === "suspicious"
                  ? "M170 250 L230 245" // Crooked line
                  : emotion === "funny"
                  ? "M180 250 Q200 280 220 250" // Tongue out!
                  : "M160 250 Q200 250 240 250", // Neutral
            }}
            transition={{ duration: 0.3 }}
          />
        </svg>

        {/* --- STATUS UI --- */}
        <motion.div
          className="absolute -bottom-16 left-0 right-0 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <motion.span
              className={`w-2 h-2 rounded-full`}
              animate={{
                backgroundColor:
                  emotion === "love"
                    ? "#ec4899"
                    : emotion === "suspicious"
                    ? "#f59e0b"
                    : emotion === "funny"
                    ? "#8b5cf6"
                    : "#22c55e",
                opacity: [1, 0.5, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-mono text-gray-400 text-sm tracking-[0.2em] uppercase">
              {emotion === "love"
                ? "LOVE_MODE"
                : emotion === "suspicious"
                ? "ANALYZING"
                : emotion === "surprised"
                ? "ALERT"
                : emotion === "funny"
                ? "BRAIN_FREEZE"
                : "SYSTEM_ONLINE"}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
