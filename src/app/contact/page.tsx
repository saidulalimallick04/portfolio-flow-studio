import { ContactForm } from "@/components/shared/ContactForm";
import { Container } from "@/components/shared/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Me | Saidul Ali Mallick",
    description: "Get in touch with me for collaborations, freelance work, or just to say hi.",
};

export default function ContactPage() {
    return (
        <Container className="py-24 md:py-32">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Get in Touch</h1>
                    <p className="text-xl text-muted-foreground">
                        Have a project in mind or want to collaborate? I'd love to hear from you.
                        Fill out the form below and I'll get back to you as soon as possible.
                    </p>
                </div>

                <div className="bg-card/50 backdrop-blur-sm border rounded-2xl p-6 md:p-8 shadow-sm">
                    <ContactForm />
                </div>
            </div>
        </Container>
    );
}
