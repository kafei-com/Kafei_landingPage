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

            </div>
        </nav>
    );
};

export default DashboardNavbar;
