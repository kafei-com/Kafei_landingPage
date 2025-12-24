import React from 'react';

interface CTAProps {
    heading?: string;
    subHeading?: string;
    buttonText?: string;
    onButtonClick?: () => void;
}

const CTAComponent: React.FC<CTAProps> = ({
    heading = "Ready to transform your Idea?",
    subHeading = "cdcodigco;dicd ocgi dcgowdcw ewegcecewcieufcwcleco eci",
    buttonText = "Start for free",
    onButtonClick,
}) => {
    return (
        <div className="flex w-full items-center justify-center p-4 md:p-8 min-h-[600px]  relative overflow-hidden">

            <div className="relative w-full max-w-6xl overflow-hidden rounded-[2.5rem] bg-black/20 shadow-2xl shadow-white ">
                <div className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 h-[400px] w-3/4 translate-y-[40%] bg-white/90 blur-[80px] rounded-full mix-blend-screen" />

                {/* Content Wrapper */}
                <div className="relative z-10 flex flex-col items-center justify-center px-6 py-20 text-center md:py-32">

                    {/* Heading */}
                    <h2 className="max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-5xl">
                        {heading}
                    </h2>

                    {/* Subheading */}
                    <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-400 md:text-xl">
                        {subHeading}
                    </p>

                    {/* Button */}
                    <button
                        onClick={onButtonClick}
                        className="group mt-10 inline-flex items-center justify-center rounded-xl bg-white px-8 py-3 text-base font-semibold text-black transition-all duration-200 hover:bg-gray-100 hover:scale-105 active:scale-95"
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CTAComponent;