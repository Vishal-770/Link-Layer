"use client";

import { motion, Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Globe2,
  QrCode,
  ShieldCheck,
  Zap,
  Check,
  Palette,
  Layers,
  Activity,
  Cpu,
  Lock,
  Database,
  Smartphone,
  Workflow,
  TrendingUp,
  X
} from "lucide-react";
import Link from "next/link";

// ── Components & Helpers ──

const GridBackground = () => (
  <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
);

const FeatureHighlight = ({ feature }: { feature: typeof detailedFeatures[0] }) => {
  const Icon = feature.icon;
  return (
    <motion.div
      className="group relative flex flex-col p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl lg:rounded-[32px] bg-card border border-border/10 transition-colors hover:border-primary/20 overflow-hidden active:translate-y-px"
    >
      <div className="relative z-10 space-y-4 md:space-y-6">
        <div className="h-12 md:h-14 w-12 md:w-14 items-center justify-center rounded-xl md:rounded-2xl bg-secondary/5 flex border border-secondary/10 group-hover:bg-secondary/10 transition-colors">
          <Icon className="h-6 md:h-7 w-6 md:w-7 text-secondary/60 group-hover:text-primary transition-colors duration-500" />
        </div>
        
        <div className="space-y-3 md:space-y-4">
          <h3 className="text-lg md:text-xl lg:text-2xl font-black tracking-tighter uppercase italic">{feature.title}</h3>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-bold italic">
            {feature.description}
          </p>
        </div>

        <ul className="space-y-2 md:space-y-3 pt-4 md:pt-6 border-t border-border/10">
          {feature.specs.map((spec, i) => (
            <li key={i} className="flex items-center gap-2 md:gap-3 text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-foreground/40 italic">
              <div className="h-1 w-1 rounded-full bg-primary/40 flex-shrink-0" />
              {spec}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

// ── Data ──

const detailedFeatures = [
  {
    title: "Global Edge Indexing",
    description: "Every link resolution is handled by a globally distributed infrastructure. By utilizing Vercel Edge Runtime alongside Redis Cloud, we guarantee redirections resolve in sub-50ms latency, regardless of your visitor's geographic location.",
    icon: Globe2,
    specs: ["Sub-50ms Global Latency", "Distributed Cache Purging", "Anycast Network Support"]
  },
  {
    title: "High-Resolution QR Engine",
    description: "Built for physical marketing campaigns. Our QR engine generates 1024x1024 SVG assets with customizable dot patterns, error correction levels (L, M, Q, H), and brand-integrated logo overlays that maintain total readability.",
    icon: QrCode,
    specs: ["SVG / PNG Export", "Custom Logo Overlays", "Error Correction Logic"]
  },
  {
    title: "Neural Analytic Fingerprinting",
    description: "Track visitor telemetry with precision. Monitor device types, browser versions, and operating systems in real-time. Our system filters bot traffic automatically to ensure your marketing data remains high-fidelity and actionable.",
    icon: BarChart3,
    specs: ["Real-time Geo-IP Mapping", "OS & Browser Tracking", "High-Volume Data Pipeline"]
  },
  {
    title: "Safe Browsing Security Gate",
    description: "Security is non-negotiable. Every destination is scanned via Google Safe Browsing API v4. We protect your brand by preventing the creation of links to sites flagged for malware, phishing, or social engineering attacks.",
    icon: ShieldCheck,
    specs: ["API v4 Real-time Scanning", "Auto-Block Malicious Links", "Link Sanitization Engine"]
  },
  {
    title: "Branded Infrastructure",
    description: "Total control over your link presence. Configure custom domains and slugs that reflect your identity. Our multi-tenant architecture ensures that your branded workspace is isolated, secure, and fast for your digital identity.",
    icon: Palette,
    specs: ["Custom Slug Management", "Internal Metadata Labels", "Workspace Isolation"]
  },
  {
    title: "Real-time Delta Sync",
    description: "Your dashboard is alive. Powered by an optimized Next.js architecture, link creation and analytics updates happen instantly. Provision your workspace, share links, and watch the data flow without refreshing the browser.",
    icon: Activity,
    specs: ["Instant Dashboard Updates", "WebSocket-Ready Stream", "Sync-First Architecture"]
  }
];

// -- Animation Variants --
const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const STAGGER: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function FeaturesPage() {
  return (
    <main className="relative overflow-hidden selection:bg-primary/20 bg-background pb-32">
      <GridBackground />

      {/* ── Hero Section ── */}
      <section className="relative pt-20 md:pt-32 pb-16 md:pb-24 lg:pt-40 lg:pb-32 page-shell text-center italic">
        <motion.div 
          className="flex flex-col items-center space-y-8 md:space-y-12"
          initial="hidden"
          animate="show"
          variants={STAGGER}
        >
          <motion.div variants={FADE_UP}>
            <Badge variant="outline" className="rounded-lg px-4 md:px-6 py-1.5 md:py-2 font-black bg-background border-border/40 shadow-none uppercase tracking-[0.3em] md:tracking-[0.4em] text-[8px] md:text-[9px] text-muted-foreground">
              <Cpu className="mr-2 md:mr-3 h-3 md:h-3.5 w-3 md:w-3.5 inline text-primary" />
              Technical Stack v4.0
            </Badge>
          </motion.div>
          
          <motion.div variants={FADE_UP} title="LinkLayer Core Architecture" className="space-y-6 md:space-y-10">
            <h1 className="max-w-4xl text-4xl md:text-6xl lg:text-[100px] font-black tracking-tight text-foreground !leading-tight md:!leading-[0.85] uppercase italic">
              Calculated <br /> <span className="text-primary italic">Routes.</span>
            </h1>
            <p className="mx-auto max-w-2xl text-sm md:text-base lg:text-lg xl:text-xl text-muted-foreground font-bold leading-relaxed md:leading-relaxed italic border-l-2 border-primary/20 pl-4 md:pl-8 inline-block">
               A high-density feature ecosystem designed for performance-first users. Redis-accelerated, Safe Browsing hardened, globally atomic.
            </p>
          </motion.div>

          <motion.div variants={FADE_UP} className="pt-4 md:pt-8">
            <Button asChild size="lg" className="h-11 md:h-14 lg:h-16 rounded-lg md:rounded-xl px-6 md:px-12 lg:px-16 font-black text-xs md:text-sm lg:text-[14px] uppercase tracking-widest bg-primary hover:bg-primary/90 transition-all outline-none border-none shadow-none">
              <Link href="/signin">Provision Infrastructure</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Interactive Workflow ── */}
      <section className="py-16 md:py-20 lg:py-24 page-shell overflow-hidden">
         <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent -z-10 hidden lg:block" />
            <div className="grid lg:grid-cols-3 gap-8 md:gap-12 lg:gap-20">
               {[
                 { 
                   step: "01", 
                   title: "Secure Inbound", 
                   desc: "Links are instantly sanitized and scanned against the Safe Browsing security gate.",
                   icon: Lock
                 },
                 { 
                   step: "02", 
                   title: "Redis Acceleration", 
                   desc: "Redirections are cached at the edge for sub-50ms resolution globally.",
                   icon: Zap
                 },
                 { 
                   step: "03", 
                   title: "Neural Analytics", 
                   desc: "Visitor telemetry is processed and mapped to your interactive dashboard.",
                   icon: Activity
                 }
               ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="relative flex flex-col items-center text-center space-y-4 md:space-y-6 group italic"
                  >
                    <div className="h-16 md:h-20 w-16 md:w-20 rounded-2xl md:rounded-[32px] bg-background border border-border/10 flex items-center justify-center transition-colors group-hover:border-primary/40 z-10">
                       <item.icon className="h-6 md:h-8 w-6 md:w-8 text-primary/40 group-hover:text-primary transition-colors duration-500" />
                    </div>
                    <div className="space-y-2 md:space-y-3">
                       <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-primary/30 group-hover:text-primary/60 transition-colors">{item.step} Protocol</p>
                       <h3 className="text-base md:text-lg lg:text-xl font-black uppercase tracking-tighter group-hover:italic transition-all">{item.title}</h3>
                       <p className="text-[10px] md:text-xs lg:text-sm text-muted-foreground/60 font-bold leading-relaxed max-w-xs md:max-w-[280px] mx-auto italic">
                          {item.desc}
                       </p>
                    </div>
                  </motion.div>
                ))}
            </div>
         </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="py-16 md:py-20 lg:py-24 page-shell relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full h-full bg-primary/5 blur-[150px] rounded-full opacity-30" />
        <motion.div 
          className="grid gap-6 md:gap-8 lg:gap-10 lg:grid-cols-2 xl:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={STAGGER}
        >
          {detailedFeatures.map((feature) => (
            <FeatureHighlight key={feature.title} feature={feature} />
          ))}
        </motion.div>
      </section>

      {/* ── Analytics Matrix Spotlight ── */}
      <section className="py-16 md:py-24 lg:py-32 page-shell">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl md:rounded-3xl lg:rounded-[50px] border border-border/40 bg-card overflow-hidden shadow-2xl group"
        >
           <div className="grid lg:grid-cols-2">
              <div className="p-6 md:p-12 lg:p-24 space-y-6 md:space-y-8 lg:space-y-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-border/10">
                 <Badge className="w-fit bg-secondary/10 text-secondary border-secondary/20 font-black uppercase tracking-widest text-[8px] md:text-[9px] px-3 md:px-4 py-1 md:py-1.5">Neural Pipeline</Badge>
                 <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter leading-tight md:leading-[0.95] lg:leading-[0.9]">
                    Deep Analytic <br/> <span className="text-muted-foreground/30 text-2xl md:text-4xl lg:text-5xl xl:text-6xl italic">Fingerprinting.</span>
                 </h2>
                 <p className="text-muted-foreground font-medium text-sm md:text-base lg:text-lg leading-relaxed md:leading-relaxed italic">
                    Understand exactly who is clicking your brand. Our analytics matrix provides high-fidelity tracking of geographic coordinates, device manufacturers, and security metadata without sacrificing user privacy.
                 </p>
                 <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                    {[
                      { l: "Mapcn Integration", i: Globe2 },
                      { l: "Bot Filtering", i: ShieldCheck },
                      { l: "Precise Geolocation", i: Activity },
                      { l: "Device Recognition", i: Smartphone }
                    ].map((s, i) => (
                      <div key={i} className="flex items-center gap-2 md:gap-4 text-[9px] md:text-[10px] lg:text-[11px] font-black uppercase tracking-wider md:tracking-widest text-foreground/80">
                         <div className="h-8 md:h-10 w-8 md:w-10 rounded-lg md:rounded-xl bg-secondary/10 flex items-center justify-center border border-secondary/20 shadow-inner flex-shrink-0">
                            <s.i className="h-4 md:h-5 w-4 md:w-5 text-secondary" />
                         </div>
                         <span className="line-clamp-2">{s.l}</span>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="p-6 md:p-12 lg:p-24 bg-muted/20 flex items-center justify-center relative overflow-hidden group-hover:bg-muted/30 transition-colors duration-1000 min-h-[300px] md:min-h-[400px]">
                 <div className="relative z-10 w-full overflow-hidden rounded-2xl md:rounded-3xl border border-border/40 bg-background p-4 md:p-8 space-y-4 md:space-y-8 shadow-2xl">
                    <div className="h-24 md:h-40 w-full rounded-lg md:rounded-2xl bg-secondary/5 border border-secondary/10 flex items-end gap-1 md:gap-1.5 p-4 md:p-6 overflow-hidden">
                       {[60, 40, 90, 70, 50, 80, 100, 65, 45, 85].map((h, i) => (
                          <motion.div 
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ repeat: Infinity, duration: 2, delay: i * 0.1, repeatType: "reverse" }}
                            className="flex-1 bg-secondary/40 rounded-full" 
                          />
                       ))}
                    </div>
                    <div className="grid grid-cols-3 gap-2 md:gap-4">
                       {[1,2,3].map(i => (
                          <div key={i} className="h-12 md:h-20 rounded-lg md:rounded-xl border border-border/10 p-2 md:p-4 space-y-1 md:space-y-2">
                             <div className="h-1 md:h-2 w-[60%] bg-muted rounded-full" />
                             <div className="h-4 md:h-6 w-full bg-secondary/10 rounded-lg animate-pulse" />
                          </div>
                       ))}
                    </div>
                 </div>
                 <BarChart3 className="absolute -right-12 md:-right-16 lg:-right-20 -bottom-12 md:-bottom-16 lg:-bottom-20 h-40 md:h-60 lg:h-80 w-40 md:w-60 lg:w-80 text-primary/[0.02] group-hover:rotate-12 transition-transform duration-[3s]" strokeWidth={1} />
              </div>
           </div>
        </motion.div>
      </section>

      {/* ── The Performance Stack ── */}
      <section className="py-24 bg-foreground text-background overflow-hidden relative border-y border-background/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,white_0.02px,transparent_0)] bg-[size:40px_40px] opacity-10" />
        <div className="page-shell relative z-10">
          <div className="grid lg:grid-cols-12 gap-20">
             <div className="lg:col-span-5 space-y-10">
                <Badge className="bg-primary/20 text-primary border-primary/20 font-black uppercase tracking-widest text-[9px]">Full Stack Visibility</Badge>
                <h2 className="text-5xl sm:text-7xl font-black tracking-tighter leading-none italic">
                   Engineered <br/> for <span className="text-primary italic">Absolute Scale.</span>
                </h2>
                <div className="space-y-6 text-background/60 font-medium text-lg leading-relaxed italic">
                   <p>
                      At LinkLayer, performance isn&apos;t an afterthought—it&apos;s the core product. We&apos;ve built our redirection engine on top of a multi-tier cache-aside architecture using Redis Cloud.
                   </p>
                   <p>
                      By utilizing Vercel Edge Runtime for resolution logic, we ensure that every click navigates through the shortest possible physical route. Your links don&apos;t just work; they resolve at the speed of the modern web infrastructure.
                   </p>
                </div>
                <div className="pt-8 flex flex-col gap-6">
                   {[
                     { l: "Redis Cache-Aside Pattern", d: "High-speed and resilient resolution logic." },
                     { l: "Vercel Edge Distribution", d: "Global resolution nodes for sub-50ms resolution." },
                     { l: "Safe Browsing Security Gate", d: "Military-grade link management and monitoring." }
                   ].map((item, i) => (
                     <div key={i} className="flex gap-4 items-start border-l-2 border-primary pl-6 py-2">
                        <div>
                           <h4 className="text-sm font-black uppercase tracking-widest mb-1 text-background">{item.l}</h4>
                           <p className="text-[11px] font-bold text-background/40">{item.d}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
             
             <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                   {[
                     { t: "Redis", d: "In-memory caching cluster", i: Zap },
                     { t: "Next.js 15", d: "Server-side state sync", i: Layers },
                     { t: "MongoDB", d: "Highly available storage", i: Database },
                     { t: "Safe Browsing", d: "Real-time threat monitoring", i: ShieldCheck }
                   ].map((t, i) => (
                      <div key={i} className="p-10 rounded-[40px] bg-background/5 border border-white/5 hover:border-primary/20 transition-all group/stack">
                         <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8 border border-white/10 group-hover/stack:bg-primary/10 group-hover/stack:border-primary/20 transition-all">
                            <t.i className="h-7 w-7 text-background/80 group-hover/stack:text-primary transition-colors" />
                         </div>
                         <h3 className="text-xl font-black text-background mb-4 uppercase tracking-tighter">{t.t}</h3>
                         <p className="text-xs text-background/40 font-bold leading-relaxed italic">{t.d}</p>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ── QR Design Lab Spotlight ── */}
      <section className="py-32 page-shell">
         <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative p-12 lg:p-24 bg-card border border-border/40 rounded-[50px] shadow-2xl overflow-hidden group">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,#00000005_1px,transparent_0)] bg-[size:40px_40px]" />
               <motion.div 
                 whileHover={{ scale: 1.05 }}
                 className="relative z-10 aspect-square bg-white rounded-[40px] shadow-inner p-16 flex items-center justify-center border border-border/10"
               >
                  <QrCode className="h-full w-full text-foreground group-hover:scale-95 transition-transform duration-[2s]" strokeWidth={1} />
               </motion.div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-10 italic">
               <Badge className="bg-primary/10 text-primary border-primary/20 font-black uppercase tracking-widest text-[9px]">Branding Engine</Badge>
               <h2 className="text-5xl sm:text-7xl font-black tracking-tighter leading-none italic">
                  The <span className="text-primary italic">QR Design</span> Laboratory.
               </h2>
               <div className="space-y-6 text-muted-foreground font-medium text-lg leading-relaxed italic">
                  <p>
                     Every link generated on LinkLayer is born with a high-fidelity physical presence. Our QR Design Lab allows you to merge digital logic with physical branding through a 4K asset pipeline.
                  </p>
                  <p>
                     Customize with surgical precision. Adjust dot densities, corner roundness, and brand colors to ensure your QR assets match your corporate identity across all print and digital media.
                  </p>
               </div>
               <div className="flex flex-col gap-6 pt-6">
                  {[
                    { l: "High-Density SVG Exports", i: Layers },
                    { l: "Dynamic Brand Sync", i: Palette },
                    { l: "Workspace Preset Logic", i: Workflow }
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-6">
                       <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center border border-secondary/20 font-black shrink-0">0{i+1}</div>
                       <p className="text-sm font-black uppercase tracking-[0.2em]">{f.l}</p>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* ── Comparison Matrix ── */}
      <section className="py-24 page-shell overflow-hidden">
         <motion.div 
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="rounded-[40px] border border-border/40 bg-card/30 backdrop-blur-xl overflow-hidden shadow-2xl"
         >
            <div className="p-10 lg:p-16 border-b border-border/10 bg-muted/20">
               <h3 className="text-3xl sm:text-4xl font-black tracking-tighter italic">LinkLayer vs <span className="text-muted-foreground/30 italic">Legacy Platforms.</span></h3>
               <p className="text-muted-foreground mt-4 font-medium italic">Why performance users choose our infrastructure over generic shorteners.</p>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="border-b border-border/10">
                        <th className="p-8 text-[11px] font-black uppercase tracking-widest text-muted-foreground">Capabilities</th>
                        <th className="p-8 text-[11px] font-black uppercase tracking-widest text-primary">Enterprise LinkLayer</th>
                        <th className="p-8 text-[11px] font-black uppercase tracking-widest text-muted-foreground/50">Generic Platforms</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-border/10">
                     {[
                        { f: "Global Redirection Latency", l: "Sub-50ms (Redis Optimized)", g: "200ms - 500ms (DB Only)" },
                        { f: "Security Protection", l: "Google Safe Browsing v4", g: "Basic Spam Filter" },
                        { f: "Analytic Precision", l: "Neural Fingerprinting", g: "Basic Click Counter" },
                        { f: "QR Asset Quality", l: "4K SVG / Print Ready", g: "Low-Res Raster" },
                        { f: "Branding Control", l: "Full Domain Isolation", g: "Shared Generic Domain" }
                     ].map((row, i) => (
                        <tr key={i} className="group hover:bg-primary/[0.02] transition-colors">
                           <td className="p-8">
                              <p className="text-sm font-black uppercase tracking-tight">{row.f}</p>
                           </td>
                           <td className="p-8">
                              <div className="flex items-center gap-3">
                                 <Check className="h-4 w-4 text-emerald-500" />
                                 <span className="text-sm font-bold text-foreground/90">{row.l}</span>
                              </div>
                           </td>
                           <td className="p-8 text-muted-foreground/40 font-medium">
                              <div className="flex items-center gap-3">
                                 <X className="h-4 w-4 text-red-500/30" />
                                 <span className="text-xs">{row.g}</span>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <div className="p-10 bg-card/50 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground italic">Efficiency Gain: +400% Improvement in redirection throughput</p>
               </div>
               <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => <div key={i} className="h-8 w-8 rounded-full border-2 border-card bg-muted flex items-center justify-center text-[10px] font-bold">U{i}</div>)}
               </div>
            </div>
         </motion.div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 page-shell text-center">
        <div className="space-y-10 max-w-4xl mx-auto italic">
           <h2 className="text-5xl sm:text-7xl font-black tracking-tighter italic">Ready to accelerate <br/> your <span className="text-primary italic">Infrastructure?</span></h2>
           <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button asChild size="lg" className="h-20 rounded-[28px] px-16 font-black text-[16px] uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all outline-none">
                 <Link href="/signin">Provision Workspace Now</Link>
              </Button>
           </div>
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/30 pt-10">
              LinkLayer • Feature Catalog • 2026
           </p>
        </div>
      </section>

      <style jsx global>{`
        @keyframes scan {
          0% { top: 0% }
          100% { top: 100% }
        }
      `}</style>
    </main>
  );
}
