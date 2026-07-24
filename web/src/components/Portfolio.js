import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Linkedin, Github, Download, Mail, ChevronRight, Menu, X, Code2, Layout, Database, Smartphone, ArrowUp, Phone, MessageCircle } from 'lucide-react';

export default function Portfolio({ onBack }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Education", href: "#education" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
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

      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, navLinks]);

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
      
      {/* Mobile Top Bar */}
      <header className="md:hidden sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group text-sm font-medium"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> App
            </button>
          </div>

          <button 
            className="text-slate-400 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-20 left-0 w-full bg-[#111] border-b border-white/5 py-4 px-6 flex flex-col gap-4 shadow-2xl"
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

      {/* Desktop Resume Button (Top Right) */}
      <a 
        href="/ParthaB_Resume.pdf" 
        target="_blank" 
        rel="noreferrer"
        className="hidden md:flex fixed top-8 right-8 z-50 items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all border border-blue-500/20 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 hover:scale-110"
        title="Download Resume"
      >
        <Download size={20} />
      </a>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-56 h-screen fixed left-0 top-0 py-20 px-8 border-r border-white/5 bg-[#0a0a0a]/90 backdrop-blur-xl z-40">
        <div className="mb-12 flex flex-col items-start">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group text-sm font-medium mb-8"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> App
            </button>
            <a href="#" className="text-3xl font-bold text-white tracking-tighter hover:text-blue-400 transition-colors">
              &lt;Partha/&gt;
            </a>
          </div>

          <nav className="flex flex-col gap-2 flex-grow">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-bold tracking-wider transition-all duration-300 ${isActive ? 'bg-blue-500/10 text-blue-400' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'}`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>
        </aside>

      {/* Main Content */}
      <main className="flex-1 px-6 py-12 md:py-24 md:ml-56 max-w-5xl mx-auto flex flex-col gap-32">
        
        {/* Hero Section */}
        <section id="about" className="flex flex-col-reverse md:flex-row items-center gap-16 md:gap-8 min-h-[60vh] pt-8">
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
            <div className="relative w-[280px] h-[360px] md:w-[360px] md:h-[480px] group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-emerald-500/20 rounded-[2rem] blur-3xl animate-pulse" />
              <div className="relative w-full h-full rounded-[2rem] border border-white/10 p-3 bg-[#111]/80 backdrop-blur-sm shadow-2xl overflow-hidden">
                <img 
                  src="/partha.jpg?v=2" 
                  alt="Partha Balakrishna" 
                  className="w-full h-full rounded-[1.5rem] object-cover transition-transform duration-700 group-hover:scale-105"
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
            <div className="flex justify-center items-center gap-6 mt-8">
              <a 
                href="https://wa.me/919667338569?text=Hey%20there!%20I%20came%20across%20your%20portfolio%20and%20wanted%20to%20reach%20out%20about%20a%20collaboration.%20Let%20me%20know%20when%20you're%20free%20to%20chat!"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full hover:-translate-y-2 hover:shadow-xl hover:shadow-[#25D366]/30 transition-all duration-300 shadow-lg shadow-[#25D366]/20"
                title="WhatsApp"
              >
                <MessageCircle size={28} />
              </a>
              
              <a 
                href="mailto:partha200629@gmail.com?subject=Reaching%20out%20about%20a%20collaboration&body=Hey%20there!%20I%20came%20across%20your%20portfolio%20and%20wanted%20to%20reach%20out%20about%20a%20collaboration.%20Let%20me%20know%20when%20you're%20free%20to%20chat!"
                className="flex items-center justify-center w-16 h-16 bg-[#EA4335] text-white rounded-full hover:-translate-y-2 hover:shadow-xl hover:shadow-[#EA4335]/30 transition-all duration-300 shadow-lg shadow-[#EA4335]/20"
                title="Email"
              >
                <Mail size={28} />
              </a>

              <a 
                href="tel:+919667338569"
                className="flex items-center justify-center w-16 h-16 bg-[#4285F4] text-white rounded-full hover:-translate-y-2 hover:shadow-xl hover:shadow-[#4285F4]/30 transition-all duration-300 shadow-lg shadow-[#4285F4]/20"
                title="Phone"
              >
                <Phone size={28} />
              </a>
            </div>
          </motion.div>
        </section>

      </main>
      
      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-slate-500 text-sm pb-24 md:pb-8 ml-0 md:ml-64">
        <p>Made with ❤️ by Partha B.</p>
        <p className="mt-2">Inspired by DeveloperFolio</p>
      </footer>

      {/* Scroll to top */}
      <a 
        href="#" 
        className={`fixed bottom-8 right-8 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/25 transition-all duration-300 z-50 ${showScrollTop ? 'opacity-100 translate-y-0 hover:bg-blue-600 hover:-translate-y-1' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        title="Go to top"
      >
        <ArrowUp size={24} />
      </a>
    </div>
  );
}
