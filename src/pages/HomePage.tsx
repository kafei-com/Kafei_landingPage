import { useEffect, useState } from "react";
import { Navbar, Footer } from "@/components/layout";
import { LoadingScreen } from "@/components/common";
import { Hero, Bento, Product, CTA } from "@/features/home/components";
import { PricingDemo } from "@/features/pricing/components";
import { Component as Testimonial } from "@/components/ui/testimonial";
import FAQWithSpiral from "@/components/ui/faq";

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      <header className="fixed top-0 left-0 w-full z-50 h-20 bg-black-700/80 backdrop-blur-md">
        <Navbar />
      </header>

      <main className="pt-20">
        <Hero />
        <Bento />
        <Product />
        <PricingDemo />
        <Testimonial />
        <FAQWithSpiral />
        <CTA />
        <Footer />
      </main>
    </div>
  );
};

export default HomePage;
