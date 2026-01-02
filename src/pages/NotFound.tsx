import { Link } from "react-router-dom";

const NotFound = () => {
  // Floating decorative elements animation
  const FloatingBubble = ({
    delay,
    size,
    left,
    top,
  }: {
    delay: number;
    size: string;
    left: string;
    top: string;
  }) => (
    <div
      className="absolute rounded-full bg-[#a8d5d8]/30 animate-float"
      style={{
        width: size,
        height: size,
        left,
        top,
        animation: `float 3s ease-in-out ${delay}s infinite`,
      }}
    />
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#f5e6d3] via-white to-[#f5e6d3] p-4 md:p-6 font-sans relative overflow-hidden">
      {/* Floating decorative bubbles */}
      <FloatingBubble delay={0} size="12px" left="10%" top="15%" />
      <FloatingBubble delay={0.5} size="8px" left="85%" top="20%" />
      <FloatingBubble delay={1} size="10px" left="15%" top="75%" />
      <FloatingBubble delay={1.5} size="14px" left="90%" top="65%" />
      <FloatingBubble delay={0.3} size="9px" left="25%" top="35%" />
      <FloatingBubble delay={0.8} size="11px" left="75%" top="45%" />
      <FloatingBubble delay={1.2} size="7px" left="50%" top="10%" />
      <FloatingBubble delay={1.7} size="13px" left="60%" top="85%" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        {/* Left Side - Text Content */}
        <div className="w-full md:w-1/2 text-left space-y-6 order-2 md:order-1">
          {/* Error label */}
          <p className="text-sm md:text-base font-medium text-gray-500 uppercase tracking-wider">
            ERROR 404
          </p>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Page not found!
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-md">
            The page you're trying to access doesn't exist or has been removed.
          </p>

          {/* Go Back Home Button */}
          <Link
            to="/"
            className="inline-block bg-black text-white font-semibold text-base md:text-lg px-8 py-4 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            Go Back Home
          </Link>
        </div>

        {/* Right Side - Mammoth Character */}
        <div className="w-full md:w-1/2 flex items-center justify-center order-1 md:order-2 relative">
          {/* Mammoth character container */}
          <div className="relative w-full max-w-md">
            {/* Mammoth illustration */}
            <img
              src="/mammoth-404.png"
              alt="Cute mammoth holding 404 sign"
              className="w-full h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-300"
            />

            {/* 404 Sign held by mammoth */}
            {/* <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 bg-white border-4 border-gray-900 rounded-lg px-6 py-4 shadow-xl">
              <p className="text-5xl md:text-6xl font-bold text-gray-900">
                404
              </p>
            </div> */}

            {/* Decorative grass/plants at bottom */}
            {/* <div className="absolute -bottom-4 left-0 right-0 flex items-end justify-center gap-4">
              <div className="w-16 h-20 bg-gradient-to-t from-[#a8d5d8] to-[#c4e5e7] rounded-t-full transform rotate-12 opacity-70" />
              <div className="w-12 h-16 bg-gradient-to-t from-[#a8d5d8] to-[#c4e5e7] rounded-t-full transform -rotate-6 opacity-60" />
            </div> */}
          </div>
        </div>
      </div>

      {/* CSS for floating animation */}
      {/* <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style> */}
    </div>
  );
};

export default NotFound;
