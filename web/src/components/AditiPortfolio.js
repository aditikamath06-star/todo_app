import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Linkedin, Github, Download, Mail, ChevronRight, Menu, X, Code2, Database, Layout, Server, Sparkles, Heart, GraduationCap, Award, ExternalLink, ArrowUp } from 'lucide-react';

export default function AditiPortfolio({ onBack }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Leadership", href: "#leadership" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" }
  ];

  const tools = [
    { name: "C", icon: <Code2 size={18} /> },
    { name: "Java", icon: <Code2 size={18} /> },
    { name: "Python", icon: <Code2 size={18} /> },
    { name: "React", icon: <Sparkles size={18} /> },
    { name: "DBMS / MySQL", icon: <Database size={18} /> },
    { name: "Operating Systems", icon: <Server size={18} /> },
    { name: "Flask", icon: <Server size={18} /> },
    { name: "Firebase", icon: <Database size={18} /> },
    { name: "REST APIs", icon: <Server size={18} /> },
    { name: "Git & GitHub", icon: <Github size={18} /> }
  ];

  const learning = ["System Design", "TypeScript", "Cloud (GCP)", "DSA in Java"];

  const projects = [
    {
      title: "BookMySpace",
      desc: "Automated venue & space reservation platform",
      fullDesc: "A centralized booking system for labs, classrooms, and auditoriums. Real-time schedule visibility, admin management, and approval workflows — replacing manual, paper-based venue booking.",
      tags: ["React", "Flask", "MySQL", "REST APIs", "Context API"],
      github: "#"
    },
    {
      title: "Todo App",
      desc: "Real-time task management dashboard",
      fullDesc: "A productivity app with Google Sign-In, live task sync, progress dashboard, and offline fallback via local storage. Built on Firebase for seamless cross-session persistence.",
      tags: ["React", "Firebase", "Firestore", "Google OAuth", "Tailwind"],
      github: "#",
      link: "#"
    }
  ];

  const certifications = [
    { title: "Full-Stack Web Development", subtitle: "Self-paced coursework" },
    { title: "Database Management Systems", subtitle: "BMSCE curriculum" },
    { title: "Python Programming", subtitle: "Academic + hands-on projects" }
  ];

  return (
    <div className="min-h-screen bg-[#070913] text-slate-300 font-sans selection:bg-purple-500/30">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#392182]/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#1e3a8a]/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Navbar */}
        <header className="sticky top-0 z-50 bg-[#070913]/60 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button 
                onClick={onBack}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group text-sm font-medium"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> App
              </button>
              <div className="h-6 w-px bg-white/10 hidden sm:block" />
              <a href="#" className="text-xl font-bold text-white tracking-tight hidden sm:flex items-center gap-2">
                <span className="text-purple-400">Aditi</span> Kamath
              </a>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  {link.name}
                </a>
              ))}
              <a 
                href="/AditiKamathResume_pdf.pdf" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-500/20 text-purple-300 font-bold hover:bg-purple-500/30 transition-colors text-sm border border-purple-500/30"
              >
                <Download size={16} /> Resume
              </a>
            </nav>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-slate-400 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Nav */}
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden absolute top-20 left-0 w-full bg-[#070913]/95 backdrop-blur-xl border-b border-white/5 py-4 px-6 flex flex-col gap-4 shadow-2xl"
            >
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium text-slate-300 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="/AditiKamathResume_pdf.pdf" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 text-purple-400 font-medium mt-2 w-fit px-4 py-2 bg-purple-500/10 rounded-full"
              >
                <Download size={18} /> Resume
              </a>
            </motion.div>
          )}
        </header>

        <main className="max-w-6xl mx-auto px-6 py-12 md:py-24 flex flex-col gap-32">
          
          {/* Hero Section */}
          <section id="about" className="flex flex-col-reverse md:flex-row items-center gap-16 md:gap-8 min-h-[60vh] pt-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 flex flex-col items-center md:items-start text-center md:text-left"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                Hi, I'm <span className="whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Aditi Kamath.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 max-w-xl">
                I'm a backend-focused software engineer with a passion for designing scalable systems, robust databases, and full-stack applications.
              </p>
              
              <div className="flex items-center gap-5">
                <a href="#" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white/10 hover:text-white transition-all hover:scale-110">
                  <Github size={22} />
                </a>
                <a href="https://www.linkedin.com/in/aditi-kamath-a-235032359" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-[#0A66C2]/10 border border-[#0A66C2]/20 flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2]/20 transition-all hover:scale-110">
                  <Linkedin size={22} />
                </a>
                <a href="mailto:aditikamath06@gmail.com" className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 hover:bg-purple-500/20 transition-all hover:scale-110">
                  <Mail size={22} />
                </a>
              </div>
              
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 flex justify-center md:justify-end"
            >
              <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="relative w-full h-full rounded-full border border-white/10 p-2 overflow-hidden bg-[#111]/50 backdrop-blur-sm">
                  <img 
                    src="/aditi.jpeg" 
                    alt="Aditi Kamath" 
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="scroll-mt-24">
            <div className="mb-12">
              <span className="text-slate-500 text-sm font-bold tracking-[0.2em] uppercase mb-4 block">02 — SKILLS</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Tools I reach for.</h2>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-12">
              {tools.map((tool, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-purple-500/30 transition-all cursor-default"
                >
                  <span className="text-purple-400">{tool.icon}</span>
                  <span className="text-slate-200 font-medium">{tool.name}</span>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#121c38]/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-6 text-slate-400 font-bold uppercase tracking-wider text-sm">
                <Sparkles size={18} /> Currently Learning
              </div>
              <div className="flex flex-wrap gap-4">
                {learning.map((item, i) => (
                  <div key={i} className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm font-medium">
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="scroll-mt-24">
            <div className="mb-12">
              <span className="text-slate-500 text-sm font-bold tracking-[0.2em] uppercase mb-4 block">03 — FEATURED PROJECTS</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Things I've built.</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((proj, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#121c38]/40 border border-white/5 hover:border-white/10 rounded-3xl p-8 backdrop-blur-sm flex flex-col h-full group transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-white">{proj.title}</h3>
                    <div className="flex gap-3">
                      {proj.link && (
                        <a href={proj.link} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                          <ExternalLink size={18} />
                        </a>
                      )}
                      {proj.github && (
                        <a href={proj.github} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                          <Github size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-slate-400 font-medium mb-6">{proj.desc}</p>
                  <p className="text-slate-300 leading-relaxed mb-8 flex-grow">{proj.fullDesc}</p>
                  
                  <div className="flex flex-wrap gap-3 mt-auto">
                    {proj.tags.map(tag => (
                      <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Beyond Code (Leadership) */}
          <section id="leadership" className="scroll-mt-24">
            <div className="mb-12">
              <span className="text-slate-500 text-sm font-bold tracking-[0.2em] uppercase mb-4 block">04 — BEYOND CODE</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Beyond code.</h2>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#121c38]/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm flex gap-6 items-start"
            >
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/10">
                <Heart size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Blood Donation Camp — Organizer</h3>
                <p className="text-slate-400 text-sm font-medium mb-4">BMS College of Engineering</p>
                <p className="text-slate-300 leading-relaxed">
                  Organized a college-wide blood donation drive — coordinating volunteers, logistics, and outreach to encourage community participation.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Education */}
          <section id="education" className="scroll-mt-24">
            <div className="mb-12">
              <span className="text-slate-500 text-sm font-bold tracking-[0.2em] uppercase mb-4 block">05 — EDUCATION</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Where I study.</h2>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#121c38]/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm flex gap-6 items-start"
            >
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/10">
                <GraduationCap size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">B.E. in Computer Science and Engineering</h3>
                <p className="text-slate-400 text-sm font-medium mb-4">BMS College of Engineering, Bengaluru</p>
                <p className="text-slate-300 leading-relaxed">
                  Coursework across Data Structures, DBMS, Operating Systems, and Software Engineering — with hands-on projects reinforcing every topic.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Certifications */}
          <section id="certifications" className="scroll-mt-24">
            <div className="mb-12">
              <span className="text-slate-500 text-sm font-bold tracking-[0.2em] uppercase mb-4 block">06 — CERTIFICATIONS</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white">Certifications.</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {certifications.map((cert, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#121c38]/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm flex flex-col"
                >
                  <Award size={24} className="text-purple-400 mb-6" />
                  <h3 className="text-lg font-bold text-white mb-2">{cert.title}</h3>
                  <p className="text-slate-400 text-sm">{cert.subtitle}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="scroll-mt-24 pb-24">
            <div className="mb-12">
              <span className="text-slate-500 text-sm font-bold tracking-[0.2em] uppercase mb-4 block">07 — CONTACT</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Let's build something.</h2>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#121c38]/40 border border-white/5 rounded-3xl p-12 md:p-16 backdrop-blur-sm text-center flex flex-col items-center"
            >
              <h3 className="text-3xl font-bold text-white mb-4">Have an idea or an opportunity?</h3>
              <p className="text-slate-300 text-lg mb-10 max-w-2xl">
                I'm actively looking for internship and placement opportunities. My inbox is always open.
              </p>
              
              <a 
                href="mailto:aditikamath06@gmail.com"
                className="inline-flex items-center gap-3 bg-purple-500/20 border border-purple-500/30 text-purple-300 px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-500/30 transition-colors shadow-lg shadow-purple-500/10"
              >
                <Mail size={20} /> aditikamath06@gmail.com
              </a>
            </motion.div>
          </section>

        </main>
        
        {/* Footer */}
        <footer className="border-t border-white/5 py-8 text-center text-slate-500 text-sm pb-24 md:pb-8">
          <p>© {new Date().getFullYear()} Aditi Kamath. All rights reserved.</p>
        </footer>

        {/* Scroll to top */}
        <a 
          href="#" 
          className="fixed bottom-8 right-8 w-12 h-12 bg-white/5 border border-white/10 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-white/10 hover:-translate-y-1 transition-all z-50 backdrop-blur-md"
          title="Go to top"
        >
          <ArrowUp size={20} />
        </a>
      </div>
    </div>
  );
}
