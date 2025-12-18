import React from "react";
import { PanelLeftOpen, PanelRightOpen } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardNavbarProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ open, setOpen }) => {
    return (
        <nav className="w-full bg-white/70 backdrop-blur-xl sticky top-0 z-40 rounded-tl-xl">
            <div className="px-6 py-4 flex items-center justify-between">

                <button
                    onClick={() => setOpen(!open)}
                    className="text-white hover:text-gray-300 transition"
                >
                    {open ? <PanelRightOpen size={26} /> : <PanelLeftOpen size={26} />}
                </button>

                <div className="fixed right-5 z-40 hidden md:flex gap-4">

                    <Link
                        to="/login"
                        className="px-4 py-2 rounded-xl bg-white/10 text-white border border-white/20 font-semibold hover:bg-gray-200 hover:text-black transition-all"
                    >
                        Login
                    </Link>

                    <Link
                        to="/signup"
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-semibold hover:bg-gray-200 transition-all"
                    >
                        Sign Up
                    </Link>

                </div>

            </div>
        </nav>
    );
};

export default DashboardNavbar;
