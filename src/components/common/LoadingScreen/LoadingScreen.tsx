import * as React from "react";

interface LoaderProps {
    size?: number;
    text?: string;
}

export const LoadingScreen: React.FC<LoaderProps> = ({ size = 180, text = "Loading" }) => {
    const letters = text.split("");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">

            <div
                className="relative flex items-center justify-center font-inter select-none"
                style={{ width: size, height: size }}
            >
                {letters.map((letter, index) => (
                    <span
                        key={index}
                        className="inline-block text-white opacity-40 animate-loaderLetter"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        {letter}
                    </span>
                ))}

                <div className="absolute inset-0 rounded-full animate-loaderCircle"></div>
            </div>

            <style jsx>{`
      @keyframes loaderCircle {
  0% {
    transform: rotate(90deg);
    box-shadow:
      0 0 15px rgba(255, 255, 255, 0.6) inset,
      0 0 30px rgba(255, 255, 255, 0.4) inset,
      0 0 45px rgba(255, 255, 255, 0.2) inset;
  }
  50% {
    transform: rotate(270deg);
    box-shadow:
      0 0 20px rgba(255, 255, 255, 0.6) inset,
      0 0 40px rgba(255, 255, 255, 0.4) inset,
      0 0 60px rgba(255, 255, 255, 0.2) inset;
  }
  100% {
    transform: rotate(450deg);
    box-shadow:
      0 0 15px rgba(255, 255, 255, 0.6) inset,
      0 0 30px rgba(255, 255, 255, 0.4) inset,
      0 0 45px rgba(255, 255, 255, 0.2) inset;
  }
}


        @keyframes loaderLetter {
          0%, 100% {
            opacity: 0.4;
            transform: translateY(0);
          }
          20% {
            opacity: 1;
            transform: scale(1.15);
          }
          40% {
            opacity: 0.7;
            transform: translateY(0);
          }
        }

        .animate-loaderCircle {
          animation: loaderCircle 5s linear infinite;
        }

        .animate-loaderLetter {
          animation: loaderLetter 3s infinite;
        }
      `}</style>
        </div>
    );
};
