'use client';
import { useState, useEffect } from 'react';
import { loginAdmin, logoutAdmin, checkAuth } from '@/actions/admin-auth';
import { 
  updateSiteContent, getSiteContent, addProject, getProjects, deleteProject, updateProject,
  getSkills, addSkill, deleteSkill, getMessages, deleteMessage,
  getArticles, addArticle, deleteArticle, updateArticle,
  uploadImage, getSkillCategories, updateSkillCategory, addSkillCategory, deleteSkillCategory
} from '@/actions/admin-db';
import { 
  LayoutDashboard, User, FolderKanban, Settings, LogOut, Save, Plus, X, Trash2, Edit2, 
  Cpu, Mail, Calendar, GraduationCap, Award, CheckCircle, Share2, BookOpen, FileText, Image as ImageIcon,
  Globe, Tags
} from 'lucide-react';
import { FaGithub, FaGlobe, FaLinkedin } from 'react-icons/fa';
import { format } from 'date-fns';

export default function AdminPage() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState('hero');
  const [pwd, setPwd] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [articleSearchQuery, setArticleSearchQuery] = useState('');
  
  // Content State
  const [heroData, setHeroData] = useState({ name: '', identity: '', superpower: '', status: '', bio: '', avatar: '' });
  const [aboutData, setAboutData] = useState({ title: '', p1: '', p2: '' });
  const [contactData, setContactData] = useState({ email: '', phone: '', linkedin: '', github: '', location: '' });
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  // Modals
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  
  // Forms
  const [projectForm, setProjectForm] = useState({ title: '', description: '', icon: '🚀', tech: '', github: '', live: '', featured: false });
  const [skillForm, setSkillForm] = useState({ name: '', icon: '⚡', category: '' });
  const [articleForm, setArticleForm] = useState({ title: '', excerpt: '', image: '', category: 'AI', read_time: '5 min', content: '' });
  const [categoryForm, setCategoryForm] = useState({ name: '', description: '', icon: '💻' });
  const [editingProject, setEditingProject] = useState<any>(null);
  const [editingArticle, setEditingArticle] = useState<any>(null);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  useEffect(() => {
    checkAuth().then(setIsAuth);
  }, []);

  useEffect(() => {
    if (isAuth) refreshData();
  }, [isAuth]);

  async function refreshData() {
    setLoading(true);
    const [h, a, p, s, m, c, art, cats] = await Promise.all([
      getSiteContent('hero'),
      getSiteContent('about'),
      getProjects(),
      getSkills(),
      getMessages(),
      getSiteContent('contact'),
      getArticles(),
      getSkillCategories()
    ]);
    setHeroData(prev => ({ ...prev, ...h }));
    setAboutData(prev => ({ ...prev, ...a }));
    setContactData(prev => ({ ...prev, ...c }));
    setProjects(p);
    setSkills(s);
    setMessages(m);
    setArticles(art);
    setCategories(cats);
    setLoading(false);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await loginAdmin(pwd);
    if (res.success) setIsAuth(true);
    else alert(res.error);
  }

  // --- Saves ---
  async function handleSaveHero() {
    setLoading(true);
    await updateSiteContent('hero', heroData);
    setLoading(false);
    alert('Hero updated! ✨');
  }

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const res = await uploadImage(file);
    if (res.success && res.url) {
      const newHero = { ...heroData, avatar: res.url };
      setHeroData(newHero);
      await updateSiteContent('hero', newHero);
      setLoading(false);
      alert('Photo uploaded! (Recommended: 400x400 Square)');
    } else {
      setLoading(false);
      alert('Upload failed: ' + res.error);
    }
  }

  async function handleSaveAbout() {
    setLoading(true);
    await updateSiteContent('about', aboutData);
    setLoading(false);
    alert('About updated! 📝');
  }

  async function handleSaveContact() {
    setLoading(true);
    await updateSiteContent('contact', contactData);
    setLoading(false);
    alert('Contact info updated! 📱');
  }

  async function handleProjectImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const res = await uploadImage(file);
    setLoading(false);
    if (res.success && res.url) {
      setProjectForm({ ...projectForm, image: res.url });
      alert('Project screenshot uploaded!');
    } else {
      alert('Upload failed: ' + res.error);
    }
  }

  async function handleSaveProject(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const formatted = { ...projectForm, tech: projectForm.tech.split(',').map(t => t.trim()).filter(t => t) };
    const res = editingProject ? await updateProject(editingProject.id, formatted) : await addProject(formatted);
    setLoading(false);
    if (res.success) { setShowProjectModal(false); setEditingProject(null); setProjectForm({ title: '', description: '', icon: '🚀', tech: '', github: '', live: '', featured: false, image: '' }); refreshData(); }
    else alert(res.error);
  }

  async function handleSaveArticle(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = editingArticle ? await updateArticle(editingArticle.id, articleForm) : await addArticle(articleForm);
    setLoading(false);
    if (res.success) { setShowArticleModal(false); setEditingArticle(null); setArticleForm({ title: '', excerpt: '', image: '', category: 'AI', read_time: '5 min' }); refreshData(); }
    else alert(res.error);
  }

  async function handleArticleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const res = await uploadImage(file);
    setLoading(false);
    if (res.success && res.url) {
      setArticleForm({ ...articleForm, image: res.url });
      alert('Article cover uploaded! (Recommended: 1280x720 HD)');
    } else {
      alert('Upload failed: ' + res.error);
    }
  }

  async function handleSaveCategory(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = editingCategory ? await updateSkillCategory(editingCategory.id, categoryForm) : await addSkillCategory(categoryForm);
    setLoading(false);
    if (res.success) { setShowCategoryModal(false); setEditingCategory(null); refreshData(); }
    else alert(res.error);
  }

  async function handleAddSkill(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await addSkill(skillForm);
    setLoading(false);
    if (res.success) { setShowSkillModal(false); setSkillForm({ name: '', icon: '⚡', category: categories[0]?.name || '' }); refreshData(); }
    else alert(res.error);
  }

  if (isAuth === null) return <div className="h-screen flex items-center justify-center font-black tracking-tighter text-3xl animate-pulse">VIBE STUDIO</div>;

  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-black tracking-tighter grad-text">Vibe Admin</h1>
            <p className="text-muted-foreground text-xs font-black uppercase tracking-[0.3em] mt-2">Locked Studio</p>
          </div>
          <input type="password" placeholder="PASSCODE" value={pwd} onChange={e => setPwd(e.target.value)} className="w-full bg-secondary border border-border p-5 rounded-[2rem] text-center text-2xl tracking-[0.5em] outline-none focus:border-primary transition-all shadow-inner" />
          <button type="submit" className="w-full bg-primary text-primary-foreground font-black py-5 rounded-[2rem] hover:scale-[0.98] transition-all shadow-xl shadow-primary/20 uppercase tracking-widest">Open Studio</button>
        </form>
      </div>
    );
  }

  const SidebarItem = ({ id, icon: Icon, label }: any) => (
    <button onClick={() => setActiveTab(id)} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${activeTab === id ? 'bg-primary text-primary-foreground shadow-xl shadow-primary/20' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}>
      <Icon size={20} />
      <span className="font-black text-[10px] uppercase tracking-widest">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex h-screen overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-72 border-r border-border bg-background/80 backdrop-blur-2xl p-8 flex flex-col gap-8 shrink-0 overflow-y-auto no-scrollbar">
        <div className="px-2">
          <h2 className="text-2xl font-black grad-text tracking-tighter italic">VibeStudio.</h2>
          <div className="h-1 w-8 bg-primary mt-1 rounded-full" />
        </div>

        <nav className="flex-1 space-y-1.5">
          <SidebarItem id="hero" icon={LayoutDashboard} label="Hero" />
          <SidebarItem id="about" icon={User} label="About" />
          <SidebarItem id="skills" icon={Cpu} label="Skills" />
          <SidebarItem id="projects" icon={FolderKanban} label="Projects" />
          <SidebarItem id="articles" icon={FileText} label="Articles" />
          <SidebarItem id="contact" icon={Share2} label="Socials" />
          <SidebarItem id="inbox" icon={Mail} label="Inbox" />
          <SidebarItem id="settings" icon={Settings} label="Settings" />
        </nav>

        <button onClick={async () => { await logoutAdmin(); setIsAuth(false); }} className="flex items-center gap-4 px-5 py-4 text-destructive hover:bg-destructive/10 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest border border-destructive/20 mt-4">
          <LogOut size={16} /> <span>Lock Studio</span>
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 p-12 md:p-20 overflow-y-auto bg-secondary/10 relative no-scrollbar">
        <div className="max-w-4xl mx-auto pb-24">
          
          {loading && <div className="fixed top-10 right-10 px-6 py-3 bg-primary text-primary-foreground rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl animate-bounce z-[200]">Syncing Database...</div>}

          {activeTab === 'hero' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="border-b-2 border-border pb-8">
                <h1 className="text-6xl font-black tracking-tighter mb-4">Hero.</h1>
                <p className="text-muted-foreground font-bold text-lg opacity-60">Your digital first impression.</p>
              </div>
              <div className="grid gap-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3"><label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">Name</label>
                  <input value={heroData.name} onChange={e => setHeroData({...heroData, name: e.target.value})} className="w-full bg-background border-2 border-border p-5 rounded-[2rem] outline-none focus:border-primary font-bold transition-all shadow-sm" /></div>
                  <div className="space-y-3"><label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">Identity</label>
                  <input value={heroData.identity} onChange={e => setHeroData({...heroData, identity: e.target.value})} className="w-full bg-background border-2 border-border p-5 rounded-[2rem] outline-none focus:border-primary font-bold transition-all shadow-sm" /></div>
                </div>
                <div className="space-y-3"><label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">Profile Picture</label>
                <div className="flex items-center gap-6 p-6 border-2 border-dashed border-border rounded-[2rem] bg-background/50 hover:border-primary transition-all">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-border relative bg-secondary">
                    {heroData.avatar ? <img src={heroData.avatar} alt="Avatar" className="w-full h-full object-cover" /> : <div className="absolute inset-0 flex items-center justify-center text-xs font-bold opacity-30 italic">No Image</div>}
                  </div>
                  <div className="flex-1 space-y-2">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Upload new photo</p>
                    <input type="file" accept="image/*" onChange={handleAvatarUpload} className="text-xs font-bold file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-primary file:text-primary-foreground hover:file:opacity-80 transition-all cursor-pointer" />
                  </div>
                </div></div>
                <div className="space-y-3"><label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">Bio</label>
                <textarea rows={4} value={heroData.bio} onChange={e => setHeroData({...heroData, bio: e.target.value})} className="w-full bg-background border-2 border-border p-6 rounded-[2.5rem] outline-none focus:border-primary font-bold transition-all shadow-sm resize-none" /></div>
                <button onClick={handleSaveHero} className="bg-primary text-primary-foreground font-black p-6 rounded-[2.5rem] shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest text-sm">Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="border-b-2 border-border pb-8">
                <h1 className="text-6xl font-black tracking-tighter mb-4">About.</h1>
                <p className="text-muted-foreground font-bold text-lg opacity-60">Tell your story.</p>
              </div>
              <div className="grid gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">Section Title</label>
                  <input value={aboutData.title} onChange={e => setAboutData({...aboutData, title: e.target.value})} className="w-full bg-background border-2 border-border p-5 rounded-[2rem] outline-none focus:border-primary font-bold transition-all shadow-sm" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">First Paragraph</label>
                  <textarea rows={5} value={aboutData.p1} onChange={e => setAboutData({...aboutData, p1: e.target.value})} className="w-full bg-background border-2 border-border p-6 rounded-[2.5rem] outline-none focus:border-primary font-bold transition-all shadow-sm resize-none" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">Second Paragraph</label>
                  <textarea rows={5} value={aboutData.p2} onChange={e => setAboutData({...aboutData, p2: e.target.value})} className="w-full bg-background border-2 border-border p-6 rounded-[2.5rem] outline-none focus:border-primary font-bold transition-all shadow-sm resize-none" />
                </div>
                <button onClick={handleSaveAbout} className="bg-primary text-primary-foreground font-black p-6 rounded-[2.5rem] shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest text-sm">Save About Me</button>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
              {/* Category Manager */}
              <div className="space-y-8">
                <div className="flex justify-between items-end border-b-2 border-border pb-6">
                  <div>
                    <h1 className="text-5xl font-black tracking-tighter mb-2">Skill Categories.</h1>
                    <p className="text-muted-foreground font-bold text-sm opacity-60">Manage card titles and sub-text.</p>
                  </div>
                  <button onClick={() => { setEditingCategory(null); setCategoryForm({ name: '', description: '', icon: '💻' }); setShowCategoryModal(true); }}
                    className="bg-foreground text-background px-8 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-3">
                    <Plus size={18} /> New Category
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {categories.map(cat => (
                    <div key={cat.id} className="p-6 border-2 border-border rounded-[2.5rem] bg-background flex items-center justify-between group hover:border-primary transition-all shadow-sm">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{cat.icon}</span>
                        <div>
                          <h3 className="font-black text-sm tracking-tight">{cat.name}</h3>
                          <p className="text-[10px] font-bold text-muted-foreground truncate max-w-[150px]">{cat.description || 'No description...'}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { setEditingCategory(cat); setCategoryForm({ name: cat.name, description: cat.description || '', icon: cat.icon || '💻' }); setShowCategoryModal(true); }} className="p-3 text-muted-foreground hover:text-primary transition-colors"><Edit2 size={18} /></button>
                        <button onClick={async () => { if(confirm('Delete category? All skills in this category will still exist but won\'t show on homepage.')) { await deleteSkillCategory(cat.id); refreshData(); } }} className="p-3 text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={18} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill Manager */}
              <div className="space-y-8">
                <div className="flex justify-between items-end border-b-2 border-border pb-6">
                  <div>
                    <h1 className="text-5xl font-black tracking-tighter mb-2">Tools & Tech.</h1>
                    <p className="text-muted-foreground font-bold text-sm opacity-60">The specific icons inside your cards.</p>
                  </div>
                  <button onClick={() => { setSkillForm({ name: '', icon: '⚡', category: categories[0]?.name || '' }); setShowSkillModal(true); }} 
                    className="bg-foreground text-background px-8 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-3">
                    <Plus size={18} /> Add Skill
                  </button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {skills.map(s => (
                    <div key={s.id} className="p-6 border-2 border-border rounded-[2.5rem] bg-background flex items-center justify-between group hover:border-primary transition-all">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{s.icon}</span>
                        <div>
                          <h3 className="font-black text-sm tracking-tight">{s.name}</h3>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{s.category}</p>
                        </div>
                      </div>
                      <button onClick={() => deleteSkill(s.id).then(refreshData)} className="p-3 text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={18} /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
             <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
                <div className="flex justify-between items-end border-b-2 border-border pb-8">
                  <div>
                    <h1 className="text-6xl font-black tracking-tighter mb-4">Work.</h1>
                    <p className="text-muted-foreground font-bold text-lg opacity-60">Manage your portfolio.</p>
                  </div>
                  <button onClick={() => { setEditingProject(null); setProjectForm({ title: '', description: '', icon: '🚀', tech: '', github: '', live: '', featured: false }); setShowProjectModal(true); }}
                    className="bg-foreground text-background px-8 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-3">
                    <Plus size={18} /> New Project
                  </button>
                </div>
                <div className="grid gap-6">
                  {projects.map(p => (
                    <div key={p.id} className="p-8 border-2 border-border rounded-[3rem] bg-background flex items-center justify-between group hover:border-primary transition-all shadow-sm">
                      <div className="flex items-center gap-6">
                        <span className="text-4xl w-20 h-20 flex items-center justify-center bg-secondary rounded-[2rem]">{p.icon}</span>
                        <div>
                          <h3 className="text-2xl font-black tracking-tight">{p.title}</h3>
                          <div className="flex gap-4 mt-2">
                             {p.github && <a href={p.github} target="_blank" className="text-muted-foreground hover:text-primary transition-colors"><FaGithub size={18} /></a>}
                             {p.live && <a href={p.live} target="_blank" className="text-muted-foreground hover:text-primary transition-colors"><FaGlobe size={18} /></a>}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { setEditingProject(p); setProjectForm({ title: p.title, description: p.description, icon: p.icon, tech: p.tech.join(', '), github: p.github || '', live: p.live || '', featured: p.featured, image: p.image || '' }); setShowProjectModal(true); }} className="p-4 rounded-2xl bg-secondary hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all"><Edit2 size={20} /></button>
                        <button onClick={async () => { if(confirm('Delete project?')) { await deleteProject(p.id); refreshData(); } }} className="p-4 rounded-2xl bg-secondary hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"><Trash2 size={20} /></button>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          )}

          {activeTab === 'articles' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-border pb-8 gap-6">
                <div>
                  <h1 className="text-6xl font-black tracking-tighter mb-4">Articles.</h1>
                  <p className="text-muted-foreground font-bold text-lg opacity-60">Write and manage blog posts.</p>
                </div>
                <div className="flex gap-4">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search posts..." 
                      value={articleSearchQuery}
                      onChange={e => setArticleSearchQuery(e.target.value)}
                      className="bg-background border-2 border-border p-4 pl-12 rounded-[1.5rem] outline-none focus:border-primary font-bold transition-all w-64"
                    />
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  </div>
                  <button onClick={() => { setEditingArticle(null); setArticleForm({ title: '', excerpt: '', image: '', category: 'AI', read_time: '5 min', content: '' }); setShowArticleModal(true); }}
                    className="bg-foreground text-background px-8 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-3">
                    <Plus size={18} /> New Article
                  </button>
                </div>
              </div>
              <div className="grid gap-6">
                {articles
                  .filter(a => a.title.toLowerCase().includes(articleSearchQuery.toLowerCase()))
                  .map(a => (
                  <div key={a.id} className="p-8 border-2 border-border rounded-[3rem] bg-background flex items-center justify-between group hover:border-primary transition-all shadow-sm">
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 bg-secondary rounded-2xl overflow-hidden relative border-2 border-border">
                        {a.image ? <img src={a.image} alt="" className="w-full h-full object-cover" /> : <ImageIcon className="w-8 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />}
                      </div>
                      <div>
                        <h3 className="text-2xl font-black tracking-tight">{a.title}</h3>
                        <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mt-1">{a.category} • {a.read_time}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingArticle(a); setArticleForm({...a, content: a.content || ''}); setShowArticleModal(true); }} className="p-4 rounded-2xl bg-secondary hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all"><Edit2 size={20} /></button>
                      <button onClick={async () => { if(confirm('Delete article?')) { await deleteArticle(a.id); refreshData(); } }} className="p-4 rounded-2xl bg-secondary hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"><Trash2 size={20} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="border-b-2 border-border pb-8">
                <h1 className="text-6xl font-black tracking-tighter mb-4">Socials.</h1>
                <p className="text-muted-foreground font-bold text-lg opacity-60">Your digital presence & contact info.</p>
              </div>
              <div className="grid gap-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3"><label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">Email Address</label>
                  <input value={contactData.email} onChange={e => setContactData({...contactData, email: e.target.value})} className="w-full bg-background border-2 border-border p-5 rounded-[2rem] outline-none focus:border-primary font-bold transition-all shadow-sm" /></div>
                  <div className="space-y-3"><label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">Phone Number</label>
                  <input value={contactData.phone} onChange={e => setContactData({...contactData, phone: e.target.value})} className="w-full bg-background border-2 border-border p-5 rounded-[2rem] outline-none focus:border-primary font-bold transition-all shadow-sm" /></div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3"><label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">LinkedIn Username</label>
                  <input value={contactData.linkedin} onChange={e => setContactData({...contactData, linkedin: e.target.value})} className="w-full bg-background border-2 border-border p-5 rounded-[2rem] outline-none focus:border-primary font-bold transition-all shadow-sm" /></div>
                  <div className="space-y-3"><label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">GitHub Username</label>
                  <input value={contactData.github} onChange={e => setContactData({...contactData, github: e.target.value})} className="w-full bg-background border-2 border-border p-5 rounded-[2rem] outline-none focus:border-primary font-bold transition-all shadow-sm" /></div>
                </div>
                <div className="space-y-3"><label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">Location</label>
                <input value={contactData.location} onChange={e => setContactData({...contactData, location: e.target.value})} className="w-full bg-background border-2 border-border p-5 rounded-[2rem] outline-none focus:border-primary font-bold transition-all shadow-sm" /></div>
                <button onClick={handleSaveContact} className="bg-primary text-primary-foreground font-black p-6 rounded-[2.5rem] shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest text-sm">Save Contact Info</button>
              </div>
            </div>
          )}

          {activeTab === 'inbox' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-border pb-8 gap-6">
                <div>
                  <h1 className="text-6xl font-black tracking-tighter mb-4">Inbox.</h1>
                  <p className="text-muted-foreground font-bold text-lg opacity-60">Client messages and inquiries.</p>
                </div>
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="Search messages..." 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="bg-background border-2 border-border p-4 pl-12 rounded-2xl outline-none focus:border-primary font-bold w-full md:w-64 transition-all"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                    <Mail size={20} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                {messages
                  .filter(m => 
                    m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    m.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    m.message.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .length === 0 ? (
                    <div className="text-center py-24 border-4 border-dashed border-border rounded-[3rem]">
                      <Mail size={48} className="mx-auto mb-4 opacity-10" />
                      <p className="font-bold opacity-30 italic">No messages found matching your search...</p>
                    </div>
                  ) : (
                    messages
                      .filter(m => 
                        m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        m.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        m.message.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map(m => (
                        <div key={m.id} className="p-8 border-2 border-border rounded-[2.5rem] bg-background space-y-5 hover:border-primary transition-all shadow-sm group">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-2xl font-black tracking-tight">{m.name}</h3>
                              <p className="text-sm font-bold text-primary mb-2">{m.email}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest bg-secondary px-3 py-1.5 rounded-lg">{format(new Date(m.created_at), 'MMM dd, HH:mm')}</span>
                              <button 
                                onClick={async () => { if(confirm('Delete message?')) { await deleteMessage(m.id); refreshData(); } }}
                                className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>
                          </div>
                          <div className="relative">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 rounded-full" />
                            <p className="text-muted-foreground font-medium leading-relaxed pl-6 py-1 whitespace-pre-wrap">{m.message}</p>
                          </div>
                          <div className="flex justify-end pt-2">
                            <a 
                              href={`mailto:${m.email}?subject=Re: Inquiry from ${m.name}`}
                              className="flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all shadow-lg active:scale-95"
                            >
                              <Mail size={14} /> Reply Now
                            </a>
                          </div>
                        </div>
                      ))
                  )
                }
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="border-b-2 border-border pb-8">
                <h1 className="text-6xl font-black tracking-tighter mb-4">Settings.</h1>
                <p className="text-muted-foreground font-bold text-lg opacity-60">Global studio configuration.</p>
              </div>
              <div className="p-12 border-4 border-dashed border-border rounded-[3rem] text-center">
                <Settings size={48} className="mx-auto mb-4 opacity-10" />
                <p className="font-bold opacity-30 italic">Global settings coming soon in the next update...</p>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* CATEGORY MODAL */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-xl animate-in fade-in duration-500">
          <form onSubmit={handleSaveCategory} className="w-full max-w-md bg-background border-4 border-border rounded-[3rem] p-10 space-y-8 shadow-2xl relative">
            <button type="button" onClick={() => setShowCategoryModal(false)} className="absolute top-8 right-8 text-muted-foreground hover:text-foreground"><X size={28} /></button>
            <h2 className="text-4xl font-black tracking-tighter">{editingCategory ? 'Edit Category.' : 'New Category.'}</h2>
            <div className="space-y-6">
              <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest ml-2">Name</label>
              <input required value={categoryForm.name} onChange={e => setCategoryForm({...categoryForm, name: e.target.value})} className="w-full bg-secondary border-2 border-border p-4 rounded-2xl font-bold outline-none focus:border-primary" /></div>

              <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest ml-2">Icon</label>
              <input required value={categoryForm.icon} onChange={e => setCategoryForm({...categoryForm, icon: e.target.value})} className="w-full bg-secondary border-2 border-border p-4 rounded-2xl font-bold outline-none focus:border-primary" /></div>
              
              <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest ml-2">Sub-text (Description)</label>
              <textarea required rows={3} value={categoryForm.description} onChange={e => setCategoryForm({...categoryForm, description: e.target.value})} className="w-full bg-secondary border-2 border-border p-4 rounded-2xl font-bold outline-none focus:border-primary resize-none" /></div>

              <button type="submit" className="w-full bg-primary text-primary-foreground font-black p-5 rounded-[2rem] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest text-xs">{editingCategory ? 'Update Category' : 'Create Category'}</button>
            </div>
          </form>
        </div>
      )}

      {/* ARTICLE MODAL */}
      {showArticleModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-xl animate-in fade-in duration-500">
          <form onSubmit={handleSaveArticle} className="w-full max-w-2xl bg-background border-4 border-border rounded-[3.5rem] p-12 space-y-8 shadow-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar">
            <button type="button" onClick={() => setShowArticleModal(false)} className="absolute top-10 right-10 text-muted-foreground hover:text-foreground"><X size={32} /></button>
            <h2 className="text-5xl font-black tracking-tighter">{editingArticle ? 'Edit Article.' : 'New Article.'}</h2>
            
            <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest ml-3">Title</label>
            <input required value={articleForm.title} onChange={e => setArticleForm({...articleForm, title: e.target.value})} className="w-full bg-secondary border-2 border-border p-5 rounded-[2rem] font-bold outline-none focus:border-primary" /></div>

            <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest ml-3">Excerpt (Short Preview)</label>
            <textarea required rows={3} value={articleForm.excerpt} onChange={e => setArticleForm({...articleForm, excerpt: e.target.value})} className="w-full bg-secondary border-2 border-border p-6 rounded-[2.5rem] font-bold outline-none focus:border-primary resize-none" /></div>

            <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest ml-3">Full Article Content (Markdown/Text)</label>
            <textarea required rows={12} value={articleForm.content} onChange={e => setArticleForm({...articleForm, content: e.target.value})} placeholder="Write your full story here..." className="w-full bg-secondary border-2 border-border p-8 rounded-[3rem] font-medium outline-none focus:border-primary resize-none" /></div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest ml-3">Category</label>
              <input required value={articleForm.category} onChange={e => setArticleForm({...articleForm, category: e.target.value})} className="w-full bg-secondary border-2 border-border p-5 rounded-[2rem] font-bold outline-none focus:border-primary" /></div>
              <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest ml-3">Read Time</label>
              <input required value={articleForm.read_time} onChange={e => setArticleForm({...articleForm, read_time: e.target.value})} className="w-full bg-secondary border-2 border-border p-5 rounded-[2rem] font-bold outline-none focus:border-primary" /></div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest ml-3">Cover Image (16:9 recommended)</label>
              <div className="grid md:grid-cols-2 gap-6 p-6 border-2 border-dashed border-border rounded-[2.5rem] bg-secondary/30">
                <div className="aspect-video rounded-2xl overflow-hidden border-2 border-border bg-background relative">
                  {articleForm.image ? (
                    <img id="article-preview-img" src={articleForm.image} alt="Preview" className="w-full h-full object-cover transition-transform duration-200" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black opacity-20 uppercase">No Image</div>
                  )}
                </div>
                <div className="flex flex-col justify-center gap-3">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Upload cover photo</p>
                  <input type="file" accept="image/*" onChange={handleArticleImageUpload} className="text-xs font-bold file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-primary file:text-primary-foreground hover:file:opacity-80 transition-all cursor-pointer" />
                  
                  <div className="pt-2">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Scale Preview</p>
                    <input type="range" min="1" max="2" step="0.01" className="w-full accent-primary" onChange={(e) => {
                      const img = document.getElementById('article-preview-img');
                      if (img) img.style.transform = `scale(${e.target.value})`;
                    }} />
                  </div>

                  <p className="text-[10px] italic opacity-40">Or paste URL below:</p>
                  <input value={articleForm.image} onChange={e => setArticleForm({...articleForm, image: e.target.value})} placeholder="https://..." className="w-full bg-background border border-border p-3 rounded-xl text-xs outline-none focus:border-primary" />
                </div>
              </div>
            </div>

            <button type="submit" className="w-full bg-primary text-primary-foreground font-black p-6 rounded-[2.5rem] shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest text-sm">{editingArticle ? 'Update Article' : 'Publish Article'}</button>
          </form>
        </div>
      )}

      {/* SKILL MODAL */}
      {showSkillModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-xl animate-in fade-in duration-500">
          <form onSubmit={handleAddSkill} className="w-full max-w-md bg-background border-4 border-border rounded-[3rem] p-10 space-y-8 shadow-2xl relative">
            <button type="button" onClick={() => setShowSkillModal(false)} className="absolute top-8 right-8 text-muted-foreground hover:text-foreground"><X size={28} /></button>
            <h2 className="text-4xl font-black tracking-tighter">Add Skill.</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest ml-2">Icon</label>
                <input required value={skillForm.icon} onChange={e => setSkillForm({...skillForm, icon: e.target.value})} className="w-full bg-secondary border-2 border-border p-4 rounded-2xl font-bold outline-none focus:border-primary" /></div>
                <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest ml-2">Name</label>
                <input required value={skillForm.name} onChange={e => setSkillForm({...skillForm, name: e.target.value})} className="w-full bg-secondary border-2 border-border p-4 rounded-2xl font-bold outline-none focus:border-primary" /></div>
              </div>
              <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest ml-2">Category</label>
              <select value={skillForm.category} onChange={e => setSkillForm({...skillForm, category: e.target.value})} className="w-full bg-secondary border-2 border-border p-4 rounded-2xl font-bold outline-none focus:border-primary">
                {categories.map(c => <option key={c.id}>{c.name}</option>)}
              </select></div>
              <button type="submit" className="w-full bg-primary text-primary-foreground font-black p-5 rounded-[2rem] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest text-xs">Add to Stack</button>
            </div>
          </form>
        </div>
      )}

      {/* PROJECT MODAL */}
      {showProjectModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-xl animate-in fade-in duration-500">
           <form onSubmit={handleSaveProject} className="w-full max-w-2xl bg-background border-4 border-border rounded-[3.5rem] p-12 space-y-8 shadow-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar">
              <button type="button" onClick={() => setShowProjectModal(false)} className="absolute top-10 right-10 text-muted-foreground hover:text-foreground"><X size={32} /></button>
              <h2 className="text-5xl font-black tracking-tighter">{editingProject ? 'Edit Project.' : 'New Project.'}</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest ml-3">Title</label>
                <input required value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} className="w-full bg-secondary border-2 border-border p-5 rounded-[2rem] font-bold outline-none focus:border-primary" /></div>
                <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest ml-3">Icon</label>
                <input required value={projectForm.icon} onChange={e => setProjectForm({...projectForm, icon: e.target.value})} className="w-full bg-secondary border-2 border-border p-5 rounded-[2rem] font-bold outline-none focus:border-primary" /></div>
              </div>

              <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest ml-3">Description</label>
              <textarea required rows={3} value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} className="w-full bg-secondary border-2 border-border p-6 rounded-[2.5rem] font-bold outline-none focus:border-primary resize-none" /></div>

              <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest ml-3">Stack (CSV)</label>
              <input required value={projectForm.tech} onChange={e => setProjectForm({...projectForm, tech: e.target.value})} className="w-full bg-secondary border-2 border-border p-5 rounded-[2rem] font-bold outline-none focus:border-primary" /></div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-3">Project Screenshot (Recommended: 1280x720)</label>
                <div className="grid md:grid-cols-2 gap-6 p-6 border-2 border-dashed border-border rounded-[2.5rem] bg-secondary/30">
                  <div className="aspect-video rounded-2xl overflow-hidden border-2 border-border bg-background relative">
                    {projectForm.image ? (
                      <img id="project-preview-img" src={projectForm.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black opacity-20 uppercase">No Screenshot</div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center gap-3">
                    <input type="file" accept="image/*" onChange={handleProjectImageUpload} className="text-xs font-bold file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-primary file:text-primary-foreground hover:file:opacity-80 transition-all cursor-pointer" />
                    <input value={projectForm.image} onChange={e => setProjectForm({...projectForm, image: e.target.value})} placeholder="Screenshot URL..." className="w-full bg-background border border-border p-3 rounded-xl text-xs outline-none focus:border-primary" />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest ml-3">GitHub</label>
                 <input value={projectForm.github} onChange={e => setProjectForm({...projectForm, github: e.target.value})} className="w-full bg-secondary border-2 border-border p-5 rounded-[2rem] font-bold outline-none focus:border-primary" /></div>
                 <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest ml-3">Live</label>
                 <input value={projectForm.live} onChange={e => setProjectForm({...projectForm, live: e.target.value})} className="w-full bg-secondary border-2 border-border p-5 rounded-[2rem] font-bold outline-none focus:border-primary" /></div>
              </div>

              <button type="submit" className="w-full bg-primary text-primary-foreground font-black p-6 rounded-[2.5rem] shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest text-sm">{editingProject ? 'Update Studio Work' : 'Ship to Portfolio'}</button>
           </form>
        </div>
      )}

    </div>
  );
}
