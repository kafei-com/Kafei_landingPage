import React from "react";
import { Instagram, Linkedin, Github } from "lucide-react";

// Link Data Configuration
const footerLinks = {
  product: [
    { label: "Features", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Integrations", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "Tutorials", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Support", href: "#" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Partners", href: "#" },
  ],
};

const Footer: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden font-sans">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, 0px); }
          50% { transform: translate(-50%, -20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Main Footer Card */}
      <div className="relative z-10 w-full max-w-[1200px] bg-black shadow-white rounded-[2.5rem] shadow-xl p-8 md:p-12 lg:p-16">
        {/* Background Watermark */}
        <div className="absolute top-[200px] left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-0 hidden md:block ">
          <span className="text-[20vw] font-bold text-gray-200/20 tracking-tighter mix-blend-overlay">
            Kafei
          </span>
        </div>
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-24">
          {/* Brand Column */}
          <div className="flex flex-col max-w-sm">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              {/* Logo Icon  */}
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 group-hover:from-white group-hover:via-blue-200 group-hover:to-blue-400 transition-all duration-300 tracking-tight">
                  Kafei
                </span>
              </div>
            </div>

            <p className="text-gray-500 text-[15px] leading-relaxed mb-8">
              cbwc;eowic;oewibce ceoceive o coewio;cwe cce gweiudwdwo;dw
              dfgeiufeidowdg qw d dw g dwdgi wdwgdiqwd dgw dwd wd
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-5 text-gray-400">
              {/* X / Twitter Icon */}
              <a
                href="#"
                className="hover:text-white hover:scale-125 transition-all duration-300 ease-out hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.244 2.25H21.552L14.325 10.51L22.827 21.75H16.17L10.956 14.933L4.99003 21.75H1.68003L9.41003 12.515L1.25403 2.25H8.08003L12.793 8.48101L18.244 2.25ZM17.083 19.77H18.916L7.08403 4.126H5.11703L17.083 19.77Z" />
                </svg>
              </a>
              <a
                href="#"
                className="hover:text-white hover:scale-125 transition-all duration-300 ease-out hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
              >
                <Instagram size={20} strokeWidth={2.2} />
              </a>
              <a
                href="#"
                className="hover:text-white hover:scale-125 transition-all duration-300 ease-out hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
              >
                <Linkedin
                  size={20}
                  strokeWidth={2.2}
                  fill="currentColor"
                  className="stroke-none"
                />
              </a>
              <a
                href="#"
                className="hover:text-white hover:scale-125 transition-all duration-300 ease-out hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
              >
                <Github size={20} strokeWidth={2.2} />
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 lg:gap-20 flex-1 lg:justify-end">
            {/* Product */}
            <div>
              <h3 className="font-semibold text-white mb-5">Product</h3>
              <ul className="flex flex-col gap-3.5">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-500 hover:text-white hover:translate-x-2 inline-block transition-all duration-300 text-[15px]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-white mb-5">Resources</h3>
              <ul className="flex flex-col gap-3.5">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-500 hover:text-white hover:translate-x-2 inline-block transition-all duration-300 text-[15px]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-white mb-5">Company</h3>
              <ul className="flex flex-col gap-3.5">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-500 hover:text-white hover:translate-x-2 inline-block transition-all duration-300 text-[15px]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-10" />

        {/* Bottom Section */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
          <p>© 2025 Kafei. All rights reserved.</p>

          <div className="flex items-center gap-8">
            <a
              href="#"
              className="hover:text-white hover:underline underline-offset-4 transition-all"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-white hover:underline underline-offset-4 transition-all"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-white hover:underline underline-offset-4 transition-all"
            >
              Cookies Settings
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
