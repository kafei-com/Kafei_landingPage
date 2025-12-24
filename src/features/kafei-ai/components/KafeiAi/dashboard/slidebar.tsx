import React from "react";
import { Home, Users, BarChart2, Settings, X, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SlidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const Slidebar: React.FC<SlidebarProps> = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear auth token and user data
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    // Redirect to login
    navigate("/login");
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        className={`
          fixed inset-0 backdrop-blur-sm z-40 md:hidden
          transition-opacity duration-300
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setOpen(false)}
      />

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-40
          h-full bg-black backdrop-blur-2xl
          shadow-xl

          transition-all duration-300 ease-in-out
         

          /* MOBILE: slide in */
          ${open ? "translate-x-0" : "-translate-x-full"}

          /* DESKTOP width */
          md:translate-x-0 
          ${open ? "md:w-45" : "md:w-20"}

          w-64
        `}
      >
        {/* CLOSE BUTTON FOR MOBILE */}
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={() => setOpen(false)}
            className="text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* LOGO */}
        <div className="flex items-center gap-3 mb-10 p-6">
          <div className="w-7 h-7 bg-white text-black rounded-2xl flex items-center justify-center font-bold shadow-md">
            K
          </div>

          {open && (
            <h2 className="text-white font-semibold text-xl tracking-wide">
              KAFEI
            </h2>
          )}
        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-col gap-2 px-4 mt-4 pb-32">
          {[
            { icon: <Home size={20} />, label: "Overview", link: "/KafeiAi" },
            { icon: <Users size={20} />, label: "Users", link: "#" },
            { icon: <BarChart2 size={20} />, label: "Analytics", link: "#" },
            { icon: <Settings size={20} />, label: "Settings", link: "#" },
          ].map((item, i) => (
            <a
              key={i}
              href={item.link}
              className={`
                flex items-center gap-4 px-4 py-3 rounded-xl
                text-white/80 hover:bg-white/10 hover:text-white
                transition-all
                ${open ? "justify-start" : "justify-center"}
              `}
              onClick={() => setOpen(false)} // auto close on mobile
            >
              {item.icon}
              {open && item.label}
            </a>
          ))}
        </nav>

        {/* PROFILE & SIGN OUT AT BOTTOM */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-black">
          {/* PROFILE */}
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            {open && (
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold truncate">Profile</p>
                <p className="text-white/60 text-xs truncate">User Account</p>
              </div>
            )}
          </div>

          {/* SIGN OUT BUTTON */}
          <button
            onClick={handleSignOut}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-xl
              bg-red-500/10 hover:bg-red-500/20
              text-red-400 hover:text-red-300
              transition-all font-medium text-sm
              ${open ? "justify-start" : "justify-center"}
            `}
          >
            <LogOut size={20} />
            {open && "Sign Out"}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Slidebar;
