'use client';
import { Eye, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [views, setViews] = useState(1337);

  useEffect(() => {
    // Mock incrementing views to feel alive
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setViews(v => v + 1);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-background border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4 text-center">
        <div className="text-3xl font-black grad-text-accent mb-2">
          PP<span className="text-destructive">.</span>
        </div>
        <p className="text-muted-foreground text-sm flex items-center gap-2 justify-center">
          Designed &amp; Built with <Heart className="w-4 h-4 text-destructive fill-destructive" /> by <strong className="text-foreground">Prakash Poudel</strong>
        </p>
        <p className="text-muted-foreground text-xs">
          Built with <span className="text-foreground font-semibold">Next.js 15 · TypeScript · Tailwind v4 · Framer Motion · Supabase</span>
        </p>
        
        <div className="mt-4 px-4 py-2 rounded-full glass inline-flex items-center gap-2 text-xs font-mono text-primary font-bold">
          <Eye className="w-4 h-4" /> {views.toLocaleString()} Profile Views
        </div>

        <p className="text-muted-foreground text-xs mt-6">© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
}
