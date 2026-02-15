import React, { useEffect, useState, useRef } from 'react';
import { Mail, MapPin, ChevronRight, ChevronLeft, Github, Linkedin, Terminal, Map, Database, Code2, Globe, Layout, Cpu, ArrowUpRight, GraduationCap, Play, Layers, Server, ArrowRight } from 'lucide-react';

/**
 * Luyao Zhang's Portfolio - FINAL VISUAL UPGRADE
 * Theme: CDE Application
 * Updates based on user feedback:
 * 1. Preserved User's edits: Menu (Research->Timeline->Stack), Cover (bromo.jpg), Year (2026).
 * 2. Visuals:
 * - Added background color block for Stack section.
 * - Increased project image size (col-8).
 * - Added dividers between projects and in stack section.
 * - Removed mouse listener from Stack cards (simplified).
 * - Optimized Footer text size and brightness.
 * - Added subtle gradient background.
 */

// --- Assets Configuration ---
const ASSETS = {
  // User specified: bromo.jpg
  cover: "https://raw.githubusercontent.com/luyao121401-coder/image-store/main/work1/bromo.jpg",

  project1: [
    { type: 'youtube', id: "MPdzTuXMIe0" }
  ],
  project2: [
    { type: 'video', src: "https://raw.githubusercontent.com/luyao121401-coder/image-store/main/work1/work1_video.mp4" },
    { type: 'image', src: "https://raw.githubusercontent.com/luyao121401-coder/image-store/main/work1/login.jpg" },
    { type: 'image', src: "https://raw.githubusercontent.com/luyao121401-coder/image-store/main/work1/任务统计.jpg" },
    { type: 'image', src: "https://raw.githubusercontent.com/luyao121401-coder/image-store/main/work1/数据管理.jpg" }
  ],
  project3: [
    { type: 'image', src: "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=1200" },
    { type: 'image', src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200" },
    { type: 'image', src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200" }
  ]
};

// --- Components ---

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
    const handleMouseOver = (e) => {
      const isInteractive = e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('.interactive');
      setIsHovering(!!isInteractive);
    };
    window.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center transition-transform duration-100 ease-out hidden md:flex"
      style={{ left: position.x, top: position.y, transform: `translate(-50%, -50%) scale(${isHovering ? 2.5 : 1})` }}
    >
      <div className={`rounded-full bg-white transition-all duration-300 ${isHovering ? 'w-8 h-8 opacity-100' : 'w-4 h-4 opacity-80'}`} />
    </div>
  );
};

const CoverPage = ({ onEnter }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-zinc-900 text-white flex flex-col md:flex-row overflow-hidden">
      <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center bg-zinc-900 relative">
        {/* Subtle texture for cover */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(16,185,129,0.1),transparent_40%)]"></div>

        <div className="max-w-xl relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">Hello,<br/> I'm Luyao.</h1>
          <div className="h-1 w-20 bg-emerald-500 mb-8"></div>
          <div className="space-y-6 text-zinc-400 text-xl leading-relaxed font-light">
            <p>I’m <span className="text-white font-medium">Luyao Zhang</span>, a WebGIS Frontend Developer and an explorer at heart. I love exploring everything about location and space, and I have the passion and skills to turn the unknown into clear, useful knowledge.</p>
            <p>My goal is to break down the barriers between people and spatiotemporal data, speed up response in emergency and disaster situations, and create more intuitive, powerful visualization tools to make the Digital Earth more accessible and inclusive for everyone.</p>
          </div>
          <div className="mt-12 flex items-center gap-4 text-sm font-bold tracking-widest uppercase text-emerald-500 animate-pulse md:hidden">Tap Image to Enter <ArrowRight size={16} /></div>
        </div>
      </div>
      <div className="w-full md:w-1/2 relative group cursor-pointer interactive overflow-hidden" onClick={onEnter}>
        <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-transparent transition-colors duration-700 z-10 mix-blend-overlay"></div>
        <img
          src={ASSETS.cover}
          alt="Cover"
          className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
          onError={(e) => { e.target.style.display='none'; e.target.parentElement.style.backgroundColor='#18181b'; }}
        />
        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20 backdrop-blur-[2px]">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full flex items-center gap-4 text-white font-bold tracking-widest uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            Enter Portfolio <ArrowRight size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectSlider = ({ slides, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (slides.length <= 1) return;
    timeoutRef.current = setTimeout(() => setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1)), 5000);
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, slides.length]);

  return (
    <div className="group relative overflow-hidden bg-zinc-100 rounded-sm aspect-[16/10] shadow-sm border border-zinc-200 transition-all duration-700 hover:shadow-2xl">
      <div className="flex transition-transform duration-1000 cubic-bezier(0.23, 1, 0.32, 1) h-full" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full h-full relative overflow-hidden flex items-center justify-center bg-zinc-900">
            {slide.type === 'video' && (
              <video
                src={slide.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                onError={(e) => console.error("Video failed to load:", slide.src)}
              />
            )}
            {slide.type === 'image' && (
              <>
                <img
                  src={slide.src}
                  alt={title}
                  className="w-full h-full object-cover transition-all duration-1000 scale-110 group-hover:scale-100"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1518186239717-319049a9ec60?q=80&w=1200"; }}
                />
              </>
            )}
            {slide.type === 'youtube' && (
              <div className="w-full h-full relative">
                <iframe
                  src={`https://www.youtube.com/embed/${slide.id}?autoplay=1&mute=1&loop=1&playlist=${slide.id}&modestbranding=1&rel=0&iv_load_policy=3`}
                  className="w-full h-full object-cover"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        ))}
      </div>
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-8 flex gap-3 z-10">
          {slides.map((_, index) => (
            <button key={index} onClick={() => setCurrentIndex(index)} className={`h-1 transition-all duration-500 rounded-full ${currentIndex === index ? 'w-12 bg-white' : 'w-4 bg-white/40'}`} />
          ))}
        </div>
      )}

      {slides[currentIndex].type !== 'youtube' && (
        <div className="absolute top-6 right-6 z-20 pointer-events-none">
          <span className={`${slides[currentIndex].type !== 'image' ? 'bg-red-500' : 'bg-white/20'} text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full flex items-center gap-2 backdrop-blur-sm`}>
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
            {slides[currentIndex].type !== 'image' ? 'Live Demo' : 'Gallery View'}
          </span>
        </div>
      )}
    </div>
  );
};

// Replaced SpotlightCard with SimpleCard (No mouse hover effect, Clean Design)
const SimpleCard = ({ children, className = "" }) => {
  return (
    <div className={`p-8 bg-white border border-zinc-200 transition-all duration-300 hover:border-zinc-400 hover:shadow-lg ${className}`}>
      <div className="relative h-full">{children}</div>
    </div>
  );
};

const App = () => {
  const [showCover, setShowCover] = useState(true);

  useEffect(() => {
    if (!showCover) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('opacity-100', 'translate-y-0'); });
      }, { threshold: 0.1 });
      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    }
  }, [showCover]);

  if (showCover) return <><CustomCursor /><CoverPage onEnter={() => setShowCover(false)} /></>;

  return (
    <div className="bg-zinc-50 text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white scroll-smooth cursor-none relative animate-in fade-in duration-1000">
      <CustomCursor />

      {/* Subtle Background Gradient for Whole Page */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-zinc-50 via-white to-zinc-100 opacity-80"></div>
         {/* Colorful Orbs for vibe */}
         <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Navigation - User defined order: Research -> Timeline -> Stack -> Contact */}
      {/* Wait, user said "改了一下菜单timeline和stack的位置".
          Uploaded file had: ['Research', 'Timeline', 'Stack', 'Contact']
          I will keep this order as requested. */}
      <nav className="fixed top-0 w-full z-50 mix-blend-difference py-8 px-8 md:px-12 flex justify-between items-center text-white backdrop-blur-[2px]">
        <div className="text-xl font-bold tracking-[0.2em]">LY.ZHANG</div>
        <div className="hidden md:flex space-x-12 text-[10px] font-bold tracking-[0.3em] uppercase">
          {['Research', 'Timeline', 'Stack', 'Contact'].map((item) => (<a key={item} href={`#${item.toLowerCase()}`} className="hover:text-zinc-400">{item}</a>))}
        </div>
      </nav>

      {/* Hero */}
      <section className="h-screen flex flex-col justify-center px-8 md:px-24 max-w-[1800px] mx-auto relative overflow-hidden z-10">
        <div className="reveal opacity-0 translate-y-12 transition-all duration-[1.5s]">
          <span className="text-xs font-bold tracking-[0.4em] text-zinc-500 uppercase block mb-8">— Portfolio 2026</span>
          <h1 className="text-[12vw] md:text-[8vw] font-bold leading-[0.9] tracking-tighter mb-12">GEOSPATIAL DEV <br /><span className="italic font-light text-zinc-400">&</span> RESEARCHER.</h1>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <p className="max-w-xl text-2xl text-zinc-600 font-light leading-relaxed">Specializing in the intersection of <span className="text-zinc-900 font-medium">Earth Observation</span> and <span className="text-zinc-900 font-medium">WebGIS Architecture</span> to make the Digital Earth accessible.</p>
            <a href="#research" className="group flex items-center gap-6 cursor-pointer interactive">
              <div className="flex flex-col text-right"><span className="text-xs font-bold tracking-widest uppercase">Explore Portfolio</span></div>
              <div className="w-16 h-16 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-white transition-all duration-500 hover:scale-110"><ArrowUpRight size={24} /></div>
            </a>
          </div>
        </div>
        <div className="absolute right-[-5%] top-[20%] text-[25vw] font-bold text-zinc-200/40 select-none -z-10 leading-none tracking-tighter transition-transform duration-100 ease-linear">GIS</div>
      </section>

      {/* Projects - Visual Upgrade: Bigger Images, Less Spacing */}
      <section id="research" className="py-20 px-8 md:px-24 max-w-[1920px] mx-auto relative z-10">
        <div className="absolute left-8 md:left-24 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-zinc-200 to-transparent hidden lg:block"></div>
        <div className="flex justify-between items-end mb-20 reveal opacity-0 translate-y-12 pl-0 lg:pl-12">
          <div><span className="text-[10px] font-bold tracking-[0.4em] text-zinc-400 block mb-4 uppercase italic">Archive — 01</span><h2 className="text-6xl font-bold tracking-tighter">Research & Projects.</h2></div>
        </div>

        <div className="space-y-24">
          {/* Project 1 - Image 8 cols, Text 4 cols */}
          <div className="grid lg:grid-cols-12 gap-12 items-center reveal opacity-0 translate-y-12 relative group">
            <div className="absolute left-[-5px] top-[50%] -translate-y-1/2 w-2.5 h-2.5 bg-zinc-900 rounded-full hidden lg:block ring-4 ring-zinc-50"></div>
            {/* Expanded Media Column */}
            <div className="lg:col-span-8 pl-0 lg:pl-12"><ProjectSlider slides={ASSETS.project1} title="Xinjiang Project" /></div>
            <div className="lg:col-span-4 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6"><span className="text-4xl font-black text-black">01</span><span className="text-[10px] font-bold tracking-[0.2em] uppercase bg-zinc-900 text-white px-2 py-1">WebGIS Engineering</span></div>
              <h3 className="text-3xl font-bold mb-6 leading-none italic">Xinjiang Urban Active Fault Detection DB</h3>
              <p className="text-zinc-500 text-base leading-relaxed mb-8 text-left">Developed a comprehensive WebGIS platform for the Xinjiang region, featuring 7 core business modules including fault detection and risk census. Implemented complex spatial data visualization, report generation, and thematic mapping capabilities.</p>
              <div className="flex flex-wrap gap-2 mb-8">{['OpenLayers', 'GeoServer', 'Vue.js'].map(tag => (<span key={tag} className="text-[10px] border border-zinc-200 px-3 py-1 text-zinc-500">{tag}</span>))}</div>
              <div className="grid grid-cols-2 gap-8 border-t border-zinc-200 pt-6">
                <div><h4 className="text-[10px] font-bold text-zinc-400 uppercase mb-2 tracking-widest">Type</h4><p className="text-sm font-medium">Enterprise WebGIS</p></div>
                <div><h4 className="text-[10px] font-bold text-zinc-400 uppercase mb-2 tracking-widest">Role</h4><p className="text-sm font-medium text-zinc-600">Frontend Developer</p></div>
              </div>
            </div>
          </div>

          {/* Divider between projects */}
          <div className="w-full h-px bg-zinc-200/60" />

          {/* Project 2 */}
          <div className="grid lg:grid-cols-12 gap-12 items-center reveal opacity-0 translate-y-12 relative group">
            <div className="absolute left-[-5px] top-[50%] -translate-y-1/2 w-2.5 h-2.5 bg-zinc-300 rounded-full hidden lg:block ring-4 ring-zinc-50"></div>
            <div className="lg:col-span-4 pl-0 lg:pl-12 order-2 lg:order-1 text-right lg:text-left flex flex-col justify-center">
              <div className="flex items-center lg:justify-start justify-end gap-4 mb-6"><span className="text-4xl font-black text-black">02</span><span className="text-[10px] font-bold tracking-[0.2em] uppercase bg-zinc-900 text-white px-2 py-1">System Architecture</span></div>
              <h3 className="text-3xl font-bold mb-6 leading-none italic">Field Work Information <br/>Management System</h3>
              <p className="text-zinc-500 text-base leading-relaxed mb-8">Engineered a comprehensive system for drilling project management, statistical analysis, and construction team oversight. Integrated map layers with task statistics and designed RBAC logic to streamline collaborative workflows.</p>
              <div className="flex flex-wrap lg:justify-start justify-end gap-2 mb-8">{['Vue.js', 'RBAC', 'Workflow', 'OpenLayers'].map(tag => (<span key={tag} className="text-[10px] border border-zinc-200 px-3 py-1 text-zinc-500">{tag}</span>))}</div>
              <div className="grid grid-cols-2 gap-8 border-t border-zinc-200 pt-6">
                <div><h4 className="text-[10px] font-bold text-zinc-400 uppercase mb-2 tracking-widest">Type</h4><p className="text-sm font-medium">Management System</p></div>
                <div><h4 className="text-[10px] font-bold text-zinc-400 uppercase mb-2 tracking-widest">Focus</h4><p className="text-sm font-medium text-zinc-600">Access Control & Workflow</p></div>
              </div>
            </div>
            {/* Expanded Media Column */}
            <div className="lg:col-span-8 order-1 lg:order-2"><ProjectSlider slides={ASSETS.project2} title="Field Work" /></div>
          </div>

          {/* Divider between projects */}
          <div className="w-full h-px bg-zinc-200/60" />

          {/* Project 3 */}
          <div className="grid lg:grid-cols-12 gap-12 items-center reveal opacity-0 translate-y-12 relative group">
            <div className="absolute left-[-5px] top-[50%] -translate-y-1/2 w-2.5 h-2.5 bg-zinc-300 rounded-full hidden lg:block ring-4 ring-zinc-50"></div>
            {/* Expanded Media Column */}
            <div className="lg:col-span-8 pl-0 lg:pl-12"><ProjectSlider slides={ASSETS.project3} title="ETAS System" /></div>
            <div className="lg:col-span-4 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6"><span className="text-4xl font-black text-black">03</span><span className="text-[10px] font-bold tracking-[0.2em] uppercase bg-zinc-900 text-white px-2 py-1">Algorithm & Viz</span></div>
              <h3 className="text-3xl font-bold mb-6 leading-none italic">ETAS-based Aftershock <br/>Prediction System</h3>
              <p className="text-zinc-500 text-base leading-relaxed mb-8 text-left">Built a seismic aftershock prediction system based on the ETAS mathematical model. Processed over 8,000 historical seismic records and integrated real-time visualization to analyze earthquake sequences and probabilities.</p>
              <div className="flex flex-wrap gap-2 mb-8">{['Java', 'SpringBoot', 'BMap API', 'SQL'].map(tag => (<span key={tag} className="text-[10px] border border-zinc-200 px-3 py-1 text-zinc-500">{tag}</span>))}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline - Increased Font Size */}
      <section id="timeline" className="py-20 px-8 md:px-24 max-w-[1800px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 reveal opacity-0 translate-y-12 transition-all duration-1000"><span className="text-[10px] font-bold tracking-[0.4em] text-zinc-400 block mb-8 uppercase italic">History</span><h2 className="text-5xl font-bold tracking-tighter">Academic & <br/> Professional.</h2></div>
          <div className="lg:col-span-8 space-y-16 reveal opacity-0 translate-y-12 transition-all duration-1000 delay-200">
            {[{ year: '2023 — 2024', role: 'Front-End Dev Engineer', org: 'GeoQuater / Beijing', type: 'Internship', desc: 'Spearheaded the UI development for 4 seismic monitoring systems. Translated complex geological metrics into intuitive dashboards.' }, { year: '2020 — 2024', role: 'B.Eng. Information Management', org: 'IDP / Hebei', type: 'Education', desc: 'Academic focus on GIS, Data Structures, and Information Systems. Ranking: Top 5% in Major.' }].map((item, index) => (
                <div key={index} className="relative pl-8 border-l border-zinc-200 hover:border-zinc-900 transition-colors duration-500"><div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-zinc-900 rounded-full ring-4 ring-white"></div><div className="text-xs font-bold tracking-[0.2em] text-zinc-400 mb-2 uppercase">{item.year}</div><div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-4"><h3 className="text-2xl font-bold italic">{item.role}</h3><span className="text-sm font-medium text-zinc-500">@ {item.org}</span><span className="text-[10px] font-bold uppercase border border-zinc-200 px-2 py-0.5 rounded-full ml-auto text-zinc-400">{item.type}</span></div><p className="text-zinc-500 text-xl leading-relaxed max-w-2xl">{item.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack - ADDED COLOR BLOCK BACKGROUND & DIVIDER */}
      <section id="stack" className="py-20 bg-zinc-100 px-8 md:px-24 relative z-10 border-y border-zinc-200">
        <div className="max-w-[1800px] mx-auto grid md:grid-cols-2 gap-16 items-start relative">
            <div className="reveal opacity-0 translate-y-12 sticky top-32">
              <span className="text-[10px] font-bold tracking-[0.4em] text-zinc-400 block mb-8 uppercase">Technical Proficiency</span>
              <h2 className="text-7xl font-bold tracking-tighter leading-none mb-12 italic">TECHNICAL <br/> FOUNDATION.</h2>
              <p className="text-zinc-500 text-xl max-w-md leading-relaxed mb-8">My background focuses on front-end engineering and geospatial technologies, enabling me to build intuitive tools for Digital Earth applications.</p>
            </div>

            {/* Vertical Divider for Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-zinc-300 -translate-x-1/2"></div>

            <div className="grid grid-cols-1 gap-6 reveal opacity-0 translate-y-12 delay-300">
              {[
                { title: 'WebGIS Development', icon: <Globe className="text-zinc-900" />, skills: ['OpenLayers', 'GeoServer', 'BMap API', 'ArcGIS'] },
                { title: 'Front-End Stack', icon: <Layout className="text-zinc-900" />, skills: ['Vue.js', 'JavaScript', 'HTML/CSS', 'Element UI'] },
                { title: 'Tools', icon: <Terminal className="text-zinc-900" />, skills: ['VS Code', 'Git', 'PyCharm', 'IntelliJ', 'Eclipse'] }
              ].map((group, i) => (
                <SimpleCard key={i} className="group p-10 rounded-sm">
                  <div className="flex justify-between items-start mb-6"><div className="p-3 bg-zinc-100 rounded-sm group-hover:bg-zinc-900 group-hover:text-white transition-colors">{group.icon}</div><span className="text-zinc-200 text-6xl font-black leading-none opacity-20 transition-opacity">0{i+1}</span></div>
                  <h3 className="font-bold tracking-tight text-2xl italic mb-2">{group.title}</h3>
                  <div className="flex flex-wrap gap-2">{group.skills.map((s, j) => (<span key={j} className="text-[10px] font-bold tracking-widest uppercase border border-zinc-100 bg-zinc-50 px-3 py-1.5 rounded-sm group-hover:border-zinc-200 transition-colors">{s}</span>))}</div>
                </SimpleCard>
              ))}
            </div>
        </div>
      </section>

      {/* Footer - Reduced Slogan Size & Brighter Color */}
      <section id="contact" className="py-40 bg-zinc-900 text-white px-8 relative overflow-hidden z-10 text-center">
        <span className="text-xs font-bold tracking-[0.5em] text-zinc-500 mb-12 block uppercase">Application For Admission</span>
        {/* Adjusted Font Size (9vw -> 5xl/7xl) and Color (text-zinc-300) */}
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-12 uppercase text-zinc-300">UNVEILING COMPLEXITY.<br/> EMPOWERING RESCUE.</h2>
        <p className="text-zinc-400 text-xl font-light mb-24 max-w-3xl mx-auto">Delivering a qualitative leap for emergency services through high-interactivity visualization of complex spatiotemporal data.</p>
        <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto mb-40">
            <div className="group flex flex-col items-center p-8 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800/50 transition-all rounded-sm interactive"><Mail className="mb-4 text-zinc-500 group-hover:text-white" /><div className="text-sm font-bold tracking-widest uppercase text-zinc-500 mb-2">Email</div><div className="text-lg font-light text-zinc-300">Z13938759439@163.com</div></div>
            <div className="group flex flex-col items-center p-8 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800/50 transition-all rounded-sm interactive"><Github className="mb-4 text-zinc-500 group-hover:text-white" /><div className="text-sm font-bold tracking-widest uppercase text-zinc-500 mb-2">GitHub Profile</div><div className="flex gap-4"><a href="https://github.com/luyao121401-coder" target="_blank" rel="noopener noreferrer" className="hover:text-white underline text-zinc-300">luyao121401-coder</a></div></div>
            <div className="group flex flex-col items-center p-8 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800/50 transition-all rounded-sm interactive"><MapPin className="mb-4 text-zinc-500 group-hover:text-white" /><div className="text-sm font-bold tracking-widest uppercase text-zinc-500 mb-2">Mobile</div><div className="text-lg font-light text-zinc-300">+86 139-3875-9439</div></div>
        </div>
        <div className="flex justify-center border-t border-zinc-800 pt-12 text-zinc-500 text-[10px] font-bold tracking-[0.3em] uppercase">© 2026 Luyao Zhang — Digital Earth Researcher</div>
        <div className="absolute inset-0 z-[-1] opacity-20"><div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div></div>
      </section>
    </div>
  );
};

export default App;