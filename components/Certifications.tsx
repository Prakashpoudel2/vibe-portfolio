'use client';
import { Award, ExternalLink } from 'lucide-react';

const certs = [
  {
    title: 'Frontend Web Development Certification',
    issuer: 'FreeCodeCamp',
    date: '2024',
    link: '#'
  },
  {
    title: 'React - The Complete Guide',
    issuer: 'Udemy',
    date: '2025',
    link: '#'
  },
  {
    title: 'Modern CSS with Tailwind',
    issuer: 'Frontend Masters',
    date: '2025',
    link: '#'
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <span className="font-mono text-xs text-primary uppercase tracking-widest opacity-80">04 / Achievements</span>
        <h2 className="text-4xl md:text-5xl font-black mt-2 mb-12 grad-text">Certifications</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {certs.map((c, i) => (
            <div key={i} className="glass rounded-2xl p-6 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 group">
              <Award className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-foreground mb-2">{c.title}</h3>
              <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                <span className="font-semibold">{c.issuer}</span>
                <span className="font-mono">{c.date}</span>
              </div>
              <a href={c.link} className="inline-flex items-center gap-1 text-sm text-primary hover:text-accent transition-colors font-semibold">
                View Credential <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
