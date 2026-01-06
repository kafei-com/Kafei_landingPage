"use client";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Code,
  Rocket,
  Lightbulb,
  Target,
  Sparkles,
} from "lucide-react";

const problems = [
  {
    icon: Code,
    title: "No System Design",
    description:
      "No clear system design before coding begins, leading to structural issues later.",
  },
  {
    icon: AlertTriangle,
    title: "Blind Boilerplate",
    description:
      "Boilerplate copied without understanding why, creating technical debt from day one.",
  },
  {
    icon: Rocket,
    title: "Late Deployment",
    description:
      "Deployment figured out at the very end, causing last-minute scrambles and failures.",
  },
  {
    icon: Target,
    title: "Unclear Requirements",
    description:
      "Building without knowing exactly what to build, resulting in wasted effort and rewrites.",
  },
];

const solutions = [
  {
    icon: Lightbulb,
    title: "No Guesswork",
    description:
      "Understand exactly what to build and why, before writing a single line of code.",
  },
  {
    icon: Sparkles,
    title: "No Messy Refactors",
    description:
      "Get the architecture right from the start, eliminating painful rewrites.",
  },
  {
    icon: Rocket,
    title: "Production Ready",
    description:
      "Be deployment-ready before even starting the project, not after.",
  },
  {
    icon: Target,
    title: "Clear Direction",
    description:
      "Every decision is informed, every path is mapped out before you begin.",
  },
];

const WhyKafei = () => {
  return (
    <section className="relative w-full bg-black overflow-hidden">
      {/* Problem Section */}
      <div className="py-24 md:py-32">
        <div className="w-11/12 max-w-5xl mx-auto">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center">
              <AlertTriangle
                className="w-6 h-6 text-white/60"
                strokeWidth={1.5}
              />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Why Projects Fail
            </h2>
            <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto">
              Most projects don't fail because of bad code. They fail because of
              bad decisions made too early.
            </p>
          </motion.div>

          {/* Problem Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {problems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center">
                  <item.icon
                    className="w-5 h-5 text-white/50"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-11/12 max-w-5xl mx-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Solution Section */}
      <div className="py-24 md:py-32">
        <div className="w-11/12 max-w-5xl mx-auto">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white/60" strokeWidth={1.5} />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Clarity Before Complexity
            </h2>
            <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto">
              Kafei gives you the understanding and structure you need before
              you start building.
            </p>
          </motion.div>

          {/* Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {solutions.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center">
                  <item.icon
                    className="w-5 h-5 text-white/50"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyKafei;
