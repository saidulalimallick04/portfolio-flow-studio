"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Send, RotateCcw } from "lucide-react";

interface ContactFormProps {
    onSuccess?: () => void;
    className?: string;
}

export function ContactForm({ onSuccess, className }: ContactFormProps) {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [hasDraft, setHasDraft] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
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

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Here you would typically send the data to a backend
        console.log("Form submitted:", formData);

        toast({
            title: "Message Sent!",
            description: "Thanks for reaching out. I'll get back to you soon.",
        });

        // Clear draft
        setFormData({ name: "", email: "", message: "" });
        setHasDraft(false);
        localStorage.removeItem("contactDraft");

        if (onSuccess) {
            onSuccess();
        }
    };

    const handleReset = () => {
        setFormData({ name: "", email: "", message: "" });
        setHasDraft(false);
        localStorage.removeItem("contactDraft");
        toast({ title: "Draft Cleared", description: "Form has been reset." });
    };

    return (
        <form onSubmit={handleContactSubmit} className={`grid gap-4 py-4 ${className}`}>
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
    );
}
