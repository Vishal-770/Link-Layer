"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { BarChart3, Globe2, ShieldCheck, Zap, Link2, QrCode } from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    stat: "Fast",
    label: "Instant Redirects",
    desc: "Your links open in milliseconds. No delays, no friction for your visitors.",
  },
  {
    icon: ShieldCheck,
    stat: "Safe",
    label: "Link Protection",
    desc: "Every link is checked for harmful content before it goes live.",
  },
  {
    icon: BarChart3,
    stat: "Live",
    label: "Click Analytics",
    desc: "See who clicks your links, where they are, and what device they use.",
  },
  {
    icon: Globe2,
    stat: "Global",
    label: "Works Everywhere",
    desc: "Your links work reliably for everyone, anywhere in the world.",
  },
  {
    icon: Link2,
    stat: "Yours",
    label: "Custom Short Links",
    desc: "Pick a custom name for your link that's easy to remember and share.",
  },
  {
    icon: QrCode,
    stat: "Print",
    label: "Dynamic QR Engine",
    desc: "Generate high-resolution QR codes with custom designs for every link.",
  },
];

export default function ScrollRevealCards() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Section heading reveal
    gsap.from(".src-heading", {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".src-heading",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Cards staggered from bottom
    gsap.from(".feature-card", {
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: {
        each: 0.12,
        from: "start",
      },
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".cards-grid",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    // Individual stat counters animate in
    gsap.from(".card-stat", {
      opacity: 0,
      scale: 0.5,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".cards-grid",
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
    });

    // Progress bar that fills on scroll
    gsap.from(".progress-fill", {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-20 md:py-32 lg:py-40 bg-muted/5 border-y border-border/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 space-y-12 md:space-y-16 lg:space-y-24">

        {/* Header */}
        <div className="src-heading max-w-3xl space-y-6 md:space-y-8">
          <p className="text-[8px] md:text-[9px] lg:text-[10px] font-mono uppercase tracking-[0.6em] md:tracking-[0.8em] text-primary">
            What You Get
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase italic tracking-tighter leading-tight md:leading-[0.9] lg:leading-[0.85] text-foreground">
            Built for <br />
            <span className="text-primary">Everyone.</span>
          </h2>
          <p className="text-sm md:text-base lg:text-xl text-muted-foreground font-medium italic leading-relaxed">
            Simple tools to shorten, share, and track your links — no technical knowledge needed.
          </p>

          {/* Animated Progress Bar */}
          <div className="space-y-2 pt-2 md:pt-4">
            <div className="flex justify-between text-[8px] md:text-[9px] font-mono uppercase tracking-wider md:tracking-widest text-muted-foreground/40">
              <span>System Load</span>
              <span>Optimized</span>
            </div>
            <div className="h-[1px] bg-border/20 w-full overflow-hidden">
              <div className="progress-fill h-full bg-primary w-full" />
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="cards-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/10 border border-border/10 rounded-2xl md:rounded-3xl overflow-hidden">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="feature-card group bg-background p-6 md:p-8 lg:p-10 space-y-6 md:space-y-8 transition-colors duration-300 hover:bg-muted/5 relative"
              >
                {/* Top line accent on hover */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div className="flex items-start justify-between gap-4">
                  <div className="h-10 md:h-12 w-10 md:w-12 rounded-lg md:rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 md:h-6 w-5 md:w-6 text-primary" />
                  </div>
                  <span className="card-stat text-2xl md:text-3xl font-black tracking-tighter text-primary italic">
                    {feature.stat}
                  </span>
                </div>

                <div className="space-y-2 md:space-y-3">
                  <h3 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-foreground">
                    {feature.label}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
