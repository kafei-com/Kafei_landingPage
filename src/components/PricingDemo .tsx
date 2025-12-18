import { PricingContainer } from "./ui/PricingContainer";
import type { ComponentType } from "react";

// Types
interface PricingPlan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  isPopular?: boolean;
  accent: string;
  rotation?: number;
}

const DEMO_PLANS: PricingPlan[] = [
  {
    name: "Starter",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: ["1 User", "10 Projects", "5GB Storage", "Basic Support"],
    isPopular: false,
    accent: "bg-rose-500",
    rotation: -2,
  },
  {
    name: "Pro",
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: ["5 Users", "50 Projects", "100GB Storage", "Priority Support"],
    isPopular: true,
    accent: "bg-blue-500",
    rotation: 1,
  },
  {
    name: "Super Saver",
    monthlyPrice: 199,
    yearlyPrice: 1990,
    features: ["Unlimited", "Contact Us", "1TB Storage", "24/7 Support"],
    isPopular: false,
    accent: "bg-purple-500",
    rotation: 2,
  },
];

const PricingContainerTyped = PricingContainer as ComponentType<{
  title: string;
  plans: PricingPlan[];
}>;

export function PricingDemo() {
  return (
    <div className="w-full flex flex-col items-center text-center gap-4 py-20">

      {/*  The Heading Title */}
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
        Choose Your Perfect Plan
      </h1>
      <h5 className="text-lg text-neutral-400 max-w-2xl">
        Select the plan that best fits your needs and start building amazing projects today with KAFEI!
      </h5>

      {/* Pricing Cards */}
      <PricingContainerTyped title="Choose Your Perfect Plan" plans={DEMO_PLANS} />
    </div>
  );
}
