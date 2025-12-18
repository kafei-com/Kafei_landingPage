import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/* =================================================
   ICONS (Reused & Adapted)
================================================== */
const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 48 48">
    <path fill="#fff" d="M44.5 20H24v8.5h11.7C34.7 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.4l6.4-6.4C33.5 5.1 28.9 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z" />
  </svg>
);

const AppleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path fill="#fff" d="M16.365 1.43c0 1.14-.93 2.07-2.07 2.07c-.04 0-.08 0-.12-.01c-.17-1.09.95-2.08 2.07-2.06c.08.13.13.28.12.44m2.06 4.36c-1.14-.07-2.1.65-2.65.65c-.56 0-1.42-.63-2.34-.61c-1.2.02-2.31.7-2.93 1.78c-1.25 2.16-.32 5.36.89 7.12c.59.86 1.29 1.82 2.21 1.79c.87-.04 1.2-.57 2.25-.57c1.05 0 1.34.57 2.26.55c.93-.02 1.51-.88 2.08-1.74c.66-.97.93-1.91.94-1.96c-.02-.01-1.8-.69-1.82-2.74c-.02-1.71 1.4-2.53 1.46-2.57c-.8-1.17-2.04-1.3-2.48-1.32m-2.1-4.36c.02.02.04.04.05.07c-.01-.03-.03-.05-.05-.07" />
  </svg>
);

const Logo = () => (
  <div className="w-16 h-16 bg-[#092c35] rounded-2xl flex items-center justify-center shadow-lg">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2z" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      <path d="M10 16c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6-6-2.7-6-6z" stroke="#fff" strokeWidth="2"/>
      <path d="M16 10v12" stroke="#fff" strokeWidth="2"/>
    </svg>
  </div>
);

/* =================================================
   SIGN UP PAGE COMPONENT
================================================== */
const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add registration logic here
    console.log("Registering:", formData);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen w-full bg-[#204e59] flex items-center justify-center p-4 overflow-hidden relative font-sans">
      
      {/* Background Decorative Gradient/Blur */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#2a6270] rounded-full blur-[100px] opacity-50 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#1a3e47] rounded-full blur-[100px] opacity-50 pointer-events-none" />

      {/* Main Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-6xl bg-[#54818e] rounded-[40px] shadow-2xl flex flex-col lg:flex-row overflow-visible"
        style={{ minHeight: "600px" }}
      >

        {/* COLUMN 1: Illustration (Left) */}
        <div className="w-full lg:w-[35%] relative flex items-center justify-center pt-10 lg:pt-0">
          {/* Using a 3D medical placeholder image similar to reference */}
          <img 
            src="https://cdn3d.iconscout.com/3d/premium/thumb/medical-prescription-4035914-3342603.png" 
            alt="3D Medical Illustration"
            className="w-[200px] lg:w-[380px] object-contain drop-shadow-2xl z-10 transform hover:scale-105 transition duration-500"
          />
          {/* Decorative pills floating behind/around - purely CSS shapes */}
          <div className="absolute top-20 left-10 w-8 h-8 bg-white/20 rounded-full blur-sm animate-pulse" />
          <div className="absolute bottom-20 right-10 w-6 h-6 bg-[#092c35]/30 rounded-full blur-sm" />
        </div>

        {/* COLUMN 2: Form (Center) */}
        <div className="w-full lg:w-[40%] flex flex-col items-center justify-center p-8 lg:p-12 z-10">
          <div className="w-full max-w-sm text-center lg:text-left">
            <h1 className="text-4xl text-white font-normal mb-2 tracking-wide">Register</h1>
            <p className="text-[#cfdee3] text-lg mb-8 font-light">Create your new account</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
               <input
                type="text"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-transparent border border-white/50 text-white rounded-full py-3.5 px-6 text-base outline-none focus:border-white focus:bg-white/5 transition placeholder:text-white/60 font-light"
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-transparent border border-white/50 text-white rounded-full py-3.5 px-6 text-base outline-none focus:border-white focus:bg-white/5 transition placeholder:text-white/60 font-light"
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-transparent border border-white/50 text-white rounded-full py-3.5 px-6 text-base outline-none focus:border-white focus:bg-white/5 transition placeholder:text-white/60 font-light"
              />

              <button
                type="submit"
                className="w-full bg-[#092c35] text-white rounded-full py-4 mt-4 font-medium text-lg hover:bg-[#0f414e] transform hover:-translate-y-0.5 transition-all shadow-lg"
              >
                Sign Up
              </button>
            </form>

            <div className="mt-8 text-center text-[#cfdee3] font-light">
               Already have an account?{' '}
              <Link to="/login" className="text-white font-medium hover:underline">
                Login
              </Link>
            </div>
          </div>
        </div>

        {/* Divider (Desktop Only) */}
        <div className="hidden lg:flex items-center justify-center">
            <div className="h-[40%] w-[1px] bg-white/20"></div>
        </div>

        {/* COLUMN 3: Social Login (Right) */}
        <div className="w-full lg:w-[25%] flex flex-col items-center justify-center p-8 lg:p-0">
          <div className="flex flex-col items-center gap-6">
            
            <div className="flex items-center w-full justify-center gap-4 lg:flex-col lg:gap-6">
              <span className="text-white/80 text-lg lg:mb-2">Login with</span>
              
              <div className="flex lg:flex-col gap-4">
                <button className="w-14 h-14 bg-[#092c35] rounded-full flex items-center justify-center hover:bg-[#0f414e] transition shadow-lg group">
                  <div className="group-hover:scale-110 transition">
                    <GoogleIcon />
                  </div>
                </button>
                
                <button className="w-14 h-14 bg-[#092c35] rounded-full flex items-center justify-center hover:bg-[#0f414e] transition shadow-lg group">
                   <div className="group-hover:scale-110 transition -mt-1">
                    <AppleIcon />
                  </div>
                </button>
              </div>
            </div>

          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default SignUpPage;