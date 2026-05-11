'use client';
import { useState, useEffect } from 'react';
import { ArrowRight, Calendar, X, Clock, Share2, BookOpen, ChevronLeft, Bookmark } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

export default function Blog({ cmsData }: { cmsData?: any[] }) {
  const articles = cmsData || [];
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  // Reading progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedArticle) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [selectedArticle]);

  return (
    <section id="blog" className="py-28 px-6 bg-secondary/30 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-32 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.4em] font-black opacity-60">07 / Knowledge Base</span>
            <h2 className="text-5xl md:text-7xl font-black mt-4 grad-text tracking-tighter">Latest Thoughts.</h2>
          </div>
          <a href="#" className="group inline-flex items-center gap-3 bg-background border border-border px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-primary hover:text-primary transition-all shadow-xl shadow-black/5">
            View All Posts <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
          {articles.length === 0 ? (
            <div className="md:col-span-2 text-center py-32 border-4 border-dashed border-border rounded-[3rem] opacity-20">
              <BookOpen size={64} className="mx-auto mb-6" />
              <p className="text-2xl font-black italic">The library is currently being curated...</p>
            </div>
          ) : (
            articles.map((p, i) => (
              <motion.div 
                key={p.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedArticle(p)}
                className="glass rounded-[3rem] overflow-hidden group hover:-translate-y-3 transition-all duration-700 block border border-border/50 hover:border-primary/40 cursor-pointer shadow-xl hover:shadow-2xl shadow-black/5"
              >
                {p.image && (
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img src={p.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-6 left-6 bg-background/90 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-primary border border-primary/20 shadow-xl">{p.category}</div>
                  </div>
                )}
                <div className="p-10">
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mb-6 opacity-60">
                    <Calendar className="w-3.5 h-3.5" /> {new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    <span className="w-1 h-1 bg-primary/40 rounded-full" />
                    <Clock className="w-3.5 h-3.5" /> {p.read_time}
                  </div>
                  <h3 className="text-3xl font-black text-foreground mb-6 group-hover:text-primary transition-colors tracking-tight leading-[1.1]">{p.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-10 font-medium line-clamp-2 text-lg opacity-80">{p.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-black text-primary flex items-center gap-2 uppercase tracking-[0.3em] group-hover:gap-4 transition-all">
                      Read Entry <ArrowRight className="w-4 h-4" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Bookmark size={16} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* ARTICLE READER MODAL (PRO VERSION) */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center md:p-6 lg:p-12 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-background/95 backdrop-blur-3xl cursor-zoom-out"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 40 }}
              className="relative w-full max-w-6xl h-full bg-background border border-border/50 shadow-[0_0_100px_rgba(0,0,0,0.1)] overflow-y-auto no-scrollbar rounded-[2.5rem] md:rounded-[4rem] overflow-hidden flex flex-col"
            >
              {/* Progress Bar */}
              <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-primary origin-left z-50" style={{ scaleX }} />

              {/* Minimal Header */}
              <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-2xl p-6 md:p-10 border-b border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button onClick={() => setSelectedArticle(null)} className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] hover:text-primary transition-all">
                    <div className="p-3 bg-secondary rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-all"><ChevronLeft size={20} /></div>
                    <span className="hidden sm:inline">Close Studio</span>
                  </button>
                  <div className="h-6 w-[1px] bg-border mx-2 hidden sm:block" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary bg-primary/5 px-4 py-2 rounded-xl border border-primary/10">{selectedArticle.category}</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copied to clipboard! 🔗');
                    }}
                    className="p-4 hover:bg-secondary rounded-2xl transition-all text-muted-foreground hover:text-primary border border-transparent hover:border-border"
                  >
                    <Share2 size={20} />
                  </button>
                  <button 
                    onClick={() => setSelectedArticle(null)}
                    className="hidden md:flex bg-foreground text-background px-8 py-4 rounded-2xl items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all font-black text-[10px] uppercase tracking-widest shadow-xl shadow-black/5"
                  >
                    Finish Reading
                  </button>
                </div>
              </div>

              {/* Content Grid */}
              <div className="flex-1 grid lg:grid-cols-[1fr_350px] gap-0 relative">
                
                {/* Main Article Side */}
                <div className="p-8 md:p-20 lg:p-24 pt-12 md:pt-24 border-r border-border/50">
                  <div className="max-w-3xl mx-auto">
                    <div className="space-y-8 mb-20">
                      <div className="flex items-center gap-4 text-[11px] font-black text-muted-foreground uppercase tracking-[0.3em] opacity-40">
                        <Calendar size={14} /> {new Date(selectedArticle.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        <span className="w-1 h-1 bg-foreground rounded-full opacity-20" />
                        <Clock size={14} /> {selectedArticle.read_time}
                      </div>
                      <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-foreground">
                        {selectedArticle.title}
                      </h1>
                    </div>

                    {selectedArticle.image && (
                      <div className="aspect-[21/9] rounded-[3rem] overflow-hidden border border-border mb-20 shadow-2xl relative group">
                        <img src={selectedArticle.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[3rem]" />
                      </div>
                    )}

                    <div className="article-content">
                      <p className="text-2xl md:text-3xl font-black text-foreground leading-[1.3] mb-16 border-l-[6px] border-primary pl-10 tracking-tight opacity-90 italic">
                        {selectedArticle.excerpt}
                      </p>
                      
                      <div className="text-muted-foreground leading-[1.9] text-xl font-medium whitespace-pre-wrap space-y-10 first-letter:text-7xl first-letter:font-black first-letter:text-primary first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8] first-letter:mt-2">
                        {selectedArticle.content || "Curating the content for this entry. Please check back shortly for the full professional write-up."}
                      </div>
                    </div>

                    <div className="mt-32 pt-16 border-t border-border/50 flex flex-col items-center text-center space-y-8 pb-20">
                      <div className="w-24 h-24 rounded-full bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                        <BookOpen size={40} />
                      </div>
                      <div>
                        <h3 className="text-3xl font-black tracking-tight mb-2">End of Entry</h3>
                        <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-[0.3em] opacity-40">Thanks for reading the Vibe Studio log</p>
                      </div>
                      <button onClick={() => setSelectedArticle(null)} className="bg-primary text-primary-foreground px-12 py-6 rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-primary/30">Back to Feed</button>
                    </div>
                  </div>
                </div>

                {/* Information Sidebar (Pro Only) */}
                <aside className="hidden lg:block bg-secondary/5 p-12 space-y-12 h-fit sticky top-32">
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Metadata</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-4 border-b border-border/50">
                        <span className="text-xs font-bold opacity-40">Published</span>
                        <span className="text-xs font-black">{new Date(selectedArticle.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between items-center py-4 border-b border-border/50">
                        <span className="text-xs font-bold opacity-40">Reading Time</span>
                        <span className="text-xs font-black">{selectedArticle.read_time}</span>
                      </div>
                      <div className="flex justify-between items-center py-4 border-b border-border/50">
                        <span className="text-xs font-bold opacity-40">Category</span>
                        <span className="text-xs font-black uppercase tracking-widest">{selectedArticle.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 bg-background border border-border rounded-[2rem] space-y-4 shadow-xl shadow-black/5">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <Share2 size={24} />
                    </div>
                    <h5 className="font-black text-sm">Share this thought</h5>
                    <p className="text-xs text-muted-foreground font-medium leading-relaxed">Loved this article? Share it with your network and join the conversation.</p>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link copied! 🔗');
                      }}
                      className="w-full py-3 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-xl transition-all font-black text-[9px] uppercase tracking-widest"
                    >
                      Copy Link
                    </button>
                  </div>

                  <div className="text-center opacity-10 pt-20">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] [writing-mode:vertical-lr] rotate-180">VIBESTUDIO / JOURNAL</span>
                  </div>
                </aside>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
