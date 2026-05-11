'use client';
import { useState, useRef } from 'react';
import { sendMessage } from '@/actions/contact';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Contact({ cmsData }: { cmsData?: any }) {
  const data = {
    email: cmsData?.email || 'poudelprakash783@gmail.com',
    phone: cmsData?.phone || '+977 98-67390969',
    linkedin: cmsData?.linkedin || 'prakash-poudel-7aa8b4234',
    github: cmsData?.github || 'prakashpoudel',
    location: cmsData?.location || 'Kathmandu, Nepal'
  };

  const contactList = [
    { icon: <Mail className="w-6 h-6"/>, label: 'Email',    value: data.email,        href: `mailto:${data.email}` },
    { icon: <Phone className="w-6 h-6"/>, label: 'Phone',    value: data.phone,        href: `tel:${data.phone.replace(/\s+/g, '')}` },
    { icon: <FaLinkedin className="w-6 h-6"/>, label: 'LinkedIn', value: data.linkedin, href: `https://linkedin.com/in/${data.linkedin}` },
    { icon: <FaGithub className="w-6 h-6"/>, label: 'GitHub', value: data.github,     href: `https://github.com/${data.github}` },
    { icon: <MapPin className="w-6 h-6"/>, label: 'Location', value: data.location,   href: undefined },
  ];

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error,   setError]   = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess(false);
    const data = new FormData(formRef.current!);
    const res  = await sendMessage(data);
    setLoading(false);
    if (res.success) { setSuccess(true); formRef.current!.reset(); }
    else setError(res.error ?? 'Something went wrong.');
  }

  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <span className="font-mono text-xs text-primary uppercase tracking-widest opacity-80">08 / Contact</span>
        <h2 className="text-4xl md:text-5xl font-black mt-2 mb-4 grad-text">Let&apos;s Connect</h2>
        <p className="text-muted-foreground text-lg max-w-xl mb-12">
          I&apos;m actively looking for new opportunities. Whether you have a question or just want to say hi — my inbox is always open!
        </p>

        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Contact cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {contactList.map(c => {
              const inner = (
                <div className="glass rounded-2xl px-6 py-6 flex flex-col items-start gap-4
                  hover:border-primary/40 hover:-translate-y-2
                  transition-all duration-300 group h-full">
                  <span className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">{c.icon}</span>
                  <div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{c.label}</div>
                    <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors break-all">{c.value}</div>
                  </div>
                </div>
              );
              return c.href
                ? <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{inner}</a>
                : <div key={c.label}>{inner}</div>;
            })}
          </div>

          {/* Contact form */}
          <form ref={formRef} onSubmit={handleSubmit}
            className="glass rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">Send a Message</h3>

            <div className="float-label mb-5">
              <input type="text" id="f-name" name="name" placeholder="Your Name" required />
              <label htmlFor="f-name">Your Name</label>
            </div>
            <div className="float-label mb-5">
              <input type="email" id="f-email" name="email" placeholder="Your Email" required />
              <label htmlFor="f-email">Your Email</label>
            </div>
            <div className="float-label mb-6">
              <textarea id="f-msg" name="message" rows={5} placeholder="Your Message" required />
              <label htmlFor="f-msg">Your Message</label>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-white
                bg-gradient-to-r from-[var(--aurora-1)] to-[var(--aurora-3)]
                shadow-[0_4px_20px_rgba(99,102,241,0.4)]
                hover:shadow-[0_8px_30px_rgba(99,102,241,0.6)]
                hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed
                transition-all duration-300 text-lg">
              {loading ? 'Sending…' : 'Send Message 🚀'}
            </button>

            {success && (
              <div className="mt-4 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-500 text-sm text-center font-bold">
                ✅ Message sent successfully! I&apos;ll get back to you soon.
              </div>
            )}
            {error && (
              <div className="mt-4 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm text-center font-bold">
                ❌ {error}
              </div>
            )}
          </form>

        </div>
      </div>
    </section>
  );
}
