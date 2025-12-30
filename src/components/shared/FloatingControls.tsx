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

export function FloatingControls() {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [hasDraft, setHasDraft] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        const handleScroll = () => {
            // Show button when page is scrolled down
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        const savedDraft = localStorage.getItem("contactDraft");
        if (savedDraft) {
            try {
                const parsed = JSON.parse(savedDraft);
                setFormData(parsed);
                setHasDraft(Object.values(parsed).some((val) => val));
            } catch {
                // Failed to parse draft - ignore and continue
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Listen for custom event to open contact form
    useEffect(() => {
        const handleOpenContact = () => setIsContactOpen(true);
        window.addEventListener("open-contact", handleOpenContact);
        return () => window.removeEventListener("open-contact", handleOpenContact);
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { id, value } = e.target;
        const newData = { ...formData, [id]: value };
        setFormData(newData);
        localStorage.setItem("contactDraft", JSON.stringify(newData));
        setHasDraft(Object.values(newData).some((val) => val));
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsContactOpen(false);
        toast({
            title: "Message Sent!",
            description: "Thanks for reaching out. I'll get back to you soon.",
        });
        // Clear draft
        setFormData({ name: "", email: "", message: "" });
        setHasDraft(false);
        localStorage.removeItem("contactDraft");
    };

    const handleReset = () => {
        setFormData({ name: "", email: "", message: "" });
        setHasDraft(false);
        localStorage.removeItem("contactDraft");
        toast({ title: "Draft Cleared", description: "Form has been reset." });
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
                            <form onSubmit={handleContactSubmit} className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Your Name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Type your message here..."
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleReset}
                                        className="text-muted-foreground hover:text-destructive gap-2"
                                    >
                                        <RotateCcw className="h-3.5 w-3.5" />
                                        Reset
                                    </Button>
                                    <Button type="submit" className="gap-2">
                                        Send Message <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                            </form>
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
