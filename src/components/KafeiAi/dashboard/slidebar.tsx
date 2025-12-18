import React from "react";
import { Home, Users, BarChart2, Settings, X } from "lucide-react";

interface SlidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const Slidebar: React.FC<SlidebarProps> = ({ open, setOpen }) => {
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
        <nav className="flex flex-col gap-2 px-4 mt-4">
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
      </aside>
    </>
  );
};

export default Slidebar;
