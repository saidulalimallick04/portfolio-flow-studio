"use client";

import { Container } from "@/components/shared/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
    Heart,
    MessageCircle,
    Coffee,
    ShieldCheck,
    ShieldAlert,
    UserCheck,
    Sparkles,
    Smartphone,
    CheckCircle2,
    XCircle,
    HandHeart,
    Mail,
    Camera,
    Instagram
} from "lucide-react";
import Link from "next/link";

export default function RentMePage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen py-32 bg-background/50 relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10 animate-pulse" />
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/5 rounded-full blur-[100px] -z-10 animate-pulse delay-1000" />

            <Container>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="max-w-4xl mx-auto space-y-16"
                >
                    {/* Hero Section */}
                    <motion.div variants={itemVariants} className="text-center space-y-6">
                        <Badge variant="secondary" className="px-4 py-1.5 text-sm rounded-full backdrop-blur-md border animate-in fade-in zoom-in duration-500">
                            <Sparkles className="w-3.5 h-3.5 mr-2 text-primary" />
                            Companionship Only
                        </Badge>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 decoration-clone pb-2">
                            Rent Me as a Boyfriend
                        </h1>

                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Looking for someone who listens, supports, and shows up emotionally?
                            I offer genuine, respectful, and thoughtful companionship —
                            <span className="text-foreground font-medium"> without crossing personal boundaries.</span>
                        </p>

                        <div className="flex justify-center pt-2">
                            <Button variant="outline" className="rounded-full gap-2 text-muted-foreground hover:text-foreground hover:bg-muted/50" asChild>
                                <Link href="/studio">
                                    <Camera className="w-4 h-4" />
                                    Visit My Studio (Photos & Videos of me.)
                                </Link>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Core Value Proposition */}
                    <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8 items-center">
                        <Card className="bg-gradient-to-br from-card to-card/50 border-primary/10 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-2xl">
                                    <HandHeart className="w-6 h-6 text-primary" />
                                    Emotional Connection
                                </CardTitle>
                                <CardDescription className="text-lg pt-2">
                                    This is for people who value conversation, presence, and safe emotional support, not physical interaction.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                    <span>A calm, friendly presence</span>
                                </div>
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                    <span>Judgment-free listening</span>
                                </div>
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                    <span>Safe, dependable partner energy</span>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-6 pl-4 border-l-2 border-primary/20">
                            <blockquote className="text-2xl font-medium italic text-foreground/80">
                                "Think of it as having a safe, dependable partner energy when you need it."
                            </blockquote>
                            <p className="text-muted-foreground">
                                Whether you need a plus-one for an event, a coffee buddy, or just someone to talk to late at night, I'm here to provide that support with dignity and respect.
                            </p>
                        </div>
                    </motion.div>

                    {/* What You Get Grid */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-4">What You Get 🌿</h2>
                            <p className="text-muted-foreground">Tailored companionship for your needs.</p>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: MessageCircle,
                                    title: "Meaningful Talks",
                                    desc: "Deep conversations & genuine emotional support whenever you feel unheard."
                                },
                                {
                                    icon: Coffee,
                                    title: "Public Company",
                                    desc: "A partner for events, coffee dates, walks, or travel planning. Never go alone."
                                },
                                {
                                    icon: Smartphone,
                                    title: "Virtual Support",
                                    desc: "Calls, chats, and late-night talks. Encouragement and motivation on demand."
                                }
                            ].map((item, i) => (
                                <Card key={i} className="bg-background/40 backdrop-blur-sm hover:shadow-md transition-all border-muted/50">
                                    <CardHeader>
                                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                                            <item.icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <CardTitle className="text-xl">{item.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{item.desc}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </motion.div>

                    {/* Important Boundaries Section - Critical */}
                    <motion.div variants={itemVariants}>
                        <Card className="border-destructive/20 bg-destructive/5 overflow-hidden">
                            <div className="absolute top-0 right-0 p-32 bg-destructive/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-2xl text-destructive/90">
                                    <ShieldAlert className="w-7 h-7" />
                                    Important Boundaries
                                </CardTitle>
                                <CardDescription className="text-base font-medium text-destructive/70">
                                    Please read carefully. Respect and consent are mandatory.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid md:grid-cols-2 gap-8 z-10 relative">
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-lg flex items-center gap-2">
                                        <XCircle className="w-5 h-5 text-destructive" />
                                        Strictly Prohibited
                                    </h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-2 text-muted-foreground bg-background/50 p-3 rounded-lg border border-destructive/10">
                                            <span className="text-destructive font-bold mt-0.5">×</span>
                                            <span>No physical contact (touching, hugging, kissing).</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-muted-foreground bg-background/50 p-3 rounded-lg border border-destructive/10">
                                            <span className="text-destructive font-bold mt-0.5">×</span>
                                            <span>No sexual or intimate activities.</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-muted-foreground bg-background/50 p-3 rounded-lg border border-destructive/10">
                                            <span className="text-destructive font-bold mt-0.5">×</span>
                                            <span>No inappropriate requests.</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-muted-foreground bg-background/50 p-3 rounded-lg border border-destructive/10">
                                            <span className="text-destructive font-bold mt-0.5">×</span>
                                            <span>No visits to abandoned, isolated, or unsafe locations.</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-lg flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                        My Guarantee
                                    </h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-2 text-muted-foreground bg-background/50 p-3 rounded-lg border border-green-500/10">
                                            <span className="text-green-600 font-bold mt-0.5">✓</span>
                                            <span>Respectful and boundary-aware.</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-muted-foreground bg-background/50 p-3 rounded-lg border border-green-500/10">
                                            <span className="text-green-600 font-bold mt-0.5">✓</span>
                                            <span>Emotionally present and honest.</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-muted-foreground bg-background/50 p-3 rounded-lg border border-green-500/10">
                                            <span className="text-green-600 font-bold mt-0.5">✓</span>
                                            <span className="italic">"If anything feels uncomfortable — we stop. Simple."</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-muted-foreground bg-background/50 p-3 rounded-lg border border-green-500/10">
                                            <span className="text-green-600 font-bold mt-0.5">✓</span>
                                            <span><strong>Safety & Care:</strong> Physical support (like holding hands) is allowed for safety reasons (e.g., crossing roads).</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-muted-foreground bg-background/50 p-3 rounded-lg border border-green-500/10">
                                            <span className="text-green-600 font-bold mt-0.5">✓</span>
                                            <span><strong>Step-in Scenarios:</strong> Willing to help with specific social situations (e.g., making someone jealous) while keeping it respectful.</span>
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Who Is This For */}
                    <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1 space-y-6">
                            <h2 className="text-3xl font-bold">Who Is This For? 🤍</h2>
                            <ul className="space-y-4">
                                {[
                                    "Someone who feels lonely and wants genuine company.",
                                    "Someone attending an event and doesn't want to go alone.",
                                    "Someone who just wants to be heard and understood.",
                                    "Someone who values emotional safety and clarity."
                                ].map((text, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                            <UserCheck className="w-4 h-4 text-primary" />
                                        </div>
                                        <span className="text-lg text-muted-foreground">{text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Decorative Quote/Final Note */}
                        <div className="order-1 md:order-2 bg-gradient-to-tr from-accent/20 to-primary/10 p-8 rounded-3xl border border-accent/20 flex items-center justify-center text-center">
                            <div className="space-y-4">
                                <Sparkles className="w-10 h-10 mx-auto text-accent mb-4" />
                                <p className="text-xl font-medium leading-relaxed">
                                    "This is companionship with dignity, not a role-play fantasy. If you’re looking for connection, not confusion, we’ll get along just fine."
                                </p>
                                <div className="pt-4">
                                    <Button size="lg" className="rounded-full px-8 gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0" asChild>
                                        <Link href="https://instagram.com/saidulalimallick04" target="_blank">
                                            <Instagram className="w-4 h-4" />
                                            DM on Instagram
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* My Promise Footer */}
                    <motion.div variants={itemVariants} className="text-center pt-12 border-t border-border/50">
                        <h3 className="text-xl font-semibold mb-4">🌱 My Promise</h3>
                        <div className="flex flex-wrap justify-center gap-4 text-muted-foreground">
                            <span className="px-4 py-2 bg-background rounded-full border shadow-sm">Respectful</span>
                            <span className="px-4 py-2 bg-background rounded-full border shadow-sm">Honest</span>
                            <span className="px-4 py-2 bg-background rounded-full border shadow-sm">Emotionally Present</span>
                            <span className="px-4 py-2 bg-background rounded-full border shadow-sm">Judgment-free</span>
                        </div>
                    </motion.div>

                </motion.div>
            </Container>
        </div>
    );
}
