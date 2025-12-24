import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/app/providers/AuthProvider";

// --- 1. greeting messages (unchanged) ---
const GREETING_MESSAGES = [
  "Welcome Back!",
  "Hello Again!",
  "Missed You!",
  "Good to See You!",
  "Ready to Start?",
  "Let's Get Going",
  "Welcome Home",
  "Greetings, Hero",
];

const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 48 48">
    <g>
      <path
        fill="#4285F4"
        d="M44.5 20H24v8.5h11.7C34.7 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.4l6.4-6.4C33.5 5.1 28.9 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z"
      />
      <path
        fill="#34A853"
        d="M6.3 14.7l7 5.1C15.1 17.1 19.2 14 24 14c2.7 0 5.2.9 7.2 2.4l6.4-6.4C33.5 5.1 28.9 3 24 3 15.6 3 8.2 8.5 6.3 14.7z"
      />
      <path
        fill="#FBBC05"
        d="M24 44c5.8 0 10.7-1.9 14.3-5.1l-6.6-5.4C29.7 35.1 27 36 24 36c-5.7 0-10.6-3.7-12.3-8.9l-7 5.4C8.2 39.5 15.6 44 24 44z"
      />
      <path
        fill="#EA4335"
        d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.1 5.5-7.7 5.5-2.2 0-4.2-.7-5.7-2l-7 5.4C15.1 40.9 19.2 44 24 44c6.6 0 12-5.4 12-12 0-.8-.1-1.5-.2-2.2z"
      />
    </g>
  </svg>
);
const AppleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M16.365 1.43c0 1.14-.93 2.07-2.07 2.07c-.04 0-.08 0-.12-.01c-.17-1.09.95-2.08 2.07-2.06c.08.13.13.28.12.44m2.06 4.36c-1.14-.07-2.1.65-2.65.65c-.56 0-1.42-.63-2.34-.61c-1.2.02-2.31.7-2.93 1.78c-1.25 2.16-.32 5.36.89 7.12c.59.86 1.29 1.82 2.21 1.79c.87-.04 1.2-.57 2.25-.57c1.05 0 1.34.57 2.26.55c.93-.02 1.51-.88 2.08-1.74c.66-.97.93-1.91.94-1.96c-.02-.01-1.8-.69-1.82-2.74c-.02-1.71 1.4-2.53 1.46-2.57c-.8-1.17-2.04-1.3-2.48-1.32m-2.1-4.36c.02.02.04.04.05.07c-.01-.03-.03-.05-.05-.07M12.01 5.5c.01 0 .01 0 0 0c.01 0 .01 0 0 0m7.98 13.24c-.19-.39-.38-.77-.59-1.14c-.53-.91-1.08-1.81-1.97-1.83c-.86-.02-1.13.56-2.25.56c-1.12 0-1.36-.58-2.25-.56c-.89.02-1.47.92-2 1.83c-.21.37-.41.75-.6 1.14c-.38.77-.67 1.5-.86 2.09c-.28.85-.2 1.23-.12 1.36c.09.14.36.19.81.19c.66-.01 1.28-.24 1.77-.45c.49-.21.94-.41 1.47-.41c.53 0 .97.2 1.47.41c.49.21 1.11.44 1.77.45c.45.01.72-.05.81-.19c.08-.13.16-.51-.12-1.36c-.19-.59-.48-1.32-.86-2.09z"
    />
  </svg>
);

// UI Update: Replaced empty div with a CSS Abstract Art panel
const Illustration = () => (
  <div className="hidden md:flex relative flex-col items-center justify-center h-full w-full bg-gradient-to-br from-[#051F25] to-[#0b3c47] overflow-hidden">
    {/* Abstract Background Elements */}
    <div className="absolute top-0 left-0 w-full h-full opacity-30">
      <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] rounded-full bg-[#155d6c] blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#0b3c47] blur-[100px] mix-blend-screen"></div>
    </div>

    {/* Content overlay */}
    <div className="relative z-10 flex flex-col items-center text-center p-8">
      <div className="mb-8 p-6 bg-white/5 rounded-full backdrop-blur-sm border border-white/10 shadow-2xl">
        {/* Simple Lock/Shield Graphic */}
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-90"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <path d="M9 12a3 3 0 1 0 6 0"></path>
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-white mb-2 tracking-wide">
        Secure Portal
      </h2>
      <p className="text-gray-400 max-w-xs text-sm leading-relaxed">
        Access your personalized dashboard with industry-standard security.
      </p>
    </div>
  </div>
);

const Logo = () => (
  <div
    className="absolute top-6 right-6 md:top-6 md:right-6 bg-gradient-to-br from-[#0b3c47] to-[#062128] rounded-2xl shadow-2xl p-3 flex items-center justify-center z-20 border border-white/10"
    style={{ width: 56, height: 56 }}
  >
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#fff" fillOpacity="0.95" />
      <path
        d="M10 16c0-3.314 2.686-6 6-6s6 2.686 6 6-2.686 6-6 6-6-2.686-6-6z"
        stroke="#0b3c47"
        strokeWidth="2.5"
      />
      <path
        d="M16 10v12"
        stroke="#0b3c47"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M10 16h12"
        stroke="#0b3c47"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  // --- 2. Initialize State with a Random Greeting ---
  const [greeting] = useState(() => {
    const randomIndex = Math.floor(Math.random() * GREETING_MESSAGES.length);
    return GREETING_MESSAGES[randomIndex];
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    setError("");

    console.log("Logging in with:", { email, password });

    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        if (data.detail && Array.isArray(data.detail)) {
          const errorMessages = data.detail
            .map((err: any) => err.msg)
            .join(", ");
          throw new Error(errorMessages || "Login failed");
        }
        throw new Error(data?.message || data?.detail || "Login failed");
      }

      // Try to extract token from common fields
      const authToken =
        data?.token ||
        data?.access_token ||
        data?.accessToken ||
        data?.accessToken?.token ||
        data?.data?.token ||
        null;

      if (!authToken) {
        // If server didn't return a token but returned user, we can proceed cautiously
        if (data?.user) {
          login(null, data.user);
          navigate("/dashboard");
          return;
        }
        throw new Error(
          "No auth token returned from server. Please try logging in again."
        );
      }

      // Verify token with /users/me and store user via AuthProvider
      const meResponse = await fetch("/users/me", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (meResponse.ok) {
        const meData = await meResponse.json();
        login(authToken, meData);
        navigate("/dashboard");
        return;
      }

      const meError = await meResponse.json().catch(() => ({}));
      const detail = meError?.detail || meError?.message || null;

      // Clean up any stale token if backend reports invalid/expired token
      if (detail && /invalid|expired|not authenticated/i.test(String(detail))) {
        localStorage.removeItem("auth_token");
      }

      if (detail === "Not authenticated") {
        throw new Error(
          "User not authenticated. Please register or check credentials."
        );
      }

      throw new Error(
        data?.message || detail || "Login failed to validate user"
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      console.error("Login error:", errorMessage);
      console.error("Full error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    // UI Update: Added deep gradient background
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black p-4 md:p-6 font-sans">
      {/* UI Update: Enhanced card shadow and border */}
      <div className="relative w-full max-w-[1000px] min-h-[600px] bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-[32px] shadow-2xl flex flex-col md:flex-row overflow-hidden ring-1 ring-white/5">
        {/* Left Side: Illustration Panel */}
        <div className="w-full md:w-5/12 relative">
          <Illustration />
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-7/12 flex flex-col justify-center px-8 py-10 md:px-16 md:py-12 relative">
          <Logo />

          <div className="mb-8">
            {/* --- 3. Use the state variable here --- */}
            <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-3 tracking-tight">
              {greeting}
            </h1>
            <p className="text-base md:text-lg text-gray-400">
              Please login to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {error && (
              <div className="w-full bg-red-500/10 border border-red-500/20 text-red-200 rounded-2xl py-3 px-5 text-sm flex items-center gap-2 animate-pulse">
                <span className="block w-1.5 h-1.5 rounded-full bg-red-400" />
                {error}
              </div>
            )}

            <div className="space-y-4">
              <input
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full bg-white/5 border border-white/10 text-gray-100 rounded-2xl py-4 px-6 text-base outline-none focus:border-[#0b3c47] focus:ring-4 focus:ring-[#0b3c47]/10 transition-all duration-200 placeholder-gray-500 disabled:opacity-50 hover:bg-white/[0.07]"
              />
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full bg-white/5 border border-white/10 text-gray-100 rounded-2xl py-4 px-6 text-base outline-none focus:border-[#0b3c47] focus:ring-4 focus:ring-[#0b3c47]/10 transition-all duration-200 placeholder-gray-500 disabled:opacity-50 hover:bg-white/[0.07]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#0b3c47] to-[#155d6c] text-white rounded-2xl py-4 font-semibold text-lg mt-4 hover:shadow-lg hover:shadow-[#0b3c47]/20 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
            <span className="mx-4 text-gray-500 text-xs uppercase tracking-wider font-medium">
              Or continue with
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
          </div>

          <div className="flex items-center gap-4 justify-center">
            <button className="flex-1 flex items-center justify-center gap-3 bg-white/5 border border-white/5 rounded-xl py-3 hover:bg-white/10 transition-colors group">
              <div className="group-hover:scale-110 transition-transform duration-200">
                <GoogleIcon />
              </div>
            </button>
            <button className="flex-1 flex items-center justify-center gap-3 bg-white/5 border border-white/5 rounded-xl py-3 hover:bg-white/10 transition-colors group">
              <div className="text-white group-hover:scale-110 transition-transform duration-200">
                <AppleIcon />
              </div>
            </button>
          </div>

          <div className="mt-8 text-center text-gray-400 text-sm md:text-base">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-white font-medium hover:text-[#2a9db3] transition-colors relative after:content-[''] after:absolute after:w-full after:h-px after:bg-[#2a9db3] after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
