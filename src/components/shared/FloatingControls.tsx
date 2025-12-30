"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, Code, Send, X, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { ContactForm } from "@/components/shared/ContactForm";

export function FloatingControls() {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [hasDraft, setHasDraft] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show button when page is scrolled down
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        // Check for draft in localStorage to show indicator
        const checkDraft = () => {
            const savedDraft = localStorage.getItem("contactDraft");
            if (savedDraft) {
                try {
                    const parsed = JSON.parse(savedDraft);
                    setHasDraft(Object.values(parsed).some((val) => val));
                } catch {
                    setHasDraft(false);
                }
            } else {
                setHasDraft(false);
            }
        };

        checkDraft();
        // Listen for storage events to update draft indicator across tabs/components
        window.addEventListener("storage", checkDraft);
        const interval = setInterval(checkDraft, 1000); // Polling as a fallback for same-tab updates

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("storage", checkDraft);
            clearInterval(interval);
        };
    }, []);

    // Listen for custom event to open contact form
    useEffect(() => {
        const handleOpenContact = () => setIsContactOpen(true);
        window.addEventListener("open-contact", handleOpenContact);
        return () => window.removeEventListener("open-contact", handleOpenContact);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="hidden md:block">
            <TooltipProvider>
                {/* Bottom Left Contact Button */}
                <div className="fixed bottom-8 left-8 z-50">
                    <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="relative h-12 w-12 rounded-full border-primary/20 bg-background/50 backdrop-blur-sm transition-all hover:bg-primary hover:text-primary-foreground"
                                        aria-label="Contact Me"
                                    >
                                        <Code className="h-6 w-6" />
                                        {hasDraft && (
                                            <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-orange-500 border-2 border-background" />
                                        )}
                                    </Button>
                                </DialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>{hasDraft ? "Resume Draft" : "Contact Me"}</p>
                            </TooltipContent>
                        </Tooltip>
                        <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md origin-center md:!left-8 md:!bottom-24 md:!top-auto md:!right-auto md:!translate-x-0 md:!translate-y-0 md:origin-bottom-left rounded-2xl border-primary/20 bg-background/95 backdrop-blur-xl shadow-2xl data-[state=open]:slide-in-from-bottom-10 data-[state=open]:slide-in-from-left-0 data-[state=closed]:slide-out-to-bottom-10 data-[state=closed]:slide-out-to-left-0 md:w-auto">
                            <DialogHeader>
                                <DialogTitle>Contact Me</DialogTitle>
                                <DialogDescription>
                                    Send me a message and I'll get back to you as soon as possible.
                                </DialogDescription>
                            </DialogHeader>

                            <ContactForm onSuccess={() => setIsContactOpen(false)} />

                            <div className="mt-2 text-center text-xs text-muted-foreground border-t pt-4">
                                <p>
                                    Having trouble?{" "}
                                    <Link
                                        href="/contact"
                                        onClick={() => setIsContactOpen(false)}
                                        className="text-primary hover:underline font-medium"
                                    >
                                        Open full contact page
                                    </Link>
                                </p>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Bottom Right Scroll to Top Button */}
                <div className="fixed bottom-8 right-8 z-50">
                    <AnimatePresence>
                        {showScrollTop && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            onClick={scrollToTop}
                                            variant="outline"
                                            size="icon"
                                            className="h-12 w-12 rounded-full border-primary/20 bg-background/50 backdrop-blur-sm transition-all hover:bg-primary hover:text-primary-foreground"
                                            aria-label="Scroll to top"
                                        >
                                            <ArrowUp className="h-6 w-6" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="left">
                                        <p>Go to Top</p>
                                    </TooltipContent>
                                </Tooltip>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </TooltipProvider>
        </div>
    );
}
