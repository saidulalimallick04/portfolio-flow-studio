"use client";

import { Container } from "@/components/shared/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import {
    MessageCircle,
    Coffee,
    ShieldAlert,
    UserCheck,
    Sparkles,
    Smartphone,
    CheckCircle2,
    XCircle,
    HandHeart,
    Camera,
    Instagram,
    ArrowRight,
    Heart
} from "lucide-react";

// --- Components ---

function FloatingOrb({ className, delay = 0 }: { className?: string; delay?: number }) {
    return (
        <motion.div
            className={`absolute rounded-full blur-[100px] -z-10 mix-blend-screen opacity-50 ${className}`}
            animate={{
                y: [0, -50, 0],
                x: [0, 30, 0],
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay
            }}
        />
    );
}

function ServiceCard({ item, index }: { item: any; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
        >
            <Card className="h-full bg-background/30 backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all duration-300 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary/20 to-accent/20 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                        <item.icon className="w-7 h-7" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                        {item.desc}
                    </p>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default function RentMePage() {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    // Mouse follow effect for hero
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className="min-h-screen relative overflow-hidden bg-dot-pattern"
            onMouseMove={handleMouseMove}
        >
            {/* Dynamic Backgrounds */}
            <FloatingOrb className="top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20" />
            <FloatingOrb className="bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-accent/20" delay={2} />
            <FloatingOrb className="top-[40%] left-[20%] w-[300px] h-[300px] bg-purple-500/10" delay={4} />

            <Container className="relative z-10 py-24 sm:py-32">

                {/* Hero Section */}
                <div className="relative mb-32 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <Badge variant="outline" className="px-6 py-2 text-sm rounded-full backdrop-blur-xl border-primary/20 bg-primary/5 shadow-[0_0_20px_-5px_rgba(var(--primary),0.3)]">
                            <Sparkles className="w-4 h-4 mr-2 text-primary animate-pulse" />
                            Premium Companionship Service
                        </Badge>
                    </motion.div>

                    <motion.h1
                        className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/40 leading-[1.1]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        Rent Me As Your<br />
                        <span className="text-primary inline-block relative">
                            Boyfriend
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                            </svg>
                        </span>
                    </motion.h1>

                    <motion.p
                        className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Emotional support, genuine listening, and a safe plus-one.
                        <br className="hidden sm:block" />
                        <span className="text-foreground font-medium">No drama. No complications. Just presence.</span>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Button size="lg" className="rounded-full text-lg px-8 h-12 bg-primary hover:bg-primary/90 hover:scale-105 transition-all shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)] group" asChild>
                            <Link href="https://instagram.com/saidulalimallick04" target="_blank">
                                <Instagram className="w-5 h-5 mr-2" />
                                Book a Time
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="rounded-full text-lg px-8 h-12 backdrop-blur-sm hover:bg-white/10" asChild>
                            <Link href="/studio">
                                <Camera className="w-5 h-5 mr-2" />
                                View Gallery
                            </Link>
                        </Button>
                    </motion.div>
                </div>

                {/* Value Proposition */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-32"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl transform -rotate-6 opacity-60" />
                        <Card className="relative bg-background/60 backdrop-blur-xl border-white/10 overflow-hidden shadow-2xl">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-3xl">
                                    <Heart className="w-8 h-8 text-primary fill-primary/20" />
                                    The Experience
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 text-lg">
                                <p className="text-muted-foreground">
                                    Imagine having someone who is 100% on your side. Someone who listens without trying to "fix" everything, and stands by you when you need support.
                                </p>
                                <blockquote className="pl-6 border-l-4 border-primary/40 italic text-foreground/80 text-xl font-serif">
                                    "A safe harbor in a chaotic world. Connection without the confusion."
                                </blockquote>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-8">
                        {[
                            { title: "Zero Pressure", desc: "No complex relationship dynamics. Just clean, friendly interaction." },
                            { title: "Safe Space", desc: "Your emotional safety and comfort are the top priority." },
                            { title: "Tailored to You", desc: "Whether you need a listener or a talker, I adapt to the vibe." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="flex gap-4"
                            >
                                <div className="w-12 h-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                                    <CheckCircle2 className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">{item.title}</h3>
                                    <p className="text-muted-foreground">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Services Grid */}
                <div className="mb-32">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold">What I Offer 🌹</h2>
                        <p className="text-xl text-muted-foreground">Curated experiences for your specific needs.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: MessageCircle,
                                title: "Emotional Venting",
                                desc: "A judgment-free zone to unload your thoughts. I listen, validate, and support."
                            },
                            {
                                icon: Coffee,
                                title: "The Plus-One",
                                desc: "Weddings, parties, or family dinners. I'm the charming, polite guest who makes you look good."
                            },
                            {
                                icon: Smartphone,
                                title: "Good Morning/Night",
                                desc: "Start and end your day with sweet, motivating texts or calls to keep you going."
                            },
                            {
                                icon: UserCheck,
                                title: "Mock Dates",
                                desc: "Practice for the real thing, or just enjoy a nice evening out without the risk."
                            },
                            {
                                icon: HandHeart,
                                title: "Comfort Company",
                                desc: "Just need someone to sit with while you read or watch a movie? I'm there."
                            },
                            {
                                icon: Camera,
                                title: "Instagram Boyfriend",
                                desc: "I'll take those candid shots of you that look amazing. (Yes, I know my angles)."
                            }
                        ].map((item, i) => (
                            <ServiceCard key={i} item={item} index={i} />
                        ))}
                    </div>
                </div>

                {/* Boundaries Section - The "Contract" */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <Card className="bg-[#0f0f12] border-red-900/30 overflow-hidden relative">
                        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-red-500/10 rounded-full blur-[80px] pointer-events-none" />

                        <CardHeader className="text-center pt-10 pb-2">
                            <CardTitle className="text-3xl font-serif text-white flex items-center justify-center gap-3">
                                <ShieldAlert className="w-8 h-8 text-red-500" />
                                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                                    The Code of Conduct
                                </span>
                            </CardTitle>
                            <CardDescription className="text-red-200/60 uppercase tracking-widest text-xs font-semibold mt-2">
                                Non-Negotiable Boundaries
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="p-10 grid md:grid-cols-2 gap-10 relative z-10">
                            <div className="space-y-6">
                                <h4 className="flex items-center gap-2 text-red-500 font-bold border-b border-red-500/20 pb-2">
                                    <XCircle className="w-5 h-5" /> PROHIBITED ACTIONS
                                </h4>
                                <ul className="space-y-4">
                                    <li className="flex gap-3 text-red-200/80 text-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                                        Absolutely no physical intimacy (kissing, etc). Hand-holding is the limit, and only if comfortable.
                                    </li>
                                    <li className="flex gap-3 text-red-200/80 text-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                                        No private spaces (hotels, bedrooms). Public or semi-public spaces only.
                                    </li>
                                    <li className="flex gap-3 text-red-200/80 text-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                                        No illegal activities or unsafe locations.
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-6">
                                <h4 className="flex items-center gap-2 text-green-500 font-bold border-b border-green-500/20 pb-2">
                                    <CheckCircle2 className="w-5 h-5" /> GUARANTEED QUALITY
                                </h4>
                                <ul className="space-y-4">
                                    <li className="flex gap-3 text-gray-300 text-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                                        Complete confidentiality. Your secrets stay with me.
                                    </li>
                                    <li className="flex gap-3 text-gray-300 text-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                                        Respectful, gentlemanly behavior at all times.
                                    </li>
                                    <li className="flex gap-3 text-gray-300 text-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                                        Easy exit: If you feel weird, we stop. No questions asked.
                                    </li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Footer Quote */}
                <div className="mt-24 text-center">
                    <p className="text-muted-foreground/50 text-sm font-medium tracking-widest uppercase">
                        Serious inquiries only • Based in Kolkata, India
                    </p>
                </div>

            </Container>
        </div>
    );
}
