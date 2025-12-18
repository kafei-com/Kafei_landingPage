import Navbar from "./components/navbar/navbar";
import Hero from "./components/hero";
import { Bento } from "./components/bento";
import { Product } from "./components/product";
import { PricingDemo } from "./components/PricingDemo ";
import { Component } from "./components/ui/testimonial";
import { LoadingScreen } from "./components/ui/loadingScreen";
import FAQWithSpiral from "./components/ui/faq";
import CTAComponent from "./components/ui/CTAComponent";
import Footer from "./components/ui/footer";

import { useEffect, useState } from "react";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      <header className="fixed top-0 left-0 w-full z-50 h-20 bg-black-700/80 backdrop-blur-md ">
        <Navbar />
      </header>

      <main className="pt-20">
        <Hero />
        <Bento />
        <Product />
        <PricingDemo />
        <Component />
        <FAQWithSpiral />
        <CTAComponent />
        <Footer/>
      </main>
    </div>
  );
};

export default Home;
