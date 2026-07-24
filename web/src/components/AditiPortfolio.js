import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Linkedin, Github, Download, Mail, ExternalLink, ArrowUp, Menu, X, MessageCircle, Phone } from 'lucide-react';

export default function AditiPortfolio({ onBack }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.substring(1));
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 300) {
            current = section;
          }
        }
      }
      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, navLinks]);

  const projects = [
    {
      title: "BookMySpace",
      desc: "Automated venue & space reservation platform",
      fullDesc: "A centralized booking system for labs, classrooms, and auditoriums. Real-time schedule visibility, admin management, and approval workflows — replacing manual, paper-based venue booking.",
      tags: ["React", "Flask", "MySQL", "REST APIs"],
      github: "https://github.com/aditikamath06-star/BookMySpace", // Add valid github link if possible
      color: "bg-blue-100",
      image: "/bms_login.png"
    },
    {
      title: "Todo App",
      desc: "Real-time task management dashboard",
      fullDesc: "A productivity app with Google Sign-In, live task sync, progress dashboard, and offline fallback via local storage. Built on Firebase for seamless cross-session persistence.",
      tags: ["React", "Firebase", "Firestore", "Google OAuth"],
      github: "https://github.com/aditikamath06-star/todo_app",
      link: "https://todo-app-afe02.web.app",
      color: "bg-[#2A1B3D]",
      image: "/todoapp.png"
    }
  ];

  const tools = ["C", "Java", "Python", "React", "DBMS / MySQL", "Operating Systems", "Flask", "Firebase", "REST APIs", "Git & GitHub"];
  
  const certifications = [
    { title: "Git & GitHub", subtitle: "Infosys Springboard", link: "/Git_Certifications.pdf" },
    { title: "Full-Stack Web Development", subtitle: "Self-paced coursework" },
    { title: "Database Management Systems", subtitle: "BMSCE curriculum" },
    { title: "Python Programming", subtitle: "Academic + hands-on projects" }
  ];

  return (
    <div className="min-h-screen bg-[#FFF8F3] text-slate-900 font-sans relative">
      
      {/* Subtle Dot Pattern Background */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#F8EBE3 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-8 pb-32">
        
        {/* Header / Navigation */}
        <header className="flex items-center justify-between mb-24 relative z-50">
          <div className="flex items-center gap-6">
            <button 
              onClick={onBack}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm text-slate-500 hover:text-[#FF3B3B] hover:border-[#FF3B3B] transition-all"
              title="Back to App"
            >
              <ArrowLeft size={18} />
            </button>
            <a href="#" className="text-xl md:text-2xl font-bold tracking-[0.2em] text-[#FF3B3B] uppercase">
              AditiKamath
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-[15px] font-medium transition-colors ${activeSection === link.href.substring(1) ? 'text-[#FF3B3B]' : 'text-slate-600 hover:text-[#FF3B3B]'}`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden text-slate-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </header>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-24 left-6 right-6 bg-white shadow-2xl rounded-2xl p-6 flex flex-col gap-4 z-50 border border-slate-100 md:hidden"
            >
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-bold text-slate-800 hover:text-[#FF3B3B] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex flex-col gap-32">
          
          {/* Hero Section */}
          <section id="about" className="scroll-mt-32">
            <div className="grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-7 flex flex-col items-start text-left order-2 md:order-1">
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-5xl md:text-7xl font-extrabold text-black leading-[1.1] tracking-tight mb-6"
                >
                  Hi, I'm Aditi <br className="hidden md:block"/>
                  Kamath.
                </motion.h1>
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-xl">
                  B.E. in Computer Science. Passionate about designing scalable systems, robust databases, and full-stack applications.
                </p>
                <div className="flex gap-4">
                  <a href="/AditiKamathResume_pdf.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF3B3B] text-white font-bold hover:bg-[#E02929] transition-all shadow-[0_4px_14px_0_rgba(255,59,59,0.39)]">
                    <Download size={18} /> Download Resume
                  </a>
                  <a href="https://github.com/aditikamath06-star" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 text-slate-700 font-bold hover:border-slate-300 transition-all shadow-sm">
                    <Github size={18} /> GitHub
                  </a>
                </div>
              </div>
              <div className="md:col-span-5 flex justify-center order-1 md:order-2">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 3 }}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                  className="w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-3xl overflow-hidden shadow-2xl bg-white p-2 cursor-pointer"
                >
                  <img src="/aditi.jpeg" alt="Aditi Kamath" className="w-full h-full object-cover rounded-[1.25rem] bg-slate-100" />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="scroll-mt-32">
             <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-16 text-center md:text-left">Experience</h2>
             
             <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100 mb-16">
               <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                 <h3 className="text-2xl font-bold text-slate-900">Backend Developer Intern</h3>
                 <span className="inline-block px-4 py-2 mt-4 md:mt-0 bg-[#FFF8F3] text-[#FF3B3B] font-bold rounded-full text-sm">Present</span>
               </div>
               <h4 className="text-xl font-bold text-slate-700 mb-6">CUBERA ADTECH AND BIG DATA COMPANY</h4>
               <p className="text-slate-600 leading-relaxed text-lg">
                 Working as a backend developer intern, contributing to the development of scalable data processing pipelines and adtech solutions.
               </p>
             </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="scroll-mt-32">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-16 text-center md:text-left">Projects</h2>
            
            <div className="grid md:grid-cols-2 gap-10 md:gap-14">
              {projects.map((proj, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col group"
                >
                  <div className={`w-full aspect-[4/3] rounded-[2rem] ${proj.color} mb-6 overflow-hidden relative shadow-sm border border-black/5 group`}>
                     <img 
                       src={proj.image} 
                       alt={proj.title} 
                       className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" 
                     />
                     <div className="absolute top-6 right-6 flex gap-2">
                        {proj.github && (
                          <a href={proj.github} target="_blank" rel="noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-800 shadow-xl hover:scale-110 transition-transform z-10">
                            <Github size={20} />
                          </a>
                        )}
                        {proj.link && (
                          <a href={proj.link} target="_blank" rel="noreferrer" className="w-12 h-12 bg-[#FF3B3B] rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform z-10">
                            <ExternalLink size={20} />
                          </a>
                        )}
                     </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {proj.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-[#FF3B3B]/10 text-[#FF3B3B] text-xs font-bold uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{proj.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {proj.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="scroll-mt-32">
             <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-sm border border-slate-100">
               <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-10 text-center">Tech Stack & Tools</h2>
               <div className="flex flex-wrap justify-center gap-4">
                 {tools.map((tool, i) => (
                   <div key={i} className="px-6 py-3 bg-[#FFF8F3] border border-slate-200 text-slate-700 font-bold rounded-full text-lg hover:border-[#FF3B3B] hover:text-[#FF3B3B] transition-colors cursor-default">
                     {tool}
                   </div>
                 ))}
               </div>
             </div>
          </section>

          {/* Education & Certs */}
          <section id="education" className="scroll-mt-32">
             <div className="grid md:grid-cols-2 gap-12">
               <div>
                 <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-8">Education</h2>
                 <div className="pl-6 border-l-2 border-[#FF3B3B]/30 relative">
                    <div className="absolute w-4 h-4 bg-[#FF3B3B] rounded-full -left-[9px] top-1 border-4 border-[#FFF8F3]"></div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">B.E. Computer Science</h3>
                    <p className="text-[#FF3B3B] font-bold mb-3">BMS College of Engineering</p>
                    <p className="text-slate-600 leading-relaxed">
                      Coursework across Data Structures, DBMS, Operating Systems, and Software Engineering. Organized a college-wide Blood Donation Camp.
                    </p>
                 </div>
                 <div className="pl-6 border-l-2 border-[#FF3B3B]/30 relative mt-8">
                    <div className="absolute w-4 h-4 bg-[#FF3B3B] rounded-full -left-[9px] top-1 border-4 border-[#FFF8F3]"></div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Pre-University Education</h3>
                    <p className="text-[#FF3B3B] font-bold mb-3">RV PU College</p>
                 </div>
                 <div className="pl-6 border-l-2 border-[#FF3B3B]/30 relative mt-8">
                    <div className="absolute w-4 h-4 bg-[#FF3B3B] rounded-full -left-[9px] top-1 border-4 border-[#FFF8F3]"></div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">High School</h3>
                    <p className="text-[#FF3B3B] font-bold mb-3">N.E.T Public School (ICSE Board)</p>
                 </div>
               </div>
               
               <div>
                 <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-8">Certifications</h2>
                 <div className="flex flex-col gap-6">
                   {certifications.map((cert, i) => (
                      <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center relative group">
                        <h3 className="text-lg font-bold text-slate-900 pr-8">{cert.title}</h3>
                        <p className="text-slate-500">{cert.subtitle}</p>
                        {cert.link && (
                          <a href={cert.link} target="_blank" rel="noreferrer" className="absolute top-6 right-6 text-slate-400 hover:text-[#FF3B3B] transition-colors">
                            <ExternalLink size={20} />
                          </a>
                        )}
                      </div>
                   ))}
                 </div>
               </div>
             </div>
          </section>

        </div>
      </div>

      {/* Footer / Contact (Repeating Banner Style) */}
      <footer id="contact" className="mt-20">
        <div className="bg-[#FF3B3B] text-white py-8 overflow-hidden flex flex-col items-center justify-center border-y-4 border-[#E02929]">
           
           <div className="w-[200%] md:w-[150%] flex animate-[marquee_20s_linear_infinite] whitespace-nowrap mb-6 hover:[animation-play-state:paused]">
             {[...Array(8)].map((_, i) => (
               <div key={i} className="flex items-center gap-8 mx-4">
                 <a href="mailto:aditikamath06@gmail.com" className="text-xl md:text-2xl font-bold uppercase tracking-[0.15em] text-white/90 hover:text-white transition-colors cursor-pointer">aditikamath06@gmail.com</a>
                 <span className="text-2xl text-white/50">✦</span>
               </div>
             ))}
           </div>
           
           <style>{`
             @keyframes marquee {
               0% { transform: translateX(0%); }
               100% { transform: translateX(-50%); }
             }
           `}</style>

           <div className="flex flex-col items-center mt-4">
             <p className="text-white/80 font-bold tracking-widest uppercase text-sm mb-4">Let's Connect</p>
             <div className="flex gap-4">
                 <a href="https://www.linkedin.com/in/aditi-kamath-a-235032359" target="_blank" rel="noreferrer" className="w-14 h-14 border-2 border-white rounded-xl flex items-center justify-center hover:bg-white hover:text-[#FF3B3B] transition-colors" title="LinkedIn">
                   <Linkedin size={28} />
                 </a>
                 <a href="https://wa.me/918618693942?text=Hi%20Aditi%2C%20I%20would%20like%20to%20connect%20with%20you%21" target="_blank" rel="noreferrer" className="w-14 h-14 border-2 border-white rounded-xl flex items-center justify-center hover:bg-white hover:text-[#FF3B3B] transition-colors" title="WhatsApp">
                   <MessageCircle size={28} />
                 </a>
                 <a href="tel:+918618693942" className="w-14 h-14 border-2 border-white rounded-xl flex items-center justify-center hover:bg-white hover:text-[#FF3B3B] transition-colors" title="Call Me">
                   <Phone size={28} />
                 </a>
             </div>
           </div>

        </div>
        <div className="bg-[#FFF8F3] text-center py-6">
           <a 
              href="#" 
              className="inline-flex items-center justify-center w-12 h-12 bg-slate-900 text-white rounded-full hover:-translate-y-1 transition-transform shadow-lg mx-auto"
              title="Go to top"
            >
              <ArrowUp size={20} />
            </a>
            <p className="text-slate-400 font-bold mt-4">Made with ❤️ by Aditi Kamath</p>
        </div>
      </footer>
    </div>
  );
}
