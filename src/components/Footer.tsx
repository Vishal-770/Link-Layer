import { Github, Globe, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";



export default function Footer() {
  const sections = [
    {
      title: "Product",
      links: [
        { label: "Overview", href: "/" },
        { label: "Features", href: "/features" },
        { label: "Pricing", href: "#" }, // Placeholder for future
      ],
    },
    {
      title: "Platform",
      links: [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Analytics", href: "/dashboard/analyze" },
        { label: "QR Generator", href: "/dashboard" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Security", href: "/features" },
        { label: "Contact", href: "mailto:support@linklayer.com" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "#" },
      ],
    },
  ];

  return (
    <footer className="border-t border-border/40 bg-muted/20 pb-12 pt-24">
      <div className="page-shell">
        <div className="grid gap-12 lg:grid-cols-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <BrandLogo />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground font-medium italic">
              A high-performance URL infrastructure for individuals who demand precision, security, and real-time analytics.
            </p>
            <div className="flex items-center gap-4 text-muted-foreground">
              <Link href="https://github.com/Vishal-770/Link-Layer" target="_blank" className="hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://x.com/vishal_7707" target="_blank" className="hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://vishaldev.space" target="_blank" className="hover:text-primary transition-colors">
                <Globe className="h-5 w-5" />
              </Link>
              <Link href="mailto:support@linklayer.com" className="hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title} className="space-y-6 lg:col-span-1">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40">
                {section.title}
              </h3>
              <div className="flex flex-col gap-4">
                {section.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-xs font-bold text-muted-foreground transition-all hover:text-primary uppercase tracking-widest"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 pt-8 border-t border-border/40 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest">
            © 2026 LinkLayer Infrastructure. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500/60 uppercase tracking-widest">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              All Systems Operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
