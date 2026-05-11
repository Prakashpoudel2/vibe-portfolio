'use client';
import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import Image from 'next/image';
import AuroraBackground from './AuroraBackground';

const roles = ['Vibe Coder','AI Engineer','Prompt Architect','Full-Stack Developer','10x Builder'];

export default function Hero({ cmsData }: { cmsData?: any }) {
  const [text, setText] = useState('');
  const [rIdx, setRIdx] = useState(0);
  const [del,  setDel]  = useState(false);

  // Fallbacks just in case the DB is empty
  const data = {
    name: cmsData?.name || "Prakash Poudel",
    identity: cmsData?.identity || "Vibe Coder",
    superpower: cmsData?.superpower || "Shipping Fast ⚡",
    status: cmsData?.status || "Vibing 🎧",
    bio: cmsData?.bio || "Building next-generation applications at the speed of thought.",
    avatar: cmsData?.avatar || "/avatar.png"
  };

  useEffect(() => {
    const word = roles[rIdx];
    const timeout = setTimeout(() => {
      if (!del) {
        const next = word.slice(0, text.length + 1);
        setText(next);
        if (next === word) setTimeout(() => setDel(true), 1800);
      } else {
        const next = word.slice(0, text.length - 1);
        setText(next);
        if (next === '') { setDel(false); setRIdx(i => (i+1)%roles.length); }
      }
    }, del ? 60 : 100);
    return () => clearTimeout(timeout);
  }, [text, del, rIdx]);

  return (
    <section id="hero" className="min-h-screen flex items-center pt-24 pb-12 px-6 relative">
      <AuroraBackground />
      <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row gap-12 items-center">

        {/* Content */}
        <div className="flex-1 z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 glass border-primary/30 text-primary text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] pulse-ring inline-block" />
            Open to Opportunities
          </div>

          <div className="mb-6">
            <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-background shadow-2xl mb-6 group">
              <Image src={data.avatar} alt={data.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" unoptimized />
            </div>
            <p className="text-lg text-muted-foreground font-medium mb-1">Hello, I&apos;m</p>
            <h1 className="text-4xl md:text-6xl md:text-[5rem] font-black leading-[1.05]">
              {data.name.split(' ')[0]} <span className="grad-text-accent block mt-2">{data.name.split(' ').slice(1).join(' ')}</span>
            </h1>
          </div>

          <p className="font-mono text-xl text-primary mb-5 flex items-center gap-1 mt-4">
            <span className="text-muted-foreground">&lt;</span>
            {text}
            <span className="blink text-foreground">|</span>
            <span className="text-muted-foreground">/&gt;</span>
          </p>

          <p className="text-muted-foreground text-lg max-w-xl mb-8">
            {data.bio}
          </p>

          <div className="flex gap-4 flex-wrap">
            <a href="#projects"
              className="px-8 py-3.5 rounded-full font-bold text-white
                bg-gradient-to-r from-[var(--aurora-1)] to-[var(--aurora-3)]
                shadow-[0_4px_20px_rgba(99,102,241,0.4)]
                hover:shadow-[0_8px_30px_rgba(99,102,241,0.6)]
                hover:-translate-y-1 transition-all duration-300">
              View Projects
            </a>
            <a href="/Prakash_Poudel_CV.pdf" download
              className="px-6 py-3.5 rounded-full font-bold border-2 border-primary
                text-primary hover:bg-primary hover:text-primary-foreground
                hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
              <Download className="w-5 h-5" /> Download CV
            </a>
          </div>

          <div className="flex items-center gap-3 mt-10 text-muted-foreground text-sm">
            <div className="w-10 h-0.5 bg-gradient-to-r from-primary to-transparent scroll-line" />
            Scroll
          </div>
        </div>

        {/* Code window */}
        <div className="flex-1 flex justify-center z-10">
          <div className="w-full max-w-md float glass rounded-2xl overflow-hidden shadow-2xl">
            {/* Window bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background/50">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 font-mono text-xs text-muted-foreground">prakash.ts</span>
            </div>
            {/* Code */}
            <pre className="p-6 font-mono text-sm leading-loose overflow-x-auto text-foreground">
<span className="text-pink-500">const</span> <span className="text-green-500">developer</span> = {`{\n`}
  <span className="text-cyan-500">name</span>: <span className="text-yellow-500">&quot;{data.name}&quot;</span>,{`\n`}
  <span className="text-cyan-500">identity</span>: <span className="text-yellow-500">&quot;{data.identity}&quot;</span>,{`\n`}
  <span className="text-cyan-500">tools</span>: [<span className="text-yellow-500">&quot;AI&quot;</span>, <span className="text-yellow-500">&quot;Cursor&quot;</span>, <span className="text-yellow-500">&quot;Claude&quot;</span>, <span className="text-yellow-500">&quot;Next.js&quot;</span>],{`\n`}
  <span className="text-cyan-500">superpower</span>: <span className="text-yellow-500">&quot;{data.superpower}&quot;</span>,{`\n`}
  <span className="text-cyan-500">status</span>: <span className="text-yellow-500">&quot;{data.status}&quot;</span>{`\n`}
{`}`};
            </pre>
          </div>
        </div>

      </div>
    </section>
  );
}
