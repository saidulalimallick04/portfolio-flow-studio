"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
    text: string;
    className?: string;
    delay?: number;
}

export function AnimatedText({ text, className, delay = 0 }: AnimatedTextProps) {
    // Split text into words first to handle spacing correctly
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.04 * i + delay },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.h1
            className={cn("flex flex-wrap", className)}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {words.map((word, index) => (
                <span key={index} className="mr-4 flex"> {/* Add margin-right for word spacing */}
                    {Array.from(word).map((char, charIndex) => (
                        <motion.span variants={child} key={`${index}-${charIndex}`}>
                            {char}
                        </motion.span>
                    ))}
                </span>
            ))}
        </motion.h1>
    );
}
