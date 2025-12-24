import React, { useState } from "react";
import { CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PlanCard = ({ color, category, title, description, years, cagr, delay }: any) => {
  return (
    <div 
      className={`${color} rounded-2xl md:rounded-3xl p-4 md:p-6 flex flex-col justify-between min-h-[220px] md:min-h-[280px] group cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
      style={{ animation: `fadeInUp 0.6s ease-out ${delay}s both` }}
    >
      <div>
        <p className={`text-xs font-bold tracking-widest mb-2 md:mb-3 ${color === "bg-black" ? "text-gray-400" : "text-black/60"}`}>
          {category}
        </p>
        <h3 className={`text-lg md:text-3xl font-bold mb-2 md:mb-3 ${color === "bg-black" ? "text-white" : "text-black"}`}>
          {title}
        </h3>
        <p className={`text-xs md:text-base leading-relaxed ${color === "bg-black" ? "text-gray-300" : "text-black/70"}`}>
          {description}
        </p>
      </div>

      <div className="flex items-end justify-between mt-4 md:mt-6">
        <div>
          <p className={`text-xs font-medium mb-1 ${color === "bg-black" ? "text-gray-400" : "text-black/60"}`}>
            {years}
          </p>
          <p className={`text-2xl md:text-4xl font-bold ${color === "bg-black" ? "text-white" : "text-black"}`}>
            {cagr}
          </p>
        </div>
        <button className={`p-1.5 md:p-2 rounded-lg group-hover:scale-110 transition-transform ${color === "bg-black" ? "bg-white/10 text-white hover:bg-white/20" : "bg-black/10 text-black hover:bg-black/20"}`}>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

const Wishlist = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      if (!wishlist.includes(email.trim())) {
        wishlist.push(email.trim());
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
      }

      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError("Failed to save email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const plans = [
    {
      color: "bg-black",
      category: "concnsoc",
      title: "cbibcpbcdop",
      description: "ocinoice c 0ec ci isbc cic ei c.cebc iwcioisocn dscid ibd wciubce wbciiubc",
      years: "3 year",
      cagr: "7.20%",
      delay: 0.1
    },
    {
      color: "bg-black",
      category: "cedkcoked",
      title: "dcopedb",
      description: "cbc k jcc 0;c cnkicein cie weciec iebic wbc wiciupiwb wcwcoue wbeie ewciw",
      years: "25 year",
      cagr: "14.20%",
      delay: 0.2
    },
    {
      color: "bg-black",
      category: "coioeicon",
      title: "dockodc",
      description: "ocibebc kcj ie ibicubeox wwci ibaldeibuicwei ibuwb ewopooi wibuioe jcieubw ibweiu",
      years: "1 yr returns",
      cagr: "11.20%",
      delay: 0.3
    },
    {
      color: "bg-black",
      category: "dckodc",
      title: "dindnc",
      description: "cieic ciec. iubec jieoq hc9 eueoe9uemxw ciweubcubo cw9wqu9wh9",
      years: "5 years",
      cagr: "8.20%",
      delay: 0.4
    }
  ];

  return (
    <div className="w-full bg-white md:h-screen md:overflow-hidden flex flex-col">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        /* Hide scrollbar */
        ::-webkit-scrollbar {
          display: none;
        }
        * {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Hero Section */}
      <div className="w-full md:flex-1 md:max-w-7xl md:mx-auto px-4 md:px-12 py-6 md:py-12 text-center md:flex md:flex-col md:justify-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-3 md:mb-4 text-black">
          Life Planning, Making<br />Easy to Turn Dreams a Reality.
        </h1>
        
        <p className="text-base md:text-xl text-gray-700 mb-6 md:mb-8">
          Get Notifed when we launch.
        </p>

        {/* Email Signup */}
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 md:gap-4 max-w-2xl mx-auto mb-6 md:mb-8 relative">
          <div className="flex-1 relative">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="absolute -top-12 md:-top-14 left-0 right-0 mx-auto w-fit bg-red-500/90 backdrop-blur-sm text-white text-xs px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg"
              >
                <AlertCircle size={16} />
                <span>{error}</span>
              </motion.div>
            )}
            
            <AnimatePresence>
              {submitted && (
                <>
                  {/* Backdrop */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 pointer-events-none"
                  />
                  
                  {/* Toast */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full flex justify-center px-4"
                  >
                    <div className="relative bg-white rounded-2xl shadow-2xl border-2 border-green-500 p-6 md:p-8 w-[90vw] max-w-[420px]">
                      {/* Confetti Effect */}
                      <div className="absolute inset-0 overflow-hidden rounded-2xl">
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 1, y: -20, x: 0 }}
                            animate={{ opacity: 0, y: 80, x: (i - 3.5) * 40 }}
                            transition={{ duration: 2.5, delay: i * 0.08 }}
                            className="absolute w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: ["#10b981", "#34d399", "#6ee7b7", "#a7f3d0"][i % 4],
                              left: `${15 + i * 10}%`,
                              top: "-20px"
                            }}
                          />
                        ))}
                      </div>

                      {/* Content */}
                      <div className="relative flex flex-col items-center text-center">
                        <motion.div 
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
                          className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mb-4"
                        >
                          <CheckCircle size={32} className="text-white" />
                        </motion.div>

                        <motion.h3 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1, duration: 0.4 }}
                          className="text-xl md:text-2xl font-bold text-gray-900 mb-2"
                        >
                          Perfect! 🎉
                        </motion.h3>
                        <motion.p 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15, duration: 0.4 }}
                          className="text-sm md:text-base text-gray-600"
                        >
                          We'll notify you when we launch
                        </motion.p>
                      </div>

                      {/* Progress Bar */}
                      <motion.div
                        animate={{ width: ["100%", "0%"] }}
                        transition={{ duration: 5, ease: "linear" }}
                        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-emerald-600 rounded-b-2xl"
                      />
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading || submitted}
              className="w-full px-4 md:px-5 py-2.5 md:py-3 rounded-full border-2 border-black text-sm md:text-base placeholder-gray-500 focus:outline-none focus:border-black/50 disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={loading || submitted}
            className="px-6 md:px-8 py-2.5 md:py-3 bg-black text-white rounded-full font-bold text-sm md:text-base hover:bg-gray-800 transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {loading ? (
              <svg className="animate-spin h-4 w-4 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Featured Plans Section */}
        <div className="mt-4 md:mt-6">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className="text-xl md:text-3xl font-bold text-black">Featured Plans</h2>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {plans.map((plan, idx) => (
              <PlanCard key={idx} {...plan} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Wishlist;
