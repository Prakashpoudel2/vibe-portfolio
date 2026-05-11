'use client';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    text: "Prakash is an incredibly fast learner and dedicated developer. He turns ideas into beautiful, responsive web apps effortlessly.",
    author: "Jane Doe",
    role: "Senior Frontend Engineer"
  },
  {
    text: "Working with Prakash was a breeze. He understands modern design aesthetics and always delivers high-quality code.",
    author: "John Smith",
    role: "Product Manager"
  }
];

export default function Testimonials() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <span className="font-mono text-xs text-primary uppercase tracking-widest opacity-80">06 / Testimonials</span>
        <h2 className="text-4xl md:text-5xl font-black mt-2 mb-12 grad-text">People Say</h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <div key={i} className="glass rounded-3xl p-8 relative hover:-translate-y-2 transition-transform duration-300">
              <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/20 rotate-180" />
              <p className="text-lg text-muted-foreground italic mb-6 relative z-10 leading-relaxed">&quot;{t.text}&quot;</p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                  {t.author.charAt(0)}
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-foreground">{t.author}</h4>
                  <p className="text-xs text-muted-foreground font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
