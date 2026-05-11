'use client';
import { motion } from 'framer-motion';

export default function Skills({ cmsData, categoriesData }: { cmsData?: any[], categoriesData?: any[] }) {
  // Use fetched categories or fall back to defaults
  const categories = categoriesData && categoriesData.length > 0 
    ? categoriesData 
    : [
        { name: 'Frontend', description: 'Crafting beautiful, responsive user interfaces.', icon: '💻' },
        { name: 'Backend', description: 'Building robust server-side logic and APIs.', icon: '⚡' },
        { name: 'AI Stack', description: 'Integrating intelligent models into applications.', icon: '🤖' },
        { name: 'Workflow', description: 'Optimizing development speed and deployment.', icon: '🛠️' }
      ];

  return (
    <section id="skills" className="py-28 px-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <span className="font-mono text-xs text-primary uppercase tracking-widest opacity-80">02 / Skills</span>
        <h2 className="text-4xl md:text-5xl font-black mt-2 mb-12 grad-text">Core Skills</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div key={cat.name}
              className="glass rounded-[2rem] p-8 hover:border-primary/40
                hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500 inline-block">{cat.icon}</div>
              <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">{cat.name}</h3>
              <p className="text-xs text-muted-foreground font-medium mb-6 line-clamp-3 min-h-[3rem]">
                {cat.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {cmsData?.filter(s => s.category === cat.name).slice(0, 4).map(s => (
                  <span key={s.id}
                    className="text-[10px] font-bold px-3 py-1.5 rounded-xl border border-border bg-secondary/50 text-foreground">
                    {s.icon} {s.name}
                  </span>
                ))}
                {(cmsData?.filter(s => s.category === cat.name).length ?? 0) > 4 && (
                  <span className="text-[10px] font-black text-muted-foreground ml-1">+{ (cmsData?.filter(s => s.category === cat.name).length ?? 0) - 4 } more</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
