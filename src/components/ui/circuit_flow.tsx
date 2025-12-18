"use client";
import { cn } from "../../lib/utils";
// import React from "react";

export interface CpuFlowBackgroundProps {
  className?: string;
  width?: string;
  height?: string;
}

const CpuFlowBackground = ({
  className,
  width = "100%",
  height = "100%",
}: CpuFlowBackgroundProps) => {
  const paths = [
    "M 10 20 h 79.5 q 5 0 5 5 v 30",
    "M 180 10 h -69.7 q -5 0 -5 5 v 30",
    "M 130 20 v 21.8 q 0 5 -5 5 h -10",
    "M 170 80 v -21.8 q 0 -5 -5 -5 h -50",
    "M 135 65 h 15 q 5 0 5 5 v 10 q 0 5 -5 5 h -39.8 q -5 0 -5 -5 v -20",
    "M 94.8 95 v -36",
    "M 88 88 v -15 q 0 -5 -5 -5 h -10 q -5 0 -5 -5 v -5 q 0 -5 5 -5 h 14",
    "M 30 30 h 25 q 5 0 5 5 v 6.5 q 0 5 5 5 h 20",
  ];

  const colors = [
    "#00E8ED", // Cyan
    "#FFD800", // Yellow
    "#FF008B", // Pink
    "#FFFFFF", // White
    "#22c55e", // Green
    "#f97316", // Orange
    "#06b6d4", // Light Blue
    "#f43f5e", // Rose
  ];

  return (
    <svg
      className={cn("text-muted", className)}
      width={width}
      height={height}
      viewBox="0 0 200 100"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Create soft glowing gradients for each color */}
        {colors.map((color, i) => (
          <radialGradient key={i} id={`grad-${i}`} fx="0.5" fy="0.5" r="0.8">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="40%" stopColor={color} stopOpacity="0.6" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        ))}
      </defs>

      {paths.map((d, i) => (
        <g key={i}>
          {/* Animated line */}
          <path
            id={`path-${i}`}
            d={d}
            stroke={`url(#grad-${i})`}
            strokeWidth="0.35"
            fill="none"
            strokeDasharray="100"
            strokeDashoffset="100"
            opacity="0.8"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="100;0"
              dur="2.5s"
              repeatCount="indefinite"
              begin={`${i * 0.2}s`}
            />
          </path>

          {/* Smaller glowing moving ball */}
          <circle r="0.7" fill={`url(#grad-${i})`} opacity="0.95">
            <animateMotion
              dur="2.5s"
              repeatCount="indefinite"
              begin={`${i * 0.2}s`}
              rotate="auto"
            >
              <mpath href={`#path-${i}`} />
            </animateMotion>
          </circle>
        </g>
      ))}
    </svg>
  );
};

export { CpuFlowBackground };
