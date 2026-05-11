'use client';
import { useRef } from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

function ProjectCard({ p, idx }: { p: any; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width  / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    el.style.transform = `translateY(-12px) rotateX(${-y/25}deg) rotateY(${x/25}deg)`;
    el.style.transition = 'transform .1s';
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = '';
    ref.current.style.transition = 'transform .5s cubic-bezier(.25,.8,.25,1)';
  };

  return (
    <motion.div 
      ref={ref} 
      onMouseMove={onMove} 
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      className={`glass rounded-[2.5rem] p-0 relative overflow-hidden group flex flex-col h-full
        hover:border-primary/40 hover:shadow-[0_30px_70px_rgba(99,102,241,0.15)]
        transition-all duration-300 ${p.featured ? 'border-primary/30' : ''}`}
      style={{ transformStyle: 'preserve-3d' }}>

      {/* Project Image Container */}
      <div className="aspect-[16/10] overflow-hidden relative">
        {p.image ? (
          <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
        ) : (
          <div className="w-full h-full bg-secondary/50 flex items-center justify-center text-6xl opacity-20">{p.icon}</div>
        )}
        
        {/* Overlay Links */}
        <div className="absolute inset-0 bg-primary/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-6 z-20">
          {p.github && (
            <a href={p.github} target="_blank" rel="noreferrer" className="p-4 rounded-2xl bg-background text-foreground hover:scale-110 transition-all shadow-2xl" aria-label="GitHub">
              <FaGithub className="w-6 h-6" />
            </a>
          )}
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer" className="p-4 rounded-2xl bg-background text-foreground hover:scale-110 transition-all shadow-2xl" aria-label="Live Demo">
              <ExternalLink className="w-6 h-6" />
            </a>
          )}
        </div>

        {/* Category Tag */}
        <div className="absolute top-6 left-6 z-10">
          <span className="bg-background/90 backdrop-blur-md border border-border px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">{p.icon} Project</span>
        </div>
      </div>

      <div className="p-10 flex flex-col flex-grow relative">
        <div className="flex gap-2 flex-wrap mb-6">
          {p.tech?.map((t: string) => (
            <span key={t} className="text-[10px] font-black font-mono
              glass border-primary/20 text-primary px-3 py-1.5 rounded-xl uppercase tracking-widest">
              {t}
            </span>
          ))}
        </div>

        <h3 className="text-2xl font-black text-foreground mb-4 group-hover:text-primary transition-colors tracking-tight leading-tight">{p.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8 font-medium opacity-80">{p.description}</p>

        <div className="mt-auto flex items-center justify-between">
           <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center font-mono text-xl font-black opacity-10 group-hover:opacity-30 transition-opacity">
            {String(idx + 1).padStart(2, '0')}
           </div>
           <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-2">
             View Details <ArrowRight size={14} />
           </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ cmsData }: { cmsData?: any[] }) {
  const data = cmsData && cmsData.length > 0 ? cmsData : [];

  return (
    <section id="projects" className="py-32 px-6 bg-secondary/10 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -ml-64 -mb-32 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16">
          <span className="font-mono text-[10px] text-primary uppercase tracking-[0.4em] font-black opacity-60">03 / Projects</span>
          <h2 className="text-5xl md:text-7xl font-black mt-4 grad-text tracking-tighter">Featured Work.</h2>
        </div>

        {data.length === 0 ? (
          <div className="text-center py-32 border-4 border-dashed border-border rounded-[3rem] opacity-20">
            <p className="text-2xl font-black italic">Building the next big thing... Stay tuned!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {data.map((p, i) => <ProjectCard key={p.id} p={p} idx={i} />)}
          </div>
        )}
      </div>
    </section>
  );
}
