"use client";

import { Card, CardContent } from "./card";
import { motion } from "framer-motion";
import {
    Shredder,
    Workflow,
    MonitorCog,
    Layers,
    Handshake,
    Users,
} from "lucide-react";

const features = [
    {
        icon: Shredder,
        title: "Flow Design",
        description: "fwscscbluffwbdjblckjewbjbewbfefobejcldlfefepwidnskcnlfowfhpowi",

    },
    {
        icon: Workflow,
        title: "Workflow Automation",
        description: "fwscscbluffwbdjblckjewbjbewbfefobejcldlfefepwidnskcnlfowfhpowi",

    },
    {
        icon: MonitorCog,
        title: "Editing freedom",
        description: "fwscscbluffwbdjblckjewbjbewbfefobejcldlfefepwidnskcnlfowfhpowi",

    },
    {
        icon: Layers,
        title: "Layered design system",
        description: "fwscscbluffwbdjblckjewbjbewbfefobejcldlfefepwidnskcnlfowfhpowi",
    },
    {
        icon: Handshake,
        title: "Collaboration",
        description: "fwscscbluffwbdjblckjewbjbewbfefobejcldlfefepwidnskcnlfowfhpowi",
    },
    {
        icon: Users,
        title: "Community Support",
        description: "fwscscbluffwbdjblckjewbjbewbfefobejcldlfefepwidnskcnlfowfhpowi",
    },
];

export default function Features() {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    Powerful Features
                </h2>
                <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
                    Discover what makes our platform efficient, secure, and scalable.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.15)",
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            >
                                <Card className="group cursor-pointer bg-card border border-border/40 hover:bg-primary/5 transition-all duration-300">
                                    <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                                        <motion.div
                                            whileHover={{ rotate: 10, scale: 1.2 }}
                                            transition={{ type: "spring", stiffness: 250 }}
                                            className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition"
                                        >
                                            <Icon className="w-8 h-8 text-primary group-hover:text-primary/90 transition-colors duration-300" />
                                        </motion.div>
                                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 break-all whitespace-normal text-balance">
                                            {feature.description}
                                        </p>

                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
