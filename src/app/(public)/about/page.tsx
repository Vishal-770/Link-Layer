"use client";

import { motion, Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Globe2, 
  ShieldCheck, 
  Users2, 
  Github, 
  Twitter, 
  ExternalLink, 
  Heart,
  Cpu,
  Layers,
  Database,
  Zap,
  Activity,
  LucideIcon
} from "lucide-react";
import Link from "next/link";

// ── Components ──

const GridBackground = () => (
  <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
);

const SocialLink = ({ href, icon: Icon, label }: { href: string; icon: LucideIcon; label: string }) => (
  <Button asChild variant="outline" className="h-12 rounded-xl px-6 font-black text-[9px] uppercase tracking-widest border-border/10 hover:bg-muted active:translate-y-px transition-all">
    <Link href={href} target="_blank">
      <Icon className="mr-3 h-4 w-4 opacity-50" />
      {label}
    </Link>
  </Button>
);

// -- Animation Variants --
const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const STAGGER: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function AboutPage() {
  return (
    <main className="relative overflow-hidden selection:bg-primary/20 bg-background pb-32">
      <GridBackground />
      
      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 page-shell text-center italic">
        <motion.div 
          className="flex flex-col items-center space-y-12"
          initial="hidden"
          animate="show"
          variants={STAGGER}
        >
          <motion.div variants={FADE_UP}>
            <Badge variant="outline" className="rounded-lg px-6 py-2 font-black bg-background border-border/40 shadow-none uppercase tracking-[0.4em] text-[10px] text-muted-foreground">
              <Heart className="mr-3 h-3.5 w-3.5 inline text-rose-500/60" />
              Manifesto v1.0
            </Badge>
          </motion.div>
          
          <motion.div variants={FADE_UP} title="The LinkLayer Mission" className="space-y-10">
            <h1 className="max-w-4xl text-6xl font-black tracking-tight sm:text-[100px] text-foreground !leading-[0.85] uppercase italic">
              Digital <br /> <span className="text-primary italic">Permanence.</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground font-bold leading-relaxed italic border-l-2 border-primary/20 pl-8 inline-block">
               LinkLayer exists to provide surgical clarity for the modern web infrastructure. We bridge the gap between deep engineering and professional identity.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Creator Spotlight ── */}
      <section className="py-24 page-shell relative">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full h-full bg-primary/5 blur-[150px] rounded-full opacity-30" />
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="relative rounded-[50px] border border-border/40 bg-card overflow-hidden shadow-2xl group"
         >
            <div className="grid lg:grid-cols-2">
               <div className="p-12 lg:p-24 space-y-10 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-border/10">
                  <Badge className="w-fit bg-secondary/10 text-secondary border-secondary/20 font-black uppercase tracking-widest text-[9px]">The Creator</Badge>
                  <h2 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9]">
                     Vishal <br/> <span className="text-muted-foreground/30 text-6xl italic">Dev.</span>
                  </h2>
                  <p className="text-muted-foreground font-medium text-lg leading-relaxed italic">
                     A software engineer focused on building high-performance web infrastructure and state-of-the-art user experiences. LinkLayer is a testament to the belief that every utility should be a masterpiece of engineering.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 pt-4">
                     <SocialLink href="https://github.com/Vishal-770/Link-Layer" icon={Github} label="Github" />
                     <SocialLink href="https://x.com/vishal_7707" icon={Twitter} label="X / Twitter" />
                     <SocialLink href="https://vishaldev.space" icon={ExternalLink} label="Portfolio" />
                  </div>
               </div>
               
               <div className="p-12 lg:p-24 bg-muted/20 flex items-center justify-center relative overflow-hidden group-hover:bg-muted/30 transition-colors duration-1000">
                  <div className="relative z-10 w-full overflow-hidden rounded-[40px] border border-border/40 bg-background p-10 space-y-8 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-700">
                     <div className="flex items-center gap-4 border-b border-border/10 pb-6">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black">V</div>
                        <div>
                           <p className="text-sm font-black uppercase tracking-tighter">Vishal-770</p>
                           <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active Maintainer</p>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <div className="h-2 w-full bg-muted rounded-full" />
                        <div className="h-2 w-2/3 bg-muted rounded-full" />
                        <div className="grid grid-cols-2 gap-4 pt-4">
                           <div className="h-20 rounded-2xl bg-secondary/5 border border-secondary/10 flex flex-col items-center justify-center gap-2">
                              <Activity className="h-5 w-5 text-secondary" />
                              <span className="text-[9px] font-black uppercase tracking-widest">Commits</span>
                           </div>
                           <div className="h-20 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col items-center justify-center gap-2">
                              <Zap className="h-5 w-5 text-primary" />
                              <span className="text-[9px] font-black uppercase tracking-widest">Uptime</span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <Cpu className="absolute -right-20 -top-20 h-80 w-80 text-primary/[0.02] group-hover:rotate-12 transition-transform duration-[3s]" strokeWidth={1} />
               </div>
            </div>
         </motion.div>
      </section>

      {/* ── Values Matrix ── */}
      <section className="py-24 page-shell overflow-hidden">
         <motion.div 
           initial="hidden"
           whileInView="show"
           viewport={{ once: true }}
           variants={STAGGER}
           className="grid md:grid-cols-3 gap-8"
         >
            {[
               {
                  title: "Surgical Clarity",
                  desc: "Every redirection path is optimized for sub-50ms latency using a globally distributed cache-aside architecture.",
                  icon: Globe2
               },
               {
                  title: "Enforced Security",
                  desc: "Proactive scanning via Safe Browsing API v4 ensures your brand identity is never linked to malicious actors.",
                  icon: ShieldCheck
               },
               {
                  title: "Operational Velocity",
                  desc: "A dashboard designed for precision engineering, giving you the birds-eye view required for high-volume sharing.",
                  icon: Users2
               }
            ].map((value, i) => (
               <motion.div 
                 key={i} 
                 variants={FADE_UP}
                 className="p-12 rounded-[40px] border border-border/10 bg-card/40 backdrop-blur-3xl space-y-8 hover:border-primary/20 transition-all group italic"
               >
                  <div className="h-16 w-16 rounded-2xl bg-secondary/5 flex items-center justify-center border border-secondary/10 transition-colors group-hover:bg-secondary/10">
                     <value.icon className="h-8 w-8 text-secondary/40 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="space-y-4">
                     <h3 className="text-xl font-black uppercase tracking-widest italic">{value.title}</h3>
                     <p className="text-xs text-muted-foreground/60 font-bold leading-relaxed">
                        {value.desc}
                     </p>
                  </div>
               </motion.div>
            ))}
         </motion.div>
      </section>

      {/* ── Architecture Stack ── */}
      <section className="py-24 lg:py-40 bg-foreground text-background overflow-hidden relative border-y border-background/10">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,white_0.02px,transparent_0)] bg-[size:40px_40px] opacity-10" />
         <div className="page-shell relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-12">
               <Badge className="bg-primary/20 text-primary border-primary/20 font-black uppercase tracking-widest text-[9px]">The Stack</Badge>
               <h2 className="text-6xl sm:text-8xl font-black tracking-tighter leading-none italic">
                  Built to <br/> <span className="text-primary italic">Endure.</span>
               </h2>
               <p className="text-xl text-background/60 leading-relaxed font-medium italic">
                  LinkLayer is architected using the most advanced primitives of the modern web. Every decision, from state management to caching strategy, is taken to maximize reliability.
               </p>
               <div className="flex flex-wrap justify-center gap-12 pt-12 italic">
                  {[
                     { l: "Next.js 15", i: Layers },
                     { l: "Redis Cache", i: Zap },
                     { l: "MongoDB", i: Database },
                     { l: "Lucide Icons", i: Activity }
                  ].map((s, i) => (
                     <div key={i} className="flex items-center gap-4 border border-background/10 rounded-full px-8 py-4">
                        <s.i className="h-5 w-5 text-primary" />
                        <span className="text-xs font-black uppercase tracking-[0.2em]">{s.l}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="pt-24 pb-20 page-shell text-center">
        <div className="space-y-10 max-w-4xl mx-auto italic">
           <h2 className="text-5xl sm:text-7xl font-black tracking-tighter italic">Join the <span className="text-primary italic">Infrastructure.</span></h2>
           <Button asChild size="lg" className="h-20 rounded-[28px] px-16 font-black text-[16px] uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all outline-none">
              <Link href="/signin">Start Building Now</Link>
           </Button>
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/30 pt-10">
              LinkLayer • About The Platform • 2026
           </p>
        </div>
      </section>
    </main>
  );
}
