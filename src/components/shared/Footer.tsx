import { Github, Twitter, Linkedin } from "lucide-react";
import { Container } from "./Container";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background pb-24 md:pb-0">
      <Container className="py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} PortfolioFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-6 w-6 text-muted-foreground transition-colors hover:text-accent" />
            </Link>
            <Link href="#" aria-label="GitHub">
              <Github className="h-6 w-6 text-muted-foreground transition-colors hover:text-accent" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6 text-muted-foreground transition-colors hover:text-accent" />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
