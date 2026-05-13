"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Components
import HeroScene from "@/components/landing/HeroScene";
import GsapConfig from "@/components/landing/GsapConfig";
import CustomCursor from "@/components/landing/CustomCursor";
import StickyImageMask from "@/components/landing/StickyImageMask";
import HorizontalWorkflow from "@/components/landing/HorizontalWorkflow";
import TechnicalAccordion from "@/components/landing/TechnicalAccordion";
import ScrollRevealCards from "@/components/landing/ScrollRevealCards";
import StatCounters from "@/components/landing/StatCounters";
import FeatureToggle from "@/components/landing/FeatureToggle";

function SplitTextContainer({ children, className = "", style }: { children: string; className?: string; style?: React.CSSProperties }) {
  const words = children.split(" ");
  return (
    <div className={`overflow-hidden flex flex-wrap gap-x-[0.3em] ${className}`} style={style}>
      {words.map((word, i) => (
        <span key={i} className="split-word inline-block will-change-transform">
          {word}
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  const containerRef = useRef(null);
  const scanRef = useRef(null);

  useGSAP(() => {
    // 1. Page Load Wipe — curtain slides up
    gsap.to(scanRef.current, {
      yPercent: 100,
      duration: 1.5,
      ease: "power4.inOut",
      delay: 0.2
    });

    // 2. Hero Timeline — staggered word reveal
    const tl = gsap.timeline({ delay: 1 });
    tl.from(".split-word", {
      y: 120,
      opacity: 0,
      rotateX: -60,
      stagger: 0.04,
      duration: 1.2,
      ease: "power4.out"
    })
    .from(".hero-subtext", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
    .from(".hero-cta", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6");

    // 3. Scroll progress bar
    gsap.to("#nav-progress", {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3
      }
    });

    // 4. Fast Links section reveal
    gsap.from(".infra-text", {
      x: -60,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: "#infra",
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });
    gsap.from(".infra-image", {
      x: 60,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: "#infra",
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });

  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="landing-cursor-none relative selection:bg-primary/20 bg-background overflow-x-hidden">
      <GsapConfig />
      <CustomCursor />

      {/* ── Page Load Curtain (no spinning logo) ── */}
      <div ref={scanRef} className="fixed inset-0 z-[100] bg-foreground flex items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center gap-10">
          <div className="h-14 w-14 relative">
            <Image src="/logo.png" alt="Logo" fill className="object-contain opacity-90" />
          </div>
          <div className="flex flex-col items-center gap-3">
            <p className="text-[9px] font-mono uppercase tracking-[1.2em] text-background/60">
              LinkLayer
            </p>
            <div className="w-48 h-[1px] bg-background/10 overflow-hidden">
              <div className="loader-bar h-full w-0 bg-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll Progress ── */}
      <div id="nav-progress" className="fixed top-0 left-0 z-[100] h-[1.5px] bg-primary w-0" />

      {/* ── Navbar (absolute, scrolls with page) ── */}
      <nav className="absolute top-0 inset-x-0 z-50 h-16 md:h-20 border-b border-border/10 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="h-8 md:h-10 w-8 md:w-10 relative flex-shrink-0">
              <Image src="/logo.png" alt="LinkLayer Logo" fill className="object-contain" />
            </div>
            <span className="text-xs md:text-sm font-black uppercase tracking-[0.3em] md:tracking-[0.4em] italic text-foreground hidden sm:block">
              LinkLayer
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 lg:gap-10 text-[9px] lg:text-[10px] font-mono uppercase tracking-[0.3em] md:tracking-[0.4em] text-muted-foreground">
            <Link href="#workflow" className="hover-target hover:text-primary transition-colors">Workflow</Link>
            <Link href="#infra" className="hover-target hover:text-primary transition-colors">Infrastructure</Link>
            <Link href="#security" className="hover-target hover:text-primary transition-colors">Security</Link>
            <Link href="#global" className="hover-target hover:text-primary transition-colors">Global Matrix</Link>
          </div>
          <Button asChild size="sm" className="rounded-full font-mono text-[8px] md:text-[9px] uppercase tracking-widest bg-primary px-4 md:px-10 border-none flex-shrink-0">
            <Link href="/signin">Initiate</Link>
          </Button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col justify-center items-center pt-28 md:pt-24 pb-16 md:pb-20 px-4 md:px-6 lg:px-8 skew-velocity">
        <div className="hero-scene-wrapper absolute inset-0 -z-10 opacity-30">
          <HeroScene />
        </div>

        <div className="max-w-5xl w-full relative z-10 text-center space-y-6 md:space-y-10 lg:space-y-16">
          <div className="hero-subtext inline-block px-3 py-1.5 md:px-6 md:py-2 rounded-full border border-primary/20 bg-primary/5 text-[7px] md:text-[8px] lg:text-[9px] font-mono uppercase tracking-[0.3em] md:tracking-[0.5em] lg:tracking-[0.8em] text-primary">
            Engineering Fast Connections
          </div>

          <div className="space-y-4 md:space-y-6">
            <SplitTextContainer className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[100px] font-black tracking-tighter leading-[0.9] md:leading-[0.85] lg:leading-[0.8] uppercase italic justify-center" style={{
              fontSize: 'clamp(2rem, 8vw, 140px)',
              lineHeight: 'clamp(1.8rem, 7.2vw, 112px)',
            }}>
              SIMPLE. POWERFUL. LINKS.
            </SplitTextContainer>
          </div>

          <div className="hero-subtext max-w-2xl mx-auto px-3 md:px-4 lg:px-0">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground font-medium leading-relaxed md:leading-loose italic border-l-2 border-primary/20 pl-4 md:pl-6 lg:pl-8 mx-auto w-fit text-left">
              High-integrity redirection flows for modern digital assets.
            </p>
          </div>

          <div className="hero-cta flex flex-col sm:flex-row justify-center gap-3 md:gap-4 lg:gap-6 pt-2 md:pt-4 w-full px-0">
            <Button asChild size="lg" className="h-11 md:h-14 lg:h-16 w-full sm:w-auto px-6 md:px-10 lg:px-16 rounded-lg md:rounded-xl font-black text-xs md:text-sm uppercase tracking-[0.1em] md:tracking-[0.15em] lg:tracking-[0.2em] bg-primary border-none">
              <Link href="/signin">Get Started Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-11 md:h-14 lg:h-16 w-full sm:w-auto px-6 md:px-10 lg:px-16 rounded-lg md:rounded-xl font-black text-xs md:text-sm uppercase tracking-[0.1em] md:tracking-[0.15em] lg:tracking-[0.2em] border-border/40 text-foreground bg-transparent">
              <Link href="#workflow">See How It Works</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Horizontal Workflow ── */}
      <div id="workflow">
        <HorizontalWorkflow />
      </div>

      {/* ── Fast Links ── */}
      <section id="infra" className="py-20 md:py-32 lg:py-40 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
          <div className="infra-text space-y-8 md:space-y-12">
            <div className="space-y-4 md:space-y-6">
              <div className="h-12 md:h-16 w-12 md:w-16 rounded-2xl md:rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <Zap className="h-6 md:h-8 w-6 md:w-8 text-primary" />
              </div>
              <SplitTextContainer className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter uppercase italic text-foreground leading-[0.9] md:leading-[0.85]">
                FAST LINKS.
              </SplitTextContainer>
            </div>
            <p className="text-base md:text-xl lg:text-2xl text-muted-foreground leading-relaxed md:leading-loose font-medium italic border-l-4 border-primary/10 pl-4 md:pl-6 lg:pl-8">
              Users hate waiting. Our global network makes sure your links resolve instantly, no matter where they are.
            </p>
            <div className="flex flex-wrap gap-6 md:gap-8 lg:gap-12">
              {["Redis Optimized", "State-at-Edge", "Anycast Networking"].map((f, i) => (
                <div key={i} className="flex items-center gap-2 md:gap-3 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.3em] md:tracking-[0.4em] text-foreground/60">
                  <Check className="h-3 md:h-4 w-3 md:w-4 text-primary flex-shrink-0" /> {f}
                </div>
              ))}
            </div>
          </div>
          <div className="infra-image relative aspect-square rounded-2xl md:rounded-3xl lg:rounded-[50px] overflow-hidden border border-border/40">
            <Image src="/fast_links_visual_1777047654399.png" alt="Fast Links" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* ── Sticky Mask Reveal (Security) ── */}
      <div id="security">
        <StickyImageMask
          src="/secure_protection_visual_1777047673908.png"
          title="Absolute Safety"
          subtitle="Security Protocol"
        />
      </div>

      {/* ── Technical FAQ ── */}
      <TechnicalAccordion />

      {/* ── Stat Counters (New Component 1) ── */}
      <StatCounters />


      {/* ── Feature Toggle Cards (New Component 3) ── */}
      <FeatureToggle />

      {/* ── Scroll Reveal Feature Cards ── */}
      <ScrollRevealCards />

      {/* ── Final CTA ── */}
      <section id="global" className="py-20 md:py-32 lg:py-40 px-4 md:px-6 lg:px-8 skew-velocity border-t border-border/10">
        <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-12">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-tight md:leading-none uppercase italic">
            Ready to <br /> <span className="text-primary">Shorten?</span>
          </h2>
          <p className="text-base md:text-xl lg:text-2xl text-muted-foreground font-medium italic">
            Join thousands of users and start creating smart links in seconds.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 lg:gap-6 pt-2 md:pt-4 flex-wrap">
            <Button asChild size="lg" className="h-11 md:h-14 lg:h-16 px-6 md:px-12 lg:px-16 rounded-lg md:rounded-xl font-black text-xs md:text-sm uppercase tracking-[0.1em] md:tracking-[0.2em] bg-primary border-none text-primary-foreground">
              <Link href="/signin">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-11 md:h-14 lg:h-16 px-6 md:px-12 lg:px-16 rounded-lg md:rounded-xl font-black text-xs md:text-sm uppercase tracking-[0.1em] md:tracking-[0.2em] border-border/40 text-foreground bg-transparent">
              <Link href="#infra">Explore Features</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
