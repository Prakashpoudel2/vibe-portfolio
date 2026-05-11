'use client';
import { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let W = 0, H = 0, animId: number;

    const COLORS = ['rgba(108,99,255,', 'rgba(0,212,255,', 'rgba(255,107,107,'];
    const particles: { x:number;y:number;r:number;dx:number;dy:number;alpha:number;color:string }[] = [];

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function mkP() {
      return {
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 2 + .5, dx: (Math.random()-.5)*.4, dy: (Math.random()-.5)*.4,
        alpha: Math.random()*.5+.1, color: COLORS[Math.floor(Math.random()*COLORS.length)]
      };
    }

    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 70; i++) particles.push(mkP());

    function draw() {
      ctx.clearRect(0,0,W,H);
      const g = ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,W*.8);
      g.addColorStop(0,'rgba(14,18,32,1)');
      g.addColorStop(1,'rgba(5,8,16,1)');
      ctx.fillStyle = g; ctx.fillRect(0,0,W,H);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i+1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx*dx+dy*dy);
          if (d < 120) {
            ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y);
            ctx.strokeStyle = `rgba(108,99,255,${(1-d/120)*.07})`; ctx.lineWidth=1; ctx.stroke();
          }
        }
      }
      particles.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = p.color+p.alpha+')'; ctx.fill();
        p.x+=p.dx; p.y+=p.dy;
        if(p.x<0||p.x>W) p.dx*=-1;
        if(p.y<0||p.y>H) p.dy*=-1;
      });
      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize',resize); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 w-full h-full" />;
}
