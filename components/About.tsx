'use client';
import { useRef, useEffect } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'framer-motion';

function StatCard({ num, prefix, suffix, label }: { num: number; prefix?: string; suffix?: string; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="glass rounded-xl p-5 text-center hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
      <span className="block text-3xl font-black grad-text-accent">
        {prefix}
        {isInView ? <CountUp end={num} duration={2.5} /> : '0'}
        {suffix}
      </span>
      <span className="text-xs text-muted-foreground mt-1 block font-semibold">{label}</span>
    </div>
  );
}

const interests = ['🤖 Prompt Engineering','⚡ Vibe Coding','🎨 Generative UI','🧠 AI Workflows','🚀 Rapid Prototyping'];
const langs = [
  { name: 'AI Prompts',  pct: '100%' },
  { name: 'English', pct: '85%'  },
  { name: 'Nepali',   pct: '100%'  },
];

export default function About({ cmsData }: { cmsData?: any }) {
  const data = {
    title: cmsData?.title || "Who Am I?",
    p1: cmsData?.p1 || "I am an AI-empowered Developer (Vibe Coder) from Kathmandu, Nepal. Instead of just typing code line by line, I build web applications by orchestrating advanced AI tools like Claude, Cursor, and ChatGPT.",
    p2: cmsData?.p2 || "I specialize in bridging the gap between human creativity and AI execution. By leveraging LLMs, I can prototype, design, and ship complex full-stack applications in a fraction of the time it takes traditionally. I am not just a coder; I am a director of intelligent systems."
  };

  // lang bar animation
  useEffect(() => {
    const bars = document.querySelectorAll<HTMLElement>('.lang-fill');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          el.style.width = el.dataset.width!;
          obs.unobserve(el);
        }
      });
    }, { threshold: .5 });
    bars.forEach(b => { b.style.width = '0'; obs.observe(b); });
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="py-28 px-6 bg-secondary/30 relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <span className="font-mono text-xs text-primary uppercase tracking-widest opacity-80">01 / About</span>
          <h2 className="text-4xl md:text-5xl font-black mt-2 grad-text">{data.title}</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mt-12 items-start">
          <div>
            <p className="text-muted-foreground text-lg mb-5 leading-relaxed">
              {data.p1}
            </p>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {data.p2}
            </p>
            <div className="grid grid-cols-3 gap-4">
              <StatCard num={10} suffix="x" label="Faster Shipping" />
              <StatCard num={24} suffix="/7" label="Vibing" />
              <StatCard num={3} suffix="+" label="AI Models Used" />
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Interests</h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {interests.map(i => (
                <span key={i} className="px-4 py-1.5 rounded-full text-sm glass
                  border border-border text-foreground font-medium
                  hover:bg-primary/10 hover:border-primary/30 hover:scale-105 transition-all duration-300 cursor-default">
                  {i}
                </span>
              ))}
            </div>

            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Languages</h3>
            <div className="flex flex-col gap-4">
              {langs.map(l => (
                <div key={l.name} className="flex items-center gap-4">
                  <span className="w-16 text-sm text-muted-foreground font-semibold shrink-0">{l.name}</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="lang-fill h-full rounded-full" data-width={l.pct} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
