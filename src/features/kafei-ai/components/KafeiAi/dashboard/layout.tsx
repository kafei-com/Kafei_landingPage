import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import DashboardNavbar from "./nav";
import Slidebar from "./slidebar";
import { DarkModeProvider } from "./DarkModeContext";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [open, setOpen] = useState(false);
  // closed on mobile by default

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <DarkModeProvider>
      <div className="dashboard-fonts flex h-screen w-screen overflow-hidden">
        <Slidebar open={open} setOpen={setOpen} />

        <div className="flex flex-col flex-1 h-full bg-black">
          <DashboardNavbar open={open} setOpen={setOpen} />

          <main className="flex-1 overflow-hidden p-0 bg-white">
            {children}
          </main>
        </div>
      </div>
    </DarkModeProvider>
  );
};

export default DashboardLayout;
