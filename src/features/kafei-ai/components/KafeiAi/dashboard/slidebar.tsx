import React, { useState } from "react";
import {
  Home,
  Users,
  BarChart2,
  X,
  User,
  LogOut,
  Crown,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";

interface SlidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const Slidebar: React.FC<SlidebarProps> = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<
    "profile" | "settings" | "upgrade" | null
  >(null);

  const handleSignOut = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    navigate("/login");
  };

  const handleDropdownItemClick = (
    item: "profile" | "settings" | "upgrade"
  ) => {
    setActiveModal(item);
    setDropdownOpen(false);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleProfileClick = () => {
    if (open) {
      // Sidebar is expanded - toggle dropdown
      setDropdownOpen(!dropdownOpen);
    } else {
      // Sidebar is collapsed - open modal directly
      setActiveModal("profile");
    }
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        className={`
          fixed inset-0 backdrop-blur-sm z-100 md:hidden
          transition-opacity duration-300
          ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
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
              onClick={() => setOpen(false)}
            >
              {item.icon}
              {open && item.label}
            </a>
          ))}
        </nav>

        {/* PROFILE BUTTON AT BOTTOM */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-black ${
            open ? "" : "flex justify-center"
          }`}
        >
          {/* Dropdown Menu - Only show when sidebar is expanded */}
          {open && (
            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${
                dropdownOpen ? "max-h-60 opacity-100 mb-3" : "max-h-0 opacity-0"
              }`}
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
                {/* Profile Option */}
                <button
                  onClick={() => handleDropdownItemClick("profile")}
                  className="w-full flex items-center gap-3 px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white transition-all border-b border-white/5 justify-start"
                >
                  <User size={18} />
                  <span className="text-sm font-medium">My Profile</span>
                </button>

                {/* Settings Option */}
                <button
                  onClick={() => handleDropdownItemClick("settings")}
                  className="w-full flex items-center gap-3 px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white transition-all border-b border-white/5 justify-start"
                >
                  <Settings size={18} />
                  <span className="text-sm font-medium">Settings</span>
                </button>

                {/* Upgrade Plan Option */}
                <button
                  onClick={() => handleDropdownItemClick("upgrade")}
                  className="w-full flex items-center gap-3 px-4 py-3 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300 transition-all border-b border-white/5 justify-start"
                >
                  <Crown size={18} />
                  <span className="text-sm font-medium">Upgrade Plan</span>
                </button>

                {/* Sign Out Option */}
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all justify-start"
                >
                  <LogOut size={18} />
                  <span className="text-sm font-medium">Sign Out</span>
                </button>
              </div>
            </div>
          )}

          {/* Profile Button */}
          <button
            onClick={handleProfileClick}
            className={`
              flex items-center gap-3 transition-all
              hover:bg-white/10
              ${dropdownOpen && open ? "bg-white/10" : ""}
              ${
                open
                  ? "w-full px-3 py-3 rounded-xl justify-between"
                  : "w-12 h-12 rounded-full justify-center p-0"
              }
            `}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                <User size={20} className="text-white" />
              </div>
              {open && (
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-white text-sm font-semibold truncate">
                    Account
                  </p>
                  <p className="text-white/60 text-xs truncate">Free Plan</p>
                </div>
              )}
            </div>
            {open && (
              <svg
                className={`w-4 h-4 text-white/50 transition-transform duration-300 ${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </button>
        </div>
      </aside>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={activeModal !== null}
        onClose={closeModal}
        activeTab={activeModal || "profile"}
        onTabChange={(tab: "profile" | "settings" | "upgrade") =>
          setActiveModal(tab)
        }
        onSignOut={handleSignOut}
      />
    </>
  );
};

export default Slidebar;
