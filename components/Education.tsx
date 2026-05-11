'use client';

const education = [
  {
    year: '2021 — 2025',
    degree: "Bachelor's in Computer Software Engineering",
    school: 'Pokhara University',
    desc: 'Studied core software engineering principles, algorithms, data structures, web technologies, and database management. Built multiple projects applying real-world development skills. Graduated 2025.',
    skills: ['Algorithms', 'Data Structures', 'Web Dev', 'Databases', 'OOP', 'Networking'],
  }
];

export default function Education() {
  return (
    <section id="education" className="py-28 px-6 bg-secondary/30 relative">
      <div className="max-w-4xl mx-auto">
        <span className="font-mono text-xs text-primary uppercase tracking-widest opacity-80">04 / Education</span>
        <h2 className="text-4xl md:text-5xl font-black mt-2 mb-16 grad-text">Education</h2>

        <div className="space-y-12 border-l-2 border-primary/20 pl-8 ml-4 relative">
          {education.map((edu, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-background border-4 border-primary 
                group-hover:scale-125 group-hover:bg-primary group-hover:shadow-[0_0_15px_rgba(99,102,241,0.8)] 
                transition-all duration-300 z-10" />

              <div className="glass rounded-3xl p-8 hover:-translate-y-2 hover:border-primary/40 transition-all duration-300">
                <div className="font-mono text-sm text-primary font-bold mb-2">{edu.year}</div>
                <h3 className="text-2xl font-bold text-foreground mb-1">{edu.degree}</h3>
                <h4 className="text-lg text-muted-foreground font-semibold mb-4">{edu.school}</h4>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {edu.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {edu.skills.map((skill) => (
                    <span key={skill} className="text-xs font-semibold px-3 py-1 rounded-full border glass text-foreground hover:text-primary transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
