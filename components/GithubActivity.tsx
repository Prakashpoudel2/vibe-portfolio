'use client';
import { GitHubCalendar } from 'react-github-calendar';
import { useTheme } from 'next-themes';
import { FaGithub } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function GithubActivity() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <section className="py-28 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <span className="font-mono text-xs text-primary uppercase tracking-widest opacity-80 mb-2">05 / Activity</span>
        <h2 className="text-4xl md:text-5xl font-black mb-8 grad-text flex items-center gap-4 justify-center">
          <FaGithub className="w-10 h-10" /> GitHub Contributions
        </h2>
        
        <div className="glass p-8 rounded-3xl overflow-x-auto max-w-full">
          <GitHubCalendar 
            username="prakashpoudel" 
            colorScheme={theme === 'dark' ? 'dark' : 'light'}
            theme={{
              light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
              dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
            }}
          />
        </div>
      </div>
    </section>
  );
}
