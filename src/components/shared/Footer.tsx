import { Github, Twitter, Linkedin, Facebook, Instagram } from "lucide-react";
import { Container } from "./Container";
import Link from "next/link";
import { profilesData } from "@/lib/placeholder-data";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
};

export function Footer() {
  return (
    <footer className="border-t bg-background pb-24 md:pb-0">
      <Container className="py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Saidul Ali Mallick. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {profilesData.map((profile) => {
              const Icon = iconMap[profile.icon];
              return (
                <Link
                  key={profile.id}
                  href={profile.url}
                  aria-label={profile.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="h-5 w-5 text-muted-foreground transition-colors hover:text-accent" />
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </footer>
  );
}
