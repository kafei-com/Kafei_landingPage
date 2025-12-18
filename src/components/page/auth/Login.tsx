import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// --- 1. gretting  messages here will change every time if the user wil refresh the screen ---
const GREETING_MESSAGES = [
  "Welcome! Back",
  "Hello Again!",
  "Missed You!",
  "Good to See You",
  "Ready to Start?",
  "Let's Get Going",
  "Welcome Home",
  "Greetings, Hero"
];

const GoogleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.4l6.4-6.4C33.5 5.1 28.9 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 17.1 19.2 14 24 14c2.7 0 5.2.9 7.2 2.4l6.4-6.4C33.5 5.1 28.9 3 24 3 15.6 3 8.2 8.5 6.3 14.7z"/><path fill="#FBBC05" d="M24 44c5.8 0 10.7-1.9 14.3-5.1l-6.6-5.4C29.7 35.1 27 36 24 36c-5.7 0-10.6-3.7-12.3-8.9l-7 5.4C8.2 39.5 15.6 44 24 44z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.1 5.5-7.7 5.5-2.2 0-4.2-.7-5.7-2l-7 5.4C15.1 40.9 19.2 44 24 44c6.6 0 12-5.4 12-12 0-.8-.1-1.5-.2-2.2z"/></g></svg>
);
const AppleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M16.365 1.43c0 1.14-.93 2.07-2.07 2.07c-.04 0-.08 0-.12-.01c-.17-1.09.95-2.08 2.07-2.06c.08.13.13.28.12.44m2.06 4.36c-1.14-.07-2.1.65-2.65.65c-.56 0-1.42-.63-2.34-.61c-1.2.02-2.31.7-2.93 1.78c-1.25 2.16-.32 5.36.89 7.12c.59.86 1.29 1.82 2.21 1.79c.87-.04 1.2-.57 2.25-.57c1.05 0 1.34.57 2.26.55c.93-.02 1.51-.88 2.08-1.74c.66-.97.93-1.91.94-1.96c-.02-.01-1.8-.69-1.82-2.74c-.02-1.71 1.4-2.53 1.46-2.57c-.8-1.17-2.04-1.3-2.48-1.32m-2.1-4.36c.02.02.04.04.05.07c-.01-.03-.03-.05-.05-.07M12.01 5.5c.01 0 .01 0 0 0c.01 0 .01 0 0 0m7.98 13.24c-.19-.39-.38-.77-.59-1.14c-.53-.91-1.08-1.81-1.97-1.83c-.86-.02-1.13.56-2.25.56c-1.12 0-1.36-.58-2.25-.56c-.89.02-1.47.92-2 1.83c-.21.37-.41.75-.6 1.14c-.38.77-.67 1.5-.86 2.09c-.28.85-.2 1.23-.12 1.36c.09.14.36.19.81.19c.66-.01 1.28-.24 1.77-.45c.49-.21.94-.41 1.47-.41c.53 0 .97.2 1.47.41c.49.21 1.11.44 1.77.45c.45.01.72-.05.81-.19c.08-.13.16-.51-.12-1.36c-.19-.59-.48-1.32-.86-2.09z"/></svg>
);

const Illustration = () => (
  <div className="hidden md:flex flex-col items-center justify-center h-full w-full p-8">
    {/* <img 
      src="https://cdn.pixabay.com/photo/2017/01/31/13/14/medical-2027770_1280.png" 
      alt="Medical Illustration" 
      className="w-[250px] md:w-[350px] object-contain drop-shadow-2xl" 
    /> */}
  </div>
);

const Logo = () => (
  <div 
    className="absolute top-4 right-4 md:top-0 md:right-0 md:-mt-8 md:-mr-8 bg-[#0b3c47] rounded-xl shadow-lg p-3 md:p-4 flex items-center justify-center z-10" 
    style={{ width: 64, height: 64 }}
  >
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#fff"/><path d="M10 16c0-3.314 2.686-6 6-6s6 2.686 6 6-2.686 6-6 6-6-2.686-6-6z" stroke="#0b3c47" strokeWidth="2"/><path d="M16 10v12" stroke="#0b3c47" strokeWidth="2"/><path d="M10 16h12" stroke="#0b3c47" strokeWidth="2"/></svg>
  </div>
);

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // --- 2. Initialize State with a Random Greeting ---
  // We use a function inside useState (() => ...) so this logic runs 
  // exactly once when the component mounts (e.g., after a logout redirect).
  const [greeting] = useState(() => {
    const randomIndex = Math.floor(Math.random() * GREETING_MESSAGES.length);
    return GREETING_MESSAGES[randomIndex];
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Set a dummy auth token for demo purposes
    localStorage.setItem("auth_token", "demo_token");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black p-4">
      <div className="relative w-full max-w-[900px] min-h-[520px] bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl flex flex-col md:flex-row">
        
        <Logo />

        <div className="w-full md:w-1/2 flex items-center justify-center relative md:rounded-l-3xl overflow-hidden">
          <Illustration />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-10 md:px-12 md:py-8 relative">
          
          {/* --- 3. Use the state variable here instead of static text --- */}
          <h1 className="text-3xl md:text-4xl font-light text-gray-100 mb-2 mt-4 md:mt-6">
            {greeting}
          </h1>
          
          <p className="text-base md:text-lg text-[#cfc6b7] mb-6 md:mb-8">Login to your account</p>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-gray-300/40 text-gray-100 rounded-full py-3 px-6 text-base outline-none focus:border-[#0b3c47] transition placeholder-gray-400"
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border border-gray-300/40 text-gray-100 rounded-full py-3 px-6 text-base outline-none focus:border-[#0b3c47] transition placeholder-gray-400"
            />
            <button
              type="submit"
              className="w-full bg-[#0b3c47] text-white rounded-full py-3 font-semibold text-lg mt-2 hover:bg-[#155d6c] transition shadow-lg"
            >
              Login
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-400/30" />
            <span className="mx-4 text-gray-300 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-400/30" />
          </div>

          <div className="flex items-center gap-4 md:gap-6 mb-6 justify-center md:justify-start">
            <span className="text-gray-300 text-sm md:text-base">Login with</span>
            <button className="rounded-full bg-white/20 p-2 hover:bg-white/40 transition">
              <GoogleIcon />
            </button>
            <button className="rounded-full bg-white/20 p-2 hover:bg-white/40 transition">
              <AppleIcon />
            </button>
          </div>

          <div className="mt-auto text-center md:text-left text-gray-300 text-sm md:text-base pb-2">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#0b3c47] font-semibold hover:underline">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;