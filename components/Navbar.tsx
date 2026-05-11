'use client';
import { useState, useEffect } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { Moon, Sun } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const links = [
  { href: '#about',     label: 'About'     },
  { href: '#skills',    label: 'Skills'    },
  { href: '#projects',  label: 'Projects'  },
  { href: '#education', label: 'Education' },
  { href: '#contact',   label: 'Contact'   },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'py-2 shadow-lg dark:shadow-none' : 'py-4'
    } bg-background/60 backdrop-blur-xl border-b border-border`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center gap-6">

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 ml-auto">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground relative group transition-colors duration-300">
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4 ml-4 border-l border-border pl-4">
          <a href="https://github.com/prakashpoudel" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <FaGithub className="w-5 h-5" />
          </a>
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
          <a href="#contact"
            className="px-5 py-2 rounded-full text-sm font-semibold text-white
              bg-gradient-to-r from-[var(--aurora-1)] to-[var(--aurora-3)]
              shadow-[0_4px_15px_rgba(99,102,241,0.4)]
              hover:shadow-[0_8px_25px_rgba(99,102,241,0.6)] hover:-translate-y-0.5 transition-all duration-300">
            Hire Me
          </a>
        </div>

        {/* Hamburger */}
        <div className="md:hidden flex items-center gap-4 ml-auto">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
          <button onClick={() => setOpen(o => !o)}
            className="flex flex-col gap-1.5 p-1"
            aria-label="Toggle menu">
            <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border mt-2 p-4 flex flex-col gap-2">
          {links.map(l => (
            <a key={l.href} href={l.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-sm font-medium rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              {l.label}
            </a>
          ))}
          <a href="https://github.com/prakashpoudel" target="_blank" rel="noreferrer" 
             className="block px-4 py-3 text-sm font-medium rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center gap-2">
            <FaGithub className="w-4 h-4" /> GitHub Profile
          </a>
        </div>
      )}
    </nav>
  );
}
