import { motion } from "framer-motion";
import { CheckIcon } from "lucide-react";

interface PricingTier {
  name: string;
  price: string;
  period?: string;
  tagline: string;
  features: string[];
  cta: string;
  badge?: string;
  highlighted?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    price: "Free",
    tagline: "Perfect for exploration & learning",
    features: [
      "1 Project",
      "View-only (Non editable)",
      "Limited Stacks",
      "No ZIP export",
    ],
    cta: "Get Started",
  },
  {
    name: "Starter",
    price: "$10",
    period: "/month",
    tagline: "Ideal for students and Solo Devs",
    features: [
      "Up to 3 projects",
      "Editable system design",
      "Component Tree & ER diagram",
      "Zip export",
      "Deployment Guide",
      "Basic Stack support",
    ],
    cta: "Get Started",
    badge: "Best Option",
  },
  {
    name: "Pro",
    price: "$20",
    period: "/month",
    tagline: "Best for Freelancers & agencies",
    features: [
      "10 projects",
      "Everything in Starter",
      "Versioned project updates",
      "Priority stack additions",
      "Advanced deployment guidance",
    ],
    cta: "Get Started",
    badge: "Most Popular",
    highlighted: true,
  },
  {
    name: "Advanced",
    price: "$50",
    period: "/month",
    tagline: "Designed for teams & serious builds",
    features: [
      "Up to 30 projects",
      "Collaboration mode (coming soon)",
      "Early access to new features",
      "Marketplace access",
      "Advanced testing tools (coming soon)",
    ],
    cta: "Get Started",
  },
];

export const Component = () => {
  return (
    <section className="bg-background px-4 md:px-10 lg:px-20 py-20 transition-colors">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your needs. Upgrade or downgrade anytime.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.name} tier={tier} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface PricingCardProps {
  tier: PricingTier;
}

const PricingCard = ({ tier }: PricingCardProps) => {
  const isHighlighted = tier.highlighted;
  const hasBadge = tier.badge;

  return (
    <motion.div
      whileHover="hover"
      transition={{ duration: 0.3, ease: "easeOut" }}
      variants={{ hover: { scale: 1.02, y: -8 } }}
      className={`relative flex flex-col rounded-2xl p-6 transition-all duration-300 ${
        isHighlighted
          ? "bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white shadow-2xl shadow-purple-500/30 ring-2 ring-purple-400/50"
          : "bg-card text-card-foreground border border-border hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
      }`}
    >
      {/* Badge */}
      {hasBadge && (
        <div
          className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
            tier.badge === "Most Popular"
              ? "bg-amber-400 text-amber-900"
              : "bg-emerald-400 text-emerald-900"
          }`}
        >
          {tier.badge}
        </div>
      )}

      {/* Header */}
      <div className={`mb-6 ${hasBadge ? "mt-2" : ""}`}>
        <h3
          className={`text-xl font-bold mb-2 ${
            isHighlighted ? "text-white" : "text-foreground"
          }`}
        >
          {tier.name}
        </h3>
        <div className="flex items-baseline gap-1">
          <span
            className={`text-4xl font-black ${
              isHighlighted ? "text-white" : "text-foreground"
            }`}
          >
            {tier.price}
          </span>
          {tier.period && (
            <span
              className={`text-sm ${
                isHighlighted ? "text-white/70" : "text-muted-foreground"
              }`}
            >
              {tier.period}
            </span>
          )}
        </div>
        <p
          className={`mt-2 text-sm ${
            isHighlighted ? "text-white/80" : "text-muted-foreground"
          }`}
        >
          {tier.tagline}
        </p>
      </div>

      {/* Features */}
      <ul className="flex-1 space-y-3 mb-6">
        {tier.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckIcon
              className={`w-5 h-5 shrink-0 mt-0.5 ${
                isHighlighted ? "text-white" : "text-emerald-500"
              }`}
            />
            <span
              className={`text-sm ${
                isHighlighted ? "text-white/90" : "text-foreground"
              }`}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
          isHighlighted
            ? "bg-white text-purple-700 hover:bg-white/90 shadow-lg"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        }`}
      >
        {tier.cta}
      </button>
    </motion.div>
  );
};

export const PricingContainer = Component;
