import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Linkedin, Github, Download, Mail, ChevronRight, Menu, X, Code2, Layout, Database, Smartphone, ArrowUp, Phone, Sun, Moon, ExternalLink } from 'lucide-react';

export default function Portfolio({ onBack }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Education", href: "#education" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
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

  const projects = [
    {
      title: "Krushi",
      link: "https://github.com/vishwasks19/team-capybara",
      tech: "React.js, Node.js, MongoDB, TensorFlow, AWS",
      desc: "Smart agriculture platform connecting farmers with modern digital solutions for crop and resource management. Features role-based dashboards and a scalable database."
    },
    {
      title: "Sign-Language-Interpreter",
      link: "https://github.com/vishwasks19/sign-language-interpreter",
      tech: "Python, OpenCV, MediaPipe, TensorFlow/Keras, CNN",
      desc: "Real-time Sign Language to Text & Speech Conversion system capable of recognizing gestures from a webcam feed using a custom trained dataset."
    },
    {
      title: "TodoList",
      link: "https://github.com/aditikamath06-star/todo_app",
      liveLink: "https://todo-app-afe02.web.app/#",
      tech: "React, Tailwind CSS",
      desc: "A modern, responsive task management application with a beautiful dark/light theme, built to boost productivity and manage daily tasks efficiently."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] text-slate-700 dark:text-slate-300 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* Mobile Top Bar */}
      <header className="md:hidden sticky top-0 z-50 bg-slate-50 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5">
        <div className="px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Removed top app navigation */}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white"
            >
              {isDarkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-indigo-500" />}
            </button>
            <button 
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-20 left-0 w-full bg-slate-50 dark:bg-[#0a0a0a]/95 backdrop-blur-2xl border-b border-slate-200 dark:border-white/5 py-6 px-6 flex flex-col gap-5 shadow-2xl z-50"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white transition-colors"
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

      {/* Desktop Actions (Top Right) */}
      <div className="hidden md:flex fixed top-8 right-8 z-50 gap-2">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 transition-all hover:scale-110"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-indigo-500" />}
        </button>
        <a 
          href="/ParthaB_Resume.pdf" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all border border-blue-500/20 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 hover:scale-110"
          title="Download Resume"
        >
          <Download size={20} />
        </a>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-56 h-screen fixed left-0 top-0 py-20 px-8 border-r border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#0a0a0a]/90 backdrop-blur-xl z-40">
        <div className="mb-12 flex flex-col items-start mt-4">
            <a href="#" className="text-3xl font-bold text-slate-900 dark:text-white tracking-tighter hover:text-blue-400 transition-colors">
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
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-bold tracking-wider transition-all duration-300 ${isActive ? 'bg-blue-500/10 text-blue-400' : 'text-slate-500 hover:bg-slate-100 dark:bg-white/5 hover:text-slate-700 dark:text-slate-300'}`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>
        </aside>

      {/* Main Content */}
      <main className="flex-1 px-5 md:px-16 py-12 md:py-24 md:ml-56 max-w-5xl mx-auto flex flex-col gap-32">
        
        {/* Hero Section */}
        <section id="about" className="flex flex-col-reverse md:flex-row items-center gap-16 md:gap-8 min-h-[60vh] pt-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex flex-col items-center md:items-start text-center md:text-left"
          >
            <h1 className="text-4xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
              Hi all, I'm <span className="whitespace-normal md:whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Partha B.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-xl">
              Frontend Developer specializing in building exceptional digital experiences. 
              Passionate about creating elegant, responsive, and user-centric web applications.
            </p>
            
            <div className="flex items-center gap-5">
              <a href="https://github.com/partha2930" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-white/10 hover:text-slate-900 dark:text-white transition-all hover:scale-110">
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
            <div className="relative w-[240px] h-[300px] md:w-[360px] md:h-[480px] group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-emerald-500/20 rounded-[2rem] blur-3xl animate-pulse" />
              <div className="relative w-full h-full rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden">
                <img 
                  src="/partha.jpg?v=2" 
                  alt="Partha Balakrishna" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Education Section */}
        <section id="education" className="scroll-mt-24">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-16 text-center">Education</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-slate-100 dark:bg-white/5 rounded-2xl p-8 border border-slate-200 dark:border-white/5 hover:border-blue-500/30 transition-colors group flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-white flex-shrink-0 overflow-hidden p-2 mb-6">
                <img src="/jss.jpeg" alt="JSS ATE Noida" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">JSS Academy of Technical Education</h3>
              <p className="text-blue-400 font-medium mb-4">B.Tech in Computer Science and Engineering</p>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 dark:bg-white/5 px-4 py-1.5 rounded-full mt-auto">
                Batch 2024 - 2028
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-slate-100 dark:bg-white/5 rounded-2xl p-8 border border-slate-200 dark:border-white/5 hover:border-blue-500/30 transition-colors group flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-white flex-shrink-0 overflow-hidden p-2 mb-6">
                <img src="/fasn.jpeg" alt="FAS Noida" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Father Agnel School, Noida</h3>
              <p className="text-blue-400 font-medium mb-4">Schooling</p>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 dark:bg-white/5 px-4 py-1.5 rounded-full mt-auto">
                Completed
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="scroll-mt-24">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-16 text-center">What I Do</h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Software Development & UI/UX</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                ⚡ Designing user-friendly interfaces and interactive elements in Unity
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                ⚡ Building full-stack web applications using React.js, Node.js, and MongoDB
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
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
                <div key={index} className="flex flex-col items-center justify-center p-4 md:p-6 bg-slate-100 dark:bg-white/5 rounded-2xl hover:bg-white/10 transition-colors border border-slate-200 dark:border-white/5 hover:border-slate-200 dark:border-white/10">
                  <div className="text-blue-400 mb-3">{skill.icon}</div>
                  <span className="text-sm font-medium text-center">{skill.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="scroll-mt-24">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-16 text-center">Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-100 dark:bg-white/5 rounded-2xl p-8 border border-slate-200 dark:border-white/5 hover:border-blue-500/30 transition-colors group flex flex-col"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{proj.title}</h3>
                  <div className="text-xs font-semibold text-blue-400 mb-2">{proj.tech}</div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow">{proj.desc}</p>
                <div className="flex flex-wrap items-center gap-6 mt-auto pt-2">
                  <a href={proj.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                    View Source <Github size={16} />
                  </a>
                  {proj.liveLink && (
                    <a href={proj.liveLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors">
                      Visit Site <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="scroll-mt-24">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-16 text-center">Experience</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-100 dark:bg-white/5 rounded-2xl p-8 border border-slate-200 dark:border-white/5 hover:border-blue-500/30 transition-colors group flex flex-col"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{exp.role}</h3>
                  <a href={exp.link} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">
                    {exp.company}
                  </a>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow">{exp.desc}</p>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 dark:bg-white/5 w-fit px-3 py-1 rounded-full">
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
            className="max-w-2xl mx-auto bg-gradient-to-b from-blue-500/10 to-transparent rounded-3xl p-6 md:p-12 border border-blue-500/20"
          >
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Reach Out to Me!</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
              Discuss a project or just want to say hi? My inbox is open for all.
            </p>
            <div className="flex justify-center items-center gap-6 mt-8">
              <a 
                href="https://wa.me/919667338569?text=Hey%20there!%20I%20came%20across%20your%20portfolio%20and%20wanted%20to%20reach%20out%20about%20a%20collaboration.%20Let%20me%20know%20when%20you're%20free%20to%20chat!"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-16 h-16 bg-[#25D366] text-slate-900 dark:text-white rounded-full hover:-translate-y-2 hover:shadow-xl hover:shadow-[#25D366]/30 transition-all duration-300 shadow-lg shadow-[#25D366]/20"
                title="WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              
              <a 
                href="mailto:partha200629@gmail.com?subject=Reaching%20out%20about%20a%20collaboration&body=Hey%20there!%20I%20came%20across%20your%20portfolio%20and%20wanted%20to%20reach%20out%20about%20a%20collaboration.%20Let%20me%20know%20when%20you're%20free%20to%20chat!"
                className="flex items-center justify-center w-16 h-16 bg-[#EA4335] text-slate-900 dark:text-white rounded-full hover:-translate-y-2 hover:shadow-xl hover:shadow-[#EA4335]/30 transition-all duration-300 shadow-lg shadow-[#EA4335]/20"
                title="Email"
              >
                <Mail size={28} />
              </a>

              <a 
                href="tel:+919667338569"
                className="flex items-center justify-center w-16 h-16 bg-[#4285F4] text-slate-900 dark:text-white rounded-full hover:-translate-y-2 hover:shadow-xl hover:shadow-[#4285F4]/30 transition-all duration-300 shadow-lg shadow-[#4285F4]/20"
                title="Phone"
              >
                <Phone size={28} />
              </a>
            </div>
          </motion.div>
        </section>

      </main>
      
      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-white/5 py-8 pb-24 md:pb-12 ml-0 md:ml-56 flex flex-col items-center justify-center">
        <button 
          onClick={onBack} 
          className="px-5 py-2.5 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 rounded-full text-xs font-bold transition-colors inline-flex items-center gap-2 border border-slate-200 dark:border-white/10 hover:-translate-y-0.5"
        >
          <ArrowLeft size={14} /> Get back to the app
        </button>
      </footer>

      {/* Scroll to top */}
      <a 
        href="#" 
        className={`fixed bottom-8 right-8 w-12 h-12 bg-blue-500 text-slate-900 dark:text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/25 transition-all duration-300 z-50 ${showScrollTop ? 'opacity-100 translate-y-0 hover:bg-blue-600 hover:-translate-y-1' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        title="Go to top"
      >
        <ArrowUp size={24} />
      </a>
    </div>
  );
}
