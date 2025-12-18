import React from "react";

interface OrbitingItemProps {
  image: string;
  alt: string;
  size: number;
  distance: number;
  duration: string;
  delay: string;
}

const OrbitingItem = ({
  image,
  alt,
  size,
  distance,
  duration,
  delay,
}: OrbitingItemProps) => {
  const style: React.CSSProperties = {
    "--distance": `${distance}px`,
    "--duration": duration,
    "--delay": delay,
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: delay,
  } as React.CSSProperties;

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-orbit"
      style={style}
    >
      <img src={image} alt={alt} className="w-full h-full object-contain" />
    </div>
  );
};

export default OrbitingItem;
