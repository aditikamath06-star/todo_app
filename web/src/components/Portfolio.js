import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Linkedin, Github, Download, Mail, ChevronRight, Menu, X, Code2, Layout, Database, Smartphone, ArrowUp } from 'lucide-react';

export default function Portfolio({ onBack }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Education", href: "#education" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" }
  ];

  const skills = [
    { name: "UI/UX Design", icon: <Layout size={24} /> },
    { name: "Unity", icon: <Code2 size={24} /> },
    { name: "Python", icon: <Code2 size={24} /> },
    { name: "Java & C", icon: <Code2 size={24} /> },
    { name: "React & Node.js", icon: <Database size={24} /> },
    { name: "HTML5 & CSS3", icon: <Layout size={24} /> }
  ];

  const experiences = [
    {
      company: "Cubera",
      link: "https://cubera.co",
      role: "Developer",
      duration: "Present",
      desc: "Adtech and Big Data Company. Working on complex data-driven web applications."
    },
    {
      company: "GouravGo",
      link: "https://www.gauravgo.com",
      role: "UI/UX Developer",
      duration: "Recent",
      desc: "Designed user-friendly UI/UX interfaces in Unity. Optimized menus, layouts, and interactive elements for smooth navigation."
    },
    {
      company: "UniFinds",
      link: "https://www.unifindss.com",
      role: "Data Entry Operator",
      duration: "Past",
      desc: "Managed large datasets and accurately entered and maintained records with Google Sheets."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-300 font-sans selection:bg-blue-500/30">
      
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group text-sm font-medium"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> App
            </button>
            <div className="h-6 w-px bg-white/10 hidden sm:block" />
            <a href="#" className="text-2xl font-bold text-white tracking-tighter hidden sm:block">
              &lt;Partha/&gt;
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                {link.name}
              </a>
            ))}
            <a 
              href="/ParthaB_Resume.pdf" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-500/10 text-blue-400 font-medium hover:bg-blue-500/20 transition-colors text-sm"
            >
              Resume <Download size={16} />
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
            className="md:hidden absolute top-20 left-0 w-full bg-[#111] border-b border-white/5 py-4 px-6 flex flex-col gap-4 shadow-2xl"
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
              href="/ParthaB_Resume.pdf" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 text-blue-400 font-medium mt-2"
            >
              Resume <Download size={18} />
            </a>
          </motion.div>
        )}
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-24 flex flex-col gap-32">
        
        {/* Hero Section */}
        <section className="flex flex-col-reverse md:flex-row items-center gap-16 md:gap-8 min-h-[60vh]">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex flex-col items-center md:items-start text-center md:text-left"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              Hi all, I'm <span className="whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Partha B.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-10 max-w-xl">
              Frontend Developer specializing in building exceptional digital experiences. 
              Passionate about creating elegant, responsive, and user-centric web applications.
            </p>
            
            <div className="flex items-center gap-5">
              <a href="https://github.com/partha2930" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all hover:scale-110">
                <Github size={22} />
              </a>
              <a href="https://www.linkedin.com/in/partha-balakrishna-582095363/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-[#0A66C2]/10 flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2]/20 transition-all hover:scale-110">
                <Linkedin size={22} />
              </a>
              <a href="mailto:partha200629@gmail.com" className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 hover:bg-emerald-500/20 transition-all hover:scale-110">
                <Mail size={22} />
              </a>
            </div>
            
            <div className="mt-12">
              <a 
                href="#contact"
                className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-200 transition-colors"
              >
                Let's get in touch <ChevronRight size={20} />
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
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse" />
              <div className="relative w-full h-full rounded-full border-2 border-white/10 p-2 overflow-hidden bg-[#111]">
                <img 
                  src="/partha.jpg?v=2" 
                  alt="Partha Balakrishna" 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Education Section */}
        <section id="education" className="scroll-mt-24">
          <h2 className="text-4xl font-bold text-white mb-16 text-center">Education</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 rounded-2xl p-8 border border-white/5 hover:border-blue-500/30 transition-colors group flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-white flex-shrink-0 overflow-hidden p-2 mb-6">
                <img src="/jss.jpeg" alt="JSS ATE Noida" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">JSS Academy of Technical Education</h3>
              <p className="text-blue-400 font-medium mb-4">B.Tech in Computer Science and Engineering</p>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 bg-white/5 px-4 py-1.5 rounded-full mt-auto">
                Batch 2024 - 2028
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 rounded-2xl p-8 border border-white/5 hover:border-blue-500/30 transition-colors group flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-white flex-shrink-0 overflow-hidden p-2 mb-6">
                <img src="/fasn.jpeg" alt="FAS Noida" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Father Agnel School, Noida</h3>
              <p className="text-blue-400 font-medium mb-4">Schooling</p>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 bg-white/5 px-4 py-1.5 rounded-full mt-auto">
                Completed
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="scroll-mt-24">
          <h2 className="text-4xl font-bold text-white mb-16 text-center">What I Do</h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Software Development & UI/UX</h3>
              <p className="text-slate-400 leading-relaxed">
                ⚡ Designing user-friendly interfaces and interactive elements in Unity
              </p>
              <p className="text-slate-400 leading-relaxed">
                ⚡ Building full-stack web applications using React.js, Node.js, and MongoDB
              </p>
              <p className="text-slate-400 leading-relaxed">
                ⚡ Integration of third party services such as Firebase and Appwrite
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {skills.map((skill, index) => (
                <div key={index} className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors border border-white/5 hover:border-white/10">
                  <div className="text-blue-400 mb-3">{skill.icon}</div>
                  <span className="text-sm font-medium text-center">{skill.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="scroll-mt-24">
          <h2 className="text-4xl font-bold text-white mb-16 text-center">Experience</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 rounded-2xl p-8 border border-white/5 hover:border-blue-500/30 transition-colors group flex flex-col"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                  <a href={exp.link} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">
                    {exp.company}
                  </a>
                </div>
                <p className="text-slate-400 text-sm mb-6 flex-grow">{exp.desc}</p>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 bg-white/5 w-fit px-3 py-1 rounded-full">
                  {exp.duration}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-24 text-center pb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto bg-gradient-to-b from-blue-500/10 to-transparent rounded-3xl p-12 border border-blue-500/20"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Reach Out to Me!</h2>
            <p className="text-slate-400 mb-8 text-lg">
              Discuss a project or just want to say hi? My inbox is open for all.
            </p>
            <a 
              href="mailto:partha200629@gmail.com"
              className="inline-flex items-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
            >
              Drop a message <Mail size={20} />
            </a>
          </motion.div>
        </section>

      </main>
      
      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-slate-500 text-sm pb-24 md:pb-8">
        <p>Made with ❤️ by Partha B.</p>
        <p className="mt-2">Inspired by DeveloperFolio</p>
      </footer>

      {/* Scroll to top */}
      <a 
        href="#" 
        className="fixed bottom-8 right-8 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/25 hover:bg-blue-600 hover:-translate-y-1 transition-all z-50"
        title="Go to top"
      >
        <ArrowUp size={24} />
      </a>
    </div>
  );
}
