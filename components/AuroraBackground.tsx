'use client';
import { useEffect, useState } from 'react';

export default function AuroraBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-background transition-colors duration-500">
      {/* Optimized CSS-based Aurora without expensive blur() filters */}
      <div 
        className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full opacity-40 dark:opacity-20 animate-blob"
        style={{
          background: 'radial-gradient(circle, var(--aurora-1) 0%, transparent 70%)',
          animation: 'blob 15s infinite alternate'
        }}
      />
      <div 
        className="absolute top-[40%] right-[0%] w-[50%] h-[70%] rounded-full opacity-30 dark:opacity-15 animate-blob animation-delay-2000"
        style={{
          background: 'radial-gradient(circle, var(--aurora-2) 0%, transparent 70%)',
          animation: 'blob 20s infinite alternate-reverse'
        }}
      />
      <div 
        className="absolute -bottom-[20%] left-[20%] w-[70%] h-[60%] rounded-full opacity-40 dark:opacity-20 animate-blob animation-delay-4000"
        style={{
          background: 'radial-gradient(circle, var(--aurora-3) 0%, transparent 70%)',
          animation: 'blob 18s infinite alternate'
        }}
      />
      
      {/* Mesh grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
    </div>
  );
}
