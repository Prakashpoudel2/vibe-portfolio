import Navbar        from '@/components/Navbar';
import Hero          from '@/components/Hero';
import About         from '@/components/About';
import Skills        from '@/components/Skills';
import Projects      from '@/components/Projects';
import Certifications from '@/components/Certifications';
import GithubActivity from '@/components/GithubActivity';
import Testimonials  from '@/components/Testimonials';
import Blog          from '@/components/Blog';
import Education     from '@/components/Education';
import Contact       from '@/components/Contact';
import Footer        from '@/components/Footer';
import Splash        from '@/components/Splash';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop     from '@/components/BackToTop';
import Cursor        from '@/components/Cursor';
import { getSiteContent, getProjects, getSkills, getArticles, getSkillCategories } from '@/actions/admin-db';

export default async function Home() {
  // Fetch data from our new CMS!
  const heroData  = await getSiteContent('hero');
  const aboutData = await getSiteContent('about');
  const projectsData = await getProjects();
  const skillsData = await getSkills();
  const categoryData = await getSkillCategories();
  const contactData = await getSiteContent('contact');
  const articlesData = await getArticles();

  return (
    <>
      <Splash />
      <ScrollProgress />
      <BackToTop />
      
      {/* Cursor is now mounted globally in layout.tsx */}
      <Navbar />
      <main>
        <Hero cmsData={heroData} />
        <About cmsData={aboutData} />
        <Skills cmsData={skillsData} categoriesData={categoryData} />
        <Projects cmsData={projectsData} />
        <Certifications />
        <GithubActivity />
        <Education />
        <Testimonials />
        <Blog cmsData={articlesData} />
        <Contact cmsData={contactData} />
      </main>
      <Footer />
    </>
  );
}
